$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){
    ModelViewController.isLogin = 0;
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){
        ModelViewController.fillData();
        sessionStorage.setItem("fromLogin", false);
        setInterval(ModelViewController.refreshData, 150000);
        // set a key to authenticate crystalID
        PassportPipeline.setUUkey('crfi');   
    } else {
        ModelViewController.fillData();
        setInterval(ModelViewController.refreshData, 150000);
    }
});


