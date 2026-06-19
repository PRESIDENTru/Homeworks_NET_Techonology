import * as React from 'react';
import { BarChart } from '@mui/x-charts/BarChart';
import { LineChart } from '@mui/x-charts/LineChart';
import Container from '@mui/material/Container';
import type { tGroup } from '../groupdata';
import SettingChart, { type tSeries } from './SettingChart';

type GroupChartProps = {
  data: tGroup;
};

function GroupChart({ data }: GroupChartProps) {
  const [series, setSeries] = React.useState<tSeries>({
    'Максимальная выручка': true,
    'Средняя выручка': false,
    'Минимальная выручка': false,
  });

  const [isBar, setIsBar] = React.useState(true);

  const seriesY = Object.entries(series)
    .filter((item) => item[1] === true)
    .map((item) => ({ 
      dataKey: item[0], 
      // Добавляем цвет для каждой серии
      color: item[0] === 'Максимальная выручка' ? '#1976d2' : 
             item[0] === 'Средняя выручка' ? '#2e7d32' : '#ed6c02'
    }));

  const chartSetting = {
    height: 400,
  };

  const oneSeries = seriesY.length === 1;

  return (
    <Container maxWidth="lg">
      {isBar ? (
        <BarChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          {...(oneSeries ? { barLabel: 'value'} : {})}
          {...chartSetting}
          
        />
      ) : (
        <LineChart
          dataset={data}
          xAxis={[{ scaleType: 'band', dataKey: 'Группа' }]}
          series={seriesY}
          {...chartSetting}
          
        />
      )}
      <SettingChart series={series} setSeries={setSeries} isBar={isBar} setIsBar={setIsBar} />
    </Container>
  );
}

export default GroupChart;