import { forwardRef } from 'react';
import { cn } from '@/utils/cn';

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'elevated' | 'subtle';
}

const GlassCard = forwardRef<HTMLDivElement, GlassCardProps>(
  ({ className, variant = 'default', children, ...props }, ref) => {
    return (
      <div
        ref={ref}
        className={cn(
          'rounded-2xl backdrop-blur-xl border overflow-hidden',
          {
            'bg-white/5 border-white/10': variant === 'default',
            'bg-zinc-900/60 border-white/20 shadow-xl shadow-black/50': variant === 'elevated',
            'bg-white/[0.02] border-white/5': variant === 'subtle',
          },
          className
        )}
        {...props}
      >
        {children}
      </div>
    );
  }
);

GlassCard.displayName = 'GlassCard';

export { GlassCard };
