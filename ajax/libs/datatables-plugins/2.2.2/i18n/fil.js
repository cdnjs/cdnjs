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
    "processing": "Pagproseso...",
    "lengthMenu": "Ipakita _MENU_ entries",
    "zeroRecords": "Walang katugmang  mga talaan  na natagpuan",
    "info": "Ipinapakita ang  _START_  sa _END_ ng _TOTAL_ entries",
    "infoEmpty": "Ipinapakita ang 0-0 ng 0 entries",
    "infoFiltered": "(na-filter mula _MAX_ kabuuang entries)",
    "search": "Paghahanap:",
    "paginate": {
        "first": "Unang",
        "previous": "Nakaraan",
        "next": "Susunod",
        "last": "Huli"
    }
};
}));
