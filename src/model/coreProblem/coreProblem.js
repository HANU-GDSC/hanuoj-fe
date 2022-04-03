class CoreProblem {
  constructor({
    id,
    name,
    description,
    author,
    testCases,
    memoryLimits,
    timeLimits,
    allowedProgrammingLanguages
  }) {
    this.id = id
    this.name = name
    this.description = description
    this.author = author
    this.testCases = testCases
    this.memoryLimits = memoryLimits
    this.timeLimits = timeLimits
    this.allowedProgrammingLanguages = allowedProgrammingLanguages
  }
}