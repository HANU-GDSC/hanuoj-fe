import { assert } from "@vue/compiler-core";
import apiService from "../../../../helpers/apiService";

class CreateProblemRequest {
    constructor({
        createCoreProblemInput,
        categoryIds,
        difficulty
    }) {
        assert(createCoreProblemInput instanceof CreateCoreProblemInput);
        assert(categoryIds instanceof Array);
        assert(typeof difficulty === "string");
        this.createCoreProblemInput = createCoreProblemInput;
        this.categoryIds = categoryIds;
        this.difficulty = difficulty;
    }
}

class CreateCoreProblemInput {
    constructor({
        name,
        description,
        createMemoryLimitInputs,
        createTimeLimitInputs,
        allowedProgrammingLanguages
    }) {
        assert(typeof name === "string");
        assert(typeof description === "string");
        assert(createMemoryLimitInputs instanceof Array);
        assert(createTimeLimitInputs instanceof Array);
        assert(allowedProgrammingLanguages instanceof Array);
        this.name = name;
        this.description = description;
        this.createMemoryLimitInputs = createMemoryLimitInputs;
        this.createTimeLimitInputs = createTimeLimitInputs;
        this.allowedProgrammingLanguages = allowedProgrammingLanguages;
    }
}

class createProblemResponse {
    constructor({
        code,
        message,
        data
    }) {
        assert(typeof data === "string");
        this.code = code;
        this.message = message;
        this.data = data;
    }
}

async function createProblemApi(req) {
    assert(req instanceof CreateProblemRequest);
    try {
        const response = (await apiService("POST", "/practiceProblem/problem", {}, req)).data;
        return new createProblemResponse(response).data;
    } catch (error) {
        throw error
    }
}

export {
    CreateProblemRequest,
    CreateCoreProblemInput,
    createProblemResponse,
    createProblemApi
}