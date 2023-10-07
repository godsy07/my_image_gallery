
let BASE_URL = "", BASE_UPLOAD_URL = "";

if (process.env.NODE_ENV ==="production") {

} else {
    BASE_URL = "http://localhost:5001/my_apis/v1";
    BASE_UPLOAD_URL = "http://localhost:5001";
}

export { BASE_URL, BASE_UPLOAD_URL };
