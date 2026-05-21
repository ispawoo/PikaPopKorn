'use client';

import { useEffect } from 'react';

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Initialize Telegram SDK in the background — does not block rendering
    import('@telegram-apps/sdk').then(({ init }) => {
      init();
    }).catch(e => {
      console.warn('Telegram SDK error', e);
    });
  }, []);

  // Render children immediately — no loading gate to avoid blank-screen flash
  return <>{children}</>;
}
