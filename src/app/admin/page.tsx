'use client';

import { Users, Film, Play, Activity } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const stats = [
    { label: 'Total Content', value: '1,248', icon: Film, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Total Users', value: '45.2K', icon: Users, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'Total Views', value: '2.4M', icon: Play, color: 'text-yellow-400', bg: 'bg-yellow-400/10' },
    { label: 'Active Today', value: '3,842', icon: Activity, color: 'text-purple-400', bg: 'bg-purple-400/10' },
  ];

  const recentContent = [
    { id: 1, title: 'Solo Leveling', type: 'Anime', views: '124K', status: 'Published' },
    { id: 2, title: 'Dune: Part Two', type: 'Movie', views: '89K', status: 'Published' },
    { id: 3, title: 'Shogun', type: 'Web Series', views: '65K', status: 'Published' },
    { id: 4, title: 'Untitled Project', type: 'Short Drama', views: '-', status: 'Draft' },
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-black font-outfit text-white">Dashboard Overview</h1>
        <div className="flex gap-2">
          <Link href="/admin/content/new" className="bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-lg font-medium transition-colors text-sm">
            Add Content
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {stats.map((stat, i) => (
          <GlassCard key={i} className="p-6 flex items-center gap-4 border-white/5">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center ${stat.bg} ${stat.color}`}>
              <stat.icon className="w-6 h-6" />
            </div>
            <div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm font-medium text-zinc-400">{stat.label}</div>
            </div>
          </GlassCard>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <GlassCard className="lg:col-span-2 p-6 border-white/5">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-bold text-white font-outfit">Recently Added</h2>
            <Link href="/admin/content" className="text-sm text-yellow-400 hover:underline">View All</Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="text-zinc-400 border-b border-white/10">
                <tr>
                  <th className="pb-3 font-medium">Title</th>
                  <th className="pb-3 font-medium">Type</th>
                  <th className="pb-3 font-medium">Views</th>
                  <th className="pb-3 font-medium">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5 text-zinc-300">
                {recentContent.map((item) => (
                  <tr key={item.id}>
                    <td className="py-3 font-medium text-white">{item.title}</td>
                    <td className="py-3">{item.type}</td>
                    <td className="py-3">{item.views}</td>
                    <td className="py-3">
                      <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                        item.status === 'Published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                      }`}>
                        {item.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </GlassCard>

        <GlassCard className="p-6 border-white/5 flex flex-col justify-center items-center text-center">
          <div className="w-16 h-16 rounded-full bg-yellow-400/10 flex items-center justify-center mb-4 text-yellow-400">
            <Activity className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-white mb-2">Detailed Analytics</h3>
          <p className="text-zinc-400 text-sm mb-6">View comprehensive statistics and user behavior via Umami dashboard.</p>
          <Link href="/admin/analytics" className="w-full bg-yellow-400 text-black py-2.5 rounded-lg font-medium hover:bg-yellow-500 transition-colors">
            Open Analytics
          </Link>
        </GlassCard>
      </div>
    </div>
  );
}
