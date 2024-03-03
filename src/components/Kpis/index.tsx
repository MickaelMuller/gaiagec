import React from 'react';
import { LucideProps } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { Kpis as KpisType } from '@/types/kpis';
import { getEnrichmentKpis } from '@/lib/utils/kpis';

import Text from '../ui/text';

type KpisProps = {
  kpis: KpisType[];
  icon?: React.FC<LucideProps>;
  color?: string;
};

const Kpi = ({ kpis }: KpisProps) => {
  const { t } = useTranslation();
  const enrichmentKpis = getEnrichmentKpis(kpis);

  return (
    <div className="flex flex-row gap-7 overflow-x-auto whitespace-nowrap pb-4">
      {enrichmentKpis.map((kpi) => {
        const label = t(`kpis.${kpi.key}`);
        const Icon = kpi?.icon;

        return (
          <div
            key={kpi.key}
            className="rounded-md border p-6 shadow-lg"
            style={{ borderColor: kpi.color === 'black' ? 'hsl(0, 0%, 80%)' : kpi.color }}
          >
            <div className="flex w-56 flex-row justify-between 2xl:w-64">
              <Text className="mb-5" style={{ color: kpi?.color }} size="xl">
                {label}
              </Text>
              {Icon && <Icon color={kpi?.color} />}
            </div>
            <div>
              <Text bold="semi" size="2xl" style={{ color: kpi?.color }}>
                {kpi.value}
              </Text>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Kpi;
