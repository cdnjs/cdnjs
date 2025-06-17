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
        "sortAscending": ": устунни қийматлар ўсиши бўйича тартиблаш",
        "sortDescending": ": устунни қийматлар камайиши бўйича тартиблаш"
    },
    "autoFill": {
        "cancel": "Бекор қил",
        "fill": "Ҳамма катакни <i>%d<\/i> билан тўлдириш",
        "fillHorizontal": "Катакларни горизонтал тўлдириш",
        "fillVertical": "Катакларни вертикал тўлдириш"
    },
    "buttons": {
        "colvis": "Устунларни кўрсатиш ",
        "colvisRestore": "Кўрсатиш қайта тиклаш",
        "copy": "Кўчириш"
    },
    "datetime": {
        "hours": "Соат",
        "minutes": "Минут",
        "next": "кейинги",
        "previous": "аввалги",
        "seconds": "секунд",
        "unknown": "-"
    },
    "decimal": ".",
    "editor": {
        "close": "Ёпиш",
        "create": {
            "button": "Янги",
            "submit": "Янги элементни сақлаш",
            "title": "Янги элемент қўшиш"
        },
        "edit": {
            "button": "Ўзгартириш",
            "submit": "Ўзгаришларни сақлаш",
            "title": "Элементни ўзгартириш"
        },
        "error": {
            "system": "Тизимда ҳатолик юз берди"
        },
        "multi": {
            "title": "кўп қиймат киритилган"
        },
        "remove": {
            "button": "Ўчириш",
            "confirm": {
                "_": "Сиз %d та сатрни ўчиришга розимисиз?",
                "1": "Сиз битта сатрни ўчиришга розимисиз?"
            },
            "submit": "Ўчириш",
            "title": "Элементни ўчириш"
        }
    },
    "emptyTable": "Жадвал бўш",
    "info": "(_START_- _END_) жами: _TOTAL_",
    "infoEmpty": "бўш",
    "infoFiltered": "_MAX_ та сатрдан фильтрланди",
    "infoThousands": "  ",
    "lengthMenu": "_MENU_ та сатр кўринсин",
    "loadingRecords": "Юкланмоқда...",
    "paginate": {
        "first": "Дастлабки",
        "last": "Оҳирги",
        "next": "Кейинги",
        "previous": "Аввалги"
    },
    "processing": "Бажарилмоқда...",
    "search": "Қидириш:",
    "searchBuilder": {
        "add": "Янги",
        "button": {
            "_": "Қидириш шартлари(%d та)",
            "0": "Қидириш шартлари"
        },
        "clearAll": "Тозалаш",
        "condition": "Шарт",
        "conditions": {
            "array": {
                "contains": "қатнашган",
                "empty": "бўш",
                "equals": "тенг",
                "not": "тескариси",
                "notEmpty": "бўш эмас",
                "without": "қатнашмаган"
            },
            "date": {
                "after": "дан кейин",
                "before": "дан олдин",
                "between": "оралиғида",
                "empty": "киритилмаган",
                "equals": "баробар",
                "not": "тескариси",
                "notBetween": "оралиғида эмас",
                "notEmpty": "бўш эмас"
            },
            "number": {
                "between": "орасида",
                "empty": "киритилмаган",
                "equals": "баробар",
                "gt": "дан катта",
                "gte": "дан катта ёки тенг",
                "lt": "дан кичик",
                "lte": "дан кичик ёки тенг",
                "not": "тескариси",
                "notBetween": "оралиғида эмас",
                "notEmpty": "бўш эмас"
            },
            "string": {
                "contains": "қатнашган",
                "empty": "бўш",
                "endsWith": "билан тугаган",
                "equals": "тенг",
                "not": "тескариси",
                "notEmpty": "бўш эмас",
                "startsWith": "дан бошланади"
            }
        },
        "data": "Маълумот",
        "deleteTitle": "Фильтр шартларини ўчириш",
        "logicAnd": "Ва",
        "logicOr": "Ёки",
        "title": {
            "_": "Қидириш шартлари(%d та)",
            "0": "Қидириш шартлари"
        },
        "value": "Қиймат"
    },
    "searchPanes": {
        "clearMessage": "Тозалаш",
        "collapse": {
            "_": "Қидириш панели (%d)",
            "0": "Қидириш панели"
        },
        "count": "Миқдор",
        "emptyPanes": "Қидириш панели йўқ",
        "loadMessage": "Қидириш панели юкланмоқда...",
        "title": "Фаол фильтр - %d"
    },
    "select": {
        "cells": {
            "_": "%d катак танланди",
            "1": "1 катак танланди"
        },
        "columns": {
            "_": "%d та устун танланди",
            "1": "1 та устун танланди"
        },
        "rows": {
            "_": "%d та сатр танланди",
            "1": "1 та сатр танланди"
        }
    },
    "thousands": " ",
    "zeroRecords": "топилмади"
};
}));
