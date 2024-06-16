import { StakingInfo } from "@/utils/solanaRpc"


type AppAction =
  { type: typeof SET_STAKING_INFO, stakingInfo: StakingInfo } |
  { type: typeof SEARCHING, searching: boolean } |
  { type: typeof SET_ADDRESS, address: string } |
  { type: typeof SET_LOGS, log: string }

export const SEARCHING = "SEARCHING"
export const SET_STAKING_INFO = "SET_STAKING_INFO"
export const SET_ADDRESS = "SET_ADDRESS"
export const SET_LOGS = "SET_LOGS"

export const AppReducer = (prevState: any, action: AppAction) => {
  switch (action.type) {
    case SET_STAKING_INFO:
      return {
        ...prevState,
        searching: false,
        stakingInfo: action.stakingInfo,
      }
    case SET_ADDRESS:
      return {
        ...prevState,
        searching: false,
        address: action.address,
      }
    case SEARCHING:
      return {
        ...prevState,
        searching: action.searching,
      }
    case SET_LOGS:
      return {
        ...prevState,
        log: action.log,
        logs: [...prevState.logs, prevState.log]
      }
  }
}
