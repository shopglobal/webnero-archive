var MobWallet = {
    etnxApi: function(form, apiUrl){

        return $.ajax({
                    url: apiUrl,
                    type: 'POST',
                    cache: false,
                    data: form
                });
    },
    etnxpApi: function(form, apiUrl){
        
        return $.ajax({
            url: apiUrl,
            type: 'POST',
            cache: false,
            data: form
        });
    }
};