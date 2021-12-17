import Vue from "vue";
import VueRouter from "vue-router";

Vue.use(VueRouter);

const routes = [
	{
		path: "/",
		component: () => import("../views/Bienvenue.vue"),
	},
	{
		path: "/login",
		component: () => import("../views/Login.vue"),
	},
	{
		path: "/creercompte",
		component: () => import("../views/CreerCompte.vue"),
	},
	{
		path: "/home",
		component: () => import("../views/Home.vue"),
	},
	{
		path: "/loading",
		component: () => import("../views/Loading.vue"),
	},
	{
		path: "/creerPartie",
		component: () => import("../views/CreerPartie.vue"),
	},
	{
		path: "/rejoindrePartie",
		component: () => import("../views/RejoindrePartie.vue"),
	},
	{
		path: "/rejoindrePartiePrivee",
		component: () => import("../views/RejoindrePartiePrivee.vue"),
	},
	{
		path: "/lobby",
		component: () => import("../views/Lobby.vue"),
	},
	{
		path: "/maze",
		component: () => import("../views/Maze.vue"),
	},
	{
		path: "/partie",
		component: () => import("../views/Partie.vue"),
	},
];

const router = new VueRouter({
	mode: "history",
	base: process.env.BASE_URL,
	routes,
});

export default router;
