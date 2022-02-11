<template>
    <ul id="nav" v-if="routeCheck">
        <router-link
            v-for="(route, index) in routeList"
            :key="index"
            :to="route.path"
            >
                <i>icon </i>
                <a class="theme-link">{{ route.name }}</a> |
            </router-link
        >
    </ul>
</template>

<script>
export default {
    name: "Nav",
    // local state của component
    data() {
        return {
            routeList: [],
        };
    },

    // các component con
    components: {},

    // các props truyền từ component cha
    props: {},

    // đơn giản là các method
    // thường dùng để handle sự kiện
    methods: {},

    // các hàm xử lý logic phức tạp, reactive với data liên quan
    // methods vs computed: https://stackoverflow.com/questions/44350862/methods-vs-computed-in-vue
    computed: {
        routeCheck() {
            // Không hiển thị nav bar khi đang ở trong auth hoặc public pages
            return !(
                this.$route.meta.type === "auth" ||
                this.$route.meta.type === "public"
            );
        },
        created() {
            // Lấy danh sách route từ router
            if (this.routeList.meta.navRender) {
                this.routeList.push(this.$route);
            }
        },
    },

    // xem thêm, vue hooks: https://vuejs.org/v2/guide/instance.html#Lifecycle-Hooks
    // created vs mounted:https://stackoverflow.com/questions/45813347/difference-between-the-created-and-mounted-events-in-vue-js
    created() {
        this.routeList = this.$router.options.routes.filter(
            (route) => route.meta.navRender
        );
    },
    mounter() {},
    updated() {},

    //trigger sự thay đổi của cái gì đó
    watch: {},
};
</script>

<style lang="scss" scoped>
#nav {
}
.router-link-activate {

}
// màu sắc sẽ chia làm 2 như thế này
.light {
    // viết các css cho màu sắc ở trong này
    .router-link-activate {

    }
}

.dark {
    .router-link-activate {

    }
}
</style>