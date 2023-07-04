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
    "emptyTable": "Tabulka neobsahuje žádná data",
    "info": "Zobrazuji _START_ až _END_ z celkem _TOTAL_ záznamů",
    "infoEmpty": "Zobrazuji 0 až 0 z 0 záznamů",
    "infoFiltered": "(filtrováno z celkem _MAX_ záznamů)",
    "loadingRecords": "Načítám...",
    "zeroRecords": "Žádné záznamy nebyly nalezeny",
    "paginate": {
        "first": "První",
        "last": "Poslední",
        "next": "Další",
        "previous": "Předchozí"
    },
    "searchBuilder": {
        "add": "Přidat podmínku",
        "clearAll": "Smazat vše",
        "condition": "Podmínka",
        "conditions": {
            "date": {
                "after": "po",
                "before": "před",
                "between": "mezi",
                "empty": "prázdné",
                "equals": "rovno",
                "not": "není",
                "notBetween": "není mezi",
                "notEmpty": "není prázdné"
            },
            "number": {
                "between": "mezi",
                "empty": "prázdné",
                "equals": "rovno",
                "gt": "větší",
                "gte": "rovno a větší",
                "lt": "menší",
                "lte": "rovno a menší",
                "not": "není",
                "notBetween": "není mezi",
                "notEmpty": "není prázdné"
            },
            "string": {
                "contains": "obsahuje",
                "empty": "prázdné",
                "endsWith": "končí na",
                "equals": "rovno",
                "not": "není",
                "notEmpty": "není prázdné",
                "startsWith": "začíná na",
                "notContains": "Podmínka",
                "notStartsWith": "Nezačíná",
                "notEndsWith": "Nekončí"
            },
            "array": {
                "equals": "rovno",
                "empty": "prázdné",
                "contains": "obsahuje",
                "not": "není",
                "notEmpty": "není prázdnÀ�",
                "without": "neobsahuje"
            }
        },
        "data": "Sloupec",
        "logicAnd": "A",
        "logicOr": "NEBO",
        "title": {
            "0": "Rozšířený filtr",
            "_": "Rozšířený filtr (%d)"
        },
        "value": "Hodnota",
        "button": {
            "0": "Rozšířený filtr",
            "_": "Rozšířený filtr (%d)"
        },
        "deleteTitle": "Smazat filtrovací pravidlo",
        "leftTitle": "Zrušení odsazení podmínky",
        "rightTitle": "Odsazení podmínky"
    },
    "autoFill": {
        "cancel": "Zrušit",
        "fill": "Vyplň všechny buňky textem <i>%d<i><\/i><\/i>",
        "fillHorizontal": "Vyplň všechny buňky horizontálně",
        "fillVertical": "Vyplň všechny buňky vertikálně",
        "info": "Příklad automatického vyplňování"
    },
    "buttons": {
        "collection": "Kolekce <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "copy": "Kopírovat",
        "copyTitle": "Kopírovat do schránky",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Zobrazit všechny řádky",
            "_": "Zobrazit %d řádků",
            "1": "Zobraz 1 řádek"
        },
        "pdf": "PDF",
        "print": "Tisknout",
        "colvis": "Viditelnost sloupců",
        "colvisRestore": "Resetovat sloupce",
        "copyKeys": "Zmáčkněte ctrl or u2318 + C pro zkopírování dat.  Pro zrušení klikněte na tuto zprávu nebo zmáčkněte esc..",
        "copySuccess": {
            "1": "Zkopírován 1 řádek do schránky",
            "_": "Zkopírováno %d řádků do schránky"
        },
        "createState": "Vytvořit Stav",
        "removeAllStates": "Vymazat všechny Stavy",
        "removeState": "Odstranit",
        "renameState": "Odstranit",
        "savedStates": "Uložit Stavy",
        "stateRestore": "Stav %d",
        "updateState": "Aktualizovat"
    },
    "searchPanes": {
        "clearMessage": "Smazat vše",
        "collapse": {
            "0": "Vyhledávací Panely",
            "_": "Vyhledávací Panely (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Žádné Vyhledávací Panely",
        "loadMessage": "Načítám Vyhledávací Panely",
        "title": "Aktivních filtrů - %d",
        "showMessage": "Zobrazit Vše",
        "collapseMessage": "Sbalit Vše"
    },
    "select": {
        "cells": {
            "1": "Vybrán 1 záznam",
            "_": "Vybráno %d záznamů"
        },
        "columns": {
            "1": "Vybrán 1 sloupec",
            "_": "Vybráno %d sloupců"
        },
        "rows": {
            "1": "Vybrán 1 řádek",
            "_": "Vybráno %d řádků"
        }
    },
    "aria": {
        "sortAscending": "Aktivujte pro seřazení vzestupně",
        "sortDescending": "Aktivujte pro seřazení sestupně"
    },
    "lengthMenu": "Zobrazit _MENU_ výsledků",
    "processing": "ZpracovÀ�vání...",
    "search": "Vyhledávání:",
    "datetime": {
        "previous": "Předchozí",
        "next": "Další",
        "hours": "Hodiny",
        "minutes": "Minuty",
        "seconds": "Vteřiny",
        "unknown": "-",
        "amPm": [
            "Dopoledne",
            "Odpoledne"
        ],
        "weekdays": [
            "Po",
            "Út",
            "St",
            "Čt",
            "Pá",
            "So",
            "Ne"
        ],
        "months": [
            "Leden",
            "Únor",
            "Březen",
            "Duben",
            "Květen",
            "Červen",
            "Červenec",
            "Srpen",
            "Září",
            "Říjen",
            "Listopad",
            "Prosinec"
        ]
    },
    "editor": {
        "close": "Zavřít",
        "create": {
            "button": "Nový",
            "title": "Nový záznam",
            "submit": "Vytvořit"
        },
        "edit": {
            "button": "Změnit",
            "title": "Změnit záznam",
            "submit": "Aktualizovat"
        },
        "remove": {
            "button": "Vymazat",
            "title": "Smazání",
            "submit": "Vymazat",
            "confirm": {
                "_": "Opravdu chcete smazat tyto %d řádky?",
                "1": "Opravdu chcete smazat tento 1 řádek?"
            }
        },
        "multi": {
            "title": "Mnohočetný výběr",
            "restore": "Vrátit změny",
            "noMulti": "Toto pole může být editováno individuálně, ale ne jako soušást skupiny.",
            "info": "Vybrané položky obsahují různé hodnoty pro tento vstup. Chcete-li upravit a nastavit všechny položky tohoto vstupu na stejnou hodnotu, klikněte nebo klepněte sem, jinak si zachovají své individuální hodnoty."
        },
        "error": {
            "system": "Došlo k systémové chybě (&lt;a target=\"\\\" rel=\"nofollow\" href=\"\\\"&gt;Více informací&lt;\/a&gt;)."
        }
    },
    "infoThousands": " ",
    "decimal": ",",
    "thousands": " ",
    "stateRestore": {
        "creationModal": {
            "button": "Vytvořit",
            "columns": {
                "search": "Vyhledávání v buňce",
                "visible": "Viditelnost buňky"
            },
            "name": "Název:",
            "order": "Řazení",
            "paging": "Stránkování",
            "scroller": "Pozice skrolování",
            "select": "Výběr",
            "title": "Vytvořit nový Stav",
            "toggleLabel": "Zahrnout",
            "search": "Filtrování",
            "searchBuilder": "Rozšířené filtrování"
        },
        "duplicateError": "Stav s tímto názvem ji existuje.",
        "emptyError": "Název nemůže být prázný.",
        "emptyStates": "Žádné uložené stavy",
        "removeConfirm": "Opravdu chcete odstranbit %s?",
        "removeError": "Chyba při odstraňování stavu.",
        "removeJoiner": "a",
        "removeSubmit": "Odstranit",
        "removeTitle": "Odstranit Stav",
        "renameButton": "Vymazat",
        "renameLabel": "Nové jméno pro %s:",
        "renameTitle": "Přejmenování Stavu"
    },
    "searchPlaceholder": "Příklad zástupného prvku"
};
}));
