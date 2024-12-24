import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const AuthController = {
    Login: BaseURL + `/Auth/CustomerLogin`,
    Register: BaseURL + `/Auth/registerCustomer`,
    GetUserByToken: BaseURL + `/Auth/GetUserFromToken?token=`,
    UpdateProfile: BaseURL + `/Auth/update-user`,
    UpdatePassword: BaseURL + `/Auth/ChangePassword`
}