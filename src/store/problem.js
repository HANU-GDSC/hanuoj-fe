const date = new Date();

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
            currentProblemsCode: [],
            /*
                id: code,
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
        },
        setCurrentProblemsCode(state, currentProblem) {
            state.currentProblemsCode[currentProblem.id] = currentProblem.code;
        }
    },
    actions: {
        initProblem(state, problemList) {
            state.commit("setAllProblem", problemList);
        },
        addProblem(state, problem) {
            state.commit("addProblem", problem);
        },
        updateProblem(state, newProblem) {
            state.commit("updateProblem", newProblem);
        },
        deleteProblem(state, newProblemId) {
            state.commit("deleteProblem", newProblemId);
        },
        setCurrentProblemsCode(state, currentProblem) {
            state.commit("setCurrentProblemsCode", currentProblem);
            localStorage.setItem(`problemID: ${currentProblem.id}`, JSON.stringify({ 
                code: currentProblem.code,
                expiredAt: date.getTime() + 1000 * 60 * 60 * 24 * 30,
            }));
        },
        
    },
    getters: {
    }
};