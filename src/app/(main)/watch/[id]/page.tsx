'use client';

import { use } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import dynamic from 'next/dynamic';
import { AuthGuard } from '@/components/auth/AuthGuard';

const VideoPlayer = dynamic(() => import('@/components/player/VideoPlayer').then(mod => mod.VideoPlayer), {
  ssr: false,
});

interface WatchPageProps {
  params: Promise<{ id: string }>;
}

export default function WatchPage({ params }: WatchPageProps) {
  const { id } = use(params);
  const searchParams = useSearchParams();
  const episodeId = searchParams.get('episode') || undefined;
  const router = useRouter();

  // Mock data fetching based on ID
  const isSeries = id.includes('series') || id.includes('anime');
  
  const mockContent = {
    id,
    title: `Mock Content ${id.split('-').pop()}`,
  };

  const mockEpisodes = isSeries ? Array.from({ length: 12 }).map((_, i) => ({
    id: `ep-${i+1}`,
    season_number: 1,
    episode_number: i + 1,
    title: `Episode ${i + 1}`,
    duration: 1420,
    thumbnail_url: `https://picsum.photos/seed/ep${i}/400/225`
  })) : undefined;

  const currentEpisode = isSeries && episodeId 
    ? mockEpisodes?.find(e => e.id === episodeId) 
    : mockEpisodes?.[0];

  const title = isSeries && currentEpisode
    ? `${mockContent.title} - E${currentEpisode.episode_number}: ${currentEpisode.title}`
    : mockContent.title;

  const handleBack = () => {
    router.back();
  };

  const handleEpisodeSelect = (newEpisodeId: string) => {
    router.replace(`/watch/${id}?episode=${newEpisodeId}`);
  };

  return (
    <AuthGuard>
      <div className="fixed inset-0 z-50 bg-black">
        <VideoPlayer
          streamUrl="https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8"
          title={title}
          contentId={id}
          episodeId={episodeId}
          skipIntroStart={30}
          skipIntroEnd={60}
          onBack={handleBack}
          episodes={mockEpisodes}
          onEpisodeSelect={handleEpisodeSelect}
        />
      </div>
    </AuthGuard>
  );
}
