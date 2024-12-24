import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const ProductsController = {
    GetStoreProducts: BaseURL + `/Products/GetStoreProducts`,
    GetProductDetails: BaseURL + `/Products/GetStoreProductDetails?ProductId=`,
    GetProductRatings: BaseURL + `/ProductRatings/GetProductRatingByProductId`,
    AddProductRating: BaseURL + `/ProductRatings/AddProductRating`,
    GetRelatedProducts: BaseURL + `/Products/GetRelatedProducts`
}