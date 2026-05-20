import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { validateTelegramInitData, parseTelegramUser } from '@/lib/telegram/auth';
import { Database } from '@/types/supabase';

export async function POST(request: Request) {
  try {
    const { initData } = await request.json();

    if (!initData) {
      return NextResponse.json({ error: 'Missing initData' }, { status: 400 });
    }

    const botToken = process.env.TELEGRAM_BOT_TOKEN;
    if (!botToken) {
      console.error('TELEGRAM_BOT_TOKEN is not configured');
      return NextResponse.json({ error: 'Server misconfiguration' }, { status: 500 });
    }

    // 1. Validate Telegram initData hash (except in dev with mock data)
    let isValid = false;
    
    if (process.env.NODE_ENV === 'development' && initData.includes('mock_hash')) {
      isValid = true; // Skip validation for dev mock
    } else {
      isValid = validateTelegramInitData(initData, botToken);
    }

    if (!isValid) {
      return NextResponse.json({ error: 'Unauthorized: Invalid Telegram data' }, { status: 401 });
    }

    // 2. Parse user data
    const user = parseTelegramUser(initData);
    if (!user || !user.id) {
      return NextResponse.json({ error: 'Invalid user data in initData' }, { status: 400 });
    }

    // 3. Admin client with service role key to bypass RLS and create user/session
    const supabaseAdmin = createClient<Database>(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.SUPABASE_SERVICE_ROLE_KEY!
    );

    // 4. Create or get user using admin API
    const email = `telegram_${user.id}@telegram.local`;
    
    const { data: existingUsers, error: listError } = await supabaseAdmin.auth.admin.listUsers();
    
    if (listError) {
      console.error('Error listing users:', listError);
      return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }

    let authUser = existingUsers?.users?.find(u => 
      u.user_metadata?.telegram_id === user.id
    );

    if (!authUser) {
      const { data: newData, error: createError } = await supabaseAdmin.auth.admin.createUser({
        email,
        email_confirm: true,
        user_metadata: {
          telegram_id: user.id,
          username: user.username,
          first_name: user.first_name || user.firstName,
          last_name: user.last_name || user.lastName,
        },
      });
      
      if (createError) {
        console.error('Error creating user:', createError);
        return NextResponse.json({ error: 'Could not create user' }, { status: 500 });
      }
      
      authUser = newData.user;
    }

    // 5. Generate session for the user
    // We use generateLink to get a session without sending an actual email
    // This requires email auth to be enabled in Supabase!
    const { data: linkData, error: linkError } = await supabaseAdmin.auth.admin.generateLink({
      type: 'magiclink',
      email,
    });

    if (linkError) {
      console.error('Error generating link:', linkError);
      return NextResponse.json({ error: 'Could not generate session' }, { status: 500 });
    }

    // We can't directly return the session from generateLink, 
    // so we need a workaround or we can just return the user and let the client know it's success.
    // In a real production setup, it's better to implement a custom JWT minting 
    // or use Supabase's custom auth tokens if available on your plan.
    // For this free setup, we will use a workaround: we will signInWithOtp and verify it automatically,
    // OR we can just return success and the client can't easily set the cookie without the session.
    
    // Better workaround: Create a custom JWT if you can't use generateLink session directly
    // Since Next.js 15 requires awaiting cookies, this route must handle it carefully.
    
    // As a temporary fix for the API flow, we'll return a token from the authLink if available,
    // or use signInWithPassword with a generated secure password (stored in DB).
    
    // Let's use the simplest reliable method: Password auth with auto-generated secure password
    // (This ensures we get a full session object to pass to the client)
    
    const { data: sessionData, error: sessionError } = await supabaseAdmin.auth.signInWithPassword({
      email,
      password: `Tg_${user.id}_${botToken.substring(0, 10)}` // Deterministic but secret password
    });
    
    // If password login fails (first time), set the password then login
    if (sessionError) {
      await supabaseAdmin.auth.admin.updateUserById(authUser.id, {
        password: `Tg_${user.id}_${botToken.substring(0, 10)}`
      });
      
      const { data: retrySessionData, error: retryError } = await supabaseAdmin.auth.signInWithPassword({
        email,
        password: `Tg_${user.id}_${botToken.substring(0, 10)}`
      });
      
      if (retryError) {
        return NextResponse.json({ error: 'Final auth failed' }, { status: 500 });
      }
      
      return NextResponse.json({ session: retrySessionData.session, user: authUser });
    }

    return NextResponse.json({ session: sessionData.session, user: authUser });
  } catch (error) {
    console.error('Auth endpoint error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
