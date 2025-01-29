import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";




export async function GET(params:NextRequest){
    try {
        const parentId = params.nextUrl.searchParams.get("parentId")
        const categories = await prismaClient.category.findMany({
            where: parentId? {parent:{id:parentId}}:{parentId:null},
            include:{
                subCategory:true,
                parent:true
            }
        })
        
        return NextResponse.json(categories)
    } catch (error) {
        return NextResponse.json(error)
    }
}
export async function POST(request:NextRequest){
    try {
        const {name, parentId} = await request.json()
        const newCategory = await prismaClient.category.create({
            data:{
                name,
                parent: parentId ?  {connect:{id: parentId}} : undefined
            },
            include:{
                parent:true,
                subCategory:true
            }
        })
        if(!newCategory) throw new Error('no se logro crear la categoria')
        return NextResponse.json(newCategory)
    } catch (error) {
        return NextResponse.json("error")
    }
}
