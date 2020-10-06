$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){
        sessionStorage.setItem("fromLogin", false);
        ModelViewController.fillData();
        
    } else {
        setInterval(ModelViewController.refreshData, 15000);
    }
});
