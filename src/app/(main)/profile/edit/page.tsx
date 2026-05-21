'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import { createClient } from '@/lib/supabase/client';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ArrowLeft, Save, Loader2 } from 'lucide-react';
import Image from 'next/image';

const supabase = createClient();

export default function EditProfilePage() {
  const router = useRouter();
  const { user, isLoading: authLoading } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);
  
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [avatarUrl, setAvatarUrl] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      setFirstName(user.first_name || '');
      setLastName(user.last_name || '');
      setAvatarUrl(user.avatar_url || '');
    }
  }, [user]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error: updateError } = await supabase
        .from('users')
        // @ts-ignore
        .update({
          first_name: firstName,
          last_name: lastName,
          avatar_url: avatarUrl,
        } as any)
        .eq('id', user.id)
        .select()
        .single();
        
      if (updateError) throw updateError;
      
      if (data) {
        setUser(data);
        router.push('/profile');
      }
    } catch (err: any) {
      setError(err.message || 'Failed to update profile');
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) {
    return <div className="flex h-screen items-center justify-center"><Loader2 className="w-8 h-8 animate-spin text-yellow-400" /></div>;
  }

  if (!user) {
    return (
      <div className="flex h-screen items-center justify-center flex-col text-center p-4">
        <h2 className="text-xl font-bold text-white mb-2">Not Logged In</h2>
        <p className="text-zinc-400 mb-4">You need to be logged in to edit your profile.</p>
        <Button onClick={() => router.push('/')} variant="outline">Go Home</Button>
      </div>
    );
  }

  return (
    <div className="px-4 py-6 pb-24 min-h-full flex flex-col">
      <div className="flex items-center gap-4 mb-8 pt-safe">
        <button onClick={() => router.back()} className="w-10 h-10 flex items-center justify-center rounded-full bg-white/5 text-white hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl font-bold text-white">Edit Profile</h1>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-6 flex-1">
        <div className="flex flex-col items-center mb-4">
          <div className="w-24 h-24 rounded-full bg-zinc-800 overflow-hidden relative border-2 border-white/10 shrink-0 mb-4">
            {avatarUrl || user?.avatar_url ? (
              <Image src={avatarUrl || user.avatar_url || ''} alt={firstName || 'User'} fill className="object-cover" />
            ) : (
              <div className="absolute inset-0 flex items-center justify-center text-4xl font-bold text-zinc-500">
                {(firstName || user?.first_name || 'U').charAt(0)}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Username (Telegram)</label>
            <Input 
              value={`@${user.username || 'user'}`} 
              disabled 
              className="bg-zinc-900/50 text-zinc-500 border-zinc-800"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">First Name</label>
            <Input 
              value={firstName} 
              onChange={(e: any) => setFirstName(e.target.value)} 
              placeholder="First Name"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Last Name</label>
            <Input 
              value={lastName} 
              onChange={(e: any) => setLastName(e.target.value)} 
              placeholder="Last Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Avatar URL</label>
            <Input 
              value={avatarUrl} 
              onChange={(e: any) => setAvatarUrl(e.target.value)} 
              placeholder="https://example.com/avatar.jpg"
              type="url"
            />
          </div>
        </div>

        {error && (
          <div className="p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
            {error}
          </div>
        )}

        <div className="mt-auto pt-4">
          <Button 
            type="submit" 
            variant="primary" 
            className="w-full bg-yellow-400 text-black hover:bg-yellow-500"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-5 h-5 animate-spin mx-auto" />
            ) : (
              <>
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </>
            )}
          </Button>
        </div>
      </form>
    </div>
  );
}
