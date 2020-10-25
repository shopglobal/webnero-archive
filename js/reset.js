$(document).on("click", "#reset", function(){
    PassportPipeline.resetPassword('crfi', $("#email").val())
    $("#pin-code-container").css("display", "block");
    $("#login-container").css("display", "none");
});
