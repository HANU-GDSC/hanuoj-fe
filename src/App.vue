<template>
  <!-- thẻ main có class là dark hoặc light, css màu sắc của các phần tử con đều phải dựa theo class chính này -->
  <div id="main" :class="$store.state.general.theme">
    <Nav />
    <div class="content">
      <router-view />
    </div>
    <AlertBox
      :isShow="$store.state.general.alert.isAlert"
      :text="$store.state.general.alert.alertMessage"
      :type="$store.state.general.alert.alertType"
      @close="$store.dispatch('general/closeAlert')"
    />
  </div>
</template>
<script>
import routerWatcher from "./helpers/routerWatcher";
import Nav from "./components/Nav";
import AlertBox from "./components/general/Alert";

import { deleteExpiredCode } from "./helpers/localStorage";

export default {
  name: "App",
  data() {
    return {};
  },
  components: {
    Nav,
    AlertBox,
  },
  computed: {
    setBackGround() {
      return this.$store.state.general.theme;
    },
  },
  created() {
    // local storage setup
    this.$store.dispatch("general/initTheme");
    this.$store.dispatch("general/setLanguage");
    deleteExpiredCode();

    // if local storage have accessToken -> return current user data
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      let currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
      return currentUserData;
    }
  },
  watch: {
    $route(to, from) {
      routerWatcher(to, from);
    },
    setBackGround() {
      document.body.style.backgroundColor =
        this.$store.state.general.theme === "dark-theme"
          ? "hsl(230, 28%, 12%)"
          : "hsl(230, 60%, 99%)";
    },
  },
};
</script>
<style lang="scss">
@import "./App.scss";
#main {
  display: flex;
}
.content {
  flex-grow: 1;
}
</style>
