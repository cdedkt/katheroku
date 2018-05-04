function getMenu(request, result) {
  result.render("menu", {username: "chris"});
}

module.exports = getMenu;
