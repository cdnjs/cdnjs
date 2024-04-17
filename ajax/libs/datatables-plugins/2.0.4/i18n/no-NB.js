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
    "emptyTable": "Ingen data tilgjengelig i tabellen",
    "infoThousands": " ",
    "loadingRecords": "Laster...",
    "processing": "Laster...",
    "search": "S&oslash;k:",
    "paginate": {
        "first": "F&oslash;rste",
        "previous": "Forrige",
        "next": "Neste",
        "last": "Siste"
    },
    "aria": {
        "sortAscending": "aktiver for &aring; sortere kolonnen stigende",
        "sortDescending": "aktiver for &aring; sortere kolonnen synkende"
    },
    "autoFill": {
        "cancel": "Avbryt",
        "fillHorizontal": "Fyll celler horisontalt",
        "fillVertical": "Fyll celler vertikalt",
        "fill": "Fyll alle celler med <i>%d<\/i>",
        "info": "&lt;i&gt;Tom streng&lt;\/i&gt;"
    },
    "buttons": {
        "colvisRestore": "Gjennopprett synlighet",
        "copy": "Kopier",
        "copySuccess": {
            "_": "Kopierte %ds rader til utklippstavle",
            "1": "Kopierte én rad til utklippstavle"
        },
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Vis alle rader",
            "_": "Vis %d rader",
            "1": "Vis én rad"
        },
        "pdf": "PDF",
        "print": "Utskrift",
        "collection": "Samling <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Kolonne-synlighet",
        "copyKeys": "Trykk ctrl eller u2318 + C for &aring; kopiere tabelldata til systemets utklippstavle.<br \/><br \/>For &aring; avbryte, klikk p&aring; denne meldingen eller trykk p&aring; escape.",
        "copyTitle": "Kopier til utklippstavle",
        "createState": "Opprett tilstand",
        "removeAllStates": "Fjern alle tilstander",
        "removeState": "Fjern",
        "renameState": "Nytt navn",
        "savedStates": "Lagrede tilstander",
        "stateRestore": "Tilstand %d",
        "updateState": "Oppdater"
    },
    "decimal": ",",
    "searchBuilder": {
        "conditions": {
            "date": {
                "after": "Etter",
                "between": "Mellom",
                "empty": "Tom",
                "equals": "Er lik",
                "not": "Ikke",
                "notBetween": "Ikke mellom",
                "notEmpty": "Ikke tom",
                "before": "F&oslash;r"
            },
            "number": {
                "between": "Mellom",
                "empty": "Tom",
                "equals": "Er lik",
                "lt": "Mindre enn",
                "lte": "Mindre eller lik",
                "not": "Ikke",
                "notBetween": "Ikke mellom",
                "notEmpty": "Ikke tom",
                "gt": "St&oslash;rre enn",
                "gte": "St&oslash;rre eller lik"
            },
            "string": {
                "contains": "Inneholder",
                "empty": "Tom",
                "equals": "Er lik",
                "not": "Ikke",
                "notEmpty": "Ikke tom",
                "startsWith": "Starter med",
                "endsWith": "Slutter med",
                "notContains": "Inneholder ikke",
                "notStartsWith": "Starter ikke med",
                "notEndsWith": "Slutter ikke med"
            },
            "array": {
                "equals": "Er lik",
                "empty": "Tom",
                "contains": "Inneholder",
                "not": "Ikke",
                "notEmpty": "Ikke tom",
                "without": "Uten"
            }
        },
        "data": "Data",
        "deleteTitle": "Slett filtreringsregel",
        "logicAnd": "Og",
        "logicOr": "Eller",
        "value": "Verdi",
        "add": "Legg til betingelse",
        "button": {
            "0": "S&oslash;kekonstrukt&oslash;r",
            "_": "S&oslash;kekonstrukt&oslash;r (%d)"
        },
        "clearAll": "Fjern alle",
        "condition": "Betingelse",
        "leftTitle": "Rykk tilbake betingelse",
        "rightTitle": "Rykk inn betingelse",
        "title": {
            "0": "S&oslash;kekonstrukt&oslash;r",
            "_": "S&oslash;kekonstrukt&oslash;r (%d)"
        }
    },
    "searchPanes": {
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "clearMessage": "Fjern alle",
        "collapse": {
            "0": "S&oslash;kerute",
            "_": "S&oslash;kerute (%d)"
        },
        "emptyPanes": "Ingen s&oslash;kerute",
        "loadMessage": "Laster inn s&oslash;kerute...",
        "title": "Aktive filter - %d",
        "showMessage": "Vis alle",
        "collapseMessage": "Komprimer Alle"
    },
    "select": {
        "cells": {
            "1": "1 celle er valgt",
            "_": "%d celler er valgt"
        },
        "columns": {
            "1": "1 kolonne er valgt",
            "_": "%d kolonner er valgt"
        },
        "rows": {
            "1": "1 rad valgt",
            "_": "%d rader valgt"
        }
    },
    "info": "Viser _START_ til _END_ av _TOTAL_ oppf&oslash;ringer",
    "infoEmpty": "Viser 0 til 0 av 0 oppf&oslash;ringer",
    "infoFiltered": "filtrert fra totalt _MAX_ oppf&oslash;ringer",
    "lengthMenu": "Vis _MENU_ oppf&oslash;ringer",
    "zeroRecords": "Ingen rader samsvarer med s&oslash;ket",
    "datetime": {
        "previous": "forrige",
        "next": "neste",
        "hours": "timer",
        "minutes": "minutter",
        "seconds": "sekunder",
        "unknown": "ukjent",
        "amPm": [
            "am",
            "pm"
        ],
        "weekdays": [
            "Søn",
            "Man",
            "Tir",
            "Ons",
            "Tor",
            "Fre",
            "Lør"
        ],
        "months": [
            "Januar",
            "Februar",
            "Mars",
            "April",
            "Mai",
            "Juni",
            "Juli",
            "August",
            "September",
            "Oktober",
            "November",
            "Desember"
        ]
    },
    "editor": {
        "close": "Lukk",
        "create": {
            "button": "Ny",
            "title": "Ny oppføring",
            "submit": "Opprett"
        },
        "edit": {
            "button": "Endre",
            "title": "Endre oppføring",
            "submit": "Oppdater"
        },
        "remove": {
            "button": "Slett",
            "title": "Sletting",
            "submit": "Slett",
            "confirm": {
                "_": "Er du sikker på at du vil slette %d rader?",
                "1": "Er du sikker på at du vil slette 1 rad?"
            }
        },
        "error": {
            "system": "En systemfeil har inntruffet (Mer informasjon)"
        },
        "multi": {
            "restore": "Gjør om endringer",
            "noMulti": "Dette feltet kan redigeres individuelt men ikke som del av en gruppe.",
            "title": "Flere verdier"
        }
    },
    "thousands": " ."
};
}));
