-- Seed data
INSERT INTO categories (name, slug, description) VALUES
('Movies', 'movies', 'Feature films'),
('Anime', 'anime', 'Japanese animation series and films'),
('Web Series', 'web-series', 'Episodic web content'),
('Short Dramas', 'short-dramas', 'Bite-sized dramatic episodes');

INSERT INTO genres (name, slug) VALUES
('Action', 'action'),
('Comedy', 'comedy'),
('Drama', 'drama'),
('Horror', 'horror'),
('Romance', 'romance'),
('Sci-Fi', 'sci-fi'),
('Thriller', 'thriller'),
('Fantasy', 'fantasy'),
('Adventure', 'adventure'),
('Mystery', 'mystery');
