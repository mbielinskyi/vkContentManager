var httpRequest = require("./utils/httpRequest");
console.log("hi")
function callBack (response) {
	console.log(response);
}

//httpRequest.get("http://google.com", "/", callBack);

httpRequest.get(callBack);