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

// class LogIn {
//   constructor({ username, email, password }) {
//     this.username = username;
//     this.email = email;
//     this.password = password;
//   }

//   static async execute(user) {
//     const response = await apiService(
//       "POST",
//       "/coderAuth/logIn",
//       {},
//       {
//         email: this.email,
//         username: this.username,
//         password: this.password,
//       }
//     );

//     const data = response.data;
//     this.id = data.data;
//     return data;
//   }
// }

module.exports = {
  LogIn,
};
