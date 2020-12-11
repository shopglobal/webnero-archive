$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){
        
        ModelViewController.fillData();
        ModelViewController.refreshDataLight();
        sessionStorage.setItem("fromLogin", false);
        setInterval(ModelViewController.refreshData, 60000);
        // set a key to authenticate 
        PassportPipeline.setUUkey('crfi');
        
        
    } else {
        ModelViewController.fillData();
        ModelViewController.refreshDataLight();
        setInterval(ModelViewController.refreshData, 60000);
        // set a key to authenticate
        PassportPipeline.setUUkey('crfi');
        
    }
});


