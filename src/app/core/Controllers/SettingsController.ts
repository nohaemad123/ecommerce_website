import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const SettingsController = {
    GetStoreSettings: BaseURL + `/Settings/GetSetting`
}