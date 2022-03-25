<template @input="dataUpdate">
  <h2>Language Selection</h2>
  <div>Language</div>
  <input list="programmingLanguage" />
  <select id="programmingLanguage" v-model="language">
    <option v-for="option in this.languageList" v-show="!option.selected">
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
  <div>Memory Limit</div>
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
  props:{
    languageList:{
      type: Array,
      required: true
    }
  },
  name: "LanguageSelection",
  data() {
    return {
      language: "",
      memoryLimit: 0,
      timeLimit: 0,
    };
  },
  methods: {
    dataUpdated(event) {
      var languageSelection = {
        memoryLimit: this.memoryLimit,
        timeLimit: this.timeLimit,
        language: this.language,
      };
      this.$emit("dataUpdatedLanguage", languageSelection);
    },
    getMemoryLimit(num){
      this.memoryLimit = num
    },
    getTimeLimit(num){
      this.timeLimit = num
    }
  },
};
</script>

<style></style>
