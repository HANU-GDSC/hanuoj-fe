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
              href="login"
              class="form__singUp--haveAcc"
              :class="{ disabled: isLoading }"
              >Have account?</a
            ><br />
            <a
              href="login"
              class="form__singUp--signUp"
              :class="{ disabled: isLoading }"
              >Sign in</a
            >
          </div>
        </div>

        <!--form body  -->
        <div class="form__body">
          <h1 class="form__body__title">Sign Up</h1>

          <!-- Third-party buttons -->
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
            <!-- Email -->
            <span class="form__body__inputGroup--title">
              <p>Email</p>
            </span>
            <InputText
              :class="{ warning: isError.email }"
              @dataUpdated="setEmail"
              :value="input.email"
              :disabled="isLoading"
              :require="true"
              placeholder="Enter your email"
            />
            <p
              class="form__body__inputGroup--warningMessage"
              v-show="isError.email"
            >
              {{ errorMessages.email }}
            </p>
          </div>
          <!-- Username -->
          <div class="form__body__inputGroup">
            <span class="form__body__inputGroup--title">
              <p>Username</p>
            </span>
            <InputText
              :class="{ warning: isError.username }"
              @dataUpdated="setUsername"
              :value="input.username"
              :disabled="isLoading"
              :require="true"
              placeholder="Enter your username"
            />
            <p
              class="form__body__inputGroup--warningMessage"
              v-show="isError.username"
            >
              {{ errorMessages.username }}
            </p>
          </div>
          <!-- Password -->
          <div class="form__body__inputGroup">
            <span class="form__body__inputGroup--title flex--space-between">
              <p>Password</p>
            </span>
            <InputPass
              :class="{ warning: isError.password }"
              @dataUpdated="setPassword"
              :disabled="isLoading"
              :require="true"
              placeholder="Password"
            />
            <p
              class="form__body__inputGroup--warningMessage"
              v-show="isError.password"
            >
              {{ errorMessages.password }}
            </p>
          </div>
          <!-- Confirm your password -->
          <div class="form__body__inputGroup">
            <span class="form__body__inputGroup--title flex--space-between">
              <p>Confirm password</p>
            </span>
            <InputPass
              :class="{ warning: isError.confirmPassword }"
              @dataUpdated="setConfirmPassword"
              :disabled="isLoading"
              :require="true"
              placeholder="Confirm your password"
            />
            <p
              class="form__body__inputGroup--warningMessage"
              v-show="isError.confirmPassword"
            >
              Not match password
            </p>
          </div>

          <Button
            des="Sign up"
            :disabled="isLoading"
            @clicked="handleRegister"
            text="Sign up"
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
        src="../assets/img/SignUpBoy.png"
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
import User from "../model/coder/user";
import { login } from "../model/coder/domainLogic/auth";
import { register } from "../model/coder/domainLogic/auth";
import AuthLayout from "../components/authentication/AuthLayout";

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
      errorMessages: {
        email: "",
        username: "",
        password: "",
      },
      isError: {
        email: false,
        username: false,
        password: false,
        confirmPassword: false,
      },
      input: {
        email: "",
        username: "",
        password: "",
        confirmPassword: "",
      },
    };
  },

  watch: {
    confirmPassword(value) {
      this.input.confirmPassword = value;
      this.setConfirmPassword(value);
    },
  },

  methods: {
    setEmail(value) {
      this.input.email = value;
    },

    setUsername(value) {
      this.input.username = value;
    },

    setPassword(value) {
      this.input.password = value;
    },

    setConfirmPassword(value) {
      if (this.input.password != value) {
        this.isError.confirmPassword = true;
        return false;
      } else {
        this.input.confirmPassword = value;
        this.isError.confirmPassword = false;
        return true;
      }
    },

    async login(user) {
      try {
        const data = await login(user);
        localStorage.setItem("accessToken", data);
      } catch (error) {
        this.isLoading = false;
        errorHandler(error);
      }
    },

    setUser() {
      const user = new User();
      try {
        user.setEmail(this.input.email);
      } catch (error) {
        this.isError.email = true;
        this.errorMessages.email = error.message;
      }
      try {
        user.setName(this.input.username);
      } catch (error) {
        this.isError.username = true;
        this.errorMessages.username = error.message;
      }
      try {
        user.setPassword(this.input.password);
      } catch (error) {
        this.isError.password = true;
        this.errorMessages.password = error.message;
      }
      return user;
    },

    userValidate(user) {
      if (!user.getName() || !user.getPassword() || !user.getEmail()) {
        return false;
      }
      return true;
    },

    async handleRegister() {
      const user = this.setUser();
      if (
        this.setConfirmPassword(this.input.confirmPassword) &&
        this.userValidate(user)
      ) {
        try {
          await register(user);
          // login after register
          const data = this.login(user);
          // store accessToken to localStorage
          localStorage.setItem("accessToken", data);
          // move to dashboard
          this.$router.go("dashboard");
        } catch (error) {
          errorHandler(error);
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

.warning {
  border-color: red;
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

Button {
  margin-top: 10px;
}

img {
  width: 500px;
}
</style>
