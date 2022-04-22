const apiService = require("../../helpers/apiService").default;
const { assert } = require("@vue/compiler-core");

class Req {
  constructor({ usernameOrEmail, password }) {
    this.usernameOrEmail = usernameOrEmail;
    this.password = password;
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

  const data = new Res(response.data);
  assert(data instanceof Res);
  console.log(data)
  return data;
}

module.exports = {
  postApi,
};
