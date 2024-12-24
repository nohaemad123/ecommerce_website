import { environment } from "src/environments/environment"

let BaseURL = environment.endPointUrl;

export const TagsController = {
    GetAllTags: BaseURL + `/Tag/GetAllTags`,
}