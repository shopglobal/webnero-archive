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
            let crfiData = localStorage.getItem(localStorage.key(l));
            console.log(crfiData);
            console.log("address: " + crfiData.address);
            console.log("balance: " + crfiData.balance);
        }
        sessionStorage.setItem("fromLogin", false);
        setInterval(ModelViewController.refreshData, 60000);
        // set a key to authenticate 
        PassportPipeline.setUUkey('crfi');
        
        
    } else {
        var m;
        console.log("local storage: ");
         for (m = 0; m < localStorage.length; m++)   {
            let crfiData = localStorage.getItem(localStorage.key(m));
            console.log(crfiData);
            console.log("address: " + crfiData.address);
            console.log("balance: " + crfiData.balance);
        }
        ModelViewController.fillData();
        setInterval(ModelViewController.refreshData, 60000);
        // set a key to authenticate
        PassportPipeline.setUUkey('crfi');
        
    }
});


