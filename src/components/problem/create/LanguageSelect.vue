<template>
  <div>
    <table class="content">
      <tr>
        <td><div class="label">Language</div></td>
        <td>
          <table class="language__list">
            <tr class="language__list">
              <td class="language__list">Language</td>
              <td class="language__list">Memory (kb)</td>
              <td class="language__list">Time Limit (s)</td>
            </tr>
            <Language
              v-for="(components, index) in language"
              :key="index"
              :languageList="this.languageList"
              @dataUpdated="getLanguageList($event, index)"
            />
          </table>
        </td>
      </tr>
    </table>
    <div class="addDeleteButtonHolder">
      <Button
        text="+"
        type="primary"
        des="Add Language"
        @clicked="addLanguage"
      />
      <Button
        text="-"
        type="primary"
        des="Delete Language"
        @clicked="deleteLanguage"
      />
    </div>
  </div>
</template>

<script>
import Language from "./Language.vue";
import Button from "../../general/Button.vue";
export default {
  components: {
    Language,
    Button,
  },
  data() {
    return {
      languageList: [
        { name: "Java", value: "JAVA", selected: false },
        { name: "Python", value: "PYTHON", selected: false },
        { name: "JavaScript", value: "JAVASCRIPT", selected: false },
        { name: "C++", value: "CPLUSPLUS", selected: false },
      ],
      languageSelection: {
        memoryLimit: [],
        timeLimit: [],
        allowedProgrammingLanguages: [],
      },
      language: [Language],
    };
  },
  methods: {
    addLanguage() {
      this.language.push(Language);
    },
    deleteLanguage() {
      this.language.pop();
    },
    getLanguageList(object, index) {
      this.languageSelection.memoryLimit[index] = {
        programmingLanguage: object.language,
        memoryLimit: object.memory,
      };
      this.languageSelection.timeLimit[index] = {
        programmingLanguage: object.language,
        timeLimit: object.timeLimit,
      };
      this.languageSelection.allowedProgrammingLanguages[index] = object.language;
      this.$emit('dataUpdated', this.languageSelection)
    },
  },
};
</script>

<style scoped>
.language__list {
  border: 0.2px solid;
}

td.language__list {
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
}

table.language__list {
  width: 100%;
}
table.content {
  width: 100%;
  padding-right: 30px;
}

.label {
  padding: 30px 0px 30px 30px;
}

.addDeleteButtonHolder {
  text-align: center;
}
</style>
