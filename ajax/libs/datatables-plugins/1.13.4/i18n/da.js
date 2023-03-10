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
    "processing": "Henter...",
    "lengthMenu": "Vis _MENU_ linjer",
    "zeroRecords": "Ingen linjer matcher s&oslash;gningen",
    "info": "Viser _START_ til _END_ af _TOTAL_ linjer",
    "infoEmpty": "Viser 0 til 0 af 0 linjer",
    "infoFiltered": "(filtreret fra _MAX_ linjer)",
    "paginate": {
        "previous": "Forrige",
        "last": "Sidste",
        "first": "Første",
        "next": "Næste"
    },
    "aria": {
        "sortAscending": "Stigende sortering",
        "sortDescending": "Faldende sortering"
    },
    "autoFill": {
        "fill": "Fyld alle celler med <i>%d<i><\/i><\/i>",
        "fillHorizontal": "Fyld celler horisontalt",
        "fillVertical": "Fyld celler vertikalt",
        "cancel": "Annuller",
        "info": "information"
    },
    "buttons": {
        "copy": "Kopi",
        "copyTitle": "Kopier til udklipsholder",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Vis alle rækker",
            "_": "Vis %d rækker",
            "1": "Vis 1 række"
        },
        "pdf": "PDF",
        "print": "Udskriv",
        "collection": "Samling",
        "colvis": "Kolonne synlighed",
        "colvisRestore": "Gendan synlighed",
        "copyKeys": "Tryk ctrl eller u2318 + C for at kopiere data til udklipsholder.  For at fortryde, klik på denne besked eller tryk escape.",
        "copySuccess": {
            "1": "Kopieret en række til udklipsholder",
            "_": "Kopieret %ds rækker til udklipsholder"
        },
        "createState": "Opret stat",
        "removeAllStates": "Fjern alle stater",
        "removeState": "Fjern",
        "renameState": "Omdøb",
        "savedStates": "Gemte stater",
        "stateRestore": "Stat %d",
        "updateState": "Opdatér"
    },
    "emptyTable": "Ingen data tilgængelige i tabellen",
    "infoThousands": ".",
    "select": {
        "cells": {
            "1": "1 celle valgt",
            "_": "%d celler valgt"
        },
        "columns": {
            "1": "1 kolonne valgt",
            "_": "%d kolonner valgt"
        },
        "rows": {
            "1": "1 række valgt",
            "_": "%d rækker valgt"
        }
    },
    "thousands": ".",
    "decimal": ".",
    "search": "Søg",
    "searchPanes": {
        "clearMessage": "Fjern alle",
        "collapse": {
            "0": "Søgepanel",
            "_": "Søgepanel (%d)"
        },
        "emptyPanes": "Ingen søgepaneler",
        "loadMessage": "Henter søgepaneler",
        "title": "Filter aktive - %d",
        "count": "Antal",
        "countFiltered": "Filtreret antal"
    },
    "datetime": {
        "previous": "Forrige",
        "next": "Næste",
        "hours": "Timer",
        "minutes": "Minutter",
        "seconds": "Sekunder",
        "unknown": "-",
        "weekdays": {
            "0": "Søn",
            "1": "Man",
            "3": "Ons",
            "5": "Fre",
            "6": "Lør",
            "2": "Tir",
            "4": "Tor"
        },
        "months": {
            "0": "Januar",
            "2": "Marts",
            "3": "April",
            "4": "Maj",
            "5": "Juni",
            "6": "Juli",
            "7": "August",
            "8": "September",
            "9": "Oktober",
            "10": "November",
            "11": "December",
            "1": "Febuar"
        }
    },
    "editor": {
        "close": "Luk",
        "create": {
            "title": "Opret ny række",
            "submit": "Opret",
            "button": "Opret"
        },
        "edit": {
            "button": "Ret",
            "title": "Ret række",
            "submit": "Opdater"
        },
        "remove": {
            "button": "Slet",
            "title": "Slet",
            "submit": "Slet",
            "confirm": {
                "_": "Er du sikker på, at du vil slette %d rækker?",
                "1": "Er du sikker på, at du vil slette 1 række?"
            }
        },
        "error": {
            "system": "En systemfejl er opstået (Mere information)"
        },
        "multi": {
            "title": "Flere værdier",
            "restore": "Fortryd ændringer",
            "info": "De valgte elementer indeholder flere værdier for dette felt. For at rette valgte til samme værdi klik eller tab her. Hvis feltet ikke berørs beholder felterne deres værdi",
            "noMulti": "Dette felt kan ikke blive masse redigeret"
        }
    },
    "loadingRecords": "Henter...",
    "searchBuilder": {
        "add": "Tilføj betingelse",
        "button": {
            "0": "Søg",
            "_": "Søg (%d)"
        },
        "clearAll": "Nulstil",
        "condition": "Betingelse",
        "conditions": {
            "date": {
                "after": "Efter",
                "before": "Før",
                "between": "Mellem",
                "empty": "Tom",
                "equals": "Lig med",
                "not": "Ikke",
                "notBetween": "Ikke mellem",
                "notEmpty": "Ikke tom"
            },
            "number": {
                "between": "Mellem",
                "empty": "Tom",
                "equals": "Lig med",
                "gt": "Større end",
                "lt": "Mindre end",
                "lte": "Mindre end eller lig med",
                "not": "Ikke",
                "notBetween": "Ikke mellem",
                "notEmpty": "Ikke tom",
                "gte": "Større end eller lig med"
            },
            "string": {
                "contains": "Indeholder",
                "empty": "Tom",
                "endsWith": "Slutter med",
                "equals": "Lig med",
                "not": "Ikke",
                "notEmpty": "Ikke tom",
                "startsWith": "Starter med",
                "notContains": "Indeholder ikke",
                "notStartsWith": "Starter ikke med",
                "notEndsWith": "Ender ikke med"
            },
            "array": {
                "equals": "Lig med",
                "empty": "Tom",
                "contains": "Indeholder",
                "not": "Ikke",
                "notEmpty": "Ikke tom",
                "without": "Indeholder ikke"
            }
        },
        "data": "Data",
        "deleteTitle": "Slet filtrerings regel",
        "logicAnd": "Og",
        "logicOr": "Eller",
        "value": "Værdi",
        "title": {
            "_": "Brugerdefineret filtrering",
            "0": "Søge bygger"
        }
    },
    "infoPostFix": " ",
    "searchPlaceholder": "søg.."
};
}));
