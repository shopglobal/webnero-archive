$(document).on("click", "#register", function(){
    
    $(".alert").css("display", "none");

    etnxUserData.method = 'register';
    etnxUserData.username = $("#email").val();
    etnxUserData.email = $("#email").val();
    etnxUserData.password = $("#password").val();

    if(etnxUserData.password != $("#re-password").val())
        registerFail("password mismatch");
    else{
        MobWallet.etnxApi(etnxUserData,etnxUserData.coinAPIurl).then((result) => {
            if(result){
                console.log(result); 
                var etnxpLogin = JSON.parse(result);
                if(etnxpLogin.status == "success"){
                    location.href = location.href.replace("register", "pin-code");
                }
                else
                    registerFail("system error");
            }
            else
                registerFail("system error");
        });
    }
});

function initDone(coinName, result){
    
    loginSuccess();

    setTimeout(function() { 
            $.event.trigger({
                type: "init.done",
                coin: coinName
            });
    }, 250);
}

function registerFail(message){
    $(".alert-danger").html("Registration error: " + message);
    $(".alert-danger").css("display", "block");
}

