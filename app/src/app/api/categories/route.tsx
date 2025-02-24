import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";


export async function GET(request: NextRequest) {
    try {
        const parentId = request.nextUrl.searchParams.get("parentId");

        async function getCategoriesWithChilds(parentId: string | null = null):Promise<any> {

            const categories = await prismaClient.category.findMany({
                where:{parentId},
                include:{
                    parent:true,
                    subCategory:true
                }
                
            })
           
            return Promise.all(categories.map(async (category:any)=>({
                ...category,
                subCategory: await getCategoriesWithChilds(category.id)
            })))

        }

        const categories = await getCategoriesWithChilds(parentId)
        return NextResponse.json(categories, {status: 202});

    } catch (error: unknown) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status:500});
        }
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, parentId } = await request.json();
        if(!name) throw new Error("el nombre es requerido para crear la categoria");
        const newCategory = await prismaClient.category.upsert({
            where: {name},
            create: {
                name,
                parent: parentId ? { connect: { id: parentId } } : undefined
            },
            update: {},
        });
        return NextResponse.json(newCategory, {status: 201});
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status:500});
        }
    }
}
