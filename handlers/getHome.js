function getHome(request, result) {
  const page = "<html><body>"
  + "Hello World!"
  + "</body></html>";

  result.send(page);
}

module.exports = getHome;
