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
    "processing": "Интизор шавед...",
    "search": "Ҷустуҷӯ:",
    "lengthMenu": "Намоиши сабтҳои _MENU_",
    "info": "Сабтҳо аз _START_ то _END_ аз _TOTAL_ сабтҳо",
    "infoEmpty": "Сабтҳо аз 0 то 0 аз 0 сабтҳо",
    "infoFiltered": "(филтр карда шудааст аз _MAX_ сабтҳо)",
    "loadingRecords": "Боргирии сабтҳо...",
    "zeroRecords": "Сабтҳо вуҷуд надорад.",
    "emptyTable": "Дар ҷадвал маълумот нест",
    "paginate": {
        "first": "Якум",
        "previous": "Ба қафо",
        "next": "Ба пеш",
        "last": "Охирон"
    },
    "aria": {
        "sortAscending": ": фаъолкунӣ барои ҷобаҷогузории сатрҳо аз рӯи бисёршавӣ",
        "sortDescending": ": фаъолкунӣ барои ҷобаҷогузории сатрҳо аз рӯи камшавӣ"
    },
    "select": {
        "rows": {
            "_": "Сабтҳо интихобшуда: %d",
            "1": "Як сабт интихоб шудааст"
        }
    }
};
}));
