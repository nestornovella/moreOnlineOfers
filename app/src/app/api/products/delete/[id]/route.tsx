import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";



export async function DELETE(request: NextRequest, {params}:{params:{id:string}}) {
    try {
        const deleted = await prismaClient.product.delete({
            where:{
                id: params.id
            }
        })
        console.log(deleted)
        return NextResponse.json({ message: 'Deleted' }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}