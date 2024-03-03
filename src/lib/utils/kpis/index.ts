import {
  AlertCircle,
  AlertTriangle,
  Briefcase,
  Check,
  LucideIcon,
  QrCode,
  ShoppingBasket,
} from 'lucide-react';

import { Kpis } from '@/types/kpis';

type IconMap = Record<string, LucideIcon>;

export const kpisIcons: IconMap = {
  productsTotal: ShoppingBasket,
  expiredCertificates: AlertTriangle,
  validCertificats: Check,
  visitsTotal: QrCode,
  suppliersTotal: Briefcase,
};

export const getEnrichmentKpis = (kpis: Kpis[]) =>
  kpis.map((kpi) => {
    switch (kpi.key) {
      case 'expiredCertificates': {
        const hasExpiredCertificates = kpi.value > 0;
        const icon = hasExpiredCertificates ? AlertCircle : Check;
        const color = hasExpiredCertificates ? 'red' : 'green';

        return { ...kpi, icon, color };
      }
      default:
        return { ...kpi, color: 'black', icon: kpisIcons[kpi.key] };
    }
  });
