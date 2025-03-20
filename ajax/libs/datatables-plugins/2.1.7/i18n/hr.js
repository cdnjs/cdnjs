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
    "emptyTable": "Nema podataka u tablici",
    "info": "Prikazano _START_ do _END_ od _TOTAL_ rezultata",
    "infoEmpty": "Prikazano 0 do 0 od 0 rezultata",
    "infoFiltered": "(filtrirano iz _MAX_ ukupnih rezultata)",
    "infoThousands": ",",
    "lengthMenu": "Prikaži _MENU_ rezultata po stranici",
    "loadingRecords": "Dohvaćam...",
    "processing": "Obrađujem...",
    "search": "Pretraži:",
    "zeroRecords": "Ništa nije pronađeno",
    "paginate": {
        "first": "Prva",
        "previous": "Nazad",
        "next": "Naprijed",
        "last": "Zadnja"
    },
    "aria": {
        "sortAscending": ": aktiviraj za rastući poredak",
        "sortDescending": ": aktiviraj za padajući poredak"
    },
    "autoFill": {
        "cancel": "Poništi"
    },
    "buttons": {
        "collection": "Kolekcija",
        "colvis": "Vidljivost stupca",
        "colvisRestore": "Povrati vidljivost",
        "copy": "Kopiraj",
        "copyKeys": "Pritisni ctrl ili % + C da kopiraš podatke iz tablice u međuspremnik.  Da odustaneš, pritisni ovu poruku ili pritisni ESC.",
        "copySuccess": {
            "_": "Kopirano je %ds redova u međuspremnik",
            "1": "Prvi redak je kopiran u međuspremnik"
        },
        "copyTitle": "Kopiraj u Međuspremnik",
        "csv": "CSV",
        "excel": "Excel",
        "pdf": "PDF",
        "print": "Isprintaj",
        "pageLength": {
            "-1": "Prikaži sve redove",
            "_": "Prikaži %d redova"
        }
    },
    "searchPanes": {
        "collapse": [
            "Pretra"
        ],
        "clearMessage": "Obriši sve",
        "emptyPanes": "Nema okna za pretraživanje",
        "loadMessage": "Učitavanje okna za pretraživanje...",
        "title": "Filtera aktivno - %d"
    },
    "select": {
        "cells": {
            "_": "%d ćelija odabrano",
            "1": "1 ćelija odabrana"
        },
        "columns": {
            "_": "%d stupaca odabrano",
            "1": "1 stupac odabran"
        }
    },
    "searchBuilder": {
        "add": "Dodaj uvjet",
        "button": {
            "0": "Graditelj pretraživanja",
            "_": "Graditelj pretraživanja (%d)"
        },
        "clearAll": "Obriši sve",
        "conditions": {
            "date": {
                "after": "Nakon",
                "between": "Između",
                "empty": "Prazno",
                "equals": "Jednako",
                "not": "Ne",
                "notBetween": "Nije između",
                "notEmpty": "Nije prazno"
            },
            "number": {
                "between": "Između",
                "empty": "Prazno",
                "equals": "Jednako",
                "gt": "Veće od",
                "gte": "Veće ili jednako od",
                "lt": "Manje od",
                "lte": "Manje ili jednako od",
                "not": "Ne",
                "notBetween": "Nije između",
                "notEmpty": "Nije prazno"
            },
            "string": {
                "contains": "Sadrži",
                "empty": "Prazno",
                "endsWith": "Završava sa",
                "equals": "Jednako",
                "not": "Ne",
                "notEmpty": "Nije prazno",
                "startsWith": "Počinje sa"
            },
            "array": {
                "equals": "Jednako je",
                "empty": "Prazno",
                "contains": "Sadrži",
                "not": "Ne",
                "notEmpty": "Nije prazno",
                "without": "Bez"
            }
        },
        "data": "Podatak",
        "deleteTitle": "Obriši pravilo za filtriranje",
        "logicAnd": "I",
        "logicOr": "ILI",
        "title": {
            "0": "Graditelj pretraživanja",
            "_": "Graditelj pretraživanja (%d)"
        },
        "value": "Vrijednost"
    },
    "datetime": {
        "previous": "Prethodno",
        "hours": "Sati",
        "minutes": "Minute",
        "seconds": "Sekunde",
        "unknown": "Nepoznat",
        "amPm": [
            "AM",
            "PM"
        ],
        "next": "Sljedeće",
        "months": [
            "siječanj",
            "veljača",
            "ožujak",
            "travanj",
            "svibanj",
            "lipanj",
            "srpanj",
            "kolovoz",
            "rujan",
            "listopad",
            "studeni",
            "prosinac"
        ]
    },
    "editor": {
        "close": "Zatvori",
        "create": {
            "button": "Novi",
            "title": "Dodaj novi zapis",
            "submit": "Dodaj"
        },
        "edit": {
            "button": "Uredi",
            "title": "Uredi zapis",
            "submit": "Ažuriraj"
        },
        "remove": {
            "button": "Obriši",
            "title": "Obriši",
            "submit": "Obriši",
            "confirm": {
                "_": "Jeste li sigurni da želite obrisati %d redova?",
                "1": "Jeste li sigurni da želite obrisati 1 redak?"
            }
        },
        "error": {
            "system": "Dogodila se pogreška (Više informacija)."
        },
        "multi": {
            "title": "Vrijednosti",
            "info": "Da biste uredili i postavili sve stavke za ovaj ulaz na istu vrijednost, kliknite ili dodirnite ovdje, inače će zadržati svoje pojedinačne vrijednosti.",
            "restore": "Poništi promjene",
            "noMulti": "Ovaj unos može biti uređen samostalno, ali ne kao dio grupe."
        }
    },
    "decimal": ","
};
}));
