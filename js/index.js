$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){
    let message;
    function statusMessage(message){
        ModelViewController.refreshDataLight();
            $('#status-area').flash_message({
            text: message,
            how: 'html'
            });
    };

    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else if(sessionStorage.fromLogin == "true"){
        ModelViewController.fillData();
        sessionStorage.setItem("fromLogin", false);
        setInterval(ModelViewController.refreshData, 60000);
        // set a key to authenticate crystalID
        PassportPipeline.setUUkey('crfi');   
        message = 'Folio Updated!';
        setInterval( function() { statusMessage(message); }, 10000 );
    } else {
        ModelViewController.fillData();
        setInterval(ModelViewController.refreshData, 60000);
        message = 'Folio Updated!';
        setInterval( function() { statusMessage(message); }, 10000 );
    }
});


