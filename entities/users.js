const PG = require("pg");

function findById(id) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT * FROM users where id=$1::uuid",
    [id])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
	  return data[0];
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}


function findByEmail(email) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();

  return client.query(
    "SELECT * FROM users where email=$1::varchar",
    [email])
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


function insertNewUser(userEntity) {
  const client = new PG.Client(process.env.DATABASE_URL);
  client.connect();
  
  return client.query(
    "INSERT INTO users (email, name, password) values ($1::varchar, $2::varchar, $3::varchar) returning (id)",
    [userEntity.email, userEntity.name, userEntity.password])
    .then((result) => result.rows)
    .then((data) => {
      client.end();
	  return data[0].id;
    })
    .catch((error) => {
      console.warn(error);
      client.end();
    });
}


module.exports = {
  findById: findById,
  findByEmail: findByEmail,
  insertNewUser: insertNewUser
}
