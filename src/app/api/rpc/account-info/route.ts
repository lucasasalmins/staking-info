import { getAccountInfo } from "@/utils/solanaRpc";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  console.log(`[POST] api/rpc/account-info`)
  try {
    const formData = await request.formData();
    console.log("formData", formData)

    const address = formData.get("address") as string
    const accountInfo = await getAccountInfo(address)

    return NextResponse.json({ accountInfo });
  } catch (error) {
    console.error("Error uploading image:", error);
    NextResponse.json({ message: "Error uploading image" });
  }
}