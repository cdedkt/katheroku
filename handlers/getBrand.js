
const brands = require("../entities/brands");

function getBrand(request, result) {
  brands.findById(request.params.id)
  .then((rows) => {
    result.json(rows);
  });
}

module.exports = getBrand;
