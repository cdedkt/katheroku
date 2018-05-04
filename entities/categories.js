const PG = require("pg");

function findAll() {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT * FROM categories",
    [])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
      return data;
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}

function findById(id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT * FROM categories where id=$1::uuid",
    [id])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
      return data;
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}

function getProductsFromCategory(category_id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT p.* FROM products p inner join category_products lcp on lcp.product_id = p.id where lcp.category_id=$1::uuid",
    [category_id])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
      return data;
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}

function getCategoryFromProduct(product_id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT c.* FROM categories c inner join category_products lcp on lcp.category_id = c.id where lcp.product_id=$1::uuid",
    [product_id])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
      return data;
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}

function insertCategories(categories) {
  console.log("INSERT CATEGORIES : " + categories.length + " lines have to be inserted.");
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  let indice = 0;
  insertNextCategorie(client, categories, indice);
}

function insertNextCategorie(client, categories, indice) {
  client.query(
    "INSERT INTO categories (id, decathlon_id, label) values ($1::uuid, $2::integer, $3::varchar)",
    [categories[indice].id, categories[indice].decathlon_id, categories[indice].label],
    function(error, result) {
      if (error) {
        console.warn(error);
        client.end();
      } else {
        indice++;
        if (indice<categories.length) {
          insertNextCategorie(client, categories, indice);
        } else {
          console.log("INSERT CATEGORIES OK : " + indice + " lines inserted.");
          client.end();
        }
      }
    }
  );
}

module.exports = {
  findAll: findAll,
  findById: findById,
  getProductsFromCategory: getProductsFromCategory,
  getCategoryFromProduct: getCategoryFromProduct,
  insertCategories: insertCategories
}
