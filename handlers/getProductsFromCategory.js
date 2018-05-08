
const categories = require("../entities/categories");

function getProductsFromCategory(request, result) {
  const currentCategoryId = request.params.id;
  categories.getProductsFromCategory(currentCategoryId)
  .then((products) => {
    categories.findById(currentCategoryId)
    .then((rows) => {
      result.render("productscategory", {products: products, category: rows[0]});
    });
  });
}

module.exports = getProductsFromCategory;
