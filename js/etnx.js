$(function() {
    $('#side-menu').metisMenu();
});

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

var jsonLogin = {"status":"success","data":{"uid":"1","password":"test"}};

var jsonGetAddr = {
        "address":"88owYM3JXB5i8zT9pzcNGkhC3LmFCehSsdnnLZi995cSTeRPzHwXoXgdKD39NpErU8E2zmNjyoK7BV7DQ4e8ntm17UsNw1W",
        "balances":
            {"balance":123456789, "multisig_import_needed":false, "unlocked_balance":4567890
        },
        "txs":[],"imports":[],"contracts":[]};

var MobWallet = {
    etnxpApi: function(data, apiUrl){
        if(data.method == 'login')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 250);
            });
        else if(data.method == 'balance')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonGetAddr)); }, 250);
            });
        
        return new Promise((resolve, reject) => {
            reject("Method not supported");
        });
    }
};

var loginUserData = {
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

$(document).on("click", "#login", function(){
    loginUserData.method = 'login';
    MobWallet.etnxpApi(loginUserData,loginUserData.coinAPIurl).then((result) => {
        if(result){
            console.log(result); 
            var jsonLoginResult = JSON.parse(result);
            if(jsonLoginResult.status == "success"){
                loginUserData.method = 'balance';
                MobWallet.etnxpApi(loginUserData,loginUserData.coinAPIurl).then((result) => {
                    if(result){
                        var jsonBalanceResult = JSON.parse(result);
                        console.log(jsonBalanceResult.balances.balance);
                    }
                });
            }
        }
    });    
});

