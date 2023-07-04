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
    "emptyTable": "Ei näytettäviä tuloksia.",
    "infoEmpty": "Näytetään 0 - 0 (yhteensä 0)",
    "infoFiltered": "(suodatettu _MAX_ tuloksen joukosta)",
    "infoThousands": ",",
    "lengthMenu": "Näytä kerralla _MENU_ riviä",
    "loadingRecords": "Ladataan...",
    "processing": "Hetkinen...",
    "search": "Etsi:",
    "zeroRecords": "Tietoja ei löytynyt",
    "paginate": {
        "first": "Ensimmäinen",
        "last": "Viimeinen",
        "next": "Seuraava",
        "previous": "Edellinen"
    },
    "aria": {
        "sortAscending": ": lajittele sarake nousevasti",
        "sortDescending": ": lajittele sarake laskevasti"
    },
    "select": {
        "rows": {
            "_": "Valittuna %d riviä",
            "1": "Valittuna vain yksi rivi"
        }
    },
    "buttons": {
        "copy": "Kopioi",
        "copySuccess": {
            "1": "Yksi rivi kopioitu leikepöydälle",
            "_": "%d riviä kopioitu leikepöydälle"
        },
        "copyTitle": "Kopioi leikepöydälle",
        "copyKeys": "Paina <i>ctrl<\/i> tai <i>⌘<\/i> + <i>C<\/i> kopioidaksesi taulukon arvot<br> leikepöydälle. <br><br>Peruuttaaksesi klikkaa tähän tai Esc.",
        "colvisRestore": "Palauta oletusasetukset"
    },
    "info": "Näytetään rivit _START_ - _END_ (yhteensä _TOTAL_)",
    "autoFill": {
        "cancel": "Peruuta"
    },
    "datetime": {
        "previous": "Edellinen",
        "next": "Seuraava",
        "hours": "Tunnit",
        "minutes": "Minuutit",
        "seconds": "Sekunnit",
        "unknown": "-",
        "amPm": [
            "ap",
            "ip"
        ],
        "weekdays": [
            "Su",
            "Ma",
            "Ti",
            "Ke",
            "To",
            "Pe",
            "La"
        ],
        "months": [
            "Tammikuu",
            "Helmikuu",
            "Maaliskuu",
            "Huhtikuu",
            "Toukokuu",
            "Kesäkuu",
            "Heinäkuu",
            "Elokuu",
            "Syyskuu",
            "Lokakuu",
            "Marraskuu",
            "Joulukuu"
        ]
    },
    "editor": {
        "close": "Sulje",
        "create": {
            "button": "Uusi",
            "title": "Otsikko",
            "submit": "Tallenna"
        },
        "edit": {
            "button": "Muokkaa",
            "title": "Otsikko",
            "submit": "Tallenna"
        },
        "remove": {
            "button": "Poista",
            "title": "Otsikko",
            "submit": "Poista"
        }
    }
};
}));
