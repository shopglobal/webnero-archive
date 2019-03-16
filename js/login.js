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

        /*
        etnxUserData.method = 'login';
        etnxUserData.username = $("#email").val();
        etnxUserData.email = $("#email").val();
        etnxUserData.password = $("#password").val();
        etnxUserData.code = pin_code;
        etnxUserData.coinAPIurl = ;
        etnxUserData.uid = null;
        MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((response) => {
            console.log(etnxUserData);
            if(response){
                var etnxLogin = JSON.parse(response);
                if(etnxLogin.hasOwnProperty("error")){
                    loginFail();
                    return;
                }
                console.log(etnxLogin); 
                etnxUserData.uid = etnxLogin.data.uid;
                etnxUserData.method = 'check_code';
                MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((response) => {
                    if(response){
                        console.log(response); 
                        let etnxCheckCode = JSON.parse(response);

                        if(etnxCheckCode.hasOwnProperty("error")){
                            loginFail();
                            return;
                        }

                        etnxUserData.method = 'getaddr';
                        MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((response) => {
                            if(response){
                                console.log(response); 
                                ModelViewController.setEtnxData(response);
                                let etnxBalance = JSON.parse(response);
                                console.log(etnxBalance)
                                initDone("etnx");
                            }
                        });
                    }
                });
            }
        });

        etnxpUserData.method = 'login';
        etnxpUserData.username = $("#email").val();
        etnxpUserData.email = $("#email").val();
        etnxpUserData.password = $("#password").val();
        etnxpUserData.code = pin_code;
        etnxpUserData.coinAPIurl = ;
        etnxpUserData.uid = null;

        MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
            console.log(etnxpUserData)
            if(result){
                console.log(result); 
                var etnxpLogin = JSON.parse(result);
                etnxpUserData.uid = etnxpLogin.data.uid;
        let checkBalanceETNXP = function(etnxpUserData){
            etnxpUserData.method = 'getaddr'; 
            MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
                if(result){
                    console.log(result); 
                    ModelViewController.setEtnxpData(result);
                    var etnxpBalance = JSON.parse(result);
                    console.log(etnxpBalance)
                    initDone("etnxp");
                }
                
            });
        }
        let checkCodeETNXP = function(etnxpUserData){
            etnxpUserData.method = 'check_code';
            MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
                if(result){
                    console.log(result); 
                    var etnxpCheckCode = JSON.parse(result);
                    if(etnxpCheckCode.status == "success"){
                        checkBalanceETNXP(etnxpUserData);
                    // maybe later do something
                }
                }
            });
        }
                if(etnxpLogin.status == "success"){
                    checkCodeETNXP(etnxpUserData);
                    // maybe later do something
                }
                console.log(etnxpLogin); 
                etnxpUserData.uid = etnxpLogin.data.uid;
                etnxpUserData.method = 'check_code';
                MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((response) => {
                    if(response){
                        console.log(response); 
                        let etnxpCheckCode = JSON.parse(response);

                        if(etnxpCheckCode.hasOwnProperty("error")){
                            loginFail();
                            return;
                        }

                        etnxpUserData.method = 'getaddr';
                        MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((response) => {
                            if(response){
                                console.log(response); 
                                ModelViewController.setEtnxpData(response);
                                let etnxpBalance = JSON.parse(response);
                                console.log(etnxpBalance)
                                initDone("etnxp");
                            }
                        });
                    }
                });
            }
        });
        */
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

