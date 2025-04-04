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
    "emptyTable": "Таблицада эч кандай берилиш жок",
    "info": "Жалпы _TOTAL_ саптын ичинен _START_-саптан _END_-сапка чейинкилер",
    "infoEmpty": "Жалпы 0 саптын ичинен 0-саптан 0-сапка чейинкилер",
    "infoFiltered": "(жалпы _MAX_ саптан фильтрленди)",
    "infoThousands": " ",
    "lengthMenu": "_MENU_ саптан көрсөт",
    "loadingRecords": "Жүктөлүүдө...",
    "processing": "Иштеп жатат...",
    "search": "Издөө:",
    "zeroRecords": "Туура келген бир да сап жок",
    "paginate": {
        "first": "Биринчи",
        "last": "Акыркы",
        "next": "Кийинки",
        "previous": "Мурунку"
    },
    "aria": {
        "sortAscending": ": иретте",
        "sortDescending": ": тескери иретте"
    }
};
}));
