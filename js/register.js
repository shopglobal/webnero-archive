$(document).on("click", "#register", function(){
    $(".alert").css("display", "none");
    if(validateField()){
        $("#pin-code-container").css("display", "block");
        $("#register-container").css("display", "none");
    }
});

$(document).on("click", "#pin-code", function(){
    
    $(".alert").css("display", "none");
    if(pin_code.length < 5){
        $(".alert-danger").html("Please provide 5 digits");
        $(".alert-danger").css("display", "block");
    }
    else
    {
        $("#spinner-modal").modal('show');

        PassportPipeline.setMethod('register');
        PassportPipeline.setCredentials($("#email").val(), $("#password").val(), false);
        PassportPipeline.setCode(pin_code);

        PassportPipeline.remoteCall("etnx").then((response) => {
            if(response){
                console.log(response); 
                var registerJson = JSON.parse(response);
                if(registerJson.status == "success"){
                    location.href = "login.html";
                }
                else
                    registerFail("system error");
            }
            else
                registerFail("system error");
        });
    }
});

function registerFail(message){
    $(".alert-danger").html("Registration error: " + message);
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
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