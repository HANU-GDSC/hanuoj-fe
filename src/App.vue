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
import apiService from "./helpers/apiService";
import errorHandler from "./helpers/errorHandler";
import AlertBox from "./components/general/Alert";

export default {
    name: "App",
    data() {
        return {};
    },
    components: {
        Nav,
        AlertBox
    },
    created() {
        this.$store.dispatch("general/initTheme");

        // fetch user data, chỉ khi có accessToken trong localStorage
        // lấy data của 1 user, xong lưu vào trong vuex store
        // tạm thời chưa có api thì dùng fake api, lấy hết tất cả user và problem
        if (localStorage.getItem("accessToken")) {
            apiService("GET", "/endUser")
                .then((res) => {
                    this.$store.dispatch("endUser/initInfo", res.data[0]);
                })
                .catch((error) => {
                    errorHandler(error);
                });
            apiService("GET", "/problem")
                .then((res) => {
                    this.$store.dispatch("problem/initProblem", res.data);
                })
                .catch((error) => {
                    errorHandler(error);
                });
        }
    },
    mounted() {
        document.body.style.backgroundColor =
            this.$store.state.general.theme === "dark-theme"
                ? "hsl(230, 28%, 12%)"
                : "hsl(230, 60%, 99%)";
    },
    watch: {
        $route(to, from) {
            routerWatcher(to, from);
        },
    },
};
</script>
<style lang="scss">
@import "./App.scss";
#main {
    display: flex;
}
</style>
