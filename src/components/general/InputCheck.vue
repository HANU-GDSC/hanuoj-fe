<template>
  <div class="input-form">
    <div v-for="(value, index) in values" :key="index">
      <input
        type="checkbox"
        :id="index"
        v-model="inputData"
        :value="value.value"
        :disabled="disable"
        :required="require"
        :checked="checked | value.value"
        @change="updateData(inputData)"
      />
      <label :for="index">{{ value.value }}</label>
    </div>
  </div>
</template>

<script>
export default {
  name: "InputCheck",
  props: {
    values: {
      type: Array,
      required: true,
    },
    checked: {
      type: Array,
      default: [],
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
      inputData: [],
    };
  },

  created() {
    return (this.inputData = this.checked);
  },

  methods: {
    updateData(inputData) {
      this.$emit("dataUpdated", inputData);
    },
  },
};

/////////////////////////////////////////////////////////
//                                                     //
//                       _oo0oo_                       //
//                      o8888888o                      //
//                      88" . "88                      //
//                      (| -_- |)                      //
//                      0\  =  /0                      //
//                    ___/`---'\___                    //
//                  .' \\|     |// '.                  //
//                 / \\|||  :  |||// \                 //
//                / _||||| -:- |||||- \                //
//               |   | \\\  -  /// |   |               //
//               | \_|  ''\---/''  |_/ |               //
//               \  .-\__  '-'  ___/-. /               //
//             ___'. .'  /--.--\  `. .'___             //
//          ."" '<  `.___\_<|>_/___.' >' "".           //
//         | | :  `- \`.;`\ _ /`;.`/ - ` : | |         //
//         \  \ `_.   \_ __\ /__ _/   .-` /  /         //
//     =====`-.____`.___ \_____/___.-`___.-'=====      //
//                       `=---='                       //
//                                                     //
//                                                     //
//     ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~     //
//                                                     //
//  KHÔNG BUG!       KHÔNG CRASH!       HOẠT ĐỘNG TỐT! //
//                                                     //
//                    A DI ĐÀ PHẬT!                    //
//                                                     //
/////////////////////////////////////////////////////////

</script>

<style></style>
