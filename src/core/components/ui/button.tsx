import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/core/utils/common';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer transition-all',
  {
    variants: {
      variant: {
        default:
          'text-btn-primary-foreground bg-btn-primary-background hover:bg-btn-primary-background-hover',
        accent:
          'text-btn-accent-foreground bg-btn-accent-background hover:bg-btn-accent-background-hover',
        secondary:
          'text-btn-secondary-foreground/70 bg-btn-secondary-background hover:text-btn-secondary-foreground hover:bg-btn-secondary-background-hover',
        outline:
          'border border-border text-foreground/80 hover:text-foreground hover:bg-btn-secondary-background-hover hover:border-transparent',
        ghost: 'hover:bg-btn-secondary-background hover:text-foreground',
        link: 'text-blue underline-offset-4 hover:underline',
      },
      size: {
        sm: 'h-8 px-6 text-sm sm:h-10 sm:px-10 lg:h-12',
        default: 'h-12 px-8 sm:h-14 sm:px-10 sm:text-lg',
        lg: 'h-14 px-10 text-lg font-semibold sm:h-16 sm:px-12',
        icon: 'h-9 w-9',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, loading, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
        disabled={loading}
      />
    );
  }
);
Button.displayName = 'Button';

export { Button, buttonVariants };
