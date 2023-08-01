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
    "info": "Visar _START_ till _END_ av totalt _TOTAL_ rader",
    "infoEmpty": "Visar 0 till 0 av totalt 0 rader",
    "infoFiltered": "(filtrerade från totalt _MAX_ rader)",
    "infoThousands": " ",
    "lengthMenu": "Visa _MENU_ rader",
    "loadingRecords": "Laddar …",
    "processing": "Bearbetar …",
    "search": "Sök:",
    "zeroRecords": "Hittade inga matchande resultat",
    "paginate": {
        "first": "Första",
        "last": "Sista",
        "next": "Nästa",
        "previous": "Föregående"
    },
    "aria": {
        "sortAscending": ": aktivera för att sortera kolumnen i stigande ordning",
        "sortDescending": ": aktivera för att sortera kolumnen i fallande ordning"
    },
    "autoFill": {
        "cancel": "Avbryt",
        "fill": "Fyll alla celler med <i>%d<\/i>",
        "fillHorizontal": "Fyll celler horisontalt",
        "fillVertical": "Fyll celler vertikalt"
    },
    "buttons": {
        "collection": "Samling <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Kolumn synlighet",
        "colvisRestore": "Återställ synlighet",
        "copy": "Kopiera",
        "copyKeys": "Tryck ctrl eller u2318 + C för att kopiera tabellens data till systemets Urklipp.  Tryck på det är meddelanden eller Escape för att avbryta.",
        "copySuccess": {
            "1": "Kopierade 1 rad till Urklipp",
            "_": "Kopierade %ds rader till Urklipp"
        },
        "copyTitle": "Kopiera till Urklipp",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Visa alla rader",
            "_": "Visa %d rader"
        },
        "pdf": "PDF",
        "print": "Skriv ut"
    },
    "decimal": ",",
    "emptyTable": "Tabellen innehåller ingen data",
    "searchBuilder": {
        "add": "Nytt Villkor",
        "button": {
            "0": "Avancerad sökning",
            "_": "Avancerad sökning (%d)"
        },
        "clearAll": "Rensa",
        "condition": "Villkor",
        "conditions": {
            "date": {
                "after": "Efter",
                "before": "Före",
                "between": "Mellan",
                "empty": "Tom",
                "equals": "Lika med",
                "not": "Inte",
                "notBetween": "Inte Mellan",
                "notEmpty": "Inte Tom"
            },
            "number": {
                "between": "Mellan",
                "empty": "Tom",
                "equals": "Lika med",
                "gt": "Större än",
                "gte": "Större eller lika med",
                "lt": "Mindre än",
                "lte": "Mindre eller lika med",
                "not": "Inte",
                "notBetween": "Inte Mellan",
                "notEmpty": "Inte Tom"
            },
            "string": {
                "contains": "Innehåller",
                "empty": "Tom",
                "endsWith": "Slutar med",
                "equals": "Lika med",
                "not": "Inte",
                "notEmpty": "Inte Tom",
                "startsWith": "Börjar med"
            },
            "array": {
                "equals": "Lika med",
                "empty": "Tom",
                "contains": "Innehåller",
                "not": "Inte",
                "notEmpty": "Inte Tom",
                "without": "Utan"
            }
        },
        "data": "Data",
        "deleteTitle": "Ta bort filtreringsregel",
        "logicAnd": "Och",
        "logicOr": "Eller",
        "title": {
            "0": "Avancerad sökning",
            "_": "Avancerad sökning (%d)"
        },
        "value": "Värde",
        "leftTitle": "Omvänt indragskriterier",
        "rightTitle": "Indragskriterier"
    },
    "searchPanes": {
        "clearMessage": "Rensa",
        "collapse": {
            "0": "Sökrutor",
            "_": "Sökrutor (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Sökrutor saknas",
        "loadMessage": "Laddar Sökrutor...",
        "title": "Aktiva Filter - %d"
    },
    "select": {
        "cells": {
            "1": "1 cell markerad",
            "_": "%d celler markerade"
        },
        "columns": {
            "1": "1 kolumn markerad",
            "_": "%d kolumner markerade"
        }
    },
    "thousands": " ",
    "datetime": {
        "previous": "Föregående",
        "next": "Nästa",
        "hours": "Timmar",
        "minutes": "Minuter",
        "seconds": "Sekunder",
        "unknown": "-",
        "amPm": [
            "fm",
            "em"
        ],
        "months": {
            "0": "Januari",
            "1": "Februari",
            "10": "November",
            "11": "December",
            "2": "Mars",
            "3": "April",
            "4": "Maj",
            "5": "Juni",
            "6": "Juli",
            "7": "Augusti",
            "8": "September",
            "9": "Oktober"
        },
        "weekdays": [
            "Sön",
            "Mån",
            "Tis",
            "Ons",
            "Tor",
            "Fre",
            "Lör"
        ]
    },
    "editor": {
        "close": "Stäng",
        "create": {
            "button": "Ny",
            "title": "Skapa ny post",
            "submit": "Skapa"
        },
        "edit": {
            "button": "Redigera",
            "title": "Redigera post",
            "submit": "Uppdatera"
        },
        "remove": {
            "button": "Radera",
            "title": "Radera",
            "submit": "Radera",
            "confirm": {
                "_": "Är du säker på att du vill ta bort %d rader?",
                "1": "Är du säker på att du vill ta bort 1 rad?"
            }
        },
        "error": {
            "system": "Ett systemfel har inträffat (<a target=\"\\\" rel=\"nofollow\" href=\"\\\">Mer information<\/a>)."
        },
        "multi": {
            "title": "Flera värden",
            "info": "De valda objekten har olika värden för detta fält. För att redigera och sätta alla objekt för detta fält till samma värde, klicka eller tryck här, annars behåller de sina individuella värden.",
            "restore": "Ångra ändringar",
            "noMulti": "Detta fält kan redigeras individuellt, men inte som en del av en grupp."
        }
    }
};
}));
