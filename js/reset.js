function resetFail(){
    $("#pin-code-container").css("display", "none");
    $("#reset-container").css("display", "block");
    $("#spinner-modal").modal('hide');
    $(".alert-danger").css("display", "block");
}

function resetCodeFail(){
    $(".alert-danger").html("Wrong code");
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
}

function resetSuccess(){
    $("#pin-code-container").css("display", "none");
    $("#reset-container").css("display", "block");
    $(".alert-success").css("display", "block");
    $("#spinner-modal").modal('hide');
}

$(document).on("click", "#resetpwd", function(){
    if($("#pass").val() != $("#repeat").val()){
        let userErr = "Your password does not match. Please correct your password, and try again momentarily.";
        $(".alert-danger").html(userErr)
        resetFail();
        return;
    }
    else {
    PassportPipeline.resetPassword('crfi', $("#email").val(), $("#pass").val(), $("#repeat").val(), true)
    //$("#pin-code-container").css("display", "block");
    //$("#reset-container").css("display", "none");
    }
});

$(document).on("click", "#reset-code", function(){
    if($("#pin").val() != $("#confirmpin").val()){
        let userErr = "Bot pin codes do not match. Please correct your pin to consist of 5 digits -- only numbers, and try again momentarily.";
        $(".alert-danger").html(userErr)
        resetFail();
        return;
    }
    else {
    PassportPipeline.resetCode('crfi', '', $("#pin").val(), $("#confirmpin").val(), true)
    //$("#pin-code-container").css("display", "block");
    //$("#reset-container").css("display", "none");
    }
});

$(document).on("click", "#reset", function(){
    if($("#email").val() != $("#confirm-email").val() || $("#confirm-email").val() != $("#email").val()){
        let userErr = "Your email does not match. Please correct your email, and try again momentarily.";
        $(".alert-danger").html(userErr)
        resetFail();
        return;
    }
    else {
    PassportPipeline.resetPassword('crfi', $("#email").val())
    //$("#pin-code-container").css("display", "block");
    //$("#reset-container").css("display", "none");
    }
});
