import { Skeleton } from '@/components/ui/Skeleton';

export function SkeletonCard() {
  return (
    <Skeleton variant="card" className="w-32 md:w-40 lg:w-48 shrink-0" />
  );
}
