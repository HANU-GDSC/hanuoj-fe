import apiService from "../../../helpers/apiService"

class submitRequest {
    constructor({
        coderId,
        code,
        programmingLanguage
    }) {
        console.assert(typeof coderId === 'string', `${coderId} must be a string`);
        console.assert(typeof code === 'string', `${code} must be a string`);
        console.assert(typeof programmingLanguage === 'string', `${programmingLanguage} must be a string`);
        this.coderId = coderId;
        this.code = code;
        this.programmingLanguage = programmingLanguage;
    }
}

class submitResponse {
    constructor({
        code,
        message,
        data
    }) {
        this.code = code;
        this.message = message;
        this.data = new submitResponseData(data);
    }
}

class submitResponseData {
    constructor({
        runTime,
        memory,
        status,
        failedTestCaseDetail,
        compilationMessage,
        stdMessage,
    }) {
        console.assert(typeof status === "string", `status: ${status} must be a string`);
        this.runTime = runTime;
        this.memory = memory;
        this.status = status;
        this.failedTestCaseDetail = failedTestCaseDetail;
        this.compilationMessage = compilationMessage;
        this.stdMessage = stdMessage;
    }
}

async function submitApi(req, id) {
    console.assert(req instanceof submitRequest, `req: ${req} must be an instance of submitRequest`);
    console.assert(typeof id === 'string', `${id} must be a string`);
    try {
        const response = (await apiService("POST", `/practiceProblem/problem/${id}/submit`, {}, req)).data    
        return new submitResponse(response).data;
    } catch (error) {
        throw error;
    }
}

export {
    submitRequest,
    submitResponse,
    submitApi
}