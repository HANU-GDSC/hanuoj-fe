import { loginRequest, loginResponse, loginApi } from "../api/loginApi";
import User from "../User";

async function login(user) {
    try {
        console.assert(user instanceof User);
        const usernameOrEmail = user.getUsername() || user.getEmail();
        const loginResponse = await loginApi(
            new loginRequest({
                usernameOrEmail,
                password: user.getPassword()
            })
        );
        return loginResponse.data;
    } catch (error) {
        throw error;
    }
}

export {
    login
}