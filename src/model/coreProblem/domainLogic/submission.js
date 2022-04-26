import { submitRequest, submitResponse, submitApi } from "../api/submitApi";

async function submit(coderId, code, programmingLanguage, problemId) {
    try {
        const submitData = (await submitApi(
            new submitRequest({ coderId, code, programmingLanguage }), problemId
        ));
        return submitData;
    } catch (error) {
        throw error
    };
};

export {
    submit,
};