$(document).ready(function(){
    ModelViewController.fillData();
    document.getElementById('crfi-send').click();
});

$(document).on("click", "#send-modal", function(){
    $('.form-group').removeClass("has-error");
    if(checkMandatoryField("amount") && checkMandatoryField("receiver"))
        $("#send-code-modal").modal('show');
});

function checkMandatoryField(id){
    if($("#" + id).val() == ""){
        $("#" + id).closest('.form-group').addClass("has-error");
        return false;
    }
    
    return true;
}
var sendAll = false
document.getElementById('send-all').addEventListener("click", function() {
   sendAll = true
});
function sendCallback(coinSymbol){
	coinSymbol = 'crfi';
	console.log("sendAll: " + sendAll);
    if(sendAll == true){
	    PassportPipeline.setMethod('sweep_all');
    } else {
	    PassportPipeline.setMethod('send_transaction_split');
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
        console.log(_uuid);
        console.log(_email);
        console.log(_password);
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
		    $("#success_modal").modal('show');
		    var successDoesFollow = function(){ 
			    $("#success_modal").modal('hide'); 
			    location.href = location.href.replace("send", "history");
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
    let minWithdrawal = 0.001;
	console.log(balance);
	console.log(tXfee);
	console.log(txCost);
    const messageFailNotEnough = "Transaction failed to reach the blockchain because your balance: " + balance + " CRFI, is too low to cover the transaction: " + coinAmount + " CRFI, and additionally the network fees: " + tXfee + " CRFI. The total cost of this transaction would be: " + txCost + " CRFI. Please try a smaller amount. Thank you.";
    const messageFailNotMinWithdrawal = "Transaction failed to reach the blockchain because you attempted to send: " + coinAmountFloat + " CRFI, which is too low to cover the minimum withdrawal: " + minWithdrawal + " CRFI, and additionally the network fees: " + tXfee + " CRFI. Please top-up your CrystalID folio, or stake your CRFI. Thank you.";
    if(balance < txCost){
    	//txFail()
	$("#transaction-fail").html("Transfer error: " + messageFailNotEnough);
	$("#fail_modal").modal('show');
    	setTimeout(function(){ $("#fail_modal").modal('hide'); }, 20000) 
    	//$(".alert-danger").html("Transfer error: " + messageFailNotEnough);
    	//$(".alert-danger").css("display", "block");
    	return;
     };
     if(txCost < minWithdrawal){
    	//txFail()
	$("#transaction-fail").html("Transfer error: " + messageFailNotMinWithdrawal);
	$("#fail_modal").modal('show');
    	setTimeout(function(){ $("#fail_modal").modal('hide'); }, 20000) 
    	//$(".alert-danger").html("Transfer error: " + messageFailNotMinWithdrawal);
    	//$(".alert-danger").css("display", "block");
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

        sessionStorage.setItem("code", PassportPipeline.myCipher(pin_code));
        console.log(pin_code);
        // check_code

        var coin_selected = $(".btn-selected").attr("id");
        PassportPipeline.setCode(PassportPipeline.myCipher(pin_code));
	    switch(coin_selected){
		case 'crfi-send':
            return PassportPipeline.performOperation("crfi", sendCallback);
        default:
            break;
	    }
    }     
});




