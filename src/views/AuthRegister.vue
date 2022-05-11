<template>
  <div class="container">
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
          <button>
            <span
              style="
                font-family: 'Roboto';
                font-style: normal;
                font-weight: 700;
                font-size: 24px;
                line-height: 28px;
                align-items: flex-end;
                text-align: center;
                color: #ffffff;
              "
            >
              <img src="../assets/google.png" />
              Sign up with Google
            </span>
          </button>
          <br />
          <div class="github">
            <button>
              <img src="../assets/github.png" />
            </button>
          </div>
        </div>
        <div class="form-group">
          <InputText
            :class="{ inputEmptyOrInvalid: invalidname }"
            @dataUpdated="assignUsername"
            :value="user.username"
            placeholder="Enter your name"
            :disable="false"
            :require="true"
          />
        </div>
        <span class="emtyWarning" v-if="invalidname">{{
          warning.username
        }}</span>
        <div class="form-group">
          <InputText
            :class="{ inputEmptyOrInvalid: invalidemail }"
            @dataUpdated="assignEmail"
            :value="user.email"
            placeholder="Enter your email"
            :disable="false"
            :require="true"
          />
        </div>
        <span class="emtyWarning" v-if="invalidemail">{{ warning.email }}</span>
        <div class="form-group">
          <InputPass
            :class="{ inputEmptyOrInvalid: invalidpassword }"
            @dataUpdated="assignPassword"
            value=""
            placeholder="Create password"
            :disable="false"
            :require="true"
          />
        </div>
        <span class="emtyWarning" v-if="invalidpassword">{{
          warning.password
        }}</span>
        <div class="signup">
          <button>Sign Up</button>
          <LoadingIcon v-if="isLoading" />
        </div>
      </form>
    </div>
    <div>
      <img src="../assets/signup.png" alt="signup" />
    </div>
  </div>
</template>
<script>
import InputText from "../components/general/InputText";
import InputPass from "../components/general/InputPass";
import apiService from "../helpers/apiService";
import errorHandler from "../helpers/errorHandler";
import LoadingIcon from "../components/general/LoadingIcon";
export default {
  name: "AuthRegister",
  components: {
    InputText,
    InputPass,
    LoadingIcon,
  },
  data() {
    return {
      user: {
        username: "",
        email: "",
        password: "",
      },
      invalidname: false,
      invalidpassword: false,
      invalidemail: false,
      isLoading: false,
      warning: {
        username: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    // console.log test thì cả 3 input đều nhận data
    assignUsername(value) {
      this.user.username = value;
      console.log(this.user.username);
    },
    assignPassword(pass) {
      this.user.password = pass;
      console.log(this.user.password);
    },
    assignEmail(email) {
      this.user.email = email;
      console.log(this.user.email);
    },
    async handleSubmit() {
      if (!this.user.username) {
        this.invalidname = true;
        this.warning.username = "Please enter your username or email";
      } else if (this.user.username.length < 8) {
        this.invalidname = true;
        this.warning.username = "Username need at least 8 characters";
      } else if (!this.user.password) {
        this.invalidpassword = true;
        this.warning.password = "Please enter your password";
      } else if (this.user.password.length < 8) {
        this.invalidpassword = true;
        this.warning.password = "Your password need at least 8 characters";
      } else if (!this.user.email) {
        this.invalidemail = true;
        this.warning.email = "Please enter your email";
      } else {
        this.isLoading = true;
        try {
          const response = await apiService("POST", "/coderAuth/signUp", "", {
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
          });
          console.log(response);
          this.isLoading = false;
          alert("Sign up successful");
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
template {
  font-size: 24px;
  font-weight: 700;
  line-height: 28px;
  letter-spacing: 0em;
  text-align: center;
  font-family: "Roboto";
  font-style: normal;
  align-items: flex-end;
}
.container {
  display: flex;
  align-items: center;
  justify-content: center;
}
.wrapper {
  float: left;
  padding: 55px 160px;
  position: relative;
  max-width: 1200px;
  width: 100%;
  background: #fff;
}
form {
  position: relative;
  max-width: 1000px;
  width: 100%;
  background: #ffffff;
  box-shadow: 0px 4px 40px rgba(0, 0, 0, 0.25);
  border-radius: 50px;
  justify-content: center;
  padding: 86px;
}
.header {
  display: flex;
  justify-content: space-between;
  font-size: 24px;
  color: #302f4e;
}
.header-logo {
  display: flex;
  gap: 10px;
}
.header-content {
  display: grid;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 20px;
  line-height: 23px;
  text-align: center;
  color: #7b61ff;
  justify-content: right;
}
h1 {
  padding: 30px 0;
  font-family: "Roboto";
  font-style: normal;
  font-weight: 700;
  font-size: 64px;
  line-height: 75px;
  /* identical to box height */
  display: flex;
  align-items: flex-end;
  color: #302f4e;
}
.mid-content {
  display: flex;
  float: left;
  text-align: center;
  justify-content: space-between;
}
.mid-content button {
  width: 600px;
  height: 70px;
  left: 282px;
  top: 300px;
  background: #7b61ff;
  border-radius: 20px;
  justify-content: center;
  text-align: center;
}
.mid-content button:hover{
  background-color: #302f4e;
}
.mid-content img {
  margin-bottom: -6px;
}
.github button {
  width: 80px;
  height: 70px;
  left: 730px;
  top: 300px;
  background: #ffffff;
  border: 1px solid #302f4e;
  border-radius: 10px;
  margin-left: 30px;
}
.github button:hover{
  background-color: #7b61ff;
}
.wrapper form input {
  height: 70px;
  margin: 30px 0;
}
.form-group input {
  border: 1px solid #9288c1;
  border-radius: 20px;
  height: 96px;
  width: 100%;
  padding: 36px;
  font-size: 17px;
  font-weight: 400;
}
.signup button {
  background: #302f4e;
  border-radius: 15px;
  width: 200px;
  height: 70px;
  left: 282px;
  top: 908px;
  justify-items: center;
  color: #ffffff;
  font-weight: 500;
}
.signup button:hover{
  background-color: #7b61ff;
}
.emtyWarning {
  display: block;
  text-align: left;
  color: #f10e0e;
  font-size: 17px;
  margin-left: 30px;
}
</style>