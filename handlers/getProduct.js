const productsService = require("../services/productsService");

function getProduct(request, result) {
  productsService.getProductWithDetail(request.params.id)
  .then((product) => {
    //console.log("product from service", product);
    result.render("product", {product: product});
  });
}

module.exports = getProduct;
