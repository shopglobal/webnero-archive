$(function() {
    $('#side-menu').metisMenu();
});

window.onload = function() {
  ModelViewController.isLogin = false;
  PassportPipeline.statusMessage("Folio Updated!");
}
$(document).ready(function() {
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else {
        sessionStorage.setItem("fromLogin", false);
        ModelViewController.fillHistory();
        setInterval(ModelViewController.fillHistory, 15000);
    };
    
    $('#transaction-history').DataTable({
        responsive: true,
        paging: false,
        "order": [[ 3, 'desc' ]]
    });
});
