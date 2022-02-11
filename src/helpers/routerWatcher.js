import router from "../router/index";

export default function (to, from) {
    const accessToken = localStorage.getItem("accessToken");

    // protected route
    // nếu chưa có accessToken thì redirect về login
    if (to.meta.type === "protected" && !accessToken)
            return router.push({ name: "Login" });
    // auth route
    // nếu có accessToken thì redirect về dashboard
        if (to.meta.type === "auth" && accessToken)
            return router.push({ name: "Dashboard" });
}