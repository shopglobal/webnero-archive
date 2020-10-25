$(document).on("click", "#reset", function(){
    PassportPipeline.resetPassword($("#email").val())
    $("#pin-code-container").css("display", "block");
    $("#login-container").css("display", "none");
});
