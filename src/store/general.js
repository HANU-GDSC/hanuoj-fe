export default {
    namespaced: true,
    state() {
        return {
            theme: "",
            alert: {
                isAlert: false,
                alertMessage: "",
                alertType: "",
            }
        };
    },
    mutations: {
        setTheme(state, theme) {
            state.theme = theme;
            localStorage.setItem("theme", theme);
        },
        setAlert(state, alert) {
            state.alert = alert;
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
        setAlert(state, alert) {
            state.commit("setAlert", alert);
        },
        closeAlert(state) {
            state.commit("setAlert", {
                isAlert: false,
                alertMessage: "",
                alertType: "",
            })
        }
    },
    getters: {
    }
};