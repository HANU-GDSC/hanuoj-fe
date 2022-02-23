export default {
    namespaced: true, 
    state() {
        return {
            theme: "",
            isAlert: false,
            alertMessage: "",
        };
    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
            localStorage.setItem("theme", theme);
        },
        setAlert(state, isAlert) {
            state.isAlert = isAlert;
        },
        setAlertMessage(state, message) {
            state.alertMessage = message;
        },
    },
    actions: {
        initTheme(state) {
            const currentTheme = localStorage.getItem("theme");
            if (!currentTheme) {
                state.commit("setTheme", "light-theme");
                localStorage.setItem("theme", "light-theme");
            } else {
                state.commit("setTheme", currentTheme);
            };
        },
        setTheme(state, theme) {
            state.commit("setTheme", theme);
            localStorage.setItem("theme", theme);
        },
        setAlert(state, payload) {
            state.commit("setAlert", payload.isAlert);
            state.commit("setAlertMessage", payload.message);
        },
    },
    getters: {
    }
};