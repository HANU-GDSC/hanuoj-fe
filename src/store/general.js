export default {
    namespaced: true,
    state() {
        return {
            theme: "",
            alert: {
                isAlert: false,
                alertMessage: "",
                alertType: "",
            },
            // settingName: settingValue
            editorSettings: {},
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
        setEditorSettings(state, editorSettings) {
            state.editorSettings = editorSettings;
        }
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
            });
        },
        setEditorSettings(state, editorSettings) {
            let settingsToSave = JSON.parse(localStorage.getItem("editorSettings"));
            if (!settingsToSave)
                settingsToSave = {}
            Object.keys(editorSettings).forEach(name => {
                settingsToSave[name] = editorSettings[name];
            });
            state.commit("setEditorSettings", settingsToSave);
            localStorage.setItem("editorSettings", JSON.stringify(settingsToSave));
        },
    },
    getters: {
    }
};