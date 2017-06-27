/**
 * @license jqGrid Lithuanian Translation
 * aur1mas aur1mas@devnet.lt
 * http://aur1mas.devnet.lt
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
		recordtext: "Peržiūrima {0} - {1} iš {2}",
		emptyrecords: "Įrašų nėra",
		loadtext: "Kraunama...",
		pgtext: "Puslapis {0} iš {1}",
		pgfirst: "First Page",
		pglast: "Last Page",
		pgnext: "Next Page",
		pgprev: "Previous Page",
		pgrecs: "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "Įrašoma..."
	},
	search: {
		caption: "Paieška...",
		Find: "Ieškoti",
		Reset: "Atstatyti",
		odata: [
			{ oper: "eq", text: "lygu" },
			{ oper: "ne", text: "nelygu" },
			{ oper: "lt", text: "mažiau" },
			{ oper: "le", text: "mažiau arba lygu" },
			{ oper: "gt", text: "daugiau" },
			{ oper: "ge", text: "daugiau arba lygu" },
			{ oper: "bw", text: "prasideda" },
			{ oper: "bn", text: "neprasideda" },
			{ oper: "in", text: "reikšmė yra" },
			{ oper: "ni", text: "reikšmės nėra" },
			{ oper: "ew", text: "baigiasi" },
			{ oper: "en", text: "nesibaigia" },
			{ oper: "cn", text: "yra sudarytas" },
			{ oper: "nc", text: "nėra sudarytas" },
			{ oper: "nu", text: "is null" },
			{ oper: "nn", text: "is not null" }
		],
		groupOps: [
			{ op: "AND", text: "visi" },
			{ op: "OR",  text: "bet kuris" }
		],
		addGroupTitle: "Add subgroup",
		deleteGroupTitle: "Delete group",
		addRuleTitle: "Add rule",
		deleteRuleTitle: "Delete rule",
		operandTitle: "Click to select search operation.",
		resetTitle: "Reset Search Value"
	},
	edit: {
		addCaption: "Sukurti įrašą",
		editCaption: "Redaguoti įrašą",
		bSubmit: "Išsaugoti",
		bCancel: "Atšaukti",
		bClose: "Uždaryti",
		saveData: "Duomenys buvo pakeisti! Išsaugoti pakeitimus?",
		bYes: "Taip",
		bNo: "Ne",
		bExit: "Atšaukti",
		msg: {
			required: "Privalomas laukas",
			number: "Įveskite tinkamą numerį",
			minValue: "reikšmė turi būti didesnė arba lygi ",
			maxValue: "reikšmė turi būti mažesnė arba lygi",
			email: "neteisingas el. pašto adresas",
			integer: "Įveskite teisingą sveikąjį skaičių",
			date: "Įveskite teisingą datą",
			url: "blogas adresas. Nepamirškite pridėti ('http://' arba 'https://')",
			nodefined: " nėra apibrėžta!",
			novalue: " turi būti gražinama kokia nors reikšmė!",
			customarray: "Custom f-ja turi grąžinti masyvą!",
			customfcheck: "Custom f-ja tūrėtų būti sukurta, prieš bandant ją naudoti!"

		}
	},
	view: {
		caption: "Peržiūrėti įrašus",
		bClose: "Uždaryti"
	},
	del: {
		caption: "Ištrinti",
		msg: "Ištrinti pažymėtus įrašus(-ą)?",
		bSubmit: "Ištrinti",
		bCancel: "Atšaukti"
	},
	nav: {
		edittext: "",
		edittitle: "Redaguoti pažymėtą eilutę",
		addtext: "",
		addtitle: "Pridėti naują eilutę",
		deltext: "",
		deltitle: "Ištrinti pažymėtą eilutę",
		searchtext: "",
		searchtitle: "Rasti įrašus",
		refreshtext: "",
		refreshtitle: "Perkrauti lentelę",
		alertcap: "Įspėjimas",
		alerttext: "Pasirinkite eilutę",
		viewtext: "",
		viewtitle: "Peržiūrėti pasirinktą eilutę",
		savetext: "",
		savetitle: "Save row",
		canceltext: "",
		canceltitle: "Cancel row editing"
	},
	col: {
		caption: "Pasirinkti stulpelius",
		bSubmit: "Gerai",
		bCancel: "Atšaukti"
	},
	errors: {
		errcap: "Klaida",
		nourl: "Url reikšmė turi būti perduota",
		norecords: "Nėra įrašų, kuriuos būtų galima apdoroti",
		model: "colNames skaičius <> colModel skaičiui!"
	},
	formatter: {
		integer: { thousandsSeparator: "", defaultValue: "0" },
		number: { decimalSeparator: ",", thousandsSeparator: "", decimalPlaces: 2, defaultValue: "0.00" },
		currency: { decimalSeparator: ",", thousandsSeparator: "", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0.00" },
		date: {
			dayNames:   [
				"Sek", "Pir", "Ant", "Tre", "Ket", "Pen", "Šeš",
				"Sekmadienis", "Pirmadienis", "Antradienis", "Trečiadienis", "Ketvirtadienis", "Penktadienis", "Šeštadienis"
			],
			monthNames: [
				"Sau", "Vas", "Kov", "Bal", "Geg", "Bir", "Lie", "Rugj", "Rugs", "Spa", "Lap", "Gru",
				"Sausis", "Vasaris", "Kovas", "Balandis", "Gegužė", "Birželis", "Liepa", "Rugpjūtis", "Rugsėjis", "Spalis", "Lapkritis", "Gruodis"
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
		locale: "lt"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		lt: $.extend({}, locInfo, { name: "lietuvių", nameEnglish: "Lithuanian" }),
		"lt-LT": $.extend({}, locInfo, { name: "lietuvių (Lietuva)", nameEnglish: "Lithuanian (Lithuania)" })
	}
});
}));
