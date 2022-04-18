class TimeLimit {
    constructor(timeLimit) {
        this.timeLimit = timeLimit.timeLimit ? timeLimit.timeLimit : 0;
        this.programmingLanguage = timeLimit.programmingLanguage ? timeLimit.programmingLanguage : "";
    }
}

export default TimeLimit;