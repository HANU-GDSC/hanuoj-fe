<template>
    <div id="nav" v-if="routeCheck">
        <div class="fixed-content">
            <router-link to="/">
                <img
                    src="https://cdn.thukyluat.vn/nhch-images//CauHoi_Hinh/9eb6abaa-8cda-456c-ad66-26ba4da23ffe.jpg"
                    alt="logo"
                />
                <h4>HANU Online Judge</h4></router-link
            >

            <!-- route from 0 -->
            <div class="page-group">
                <router-link
                    v-for="(route, index) in routeList.filter(
                        (route, i) => i < routeList.length - 2
                    )"
                    :key="index"
                    :to="route.path"
                    :class="
                        'page ' +
                        ($route.path.startsWith(route.path)
                            ? 'router-link-active'
                            : '')
                    "
                >
                    <div class="ver-line"></div>
                    <Icon :icon="route.icon" :inline="true" />
                    <a>{{ route.name }}</a>
                </router-link>
                <!-- to length-3 -->
                <hr />
                <!-- route from length-2 -->
                <router-link
                    v-for="(route, index) in routeList.filter(
                        (route, i) => i >= routeList.length - 2
                    )"
                    :key="index"
                    :to="route.path"
                    :class="
                        'page ' +
                        ($route.path.startsWith(route.path)
                            ? 'router-link-active'
                            : '')
                    "
                >
                    <div class="ver-line"></div>
                    <Icon :icon="route.icon" :inline="true" />
                    <a>{{ route.name }}</a>
                </router-link>
                <!-- to length-1 (end) -->

            </div>
        </div>
    </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
    name: "Nav",
    data() {
        return {
            routeList: [],
            // sample: {
            //     path: "/",
            //     name: "Home"
            // }   icon: "..."
            // }
        };
    },
    components: {
        Icon,
    },
    computed: {
        routeCheck() {
            // because vue router component load is async, this.$route is changed when loading component, which cause a nav view bug
            // check if mete.type is undefined to prevent nav rendered in the first load
            if (this.$route.meta.type === undefined) return false;

            return !(
                this.$route.meta.type === "auth" ||
                this.$route.meta.type === "public" ||
                this.$route.meta.type === "detail"
            );
        },
        routerLinkActive() {},
    },
    created() {
        this.$router.options.routes.filter((route) => {
            if (route.meta.navRender)
                this.routeList.push({
                    path: route.path,
                    name: route.name,
                    icon: route.meta.navIcon,
                });
        });
    },
};
</script>

<style lang="scss" scoped>
#nav {
    position: relative;
    background-color: var(--container-color);
    height: 100vh;
}
.fixed-content {
    position: sticky;
    top: 0;
    padding-top: 5px;
}
.fixed-content > a {
    display: block;
    margin: 0 var(--mb-0-25) var(--mb-1) var(--mb-0-25);
    img {
        display: inline-block;
        vertical-align: top;
        width: 30%;
    }
    h4 {
        display: inline-block;
        width: 70%;
        font-size: var(--normal-font-size);
        text-align: center;
        color: var(--title-color);
    }
}
.page-group {
    color: var(--first-color);
    font-weight: var(--font-semi-bold);
    a.page {
        position: relative;
        display: block;
        padding: 10px 8px 10px 10%;
        color: var(--text-color-light);
        font-size: var(--normal-font-size);
        .iconify {
            color: var(--first-color);
            margin-right: var(--mb-0-5);
        }
        a:hover {
            text-decoration: none;
        }
        @media screen and (max-width: 900px) {
            font-size: var(--smaller-font-size);
        }
    }
    a.page:hover {
        text-decoration: none !important;
    }
    a.router-link-active {
        .iconify,
        a {
            color: var(--first-color-alt);
        }
        .ver-line {
            display: block;
            position: absolute;
            width: 3px;
            height: 70%;
            left: 0;
            top: 50%;
            transform: translateY(-50%);
            background-color: var(--title-color) !important;
            clip-path: polygon(0 0, 100% 12%, 100% 89%, 0 100%, 0% 75%, 0% 25%);
        }
    }
    hr {
        width: 85%;
        margin: 7% auto;
        border: none;
        border-top: 1px solid var(--first-color);
    }
}
</style>