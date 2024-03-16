import Head from 'next/head';
import { useTranslation } from 'next-i18next';

import { Button } from '../ui/button';
import Text from '../ui/text';

type Actions = {
  buttonVariant?: 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link';
  callback: () => void;
  label: string;
};

type PageHeaderProps = {
  ns: string;
  actions?: Actions[];
};

const PageHeader = ({ ns, actions }: PageHeaderProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t(`${ns}.meta.title`)}</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className="flex justify-between border-b pb-6">
        <Text bold="light" font="hind" size="4xl" is="h1">
          {t(`${ns}.title`)}
        </Text>
        {actions?.map((action, index) => (
          <Button key={index} onClick={action?.callback}>
            {action.label}
          </Button>
        ))}
      </div>
    </>
  );
};

export default PageHeader;
