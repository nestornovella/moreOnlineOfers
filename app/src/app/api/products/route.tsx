import { prismaClient } from '@/helpers/singeltonPrisma/prismaClient';
import { NextRequest, NextResponse } from 'next/server';



export async function GET() {
    try {
        const allProducts = await prismaClient.product.findMany({
            where: {
                parentId: null
            }, include: {
                varieties: true,
                categories:true
            }
        })
        return NextResponse.json(allProducts, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}


export async function POST(request: NextRequest) {
    try {
        const { name, price, categories, description, image, parentId } = await request.json()
        if (!categories.length) throw new Error('categorias requeridas')
        if (!image) throw new Error('imagen requerida')
        if (!name) throw new Error('nombre requerido')
        if (!price) throw new Error('precio requerido')
        const product = await prismaClient.product.create({
            data: {
                name,
                price: parseFloat(price),
                categories:{
                    connect: categories.map( (id:string) => ({id}))
                },
                description,
                image,
                parent:{
                    connect: parentId ? {id:parentId} : undefined
                }

            }
        })
        if (!product) throw new Error('problemas para crear producto o asociarlo')
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status:500});
        }
    }
}


export async function PUT() {
    try {

        return NextResponse.json({ message: 'Updated' }, { status: 200 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status: 500 });
        }
    }
}

