import { GetTestCaseRequest, GetTestCaseResponse, getTestCaseApi } from "../api/getTestCaseApi";
import TestCase from "../testCase";

async function getTestCases(coreProblemId) {
    try {
        const TestCasesData = await getTestCaseApi(
            new GetTestCaseRequest({coreProblemId})
        )
        return TestCasesData;
    } catch (error) {
        throw error;
    }
}

export {
    getTestCases
}