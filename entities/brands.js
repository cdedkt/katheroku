const PG = require("pg");

function findAll() {
  const client = new PG.Client();
  client.connect();

  return client.query(
    "SELECT * FROM brands",
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
  const client = new PG.Client();
  client.connect();

  return client.query(
    "SELECT * FROM brands where id=$1::uuid",
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

function insertBrands(brands) {
  console.log("INSERT BRANDS : " + brands.length + " lines have to be inserted.");
  const client = new PG.Client();
  client.connect();

  let indice = 0;
  insertNextBrand(client, brands, indice);
}

function insertNextBrand(client, brands, indice) {
  client.query(
    "INSERT INTO brands (id, title) values ($1::uuid, $2::varchar)",
    [brands[indice].id, brands[indice].title],
    function(error, result) {
      if (error) {
        console.warn(error);
        client.end();
      } else {
        indice++;
        if (indice<brands.length) {
          insertNextBrand(client, brands, indice);
        } else {
          console.log("INSERT BRANDS OK : " + indice + " lines inserted.");
          client.end();
        }
      }
    }
  );
}

function insertBrandsPromise(brands) {
  console.log("INSERT BRANDS PROMISE : " + brands.length + " lines have to be inserted.");
  const client = new PG.Client();
  client.connect();

  let indice = 0;
  const promiseBrand = new Promise();
  insertNextBrandPromise(client, null, brands, indice);
}

function insertNextBrandPromise(client, promiseBrand, brands, indice) {
  /*promiseBrand.then(
    const newPromiseBrand = client.query(
      "INSERT INTO brands (id, title) values ($1::uuid, $2::varchar)",
      [brands[indice].id, brands[indice].title]
      .then((result) => result.rows)
      .then((data) => {
        indice++;
        if (indice<brands.length) {
          insertNextBrandPromise(client, newPromiseBrand, brands, indice);
        } else {
          console.log("INSERT BRANDS PROMISE OK : " + indice + " lines inserted.");
          client.end();
        }
      })
      .catch((error) => {
        console.warn(error);
        client.end();
      });
    );
  )*/
}



module.exports = {
  findAll: findAll,
  findById: findById,
  insertBrands: insertBrands,
  insertBrandsPromise: insertBrandsPromise
}
