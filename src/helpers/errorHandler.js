import router from "../router/index";
import store from "../store/index";

export default function(error) {
    console.log(error);
    /// handle error từ sever response
    if (error.response) {
        const response = error.response;
        // unauthenticated
        if (response.status === 401) {
            localStorage.removeItem('accessToken')
            return router.push("/login");
        };
        // forbidden
        if (response.status === 403) {
            localStorage.removeItem('accessToken')
            return router.push("/forbidden"); // chưa làm
        };
        store.dispatch("general/setAlert", {
            isAlert: true,
            message: error.message,
        });
    };
    // unknown error
    store.dispatch("general/setAlert", {
        isAlert: true,
        message: error.message,
    });
};