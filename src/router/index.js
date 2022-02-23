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
			navIcon: "fa-solid fa-house-chimney"
		}
	},
	{
		path: "/problem",
		name: "Problem",
		component: () => import("../views/Problem"),
		meta: {
			type: "protected",
			navRender: true,
			navIcon: "fa-solid fa-code"
		}
	},
	{
		path: "/contest",
		name: "Contest",
		component: () => import("../views/Contest"),
		meta: {
			type: "protected",
			navRender: true,
			navIcon: "fa-solid fa-trophy"
		}
	},
	{
		path: "/discussion",
		name: "Discussion",
		component: () => import("../views/Discussion"),
		meta: {
			type: "protected",
			navRender: true,
			navIcon: "fa-solid fa-comments"
		}
	},
	{
		path: "/ranking",
		name: "Ranking",
		component: () => import("../views/Ranking"),
		meta: {
			type: "protected",
			navRender: true,
			navIcon: "fa-solid fa-medal"
		}
	},
	{
		path: "/help",
		name: "Help",
		component: () => import("../views/Help"),
		meta: {
			type: "protected",
			navRender: true,
			navIcon: "fa-solid fa-question"
		}
	},
	{
		path: "/setting",
		name: "Setting",
		component: () => import("../views/Setting"),
		meta: {
			type: "protected",
			navRender: true,
			navIcon: "fa-solid fa-gear"
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
