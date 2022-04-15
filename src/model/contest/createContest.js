import { Contest } from "./contest";

function createContest(contest) {}


class CreateContest {
  constructor(contest) {
    assert(contest != null)
    assert(contest instanceof Contest)
    this.contest = contest
  }

  execute() {
    if (!this.contest.name) {
      throw new Error('Name is required')
    }
    if (!this.contest.description) {
      throw new Error('Description is required')
    }
    if (!this.contest.startAt) {
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
} 