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
    "emptyTable": "Inga data tilgjengeleg i tabellen",
    "info": "Syner _START_ til _END_ av _TOTAL_ linjer",
    "infoEmpty": "Syner 0 til 0 av 0 linjer",
    "infoFiltered": "(filtrert frå _MAX_ totalt antal linjer)",
    "infoThousands": " ",
    "loadingRecords": "Lastar...",
    "lengthMenu": "Syn _MENU_ linjer",
    "processing": "Lastar...",
    "search": "S&oslash;k:",
    "zeroRecords": "Inga linjer treff p&aring; s&oslash;ket",
    "paginate": {
        "first": "Fyrste",
        "next": "Neste",
        "last": "Siste",
        "previous": "Førre"
    },
    "aria": {
        "sortAscending": ": aktiver for å sortere kolonna stigande",
        "sortDescending": ": aktiver for å sortere kolonna synkande"
    }
};
}));
