import { assert } from "@vue/compiler-core";
import apiService from "../../../helpers/apiService";

class CreateTestCasesRequest {
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
}

class CreateTestCasesResponse {
    constructor({
        code,
        message,
        data
    }) {
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

async function createTestCasesApi(req) {
    assert(req instanceof Array);
    req.forEach(testCase => assert(testCase instanceof CreateTestCasesRequest));
    try {
        await apiService("POST", "/practiceProblem/coreProblem/testCase", {}, req)
        return true;
    } catch (error) {
        throw error;
    }
}

export {
    CreateTestCasesRequest,
    CreateTestCasesResponse,
    createTestCasesApi
}