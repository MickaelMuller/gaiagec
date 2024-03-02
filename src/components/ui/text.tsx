import React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/lib/utils/cn';

const textVariant = cva('', {
  variants: {
    font: {
      poppins: 'font-poppins',
      grapeNuts: 'font-grapeNuts',
      hind: 'font-hind',
    },
    size: {
      'xs': 'text-xs',
      'sm': 'text-sm',
      'md': 'text-base',
      'lg': 'text-lg',
      'xl': 'text-xl',
      '2xl': 'text-2xl',
      '3xl': 'text-3xl',
      '4xl': 'text-4xl',
      '5xl': 'text-5xl',
      '6xl': 'text-6xl',
      '7xl': 'text-7xl',
    },
    bold: {
      semi: 'font-semibold',
      light: 'font-light',
      normal: 'font-normal',
      bold: 'font-bold',
      extra: 'font-extrabold',
    },
  },
  defaultVariants: {
    font: 'poppins',
    size: 'md',
    bold: 'normal',
  },
});

export interface TextProps extends VariantProps<typeof textVariant> {
  children: React.ReactNode;
  className?: string;
  is?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'p' | 'span' | 'div';
}

const Text = ({ children, font, size, bold = 'light', className = '', is = 'p' }: TextProps) => {
  const TextTag = is;

  return <TextTag className={cn(textVariant({ font, size, bold, className }))}>{children}</TextTag>;
};

export default Text;
