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
    "processing": "Uzgaidiet ...",
    "search": "Meklēt:",
    "lengthMenu": "Rādīt _MENU_ ierakstus",
    "infoEmpty": "Nav ierakstu",
    "infoFiltered": "(atlasīts no pavisam _MAX_ ierakstiem)",
    "loadingRecords": "Notiek ielāde ...",
    "zeroRecords": "Nav atrasti vaicājumam atbilstoši ieraksti",
    "emptyTable": "Tabulā nav datu",
    "paginate": {
        "first": "Pirmā",
        "previous": "Iepriekšējā",
        "next": "Nākošā",
        "last": "Pēdējā"
    },
    "aria": {
        "sortAscending": ": aktivizēt kolonnu, lai kārtotu augoši",
        "sortDescending": ": aktivizēt kolonnu, lai kārtotu dilstoši"
    },
    "autoFill": {
        "cancel": "Atcelt"
    },
    "buttons": {
        "collection": "Saraksts",
        "colvis": "Pievienot - noņemt kolonnas",
        "copy": "Kopēt",
        "csv": "CSV",
        "excel": "Excel",
        "pdf": "PDF",
        "print": "Printēt",
        "copyTitle": "Kopēt starpliktuvē"
    },
    "searchBuilder": {
        "add": "Pievienot",
        "clearAll": "Attīrīt visu"
    },
    "info": "Atlasīti _START_ līdz _END_ no _TOTAL_ ierakstiem",
    "searchPlaceholder": "vārds vai frāze",
    "select": {
        "cells": {
            "1": "atlasīta 1 šūna",
            "_": "atlasītas %d šūnas"
        },
        "columns": {
            "1": "atlasīta 1 kolonna",
            "_": "atlasītas %d kolonnas"
        },
        "rows": {
            "1": "atlasīta 1 rinda",
            "_": "atlasītas %d rindas"
        }
    },
    "datetime": {
        "previous": "Iepriekšējais",
        "next": "Nākamais",
        "hours": "Stunda",
        "minutes": "Minūte",
        "seconds": "Sekunde",
        "unknown": "-",
        "amPm": [
            "am",
            "pm"
        ],
        "weekdays": [
            "Pr",
            "Ot",
            "Tr",
            "Ce",
            "Pk",
            "Se",
            "Sv"
        ],
        "months": [
            "Janvāris",
            "Februāris",
            "Marts",
            "Aprīlis",
            "Maijs",
            "Jūnijs",
            "Jūlijs",
            "Augusts",
            "Septembris",
            "Oktobris",
            "Novembris",
            "Decembris"
        ]
    },
    "editor": {
        "close": "Aizvērt",
        "create": {
            "button": "Izveidot",
            "title": "Izveidot jaunu ierakstu",
            "submit": "Izveidot"
        },
        "edit": {
            "button": "Rediģēt",
            "title": "Rediģēt ierakstu",
            "submit": "Atjaunot"
        },
        "remove": {
            "button": "Izdzēst",
            "title": "Izdzēst",
            "submit": "Izdzēst",
            "confirm": {
                "_": "Vai tiešām dzēst %d rindas?",
                "1": "Vai tiešām dzēst 1 rindu?"
            }
        },
        "error": {
            "system": "Kļūda sistēmā (<a target=\"\\\" rel=\"nofollow\" href=\"\\\">Vairāk informācijas<\/a>)."
        },
        "multi": {
            "title": "Vairākas izvēles",
            "restore": "Atsaukt izmaiņas"
        }
    }
};
}));
