class FailedTestCase {
    constructor(failedTestCase) {
        this.failedAtLine = failedTestCase.failedAtLine ? failedTestCase.failedAtLine : 0;
        this.TestCase = failedTestCase.TestCase ? failedTestCase.TestCase : null;
    }
}