<template>
  <h2>Language Selection</h2>
  <div>Language</div>
  <select id="programmingLanguage" v-model="this.languageSelection.language" @change="dataUpdated($event)">
    <option v-for="option in this.languageList" v-show="!option.selected" :value= "option.value">
      {{ option.name }}
    </option>
  </select>
  <div>Memory Limit</div>
  <InputNum
    @dataUpdated="getMemoryLimit($event)"
    :disable="false"
    :require="true"
    placeholder="Enter Memory Limit"
  />
  <div>Time Limit</div>
  <InputNum
    @dataUpdated="getTimeLimit($event)"
    :disable="false"
    :require="true"
    placeholder="Enter Time Limit"
  />
</template>

<script>
import InputNum from "../../general/InputNum.vue";
export default {
  components: {
    InputNum,
  },
  props: {
    languageList: {
      type: Array,
      required: true,
    },
  },
  name: "LanguageSelection",
  data() {
    return {
      languageSelection : {
      language: "",
      memoryLimit: 1000,
      timeLimit: 1000,
      }
    };
  },
  methods: {
    dataUpdated() {
      this.$emit("dataUpdated", this.languageSelection);
      this.$emit("languageListUpdate")
    },
    getMemoryLimit(num) {
      this.memoryLimit = num;
      this.$emit("dataUpdated", this.languageSelection);
    },
    getTimeLimit(num) {
      this.timeLimit = num;
      this.$emit("dataUpdated", this.languageSelection);
    },
  },
};
</script>

<style></style>
