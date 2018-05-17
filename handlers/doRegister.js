usersService = require("../services/usersService");


function doRegister(request, result) {
  const user = request.body;
  db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [user.email, user.password])
  .then(dbResult => {
    request.logIn(dbResult[0], function(error) {
      if (error) {
        console.log(error);
        return result.redirect("/register");
      }
      return result.redirect("/");
    });
  })
  .catch(error => {
    console.warn(error);
  });
}

module.exports = doRegister;
