<template>
  <form @submit.prevent="handleSubmit" novalidate>
    <h3>Sign Up</h3>
    <div class="form-group" >
      <InputText
        class="form-control"
        :class="{ inputEmptyOrInvalid: invalidname }"
        type = "text"
        @dataUpdated="assignUsername"
        value=""
        v-model="username"
        placeholder="UserName"
        :disable = "false"
        require = "true"
      />
    </div> <br />
   <span class="emtyWarning" v-if="invalidname">{{ warning.username }}</span>
    <div class="form-group">
      <input
      :class="{ inputEmptyOrInvalid: invalidemail }"
        type="email"
        class="form-control"
        v-model="email"
        placeholder="Email"
      />
    </div>
     <span class="emtyWarning" v-if="invalidemail">{{ warning.email }}</span>
    <div class="form-group" >
      <InputPass
        type="password"
        class="form-control"
         :class="{ inputEmptyOrInvalid: invalidpassword }"
        @dataUpdated="assignPassword"
        value=""
        v-model="password"
        placeholder="Password"
        :disable="false"
        require= "true"
      />
    </div>
    <br />
     <span class="emtyWarning" v-if="invalidpassword">{{
        warning.password
      }}</span>
      <button class="form-group">Sign Up</button>
  </form>
</template>

<script>

import axios from "axios";
import InputText from "../components/general/InputText";
import InputPass from "../components/general/InputPass";

export default {
  name: "AuthRegister",
  components: {
    InputText,
    InputPass,
  },
  data() {
    return {
      user: {
        username: "",
        password: "",
      },
      email: "",
      invalidname: false,
      invalidpassword: false,
      invalidemail:false,
      warning:{
        username:"",
        password:""
      }
    };
  },
  methods: {
      assignUsername(value) {
      this.user.username = value;
    },
    assignPassword(pass) {
      this.user.password = pass;
    },
    async handleSubmit() {
     if (this.user.username) {
        this.invalidname = true;
        this.warning.username = "Username need at least 8 characters";
      }
      if (this.user.password.length < 8) {
        this.invalidpassword = true;
        this.warning.password = "Your password need at least 8 characters";
      } 
    if (!this.user.username) {
        this.invalidname = true;
        this.warning.username = "Please enter your username or email";
      } else if (!this.user.password) {
        this.invalidpassword = true;
        this.warning.password = "Please enter your password";
      } 
      else if (!this.email) {
        this.invalidemail = true;
        this.warning.email = "Please enter your email";
      } else {
      const response = await axios.post(
        "https://6239d4b1bbe20c3f66cac2df.mockapi.io/signup",
        {
          username: this.user.username,
          email: this.email,
          password: this.user.password,
        }
      );
      console.log(response);
      
    }},
  
    
  },
};

</script>

<style>
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
  margin-bottom: 1.2em;
  margin-left: 15%;
}
</style>