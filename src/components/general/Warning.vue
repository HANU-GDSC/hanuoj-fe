<template>
  <div class="content-warning" v-show="isShow">
    <div class="warning" :class="type">{{ text }}</div>
  </div>
</template>

<script>
export default {
  name: "WarningBox",
  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "primary",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },
  created: function () {
    setTimeout(() => this.$emit("isShowSet", isShow), 3000);
  },
};
</script>

<style>
.hidden {
  display: none;
}
</style>
