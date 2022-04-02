<template>
  <span>
    <h2>Test Case</h2>
  </span>
  <div>
    <label for="ordinal"> Ordinal </label>
    <InputNum
      @dataUpdated="handleOrdinal($event)"
      :value=1
      :disable="false"
      :require="true"
      placeholder="Enter Ordinal"
    />
  </div>
  <div>
    <InputCheck
      @dataUpdated="handleSampleTest($event)"
      :values="list"
      :checked="[]"
      :disable="false"
      :require="false"
    />
  </div>
  <div>
    <label for="input">Test Case Input</label>
    <InputText
      name="input"
      @dataUpdated="handleTestCaseInput($event)"
      value=""
      :disable="false"
      :require="true"
      placeholder="Enter Problem's Input"
    />
  </div>
  <div>
    <label for="output">Test Case Output</label>
    <InputText
      name="output"
      @dataUpdated="handleTestCaseOutput($event)"
      value=""
      :disable="false"
      :require="true"
      placeholder="Enter Problem's Output"
    />
  </div>
  <div>
    <label for="description">Description</label>
    <textarea
      v-model="this.testCaseSubmit.description"
      @input="handleDescription($event)"
    ></textarea>
  </div>
</template>

<script>
import InputText from "../../general/InputText.vue";
import InputNum from "../../general/InputNum.vue";
import InputCheck from "../../general/InputCheck.vue";
import Button from "../../general/Button.vue";
export default {
  name: "CreateTestCase",

  components: {
    InputText,
    InputNum,
    InputCheck,
    Button,
  },
  data() {
    return {
      list: [{ name: "Sample Test", value: "Sample Test" }],
      testCaseSubmit: {
        ordinal: 1,
        testCaseInput: "",
        testCaseOutput: "",
        sampleTest: false,
        description: "",
      },
    };
  },

  methods: {
    handleOrdinal(ordinal) {
      this.testCaseSubmit.ordinal = ordinal;
      this.$emit("dataUpdated", this.testCaseSubmit);
    },
    handleSampleTest(sampleTest) {
      this.testCaseSubmit.sampleTest = sampleTest[0] !== undefined;
      this.$emit("dataUpdated", this.testCaseSubmit);
    },
    handleTestCaseInput(input) {
      this.testCaseSubmit.testCaseInput = input;
      this.$emit("dataUpdated", this.testCaseSubmit);
    },
    handleTestCaseOutput(output) {
      this.testCaseSubmit.testCaseOutput = output;
      this.$emit("dataUpdated", this.testCaseSubmit);
    },
    handleDescription(event) {
      this.$emit("dataUpdated", this.testCaseSubmit);
    },
  },
};
</script>

<style></style>
