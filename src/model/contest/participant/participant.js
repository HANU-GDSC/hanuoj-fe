const assert = require('assert')
const { ProblemScore } = require('./problemScore')

class Participant {
  _coderId;
  _rank;
  _problemScores;
  _contestId;

  constructor({
    coderId,
    rank,
    problemScores,
    contestId
  }) {
    assert(coderId === undefined || typeof coderId === 'string')
    this._coderId = coderId

    assert(rank === undefined || !isNaN(rank))
    this._rank = rank

    assert(Array.isArray(problemScores))
    this.problemScores = []
    for (const ps of problemScores) {
      assert(ps !== undefined && typeof ps === 'object')
      this._problemScores.push(new ProblemScore(ps))
    }

    assert(contestId !== undefined && typeof contestId === 'string')
    this._contestId = contestId
  }

  static create({
    contestId
  }) {
    assert(typeof contestId === 'string')
    return new Participant({
      coderId: undefined,
      rank: undefined,
      problemScores: undefined,
      contestId
    })
  }
}

module.exports = {
  Participant
}

