const assert = require('assert')

class Problem {
  _ordinal;
  _coreProblemId;
  _score;
  constructor({
    ordinal,
    coreProblemId,
    score
  }) {
    assert(!isNaN(ordinal))
    this._ordinal = ordinal

    assert(typeof coreProblemId === 'string')
    this._coreProblemId = coreProblemId

    assert(!isNaN(score))
    this._score = score
  }

  getOrdinal() {
    return this._ordinal;
  }
}

module.exports = {
  Problem
}