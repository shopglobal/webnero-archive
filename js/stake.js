// stake.js -- STAKE CRFI to EARN CRFI rewards

$(document).ready(function(){
    ModelViewController.fillData();
    document.getElementById('crfi-stake').click();
    document.getElementById("default_oven").click();
    document.getElementById("stake-modal").style.visibility = "hidden";
    document.getElementById("cancel").style.visibility = "hidden";
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else {
        sessionStorage.setItem("fromLogin", false);
    };
});


function checkMandatoryField(id){
    if($("#" + id).val() == ""){
        $("#" + id).closest('.form-group').addClass("has-error");
        return false;
    }    
    return true;
};



  var parking_interval;
  var locked_blocks;
document.getElementById('interval').addEventListener("click", function() {
  parking_interval = document.getElementById("interval").value;
  if (parking_interval == 10.0) {
  locked_blocks = 14440;
  document.getElementById("lock_value").innerHTML = "Daily (1 day) x10.00% daily yield";
  } else if (parking_interval == 20.0) {
  locked_blocks = 101080;
  document.getElementById("lock_value").innerHTML = "Weekly (1 week) x20.00% daily yield";
  } else if (parking_interval == 33.0) {
  locked_blocks = 404320;
  document.getElementById("lock_value").innerHTML = "Monthly (1 month) x33.00% daily yield";
  } else if (parking_interval == 38.0) {
  locked_blocks = 1212960;
  document.getElementById("lock_value").innerHTML = "Quarterly (3 months) x38.00% daily yield";
  } else if (parking_interval == 40.0) {
  locked_blocks = 2592000;
  document.getElementById("lock_value").innerHTML = "Bi-Annual (6 months) x40.00% daily yield";
  } else if (parking_interval == 50.0) {
  locked_blocks = 5184000;
  document.getElementById("lock_value").innerHTML = "Annual (12 months) x50.00% annual yield";
  }
  console.log("parking_interval: " + parking_interval);
  console.log("locked_blocks: " + locked_blocks);
});

