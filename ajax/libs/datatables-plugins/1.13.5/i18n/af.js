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
    "paginate": {
        "first": "eerste",
        "last": "laaste",
        "next": "volgende",
        "previous": "vorige"
    },
    "aria": {
        "sortAscending": ": aktiveer kolom om stygend te sorteer",
        "sortDescending": ": aktiveer kolom om dalend te sorteer"
    },
    "buttons": {
        "csv": "CSV",
        "excel": "Excel",
        "pdf": "PDF",
        "print": "Druk",
        "collection": "Versameling &lt;span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"&gt;&lt;\/span&gt;",
        "colvis": "Kolom Sigbaarheid",
        "copy": "Kopieër",
        "copyKeys": "Druk &lt;i&gt;ctrl&lt;\/i&gt; of &lt;i&gt;u2318&lt;\/i&gt; + &lt;i&gt;C&lt;\/i&gt; om die tabel data to kopieër na jou knipbord.&lt;br&gt;&lt;br&gt;Om te kanselleer, druk Escape.",
        "copySuccess": {
            "1": "1 ry gekopieër na knipbord",
            "_": "%ds rye gekopieër na knipbord"
        },
        "copyTitle": "Kopieër na knipbord",
        "pageLength": {
            "-1": "Wys alle rye",
            "1": "Wys 1 ry",
            "_": "Wys %d rye"
        },
        "createState": "Skep Staat",
        "removeAllStates": "Verwyder Alle State",
        "removeState": "Verwyder",
        "renameState": "Hernoem",
        "savedStates": "Gestoorde State",
        "stateRestore": "Staat %d",
        "updateState": "Dateer op",
        "colvisRestore": "Herwin Sigbaarheid"
    },
    "searchBuilder": {
        "add": "Voeg by",
        "clearAll": "Alles uitvee",
        "condition": "Voorwaardes",
        "data": "Data"
    },
    "autoFill": {
        "cancel": "kanselleer",
        "fillHorizontal": "Vul selle horisontaal",
        "fillVertical": "Vul selle vertikaal",
        "fill": "Vul alle selle met  &lt;i&gt;%d&lt;i&gt;&lt;\/i&gt;&lt;\/i&gt;"
    },
    "emptyTable": "Geen data in tabel nie",
    "info": "Wys _START_ tot _END_ uit _TOTAL_ rye",
    "infoEmpty": "Wys 0 tot 0 uit 0 rye",
    "infoFiltered": "(gefiltreer uit _MAX_ totale rye)",
    "lengthMenu": "Wys _MENU_ rye",
    "loadingRecords": "Besig om te laai...",
    "processing": "Besig om te verwerk...",
    "search": "Soek:",
    "searchPlaceholder": "Plekhouer",
    "thousands": ",",
    "zeroRecords": "Geen gepaste rye gevind nie"
};
}));
