import axios from "axios";
import { BASE_URL } from "../config/config";
import { getMyApiCookieToken, isHTML } from "../utils/functions";

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

export const getRequest = async ({ fetch_url="", auth=false }) => {
	let responseObject = {};
	let apiTokenCookie;
	if (auth) {
		apiTokenCookie = getMyApiCookieToken();
		if (!apiTokenCookie) return;
	}
	try {
		let response;
		if (!apiTokenCookie) {
			response = await axios.get(fetch_url);
		} else {
			response = await axios.get(fetch_url,
				{
					headers: {
						'Authorization': `Bearer ${apiTokenCookie}`,
					},
					withCredentials: true
				}
			);
		}
		responseObject = response.data;
	} catch(e) {
		if (e.response) {
			responseObject = e.response.data;
		} else {
			responseObject = { status: false, message: 'Something went wrong!!!' };
		}
	}
	return responseObject;
}

export const postRequest = async ({ fetch_url="", post_object={}, auth=false }) => {
	let responseObject = {};
	let apiTokenCookie;
	if (auth) {
		apiTokenCookie = getMyApiCookieToken();
		if (!apiTokenCookie) return;
	}
	try {
		let response;
		if (!apiTokenCookie) {
			response = await axios.post(fetch_url, post_object);
		} else {
			response = await axios.post(fetch_url,
				post_object,
				{
					headers: {
						'Authorization': `Bearer ${apiTokenCookie}`,
					},
					withCredentials: true
				}
			);
		}
		responseObject = response.data;
	} catch(e) {
		if (e.response) {
			responseObject = e.response.data;
		} else {
			responseObject = { status: false, message: 'Something went wrong!!!' };
		}
	}
	return responseObject;
}

export const handleDeleteMyImageFromList = async(image_id) => {
	return await getRequest({ fetch_url: `${BASE_URL}/images/delete-image/${image_id}`, auth: true });
}

export const getUserDetails = async(user_id) => {
	return await getRequest({ fetch_url: `${BASE_URL}/user/get-user-details/${user_id}`, auth: true });
}

export const updateUserDetails = async(updateObject) => {
	if (!updateObject) return;
	return await postRequest({ fetch_url: `${BASE_URL}/user/update-user`, post_object: updateObject, auth: true });
}
