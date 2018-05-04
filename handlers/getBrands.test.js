
const getBrands = require("./getBrands");

test("should returns 547 brands", done => {
  expect.assertions(1);

  getBrands(null, {
    json: function(brands) {
      expect(brands.length).toBe(547);
      done();
    }
  });
});
