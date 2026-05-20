import { notFound } from 'next/navigation';
import { ContentCard } from '@/components/cards/ContentCard';
import { CATEGORIES } from '@/utils/constants';

// Mock data generator
const generateMockContent = (count: number, category: string) => {
  return Array.from({ length: count }).map((_, i) => ({
    id: `cat-mock-${i}`,
    title: `${category} Title ${i + 1}`,
    slug: `mock-${category.toLowerCase()}-${i + 1}`,
    poster_url: `https://picsum.photos/seed/cat-${category}-${i}/400/600`,
    rating: 7.0 + (Math.random() * 3),
    release_year: 2020 + Math.floor(Math.random() * 5),
  }));
};

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function CategoryDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const category = CATEGORIES.find(c => c.slug === slug);
  
  if (!category) {
    notFound();
  }

  const results = generateMockContent(20, category.name);

  return (
    <div className="flex flex-col min-h-full pb-8">
      <div className="px-4 py-6 bg-gradient-to-b from-zinc-900 to-transparent">
        <h1 className="text-3xl font-black font-outfit text-white mb-2">{category.name}</h1>
        <p className="text-zinc-400">Browse all {category.name.toLowerCase()} available on PikaPopKorn.</p>
      </div>

      <div className="sticky top-16 z-20 bg-black/80 backdrop-blur-md px-4 py-3 border-b border-white/5 flex items-center justify-between">
        <div className="text-sm text-zinc-400">
          Showing <span className="text-white font-medium">{results.length}</span> results
        </div>
        
        <select className="bg-white/10 border border-white/20 text-white text-sm rounded-lg px-3 py-1.5 focus:outline-none focus:border-yellow-400">
          <option value="popular">Popular</option>
          <option value="latest">Latest</option>
          <option value="rating">Top Rated</option>
        </select>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-x-4 gap-y-6 px-4 py-6">
        {results.map((content) => (
          <ContentCard key={content.id} content={content} />
        ))}
      </div>
    </div>
  );
}
