'use client';

import { useEffect, useState } from 'react';

export default function TelegramProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    try {
      import('@telegram-apps/sdk').then(({ init }) => {
        init();
        setIsReady(true);
      }).catch(e => {
        console.warn('Telegram SDK error', e);
        setIsReady(true);
      });
    } catch (e) {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return null;

  return <>{children}</>;
}
