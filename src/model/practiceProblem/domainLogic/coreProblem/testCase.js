import { assert } from "@vue/compiler-core";
import TestCase from "../../../coreProblem/testCase";
import { GetTestCaseRequest, GetTestCaseResponse, getTestCaseApi } from "../../api/coreProblem/getTestCaseApi";
import { CreateTestCasesRequest, createTestCasesApi } from "../../api/coreProblem/createTestCaseApi";

async function getTestCases(coreProblemProblemId) {
    try {
        const TestCasesData = await getTestCaseApi(
            new GetTestCaseRequest({coreProblemProblemId})
        )
        return TestCasesData.map(testCase => new TestCase(testCase));
    } catch (error) {
        throw error;
    }
};

async function createTestCases(testCases) {
    assert(testCases instanceof Array);
    testCases.forEach(testCase => assert(testCase instanceof TestCase));
    try {
        await createTestCasesApi(testCases.map(testCase => new CreateTestCasesRequest({
            problemId: testCase.getProblemId(),
            input: testCase.getInput(),
            expectedOutput: testCase.getExpectedOutput(),
            ordinal: testCase.getOrdinal(),
            isSample: testCase.getIsSample(),
            description: testCase.getDescription()
        })));
        return true;
    } catch (error) {
        throw error;
    }
};

export {
    getTestCases,
    createTestCases
};