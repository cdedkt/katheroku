
const products = require("../entities/products");
const categories = require("../entities/categories");

function getProduct(request, result) {
  products.findById(request.params.id)
  .then((rows) => {
    const product = rows[0];
    //console.log("product:", product);
    categories.getCategoryFromProduct(product.id)
    .then((rows) => {
      //console.log("category", rows[0]);
      result.render("product", {product: product, category: rows[0]});
    });
  });
}

module.exports = getProduct;
