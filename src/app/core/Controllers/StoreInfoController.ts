import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const StoreInfoController = {
    GetStoreInfo: BaseURL + `/StoreInfo/GetStoreInfoByTenant`
}