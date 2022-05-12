const assert = require("assert");
import apiService from "../../../../helpers/apiService"

class Request {
  constructor({ name, description, startAt, endAt }) {
    assert(typeof name === "string");
    this.name = name;

    assert(typeof description === "string");
    this.description = description;

    // ISOString
    assert(typeof startAt === "string");
    this.startAt = startAt;

    assert(typeof endAt === "string");
    this.endAt = endAt;
  }
}

class Response {
  constructor({ code, message, data }) {
    assert(typeof code === "string");
    this.code = code;

    assert(typeof message === "string");
    this.message = message;

    assert(typeof data === "string");
    this.data = data;
  }
}

async function callCreateContestAPI(request) {
  if (assert(request instanceof Request)) {
    throw new Error("Unimplemented");
  }
  try {
    const response = (await apiService("POST", "/contest/contest", {}, request)).data;
    return new Response(response).data;
  } catch (error) {
    throw error;
  }
}

export { Request, Response, callCreateContestAPI };
