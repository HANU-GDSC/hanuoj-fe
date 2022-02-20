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
    data() {
        return {
            routeList: [],
        };
    },

    methods: {
    },

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

    created() {
        this.routeList = this.$router.options.routes.filter(
            (route) => route.meta.navRender
        );
    },
};
</script>

<style lang="scss" scoped>
#nav {
}
.router-link-activate {

}
.light {
    .router-link-activate {

    }
}

.dark {
    .router-link-activate {

    }
}
</style>