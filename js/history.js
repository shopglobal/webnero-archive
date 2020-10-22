$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function() {
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else {
        setInterval(ModelViewController.fillHistory, 15000);
    };
    
    $('#transaction-history').DataTable({
        responsive: true,
        "order": [[ 3, 'desc' ]]
    });
});
