import { MetadataRoute } from 'next'
 
export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'PikaPopKorn',
    short_name: 'PikaPopKorn',
    description: 'Premium Movie & Anime Streaming for Telegram',
    start_url: '/',
    display: 'standalone',
    background_color: '#000000',
    theme_color: '#FFDD00',
    icons: [
      {
        src: '/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        src: '/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  }
}
