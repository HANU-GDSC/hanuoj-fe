const assert = require('assert')
const { Problem } = require('../problem')
const { Request, callCreateContestAPI } = require('../api/createContest')

async function createContest(problem) {
  assert(problem instanceof Problem)
  if (problem.getName() === undefined) {
    throw new Error('Name is required')
  }
  if (problem.getDescription() === undefined) {
    throw new Error('Description is required')
  }
  if (problem.getStartAt() === undefined) {
    throw new Error('Start at is required')
  }
  if (problem.getEndAt() === undefined) {
    throw new Error('End at is required')
  }
  const response = await callCreateContestAPI(new Request({
    name: problem.getName(),
    description: problem.getDescription(),
    startAt: problem.getStartAt(),
    endAt: problem.getEndAt()
  }))
  const id = response.data
  return id
}

module.exports = {
  createContest
}