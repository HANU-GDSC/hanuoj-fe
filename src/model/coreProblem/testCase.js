class TestCase {
    _problemId;
    _input;
    _expectedOutput;
    _ordinal;
    _isSample;
    _description;

    constructor({
        problemId,
        input,
        expectedOutput,
        ordinal,
        isSample,
        description
    }) {
        this._problemId = problemId;
        this._input = input;
        this._expectedOutput = expectedOutput;
        this._ordinal = ordinal;
        this._isSample = isSample;
        this._description = description;
    }

    static init() {
        return new TestCase({
            problemId: "",
            input: "",
            expectedOutput: "",
            ordinal: 0,
            isSample: false,
            description: ""
        });
    }

    setProblemId(problemId) {
        if (typeof problemId !== "string")
            throw new Error("ProblemId must be a string");
        this._problemId = problemId;
    }

    setInput(input) {
        if (typeof input !== "string")
            throw new Error("Input must be a string");
        this._input = input;
    }

    setExpectedOutput(expectedOutput) {
        if (typeof expectedOutput !== "string")
            throw new Error("ExpectedOutput must be a string");
        this._expectedOutput = expectedOutput;
    }

    setOrdinal(ordinal) {
        if (typeof ordinal !== "number")
            throw new Error("Ordinal must be a number");
        this._ordinal = ordinal;
    }

    setIsSample(isSample) {
        if (typeof isSample !== "boolean")
            throw new Error("IsSample must be a boolean");
        this._isSample = isSample;
    }

    setDescription(description) {
        if (typeof description !== "string")
            throw new Error("Description must be a string");
        this._description = description;
    }

    getProblemId() {
        return this._problemId;
    }

    getInput() {
        return this._input;
    }

    getExpectedOutput() {
        return this._expectedOutput;
    }

    getOrdinal() {
        return this._ordinal;
    }

    getIsSample() {
        return this._isSample;
    }

    getDescription() {
        return this._description;
    }

}

export default TestCase;