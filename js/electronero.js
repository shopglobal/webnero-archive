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


$.fn.flash_message = function(options) {
      options = $.extend({
        text: 'Done',
        time: 1000,
        how: 'before',
        class_name: ''
      }, options);      
      return $(this).each(function() {
        if( $(this).parent().find('.flash_message').get(0) )
          return;
        var message = $('<span />', {
          'class': 'flash_message ' + options.class_name,
          text: options.text
        }).hide().fadeIn('fast');
        $(this)[options.how](message);
        message.delay(options.time).fadeOut('normal', function() {
          $(this).remove();
     });
  });
};


$(document).on("click", ".coin-selector", function(){
    if(!$(this).hasClass("btn-selected")){
        $(".coin-selector").removeClass("btn-selected");
        $(this).addClass("btn-selected")
    }
});

$(document).on("click", "blockquote", function(){
    $("blockquote").removeClass("selected");
    $(this).addClass("selected");
});
 
var ModelViewController = {
    isLogin: false,
    initLevel: 0,
    coinState: 0,
    thisIs: 0,
    thisIs1: null,
    thisIs2: null,
    thisIs3: null,
    thisIs4: null,
    thisIs5: null,
    returnState: function(which){
        if(!which){
            which = 0;
        }
        return ModelViewController.coinState = which;
    },
    //coins: { coin: ['crfi', 'etnx','etnxp','ltnx','gldx'] },
    coins: { coin: 'etnx', 'etnxp', 'ltnx', 'gldx', 'crfi' },
    setCoinData: function(coin, data){
        return localStorage.setItem("webnero_"+coin+"Data", data);       
    },
    getCoinData: function(coin){
        if(!coin){
            coin = 'crfi';
        }
        coin = 'crfi';
        if(coin){
            function whichData(coinData){
                ModelViewController.coinState++ 
                try{ return JSON.parse(localStorage.getItem(coinData)); }
                catch(e) { console.log(e); return null; }
            }
            switch (coin) {
                case 'crfi':
                    return whichData("webnero_crfiData");
                case 'etnx':
                    return whichData("webnero_etnxData");
                case 'etnxp':
                    return whichData("webnero_etnxpData");
                case 'ltnx':
                    return whichData("webnero_ltnxData");
                case 'gldx':
                    return whichData("webnero_gldxData");
                default:
                    break;
            }; 
        } else {
             // loop through coins.coin and get all coinData
            let coins = ModelViewController.coins.coin;
            for (var i=0;i<coins.length;i++) {
                ModelViewController.getCoinData(coins[i]);
        };
    };
    },
    formatCoinTransaction: function(coins, coinSymbol, units){
        if(!coinSymbol){
            coinSymbol = 'crfi';
        }
    const coinUnits = coinSymbol==="crfi" ? 1 : coinSymbol==="etnx" ? 1 : coinSymbol==="etnxp" ? 1 : coinSymbol==="etnxc" ? 1 : coinSymbol==="ltnx" ? 1 : coinSymbol==="gldx" ? 1 : units;
    var balancedCoins = coins * coinUnits; 
    return balancedCoins;
    },
    formatCoinUnits: function(coins, coinSymbol, units){
        if(!coinSymbol){
            coinSymbol = 'crfi';
        }
    const coinUnits = coinSymbol==="crfi" ? 1000000000000 : coinSymbol==="etnx" ? 100000000 : coinSymbol==="etnxp" ? 1000000 : coinSymbol==="etnxc" ? 100 : coinSymbol==="ltnx" ? 100000000 : coinSymbol==="gldx" ? 1000000000000 : units;
    var coinDecimalPlaces = coinUnits.toString().length - 1;
    var balancedCoins = (parseInt(coins || 0) / coinUnits).toFixed(units || coinDecimalPlaces);
    return balancedCoins;
    },
    fillData: function(coinSymbol){      
        if(!coinSymbol){
            coinSymbol = 'crfi';
        }
        var crfiData = this.getCoinData("crfi");
        if(crfiData != null){
            const crfiLockedBalance = this.formatCoinUnits(crfiData.balances.balance, "crfi")
            const crfiBalance = this.formatCoinUnits(crfiData.balances.unlocked_balance, "crfi")
            $("#crfi-wallet").html(crfiData.address);
            console.log(crfiData);
            $("#crfi-balance").html(crfiLockedBalance);
            $("#crfi-unlocked-balance").html(crfiBalance);
            $(".crfi-unlocked-balance").html(crfiBalance);
            $(".claims").html(crfiBalance);
            
            // proto
            PassportPipeline.remoteCallRates("crfi").then((response) => {
            if(response){
                console.log(response); 
                // proto
                console.log("balance USDt/CRFI rate " + response.crystaleum.usd)
                console.log("crystaleum USDt/CRFI value " + crfiBalance * response.crystaleum.usd)
                console.log("crystaleum BTC/CRFI value " + crfiBalance * response.crystaleum.btc)
                console.log("crystaleum ETH/CRFI value " + crfiBalance * response.crystaleum.eth)
                console.log("crystaleum LTC/CRFI value " + crfiBalance * response.crystaleum.ltc)
                let btcRates = crfiBalance * response.crystaleum.btc;
                let usdTrates = crfiBalance * response.crystaleum.usd;
                let ethTrates = crfiBalance * response.crystaleum.eth;
                let ltcTrates = crfiBalance * response.crystaleum.ltc;
                //console.log(currency(usdTrates, { fromCents: true, precision: 0, separator: ',' }).format()); // "123456" => "123456.00" =>  "123,456.00"
                var rateUSDformatCurrency = currency(usdTrates, { symbol: '₮', fromCents: true, precision: 0, separator: ',' }).format(); // "123456" => "123456.00" =>  "123,456.00"
                var rateBTCformatCurrency = currency(btcRates, { symbol: '₿', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateETHformatCurrency = currency(ethTrates, { symbol: 'Ξ', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateLTCformatCurrency = currency(ltcTrates, { symbol: 'Ł', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                // display folio values 
                $("#crfi-usdt-balance").html(rateUSDformatCurrency)
                $("#crfi-btc-balance").html(rateBTCformatCurrency)
                $("#crfi-eth-balance").html(rateETHformatCurrency);
                $("#crfi-ltc-balance").html(rateLTCformatCurrency);
                
                // Confirm state of rates
                PassportPipeline.saveRates(usdTrates, btcRates, ethTrates, ltcTrates, crfiBalance, "crfi");
                if(response.hasOwnProperty("error")){
                    PassportPipeline.performOperation(coinSymbol, ModelViewController.initCoin);
                    return;
                }
            }
        });
    }
        var etnxData = this.getCoinData("etnx");
        if(etnxData != null){
            const etnxLockedBalance = this.formatCoinUnits(etnxData.balances.balance, "etnx")
            const etnxBalance = this.formatCoinUnits(etnxData.balances.unlocked_balance, "etnx")
            $("#etnx-wallet").html(etnxData.address);
            console.log(etnxData);
            $("#etnx-balance").html(etnxLockedBalance);
            $("#etnx-unlocked-balance").html(etnxBalance);
            $(".etnx-unlocked-balance").html(etnxBalance);
            $(".claims").html(etnxBalance);
            
            // proto
            PassportPipeline.remoteCallRates("etnx").then((response) => {
            if(response){
                console.log(response); 
                // proto
                console.log("balance USDt/ETNX rate " + response.electronero.usd)
                console.log("USDt/ETNX value " + etnxBalance * response.electronero.usd)
                console.log("BTC/ETNX value " + etnxBalance * response.electronero.btc)
                console.log("ETH/ETNX value " + etnxBalance * response.electronero.eth)
                console.log("LTC/ETNX value " + etnxBalance * response.electronero.ltc)
                let btcRates = etnxBalance * response.electronero.btc;
                let usdTrates = etnxBalance * response.electronero.usd;
                let ethTrates = etnxBalance * response.electronero.eth;
                let ltcTrates = etnxBalance * response.electronero.ltc;
                //console.log(currency(usdTrates, { fromCents: true, precision: 0, separator: ',' }).format()); // "123456" => "123456.00" =>  "123,456.00"
                var rateUSDformatCurrency = currency(usdTrates, { symbol: '₮', fromCents: true, precision: 0, separator: ',' }).format(); // "123456" => "123456.00" =>  "123,456.00"
                var rateBTCformatCurrency = currency(btcRates, { symbol: '₿', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateETHformatCurrency = currency(ethTrates, { symbol: 'Ξ', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateLTCformatCurrency = currency(ltcTrates, { symbol: 'Ł', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                // display folio values 
                $("#etnx-usdt-balance").html(rateUSDformatCurrency)
                $("#etnx-btc-balance").html(rateBTCformatCurrency)
                $("#etnx-eth-balance").html(rateETHformatCurrency);
                $("#etnx-ltc-balance").html(rateLTCformatCurrency);
                
                // Confirm state of rates
                PassportPipeline.saveRates(usdTrates, btcRates, ethTrates, ltcTrates, etnxBalance, "etnx");
                if(response.hasOwnProperty("error")){
                    PassportPipeline.performOperation(coinSymbol, ModelViewController.initCoin);
                    return;
                }
            }
        });
    }
        var etnxpData = this.getCoinData("etnxp");
        if(etnxpData != null){
            const etnxpLockedBalance = this.formatCoinUnits(etnxpData.balances.balance, "etnxp")
            const etnxpBalance = this.formatCoinUnits(etnxpData.balances.unlocked_balance, "etnxp")
            $("#etnxp-wallet").html(etnxpData.address);
            console.log(etnxpData);
            $("#etnxp-balance").html(etnxpLockedBalance);
            $("#etnxp-unlocked-balance").html(etnxpBalance);
            $(".etnxp-unlocked-balance").html(etnxpBalance);
            $(".claims").html(etnxpBalance);
            
            // proto
            PassportPipeline.remoteCallRates("etnxp").then((response) => {
            if(response){
                console.log(response); 
                // proto
                console.log("balance USDt/ETNXP rate " + response.electroneropulse.usd)
                console.log("electroneropulse USDt/ETNXP value " + etnxpBalance * response.electroneropulse.usd)
                console.log("electroneropulse BTC/ETNXP value " + etnxpBalance * response.electroneropulse.btc)
                console.log("electroneropulse ETH/ETNXP value " + etnxpBalance * response.electroneropulse.eth)
                console.log("electroneropulse LTC/ETNXP value " + etnxpBalance * response.electroneropulse.ltc)
                let btcRates = etnxpBalance * response.electroneropulse.btc;
                let usdTrates = etnxpBalance * response.electroneropulse.usd;
                let ethTrates = etnxpBalance * response.electroneropulse.eth;
                let ltcTrates = etnxpBalance * response.electroneropulse.ltc;
                //console.log(currency(usdTrates, { fromCents: true, precision: 0, separator: ',' }).format()); // "123456" => "123456.00" =>  "123,456.00"
                var rateUSDformatCurrency = currency(usdTrates, { symbol: '₮', fromCents: true, precision: 0, separator: ',' }).format(); // "123456" => "123456.00" =>  "123,456.00"
                var rateBTCformatCurrency = currency(btcRates, { symbol: '₿', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateETHformatCurrency = currency(ethTrates, { symbol: 'Ξ', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateLTCformatCurrency = currency(ltcTrates, { symbol: 'Ł', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                // display folio values 
                $("#etnxp-usdt-balance").html(rateUSDformatCurrency)
                $("#etnxp-btc-balance").html(rateBTCformatCurrency)
                $("#etnxp-eth-balance").html(rateETHformatCurrency);
                $("#etnxp-ltc-balance").html(rateLTCformatCurrency);
                
                // Confirm state of rates
                PassportPipeline.saveRates(usdTrates, btcRates, ethTrates, ltcTrates, etnxpBalance, "etnxp");
                if(response.hasOwnProperty("error")){
                    PassportPipeline.performOperation(coinSymbol, ModelViewController.initCoin);
                    return;
                }
            }
        });
    }
        var ltnxData = this.getCoinData("ltnx");
        if(ltnxData != null){
            const ltnxLockedBalance = this.formatCoinUnits(ltnxData.balances.balance, "ltnx")
            const ltnxBalance = this.formatCoinUnits(ltnxData.balances.unlocked_balance, "ltnx")
            $("#ltnx-wallet").html(ltnxData.address);
            console.log(crfiData);
            $("#ltnx-balance").html(ltnxLockedBalance);
            $("#ltnx-unlocked-balance").html(ltnxBalance);
            $(".ltnx-unlocked-balance").html(ltnxBalance);
            $(".claims").html(ltnxBalance);
            
            // proto
            PassportPipeline.remoteCallRates("ltnx").then((response) => {
            if(response){
                console.log(response); 
                // proto
                console.log("balance USDt/CRFI rate " + response.litenero.usd)
                console.log("USDt/CRFI value " + ltnxBalance * response.litenero.usd)
                console.log("BTC/CRFI value " + ltnxBalance * response.litenero.btc)
                console.log("ETH/CRFI value " + ltnxBalance * response.litenero.eth)
                console.log("LTC/CRFI value " + ltnxBalance * response.litenero.ltc)
                let btcRates = ltnxBalance * response.litenero.btc;
                let usdTrates = ltnxBalance * response.litenero.usd;
                let ethTrates = ltnxBalance * response.litenero.eth;
                let ltcTrates = ltnxBalance * response.litenero.ltc;
                //console.log(currency(usdTrates, { fromCents: true, precision: 0, separator: ',' }).format()); // "123456" => "123456.00" =>  "123,456.00"
                var rateUSDformatCurrency = currency(usdTrates, { symbol: '₮', fromCents: true, precision: 0, separator: ',' }).format(); // "123456" => "123456.00" =>  "123,456.00"
                var rateBTCformatCurrency = currency(btcRates, { symbol: '₿', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateETHformatCurrency = currency(ethTrates, { symbol: 'Ξ', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateLTCformatCurrency = currency(ltcTrates, { symbol: 'Ł', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                // display folio values 
                $("#ltnx-usdt-balance").html(rateUSDformatCurrency)
                $("#ltnx-btc-balance").html(rateBTCformatCurrency)
                $("#ltnx-eth-balance").html(rateETHformatCurrency);
                $("#ltnx-ltc-balance").html(rateLTCformatCurrency);
                
                // Confirm state of rates
                PassportPipeline.saveRates(usdTrates, btcRates, ethTrates, ltcTrates, ltnxBalance, "ltnx");
                if(response.hasOwnProperty("error")){
                    PassportPipeline.performOperation(coinSymbol, ModelViewController.initCoin);
                    return;
                }
            }
        });
    }
        var gldxData = this.getCoinData("gldx");
        if(gldxData != null){
            const gldxLockedBalance = this.formatCoinUnits(gldxData.balances.balance, "gldx")
            const gldxBalance = this.formatCoinUnits(gldxData.balances.unlocked_balance, "gldx")
            $("#gldx-wallet").html(gldxData.address);
            console.log(gldxData);
            $("#gldx-balance").html(gldxLockedBalance);
            $("#gldx-unlocked-balance").html(gldxBalance);
            $(".gldx-unlocked-balance").html(gldxBalance);
            $(".claims").html(gldxBalance);
            
            // proto
            PassportPipeline.remoteCallRates("gldx").then((response) => {
            if(response){
                console.log(response); 
                // proto
                console.log("balance USDt/GLDX rate " + response.goldnero.usd)
                console.log(" USDt/GLDX value " + gldxBalance * response.goldnero.usd)
                console.log(" BTC/GLDX value " + gldxBalance * response.goldnero.btc)
                console.log(" ETH/GLDX value " + gldxBalance * response.goldnero.eth)
                console.log(" LTC/GLDX value " + gldxBalance * response.goldnero.ltc)
                let btcRates = gldxBalance * response.goldnero.btc;
                let usdTrates = gldxBalance * response.goldnero.usd;
                let ethTrates = gldxBalance * response.goldnero.eth;
                let ltcTrates = gldxBalance * response.goldnero.ltc;
                //console.log(currency(usdTrates, { fromCents: true, precision: 0, separator: ',' }).format()); // "123456" => "123456.00" =>  "123,456.00"
                var rateUSDformatCurrency = currency(usdTrates, { symbol: '₮', fromCents: true, precision: 0, separator: ',' }).format(); // "123456" => "123456.00" =>  "123,456.00"
                var rateBTCformatCurrency = currency(btcRates, { symbol: '₿', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateETHformatCurrency = currency(ethTrates, { symbol: 'Ξ', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                var rateLTCformatCurrency = currency(ltcTrates, { symbol: 'Ł', separator: ',' }).format(); // "123456" => "123,456.00" ? Ξ Ł
                // display folio values 
                $("#gldx-usdt-balance").html(rateUSDformatCurrency)
                $("#gldx-btc-balance").html(rateBTCformatCurrency)
                $("#gldx-eth-balance").html(rateETHformatCurrency);
                $("#gldx-ltc-balance").html(rateLTCformatCurrency);
                
                // Confirm state of rates
                PassportPipeline.saveRates(usdTrates, btcRates, ethTrates, ltcTrates, gldxBalance, "gldx");
                if(response.hasOwnProperty("error")){
                    PassportPipeline.performOperation(coinSymbol, ModelViewController.initCoin);
                    return;
                }
            }
        });
    }
    },
    fillHistory: function(coinSymbol){
        if(!coinSymbol){
            coinSymbol = 'crfi';
        }
        var etnxData = ModelViewController.getCoinData("etnx");
        if(etnxData != null){
            if(etnxData.txs.in || etnxData.txs.out){
                ModelViewController.fillHistoryRows("ETNX", "Receive", etnxData.txs.in);
                ModelViewController.fillHistoryRows("ETNX", "Send", etnxData.txs.out);
                console.log(etnxData);
            }
        }
        var etnxpData = ModelViewController.getCoinData("etnxp");
        if(etnxpData != null){
            if(etnxpData.txs.in || etnxpData.txs.out){
                ModelViewController.fillHistoryRows("ETNXP", "Receive", etnxpData.txs.in);
                ModelViewController.fillHistoryRows("ETNXP", "Send", etnxpData.txs.out);
                console.log(etnxpData);
            }
        }
        var ltnxData = ModelViewController.getCoinData("ltnx");
        if (ltnxData != null){
            if (ltnxData.txs.in || ltnxData.txs.out){
                ModelViewController.fillHistoryRows("LTNX", "Receive", ltnxData.txs.in);
                ModelViewController.fillHistoryRows("LTNX", "Send", ltnxData.txs.out);
                (console.log ltnxData);
            }
        }
        var gldxData = ModelViewController.getCoinData("gldx");
        if(crfiData != null){
            if(gldxData.txs.in || gldxData.txs.out){
                ModelViewController.fillHistoryRows("GLDX", "Receive", gldxData.txs.in);
                ModelViewController.fillHistoryRows("GLDX", "Send", gldxData.txs.out);
                console.log(gldxData);
            }
        }
        var crfiData = ModelViewController.getCoinData("crfi");
        if(crfiData != null){
            if(crfiData.txs.in || crfiData.txs.out){
                ModelViewController.fillHistoryRows("CRFI", "Receive", crfiData.txs.in);
                ModelViewController.fillHistoryRows("CRFI", "Send", crfiData.txs.out);
                console.log(crfiData);
            }
        }
    },
    blockchainExplorerLink: function(block, height, txid, coin){
        const secureSocketLayer = 'https://';
        const blockchainLink = PassportPipeline.getBlockchainLink(coin);
        const txidURL = '/tx/' + txid;
        const heightURL = '/block/' + height;
        const operative = block===true ? heightURL : txidURL;
        const blockchainExplorerURL = secureSocketLayer + blockchainLink + operative;

        return blockchainExplorerURL;
    },
    fillHistoryRows: function(coin, type, items){
        var tbody = $("#transaction-history").find('tbody');
        var thisIsVar = ModelViewController.thisIs;
//         if(thisIsVar > 8){
//             $(".row_CRFI").empty();
//         }
        for(var i = 0; i < items.length; i++) {
            var item = items[i];
            ModelViewController.thisIs++;
            console.log("item.height: " + item.height);
            console.log("thisIsVar: " + thisIsVar);
        if(items[4] != undefined){
                if (ModelViewController.thisIs1 == null){
            ModelViewController.thisIs1 = items[0].height;
            console.log(ModelViewController.thisIs1);
                }
                if (ModelViewController.thisIs2 == null){
            ModelViewController.thisIs2 = items[1].height;
            console.log(ModelViewController.thisIs2);
                }
                if (ModelViewController.thisIs3 == null){
            ModelViewController.thisIs3 = items[2].height;
            console.log(ModelViewController.thisIs3);
                }
                if (ModelViewController.thisIs4 == null){
            ModelViewController.thisIs4 = items[3].height;
            console.log(ModelViewController.thisIs4);
                }
                if (ModelViewController.thisIs5 == null){
            ModelViewController.thisIs5 = items[4].height;
            console.log(ModelViewController.thisIs5);
                }
        };
//         if(ModelViewController.thisIs1 != items[1].height && items[0] != undefined){
//             //test ifnot()
//             console.log('New transaction inbound!');
//         } else {
//             console.log("No new transactions");
//         };
            tbody.append( "<tr class='row_" + coin +"'>" +
                            "<td>" + coin + "</td>" + 
                            "<td>" + type + "</td>" + 
                            "<td>" + this.formatCoinUnits(item.amount, coin.toLowerCase()) + "</td>" + 
                            "<td>" + "<a target='_blank' " + "href='"+this.blockchainExplorerLink(true, parseInt(item.height), item.txid, coin.toLowerCase())+" '>" + item.height + "</td>" + 
                            "<td>" + "<a target='_blank' " + "href='"+this.blockchainExplorerLink(false, parseInt(item.height), item.txid, coin.toLowerCase())+" '>" + item.txid + "</a>" + "</td>" + 
                          "</tr>" );
        }
    },
    initCoin: function(coinSymbol){
        console.log("3");
        PassportPipeline.setMethod('getaddr');
        PassportPipeline.loadParams();
        console.log(PassportPipeline.passportParams);
        if(!coinSymbol){
            coinSymbol = 'crfi';
            }        
        console.log("initLevel pre++: " + ModelViewController.coinState);
        console.log("coinstate pre++: " + ModelViewController.coinState);
        ModelViewController.initLevel++;
        ModelViewController.coinState++;
        console.log("initLevel post++: " + ModelViewController.coinState);
        console.log("coinstate post++: " + ModelViewController.coinState);
        PassportPipeline.remoteCall(coinSymbol).then((response) => {
            if(response){
                console.log(response); 
                let passportBalance = JSON.parse(response);
                console.log(passportBalance);
                if(passportBalance.hasOwnProperty("error")){
                    PassportPipeline.performOperation(coinSymbol, ModelViewController.initCoin);
                    return;
                }
                else if(!passportBalance.hasOwnProperty("error")) {
                    ModelViewController.setCoinData(coinSymbol, response);
                    $.event.trigger({
                        type: "init.done",
                        coin: coinSymbol
                    });
                }
            }
        });
    },
    initVerification: function(coinSymbol){
            if(coinSymbol){
                ModelViewController.coinState++
            }

            if(!PassportPipeline.hasValidSession())
            {
                location.href = "verify.html";
            }

            $.event.trigger({
                type: "init.done",
                coin: coinSymbol
            });
    },
    refreshData: function(){
        $("#spinner-modal").modal('show');
        PassportPipeline.loadCode();
        PassportPipeline.performOperation("crfi", ModelViewController.initCoin);
    },
    refreshDataLight: function(){
        PassportPipeline.loadCode();
        PassportPipeline.performOperation("crfi", ModelViewController.initCoin);
    }
};



$(document).on("init.done", function(e){
    console.log(e.type + " - " + e.coin);
    ModelViewController.initLevel++;
    console.log("initLevel post++: " + ModelViewController.initLevel++);
    // ModelViewController.initLevel == 2 means 2 coins loaded properly
    if(ModelViewController.initLevel >= 2){
        $("#spinner-modal").modal('hide');
         
        if(location.pathname.indexOf("login") > -1)
            location.href = location.href.replace("login", "index");
        else
            ModelViewController.fillData();
    }
});

$(document).on("click", "#logout", function(){
    let lightMode =  sessionStorage.getItem("light-mode");
    sessionStorage.clear();
    sessionStorage.setItem("light-mode", lightMode);
    localStorage.clear();
    location.href = "login.html";
});

$(document).on("click", "#light-mode", function(){
    sessionStorage.setItem("light-mode", true);
    $("body").addClass("light");
});

$(document).on("click", "#dark-mode", function(){
    sessionStorage.setItem("light-mode", false);
    $("body").removeClass("light");
});
