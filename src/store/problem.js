export default {
    namespaced: true, 
    state() {
        return {
            allProblem: [],
            /*  problem: {
                id: String,
                name: String,
                description: String,
                author: String, //match to user id
                ACsCount: Number,
                submissionsCount: Number,
                difficulty: String,
                memoryLimit: String,
                timeLimit: String,
                allowedProgrammingLanguage: [String],
             */
        };
    },
    mutations: {
        setAllProblem(state, problemList) {
            state.allProblem = problemList;
        },
        addProblem(state, problem) {
            state.allProblem.push(problem);
        },
        updateProblem(state, newProblemID) {
            state.allProblem.forEach((problem, index) => {
                if (newProblemID === problem.id) {
                    state.allProblem[index] = newProblem;
                }
            });
        },
        deleteProblem(state, newProblemId) {
            state.allProblem.forEach((problem, index) => {
                if (newProblemId === problem.id) {
                    state.allProblem.splice(index, 1);
                }
            });
        }
    },
    actions: {
        initProblem(state, problemList) {
            state.commit("setAllProblem", problemList);
        }
    },
    getters: {
    }
};