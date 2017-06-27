/**
 * @license jqGrid (fi) Finnish Translation
 * Jukka Inkeri  awot.fi  2010-05-19
 * Alex Grönholm  alex.gronholm@nextday.fi  2011-05-18
 * http://awot.fi
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
		recordtext: "Rivit {0} - {1} / {2}",
		emptyrecords: "Ei näytettäviä",
		loadtext: "Haetaan...",
		pgtext: "Sivu {0} / {1}",
		pgfirst: "First Page",
		pglast: "Last Page",
		pgnext: "Next Page",
		pgprev: "Previous Page",
		pgrecs: "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "Tallennetaan..."
	},
	search: {
		caption: "Etsi...",
		Find: "Etsi",
		Reset: "Tyhjennä",
		odata: [
			{ oper: "eq", text: "on" },
			{ oper: "ne", text: "ei ole" },
			{ oper: "lt", text: "pienempi" },
			{ oper: "le", text: "pienempi tai yhtäsuuri" },
			{ oper: "gt", text: "suurempi" },
			{ oper: "ge", text: "suurempi tai yhtäsuuri" },
			{ oper: "bw", text: "alkaa" },
			{ oper: "bn", text: "ei ala" },
			{ oper: "in", text: "joukossa" },
			{ oper: "ni", text: "ei joukossa" },
			{ oper: "ew", text: "loppuu" },
			{ oper: "en", text: "ei lopu" },
			{ oper: "cn", text: "sisältää" },
			{ oper: "nc", text: "ei sisällä" },
			{ oper: "nu", text: "on tyhjä" },
			{ oper: "nn", text: "ei ole tyhjä" },
			{ oper: "nu", text: "is null" },
			{ oper: "nn", text: "is not null" }
		],
		groupOps: [
			{ op: "AND", text: "kaikki" },
			{ op: "OR", text: "mikä tahansa" }
		],
		addGroupTitle: "Add subgroup",
		deleteGroupTitle: "Delete group",
		addRuleTitle: "Add rule",
		deleteRuleTitle: "Delete rule",
		operandTitle: "Click to select search operation.",
		resetTitle: "Reset Search Value"
	},
	edit: {
		addCaption: "Uusi rivi",
		editCaption: "Muokkaa riviä",
		bSubmit: "OK",
		bCancel: "Peru",
		bClose: "Sulje",
		saveData: "Tietoja muutettu! Tallennetaanko?",
		bYes: "Kyllä",
		bNo: "Ei",
		bExit: "Peru",
		msg: {
			required: "pakollinen",
			number: "Anna kelvollinen nro",
			minValue: "arvon oltava suurempi tai yhtäsuuri kuin ",
			maxValue: "arvon oltava pienempi tai yhtäsuuri kuin ",
			email: "ei ole kelvollinen säpostiosoite",
			integer: "Anna kelvollinen kokonaisluku",
			date: "Anna kelvollinen pvm",
			url: "Ei ole kelvollinen linkki(URL). Alku oltava ('http://' tai 'https://')",
			nodefined: " ei ole määritelty!",
			novalue: " paluuarvo vaaditaan!",
			customarray: "Oman funktion tulee palauttaa jono!",
			customfcheck: "Oma funktio on määriteltävä räätälöityä tarkastusta varten!"
		}
	},
	view: {
		caption: "Näytä rivi",
		bClose: "Sulje"
	},
	del: {
		caption: "Poista",
		msg: "Poista valitut rivit?",
		bSubmit: "Poista",
		bCancel: "Peru"
	},
	nav: {
		edittext: "",
		edittitle: "Muokkaa valittua riviä",
		addtext: "",
		addtitle: "Uusi rivi",
		deltext: "",
		deltitle: "Poista valittu rivi",
		searchtext: "",
		searchtitle: "Etsi tietoja",
		refreshtext: "",
		refreshtitle: "Lataa uudelleen",
		alertcap: "Varoitus",
		alerttext: "Valitse rivi",
		viewtext: "",
		viewtitle: "Näyta valitut rivit",
		savetext: "",
		savetitle: "Save row",
		canceltext: "",
		canceltitle: "Cancel row editing"
	},
	col: {
		caption: "Valitse sarakkeet",
		bSubmit: "OK",
		bCancel: "Peru"
	},
	errors: {
		errcap: "Virhe",
		nourl: "URL on asettamatta",
		norecords: "Ei muokattavia tietoja",
		model: "Pituus colNames <> colModel!"
	},
	formatter: {
		integer: { thousandsSeparator: "", defaultValue: "0" },
		number: { decimalSeparator: ",", thousandsSeparator: "", decimalPlaces: 2, defaultValue: "0,00" },
		currency: { decimalSeparator: ",", thousandsSeparator: "", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0,00" },
		date: {
			dayNames:   [
				"Su", "Ma", "Ti", "Ke", "To", "Pe", "La",
				"Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"
			],
			monthNames: [
				"Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou",
				"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kesäkuu", "Heinäkuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
			],
			AmPm: ["am", "pm", "AM", "PM"],
			S: function (j) {
				return j < 11 || j > 13 ? ["st", "nd", "rd", "th"][Math.min((j - 1) % 10, 3)] : "th";
			},
			srcformat: "Y-m-d",
			newformat: "d.m.Y",
			masks: {
				ShortDate: "d.m.Y",
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
		locale: "fi"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		fi: $.extend({}, locInfo, { name: "suomi", nameEnglish: "Finnish" }),
		"fi-FI": $.extend({}, locInfo, { name: "suomi (Suomi)", nameEnglish: "Finnish (Finland)" })
	}
});
}));
