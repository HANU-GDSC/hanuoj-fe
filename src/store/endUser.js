export default {
    namespaced: true, 
    state() {
        // cách dùng: this.$store.state.endUser.info
        // hoặc dùng với mapState.
        return {
            currentUserData: {}
        };
    },
    mutations: {
        setCurrentUser(state, currentUser) {
            state.currentUserData = currentUser;
        }
    },
    actions: {
        // cách dùng: this.$store.dispatch("endUser/setCurrentUser");
        // hoặc dùng với mapActions: mapActions: { initInfo: "endUser/setCurrentUser", }
        setCurrentUser(state, currentUser) {
            state.commit("setCurrentUser", currentUser);
        }
        
    },
    getters: {
        // khi muốn lấy state và tính toán dài, viết hàm ở đây. Dùng như state.
    }
};