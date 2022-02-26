<template>
  <div class="content-inputnum">
    <input
      type="number"
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
  methods: {
    dataUpdated() {
      this.result = event.target.value;
      console.log(this.result);
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
