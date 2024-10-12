import { Slot } from '@radix-ui/react-slot';
import { Flex, Spinner, VisuallyHidden } from '@radix-ui/themes';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';

import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50',
  {
    variants: {
      variant: {
        default: 'bg-primary text-primary-foreground hover:bg-primary/90',
        destructive: 'bg-destructive text-destructive-foreground hover:bg-destructive/90',
        outline: 'border border-input bg-background hover:bg-accent hover:text-accent-foreground',
        secondary: 'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost: 'hover:bg-accent hover:text-accent-foreground',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'h-10 px-4 py-2',
        sm: 'h-9 rounded-md px-3',
        xs: 'h-6 rounded-sm px-2',
        lg: 'h-11 rounded-md px-8',
        icon: 'size-6',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  fullWidth?: boolean;
  asChild?: boolean;
  loading?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>((props, ref) => {
  const {
    className,
    variant,
    size,
    disabled = props.loading,
    fullWidth,
    asChild = false,
    children,
    ...rest
  } = props;

  const Comp = asChild ? Slot : 'button';
  return (
    <Comp
      data-disabled={disabled || undefined}
      className={cn(
        'relative',
        buttonVariants({ variant, size }),
        disabled ? 'cursor-not-allowed' : 'cursor-pointer',
        fullWidth && 'w-full',
        className,
      )}
      disabled={disabled}
      ref={ref}
      {...rest}
    >
      {props.loading ? (
        <>
          {/**
           * We need a wrapper to set `visibility: hidden` to hide the button content whilst we show the `Spinner`.
           * The button is a flex container with a `gap`, so we use `display: contents` to ensure the correct flex layout.
           *
           * However, `display: contents` removes the content from the accessibility tree in some browsers,
           * so we force remove it with `aria-hidden` and re-add it in the tree with `VisuallyHidden`
           */}
          <span style={{ display: 'contents', visibility: 'hidden' }} aria-hidden>
            {children}
          </span>
          <VisuallyHidden>{children}</VisuallyHidden>

          <Flex asChild align="center" justify="center" position="absolute" inset="0">
            <span>
              <Spinner size="3" />
            </span>
          </Flex>
        </>
      ) : (
        children
      )}
    </Comp>
  );
});
Button.displayName = 'Button';

export { Button, buttonVariants };
