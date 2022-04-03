class TestCase {
  constructor({
    input,
    expectedOutput,
    ordinal,
    isSample,
    description
  }) {
    this.input = input
    this.expectedOutput = expectedOutput
    this.ordinal = ordinal
    this.isSample = isSample
    this.description = description
  }
}