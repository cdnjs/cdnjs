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
    "processing": "Próiseáil...",
    "lengthMenu": "Taispeáin iontrálacha _MENU_",
    "zeroRecords": "Gan aon taifead meaitseáil aimsithe",
    "info": "_START_ Showing a _END_ na n-iontrálacha  _TOTAL_",
    "infoEmpty": "Showing 0-0 na n-iontrálacha  0",
    "infoFiltered": "(scagtha ó _MAX_ iontrálacha iomlán)",
    "search": "Cuardaigh:",
    "paginate": {
        "first": "An Chéad",
        "previous": "Roimhe Seo",
        "next": "Ar Aghaidh",
        "last": "Last"
    }
};
}));
