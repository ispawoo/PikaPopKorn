'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Search, Crown, ShieldAlert } from 'lucide-react';

export default function AdminUsersPage() {
  const users = [
    { id: 1, name: 'Yasir Ispawoo', username: 'ispawoo', telegram_id: '123456789', is_premium: true, is_admin: true, joined: '2 days ago' },
    { id: 2, name: 'John Doe', username: 'johndoe', telegram_id: '987654321', is_premium: false, is_admin: false, joined: '5 days ago' },
    { id: 3, name: 'Alice Smith', username: 'alice', telegram_id: '555555555', is_premium: true, is_admin: false, joined: '1 week ago' },
  ];

  return (
    <div className="max-w-6xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-black font-outfit text-white">Users</h1>
      </div>

      <GlassCard className="p-4 md:p-6 border-white/5">
        <div className="relative flex-1 mb-6 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
          <input 
            type="text" 
            placeholder="Search users..." 
            className="w-full bg-zinc-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[800px]">
            <thead className="text-zinc-400 border-b border-white/10">
              <tr>
                <th className="pb-3 font-medium">Name</th>
                <th className="pb-3 font-medium">Username</th>
                <th className="pb-3 font-medium">Telegram ID</th>
                <th className="pb-3 font-medium">Joined</th>
                <th className="pb-3 font-medium text-center">Premium</th>
                <th className="pb-3 font-medium text-center">Admin</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {users.map((user) => (
                <tr key={user.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-3 flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center font-bold text-xs text-white">
                      {user.name.charAt(0)}
                    </div>
                    <span className="font-medium text-white">{user.name}</span>
                  </td>
                  <td className="py-3 text-zinc-400">@{user.username}</td>
                  <td className="py-3 font-mono text-xs">{user.telegram_id}</td>
                  <td className="py-3">{user.joined}</td>
                  <td className="py-3 text-center">
                    <button className={`p-1.5 rounded-full transition-colors ${user.is_premium ? 'text-yellow-400 hover:bg-yellow-400/10' : 'text-zinc-600 hover:text-zinc-400 hover:bg-white/5'}`}>
                      <Crown className="w-5 h-5" />
                    </button>
                  </td>
                  <td className="py-3 text-center">
                    <button className={`p-1.5 rounded-full transition-colors ${user.is_admin ? 'text-red-400 hover:bg-red-400/10' : 'text-zinc-600 hover:text-zinc-400 hover:bg-white/5'}`}>
                      <ShieldAlert className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </GlassCard>
    </div>
  );
}
