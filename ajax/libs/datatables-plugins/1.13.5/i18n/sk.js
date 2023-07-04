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
    "info": "Záznamy _START_ až _END_ z celkom _TOTAL_",
    "infoEmpty": "Záznamy 0 až 0 z celkom 0 ",
    "infoFiltered": "(vyfiltrované spomedzi _MAX_ záznamov)",
    "infoThousands": " ",
    "lengthMenu": "Zobraz _MENU_ záznamov",
    "loadingRecords": "Načítavam...",
    "processing": "Spracúvam...",
    "search": "Hľadať:",
    "zeroRecords": "Nenašli sa žiadne vyhovujúce záznamy",
    "paginate": {
        "first": "Prvá",
        "last": "Posledná",
        "next": "Nasledujúca",
        "previous": "Predchádzajúca"
    },
    "aria": {
        "sortAscending": ": aktivujte na zoradenie stĺpca vzostupne",
        "sortDescending": ": aktivujte na zoradenie stĺpca zostupne"
    },
    "autoFill": {
        "cancel": "Zrušiť",
        "fill": "Vyplniť všetky bunky s <i>%d<i><\/i><\/i>",
        "fillHorizontal": "Vyplniť bunky horizontálne",
        "fillVertical": "Vyplniť bunky vertikálne"
    },
    "buttons": {
        "collection": "Kolekcia <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvisRestore": "Obnoviť viditeľnosť",
        "copy": "Kopírovať",
        "copySuccess": {
            "1": "Skopírovaný 1 riadok do schránky",
            "_": "Skopírovaných %d riadkov do schránky"
        },
        "copyTitle": "Kopírovať do schránky",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Zobraziť všetky riadky",
            "_": "Zobraziť %d riadkov"
        },
        "pdf": "PDF",
        "print": "Tlačiť",
        "colvis": "Viditeľnosť stĺpcov",
        "copyKeys": "Stlačte CTRL alebo u2318 + C pre kopírovanie dát tabuľky do systémovej schránky. Pre zrušenie kliknite na túto správu alebo stlačte ESC."
    },
    "searchBuilder": {
        "add": "Pridať Podmienku",
        "clearAll": "Zmazať všetko",
        "condition": "Podmienka",
        "conditions": {
            "date": {
                "after": "Po",
                "before": "Pred",
                "between": "Medzi",
                "empty": "Prázdne",
                "equals": "Rovná sa",
                "not": "Nie je",
                "notBetween": "Nie je medzi",
                "notEmpty": "Nie je prázdne"
            },
            "number": {
                "between": "Medzi",
                "empty": "Prázdne",
                "equals": "Rovná sa",
                "gt": "Väčšie ako",
                "gte": "Väčšie alebo rovnaké ako",
                "lt": "Menšie ako",
                "lte": "Menšie alebo rovnaké ako",
                "not": "Nie",
                "notBetween": "Nie medzi",
                "notEmpty": "Nie prázdne"
            },
            "string": {
                "contains": "Obsahuje",
                "empty": "Prázdne",
                "endsWith": "Končí s",
                "equals": "Rovná sa",
                "not": "Nie je",
                "notEmpty": "Nie je prázdne",
                "startsWith": "Začína s",
                "notContains": "Neobsahuje",
                "notStartsWith": "Nezačína s",
                "notEndsWith": "Nekončí s"
            },
            "array": {
                "equals": "Rovná sa",
                "empty": "Prázdne",
                "contains": "Obsahuje",
                "not": "Nie je",
                "notEmpty": "Nie je prázdne",
                "without": "Bez"
            }
        },
        "data": "Dáta",
        "deleteTitle": "Vymazať filtrovacie pravidlo",
        "logicAnd": "A",
        "logicOr": "Alebo",
        "value": "Hodnota",
        "button": {
            "0": "Rozšírený filter",
            "_": "Rozšírený filter (%d)"
        },
        "leftTitle": "Podmienky odseku",
        "rightTitle": "Podmienky v odseku",
        "title": {
            "0": "Rozšírený filter",
            "_": "Rozšírený filter (%d)"
        }
    },
    "searchPanes": {
        "clearMessage": "Vymazať všetko",
        "collapse": {
            "0": "Vyhľadávacie Panely",
            "_": "Vyhľadávacie Panely (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Žiadne Vyhľadávacie Panely",
        "loadMessage": "Načítavam Vyhľadávacie Panely",
        "title": "Aktívnych Filtrov - %"
    },
    "select": {
        "cells": {
            "1": "1 zvolená bunka",
            "_": "%d vybraných buniek"
        },
        "columns": {
            "1": "1 vybraný stĺpec",
            "_": "%d vybraných stĀ�pcov"
        }
    },
    "thousands": " ",
    "datetime": {
        "next": "Ďalší",
        "hours": "Hodiny",
        "minutes": "Minúty",
        "seconds": "Sekundy",
        "unknown": "Neznámy",
        "previous": "Predchádzajúci",
        "months": {
            "0": "Január",
            "1": "Feburár",
            "10": "November",
            "11": "December",
            "2": "Marec",
            "3": "Apríl",
            "4": "Máj",
            "5": "Jún",
            "6": "Júl",
            "7": "August",
            "8": "September",
            "9": "Október"
        },
        "weekdays": [
            "Nedeľa",
            "Pondelok",
            "Utorok",
            "Streda",
            "Štvrtok",
            "Piatok",
            "Sobota"
        ],
        "amPm": [
            "Dopoludnia",
            "Popoludní"
        ]
    },
    "editor": {
        "close": "Zavrieť",
        "create": {
            "button": "Nový",
            "title": "Vytvoriť nový zÀ�znam",
            "submit": "Vytvoriť"
        },
        "edit": {
            "button": "Editovať",
            "title": "Editovať záznam",
            "submit": "Aktualizovať"
        },
        "remove": {
            "button": "Vymazať",
            "title": "Vymazať",
            "submit": "Vymazať",
            "confirm": {
                "_": "Určite chcete vymazať %d riadkov?",
                "1": "Určite chcete vymazať 1 riadok?"
            }
        },
        "multi": {
            "title": "Niekoľko hodnôt",
            "info": "Zvolený prvok obsahuje rozdielne hodnoty pre tento vstup. Na editovanie a nastavenie všetkých prvkov pre tento vstup na rovnakú hodnotu, kliknite alebo klepnite tu, inak si zachovajú individuálne hodnoty.",
            "restore": "Vrátiť späť zmeny",
            "noMulti": "Tento vstup môže byť editovaný samostatne, ale nie ako súčasť skupiny."
        },
        "error": {
            "system": "Vyskytla sa systémová chyba."
        }
    },
    "decimal": ",",
    "emptyTable": "Nie sú k dispozícii žiadne dáta."
};
}));
