'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/hooks/useAuth';
import { useAuthStore } from '@/stores/authStore';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Shield, Loader2 } from 'lucide-react';

export default function AdminLoginPage() {
  const router = useRouter();
  const { user } = useAuth();
  const setUser = useAuthStore((state) => state.setUser);
  
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/admin-login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, userId: user?.id }),
      });

      if (res.ok) {
        // Set local persistent token so refresh doesn't kick them out
        localStorage.setItem('admin_auth_token', 'true');
        // Update local state to reflect admin status
        setUser(user ? { ...user, is_admin: true } : { 
          id: 'admin_mock_id', 
          username: 'admin', 
          first_name: 'Admin', 
          is_admin: true 
        } as any);
        router.push('/admin');
      } else {
        const data = await res.json();
        setError(data.error || 'Login failed');
      }
    } catch (err) {
      setError('An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4">
      <div className="w-full max-w-md bg-zinc-900/50 p-8 rounded-3xl border border-white/5 backdrop-blur-md">
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mb-4">
            <Shield className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-white font-outfit">Admin Access</h1>
          <p className="text-zinc-400 mt-2 text-center text-sm">
            Enter your credentials to access the PikaPopKorn control panel.
          </p>
        </div>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Username</label>
            <Input 
              value={username} 
              onChange={(e: any) => setUsername(e.target.value)} 
              placeholder="admin"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-zinc-400 mb-1">Password</label>
            <Input 
              type="password"
              value={password} 
              onChange={(e: any) => setPassword(e.target.value)} 
              placeholder="••••••••"
              required
            />
          </div>

          {error && (
            <div className="text-sm text-red-400 bg-red-500/10 border border-red-500/20 p-3 rounded-lg text-center">
              {error}
            </div>
          )}

          <Button 
            type="submit" 
            variant="primary" 
            className="w-full mt-4 bg-red-500 text-white hover:bg-red-600"
            disabled={isLoading}
          >
            {isLoading ? <Loader2 className="w-5 h-5 animate-spin mx-auto" /> : 'Login to Dashboard'}
          </Button>
          
          <div className="text-center mt-4">
            <span className="text-xs text-zinc-500">Hint: admin / admin123</span>
          </div>
        </form>
      </div>
    </div>
  );
}
