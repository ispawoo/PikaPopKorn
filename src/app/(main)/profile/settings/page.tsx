'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWatchHistory } from '@/hooks/useWatchHistory';
import { useToast } from '@/components/ui/Toast';

export default function SettingsPage() {
  const router = useRouter();
  const { clearHistory } = useWatchHistory();
  const toast = useToast();
  
  const [settings, setSettings] = useState({
    autoplayNext: true,
    hdStreaming: true,
    notifications: false,
    subtitleLang: 'en',
    playbackSpeed: 1,
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
    toast.success('Setting updated');
  };

  const handleClearCache = () => {
    localStorage.clear();
    toast.success('Local cache cleared');
  };

  const handleClearHistory = () => {
    if (confirm('Are you sure? This cannot be undone.')) {
      clearHistory();
      toast.success('History cleared');
    }
  };

  return (
    <div className="px-4 py-6 pb-8 min-h-full">
      <div className="flex items-center gap-3 mb-6">
        <button onClick={() => router.back()} className="p-2 rounded-full bg-white/5 text-white hover:bg-white/10">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold font-outfit text-white">Settings</h1>
      </div>

      <div className="flex flex-col gap-6">
        <section>
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3 px-2">Playback</h2>
          <GlassCard className="flex flex-col divide-y divide-white/5">
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-white">Autoplay next episode</div>
                <div className="text-xs text-zinc-400 mt-0.5">Automatically play the next episode when current finishes</div>
              </div>
              <button 
                onClick={() => toggleSetting('autoplayNext')}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoplayNext ? 'bg-yellow-400' : 'bg-zinc-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.autoplayNext ? 'translate-x-6.5 left-0.5' : 'translate-x-0.5'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4">
              <div>
                <div className="font-medium text-white">HD Streaming</div>
                <div className="text-xs text-zinc-400 mt-0.5">Default to highest quality when available</div>
              </div>
              <button 
                onClick={() => toggleSetting('hdStreaming')}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.hdStreaming ? 'bg-yellow-400' : 'bg-zinc-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.hdStreaming ? 'translate-x-6.5 left-0.5' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4">
              <div className="font-medium text-white">Default Subtitle</div>
              <select 
                value={settings.subtitleLang}
                onChange={(e) => setSettings({...settings, subtitleLang: e.target.value})}
                className="bg-zinc-800 text-white border border-white/10 rounded px-2 py-1 text-sm outline-none"
              >
                <option value="none">Off</option>
                <option value="en">English</option>
                <option value="es">Spanish</option>
                <option value="fr">French</option>
              </select>
            </div>
          </GlassCard>
        </section>

        <section>
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-3 px-2">Danger Zone</h2>
          <GlassCard className="flex flex-col divide-y divide-white/5 border-red-500/20">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 sm:gap-0">
              <div>
                <div className="font-medium text-white">Clear Watch History</div>
                <div className="text-xs text-zinc-400 mt-0.5">Remove all your watched progress</div>
              </div>
              <Button variant="outline" size="sm" className="text-red-400 border-red-500/30 hover:bg-red-500/10" onClick={handleClearHistory}>
                <Trash2 className="w-4 h-4 mr-2" />
                Clear History
              </Button>
            </div>

            <div className="flex flex-col sm:flex-row sm:items-center justify-between p-4 gap-3 sm:gap-0">
              <div>
                <div className="font-medium text-white">Clear Local Cache</div>
                <div className="text-xs text-zinc-400 mt-0.5">Free up space on your device</div>
              </div>
              <Button variant="outline" size="sm" className="text-white border-white/20" onClick={handleClearCache}>
                Clear Cache
              </Button>
            </div>
          </GlassCard>
        </section>
      </div>
    </div>
  );
}
