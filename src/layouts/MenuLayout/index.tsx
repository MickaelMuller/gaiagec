import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

import { cn } from '@/lib/utils/cn';
import Text from '@/components/ui/text';
import MyAccount from '@/components/MyAccount';
import Tabs from '@/components/Tabs';

export default function LayoutMenu({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  const { t } = useTranslation();

  return (
    <div>
      <nav className="bg-primary">
        <div className="flex h-16 w-full items-center gap-7 2xl:m-auto 2xl:max-w-[2000px]">
          <Text className="ml-5  text-white" font="grapeNuts" is="h1" size="3xl" bold="semi">
            {t('gaiagec')}
          </Text>
          <div className="flex w-full justify-between ">
            <Tabs />
            <MyAccount />
          </div>
        </div>
      </nav>
      <div className={cn(className, 'p-8 2xl:m-auto 2xl:max-w-[2000px]')}>{children}</div>
    </div>
  );
}
