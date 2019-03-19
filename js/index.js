$(function() {
    $('#side-menu').metisMenu();
});

$(document).ready(function(){

    ModelViewController.fillData();

    // do something 
    
function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}
});