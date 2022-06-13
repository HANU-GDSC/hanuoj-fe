<template>
<AuthLayout>
  <template #layoutcontent>
    <div class="wrapper">
      <form @submit.prevent="handleSubmit" novalidate>
        <div class="header">
          <div class="header-logo">
            <img src="../assets/highcode.png" />
            <p>High Code</p>
          </div>
          <div class="header-content">
            <a href="#">Have account? </a>
            <a href="#">Sign in </a>
          </div>
        </div>
        <h1>Sign Up</h1>
        <div class="mid-content">
          <div class="googleSignUp">
          <button>
            <span
              style="
                align-items: flex-end;
                text-align: center;
                color: #ffffff;
                font-size: 18px;
              "
            >
              <img src="../assets/google.png" />
              Sign up with Google
            </span>
          </button>
          </div>
         
          <div class="github">
            <button>
              <img src="../assets/github.png" />
            </button>
          </div>
        </div>
        <div class="form-group">
          <InputText
            :class="{ warning: isUsernameEmpty }"
            @dataUpdated="setUsername"
            :value=" this.$store.state.endUser.user.getUsername()"
            placeholder="Enter your name"
            :disable="false"
            :require="true"
          />
          <InputText
            :class="{ warning: isEmailEmpty }"
            @dataUpdated="setEmail"
            :value=" this.$store.state.endUser.user.getEmail()"
            placeholder="Enter your email"
            :disable="false"
            :require="true"
          />
          <InputPass
           :class="{ warning: isPasswordEmpty }"
            @dataUpdated="setPassword"
            value=""
            placeholder="Create password"
            :disable="false"
            :require="true"
          />
         </div>
        <div class="signup">
          <button>Sign Up</button>
          <LoadingIcon v-if="isLoading" />
        </div>
      </form>
      </div>
  </template>
    <template #image>
      <img src="../assets/signup.png" alt="signup" />
    </template>
  </AuthLayout>
</template>
<script>
import InputText from "../components/general/InputText";
import InputPass from "../components/general/InputPass";
import errorHandler from "../helpers/errorHandler";
import LoadingIcon from "../components/general/LoadingIcon";
import AuthLayout from "../components/authentication/AuthLayout.vue";
import User from "../model/CoderAuth/User";
import { register } from "../model/CoderAuth/domainLogic/User";
export default {
  name: "AuthRegister",
  components: {
    InputText,
    InputPass,
    LoadingIcon,
    AuthLayout,
  },
  data() {
    return {
      isLoading: false,
      isUsernameEmpty: false,
      isPasswordsEmpty: false,
      isEmailEmpty: false,
    };
  },
  created() {
    this.$store.state.endUser.user = User.init();
  },
  methods: {
    setUsername(value) {
      this.$store.state.endUser.user.setUsername(value);
    },
    setPassword(value) {
      this.$store.state.endUser.user.setPassword(value);
    },
    setEmail(value) {
      this.$store.state.endUser.user.setEmail(value);
    },
     checkEmpty() {
      if (
        this.$store.state.endUser.user.getEmail() ||
        (this.$store.state.endUser.user.getUsername() &&
          this.$store.state.endUser.user.getPassword())
      ) {
        return true;
      }

      return false;
    },
    async handleSubmit() {
  
   if (this.checkEmpty()){
        this.isLoading = true;
        try {
         const data = await register(this.$store.state.endUser.user);
          console.log(data);
          this.isLoading = false;
          this.$router.push("/login");
        } catch (error) {
          this.isLoading = false;
          errorHandler(error);
        }
      }
    },
  },
};
</script>
<style scoped>


.header {
  display: flex;
  justify-content: space-between;
  color: #302f4e;
}
.header-logo {
  display: flex;
  gap: 10px;
}
.header-logo p{
  margin-top: 8px;
}
.header-content {
  display: grid;
  line-height: 23px;
  text-align: right;
  color:  #7B61FF;
;
}
h1 {
  padding: 16px 0;
  line-height: 75px;
  /* identical to box height */
  align-items: flex-end;
  color: #302f4e;
}
.mid-content {
  display: flex;
  float: left;
  margin-bottom: 18px;
}
.mid-content button:hover{
  background-color: #302f4e;
}
.mid-content img {
  margin-bottom: -8px;
}
.googleSignUp button {
  width: 300px;
  height: 60px;
  background: #7b61ff;
  border-radius: 20px;
}
.github button {
  width: 100%;
  height: 60px;
  background: #ffffff;
  border: 1px solid #302f4e;
  border-radius: 10px;
  margin-left: 30px;
}
.github button:hover{
  background-color: #7b61ff;
}
.wrapper form input {
  height: 60px;
  margin: 20px 0;
}
.form-group input {
  border: 1px solid #9288c1;
  border-radius: 20px;
  height: 20px;
  width: 100%;
  padding: 20px;
}
.signup button {
  background: #302f4e;
  border-radius: 15px;
  width: 120px;
  height: 50px;
  justify-items: center;
  color: #ffffff;
  margin-top: 10px;
}
.signup button:hover{
  background-color: #7b61ff;
}
.emtyWarning {
  display: block;
  text-align: left;
  color: #f10e0e;
  margin-left: 30px;
}
</style>