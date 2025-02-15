import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const seller = await prismaClient.seller.findMany();
    return NextResponse.json(seller, {status: 200});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}