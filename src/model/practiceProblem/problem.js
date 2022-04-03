const apiService = require('../../helpers/apiService')

class Problem {
  constructor({
    id,
    coreProblemId,
    categoryIds,
    difficulty
  }) {
    this.id = id
    this.coreProblemId = coreProblemId
    this.categoryIds = categoryIds
    this.difficulty = difficulty
  }

  static init() {
    return new Problem({
      id: undefined,
      coreProblemId: undefined,
      categoryIds: [],
      difficulty: undefined
    })
  }

  async create (coreProblem) {
    const id = await apiService('POST', '/practiceProblem/problem', {}, {
      practiceProblem: this,
      coreProblem: coreProblem
    })
    const problem = await getById(id)
    this.id = id
    this.coreProblemId = problem.coreProblemId
  }

  static getById (id) {
    const problem = await apiService('GET', `/practiceProblem/problem/${id}`, {}, {}) 
    return new Problem(problem)
  }
}

module.exports = {
  Problem
}