function resetFail(){
    $("#pin-code-container").css("display", "none");
    $("#reset-container").css("display", "block");
    
    $(".alert-danger").css("display", "block");
    $("#spinner-modal").modal('hide');
}

$(document).on("click", "#reset", function(){
    PassportPipeline.resetPassword('crfi', $("#email").val())
    //$("#pin-code-container").css("display", "block");
    $("#reset-container").css("display", "none");
});
