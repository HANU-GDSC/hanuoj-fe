const assert = require('assert')
const { Contest } = require('../contest')
const { Request, callCreateContestAPI } = require('../api/createContest')

async function createContest(contest) {
  assert(contest instanceof Contest)
  if (contest.getName() === undefined) {
    throw new Error('Name is required')
  }
  if (contest.getDescription() === undefined) {
    throw new Error('Description is required')
  }
  if (contest.getStartAt() === undefined) {
    throw new Error('Start at is required')
  }
  if (contest.getEndAt() === undefined) {
    throw new Error('End at is required')
  }
  const response = await callCreateContestAPI(new Request({
    name: contest.getName(),
    description: contest.getDescription(),
    startAt: contest.getStartAt(),
    endAt: contest.getEndAt()
  }))
  const id = response.data
  return id
}

export {
  createContest
}