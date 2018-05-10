

function getProductsHistory(session) {
	let productsHistory = {
		  toDisplay: [],
		  last: ""
	  };
	if (!session.productsHistory) {
	  session.productsHistory = productsHistory;
	} 
	productsHistory = session.productsHistory;
	//console.log("productsHistory=", productsHistory);
	return productsHistory;
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

function saveProductsHistory(session, productsHistory) {
		session.productsHistory = productsHistory;
}

module.exports = {
  getProductsHistory: getProductsHistory,
  addProductToHistory: addProductToHistory,
  saveProductsHistory: saveProductsHistory
}