document.getElementById("quote-stake").addEventListener("click", function() {
    var coinAmount = $("#amount").val();
    const amountToQuote = parseFloat(coinAmount);
    var est;
    var total;
    var quoteMinusFee;
    var collateral_value;
    var lock_value;
    var performanceFee;
    var gross;
    var net;
	if(checkMandatoryField("amount") && checkMandatoryField("receiver")){
		
  if (parking_interval == 10.0) {
	  const varRateA = 0.10;
	  performanceFee = (amountToQuote * varRateA) * 0.5075;
	  collateral_value = amountToQuote - performanceFee;
	  est = collateral_value * varRateA;
	  total = est + collateral_value;
	  quoteMinusFee = total;
	  gross = total + performanceFee;
	  net = quoteMinusFee;
	  document.getElementById("est_performance_value").innerHTML = parseFloat(performanceFee) + " CRFI";
	  document.getElementById("quoted_value").innerHTML = parseFloat(gross) + " CRFI";
	  document.getElementById("est_reward_value").innerHTML = parseFloat(est) + " CRFI";
	  document.getElementById("est_return_value").innerHTML = parseFloat(net) + " CRFI";
	  document.getElementById("collateral_value").innerHTML = parseFloat(collateral_value) + " CRFI";
	  console.log("amountToQuote: "  + amountToQuote + " with estimated interest " + est + " with return of " + quoteMinusFee + " capital. Total of: " + total)
  } else if (parking_interval == 20.0) {
	  const varRateB = 0.20;
	  performanceFee = (amountToQuote * varRateB) * 0.4875;
	  collateral_value = amountToQuote - performanceFee;
	  est = collateral_value * varRateB;
	  total = est + collateral_value;
	  quoteMinusFee = total;
	  gross = total + performanceFee;
	  net = quoteMinusFee;
	  document.getElementById("est_performance_value").innerHTML = parseFloat(performanceFee) + " CRFI";
	  document.getElementById("quoted_value").innerHTML = parseFloat(gross) + " CRFI";
	  document.getElementById("est_reward_value").innerHTML = parseFloat(est) + " CRFI";
	  document.getElementById("est_return_value").innerHTML = parseFloat(net) + " CRFI";
	  document.getElementById("collateral_value").innerHTML = parseFloat(collateral_value) + " CRFI";
	  console.log("amountToQuote: "  + amountToQuote + " with estimated interest " + est + " with return of " + quoteMinusFee + " capital. Total of: " + total)
  } else if (parking_interval == 33.0) {
	  const varRateC = 0.33;
	  est = amountToQuote * varRateC;
	  performanceFee = (amountToQuote * varRateC) * 0.4075;
	  collateral_value = amountToQuote - performanceFee;
	  est = collateral_value * varRateC;
	  total = est + collateral_value;
	  quoteMinusFee = total;
	  gross = total + performanceFee;
	  net = quoteMinusFee;
	  document.getElementById("est_performance_value").innerHTML = parseFloat(performanceFee) + " CRFI";
	  document.getElementById("quoted_value").innerHTML = parseFloat(gross) + " CRFI";
	  document.getElementById("est_reward_value").innerHTML = parseFloat(est) + " CRFI";
	  document.getElementById("est_return_value").innerHTML = parseFloat(net) + " CRFI";
	  document.getElementById("collateral_value").innerHTML = parseFloat(collateral_value) + " CRFI";
	  console.log("amountToQuote: "  + amountToQuote + " with estimated interest " + est + " with return of " + quoteMinusFee + " capital. Total of: " + total)
  } else if (parking_interval == 38.0) {
	  const varRateD = 0.38;
	  performanceFee = (amountToQuote * varRateD) * 0.3875;
	  collateral_value = amountToQuote - performanceFee;
	  est = collateral_value * varRateD;
	  total = est + collateral_value;
	  quoteMinusFee = total;
	  gross = total + performanceFee;
	  net = quoteMinusFee;
	  document.getElementById("est_performance_value").innerHTML = parseFloat(performanceFee) + " CRFI";
	  document.getElementById("quoted_value").innerHTML = parseFloat(gross) + " CRFI";
	  document.getElementById("est_reward_value").innerHTML = parseFloat(est) + " CRFI";
	  document.getElementById("est_return_value").innerHTML = parseFloat(net) + " CRFI";
	  document.getElementById("collateral_value").innerHTML = parseFloat(collateral_value) + " CRFI";
	  console.log("amountToQuote: "  + amountToQuote + " with estimated interest " + est + " with return of " + quoteMinusFee + " capital. Total of: " + total)
  } else if (parking_interval == 40.0) {
	  const varRateE = 0.40;
	  est = amountToQuote * varRateE;
	  performanceFee = (amountToQuote * varRateE) * 0.3075;
	  collateral_value = amountToQuote - performanceFee;
	  est = collateral_value * varRateE;
	  total = est + collateral_value;
	  quoteMinusFee = total;
	  gross = total + performanceFee;
	  net = quoteMinusFee;
	  document.getElementById("est_performance_value").innerHTML = parseFloat(performanceFee) + " CRFI";
	  document.getElementById("quoted_value").innerHTML = parseFloat(gross) + " CRFI";
	  document.getElementById("est_reward_value").innerHTML = parseFloat(est) + " CRFI";
	  document.getElementById("est_return_value").innerHTML = parseFloat(net) + " CRFI";
	  document.getElementById("collateral_value").innerHTML = parseFloat(collateral_value) + " CRFI";
	  console.log("amountToQuote: "  + amountToQuote + " with estimated interest " + est + " with return of " + quoteMinusFee + " capital. Total of: " + total)
  } else if (parking_interval == 50.0) {
	  const varRateF = 0.50;
	  performanceFee =  (amountToQuote * varRateF) * 0.2575;
	  collateral_value = amountToQuote - performanceFee;
	  est = collateral_value * varRateF;
	  total = est + collateral_value;
	  quoteMinusFee = total;
	  gross = total + performanceFee;
	  net = quoteMinusFee;
	  document.getElementById("est_performance_value").innerHTML = parseFloat(performanceFee) + " CRFI";
	  document.getElementById("quoted_value").innerHTML = parseFloat(gross) + " CRFI";
	  document.getElementById("est_reward_value").innerHTML = parseFloat(est) + " CRFI";
	  document.getElementById("est_return_value").innerHTML = parseFloat(net) + " CRFI";
	  document.getElementById("collateral_value").innerHTML = parseFloat(collateral_value) + " CRFI";
	  console.log("amountToQuote: "  + amountToQuote + " with estimated interest " + est + " with return of " + quoteMinusFee + " capital. Total of: " + total)
  }
	}
  console.log("parking_interval: " + parking_interval);
  console.log("locked_blocks: " + locked_blocks);  
 });

