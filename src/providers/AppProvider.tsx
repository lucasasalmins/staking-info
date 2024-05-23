
import { Context, createContext, ReactNode, useContext, useMemo, useReducer } from "react";
import { AppReducer, SEARCHING, SET_ADDRESS, SET_STAKING_INFO } from "./AppReducer";

import { aggregateRewards, StakingInfo } from "@/utils/solanaRpc";
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
}

type AppStateAndBehaviour = AppBehaviour & AppState


const AppContext: Context<AppStateAndBehaviour> = createContext({} as AppStateAndBehaviour)

export function useApp() {
  return useContext(AppContext);
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
      rewards: []
    }
  }

  const [state, dispatch] = useReducer(
    AppReducer,
    initialState
  )

  async function getStakingInfo(address: string) {
    dispatch({ type: SEARCHING, searching: true })
    // const res = await getStakingInfoForAddress(address)

    const formData = new FormData();
    formData.append('address', address);


    const response = await axios.post(
      "/api/rpc",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
          "Access-Control-Allow-Origin": "*",
        },
      }
    )
    // console.log(`getStakingInfo: ${JSON.stringify(response)}`)
    const stakingInfo = aggregateRewards(response.data.stakingInfos, address)
    return dispatch({ type: SET_STAKING_INFO, stakingInfo })
  }

  function setAddress(address: string) {
    return dispatch({ type: SET_ADDRESS, address })
  }

  const AppsContext = useMemo<AppStateAndBehaviour>(() => ({
    address: state.address,
    stakingInfo: state.stakingInfo,
    getStakingInfo,
    setAddress
  }), [state])

  return (
    <AppContext.Provider value={AppsContext}>
      {children}
    </AppContext.Provider>
  )
}

