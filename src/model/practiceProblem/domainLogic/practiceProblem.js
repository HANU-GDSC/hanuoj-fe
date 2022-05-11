import { GetProblemRequest, GetProblemResponse, getProblemApi } from "../../coreProblem/api/getProblemApi";
import { ListProblemRequest, ListProblemResponse, listProblemApi } from "../api/listProblem";
import PracticeProblem from "../practiceProblem";

async function getPracticeProblem(id) {
    try {
        const problemData = await getProblemApi(
            new GetProblemRequest({ id })
        );
        return new PracticeProblem({
            id: problemData.id,
            coreProblemId: problemData.coreProblemId,
            difficulty: problemData.difficulty
        });
    } catch (error) {
        throw error;
    }
};

async function listProblems(page, perPage) {
    try {
        const problemsData = await listProblemApi(
            new ListProblemRequest({ page, perPage })
        );
        return problemsData.map((problemData) => new PracticeProblem(problemData));
    } catch (error) {
        throw error;
    }
};

export {
    getPracticeProblem,
    listProblems
};