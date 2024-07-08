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
    "aria": {
        "sortAscending": ": aktivirajte da sortirate kolonu uzlazno",
        "sortDescending": ": aktivirajte da sortirate kolonu silazno"
    },
    "autoFill": {
        "cancel": "Poništiti",
        "fill": "Ispunite sve ćelije s <i>% d <\/i>",
        "fillHorizontal": "Ispunite ćelije vodoravno",
        "fillVertical": "Ispunite ćelije vertikalno"
    },
    "buttons": {
        "collection": "Collection <span class=\"ui-button-icon-primary ui-icon ui-icon-triangle-1-s\"><\/span>",
        "colvis": "Vidljivost kolone",
        "colvisRestore": "Vratite vidljivost",
        "copy": "Kopiraj",
        "copyKeys": "Pritisnite ctrl ili u2318 + C da biste kopirali podatke tabele u sistemski međuspremnik. <br \/> <br \/> Za otkazivanje kliknite ovu poruku ili pritisnite Escape.",
        "copySuccess": {
            "1": "Kopiran je 1 red u međuspremnik",
            "_": "Kopirani su %d redova u međuspremnik"
        },
        "copyTitle": "Kopirajte u međuspremnik",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Prikaži sve redove",
            "_": "Prikaži %d redova"
        },
        "pdf": "PDF",
        "print": "Štampaj"
    },
    "emptyTable": "Nema podataka u tabeli",
    "info": "Prikaz _START_ do _END_ od ukupno _TOTAL_ zapisa",
    "infoEmpty": "Prikaz 0 do 0 od ukupno 0 zapisa",
    "infoFiltered": "(filtrirano od ukupno _MAX_ zapisa)",
    "infoThousands": ".",
    "lengthMenu": "Prikaži _MENU_ zapisa",
    "loadingRecords": "Učitavanje...",
    "paginate": {
        "first": "Početna",
        "last": "Poslednja",
        "next": "Sledeća",
        "previous": "Prethodna"
    },
    "processing": "Obrada...",
    "search": "Pretraga:",
    "searchBuilder": {
        "add": "Dodaj uslov",
        "clearAll": "Obriši sve"
    },
    "searchPanes": {
        "clearMessage": "Obriši sve",
        "collapse": {
            "0": "Paneli za Pretragu",
            "_": "Paneli za Pretragu (%d)"
        },
        "count": "{total}",
        "countFiltered": "{shown} ({total})",
        "emptyPanes": "Nema panela za pretragu",
        "loadMessage": "Učitavanje panela za pretragu",
        "title": "Aktivni filteri - %d"
    },
    "select": {
        "cells": {
            "1": "Odabran je 1 red",
            "_": "Broj odabranih redova: %d"
        },
        "columns": {
            "1": "Jedna colona odabrana",
            "_": "Broj odabranih kolona: %d"
        }
    },
    "zeroRecords": "Nisu pronađeni odgovarajući zapisi"
};
}));
