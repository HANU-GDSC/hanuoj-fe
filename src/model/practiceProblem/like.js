class Like {
    _id;
    _problemId;
    _likeCount;

    constructor({
        id,
        problemId,
        likeCount
    }) {
        this._id = id;
        this._problemId = problemId;
        this._likeCount = likeCount;
    }

    static init() {
        return new Like({
            id: "",
            problemId: "",
            likeCount: 0
        });
    }

    setProblemId(problemId) {
        if (typeof problemId !== "string")
            throw new Error("Problem id must be a string");
        this._problemId = problemId;
    }

    setLikeCount(likeCount) {
        if (typeof likeCount !== "number")
            throw new Error("Like count must be a number");
        this._likeCount = likeCount;
    }

    getId() {
        return this._id;
    }

    getProblemId() {
        return this._problemId;
    }

    getLikeCount() {
        return this._likeCount;
    }

}

export default Like;