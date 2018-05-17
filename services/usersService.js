const usersEntity = require("../entities/users");

function getUserWithDetail(userId) {
  return users.findById(userId);
}

function checkUserPassword(email, password) {
	usersEntity.findByEmail(email)
	.then(users => {
		if (users.length === 0) {
			return new Error("Email not found");
		}
		if (users.length > 1) {
			return new Error("Too many person for email");
		}
		if (users[0].password !== (password + "CRIPTE")) {
			return new Error("Password not correct");
		} else {
			const user = {};
			user.email = users[0].email;
			user.id = users[0].id;
			user.name = users[0].name;
			return user;
		}
	});
}

function createUser(user) {
  return usersEntity.findByEmail(user.email)
  .then(user => {
	  if (user) {
		return new Error("Email already exist");
	  } else {
		const userEntity = {};
		userEntity.email = user.email;
		userEntity.name = user.name;
		userEntity.password = user.password + "CRIPTE"; 
		return usersEntity.insertNewUser(userEntity);
	  }
  })
}
 
module.exports = {
  getUserWithDetail: getUserWithDetail,
  createUser: createUser,
  checkUserPassword: checkUserPassword
}