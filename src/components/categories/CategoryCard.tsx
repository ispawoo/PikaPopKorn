'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  name: string;
  slug: string;
  imageUrl: string;
  count?: number;
}

export function CategoryCard({ name, slug, imageUrl, count }: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className="relative overflow-hidden rounded-2xl aspect-[4/3] flex flex-col justify-end shadow-xl border border-white/5"
      >
        <Image 
          src={imageUrl} 
          alt={name} 
          fill 
          className="object-cover"
          sizes="(max-width: 768px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-black/10" />
        
        <div className="relative z-10 p-3 md:p-4">
          <h3 className="text-sm md:text-lg font-bold font-outfit text-white mb-0.5 md:mb-1">{name}</h3>
          {count !== undefined && (
            <p className="text-zinc-400 text-[10px] md:text-xs font-medium">{count}+</p>
          )}
        </div>
      </motion.div>
    </Link>
  );
}
