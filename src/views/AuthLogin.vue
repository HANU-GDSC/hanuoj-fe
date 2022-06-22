<template>
  <AuthLayout>
    <!-- form -->
    <template #layoutcontent>
      <div class="form" :class="{ loading: isLoading }">
        <!-- form heading -->
        <div class="form__heading flex--space-between">
          <div class="form__heading__logoContainer">
            <img src="../assets/img/logoHighCode.png" alt="logo" />
            <h2>High Code</h2>
          </div>
          <div class="form__singUp">
            <a
              href="register"
              class="form__singUp--noAcc"
              :class="{ disabled: isLoading }"
              >No account?</a
            ><br />
            <a
              href="register"
              class="form__singUp--signUp"
              :class="{ disabled: isLoading }"
              >Sign up</a
            >
          </div>
        </div>

        <!--form body  -->
        <div class="form__body">
          <h1 class="form__body__title">Sign In</h1>

          <!-- third-party button -->
          <!-- <div class="form__body__button flex--space-between">
            <button
              class="form__body__button--google"
              :class="{ disabled: isLoading }"
            >
              <span>
                <img src="../assets/img/google.png" />
                Sign up with Google
              </span>
            </button>

            <button
              class="form__body__button--github"
              :class="{ disabled: isLoading }"
            >
              <img src="../assets/img/github.png" alt="" />
            </button>
          </div> -->

          <form action="" @submit.prevent="handleLogin">
            <div class="form__body__inputGroup">
              <span class="form__body__inputGroup--title">
                <p>Username or Email Address</p>
              </span>
              <InputText
                :class="{ warning: isUsernameEmpty }"
                @dataUpdated="setEmailOrUsername"
                :value="input.username || input.email"
                :disabled="isLoading"
                :require="true"
                placeholder="Username or email"
                @input="this.isUsernameEmpty = false"
              />
              <p
                class="form__body__inputGroup--warningMessage"
                v-show="this.isUsernameEmpty"
              >
                Can't let be empty
              </p>
            </div>

            <div class="form__body__inputGroup">
              <span class="form__body__inputGroup--title flex--space-between">
                <p>Password</p>
                <a href="">Forgot Password?</a>
              </span>
              <InputPass
                :class="{ warning: isPasswordEmpty }"
                @dataUpdated="setPassword"
                :disabled="isLoading"
                :require="true"
                placeholder="Password"
                @input="this.isPasswordEmpty = false"
              />
              <p
                class="form__body__inputGroup--warningMessage"
                v-show="isPasswordEmpty"
              >
                Can't let be empty
              </p>
            </div>

            <Button
              des="login"
              :disabled="isLoading"
              @clicked="handleLogin"
              text="Login"
              type="primary"
            />
          </form>
        </div>
      </div>
    </template>

    <!-- image -->
    <template #image>
      <img
        class="rightImage img2"
        src="../assets/img/signInBoy.png"
        alt="Vũ Đặng Anh Quân"
      />
    </template>
  </AuthLayout>
</template>

<script>
import InputText from "../components/general/InputText";
import Button from "../components/general/Button";
import InputPass from "../components/general/InputPass";
import errorHandler from "../helpers/errorHandler";
import LoadingIcon from "../components/general/LoadingIcon";
import { login } from "../model/coder/domainLogic/auth";
import AuthLayout from "../components/authentication/AuthLayout";
import User from "../model/coder/user";

