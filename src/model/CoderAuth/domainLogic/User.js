import { LoginRequest, LoginResponse, loginApi } from "../api/loginApi";
import { RegisterRequest, RegisterResponse, registerApi } from "../api/registerApi";
import User from "../User";

async function login(user) {
    try {
        console.assert(user instanceof User);
        const usernameOrEmail = user.getUsername() || user.getEmail();
        const loginResponseData = await loginApi(
            new LoginRequest({
                usernameOrEmail,
                password: user.getPassword()
            })
        );
        return loginResponseData;
    } catch (error) {
        throw error;
    }
}

async function register(user) {
    try {
        console.assert(user instanceof User);
        const registerResponseData = await registerApi(
            new RegisterRequest({
                email: user.getEmail(),
                username: user.getUsername(),
                password: user.getPassword()
            })
        )
        return registerResponseData;
    } catch (error) {
        throw error;
    }
}

export {
    login,
    register,
}