import { GetProblemRequest, GetProblemResponse, getProblemApi } from "../../coreProblem/api/getProblemApi";
import PracticeProblem from "../practiceProblem";

async function getPracticeProblem(id) {
    try {
        const problemData = await getProblemApi(
            new GetProblemRequest({ id })
        );
        setTimeout(() => {
        }, 1000);
        return new PracticeProblem({
            id: problemData.id,
            coreProblemId: problemData.coreProblemId,
            difficulty: problemData.difficulty
        });
    } catch (error) {
        throw error
    }
}

export {
    getPracticeProblem,
}