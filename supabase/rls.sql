-- RLS
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE content ENABLE ROW LEVEL SECURITY;
ALTER TABLE content_genres ENABLE ROW LEVEL SECURITY;
ALTER TABLE episodes ENABLE ROW LEVEL SECURITY;
ALTER TABLE movie_streams ENABLE ROW LEVEL SECURITY;
ALTER TABLE subtitles ENABLE ROW LEVEL SECURITY;
ALTER TABLE watch_history ENABLE ROW LEVEL SECURITY;
ALTER TABLE watchlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE banners ENABLE ROW LEVEL SECURITY;

-- Public read access
CREATE POLICY "Public Read Access" ON genres FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON categories FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON content FOR SELECT USING (status = 'published');
CREATE POLICY "Public Read Access" ON content_genres FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON episodes FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON movie_streams FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON subtitles FOR SELECT USING (true);
CREATE POLICY "Public Read Access" ON banners FOR SELECT USING (is_active = true);

-- User data access (users can read/write their own data)
CREATE POLICY "User Data Access" ON users FOR SELECT USING (auth.uid() = id);
CREATE POLICY "User Data Access" ON users FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "User Watch History" ON watch_history FOR ALL USING (auth.uid() = user_id);
CREATE POLICY "User Watchlist" ON watchlist FOR ALL USING (auth.uid() = user_id);

-- Admins can do everything (using auth.jwt() admin claim or user table join)
CREATE POLICY "Admin All Access" ON content FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin All Access" ON episodes FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin All Access" ON movie_streams FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin All Access" ON subtitles FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
CREATE POLICY "Admin All Access" ON banners FOR ALL USING (
  EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND is_admin = true)
);
