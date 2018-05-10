const productsService = require("../services/productsService");
const historyService = require("../services/historyService");


function getProduct(request, result) {
  const productId = request.params.id;
  const categoryId = request.params.category;
  
  productsService.getProductWithDetail(productId)
  .then(product => {
	const currentCategory = product.categories.filter(categoryElement => categoryElement.id===categoryId)[0];
	product.categoryId = currentCategory.id;
	
	let productsHistory = historyService.getProductsHistory(request.session);
	productsHistory = historyService.addProductToHistory(productsHistory, product);
	historyService.saveProductsHistory(request.session, productsHistory);
	
	//console.log("product from service=", product, "\n\n currentCategory=", currentCategory, "\n\n productsHistory=", productsHistory);
    result.render("productDetail", {product: product, currentCategory: currentCategory, productsHistory: productsHistory});
  });
}

module.exports = getProduct;
