import TestCase from "./testCase";

class FailedTestCase {
    constructor({
        failedAtLine,
        TestCase
    }) {
        this.failedAtLine = failedAtLine;
        this.TestCase = TestCase;
    }

    init() {
        return new FailedTestCase({
            failedAtLine: 0,
            TestCase: TestCase.init()
        });
    }

    setFailedAtLine(failedAtLine) {
        if (typeof failedAtLine !== "number")
            throw new Error("failedAtLine must be a number");
        this.failedAtLine = failedAtLine;
    }

    setTestCase(TestCase) {
        if (!(TestCase instanceof TestCase))
            throw new Error("TestCase must be an instance of TestCase");
        this.TestCase = TestCase;
    }
}

export default FailedTestCase;