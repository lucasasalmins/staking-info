"use client"

import { AreaChart } from '@tremor/react';

const chartdata = [
  {
    amount: 0.090063767,
    commission: 0,
    effectiveSlot: 260928000,
    "epoch": 603,
    "postBalance": 200.090063767
  },
  {
    amount: 0.089477654,
    commission: 0,
    effectiveSlot: 261360000,
    "epoch": 604,
    "postBalance": 200.185356017
  },
  {
    amount: 0.089783824,
    commission: 0,
    effectiveSlot: 261792000,
    "epoch": 605,
    "postBalance": 200.281575135
  },
  {
    amount: 0.090264337,
    commission: 0,
    effectiveSlot: 262224008,
    "epoch": 606,
    "postBalance": 200.37876902
  },
  {
    amount: 0.09100329,
    commission: 0,
    effectiveSlot: 262656000,
    "epoch": 607,
    "postBalance": 200.480151887
  },
  {
    amount: 0.09078646,
    commission: 0,
    effectiveSlot: 263088012,
    "epoch": 608,
    "postBalance": 200.576786055
  },
  {
    amount: 0.092438953,
    commission: 0,
    effectiveSlot: 263520008,
    "epoch": 609,
    "postBalance": 200.675536353
  },
  {
    amount: 0.088668079,
    commission: 0,
    effectiveSlot: 263952000,
    "epoch": 610,
    "postBalance": 200.77134244
  },
  {
    amount: 0.091025614,
    commission: 0,
    effectiveSlot: 264384000,
    "epoch": 611,
    "postBalance": 200.872207578
  },
  {
    amount: 0.091093658,
    commission: 0,
    effectiveSlot: 264816004,
    "epoch": 612,
    "postBalance": 200.973821078
  },
  {
    amount: 0.091220555,
    commission: 0,
    effectiveSlot: 265248012,
    "epoch": 613,
    "postBalance": 201.07527535
  },
  {
    amount: 0.090667776,
    commission: 0,
    effectiveSlot: 265680000,
    "epoch": 614,
    "postBalance": 201.173949078
  },
  {
    amount: 0.090908634,
    commission: 0,
    effectiveSlot: 266112008,
    "epoch": 615,
    "postBalance": 201.275816039
  },
  {
    amount: 0.090875512,
    commission: 0,
    effectiveSlot: 266544000,
    "epoch": 616,
    "postBalance": 201.380113893
  },
  {
    amount: 0.090739106,
    commission: 0,
    effectiveSlot: 266976004,
    "epoch": 617,
    "postBalance": 201.479826962
  }
]

const valueFormatter = function (number) {
  return 'SOL ' + new Intl.NumberFormat('us').format(number).toString();
};

export default function AreaChartUsageExample() {
  return (
    <>
      <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">SOL balance</h3>
      <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">201</p>
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="epoch"
        yAxisWidth={65}
        categories={[
          'amount',
          // 'postBalance'
        ]}
        autoMinValue
        colors={['indigo', 'cyan']}
      // valueFormatter={valueFormatter}
      />
      <AreaChart
        className="mt-4 h-72"
        data={chartdata}
        index="epoch"
        yAxisWidth={65}
        categories={[
          // 'amount',
          'postBalance'
        ]}
        autoMinValue
        colors={['indigo', 'cyan']}
      // enableLegendSlider

      // valueFormatter={valueFormatter}
      />
    </>
  );
}