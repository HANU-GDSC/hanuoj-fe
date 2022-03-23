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
            <div class="page-group">
                <router-link
                    v-for="(route, index) in routeList"
                    :key="index"
                    :to="route.path"
                    class="page"
                >
                    <div class="ver-line"></div>
                    <i :class="route.icon"></i>
                    <a>{{ route.name }}</a>
                </router-link>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Nav",
    data() {
        return {
            routeList: [],
            // sample: {
            //     path: "/",
            //     name: "Home"
            // }   icon: "fas fa-home"
            // }
        };
    },
    methods: {},

    computed: {
        routeCheck() {
            // Không hiển thị nav bar khi đang ở trong auth hoặc public hoặc problem detail pages
            return !(
                this.$route.meta.type === "auth" ||
                this.$route.meta.type === "public" ||
                this.$route.meta.type === "detail"
            );
        },
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
    flex: 0 0 15%;
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
    margin: var(--mb-0-1) 0;
    a.page {
        position: relative;
        display: block;
        padding: 10px 8px 10px 10%;
        color: var(--text-color-light);
        font-size: var(--normal-font-size);
        i {
            margin-right: var(--mb-0-5);
        }
        a {
            color: var(--text-color-light);
        }
        a:hover {
            text-decoration: none !important;
        }
        @media screen and (max-width: 900px) {
            font-size: var(--smaller-font-size);
        }
    }
    a.page:hover {
        text-decoration: none !important;
    }
    a.router-link-active {
        i {
            color: var(--title-color);
        }
        a {
            color: var(--title-color);
            font-weight: bold;
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
}
</style>