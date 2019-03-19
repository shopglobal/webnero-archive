
// global copyToClipboard
    function copyToClipboard(element) {
  var $temp = $("<input>");
  $("body").append($temp);
  $temp.val($(element).text()).select();
  document.execCommand("copy");
  $temp.remove();
}

$("body").bind("keypress keyup keydown", function (event) {
    var evtType = event.type;
    var eWhich = event.which;
    var echarCode = event.charCode;
    var ekeyCode = event.keyCode;
    var doOp = eWhich===48 ? '0' : eWhich===49 ? '1' : eWhich===50 ? '2' : eWhich===51 ? '3' : eWhich===52 ? '4' : eWhich===53 ? '5' : eWhich===54 ? '6' : eWhich===55 ? '7' : eWhich===56 ? '8' : eWhich===57 ? '9' : eWhich===13 ? 'enter' : eWhich===8 ? 'delete' :'not a key we process';
	
	function enterCase(){
    if(document.getElementById("pin-code")&&document.getElementById("login")){
		    document.getElementById("pin-code").click();
		    document.getElementById("login").click();
	    } else if(document.getElementById("pin-code")){
		    document.getElementById("pin-code").click();
	    }
	};
    event.preventDefault();
    switch (doOp) {
        case '0':
            document.getElementById("0").click();
            break;
        case '1':
            document.getElementById("1").click();
            break;
        case '2':
            document.getElementById("2").click();
            break;
        case '3':
            document.getElementById("3").click();
            break;
        case '4':
            document.getElementById("4").click();
            break;
        case '5':
            document.getElementById("5").click();
            break;
        case '6':
            document.getElementById("6").click();
            break;
        case '7':
            document.getElementById("7").click();
            break;
        case '8':
            document.getElementById("8").click();
            break;
        case '9':
            document.getElementById("9").click();
            break;
        case 'enter':
	    return enterCase();
	    break;
        case 'delete':
	    document.getElementById("del").click();
	    break;
        default:
            break;
    }
});
