
let BASE_URL = "";

if (process.env.NODE_ENV ==="production") {

} else {
    BASE_URL = "http://localhost:5001/my_apis/v1";
}

export { BASE_URL };
