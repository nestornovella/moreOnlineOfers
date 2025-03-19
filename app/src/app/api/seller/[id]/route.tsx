import { NextRequest, NextResponse } from "next/server";
import {prismaClient} from "@/helpers/singeltonPrisma/prismaClient";


export async function GET(request: NextRequest, {params}) {
  try {
    const {id} = params;
    const seller = await prismaClient.seller.findUnique({where: {id}});
    return NextResponse.json(seller, {status: 200});
  } catch (error) {
    if(error instanceof Error) {
      return NextResponse.json({error: error.message}, {status: 500});
    }
  }
}

export async function PUT(request: NextRequest, {params}) {
  try {
    const {id} = params;
    const body = await request.json();
    const updated = await prismaClient.seller.update({where: {id}, data: body});
    return NextResponse.json({message: "updated", updated}, {status: 200});
  } catch (error) {
    if(error instanceof Error) {
      return NextResponse.json({error: error.message}, {status: 500});
    }
  }
}

export async function DELETE(request: NextRequest, {params}) {
  try {
    const {id} = params;
    const deleted = await prismaClient.seller.delete({where: {id}});
    return NextResponse.json({message: "deleted", deleted}, {status: 204});
  } catch (error) {
    if(error instanceof Error) {
      return NextResponse.json({error: error.message}, {status: 500});
    }
  }
}