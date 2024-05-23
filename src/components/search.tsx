'use client'

import { useApp } from "@/providers/AppProvider"
import { RiSearchLine } from "@remixicon/react"
import { Card, TextInput } from "@tremor/react"

export default function Search() {

  const { address, setAddress, getStakingInfo } = useApp()
  console.log(`address: ${address}`)

  function handleKeyDown(event: any) {
    if (event.keyCode === 13) {
      getStakingInfo(address)
    }
  }

  return (

    <Card className="my-2">
      <TextInput
        icon={RiSearchLine}
        placeholder="sol wallet address"
        value={address}
        onValueChange={setAddress}
        onKeyDown={handleKeyDown}
      />
    </Card>
  )
}