import { Slot } from '@radix-ui/react-slot';
import { Flex } from '@radix-ui/themes';
import { type VariantProps, cva } from 'class-variance-authority';
import * as React from 'react';
import { P, match } from 'ts-pattern';

import { cn } from '@/lib/utils';

import { CloseSVG, MaxmimizeSVG, MinimizeSVG } from '../../common/svg';

const macOSButtonVariants = cva(
  'inline-flex items-stretch text-[#969799] size-3 bg-[#0e0e0e99] rounded-full opacity-80 hover:opacity-100',
  {
    variants: {
      kind: {
        close: 'bg-[#f46d60]',
        maximize: 'bg-[#59ca56]',
        minimize: 'bg-[#f9c04e]',
      },
    },
    compoundVariants: [],
    defaultVariants: {
      kind: 'close',
    },
  },
);

export interface MacOSButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children'>,
    VariantProps<typeof macOSButtonVariants> {
  asChild?: boolean;
  loading?: boolean;
}

const MacOSButton = React.forwardRef<HTMLButtonElement, MacOSButtonProps>((props, ref) => {
  const { className, kind = 'close', asChild = false, ...rest } = props;

  const Comp = asChild ? Slot : 'button';
  return <Comp className={cn(macOSButtonVariants({ kind }), className)} ref={ref} {...rest} />;
});
MacOSButton.displayName = 'MacOSButton';

// ========== MacOSButton.tsx ==========

const winOSButtonVariants = cva(
  'inline-flex items-stretch text-black relative w-8 h-full bg-[$0e0e0e99] hover:bg-gray-400 rounded-none hover:text-white text-md',
  {
    variants: {
      kind: {
        // window x button
        close: 'hover:bg-[#e10000]',
        maximize: '',
        minimize: '',
      },
    },
    compoundVariants: [],
    defaultVariants: {
      kind: 'close',
    },
  },
);

export interface WinOSButtonProps
  extends Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, 'children' | 'asChild'>,
    VariantProps<typeof winOSButtonVariants> {
  loading?: boolean;
}

const WinOSButton = React.forwardRef<HTMLButtonElement, WinOSButtonProps>((props, ref) => {
  const { className, kind, ...rest } = props;

  return (
    <button className={cn(winOSButtonVariants({ kind }), className)} ref={ref} {...rest}>
      <Flex
        display="inline-flex"
        className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform"
        asChild
      >
        {match(kind)
          .with('close', () => <CloseSVG />)
          .with('maximize', () => <MaxmimizeSVG />)
          .with('minimize', () => <MinimizeSVG />)
          .with(P.nullish, () => '')
          .exhaustive()}
      </Flex>
    </button>
  );
});
WinOSButton.displayName = 'WinOSButton';

// ========== WindowsButton.tsx ==========

export { MacOSButton, WinOSButton };
