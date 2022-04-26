const { assert } = require("@vue/compiler-core");
const { postApi } = require("./contestCreateApi");
const { Contest } = require("./contest/contest");

async function Create(contest) {
  assert(contest instanceof Contest);

  let request = {
    name: contest.getName(),
    description: contest.getDescription(),
    startAt: contest.getStartAt(),
    endAt: contest.getEndAt()
  };

  // console.log(request);
  const data = await postApi(request)
  return data;
}

module.exports = {
    Create,
}
