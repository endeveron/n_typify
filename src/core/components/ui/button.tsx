import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/core/utils/common';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-full text-sm font-medium transition-colors disabled:pointer-events-none disabled:opacity-50 cursor-pointer',
  {
    variants: {
      variant: {
        default:
          'bg-btn-primary-background text-btn-primary-foreground hover:btn-primary-background/90',
        destructive: 'bg-red/90 text-white hover:bg-red',
        outline:
          'border border-border text-foreground/70 hover:text-foreground hover:bg-btn-secondary-background',
        secondary: 'bg-btn-secondary-background text-btn-secondary-foreground',
        ghost:
          'hover:bg-btn-secondary-background hover:text-btn-secondary-foreground',
        link: 'text-blue underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-6',
        sm: 'h-8 px-4 text-xs',
        lg: 'h-12 px-8',
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
