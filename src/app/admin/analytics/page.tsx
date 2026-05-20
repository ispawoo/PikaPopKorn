'use client';

import { GlassCard } from '@/components/ui/GlassCard';

export default function AdminAnalyticsPage() {
  return (
    <div className="max-w-5xl mx-auto h-[calc(100vh-120px)] flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl md:text-3xl font-black font-outfit text-white">Analytics</h1>
      </div>

      <GlassCard className="flex-1 overflow-hidden p-0 relative border-white/10">
        {process.env.NEXT_PUBLIC_UMAMI_URL && process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID ? (
          <iframe 
            src={`${process.env.NEXT_PUBLIC_UMAMI_URL}/share/${process.env.NEXT_PUBLIC_UMAMI_WEBSITE_ID}?theme=dark`}
            className="w-full h-full border-0"
            title="Umami Analytics Dashboard"
          />
        ) : (
          <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center">
            <div className="w-20 h-20 bg-yellow-400/10 rounded-full flex items-center justify-center mb-6 border border-yellow-400/20">
              <span className="text-4xl">📊</span>
            </div>
            <h2 className="text-xl font-bold text-white mb-2">Umami Analytics Not Configured</h2>
            <p className="text-zinc-400 max-w-md mb-6">
              To view detailed analytics, deploy an Umami instance and set the <code className="bg-white/10 px-1.5 py-0.5 rounded text-yellow-400 font-mono text-xs">NEXT_PUBLIC_UMAMI_URL</code> and <code className="bg-white/10 px-1.5 py-0.5 rounded text-yellow-400 font-mono text-xs">NEXT_PUBLIC_UMAMI_WEBSITE_ID</code> environment variables.
            </p>
          </div>
        )}
      </GlassCard>
    </div>
  );
}
