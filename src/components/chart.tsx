"use client"

import { AreaChart } from '@tremor/react';


const valueFormatter = function (number) {
  return 'SOL ' + new Intl.NumberFormat('us').format(number).toString();
};

interface ChartAreaProps {
  categories: string[]
  chartdata: any[]
  index: string
}

export default function ChartArea({
  categories,
  chartdata,
  index
}: ChartAreaProps) {
  return (
    <>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index={index}
        yAxisWidth={65}
        categories={categories}
        autoMinValue
        colors={['indigo', 'cyan']}
      // valueFormatter={valueFormatter}
      />
    </>
  );
}