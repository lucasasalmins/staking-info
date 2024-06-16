
import { Context, createContext, ReactNode, useContext, useMemo, useReducer } from "react";
import { AppReducer, SEARCHING, SET_ADDRESS, SET_LOGS, SET_STAKING_INFO } from "./AppReducer";

import { AccountInfo, aggregateRewards, StakingInfo } from "@/utils/solanaRpc";
import axios from "axios";

export type Children = {
  children: ReactNode
}

type AppBehaviour = {
  getStakingInfo: (address: string) => Promise<void>
  setAddress: (address: string) => void
}


export type AppState = {
  address: string
  stakingInfo: StakingInfo
  searching: boolean
  log: string
  logs: string[]
}

type AppStateAndBehaviour = AppBehaviour & AppState


const AppContext: Context<AppStateAndBehaviour> = createContext({} as AppStateAndBehaviour)

export function useApp() {
  return useContext(AppContext);
}

const REQUEST_CONFIG = {
  headers: {
    "Content-Type": "multipart/form-data",
    "Access-Control-Allow-Origin": "*",
  },
}


export function AppProvider({ children }: Children) {

  const initialState: AppState = {
    address: "",
    stakingInfo:
    {
      address: "",
      balance: 0,
      stake: 0,
      validator: "",
      activationEpoch: "",
      rewards: [],
    },
    log: "",
    logs: [],
    searching: false
  }

  const [state, dispatch] = useReducer(
    AppReducer,
    initialState
  )

  console.log(JSON.stringify(state, null, 4))

  async function getStakingInfo(address: string) {
    console.log(`[AppProvider]: getStakingInfo: address: ${address}`)
    dispatch({ type: SEARCHING, searching: true })

    const stakingAccountsFormData = new FormData();
    stakingAccountsFormData.append('address', address);
    const stakingAccountsResponse = await axios.post("/api/rpc/staking-accounts", stakingAccountsFormData, REQUEST_CONFIG)
    console.log(`stakingAccounts: ${JSON.stringify(stakingAccountsResponse)}`)
    const stakingAccounts = stakingAccountsResponse.data.stakingAccounts as string[]

    console.log(`stakingAccounts: ${stakingAccounts}`)

    if (stakingAccounts.length === 0) {
      const stakingAccountsLog = `no staking accounts found for ${address}`
      dispatch({
        type: SET_LOGS,
        log: stakingAccountsLog,
      })
      return dispatch({ type: SEARCHING, searching: false })
    }

    // const stakingAccounts = [
    //   "GJgmaNvAUHRfReDuUFK9kNBqE33SyAreSjzXEoWo4yq",
    //   "GcJhRHeuATxQdEq2HNWKSWFT6dJb1nccywcvE4y44Dxq"
    // ]

    if (stakingAccounts.length > 0) {
      const stakingAccountsLog = `found ${stakingAccounts.length} staking accounts: ${stakingAccounts.join(",")}`
      dispatch({
        type: SET_LOGS,
        log: stakingAccountsLog,
      })

      const stakingInfos = await stakingAccounts.reduce(async (previousPromise, stakingAccount) => {
        const accumulator = await previousPromise;
        const stakingAccountLog = `getting rewards for staking account: ${stakingAccount}`
        dispatch({
          type: SET_LOGS,
          log: stakingAccountLog
        })
        const accountInfoFormData = new FormData();
        accountInfoFormData.append('address', stakingAccount);
        const accountInfoResponse = await axios.post("/api/rpc/account-info", accountInfoFormData, REQUEST_CONFIG)
        const accountInfo = accountInfoResponse.data.accountInfo as AccountInfo

        const rewardsFormData = new FormData();
        rewardsFormData.append('address', stakingAccount);
        rewardsFormData.append('activationEpoch', accountInfo.activationEpoch);
        const rewardsResponse = await axios.post("/api/rpc/rewards", rewardsFormData, REQUEST_CONFIG)
        const rewards = rewardsResponse.data.rewards

        return [...accumulator, {
          ...accountInfo,
          rewards
        } as StakingInfo];
      }, Promise.resolve([] as StakingInfo[]));

      console.log(`stakingInfos`, stakingInfos)

      const stakingInfo = aggregateRewards(stakingInfos, address)
      return dispatch({ type: SET_STAKING_INFO, stakingInfo })
    }

  }

  function setAddress(address: string) {
    return dispatch({ type: SET_ADDRESS, address })
  }

  const AppsContext = useMemo<AppStateAndBehaviour>(() => ({
    address: state.address,
    stakingInfo: state.stakingInfo,
    log: state.log,
    logs: state.logs,
    searching: state.searching,
    getStakingInfo,
    setAddress
  }), [state])

  return (
    <AppContext.Provider value={AppsContext}>
      {children}
    </AppContext.Provider>
  )
}

