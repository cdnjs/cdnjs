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
    "emptyTable": "Engin gögn eru í þessari töflu",
    "info": "Sýni _START_ til _END_ af _TOTAL_ færslum",
    "infoEmpty": "Sýni 0 til 0 af 0 færslum",
    "infoFiltered": "(síað út frá _MAX_ færslum)",
    "infoThousands": ".",
    "lengthMenu": "Sýna _MENU_ færslur",
    "loadingRecords": "Hleð...",
    "processing": "Úrvinnsla...",
    "search": "Leita:",
    "zeroRecords": "Engar færslur fundust",
    "paginate": {
        "first": "Fyrsta",
        "last": "Síðasta",
        "next": "Næsta",
        "previous": "Fyrri"
    },
    "aria": {
        "sortAscending": ": virkja til að raða dálki í hækkandi röð",
        "sortDescending": ": virkja til að raða dálki lækkandi í röð"
    },
    "autoFill": {
        "cancel": "Hætta við",
        "fill": "Setja öll svæði með <i>%d<\/i>",
        "fillHorizontal": "Setja öll svæði lárétt",
        "fillVertical": "Setja öll svæði lóðrétt"
    },
    "buttons": {
        "colvis": "Sýnileiki dálka",
        "colvisRestore": "Endurstilla sýnileika",
        "copy": "Afrita",
        "copyKeys": "Smelltu á ctrl or u2318 + C til að afrita töfluna í klippiborðið.<br \/><br \/>Smelltu hér eða á  exape til að hætta við.",
        "copySuccess": {
            "_": "Afritaði %d línur yfir í klippiborðið",
            "1": "Afritaði 1 línu yfir í klippiborðið"
        },
        "copyTitle": "Afrita í klippiborð",
        "csv": "CSV",
        "excel": "Escel",
        "pageLength": {
            "_": "Sýna %d línur",
            "-1": "Sýna allar línur"
        },
        "pdf": "PDF",
        "print": "Prenta"
    },
    "datetime": {
        "amPm": [
            "eh",
            "fh"
        ],
        "hours": "Klst. ",
        "minutes": "Mínúta",
        "next": "Næsta",
        "previous": "Fyrri",
        "seconds": "Sekúnda",
        "unknown": "-"
    },
    "decimal": ",",
    "editor": {
        "close": "Loka",
        "create": {
            "button": "Nýskrá",
            "submit": "Vista",
            "title": "Skrá nýja færslu"
        },
        "edit": {
            "button": "Rita",
            "submit": "Vista",
            "title": "Breyta færslu"
        },
        "multi": {
            "title": "Mörg gildi"
        },
        "remove": {
            "button": "Eyða",
            "submit": "Eyða",
            "title": "Eyða"
        }
    },
    "thousands": "."
};
}));
