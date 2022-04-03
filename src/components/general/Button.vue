<template>
  <div class="btn">
    <button
      :type="type"
      :title="des"
      :class="{ btnDisable: disable }"
      :disabled="disable"
      @click="click()"
    >
      {{ text }}
    </button>
  </div>
</template>

<script>
export default {
  name: "Button",

  props: {
    text: {
      type: String,
      required: true,
    },
    type: {
      type: String,
      default: "Primary",
    },
    disable: {
      type: Boolean,
      default: false,
    },
    des: {
      type: String,
    },
  },

  methods: {
    click() {
      if (!this.disable) {
        this.$emit("click");
      }
    },
  },
};
</script>

<style scoped>
/* default primary */
button {
  width: 5rem;
  height: 2.5rem;
  background-color: #4387f4;
  border-radius: 10px;
  border: none;
  font-size: 0.938rem;
  color: #fff;
  font-weight: 500;
}

/* secondary */
button[type="secondary"] {
  width: 5rem;
  height: 2.5rem;
  background-color: #fff;
  border-radius: 10px;
  border: 1px solid #0e65f1;
  font-size: 0.938rem;
  color: #0e65f1;
  font-weight: 500;
}

/* disable */
.btnDisable {
  pointer-events: none;
  background-color: #9fc1f9;
  color: #3077e8;
}

/* hiệu ứng khi hover */
button:hover {
  background-color: #0e65f1;
  color: #fff;
}
/* hiệu ứng khi press */
button:active {
  transition-duration: 0s;
  background-color: #0e65f1;
  border: 2px solid #9fc1f9;
  color: #fff;
}
</style>
