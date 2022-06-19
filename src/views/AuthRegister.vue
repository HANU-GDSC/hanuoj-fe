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
            :class="{ warning: invalidusername }"
            @dataUpdated="setUsername"
            @input="invalidusername = false"
            :value=" this.$store.state.endUser.user.getUsername()"
            placeholder="Enter your name"
            :disable="false"
            :require="true"
          />
          <span class="warning" v-if="invalidusername">{{ warning.username }}</span>
          <InputText
            :class="{ warning:  invalidemail }"
            @dataUpdated="setEmail"
           @input="invalidemail = false"
            :value=" this.$store.state.endUser.user.getEmail()"
            placeholder="Enter your email"
            :disable="false"
            :require="true"
          />
          <span class="warning" v-if="invalidemail">{{ warning.email }}</span>
          <InputPass
           :class="{ warning: invalidpassword }"
            @dataUpdated="setPassword"
            @input="invalidpassword = false"
            value=""
            placeholder="Create password"
            :disable="false"
            :require="true"
          />
          <span class="warning" v-if="this.invalidpassword">{{ warning.password }}</span>
         </div>
        <div class="signup">
          <button
          @clicked="handleSubmit">Sign Up</button>
          <LoadingIcon/>
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
      invalidusername: false,
      invalidemail: false,
      invalidpassword: false,
      warning: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  created() {
    this.$store.state.endUser.user = User.init();
  },
  methods: {
    setUsername(username) {
         this.$store.state.endUser.user.setUsername(username); 
    },
    setEmail(email) {
        this.$store.state.endUser.user.setEmail(email);
    },
      setPassword(password) {
      this.$store.state.endUser.user.setPassword(password);
    },
    checkUsername(){
      let filter =/^[a-z][^\W_]{7,14}$/i
      const input = this.$store.state.endUser.user.getUsername();
      if(!filter.test(input) || input === ""){
          this.invalidusername = true;
          this.warning.username = "Username must be 8-15 characters and start with a letter!";
          return false;
      } else {
        return true;
      }
    },
      checkEmail(){
      let filter = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      const input = this.$store.state.endUser.user.getEmail();
      if(!filter.test(input) || input == ""){
          this.invalidemail = true;
          this.warning.email = "Must be in form email !";
          return false;
      } else {
        return true;
      }
      },
      checkPassword(){
       let filter =/^(?=.*[A-Z])[^:&.~\s]{5,20}$/;
       const input = this.$store.state.endUser.user.getPassword()
      if(!filter.test(input) || input == ""){
        this.invalidpassword = true;
        this.warning.password = "Password must be 5-20 characters with at least one upper case";
        return false;
      } else {
        return true;
      }
      },
    async handleSubmit() {
  
   if (this.checkUsername() && this.checkEmail() && this.checkPassword()){
        try {
         const data = await register(this.$store.state.endUser.user);
          console.log(data);
          this.$router.push("/login");
        } catch (error) {
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
.warning {
  display: block;
  text-align: left;
  color: #f10e0e;
}
</style>