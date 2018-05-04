
const brands = require("../entities/brands");

function getBrands(request, result) {
  brands.findAll()
  .then((rows) => {
    result.json(rows);
  });
}

module.exports = getBrands;
