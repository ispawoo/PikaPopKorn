'use client';

import { use } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Plus, Edit, Trash2 } from 'lucide-react';
import Link from 'next/link';

interface EpisodesPageProps {
  params: Promise<{ contentId: string }>;
}

export default function AdminEpisodesPage({ params }: EpisodesPageProps) {
  const { contentId } = use(params);

  // Mock data
  const episodes = Array.from({ length: 12 }).map((_, i) => ({
    id: `ep-${i}`,
    season_number: 1,
    episode_number: i + 1,
    title: `Episode ${i + 1}`,
    duration: 1420,
    status: 'Published'
  }));

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-8">
        <div className="flex items-center gap-3">
          <Link href="/admin/content" className="p-2 -ml-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
            <ArrowLeft className="w-5 h-5" />
          </Link>
          <h1 className="text-2xl md:text-3xl font-black font-outfit text-white">Episodes</h1>
        </div>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Episode
        </Button>
      </div>

      <GlassCard className="p-4 md:p-6 border-white/5">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-bold text-white">Season 1</h2>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
            <thead className="text-zinc-400 border-b border-white/10">
              <tr>
                <th className="pb-3 font-medium w-16">Ep</th>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Duration</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {episodes.map((ep) => (
                <tr key={ep.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-3 font-medium text-zinc-400">{ep.episode_number}</td>
                  <td className="py-3 font-medium text-white">{ep.title}</td>
                  <td className="py-3">{Math.floor(ep.duration / 60)}m {ep.duration % 60}s</td>
                  <td className="py-3">
                    <span className="inline-flex items-center px-2 py-0.5 rounded text-xs font-medium bg-green-500/10 text-green-400">
                      {ep.status}
                    </span>
                  </td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-2">
                      <button className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                        <Edit className="w-4 h-4" />
                      </button>
                      <button className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
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
