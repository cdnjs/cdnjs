/**
 * jqGrid Italian Translation
**/

/*jslint white: true */
/*global jQuery */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery"], factory);
	} else if (typeof exports === "object") {
		// Node/CommonJS
		factory(require("jquery"));
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
"use strict";
var locInfo = {
	isRTL: false,
	defaults: {
		recordtext: "Visualizzati {0} - {1} di {2}",
		emptyrecords: "Nessun record da visualizzare",
		loadtext: "Caricamento...",
		pgtext: "Pagina {0} di {1}",
		pgfirst: "First Page",
		pglast: "Last Page",
		pgnext: "Next Page",
		pgprev: "Previous Page",
		pgrecs: "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "Salvataggio in corso..."
	},
	search: {
		caption: "Ricerca...",
		Find: "Cerca",
		Reset: "Pulisci",
		odata: [
			{ oper: "eq", text: "uguale" },
			{ oper: "ne", text: "diverso" },
			{ oper: "lt", text: "minore" },
			{ oper: "le", text: "minore o uguale" },
			{ oper: "gt", text: "maggiore" },
			{ oper: "ge", text: "maggiore o uguale" },
			{ oper: "bw", text: "inizia con" },
			{ oper: "bn", text: "non inizia con" },
			{ oper: "in", text: "in" },
			{ oper: "ni", text: "non in" },
			{ oper: "ew", text: "termina con" },
			{ oper: "en", text: "non termina con" },
			{ oper: "cn", text: "contiene" },
			{ oper: "nc", text: "non contiene" },
			{ oper: "nu", text: "is null" },
			{ oper: "nn", text: "is not null" }
		],
		groupOps: [
			{ op: "AND", text: "tutto" },
			{ op: "OR", text: "almeno uno" }
		],
		addGroupTitle: "Add subgroup",
		deleteGroupTitle: "Delete group",
		addRuleTitle: "Add rule",
		deleteRuleTitle: "Delete rule",
		operandTitle: "Click to select search operation.",
		resetTitle: "Reset Search Value"
	},
	edit: {
		addCaption: "Aggiungi Record",
		editCaption: "Modifica Record",
		bSubmit: "Invia",
		bCancel: "Chiudi",
		bClose: "Chiudi",
		saveData: "Alcuni dati modificati! Salvare i cambiamenti?",
		bYes: "Si",
		bNo: "No",
		bExit: "Esci",
		msg: {
			required: "Campo richiesto",
			number: "Per favore, inserisci un valore valido",
			minValue: "il valore deve essere maggiore o uguale a ",
			maxValue: "il valore deve essere minore o uguale a",
			email: "e-mail non corretta",
			integer: "Per favore, inserisci un numero intero valido",
			date: "Per favore, inserisci una data valida",
			url: "URL non valido. Prefisso richiesto ('http://' or 'https://')",
			nodefined: " non è definito!",
			novalue: " valore di ritorno richiesto!",
			customarray: "La function custon deve tornare un array!",
			customfcheck: "La function custom deve esistere per il custom checking!"
		}
	},
	view: {
		caption: "Visualizzazione Record",
		bClose: "Chiudi"
	},
	del: {
		caption: "Cancella",
		msg: "Cancellare record selezionato/i?",
		bSubmit: "Cancella",
		bCancel: "Annulla"
	},
	nav: {
		edittext: "",
		edittitle: "Modifica record selezionato",
		addtext: "",
		addtitle: "Aggiungi nuovo record",
		deltext: "",
		deltitle: "Cancella record selezionato",
		searchtext: "",
		searchtitle: "Ricerca record",
		refreshtext: "",
		refreshtitle: "Aggiorna griglia",
		alertcap: "Attenzione",
		alerttext: "Per favore, seleziona un record",
		viewtext: "",
		viewtitle: "Visualizza riga selezionata",
		savetext: "",
		savetitle: "Salva riga",
		canceltext: "",
		canceltitle: "Annulla modifica riga"
	},
	col: {
		caption: "Mostra/Nascondi Colonne",
		bSubmit: "Invia",
		bCancel: "Annulla"
	},
	errors: {
		errcap: "Errore",
		nourl: "Url non settata",
		norecords: "Nessun record da elaborare",
		model: "Lunghezza di colNames <> colModel!"
	},
	formatter: {
		integer: { thousandsSeparator: " ", defaultValue: "0" },
		number: { decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: "0,00" },
		currency: { decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0,00" },
		date: {
			dayNames: ["Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab", "Domenica", "Lunedì", "Martedì", "Mercoledì", "Giovedì", "Venerdì", "Sabato"],
			monthNames: [
				"Gen", "Feb", "Mar", "Apr", "Mag", "Gui", "Lug", "Ago", "Set", "Ott", "Nov", "Dic",
				"Genneio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Movembre", "Dicembre"],
			AmPm: ["am", "pm", "AM", "PM"],
			S: function (b) {
				return b < 11 || b > 13 ? ["st", "nd", "rd", "th"][Math.min((b - 1) % 10, 3)] : "th";
			},
			srcformat: "Y-m-d",
			newformat: "d/m/Y",
			masks: {
				ShortDate: "n/j/Y",
				LongDate: "l, F d, Y",
				FullDateTime: "l, F d, Y g:i:s A",
				MonthDay: "F d",
				ShortTime: "g:i A",
				LongTime: "g:i:s A",
				YearMonth: "F, Y"
			}
		}
	}
};
$.jgrid = $.jgrid || {};
$.extend(true, $.jgrid, {
	defaults: {
		locale: "it"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		it: $.extend({}, locInfo, { name: "italiano", nameEnglish: "Italian" }),
		"it-IT": $.extend({}, locInfo, { name: "italiano (Italia)", nameEnglish: "Italian (Italy)" })
	}
});
}));
