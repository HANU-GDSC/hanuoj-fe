<template>
  <tr>
    <td>
      <InputNum
        :value="this.ordinal"
        :disable="false"
        :require="true"
        placeholder="Enter Ordinal"
        @dataUpdated="handleOrdinal($event)"
      />
    </td>
    <td>
      <InputCheck
        @dataUpdated="handleSampleTest($event)"
        :values="list"
        :checked="[]"
        :disable="false"
        :require="false"
      />
    </td>
    <td>
      <InputText
        name="name"
        @dataUpdated="handleInput($event)"
        value=""
        :disable="false"
        :require="true"
        placeholder="Enter input"
      />
    </td>
    <td>
      <InputText
        name="name"
        @dataUpdated="handleOutput($event)"
        value=""
        :disable="false"
        :require="true"
        placeholder="Enter Output"
      />
    </td>
    <td>
      <InputText
        name="name"
        @dataUpdated="handleDescription($event)"
        value=""
        :disable="false"
        :require="true"
        placeholder="Enter Description"
      />
    </td>
  </tr>
</template>

<script>
import InputNum from "../../../components/general/InputNum.vue";
import InputText from "../../../components/general/InputText.vue";
import InputCheck from "../../../components/general/InputCheck.vue";
// import TestCase from "../../../model/coreProblem/testCase";
export default {
  components: {
    InputNum,
    InputText,
    InputCheck,
  },
  props: {
    ordinal: {
      type: Number,
      require: true,
    },
  },
  data() {
    return {
      list: [{ name: "", value: "" }],
      testCase: undefined,
    };
  },
  methods: {
    handleOrdinal(input) {
      this.testCase.setOrdinal(Number(input));
      this.$emit("dataUpdated", this.testCase);
    },
    handleSampleTest(input) {
      if (Object.keys(input).length === 0) {
        this.testCase.setIsSample(false);
      } else {
        this.testCase.setIsSample(true);
      }
      this.$emit("dataUpdated", this.testCase);
    },
    handleDescription(input) {
      this.testCase.setDescription(input);
      this.$emit("dataUpdated", this.testCase);
    },
    handleInput(input) {
      this.testCase.setInput(input);
      this.$emit("dataUpdated", this.testCase);
    },
    handleOutput(input) {
      this.testCase.setExpectedOutput(input);
      this.$emit("dataUpdated", this.testCase);
    },
  },
  created() {
    this.testCase = TestCase.init();
  },
};
</script>

<style scoped>
td {
  text-align: center;
  vertical-align: middle;
  border: 1px solid black;
}
</style>
