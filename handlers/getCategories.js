const productsService = require("../services/productsService");

function getCategories(request, result) {
  productsService.getAllCategories()
  .then((categories) => {
    result.render("categories", {categories: categories});
  });
}

module.exports = getCategories;
