export default {
    namespaced: true, 
    state() {
        return {
            allExercise: [],
            /* exercise: {
                id: String,
                name: String,
                description: String,
                author: String, //match to user id
                ACsCount: Number,
                submissionsCount: Number,
                difficulty: String,
             */
        };
    },
    mutations: {
        setAllExercise(state, exerciseList) {
            state.allExercise = exerciseList;
        },
        addExercise(state, exercise) {
            state.allExercise.push(exercise);
        },
        updateExercise(state, newExerciseID) {
            state.allExercise.forEach((exercise, index) => {
                if (newExerciseID === exercise.id) {
                    state.allExercise[index] = newExercise;
                }
            });
        },
        deleteExercise(state, newExerciseId) {
            state.allExercise.forEach((exercise, index) => {
                if (newExerciseId === exercise.id) {
                    state.allExercise.splice(index, 1);
                }
            });
        }
    },
    actions: {
        initExercise(state, exerciseList) {
            state.commit("setAllExercise", exerciseList);
        }
    },
    getters: {
    }
};