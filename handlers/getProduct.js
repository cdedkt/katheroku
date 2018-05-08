const productsService = require("../services/productsService");


function getProduct(request, result) {
  const productId = request.params.id;
  const categoryId = request.params.category;
  
  productsService.getProductWithDetail2(productId)
  .then(product => {
	const currentCategory = product.categories.filter(categoryElement => categoryElement.id===categoryId)[0];
	product.categoryId = currentCategory.id;
	
	let productsHistory = productsService.getProductsHistory(request);
	productsHistory = productsService.addProductToHistory(productsHistory, product);
	
	console.log("product from service=", product, "\n currentCategory=", currentCategory, "\n productsHistory=", productsHistory);
    result.render("product", {product: product, currentCategory: currentCategory, productsHistory: productsHistory});
  });
}

module.exports = getProduct;
