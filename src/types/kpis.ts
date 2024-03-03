import React from 'react';
import { LucideProps } from 'lucide-react';

export type Kpis = {
  key: string;
  value: number;
  icon?: React.FC<LucideProps>;
  color?: string;
};
