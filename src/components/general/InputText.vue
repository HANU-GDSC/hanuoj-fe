<template>
  <div class="content-inputtext">
    <input
      type="text"
      :disabled="disable"
      :required="require"
      :placeholder="placeholder"
      :value="value"
      @input="dataUpdated"
    />
  </div>
</template>

<script>
export default {
  name: "InputText",
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
  methods: {
    dataUpdated() {
      this.$emit("dataUpdated", this.value);
      this.result = event.target.value;
    },
  },
  data() {
    return {
      result: this.value,
    };
  },
};
</script>

<style></style>
