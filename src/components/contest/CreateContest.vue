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
          value=""
          :disable="false"
          :require="true"
          placeholder="name"
          @dataUpdated="setName"
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
          id="description"
          value=""
          :disable="false"
          :require="false"
          placeholder="description"
          @dataUpdated="setDescription"
        />
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
            value=""
            :disable="false"
            :require="true"
            @dataUpdated="setStartDate"
          />
          <span class="at">at</span>
          <InputTime
            value=""
            :disable="false"
            :require="true"
            @dataUpdated="setStartTime"
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
            value=""
            :disable="false"
            :require="true"
            @dataUpdated="setEndDate"
          />
          <span class="at">at</span>
          <InputTime
            value=""
            :disable="false"
            :require="true"
            @dataUpdated="setEndTime"
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
</template>

<script>
import { Contest } from "../../model/contest/contest/contest";
import { createContest } from "../../model/contest/contest/domainLogic/createContest";
import InputText from "../general/InputText";
import Button from "../general/Button";
import InputDate from "../general/InputDate";
import InputTime from "../general/InputTime";
import errorHandler from "../../helpers/errorHandler";
import LoadingIcon from "../general/LoadingIcon";

export default {
  name: "CreateContest",

  components: {
    InputText,
    Button,
    InputDate,
    InputTime,
    LoadingIcon,
  },

  data() {
    return {
      contest: undefined,
      startDate: "",
      startTime: "",
      endDate: "",
      endTime: "",
      isLoading: false,
      isNameWarning: false,
      isStartAtWarning: false,
      isEndAtWarning: false,
    };
  },

  created() {
    this.contest = Contest.create();
  },

  methods: {
    setName(name) {
      this.contest.setName(name);
    },

    setDescription(description) {
      this.contest.setDescription(description);
    },

    setStartDate(inputValue) {
      this.startDate = inputValue;
    },

    setStartTime(inputValue) {
      this.startTime = inputValue;
    },

    setEndDate(inputValue) {
      this.endDate = inputValue;
    },

    setEndTime(inputValue) {
      this.endTime = inputValue;
    },

    setStartAt() {
      const startAt = new Date(this.startDate + " " + this.startTime);
      if (startAt < new Date().getTime()) {
        alert("Start at must be later than now");
      }
      this.contest.setStartAt(startAt);
    },

    setEndAt() {
      const endAt = new Date(this.endDate + " " + this.endTime);
      if (endAt < new Date().getTime()) {
        alert("End at must be later than now");
      }
      this.contest.setEndAt(endAt);
    },

    redirect() {
      this.$router.push("/contest");
    },

    async handleCreate() {
      this.setStartAt();
      this.setEndAt();
      // console.log(this.contest);
      // check empty before POST
      //
      //
      try {
        this.isLoading = true;
        await createContest(this.contest);
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
