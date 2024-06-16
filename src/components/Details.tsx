'use client'

import { useApp } from "@/providers/AppProvider";
import { LoadingOutlined } from '@ant-design/icons';
import { InflationReward } from "@solana/web3.js";
import { Card, List, ListItem } from "@tremor/react";
import { Alert, Spin, Timeline } from "antd";
import ChartArea from "./chart";
import Search from "./search";

type DetailsProps = {
  // stakingInfo: StakingInfo
  solPriceUsd: number
}


function LogItem({ text }) {
  return (
    <p className="text-tremor-content-strong dark:text-dark-tremor-content-strong font-medium">
      {text}
    </p>
  )
}

export default function Details({
  // stakingInfo,
  solPriceUsd
}: DetailsProps) {


  const { address, stakingInfo, log, logs, searching } = useApp()

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

      {searching && logs.length === 0 &&
        <Card className="my-5">
          <Spin indicator={<LoadingOutlined style={{ fontSize: 24 }} spin />} />
        </Card>
      }

      {logs.length === 1 &&
        <Card className="my-5">
          <Alert message={log} type="warning" />
        </Card>
      }

      {searching && logs.length > 1 &&
        <Card className="my-5">
          <Timeline
            pending={<LogItem text={log} />}
            items={logs.map(logItem => ({ children: <LogItem text={logItem} /> }))}
          />
        </Card>
      }

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
              Staking account info (USD)
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
              Staking account info (SOL)
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