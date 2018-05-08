
function getLogout(request, result) {
  request.session.destroy(err => {
	if(err) {
      console.log(err);
    } else {
      result.redirect("/");
    }
  });
}

module.exports = getLogout;


