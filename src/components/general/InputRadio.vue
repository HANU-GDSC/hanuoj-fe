<template>
  <div class="input-form">
    <div v-for="(value, index) in values" :key="index">
      <input
        type="radio"
        :id="index"
        v-model="inputData"
        :value="value.value"
        :disabled="disable"
        :required="require"
        :checked="checked == value.value"
        @change="updateData(inputData)"
      />
      <label :for="index">{{ value.value }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputRadio",
  props: {
    // đặt là values vì là 1 mảng
    values: {
      type: Array,
      required: true,
    },
    checked: {
      type: String,
      default: "",
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

  data() {
    return {
      inputData: "",
    };
  },
  created() {
    // ban đầu data của input bằng data của input được checked (mặc định)
    return (this.inputData = this.checked);
  },
  methods: {
    updateData(inputData) {
      this.$emit("dataUpdated", inputData);
    },
  },
};
</script>

<style></style>
