$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){

    if(!PassportPipeline.hasValidSession())
        location.href = "login.html";

    if(sessionStorage.fromLogin == "true"){
        sessionStorage.setItem("fromLogin", false);
        ModelViewController.fillData();
    }
    else
        ModelViewController.refreshData();
});