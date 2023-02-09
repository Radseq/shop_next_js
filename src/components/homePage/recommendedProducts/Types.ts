export type RecommendedProduct = {
    id: number,
    name: string,
    description: string,
    imageSrc: string,
    price: number,
    vat: number,
    promotionPrice: number,
    category: RecommendedProductCategory
}

export type RecommendedProductCategory = {
    freeShipping: boolean,
    bestseller: boolean,
}