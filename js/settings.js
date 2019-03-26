$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){
    
});

$(document).on("change", "input[type='checkbox']", function(){
    
    if(this.checked)
        $("#confirm-msg").text($(this).attr("msg-on"));
    else
        $("#confirm-msg").text($(this).attr("msg-off"));
    console.log($(this).attr("coin"));
    $("#confirm-modal").modal();
});

$(document).on("click", "#confirm-ok", function(){
    $("#confirm-modal").modal('hide');
});

$(document).on("click", "#confirm-canc", function(){
    $("#confirm-modal").modal('hide');
});