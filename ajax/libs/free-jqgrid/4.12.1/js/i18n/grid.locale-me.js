/**
 * @license jqGrid Montenegrian Translation
 * Bild Studio info@bild-studio.net
 * http://www.bild-studio.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
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
		recordtext: "Pregled {0} - {1} od {2}",
		emptyrecords: "Ne postoji nijedan zapis",
		loadtext: "Učitivanje...",
		pgtext: "Strana {0} od {1}",
		pgfirst: "First Page",
		pglast: "Last Page",
		pgnext: "Next Page",
		pgprev: "Previous Page",
		pgrecs: "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "Saving..."
	},
	search: {
		caption: "Traženje...",
		Find: "Traži",
		Reset: "Resetuj",
		odata: [
			{ oper: "eq", text: "jednako" },
			{ oper: "ne", text: "nije jednako" },
			{ oper: "lt", text: "manje" },
			{ oper: "le", text: "manje ili jednako" },
			{ oper: "gt", text: "veće" },
			{ oper: "ge", text: "veće ili jednako" },
			{ oper: "bw", text: "počinje sa" },
			{ oper: "bn", text: "ne počinje sa" },
			{ oper: "in", text: "je u" },
			{ oper: "ni", text: "nije u" },
			{ oper: "ew", text: "završava sa" },
			{ oper: "en", text: "ne završava sa" },
			{ oper: "cn", text: "sadrži" },
			{ oper: "nc", text: "ne sadrži" },
			{ oper: "nu", text: "is null" },
			{ oper: "nn", text: "is not null" }
		],
		groupOps: [
			{ op: "AND", text: "sva" },
			{ op: "OR",  text: "bilo koje" }
		],
		addGroupTitle: "Add subgroup",
		deleteGroupTitle: "Delete group",
		addRuleTitle: "Add rule",
		deleteRuleTitle: "Delete rule",
		operandTitle: "Click to select search operation.",
		resetTitle: "Reset Search Value"
	},
	edit: {
		addCaption: "Dodaj zapis",
		editCaption: "Izmjeni zapis",
		bSubmit: "Pošalji",
		bCancel: "Odustani",
		bClose: "Zatvori",
		saveData: "Podatak je izmjenjen! Sačuvaj izmjene?",
		bYes: "Da",
		bNo: "Ne",
		bExit: "Odustani",
		msg: {
			required: "Polje je obavezno",
			number: "Unesite ispravan broj",
			minValue: "vrijednost mora biti veća od ili jednaka sa ",
			maxValue: "vrijednost mora biti manja ili jednaka sa",
			email: "nije ispravna email adresa, nije valjda da ne umiješ ukucati mail!?",
			integer: "Ne zajebaji se unesi cjelobrojnu vrijednost ",
			date: "Unesite ispravan datum",
			url: "nije ispravan URL. Potreban je prefiks ('http://' or 'https://')",
			nodefined: " nije definisan!",
			novalue: " zahtjevana je povratna vrijednost!",
			customarray: "Prilagođena funkcija treba da vrati niz!",
			customfcheck: "Prilagođena funkcija treba da bude prisutana u slučaju prilagođene provjere!"

		}
	},
	view: {
		caption: "Pogledaj zapis",
		bClose: "Zatvori"
	},
	del: {
		caption: "Izbrisi",
		msg: "Izbrisi izabran(e) zapise(e)?",
		bSubmit: "Izbriši",
		bCancel: "Odbaci"
	},
	nav: {
		edittext: "",
		edittitle: "Izmjeni izabrani red",
		addtext: "",
		addtitle: "Dodaj novi red",
		deltext: "",
		deltitle: "Izbriši izabran red",
		searchtext: "",
		searchtitle: "Nađi zapise",
		refreshtext: "",
		refreshtitle: "Ponovo učitaj podatke",
		alertcap: "Upozorenje",
		alerttext: "Izaberite red",
		viewtext: "",
		viewtitle: "Pogledaj izabrani red",
		savetext: "",
		savetitle: "Save row",
		canceltext: "",
		canceltitle: "Cancel row editing"
	},
	col: {
		caption: "Izaberi kolone",
		bSubmit: "OK",
		bCancel: "Odbaci"
	},
	errors: {
		errcap: "Greška",
		nourl: "Nije postavljen URL",
		norecords: "Nema zapisa za obradu",
		model: "Dužina modela colNames <> colModel!"
	},
	formatter: {
		integer: { thousandsSeparator: " ", defaultValue: "0" },
		number: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: "0.00" },
		currency: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0.00" },
		date: {
			dayNames:   [
				"Ned", "Pon", "Uto", "Sre", "Čet", "Pet", "Sub",
				"Nedelja", "Ponedeljak", "Utorak", "Srijeda", "Četvrtak", "Petak", "Subota"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec",
				"Januar", "Februar", "Mart", "April", "Maj", "Jun", "Jul", "Avgust", "Septembar", "Oktobar", "Novembar", "Decembar"
			],
			AmPm: ["am", "pm", "AM", "PM"],
			S: function (j) {
				return j < 11 || j > 13 ? ["st", "nd", "rd", "th"][Math.min((j - 1) % 10, 3)] : "th";
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
		locale: "me"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		me: $.extend({}, locInfo, { name: "Gora", nameEnglish: "Montenegrin" })
	}
});
}));
