$(document).on("click", "#register", function(){
    
    $(".alert").css("display", "none");

    etnxUserData.method = 'register';
    etnxUserData.username = $("#email").val();
    etnxUserData.email = $("#email").val();
    etnxUserData.password = $("#password").val();

    if(validateField())
    {
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

function validateField(){
    if(!isEmail($("#email").val()))
        registerFail("invalid email");
    else if(!isValidPassword($("#password").val()))
        registerFail("invalid password (min. 8 chars, one digit, one uppercase )");
    else if($("#password").val() != $("#re-password").val())
        registerFail("password mismatch");

    return $(".alert-danger").css("display") == "none";
}

function isEmail(email) {
    var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function isValidPassword(password) {
    var regex = /^(?=.*\d)(?=.*[A-Z])[0-9a-zA-Z]{8,}$/;
    return regex.test(password);
}