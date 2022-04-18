const apiService = require("../../helpers/apiService").default;
const { assert } = require("@vue/compiler-core");

class Request {
  constructor({ usernameOrEmail, password }) {
    this.usernameOrEmail = usernameOrEmail;
    this.password = password;
  }
}

class Response {
  constructor({ code, message, data }) {
    this.code = code;
    this.message = message;
    this.data = data;
  }
}

async function postApi(request) {
  // assert(request instanceof Request);
  const response = await apiService(
    "POST",
    "/coderAuth/logIn",
    {},
    {
      // this must be email or username
      usernameOrEmail: request.usernameOrEmail,
      password: request.password,
    }
  );

  const data = new Response(response.data);
  assert(data instanceof Response);
  return data;
}

module.exports = {
  postApi,
};
