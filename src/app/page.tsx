import ChartArea from '@/components/chart';
import Stats from '@/components/stats';
import { getStakingInfoForAddress } from '@/utils/solanaRpc';
import { InflationReward } from '@solana/web3.js';
import { Card } from '@tremor/react';

/**
 * TODO
 * - add loading spinners for each component
 * - add context/offline storage to avoid reloading data on save
 * - add date for epoch?
 */

const SOL_ADDRESS = "FqPoW88rHrwnuTLaVYPaDKG8TdQuKfE5NdJuUEzERPwD"

async function getData() {
  const res = await getStakingInfoForAddress(SOL_ADDRESS)
  // The return value is *not* serialized
  // You can return Date, Map, Set, etc.
  return res
}

/**
 * {
 *   "status": {
 *       "timestamp": "2024-05-22T07:25:24.852Z",
 *       "error_code": 0,
 *       "error_message": null,
 *       "elapsed": 41,
 *       "credit_count": 1,
 *       "notice": null
 *   },
 *   "data": {
 *       "id": 5426,
 *       "symbol": "SOL",
 *       "name": "Solana",
 *       "amount": 1,
 *       "last_updated": "2024-05-22T07:23:00.000Z",
 *       "quote": {
 *           "USD": {
 *               "price": 180.1065648226929,
 *               "last_updated": "2024-05-22T07:23:00.000Z"
 *           }
 *       }
 *   }
 *
 */
async function getPricingData() {

  const res = await fetch('https://pro-api.coinmarketcap.com/v2/tools/price-conversion?amount=1&id=5426', {
    method: 'GET',
    headers: {
      'X-CMC_PRO_API_KEY': '06a352d7-65e0-463e-8a8e-f12804a53fe7',
    },
  })

  if (!res.ok) {
    // This will activate the closest `error.js` Error Boundary
    throw new Error('Failed to fetch data')
  }

  const responseJson = await res.json()

  return responseJson.data.quote.USD.price
}

