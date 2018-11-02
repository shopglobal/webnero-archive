$(document).ready(function(){
    ModelViewController.fillData();
});

var pin_code = "";

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
        var operationMethod = function (data, apiUrl) {};
        operationMethod = MobWallet.etnxApi;

        if(coin_selected == "etnxp-send"){
            operationData = etnxpUserData;
            operationMethod = MobWallet.etnxpApi;
        }

        operationData.method = 'send';
        operationData.amount = $("#amount").val();
        operationData.receiver = $("#receiver").val();
        operationData.pid = $("#pid").val();
        operationData.code = pin_code;

        operationMethod(operationData, operationData.coinAPIurl).then((result) => {
            if(result){
                console.log(result); 
                var sendResult = JSON.parse(result);
                if(sendResult.status == "success")
                    sendSuccess()
                else
                    sendFail("System Fail");
            }
            else
                sendFail("Unable to comunicate");
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