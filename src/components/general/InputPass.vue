<template>
  <input type="password" :value="value" :placeholder="placeholder" :required="require" :disabled="disable" @input="dataUpdated"/>
</template>

<script>
export default {
  name: "InputPass",
  props: {
    value: {
      type: String,
      default: "",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    require: {
      type: Boolean,
      default: true,
    },
    placeholder: {
      type: String,
      default: "",
    },
  },
  data() {
    return {
      password: this.password,
    };
  },
  methods: {
    dataUpdated(event) {
      this.password = event.target.value;
      this.$emit("dataUpdated", this.password);
    },
  },
};
</script>

<style>
</style>