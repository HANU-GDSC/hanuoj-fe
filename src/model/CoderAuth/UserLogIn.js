// được thay thế bằng file "./domainLogic/User.js"
const { assert } = require("@vue/compiler-core");
const { User } = require("./User");
const { postApi } = require("./UserLogInAPI");

async function LogIn(user) {
  assert(user instanceof User);

  let request = {
    usernameOrEmail: user.getUsername() || user.getEmail(),
    password: user.getPassword()
  }
  const data = await postApi(request);

  return data;
}


module.exports = {
  LogIn,
};
