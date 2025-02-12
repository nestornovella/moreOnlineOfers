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
        return NextResponse.json(categories)

    } catch (error: unknown) {
        if(error instanceof Error)return NextResponse.json({error: error.message});
        else return NextResponse.json('error inesperado')
    }
}

export async function POST(request: NextRequest) {
    try {
        const { name, parentId } = await request.json()
        const newCategory = await prismaClient.category.create({
            data: {
                name,
                parent: parentId ? { connect: { id: parentId } } : undefined
            },
            include: {
                parent: true,
                subCategory: true
            }
        })
        if (!newCategory) throw new Error('no se logro crear la categoria')
        return NextResponse.json(newCategory)
    } catch (error) {
        return NextResponse.json("error")
    }
}
