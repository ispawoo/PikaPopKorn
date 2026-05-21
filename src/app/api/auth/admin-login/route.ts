import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export async function POST(request: Request) {
  try {
    const { username, password, userId } = await request.json();

    if (username === 'admin' && password === 'admin123') {
      if (userId) {
        const supabaseAdmin = createClient(
          process.env.NEXT_PUBLIC_SUPABASE_URL!,
          process.env.SUPABASE_SERVICE_ROLE_KEY!
        );
        
        // Elevate the current user to admin
        await supabaseAdmin
          .from('users')
          .update({ is_admin: true })
          .eq('id', userId);
          
        return NextResponse.json({ success: true });
      }
      return NextResponse.json({ error: 'User ID missing' }, { status: 400 });
    }

    return NextResponse.json({ error: 'Invalid credentials' }, { status: 401 });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
