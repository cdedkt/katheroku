const productsService = require("../services/productsService");

function getProduct(request, result) {
  productService.getProductWithDetail(request.params.id)
  .then((product) => {
     result.render("product", {product: product});
  });
}

module.exports = getProduct;
