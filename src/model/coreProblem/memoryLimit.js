class memoryLimit {
    constructor(memoryLimit) {
        this.memoryLimit = memoryLimit.memoryLimit ? memoryLimit.memoryLimit : 0;
        this.programmingLanguage = memoryLimit.programmingLanguage ? memoryLimit.programmingLanguage : "";
    }
}

export default memoryLimit;