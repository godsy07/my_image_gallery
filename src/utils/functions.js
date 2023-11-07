
export const isValidEmail = (email) => {
    var emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

    return emailPattern.test(email);
}


export const isHTML = (content) => {
    const tempElement = document.createElement('div');
    tempElement.innerHTML = content;
    // Check if the innerHTML of the temporary element is different from the original content
    // This indicates that the content was successfully parsed as HTML
    return tempElement.innerHTML !== content;
}

export const getMyApiCookieToken = () => {
	const myCookie = document.cookie;
	const apiTokenCookie = myCookie.split('; ').find((cookie) => cookie.startsWith('my_api_token=')).split('=')[1];
    return apiTokenCookie;
}
