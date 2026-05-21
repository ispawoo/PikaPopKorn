'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { useAuth } from '@/hooks/useAuth';
import { Popcorn } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading } = useAuth();

  // If already authenticated, redirect to home
  if (isAuthenticated && !isLoading) {
    router.push('/');
    return null;
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 -mt-20">
      <div className="w-16 h-16 bg-yellow-400/20 rounded-full flex items-center justify-center mb-6">
        <Popcorn className="w-8 h-8 text-yellow-400" />
      </div>
      <h1 className="text-3xl font-black font-outfit text-white mb-2">PikaPopKorn</h1>
      <p className="text-zinc-400 text-center max-w-sm mb-8">
        Your ultimate entertainment hub. To access all features, please open this app within Telegram.
      </p>

      <div className="bg-zinc-900/80 p-6 rounded-2xl border border-white/5 w-full max-w-sm text-center">
        <h2 className="text-lg font-bold text-white mb-4">Telegram Auto-Login</h2>
        <p className="text-sm text-zinc-400 mb-6">
          Authentication is securely handled by Telegram. No passwords required!
        </p>
        
        {process.env.NODE_ENV === 'development' ? (
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => router.push('/')}
          >
            Continue as Test User
          </Button>
        ) : (
          <Button 
            className="w-full bg-blue-500 hover:bg-blue-600 text-white"
            onClick={() => window.location.href = 'https://t.me/pikapopkorn_bot'}
          >
            Open in Telegram
          </Button>
        )}
      </div>
    </div>
  );
}
