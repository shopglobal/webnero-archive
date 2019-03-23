$(document).on("click", ".coin-selector", function(){
    if(!$(this).hasClass("btn-selected"))
        $(".coin-selector").toggleClass("btn-selected");
});

$(document).on("click", "blockquote", function(){
    $("blockquote").removeClass("selected");
    $(this).addClass("selected");
    // replace google QR later with qrious as needed
    (function() {
        // example
        var $value_qr = document.getElementById("qrimage").encodeURIComponent($(this).children("p").html());
        var qr = window.qr = new QRious({
            element: document.getElementById('qrimage'),
            size: 250,
            value: $value_qr
        });
    })();
    //document.getElementById("qrimage").innerHTML="<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl="+encodeURIComponent($(this).children("p").html())+"'/>";
});
