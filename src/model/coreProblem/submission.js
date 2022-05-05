class Submission {
    _id;
    _programmingLanguage;
    _runtime;
    _memory;
    _submittedAt;
    _code;
    _status;
    _failedTestCaseDetail;
    _problemId;
    constructor({
        id,
        programmingLanguage,
        runtime,
        memory,
        submittedAt,
        code,
        status,
        failedTestCaseDetail,
        problemId
    }) {
        this._id = id;
        this._programmingLanguage = programmingLanguage;
        this._runtime = runtime;
        this._memory = memory;
        this._submittedAt = submittedAt;
        this._code = code;
        this._status = status;
        this._failedTestCaseDetail = failedTestCaseDetail;
        this._problemId = problemId;
    }

    static create() {
        return new Submission({
            id: undefined,
            programmingLanguage: undefined,
            runtime: undefined,
            memory: undefined,
            submittedAt: undefined,
            code: undefined,
            status: undefined,
            failedTestCaseDetail: undefined,
            problemId: undefined
        });
    }

    setProgrammingLanguage(programmingLanguage) {
        if (typeof programmingLanguage !== "string")
            throw new Error("Programming language must be a string");
        this._programmingLanguage = programmingLanguage;
    }

    setRuntime(runtime) {
        if (typeof runtime !== "number")
            throw new Error("Runtime must be a number");
        this._runtime = runtime;
    }

    setMemory(memory) {
        if (typeof memory !== "number")
            throw new Error("Memory must be a number");
        this._memory = memory;
    }

    setSubmittedAt(submittedAt) {
        if (typeof submittedAt !== "string")
            throw new Error("Submitted at must be a string");
        this._submittedAt = submittedAt;
    }

    setCode(code) {
        if (typeof code !== "string")
            throw new Error("Code must be a string");
        this._code = code;
    }

    setStatus(status) {
        if (typeof status !== "string")
            throw new Error("Status must be a string");
        this._status = status;
    }

    setFailedTestCaseDetail(failedTestCaseDetail) {
        if (typeof failedTestCaseDetail !== "string")
            throw new Error("Failed test case detail must be a string");
        this._failedTestCaseDetail = failedTestCaseDetail;
    }

    setProblemId(problemId) {
        if (typeof problemId !== "string")
            throw new Error("Problem id must be a string");
        this._problemId = problemId;
    }

    getId() {
        return this._id;
    }

    getProgrammingLanguage() {
        return this._programmingLanguage;
    }

    getRuntime() {
        return this._runtime;
    }

    getMemory() {
        return this._memory;
    }

    getSubmittedAt() {
        return this._submittedAt;
    }

    getCode() {
        return this._code;
    }

    getStatus() {
        return this._status;
    }

    getFailedTestCaseDetail() {
        return this._failedTestCaseDetail;
    }

    getProblemId() {
        return this._problemId;
    }
}

export default Submission