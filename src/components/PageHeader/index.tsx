import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import Text from '../ui/text';

type PageHeaderProps = {
  ns: string;
};

const PageHeader = ({ ns }: PageHeaderProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t(`${ns}.meta.title`)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Text className="border-b pb-6" bold="light" font="hind" size="4xl" is="h1">
        {t(`${ns}.title`)}
      </Text>
    </>
  );
};

export default PageHeader;
