<template>
  <Loading v-if="firstLoading" />
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
      <!-- <LanguageSelection
        :languageList="this.languageList"
        @dataUpdated="getLanguageList($event)"
      />
      <div id="languageSelectionHolder"></div>
      <Button
        text="Add Language"
        type="primary"
        des="Add Language"
        :disable="this.addLanguageButton"
        @click="addLanguage"
      />
      <Button
        text="Delete language"
        type="primary"
        des="Delete Language"
        :disable="this.deleteLanguageButton"
        @click="deleteLanguage"
      /> -->
      <!-- category -->
      <CreateTestCase
        v-for="(components, index) in testCase"
        :key="index"
        @dataUpdated="handleTestCase($event, index)"
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
import Loading from "../../Loading";
import InputText from "../../general/InputText.vue";
import InputRadio from "../../general/InputRadio.vue";
import CreateTestCase from "./TestCase.vue";
import Button from "../../general/Button.vue";
import LanguageSelection from "./LanguageSelection.vue";
export default {
  name: "CreateProblem",
  components: {
    Loading,
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
      addLanguageButton: false,
      deleteLanguageButton: true,
      deleteTestCaseButton: true,
      testCase: [CreateTestCase],
      testCaseSubmit: [{}],
      firstLoading: true,
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
    //to fix
    deleteTestCase(event) {
      event.preventDefault();
      this.testCase.pop();
      if (this.testCase.length <= 1) {
        this.deleteTestCaseButton = true;
      }
    },
    getLanguageList() {},
    submit(event) {
      event.preventDefault();
      console.log(this.testCaseSubmit);
    },
    addLanguage(event) {
      event.preventDefault();
    },
    deleteLanguage() {},

    handleTestCase(object, index) {
      this.testCaseSubmit[index] = object
      console.log(this.testCaseSubmit);
    },
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
