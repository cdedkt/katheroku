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
  .then(rows => rows[0])
  .then(product => categories.getCategoryFromProduct(product.id)
     .then(rows => {
       product.categories = rows;
	   return product;
	 })
  )
  .then(product => brands.findById(product.brand_id)
	 .then(rows => {
	   product.brand = rows[0];
	   return product;
	 })
  )
  .then(product => completeDisplay([product])[0]);
}

function getProductWithDetail2(productId) {
  return products.findById(productId)
  .then(rows => rows[0])
  .then(product => Promise.all([categories.getCategoryFromProduct(product.id), brands.findById(product.brand_id)])
	.then(values => {
	  product.categories = values[0];
	  product.brand = values[1][0];
	  return product;
	})
  )
  .then(product => completeDisplay([product])[0]);
}

function getAllCategories() {
  return categories.findAll();	
}

function getCategory(categoryId) {
  return categories.findById(categoryId);
}

function getProductsFromCategory(categoryId) {
	return products.getProductsFromCategory(categoryId)
	.then(products => completeDisplay(products));
}

function searchProducts(labels) {
	const labelsList = labels.split(" ");
	return Promise.all([products.getProductsFromTitle(labelsList)])
	.then(values => {
	  return values[0];
	})
	.then(products => completeDisplay(products));
}

module.exports = {
  getAllCategories: getAllCategories,
  getCategory: getCategory,
  getProductWithDetail: getProductWithDetail2,
  getProductsFromCategory: getProductsFromCategory,
  searchProducts: searchProducts
}