class TestCase {
    constructor(testCase) {
        this.input = testCase.input ? testCase.input : "";
        this.expectedOutput = testCase.expectedOutput ? testCase.expectedOutput : "";
        this.ordinal = testCase.ordinal ? testCase.ordinal : 0;
        this.isSample = testCase.isSample ? testCase.isSample : true;
        this.description = testCase.description ? testCase.description : "";
    }
}

export default TestCase;