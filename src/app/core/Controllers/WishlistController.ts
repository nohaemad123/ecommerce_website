import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const WishlistController = {
    GetWishlistProducts: BaseURL + `/WishList/GetWishListByUserId`,
    AddProductToWishlist: BaseURL + `/WishList/AddProductToWishList`,
    RemoveProductToWishlist: BaseURL + `/WishList/RemoveFromWishList`
}