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
    "processing": "Palun oodake, koostan kuvamiseks nimekirja!",
    "lengthMenu": "N&auml;ita kirjeid _MENU_ kaupa",
    "zeroRecords": "Otsitavat vastet ei leitud.",
    "info": "Kuvatud: _TOTAL_ kirjet (_START_-_END_)",
    "infoEmpty": "Otsinguvasteid ei leitud",
    "infoFiltered": " - filteeritud _MAX_ kirje seast.",
    "search": "Otsi k&otilde;ikide tulemuste seast:",
    "paginate": {
        "first": "Algus",
        "previous": "Eelmine",
        "next": "J&auml;rgmine",
        "last": "Viimane"
    },
    "aria": {
        "sortAscending": ": sorteeri kasvavalt",
        "sortDescending": ": sorteeri kahanevalt"
    },
    "autoFill": {
        "cancel": "Tühista"
    },
    "buttons": {
        "copy": "Kopeeri",
        "copyKeys": "Vajuta CTRL või u2318 + C et kopeerida tabeli sisu lõikelauale<br \/><br \/>Tühistamiseks kliki sellel sõnumil või vajutage ESC.",
        "copyTitle": "Kopeeri lõikelauale",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "_": "Kuvan %d rida",
            "-1": "Kuva kõik read",
            "1": "Kuvan ühte rida"
        },
        "pdf": "PDF",
        "print": "Prindi"
    },
    "datetime": {
        "amPm": [
            "AM",
            "PM"
        ],
        "hours": "Tund",
        "minutes": "Minut",
        "months": {
            "0": "Jaanuar",
            "1": "Veebruar",
            "10": "November",
            "11": "Detsember",
            "2": "Märts",
            "3": "Aprill",
            "4": "Mai",
            "5": "Juuni",
            "6": "Juuli",
            "7": "August",
            "8": "September",
            "9": "Oktoober"
        },
        "next": "Järgmine",
        "previous": "Eelmine",
        "seconds": "Sekund",
        "unknown": "Teadmata",
        "weekdays": [
            "P",
            "E",
            "T",
            "K",
            "N",
            "R",
            "L"
        ]
    },
    "decimal": ".",
    "editor": {
        "close": "Sulge",
        "create": {
            "button": "Lisa uus rida",
            "submit": "Lisa",
            "title": "Lisa uus rida"
        },
        "edit": {
            "button": "Muuda rida",
            "submit": "Salvesta",
            "title": "Muuda rida"
        },
        "remove": {
            "button": "Kustuta",
            "submit": "Kustuta",
            "title": "Kustuta rida"
        }
    },
    "emptyTable": "Andmed puuduvad",
    "loadingRecords": "Laen...",
    "searchBuilder": {
        "add": "Lisa tingimus",
        "button": {
            "_": "Põhjalik otsing (%d)",
            "0": "Põhjalik otsing"
        },
        "clearAll": "Eemalda kõik",
        "condition": "Tingimus",
        "conditions": {
            "array": {
                "contains": "Sisaldab",
                "empty": "On tühi",
                "equals": "Võrdub",
                "not": "Ei ole",
                "notEmpty": "Ei ole tühi"
            },
            "date": {
                "after": "Pärast",
                "before": "Enne",
                "between": "Vahemikus",
                "empty": "On tühi",
                "equals": "Võrdub",
                "not": "Ei ole",
                "notBetween": "Ei ole vahemikus",
                "notEmpty": "Ei ole tühi"
            },
            "number": {
                "between": "On vahemikus",
                "empty": "On tühi",
                "equals": "Võrdub",
                "gt": "Suurem kui",
                "gte": "Suurem või võrdne kui",
                "lt": "Väiksem kui",
                "lte": "Väiksem või võrdne kui",
                "not": "Ei ole",
                "notBetween": "Ei ole vahemikus",
                "notEmpty": "Ei ole tühi"
            },
            "string": {
                "contains": "Sisaldab",
                "empty": "On tühi",
                "endsWith": "Lõppeb",
                "equals": "Võrdub",
                "not": "Ei ole",
                "notContains": "Ei sisalda",
                "notEmpty": "Ei ole tühi",
                "notEndsWith": "Ei lõppe",
                "notStartsWith": "Ei alga",
                "startsWith": "Algab"
            }
        },
        "data": "Tulp",
        "deleteTitle": "Eemalda tingimus",
        "logicAnd": "JA",
        "logicOr": "VÕI",
        "title": {
            "_": "Põhjalik otsing (%d)",
            "0": "Põhjalik otsing"
        },
        "value": "Väärtus"
    },
    "searchPanes": {
        "clearMessage": "Eemalda kõik",
        "count": "{total}",
        "countFiltered": "{shown} ({total})"
    },
    "searchPlaceholder": "Otsi..."
};
}));
