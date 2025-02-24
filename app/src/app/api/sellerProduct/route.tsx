import {prismaClient} from "@/helpers/singeltonPrisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {
  try {
    const sellerProducts = await prismaClient.sellerProduct.findMany({
      include: {
        seller: true,
        product: true
      }
    });

    return NextResponse.json(sellerProducts, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function POST(request: NextRequest) {
  try {
    const {sellerId, productId, porcent} = await request.json();
    const sellerProduct = await prismaClient.sellerProduct.upsert({
      where: {
        sellerId_productId: {
          sellerId,
          productId,
        }
      },
      create: {
        sellerId,
        productId,
        porcent: porcent || 0.0
      },
      update: {
        porcent: porcent || 0.0 // Actualiza el porcentaje si ya existe
      }
    });
    return NextResponse.json(sellerProduct, {status: 201});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}