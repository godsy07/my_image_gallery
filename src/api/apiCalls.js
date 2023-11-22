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

export const apiRequest = async ({ fetch_url="", method= 'GET', post_object={}, auth=false, multipart=false }) => {
	let responseObject = {};
	let apiTokenCookie;
	if (auth) {
		apiTokenCookie = getMyApiCookieToken();
		if (!apiTokenCookie) return;
	}
	try {
		let response;
		if (method === "GET") {
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
		} else {
			if (!apiTokenCookie) {
				response = await axios.post(fetch_url, post_object);
			} else {
				if (multipart) {
					response = await axios.post(fetch_url,
						post_object,
						{
							headers: {
								'Content-Type': 'multipart/form-data',
								'Authorization': `Bearer ${apiTokenCookie}`,
							},
							withCredentials: true
						}
					);
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
			}
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

export const getUserImageDetails = async (image_id) => {
	if (!image_id) return;
	return await apiRequest({ method: 'GET', fetch_url: `${BASE_URL}/images/get-image-details/${image_id}`, auth: true });
}

export const updateUserImageDetails = async (updateObject) => {
	if (!updateObject) return;
	return await apiRequest({ method: 'POST', fetch_url: `${BASE_URL}/images/update-image-details`, post_object: updateObject, auth: true, multipart: true });
}

export const handleDeleteMyImageFromList = async(image_id) => {
	return await apiRequest({ method: 'GET', fetch_url: `${BASE_URL}/delete-image/${image_id}`, auth: true });
}

export const getUserDetails = async(user_id) => {
	return await apiRequest({ method: 'GET', fetch_url: `${BASE_URL}/user/get-user-details/${user_id}`, auth: true });
}

export const updateUserDetails = async(updateObject) => {
	if (!updateObject) return;
	return await apiRequest({ method: 'POST', fetch_url: `${BASE_URL}/user/update-user`, post_object: updateObject, auth: true });
}
