/**
 * @license jqGrid Slovenian Translation
 * created by Nimesin info@nimesin.com 
 *
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

/*jslint white: true */
/*global jQuery, module, require */
(function (factory) {
	"use strict";
	if (typeof define === "function" && define.amd) {
		// AMD. Register as an anonymous module.
		define(["jquery"], factory);
	} else if (typeof module === "object" && module.exports) {
		// Node/CommonJS
		module.exports = function (root, $) {
			if ($ === undefined) {
				// require("jquery") returns a factory that requires window to
				// build a jQuery instance, we normalize how we use modules
				// that require this pattern but the window provided is a noop
				// if it's defined (how jquery works)
				$ = typeof window !== "undefined" ?
						require("jquery") :
						require("jquery")(root || window);
			}
			factory($);
			return $;
		};
	} else {
		// Browser globals
		factory(jQuery);
	}
}(function ($) {
"use strict";
var locInfo = {
	isRTL: false,
	defaults: {
		recordtext: "Spregled {0} - {1} od {2}",
		emptyrecords: "Ni zapisa",
		loadtext: "Nalaganje...",
		pgtext: "Stran {0} od {1}",
		pgfirst: "Prva stran",
		pglast: "Zadnja stran",
		pgnext: "Naslednja stran",
		pgprev: "Prejšnja stran",
		pgrecs: "zapisi na stran",
		showhide: "Promijeni širenje/skupljanje grida",
		savetext: "Shranim..."
	},
	search: {
		caption: "Iskanje...",
		Find: "Najti",
		Reset: "Ponastavi",
		odata: [
			{ oper: "eq", text: "enak" },
			{ oper: "ne", text: "ni enak" },
			{ oper: "lt", text: "manj" },
			{ oper: "le", text: "manj ali enako" },
			{ oper: "gt", text: "večje" },
			{ oper: "ge", text: "večje ali enako" },
			{ oper: "bw", text: "začne z" },
			{ oper: "bn", text: "ne začne z " },
			{ oper: "in", text: "je v" },
			{ oper: "ni", text: "ni v" },
			{ oper: "ew", text: "konča z" },
			{ oper: "en", text: "ne konča z" },
			{ oper: "cn", text: "vsebuje" },
			{ oper: "nc", text: "ne vsebuje" },
			{ oper: "nu", text: "je prazno" },
			{ oper: "nn", text: "ni prazno" }
		],
		groupOps: [
			{ op: "AND", text: "vse" },
			{ op: "OR",  text: "ali" }
		],
		addGroupTitle: "Dodaj podskupino",
		deleteGroupTitle: "Izbriši skupino",
		addRuleTitle: "Dodaj pravilo",
		deleteRuleTitle: "Izbriši pravilo",
		operandTitle: "Kliknite, da izberete operacijo iskanja.",
		resetTitle: "Ponastavi vrednost iskanja"
	},
	edit: {
		addCaption: "Dodaj zapis",
		editCaption: "Urejanje zapisa",
		bSubmit: "Shrani",
		bCancel: "Prekliči",
		bClose: "Zapri",
		saveData: "Podatki so spremenjeni! Shrani spremembe?",
		bYes: "Ja",
		bNo: "Ne",
		bExit: "Prekliči",
		msg: {
			required: "Polje je obvezno",
			number: "Prosim, vnesite veljavno številko",
			minValue: "Vrednost mora biti večja ali enaka ",
			maxValue: "Vrednost mora biti manjša ali enaka",
			email: "Ni veljavna e-pošta",
			integer: "Prosim, vnesite veljavno celoštevilčno vrednost (integer)",
			date: "Prosim, vnesite veljavno datumsko vrednost ",
			url: "Ni ispraven URL. Potrebna je predpona ('http://' or 'https://')",
			nodefined: " ni definiran!",
			novalue: " zahtevani podatek je obvezen!",
			customarray: "Opcionalna funkcija mora vrniti matriko (array)!",
			customfcheck: "Opcionalna funkcija mora biti prisotna!"

		}
	},
	view: {
		caption: "Oglej zapis",
		bClose: "Zapri"
	},
	del: {
		caption: "Izbriši",
		msg: "Izbrišite izbrane zapise?",
		bSubmit: "Izbriši",
		bCancel: "Prekliči"
	},
	nav: {
		edittext: "",
		edittitle: "Uredite izbrano vrstico",
		addtext: "",
		addtitle: "Dodaj novo vrstico",
		deltext: "",
		deltitle: "Izbriši novo vrstico",
		searchtext: "",
		searchtitle: "Poišči zapise",
		refreshtext: "",
		refreshtitle: "Osveži mrežo",
		alertcap: "Opozorilo",
		alerttext: "Prosim, izberite vrstico",
		viewtext: "",
		viewtitle: "Oglej izbrane vrstice",
		savetext: "",
		savetitle: "Shrani vrstico",
		canceltext: "",
		canceltitle: "Prekliči urejanje vrstic"
	},
	col: {
		caption: "Izberite stolpce",
		bSubmit: "V redu",
		bCancel: "Prekliči"
	},
	errors: {
		errcap: "Napaka",
		nourl: "Ni URL-ja",
		norecords: "Ni podatkov za obdelavu",
		model: "colNames in colModel imajo drugačno dolžino!"
	},
	formatter: {
		integer: { thousandsSeparator: ".", defaultValue: "0" },
		number: { decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2, defaultValue: "0,00" },
		currency: { decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0,00" },
		date: {
			dayNames:   [
				"Ned", "Pon", "Tor", "Sre", "Čet", "Pet", "Sob",
				"nedelja", "ponedeljek", "torek", "sreda", "četrtek", "petek", "sobota"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "Maj", "Jun", "Jul", "Avg", "Sep", "Okt", "Nov", "Dec",
				"januar", "februar", "marec", "april", "maj", "junij", "julij", "avgust", "september", "oktober", "november", "december"
			],
			AmPm: ["am", "pm", "AM", "PM"],
			S: function () { return ""; },
			srcformat: "Y-m-d",
			newformat: "d.m.Y.",
			masks: {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// short date:
				//    d - Day of the month, 2 digits with leading zeros
				//    m - Numeric representation of a month, with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				ShortDate: "d.m.Y.",	// in jQuery UI Datepicker: "dd.mm.yy."
				// long date:
				//    l - A full textual representation of the day of the week
				//    j - Day of the month without leading zeros
				//    F - A full textual representation of a month
				//    Y - A full numeric representation of a year, 4 digits
				LongDate: "l, j. F Y", // in jQuery UI Datepicker: "dddd, d. MMMM yyyy"
				// long date with long time:
				//    l - A full textual representation of the day of the week
				//    j - Day of the month without leading zeros
				//    F - A full textual representation of a month
				//    Y - A full numeric representation of a year, 4 digits
				//    H - 24-hour format of an hour with leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				FullDateTime: "l, j. F Y H:i:s", // in jQuery UI Datepicker: "dddd, d. MMMM yyyy HH:mm:ss"
				// month day:
				//    d - Day of the month, 2 digits with leading zeros
				//    F - A full textual representation of a month
				MonthDay: "d F", // in jQuery UI Datepicker: "dd MMMM"
				// short time (without seconds)
				//    H - 24-hour format of an hour with leading zeros
				//    i - Minutes with leading zeros
				ShortTime: "H:i", // in jQuery UI Datepicker: "HH:mm"
				// long time (with seconds)
				//    H - 24-hour format of an hour with leading zeros
				//    i - Minutes with leading zeros
				//    s - Seconds, with leading zeros
				LongTime: "H:i:s", // in jQuery UI Datepicker: "HH:mm:ss"
				// month with year
				//    F - A full textual representation of a month
				//    Y - A full numeric representation of a year, 4 digits
				YearMonth: "F Y" // in jQuery UI Datepicker: "MMMM yyyy"
			}
		}
	}
};
$.jgrid = $.jgrid || {};
$.extend(true, $.jgrid, {
	defaults: {
		locale: "sl"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		sl: $.extend({}, locInfo, { name: "slovenski", nameEnglish: "Slovenian" }),
		"sl-SI": $.extend({}, locInfo, { name: "slovenski (Slovenija)", nameEnglish: "Slovenian (Slovenia)" })
	}
});
}));
