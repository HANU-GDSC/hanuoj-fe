<template>
  <div class="content-inputnum">
    <input
      type="number"
      :disabled="disable"
      :required="require"
      :placeholder="placeholder"
      :value="value"
    />
  </div>
</template>

<script>
export default {
  name: "InputNum",
  props: {
    value: {
      type: Number,
      default: 0,
    },
    disable: {
      type: Boolean,
      default: true,
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
};
</script>

<style></style>
