
let BASE_URL = "";

if (process.env.NODE_ENV ==="production") {

} else {
    if (document.location.href.includes("localhost")) {
        BASE_URL = "http://localhost:5001/my_apis/v1";
    }
}

export { BASE_URL };
