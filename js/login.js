$(document).on("click", "#login", function(){
    loginUserData.method = 'login';
    MobWallet.etnxpApi(loginUserData,loginUserData.coinAPIurl).then((result) => {
        if(result){
            console.log(result); 
            var etnxpLogin = JSON.parse(result);
            if(etnxpLogin.status == "success"){
                loginUserData.method = 'balance';
                MobWallet.etnxpApi(loginUserData,loginUserData.coinAPIurl).then((result) => {
                    if(result){
                        console.log(result); 
                        ModelViewController.setEtnxpBalance(result);
                        $.event.trigger({
                            type: "init.done",
                            coin: "etnxp"
                        });
                    }
                });
            }
        }
    });

    MobWallet.etnxApi(loginUserData,loginUserData.coinAPIurl).then((result) => {
        if(result){
            console.log(result); 
            var etnxpLogin = JSON.parse(result);
            if(etnxpLogin.status == "success"){
                loginUserData.method = 'balance';
                MobWallet.etnxApi(loginUserData,loginUserData.coinAPIurl).then((result) => {
                    if(result){
                        console.log(result); 
                        ModelViewController.setEtnxBalance(result);
                        $.event.trigger({
                            type: "init.done",
                            coin: "etnx"
                        });
                    }
                });
            }
        }
    });    
});