import { cn } from '@/utils/cn';

interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: 'default' | 'yellow' | 'dark' | 'outline';
}

export function Badge({ className, variant = 'default', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-md px-2 py-1 text-xs font-medium',
        {
          'bg-white/20 text-white': variant === 'default',
          'bg-yellow-400 text-black': variant === 'yellow',
          'bg-zinc-900 text-white': variant === 'dark',
          'border border-white/20 text-zinc-300': variant === 'outline',
        },
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
}
