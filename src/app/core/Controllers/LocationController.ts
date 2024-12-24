import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const LocationController = {
    GetAllCountries: BaseURL + `/Country/GetAllCountries`,
    GetCountryCities: BaseURL + `/City/GetCitiesByCountryId?Id=`,
}