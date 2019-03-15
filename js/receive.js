$(document).on("click", ".coin-selector", function(){
    if(!$(this).hasClass("btn-selected"))
        $(".coin-selector").toggleClass("btn-selected");
});

$(document).on("click", "blockquote", function(){
    $("blockquote").removeClass("selected");
    $(this).addClass("selected");

    document.getElementById("qrimage").innerHTML="<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl="+encodeURIComponent($(this).children("p").html())+"'/>";
});