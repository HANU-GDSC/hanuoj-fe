<template>
  <div class="content-alertbox" v-show="isShowtoUser">
    <div class="alert" :class = "type">
      {{ text }}
    </div>
    <button class="close" @click="close">X</button>
  </div>
</template>

<script>
export default {
  name: "AlertBox",

  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "Primary",
    },
    isShow: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isShowtoUser: this.isShow,
    };
  },
  methods: {
    close() {
      this.isShowtoUser = false;
    },
  },
};
</script>

<style>
.content-alertbox {
  width: 50%;
  height: 100px;
  position: fixed;
  left: 25%;
  top: 40%;
  border: 1px solid black;
  z-index: 1;
}
.alert {
  position: absolute;
  top: 45%;
  width: 100%;
  text-align: center;
}
.close {
  position: absolute;
  top: 0px;
  right: 0px;
}
</style>
