<template>
  <Loading v-if="firstLoading" />
  <div>
    <h1>Create Problem Form</h1>
    <form>
      <div>
        <label for="name">Problem Name: </label>
        <InputText
          name="name"
          @dataUpdated="handleNameInput($event)"
          value=""
          :disable="false"
          :require="true"
          placeholder="Enter Problem's Name"
        />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea
          v-model="this.problemSubmit.createCoreProblemInput.description"
        ></textarea>
      </div>
      <div>
        <h3>Description output:</h3>
        <MarkdownRender
          :description="this.problemSubmit.createCoreProblemInput.description"
        />
      </div>
      <div>
        <label for="difficulty">Difficulty</label>
        <InputRadio
          name="difficulty"
          @dataUpdated="handleDifficulty($event)"
          :values="listDifficulty"
          checked="Easy"
          :disable="false"
          :require="true"
        />
      </div>
      <LanguageSelection
        v-for="(components, index) in language"
        :key="index"
        :languageList="this.languageList"
        @dataUpdated="getLanguageList($event, index)"
        @languageListUpdate="updateLanguageList($event)"
      />
      <Button
        text="Add Language"
        type="primary"
        des="Add Language"
        :disabled="this.addLanguageButtonDisable"
        @click="addLanguage"
      />
      <Button
        text="Delete language"
        type="primary"
        des="Delete Language"
        :disabled="this.deleteLanguageButtonDisable"
        @click="deleteLanguage"
      />

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
        :disabled="false"
        @click="addTestCase"
      />
      <Button
        text="Delete this Test Case"
        type="primary"
        des="Delete Test Case"
        :disabled="this.deleteTestCaseButtonDisable"
        @click="deleteTestCase"
      />
      <Button
        text="Submit"
        type="submit"
        des="Submit"
        :disabled="false"
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
import MarkDownRender from "../../general/MarkdownRender.vue";
import apiService from "../../../helpers/apiService";
import errorHandler from "../../../helpers/errorHandler";
export default {
  name: "CreateProblem",
  components: {
    Loading,
    InputText,
    InputRadio,
    CreateTestCase,
    Button,
    LanguageSelection,
    MarkDownRender,
  },

  created() {
    //call APi get List Description
    this.firstLoading = false;
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
      addLanguageButtonDisable: false,
      deleteLanguageButtonDisable: true,
      deleteTestCaseButtonDisable: true,
      testCase: [CreateTestCase],
      testCaseSubmit: [{}],
      language: [LanguageSelection],
      languageSubmit: [{}],
      firstLoading: true,
      problemSubmit: {
        createCoreProblemInput: {
          name: "",
          description: "",
          createTestCaseInputs: [{}],
          createMemoryLimitInputs: [{}],
          createTimeLimitInputs: [{}],
          allowedProgrammingLanguages: [],
        },
        categoryIds: [1],
        difficulty: "",
      },
    };
  },
  methods: {
    handleNameInput(input) {
      this.problemSubmit.createCoreProblemInput.name = input;
    },
    updateLanguageList(event) {
      this.languageList = [
        { name: "Java", value: "JAVA", selected: false },
        { name: "Python", value: "Python", selected: false },
        { name: "JavaScript", value: "JAVASCRIPT", selected: false },
        { name: "C++", value: "CPLUSPLUS", selected: false },
      ];
      this.problemSubmit.createCoreProblemInput.allowedProgrammingLanguages.forEach(
        (selected) => {
          this.languageList.forEach((element) => {
            if (element.value === selected) {
              element.selected = true;
            }
          });
        }
      );
    },
    handleDifficulty(input) {
      this.problemSubmit.difficulty = input;
    },
    checkAddButton() {
      if (this.language.length >= 4) {
        this.addLanguageButtonDisable = true;
      }
      if (this.language.length < 4) {
        this.addLanguageButtonDisable = false;
      }
    },
    addTestCase(event) {
      event.preventDefault();
      this.testCase.push(CreateTestCase);
      if (this.testCase.length >= 1) {
        this.deleteTestCaseButtonDisable = false;
      }
    },
    deleteTestCase(event) {
      event.preventDefault();
      this.testCase.pop();
      this.problemSubmit.createCoreProblemInput.createTestCaseInputs.pop();
      if (this.testCase.length <= 1) {
        this.deleteTestCaseButtonDisable = true;
      }
    },
    getLanguageList(object, index) {
      this.problemSubmit.createCoreProblemInput.allowedProgrammingLanguages[
        index
      ] = object.language;

      this.problemSubmit.createCoreProblemInput.createTimeLimitInputs[index] = {
        programmingLanguage: object.language,
        timeLimit: object.timeLimit,
      };

      this.problemSubmit.createCoreProblemInput.createMemoryLimitInputs[index] =
        {
          programmingLanguage: object.language,
          timeLimit: object.memoryLimit,
        };
    },
    // Submit API
    async submit(event) {
      event.preventDefault();
      const res = await apiService(
        "POST",
        "/practiceProblem/problem",
        this.problemSubmit
      );
    },
    addLanguage(event) {
      event.preventDefault();
      this.language.push(LanguageSelection);
      if (this.language.length >= 1) {
        this.deleteTestCaseButtonDisable = false;
      }
      this.checkAddButton();
    },
    deleteLanguage(event) {
      event.preventDefault();
      this.language.pop();
      if (this.language.length <= 1) {
        this.deleteTestCaseButtonDisable = true;
      }
      this.checkAddButton();
    },
    handleTestCase(object, index) {
      this.problemSubmit.createCoreProblemInput.createTestCaseInputs[index] =
        object;
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
