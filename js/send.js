$(document).ready(function(){
    ModelViewController.fillData();
});

var pin_code = "";

$(document).on("click", "#send-modal", function(){
    $('.form-group').removeClass("has-error");
    if(checkMandatoryField("amount") &&
        checkMandatoryField("receiver"))
        openModal();
});

function checkMandatoryField(id){
    if($("#" + id).val() == ""){
        $("#" + id).closest('.form-group').addClass("has-error");
        return false;
    }
    
    return true;
}

function openModal(){
    $("#send-code-modal").modal();
}

$(document).on("click", "#send", function(){
    $(".alert").css("display", "none");
    $(".btn-code").css("display", "none");
    if(pin_code.length < 5){
        sendFail("Provide 5 digits code");
    }
    else {
        console.log(pin_code);
        var coin_selected = $(".btn-selected").attr("id");

        var operationData = etnxUserData;
        var coinMethod = function (data, apiUrl) {};
        coinMethod = MobWallet.etnxApi;

        // instantiate decryption methods 
        let myDecipher = Crypto.decryptData(Crypto.salt())

        if(coin_selected == "etnxp-send"){
            operationData = etnxpUserData;
            coinMethod = MobWallet.etnxpApi;
            operationData.uid = myDecipher(sessionStorage.etnxp_uuid)   
            console.log("etnxp_uuid"+myDecipher(sessionStorage.etnxp_uuid))  
        }
        if(coin_selected != "etnxp-send"){
            operationData.uid = myDecipher(sessionStorage.etnx_uuid)   
            console.log("etnx_uuid"+myDecipher(sessionStorage.etnx_uuid))  
        }

        operationData.method = 'send_transaction';
        operationData.amount = $("#amount").val();
        operationData.receiver = $("#receiver").val();
        operationData.pid = $("#pid").val();
        operationData.code = pin_code;
        operationData.username = myDecipher(sessionStorage.username);
        operationData.password = myDecipher(sessionStorage.password);

        console.log(operationData)

        coinMethod(operationData, operationData.coinAPIurl).then((result) => {
            if(result){
                console.log(result); 
                var sendResult = JSON.parse(result);
                if(sendResult.status == "success")
                    sendSuccess();
                else
                    sendFail("Transaction Fail");
            }
            else
                sendFail("System Fail");
        });
    }     
});

$(document).on("click", "#del", function(){
    $("#digit-" + pin_code.length).val("");
    pin_code = pin_code.substring(0, pin_code.length - 1);
});

$(document).on("click", ".digit", function(){
    var digit = $(this).attr("id");
    pin_code += digit;
    $("#digit-" + pin_code.length).val(digit);
});

function sendSuccess(){
    $(".alert-success").css("display", "block");
}

function sendFail(message){
    $(".alert-danger").html("Transfer error: " + message);
    $(".alert-danger").css("display", "block");
    $(".btn-code").css("display", "block");
}