import Details from '@/components/Details';

/**
 * TODO
 * - add "refresh data button"
 * - split rewards into per day/week/month/year
 * - add titles to chart axis
 * - add loading spinners for each component
 * 
 * - forecast earnings
 * - add price appreciation
 * 
 * - toggle graphs between SOL and USD
 * - add date for epoch?
 * 
 * - add context/offline storage to avoid reloading data on save
 * 
 * - stage 2 
 *  - use pda to store data about a user address
 *  - connect address to find details and store history 
 *  - store history, because once staking account is closed, it's lost - confirm?
 * 
 * enhancements
 * - hover over all graphs when hovering over 1, like data dog
 * - 
 */

const SOL_ADDRESS = "FqPoW88rHrwnuTLaVYPaDKG8TdQuKfE5NdJuUEzERPwD"

// async function getData() {
//   const res = await getStakingInfoForAddress("FqPoW88rHrwnuTLaVYPaDKG8TdQuKfE5NdJuUEzERPwD")
//   // The return value is *not* serialized
//   // You can return Date, Map, Set, etc.
//   return res
// }

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
  // console.log(JSON.stringify(data, null, 4))
  return (
    <main
      // className="p-5"
      className="p-4 items-center content-center gap-4"
    // items-center
    >
      <Details
        // stakingInfo={data}
        solPriceUsd={solPriceUsd}
      />
    </main>
  )

}
