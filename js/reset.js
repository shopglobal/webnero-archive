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

$('#enable-settings').on('change', function(e) {
PassportPipeline.getUUkey('crfi');
setTimeout(PassportPipeline.logUU(), 3000);
});

$(document).on("click", "#resetpwd", function(){
    if($("#pass").val() != $("#repeat").val()){
        let userErr = "Your password does not match. Please correct your password, and try again momentarily.";
        $(".alert-danger").html(userErr)
        resetFail();
        return;
    }
    else {
    PassportPipeline.resetPassword('crfi', $("#email").val(), $("#pass").val(), key_set)
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
