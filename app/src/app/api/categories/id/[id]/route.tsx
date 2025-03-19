import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextResponse, NextRequest } from "next/server";

// GET: Obtener una categoría por ID
export async function GET(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const category = await prismaClient.category.findUnique({
      where: { id },
      include: {
        subCategory: true,
      },
    });

    if (!category) {
      return NextResponse.json({ error: "Categoría no encontrada" }, { status: 404 });
    }

    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

// PUT: Actualizar una categoría por ID
export async function PUT(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;
    const body = await request.json();

    const updated = await prismaClient.category.update({
      where: { id },
      data: body,
      include: { subCategory: true },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

// DELETE: Eliminar una categoría por ID
export async function DELETE(
  request: NextRequest,
  context: { params: { id: string } }
) {
  try {
    const { id } = context.params;

    const deletedCategory = await prismaClient.category.delete({
      where: { id },
    });

    return NextResponse.json(deletedCategory, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}