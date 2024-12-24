export interface Category {
    id: number;
    sectionId: number;
    sectionTypeId: number;
    categoryId: number;
    categoryName: string;
    logo: string;
    bannerImg: string;
    title: string;
    sectionTitle: string;
    name?:string;
    subcategories: Subcategory[];
  }

  export interface Subcategory {
    productCount: number;
    value: number;
    name: string;
    img: string;
  }
