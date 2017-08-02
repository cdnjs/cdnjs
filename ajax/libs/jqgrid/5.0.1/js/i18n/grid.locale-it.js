/*global jQuery, define */
(function( factory ) {
	"use strict";
	if ( typeof define === "function" && define.amd ) {
		// AMD. Register as an anonymous module.
		define([
			"jquery",
			"../grid.base"
		], factory );
	} else {
		// Browser globals
		factory( jQuery );
	}
}(function( $ ) {

$.jgrid = $.jgrid || {};
if(!$.jgrid.hasOwnProperty("regional")) {
	$.jgrid.regional = [];
}
$.jgrid.regional["en"] = {
	defaults : {
		recordtext: "Mostra {0} - {1} di {2}",
		emptyrecords: "Non ci osno record da mostrare",
		loadtext: "Caricamento...",
		savetext: "Salvataggio...",
		pgtext : "Pagina {0} di {1}",
		pgfirst : "Prima Pagina",
		pglast : "Ultima Pagina",
		pgnext : "Pagina Successiva",
		pgprev : "Pagina Precedente",
		pgrecs : "Records per Pagina",
		showhide: "Espandi o collassa griglia",
		// mobile
		pagerCaption : "Griglia::Impostaioni della pagina",
		pageText : "Pagina:",
		recordPage : "Records per Pagina",
		nomorerecs : "Non ci sono altri record...",
		scrollPullup: "Trascina verso l'alto per altri...",
		scrollPulldown : "Trascina verso il basso per aggiornare...",
		scrollRefresh : "Rilascia per aggiornare..."
	},
	search : {
		caption: "Cerca...",
		Find: "Trova",
		Reset: "Reset",
		odata: [{ oper:'eq', text:'uguale'},{ oper:'ne', text:'diverso'},{ oper:'lt', text:'minore'},{ oper:'le', text:'minore o uguale'},{ oper:'gt', text:'maggiore'},{ oper:'ge', text:'maggiore o uguale'},{ oper:'bw', text:'inizia per'},{ oper:'bn', text:'non inizia per'},{ oper:'in', text:'è in'},{ oper:'ni', text:'non è in'},{ oper:'ew', text:'finisce per'},{ oper:'en', text:'non finisce per'},{ oper:'cn', text:'contiene'},{ oper:'nc', text:'non contiene'},{ oper:'nu', text:'è null'},{ oper:'nn', text:'non è null'}],
		groupOps: [{ op: "AND", text: "tutti" },{ op: "OR",  text: "ciascuno" }],
		operandTitle : "Clicca sull'opzione di ricerca scelta.",
		resetTitle : "Resetta valori di ricerca"
	},
	edit : {
		addCaption: "Aggiungi Record",
		editCaption: "Modifica Record",
		bSubmit: "Invia",
		bCancel: "Annulla",
		bClose: "Chiudi",
		saveData: "I dati sono stati modificati! Salvare le modifiche?",
		bYes : "Si",
		bNo : "No",
		bExit : "Annulla",
		msg: {
			required:"Campo obbligatorio",
			number:"Per favore, inserisci un numero valido",
			minValue:"il valore deve essere maggiore o uguale a ",
			maxValue:"il valore deve essere minore o uguale a ",
			email: "non è una e-mail valida",
			integer: "Per favore, inserisci un intero valido",
			date: "Per favore, inserisci una data valida",
			url: "non è un URL valido. Prefissi richiesti ('http://' o 'https://')",
			nodefined : " non è definito!",
			novalue : " valore di ritorno richiesto!",
			customarray : "La funzione personalizzata deve restituire un array!",
			customfcheck : "La funzione personalizzata deve essere presente in caso di controlli personalizzati!"
			
		}
	},
	view : {
		caption: "Visualizza Record",
		bClose: "Chiudi"
	},
	del : {
		caption: "Cancella",
		msg: "Cancellare i record selezionati?",
		bSubmit: "Canella",
		bCancel: "Annulla"
	},
	nav : {
		edittext: "",
		edittitle: "Modifica riga selezionata",
		addtext:"",
		addtitle: "Aggiungi riga",
		deltext: "",
		deltitle: "Cancella riga",
		searchtext: "",
		searchtitle: "Trova record",
		refreshtext: "",
		refreshtitle: "Ricarica tabella",
		alertcap: "Attenzione",
		alerttext: "Per favore, seleziona un record",
		viewtext: "",
		viewtitle: "Visualizza riga selezionata",
		savetext: "",
		savetitle: "Salva riga",
		canceltext: "",
		canceltitle : "Annulla modifica riga",
		selectcaption : "Actions..."
	},
	col : {
		caption: "Seleziona colonne",
		bSubmit: "Ok",
		bCancel: "Annulla"
	},
	errors : {
		errcap : "Errore",
		nourl : "Nessun url impostato",
		norecords: "Non ci sono record da elaborare",
		model : "Lunghezza dei colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: ",", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Dom", "Lun", "Mar", "Mer", "Gio", "Ven", "Sab",
				"Domenica", "Lunedi", "Martedi", "Mercoledi", "Giovedi", "Venerdi", "Sabato"
			],
			monthNames: [
				"Gen", "Feb", "Mar", "Apr", "Mag", "Giu", "Lug", "Ago", "Set", "Ott", "Nov", "Dic",
				"Gennaio", "Febbraio", "Marzo", "Aprile", "Maggio", "Giugno", "Luglio", "Agosto", "Settembre", "Ottobre", "Novembre", "Dicembre"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'Y-m-d',
			newformat: 'n/j/Y',
			parseRe : /[#%\\\/:_;.,\t\s-]/,
			masks : {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
				// information about date, time, numbers and currency formats used in different countries
				// one should just convert the information in PHP format
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				// short date:
				//    n - Numeric representation of a month, without leading zeros
				//    j - Day of the month without leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				// example: 3/1/2012 which means 1 March 2012
				ShortDate: "n/j/Y", // in jQuery UI Datepicker: "M/d/yyyy"
				// long date:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				LongDate: "l, F d, Y", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy"
				// long date with long time:
				//    l - A full textual representation of the day of the week
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				FullDateTime: "l, F d, Y g:i:s A", // in jQuery UI Datepicker: "dddd, MMMM dd, yyyy h:mm:ss tt"
				// month day:
				//    F - A full textual representation of a month
				//    d - Day of the month, 2 digits with leading zeros
				MonthDay: "F d", // in jQuery UI Datepicker: "MMMM dd"
				// short time (without seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				ShortTime: "g:i A", // in jQuery UI Datepicker: "h:mm tt"
				// long time (with seconds)
				//    g - 12-hour format of an hour without leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				//    A - Uppercase Ante meridiem and Post meridiem (AM or PM)
				LongTime: "g:i:s A", // in jQuery UI Datepicker: "h:mm:ss tt"
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				// month with year
				//    Y - A full numeric representation of a year, 4 digits
				//    F - A full textual representation of a month
				YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
			},
			reformatAfterEdit : false,
			userLocalTime : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	}
};
}));
