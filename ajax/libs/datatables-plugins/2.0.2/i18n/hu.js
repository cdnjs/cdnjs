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
    "emptyTable": "Nincs rendelkezésre álló adat",
    "info": "Találatok: _START_ - _END_ Összesen: _TOTAL_",
    "infoFiltered": "(_MAX_ összes rekord közül szűrve)",
    "infoThousands": " ",
    "lengthMenu": "_MENU_ találat oldalanként",
    "loadingRecords": "Betöltés...",
    "processing": "Feldolgozás...",
    "search": "Keresés:",
    "zeroRecords": "Nincs a keresésnek megfelelő találat",
    "paginate": {
        "first": "Első",
        "previous": "Előző",
        "next": "Következő",
        "last": "Utolsó"
    },
    "aria": {
        "sortAscending": ": aktiválja a növekvő rendezéshez",
        "sortDescending": ": aktiválja a csökkenő rendezéshez"
    },
    "select": {
        "rows": {
            "_": "%d sor kiválasztva",
            "1": "1 sor kiválasztva"
        },
        "cells": {
            "1": "1 cella kiválasztva",
            "_": "%d cella kiválasztva"
        },
        "columns": {
            "1": "1 oszlop kiválasztva",
            "_": "%d oszlop kiválasztva"
        }
    },
    "buttons": {
        "colvis": "Oszlopok",
        "copy": "Másolás",
        "copyTitle": "Vágólapra másolás",
        "copySuccess": {
            "_": "%d sor másolva",
            "1": "1 sor másolva"
        },
        "collection": "Gyűjtemény",
        "colvisRestore": "Oszlopok visszaállítása",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Összes sor megjelenítése",
            "_": "%d sor megjelenítése"
        },
        "pdf": "PDF",
        "print": "Nyomtat",
        "copyKeys": "A táblázat adatainak vágólapra másolásához nyomja meg a CTRL vagy u2318 + C billentyűt!<br \/><br \/>A megszakításhoz kattintson az üzenetre, vagy nyomja meg az ESC billentyűt!",
        "createState": "Állapot mentése",
        "removeAllStates": "Mentett állapotok törlése",
        "removeState": "Törlés",
        "renameState": "Átnevezés",
        "savedStates": "Mentett állapotok",
        "stateRestore": "%d. állapot",
        "updateState": "Frissítés"
    },
    "autoFill": {
        "cancel": "Megszakítás",
        "fill": "Összes cella kitöltése a következővel: <i>%d<\/i>",
        "fillHorizontal": "Cellák vízszintes kitöltése",
        "fillVertical": "Cellák függőleges kitöltése"
    },
    "searchBuilder": {
        "add": "Feltétel hozzáadása",
        "button": {
            "0": "Keresés konfigurátor",
            "_": "Keresés konfigurátor (%d)"
        },
        "clearAll": "Összes feltétel törlése",
        "condition": "Feltétel",
        "conditions": {
            "date": {
                "after": "Után",
                "before": "Előtt",
                "between": "Között",
                "empty": "Üres",
                "equals": "Egyenlő",
                "not": "Nem",
                "notBetween": "Kívül eső",
                "notEmpty": "Nem üres"
            },
            "number": {
                "between": "Között",
                "empty": "Üres",
                "equals": "Egyenlő",
                "gt": "Nagyobb mint",
                "gte": "Nagyobb vagy egyenlő mint",
                "lt": "Kissebb mint",
                "lte": "Kissebb vagy egyenlő mint",
                "not": "Nem",
                "notBetween": "Kívül eső",
                "notEmpty": "Nem üres"
            },
            "string": {
                "contains": "Tartalmazza",
                "empty": "Üres",
                "endsWith": "Végződik",
                "equals": "Egyenlő",
                "not": "Nem",
                "notEmpty": "Nem üres",
                "startsWith": "Kezdődik",
                "notContains": "Nem tartalmazza",
                "notStartsWith": "Nem kezdődik",
                "notEndsWith": "Nem végződik"
            },
            "array": {
                "equals": "Egyenlő",
                "empty": "Üres",
                "contains": "Tartalmazza",
                "not": "Nem",
                "notEmpty": "Nem üres",
                "without": "Nélkül"
            }
        },
        "data": "Adat",
        "deleteTitle": "Feltétel törlése",
        "logicAnd": "És",
        "logicOr": "Vagy",
        "title": {
            "0": "Keresés konfigurátor",
            "_": "Keresés konfigurátor (%d)"
        },
        "value": "Érték"
    },
    "searchPanes": {
        "clearMessage": "Szűrők törlése",
        "collapse": {
            "0": "Szűrőpanelek",
            "_": "Szűrőpanelek (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Nincsenek szűrőpanelek",
        "loadMessage": "Szűrőpanelek betöltése",
        "title": "Aktív szűrőpanelek: %d",
        "showMessage": "Mindet megmutat",
        "collapseMessage": "Mindet összecsuk"
    },
    "datetime": {
        "previous": "Előző",
        "next": "Következő",
        "hours": "Óra",
        "minutes": "Perc",
        "seconds": "Másodperc",
        "amPm": [
            "de.",
            "du."
        ],
        "weekdays": [
            "H",
            "K",
            "Sze",
            "Cs",
            "P",
            "Szo",
            "V"
        ],
        "months": [
            "Január",
            "Február",
            "Március",
            "Április",
            "Május",
            "Június",
            "Július",
            "Augusztus",
            "Szeptember",
            "Október",
            "November",
            "December"
        ]
    },
    "editor": {
        "close": "Bezárás",
        "create": {
            "button": "Új",
            "title": "Új",
            "submit": "Létrehozás"
        },
        "edit": {
            "button": "Módosítás",
            "title": "Módosítás",
            "submit": "Módosítás"
        },
        "remove": {
            "button": "Törlés",
            "title": "Törlés",
            "submit": "Törlés"
        },
        "error": {
            "system": "Technikai hiba történt."
        }
    },
    "infoEmpty": "Nincs találat",
    "thousands": "&nbsp;",
    "stateRestore": {
        "creationModal": {
            "button": "Létrehozás",
            "columns": {
                "search": "Oszlopkeresők",
                "visible": "Oszlop láthatóság"
            },
            "name": "Név:",
            "order": "Rendezés",
            "paging": "Oldalszám",
            "scroller": "Görgetés pozíciója",
            "search": "Kereső",
            "searchBuilder": "Keresési feltételek",
            "select": "Kijelölések",
            "title": "Állapot mentése",
            "toggleLabel": "Tartalmazza:"
        },
        "duplicateError": "Ilyen névvel már létezik mentett állapot.",
        "emptyError": "A név nem lehet üres.",
        "emptyStates": "Nincs mentett állapot",
        "removeConfirm": "Biztos törlöd %s állapotot?",
        "removeError": "Nem sikerült törölni a mentett állapotot.",
        "removeJoiner": "és",
        "removeSubmit": "Törlés",
        "removeTitle": "Mentett állapot törlése",
        "renameButton": "Átnevezés",
        "renameLabel": "%s új neve:",
        "renameTitle": "Mentett állapot átnevezése"
    }
};
}));
