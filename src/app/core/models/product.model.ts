export interface Product {
  id: number;
  productId: number;
  codeProduct: string;
  productName: string;
  label: string;
  productLabel:string;
  productPrice: number;
  priceAfterDiscount: number;
  discountStartDate: string;
  discountEndDate: string;
  quantity: number;
  costProduct: number;
  qteProducts: number;
  minimumQTE: number;
  maximumQTE: number;
  allowBackorders: boolean;
  weight: number;
  height: number;
  width: number;
  length: number;
  vatAmount: number;
  isInFavorite: boolean;
  productPageUrl: string;
  productPageTitle: string;
  productPageDescription: string;
  productShortDescription: string;
  description: string;
  status: number;
  requiredShipping: boolean;
  publishOnStore: boolean;
  brandID: number;
  taxId: number;
  taxValue: string;
  rate: any;
  rating:any;
  ratingCount: number;
  productNameEn: string;
  labelEn: string;
  productShortDescriptionEn: string;
  descriptionEn: string;
  publishDate: string;
  discounts: any;
  brands: Brands;
  categories: SubCategory[];
  productSubCategories: ProductSubCategory[];
  tags: string[];
  productTags: string[];
  productImages: ProductImage[];
  additionalInformation: AdditionalInformation[];
  isInCart?: boolean;
}

export interface Brands {
  id: number;
  name: string;
  description: string;
  imgBrand: string;
  status: number;
}

export interface SubCategory {
  id: number;
  name: string;
  description: string;
  img: string;
  categoryID: number;
  status: number;
}

export interface ProductSubCategory {
  productId: number;
  subCategoryId: number;
}

export interface ProductImage {
  id: number;
  imageProduct: any;
  isMainImage: boolean;
  productId: number;
  createdBy: any;
  createdOn: string;
  updatedBy: any;
  updatedOn: any;
}

export interface AdditionalInformation {
  propertyNameEn: string;
  propertyValueEn: string;
  id: number;
  propertyName: string;
  propertyValue: string;
}
