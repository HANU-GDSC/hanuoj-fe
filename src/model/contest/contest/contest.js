const { assert } = require('@vue/compiler-core');
const { Problem } = require('./problem')

class Contest {
  _id;
  _name;
  _description;
  _startAt;
  _endAt;
  _author;
  _problems;
  constructor({
    id,
    name,
    description,
    startAt,
    endAt,
    author,
    problems
  }) {
    assert(id === undefined || typeof id === 'string')
    this._id = id;

    assert(name === undefined || typeof name === 'string')
    this._name = name

    assert(description === undefined || typeof description === 'string')
    this._description = description

    assert(startAt == undefined || typeof startAt === 'string' || startAt instanceof Date)
    if (startAt !== undefined)
      this._startAt = new Date(startAt)

    assert(endAt == undefined || typeof endAt === 'string' || endAt instanceof Date)
    if (endAt !== undefined)  
      this._endAt = new Date(endAt)

    assert(author == undefined || typeof author === 'string')
    this._author = author

    assert(Array.isArray(problems))
    this._problems = []
    for (const problem of problems) {
      assert(problem !== undefined && typeof problem === 'object')
      this._problems.push(new Problem(problem))
    }
  }

  static create() {
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

  setName(name) {
    assert(typeof name === 'string')

    if (name.length == 0) {
      throw new Error('Name to short')
    }
    this._name = name
  }

  setDescription(description) {
    assert(typeof description === 'string')

    this._description = description
  }

  ordinalExisted(ordinal) {
    assert(!isNaN(ordinal))
    
    for (const prob of this._problems) {
      if (prob.getOrdinal() == ordinal) {
        return true
      }
    }
    return false
  }

  sortProblemsByOrdinal() {
    this._problems.sort((a, b) => {
      if (a.getOrdinal() < b.getOrdinal()) {
        return -1;
      } else if (a.getOrdinal() > b.getOrdinal()) {
        return 1;
      }
      return 0;
    })
  }

  setStartAt(date) {
    if (!(date instanceof Date)) {
      throw new Error('Argument "date" must be of type "Date"')
    }
    if (date.getTime() <= new Date().getTime()) {
      throw new Error('Start at must be later than now')
    }
    this._startAt = date
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
    this._endAt = date
  }

  getName() {
    return this._name;
  }

  getDescription() {
    return this._description;
  }

  getStartAt() {
    const ISOStartAt = this._startAt.toISOString();
    return ISOStartAt;
  }

  getEndAt() {
    const ISOEndAt = this._endAt.toISOString();
    return ISOEndAt;
  }
}

export {
  Contest,
  Problem
}

export function create() {
  throw new Error('Function not implemented.');
}
