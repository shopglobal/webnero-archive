$(document).on("click", "#login", function(){
    $("#pin-code-container").css("display", "block");
    $("#login-container").css("display", "none");
});

var pin_code = "";

$(document).on("click", "#pin-code", function(){
    $(".alert").css("display", "none");
    if(pin_code.length < 5){
        $(".alert-danger").css("display", "block");
    }
    else {
        $(".alert").css("display", "none");

        $("#spinner-modal").modal('show');

        etnxUserData.method = 'login';
        etnxUserData.username = $("#email").val();
        etnxUserData.email = $("#email").val();
        etnxUserData.password = $("#password").val();
        etnxUserData.code = pin_code;
        etnxUserData.coinAPIurl = 'http://pulse.electronero.org/api-etnx/api.php';

        MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
            if(result){
                console.log(result); 
                var etnxpLogin = JSON.parse(result);
                if(etnxpLogin.status == "success"){
                    etnxUserData.method = 'balance';
                    MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
                        if(result){
                            console.log(result); 
                            ModelViewController.setEtnxData(result);
                        }
                        initDone("etnx");
                    });
                }
            }
            else
                loginFail();
        });

        etnxpUserData.method = 'login';
        etnxpUserData.username = $("#email").val();
        etnxpUserData.email = $("#email").val();
        etnxpUserData.password = $("#password").val();
        etnxpUserData.code = pin_code;
        etnxpUserData.coinAPIurl = 'http://pulse.electronero.org/etnxp-api/api.php';

        MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
            if(result){
                console.log(result); 
                var etnxpLogin = JSON.parse(result);
                if(etnxpLogin.status == "success"){
                    etnxpUserData.method = 'balance';
                    MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
                        if(result){
                            console.log(result); 
                            ModelViewController.setEtnxpData(result);
                        }
                        initDone("etnxp");
                    });
                }
            }
            else
                loginFail();
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

function initDone(coinName, result){
    $.event.trigger({
        type: "init.done",
        coin: coinName
    });
}

function loginFail(){
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
}

function loginSuccess(){
    $(".alert-success").css("display", "block");
}

