

export interface CategoryIF{
    id: string
    name: string
    products: ProductIF[]
    parentId?: string
    parent: CategoryIF
    subCategory: CategoryIF[]
}

export interface ProductIF{
    id: string
    name: string 
    description?: string
    categories: CategoryIF[]
    parentId?: string
    parent: ProductIF
    varieties: ProductIF[]
    price: number
    image?: string
}

export interface SellerIF{
    id: string
    name: string 
    phoneNumber: string
    porcent: number
    orders: OrderIF[]
    admin: boolean
}

export interface OrderIF{
    id: string
    order: any
    total: number
    totalDiscount: number
    sellerId: string
    seller: SellerIF
    viewed: boolean
    completed: boolean
    delivered: boolean
}