export default {
  name: "AuthLogin",

  components: {
    InputText,
    Button,
    InputPass,
    LoadingIcon,
    AuthLayout,
  },

  data() {
    return {
      isLoading: false,
      isUsernameEmpty: false,
      isPasswordEmpty: false,
      input: {
        email: "",
        username: "",
        password: "",
      },
    };
  },

  created() {
    this.$store.state.endUser.user = new User();
  },

  methods: {
    setEmailOrUsername(value) {
      // check input type is email or username
      // email -> setEmail, username -> setUsername
      if (this.emailValidation(value)) {
        this.input.email = value;
        this.input.username = "";
      } else if (this.usernameValidation(value)) {
        this.input.email = "";
        this.input.username = value;
      }
    },

    setPassword(value) {
      if (this.passwordValidation(value)) {
        this.input.password = value;
      }
    },

    emailValidation(value) {
      let filter =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test(value)) {
        return true;
      } else {
        return false;
      }
    },

    usernameValidation(value) {
      let filter = /^[a-z][^\W_]{7,14}$/i;
      if (filter.test(value)) {
        return true;
      } else {
        return false;
      }
    },

    passwordValidation(value) {
      if (!value) {
        return false;
      } else {
        return true;
      }
    },

    setUser() {
      if (this.input.email && this.input.password) {
        this.$store.state.endUser.user.setEmail(this.input.email);
        this.$store.state.endUser.user.setPassword(this.input.password);
      } else if (this.input.username && this.input.password) {
        this.$store.state.endUser.user.setName(this.input.username);
        this.$store.state.endUser.user.setPassword(this.input.password);
      }
    },

    repOK() {
      if (!this.input.username && !this.input.email) {
        this.isUsernameEmpty = true;
        return false;
      }
      if (!this.input.password) {
        this.isPasswordEmpty = true;
        return false;
      }
      if (this.input.email && this.input.password) {
        this.isPasswordEmpty = false;
        return true;
      } else if (this.input.username && this.input.password) {
        this.isPasswordEmpty = false;
        return true;
      }
      return false;
    },

    directSignUp() {
      this.$router.push("register");
    },

    // where ?
    directForgotPass() {
      this.router.push("");
    },

    async handleLogin() {
      // check empty
      if (this.repOK()) {
        console.log(this.input);
        try {
          this.setUser();
          this.isLoading = true;
          const data = await login(this.$store.state.endUser.user);

          // add accessToken to localStorage
          localStorage.setItem("accessToken", data);

          // move to dashboard
          this.$router.go("dashboard");
          this.isLoading = false;
        } catch (error) {
          this.isLoading = false;
          setTimeout(errorHandler(error), 3000);
        }
      }
    },
  },
};
</script>

<style scoped>
/* common css */
.loading {
  opacity: 0.4;
}

.disabled {
  pointer-events: none;
  cursor: default;
}

.content {
  width: 100%;
  height: 100%;
}

/* When user try to submit with empty or wrong user's name/password */
.warning {
  --stroke-color: #f10e0e;
}

.flex--space-between {
  display: flex;
  justify-content: space-between;
}

/* form part */
.form {
  padding: 2em 4em;
}

.form__heading {
  margin-bottom: 10px;
}

.form__heading__logoContainer {
  display: flex;
}

.form__heading__logoContainer img {
  width: 2em;
  height: 2em;
}

.form__heading__logoContainer h2 {
  font-size: 16px;
  margin-left: 8px;
  margin-top: -2px;
}

.form__singUp {
  text-align: right;
  color: #7b61ff;
  font-weight: 600;
}

.form__singUp a {
  color: #7b61ff;
}

.form__singUp--signUp {
  text-decoration: underline;
}

.form__body__title {
  font-size: 2.5em;
  margin-bottom: 0.8em;
}

.form__body__button {
  margin-bottom: 2em;
}

.form__body__button--google {
  background: #7b61ff;
  border-radius: 16px;
  justify-content: center;
  text-align: center;
  min-width: 85%;
  height: 3em;
}

.form__body__button--google:hover {
  background: #302f4e;
}

.form__body__button--google span {
  font-weight: 600;
  font-size: 15px;
  display: flex;
  color: #ffffff;
  align-items: center;
  justify-content: center;
}

.form__body__button--google span img {
  margin-right: 10px;
  width: 1.5em;
}

.form__body__button--github {
  display: flex;
  align-items: center;
  justify-content: center;
  background: #ffffff;
  border: 1px solid #302f4e;
  border-radius: 10px;
  width: 3em;
  height: 3em;
}

.form__body__button--github:hover {
  background: #302f4e56;
}

.form__body__button--github img {
  width: 1.2em;
}

.form__body__inputGroup {
  margin-bottom: 5px;
}

.form__body__inputGroup--title {
  font-size: 14px;
  font-weight: 600;
}

.form__body__inputGroup--title p {
  margin-left: 2px;
  margin-bottom: 12px;
}

.form__body__inputGroup--title a {
  color: #7b61ff;
  text-decoration: underline;
}

.form__body__inputGroup input {
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  line-height: 12px;
  height: 2.8em;
  padding: 20px;
  margin-bottom: 16px;
}

.form__body__inputGroup--warningMessage {
  color: red;
  margin-left: 1rem;
  margin-top: -0.9rem;
  font-size: 14px;
}

img {
  width: 500px;
}
</style>
