<template>
  <!-- <div class="everythingContainer"> -->
  <!-- form -->
  <div class="formContainer">
    <form action="" @keyup.enter="handleLogin">
      <!-- form heading -->
      <div class="formHeading">
        <div class="logoContainer">
          <div class="logo"></div>
          <h2>High Code</h2>
        </div>
        <div class="singUpContainer">
          No account?
          <a href="" class="directToSignUp">Sign up</a>
        </div>
        <h1 class="formTitle">Sign in</h1>
      </div>

      <!--form body  -->
      <div class="formBody">
        <form action="">
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
          /><br />

          <InputPass
            :class="{ inputEmptyOrWrong: isError }"
            @dataUpdated="setPassword"
            :disable="isLoading"
            :require="true"
            placeholder="Password"
          /><br />

          <Button
            text="Login"
            type="primary"
            des="login"
            :disable="isLoading"
            @click="handleLogin"
          />
          <LoadingIcon v-if="isLoading" />
        </form>
      </div>
    </form>
  </div>

  <!-- image -->
  <div class="imgContainer">
    <div class="img"></div>
  </div>
  <!-- </div> -->
</template>

<script>
import InputText from "../components/general/InputText";
import Button from "../components/general/Button";
import InputPass from "../components/general/InputPass";
import errorHandler from "../helpers/errorHandler";
import LoadingIcon from "../components/general/LoadingIcon";
import User from "../model/CoderAuth/User";
import { login } from "../model/CoderAuth/domainLogic/User";

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

.logo {
  /* position: absolute;
  left: 14.32%;
  right: 83.07%;
  top: 16.94%;
  bottom: 78.43%; */
  background: url("../assets/img/logoHighCode.png");
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

.formContainer {
  position: relative;
  margin-top: 1.2em;
  width: 30%;
  height: 60vh;
  left: 196px;
  top: 92px;

  background: #ffffff;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  float: left;
}

.formBody {
  display: flex;
  justify-content: center;
}

.imgContainer {
  position: absolute;
  left: 52.19%;
  right: 3.33%;
  top: 8.33%;
  bottom: 12.59%;
  display: flex;
  justify-content: center;
  float: right;
}

.img {
  height: 35em;
  width: 35em;
  background: url("../assets/img/bag.png") no-repeat center;
  background-size: cover;
}
</style>
