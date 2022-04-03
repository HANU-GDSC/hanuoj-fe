<template>
  <div>
    <input @dataUpdate="setName"/>
    <input @dataUpdate="setStartAt"/>
  </div>
  <button @click="create"></button>
</template>

<script>
import { Contest } from '../../model/contest/contest'
import { Problem } from '../../model/contest/problem'
import Button from '../general/Button.vue'

export default {
  components: { Button },
  data() {
    return {
      contest: undefined  
    }
  },
  created() {
    this.contest = Contest.init()
  },
  methods: {
    setName(name) {
      this.contest.setName(name)
    },
    setStartAt(date) {
      this.contest.setStartAt(date)
    },
    setEndAt(date) {
      this.contest.setEndAt(date)
    },
    addProblem(ordinal, coreProblemId,score) {
      const problem = new Problem({
        ordinal,
        coreProblemId,
        score
      })
      this.contest.addProblem(problem)
      this.contest.sortProblemsByOrdinal()
      // re-render the contest problems view
    },
    async create() {
      await this.contest.create()
    }
  }
}
</script>
