# Deployment Guide for PikaPopKorn

This guide explains how to deploy PikaPopKorn for production on Vercel and Supabase.

## 1. Database Setup (Supabase)

1. Create a new project on [Supabase](https://supabase.com)
2. Go to SQL Editor and run the scripts in order:
   - `supabase/schema.sql` (Creates tables and functions)
   - `supabase/rls.sql` (Sets up row-level security policies)
   - `supabase/seed.sql` (Adds initial categories and genres)
3. Get your API keys (URL and anon key) from Settings -> API.

## 2. Telegram Bot Setup

1. Message [@BotFather](https://t.me/BotFather) on Telegram
2. Send `/newbot` and follow instructions to create your bot
3. Save the bot token provided
4. Send `/newapp` and link it to your bot. Provide the short name and (later) the Web App URL.

## 3. Vercel Deployment

1. Push your code to a GitHub repository
2. Create a new project on [Vercel](https://vercel.com) and import your repository
3. Set the following Environment Variables in Vercel:
   - `NEXT_PUBLIC_SUPABASE_URL` (From step 1)
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY` (From step 1)
   - `TELEGRAM_BOT_TOKEN` (From step 2)
   - `NEXT_PUBLIC_SITE_URL` (Your vercel domain, e.g. `https://pikapopkorn.vercel.app`)
   - `NEXT_PUBLIC_UMAMI_URL` (Optional, for analytics)
   - `NEXT_PUBLIC_UMAMI_WEBSITE_ID` (Optional, for analytics)
4. Deploy the project.

## 4. Finalizing Telegram Web App

1. Copy your Vercel deployment URL (e.g., `https://pikapopkorn.vercel.app`)
2. Message BotFather, go to your bot -> Web App settings, and set the Web App URL to your deployment URL.

## 5. First Admin User

To make a user an admin:
1. Log in to the app via Telegram once to create your user record in Supabase.
2. Go to the Supabase dashboard -> Table Editor -> `users` table.
3. Find your user row, edit it, and set `is_admin` to `true`.
4. Now you can access `/admin` in the app.

## Additional Notes

- The app uses HLS.js for video streaming. Ensure your stream URLs (.m3u8) have proper CORS headers allowing your deployment domain.
- For monetization, the Monetag ad banner is integrated in the layout. Configure it according to your Monetag dashboard.
