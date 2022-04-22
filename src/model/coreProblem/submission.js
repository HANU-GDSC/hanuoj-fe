class Submission {
    constructor(submission) {
        this.id = submission.id ? submission.id : "";
        this.programmingLanguage = submission.programmingLanguage ? submission.programmingLanguage : "";
        this.runtime = submission.runtime ? submission.runtime : 0;
        this.memory = submission.memory ? submission.memory : 0;
        this.submittedAt = submission.submittedAt ? submission.submittedAt : new Date();
        this.code = submission.code ? submission.code : "";
        this.status = submission.status ? submission.status : "WA";   
        this.failedTestCases = submission.failedTestCases ? submission.failedTestCases : null;
        this.problemId = submission.problemId ? submission.problemId : "";
    }
}