export default {
    namespaced: true, 
    state() {
        // cách dùng: this.$store.state.endUser.info
        // hoặc dùng với mapState.
        return {
            info: {
                id: "",
                email: "",
                userName: "",
                coderID: "",
            },
        };
    },
    mutations: {
        setInfo(state, info) {
            state.info = info;
        },
    },
    actions: {
        // cách dùng: this.$store.dispatch("endUser/initInfo");
        // hoặc dùng với mapActions: mapActions: { initInfo: "endUser/initInfo", }
        initInfo(state, info) {
            state.commit("setInfo", info);
        }
    },
    getters: {
        // khi muốn lấy state và tính toán dài, viết hàm ở đây. Dùng như state.
    }
};