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
    "processing": "Prozesatzen...",
    "lengthMenu": "Erakutsi _MENU_ erregistro",
    "zeroRecords": "Ez da emaitzarik aurkitu",
    "loadingRecords": "Abiarazten...",
    "paginate": {
        "last": "Azkena",
        "next": "Hurrengoa",
        "previous": "Aurrekoa",
        "first": "Lehenengoa"
    },
    "aria": {
        "sortAscending": ": Zutabea goranzko eran ordenatzeko aktibatu ",
        "sortDescending": ": Zutabea beheranzko eran ordenatzeko aktibatu"
    },
    "autoFill": {
        "cancel": "Utzi",
        "fill": "Bete gelaxkak balio honekin <i>%d<i><\/i><\/i>",
        "fillHorizontal": "Bete gelaxkak horizontalki",
        "fillVertical": "Bete gelaxkak bertikalki"
    },
    "buttons": {
        "collection": "Bilduma <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Zutabeen ikusgaitasuna",
        "colvisRestore": "Berrezarri ikusgaitasuna",
        "copy": "Kopiatu",
        "copyKeys": "Sakatu ctrl edo u2313 + C taularen datuak zure sistemaren arbelera kopiatuzeko. Sakatu mezu hau edo escape bertan behera uztekao, sa",
        "copySuccess": {
            "1": "Lerro bat arbelera kopiatu da",
            "_": "%ds lerro arbelera kopiatu dira"
        },
        "copyTitle": "Kopiatu arbelera",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Erakutsi lerro guztiak",
            "_": "Erakutsi %d lerro"
        },
        "pdf": "PDF",
        "print": "Inprimatu",
        "createState": "Sortu egoera",
        "removeAllStates": "Ezabatu egoera guztiak",
        "removeState": "Ezabatu",
        "renameState": "Berrizendatu",
        "savedStates": "Gordetako egoerak",
        "stateRestore": "%d egoera",
        "updateState": "Eguneratu"
    },
    "decimal": ",",
    "emptyTable": "Taula honetan ez dago datu erabilgarririk",
    "info": "_TOTAL_ erregistrotik _START_ - _END_ ikusgai",
    "infoEmpty": "Ez dago elementurik",
    "infoFiltered": "(guztira _MAX_ erregistrotik iragazita)",
    "infoThousands": ".",
    "search": "Bilatu:",
    "searchBuilder": {
        "add": "Gehitu baldintza",
        "button": {
            "0": "Bilaketa eraikitzailea",
            "_": "Bilaketa eraikitzailea (%d)"
        },
        "clearAll": "Garbitu",
        "condition": "Baldintza",
        "conditions": {
            "date": {
                "after": "Ondoren",
                "before": "Aurretik",
                "between": "Tartean",
                "empty": "Hutsik",
                "equals": "berdina da",
                "not": "ez da ",
                "notBetween": "ez dago tartean",
                "notEmpty": "ez dago hutsik"
            },
            "number": {
                "between": "Tartean",
                "empty": "Hutsik",
                "equals": "berdina da",
                "gt": "handiagoa",
                "gte": "handiagoa edo berdina",
                "lt": "txikiagoa",
                "lte": "txikiagoa edo berdina",
                "not": "ez da",
                "notBetween": "ez dago tartean",
                "notEmpty": "ez dago hutsik"
            },
            "string": {
                "contains": "Hau dauka",
                "empty": "Hutsik",
                "endsWith": "Honekin emaitzen da",
                "equals": "berdina da",
                "not": "ez da",
                "notEmpty": "ez dago hutsik",
                "startsWith": "Honekin hasten da",
                "notContains": "ez dauka hau",
                "notStartsWith": "ez da honekin hasten",
                "notEndsWith": "ez da honekin amaitzen"
            },
            "array": {
                "equals": "da",
                "empty": "hutsik",
                "contains": "hau dauka",
                "not": "ez da",
                "notEmpty": "ez dago hutsik",
                "without": "ez du hau"
            }
        },
        "data": "Datua",
        "deleteTitle": "Ezabatu iragazkiaren erregela",
        "leftTitle": "Irizpideari koska kendu",
        "logicAnd": "eta",
        "logicOr": "edo",
        "rightTitle": "Irizpideari koska handitu",
        "title": {
            "0": "Bilaketa eraikitzailea",
            "_": "Bilaketa eraikitzailea (%d)"
        },
        "value": "Balioa"
    },
    "searchPanes": {
        "clearMessage": "Garbitu",
        "collapse": {
            "0": "Bilaketa panelak",
            "_": "Bilaketa panelak (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Ez dago bilaketa panelik",
        "loadMessage": "Bilaketa panelak kargatzen...",
        "title": "Aktibo dauden filtroak - %d",
        "showMessage": "Erakutsi guztiak",
        "collapseMessage": "Itxi guztiak"
    },
    "select": {
        "cells": {
            "1": "Gelaxka 1 aukeratuta",
            "_": "%d gelaxka aukeratuta"
        },
        "columns": {
            "1": "Zutabe 1 aukeratuta",
            "_": "%d zutabe aukeratuta"
        }
    },
    "thousands": ".",
    "datetime": {
        "previous": "Aurrekoa",
        "next": "Hurrengoa",
        "amPm": [
            "am",
            "pm"
        ],
        "weekdays": [
            "Iga",
            "Asl",
            "Asr",
            "Asz",
            "Osg",
            "Osr",
            "Lar"
        ],
        "hours": "Orduak",
        "minutes": "Minutu",
        "seconds": "Segundoak",
        "unknown": "-",
        "months": [
            "Urtarril",
            "Otsail ",
            "Martxo ",
            "Apiril ",
            "Maiatz ",
            "Ekain ",
            "Uztail ",
            "Abuztu ",
            "Irail ",
            "Urri ",
            "Azaro ",
            "Abendu "
        ]
    },
    "editor": {
        "close": "Itxi",
        "create": {
            "button": "Berria",
            "title": "Sarrera berria sortu",
            "submit": "Sortu"
        },
        "edit": {
            "button": "Aldatu",
            "title": "Sarrera aldatu",
            "submit": "Gorde"
        },
        "remove": {
            "button": "Ezabatu",
            "title": "Ezabatu",
            "submit": "Ezabatu",
            "confirm": {
                "_": "Ziur zaude %d lerro ezabatu nahi dituzula?",
                "1": "Ziur zaude lerro 1 ezabatu nahi duzula?"
            }
        },
        "error": {
            "system": "Sistemaren errorea gertatu da (&lt;a target=\"\\\" rel=\"nofollow\" href=\"\\\"&gt;More information&lt;\/a&gt;)."
        },
        "multi": {
            "title": "Balio asko",
            "info": "Aukeratutako elementuek hainbat balio dituzte eremu honentzat. Balio hori aldatu eta elementu guztiei berbera jartzeko egin klik edo sakatu hemen, bestela beren jatorrizko balioa gordeko dute.",
            "restore": "Desegin aldaketak",
            "noMulti": "Elementu hau bakarka aldatu daiteke baina ez talde baten parte gisa."
        }
    }
};
}));
