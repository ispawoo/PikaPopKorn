'use client';

import Link from 'next/link';

export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 z-40 bg-gradient-to-b from-black/80 to-transparent pt-safe backdrop-blur-[2px]">
      <div className="flex items-center justify-center px-4 h-16">
        <Link href="/" className="font-outfit text-2xl font-black tracking-tight">
          <span className="text-white">Pika</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-yellow-200 text-glow">PopKorn</span>
        </Link>
      </div>
    </header>
  );
}