document.getElementById("stake-modal").addEventListener("click", function() {
	console.log("locked_blocks: " + locked_blocks);
  $('.form-group').removeClass("has-error");
  cleanPinCode();
    if(checkMandatoryField("amount") && checkMandatoryField("receiver")){
	    
	    var crfi_stake_reward_address = document.getElementById("receiver").value;
        if(crfi_stake_reward_address != null && crfi_stake_reward_address != undefined){
		$("#send-code-modal").modal('show');
            console.log("crfi_stake_reward_address: " + crfi_stake_reward_address);
           }    
	var crfiData = ModelViewController.getCoinData("crfi");
        PassportPipeline.passportParams.crfi_address = crfiData.address;
        PassportPipeline.passportParams.crfi_stake_reward_address = crfi_stake_reward_address;
    }
});

var stakeAll = false; // do not stake all balance by default
document.getElementById('stake-all').addEventListener("click", function() {
	if(stakeAll == true) {
		stakeAll = false;
	} else {
		stakeAll = true;
	}
    var coinsymbol = 'crfi';
    var crfiData = ModelViewController.getCoinData(coinsymbol);
    var crfiBalance = ModelViewController.formatCoinUnits(crfiData.balances.unlocked_balance, coinsymbol);
    PassportPipeline.passportParams.balance = crfiBalance; 
    var balance = crfiBalance;
    var input = $('#amount');
    input.val(balance);
    console.log("stakeAll: " + stakeAll);
});

document.getElementById('25_percent').addEventListener("click", function() {
    var twenty5_percent = document.getElementById("25_percent").value;
	var coinsymbol = 'crfi';
    var crfiData = ModelViewController.getCoinData(coinsymbol);
    var crfiBalance = ModelViewController.formatCoinUnits(crfiData.balances.unlocked_balance, coinsymbol);
    PassportPipeline.passportParams.balance = crfiBalance; 
    var percentOf = crfiBalance * 0.25;
    var input = $('#amount');
    input.val(percentOf);
    console.log("percent: " + twenty5_percent);
});
document.getElementById('50_percent').addEventListener("click", function() {
	var coinsymbol = 'crfi';
    var crfiData = ModelViewController.getCoinData(coinsymbol);
    var crfiBalance = ModelViewController.formatCoinUnits(crfiData.balances.unlocked_balance, coinsymbol);
    PassportPipeline.passportParams.balance = crfiBalance; 
    var percentOf = crfiBalance * 0.50;
    var input = $('#amount');
    input.val(percentOf);
    var fifty_percent = document.getElementById("50_percent").value;
    console.log("percent: " + fifty_percent);
});
document.getElementById('75_percent').addEventListener("click", function() {
	var coinsymbol = 'crfi';
    var crfiData = ModelViewController.getCoinData(coinsymbol);
    var crfiBalance = ModelViewController.formatCoinUnits(crfiData.balances.unlocked_balance, coinsymbol);
    PassportPipeline.passportParams.balance = crfiBalance; 
    var percentOf = crfiBalance * 0.75;
    var input = $('#amount');
    input.val(percentOf);
    var seventy5_percent = document.getElementById("75_percent").value;
    console.log("percent: " + seventy5_percent);
});
document.getElementById('100_percent').addEventListener("click", function() {
	var coinsymbol = 'crfi';
    var crfiData = ModelViewController.getCoinData(coinsymbol);
    var crfiBalance = ModelViewController.formatCoinUnits(crfiData.balances.unlocked_balance, coinsymbol);
    PassportPipeline.passportParams.balance = crfiBalance; 
    var percentOf = crfiBalance;
    var input = $('#amount');
    input.val(percentOf);
    var hundred_percent = document.getElementById("100_percent").value;
    console.log("percent: " + hundred_percent);
});

