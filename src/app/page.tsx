import ChartArea from '@/components/chart';
import Stats from '@/components/stats';
import { getStakingInfoForAddress } from '@/utils/solanaRpc';
import { Card } from '@tremor/react';

/**
 * TODO
 * - add loading spinners for each component
 * - add context/offline storage to avoid reloading data on save
 * - 
 */

async function getData() {
  const res = await getStakingInfoForAddress("FqPoW88rHrwnuTLaVYPaDKG8TdQuKfE5NdJuUEzERPwD")
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res
}

export default async function Home() {
  // const data = await getData()
  const data = [
    {
      "address": "GcJhRHeuATxQdEq2HNWKSWFT6dJb1nccywcvE4y44Dxq",
      "balance": 14.001082548,
      "stake": 13.996660689,
      "validator": "he1iusunGwqrNtafDtLdhsUQDFvo13z9sUa36PauBtk",
      "activationEpoch": "614",
      "rewards": [
        {
          "amount": 0.006319219,
          "commission": 0,
          "effectiveSlot": 266112008,
          "epoch": 615,
          "postBalance": 13.986319219
        },
        {
          "amount": 0.006316916,
          "commission": 0,
          "effectiveSlot": 266544000,
          "epoch": 616,
          "postBalance": 13.993569145
        },
        {
          "amount": 0.006307434,
          "commission": 0,
          "effectiveSlot": 266976004,
          "epoch": 617,
          "postBalance": 14.000500374
        }
      ]
    }
  ]

  console.log(JSON.stringify(data, null, 4))

  return (
    <>
      {data.map(stakingInfo => {
        const previousBalance = "100"
        const balance = stakingInfo.balance.toString()
        const balanceChange = "0.1%"
        return (
          <>
            <Card >
              <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">staking account address</h3>
              <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                {stakingInfo.address}
              </p>
              <Stats
                stats={[
                  { name: 'SOL balance', stat: balance, previousStat: previousBalance, change: balanceChange, changeType: 'increase' },
                  { name: 'Avg. Open Rate', stat: '58.16%', previousStat: '56.14%', change: '2.02%', changeType: 'increase' },
                  { name: 'Avg. Click Rate', stat: '24.57%', previousStat: '28.62%', change: '4.05%', changeType: 'decrease' },
                ]}
              />

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
