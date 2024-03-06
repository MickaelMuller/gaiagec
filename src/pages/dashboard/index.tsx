import { useState } from 'react';
import { GetServerSideProps } from 'next';
import LayoutMenu from '@/layouts/MenuLayout';
import { useTranslation } from 'next-i18next';

import { CertificatStatus } from '@/types/certificatesDistribution';
import { DataItem } from '@/types/dashboardPie';
import useGetCertificates, { getCertificates } from '@/lib/api/useGetCertificates';
import useGetCertificatesDistribution, {
  getCertificatesDistribution,
} from '@/lib/api/useGetCertificatesDistribution';
import useGetKpisDashboard, { getKpisDashboard } from '@/lib/api/useGetKpisDashboard';
import QUERY_KEYS from '@/lib/utils/constants/query-keys';
import getQueryKey from '@/lib/utils/get-query-key';
import { getServerProps } from '@/lib/utils/server-side/get-server-props';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import Text from '@/components/ui/text';
import DashboardPieChart from '@/components/Dashboard/DashboardPieChart';
import Kpis from '@/components/Kpis';
import PageHeader from '@/components/PageHeader';

const getGraphColor = (status: CertificatStatus) => {
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
  const { data: certificatesDistribution } = useGetCertificatesDistribution();
  const { data: certificates } = useGetCertificates();
  const { t } = useTranslation();
  const [activeId, setActiveId] = useState<string | null>(null);

  const formatedDataPie = certificatesDistribution?.distribution.map((item) => ({
    id: t(`kpis.${item.status}`),
    label: t(`kpis.${item.status}`),
    value: item.percentage,
    quantity: item.quantity,
    color: getGraphColor(item.status),
  }));

  const columns: Record<string, 'name' | 'supplierName' | 'validTo'>[] = [
    {
      header: t('dashboard.certificates_table.name'),
      accessor: 'name',
    },
    {
      header: t('dashboard.certificates_table.supplier'),
      accessor: 'supplierName',
    },
    {
      header: t('dashboard.certificates_table.expiration_date'),
      accessor: 'validTo',
    },
  ];

  return (
    <LayoutMenu className="flex flex-col gap-12">
      <PageHeader title={t('dashboard.title')} />

      {kpis ? <Kpis kpis={kpis} /> : null}

      <div className="flex flex-col gap-16 lg:flex-row">
        <div className="h-96 basis-3/5 rounded-md border p-4 shadow-lg">
          <Text className="text-center" is="h3" size="xl">
            {t('dashboard.chart.title')}
          </Text>
          <div className="flex flex-row justify-center">
            <DashboardPieChart data={formatedDataPie as DataItem[]} activeId={activeId} />
            <ul className="flex flex-col gap-4 self-center">
              {formatedDataPie?.map((item) => (
                <li
                  onMouseEnter={() => setActiveId(item.id)}
                  onMouseLeave={() => setActiveId(null)}
                  key={item.id}
                  className="flex flex-row items-center gap-2"
                >
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

        <div className="basis-2/5 rounded-md border p-4 shadow-lg">
          <Text className="mb-4 text-center" is="h3" size="xl">
            {t('dashboard.certificates_table.title')}
          </Text>
          <Table>
            <TableHeader>
              <TableRow>
                {columns.map((column) => (
                  <TableHead key={`head-${column.header}`}>{column.header}</TableHead>
                ))}
              </TableRow>
            </TableHeader>
            <TableBody>
              {certificates?.certificates.map((certificate) => (
                <TableRow className="border-b-0 " key={certificate.supplierId}>
                  {columns.map((column) => (
                    <TableCell
                      key={`cell-${column.header}`}
                      className="max-w-36 overflow-hidden text-ellipsis whitespace-nowrap"
                    >
                      {certificate[column.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </TableBody>
          </Table>
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
    {
      queryKey: getQueryKey(QUERY_KEYS.CERTIFICATES),
      queryFn: () => getCertificates({ req: context.req, res: context.res }),
    },
  ];

  const { serverProps } = await getServerProps({ context, queries });

  return {
    props: { ...serverProps },
  };
};

export default Dashboard;
