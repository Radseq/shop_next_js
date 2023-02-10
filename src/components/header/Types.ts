export type NavProduct = {
    id: number
    name: string
    price: number
    imgUrl: string
    descFirst: string
    descSecond: string
    descThird: string
}

export type SubCategory = {
    id: number,
    name: string
    linkUrl: string
}

export type MenuCategory = {
    id: number
    name: string
    url: string
    subCategories?: SubCategory[]
    product?: NavProduct
}

export type RootNavigation = {
    id: number;
    name: string;
    categories: MenuCategory[];
    url: string;
}

export type RootNavigationExt = RootNavigation & {
    menuItemLeftOffset: number,
    menuItemWidth: number
}

export type SearchProduct = {
    id: number,
    imgSrc: string,
    score: number,
    name: string,
    price: number
}

export type ProductSearchResult = {
    id: number,
    name: string,
    price: number
}

export type SearchResult = {
    productSearchResult: ProductSearchResult[],
    recomendedProducts?: SearchProduct[],
    lastSeenProducts?: SearchProduct[]
}
