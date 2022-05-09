const { assert } = require("@vue/compiler-core")

class ProblemScore {
  _problemId;
  _score;
  _tryCount;
  constructor({
    problemId,
    score,
    tryCount
  }) {
    assert(typeof problemId === 'string')
    this._problemId = problemId

    assert(!isNaN(score))
    this._score = score

    assert(!isNaN(tryCount))
    this._tryCount = tryCount
  }

  getProblemId() {
    return this._problemId
  }

  getScore() {
    return this._score
  }

  getTryCount() {
    return this._tryCount
  }
}

module.exports = {
  ProblemScore
}