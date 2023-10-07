import axios from "axios";
import { isHTML } from "../utils/functions";

export const fetchPaginatedData = async (fetch_url) => {
	let errorResponseObject = { status: false, data: [], total_pages: 1, total_items: 0, page_no: 1, message: "Something went wrong." };
	try {
		if (!fetch_url || fetch_url === "") {
			errorResponseObject.message = "Please provide fetch api url.";
			return errorResponseObject;
		}
		const response = await axios.get(fetch_url,
			{
				withCredentials: true,
			}
		);
		return response.data;
	} catch(e) {
		if (e.response) {
            console.log("e.response: ", e.response)
			if (e.response.status === 404 && isHTML(e.response.data)) {
				errorResponseObject.message = "Please enter a valid fetch api url.";
			} else {
                errorResponseObject = {...e.response.data};
			}
		} else {
			errorResponseObject.message = "Something went wrong.";
		}
        return errorResponseObject;
	}
}
