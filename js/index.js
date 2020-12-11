$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){
        
        ModelViewController.refreshDataLight();
        sessionStorage.setItem("fromLogin", false);
        ModelViewController.fillData();
        setInterval(ModelViewController.refreshData, 60000);
        // set a key to authenticate 
        PassportPipeline.setUUkey('crfi');
        
        
    } else {
        ModelViewController.refreshDataLight();
        ModelViewController.fillData();
        setInterval(ModelViewController.refreshData, 60000);
        // set a key to authenticate
        PassportPipeline.setUUkey('crfi');
        
    }
});


