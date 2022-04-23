class Dislike {
    _id;
    _problemId;
    _dislikeCount;

    constructor({
        id,
        problemId,
        dislikeCount
    }) {
        this._id = id;
        this._problemId = problemId;
        this._dislikeCount = dislikeCount;
    }

    static init() {
        return new Dislike({
            id: "",
            problemId: "",
            dislikeCount: 0
        });
    }

    setProblemId(problemId) {
        if (typeof problemId !== "string")
            throw new Error("Problem id must be a string");
        this._problemId = problemId;
    }

    setDislikeCount(dislikeCount) {
        if (typeof dislikeCount !== "number")
            throw new Error("dislike count must be a number");
        this._dislikeCount = dislikeCount;
    }

    getId() {
        return this._id;
    }

    getProblemId() {
        return this._problemId;
    }

    getDislikeCount() {
        return this._dislikeCount;
    }

}

export default Dislike;