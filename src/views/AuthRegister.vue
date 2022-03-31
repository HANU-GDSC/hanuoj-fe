<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <h3>Sign Up</h3>
    <div class="form-group">
      <InputText
        class="form-control"
        :class="{ inputEmptyOrInvalid: invalidname }"
        @dataUpdated="assignUsername"
        :value="user.username"
        placeholder="UserName"
        :disable="false"
        :require="true"
      />
    </div>
    <br />
    <span class="emtyWarning" v-if="invalidname">{{ warning.username }}</span>
    <div class="form-group">
      <InputText
        :class="{ inputEmptyOrInvalid: invalidemail }"
        class="form-control"
        @dataUpdated="assignEmail"
        :value="user.email"
        placeholder="Email"
        :disable="false"
        :require="true"
      />
    </div>
    <span class="emtyWarning" v-if="invalidemail">{{ warning.email }}</span>
    <div class="form-group">
      <InputPass
        class="form-control"
        :class="{ inputEmptyOrInvalid: invalidpassword }"
        @dataUpdated="assignPassword"
        value=""
        placeholder="Password"
        :disable="false"
        :require="true"
      />
    </div>
    <br />
    <span class="emtyWarning" v-if="invalidpassword">{{
      warning.password
    }}</span>
    <button class="form-group">Sign Up</button>
    <LoadingIcon v-if="isLoading" />
  </form>
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
      } 
      else if (this.user.password.length < 8) {
        this.invalidpassword = true;
        this.warning.password = "Your password need at least 8 characters";
      } else if (!this.user.email) {
        this.invalidemail = true;
        this.warning.email = "Please enter your email";
      } else {
        this.isLoading = true;
        try {
          const response = await apiService("POST", "/signup", "", { // lam cai loading chua, chua, gio them isloading laf dc dung k
            username: this.user.username,
            email: this.user.email,
            password: this.user.password,
          });
          console.log(response);
           this.isLoading = false;
           alert("Sign up successful")
          this.$router.push("/login");
          // lam them cai loading nhe :3 ok ong ,cam on ong nhieu
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

.form-control {
  padding: 8px 1px;
}

form {
  margin-left: 550px;
  margin-top: 100px;
  border: 3px solid rgb(208, 214, 208);
  padding: 10px;
  text-align: center;
  width: 400px;
  height: 400px;
  left: 564px;
  right: 964px;
  top: 44px;
}
.form-group {
  box-sizing: border-box;
  color: #546e7a;
  border: 1px solid #cfd8dc;
  border-radius: 5px;

  margin-left: 30px;
  margin-right: 30px;
}
div.form-group {
  margin-top: 20px;
}
button {
  width: 80%;
  margin-top: 15px;
  margin-left: 30px;
  margin-right: 30px;
}
.form-control {
  text-align: center;
}
.emtyWarning {
  display: block;
  text-align: left;
  color: #f10e0e;
  font-size: 12px;
  margin-left: 10%;
}
</style>