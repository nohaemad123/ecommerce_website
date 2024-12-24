import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const DiscountsController = {
    GetPaymentTypes: BaseURL + `/Discounts/GetAllPaymentType`
}