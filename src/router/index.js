import { createRouter, createWebHistory } from "vue-router";


const routes = [
	{
		path: "/",
		name: "Landing",
		component: () => import("../views/Landing"), //lazy loading route, chi tiet: https://router.vuejs.org/guide/advanced/lazy-loading.html
		meta: {
			type: "public",
		}
	},
	{
		path: "/login",
		name: "Login",
		component: () => import("../views/AuthLogin"),
		meta: {
			type: "auth",
		}
	},
	{
		path: "/register",
		name: "Register",
		component: () => import("../views/AuthRegister"),
		meta: {
			type: "auth",
		}
	},
	{
		path: "/dashboard",
		name: "Dashboard",
		component: () => import("../views/Dashboard"),
		meta: {
			type: "protected",
			navRender: true,
		}
	},
	{
		path: "/problem",
		name: "Problem",
		component: () => import("../views/Problem"),
		meta: {
			type: "protected",
			navRender: true,
		}
	},
	{
		path: "/:404",
		name: "404",
		component: () => import("../views/NotFound"),
		meta: {
			type: "public",
		}
	}
];

const router = createRouter({
	history: createWebHistory(process.env.BASE_URL),
	routes
});

export default router;
