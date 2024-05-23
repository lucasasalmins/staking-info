import { getStakingInfoForAddress } from "@/utils/solanaRpc";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(`[POST] api/rpc/`)
  try {
    const formData = await request.formData();
    console.log("formData", formData)

    const address = formData.get("address") as string
    const stakingInfos = await getStakingInfoForAddress(address)

    return NextResponse.json({ stakingInfos });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}