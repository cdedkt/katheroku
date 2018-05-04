
const categories = require("../entities/categories");

function getProductsFromCategory(request, result) {
  categories.getProductsFromCategory(request.params.id)
  .then((rows) => {
    const products = rows;
    categories.findById(request.params.id)
    .then((rows) => {
      result.render("productscategory", {products: products, category: rows[0]});
    });
  });
}

module.exports = getProductsFromCategory;
