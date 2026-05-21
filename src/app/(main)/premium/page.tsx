'use client';

import { useRouter } from 'next/navigation';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Check, Crown } from 'lucide-react';

export default function PremiumPage() {
  const router = useRouter();

  return (
    <div className="min-h-screen bg-black text-white px-4 py-6 pb-24 flex flex-col items-center">
      <div className="w-full max-w-md flex items-center gap-4 mb-8 pt-safe">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold font-outfit">Go Premium</h1>
      </div>

      <div className="w-full max-w-md bg-gradient-to-br from-yellow-400/20 to-yellow-600/5 p-8 rounded-3xl border border-yellow-400/20 mb-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 p-6 opacity-10">
          <Crown className="w-32 h-32 text-yellow-400" />
        </div>
        
        <div className="relative z-10">
          <div className="w-12 h-12 bg-yellow-400 rounded-xl flex items-center justify-center mb-6">
            <Crown className="w-6 h-6 text-black" />
          </div>
          <h2 className="text-3xl font-black font-outfit mb-2">VIP Access</h2>
          <p className="text-yellow-400 font-medium mb-6">Unlock all premium features</p>
          
          <div className="flex items-baseline gap-1 mb-8">
            <span className="text-4xl font-black">$4.99</span>
            <span className="text-zinc-400">/month</span>
          </div>

          <ul className="flex flex-col gap-4 mb-8">
            {[
              'Ad-free experience',
              '4K Ultra HD streaming',
              'Download for offline viewing',
              'Early access to new episodes',
              'Premium VIP badge'
            ].map((feature, i) => (
              <li key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-yellow-400 flex items-center justify-center shrink-0">
                  <Check className="w-3 h-3 text-black font-bold" />
                </div>
                <span className="text-zinc-200">{feature}</span>
              </li>
            ))}
          </ul>

          <Button className="w-full bg-yellow-400 hover:bg-yellow-500 text-black font-bold py-6 text-lg rounded-2xl">
            Upgrade Now
          </Button>
        </div>
      </div>
      
      <p className="text-xs text-zinc-500 text-center max-w-xs">
        Subscription automatically renews unless auto-renew is turned off at least 24-hours before the end of the current period.
      </p>
    </div>
  );
}
