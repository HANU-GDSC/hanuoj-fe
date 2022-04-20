import { GetProblemRequest, GetProblemResponse, getProblem } from './api/getProblemApi';
import { GetCoreProblemRequest, GetCoreProblemResponse, getCoreProblem } from './api/getCoreProblemApi';
import { GetTestCaseRequest, GetTestCaseResponse, getTestCase } from './api/getTestCaseApi';
import TestCase from './testCase';
import MemoryLimit from './memoryLimit';
import TimeLimit from './timeLimit';

class Problem {
    constructor({
        id,
        name,
        description,
        author,
        ACsCount,
        submissionCount,
        testCases,
        memoryLimits,
        timeLimits,
        allowedProgrammingLanguages
    }) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.author = author;
        this.ACsCount = ACsCount;
        this.submissionCount = submissionCount;
        this.testCases = testCases;
        this.memoryLimits = memoryLimits;
        this.timeLimits = timeLimits;
        this.allowedProgrammingLanguages = allowedProgrammingLanguages;
    }

    static init() {
        return new Problem({
            id: "",
            name: "",
            description: "",
            author: "",
            ACsCount: 0,
            submissionCount: 0,
            testCases: [],
            memoryLimits: [],
            timeLimits: [],
            allowedProgrammingLanguages: []
        });
    }

    setId(id) {
        if (typeof id !== "string")
            throw new Error("Id must be a string");
        this.id = id;
    }

    setName(name) {
        if (typeof name !== "string")
            throw new Error("Name must be a string");
        this.name = name;
    }

    setDescription(description) {
        if (typeof description !== "string")
            throw new Error("Description must be a string");
        this.description = description;
    }

    setAuthor(author) {
        if (typeof author !== "string")
            throw new Error("Author must be a string");
        this.author = author;
    }

    setACsCount(ACsCount) {
        if (typeof ACsCount !== "number")
            throw new Error("ACsCount must be a number");
        this.ACsCount = ACsCount;
    }

    setSubmissionCount(submissionCount) {
        if (typeof submissionCount !== "number")
            throw new Error("SubmissionCount must be a number");
        this.submissionCount = submissionCount;
    }

    setTestCases(testCases) {
        if (!(testCases instanceof Array))
            throw new Error("You must provide an array of test cases");
        testCases.forEach(testCase => {
            if (!(testCase instanceof TestCase))
                throw new Error("You must provide an array of test cases");
        });
        this.testCases = testCases;
    }

    setMemoryLimits(memoryLimits) {
        if (!(memoryLimits instanceof Array))
            throw new Error("You must provide an array of memory limits");
        memoryLimits.forEach(memoryLimit => {
            if (!(memoryLimit instanceof MemoryLimit))
                throw new Error("You must provide an array of memory limits");
        });
        this.memoryLimits = memoryLimits;
    }

    setTimeLimits(timeLimits) {
        if (!(timeLimits instanceof Array))
            throw new Error("You must provide an array of time limits");
        timeLimits.forEach(timeLimit => {
            if (!(timeLimit instanceof TimeLimit))
                throw new Error("You must provide an array of time limits");
        });
        this.timeLimits = timeLimits;
    }

    setAllowedProgrammingLanguages(allowedProgrammingLanguages) {
        if (!(allowedProgrammingLanguages instanceof Array))
            throw new Error("You must provide an array of allowed programming languages");
        this.allowedProgrammingLanguages = allowedProgrammingLanguages;
    }

    async create(id) {
        try {
            const problemData = await getProblem(new GetProblemRequest({ id }));

            this.setId(problemData.coreProblemId);

            const coreProblemData = await getCoreProblem(new GetCoreProblemRequest({ coreProblemId: this.id }));
            const testCaseData = await getTestCase(new GetTestCaseRequest({ coreProblemId: this.id }));

            this.setName(coreProblemData.name);
            this.setDescription(coreProblemData.description);
            this.setAuthor(coreProblemData.author);
            this.setTestCases(testCaseData.map((testCase) => {
                const newTestCase = TestCase.init();
                newTestCase.setProblemId(testCase.problemId);
                newTestCase.setInput(testCase.input);
                newTestCase.setExpectedOutput(testCase.expectedOutput);
                newTestCase.setOrdinal(testCase.ordinal);
                newTestCase.setIsSample(testCase.isSample);
                newTestCase.setDescription(testCase.description);
                return newTestCase;
            }));
            this.setMemoryLimits(coreProblemData.memoryLimits.map(memoryLimit => {
                const newMemoryLimit = MemoryLimit.init();
                newMemoryLimit.setMemoryLimit(memoryLimit.memoryLimit);
                newMemoryLimit.setProgrammingLanguage(memoryLimit.programmingLanguage);
                return newMemoryLimit;
            }));
            this.setTimeLimits(coreProblemData.timeLimits.map(timeLimit => {
                const newTimeLimit = TimeLimit.init();
                newTimeLimit.setTimeLimit(timeLimit.timeLimit);
                newTimeLimit.setProgrammingLanguage(timeLimit.programmingLanguage);
                return newTimeLimit;
            }));
            this.setAllowedProgrammingLanguages(coreProblemData.allowedProgrammingLanguages);
            
        } catch (error) {
            throw error;
        };
    }
};

export default Problem;