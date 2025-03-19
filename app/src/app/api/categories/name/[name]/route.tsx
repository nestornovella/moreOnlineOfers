import { NextResponse, NextRequest } from "next/server";
import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";


export async function GET(request: NextRequest, {params}) {
  try {
    const {name} = params;
    const categoryName = await prismaClient.category.findFirst({
      where: {name}
    })
    return NextResponse.json(categoryName, {status: 200});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}