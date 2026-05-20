'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Play, Info } from 'lucide-react';
import { Button } from '@/components/ui/Button';

interface BannerCardProps {
  id: string;
  slug: string;
  title: string;
  description?: string;
  backdrop_url: string;
}

export function BannerCard({ id, slug, title, description, backdrop_url }: BannerCardProps) {
  return (
    <div className="relative w-full aspect-[16/9] md:aspect-[21/9] lg:aspect-[2.5/1] rounded-2xl overflow-hidden group">
      <Image
        src={backdrop_url}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="100vw"
        priority
      />
      
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-4 md:p-8 flex flex-col items-start justify-end h-full">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-2xl md:text-4xl lg:text-5xl font-black font-outfit text-white mb-2 md:mb-4 max-w-2xl"
        >
          {title}
        </motion.h2>
        
        {description && (
          <motion.p 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1 }}
            className="text-sm md:text-base text-zinc-300 max-w-xl line-clamp-2 md:line-clamp-3 mb-4 md:mb-6"
          >
            {description}
          </motion.p>
        )}

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
          className="flex items-center gap-3"
        >
          <Link href={`/watch/${id}`}>
            <Button variant="glow" size="sm" className="md:h-11 md:px-6 md:text-base">
              <Play className="w-4 h-4 md:w-5 md:h-5 mr-2 fill-black" />
              Play Now
            </Button>
          </Link>
          <Link href={`/content/${slug}`}>
            <Button variant="ghost" size="sm" className="md:h-11 md:px-6 md:text-base bg-white/20 hover:bg-white/30 backdrop-blur-md border border-white/10 text-white">
              <Info className="w-4 h-4 md:w-5 md:h-5 mr-2" />
              Details
            </Button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
