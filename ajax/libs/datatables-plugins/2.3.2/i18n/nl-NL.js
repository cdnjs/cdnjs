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
    "lengthMenu": "_MENU_ resultaten weergeven",
    "zeroRecords": "Geen resultaten gevonden",
    "infoEmpty": "Geen resultaten om weer te geven",
    "search": "Zoeken:",
    "emptyTable": "Geen resultaten aanwezig in de tabel",
    "infoThousands": ".",
    "loadingRecords": "Een moment geduld aub - bezig met laden...",
    "paginate": {
        "first": "Eerste",
        "last": "Laatste",
        "next": "Volgende",
        "previous": "Vorige"
    },
    "aria": {
        "sortAscending": ": activeer om kolom oplopend te sorteren",
        "sortDescending": ": activeer om kolom aflopend te sorteren"
    },
    "autoFill": {
        "fill": "Vul alle cellen met <i>%d<\/i>",
        "fillHorizontal": "Vul cellen horizontaal",
        "fillVertical": "Vul cellen verticaal",
        "cancel": "Annuleren",
        "info": "Voorbeeld automatisch aanvullen info"
    },
    "buttons": {
        "colvis": "Kolom zichtbaarheid",
        "colvisRestore": "Herstel zichtbaarheid",
        "copy": "Kopieer",
        "copySuccess": {
            "1": "1 regel naar klembord gekopieerd",
            "_": "%ds regels naar klembord gekopieerd"
        },
        "copyTitle": "Kopieer naar klembord",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Toon alle regels",
            "_": "Toon %d regels",
            "1": "Toon 1 rij"
        },
        "pdf": "PDF",
        "print": "Print",
        "copyKeys": "Klik ctrl of u2318 + C om de tabeldata to kopiëren naar je klembord. Om te annuleren klik hier of klik op escape.",
        "collection": "Verzameling",
        "createState": "Maak staat",
        "removeAllStates": "Verwijder alle",
        "removeState": "Verwijder",
        "renameState": "Hernoem",
        "savedStates": "Opgeslagen",
        "updateState": "Bijwerken",
        "stateRestore": "Preset %d"
    },
    "processing": "Verwerken...",
    "decimal": ",",
    "searchBuilder": {
        "add": "Toevoegen",
        "clearAll": "Verwijder alles",
        "condition": "Conditie",
        "data": "Data",
        "deleteTitle": "Verwijder",
        "value": "Waarde",
        "conditions": {
            "date": {
                "after": "Na",
                "before": "Voor",
                "between": "Tussen",
                "empty": "Leeg",
                "equals": "Gelijk aan",
                "not": "Niet",
                "notBetween": "Niet tussen",
                "notEmpty": "Niet leeg"
            },
            "number": {
                "between": "Tussen",
                "empty": "Leeg",
                "equals": "Gelijk aan",
                "gt": "Groter dan",
                "gte": "Groter dan of gelijk aan",
                "lt": "Kleiner dan",
                "lte": "kleiner dan of gelijk aan",
                "not": "Niet",
                "notBetween": "Niet tussen",
                "notEmpty": "Niet leeg"
            },
            "string": {
                "contains": "Bevat",
                "empty": "Leeg",
                "endsWith": "Eindigt met",
                "equals": "Gelijk aan",
                "not": "Niet",
                "notEmpty": "Niet leeg",
                "startsWith": "Start met",
                "notContains": "Zonder",
                "notEndsWith": "Eindigt niet met",
                "notStartsWith": "Begint niet met"
            },
            "array": {
                "equals": "Gelijk aan",
                "empty": "Leeg",
                "contains": "Bevat",
                "not": "Niet",
                "notEmpty": "Niet leeg",
                "without": "Zonder"
            }
        },
        "logicAnd": "En",
        "logicOr": "Of",
        "button": {
            "0": "Zoekwizard",
            "_": "Zoekwizard (%d)"
        },
        "leftTitle": "Afwijkende criteria",
        "rightTitle": "Criteria inspringen",
        "title": {
            "0": "Zoekwizard",
            "_": "Zoekwizard (%d) "
        }
    },
    "searchPanes": {
        "clearMessage": "Alles leegmaken",
        "collapse": {
            "0": "Zoekpanelen",
            "_": "Zoekpanelen (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Geen zoekpanelen",
        "loadMessage": "Zoekpanelen laden...",
        "title": "%d filters actief",
        "showMessage": "Alles weergeven",
        "collapseMessage": "Instorten"
    },
    "select": {
        "cells": {
            "1": "1 cel geselecteerd",
            "_": "%d cellen geselecteerd"
        },
        "columns": {
            "1": "1 kolom geselecteerd",
            "_": "%d kolommen geselecteerd"
        },
        "rows": {
            "1": "1 rij geselecteerd",
            "_": "%d rijen geselecteerd"
        }
    },
    "thousands": ".",
    "info": "_START_ tot _END_ van _TOTAL_ resultaten",
    "infoFiltered": " (gefilterd uit _MAX_ resultaten)",
    "datetime": {
        "previous": "Vorige",
        "next": "Volgende",
        "hours": "Uur",
        "minutes": "Minuut",
        "seconds": "Seconde",
        "unknown": "Onbekend",
        "amPm": [
            "vm",
            "nm"
        ],
        "weekdays": [
            "Zo",
            "Ma",
            "Di",
            "Wo",
            "Do",
            "Vr",
            "Za"
        ],
        "months": [
            "Januari",
            "Februari",
            "Maart",
            "April",
            "Mei",
            "Juni",
            "Juli",
            "Augustus",
            "September",
            "Oktober",
            "November",
            "December"
        ]
    },
    "editor": {
        "close": "Sluiten",
        "create": {
            "button": "Nieuw",
            "title": "Voeg nieuwe gegevens toe",
            "submit": "Toevoegen"
        },
        "edit": {
            "button": "Wijzigen",
            "title": "Wijzig gegevens",
            "submit": "Wijzigen"
        },
        "remove": {
            "button": "Verwijderen",
            "title": "Verwijder",
            "submit": "Verwijder",
            "confirm": {
                "_": "Bent u zeker dat u %d rijen wil verwijderen?",
                "1": "Bent u zeker dat u 1 rij wil verwijderen?"
            }
        },
        "error": {
            "system": "Er is een fout gebeurd"
        },
        "multi": {
            "title": "Meerdere waarden",
            "info": "De geselecteerde items bevatten verschillende waarden voor deze invoer. Om alle items voor deze invoer op dezelfde waarde te zetten, klik of tik hier, zoniet zullen de individuele waarden behouden blijven.",
            "restore": "Wijzigingen ongedaan maken",
            "noMulti": "Deze invoer kan individueel gewijzigd worden, maar niet als deel van een groep."
        }
    },
    "stateRestore": {
        "creationModal": {
            "button": "Aanmaken",
            "columns": {
                "search": "Zoeken in kolom",
                "visible": "Kolom tonen"
            },
            "name": "Naam",
            "order": "Sorteervolgorde",
            "paging": "Paginering",
            "scroller": "Meescrollen",
            "search": "Zoeken",
            "searchBuilder": "SearchBuilder",
            "select": "Selecteer",
            "title": "Nieuwe staat aanmaken",
            "toggleLabel": "Bevat"
        },
        "duplicateError": "Staat bestaat al",
        "emptyError": "Naam kan niet leeg zijn",
        "emptyStates": "Geen beschikbare staten",
        "removeConfirm": "Weet u zeker dat u deze wil verwijderen:",
        "removeError": "De verwijdering is mislukt",
        "removeJoiner": "en",
        "removeSubmit": "Verwijder",
        "removeTitle": "Verwijder staat",
        "renameButton": "Hernoem",
        "renameLabel": "Nieuwe naam voor staat",
        "renameTitle": "Hernoem staat"
    }
};
}));
