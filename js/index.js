$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){

    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){
        sessionStorage.setItem("fromLogin", false);
        ModelViewController.fillData();
        var refresh;
        function autoRefresh() {
          ModelViewController.refreshData;
        }  
        (function refreshWallet(){
          refresh = setInterval(autoRefresh, 7500);
        }
        })();
    } else {
        ModelViewController.refreshData();
    }
});
