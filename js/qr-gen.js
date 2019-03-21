(function() {
	// etnx
	var etnxData = ModelViewController.getEtnxData();
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
	// etnxp
	var etnxpData = ModelViewController.getEtnxpData();
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
	// etnxc
	var etnxcData = ModelViewController.getEtnxcData();
	if (etnxcData != null) {
    (function() {
        var $value_etnxc = document.querySelector('main p [name="etnxc-value"]');

        var qr2 = window.qr2 = new QRious({
            element: document.getElementById('qrious-etnxc'),
            size: 250,
            value: $value_etnxc
        });

        $value_etnxc = etnxcData.address;
    })();
}
	// ltnx
	var ltnxData = ModelViewController.getLtnxData();
	if (ltnxData != null) {
    (function() {
        var $value_ltnx = document.querySelector('main p [name="ltnx-value"]');

        var qr2 = window.qr2 = new QRious({
            element: document.getElementById('qrious-ltnx'),
            size: 250,
            value: $value_ltnx
        });

        $value_ltnx = ltnxData.address;
    })();
}
	//
})();
