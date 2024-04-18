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
    "infoThousands": ".",
    "loadingRecords": "Учитавање...",
    "processing": "Обрада...",
    "aria": {
        "sortAscending": ": активирајте да сортирате колону узлазно",
        "sortDescending": ": активирајте да сортирате колону силазно"
    },
    "buttons": {
        "copyTitle": "Kopirano u klipboard",
        "colvis": "Видљивост колона",
        "colvisRestore": "Поврати видљивост",
        "copy": "Копирај",
        "copyKeys": "Притисните &lt;i&gt;ctrl&lt;\/i&gt; или &lt;i&gt;u2318&lt;\/i&gt; + &lt;i&gt;C&lt;\/i&gt; да копирате податке из табеле&lt;br&gt;на ваш клипборд.&lt;br&gt;&lt;br&gt;Да откажете, кликните на ову поруку или стисните тастер \"escape\".",
        "copySuccess": {
            "_": "Копирано %ds ред(ова) у клипборд",
            "1": "Копиран 1 ред у клипборд"
        },
        "pageLength": {
            "_": "Прикажи %d редова",
            "-1": "Прикажи све редове"
        },
        "removeState": "Уклони",
        "print": "Штампај",
        "renameState": "Преименуј",
        "savedStates": "Сачувана стања",
        "updateState": "Ажурирај",
        "csv": "CSV",
        "excel": "Ексел",
        "pdf": "PDF"
    },
    "autoFill": {
        "cancel": "Откажи",
        "fill": "Попуни све  <i>%d<\/i>",
        "fillHorizontal": "Попуни ћелије хоризонтално",
        "fillVertical": "Попуни ћелије вертикално"
    },
    "datetime": {
        "hours": "Сат",
        "minutes": "Минут",
        "months": {
            "0": "Јануар",
            "1": "Фебруар",
            "10": "Новембар",
            "11": "Децембар",
            "2": "Март",
            "3": "Април",
            "4": "Мај",
            "5": "Јун",
            "6": "Јул",
            "7": "Август",
            "8": "Септембар",
            "9": "Октобар"
        },
        "next": "Следећи",
        "previous": "Претходни",
        "seconds": "Секунда",
        "unknown": "-",
        "weekdays": [
            "Нед",
            "Пон",
            "Уто",
            "Сре",
            "Чет",
            "Пет",
            "Суб"
        ]
    },
    "editor": {
        "close": "Затвори",
        "create": {
            "button": "Ново",
            "submit": "Направи",
            "title": "Направите нови унос"
        },
        "edit": {
            "button": "Измени",
            "submit": "Измени",
            "title": "Измени унос"
        },
        "remove": {
            "button": "Обриши"
        }
    },
    "emptyTable": "Нема података у табели.",
    "info": "Приказано _START_ до _END_ од _TOTAL_ уноса",
    "infoEmpty": "Приказано 0 до 0 од 0 уноса",
    "infoFiltered": "филтрирано од укупно _MAX_ уноса",
    "lengthMenu": "Прикажи _MENU_ уноса",
    "search": "Претрага:",
    "thousands": ",",
    "zeroRecords": "Није пронађен ниједан одговарајући запис",
    "paginate": {
        "first": "Прва",
        "last": "Последња",
        "next": "Следећа",
        "previous": "Претходна"
    },
    "searchBuilder": {
        "add": "Додај услов",
        "clearAll": "Почисти све",
        "condition": "Услов",
        "logicAnd": "И",
        "logicOr": "ИЛИ",
        "value": "Вредност"
    },
    "searchPanes": {
        "clearMessage": "Уклони филтере",
        "collapseMessage": "Затвори све",
        "emptyPanes": "Није пронађен ниједан запис",
        "loadMessage": "Учитавање...",
        "showMessage": "Прикажи све",
        "title": "Активни филтери - %d"
    }
};
}));
