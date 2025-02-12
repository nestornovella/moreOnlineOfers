import { prismaClient } from '@/helpers/singeltonPrisma/prismaClient';
import { NextRequest, NextResponse } from 'next/server';



export async function GET(request: NextRequest, { params }: { params: { name: string } }) {

    try {
        const { name } = params

        if(!name) return NextResponse.json([], { status: 200 });

        if (!name) throw new Error('se requiere el nombre del producto que se busca')
        const products = await prismaClient.product.findMany({
            where:{
                name:{
                    contains:name,
                    mode:'insensitive'
                },
                parentId:null
            }
        })
        
        return NextResponse.json(products, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    } 
}



