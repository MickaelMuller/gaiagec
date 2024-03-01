import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

import Text from '@/components/ui/text';
import MyAccount from '@/components/MyAccount';
import Tabs from '@/components/Tabs';

export default function LayoutMenu({ children }: { children: ReactNode }) {
  const { t } = useTranslation();

  return (
    <div>
      <nav className="flex h-16 w-full items-center gap-7 bg-primary">
        <Text className="ml-5  text-white" font="grapeNuts" is="h1" size="3xl" bold="semi">
          {t('gaiagec')}
        </Text>
        <div className="flex w-full justify-between">
          <Tabs />
          <MyAccount />
        </div>
      </nav>
      <main className="p-8">{children}</main>
    </div>
  );
}
