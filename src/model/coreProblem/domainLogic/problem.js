import { assert } from "@vue/compiler-core";
import Problem from "../problem";
import PracticeProblem from "../../practiceProblem/practiceProblem";
import { GetProblemRequest, GetProblemResponse, getProblemApi } from '../api/getProblemApi';
import { GetCoreProblemRequest, GetCoreProblemResponse, getCoreProblemApi } from '../api/getCoreProblemApi';
import { CreateProblemRequest, CreateCoreProblemInput, createProblemResponse, createProblemApi } from "../api/createProblemApi";

async function getProblem(id) {
    try {
        const problemData = await getProblemApi(
            new GetProblemRequest({ id })
        );
        const coreProblemData = await getCoreProblemApi(
            new GetCoreProblemRequest({ coreProblemProblemId: problemData.coreProblemProblemId })
        );            
        return new Problem(coreProblemData)
    } catch (error) {
        throw error;
    };
}

async function createProblem(problem, practiceProblem) {
    assert(problem instanceof Problem);
    assert(practiceProblem instanceof PracticeProblem);
    try {
        const problemId = await createProblemApi(new CreateProblemRequest({
            createCoreProblemInput: new CreateCoreProblemInput({
                name: problem.getName(),
                description: problem.getDescription(),
                createMemoryLimitInputs: problem.getMemoryLimits(),
                createTimeLimitInputs: problem.getTimeLimits(),
                allowedProgrammingLanguages: problem.getAllowedProgrammingLanguages()
            }),
            categoryIds: practiceProblem.getCategoryIds(),
            difficulty: practiceProblem.getDifficulty()
        }))
        return problemId;
    } catch (error) {
        throw error
    }
}

export {
    getProblem,
    createProblem
}