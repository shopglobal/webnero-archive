var MobWallet = {
    etnxApi: function(form, apiUrl){
        console.log(form)

        return $.ajax({
                    url: apiUrl,
                    type: 'POST',
                    cache: false,
                    data: form
                });
    },
    etnxpApi: function(form, apiUrl){
        console.log(form)
        
        return $.ajax({
            url: apiUrl,
            type: 'POST',
            cache: false,
            data: form
        });
    }
};
