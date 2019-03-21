$(document).on("click", "#login", function(){
    $("#pin-code-container").css("display", "block");
    $("#login-container").css("display", "none");
});

$(document).on("click", "#pin-code", function(){
    $(".alert").css("display", "none");
    if(pin_code.length < 5){
        $(".alert-danger").html("Please provide 5 digits");
        $(".alert-danger").css("display", "block");
    }
    else {
        $(".alert").css("display", "none");

        $("#spinner-modal").modal('show');
        
        PassportPipeline.setCode(PassportPipeline.myCipher(pin_code));
        console.log(pin_code)
        PassportPipeline.setCredentials(PassportPipeline.myCipher($("#email").val()), PassportPipeline.myCipher($("#password").val()), true);
        sessionStorage.setItem("fromLogin", true);
        PassportPipeline.performOperation("etnx", ModelViewController.initCoin);
        PassportPipeline.performOperation("etnxp", ModelViewController.initCoin);
    }
});

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

