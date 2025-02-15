import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextResponse } from "next/server";
import { Params } from "../../interfaces";

export async function GET(request: Request, { params }: Params) {
  try {
    const { id } = params;
    const category = await prismaClient.category.findUnique({
      where: { id },
      include: {
        subCategory: true,
      },
    });
    return NextResponse.json(category, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function PUT(request: Request, { params }: Params) {
  try {
    const { id } = await params;
    const body = await request.json();
    const subCat = await Promise.all(
      body.subCategory.map(async (subCatName: string) => {
        const existingSubCategory = await prismaClient.category.findFirst({
          where: { name: subCatName },
        });

        if (existingSubCategory) {
          return { id: existingSubCategory.id };
        } else {
          const newSubCategory = await prismaClient.category.create({
            data: {
              name: subCatName,
              parent: { connect: { id } }, 
            },
          });
          return { id: newSubCategory.id };
        }
      })
    );

    const updated = await prismaClient.category.update({
      where: { id },
      data: {
        name: body.name,
        subCategory: {
          set: subCat,
        },
      },
      include: { subCategory: true },
    });

    return NextResponse.json(updated, { status: 200 });
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}

export async function DELETE(request: Request, {params}: Params) {
  try {
    const {id} = await params;
    const deletedCategory = await prismaClient.category.delete({where: {id}});
    return NextResponse.json(deletedCategory, {status: 200});
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json({ error: error.message }, { status: 500 });
    }
  }
}