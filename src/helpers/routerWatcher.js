import router from "../router/index";

export default function (to, from) {
    const accessToken = localStorage.getItem("accessToken");
    if (to.meta.type === "protected" && !accessToken)
        return router.push({ name: "Login" });

    if (to.meta.type === "auth" && accessToken)
        return router.push({ name: "Dashboard" });
}