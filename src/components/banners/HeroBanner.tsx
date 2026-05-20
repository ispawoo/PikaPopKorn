'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { BannerCard } from '../cards/BannerCard';

interface Banner {
  id: string;
  content_id: string;
  image_url: string;
  title: string;
  subtitle: string;
  content?: {
    slug: string;
  };
}

interface HeroBannerProps {
  banners: Banner[];
}

export function HeroBanner({ banners }: HeroBannerProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (banners.length <= 1) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % banners.length);
    }, 5000);
    
    return () => clearInterval(interval);
  }, [banners.length]);

  if (!banners || banners.length === 0) return null;

  return (
    <div className="relative w-full px-4 pt-4 mb-6">
      <div className="relative rounded-2xl overflow-hidden aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1]">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="absolute inset-0"
          >
            <BannerCard
              id={banners[currentIndex].content_id}
              slug={banners[currentIndex].content?.slug || ''}
              title={banners[currentIndex].title}
              description={banners[currentIndex].subtitle}
              backdrop_url={banners[currentIndex].image_url}
            />
          </motion.div>
        </AnimatePresence>

        {banners.length > 1 && (
          <div className="absolute bottom-3 md:bottom-6 right-4 md:right-8 flex gap-2 z-20">
            {banners.map((_, idx) => (
              <button
                key={idx}
                onClick={() => setCurrentIndex(idx)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  idx === currentIndex ? 'w-6 bg-yellow-400' : 'w-2 bg-white/40 hover:bg-white/60'
                }`}
                aria-label={`Go to slide ${idx + 1}`}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
