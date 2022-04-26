const assert = require('assert')

class Request {
  constructor({
    name,
    description,
    startAt,
    endAt
  }) {
    assert(typeof name === 'string')
    this.name = name

    assert(typeof description === 'string')
    this.description = description

    assert(startAt instanceof Date)
    this.startAt = startAt

    assert(endAt instanceof Date)
    this.endAt = endAt
  }
}

class Response {
  constructor({
    code,
    message,
    data
  }) {
    assert(typeof code === 'string')
    this.code = code

    assert(typeof message === 'string')
    this.message = message

    assert(typeof data === 'string')
    this.data = data
  }
}

async function callCreateContestAPI(request) {
  assert(request instanceof Request)
  throw new Error('Unimplemented')
}

module.exports = {
  Request,
  Response,
  callCreateContestAPI
}