import Problem from "../problem";
import { GetProblemRequest, GetProblemResponse, getProblemApi } from '../api/getProblemApi';
import { GetCoreProblemRequest, GetCoreProblemResponse, getCoreProblemApi } from '../api/getCoreProblemApi';

async function getProblem(id) {
    try {
        const problemData = await getProblemApi(
            new GetProblemRequest({ id })
        );
        const coreProblemData = await getCoreProblemApi(
            new GetCoreProblemRequest({ coreProblemId: problemData.coreProblemId })
        );            
        return new Problem(coreProblemData)
    } catch (error) {
        throw error;
    };
}

export {
    getProblem
}