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


export async function PUT(request:NextRequest){
   try {
    const body = await request.json()
    if(!body.id) throw new Error('error al intentar modificar el producto')
    const product = await prismaClient.product.update({where:{id:body.id}, data: body})
    if(!product){
        throw new Error('no se logro modificar el producto')
    }
    else return NextResponse.json('producto actualizado')
   } catch (error) {
    return NextResponse.json(error.message)
   } 
}


export async function POST(request: NextRequest) {
    try {
        const { name, price, categories, description, image, parentId, measureUnits, measureValue } = await request.json()
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
                },
                measureUnits:!measureUnits ? "Gr" : measureUnits,
                measureValue:!measureValue ? 500 : measureValue

            }
        })

        const sellers = await prismaClient.seller.findMany()

        await prismaClient.sellerProduct.createMany({
            data: sellers.map(sell => {

                return {
                    productId: product.id,
                    sellerId: sell.id,
                    porcent:20

                }
            })
        })

        if (!product) throw new Error('problemas para crear producto o asociarlo')
        return NextResponse.json(product, { status: 201 });
    } catch (error) {
        if (error instanceof Error) {
            return NextResponse.json({ error: error.message }, { status:500});
        }
    }
}

