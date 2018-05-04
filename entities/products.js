const PG = require("pg");

function findAll() {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT * FROM products",
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
    "SELECT * FROM products where id=$1::uuid",
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

function insertProducts(products) {
  console.log("INSERT PRODUCTS : " + products.length + " lines have to be inserted.");
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  let indice = 0;
  insertNextProduct(client, products, indice);
}

function insertNextProduct(client, products, indice) {
  client.query(
    "INSERT INTO products (id, decathlon_id, title, description, brand_id, min_price, max_price, "
    + "crossed_price, percent_reduction, image_path, rating) values "
    + "($1::uuid, $2::integer, $3::varchar, $4::varchar, $5::uuid, $6::float, $7::float, $8::float, $9::float, $10::varchar, $11::float)",
    [products[indice].id, products[indice].decathlon_id, products[indice].title, products[indice].description,
    products[indice].brand_id, products[indice].min_price, products[indice].max_price, products[indice].crossed_price,
    products[indice].percent_reduction, products[indice].image_path, products[indice].rating],
    function(error, result) {
      if (error) {
        console.warn(error);
        client.end();
      } else {
        indice++;
        if (indice<products.length) {
          insertNextProduct(client, products, indice);
        } else {
          console.log("INSERT PRODUCTS OK : " + indice + " lines inserted.");
          client.end();
        }
      }
    }
  );
}

module.exports = {
  findAll: findAll,
  findById: findById,
  insertProducts: insertProducts
}
