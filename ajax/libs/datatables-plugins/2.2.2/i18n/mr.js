(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( [], factory);
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = factory();
	}
	// No browser loader - use JSON, ESM, CJS or AMD
}
(function() {
    return {
    "decimal": ".",
    "emptyTable": "नोंदी मिळाल्या नाहीत ",
    "info": "_TOTAL_ पैकी  _START_ ते _END_ नोंदी दाखवत आहोत ",
    "infoEmpty": "0 पैकी  0 ते 0 नोंदी दाखवत आहोत ",
    "infoFiltered": "एकूण _MAX_ नोंदींमधून मधून निवडलेल्या",
    "lengthMenu": "_MENU_ नोंदी दाखवा",
    "loadingRecords": "लोड होत आहेत ...",
    "processing": "प्रगतीपथावर",
    "search": "शोधा: ",
    "thousands": ",",
    "zeroRecords": "जुळणाऱ्या नोंदी मिळाल्या नाहीत"
};
}));
