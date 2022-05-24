<template>
  <tr>
    <td>
      <Select
        @dataUpdated="handleLanguageInput($event)"
        :list="this.languageList"
        :selected="this.displayName"
        text="Choose Language"
      />
    </td>
    <td>
      <InputNum
        :disable="false"
        :require="true"
        placeholder="Enter Memory"
        @dataUpdated="handleMemoryInput($event)"
      />
    </td>
    <td>
      <InputNum
        :disable="false"
        :require="true"
        placeholder="Enter Time Limit"
        @dataUpdated="handleTimeLimitInput($event)"
      />
    </td>
  </tr>
</template>

<script>
import Select from "../../general/Select.vue";
import InputNum from "../../general/InputNum.vue";
export default {
  components: {
    Select,
    InputNum,
  },
  props: {
    languageList: {
      type: Array,
      require: true,
    },
  },

  methods: {
    handleLanguageInput(input) {
      this.languageSelection.language = input.value;
      this.displayName = input.name;
      this.$emit("dataUpdated", this.languageSelection);
    },
    handleMemoryInput(input) {
      this.languageSelection.memory = input;
      this.$emit("dataUpdated", this.languageSelection);
    },
    handleTimeLimitInput(input) {
      this.languageSelection.timeLimit = input;
      this.$emit("dataUpdated", this.languageSelection);
    },
  },

  data() {
    return {
      displayName: this.languageList[0].name,
      languageSelection: {
        language: this.languageList[0].value,
        memory: 0,
        timeLimit: 0,
      },
    };
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
