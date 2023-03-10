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
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Llenar",
        "fillHorizontal": "Llenar celdas horizontalmente",
        "fillVertical": "Llenar celdas verticalemente",
        "info": "Información"
    },
    "buttons": {
        "copy": "Copiar",
        "copySuccess": {
            "_": "Copiado con exito",
            "1": "Fila copiada con exito"
        },
        "copyTitle": "Tabla Copiada",
        "createState": "Crear estado",
        "pageLength": {
            "_": "ver %d filas",
            "-1": "Ver todas las Filas",
            "1": "Ver una fila"
        },
        "renameState": "Renombrar",
        "updateState": "Actualizar",
        "csv": "CSV",
        "excel": "Excel",
        "pdf": "PDF",
        "collection": "Colección",
        "colvis": "Visibilidad Columna",
        "colvisRestore": "Restaurar Visibilidad",
        "copyKeys": "Presione Inicio + C para copiar la información de la tabla.  Para Cancelar hacer click en este mensaje para o ESC",
        "print": "Imprimir",
        "removeAllStates": "Eliminar todos los estados",
        "removeState": "Eliminar",
        "savedStates": "Estados Guardados",
        "stateRestore": "Estado %d"
    },
    "datetime": {
        "months": {
            "0": "Enero",
            "1": "Febrero",
            "10": "Noviembre",
            "11": "Diciembre",
            "2": "Marzo",
            "3": "Abril",
            "4": "Mayo",
            "5": "Junio",
            "6": "Julio",
            "7": "Agosto",
            "8": "Septiembre",
            "9": "Octubre"
        },
        "weekdays": {
            "0": "Dom",
            "1": "Lun",
            "2": "Mar",
            "4": "Jue",
            "5": "Vie",
            "3": "Mié",
            "6": "Sáb"
        },
        "amPm": [
            "am",
            "pm"
        ],
        "previous": "Anterior",
        "next": "Siguiente",
        "hours": "Hora",
        "minutes": "Minuto",
        "seconds": "Segundo",
        "unknown": "Desconocido"
    },
    "editor": {
        "close": "Cerrar",
        "create": {
            "button": "Nuevo",
            "submit": "Crear",
            "title": "Crear nueva entrada"
        },
        "edit": {
            "button": "Editar",
            "submit": "Actualizar",
            "title": "Editar Registro"
        },
        "remove": {
            "button": "Borrar",
            "submit": "Borrar",
            "title": "Borrar",
            "confirm": {
                "_": "Esta seguro de eliminar %d registros",
                "1": "Esta seguro de eliminar 1 registro"
            }
        },
        "multi": {
            "info": "Los elementos seleccionados contienen diferentes valores para esta entrada. Para editar y configurar todos los elementos de esta entrada en el mismo valor, haga clic o toque aquí, de lo contrario, conservar sus valores individuales.",
            "noMulti": "Múltiples valores",
            "title": "Valores multiples",
            "restore": "Deshacer cambios"
        },
        "error": {
            "system": "Ha ocurrido un error del sistema ( Mas Información)"
        }
    },
    "emptyTable": "Tabla Vacia",
    "info": "informacion",
    "infoEmpty": "Sin informacion",
    "lengthMenu": "Entradas",
    "loadingRecords": "Cargando...",
    "searchBuilder": {
        "button": {
            "_": "Creador de búsquedas (%d)",
            "0": "Creador de búsquedas"
        },
        "clearAll": "Quitar filtro",
        "data": "Datos",
        "logicAnd": "Y",
        "logicOr": "O",
        "value": "Valor",
        "add": "Agragar condición",
        "condition": "Condición",
        "conditions": {
            "date": {
                "after": "Después",
                "before": "Antes",
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual",
                "not": "No",
                "notBetween": "No Entre",
                "notEmpty": "No Vacío"
            },
            "number": {
                "between": "Entre",
                "empty": "Vacío",
                "equals": "Igual",
                "gt": "Mayor",
                "gte": "Mayor o Igual",
                "lt": "Menor",
                "lte": "Menor o Igual",
                "not": "No",
                "notBetween": "No Entre",
                "notEmpty": "No vacío"
            },
            "string": {
                "contains": "Contine",
                "empty": "Vacío",
                "endsWith": "Termina en",
                "equals": "Iguales",
                "not": "No",
                "notEmpty": "No Vacío",
                "startsWith": "Empieza en",
                "notContains": "No Contiene",
                "notStartsWith": "No empieza en",
                "notEndsWith": "No finaliza en"
            },
            "array": {
                "equals": "Iguales",
                "empty": "Vacío",
                "contains": "Contiene",
                "not": "No",
                "notEmpty": "No Vacío",
                "without": "Con"
            }
        },
        "deleteTitle": "Eliminar regla",
        "leftTitle": "Izquierda",
        "rightTitle": "Derecha",
        "title": {
            "0": "Generador de Consultas",
            "_": "Generador de Consultas (%d)"
        }
    },
    "searchPanes": {
        "clearMessage": "Borrar Filtro",
        "collapseMessage": "desplegar todo",
        "loadMessage": "Cargando informacion",
        "showMessage": "Mostrar todos",
        "title": "Filtros Activos - %d",
        "collapse": {
            "0": "Paneles de Búsqueda",
            "_": "Paneles de Búsqueda (%d)"
        },
        "count": "Cuenta",
        "countFiltered": "Cuenta Filtro",
        "emptyPanes": "No hay información"
    },
    "searchPlaceholder": "Busqueda en tabla",
    "select": {
        "cells": {
            "_": "%d celdas seleccionadas",
            "1": "1 celda seleccionada"
        },
        "columns": {
            "_": "%d columnas seleccionadas",
            "1": "1 columna seleccionada"
        },
        "rows": {
            "1": "Fila seleccionada",
            "_": "Filas Seleccionadas"
        }
    },
    "aria": {
        "sortAscending": "Activar para ordenar ascendente",
        "sortDescending": "Activar para ordenar descendente"
    },
    "decimal": ".",
    "infoFiltered": "filtrado de _MAX_ entradas totales",
    "infoPostFix": "Mostrando %d a %d de %d entradas",
    "infoThousands": ",",
    "paginate": {
        "first": "Primero",
        "last": "Último",
        "next": "Siguiente",
        "previous": "Anterior"
    },
    "processing": "Procesando...",
    "search": "Buscar:",
    "thousands": ",",
    "zeroRecords": "No se encontro información",
    "stateRestore": {
        "creationModal": {
            "button": "Crear",
            "columns": {
                "search": "Búsqueda columnas",
                "visible": "Visibilidad de columa"
            },
            "name": "Nombre:",
            "order": "Ordenar",
            "paging": "Paginado",
            "scroller": "Posición desplazamiento",
            "search": "Buscar",
            "searchBuilder": "Generador de Consultas",
            "select": "Seleccionar",
            "title": "Crear Nuevo Estado",
            "toggleLabel": "Incluir:"
        },
        "duplicateError": "Ya existe un estado con este nombre",
        "emptyError": "El nombre no puede estar vacío",
        "emptyStates": "Estado sin Guardar",
        "removeConfirm": "Esta seguro de eliminar el estado %d?",
        "removeError": "Error al eliminar el estado",
        "removeJoiner": "y",
        "removeSubmit": "Eliminar",
        "removeTitle": "Eliminar Estado",
        "renameButton": "Eliminar",
        "renameLabel": "Nuevo nombre para %s",
        "renameTitle": "Renombrar Estado"
    }
};
}));
