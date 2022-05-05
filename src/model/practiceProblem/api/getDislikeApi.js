import apiService from "../../../helpers/apiService";

class GetDislikeRequest {
    constructor({
        id
    }) {
        console.assert(typeof id === "string", `id: ${id} must be a string`);
        this.id = id;
    }
}

class GetDislikeResponse {
    constructor({
        code,
        message,
        data
    }) {
        this.code = code;
        this.message = message;
        this.data = new GetDislikeResponseData(data);
    }
}

class GetDislikeResponseData {
    constructor({
        version,
        problemId,
        dislikeCount
    }) {
        console.assert(typeof version === "number", `version: ${version} must be a number`);
        console.assert(typeof problemId === "string", `problemId: ${problemId} must be a string`);
        console.assert(typeof dislikeCount === "number", `dislikeCount: ${dislikeCount} must be a number`);
        this.version = version;
        this.problemId = problemId;
        this.dislikeCount = dislikeCount;
    }
}

async function getDislikeApi(req) {
    console.assert(req instanceof GetDislikeRequest, `req: ${req} must be an instance of GetdislikeRequest`);
    try {
        const response = (await apiService("GET", `/practiceProblem/dislikeCount/${req.id}`)).data;
        return new GetDislikeResponse(response).data;
    } catch (error) {
        throw error;
    }
}

export {
    GetDislikeRequest,
    GetDislikeResponse,
    getDislikeApi
}
