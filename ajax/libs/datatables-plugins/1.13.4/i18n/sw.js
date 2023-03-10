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
    "emptyTable": "Hakuna data iliyo patikana",
    "info": "Inaonyesha _START_ mpaka _END_ ya matokeo _TOTAL_",
    "infoEmpty": "Inaonyesha 0 hadi 0 ya matokeo 0",
    "infoFiltered": "(uschujo kutoka matokeo idadi _MAX_)",
    "infoThousands": ",",
    "lengthMenu": "Onyesha _MENU_ matokeo",
    "loadingRecords": "Inapakia...",
    "processing": "Processing...",
    "search": "Tafuta:",
    "zeroRecords": "Rekodi vinavyolingana haziku patikana",
    "paginate": {
        "first": "Mwanzo",
        "last": "Mwisho",
        "next": "Ijayo",
        "previous": "Kabla"
    },
    "aria": {
        "sortAscending": ": seti kulainisha sanjari kwa mtindo wa upandaji",
        "sortDescending": ": seti kulainisha sanjari kwa mtindo wa mteremko"
    },
    "autoFill": {
        "cancel": "Ghairi",
        "fill": "Jaza",
        "fillHorizontal": "Jaza kwa usawa",
        "fillVertical": "Jaza kwa wima"
    },
    "buttons": {
        "collection": "Makusanyiko",
        "colvis": "Muonekano wa safu",
        "colvisRestore": "Rejesha muonekano",
        "copy": "Nakili",
        "copySuccess": {
            "1": "Safu moja imenakili ",
            "_": "Safu %ds zimenakiliwa kwenye clipboard"
        },
        "copyTitle": "Nakili kwenye Clipboard",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "Onyesha safu zote",
            "_": "Onyesha safu %d",
            "1": "Onyesha safu %d"
        },
        "pdf": "PDF",
        "print": "Chapisha",
        "createState": "Ongeza Jimbo",
        "removeAllStates": "Ondosha Majimbo yote",
        "removeState": "Ondosha",
        "renameState": "Sasiha Jina",
        "updateState": "sasisha",
        "savedStates": "Majimbo Yaliyohifadhiwa"
    },
    "decimal": ".",
    "searchBuilder": {
        "add": "Weka Sharti",
        "clearAll": "Ondoa zote",
        "condition": "Sharti",
        "data": "Data",
        "deleteTitle": "Futa sheria ya kuchuja",
        "leftTitle": "Vigezo vya zamani",
        "logicAnd": "Pamoja na",
        "logicOr": "Au",
        "value": "Thamani"
    },
    "datetime": {
        "amPm": [
            "AM",
            "PM"
        ],
        "hours": "Saa",
        "minutes": "Dakika",
        "months": {
            "0": "Januari",
            "1": "Febuari",
            "10": "Novemba",
            "11": "Disemba",
            "2": "Machi",
            "3": "Aprili",
            "4": "Mei",
            "5": "Juni",
            "6": "Julai",
            "7": "Agosti",
            "8": "Septemba",
            "9": "Oktoba"
        },
        "next": "Kesho",
        "previous": "Jana",
        "seconds": "Sekunde",
        "unknown": "-",
        "weekdays": [
            "J3",
            "J4",
            "J5",
            "Alh",
            "Ij",
            "J1",
            "J2"
        ]
    },
    "editor": {
        "close": "Funga",
        "create": {
            "button": "Mpya",
            "submit": "Ongeza",
            "title": "Ongeza rekodi mpya"
        },
        "edit": {
            "button": "Sasisha",
            "submit": "Sasisha",
            "title": "Sasisha rekodi"
        },
        "remove": {
            "button": "Futa",
            "title": "Futa",
            "submit": "Futa"
        }
    }
};
}));
