export type ContentStatus = 'draft' | 'published' | 'archived';

export interface Category {
  id: string;
  name: string;
  slug: string;
  description?: string;
}

export interface Genre {
  id: string;
  name: string;
  slug: string;
  icon?: string;
}

export interface Content {
  id: string;
  title: string;
  slug: string;
  description?: string;
  poster_url?: string;
  backdrop_url?: string;
  trailer_url?: string;
  category_id?: string;
  release_year?: number;
  rating?: number;
  duration?: number; // For movies
  is_featured: boolean;
  is_trending: boolean;
  status: ContentStatus;
  total_views: number;
  created_at: string;
  updated_at: string;
  
  // Joined fields
  category?: Category;
  genres?: Genre[];
  episodes?: Episode[];
  movie_stream?: MovieStream;
}

export interface Episode {
  id: string;
  content_id: string;
  season_number: number;
  episode_number: number;
  title: string;
  description?: string;
  thumbnail_url?: string;
  stream_url: string;
  duration?: number;
  skip_intro_start?: number;
  skip_intro_end?: number;
  created_at: string;
  
  // Joined fields
  subtitles?: Subtitle[];
}

export interface MovieStream {
  id: string;
  content_id: string;
  stream_url: string;
  skip_intro_start?: number;
  skip_intro_end?: number;
  
  // Joined fields
  subtitles?: Subtitle[];
}

export interface Subtitle {
  id: string;
  episode_id?: string;
  movie_stream_id?: string;
  language: string;
  label: string;
  url: string;
  is_default: boolean;
}

export interface Banner {
  id: string;
  content_id?: string;
  image_url: string;
  title?: string;
  subtitle?: string;
  is_active: boolean;
  sort_order: number;
  created_at: string;
  
  // Joined
  content?: Content;
}
