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
    "processing": "Procesează...",
    "lengthMenu": "Afișează _MENU_ înregistrări pe pagină",
    "zeroRecords": "Nu am găsit nimic - ne pare rău",
    "info": "Afișate de la _START_ la _END_ din _TOTAL_ înregistrări",
    "infoEmpty": "Afișate de la 0 la 0 din 0 înregistrări",
    "infoFiltered": "(filtrate dintr-un total de _MAX_ înregistrări)",
    "search": "Caută:",
    "aria": {
        "sortAscending": "Sortează ascendent",
        "sortDescending": "Sortează descendent"
    },
    "autoFill": {
        "cancel": "Anulează",
        "fill": "Completează",
        "fillVertical": "Completează celule vertical",
        "fillHorizontal": "Completeză celule orizonal"
    },
    "buttons": {
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Arată toate rândurile",
            "_": "Arată %d rânduri"
        },
        "pdf": "PDF",
        "print": "Imprimă",
        "collection": "Colecție",
        "colvis": "Vizibilitate coloane",
        "copy": "Copie",
        "copyTitle": "Copie în Clipboard",
        "colvisRestore": "Resetare vizibilitate",
        "copyKeys": "Apasă ctrl sau u2318 + C pentru a copia datele din tabel în clipboard-ul sistemului.<br \/><br \/>Pentru a anula, dați clic pe acest mesaj sau apăsați pe Escape.",
        "createState": "Creează Stare",
        "removeAllStates": "Înlătură Toate Stările",
        "removeState": "Înlătură",
        "renameState": "Redenumește",
        "savedStates": "Salvează Stări"
    },
    "searchBuilder": {
        "add": "Adaugă",
        "value": "Valoare",
        "condition": "Condiție",
        "data": "Data",
        "logicAnd": "Și",
        "logicOr": "Sau",
        "button": {
            "0": "Generator de căutare",
            "_": "Generator de căutare (%d)"
        },
        "clearAll": "Curata tot",
        "conditions": {
            "date": {
                "after": "După",
                "before": "Inainte de",
                "between": "Între",
                "empty": "Gol"
            }
        },
        "deleteTitle": "Ștergeți regula de filtrare",
        "leftTitle": "Criterii Outdent",
        "rightTitle": "Criterii de indentare",
        "title": {
            "0": "Generator de căutare",
            "_": "Generator de căutare (%d)"
        }
    },
    "loadingRecords": "Încarcă...",
    "datetime": {
        "previous": "Precedentă",
        "next": "Următoare",
        "hours": "Ore",
        "minutes": "Minute",
        "seconds": "Secunde",
        "unknown": "Necunoscut",
        "amPm": [
            "AM",
            "PM"
        ],
        "weekdays": [
            "lun",
            "Mar",
            "Mer",
            "Joi",
            "Vin",
            "Sam",
            "Dum"
        ],
        "months": [
            "Ianuarie",
            "Februarie",
            "Martie",
            "Aprilie",
            "Mai",
            "Iunie",
            "Iulie",
            "August",
            "Septembrie",
            "Octombrie",
            "Noiembrie",
            "Decembrie"
        ]
    },
    "editor": {
        "create": {
            "button": "Nou",
            "title": "Crează o intrare nouă",
            "submit": "Crează"
        },
        "edit": {
            "button": "Editează",
            "submit": "Editează",
            "title": "Editează rând"
        },
        "remove": {
            "button": "Șterge",
            "title": "Șterge",
            "submit": "Șterge",
            "confirm": {
                "_": "Sigur doriți să ștergeți %d rânduri?",
                "1": "Sigur doriți să ștergeți 1 rând?"
            }
        },
        "close": "Închide",
        "error": {
            "system": "A apărut o eroare."
        },
        "multi": {
            "title": "Valori multiple",
            "info": "Elementele selectate conțin valori diferite pentru această intrare. Pentru a edita și a seta toate elementele pentru această intrare la aceeași valoare, faceți clic sau atingeți aici, altfel își vor păstra valorile individuale.",
            "restore": "Anulează modificările",
            "noMulti": "Această intrare poate fi editată individual, dar nu face parte dintr-un grup."
        }
    },
    "decimal": ",",
    "emptyTable": "Nu există date în tabel",
    "searchPlaceholder": "Caută în tabel",
    "thousands": ".",
    "infoThousands": ".",
    "paginate": {
        "first": "Prima pagină",
        "last": "Ultima pagină",
        "next": "Pagina următoare",
        "previous": "Pagina precedentă"
    }
};
}));
