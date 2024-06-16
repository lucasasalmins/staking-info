import { getStakingAccounts } from "@/utils/solanaRpc";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(`[POST] api/rpc/staking-accounts`)
  try {
    const formData = await request.formData();
    console.log("[POST] api/rpc/staking-accounts formData", formData)

    const address = formData.get("address") as string
    const stakingAccounts = await getStakingAccounts(address)
    console.log("[POST] api/rpc/staking-accounts stakingAccounts", stakingAccounts)

    return NextResponse.json({ stakingAccounts: stakingAccounts.map(sa => sa.pubkey.toString()) });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}