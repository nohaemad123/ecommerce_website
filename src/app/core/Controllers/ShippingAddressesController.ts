import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const ShippingAddressesController = {
    GetAllAddresses: BaseURL + `/ShippingAddresses/GetShippingAddresses`,
    AddAddress: BaseURL + `/ShippingAddresses/AddShippingAddress`,
    UpdateAddress: BaseURL + `/ShippingAddresses/UpdateShippingAddress/`,
    DeleteAddress: BaseURL + `/ShippingAddresses?SHippingAddressId=`,
    SetAsDefaultAddress: BaseURL + `/ShippingAddresses/SetDefaultAddress?ShippingAddressId=`,
}