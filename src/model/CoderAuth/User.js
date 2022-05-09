class User {
	_id;
	_email;
	_usernames;
	_password;
	_coderId;
	_registrationConfirmed;
	constructor({
		id,
		email,
		usernames,
		password,
		coderId,
		registrationConfirmed,
	}) {
		this._id = id;
		this._email = email;
		this._usernames = usernames;
		this._password = password;
		this._coderId = coderId;
		this._registrationConfirmed = registrationConfirmed;
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
		if (typeof email !== "string")
			throw new Error("email must be a string");
		let filter =
			/^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
		if (!filter.test(email)) {
			throw new Error("Invalid email");
		}
		this._email = email;
	}

	setUsername(username) {
		if (typeof username !== "string")
			throw new Error("username must be a string");
		if (username.length == 0) {
			throw new Error("Invalid username");
		}
		this._username = username;
	}

	setPassword(password) {
		if (typeof password !== "string")
			throw new Error("password must be a string");
		if (password.length == 0) {
			throw new Error("Invalid password");
		}
		this._password = password;
	}

	setCoderId(coderId) {
		if (typeof coderId !== "string")
			throw new Error("coderId must be a string");
		this._coderId = coderId;
	}

	setRegistrationConfirmed(registrationConfirmed) {
		if (typeof registrationConfirmed !== "boolean")
			throw new Error("registrationConfirmed must be a boolean");
		this._registrationConfirmed = registrationConfirmed;
	}

	getEmail() {
		return this._email;
	}

	getUsername() {
		return this._username;
	}

	getPassword() {
		return this._password;
	}

	getCoderId() {
		return this._coderId;
	}

	getRegistrationConfirmed() {
		return this._registrationConfirmed;
	}
}

export default User;
