import { GetProblemRequest, GetProblemResponse, getProblem } from './api/getProblemApi';
import { GetCoreProblemRequest, GetCoreProblemResponse, getCoreProblem } from './api/getCoreProblemApi';
import { GetTestCaseRequest, GetTestCaseResponse, getTestCase } from './api/getTestCaseApi';
import TestCase from './testCase';
import MemoryLimit from './memoryLimit';
import TimeLimit from './timeLimit';

class Problem {
    constructor() {
        this.id = "";
        this.name = "";
        this.description = "";
        this.author = "";
        this.ACsCount = 0;
        this.submissionCount = 0;
        this.testCases = [];
        this.memoryLimits = [];
        this.timeLimits = [];
        this.allowedProgrammingLanguages = [];
    }
    async create(id) {
        try {
            const problemData = await getProblem(new GetProblemRequest({ id })); 
            this.id = problemData.coreProblemId;
            const coreProblemData = await getCoreProblem(new GetCoreProblemRequest({ coreProblemId: this.id }));
            const testCaseData = await getTestCase(new GetTestCaseRequest({ coreProblemId: this.id }));

            this.name = coreProblemData.name;
            this.description = coreProblemData.description;
            this.author = coreProblemData.author;
            this.testCases = testCaseData;
            this.memoryLimits = coreProblemData.memoryLimits.map((memoryLimit) => (new MemoryLimit(memoryLimit)));
            this.timeLimits = coreProblemData.timeLimits.map((timeLimit) => (new TimeLimit(timeLimit)));
            this.allowedProgrammingLanguages = coreProblemData.allowedProgrammingLanguages;
        } catch (error) {
            throw error;
        };
    }
};

export default Problem;