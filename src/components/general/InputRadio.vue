<template>
  <form action="">
    <div class="input-form" v-for="(value, index) in values">
      <input
        type="radio"
        :id="index"
        v-model="inputData"
        :value="value.value"
        :disabled="disable"
        :required="require"
        :checked="checked == value.value"
        @change="updateData()"
      />
      <label :for="index">{{ value.value }}</label>
    </div>
  </form>
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
    this.inputData = this.checked; // ban đầu data của input bằng data của input được checked (mặc định)
    return this.inputData;
  },

  methods: {
    updateData() {
      this.$emit("dataUpdated");
      return this.inputData;
    },
  },
};
</script>

<style></style>
