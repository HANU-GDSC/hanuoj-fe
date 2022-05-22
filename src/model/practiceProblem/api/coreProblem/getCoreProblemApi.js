import apiService from "../../../../helpers/apiService";

class GetCoreProblemRequest {
    constructor({
        coreProblemProblemId
    }) {
        console.assert(typeof coreProblemProblemId === 'string', `${coreProblemProblemId} must be a string`);
        this.coreProblemProblemId = coreProblemProblemId;
    };
};

class GetCoreProblemResponse {
    constructor({
        code,
        message,
        data
    }) {
        this.code = code;
        this.message = message;
        this.data = new GetCoreProblemResponseData(data);
    };
};

class GetCoreProblemResponseData {
    constructor({
        id,
        name,
        description,
        author,
        memoryLimits,
        timeLimits,
        allowedProgrammingLanguages
    }) {
        console.assert(typeof id === "string", `id: ${id} must be a string`);
        console.assert(typeof name === "string", `name: ${name} must be a string`);
        console.assert(typeof description, `description: ${description} must be a string`);
        console.assert(typeof author === "string", `author: ${author} must be a string`);
        console.assert(typeof memoryLimits === "object", `memoryLimits: ${memoryLimits} must be a object`);
        console.assert(typeof timeLimits === "object", `timeLimits: ${timeLimits} must be a object`);
        console.assert(typeof allowedProgrammingLanguages === "object", `allowedProgrammingLanguages: ${allowedProgrammingLanguages} must be an array`);
        this.id = id;
        this.name = name;
        this.description = description;
        this.author = author;
        this.memoryLimits = memoryLimits;
        this.timeLimits = timeLimits;
        this.allowedProgrammingLanguages = allowedProgrammingLanguages;
    };
};

async function getCoreProblemApi(req) {
    console.assert(req instanceof GetCoreProblemRequest, `req: ${req} must be an instance of GetCoreProblemRequest`);
    try {
        const response = (await apiService("GET", `/practiceProblem/coreProblem/problem/${req.coreProblemProblemId}`)).data
        return new GetCoreProblemResponse(response).data;
    } catch (error) {
        throw error;
    };
};

export {
    GetCoreProblemRequest,
    GetCoreProblemResponse,
    getCoreProblemApi
};