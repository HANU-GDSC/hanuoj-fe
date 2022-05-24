<template>
  <div>
    <table class="content">
      <tr>
        <td><div class="label">TestCase</div></td>
        <td>
          <table class="testcase__list">
            <tr class="testcase__list">
              <td class="testcase__list">Ordinal</td>
              <td class="testcase__list">Sample</td>
              <td class="testcase__list">Input</td>
              <td class="testcase__list">Output</td>
              <td class="testcase__list">Description</td>
            </tr>
            <TestCase
              v-for="(components, index) in testcase"
              :key="index"
              :ordinal ="index"
              @dataUpdated="getTestCaseList($event, index)"
            />
          </table>
        </td>
      </tr>
    </table>
    <div class="addDeleteButtonHolder">
      <Button
        text="+"
        type="primary"
        des="Add Language"
        @clicked="addTestCase()"
      />
      <Button
        text="-"
        type="primary"
        des="Delete TestCase"
        @clicked="deleteTestCase()"
      />
    </div>
  </div>
</template>

<script>
import Button from "../../../components/general/Button.vue"
import TestCase from "./TestCase.vue"
export default {
    components: {
        Button,
        TestCase
    },
    methods: {
        addTestCase(){
          this.testcase.push(TestCase)
        }, 
        deleteTestCase(){
          this.testcase.pop()
        },
        getTestCaseList(object, index){
          this.testCaseSubmit[index] = object
          this.$emit('dataUpdated', this.testCaseSubmit)
        },
        
    },
    data(){
        return {
            testcase: [TestCase],
            testCaseSubmit: [],
        }
    }
};
</script>

<style scoped>
.testcase__list {
  border: 0.2px solid;
}

td.testcase__list {
  text-align: center;
  padding-left: 30px;
  padding-right: 30px;
}

table.testcase__list {
  width: 100%;
}
table.content {
  width: 100%;
  padding-right: 30px;
}

.label {
  padding: 30px 0px 30px 30px;
}

.addDeleteButtonHolder {
  text-align: center;
}
</style>
