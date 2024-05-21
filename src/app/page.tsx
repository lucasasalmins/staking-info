import AreaChartUsageExample from '@/components/chart';
import Stats from '@/components/stats';
import { Card } from '@tremor/react';

export default function Home() {
  return (
    <>
      <Card >
        <Stats />

        <AreaChartUsageExample />
      </Card>
    </>
  )

}
