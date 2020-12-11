$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){
        
        ModelViewController.fillData();
        var l;
        console.log("local storage: ");
        for (l = 0; l < localStorage.length; l++)   {
            console.log(JSON.parse(localStorage.getItem(localStorage.key(l))));
            let crfiData = JSON.parse(localStorage.getItem(localStorage.key(l)));
        }
        console.log(crfiData);
        sessionStorage.setItem("fromLogin", false);
        setInterval(ModelViewController.refreshData, 60000);
        // set a key to authenticate 
        PassportPipeline.setUUkey('crfi');
        
        
    } else {
        var m;
        console.log("local storage: ");
        for (m = 0; m < localStorage.length; m++)   {
            console.log(JSON.parse(localStorage.getItem(localStorage.key(m))));
            let crfiData = JSON.parse(localStorage.getItem(localStorage.key(m)));
        }
        console.log(crfiData);
        ModelViewController.fillData();
        setInterval(ModelViewController.refreshData, 60000);
        // set a key to authenticate
        PassportPipeline.setUUkey('crfi');
        
    }
});


