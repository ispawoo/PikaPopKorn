'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Trash2, User, Bell, Shield, HelpCircle, ChevronRight, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { useWatchHistory } from '@/hooks/useWatchHistory';
import { useToast } from '@/components/ui/Toast';
import Link from 'next/link';

export default function SettingsPage() {
  const router = useRouter();
  const { clearHistory } = useWatchHistory();
  const toast = useToast();
  
  const [settings, setSettings] = useState({
    autoplayNext: true,
    hdStreaming: true,
    notifications: true,
    downloadsOverWifi: true,
    subtitleLang: 'en',
  });

  const toggleSetting = (key: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key as keyof typeof settings]
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
    <div className="px-4 py-6 pb-8 min-h-full max-w-md mx-auto w-full">
      <div className="flex items-center gap-4 mb-8 sticky top-0 bg-black/80 backdrop-blur-md py-4 z-10 -mt-6">
        <button onClick={() => router.back()} className="text-zinc-300 hover:text-white">
          <ArrowLeft className="w-6 h-6" />
        </button>
        <h1 className="text-xl font-bold font-outfit text-white">App Settings</h1>
      </div>

      <div className="flex flex-col gap-8">
        <section>
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">Account</h2>
          <div className="flex flex-col gap-2">
            <Link href="/profile/edit">
              <div className="flex items-center justify-between p-4 bg-zinc-900/80 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-colors">
                <div className="flex items-center gap-4">
                  <User className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium text-white">Edit Profile</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500" />
              </div>
            </Link>
            <Link href="/profile/security">
              <div className="flex items-center justify-between p-4 bg-zinc-900/80 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <Shield className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium text-white">Security & Password</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500" />
              </div>
            </Link>
            <Link href="/profile/notifications">
              <div className="flex items-center justify-between p-4 bg-zinc-900/80 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-colors cursor-pointer">
                <div className="flex items-center gap-4">
                  <Bell className="w-5 h-5 text-zinc-400" />
                  <span className="font-medium text-white">Notifications</span>
                </div>
                <ChevronRight className="w-5 h-5 text-zinc-500" />
              </div>
            </Link>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">Preferences</h2>
          <GlassCard className="flex flex-col divide-y divide-white/5 rounded-2xl overflow-hidden bg-zinc-900/80 border border-white/5">
            <div className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors">
              <div>
                <div className="font-medium text-white">Autoplay Next Episode</div>
                <div className="text-xs text-zinc-400 mt-0.5">Start next episode automatically</div>
              </div>
              <button 
                onClick={() => toggleSetting('autoplayNext')}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.autoplayNext ? 'bg-yellow-400' : 'bg-zinc-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.autoplayNext ? 'translate-x-[26px]' : 'translate-x-0.5'}`} />
              </button>
            </div>
            
            <div className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors">
              <div>
                <div className="font-medium text-white">HD Streaming</div>
                <div className="text-xs text-zinc-400 mt-0.5">Stream in highest quality</div>
              </div>
              <button 
                onClick={() => toggleSetting('hdStreaming')}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.hdStreaming ? 'bg-yellow-400' : 'bg-zinc-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.hdStreaming ? 'translate-x-[26px]' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors">
              <div>
                <div className="font-medium text-white">Downloads Over Wi-Fi Only</div>
                <div className="text-xs text-zinc-400 mt-0.5">Save mobile data</div>
              </div>
              <button 
                onClick={() => toggleSetting('downloadsOverWifi')}
                className={`w-12 h-6 rounded-full transition-colors relative ${settings.downloadsOverWifi ? 'bg-yellow-400' : 'bg-zinc-700'}`}
              >
                <div className={`w-5 h-5 bg-white rounded-full absolute top-0.5 transition-transform ${settings.downloadsOverWifi ? 'translate-x-[26px]' : 'translate-x-0.5'}`} />
              </button>
            </div>

            <div className="flex items-center justify-between p-4 hover:bg-zinc-800/50 transition-colors">
              <div className="font-medium text-white">Subtitle Language</div>
              <select 
                value={settings.subtitleLang}
                onChange={(e) => setSettings({...settings, subtitleLang: e.target.value})}
                className="bg-zinc-800 text-white border border-white/10 rounded-lg px-3 py-1.5 text-sm outline-none focus:border-yellow-400 transition-colors"
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
          <h2 className="text-sm font-bold text-zinc-500 uppercase tracking-wider mb-4 px-2">Support & About</h2>
          <div className="flex flex-col gap-2">
            <div className="flex items-center justify-between p-4 bg-zinc-900/80 border border-white/5 rounded-2xl hover:bg-zinc-800 transition-colors cursor-pointer">
              <div className="flex items-center gap-4">
                <HelpCircle className="w-5 h-5 text-zinc-400" />
                <span className="font-medium text-white">Help Center</span>
              </div>
              <ChevronRight className="w-5 h-5 text-zinc-500" />
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-sm font-bold text-red-500/80 uppercase tracking-wider mb-4 px-2">Danger Zone</h2>
          <div className="flex flex-col gap-2">
            <Button 
              variant="outline" 
              className="w-full justify-start p-4 h-auto bg-zinc-900/80 border-white/5 rounded-2xl hover:bg-zinc-800 text-white" 
              onClick={handleClearCache}
            >
              <Download className="w-5 h-5 mr-4 text-zinc-400" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Clear Local Cache</span>
                <span className="text-xs text-zinc-500">Free up space on device</span>
              </div>
            </Button>
            
            <Button 
              variant="outline" 
              className="w-full justify-start p-4 h-auto bg-red-500/5 border-red-500/20 rounded-2xl hover:bg-red-500/10 text-red-400" 
              onClick={handleClearHistory}
            >
              <Trash2 className="w-5 h-5 mr-4" />
              <div className="flex flex-col items-start">
                <span className="font-medium">Clear Watch History</span>
                <span className="text-xs text-red-400/70">Remove all watch progress</span>
              </div>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}
