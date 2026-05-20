'use client';

import Image from 'next/image';
import Link from 'next/link';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Content } from '@/types/content';

interface ContentCardProps {
  content: Partial<Content>;
}

export function ContentCard({ content }: ContentCardProps) {
  return (
    <Link href={`/content/${content.slug}`}>
      <motion.div 
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        className="relative group w-32 md:w-40 lg:w-48 aspect-[2/3] rounded-2xl overflow-hidden bg-zinc-900 border border-white/10 shrink-0"
      >
        {content.poster_url ? (
          <Image
            src={content.poster_url}
            alt={content.title || 'Poster'}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-110"
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
          />
        ) : (
          <div className="absolute inset-0 bg-zinc-800 flex items-center justify-center">
            <span className="text-zinc-500 text-xs">No Image</span>
          </div>
        )}

        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/20 to-transparent opacity-80 transition-opacity duration-300 group-hover:opacity-100" />
        
        {content.rating && (
          <div className="absolute top-2 right-2 flex items-center gap-1 bg-black/60 backdrop-blur-md px-1.5 py-0.5 rounded-md text-xs font-medium border border-white/10">
            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
            <span className="text-white">{content.rating.toFixed(1)}</span>
          </div>
        )}

        <div className="absolute bottom-0 left-0 right-0 p-3 translate-y-2 transition-transform duration-300 group-hover:translate-y-0">
          <h3 className="text-sm md:text-base font-bold text-white line-clamp-2 leading-tight mb-1">
            {content.title}
          </h3>
          <div className="flex items-center gap-2 text-xs text-zinc-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {content.release_year && <span>{content.release_year}</span>}
            {content.category?.name && (
              <>
                <span className="w-1 h-1 rounded-full bg-zinc-600" />
                <span className="line-clamp-1">{content.category.name}</span>
              </>
            )}
          </div>
        </div>
      </motion.div>
    </Link>
  );
}
