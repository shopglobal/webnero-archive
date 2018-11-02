
//Loads the correct sidebar on window load,
//collapses the sidebar on window resize.
// Sets the min-height of #page-wrapper to window size
$(function() {
    $(window).bind("load resize", function() {
        var topOffset = 50;
        var width = (this.window.innerWidth > 0) ? this.window.innerWidth : this.screen.width;
        if (width < 768) {
            $('div.navbar-collapse').addClass('collapse');
            topOffset = 100; // 2-row-menu
        } else {
            $('div.navbar-collapse').removeClass('collapse');
        }

        var height = ((this.window.innerHeight > 0) ? this.window.innerHeight : this.screen.height) - 1;
        height = height - topOffset;
        if (height < 1) height = 1;
        if (height > topOffset) {
            $("#page-wrapper").css("min-height", (height) + "px");
        }
    });

    var url = window.location;
    // var element = $('ul.nav a').filter(function() {
    //     return this.href == url;
    // }).addClass('active').parent().parent().addClass('in').parent();
    var element = $('ul.nav a').filter(function() {
        return this.href == url;
    }).addClass('active').parent();

    while (true) {
        if (element.is('li')) {
            element = element.parent().addClass('in').parent();
        } else {
            break;
        }
    }
});

$(document).on("click", ".coin-selector", function(){
    if(!$(this).hasClass("btn-selected"))
        $(".coin-selector").toggleClass("btn-selected");
});

$(document).on("click", "blockquote", function(){
    $("blockquote").removeClass("selected");
    $(this).addClass("selected");

    document.getElementById("qrimage").innerHTML="<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl="+encodeURIComponent($(this).children("p").html())+"'/>";
});
 
var etnxUserData = {
    method: 'login',
    timestamp: '',
    date: '',
    telegramID: '',
    telegramUsername: '',
    username: '',
    email: '',
    password: '',
    code: null,
    uid: null,
    name: '',
    addr: '',
    pid: null,
    receiver: '',
    txid: '',
    link: '',
    notes: '',
    bounty_id: '',
    address: '',  
    secret: null,
    unlocked_balance: 0, 
    locked_balance: 0,
    coinAPIurl: "",
}; 

var etnxpUserData = {
    method: 'login',
    timestamp: '',
    date: '',
    telegramID: '',
    telegramUsername: '',
    username: '',
    email: '',
    password: '',
    code: null,
    uid: null,
    name: '',
    addr: '',
    pid: null,
    receiver: '',
    txid: '',
    link: '',
    notes: '',
    bounty_id: '',
    address: '',  
    secret: null,
    unlocked_balance: 0, 
    locked_balance: 0,
    coinAPIurl: "",
}; 

var ModelViewController = {
    initLevel: 0,
    setEtnxBalance: function(data){
        localStorage.setItem("etnxBalance", data);
    },
    setEtnxpBalance: function(data){
        localStorage.setItem("etnxpBalance", data);
    },
    getEtnxBalance: function(){
        try{ return JSON.parse(localStorage.getItem("etnxBalance")); }
        catch(e) { console.log(e); return null; }
    },
    getEtnxpBalance: function(){
        try{ return JSON.parse(localStorage.getItem("etnxpBalance")); }
        catch(e) { console.log(e); return null; }
    },
    fillBalances: function(){
        var etnxBalance = this.getEtnxBalance();
        var etnxpBalance = this.getEtnxBalance();
        
        if(etnxBalance != null){
            $("#etnx-balance").html(etnxBalance.balances.balance);
            $("#etnx-unlocked-balance").html(etnxBalance.balances.unlocked_balance);
        }

        if(etnxpBalance != null){
            $("#etnxp-balance").html(etnxBalance.balances.balance);
            $("#etnxp-unlocked-balance").html(etnxpBalance.balances.unlocked_balance);
        }
    }
};

$(document).on("init.done", function(e){
    console.log(e.type + " - " + e.coin);
    ModelViewController.initLevel++;
    if(ModelViewController.initLevel == 2)
        location.href = location.href.replace("login", "index");
});