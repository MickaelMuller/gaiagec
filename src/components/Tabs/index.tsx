import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn } from '@/lib/utils/cn';
import URLS from '@/lib/utils/constants/urls';

import Text from '../ui/text';

const tabs = [
  {
    id: 'dashboard',
    label: 'Dashboard',
    href: URLS.DASHBOARD,
  },
  {
    id: 'products',
    label: 'Produits',
    href: URLS.PRODUCTS,
  },
  {
    id: 'packaging',
    label: 'Emballages',
    href: URLS.PACKAGING,
  },
  {
    id: 'certificates',
    label: 'Certificats',
    href: URLS.CERTIFICATES,
  },
  {
    id: 'suppliers',
    label: 'Fournisseurs',
    href: URLS.SUPPLIERS,
  },
  {
    id: 'analytics',
    label: 'Analytics',
    href: URLS.ANALYTICS,
  },
];

const Tabs = () => {
  const pathname = usePathname();

  return (
    <div className="mt-2 flex gap-6">
      {tabs.map((tab) => {
        const isSelected = pathname === tab.href;

        return (
          <Link
            key={tab.id}
            href={tab.href}
            className={cn('min-h-7 text-white duration-75', {
              'border-b-2': isSelected,
              'duration-75 hover:border-b-2': !isSelected,
            })}
          >
            <Text font="poppins">{tab.label}</Text>
          </Link>
        );
      })}
    </div>
  );
};

export default Tabs;
