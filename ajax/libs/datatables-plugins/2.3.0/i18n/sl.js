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
    "emptyTable": "Nobenih podatkov ni na voljo",
    "info": "Prikazujem _START_ do _END_ od _TOTAL_ zapisov",
    "infoEmpty": "Prikazujem 0 do 0 od 0 zapisov",
    "infoFiltered": "(filtrirano od _MAX_ vseh zapisov)",
    "lengthMenu": "Prikaži _MENU_ zapisov",
    "loadingRecords": "Nalagam...",
    "search": "Išči:",
    "zeroRecords": "Nobeden zapis ne ustreza",
    "aria": {
        "sortAscending": "razvrsti naraščajoče",
        "sortDescending": "razvrsti padajoče"
    },
    "select": {
        "columns": {
            "1": "1 izbran stolpec",
            "_": "%d izbrani stolpci"
        },
        "rows": {
            "1": "1 izbrana vrstica",
            "_": "2 izbrane vrstice"
        },
        "cells": {
            "1": "1 izbrano polje",
            "_": "%d izbrana polja"
        }
    },
    "thousands": ".",
    "searchBuilder": {
        "conditions": {
            "array": {
                "equals": "Je enako",
                "empty": "Prazno",
                "contains": "Vsebuje",
                "not": "Ni",
                "notEmpty": "Ni prazno",
                "without": "Brez"
            },
            "string": {
                "endsWith": "Se konča z",
                "equals": "Je enako",
                "not": "Ni",
                "notEmpty": "Ni prazno",
                "startsWith": "Se začne z",
                "contains": "Vsebuje",
                "empty": "Prazno"
            },
            "number": {
                "notBetween": "Ni med",
                "notEmpty": "Ni prazno",
                "gt": "Večje kot",
                "gte": "Večje ali enako kot",
                "lt": "Manjše kot",
                "lte": "Manjše ali enako kot",
                "not": "Ni",
                "between": "Med",
                "empty": "Prazno",
                "equals": "Je enako"
            },
            "date": {
                "after": "Od",
                "before": "Do",
                "between": "Med",
                "empty": "Prazno",
                "equals": "Je enako",
                "not": "Ni enako",
                "notBetween": "Ni med",
                "notEmpty": "Ni prazno"
            }
        },
        "value": "Vrednost",
        "data": "Podatki",
        "deleteTitle": "Izbriši pravilo za filtriranje",
        "leftTitle": "Zamik v levo",
        "logicAnd": "in",
        "logicOr": "ali",
        "rightTitle": "Zamik v desno",
        "title": {
            "0": "Kriteriji iskanja",
            "_": "Kriteriji iskanja (%d)"
        },
        "button": {
            "_": "Kriteriji iskanja (%d)",
            "0": "Kriteriji iskanja"
        },
        "clearAll": "Izbriši vse",
        "condition": "Pogoj",
        "add": "Dodaj pogoj"
    },
    "searchPanes": {
        "clearMessage": "Izbriši vse",
        "collapse": {
            "0": "Iskalnik",
            "_": "Iskalnik (%d)"
        },
        "count": "{total}",
        "emptyPanes": "Ni vnosnega polja za iskanje",
        "loadMessage": "Nalagam iskalnik ...",
        "title": "Aktivni filtri - %d",
        "countFiltered": "{shown} ({total})"
    },
    "buttons": {
        "copySuccess": {
            "1": "1 vrstica prekopirana na odložišče.",
            "_": "%ds vrstic prekopiranih na odložišče."
        },
        "copyTitle": "Kopiraj na odložišče",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Prikaži vse vrstice",
            "_": "Prikaži %ds vrstic"
        },
        "pdf": "PDF",
        "print": "Natisni",
        "colvis": "Vidni stolpci",
        "colvisRestore": "Ponastavi vidne stolpce",
        "copy": "Kopiraj",
        "copyKeys": "Pritisni Ctrl ali u2318 + C za kopiranje podatkov tabele v odložišče sistema. Za preklic klikni na to sporočilo ali pritisni Escape.",
        "collection": "Zbirka"
    },
    "decimal": ",",
    "infoThousands": ".",
    "paginate": {
        "first": "Prva",
        "last": "Zadnja",
        "next": "Naslednja",
        "previous": "Predhodna"
    },
    "processing": "Obdelujem ...",
    "autoFill": {
        "cancel": "prekliči",
        "fill": "napolni",
        "fillHorizontal": "napolni vodoravno",
        "fillVertical": "napolni navpično"
    },
    "datetime": {
        "previous": "Prejšnji",
        "next": "Naslednji",
        "hours": "Ure",
        "minutes": "Minute",
        "seconds": "Sekunde",
        "unknown": "Neznano",
        "amPm": [
            "am",
            "pm"
        ]
    },
    "editor": {
        "close": "Prekliči",
        "create": {
            "button": "Dodaj",
            "title": "Dodaj nov vnos",
            "submit": "Shrani"
        },
        "edit": {
            "button": "Uredi",
            "title": "Uredi vnos",
            "submit": "Shrani"
        },
        "remove": {
            "button": "Izbriši",
            "title": "Izbriši",
            "submit": "Izbriši",
            "confirm": {
                "_": "Si prepričan, da želiš izbrisati %d vrstic?",
                "1": "Si prepričan, da želiš izbrisati 1 vrstico?"
            }
        },
        "error": {
            "system": "Prišlo je do napake (Več informacij)."
        },
        "multi": {
            "title": "Več vrednosti",
            "restore": "Razveljavi spremembe",
            "info": "Izbrani elementi vsebujejo različne vrednosti za ta vnos. Če želite vse elemente za ta vnos urediti in nastaviti na enako vrednost, kliknite ali tapnite tukaj, sicer bodo ohranili svoje posamezne vrednosti.",
            "noMulti": "Ta vnos lahko urejate posamično, vendar ne del skupine."
        }
    }
};
}));
