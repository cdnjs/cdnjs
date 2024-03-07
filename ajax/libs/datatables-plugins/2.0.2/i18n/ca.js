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
    "processing": "Processant...",
    "lengthMenu": "Mostra _MENU_ registres",
    "zeroRecords": "No s'han trobat registres",
    "info": "Mostrant del _START_ al _END_ d'un total de _TOTAL_ registres",
    "infoEmpty": "No hi ha registres disponibles",
    "infoFiltered": "(filtrat de _MAX_ registres)",
    "search": "Cerca:",
    "infoThousands": ".",
    "decimal": ",",
    "loadingRecords": "Carregant...",
    "paginate": {
        "first": "Primer",
        "previous": "Anterior",
        "next": "Següent",
        "last": "Darrer"
    },
    "aria": {
        "sortAscending": ": Activa per ordenar la columna de manera ascendent",
        "sortDescending": ": Activa per ordenar la columna de manera descendent"
    },
    "buttons": {
        "print": "Imprimeix",
        "copy": "Copia",
        "colvis": "Columnes",
        "copyTitle": "Copia al portapapers",
        "copySuccess": {
            "_": "%d files copiades",
            "1": "1 fila copiada"
        },
        "pageLength": {
            "-1": "Mostra totes les files",
            "_": "Mostra %d files"
        },
        "pdf": "PDF",
        "collection": "Col·lecció",
        "colvisRestore": "Restaurar visibilitat",
        "copyKeys": "Pressiona ctrl o poma + C per copiar les dades de la tabla al teu portapaper",
        "csv": "CSV",
        "excel": "Excel",
        "createState": "Crear Estat",
        "removeAllStates": "Borrar tots els Estats",
        "removeState": "Borra",
        "renameState": "Canviar nom",
        "savedStates": "Estats gravats",
        "stateRestore": "Restaura",
        "updateState": "Actualitza"
    },
    "select": {
        "rows": {
            "_": "%d files seleccionades",
            "1": "1 fila seleccionada"
        },
        "cells": {
            "1": "1 fila seleccionada",
            "_": "%d files seleccionades"
        },
        "columns": {
            "1": "1 columna seleccionada",
            "_": "%d columnes seleccionades"
        }
    },
    "autoFill": {
        "cancel": "Cancel·lar",
        "fillHorizontal": "Omple les cel·les horitzontalment",
        "fillVertical": "Omple les cel·les verticalment",
        "fill": "Omple totes les cel·les amb <i>%d<\/i>"
    },
    "thousands": ".",
    "datetime": {
        "hours": "Hora",
        "seconds": "Segons",
        "unknown": "Desconegut",
        "amPm": [
            "am",
            "pm"
        ],
        "previous": "Anterior",
        "next": "Següent",
        "months": {
            "11": "Desembre",
            "10": "Novembre",
            "9": "Octubre",
            "7": "Agost",
            "5": "Juny",
            "4": "Maig",
            "3": "Abril",
            "2": "Març",
            "1": "Febrer",
            "0": "Gener",
            "6": "Juliol",
            "8": "Setembre"
        },
        "weekdays": {
            "0": "Dg",
            "2": "Dt",
            "3": "Dc",
            "4": "Dj",
            "5": "Dv",
            "6": "Ds",
            "1": "Dl"
        },
        "minutes": "Minuts"
    },
    "editor": {
        "close": "Tancar",
        "create": {
            "button": "Nou",
            "title": "Crear nova entrada",
            "submit": "Crear"
        },
        "edit": {
            "button": "Editar",
            "title": "Editar entrada",
            "submit": "Actualitzar"
        },
        "remove": {
            "button": "Eliminar",
            "title": "Eliminar",
            "submit": "Eliminar",
            "confirm": {
                "_": "Està segur de voler eliminar %d files?",
                "1": "Està segur de voler elmiminar 1 fila?"
            }
        },
        "error": {
            "system": "Ha ocurregut un error de sistema (Més informació)"
        },
        "multi": {
            "title": "Múltiples valors",
            "restore": "Desfés el canvi",
            "info": "El ítems seleccionats contenen diferents valors per aquesta entrada. Per editar i configurar tots els ítems per a aquesta entrada al mateix valor, prem o clica tabular aquí, sino, mantindran els seus valors individuals",
            "noMulti": "Aquest camp pot ser editat individualment; però no com a part d'un grup"
        }
    },
    "searchBuilder": {
        "add": "Afegir condició",
        "clearAll": "Eliminar tot",
        "condition": "Condició",
        "conditions": {
            "date": {
                "after": "Després",
                "before": "Abans",
                "between": "Entre",
                "empty": "Buit",
                "equals": "Iguals",
                "not": "No",
                "notBetween": "No entre",
                "notEmpty": "No buit"
            },
            "number": {
                "between": "Entre",
                "empty": "Buit",
                "equals": "Iguals",
                "gt": "Major que",
                "gte": "Mejor o igual a",
                "lt": "Menor que",
                "lte": "Menor o igual a",
                "not": "No",
                "notBetween": "No entre",
                "notEmpty": "No buit"
            },
            "string": {
                "contains": "Conté",
                "empty": "Buit",
                "endsWith": "Finalitza amb",
                "equals": "Iguals",
                "not": "No",
                "notEmpty": "No buit",
                "startsWith": "Comença amb",
                "notEndsWith": "No acaba amb",
                "notStartsWith": "No comença amb",
                "notContains": "No inclou"
            },
            "array": {
                "equals": "Iguals",
                "empty": "Buit",
                "contains": "Conté",
                "not": "No",
                "notEmpty": "No buit",
                "without": "Sense"
            }
        },
        "data": "Data",
        "deleteTitle": "Esborrar regla de filtrat",
        "leftTitle": "Criteri de desindentació",
        "logicAnd": "I",
        "logicOr": "O",
        "rightTitle": "Criteri d'indentació",
        "value": "Valor",
        "title": {
            "_": "Constructor de cerca (%d)",
            "0": "Constructor de cerca"
        },
        "button": {
            "_": "Constructor de cerca (%d)",
            "0": "Constructor de cerca"
        }
    },
    "searchPanes": {
        "collapse": {
            "0": "Panells de cerca",
            "_": "Panells de cerca (%d)"
        },
        "count": "{total}",
        "countFiltered": "{monstrat} ({total})",
        "loadMessage": "Carregant panells de cerca",
        "collapseMessage": "Colapsar Tot",
        "clearMessage": "Esborrar tot",
        "emptyPanes": "No hi ha panells de cerca",
        "showMessage": "Mostrar-ho tot",
        "title": "Filtres actius - %d"
    },
    "stateRestore": {
        "removeSubmit": "Eliminar",
        "removeJoiner": "i",
        "removeError": "Error eliminant el registre",
        "removeConfirm": "¿Segur que vol eliminar aquest %s?",
        "emptyError": "El nom no pot estar buit",
        "creationModal": {
            "button": "Crear",
            "columns": {
                "search": "Cerca per columnes",
                "visible": "Visibilitat de columnes"
            },
            "name": "Nom",
            "order": "Ordenar",
            "toggleLabel": "Inclou:",
            "paging": "Paginació",
            "scroller": "Posició Scroll",
            "search": "Bñusqueda",
            "searchBuilder": "Generador Búsquedes",
            "title": "Crear nou Estat",
            "select": "Sel·lecció"
        },
        "renameLabel": "Nou nom per %s",
        "duplicateError": "Ja existeix un estat amb aquest nom",
        "emptyStates": "No hi ha estats gravats",
        "removeTitle": "Borrar Estat",
        "renameButton": "Canviar nom",
        "renameTitle": "Canviar nom"
    },
    "emptyTable": "No hi ha registres disponibles en aquesta taula"
};
}));
