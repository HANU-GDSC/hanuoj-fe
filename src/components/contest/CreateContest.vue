<template>
  <h2>Create contest</h2>
  <div class="container">
    <div class="inputGroup">
      <label for="" class="inputTag">
        Contest Name
        <span class="requiredIndicator">*</span>
      </label>
      <div class="inputContainer">
        <InputText
          :class="{ redBorder: isNameWarning }"
          :value="name"
          :disable="false"
          require="true"
          placeholder="name"
          @dataUpdated="assignName"
        /><br />
        <span :class="{ warning: isNameWarning }" v-if="isNameWarning"
          >can not let be empty</span
        >
      </div>
      <div class="clear"></div>
    </div>
    <div class="inputGroup">
      <label for="" class="inputTag">
        Description
        <span class="requiredIndicator">*</span>
      </label>
      <div class="inputContainer">
        <InputText
          :class="{ redBorder: isDesWarning }"
          id="description"
          :value="description"
          :disable="false"
          require="true"
          placeholder="description"
          @dataUpdated="assignDescription"
        /><br />
        <span :class="{ warning: isDesWarning }" v-if="isDesWarning"
          >can not let be empty</span
        >
      </div>
      <div class="clear"></div>
    </div>
    <div class="inputGroup">
      <label for="" class="inputTag">
        Start Time
        <span class="requiredIndicator">*</span>
      </label>
      <div class="inputContainer">
        <div class="inputDateAndTime" :class="{ border: isStartAtWarning }">
          <!-- Start at -->
          <InputDate
            :class="{ redBorder: isStartAtWarning }"
            :value="startDate"
            :disable="false"
            require="true"
            @dataUpdated="assignStartDate"
          />
          <span class="at">at</span>
          <InputTime
            :value="startTime"
            :disable="false"
            require="true"
            @dataUpdated="assignStartTime"
          />
        </div>
        <span :class="{ warning: isStartAtWarning }" v-if="isStartAtWarning"
          >can not let be empty</span
        >
      </div>
      <div class="clear"></div>
    </div>
    <div class="inputGroup">
      <label for="" class="inputTag">
        End Time
        <span class="requiredIndicator">*</span>
      </label>
      <div class="inputContainer">
        <div class="inputDateAndTime" :class="{ border: isEndAtWarning }">
          <!-- End at -->
          <InputDate
            :class="{ redBorder: isEndAtWarning }"
            :value="endDate"
            :disable="false"
            require="true"
            @dataUpdated="assignEndDate"
          />
          <span class="at">at</span>
          <InputTime
            :value="endTime"
            :disable="false"
            require="true"
            @dataUpdated="assignEndTime"
          />
        </div>
        <span :class="{ warning: isEndAtWarning }" v-if="isEndAtWarning"
          >can not let be empty</span
        >
      </div>
      <div class="clear"></div>
    </div>
    <Button
      text="Create"
      type="primary"
      des="submit form"
      :disable="false"
      @click="handleCreate"
    />
  </div>
  <div class="modal" :class="{ block: isLoading }">
    <div class="modalContent">
      <LoadingIcon />
    </div>
  </div>
  <Alert :text="alert" type="primary" :isShow="isSuccess" @close="redirect"/>
</template>

<script>
import InputText from "../general/InputText";
import Button from "../general/Button";
import InputDate from "../general/InputDate";
import InputTime from "../general/InputTime";
import apiService from "../../helpers/apiService";
import errorHandler from "../../helpers/errorHandler";
import LoadingIcon from "../general/LoadingIcon";
import Alert from "../general/Alert";

export default {
  name: "CreateContest",

  components: {
    InputText,
    Button,
    InputDate,
    InputTime,
    LoadingIcon,
    Alert,
  },

  data() {
    return {
      name: "",
      description: "",
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      isLoading: false,
      isNameWarning: false,
      isDesWarning: false,
      isStartAtWarning: false,
      isEndAtWarning: false,
      alert: "",
      isSuccess: false,
    };
  },

  methods: {
    assignName(name) {
      this.name = name;
    },

    assignDescription(description) {
      this.description = description;
    },

    assignStartDate(inputValue) {
      this.startDate = inputValue;
    },

    assignStartTime(inputValue) {
      this.startTime = inputValue;
    },

    assignEndDate(inputValue) {
      this.endDate = inputValue;
    },

    assignEndTime(inputValue) {
      this.endTime = inputValue;
    },

    redirect() {
      this.$router.push("/contest")
    },

    async handleCreate() {
      // convert to ISO date string
      const startAt = new Date(this.startDate + " " + this.startTime);
      const endAt = new Date(this.endDate + " " + this.endTime);

      if (!this.name && !this.description && !this.startDate && !this.endDate) {
        this.isNameWarning = true;
        this.isDesWarning = true;
        this.isStartAtWarning = true;
        this.isEndAtWarning = true;
      } else if (!this.name) {
        this.isNameWarning = true;
      } else if (!this.description) {
        this.isDesWarning = true;
      } else if (!this.startDate || !this.startTime) {
        this.isStartAtWarning = true;
      } else if (!this.endDate || !this.endTime) {
        this.isEndAtWarning = true;
      } else {
        // POST
        try {
          // console.log(startAt + " ||| " + endAt)
          this.isLoading = true;
          const response = await apiService("POST", "contest/create", "", {
            name: this.name,
            description: this.description,
            startAt: startAt.toISOString(),
            endAt: endAt.toISOString(),
          });

          const data = response.data;
          this.isLoading = false;
          this.isSuccess = true;
          this.alert = data.message;
          return data.data.id;
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
.clear {
  clear: both;
}

.at {
  margin: 0 1em;
}

.container {
  width: 100vw;
}

.inputGroup {
  margin: 30px 0;
}

.requiredIndicator {
  color: #f65039;
}

.redBorder {
  border: 1px solid red;
}

.border .timePicker {
  border: 1px solid red;
}

.warning {
  color: red;
  margin-left: 5px;
}

button {
  display: flex;
  padding: 2em 4em;
  justify-content: center;
  align-items: center;
}

h2 {
  font-size: 3em;
  margin: 20px 0;
}

.inputTag {
  display: block;
  width: 20%;
  color: black;
  font-size: 1.2em;
  font-weight: 400;
}

.inputContainer {
  width: 70%;
}

.inputContainer,
.inputTag {
  display: block;
  float: left;
}

input {
  border: 1px solid #c2c7d0;
  border-radius: 5px;
  box-shadow: inset 0 1px 2px rgb(151 159 175 / 10%),
    inset 0 1px 15px rgb(151 159 175 / 5%);
  color: #39424e;
  font-size: 1em;
  line-height: 1.5em;
  padding: 7px 10px;
  transition: all 0.3s ease;
}

#description {
  width: 42%;
}

.container i {
  font-size: 2em;
  float: left;
  margin-top: -45px;
  margin-left: 45px;
}

/* modal */
.modal {
  display: none;
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(255, 255, 255, 0.7);
  justify-content: center;
}

.modalContent {
  margin: 10% auto;
  padding: 20px;
  /* border: 1px solid #888; */
  width: 40%;
  height: 50%;
  font-size: 10em;
  text-align: center;
  line-height: 2em;
}

.block {
  display: block;
}
</style>
