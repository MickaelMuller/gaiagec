import React from 'react';
import { LucideProps } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { Kpis as KpisType } from '@/types/kpis';
import { cn } from '@/lib/utils/cn';

import Text from '../ui/text';

type KpisProps = {
  data: KpisType;
  icon?: React.FC<LucideProps>;
  color?: string;
};

const Kpi = ({ data, icon: Icon, color }: KpisProps) => {
  const { t } = useTranslation();
  const translatedKey = t(`kpis.${data.key}`);

  return (
    <div
      className={cn('rounded-md border p-6 shadow-lg', {
        'border-red-500': color === 'red',
        'border-green-500': color === 'green',
      })}
    >
      <div className="flex w-44 flex-row justify-between md:w-56 2xl:w-64">
        <Text
          className={cn('mb-5', {
            'text-red-500': color === 'red',
            'text-green-500': color === 'green',
          })}
          size="xl"
          font="poppins"
        >
          {translatedKey}
        </Text>
        {Icon && <Icon color={color} />}
      </div>
      <div>
        <Text
          className={cn({
            'text-red-500': color === 'red',
            'text-green-500': color === 'green',
          })}
          bold="semi"
          size="2xl"
        >
          {data.value}
        </Text>
      </div>
    </div>
  );
};

export default Kpi;
