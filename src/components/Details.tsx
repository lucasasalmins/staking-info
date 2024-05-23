'use client'

import { useApp } from "@/providers/AppProvider";
import { InflationReward } from "@solana/web3.js";
import { Card, List, ListItem } from "@tremor/react";
import ChartArea from "./chart";
import Search from "./search";

type DetailsProps = {
  // stakingInfo: StakingInfo
  solPriceUsd: number
}



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
]


export default function Details({
  // stakingInfo,
  solPriceUsd
}: DetailsProps) {


  const { address, stakingInfo } = useApp()

  const totalRewards = stakingInfo.rewards.reduce((acc, reward) => acc + reward.amount, 0)
  const latestReward = stakingInfo.rewards.reduce(
    (prev, current) => {
      return prev.epoch > current.epoch ? prev : current
    }
    , {} as InflationReward);
  const balance = stakingInfo.balance.toFixed(2).toString()
  const balanceUsd = (stakingInfo.balance * solPriceUsd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const totalRewardsUsd = (totalRewards * solPriceUsd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")
  const latestRewardUsd = (latestReward.amount * solPriceUsd).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")

  const stakingInfoItemsUsd = [
    { key: "balanceUsd", value: balanceUsd },
    { key: "totalRewardsUsd", value: totalRewardsUsd },
    { key: "latestRewardUsd", value: latestRewardUsd },
  ]
  const stakingInfoItems = [
    { key: "balance", value: balance },
    { key: "totalRewards", value: totalRewards },
    { key: "latestReward", value: latestReward.amount },
  ]
  return (

    <div
      className="items-center content-center m-2"
    >

      <Search />
      <Card >
        <Card className="my-5">
          <h3 className="text-tremor-default text-tremor-content dark:text-dark-tremor-content">Solana account address</h3>
          <p className="text-tremor-metric text-tremor-content-strong dark:text-dark-tremor-content-strong font-semibold">
            {address}
          </p>
        </Card>

        <div className="flex">
          <Card className="mt-5 mr-5">
            <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              Staking account info (SOL)
            </h3>
            <List className="mt-2">
              {stakingInfoItemsUsd.map((item) => (
                <ListItem key={item.key}>
                  <span>{item.key}</span>
                  <span>{item.value}</span>
                </ListItem>
              ))}
            </List>
          </Card>
          <Card className="mt-5 ml-auto">
            <h3 className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
              Staking account info (USD)
            </h3>
            <List className="mt-2">
              {stakingInfoItems.map((item) => (
                <ListItem key={item.key}>
                  <span>{item.key}</span>
                  <span>{item.value}</span>
                </ListItem>
              ))}
            </List>
          </Card>
        </div>

        <div className="flex">

          <Card className="mt-5 mr-5">
            <ChartArea
              categories={["amount"]}
              chartdata={stakingInfo.rewards}
              index={'epoch'}
            />

          </Card>
          <Card className="mt-5 ml-auto">
            <ChartArea
              categories={["postBalance"]}
              chartdata={stakingInfo.rewards}
              index={'epoch'}
            />
          </Card>
        </div>

      </Card>
    </div >
  )
}