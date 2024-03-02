import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';
import { Check } from 'lucide-react';
import { useTranslation } from 'next-i18next';

import { DataItem } from '@/types/dashboardPie';
import useGetCertificatesStatus, {
  getCertificatesDistribution,
} from '@/lib/api/useGetCertificatesDistribution';
import useGetKpisDashboard, { getKpisDashboard } from '@/lib/api/useGetKpisDashboard';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import kpisIcons from '@/lib/utils/kpisIcons';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import Text from '@/components/ui/text';
import DashboardPieChart from '@/components/Dashboard/DashboardPieChart';
import Kpis from '@/components/Kpis';
import PageHeader from '@/components/PageHeader';

const getGraphColor = (status: string) => {
  switch (status) {
    case 'valid':
      return 'hsl(133, 53%, 48%)';
    case 'expired':
      return 'hsl(0, 71%, 48%)';
    case 'expireSoon':
      return 'hsl(35, 97%, 64%)';
    default:
      return 'hsl(133, 53%, 48%)';
  }
};

const Dashboard = () => {
  const { data: kpis } = useGetKpisDashboard();
  const { data: certificatesDistribution } = useGetCertificatesStatus();
  const { t } = useTranslation();

  const formatedDataPie = certificatesDistribution?.distribution.map((item) => ({
    id: t(`kpis.${item.status}`),
    label: t(`kpis.${item.status}`),
    value: item.percentage,
    quantity: item.quantity,
    color: getGraphColor(item.status),
  }));

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader title={t('dashboard.title')} />
      <div className="flex flex-row gap-7 overflow-x-auto whitespace-nowrap">
        {kpis?.map((kpi) => {
          if (kpi.key !== 'expiredCertificates') {
            return <Kpis key={t(kpi.key)} data={kpi} icon={kpisIcons[kpi.key]} />;
          } else {
            const hasexpiredCertificates = kpi.value > 0;
            const icon = hasexpiredCertificates ? kpisIcons[kpi.key] : Check;
            const color = hasexpiredCertificates ? 'red' : 'green';

            return <Kpis key={t(kpi.key)} data={kpi} icon={icon} color={color} />;
          }
        })}
      </div>

      <div className="flex flex-col gap-16 lg:flex-row">
        <div className="h-96 basis-2/3 rounded-md border p-4 shadow-lg">
          <Text className="text-center" is="h3" size="xl">
            {t('dashboard.chart.title')}
          </Text>
          <div className="flex flex-row">
            <DashboardPieChart data={formatedDataPie as DataItem[]} />
            <div className="mt-32">
              <ul className="flex flex-col gap-4">
                {formatedDataPie?.map((item) => (
                  <li key={item.id} className="flex flex-row items-center gap-4">
                    <div className="h-4 w-4 rounded-full" style={{ backgroundColor: item.color }} />
                    <Text className="cursor-default" is="span">
                      {item.label}:&nbsp;
                      <Text bold="semi" is="span">
                        {item.value}%&nbsp;
                      </Text>
                      <Text size="sm" is="span">
                        ({item.quantity})
                      </Text>
                    </Text>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
        <div className="basis-1/3 rounded-md border p-4 shadow-lg">
          <Text className="text-center" is="h3" size="xl">
            {t('dashboard.certificates_table.title')}
          </Text>
        </div>
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
