

function getProductsHistory(request) {
	const sess = request.session;
	if (!sess.productsHistory) {
	  const productsHistory = {
		  toDisplay: [],
		  last: ""
	  };
	  sess.productsHistory = productsHistory;
	}
	console.log("sess.productsHistory=", sess.productsHistory);
	return sess.productsHistory;
}

function addProductToHistory(productsHistory, productToAdd) {
	if (productsHistory.last) {
		if (!productsHistory.toDisplay.some(product => product.id === productsHistory.last.id)) {
			productsHistory.toDisplay.unshift(productsHistory.last);
		}
	}
	productsHistory.last = productToAdd;
	
	if (productsHistory.toDisplay.length > 6) {
		productsHistory.toDisplay.pop();
	} 
	return productsHistory;
}

module.exports = {
  getProductsHistory: getProductsHistory,
  addProductToHistory: addProductToHistory
}