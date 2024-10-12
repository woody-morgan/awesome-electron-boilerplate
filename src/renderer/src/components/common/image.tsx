import { VariantProps, cva } from 'class-variance-authority';
import { forwardRef } from 'react';

import { cn } from '@/lib/utils';

const imageVariant = cva('w-full h-full', {
  variants: {
    fill: {
      true: 'absolute',
      false: '',
    },
    objectFit: {
      cover: 'object-cover',
      contain: 'object-contain',
      fill: 'object-fill',
      none: 'object-none',
      scaleDown: 'object-scale-down',
    },
    layout: {
      fixed: 'w-auto h-auto',
      responsive: 'w-full h-auto',
      fill: 'absolute w-full h-full',
    },
  },
  defaultVariants: {
    fill: false,
    objectFit: 'cover',
    layout: 'responsive',
  },
});

export type ImageProps = VariantProps<typeof imageVariant> &
  React.ImgHTMLAttributes<HTMLImageElement>;

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  (
    {
      // cva
      fill,
      objectFit,
      layout,
      // rest
      className,
      ...props
    },
    ref,
  ) => {
    return (
      <img
        ref={ref}
        className={cn(imageVariant({ fill, objectFit, layout }), className)}
        {...props}
      />
    );
  },
);

Image.displayName = 'Image';
