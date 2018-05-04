
const categories = require("../entities/categories");

function getCategory(request, result) {
  categories.findById(request.params.id)
  .then((rows) => {
    result.json(rows);
  });
}

module.exports = getCategory;
