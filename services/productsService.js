const products = require("../entities/products");
const categories = require("../entities/categories");


function completeImagePath(products) {
  return products.map((product) => {
    product.image_path = "https://www.decathlon.fr/media/" + product.image_path;
	return product;
  });
}

function getProductWithDetail(productId) {
  products.findById(productId)
  .then((rows) => {
    const product = completeImagePath(rows)[0];
    console.log("product:", product);
    categories.getCategoryFromProduct(product.id)
    .then((rows) => {
      console.log("category", rows[0]);
	  product.category = rows[0];
      return product;
    });
  });
}

module.exports = {
  getProductWithDetail: getProductWithDetail
}