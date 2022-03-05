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
    dataUpdated(event) {
      this.$emit("dataUpdated", event.target.value);
    },
  },
};
</script>

<style scoped></style>
