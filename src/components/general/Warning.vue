<template>
  <div class="content-warning" v-show="isShowToUser">
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
  data() {
    return {
      isShowToUser: this.isShow,
    };
  },
  created: function () {
    setTimeout(() => (this.isShowToUser = false), 3000);
  },
};
</script>

<style>
.primary {
  color: #004085;
  background-color: #cce5ff;
}
.warning {
  padding: 1px 3px;
  margin-bottom: 1rem;
  border: 1px solid transparent;
  border-radius: 10%;
  margin: 5px;
  border-color: #b8daff;
}
</style>