function sendCallback(coinSymbol){
	coinSymbol = 'crfi';
	console.log("stakeAll: " + stakeAll);
    if(stakeAll == true){
	    PassportPipeline.setMethod('locked_sweep');
    } else {
	    PassportPipeline.setMethod('locked_send_transaction_split');
    }
    const coinAmount = $("#amount").val();
    const coinAmountFloat = parseFloat(coinAmount);
    const formatCRFIout = 1000000000000;
    const amountGoingOut = parseInt(coinAmountFloat * formatCRFIout).toFixed(0);
    console.log("coinAmount: " + JSON.stringify(coinAmount));
    console.log("coinAmountFloat: " + coinAmountFloat);
    console.log("amountGoingOut: " + amountGoingOut);
    PassportPipeline.passportParams.amount = amountGoingOut;
    PassportPipeline.passportParams.receiver = $("#receiver").val();
    PassportPipeline.passportParams.pid = $("#pid").val();

    const _uuid = PassportPipeline.myDecipher(sessionStorage.getItem(coinSymbol+"_uuid"));
    const _email = PassportPipeline.myDecipher(sessionStorage.getItem("username"));
    const _password = PassportPipeline.myDecipher(sessionStorage.getItem("password"));
	if(_uuid){
        // logs
        console.log("uuid set in passport");
        //console.log(_uuid);
        //console.log(_email);
        //console.log(_password);
	}
    console.log(PassportPipeline.passportParams)
    
    PassportPipeline.remoteCall(coinSymbol).then((response) => {
        if(response){
            console.log(response); 
		if(!JSON.parse(response)){console.log("TX GOT IN")}
		else{
			var sendResult = JSON.parse(response);
		     	console.log(sendResult)
		}

            if(sendResult.hasOwnProperty("error")){
		    $("#spinner-modal").modal('hide');
		    $("#fail_modal").modal('show');
		    setTimeout(function(){ $("#fail_modal").modal('hide'); }, 6500) 
		    const message = "Transaction Failed, please try again momentarily";
		    $(".alert-danger").html("Transfer error: " + message);
		    $(".alert-danger").css("display", "block");
		    $(".btn-code").css("display", "block");
	    }
            else {
		    $("#spinner-modal").modal('hide');
		    //$("#success_modal").modal('show');
		    let tXfee = 0.0008;
    const messageSuccess = "Transaction is now being broadcasted to the Crystaleum blockchain! Stake amount: " + coinAmount + " CRFI, and additionally the max network fees: " + tXfee + " CRFI. Please don't refresh the page until you are redirected. Thank you.";
	$("#transaction-success").html("Success! " + messageSuccess);
	$("#success_modal").modal('show');
    	setTimeout(function(){ $("#success_modal").modal('hide'); }, 20000) 
 
		    var successDoesFollow = function(){ 
			    $("#success_modal").modal('hide'); 
			    location.href = location.href.replace("send", "index");
		    }
		    setTimeout(successDoesFollow(), 10000) 
	    }
        }
    });
}


