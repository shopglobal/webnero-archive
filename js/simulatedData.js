var jsonLogin = {"status":"success","data":{"uid":"1","password":"test"}};

var jsonGetAddr = {
        "address":"88owYM3JXB5i8zT9pzcNGkhC3LmFCehSsdnnLZi995cSTeRPzHwXoXgdKD39NpErU8E2zmNjyoK7BV7DQ4e8ntm17UsNw1W",
        "balances":
            {"balance":123456789, "multisig_import_needed":false, "unlocked_balance":4567890
        },
        "txs":[],"imports":[],"contracts":[]};

var MobWallet = {
    etnxApi: function(data, apiUrl){
        if(data.method == 'login'){
            if(data.password != "qwe")
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(null); }, 250);
                });
            else
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 250);
                });
        }
        else if(data.method == 'balance')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonGetAddr)); }, 250);
            });
        
        return new Promise((resolve, reject) => {
            reject("Method not supported");
        });
    },
    etnxpApi: function(data, apiUrl){
        if(data.method == 'login'){
            if(data.password != "qwe")
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(null); }, 250);
                });
            else
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 250);
                });
        }
        else if(data.method == 'balance')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonGetAddr)); }, 250);
            });
        
        return new Promise((resolve, reject) => {
            reject("Method not supported");
        });
    }
};