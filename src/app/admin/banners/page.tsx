'use client';

import { useState } from 'react';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { Plus, Edit, Trash2, GripVertical } from 'lucide-react';

export default function AdminBannersPage() {
  const [banners, setBanners] = useState([
    { id: 1, title: 'Epic Adventure Returns', content_title: 'Dune: Part Two', image_url: 'https://picsum.photos/seed/b1/800/450', active: true },
    { id: 2, title: 'Cyberpunk Horizons', content_title: 'Solo Leveling', image_url: 'https://picsum.photos/seed/b2/800/450', active: true },
    { id: 3, title: 'Summer Blockbuster', content_title: 'Deadpool 3', image_url: 'https://picsum.photos/seed/b3/800/450', active: false },
  ]);

  return (
    <div className="max-w-5xl mx-auto pb-10">
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl md:text-3xl font-black font-outfit text-white">Hero Banners</h1>
        <Button variant="primary">
          <Plus className="w-4 h-4 mr-2" />
          Add Banner
        </Button>
      </div>

      <GlassCard className="p-6">
        <p className="text-zinc-400 mb-6">Manage the featured banners that appear at the top of the home screen. Drag to reorder.</p>
        
        <div className="flex flex-col gap-4">
          {banners.map((banner, index) => (
            <div key={banner.id} className={`flex flex-col md:flex-row items-center gap-4 p-4 rounded-xl border ${banner.active ? 'bg-white/5 border-white/10' : 'bg-black/20 border-white/5 opacity-60'}`}>
              <button className="hidden md:block cursor-grab text-zinc-500 hover:text-white">
                <GripVertical className="w-5 h-5" />
              </button>
              
              <div className="w-full md:w-48 aspect-video rounded-lg overflow-hidden shrink-0 bg-zinc-800">
                <img src={banner.image_url} alt={banner.title} className="w-full h-full object-cover" />
              </div>
              
              <div className="flex-1 min-w-0 text-center md:text-left">
                <h3 className="font-bold text-white text-lg truncate">{banner.title}</h3>
                <p className="text-zinc-400 text-sm">Links to: <span className="text-zinc-300">{banner.content_title}</span></p>
              </div>

              <div className="flex items-center gap-3 w-full md:w-auto justify-center mt-2 md:mt-0">
                <label className="flex items-center gap-2 cursor-pointer mr-2">
                  <input 
                    type="checkbox" 
                    checked={banner.active}
                    onChange={() => {
                      const newBanners = [...banners];
                      newBanners[index].active = !newBanners[index].active;
                      setBanners(newBanners);
                    }}
                    className="w-4 h-4 accent-yellow-400 rounded bg-zinc-800 border-white/20"
                  />
                  <span className="text-sm text-zinc-300">Active</span>
                </label>

                <button className="p-2 rounded bg-zinc-800 text-zinc-400 hover:text-white hover:bg-zinc-700 transition-colors">
                  <Edit className="w-4 h-4" />
                </button>
                <button className="p-2 rounded bg-zinc-800 text-zinc-400 hover:text-red-400 hover:bg-red-500/10 transition-colors">
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </GlassCard>
    </div>
  );
}
