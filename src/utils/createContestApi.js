class Req {
  constructor({
   name,
   description,
   startAt,
   endAt 
  }) {
    assert(name != undefined)
    assert(name instanceof String)
    this.name = name

    
    this.description = description
    this.startAt = startAt
    this.endAt = endAt
  }
}

class Resp {
  constructor({
    code,
    message,
    data
  }) {
    assert(code instanceof String)
    this.code = code
    this.message = message
    this.data = data
  }
}

function callApi (req) {
  assert(req instanceof Req);
  // call api
  const data = undefined
  return new Resp(data)
}