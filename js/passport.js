var PassportPipeline = {

    passportParams: { method: '',
                    timestamp: '',
                    date: '',
                    telegramID: '',
                    telegramUsername: '',
                    username: '',
                    email: '',
                    password: '',
                    code: '',
                    uid: '',
                    name: '',
                    addr: '',
                    pid: '',
                    receiver: '',
                    txid: '',
                    link: '',
                    notes: '',
                    bounty_id: '',
                    address: '',  
                    secret: '',
                    unlocked_balance: 0, 
                    locked_balance: 0,
                    coinAPIurl: ""
    },

    etnxApi: 'https://pulse.electronero.org/api-etnx/api.php',
    ltnxApi: 'https://pulse.electronero.org/ltnx-api/api.php',
    etnxpApi: 'https://pulse.electronero.org/etnxp-api/api.php',
    etnxcApi: 'https://pulse.electronero.org/etnxp-api/api.php',

    saveParams: function(){
        localStorage.setItem("params", JSON.stringify(this.passportParams));
    },

    loadParams: function(){
        this.passportParams = JSON.parse(localStorage.getItem("params"));
    },

    remoteCall: function(){
        if(location.hostname.indexOf("electronero.org") >= 0){
            return $.ajax({
                url: this.passportParams.coinAPIurl,
                type: 'POST',
                cache: false,
                data: this.passportParams
            });
        }
        else{
            return Passport.simulate(this.passportParams);
        }
    },

    setCredentials: function(email, password, code){
        this.passportParams.username = email;
        this.passportParams.email = email;
        this.passportParams.password = password;
        this.passportParams.code = code;
        this.saveParams();
    },

    performOperation: function(coinSymbol, operationCallback){
        this.passportParams.method = 'login';
        this.passportParams.coinAPIurl = this.getPassportApi(coinSymbol);
        this.passportParams.uid = null;

        this.remoteCall().then((response) => {
            console.log(this.passportParams);
            if(response){
                let passportLogin = JSON.parse(response);
                if(passportLogin.hasOwnProperty("error")){
                    loginFail();
                    return;
                }
                console.log(passportLogin); 
                this.passportParams.uid = passportLogin.data.uid;
                this.passportParams.method = 'check_code';
                this.remoteCall().then((response) => {
                    if(response){
                        console.log(response); 
                        let passportCheckCode = JSON.parse(response);
                        if(passportCheckCode.hasOwnProperty("error")){
                            loginCodeFail();
                            return;
                        }

                        operationCallback(coinSymbol);
                    }
                });
            }
        });
    },

    getPassportApi: function(coinSymbol){
        if(coinSymbol === "etnx")
        return  this.etnxApi;

        if(coinSymbol === "ltnx")
        return  this.ltnxApi;

        if(coinSymbol === "etnxp")
        return  this.etnxpApi;

        if(coinSymbol === "etnxc")
        return  this.etnxcApi;
    }
};

var jsonLogin = {"status":"success","data":{"uid":"1","password":"test"}};

var jsonLoginError = {"error": "fail"};

var jsonGetAddr = {
        "address":"88owYM3JXB5i8zT9pzcNGkhC3LmFCehSsdnnLZi995cSTeRPzHwXoXgdKD39NpErU8E2zmNjyoK7BV7DQ4e8ntm17UsNw1W",
        "balances":
            {"balance":123456789, "multisig_import_needed":false, "unlocked_balance":4567890
        },
        "txs":{
            "in": [ { "amount" : 1200,
                        "height" : 1234561,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234562,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234563,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" } ],
            "out": [ { "amount" : 1200,
                        "height" : 1234564,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234565,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" },
                        {"amount" : 1200,
                        "height" : 1234566,
                        "txid" : "5516752caac1ad451ad87c4cd5972d44ef6a80535e0218b3ad1507bc0135c52f" }],
        },"imports":[],"contracts":[]};

var Passport = {
    simulate: function(data){
        if(data.method == 'login'){
            if(data.password != "qwerty")
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLoginError)); }, 1000);
                });
            else
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
                });
        }
        else if(data.method == 'check_code'){
            if(data.code != "12345")
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLoginError)); }, 1000);
                });
            else
                return new Promise((resolve, reject) => {
                    setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 1000);
                });
        }
        else if(data.method == 'getaddr')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonGetAddr)); }, 250);
            });
        else if(data.method == 'register')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 250);
            });
        else if(data.method == 'send')
            return new Promise((resolve, reject) => {
                setTimeout(function() { resolve(JSON.stringify(jsonLogin)); }, 250);
            });
        
        return new Promise((resolve, reject) => {
            reject("Method not supported");
        });
    }
};