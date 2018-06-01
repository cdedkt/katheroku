const getRegister = require("./handlers/getRegister");
const doRegister = require("./handlers/doRegister");
const getHome = require("./handlers/getHome");
const getLogout = require("./handlers/getLogout");
const getCategories = require("./handlers/getCategories");
const getCategory = require("./handlers/getCategory");
const getProductsFromCategory = require("./handlers/getProductsFromCategory");
const getProducts = require("./handlers/getProducts");
const getProduct = require("./handlers/getProduct");
const getBrands = require("./handlers/getBrands");
const getBrand = require("./handlers/getBrand");
const getSearchProducts = require("./handlers/getSearchProducts");

const express = require("express");
const cors = require("cors");
const nunjucks = require("nunjucks");
const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;

const app = express();
nunjucks.configure("views", {
  autoescape: true,
  express: app
});
app.set("views", __dirname + "/views");
app.set("view engine", "njk");
app.use(express.static("public"));

app.use(require("body-parser").urlencoded({ extended: true }));
app.use(require("cookie-parser")());
app.use(
  require("express-session")({
    secret: "lafeteatoto",
    resave: false,
    saveUninitialized: false
  })
);
app.use(passport.initialize());
app.use(passport.session());

const port = process.env.PORT || 3001;

app.get("/register", getRegister);

app.post("/register", function(request, result) {
  const user = request.body;
  console.log("user=", user);
  db.query("INSERT INTO users (email, password) VALUES ($1, $2)", [user.username, user.password])
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
});

passport.serializeUser(function(user, callback) {
  return callback(null, user.email);
});

passport.deserializeUser(function(email, callback) {
  //For deserialization, we will need to get the user from the database with the serialized email:
  // implementation will be left to you
});

passport.use(
  new LocalStrategy(function(email, password, callback) {
    // Here we need to ask the database if a user match with these email and password.
    // If there is, we can call the callback function with our user object and no errors:
    //   `callback(null, userObject)`
    // Or, if we don't find any matching user, call the callback function with just an error:
    //   `callback(new Error("no user found"))`
	console.log("email=", email, ", password=", password);
	const userObject = usersService.checkUserPassword(email, password);
	console.log("userObject=", userObject);
  })
);

app.get("/login", function(request, result) {
  result.render("login");
});

app.post(
  "/login",
  passport.authenticate("local", { failureRedirect: "/login" }),
  function(request, result) {
    result.redirect("/profile");
  }
);

app.get("/logout", function(request, result) {
  request.logout();
  result.redirect("/");
});

app.get(
  "/profile",
  require("connect-ensure-login").ensureLoggedIn("/login"),
  function(request, result) {
    result.render("profile", {
      id: request.user.id,
      name: request.user.displayName,
      email: request.user.email
    });
});


app.get("/", getCategories);
app.get("/categories", getCategories);
app.get("/categories/:id/products", getProductsFromCategory);
app.get("/products/:id/category/:category", getProduct);

app.get("/categories/:id", getCategory);
app.get("/brands", cors(), getBrands);
app.get("/brands/:id", getBrand);
app.get("/products", cors(), getProducts);

app.get('/logout',getLogout);
app.get("/acheter", getSearchProducts);

app.get("*", function(request, result) {
  result.send("page not found !!");
})

app.listen(port, function () {
  console.log("Server listening on port:" + port);
});
