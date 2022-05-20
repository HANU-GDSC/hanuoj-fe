<template>
  <AuthLayout>
    <!-- form -->
    <template #layoutcontent>
      <div class="form">
        <!-- form heading -->
        <div class="form__heading flex--space-between">
          <div class="form__heading__logoContainer">
            <img src="../assets/img/logoHighCode.png" alt="logo" />
            <h2>High Code</h2>
          </div>
          <div class="form__singUp">
            <a href="register" class="form__singUp--noAcc">No account?</a><br />
            <a href="register" class="form__singUp--signUp">Sign up</a>
          </div>
        </div>

        <!--form body  -->
        <div class="form__body">
          <h1 class="form__body__title">Sign in</h1>
          <div class="form__body__button flex--space-between">
            <button class="form__body__button--google">
              <span>
                <img src="../assets/img/google.png" />
                Sign up with Google
              </span>
            </button>

            <button class="form__body__button--github">
              <img src="../assets/img/github.png" alt="" />
            </button>
          </div>
          <form action="" @submit.prevent="handleLogin">
            <div class="form__body__inputGroup">
              <span class="form__body__inputGroup--title">
                <p>Username or Email Address</p> </span
              >
              <InputText
                :class="{ inputEmptyOrWrong: isError }"
                @dataUpdated="setEmailOrUsername"
                :value="
                  this.$store.state.endUser.user.getEmail() ||
                  this.$store.state.endUser.user.getUsername()
                "
                :disable="isLoading"
                :require="true"
                placeholder="Username or email"
              />
            </div>

            <div class="form__body__inputGroup">
              <span class="form__body__inputGroup--title flex--space-between">
                <p>Password</p>
                <a href="">Forgot Password?</a>
              </span>
              <InputPass
                :class="{ inputEmptyOrWrong: isError }"
                @dataUpdated="setPassword"
                :disable="isLoading"
                :require="true"
                placeholder="Password"
              />
            </div>

            <Button
              text="Sign in"
              type="primary"
              des="login"
              :disable="isLoading"
              @click="handleLogin"
            />
            <LoadingIcon v-if="isLoading" />
          </form>
        </div>
      </div>
    </template>

    <!-- image -->
    <template #image>
      <img class="rightImage" src="../assets/img/bag.png" alt="a bag" />
    </template>
  </AuthLayout>
</template>

<script>
import InputText from "../components/general/InputText";
import Button from "../components/general/Button";
import InputPass from "../components/general/InputPass";
import errorHandler from "../helpers/errorHandler";
import LoadingIcon from "../components/general/LoadingIcon";
import User from "../model/CoderAuth/User";
import AuthLayout from "../components/authentication/AuthLayout.vue";
import { login } from "../model/CoderAuth/domainLogic/User";

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
      isError: false,
      isEmpty: false,
    };
  },

  created() {
    this.$store.state.endUser.user = User.init();
  },

  methods: {
    setEmailOrUsername(value) {
      // check input type is email or username
      // email -> setEmail, username -> setUsername
      let filter =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (filter.test(value)) {
        this.$store.state.endUser.user.setEmail(value);
      } else {
        this.$store.state.endUser.user.setUsername(value);
      }
    },

    setPassword(password) {
      this.$store.state.endUser.user.setPassword(password);
    },

    directSignUp() {
      this.$router.push("register");
    },

    // where ?
    directForgotPass() {
      this.router.push("");
    },

    async handleLogin() {
      // need to check empty
      //
      //
      this.isLoading = true;
      try {
        const data = await login(this.$store.state.endUser.user);

        // add accessToken to localStorage
        localStorage.setItem("accessToken", data);

        // move to dashboard
        // this.$router.go("dashboard");
        this.isLoading = false;
      } catch (error) {
        this.isLoading = false;
        setTimeout(errorHandler(error), 3000);
      }
    },
  },
};
</script>

<style scoped>
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

/* When user try to submit with empty or wrong user's name/password */
.inputEmptyOrWrong {
  border: 1px solid #f10e0e;
}

.emptyWarning {
  display: block;
  text-align: left;
  color: #f10e0e;
  font-size: 12px;
  margin-bottom: 1.2em;
  margin-left: 15%;
}

.flex--space-between {
  display: flex;
  justify-content: space-between;
}

.form {
  background: #ffffff;
  box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.25);
  border-radius: 35px;
  padding: 3em 2.5em;
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
  margin-top: 6px;
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

.form__body {
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
  padding: 0 4em;
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
  margin-bottom: 1em;
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
  border: 1px solid #9288c1;
  border-radius: 12px;
  width: 100%;
  font-size: 18px;
  font-weight: 500;
  line-height: 12px;
  height: 2.8em;
  padding: 20px;
  margin-bottom: 16px;
}

.rightImage {
  margin-right: 20px;
}
</style>
