const products = require("../entities/products");
const categories = require("../entities/categories");
const brands = require("../entities/brands");

const tools = require("../services/tools");


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


function getProductsHistory(request) {
	const sess = request.session;
	if (!sess.productsHistory) {
	  let productsHistory = [];
	  sess.productsHistory = productsHistory;
	}
	console.log("sess.productsHistory=", sess.productsHistory);
	return sess.productsHistory;
}

function saveProductsHistory(request, productsHistory) {
	const sess = request.session;
	sess.productsHistory = productsHistory;
}

function addProductToHistory(productsHistory, productToAdd) {
	if (!productsHistory.some(product => product.id === productToAdd.id)) {
		productsHistory.unshift(productToAdd);
	}
	if (productsHistory.length > 4) {
		productsHistory.pop();
	} 
	return productsHistory;
}

module.exports = {
  getProductWithDetail: getProductWithDetail,
  getProductWithDetail2: getProductWithDetail2,
  addProductToHistory: addProductToHistory,
  getProductsHistory: getProductsHistory
}