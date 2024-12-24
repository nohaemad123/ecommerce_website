import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const CategoriesController = {
    GetStoreCategories: BaseURL + `/Categories/GetStoreCategories`,
    GetCategoriesTree:BaseURL+'/Categories/GetAllCategoriesTree'
}