export default async function Home() {
  const solPriceUsd = await getPricingData()
  // const data = await getData()
  const data = [
    {
      "address": "2onYKy72v2vaEPufkaSp3uxcfKKocuabSbgzLXMxhVnu",
      "balance": 201.488202154,
      "stake": 201.356734339,
      "validator": "he1iusunGwqrNtafDtLdhsUQDFvo13z9sUa36PauBtk",
      "activationEpoch": "602",
      "rewards": [
        {
          "amount": 0.090063767,
          "commission": 0,
          "effectiveSlot": 260928000,
          "epoch": 603,
          "postBalance": 200.090063767
        },
        {
          "amount": 0.089477654,
          "commission": 0,
          "effectiveSlot": 261360000,
          "epoch": 604,
          "postBalance": 200.185356017
        },
        {
          "amount": 0.089783824,
          "commission": 0,
          "effectiveSlot": 261792000,
          "epoch": 605,
          "postBalance": 200.281575135
        },
        {
          "amount": 0.090264337,
          "commission": 0,
          "effectiveSlot": 262224008,
          "epoch": 606,
          "postBalance": 200.37876902
        },
        {
          "amount": 0.09100329,
          "commission": 0,
          "effectiveSlot": 262656000,
          "epoch": 607,
          "postBalance": 200.480151887
        },
        {
          "amount": 0.09078646,
          "commission": 0,
          "effectiveSlot": 263088012,
          "epoch": 608,
          "postBalance": 200.576786055
        },
        {
          "amount": 0.092438953,
          "commission": 0,
          "effectiveSlot": 263520008,
          "epoch": 609,
          "postBalance": 200.675536353
        },
        {
          "amount": 0.088668079,
          "commission": 0,
          "effectiveSlot": 263952000,
          "epoch": 610,
          "postBalance": 200.77134244
        },
        {
          "amount": 0.091025614,
          "commission": 0,
          "effectiveSlot": 264384000,
          "epoch": 611,
          "postBalance": 200.872207578
        },
        {
          "amount": 0.091093658,
          "commission": 0,
          "effectiveSlot": 264816004,
          "epoch": 612,
          "postBalance": 200.973821078
        },
        {
          "amount": 0.091220555,
          "commission": 0,
          "effectiveSlot": 265248012,
          "epoch": 613,
          "postBalance": 201.07527535
        },
        {
          "amount": 0.090667776,
          "commission": 0,
          "effectiveSlot": 265680000,
          "epoch": 614,
          "postBalance": 201.173949078
        },
        {
          "amount": 0.090908634,
          "commission": 0,
          "effectiveSlot": 266112008,
          "epoch": 615,
          "postBalance": 201.275816039
        },
        {
          "amount": 0.090875512,
          "commission": 0,
          "effectiveSlot": 266544000,
          "epoch": 616,
          "postBalance": 201.380113893
        },
        {
          "amount": 0.090739106,
          "commission": 0,
          "effectiveSlot": 266976004,
          "epoch": 617,
          "postBalance": 201.479826962
        }
      ]
    },
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
    },
    {
      "address": "EFr9hB6nnQMeLVeV3AgvWpfoTLzS9v2SjNKogSyjn3rZ",
      "balance": 1.001504852,
      "stake": 0.999069294,
      "validator": "he1iusunGwqrNtafDtLdhsUQDFvo13z9sUa36PauBtk",
      "activationEpoch": "614",
      "rewards": [
        {
          "amount": 0.00045106,
          "commission": 0,
          "effectiveSlot": 266112008,
          "epoch": 615,
          "postBalance": 1.00045106
        },
        {
          "amount": 0.000450895,
          "commission": 0,
          "effectiveSlot": 266544000,
          "epoch": 616,
          "postBalance": 1.000968552
        },
        {
          "amount": 0.000450219,
          "commission": 0,
          "effectiveSlot": 266976004,
          "epoch": 617,
          "postBalance": 1.001463297
        }
      ]
    }
  ].reduce((a, b) => {
    const rewards = [...a.rewards, ...b.rewards]
      .reduce((acc, reward) => {
        const existingReward = acc.find(r => r.epoch === reward.epoch);
        if (existingReward) {
          existingReward.amount += reward.amount;
          existingReward.commission += reward.commission;
          existingReward.effectiveSlot += reward.effectiveSlot;
          existingReward.postBalance += reward.postBalance;
        } else {
          acc.push({ ...reward });
        }
        return acc;
      }, [] as InflationReward[]);

    return {
      "address": SOL_ADDRESS,
      "balance": a.balance + b.balance,
      "stake": a.stake + b.stake,
      "validator": a.validator,
      "activationEpoch": Math.min(parseInt(a.activationEpoch), parseInt(b.activationEpoch)).toString(),
      "rewards": rewards
    }
  });


  console.log(JSON.stringify(data, null, 4))

  const totalRewards = data.rewards.reduce((acc, reward) => acc + reward.amount, 0)
  const latestReward = data.rewards.reduce(
    (prev, current) => {
      return prev.epoch > current.epoch ? prev : current
    }
  );

  return (
    <>
      {[data].map(stakingInfo => {
        const previousBalance = "100"
        const balance = stakingInfo.balance.toFixed(2).toString()
        const balanceChange = "0.1%"
        const balanceUsd = (stakingInfo.balance * solPriceUsd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        const totalRewardsUsd = (totalRewards * solPriceUsd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        const latestRewardUsd = (latestReward.amount * solPriceUsd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
        return (
          <>
            <Card >
              <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">staking account address</h3>
              <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
                {stakingInfo.address}
              </p>
              <Stats
                stats={[
                  { name: 'SOL balance', stat: balance, previousStat: balanceUsd, change: balanceChange, changeType: 'increase' },
                  { name: 'Total rewards', stat: totalRewards.toFixed(2).toString(), previousStat: totalRewardsUsd, change: '2.02%', changeType: 'increase' },
                  { name: 'Latest reward', stat: latestReward.amount.toFixed(2).toString(), previousStat: latestRewardUsd, change: '4.05%', changeType: 'decrease' },
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
