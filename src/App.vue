<template>
    <!-- thẻ main có class là dark hoặc light, css màu sắc của các phần tử con đều phải dựa theo class chính này -->
    <div id="main" :class="$store.state.general.theme">
        <Nav />  <!-- nav bar -->
        <router-view /> <!-- nội dung của router -->
    </div>
</template>
<script>
import routerWatcher from "./helpers/routerWatcher";
import Nav from "./components/Nav";
import apiService from "./helpers/apiService";
import errorHandler from "./helpers/errorHandler";

export default {
    name: "App",
    data() {
        return {};
    },
    components: {
        Nav,
    },
    created() {
        // setup local storage
        this.$store.dispatch("general/initTheme");

        // fetch user data, chỉ khi có accessToken trong localStorage
        // lấy data của 1 user, xong lưu vào trong vuex store
        // tạm thời chưa có api thì dùng fake api, lấy hết tất cả user
        if (localStorage.getItem("accessToken"))
            apiService("GET", "/endUser")
                .then((res) => {
                    this.$store.dispatch("endUser/initInfo", res.data[0]);
                })
                .catch((error) => {
                    errorHandler(error);
                });
    },
    mounted() {
        // set background color, thằng này phải set riêng vì css selector không thể chọn từ trong ra
        const lightBackground = getComputedStyle(
            document.body
        ).getPropertyValue("--l-background-1");
        const darkBackground = getComputedStyle(document.body).getPropertyValue(
            "--d-background-1"
        );
        document.body.style.backgroundColor =
            this.$store.state.general.theme === "dark"
                ? darkBackground
                : lightBackground;
    },
    watch: {
        //xem sự thay đổi của route, nếu user đã authen thì không đc vào trang login nữa, nếu user chưa authen thì đẩy ng dùng vào trang login
        $route(to, from) {
            routerWatcher(to, from);
        },
    },
};
</script>
<style lang="scss">
@import "./App.scss";
</style>
