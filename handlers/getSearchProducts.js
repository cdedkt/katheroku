const productsService = require("../services/productsService");


function getSearchProducts(request, result) {
  const labelsToFind = request.query.labelsToFind;
  //console.log("labelsToFind=", labelsToFind);
  
  productsService.searchProducts(labelsToFind)
  .then((products) => {
    result.render("productsList", {products: products, category: null});
  });
}

module.exports = getSearchProducts;
