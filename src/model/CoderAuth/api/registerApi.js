import apiService from "../../../helpers/apiService";

class RegisterRequest {
    constructor({
        email,
        username,
        password,
    }) {
        console.assert(typeof email === "string", "email must be a string");
        console.assert(typeof username === "string", "username must be a string");
        console.assert(typeof password === "string", "password must be a string");
        this.email = email;
        this.username = username;
        this.password = password;
    }
}

class RegisterResponse {
    constructor({
        code,
        message,
        data,
    }) {
        console.assert(typeof code === "string" || code === null, "code must be a string");
        console.assert(typeof message === "string", "message must be a string");
        console.assert(typeof data === "boolean" || code === null, "data must be a boolean");
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

async function registerApi(req) {
    console.assert(req instanceof RegisterRequest, "req must be an instance of RegisterRequest");
    try {
        const response = (await apiService("POST", "/coderAuth/signUp", {}, req)).data;
        return new RegisterResponse(response).data;
    } catch (error) {
        throw error;   
    }
}

export {
    RegisterRequest,
    RegisterResponse,
    registerApi,
}