<template>
  <h1>Create Problem Form</h1>
  <Pages :amount="2" :current="current">
    <template v-slot:1>
      <div class="create__general">
        <table>
          <tr>
            <td><label for="name"> Name </label></td>
            <td class="input__input">
              <InputText
                name="name"
                @dataUpdated="handleNameInput($event)"
                value=""
                :disable="false"
                :require="true"
                placeholder="Enter Problem's Name"
              ></InputText>
            </td>
          </tr>

          <tr>
            <td><label for="difficulty"> Difficulty </label></td>
            <td>
              <Select
                @dataUpdated="handleDifficultyInput($event)"
                :list="this.listDifficulty"
                :selected="this.difficulty"
                text="Choose Dificulty"
              >
              </Select>
            </td>
          </tr>
          <tr>
            <td><label for="description">Description</label></td>
            <td>
              <textarea
                name="description"
                class="textarea__description"
                v-model="this.description"
                @change="handleDescription($event)"
              ></textarea>
            </td>
          </tr>
        </table>

        <div class="review">
          <div>Review</div>
          <MarkdownRender class="markdownw" :description="this.description" />
        </div>
      </div>
      <div class="language__list">
        <LanguageSelect @dataUpdated="handleLanguageInput($event)" />
      </div>
      <div class="center">
        <Button text="Next" type="primary" des="Next" @clicked="nextPage()" />
      </div>
    </template>
    <template v-slot:2>
      <TestCaseTable @dataUpdated="handleTestCases($event)" />
      <div class="center">
        <Button text="Back" des="Back" @clicked="backPage()" />
        <Button text="Submit" des="Submit" @clicked="submit()" /></div
    ></template>
  </Pages>
</template>

<script>
import Pages from "../../../components/general/Pages.vue";
import TestCaseTable from "./TestCaseTable.vue";
import InputText from "../../../components/general/InputText.vue";
import Select from "../../../components/general/Select.vue";
import LanguageSelect from "./LanguageSelect.vue";
import MarkdownRender from "../../../components/general/MarkdownRender.vue";
import Button from "../../general/Button.vue";
// import { createProblem } from "../../../model/coreProblem/domainLogic/problem"
// import Problem from "../../../model/coreProblem/problem";
// import PracticeProblem from "../../../model/practiceProblem/problem";

// import { createProblem } from "../../../model/practiceProblem/domainLogic/coreProblem/problem";
// import {getPracticeProblem} from "../../../model/practiceProblem/domainLogic/problem"
// import {createTestCases} from "../../../model/practiceProblem/domainLogic/coreProblem/testCase"
import errorHandler from "../../../helpers/errorHandler"
export default {
  components: {
    Pages,
    InputText,
    Select,
    LanguageSelect,
    MarkdownRender,
    Button,
    TestCaseTable,
  },
  created() {
    this.problem = Problem.create();
    this.practiceProblem = PracticeProblem.init();
    this.practiceProblem.setDifficulty("EASY");
  },
  data() {
    return {
      problem: undefined,
      practiceProblem: undefined,
      description: "",
      current: 1,
      difficulty: "Easy",
      listDifficulty: [
        { name: "Easy", value: "EASY" },
        { name: "Medium", value: "MEDIUM" },
        { name: "Hard", value: "HARD" },
      ],
      description: "",

      testCases: [],
    };
  },
  methods: {
    handleNameInput(input) {
      this.problem.setName(input);
    },

    handleDifficultyInput(input) {
      this.practiceProblem.setDifficulty(input.value);
      this.difficulty = input.name;
    },

    handleDescription() {
      this.problem.setDescription(this.description);
    },

    handleLanguageInput(input) {
      this.problem.setMemoryLimits(input.memoryLimit);
      this.problem.setTimeLimits(input.timeLimit);
      this.problem.setAllowedProgrammingLanguages(
        input.allowedProgrammingLanguages
      );
    },

    handleTestCases(input) {
      this.testCases = input;
    },

    nextPage() {
      this.current += 1;
    },
    backPage() {
      this.current -= 1;
    },

    async submit() {
      try {
        this.practiceProblem.setCategoryIds([]);
        var id = await createProblem(this.problem, this.practiceProblem);
        var coreProblem = await getPracticeProblem(id);
        this.testCases = this.testCases.map((testCase) => {
          testCase.setProblemId(coreProblem.getCoreProblemProblemId());
          return testCase;
        })
        console.log(this.testCases);
        var test = await createTestCases(this.testCases)
        console.log(test);
      } catch (error) {
        errorHandler(error);
      }
      
    },
  },
};
</script>

<style lang="scss" scoped>
.create__general {
  width: calc(100% - 2rem);
  border: 1px solid red;
  table {
    border: 1px solid blue;
    display: inline-block;
    vertical-align: top;
    width: calc(50% - 10px);
  }
  .review {
    border: 1px solid green;
    float: right;
    vertical-align: top;
    width: calc(50% - 10px);
    overflow-y: auto;
  }
}

label {
  width: 300px;
  max-width: 3000px;
  padding: 30px;
}

input {
  width: 100%;
  border: 2px solid var(--line-color);
  border-radius: 4px;
}

.textarea__description {
  width: 100%;
  height: 100px;
  max-height: 100px;
  max-width: 500px;
}

.textarea__review {
  width: 100%;
  height: 156px;
  max-height: 156px;
}

td {
  vertical-align: top;
}

textarea {
  resize: none;
}
h1 {
  text-align: center;
  padding: 20px;
}

.language__list {
  width: 100%;
}

.input__input {
  width: 70%;
  max-width: 70%;
}

.markdownw {
  // border: 1px solid var(--line-color)
}

.center {
  text-align: center;
}
</style>
