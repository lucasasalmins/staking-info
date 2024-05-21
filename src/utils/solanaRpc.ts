import {
  Connection,
  GetProgramAccountsResponse,
  InflationReward,
  ParsedAccountData,
  PublicKey
} from '@solana/web3.js';

const STAKE_PROGRAM_ID = new PublicKey('Stake11111111111111111111111111111111111111');
const CONNECTION = new Connection('https://api.mainnet-beta.solana.com');
const LAMPORTS_PER_SOL = 1000000000

async function getStakingAccounts(address: string) {
  const publicKey = new PublicKey(address)

  // Get all accounts managed by the Stake Program
  console.log("looking up staking accounts")
  const stakeAccounts: GetProgramAccountsResponse = await CONNECTION.getProgramAccounts(STAKE_PROGRAM_ID, {
    commitment: 'confirmed',
    filters: [
      {
        memcmp: {
          offset: 44,
          bytes: publicKey.toBase58(), // your pubkey, encoded as a base-58 string
        },
      },
    ],
  });

  return stakeAccounts
}

interface StakingInfo {
  address: string
  balance: number
  stake: number
  validator: string
  activationEpoch: number
  rewards: InflationReward[]
}

async function getInfoForStakingAccount(address: string): Promise<StakingInfo> {
  console.log(`---------------------------------------------------------------`)
  console.log(`looking up info for ${address}`)
  const publicKey = new PublicKey(address)


  const parsedAccountInfo = await CONNECTION.getParsedAccountInfo(publicKey)
  const balance = parsedAccountInfo.value!.lamports / LAMPORTS_PER_SOL
  const stakeActivationData = await CONNECTION.getStakeActivation(publicKey)

  // console.log(`stakeActivationData: ${JSON.stringify(stakeActivationData)}`)
  // console.log(parsedAccountInfo)
  // console.log(`account balance: ${balance} SOL`)

  const accountData: ParsedAccountData = parsedAccountInfo.value!.data as ParsedAccountData
  // console.log(JSON.stringify(accountData.parsed, null, 4))

  const stakeInfo = accountData.parsed.info.stake
  const stake = stakeInfo.delegation.stake / LAMPORTS_PER_SOL
  const validator = stakeInfo.delegation.voter
  const activationEpoch = stakeInfo.delegation.activationEpoch

  // console.log(`stakeInfo: ${JSON.stringify(stakeInfo)}`)
  // console.log(`stake: ${stake}`)
  // console.log(`validator: ${validator}`)
  // console.log(`activationEpoch: ${activationEpoch}`)

  // get activation epoch
  // const activationEpoch = await COM
  // get latest epoch
  // range in between
  // getInflationReward for each epoch
  const currentEpoch = await CONNECTION.getEpochInfo()
  // console.log(`currentEpoch: ${JSON.stringify(currentEpoch)}`)

  const epochDiff = currentEpoch.epoch - activationEpoch
  const rewardEpochs = Array.from({ length: epochDiff - 1 }, (v, k) => k + parseInt(activationEpoch) + 1)
  console.log(`rewardEpochs: ${rewardEpochs}`)

  const rawRewards = await Promise.all(
    rewardEpochs
      .map(async epoch => await CONNECTION.getInflationReward([publicKey], epoch))
  )

  const rewards = rawRewards
    .map(r => r[0])
    .map(reward => {
      // if (reward) {
      return {
        ...reward,
        amount: reward!.amount / LAMPORTS_PER_SOL,
        postBalance: reward!.postBalance / LAMPORTS_PER_SOL,
      }
      // }
    })
  // console.log(`rewards: ${JSON.stringify(rewards, null, 4)}`)
  return {
    address,
    balance,
    stake,
    validator,
    activationEpoch,
    rewards: rewards as InflationReward[],
  }
}

export async function getStakingInfoForAddress(address: string): Promise<StakingInfo[]> {
  const stakeAccounts = await getStakingAccounts(address)

  console.log(`found the following staking accounts for address: ${address}`)
  stakeAccounts.forEach(sa => console.log(sa.pubkey.toString()))


  const stakingInfos = await Promise.all(stakeAccounts.map(async address => await getInfoForStakingAccount(address.pubkey.toString())))
  return stakingInfos
  // return [await getInfoForStakingAccount("GcJhRHeuATxQdEq2HNWKSWFT6dJb1nccywcvE4y44Dxq")]
}
