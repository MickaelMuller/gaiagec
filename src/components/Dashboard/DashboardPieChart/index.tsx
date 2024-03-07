import dynamic from 'next/dynamic';

import { DataItem } from '@/types/dashboardPie';

const Pie = dynamic(() => import('@nivo/pie').then((nivo) => nivo.Pie), {
  ssr: false,
});

const DashboardPieChart = ({ data, activeId }: { data: DataItem[]; activeId: string | null }) => {
  if (data) {
    const optionalProps = {
      ...(activeId && { activeId }),
    };

    return (
      <Pie
        data={data}
        height={350}
        width={400}
        margin={{ top: 30, right: 0, bottom: 30, left: 0 }}
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
        {...optionalProps}
      />
    );
  }
};

export default DashboardPieChart;
