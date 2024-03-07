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
    "processing": "Procesando...",
    "lengthMenu": "Mostrar _MENU_ rexistros",
    "zeroRecords": "Non se atoparon resultados",
    "emptyTable": "Ningún dato dispoñible nesta táboa",
    "info": "Mostrando rexistros do _START_ ao _END_ dun total de _TOTAL_ rexistros",
    "infoEmpty": "Mostrando rexistros do 0 ao 0 dun total de 0 rexistros",
    "infoFiltered": "(filtrado dun total de _MAX_ rexistros)",
    "search": "Buscar:",
    "loadingRecords": "Cargando...",
    "paginate": {
        "first": "Primeiro",
        "last": "Último",
        "next": "Seguinte",
        "previous": "Anterior"
    },
    "aria": {
        "sortAscending": ": Activar para ordenar a columna de maneira ascendente",
        "sortDescending": ": Activar para ordenar a columna de maneira descendente"
    },
    "autoFill": {
        "cancel": "Cancelar",
        "fill": "Rechea todas as celas con <i>%d<\/i>",
        "fillHorizontal": "Rechea celas horizontamente",
        "fillVertical": "Rechea celas verticalmente"
    },
    "buttons": {
        "collection": "Colección",
        "colvis": "Visibilidade da columna",
        "colvisRestore": "Restaurar visibilidade",
        "copy": "Copiar",
        "copyKeys": "Preme ctrl o u2318 + C para copiar os datos da táboa ao portapapeis do sistema. <br \/> <br \/> Para cancelar, fai clic nesta mensaxe ou preme escape.",
        "copyTitle": "Copiar ao portapapeis",
        "csv": "CSV",
        "excel": "Excel",
        "pdf": "PDF"
    },
    "decimal": ",",
    "infoThousands": ".",
    "thousands": "."
};
}));
