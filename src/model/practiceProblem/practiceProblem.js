class PracticeProblem {
    _id;
    _coreProblemId;
    _categoryIds;
    _difficulty;

    constructor({
        id,
        coreProblemId,
        categoryIds,
        difficulty
    }) {
        this._id = id;
        this._coreProblemId = coreProblemId;
        this._categoryIds = categoryIds;
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

    setCategoryIds(categoryIds) {
        if (!(categoryIds instanceof Array))
            throw new Error("Category IDs must be an array");
        this._categoryIds = categoryIds;
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

    getCategoryIds() {
        return this._categoryIds;
    }

    getDifficulty() {
        return this._difficulty;
    }
    
}

export default PracticeProblem;