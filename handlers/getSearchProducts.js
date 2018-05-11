const productsService = require("../services/productsService");


function getSearchProducts(request, result) {
  const labelsToFind = request.query.labelsToFind;
  //console.log("labelsToFind=", labelsToFind);
  
  productsService.searchProducts(labelsToFind)
  .then((products) => {
	const breadcrumbItems = [];
	breadcrumbItems.push({label : "Categories", link: "/categories"});
	breadcrumbItems.push({label : labelsToFind, link: null});
	
    result.render("productsList", {products: products, breadcrumbItems: breadcrumbItems});
  });
}

module.exports = getSearchProducts;
