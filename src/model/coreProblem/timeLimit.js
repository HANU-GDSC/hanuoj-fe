class TimeLimit {
    constructor({
        timeLimit,
        programmingLanguage
    }) {
        this.timeLimit = timeLimit;
        this.programmingLanguage = programmingLanguage;
    }

    static init() {
        return new TimeLimit({
            timeLimit: 0,
            programmingLanguage: ""
        });
    }

    setTimeLimit(timeLimit) {
        if (typeof timeLimit !== "number")
            throw new Error("timeLimit must be a number");
        this.timeLimit = timeLimit;
    }

    setProgrammingLanguage(programmingLanguage) {
        if (typeof programmingLanguage !== "string")
            throw new Error("ProgrammingLanguage must be a string");
        this.programmingLanguage = programmingLanguage;
    }
}

export default TimeLimit;