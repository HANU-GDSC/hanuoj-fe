const { assert } = require('@vue/compiler-core')
const { Participant } = require('../participant')

async function createParticipant(participant) {
  assert(participant instanceof Participant)
}

module.exports = {
  createParticipant
}