
const products = require("../entities/products");

function getProducts(request, result) {
  products.findAll()
  .then((rows) => {
    result.json(rows);
  });
}

module.exports = getProducts;
