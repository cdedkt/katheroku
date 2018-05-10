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

function getProductsByCategory(categoryId) {
	return products.getProductsByCategory(categoryId)
	.then(products => completeDisplay(products));
}

function searchProducts(labels) {
	const labelsList = labels.split(" ");
	return Promise.all([products.getProductsByTitle(labelsList), products.getProductsByDecathlonId(labels)])
	.then(valuesArray => {
	  //return valuesArray[0].concat(valuesArray[1]);
	  let results = [];
	  valuesArray.forEach(values => {
		  values.forEach(value => {
			  if (!results.find(result => result.id === value.id)) {
				  results.push(value);
			  }
		  });
	  });
      return results;
	})
	.then(products => completeDisplay(products));
}

module.exports = {
  getAllCategories: getAllCategories,
  getCategory: getCategory,
  getProductWithDetail: getProductWithDetail2,
  getProductsByCategory: getProductsByCategory,
  searchProducts: searchProducts
}