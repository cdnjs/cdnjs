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
    "processing": "Процесирање...",
    "lengthMenu": "Прикажи _MENU_ записи",
    "zeroRecords": "Не се пронајдени записи",
    "emptyTable": "Нема податоци во табелата",
    "loadingRecords": "Вчитување...",
    "info": "Прикажани _START_ до _END_ од _TOTAL_ записи",
    "infoEmpty": "Прикажани 0 до 0 од 0 записи",
    "infoFiltered": "(филтрирано од вкупно _MAX_ записи)",
    "search": "Барај",
    "paginate": {
        "first": "Почетна",
        "previous": "Претходна",
        "next": "Следна",
        "last": "Последна"
    },
    "buttons": {
        "copySuccess": {
            "1": "Еден ред е копиран во складот",
            "_": "Копирани се %ds редови во складот"
        },
        "excel": "excel",
        "pdf": "pdf",
        "print": "Печати"
    },
    "aria": {
        "sortAscending": "сортирај ја табелата по растечки редослед",
        "sortDescending": "сортирај ја табелата по опаѓачки редослед"
    },
    "autoFill": {
        "cancel": "Откажи",
        "fill": "Пополни ги сите келии со <i>$d<\/i>",
        "fillHorizontal": "Пополни ги хоризонталните ќелии",
        "fillVertical": "Пополни ги вертикалните ќелии"
    }
};
}));
