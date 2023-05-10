import axios from "axios";
import { form } from "./index"
let page = 1;
export async function callForImgs() {
    const params = new URLSearchParams({
        per_page: 40,
        key: '36224530-0ce46c8c70d6d91971a56eb8c',
        image_type: "photo",
        orientation: "horizontal",
        safesearch: true,
        q: (form.elements.searchQuery.value).trim().replaceAll(" ", "+"),
    })
    const URL = `https://pixabay.com/api/?${params}`;
    const response = await axios.get(URL)
    return response;
}
/* (form.elements.searchQuery.value).replaceAll(" ", "+") */