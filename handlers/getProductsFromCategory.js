const productsService = require("../services/productsService");

function getProductsFromCategory(request, result) {
  const currentCategoryId = request.params.id;
  productsService.getProductsFromCategory(currentCategoryId)
  .then((products) => {
	//console.log("products=", products);
    productsService.getCategory(currentCategoryId)
    .then((rows) => {
      result.render("productsList", {products: products, category: rows[0]});
    });
  });
}

module.exports = getProductsFromCategory;
