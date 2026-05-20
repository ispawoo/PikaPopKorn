'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { GlassCard } from '@/components/ui/GlassCard';
import { Button } from '@/components/ui/Button';
import { ArrowLeft, Save, Image as ImageIcon, Link as LinkIcon } from 'lucide-react';
import { useToast } from '@/components/ui/Toast';
import { CATEGORIES } from '@/utils/constants';

const GENRES = ['Action', 'Comedy', 'Drama', 'Horror', 'Romance', 'Sci-Fi', 'Thriller', 'Fantasy', 'Adventure', 'Mystery'];

export default function AddContentPage() {
  const router = useRouter();
  const toast = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    category_id: CATEGORIES[0].slug,
    genres: [] as string[],
    poster_url: '',
    backdrop_url: '',
    trailer_url: '',
    release_year: new Date().getFullYear(),
    rating: 0,
    duration: 0,
    status: 'draft',
    is_featured: false,
    is_trending: false,
    stream_url: '',
    skip_intro_start: 0,
    skip_intro_end: 0,
  });

  const isMovie = formData.category_id === 'movies';

  const handleGenreToggle = (genre: string) => {
    setFormData(prev => ({
      ...prev,
      genres: prev.genres.includes(genre)
        ? prev.genres.filter(g => g !== genre)
        : [...prev.genres, genre]
    }));
  };

  const handleSubmit = async (e: React.FormEvent, status: 'draft' | 'published') => {
    e.preventDefault();
    if (!formData.title) return toast.error('Title is required');
    
    setIsSubmitting(true);
    try {
      // Mock submit
      await new Promise(resolve => setTimeout(resolve, 1000));
      toast.success(`Content ${status === 'published' ? 'published' : 'saved as draft'}`);
      router.push('/admin/content');
    } catch (error) {
      toast.error('Failed to save content');
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputClasses = "w-full bg-zinc-900 border border-white/10 rounded-xl px-4 py-2 text-white focus:outline-none focus:border-yellow-400 transition-colors";
  const labelClasses = "block text-sm font-medium text-zinc-400 mb-1.5";

  return (
    <div className="max-w-4xl mx-auto pb-10">
      <div className="flex items-center gap-3 mb-8">
        <button onClick={() => router.back()} className="p-2 -ml-2 rounded-full text-zinc-400 hover:text-white hover:bg-white/10 transition-colors">
          <ArrowLeft className="w-5 h-5" />
        </button>
        <h1 className="text-2xl md:text-3xl font-black font-outfit text-white">Add New Content</h1>
      </div>

      <form className="flex flex-col gap-6">
        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Basic Info</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClasses}>Title *</label>
              <input 
                type="text" 
                value={formData.title}
                onChange={e => setFormData({...formData, title: e.target.value})}
                className={inputClasses}
                placeholder="e.g. Interstellar"
                required
              />
            </div>
            
            <div>
              <label className={labelClasses}>Description</label>
              <textarea 
                value={formData.description}
                onChange={e => setFormData({...formData, description: e.target.value})}
                className={`${inputClasses} min-h-[100px] resize-y`}
                placeholder="Synopsis..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className={labelClasses}>Category *</label>
                <select 
                  value={formData.category_id}
                  onChange={e => setFormData({...formData, category_id: e.target.value})}
                  className={inputClasses}
                >
                  {CATEGORIES.map(cat => (
                    <option key={cat.slug} value={cat.slug}>{cat.name}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className={labelClasses}>Release Year</label>
                <input 
                  type="number" 
                  value={formData.release_year}
                  onChange={e => setFormData({...formData, release_year: parseInt(e.target.value)})}
                  className={inputClasses}
                  min="1900"
                  max="2100"
                />
              </div>
            </div>

            <div>
              <label className={labelClasses}>Genres</label>
              <div className="flex flex-wrap gap-2 mt-2">
                {GENRES.map(genre => (
                  <button
                    key={genre}
                    type="button"
                    onClick={() => handleGenreToggle(genre)}
                    className={`px-3 py-1.5 rounded-lg text-sm transition-colors border ${
                      formData.genres.includes(genre)
                        ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400 font-medium'
                        : 'bg-zinc-900 border-white/10 text-zinc-400 hover:text-white hover:border-white/20'
                    }`}
                  >
                    {genre}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Media Assets</h2>
          <div className="flex flex-col gap-4">
            <div>
              <label className={labelClasses}>Poster URL (Portrait)</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input 
                    type="url" 
                    value={formData.poster_url}
                    onChange={e => setFormData({...formData, poster_url: e.target.value})}
                    className={`${inputClasses} pl-10`}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>

            <div>
              <label className={labelClasses}>Backdrop URL (Landscape)</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <ImageIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input 
                    type="url" 
                    value={formData.backdrop_url}
                    onChange={e => setFormData({...formData, backdrop_url: e.target.value})}
                    className={`${inputClasses} pl-10`}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
            
            <div>
              <label className={labelClasses}>Trailer URL (YouTube/MP4)</label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input 
                    type="url" 
                    value={formData.trailer_url}
                    onChange={e => setFormData({...formData, trailer_url: e.target.value})}
                    className={`${inputClasses} pl-10`}
                    placeholder="https://..."
                  />
                </div>
              </div>
            </div>
          </div>
        </GlassCard>

        <GlassCard className="p-6">
          <h2 className="text-lg font-bold text-white mb-4">Details & Flags</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClasses}>Rating (0-10)</label>
                <div className="flex items-center gap-3">
                  <input 
                    type="range" 
                    min="0" max="10" step="0.1"
                    value={formData.rating}
                    onChange={e => setFormData({...formData, rating: parseFloat(e.target.value)})}
                    className="flex-1 accent-yellow-400"
                  />
                  <span className="w-8 text-right font-medium text-white">{formData.rating}</span>
                </div>
              </div>

              {isMovie && (
                <div>
                  <label className={labelClasses}>Duration (minutes)</label>
                  <input 
                    type="number" 
                    value={formData.duration}
                    onChange={e => setFormData({...formData, duration: parseInt(e.target.value)})}
                    className={inputClasses}
                    min="0"
                  />
                </div>
              )}
            </div>

            <div className="flex flex-col gap-4">
              <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.is_featured}
                  onChange={e => setFormData({...formData, is_featured: e.target.checked})}
                  className="w-5 h-5 accent-yellow-400 rounded bg-zinc-800 border-white/20"
                />
                <div>
                  <div className="font-medium text-white">Featured Content</div>
                  <div className="text-xs text-zinc-400">Show in large hero banners</div>
                </div>
              </label>

              <label className="flex items-center gap-3 p-3 rounded-xl bg-zinc-900 border border-white/5 cursor-pointer hover:bg-white/5 transition-colors">
                <input 
                  type="checkbox" 
                  checked={formData.is_trending}
                  onChange={e => setFormData({...formData, is_trending: e.target.checked})}
                  className="w-5 h-5 accent-yellow-400 rounded bg-zinc-800 border-white/20"
                />
                <div>
                  <div className="font-medium text-white">Trending</div>
                  <div className="text-xs text-zinc-400">Show in trending section</div>
                </div>
              </label>
            </div>
          </div>
        </GlassCard>

        {isMovie && (
          <GlassCard className="p-6">
            <h2 className="text-lg font-bold text-white mb-4">Movie Stream Setup</h2>
            <div className="flex flex-col gap-4">
              <div>
                <label className={labelClasses}>HLS Stream URL (.m3u8) *</label>
                <div className="relative flex-1">
                  <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500" />
                  <input 
                    type="url" 
                    value={formData.stream_url}
                    onChange={e => setFormData({...formData, stream_url: e.target.value})}
                    className={`${inputClasses} pl-10`}
                    placeholder="https://.../master.m3u8"
                    required={isMovie}
                  />
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className={labelClasses}>Skip Intro Start (sec)</label>
                  <input 
                    type="number" 
                    value={formData.skip_intro_start}
                    onChange={e => setFormData({...formData, skip_intro_start: parseInt(e.target.value)})}
                    className={inputClasses}
                    min="0"
                  />
                </div>
                <div>
                  <label className={labelClasses}>Skip Intro End (sec)</label>
                  <input 
                    type="number" 
                    value={formData.skip_intro_end}
                    onChange={e => setFormData({...formData, skip_intro_end: parseInt(e.target.value)})}
                    className={inputClasses}
                    min="0"
                  />
                </div>
              </div>
            </div>
          </GlassCard>
        )}

        <div className="flex gap-4 justify-end sticky bottom-4 z-10 p-4 bg-black/80 backdrop-blur-md rounded-2xl border border-white/10">
          <Button type="button" variant="ghost" onClick={() => router.back()}>Cancel</Button>
          <Button 
            type="button" 
            variant="outline" 
            isLoading={isSubmitting && formData.status === 'draft'}
            onClick={(e) => handleSubmit(e, 'draft')}
          >
            Save Draft
          </Button>
          <Button 
            type="submit" 
            variant="primary"
            isLoading={isSubmitting && formData.status === 'published'}
            onClick={(e) => handleSubmit(e, 'published')}
          >
            <Save className="w-4 h-4 mr-2" />
            Publish Content
          </Button>
        </div>
      </form>
    </div>
  );
}
