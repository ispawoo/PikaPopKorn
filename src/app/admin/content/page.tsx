'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Plus, Search, Edit, Trash2, Filter } from 'lucide-react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';

export default function AdminContentPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const mockContent = Array.from({ length: 10 }).map((_, i) => ({
    id: `mock-${i}`,
    title: `Sample Content ${i + 1}`,
    category: i % 2 === 0 ? 'Movies' : 'Anime',
    status: i === 0 ? 'Draft' : 'Published',
    rating: (7 + Math.random() * 2).toFixed(1),
    views: Math.floor(Math.random() * 500) + 'K',
    poster: `https://picsum.photos/seed/admin${i}/100/150`
  }));

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
        <h1 className="text-2xl md:text-3xl font-black font-outfit text-white">Manage Content</h1>
        <Link href="/admin/content/new">
          <Button variant="primary" className="whitespace-nowrap">
            <Plus className="w-4 h-4 mr-2" />
            Add Content
          </Button>
        </Link>
      </div>

      <GlassCard className="p-4 md:p-6 border-white/5">
        <div className="flex flex-col md:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-400" />
            <input 
              type="text" 
              placeholder="Search content..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full bg-zinc-900 border border-white/10 rounded-xl py-2 pl-10 pr-4 text-white focus:outline-none focus:border-yellow-400 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            <select className="bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-yellow-400">
              <option value="">All Categories</option>
              <option value="movies">Movies</option>
              <option value="anime">Anime</option>
            </select>
            <button className="bg-zinc-900 border border-white/10 rounded-xl p-2 text-zinc-400 hover:text-white transition-colors">
              <Filter className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm whitespace-nowrap min-w-[600px]">
            <thead className="text-zinc-400 border-b border-white/10">
              <tr>
                <th className="pb-3 font-medium w-16">Poster</th>
                <th className="pb-3 font-medium">Title</th>
                <th className="pb-3 font-medium">Category</th>
                <th className="pb-3 font-medium">Status</th>
                <th className="pb-3 font-medium">Rating</th>
                <th className="pb-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5 text-zinc-300">
              {mockContent.map((item) => (
                <tr key={item.id} className="hover:bg-white/5 transition-colors group">
                  <td className="py-3">
                    <img src={item.poster} alt="" className="w-10 h-14 object-cover rounded bg-zinc-800" />
                  </td>
                  <td className="py-3 font-medium text-white">{item.title}</td>
                  <td className="py-3">{item.category}</td>
                  <td className="py-3">
                    <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                      item.status === 'Published' ? 'bg-green-500/10 text-green-400' : 'bg-yellow-500/10 text-yellow-400'
                    }`}>
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3">{item.rating}</td>
                  <td className="py-3">
                    <div className="flex items-center justify-end gap-2">
                      <Link href={`/admin/content/${item.id}/edit`}>
                        <button className="p-1.5 rounded bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                          <Edit className="w-4 h-4" />
                        </button>
                      </Link>
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
        
        <div className="flex items-center justify-between mt-6 text-sm text-zinc-400">
          <span>Showing 1 to 10 of 1,248 entries</span>
          <div className="flex gap-1">
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5 disabled:opacity-50" disabled>Prev</button>
            <button className="px-3 py-1 rounded bg-yellow-400 text-black font-medium">1</button>
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5">2</button>
            <button className="px-3 py-1 rounded border border-white/10 hover:bg-white/5">Next</button>
          </div>
        </div>
      </GlassCard>
    </div>
  );
}
