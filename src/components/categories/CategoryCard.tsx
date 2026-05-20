'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';

interface CategoryCardProps {
  name: string;
  slug: string;
  colorClass: string;
  icon: string;
  count?: number;
}

export function CategoryCard({ name, slug, colorClass, icon, count }: CategoryCardProps) {
  return (
    <Link href={`/categories/${slug}`}>
      <motion.div
        whileHover={{ scale: 1.03 }}
        whileTap={{ scale: 0.97 }}
        className={`relative overflow-hidden rounded-3xl aspect-[4/3] p-6 flex flex-col justify-end ${colorClass} shadow-xl`}
      >
        <div className="absolute top-4 right-4 text-5xl opacity-80 filter drop-shadow-md">
          {icon}
        </div>
        
        <div className="relative z-10">
          <h3 className="text-2xl font-bold font-outfit text-white mb-1 drop-shadow-md">{name}</h3>
          {count !== undefined && (
            <p className="text-white/80 text-sm font-medium">{count} items</p>
          )}
        </div>
        
        {/* Shine effect */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 opacity-0 hover:opacity-100 transition-opacity duration-500 transform -skew-x-12 translate-x-full hover:-translate-x-full" />
      </motion.div>
    </Link>
  );
}
