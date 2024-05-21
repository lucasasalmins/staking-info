import ChartArea from '@/components/chart';
import Stats from '@/components/stats';
import { getStakingInfoForAddress } from '@/utils/solanaRpc';
import { Card } from '@tremor/react';

async function getData() {
  const res = await getStakingInfoForAddress("FqPoW88rHrwnuTLaVYPaDKG8TdQuKfE5NdJuUEzERPwD")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res
}

export default async function Home() {
  const data = await getData()

  console.log(JSON.stringify(data, null, 4))

  return (
    <>
      {data.map(stakingInfo => {
        return (
          <>
            <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">SOL balance</h3>
            <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
              {stakingInfo.balance}
            </p>
            <Card >
              <Stats />

              <ChartArea
                categories={["amount"]}
                chartdata={stakingInfo.rewards}
                index={'epoch'}
              />

              <ChartArea
                categories={["postBalance"]}
                chartdata={stakingInfo.rewards}
                index={'epoch'}
              />
            </Card>
          </>
        )
      })

      }
    </>
  )

}
