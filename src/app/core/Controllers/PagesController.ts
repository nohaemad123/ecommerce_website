import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const PagesController = {
    GetFooterMenu: BaseURL + `/Pages/getStoreFooter`,
    GetPageSections: BaseURL + `/Pages/GetStorePageSections/`,
    GetPageSectionDetails: BaseURL + `/SectionMultiTypes/GetPageSectionDetails?SectionId=`
}