<template>
  <div class="content-inputtext">
    <input
      type="text"
      :disabled="disable"
      :required="require"
      :placeholder="placeHolder"
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
      default: true,
    },
    require: {
      type: Boolean,
      default: true,
    },
    placeHolder: {
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
