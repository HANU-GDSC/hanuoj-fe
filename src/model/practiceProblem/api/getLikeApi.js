import apiService from "../../../helpers/apiService";

class GetLikeRequest {
    constructor({
        id
    }) {
        console.assert(typeof id === "string", `id: ${id} must be a string`);
        this.id = id;
    }
}

class GetLikeResponse {
    constructor({
        code,
        message,
        data
    }) {
        this.code = code;
        this.message = message;
        this.data = new GetLikeResponseData(data);
    }
}

class GetLikeResponseData {
    constructor({
        version,
        problemId,
        likeCount
    }) {
        console.assert(typeof version === "number", `version: ${version} must be a number`);
        console.assert(typeof problemId === "string", `problemId: ${problemId} must be a string`);
        console.assert(typeof likeCount === "number", `likeCount: ${likeCount} must be a number`);
        this.version = version;
        this.problemId = problemId;
        this.likeCount = likeCount;
    }
}

async function getLikeApi(req) {
    console.assert(req instanceof GetLikeRequest, `req: ${req} must be an instance of GetLikeRequest`);
    try {
        const response = (await apiService("GET", `/practiceProblem/likeCount/${req.id}`)).data;
        return new GetLikeResponse(response).data;
    } catch (error) {
        throw error;
    }
}

export {
    GetLikeRequest,
    GetLikeResponse,
    getLikeApi
}
