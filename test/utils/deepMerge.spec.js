const deepMerge = require("../../lib/dist/core/utils/tools").deepMerge;
const { expect } = require("chai");
describe("util test", () => {
  it("check deepMerge", async () => {
    const obj1 = { name: "star", age: 29 };
    const obj2 = { name: "star1", age: 30 };
    expect(deepMerge(obj1, obj2)).deep.equal({
      name: "star1",
      age: 30,
    });
  });
});
