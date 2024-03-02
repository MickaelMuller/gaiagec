import dynamic from 'next/dynamic';

import { DataItem } from '@/types/dashboardPie';

const ResponsivePie = dynamic(() => import('@nivo/pie').then((m) => m.ResponsivePie), {
  ssr: false,
});

const DashboardPieChart = ({ data }: { data: DataItem[] }) => (
  <ResponsivePie
    data={data}
    margin={{ top: 40, right: 80, bottom: 80, left: 80 }}
    innerRadius={0.5}
    padAngle={0.9}
    cornerRadius={3}
    activeOuterRadiusOffset={8}
    borderWidth={1}
    borderColor={{
      from: 'color',
      modifiers: [['darker', 0.2]],
    }}
    colors={(row: any) => row.data.color}
    enableArcLabels={false}
    enableArcLinkLabels={false}
  />
);

export default DashboardPieChart;
