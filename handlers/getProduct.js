const productsService = require("../services/productsService");

function getProduct(request, result) {
  productsService.getProductWithDetail2(request.params.id)
  .then(product => {
	currentCategory = product.categories.filter(categorie => categorie.id===request.params.category)[0];
    //console.log("product from service=", product, "currentCategory=", currentCategory);
    result.render("product", {product: product, currentCategory: currentCategory});
  });
}

module.exports = getProduct;
