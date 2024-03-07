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
    "aria": {
        "sortAscending": ": attivà per trasceglie a culonna in ordine criscente",
        "sortDescending": ": attivà per trasceglie a culonna in ordine scendente"
    },
    "emptyTable": "Nisunu datu dispunibule in u tavulone",
    "info": "Visualisazione di l'elementu _START_ à _END_ nant'à _TOTAL_ elementi",
    "infoEmpty": "Visualisazione di l'elementu 0 à 0 nant'à 0 elementu",
    "infoFiltered": "staccià à partesi da _MAX_ elementi in tutale",
    "infoThousands": ",",
    "lengthMenu": "Mustrà _MENU_ elementi",
    "loadingRecords": "Carcamentu...",
    "paginate": {
        "first": "Prima",
        "last": "Ultimu",
        "next": "Seguente",
        "previous": "Precedente"
    },
    "processing": "Trattamentu...",
    "search": "Circà :",
    "select": {
        "rows": {
            "1": "1 linea selezziunata",
            "_": "%d linee selezziunate"
        }
    },
    "zeroRecords": "Nisunu elementu currispundente trovu"
};
}));
