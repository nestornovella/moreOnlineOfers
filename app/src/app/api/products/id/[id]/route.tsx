
import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";


export async function PUT(request:NextRequest, {params}) {
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

export async function DELETE(request: NextRequest, {params}) {
    try {
        const {id} = params;
        const deleted = await prismaClient.product.delete({
            where:{id}
        })
        return NextResponse.json({message: "producto eliminado", deleted}, { status: 204 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}