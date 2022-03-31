<template>
  <input
    class="timePicker"
    type="number"
    min="00"
    max="23"
    ref="hourPicker"
    :disabled="disable"
    :required="require"
    :value="splitDate.hour"
    placeholder="hh"
    @change="updateDate()"
  />
  :
  <input
    class="timePicker"
    type="number"
    min="00"
    max="59"
    ref="minutePicker"
    :disabled="disable"
    :required="require"
    :value="splitDate.minute"
    placeholder="mm"
    @change="updateDate()"
  />
  (24h time)
</template>

<script>
export default {
  name: "InputTime",

  props: {
    value: {
      type: Array,
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

  computed: {
    // splice array value to select hour - minute - second
    splitDate() {
      const splitValueString = this.value.split(":");

      return {
        hour: splitValueString[0],
        minute: splitValueString[1],
      };
    },
  },
  
  created() {

  },
  
  methods: {
    updateDate() {
      const hourValue = this.$refs.hourPicker.value;
      const minuteValue = this.$refs.minutePicker.value;

      // alert error
      if (hourValue > 23 || minuteValue > 59) {
        alert("Invalid Time please try again");
      } else {
        this.$emit("dataUpdated", `${hourValue}:${minuteValue}`);
      }
    },
  },
};
</script>

<style scoped>
.timePicker {
  -webkit-appearance: none;
  -moz-appearance: none;
  width: 4em;
  height: 2.7em;
  appearance: none;
  outline: none;
  text-align: center;
  padding: 10px;
  margin: 0 5px;
}

</style>
