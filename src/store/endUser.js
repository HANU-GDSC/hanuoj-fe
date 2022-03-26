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
      currentUserData: {},
    };
  },
  mutations: {
    setInfo(state, info) {
      state.info = info;
    },
    setCurrentUser(state, currentUser) {
      state.currentUserData = currentUser;
      window.localStorage.currentUserData = JSON.stringify(currentUser);
    },
  },
  actions: {
    // cách dùng: this.$store.dispatch("endUser/initInfo");
    // hoặc dùng với mapActions: mapActions: { initInfo: "endUser/initInfo", }
    initInfo(state, info) {
      state.commit("setInfo", info);
    },
    setCurrentUser(state, currentUser) {
      state.commit("setCurrentUser", currentUser);
    },
  },
  getters: {
    // khi muốn lấy state và tính toán dài, viết hàm ở đây. Dùng như state.
  },
};
