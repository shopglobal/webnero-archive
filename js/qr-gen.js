(function() {
	var etnxData = ModelViewController.getEtnxData();
    var etnxpData = ModelViewController.getEtnxpData();
	if(etnxData != null){
    (function() {

        var $value_etnx = document.querySelector('main p [name="etnx-value"]');
        var qr = window.qr = new QRious({
            element: document.getElementById('qrious-etnx'),
            size: 250,
            value: $value_etnx
        });

        $value_etnx = etnxData.address;
    })();
}
	if (etnxpData != null) {
    (function() {
        var $value_etnxp = document.querySelector('main p [name="etnxp-value"]');

        var qr2 = window.qr2 = new QRious({
            element: document.getElementById('qrious-etnxp'),
            size: 250,
            value: $value_etnxp
        });

        $value_etnxp = etnxpData.address;
    })();
}
})();
