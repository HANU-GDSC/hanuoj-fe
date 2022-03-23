<template>
  <h2>Test Case</h2>

  <div>
    <label for="ordinal"> Ordinal </label>
    <InputNum
      @dataUpdated="handle"
      :value="1"
      :disable="false"
      :require="true"
      placeholder="Enter Ordinal"
    />
  </div>
  <div>
    <InputCheck
      @dataUpdated="handle"
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
      @dataUpdated="handle"
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
      @dataUpdated="handle"
      value=""
      :disable="false"
      :require="true"
      placeholder="Enter Problem's Output"
    />
  </div>
  <div>
    <label for="description">Description</label>
    <textarea></textarea>
  </div>
</template>

<script>
import InputText from "../../general/InputText.vue";
import InputNum from "../../general/InputNum.vue";
import InputCheck from "../../general/InputCheck.vue";
export default {
  name: "CreateTestCase",
  components: {
    InputText,
    InputNum,
    InputCheck,
  },
  data() {
    return {
      list: [{ name: "Sample Test", value: "Sample Test" }],
    };
  },

  methods: {
    handle() {},
  },
};
</script>

<style></style>
