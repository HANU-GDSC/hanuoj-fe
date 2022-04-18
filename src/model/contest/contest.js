const apiService = require('../../helpers/apiService')
const { Problem } = require('./problem')

class Contest {
  constructor({
    id,
    name,
    description,
    startAt,
    endAt,
    author,
    problems
  }) {
    this.id = id
    this.name = name
    this.description = description
    this.startAt = startAt
    this.endAt = endAt
    this.author = author
    this.problems = problems
  }

  static init() {
    return new Contest({
      id: undefined,
      name: undefined,
      description: undefined,
      startAt: undefined,
      endAt: undefined,
      author: undefined,
      problems: []
    })
  }

  async create () {
    if (!this.name) {
      throw new Error('Name is required')
    }
    if (!this.description) {
      throw new Error('Description is required')
    }
    if (!this.startAt) {
      throw new Error('Start At is required')
    }
    // Add more checks here to alert user
    const id = await apiService('POST', '/contest/contest', {}, {
      name: this.name,
      description: this.description,
      startAt: this.startAt,
      endAt: this.endAt,
      problems: this.problems
    })
    this.id = id
  }

  setName(name) {
    if (name.length == 0) {
      throw new Error('Name to short')
    }
    this.name = name
  }

  addProblem(problem) {
    if (!(problem instanceof Problem)) {
      throw new Error('Argument "problem" must be of type "Problem"')
    }
    for (const addedProb of this.problems) {
      if (addedProb.coreProblemId === problem.coreProblemId) {
        throw new Error('Problem already added')
      }
    }
    this.problems.push(problem)
  }

  sortProblemsByOrdinal() {
    // TODO: implement this
    throw new Error('Unimplemented')
  }

  setStartAt(date) {
    if (!(date instanceof Date)) {
      throw new Error('Argument "date" must be of type "Date"')
    }
    if (date.getTime() <= new Date().getTime()) {
      throw new Error('Start at must be later than now')
    }
    this.startAt = date
  }

  setEndAt(date) {
    if (!(date instanceof Date)) {
      throw new Error('Argument "date" must be of type "Date"')
    }
    if (date.getTime() <= new Date().getTime()) {
      throw new Error('End at must be later than now')
    }
    if (this.startAt !== undefined && date.getTime() <= this.startAt) {
      throw new Error('End at must be later than start at')
    }
    this.endAt = date
  }
}

export default Contest