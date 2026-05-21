import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { username, password, userId } = await request.json();

    if (username === 'admin' && password === 'admin123') {
      // If there's a user ID and we have Supabase keys, elevate them
      if (userId && process.env.SUPABASE_SERVICE_ROLE_KEY) {
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        
        await supabaseAdmin
          .from('users')
          .update({ is_admin: true })
          .eq('id', userId);
      }
      
      // Always succeed for admin/admin123 regardless of Supabase presence or Telegram user
      return NextResponse.json({ success: true });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    console.error('Admin login error:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
