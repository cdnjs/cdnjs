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
    "emptyTable": "Dim data ar gael yn y tabl",
    "info": "Dangos _START_ i _END_ o _TOTAL_ cofnod",
    "infoEmpty": "Dangos 0 i 0 o 0 cofnod",
    "infoFiltered": "(wedi hidlo o gyfanswm o _MAX_ cofnod)",
    "infoThousands": ",",
    "lengthMenu": "Dangos _MENU_ cofnod",
    "loadingRecords": "Wrthi'n llwytho...",
    "processing": "Wrthi'n prosesu...",
    "search": "Chwilio:",
    "zeroRecords": "Heb ddod o hyd i gofnodion sy'n cyfateb",
    "paginate": {
        "first": "Cyntaf",
        "last": "Olaf",
        "next": "Nesaf",
        "previous": "Blaenorol"
    },
    "aria": {
        "sortAscending": ": rhoi ar waith i drefnu colofnau o'r lleiaf i'r mwyaf",
        "sortDescending": ": rhoi ar waith i drefnu colofnau o'r mwyaf i'r lleiaf"
    }
};
}));
