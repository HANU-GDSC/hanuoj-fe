class User {
  constructor({
    id,
    email,
    usernames,
    password,
    coderId,
    registrationConfirmed,
  }) {
    this.id = id;
    this.email = email;
    this.usernames = usernames;
    this.password = password;
    this.coderId = coderId;
    this.registrationConfirmed = registrationConfirmed;
  }

  static init() {
    return new User({
      id: undefined,
      email: undefined,
      usernames: undefined,
      password: undefined,
      coderId: undefined,
      registrationConfirmed: undefined,
    });
  }

  setEmail(email) {
    let filter =
      /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    if (!filter.test(email)) {
      throw new Error("Invalid email");
    }
    this.email = email;
    this.username = "";
  }

  setUsername(username) {
    if (username.length == 0) {
      throw new Error("Invalid username");
    }
    this.username = username;
    this.email = "";
  }

  setPassword(password) {
    if (password.length == 0) {
      throw new Error("Invalid password");
    }
    this.password = password;
  }

  setCoderId(coderId) {
    this.coderId = coderId;
  }

  getEmail() {
    return this.email;
  }

  getUsername() {
    return this.username;
  }

  getPassword() {
    return this.password;
  }
}

module.exports = {
  User
};
