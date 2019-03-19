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
                    balance: 0,
                    locked_balance: 0,
                    coinAPIurl: ""
    },

    myCipher: Crypto.encryptData(Crypto.salt()),
    myDecipher: Crypto.decryptData(Crypto.salt()),

    etnxApi: 'https://pulse.electronero.org/api-etnx/api.php',
    ltnxApi: 'https://pulse.electronero.org/ltnx-api/api.php',
    etnxpApi: 'https://pulse.electronero.org/etnxp-api/api.php',
    etnxcApi: 'https://pulse.electronero.org/etnxc-api/api.php',

    saveParams: function(){
        // Then cipher any sensitive data
        // Store Session
        sessionStorage.setItem("username", this.myCipher(this.passportParams.username));
        sessionStorage.setItem("password", this.myCipher(this.passportParams.password));
        //sessionStorage.setItem("code", this.myCipher(this.passportParams.code));
        //sessionStorage.setItem(coinSymbol+"_uuid", this.myCipher(passportLogin.data.uid));
        
        console.log(this.myCipher(this.passportParams.username))   // --> "7c606d287b6d6b7a6d7c287b7c7a61666f"
        console.log(this.myCipher(this.passportParams.password))
        //console.log(myCipher(this.passportParams.data.uid))
    },

    loadParams: function(){
        // Read only persistent data needed
        this.passportParams.username = this.myDecipher(sessionStorage.username);
        this.passportParams.email = this.myDecipher(sessionStorage.username);
        this.passportParams.password = this.myDecipher(sessionStorage.password);
    },
    remoteCall: function(coinSymbol){
        return $.ajax({
                    url: this.getPassportApi(coinSymbol),
                    type: 'POST',
                    cache: false,
                    data: this.passportParams
                });
    },
    
    remoteCall_simulation: function(coinSymbol){
        if(window.location.hostname.indexOf("electronero.org")){
            return $.ajax({
                url: this.getPassportApi(coinSymbol),
                type: 'POST',
                cache: false,
                data: this.passportParams
            });
        }
        else{
            return Passport.simulate(this.passportParams);
        }
    },

    setCredentials: function(email, password){
        this.passportParams.username = email;
        this.passportParams.email = email;
        this.passportParams.password = password;
        this.saveParams();
    },

    setCode: function(code){
        this.passportParams.code = code;
    },

    performOperation: function(coinSymbol, operationCallback){
        this.loadParams();
        
        this.passportParams.method = 'login';
        this.passportParams.coinAPIurl = this.getPassportApi(coinSymbol);
        this.passportParams.uid = null;

        this.remoteCall(coinSymbol).then((response) => {
            console.log(this.passportParams);
            if(response){
                let passportLogin = JSON.parse(response);
                if(passportLogin.hasOwnProperty("error")){
                    loginFail();
                    return;
                }
                console.log(passportLogin); 
                this.passportParams.uid = passportLogin.data.uid;
                sessionStorage.setItem(coinSymbol+"_uuid", this.myCipher(passportLogin.data.uid));
                this.passportParams.method = 'check_code';
                this.remoteCall(coinSymbol).then((response) => {
                    if(response){
                        console.log(response); 
                        let passportCheckCode = JSON.parse(response);
                        if(passportCheckCode.hasOwnProperty("error")){
                            loginCodeFail();
                            return;
                        }
                        ModelViewController.initCoin(operationCallback);
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
