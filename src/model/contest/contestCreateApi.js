const apiService = require("../../helpers/apiService").default;
const { assert } = require("@vue/compiler-core");

class Req {
  constructor({ name, description, startAt, endAt }) {
    assert(startAt instanceof ISOString)
    assert(endAt instanceof ISOString)

    this.name = name;
    this.description = description;
    this.startAt = startAt;
    this.endAt = endAt;
  }
}

class Res {
  constructor({ code, message, data }) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

async function postApi(request) {
  // assert(request instanceof Req);

  const response = await apiService('POST', '/contest/contest', {}, {
    name: request.name,
    description: request.description,
    startAt: request.startAt,
    endAt: request.endAt,
  })

  const data = new Res(response.data)
  assert(data instanceof Res);
  return data;
}

module.exports = {
    postApi,
}