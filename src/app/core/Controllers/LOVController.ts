import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const LOVController = {
    GetCategoriesList: BaseURL + `/ListOfValues/getCategories`,
    GetSubCategoriesList: BaseURL + `/ListOfValues/getSubCategories`,
    GetBrandsList: BaseURL + `/ListOfValues/getBrands`
}