<template>
  <div class="loginContainer">
    <div class="loginContent" :class="{ loading: isLoading }">
      <h2>Login</h2>
      <InputText
        :class="{ inputEmptyOrWrong: isWrongEmail }"
        @dataUpdated="assignUsername"
        :value="user.username || user.email"
        :disable="isLoading"
        :require="true"
        placeholder="User's name or email"
      />
      <span class="emtyWarning" v-if="isWrongEmail">{{
        warning.wrongEmail
      }}</span>
      <InputPass
        :class="{ inputEmptyOrWrong: isWrongPassword }"
        @dataUpdated="assignPassword"
        :disable="isLoading"
        :require="true"
        placeholder="Password"
      /><br />
      <span class="emtyWarning" v-if="isWrongPassword">{{
        warning.wrongPassword
      }}</span>
      <div>
        <a @click="directSignUp" :class="{ disabled: isLoading }">Sign up</a>
        <a @click="directForgotPass" href="" :class="{ disabled: isLoading }"
          >Forgot your password?</a
        >
      </div>
      <Button
        text="Login"
        type="primary"
        des="login"
        :disable="isLoading"
        @clicked="login"
        @keydown.enter="login"
      />
    </div>
    <LoadingIcon v-if="isLoading" />
  </div>
</template>

<script>
import InputText from "../components/general/InputText";
import Button from "../components/general/Button";
import InputPass from "../components/general/InputPass";
import apiService from "../helpers/apiService";
import errorHandler from "../helpers/errorHandler";
import LoadingIcon from "../components/general/LoadingIcon";

export default {
  name: "AuthLogin",

  components: {
    InputText,
    Button,
    InputPass,
    LoadingIcon,
  },

  data() {
    return {
      user: {
        email: "",
        username: "",
        password: "",
      },
      warning: {
        wrongEmail: "",
        wrongPassword: "",
      },
      isLoading: false,
      isWrongEmail: false,
      isWrongPassword: false,
    };
  },

  created() {
    // if local storage have accessToken -> return current user data
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      let currentUserData = JSON.parse(localStorage.getItem("currentUserData"));
      return currentUserData;
    }
  },

  methods: {
    assignUsername(value) {
      // check input type is email or username
      // email -> assign this.email, username -> assign this.username
      let filter =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test(value)) {
        this.user.email = value;
        this.user.username = "";
      } else {
        this.user.username = value;
        this.user.email = "";
      }
    },

    assignPassword(password) {
      this.user.password = password;
    },

    directSignUp() {
      this.$router.push("register");
    },

    // where ?
    directForgotPass() {
      this.router.push();
    },

    async login() {
      // check whether input was entered
      if (!this.user.username && !this.user.email && !this.user.password) {
        this.isWrongEmail = true;
        this.warning.wrongEmail = "Please enter your username or email";
        this.isWrongPassword = true;
        this.warning.wrongPassword = "Please enter your password";
      } else if (!this.user.username && !this.user.email) {
        this.isWrongEmail = true;
        this.warning.wrongEmail = "Please enter your username or email";
      } else if (!this.user.password) {
        this.isWrongPassword = true;
        this.warning.wrongPassword = "Please enter your password";
      } else {
        this.isLoading = true;
        // POST
        try {
          const response = await apiService("POST", "/login", "", {
            email: this.user.email,
            username: this.user.username,
            password: this.user.password,
          });

          const data = response.data;
          // console.log(data);

          // handle error "WRONG_PASSWORD"
          switch (data.code) {
            case "WRONG_PASSWORD":
              this.isLoading = false;
              this.isWrongEmail = true;
              this.warning.wrongEmail =
                "Maybe your username/email is incorrect";
              this.isWrongPassword = true;
              this.warning.wrongPassword = "Or maybe you missed your password";
              break;
            // any other case ?
          }
          this.isLoading = false;

          // add accessToken to localStorage
          localStorage.setItem("accessToken", data.data);

          // set current user data to VueX and localStorage
          this.$store.dispatch("endUser/setCurrentUser", this.user);
          localStorage.setItem(
            "currentUserData",
            JSON.stringify(this.$store.state.endUser.currentUserData)
          );

          // move to dashboard
          this.$router.go("dashboard");
        } catch (error) {
          this.isLoading = false;
          errorHandler(error);
        }
      }
    },
  },
};
</script>

<style>
.loading {
  opacity: 0.4;
}

.disabled {
  pointer-events: none;
}

.content {
  width: 100%;
  height: 100%;
}

.loginContainer {
  position: relative;
  width: 30vw;
  min-width: 500px;
  height: 550px;
  min-height: 500px;
  padding: 70px 40px;
  margin: 11vh auto;
  text-align: center;
  border-radius: 5px;
  border: 1px solid #0e65f1;
}

.loginContent {
  position: absolute;
  font-size: 17px;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: 20px auto;
}

h2 {
  margin: 20px;
  font-size: 35px;
  font-weight: 400;
}

input {
  width: 80%;
  height: 50px;
  padding: 30px 20px;
  margin: 10px 0;
  font-size: 17px;
  border-radius: 5px;
  border: 1px solid #ccc;
}

.loginContainer button {
  margin-top: 4em;
  width: 7rem;
  height: 3rem;
  font-size: 16px;
}

div a {
  margin: 0 60px;
  color: #0e65f1;
}

input:focus-within {
  border: 1px solid #0e65f1;
}

/* When user try to submit with empty or wrong user's name/password */
.inputEmptyOrWrong {
  border: 1px solid #f10e0e;
}

.emtyWarning {
  display: block;
  text-align: left;
  color: #f10e0e;
  font-size: 12px;
  margin-bottom: 1.2em;
  margin-left: 15%;
}
.loginContainer i {
  line-height: 370px;
  font-size: 5em;
}
</style>
