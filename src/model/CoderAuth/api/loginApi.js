import apiService from "../../../helpers/apiService";

class loginRequest {
    constructor({
        usernameOrEmail,
        password,
    }) {
        console.assert(typeof usernameOrEmail === "string", "usernameOrEmail must be a string");
        console.assert(typeof password === "string", "password must be a string");
        this.usernameOrEmail = usernameOrEmail;
        this.password = password;
    }
}

class loginResponse {
    constructor({
        code,
        message,
        data,
    }) {
        console.assert(typeof code === "string" || code === null, "code must be a string");
        console.assert(typeof message === "string", "message must be a string");
        console.assert(typeof data === "string" || code === null, "data must be an string (access token)");
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

async function loginApi(req) {
    console.assert(req instanceof loginRequest, "req must be an instance of loginRequest");
    try {
        const response = (await apiService("POST", "/coderAuth/logIn", {}, req)).data;
        return new loginResponse(response);
    } catch (error) {
        throw error;   
    }
}

export {
    loginRequest,
    loginResponse,
    loginApi,
}