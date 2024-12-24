import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const OrderController = {
    GetOrdersList: BaseURL + `/Order/GetOrders`,
    GetOrderDetails: BaseURL + `/Order/GetOrderById?Id=`,
    PlaceOrder: BaseURL + `/Order/PlaceOrder`
}
