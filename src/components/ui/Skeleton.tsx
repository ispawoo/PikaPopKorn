import { cn } from '@/utils/cn';

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'text' | 'card' | 'banner' | 'avatar' | 'rectangle';
}

export function Skeleton({ className, variant = 'text', ...props }: SkeletonProps) {
  return (
    <div
      className={cn(
        'bg-white/5 shimmer relative overflow-hidden',
        {
          'h-4 w-full rounded': variant === 'text',
          'aspect-[2/3] w-full rounded-2xl': variant === 'card',
          'aspect-video w-full rounded-2xl': variant === 'banner',
          'h-12 w-12 rounded-full': variant === 'avatar',
          'rounded-xl': variant === 'rectangle',
        },
        className
      )}
      {...props}
    />
  );
}
