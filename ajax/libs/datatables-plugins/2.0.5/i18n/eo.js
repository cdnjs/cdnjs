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
    "emptyTable": "Neniuj datumoj en tabelo",
    "info": "Montras _START_ ĝis _END_ el _TOTAL_ vicoj",
    "infoEmpty": "Montras 0 ĝis 0 el 0 vicoj",
    "infoFiltered": "(filtrita el entute _MAX_ vicoj)",
    "infoThousands": ".",
    "lengthMenu": "Montri _MENU_ vicojn",
    "loadingRecords": "Ŝarĝas ...",
    "processing": "Pretigas ...",
    "search": "Serĉi:",
    "zeroRecords": "Neniuj rezultoj trovitaj",
    "paginate": {
        "first": "Unua",
        "last": "Lasta",
        "next": "Venonta",
        "previous": "Antaŭa"
    },
    "aria": {
        "sortAscending": ": aktivigi por filtri kolumnon kreskante",
        "sortDescending": ": aktivigi por filtri kolumnon malkreskante"
    }
};
}));
