window.onload = function() {
  ModelViewController.isLogin = false;
  PassportPipeline.statusMessage("Folio Updated!");
}
$(document).ready(function(){
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    }
	let address_to_send = '';
    	ModelViewController.fillData();
    	document.getElementById('crfi-send').click();
});



$(document).on("click", "#send-modal", function(){
    $('.form-group').removeClass("has-error");
	cleanPinCode();
    if(checkMandatoryField("amount") && checkMandatoryField("receiver")){
	    $("#send-code-modal").modal('show');
    }
});

$(document).on("click", "#scan-qr", function(){
	$('.form-group').removeClass("has-error");
	$("#qr_modal").modal('show');
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
	if(sendAll == true) {
		sendAll = false;
	} else {
		sendAll = true;
	}
    var coinsymbol = 'crfi';
    var crfiData = ModelViewController.getCoinData(coinsymbol);
    var crfiBalance = ModelViewController.formatCoinUnits(crfiData.balances.unlocked_balance, coinsymbol);
    PassportPipeline.passportParams.balance = crfiBalance; 
    var balance = crfiBalance;
	var input = $('#amount');
        input.val(balance)
   console.log("sendAll: " + sendAll);
});
function sendCallback(coinSymbol){
	coinSymbol = 'crfi';
	console.log("sendAll: " + sendAll);
    if(sendAll == true){
	    PassportPipeline.setMethod('sweep');
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
		    //$("#success_modal").modal('show');
		    let tXfee = 0.0008;
    const messageSuccess = "Transaction is now being broadcasted to the Crystaleum blockchain! Transfer amount: " + coinAmount + " CRFI, and additionally the max network fees: " + tXfee + " CRFI. Please don't refresh the page until you are redirected. Thank you.";
	$("#transaction-success").html("Transfer success! " + messageSuccess);
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
    let minWithdrawal = 0.001;
	console.log(balance);
	console.log(tXfee);
	console.log(txCost);
    	console.log("sendAll: " + sendAll);
    if(sendAll == true){
	    tXfee = 0;
    } else {
	    tXfee = 0.0008;
    }
    const messageFailNotEnough = "Transaction failed to reach the blockchain because your balance: " + balance + " CRFI, is too low to cover the transaction: " + coinAmount + " CRFI, and additionally the network fees: " + tXfee + " CRFI. The total cost of this transaction would be: " + txCost + " CRFI. Please try a smaller amount. Thank you.";
    const messageFailNotMinWithdrawal = "Transaction failed to reach the blockchain because you attempted to send: " + coinAmountFloat + " CRFI, which is too low to cover the minimum withdrawal: " + minWithdrawal + " CRFI, and additionally the network fees: " + tXfee + " CRFI. Please top-up your CrystalID folio, or stake your CRFI. Thank you.";
    if(balance < txCost && sendAll == false){
    	//txFail()
	$("#transaction-fail").html("Transfer error: " + messageFailNotEnough);
	$("#fail_modal").modal('show');
    	setTimeout(function(){ $("#fail_modal").modal('hide'); }, 20000) 
    	//$(".alert-danger").css("display", "block");
    	return;
     };
     if(txCost < minWithdrawal && sendAll == false){
    	//txFail()
	$("#transaction-fail").html("Transfer error: " + messageFailNotMinWithdrawal);
	$("#fail_modal").modal('show');
    	setTimeout(function(){ $("#fail_modal").modal('hide'); }, 20000) 
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

    var video = document.createElement("video");
    var canvasElement = document.getElementById("canvas");
    var canvas = canvasElement.getContext("2d");
    var loadingMessage = document.getElementById("loadingMessage");
    var outputContainer = document.getElementById("output");
    var outputMessage = document.getElementById("outputMessage");
    var outputData = document.getElementById("outputData");

    function drawLine(begin, end, color) {
      canvas.beginPath();
      canvas.moveTo(begin.x, begin.y);
      canvas.lineTo(end.x, end.y);
      canvas.lineWidth = 4;
      canvas.strokeStyle = color;
      canvas.stroke();
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices.getUserMedia({ video: { facingMode: "environment" } }).then(function(stream) {
      video.srcObject = stream;
      video.setAttribute("playsinline", true); // required to tell iOS safari we don't want fullscreen
      video.play();
      requestAnimationFrame(tick);
    });

    function tick() {
      loadingMessage.innerText = "⌛ Loading video..."
      if (video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true;
        canvasElement.hidden = false;
        outputContainer.hidden = false;

        canvasElement.height = video.videoHeight;
        canvasElement.width = video.videoWidth;
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height);
        var imageData = canvas.getImageData(0, 0, canvasElement.width, canvasElement.height);
        var code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: "dontInvert",
        });
        if (code) {
          drawLine(code.location.topLeftCorner, code.location.topRightCorner, "#FF3B58");
          drawLine(code.location.topRightCorner, code.location.bottomRightCorner, "#FF3B58");
          drawLine(code.location.bottomRightCorner, code.location.bottomLeftCorner, "#FF3B58");
          drawLine(code.location.bottomLeftCorner, code.location.topLeftCorner, "#FF3B58");
          outputMessage.hidden = true;
          outputData.parentElement.hidden = false;
          outputData.innerText = code.data;
        } else {
          outputMessage.hidden = false;
          outputData.parentElement.hidden = true;
        }
      }
      requestAnimationFrame(tick);
    }




