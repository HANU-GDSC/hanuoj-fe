class PracticeProblem {
    _id;
    _coreProblemId;
    _difficulty;

    constructor({
        id,
        coreProblemId,
        difficulty
    }) {
        this._id = id;
        this._coreProblemId = coreProblemId;
        this._difficulty = difficulty;
    }

    static init() {
        return new PracticeProblem({
            id: undefined,
            coreProblemId: undefined,
            difficulty: undefined,
        });
    }

    setCoreProblemId(coreProblemId) {
        if (typeof coreProblemId !== "string")
            throw new Error("CoreProblem id must be a string");
        this._coreProblemId = coreProblemId;
    }

    setDifficulty(difficulty) {
        if (typeof difficulty !== "string")
            throw new Error("Difficulty must be a number");
        if (!(difficulty === "EASY" || difficulty === "MEDIUM" || difficulty === "HARD"))
            throw new Error("Difficulty must be one of EASY, MEDIUM, HARD");
        this._difficulty = difficulty;
    }

    getId() {
        return this._id;
    }
    
    getCoreProblemId() {
        return this._coreProblemId;
    }

    getDifficulty() {
        return this._difficulty;
    }
    
}

export default PracticeProblem;