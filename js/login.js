$(document).on("click", "#login", function(){
    
    $(".alert").css("display", "none");

    etnxUserData.method = 'login';
    etnxUserData.username = $("#email").val();
    etnxUserData.email = $("#email").val();
    etnxUserData.password = $("#password").val();

    MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
        if(result){
            console.log(result); 
            var etnxpLogin = JSON.parse(result);
            if(etnxpLogin.status == "success"){
                etnxUserData.method = 'balance';
                MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
                    if(result){
                        console.log(result); 
                        ModelViewController.setEtnxBalance(result);
                    }
                    initDone("etnx", true);
                });
            }
        }
        else
            initDone("etnx", false);
    });
    
    etnxpUserData.method = 'login';
    etnxpUserData.username = $("#email").val();
    etnxpUserData.email = $("#email").val();
    etnxpUserData.password = $("#password").val();

    MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
        if(result){
            console.log(result); 
            var etnxpLogin = JSON.parse(result);
            if(etnxpLogin.status == "success"){
                etnxpUserData.method = 'balance';
                MobWallet.etnxpApi(etnxpUserData,etnxpUserData.coinAPIurl).then((result) => {
                    if(result){
                        console.log(result); 
                        ModelViewController.setEtnxpBalance(result);
                    }
                    initDone("etnxp", true);
                });
            }
        }
        else
            initDone("etnxp", false);
    });
});

function initDone(coinName, result){
    $.event.trigger({
        type: "init.done",
        coin: coinName
    });

    if(result)
        loginSuccess();
    else
        loginFail();
}

function loginFail(){
    $(".alert-danger").css("display", "block");
}

function loginSuccess(){
    $(".alert-success").css("display", "block");
}

