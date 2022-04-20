class TestCase {
    constructor({
        problemId,
        input,
        expectedOutput,
        ordinal,
        isSample,
        description
    }) {
        this.problemId = problemId;
        this.input = input;
        this.expectedOutput = expectedOutput;
        this.ordinal = ordinal;
        this.isSample = isSample;
        this.description = description;
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
        this.problemId = problemId;
    }

    setInput(input) {
        if (typeof input !== "string")
            throw new Error("Input must be a string");
        this.input = input;
    }

    setExpectedOutput(expectedOutput) {
        if (typeof expectedOutput !== "string")
            throw new Error("ExpectedOutput must be a string");
        this.expectedOutput = expectedOutput;
    }

    setOrdinal(ordinal) {
        if (typeof ordinal !== "number")
            throw new Error("Ordinal must be a number");
        this.ordinal = ordinal;
    }

    setIsSample(isSample) {
        if (typeof isSample !== "boolean")
            throw new Error("IsSample must be a boolean");
        this.isSample = isSample;
    }

    setDescription(description) {
        if (typeof description !== "string")
            throw new Error("Description must be a string");
        this.description = description;
    }
}

export default TestCase;