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
    "autoFill": {
        "fill": "Doldurmak"
    },
    "infoPostFix": "Jemi _TOTAL_ ýazgydan _START_ -den _END_  çenli ýazgylar",
    "lengthMenu": "_MENU_ ýazgyny görkezmek",
    "loadingRecords": "Ýüklenýär",
    "paginate": {
        "first": "Birinji",
        "last": "Soňky",
        "next": "Indiki",
        "previous": "Öňki"
    },
    "processing": "Işlenýär",
    "search": "Gözleg",
    "zeroRecords": "Maglumat tapylmady",
    "datetime": {
        "previous": "Öňki",
        "next": "Indiki",
        "hours": "Sagat",
        "minutes": "minut",
        "seconds": "sekund",
        "weekdays": [
            "Du",
            "Si",
            "Çar",
            "Pen",
            "Anna",
            "Şen",
            "Ýek"
        ]
    },
    "editor": {
        "close": "Ýapmak",
        "create": {
            "button": "Täze"
        }
    },
    "emptyTable": "Maglumat ýok",
    "info": "Jemi _TOTAL_ ýazgydan _START_ -den _END_  çenli ýazgylar",
    "infoEmpty": "Jemi 0 ýazgydan 0 -den 0  çenli ýazgylar"
};
}));