$(document).on("click", "#send", function(){
    var coinsymbol = "crfi";
    var crfiData = ModelViewController.getCoinData(coinsymbol);
    let crfiLockedBalance;
    let crfiBalance; 
    if(crfiData != null){
    crfiLockedBalance = ModelViewController.formatCoinUnits(crfiData.balances.balance, coinsymbol);
    crfiBalance = ModelViewController.formatCoinUnits(crfiData.balances.unlocked_balance, coinsymbol);
    PassportPipeline.passportParams.balance = crfiBalance; 
    };
    const coinAmount = $("#amount").val();
    const coinAmountFloat = parseFloat(coinAmount);
    const formatCRFIout = 1000000000000;
    const amountGoingOut = parseInt(coinAmountFloat * formatCRFIout).toFixed(0);
    console.log("coinAmount: " + JSON.stringify(coinAmount));
    console.log("coinAmountFloat: " + coinAmountFloat);
    console.log("amountGoingOut: " + amountGoingOut);
    let balance = crfiData ? crfiBalance : PassportPipeline.passportParams.balance;
    let tXfee = 0.0008;
    let txCost = coinAmountFloat + tXfee;
    let minStake = 0.025;
    let maxStake = 0.7;
	console.log(balance);
	console.log(tXfee);
	console.log(txCost);
    	console.log("stakeAll: " + stakeAll);
    if(stakeAll == true){
	    tXfee = 0;
    } else {
	    tXfee = 0.0008;
    }
    const messageFailNotEnough = "Transaction failed to reach the blockchain because your balance: " + balance + " CRFI, is too low to cover the cost of the transaction: " + coinAmount + " CRFI, and additionally the network fees: " + tXfee + " CRFI. The total cost of this transaction would be: " + txCost + " CRFI. Please try a smaller amount. Thank you.";
    const messageFailNotMinStake = "Transaction failed to reach the blockchain because you attempted to send: " + coinAmountFloat + " CRFI, which is too low to cover the minimum stake amount: " + minStake + " CRFI, and additionally the network fees: " + tXfee + " CRFI. Please top-up your CrystalID folio to stake your CRFI. Thank you.";
    const messageFailMaxStake = "Transaction failed to reach the blockchain because you attempted to send: " + coinAmountFloat + " CRFI, which exceeds the current maximum stake amount: " + maxStake + " CRFI, including the network fees: " + tXfee + " CRFI. Please reduce your stake amount. Thank you.";
    if(balance < txCost && stakeAll == false){
    	//txFail()
	$("#transaction-fail").html("Transfer error: " + messageFailNotEnough);
	$("#fail_modal").modal('show');
    	setTimeout(function(){ $("#fail_modal").modal('hide'); }, 20000) 
    	return;
     };
     if(balance < maxStake){
    	//txFail()
	$("#transaction-fail").html("Transfer error: " + messageFailMaxStake);
	$("#fail_modal").modal('show');
    	setTimeout(function(){ $("#fail_modal").modal('hide'); }, 20000) 
    	return;
     };
     if(txCost < minStake && stakeAll == false){
    	//txFail()
	$("#transaction-fail").html("Transfer error: " + messageFailNotMinStake);
	$("#fail_modal").modal('show');
    	setTimeout(function(){ $("#fail_modal").modal('hide'); }, 20000) 
    	return;
     };
    $(".alert").css("display", "none");
    $(".btn-code").css("display", "none");
    if(pin_code.length < 5){
        sendFail("Provide 5 digits code");
    }
    else {
        $("#spinner-modal").modal('show');
        $("#send-code-modal").modal('hide');
        // set pin, then proceed to check_code
        sessionStorage.setItem("code", PassportPipeline.myCipher(pin_code));
        // console.log(pin_code);
        PassportPipeline.setCode(PassportPipeline.myCipher(pin_code));
      var coin_selected = $(".btn-selected").attr("id");
	    switch(coin_selected){
		case 'crfi-stake':
            return PassportPipeline.performOperation("crfi", sendCallback);
        default:
            break;
	    }
    }     
});
