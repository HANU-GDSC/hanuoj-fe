<template>
  <input
    type="date"
    v-model="today"
    :disabled="disable"
    :required="require"
    @change="updateData"
  />
</template>

<script>
export default {
  name: "InputDate",
  props: {
    value: {
      type: String,
      required: true,
    },
    disable: {
      type: Boolean,
      default: false,
    },
    require: {
      type: Boolean,
      default: false,
    },
  },


  methods: {
    updateData(event) {
      this.$emit("dataUpdated", event.target.value);
    },
  },
};
</script>

<style scoped></style>
