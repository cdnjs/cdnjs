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
    "emptyTable": "Naginas endataziuns",
    "info": "_START_ fin _END_ da _TOTAL_ endataziuns",
    "infoEmpty": "Naginas endataziuns",
    "infoFiltered": "(filtrà da _MAX_  endataziuns)",
    "infoThousands": ".",
    "lengthMenu": "_MENU_ Dumber da cumparsas",
    "loadingRecords": "vegn chargià ..",
    "processing": "Spetgar p.pl...",
    "search": "Tschertga",
    "zeroRecords": "Naginas endataziuns.",
    "paginate": {
        "first": "Emprima",
        "previous": "Anavos",
        "next": "Proxima",
        "last": "Ultima"
    },
    "aria": {
        "sortAscending": ": activar per zavrar las colonnas ensi",
        "sortDescending": ": activar per zavrar las colonnas engiu"
    },
    "select": {
        "rows": {
            "_": "%d lingias selecziunadas",
            "1": "1 lingia selecziunada"
        }
    },
    "buttons": {
        "print": "Stampar",
        "colvis": "Colonnas",
        "copy": "Copiar",
        "copyTitle": "Copiar en l'archiv provisoric",
        "copyKeys": "Tasta <i>ctrl<\/i> u <i>⌘<\/i> + <i>C<\/i> per copiar<br>la tabella en l'arcun provisoric.<br><br>Per interrumper cliccar il messadi u smatgar Escape",
        "copySuccess": {
            "_": "%d lingias copiadas",
            "1": "1 lingia copiada"
        },
        "pageLength": {
            "-1": "Mussar tut las lingias",
            "_": "Mussar %d lingias"
        }
    }
};
}));
