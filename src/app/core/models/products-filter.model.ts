export interface ProductsFilter {
    brandIds: number[];
    tagIds: number[];
    categoryId: any;
    priceMin: number;
    priceMax: number;
    name: string;
    sortBy: number;
}