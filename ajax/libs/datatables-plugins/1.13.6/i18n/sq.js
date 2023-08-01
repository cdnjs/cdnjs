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
    "infoThousands": ",",
    "search": "Kërkoni:",
    "paginate": {
        "first": "E para",
        "last": "E Fundit",
        "next": "Tjetra",
        "previous": "E Kaluara"
    },
    "buttons": {
        "copy": "Kopjo",
        "csv": "CSV",
        "excel": "EXCEL",
        "pdf": "PDF",
        "print": "Printo",
        "collection": "Të dhënat",
        "colvis": "Shfaq kolonat",
        "colvisRestore": "Rikthe shfaqjen",
        "copyKeys": "Shtyp _ctr ose _⌘ + _C për të kopjuar të dhënat në Clipboard. Për të anulluar, kliko mesazhin ose shtyp butonin 'Escape'.",
        "copySuccess": {
            "_": "U kopjuan %d rreshta në clipboard",
            "1": "U kopjua 1 rresht në clipboard"
        },
        "copyTitle": "Kopjo në Clipboard",
        "pageLength": {
            "_": "Shfaq %d rreshta",
            "-1": "Shfaq të gjithë rreshtat"
        },
        "createState": "Krijo Gjendje",
        "removeAllStates": "Shlyej Të Gjitha Gjendjet",
        "removeState": "Shlyej",
        "renameState": "Riemërto",
        "savedStates": "Gjendjet e Ruajtura",
        "stateRestore": "Shteti %d",
        "updateState": "Përditëso"
    },
    "datetime": {
        "amPm": [
            "am",
            "pm"
        ],
        "hours": "Ora",
        "minutes": "Minuta",
        "seconds": "Sekonda",
        "months": {
            "0": "Janar",
            "1": "Shkurt",
            "10": "Nëntor",
            "11": "Dhjetor",
            "2": "Mars",
            "3": "Prill",
            "4": "Maj",
            "5": "Qershor",
            "6": "Korrik",
            "7": "Gusht",
            "8": "Shtator",
            "9": "Tetor"
        },
        "next": "Përpara",
        "previous": "Prapa",
        "unknown": "-",
        "weekdays": [
            "E hëne",
            "E martë",
            "E mërkurë",
            "E enjte",
            "E premte",
            "E shtunë",
            "E diel"
        ]
    },
    "processing": "Po procesohen...",
    "thousands": ",",
    "aria": {
        "sortAscending": ": aktivizo për të renditur kolonën me vlera në ngritje",
        "sortDescending": ": aktivizo për të renditur kolonën me vlera në zbritje"
    },
    "autoFill": {
        "fill": "Plotëso",
        "fillHorizontal": "Plotëso rreshtat",
        "fillVertical": "Plotëso kolonat",
        "cancel": "Anulo"
    },
    "decimal": ",",
    "editor": {
        "close": "Mbyll",
        "create": {
            "button": "Krijo",
            "submit": "Krijojeni",
            "title": "Krijo rekord të ri"
        },
        "edit": {
            "button": "Modifiko",
            "submit": "Modifikojeni",
            "title": "Modifiko një të dhënë ekzistuese"
        },
        "error": {
            "system": "Ka ndodhur një gabim në sistem. (<a target=\"\\\" rel=\"\\ nofollow\" href=\"\\\">Më shumë informacion&lt;\\\/a&gt;).<\/a>"
        },
        "multi": {
            "restore": "Zhbëj ndryshimet",
            "title": "Vlera të shumÀ�fishta",
            "info": "Artikujt e selektuar përmbajnë vlera të ndryshme për këtë input. Për të edituar dhe t'i rivendosur të gjithë artikujt për këtë input me vlerën e njejtë, klikoni këtu, përndryshe ato do të mbajnë vlerat e tyre individuale.",
            "noMulti": "Ky input mund të përditësohet individualisht, por jo si pjesë e një grupi."
        },
        "remove": {
            "button": "Fshi",
            "confirm": {
                "_": "Jeni i sigurë që doni të fshini %d rreshta?",
                "1": "Jeni i sigurë që doni të fshini 1 rresht?"
            },
            "submit": "Fshijeni",
            "title": "Fshi"
        }
    },
    "emptyTable": "Nuk ka asnjë të dhënë në tabelë",
    "info": "Duke treguar _START_ deri _END_ prej _TOTAL_ rreshtave",
    "infoEmpty": "Duke treguar 0 deri 0 prej 0 rreshtave",
    "infoFiltered": "(të filtruara prej gjithsej _MAX_  reshtave)",
    "lengthMenu": "Shfaq _MENU_ rreshta",
    "loadingRecords": "Po merren te dhënat...",
    "searchBuilder": {
        "add": "Shto kusht",
        "button": {
            "_": "Nderto logjikë kërkimi (%d)",
            "0": "Nderto logjikë kërkimi"
        },
        "clearAll": "Pastro të gjitha",
        "condition": "Kusht",
        "conditions": {
            "array": {
                "contains": "përmban",
                "empty": "bosh",
                "equals": "i\/e barabartë",
                "not": "jo",
                "notEmpty": "jo bosh",
                "without": "pa"
            },
            "date": {
                "after": "pas",
                "before": "para",
                "between": "ndërmjet",
                "empty": "bosh",
                "equals": "i\/e barabartë",
                "not": "jo",
                "notBetween": "jo ndërmjet",
                "notEmpty": "jo bosh"
            },
            "number": {
                "between": "ndërmjet",
                "empty": "bosh",
                "equals": "i\/e barabartë\"",
                "gt": "më i\/e madh\/e se",
                "gte": "më i\/e madh\/e ose i\/e barabartë me",
                "lt": "më i\/e vogël se",
                "lte": "më i\/e madh\/e ose i\/e barabartë me",
                "not": "jo",
                "notBetween": "jo ndërmjet",
                "notEmpty": "jo bosh"
            },
            "string": {
                "contains": "përmban",
                "empty": "bosh",
                "endsWith": "mbaron me",
                "equals": "i\/e barabartë",
                "not": "jo",
                "notEmpty": "jo bosh",
                "startsWith": "fillon me",
                "notContains": "Nuk Përmban",
                "notStartsWith": "Nuk Fillon Me",
                "notEndsWith": "Nuk Përfundon Me"
            }
        },
        "data": "Të dhëna",
        "deleteTitle": "Fshi rregullin e filtrimit",
        "logicAnd": "Edhe",
        "logicOr": "Ose",
        "title": {
            "_": "Logjikë kërkimi (%d)",
            "0": "Logjikë kërkimi"
        },
        "value": "Vlera"
    },
    "searchPanes": {
        "clearMessage": "Pastro të gjitha",
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "title": "Filtra aktivë - %d",
        "collapse": {
            "0": "DritaretKerkimit",
            "_": "DritaretKerkimit (%d)"
        },
        "emptyPanes": "Nuk ka dritare të kërkimit",
        "loadMessage": "Duke ngarkuar dritaret e kërkimit",
        "showMessage": "Shfaq të gjitha",
        "collapseMessage": "Mbyll të gjitha"
    },
    "select": {
        "cells": {
            "_": "%d qeliza të zgjedhura",
            "1": "1 qelizë e zgjedhur"
        },
        "columns": {
            "_": "%d kolona të zgjedhura",
            "1": "1 kolonë e zgjedhur"
        }
    },
    "zeroRecords": "Nuk u gjet asnjë e dhënë",
    "searchPlaceholder": "Vendmbajtës shembull",
    "stateRestore": {
        "creationModal": {
            "button": "Krijo",
            "columns": {
                "search": "Kërkimi Kolonës",
                "visible": "Pamja Kolonës"
            },
            "name": "Emri:",
            "order": "Renditja",
            "paging": "Faqezimi",
            "scroller": "Pozicioni i lëvizjes",
            "search": "Kërkimi",
            "searchBuilder": "NdertuesiKerkimit",
            "select": "Selekto",
            "title": "Krijo Gjendje Të Re",
            "toggleLabel": "Përfshin:"
        },
        "duplicateError": "Ekziton njÀ� gjendje me këtë emër.",
        "emptyError": "Emri nuk mund të jetë i zbrazët.",
        "emptyStates": "Nuk ka gjendje të ruajtura.",
        "removeConfirm": "A jeni i sigurtë që doni të shlyeni %s?",
        "removeError": "Shlyerja e gjendjes dështoi.",
        "removeJoiner": "dhe",
        "removeSubmit": "Shlyej",
        "removeTitle": "Shlyej Gjendje",
        "renameButton": "Riemërto",
        "renameLabel": "Emri i ri për %s:",
        "renameTitle": "Riemërto Gjendje"
    }
};
}));
