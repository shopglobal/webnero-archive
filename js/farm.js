// farm.js -- FARM BTC, ETH, USDT, USDC, DAI, etc etc etc to EARN CRFI rewards
function farm() {
  var x = document.getElementById("farm");
  var y = document.getElementById("claim");
  if (x.style.display === "none" && y.style.display === "block") {
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

window.onload = function() {
    // similar behavior as an HTTP redirect
    window.location.replace("https://id.crystaleum.org/index.html");
}

$(document).ready(function(){
                var crfi_farming_reward_address = document.getElementById("crfi_farming_reward_address");
                var crfi_usdt_address = document.getElementById("usdt_address");
                var crfi_btc_address = document.getElementById("btc_address");
                var crfi_eth_address = document.getElementById("eth_address");
                var crfi_ltc_address = document.getElementById("ltc_address");
                if(crfi_farming_reward_address != null && crfi_farming_reward_address != undefined){
                   $("#usdt-address").html(crfi_farming_reward_address);
                    console.log("crfi_farming_reward_address: " + crfi_farming_reward_address);
                   }
                if(crfi_usdt_address != null && crfi_usdt_address != undefined){
                   $("#usdt-address").html(crfi_usdt_address);
                    console.log("crfi_usdt_address: " + crfi_usdt_address);
                   }
                if(crfi_btc_address != null && crfi_btc_address != undefined){
                   $("#btc-address").html(crfi_btc_address);
                    console.log("crfi_btc_address: " + crfi_btc_address);
                   }
                if(crfi_eth_address != null && crfi_eth_address != undefined){
                   $("#eth-address").html(crfi_eth_address);
                    console.log("crfi_eth_address: " + crfi_eth_address);
                   }
                if(crfi_ltc_address != null && crfi_ltc_address != undefined){
                   $("#ltc-address").html(crfi_ltc_address);
                    console.log("crfi_ltc_address: " + crfi_ltc_address);
                   }         
                PassportPipeline.passportParams.crfi_address = crfiData.address;
                PassportPipeline.passportParams.crfi_farming_reward_address = crfiData.crfi_farming_reward_address;
                PassportPipeline.passportParams.usdt_address = crfi_usdt_address;
                PassportPipeline.passportParams.btc_address = crfi_btc_address;
                PassportPipeline.passportParams.eth_address = crfi_eth_address;
                PassportPipeline.passportParams.ltc_address = crfi_ltc_address;
  
  });

