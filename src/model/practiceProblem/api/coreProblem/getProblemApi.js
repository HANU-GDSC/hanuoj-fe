import apiService from "../../../../helpers/apiService";
class GetProblemRequest {
    constructor({
        id
    }) {
        console.assert(typeof id === "string", `id: ${id} must be a string`);
        this.id = id;
    }
};

class GetProblemResponse {
    constructor({
        code,
        message,
        data
    }) {
        this.code = code;
        this.message = message;
        this.data = new GetProblemResponseData(data);
    }
};

class GetProblemResponseData {
    constructor({
        id,
        version,
        coreProblemProblemId,
        difficulty
    }) {
        console.assert(typeof id === "string", `id: ${id} must be a string`);
        console.assert(typeof version === "number", `version: ${version} must be a number`);
        console.assert(typeof coreProblemProblemId === "string", `coreProblemProblemId: ${coreProblemProblemId} must be a string`);
        console.assert(typeof difficulty == "string" &&
            (difficulty === "EASY") ||
            (difficulty === "MEDIUM") ||
            (difficulty === "HARD")
        , `difficulty: ${difficulty} must be a string, enum[EASY, MEDIUM, HARD]`);
        this.id = id;
        this.version = version;
        this.coreProblemProblemId = coreProblemProblemId;
        this.difficulty = difficulty;
    };
}

async function getProblemApi(req) {
    console.assert(req instanceof GetProblemRequest, `req: ${req} must be an instance of GetProblemRequest`);
    try {
        const response = (await apiService("GET", `/practiceProblem/problem/${req.id}`)).data;
        return new GetProblemResponse(response).data;
    } catch (error) {
        throw error;
    }
}

export {
    GetProblemRequest,
    GetProblemResponse,
    getProblemApi
};