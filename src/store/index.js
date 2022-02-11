import { createStore } from "vuex";
import endUser from "./endUser";
import exercise from "./exercise";
import general from "./general";

export default createStore({
	namespaced: true,
	modules: {
		endUser,
		exercise,
		general,
	},
});
