<template>
  <div>
    <h1>Create Problem Form</h1>
    <form>
      <div>
        <label for="name">Problem Name: </label>
        <InputText
          name="name"
          @dataUpdated="handle"
          value=""
          :disable="false"
          :require="true"
          placeholder="Enter Problem's Name"
        />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea></textarea>
      </div>
      <div>
        <label for="difficulty">Difficulty</label>
        <InputRadio
          name="difficulty"
          @dataUpdated="handle"
          :values="listDifficulty"
          checked="Easy"
          :disable="false"
          :require="true"
        />
      </div>
      <LanguageSelection :languageList="languageList"/>
      <!-- category
      language + Time Mem limit -->
      <component
        v-for="(component, index) in testCase"
        :key="index"
        :is="component"
      />
      <Button
        text="Add Test Case"
        type="primary"
        des="Add Test Case"
        :disable="false"
        @click="addTestCase"
      />
      <Button
        text="Delete this Test Case"
        type="primary"
        des="Delete Test Case"
        :disable="this.deleteTestCaseButton"
        @click="deleteTestCase"
      />
      <Button
        text="Submit"
        type="submit"
        des="Submit"
        :disable="false"
        @click="submit"
      />
    </form>
  </div>
</template>

<script>
import InputText from "../../general/InputText.vue";
import InputRadio from "../../general/InputRadio.vue";
import CreateTestCase from "./TestCase.vue";
import Button from "../../general/Button.vue";
import LanguageSelection from "./LanguageSelection.vue"
export default {
  name: "CreateProblem",
  components: {
    InputText,
    InputRadio,
    CreateTestCase,
    Button,
    LanguageSelection,
  },
  data() {
    return {
      listDifficulty: [
        { name: "Easy", value: "Easy" },
        { name: "Medium", value: "Medium" },
        { name: "Hard", value: "Hard" },
      ],
      languageList: [
        { name: "Java", value: "JAVA", selected: false },
        { name: "Python", value: "Python", selected: false },
        { name: "JavaScript", value: "JAVASCRIPT", selected: false },
        { name: "C++", value: "CPLUSPLUS", selected: false },
      ],
      deleteTestCaseButton: true,
      testCase: [CreateTestCase],
    };
  },

  methods: {
    handle() {},
    addTestCase(event) {
      event.preventDefault();
      this.testCase.push(CreateTestCase);
      if (this.testCase.length >= 1) {
        this.deleteTestCaseButton = false;
      }
    },
    deleteTestCase(event) {
      event.preventDefault();
      this.testCase.pop();
      if (this.testCase.length <= 1) {
        this.deleteTestCaseButton = true;
      }
    },
    submit() {},
  },
};
</script>

<style lang="scss" scoped>
label {
  display: inline;
  text-align: right;
  width: 150px;
}
</style>
