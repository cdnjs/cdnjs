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
    "emptyTable": "Nema podataka u tabeli",
    "info": "Prikaz _START_ do _END_ od ukupno _TOTAL_ zapisa",
    "infoEmpty": "Prikaz 0 do 0 od ukupno 0 zapisa",
    "infoFiltered": "(filtrirano od ukupno _MAX_ zapisa)",
    "infoThousands": ".",
    "lengthMenu": "Prikaži _MENU_ zapisa",
    "loadingRecords": "Učitavanje...",
    "processing": "Obrada...",
    "search": "Pretraga:",
    "zeroRecords": "Nisu pronađeni odgovarajući zapisi",
    "paginate": {
        "first": "Početna",
        "last": "Poslednja",
        "next": "Sledeća",
        "previous": "Prethodna"
    },
    "aria": {
        "sortAscending": ": aktivirajte da sortirate kolonu uzlazno",
        "sortDescending": ": aktivirajte da sortirate kolonu silazno"
    },
    "editor": {
        "edit": {
            "button": "Izmeni",
            "title": "Izmeni unos",
            "submit": "Izmeni"
        },
        "close": "Zatvori",
        "create": {
            "button": "Novo",
            "title": "Kreiraj novi unos",
            "submit": "Kreiraj"
        },
        "remove": {
            "button": "Obriši",
            "title": "Obriši",
            "submit": "Obriši",
            "confirm": {
                "_": "Da li želiš da obrišeš %d redova?",
                "1": "Da li želiš da obrišeš 1 red?"
            }
        },
        "error": {
            "system": "Pojavila se sistemska greška (<a target=\"\\\" rel=\"nofollow\" href=\"\\\">Više informacija<\/a>)."
        },
        "multi": {
            "title": "Višestruke vrednosti",
            "info": "Izabrane stavke sadrže različite vrednosti za ovaj unos. Da biste uredili i postavili sve stavke za ovaj unos na istu vrednost, kliknite ili dodirnite ovde, inače će zadržati svoje pojedinačne vrednosti.",
            "restore": "Poništi promene",
            "noMulti": "Ovaj unos se može uređivati pojedinačno, ali ne i kao deo grupe."
        }
    },
    "autoFill": {
        "cancel": "Otkaži",
        "fill": "Popuni sve ćelije sa <i>%d<\/i>",
        "fillHorizontal": "Popuni ćelije horizontalno",
        "fillVertical": "Popuni ćelije vertikalno"
    },
    "buttons": {
        "collection": "Kolekcija <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Vidljivost kolone",
        "colvisRestore": "Vrati vidljivost",
        "copy": "Kopiraj",
        "copyKeys": "Pritsni ctrl ili u2318 + C da kopiraš tabelu sa podacima u sistemski beležnik <br \/><br \/>Da otkažeš akciju, klikni na ovu poruku ili pritisni ESC na tastaturi.",
        "copySuccess": {
            "1": "1 red je kopiran u beležnik",
            "_": "Kopirano %d redova"
        },
        "copyTitle": "Kopiraj u beležnik",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Prikaži sve redove",
            "_": "Prikaži %d red\/a\/ova"
        },
        "pdf": "PDF",
        "print": "Štampa",
        "createState": "Kreiraj stanje",
        "removeAllStates": "Ukloni sva stanja",
        "removeState": "Ukloni",
        "renameState": "Preimenuj",
        "savedStates": "Sačuvana stanja",
        "stateRestore": "Obnovi stanje %d",
        "updateState": "Ažuriraj"
    },
    "searchBuilder": {
        "add": "Dodaj uslov",
        "button": {
            "0": "Kreiraj pretragu",
            "_": "Kreirane pretrage (%d)"
        },
        "clearAll": "Očisti sve",
        "condition": "Uslov",
        "conditions": {
            "date": {
                "after": "Pre",
                "before": "Posle",
                "between": "Između",
                "empty": "Prazno",
                "equals": "Jednako",
                "not": "Nije",
                "notBetween": "Nije između",
                "notEmpty": "Nije prazan"
            },
            "number": {
                "between": "Između",
                "empty": "Prazan",
                "equals": "Jednak",
                "gt": "Veće od",
                "gte": "Veće ili jednako od",
                "lt": "Manje od",
                "lte": "Manje ili jednako od",
                "not": "Nije",
                "notBetween": "Nije između",
                "notEmpty": "Nije prazan"
            },
            "string": {
                "contains": "Sadrži",
                "empty": "Prazno",
                "endsWith": "Se završava na",
                "equals": "Jednako",
                "not": "Nije",
                "notEmpty": "Nije prazan",
                "startsWith": "Počinje sa",
                "notContains": "Ne sadrži",
                "notStartsWith": "Ne počinje sa",
                "notEndsWith": "Ne završava se sa"
            },
            "array": {
                "equals": "Jednako",
                "empty": "Prazno",
                "contains": "Sadrži",
                "not": "Nije",
                "notEmpty": "Nije prazan",
                "without": "Bez"
            }
        },
        "data": "Podaci",
        "deleteTitle": "Obriši filter",
        "leftTitle": "Outdent kriterijum",
        "logicAnd": "I",
        "logicOr": "ili",
        "rightTitle": "Indent kriterijum",
        "title": {
            "0": "Kreiraj pretragu",
            "_": "Kreirane pretrage (%d)"
        },
        "value": "Vrednost"
    },
    "searchPanes": {
        "clearMessage": "Ukloni sve",
        "collapse": {
            "0": "SearchPanes",
            "_": "SearchPanes (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Nema pretrage",
        "loadMessage": "Učitavanje",
        "title": "Aktivni filteri - %d",
        "showMessage": "Prikaži sve",
        "collapseMessage": "Sakrij sve"
    },
    "select": {
        "cells": {
            "1": "1 ćelija je selektovana",
            "_": "%d selektovane ćelije"
        },
        "columns": {
            "1": "1 kolona je selektovana",
            "_": "%d selektovane kolone"
        }
    },
    "datetime": {
        "previous": "Prethodni",
        "next": "Sledeći",
        "hours": "Sati",
        "minutes": "Minuti",
        "seconds": "Sekunde",
        "unknown": "-",
        "amPm": [
            "am",
            "pm"
        ],
        "weekdays": [
            "Ned",
            "Pon",
            "Uto",
            "Sre",
            "Čet",
            "Pet",
            "Sub"
        ],
        "months": [
            "Januar",
            "Februar",
            "Mart",
            "April",
            "Maj",
            "Jun",
            "Jul",
            "Avgust",
            "Septembar",
            "Oktobar",
            "Novembar",
            "Decembar"
        ]
    },
    "stateRestore": {
        "creationModal": {
            "button": "Kreiraj:",
            "columns": {
                "search": "Pretraga kolone",
                "visible": "Vidljivost kolone"
            },
            "name": "Ime",
            "order": "Sortiranje",
            "paging": "Paginacija",
            "scroller": "Pozicija skrola",
            "search": "Pretraga",
            "searchBuilder": "SearchBuilder",
            "select": "Selektuj",
            "title": "Kreiraj novo stanje",
            "toggleLabel": "Uključuje:"
        },
        "duplicateError": "Stanje sa ovim imenom već postoji",
        "emptyError": "Ime ne može biti prazno.",
        "emptyStates": "Nema sačuvanih stanja",
        "removeConfirm": "Da li ste sigurni?",
        "removeError": "Uklanjanje stanja nije uspelo.",
        "removeJoiner": "i",
        "removeSubmit": "Ukloni",
        "removeTitle": "Ukloni stanje",
        "renameButton": "Preimenuj",
        "renameLabel": "Novo ime za %s:",
        "renameTitle": "Preimenuj stanje"
    }
};
}));
