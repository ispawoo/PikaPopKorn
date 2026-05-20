'use client';

import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, CheckCircle2 } from 'lucide-react';

export default function AdminSubtitlesPage() {
  const subtitles = [
    { id: 1, content: 'Solo Leveling - E1', language: 'English', label: 'English (US)', is_default: true },
    { id: 2, content: 'Solo Leveling - E1', language: 'Spanish', label: 'Español', is_default: false },
    { id: 3, content: 'Dune: Part Two', language: 'English', label: 'English (CC)', is_default: true },
  ];

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-black font-outfit text-white">Subtitles</h1>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Subtitle
        </Button>
      </div>

      <GlassCard className="p-4 md:p-6 border-white/5">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
            <thead className="text-zinc-400 border-b border-white/10">
              <tr>
                <th className="pb-3 font-medium">Content / Episode</th>
                <th className="pb-3 font-medium">Language</th>
                <th className="pb-3 font-medium">Label</th>
                <th className="pb-3 font-medium">Default</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {subtitles.map((sub) => (
                <tr key={sub.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-3 font-medium text-white">{sub.content}</td>
                  <td className="py-3">{sub.language}</td>
                  <td className="py-3">{sub.label}</td>
                  <td className="py-3">
                    {sub.is_default ? <CheckCircle2 className="w-5 h-5 text-green-400" /> : '-'}
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
