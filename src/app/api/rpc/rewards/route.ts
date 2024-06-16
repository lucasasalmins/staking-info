import { getRewards } from "@/utils/solanaRpc";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(`[POST] api/rpc/rewards`)
  try {
    const formData = await request.formData();
    console.log("formData", formData)

    const address = formData.get("address") as string
    const activationEpoch = formData.get("activationEpoch") as string
    const rewards = await getRewards(address, parseInt(activationEpoch))

    return NextResponse.json({ rewards });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}