// farm.js -- FARM BTC, ETH, USDT, USDC, DAI, etc etc etc to EARN CRFI rewards
var x = document.getElementById("claim");

function farm() {
  var x = document.getElementById("farm");
  var y = document.getElementById("claim");
  if (x.style.display === "none") {
    y.style.display = "none";
    x.style.display = "block";    
  } else {
    y.style.display = "block";
    x.style.display = "none";
  }
}
function claim() {
  var x = document.getElementById("claim");
  var y = document.getElementById("farm");
  if (x.style.display === "none") {
    y.style.display = "none";
    x.style.display = "block";
  } else {    
    y.style.display = "block";
    x.style.display = "none";
  }
}
