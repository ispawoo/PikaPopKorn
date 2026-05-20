import { Header } from '@/components/navbar/Header';
import { BottomNav } from '@/components/navbar/BottomNav';
import { AuthGuard } from '@/components/auth/AuthGuard';
import { AdBanner } from '@/lib/monetag/AdBanner';

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthGuard>
      <div className="flex flex-col min-h-screen">
        <Header />
        
        {/* Main content area with padding for fixed navs */}
        <main className="flex-1 pb-24 pt-16">
          {children}
          <AdBanner />
        </main>

        <BottomNav />
      </div>
    </AuthGuard>
  );
}
