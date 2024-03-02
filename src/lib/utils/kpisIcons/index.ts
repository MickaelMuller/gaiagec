import { AlertTriangle, Briefcase, Check, LucideIcon, QrCode, ShoppingBasket } from 'lucide-react';

type IconMap = Record<string, LucideIcon>;

const kpisIcons: IconMap = {
  productsTotal: ShoppingBasket,
  expiredCertificats: AlertTriangle,
  validCertificats: Check,
  visitsTotal: QrCode,
  suppliersTotal: Briefcase,
};

export default kpisIcons;
