import apiService from "../../../helpers/apiService";

class ListProblemRequest {
    constructor({
        page,
        perPage
    }) {
        console.assert(typeof page === "number", `page: ${page} must be a number`);
        console.assert(typeof perPage === "number", `perPage: ${perPage} must be a number`);
        this.page = page;
        this.perPage = perPage;
    }
}

class ListProblemResponse {
    constructor({
        code,
        message,
        data
    }) {
        this.code = code;
        this.message = message;
        this.data = data.map(problem => new ListProblemResponseData(problem));
    }
}

class ListProblemResponseData {
    constructor({
        id,
        version,
        coreProblemId,
        difficulty
    }) {
        console.assert(typeof id === "string", `id: ${id} must be a string`);
        console.assert(typeof version === "number", `version: ${version} must be a number`);
        console.assert(typeof coreProblemId === "string", `coreProblemId: ${coreProblemId} must be a string`);
        console.assert(typeof difficulty === "string", `difficulty: ${difficulty} must be a string`);
        this.id = id;
        this.version = version;
        this.coreProblemId = coreProblemId;
        this.difficulty = difficulty;
    }
}

async function listProblemApi(req) {
    console.assert(req instanceof ListProblemRequest, `req: ${req} must be an instance of ListProblemRequest`);
    try {
        const response = (await apiService("GET", `/practiceProblem/problem`, req)).data;
        return new ListProblemResponse(response).data;
    } catch (error) {
        throw error;
    }
}

export {
    ListProblemRequest,
    ListProblemResponse,
    listProblemApi
}