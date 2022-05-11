import { submitRequest, submitResponse, submitApi } from "../api/submitApi";
import Submission from "../submission";

async function submit(coderId, submission) {
    try {
        console.assert(submission instanceof Submission);

        const submitData = await submitApi(
            new submitRequest({
                coderId,
                code: submission.getCode(),
                programmingLanguage: submission.getProgrammingLanguage(),
                problemId: submission.getProblemId(),
            })
        );
        return submitData;
    } catch (error) {
        throw error
    };
};

export {
    submit,
};