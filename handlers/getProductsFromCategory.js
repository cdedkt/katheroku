const productsService = require("../services/productsService");

function getProductsFromCategory(request, result) {
  const currentCategoryId = request.params.id;
  productsService.getProductsByCategory(currentCategoryId)
  .then((products) => {
	//console.log("products=", products);
    productsService.getCategory(currentCategoryId)
    .then((category) => {
	  const breadcrumbItems = [];
	  breadcrumbItems.push({label : "Categories", link: "/categories"});
	  breadcrumbItems.push({label : category.label, link: null});
	  
      result.render("productsList", {products: products, breadcrumbItems: breadcrumbItems});
    });
  });
}

module.exports = getProductsFromCategory;
