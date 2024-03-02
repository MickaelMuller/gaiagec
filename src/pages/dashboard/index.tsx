import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';
import { Check } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import useGetCertificatesStatus, {
  getCertificatesDistribution,
} from '@/lib/api/useGetCertificatesDistribution';
import useGetKpisDashboard, { getKpisDashboard } from '@/lib/api/useGetKpisDashboard';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import kpisIcons from '@/lib/utils/kpisIcons';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import Kpis from '@/components/Kpis';
import PageHeader from '@/components/PageHeader';

const Dashboard = () => {
  const { data: kpis } = useGetKpisDashboard();
  const { data: certificatesDistribution } = useGetCertificatesStatus();
  const { t } = useTranslation();

  // eslint-disable-next-line no-console
  console.log('certificatesDistribution', certificatesDistribution?.total);

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader title={t('dashboard.title')} />
      <div className="flex flex-row gap-7 overflow-x-auto whitespace-nowrap">
        {kpis?.map((kpi) => {
          if (kpi.key !== 'expiredCertificats') {
            return <Kpis key={t(kpi.key)} data={kpi} icon={kpisIcons[kpi.key]} />;
          } else {
            const hasExpiredCertificats = kpi.value > 0;
            const icon = hasExpiredCertificats ? kpisIcons[kpi.key] : Check;
            const color = hasExpiredCertificats ? 'red' : 'green';

            return <Kpis key={t(kpi.key)} data={kpi} icon={icon} color={color} />;
          }
        })}
      </div>
    </LayoutMenu>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const queries = [
    {
      queryKey: getQueryKey(QUERY_KEYS.KPIS_DASHBOARD),
      queryFn: () => getKpisDashboard({ req: context.req, res: context.res }),
    },
    {
      queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES_DISTRIBUTION),
      queryFn: () => getCertificatesDistribution({ req: context.req, res: context.res }),
    },
  ];

  const { serverProps } = await getServerProps({ context, queries });

  return {
    props: { ...serverProps },
  };
};

export default Dashboard;
