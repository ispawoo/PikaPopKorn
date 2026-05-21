'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';

interface BannerCardProps {
  id: string;
  slug: string;
  title: string;
  description?: string;
  backdrop_url: string;
}

export function BannerCard({ id, slug, title, backdrop_url }: BannerCardProps) {
  return (
    <div className="relative w-full h-[400px] md:h-[500px] overflow-hidden group">
      <Image
        src={backdrop_url}
        alt={title}
        fill
        className="object-cover transition-transform duration-700 group-hover:scale-105"
        sizes="100vw"
        priority
      />
      
      {/* Gradient overlay specifically matching the design: dark at bottom, dark left, fading up */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent" />

      <div className="absolute bottom-12 left-0 p-6 md:p-8 flex flex-col items-start justify-end">
        <motion.h2 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          className="text-3xl md:text-5xl lg:text-6xl font-black font-outfit text-white mb-4 max-w-[80%]"
        >
          {title}
        </motion.h2>

        <motion.div 
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <Link href={`/watch/${id}`}>
            <button className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold text-sm px-6 py-2 rounded-md transition-colors">
              Watch Now
            </button>
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
