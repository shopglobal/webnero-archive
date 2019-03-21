
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
    // this didn't quite work, and google suspended the charts API for QR and now has deprecated/shutdown those endpoints. I replaced it with qrious
    // document.getElementById("qrimage").innerHTML="<img src='https://chart.googleapis.com/chart?chs=250x250&cht=qr&chl="+encodeURIComponent($(this).children("p").html())+"'/>";
});
 
var ModelViewController = {
    initLevel: 0,
    setCoinData: function(coin, data){
        switch (coin) {
        case 'etnx':
            return this.setEtnxData(data);
            break;
        case 'etnxp':
            return this.setEtnxpData(data);
            break;
        case 'etnxc':
            return this.setEtnxcData(data);
            break;
        case 'ltnx':
            return this.setLtnxData(data);
            break;
        default:
            break;
    };        
    },
    setEtnxData: function(data){
        localStorage.setItem("etnxpData", data);
    },
    setEtnxpData: function(data){
        localStorage.setItem("etnxpData", data);
    },
    setEtnxcData: function(data){
        localStorage.setItem("etnxcData", data);
    },
    setLtnxData: function(data){
        localStorage.setItem("ltnxData", data);
    },
    getCoinData: function(coin){
        let coinData;
        function whichData(coinData){
        try{ return JSON.parse(localStorage.getItem(coinData)); }
        catch(e) { console.log(e); return null; }
    }
        switch (coin) {
        case 'etnx':
            return whichData("etnxData");
            break;
        case 'etnxp':
            return whichData("etnxpData");
            break;
        case 'etnxc':
            return whichData("etnxcData");
            break;
        case 'ltnx':
            return whichData("ltnxData");
            break;
        default:
            break;
    };         
    },
    getEtnxData: function(){
        try{ return JSON.parse(localStorage.getItem("etnxData")); }
        catch(e) { console.log(e); return null; }
    },
    getEtnxpData: function(){
        try{ return JSON.parse(localStorage.getItem("etnxpData")); }
        catch(e) { console.log(e); return null; }
    },
    getEtnxcData: function(){
        try{ return JSON.parse(localStorage.getItem("etnxcData")); }
        catch(e) { console.log(e); return null; }
    },
    getLtnxData: function(){
        try{ return JSON.parse(localStorage.getItem("ltnxData")); }
        catch(e) { console.log(e); return null; }
    },
    formatCoinTransaction: function(coins, coinSymbol, units){
    const coinUnits = coinSymbol==="etnx" ? 10000000000000000 : coinSymbol==="etnxp" ? 100000 : coinSymbol==="etnxc" ? 1 : coinSymbol==="ltnx" ? 1 : units;
    var balancedCoins = coins * coinUnits; 
    return balancedCoins;
    },
    formatCoinUnits: function(coins, coinSymbol, units){
    const coinUnits = coinSymbol==="etnx" ? 100000000 : coinSymbol==="etnxp" ? 100 : coinSymbol==="etnxc" ? 100 : coinSymbol==="ltnx" ? 100000000 : units;
    var coinDecimalPlaces = coinUnits.toString().length - 1;
    var balancedCoins = (parseInt(coins || 0) / coinUnits).toFixed(units || coinDecimalPlaces);
    return balancedCoins;
    },
    fillData: function(){
        
        var etnxData = this.getEtnxData();
        if(etnxData != null){
            const etnxLockedBalance = this.formatCoinUnits(etnxData.balances.balance, "etnx")
            const etnxBalance = this.formatCoinUnits(etnxData.balances.unlocked_balance, "etnx")
            $("#etnx-wallet").html(etnxData.address);
            console.log(etnxData);
            $("#etnx-balance").html(etnxLockedBalance);
            $("#etnx-unlocked-balance").html(etnxBalance);
        }
        
        var etnxpData = this.getEtnxpData();
        if(etnxpData != null){
            const etnxpLockedBalance = this.formatCoinUnits(etnxpData.balances.balance, "etnxp")
            const etnxpBalance = this.formatCoinUnits(etnxpData.balances.unlocked_balance, "etnxp")
            $("#etnxp-wallet").html(etnxpData.address);
            console.log(etnxpData);
            $("#etnxp-balance").html(etnxpLockedBalance);
            $("#etnxp-unlocked-balance").html(etnxpBalance);
        }
        
        var etnxcData = this.getEtnxcData();
        if(etnxcData != null){
            const etnxcLockedBalance = this.formatCoinUnits(etnxcData.balances.balance, "etnxc")
            const etnxcBalance = this.formatCoinUnits(etnxcData.balances.unlocked_balance, "etnxc")
            $("#etnxc-wallet").html(etnxcData.address);
            console.log(etnxcData);
            $("#etnxc-balance").html(etnxcLockedBalance);
            $("#etnxc-unlocked-balance").html(etnxcBalance);
        }
        
        var ltnxData = this.getLtnxData();
        if(ltnxData != null){
            const ltnxLockedBalance = this.formatCoinUnits(ltnxData.balances.balance, "ltnx")
            const ltnxBalance = this.formatCoinUnits(ltnxData.balances.unlocked_balance, "ltnx")
            $("#ltnx-wallet").html(ltnxData.address);
            console.log(ltnxData);
            $("#ltnx-balance").html(ltnxLockedBalance);
            $("#ltnx-unlocked-balance").html(ltnxBalance);
        }
    },

    fillHistory: function(){
        var etnxData = this.getEtnxData();
        
        if(etnxData != null){
            this.fillHistoryRows("ETNX", "Receive", etnxData.txs.in);
            this.fillHistoryRows("ETNX", "Send", etnxData.txs.out);
        }
        
        var etnxpData = this.getEtnxpData();
        if(etnxpData != null){
            this.fillHistoryRows("ETNXP", "Receive", etnxpData.txs.in);
            this.fillHistoryRows("ETNXP", "Send", etnxpData.txs.out);
        }
        
        var etnxcData = this.getEtnxcData();
        if(etnxcData != null){
            this.fillHistoryRows("ETNXC", "Receive", etnxcData.txs.in);
            this.fillHistoryRows("ETNXC", "Send", etnxcData.txs.out);
        }
        
        var ltnxData = this.getLtnxData();
        if(ltnxData != null){
            this.fillHistoryRows("LTNX", "Receive", ltnxData.txs.in);
            this.fillHistoryRows("LTNX", "Send", ltnxData.txs.out);
        }
    },
    blockchainExplorerLink: function(block, height, txid, coin){
        const secureSocketLayer = 'https://';
        const blockchainLink = coin==="etnx" ? 'blockexplorer.electronero.org' : coin==="etnxp" ? 'blockexplorer.electroneropulse.org' : '';
        const txidURL = '/tx/' + txid;
        const heightURL = '/block/' + height;
        const operative = block===true ? heightURL : txidURL;
        const blockchainExplorerURL = secureSocketLayer + blockchainLink + operative;

        return blockchainExplorerURL;
    },
    fillHistoryRows: function(coin, type, items){
        var tbody = $("#transaction-history").find('tbody');
        for(var i = 0; i < items.length; i++) {
            var item = items[i];
            tbody.append( "<tr class='row_" + coin +"'>" +
                            "<td>" + coin + "</td>" + 
                            "<td>" + type + "</td>" + 
                            "<td>" + this.formatCoinUnits(item.amount, coin.toLowerCase()) + "</td>" + 
                            "<td>" + "<a href='"+this.blockchainExplorerLink(true, parseInt(item.height), item.txid, coin.toLowerCase())+"'>" + item.height + "</td>" + 
                            "<td>" + "<a href='"+this.blockchainExplorerLink(false, parseInt(item.height), item.txid, coin.toLowerCase())+"'>" + item.txid + "</a>" + "</td>" + 
                          "</tr>" );
        }
    },

    initCoin: function(coinSymbol){
        PassportPipeline.setMethod('getaddr');
        PassportPipeline.remoteCall(coinSymbol).then((response) => {
            if(response){
                console.log(response); 
                ModelViewController.setCoinData(coinSymbol, response);
                let passportBalance = JSON.parse(response);
                console.log(passportBalance)
            }

            $.event.trigger({
                type: "init.done",
                coin: coinSymbol
            });
        });
    },

    refreshData: function(){
        $("#spinner-modal").modal('show');
        PassportPipeline.loadCode();
        PassportPipeline.performOperation("etnx", ModelViewController.initCoin);
        PassportPipeline.performOperation("etnxp", ModelViewController.initCoin);
    },
};

$(document).on("init.done", function(e){
    console.log(e.type + " - " + e.coin);
    ModelViewController.initLevel++;
    if(ModelViewController.initLevel == 2){
        $("#spinner-modal").modal('hide');
        if(location.pathname.indexOf("login") > -1)
            location.href = location.href.replace("login", "index");
        else
            ModelViewController.fillData();
    }
});

$(document).on("click", "#logout", function(){
    sessionStorage.clear();
    localStorage.clear();
    location.href = "login.html";
});
