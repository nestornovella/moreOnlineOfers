import { prismaClient } from "@/helpers/singeltonPrisma/prismaClient";
import { NextRequest, NextResponse } from "next/server";
import { Params } from "@/app/api/interfaces";


export async function DELETE(request: NextRequest, {params}: Params) {
    try {
        const {id} = params;
        const deleted = await prismaClient.product.delete({
            where:{id}
        })
        console.log(deleted)
        return NextResponse.json({ message: 'Deleted' }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}