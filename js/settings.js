$(function() {
    $('#side-menu').metisMenu();
});


$(document).ready(function() {
    if(!PassportPipeline.hasValidSession()){ 
        location.href = "login.html";
    } else {
        sessionStorage.setItem("fromLogin", false);
    };
    
    // set the wallet index for various functions
    PassportPipeline.getWalletAindex("crfi");
    // get beneficiary intel for index
    PassportPipeline.getBeneficiary("crfi");
    
     $('#beneficiary-history').DataTable({
        responsive: true,
        paging: false,
        "order": [[ 3, 'desc' ]]
    });
});
var encrypted;
var encryption_engine = 0;
function encryptCheck() {
if(PassportPipeline.passportParams.lost_password != null || PassportPipeline.passportParams.lost_password != undefined){
    encrypted = true;
    console.log("encrypted: " + encrypted);
   }
}

$(document).on("change", "input[type='checkbox']", function(){
    hideAlert("success");
    hideAlert("danger");
    encryptCheck();
    if(this.checked)
        $("#confirm-msg").text($(this).attr("msg-on"));
    else
        $("#confirm-msg").text($(this).attr("msg-off"));
        console.log($(this).attr("coin"));
        $("#confirm-modal").modal();
});

$(document).on("click", "#add-beneficiary", function(){
    hideAlert("success");
    hideAlert("danger");
    var newBene_name = $("#beneficiary-name").val();
    var newBene_email = $("#beneficiary-email").val();
    var newBene_address = $("#beneficiary-address").val();
    function goErr($datErr) {
        showAlert("danger", "Invalid beneficiary! Missing or improperly formatted " + $datErr + ". (Must list name, email, and confirm CRFI address.)");
    }
    if(newBene_name == undefined || newBene_name == '' || newBene_name == null){
        $datErr = "Name";
        goErr($datErr);
    } else if(newBene_email == undefined || newBene_email == '' || newBene_email == null){
        $datErr = "Email";
        goErr($datErr);
    } else if(newBene_address == undefined || newBene_address == '' || newBene_address == null){
        $datErr = "Address";
        goErr($datErr);
    }
    console.log("newBene_name: " + newBene_name);
    console.log("newBene_email: " + newBene_email);
    console.log("newBene_address: " + newBene_address);
    // get the wallet index for various functions
    //PassportPipeline.getWalletAindex("crfi", PassportPipeline.passportParams.email, PassportPipeline.passportParams.password);
    PassportPipeline.setBeneficiary("crfi", $("#beneficiary-name").val(), $("#beneficiary-email").val(), $("#beneficiary-address").val());
    console.log("aindex on settings.js: " + parseFloat(PassportPipeline.passportParams.aindex));
});

$(document).on("click", "#resetpwd", function(){
    hideAlert("success");
    hideAlert("danger");
    var newPwd = $("#newpwd").val();
    if(!Utils.isValidPassword(newPwd)){
        showAlert("danger", "Invalid password (min. 8 chars, one digit, one uppercase )");
        return;
    }
    if($("#confirmpwd").val() !== newPwd){
        showAlert("danger", "Password mismatch");
        return;
    }
    $("#confirm-msg").text("Are you sure you want to update your password?");
    $("#confirm-ok").data("operation", "password");
    $("#confirm-modal").modal();
});

$(document).on("click", "#resetcode", function(){
    hideAlert("success");
    hideAlert("danger");
    var newPin = $("#newcode").val();

    if(!Utils.isValidCode(newPin)){
        showAlert("danger", "Invalid code, please provide 5 digit");
        return;
    }

    if($("#confirmcode").val() !== newPin){
        showAlert("danger", "Pincode mismatch");
        return;
    }
    $("#confirm-msg").text("Are you sure you want to update your 5 digit securit pin code?");
    $("#confirm-ok").data("operation", "password");
    $("#confirm-modal").modal();
});

$(document).on("click", "#confirm-ok", function(){
    
    //console.log($(this).data("operation"));
    showAlert("success", "Operation success");
    $("#confirm-modal").modal('hide');
    
    
    console.log("encryption_engine: " + encryption_engine);
    if(encryption_engine == 0) {
        encryption_engine++
        PassportPipeline.getUUkey('crfi');
        setTimeout(PassportPipeline.logUU(), 3000);
    }
    else {
        if(encryption_engine >= 1){
            encryption_engine = 0;
            PassportPipeline.setUUkey('crfi');
            setTimeout(PassportPipeline.logUU(), 3000);
           }
    }
});

$(document).on("click", "#confirm-canc", function(){
    hideAlert("success");
    hideAlert("danger");
    $("#confirm-modal").modal('hide');
        PassportPipeline.setUUkey('crfi');
});

function showAlert(type, msg){
    $(".alert-" + type).text(msg);
    $(".alert-" + type).fadeIn();
}

function hideAlert(type){
    $(".alert-" + type).fadeOut();
}
