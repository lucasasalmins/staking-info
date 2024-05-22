'use client'

import { RiSearchLine } from "@remixicon/react"
import { Card, TextInput } from "@tremor/react"

export default function Search() {
  return (

    <Card className="my-2">
      <TextInput icon={RiSearchLine} placeholder="sol address..." />
    </Card>
  )
}