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

function getProductsFromCategory(categoryId) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT p.*, lcp.category_id FROM products p inner join category_products lcp on lcp.product_id = p.id where lcp.category_id=$1::uuid",
    [categoryId])
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

function getProductsFromTitle(labelsList) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();
  
  const labelsUnaccentLower = labelsList.map(label => label.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase());
  console.log("labelsList=", labelsList, "\nlabelsUnaccentLower=", labelsUnaccentLower);
  
  let requeteSql = "SELECT p.*, lcp.category_id FROM products p inner join category_products lcp on lcp.product_id = p.id where (1=1)";
  labelsUnaccentLower.forEach((label, index) => { 
	requeteSql += " and strpos(lower(unaccent(p.title)), $" + (index+1) + "::varchar)>0";
  });
  
  return client.query(requeteSql, labelsUnaccentLower)
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
  getProductsFromCategory: getProductsFromCategory,
  getProductsFromTitle: getProductsFromTitle,
  insertProducts: insertProducts
}
