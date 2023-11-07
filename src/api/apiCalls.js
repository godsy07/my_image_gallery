import axios from "axios";
import Swal from "sweetalert2";
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

export const handleDeleteMyImageFromList = async(image_id) => {
	let responseObject = {};
	const apiTokenCookie = getMyApiCookieToken();
	try {

		if (!image_id) return;
		const confirmDelete = await Swal.fire({
			icon: 'warning',
			title: 'Warning',
			text: 'Are you sure to delete this image?',
			showDenyButton: true,
			denyButtonText: 'No',
			confirmButtonText: 'Yes',
		});
		if (!confirmDelete.isConfirmed) return;
		const response = await axios.get(`${BASE_URL}/images/delete-image/${image_id}`,
			{
				headers: {
					'Authorization': `Bearer ${apiTokenCookie}`,
				},
				withCredentials: true
			}
		);
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

export const getUserDetails = async(user_id) => {
	let responseObject = {};
	const apiTokenCookie = getMyApiCookieToken();
	try {
		const response = await axios.get(`${BASE_URL}/user/get-user-details/${user_id}`,
			{
				headers: {
				'Authorization': `Bearer ${apiTokenCookie}`,
				},
				withCredentials: true,
			}
		);
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

export const updateUserDetails = async(updateObject) => {
	let responseObject = {};
	const apiTokenCookie = getMyApiCookieToken();
	try {
		if (!updateObject) return;
		const response = await axios.post(`${BASE_URL}/user/update-user`,
		  updateObject,
		  {
			headers: {
			  'Authorization': `Bearer ${apiTokenCookie}`,
			},
			withCredentials: true,
		  },
		);
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
