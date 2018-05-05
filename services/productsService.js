const products = require("../entities/products");
const categories = require("../entities/categories");
const brands = require("../entities/brands");


function completeDisplay(products) {
  return products.map((product) => {
    product.image_path = "https://www.decathlon.fr/media/" + product.image_path;
	return product;
  });
}

function getProductWithDetail(productId) {
  return products.findById(productId)
  .then((rows) => {
	return rows[0];
  })
  .then((product) => {
    return categories.getCategoryFromProduct(product.id)
     .then((rows) => {
       //console.log("category", rows[0]);
	   product.category = rows[0];
	   //console.log("product with category", product);
	   return product;
	 })
  })
  .then((product) => {
    return brands.findById(product.brand_id)
	 .then((rows) => {
	   product.brand = rows[0];
	   //console.log("product with brand", product);
	   return product;
	 })
  })
  .then((product) => completeDisplay([product])[0]);
}

module.exports = {
  getProductWithDetail: getProductWithDetail
}