# PikaPopKorn

Premium Telegram-native entertainment streaming platform focused on movies, web series, anime, and short dramas.

## Tech Stack
- Next.js 15 (App Router)
- Tailwind CSS
- Supabase (PostgreSQL, Auth, RLS)
- HLS.js (Custom Video Player)
- Telegram Mini Apps SDK
- Zustand (State Management)
- Framer Motion (Animations)
- Lucide React (Icons)

## Features
- Cinematic dark mode UI with glassmorphism
- Custom video player with HLS streaming
- Telegram seamless authentication
- Watch history and progress tracking
- Admin dashboard
- Responsive mobile-first design

## Setup Instructions

1. Clone the repository
2. Run `npm install`
3. Copy `.env.example` to `.env.local` and fill in the values:
   - Setup a project on [Supabase](https://supabase.com)
   - Setup a bot on Telegram via BotFather
4. Set up the Supabase database using the SQL scripts in `supabase/` folder
5. Run `npm run dev` to start the development server

## Author
Built by Yasir Ispawoo (https://github.com/ispawoo)
