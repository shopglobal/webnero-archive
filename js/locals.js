(function() {
var l;
console.log("local storage: ");
for (l = 0; l < localStorage.length; l++)   {
    console.log(localStorage.key(l) + "=[" + localStorage.getItem(localStorage.key(l)) + "]");
}
var m;
console.log("session storage: ");
for (m = 0; m < sessionStorage.length; m++) {
    console.log(sessionStorage.key(m) + "=[" + sessionStorage.getItem(sessionStorage.key(m)) + "]");
}
})();
