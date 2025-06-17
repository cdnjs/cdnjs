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
    "processing": "Күте тұрыңыз...",
    "search": "Іздеу:",
    "lengthMenu": "Жазбалар  _MENU_ көрсету",
    "info": "_TOTAL_ жазбалары бойынша _START_ бастап _END_ дейінгі жазбалар",
    "infoEmpty": "0 жазбалары бойынша 0 бастап 0 дейінгі жазбалар",
    "infoFiltered": "(_MAX_ жазбасынан сұрыпталды)",
    "loadingRecords": "Жазбалар жүктемесі...",
    "zeroRecords": "Жазбалар жоқ",
    "emptyTable": "Кестеде деректер жоқ",
    "paginate": {
        "first": "Бірінші",
        "previous": "Алдыңғысы",
        "next": "Келесі",
        "last": "Соңғы"
    },
    "aria": {
        "sortAscending": ": өсімі бойынша бағанды сұрыптау үшін активациялау",
        "sortDescending": ": кемуі бойынша бағанды сұрыптау үшін активациялау"
    },
    "autoFill": {
        "cancel": "Доғару",
        "fill": "Толықтыру",
        "fillHorizontal": "Көлденең толтыру",
        "fillVertical": "Тігінен толтыру"
    },
    "buttons": {
        "colvis": "Баған көрнісі",
        "colvisRestore": "Қалпына келтіру",
        "copy": "Нұсқалау"
    }
};
}));
