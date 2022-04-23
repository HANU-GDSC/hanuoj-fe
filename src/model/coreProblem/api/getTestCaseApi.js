import apiService from "../../../helpers/apiService"

class GetTestCaseRequest {
    constructor({
        coreProblemId
    }) {
        console.assert(typeof coreProblemId === 'string', `${coreProblemId} must be a string`);
        this.coreProblemId = coreProblemId;
    }
};

class GetTestCaseResponse {
    constructor({
        code,
        message,
        data
    }) {
        this.code = code;
        this.message = message;
        this.data = data.map((testCase) => new GetTestCaseResponseData(testCase));
    }
};

class GetTestCaseResponseData {
    constructor({
        problemId,
        input,
        expectedOutput,
        ordinal,
        isSample,
        description
    }) {
        console.assert(typeof problemId === "string", `problemId: ${problemId} must be a string`);
        console.assert(typeof input === "string", `input: ${input} must be a string`);
        console.assert(typeof expectedOutput === "string", `expectedOutput: ${expectedOutput} must be a string`);
        console.assert(typeof ordinal === "number", `ordinal: ${ordinal} must be a number`);
        console.assert(typeof isSample === "boolean", `isSample: ${isSample} must be a boolean`);
        console.assert(typeof description === "string", `description: ${description} must be a string`);
        this.problemId = problemId;
        this.input = input;
        this.expectedOutput = expectedOutput;
        this.ordinal = ordinal;
        this.isSample = isSample;
        this.description = description;
    }
}

async function getTestCaseApi(req) {
    console.assert(req instanceof GetTestCaseRequest, `req: ${req} must be an instance of GetTestCaseRequest`);
    try {
        const response = (await apiService("GET", `/practiceProblem/coreProblem/testCase/${req.coreProblemId}/isSample`)).data
        return new GetTestCaseResponse(response).data;
    } catch (error) {
        throw error;
    } 
};

export {
    GetTestCaseRequest,
    GetTestCaseResponse,
    getTestCaseApi
}