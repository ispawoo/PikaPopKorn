-- Users table (synced from Telegram)
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  telegram_id BIGINT UNIQUE NOT NULL,
  username TEXT,
  first_name TEXT,
  last_name TEXT,
  avatar_url TEXT,
  is_premium BOOLEAN DEFAULT false,
  is_admin BOOLEAN DEFAULT false,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Genres
CREATE TABLE genres (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  icon TEXT
);

-- Categories (movie, anime, web_series, short_drama)
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  description TEXT
);

-- Content (unified table for all content types)
CREATE TABLE content (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  title TEXT NOT NULL,
  slug TEXT NOT NULL UNIQUE,
  description TEXT,
  poster_url TEXT,
  backdrop_url TEXT,
  trailer_url TEXT,
  category_id UUID REFERENCES categories(id),
  release_year INTEGER,
  rating DECIMAL(3,1),
  duration INTEGER, -- minutes for movies
  is_featured BOOLEAN DEFAULT false,
  is_trending BOOLEAN DEFAULT false,
  status TEXT DEFAULT 'published' CHECK (status IN ('draft', 'published', 'archived')),
  total_views INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- Content-Genre junction
CREATE TABLE content_genres (
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  genre_id UUID REFERENCES genres(id) ON DELETE CASCADE,
  PRIMARY KEY (content_id, genre_id)
);

-- Episodes (for series/anime/short dramas)
CREATE TABLE episodes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  season_number INTEGER DEFAULT 1,
  episode_number INTEGER NOT NULL,
  title TEXT NOT NULL,
  description TEXT,
  thumbnail_url TEXT,
  stream_url TEXT NOT NULL, -- HLS .m3u8 URL
  duration INTEGER, -- seconds
  skip_intro_start INTEGER, -- seconds
  skip_intro_end INTEGER, -- seconds
  created_at TIMESTAMPTZ DEFAULT now()
);

-- Movie streams (for standalone movies)
CREATE TABLE movie_streams (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE UNIQUE,
  stream_url TEXT NOT NULL, -- HLS .m3u8 URL
  skip_intro_start INTEGER,
  skip_intro_end INTEGER
);

-- Subtitles
CREATE TABLE subtitles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  episode_id UUID REFERENCES episodes(id) ON DELETE CASCADE,
  movie_stream_id UUID REFERENCES movie_streams(id) ON DELETE CASCADE,
  language TEXT NOT NULL,
  label TEXT NOT NULL,
  url TEXT NOT NULL, -- WebVTT URL
  is_default BOOLEAN DEFAULT false,
  CONSTRAINT subtitle_target CHECK (
    (episode_id IS NOT NULL AND movie_stream_id IS NULL) OR
    (episode_id IS NULL AND movie_stream_id IS NOT NULL)
  )
);

-- Watch History
CREATE TABLE watch_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  episode_id UUID REFERENCES episodes(id) ON DELETE SET NULL,
  progress INTEGER DEFAULT 0, -- seconds watched
  duration INTEGER, -- total duration in seconds
  completed BOOLEAN DEFAULT false,
  last_watched_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_id, episode_id)
);

-- Watchlist
CREATE TABLE watchlist (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES users(id) ON DELETE CASCADE,
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  added_at TIMESTAMPTZ DEFAULT now(),
  UNIQUE(user_id, content_id)
);

-- Banners (for featured carousel)
CREATE TABLE banners (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  content_id UUID REFERENCES content(id) ON DELETE CASCADE,
  image_url TEXT NOT NULL,
  title TEXT,
  subtitle TEXT,
  is_active BOOLEAN DEFAULT true,
  sort_order INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT now()
);
