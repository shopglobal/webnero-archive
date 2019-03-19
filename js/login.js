$(document).on("click", "#login", function(){
    $("#pin-code-container").css("display", "block");
    $("#login-container").css("display", "none");
});

var pin_code = "";

$(document).on("click", "#pin-code", function(){
    $(".alert").css("display", "none");
    if(pin_code.length < 5){
        $(".alert-danger").html("Please provide 5 digits");
        $(".alert-danger").css("display", "block");
    }
    else {
        $(".alert").css("display", "none");

        $("#spinner-modal").modal('show');

        loginWorkflow(etnxUserData, 'https://pulse.electronero.org/api-etnx/api.php', 
                        MobWallet.etnxApi, "etnx", ModelViewController.setEtnxData);

        loginWorkflow(etnxpUserData, 'https://pulse.electronero.org/etnxp-api/api.php', 
                        MobWallet.etnxpApi, "etnxp", ModelViewController.setEtnxpData);
    }
});

function loginWorkflow(passportData, apiURL, walletApi, coinSymbol, mvcStore){
    passportData.method = 'login';
    passportData.username = $("#email").val();
    passportData.email = $("#email").val();
    passportData.password = $("#password").val();
    passportData.code = pin_code;
    passportData.coinAPIurl = apiURL;
    passportData.uid = null;

    walletApi(passportData, passportData.coinAPIurl).then((response) => {
        console.log(passportData);
        if(response){
            var passportLogin = JSON.parse(response);
            if(passportLogin.hasOwnProperty("error")){
                loginFail();
                return;
            }
            console.log(passportLogin); 

            // To create a cipher
            let myCipher = Crypto.encryptData(Crypto.salt())
            // Then cipher any sensitive data
            // Store Session
            sessionStorage.setItem("username", myCipher(passportData.username));
            sessionStorage.setItem("password", myCipher(passportData.password));
            sessionStorage.setItem(coinSymbol+"_uuid", myCipher(passportLogin.data.uid));
            
            console.log(myCipher(passportData.username))   // --> "7c606d287b6d6b7a6d7c287b7c7a61666f"
            console.log(myCipher(passportData.password))
            console.log(myCipher(passportLogin.data.uid))

            // end Session Store 

            passportData.uid = passportLogin.data.uid;
            passportData.method = 'check_code';
            walletApi(passportData, passportData.coinAPIurl).then((response) => {
                if(response){
                    console.log(response); 
                    let passportCheckCode = JSON.parse(response);
                    if(passportCheckCode.hasOwnProperty("error")){
                        loginCodeFail();
                        return;
                    }

                    passportData.method = 'getaddr';
                    walletApi(passportData, passportData.coinAPIurl).then((response) => {
                        if(response){
                            console.log(response); 
                            mvcStore(response);
                            let passportBalance = JSON.parse(response);
                            console.log(passportBalance)
                        }

                        initDone(coinSymbol);
                    });
                }
            });
        }
    });
}


$(document).on("click", "#del", function(){
    $("#digit-" + pin_code.length).val("");
    pin_code = pin_code.substring(0, pin_code.length - 1);
});

$(document).on("click", ".digit", function(){
    var digit = $(this).attr("id");
    pin_code += digit;
    $("#digit-" + pin_code.length).val(digit);
});

function initDone(coinSymbol, result){
    $.event.trigger({
        type: "init.done",
        coin: coinSymbol
    });
}

function loginFail(){
    $("#pin-code-container").css("display", "none");
    $("#login-container").css("display", "block");
    
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
}

function loginCodeFail(){
    $(".alert-danger").html("Wrong code");
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
}

function loginSuccess(){
    $(".alert-success").css("display", "block");
}

