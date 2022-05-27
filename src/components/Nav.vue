<template>
    <div id="nav" v-if="routeCheck">
        <div class="fixed-content">
            <router-link to="/">
                <img
                    src="https://static.independent.co.uk/s3fs-public/thumbnails/image/2019/11/01/17/istock-169941361.jpg?quality=75&width=982&height=726&auto=webp"
                    alt="logo"
                />
                <h4>Hi Code</h4></router-link
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
                    <span>{{ route.name }}</span>
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
                    <span>{{ route.name }}</span>
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
a {
    text-decoration: none !important;
}

#nav {
    @apply relative h-screen;
    background-color: var(--container-color);
}

.fixed-content {
    @apply sticky;
}

.fixed-content > a {
    @apply flex p-2 align-middle;
    img {
        @apply w-1/3;
        @media (max-width: 800px) {
            @apply w-full;
        }
    }
    h4 {
        @apply text-center w-2/3;
        @media (max-width: 800px) {
            @apply hidden;
        }
    }
}

.page-group {
    @apply mt-2;
    a.page {
        @apply relative flex items-center p-3;
        .iconify {
            @apply mr-1;
        }
        span {
            @media (max-width: 800px) {
                @apply hidden;
            }
        }
        @media (max-width: 800px) {
            @apply justify-center;
        }
    }
    a.router-link-active {
        .ver-line {
            @apply block absolute w-1 left-0 rounded-r inset-y-1 bg-black dark:bg-white;
        }
    }
    hr {
        @apply w-5/6 m-auto my-2;
        // margin: 7% auto;
        border-top: 1px solid var(--first-color);
    }
}
</style>