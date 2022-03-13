import router from "../router/index";
import store from "../store/index";

function showAlert(message) {
    store.dispatch("general/setAlert", {
        isAlert: true,
        alertMessage: message,
        alertType: "error",
    })
}

export default function(error) {
    console.log(error);
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

        showAlert(error.response.data.message);
    };
    // unknown error
    showAlert(error.message);
};