'use client';

import { useEffect, useRef } from 'react';
import { usePathname } from 'next/navigation';

export function AdBanner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    // Only show ads on non-admin routes
    if (pathname.startsWith('/admin')) return;
    
    // Simulate Monetag ad initialization
    const loadAd = () => {
      if (containerRef.current && !containerRef.current.innerHTML) {
        // In a real implementation, we would use the monetag SDK or insert their script tag
        containerRef.current.innerHTML = `
          <div style="width: 100%; height: 50px; background: rgba(255,255,255,0.05); display: flex; align-items: center; justify-content: center; font-size: 10px; color: rgba(255,255,255,0.3); border: 1px solid rgba(255,255,255,0.1); border-radius: 8px;">
            Advertisement
          </div>
        `;
      }
    };

    // Load ad slightly delayed to not block main content
    const timeoutId = setTimeout(loadAd, 1000);
    return () => clearTimeout(timeoutId);
  }, [pathname]);

  if (pathname.startsWith('/admin')) return null;

  return (
    <div className="w-full px-4 mb-4">
      <div ref={containerRef} className="w-full overflow-hidden flex justify-center" />
    </div>
  );
}
