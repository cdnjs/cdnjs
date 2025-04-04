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
        "cancel": "batal",
        "fill": "tambah sedoyo sell",
        "fillHorizontal": "tambah sell mlumah",
        "fillVertical": "tambah sell ngaceng"
    },
    "buttons": {
        "copy": "nyalin",
        "collection": "koleksi",
        "colvis": "kolum ingkang ketok"
    },
    "datetime": {
        "hours": "jam",
        "minutes": "menit",
        "next": "terus",
        "seconds": "detik",
        "previous": "sakderenge",
        "unknown": "mboten dikenal"
    },
    "emptyTable": "mbonten wonten datanipun",
    "decimal": ".",
    "infoEmpty": "nunjukakan kosong",
    "infoFiltered": "sampun kesaring",
    "lengthMenu": "sedoso",
    "loadingRecords": "saweg mikir",
    "paginate": {
        "first": "ndisik",
        "last": "kemper",
        "next": "terus",
        "previous": "maju"
    },
    "processing": "saweg mikir",
    "search": "madosi",
    "searchBuilder": {
        "add": "Tambah Kondisi",
        "clearAll": "Busek Kabeh",
        "condition": "Kondisi",
        "data": "Data",
        "leftTitle": "judulKiwo",
        "value": "nilai"
    },
    "searchPanes": {
        "clearMessage": "busek kabeh",
        "collapseMessage": "pesenAmbyar",
        "showMessage": "pesenCendak",
        "title": "judul"
    },
    "searchPlaceholder": "papan kagem madosi",
    "stateRestore": {
        "emptyError": "salahKosong",
        "removeConfirm": "pindahKonfirmasi",
        "renameTitle": "gantiJudul"
    },
    "thousands": ".",
    "zeroRecords": "mboten wonten data ingkang dipun padosi"
};
}));
