'use client';

import { useRouter } from 'next/navigation';
import { ArrowLeft, Shield } from 'lucide-react';
import { Button } from '@/components/ui/Button';

export default function SecurityPage() {
  const router = useRouter();

  return (
    <div className="px-4 py-6 pb-24 min-h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8 pt-safe">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-white">Security & Password</h1>
      </div>

      <div className="flex-1 flex flex-col items-center justify-center text-center">
        <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-4">
          <Shield className="w-8 h-8 text-yellow-400" />
        </div>
        <h2 className="text-xl font-bold text-white mb-2">Telegram Authentication</h2>
        <p className="text-zinc-400 max-w-xs mb-6">
          Your account is secured by Telegram. You don't need a password to access PikaPopKorn!
        </p>
        <Button onClick={() => router.back()} variant="outline">Go Back</Button>
      </div>
    </div>
  );
}
