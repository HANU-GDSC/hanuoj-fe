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

    // ISOString
    assert(typeof startAt === 'string')
    this.startAt = startAt

    assert(typeof endAt === 'string')
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

// is there anything else ?
async function callCreateContestAPI(request) {
  assert(request instanceof Request)
  throw new Error('Unimplemented')
}

export {
  Request,
  Response,
  callCreateContestAPI
}