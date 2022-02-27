<template>
  <div class="content-warning" v-show="isShow && isShowWarning">
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
      isShowWarning: this.isShow,
    };
  },
  watch: {
    isShow() {
      if (this.isShow) {
        this.isShowWarning = true
        setTimeout(() => (this.isShowWarning = false), 3000);
      }
    },
  },
  created(){
    setTimeout(() => (this.isShowWarning = false), 3000);
  }
};
</script>

<style></style>
