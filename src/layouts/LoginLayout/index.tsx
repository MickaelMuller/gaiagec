import { ReactNode } from 'react';
import { useTranslation } from 'next-i18next';

import Text from '@/components/ui/text';

const LoginLayout = ({ children }: { children: ReactNode }) => {
  const { t } = useTranslation();

  return (
    <div className="flex">
      <section className="w-1/2 bg-primary p-8">
        <div className="flex h-full flex-col justify-between xl:float-right xl:max-w-[900px]">
          <Text font="grapeNuts" is="h1" size="7xl" bold="bold" className="text-white">
            {t('gaiagec')}
          </Text>
          <Text className="text-white">{t('gaiagec_explanations')}</Text>
        </div>
      </section>
      <section className="flex min-h-screen w-1/2 flex-col items-center justify-center py-2 xl:float-left xl:max-w-[900px]">
        {children}
      </section>
    </div>
  );
};

export default LoginLayout;
