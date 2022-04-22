class memoryLimit {
    constructor({
        memoryLimit,
        programmingLanguage
    }) {
        this.memoryLimit = memoryLimit;
        this.programmingLanguage = programmingLanguage;
    }

    static init() {
        return new memoryLimit({
            memoryLimit: 0,
            programmingLanguage: ""
        });
    }

    setMemoryLimit(memoryLimit) {
        if (typeof memoryLimit !== "number")
            throw new Error("MemoryLimit must be a number");
        this.memoryLimit = memoryLimit;
    }

    setProgrammingLanguage(programmingLanguage) {
        if (typeof programmingLanguage !== "string")
            throw new Error("ProgrammingLanguage must be a string");
        this.programmingLanguage = programmingLanguage;
    }
}

export default memoryLimit;