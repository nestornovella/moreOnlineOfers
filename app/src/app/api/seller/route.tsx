import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

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

export async function POST(request: NextRequest) {
  try {
    const {name, phoneNumber, porcent, password} = await request.json();
    if(!name || !phoneNumber || !porcent || !password) {
      return NextResponse.json({message: "faltan datos para crear el vendedor"}, {status: 400});
    }
    const seller = await prismaClient.seller.create({
      data: {
        name,
        phoneNumber,
        porcent,
        password
      }
    }) 
    return NextResponse.json(seller, {status: 201});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}