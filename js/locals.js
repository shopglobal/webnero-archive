(function() {

	
var i;

console.log("local storage");
for (i = 0; i < localStorage.length; i++)   {
    console.log(localStorage.key(i) + "=[" + localStorage.getItem(localStorage.key(i)) + "]");
}

console.log("session storage");
for (i = 0; i < sessionStorage.length; i++) {
    console.log(sessionStorage.key(i) + "=[" + sessionStorage.getItem(sessionStorage.key(i)) + "]");
}


	if(sessionStorage.username){
	console.log(PassportPipeline.myDecipher(sessionStorage.username))    // --> 'the secret string'
	}
	if(sessionStorage.password){
	console.log(PassportPipeline.myDecipher(sessionStorage.password))    // --> 'the secret string'
	}

})();
