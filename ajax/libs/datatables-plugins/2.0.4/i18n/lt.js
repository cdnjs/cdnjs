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
    "emptyTable": "Lentelėje nėra duomenų",
    "info": "Rodomi įrašai nuo _START_ iki _END_ iš _TOTAL_ įrašų",
    "infoEmpty": "Rodomi įrašai nuo 0 iki 0 iš 0",
    "infoFiltered": "(atrinkta iš _MAX_ įrašų)",
    "lengthMenu": "Rodyti _MENU_ įrašus",
    "loadingRecords": "Įkeliama...",
    "processing": "Apdorojama...",
    "search": "Ieškoti:",
    "zeroRecords": "Įrašų nerasta",
    "paginate": {
        "first": "Pirmas",
        "previous": "Ankstesnis",
        "next": "Tolimesnis",
        "last": "Paskutinis"
    },
    "decimal": ",",
    "aria": {
        "sortAscending": ": suaktyvinkite, jei norite rūšiuoti stulpelį didėjančia tvarka",
        "sortDescending": ": suaktyvinkite, jei norite rūšiuoti stulpelį mažėjančia tvarka"
    },
    "autoFill": {
        "cancel": "Atšaukti",
        "fill": "Užpildykite visus <i>%d<\/i> langelius",
        "fillHorizontal": "Užpildykite ląsteles horizontaliai",
        "fillVertical": "Užpildykite langelius vertikaliai"
    },
    "buttons": {
        "collection": "Nustatyti <span class=\"\\\">&lt;\\\/span&gt;<\/span>",
        "colvis": "Stulpelių matomumas",
        "colvisRestore": "Atkurti matomumą",
        "copy": "Kopijuoti",
        "copyKeys": "Norėdami nukopijuoti lentelės duomenis į sistemos mainų sritį, paspauskite Ctrl arba u2318 + C. <br \/> <br \/> Norėdami atšaukti, spustelėkite šį pranešimą arba paspauskite Esc.",
        "copyTitle": "Nukopijuoti į iškarpinę",
        "csv": "CSV",
        "excel": "Excel",
        "pdf": "PDF",
        "print": "Spausdinti",
        "copySuccess": {
            "1": "1 eilutė nukopijuota į iškarpinę",
            "_": "%d eilučių nukopijuota į mainų sritį"
        },
        "pageLength": {
            "-1": "Rodyti visas eilutes",
            "_": "Rodyti %d eilučių"
        },
        "createState": "Sukurti stulpelį",
        "removeAllStates": "Ištrinti visus stulpelius",
        "removeState": "Ištrinti",
        "renameState": "Pervardyti",
        "savedStates": "Išsaugotos būsenos",
        "stateRestore": "Būsena %d",
        "updateState": "Atnaujinti"
    },
    "infoThousands": "  ",
    "thousands": "  ",
    "datetime": {
        "previous": "Ankstesnis",
        "next": "Kitas",
        "hours": "Valandos",
        "minutes": "Minutės",
        "seconds": "Sekundės",
        "unknown": "nežinomas",
        "amPm": [
            "am",
            "pm"
        ],
        "weekdays": [
            "Pr",
            "An",
            "Tre",
            "Kt",
            "Pn",
            "Št",
            "Sk"
        ],
        "months": [
            "Sausis",
            "Vasaris",
            "Kovas",
            "Balandis",
            "Gegužė",
            "Birželis",
            "Liepa",
            "Rugpjūtis",
            "Rugsėjis",
            "Spalis",
            "Lapkritis",
            "Gruodis"
        ]
    },
    "editor": {
        "close": "Uždaryti",
        "create": {
            "button": "Papildyti",
            "title": "Pridedamas naujas įrašas",
            "submit": "Papildyti"
        },
        "edit": {
            "button": "Redaguoti",
            "title": "Paskelbti atnaujinimą",
            "submit": "Redaguoti"
        },
        "remove": {
            "button": "Ištrinti",
            "title": "Pašalinimas",
            "submit": "Ištrinti",
            "confirm": {
                "_": "Ar tikrai norite ištrinti %d eilučių?",
                "1": "Ar tikrai norite ištrinti 1 eilutę?"
            }
        },
        "error": {
            "system": "Įvyko sistemos klaida (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Daugiau informacijos&lt;\\\\\\\/a&gt;).&lt;\/\\\/a&gt;<\/a>"
        },
        "multi": {
            "title": "Laukas su keliomis reikšmėmis",
            "info": "Pasirinktame lauke yra keli elementai su skirtingomis reikšmėmis. Norėdami pakeisti jų vertę, spustelėkite juos, kitaip jų numatytosios vertės bus išsaugotos.",
            "restore": "Anuliuoti pakeitimus",
            "noMulti": "Šią reikšmę galima redaguoti atskirai – nepriklausomai nuo grupės."
        }
    },
    "searchBuilder": {
        "add": "Pridėti sąlyga",
        "button": {
            "0": "Aktyvios užklausos",
            "_": "Užklausos kūrimas"
        },
        "clearAll": "Išvalyti viską",
        "condition": "Būklė",
        "conditions": {
            "date": {
                "after": "Po to",
                "before": "Priešais",
                "between": "Tarp",
                "empty": "Tuščia",
                "equals": "Lygus",
                "not": "nėra",
                "notBetween": "Ne tarp",
                "notEmpty": "ne tuščias"
            },
            "number": {
                "between": "Tarp",
                "empty": "Tuščia",
                "equals": "Równy",
                "gt": "Didesnis nei",
                "gte": "Lygus arba didesnis nei",
                "lt": "Mažesnis nei",
                "lte": "Lygus arba mažesnis nei",
                "not": "nėra",
                "notBetween": "Ne tarp",
                "notEmpty": "Ne tuščia"
            },
            "string": {
                "contains": "Sudėtyje yra",
                "empty": "Tuščia",
                "endsWith": "Baigiasi val",
                "equals": "Yra lygus",
                "not": "Ne",
                "notEmpty": "Ne tuščia",
                "startsWith": "Jis prasideda nuo",
                "notContains": "Sudėtyje nėra",
                "notStartsWith": "Tai neprasideda",
                "notEndsWith": "Tai nesibaigia"
            },
            "array": {
                "equals": "Yra lygus",
                "empty": "Tuščia",
                "contains": "Sudėtyje yra",
                "not": "Ne",
                "notEmpty": "Ne tuščias",
                "without": "Be"
            }
        },
        "data": "Duomenys",
        "deleteTitle": "Valymas",
        "leftTitle": "Kairė",
        "logicAnd": "Ir",
        "logicOr": "Arba",
        "rightTitle": "Dešinė",
        "title": {
            "0": "Aktyvios užklausos",
            "_": "Užklausos kūrimas"
        },
        "value": "Reikšmė"
    },
    "searchPanes": {
        "clearMessage": "Išvalyti viską",
        "collapse": {
            "0": "Grupavimas",
            "_": "Aktyvios grupės (%d)"
        },
        "count": "Skaičiuoti",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Paieškos skydelių nėra",
        "loadMessage": "Įkeliami paieškos skydeliai",
        "title": "Aktyvūs filtrai",
        "showMessage": "Rodyti viską",
        "collapseMessage": "Išplėsti viską"
    },
    "select": {
        "cells": {
            "1": "Pasirinktas %d langelis",
            "_": "Pasirinkta %d langelių"
        },
        "columns": {
            "1": "Pasirinktas stulpelis %d",
            "_": "Pasirinkta %d stulpelių"
        },
        "rows": {
            "1": "Pasirinkta 1 eilutė",
            "_": "Pasirinkta %d eilučių"
        }
    },
    "searchPlaceholder": "Ieškoti...",
    "stateRestore": {
        "creationModal": {
            "button": "Sukurti",
            "columns": {
                "search": "Stulpelio paieška",
                "visible": "Stulpelio matomumas"
            },
            "name": "Pavadinimas:",
            "order": "Rūšiavimas",
            "paging": "Puslapis",
            "scroller": "Slinkimas",
            "search": "Paieška",
            "searchBuilder": "Paieškos kūrimas",
            "select": "Pasirinkimas",
            "title": "Sukurkite naują stulpelį",
            "toggleLabel": "Sudėtis:"
        },
        "duplicateError": "Stulpelis tokiu pavadinimu jau egzistuoja",
        "emptyError": "Pavadinimas negali būti tuščias",
        "emptyStates": "Nėra išsaugotų stulpelių",
        "removeConfirm": "Ar tikrai norite ištrinti %s?",
        "removeError": "Nepavyko pašalinti būsenos.",
        "removeJoiner": "ir",
        "removeSubmit": "Ištrinti",
        "removeTitle": "Ištrinti stulpelį",
        "renameButton": "Pervardinti",
        "renameLabel": "Naujas %s pavadinimas:",
        "renameTitle": "Pervardinti stulpelį"
    }
};
}));
