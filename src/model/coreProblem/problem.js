class Problem {
    _id;
    _name;
    _description;
    _author;
    _memoryLimits;
    _timeLimits;
    _allowedProgrammingLanguages;

    constructor({
        id,
        name,
        description,
        author,
        memoryLimits,
        timeLimits,
        allowedProgrammingLanguages
    }) {
        this._id = id;
        this._name = name;
        this._description = description;
        this._author = author;
        this._memoryLimits = memoryLimits;
        this._timeLimits = timeLimits;
        this._allowedProgrammingLanguages = allowedProgrammingLanguages;
    }

    static create() {
        return new Problem({
            id: undefined,
            name: undefined,
            description: undefined,
            author: undefined,
            memoryLimits: [],
            timeLimits: [],
            allowedProgrammingLanguages: []
        });
    }

    setId(id) {
        if (typeof id !== "string")
            throw new Error("Id must be a string");
        this._id = id;
    }

    setName(name) {
        if (typeof name !== "string")
            throw new Error("Name must be a string");
        this._name = name;
    }

    setDescription(description) {
        if (typeof description !== "string")
            throw new Error("Description must be a string");
        this._description = description;
    }

    setAuthor(author) {
        if (typeof author !== "string")
            throw new Error("Author must be a string");
        this._author = author;
    }

    setMemoryLimits(memoryLimits) {
        if (!(memoryLimits instanceof Array))
            throw new Error("You must provide an array of memory limits");
        this._memoryLimits = memoryLimits;
    }

    setTimeLimits(timeLimits) {
        if (!(timeLimits instanceof Array))
            throw new Error("You must provide an array of time limits");
        this._timeLimits = timeLimits;
    }

    setAllowedProgrammingLanguages(allowedProgrammingLanguages) {
        if (!(allowedProgrammingLanguages instanceof Array))
            throw new Error("You must provide an array of allowed programming languages");
        this._allowedProgrammingLanguages = allowedProgrammingLanguages;
    }

    getId() {
        return this._id;
    }

    getName() {
        return this._name;
    }

    getDescription() {
        return this._description;
    }

    getAuthor() {
        return this._author;
    }

    getMemoryLimits() {
        return this._memoryLimits;
    }

    getTimeLimits() {
        return this._timeLimits;
    }

    getAllowedProgrammingLanguages() {
        return this._allowedProgrammingLanguages;
    }

};

export default Problem;