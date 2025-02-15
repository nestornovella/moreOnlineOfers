import { Params } from "@/app/api/interfaces";
import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";




export async function PUT(request:NextRequest, {params}:Params) {
    try {
       
        const body = await request.json()
        const {id} = params
        const updated = await prismaClient.product.update({
            where:{id},
            data:body
        })

        return NextResponse.json({ message: 'Updated', updated }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}



export async function DELETE(request: NextRequest, {params}:{params:{id:string}}) {
    try {
        const deleted = await prismaClient.product.delete({
            where:{
                id: params.id
            }
        })
        return NextResponse.json({ message: 'Deleted' }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}