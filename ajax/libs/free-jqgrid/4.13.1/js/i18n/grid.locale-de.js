/**
 * @license jqGrid German Translation
 * Version 1.0.0 (developed for jQuery Grid 3.3.1)
 * Olaf Klöppel opensource@blue-hit.de
 * http://blue-hit.de/
 *
 * Updated for jqGrid 3.8
 * Andreas Flack
 * http://www.contentcontrol-berlin.de
 *
 * Updated for jQuery 4.4 and for 4.8 by
 * Oleg Kiriljuk oleg.kiriljuk@ok-soft-gmbh.com
 * the format corresponds now the format from
 * https://github.com/jquery/globalize/blob/master/lib/cultures/globalize.culture.de.js
 *
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
		recordtext: "Zeige {0} - {1} von {2}",
		emptyrecords: "Keine Datensätze vorhanden",
		loadtext: "Ladevorgang...",
		pgtext: "Seite {0} von {1}",
		pgfirst: "Erste Seite",
		pglast: "Letzte Seite",
		pgnext: "Nächste Seite",
		pgprev: "Vorherige Seite",
		pgrecs: "Datensätze pro Seite",
		showhide: "Tabelle auf- oder zuklappen",
		savetext: "Wird gespeichert..."
	},
	search: {
		caption: "Suche...",
		Find: "Suchen",
		Reset: "Zurücksetzen",
		odata: [
			{ oper: "eq", text: "gleich" },
			{ oper: "ne", text: "ungleich" },
			{ oper: "lt", text: "kleiner" },
			{ oper: "le", text: "kleiner gleich" },
			{ oper: "gt", text: "größer" },
			{ oper: "ge", text: "größer gleich" },
			{ oper: "bw", text: "beginnt mit" },
			{ oper: "bn", text: "beginnt nicht mit" },
			{ oper: "in", text: "ist in" },
			{ oper: "ni", text: "ist nicht in" },
			{ oper: "ew", text: "endet mit" },
			{ oper: "en", text: "endet nicht mit" },
			{ oper: "cn", text: "enthält" },
			{ oper: "nc", text: "enthält nicht" },
			{ oper: "nu", text: "ist Null" },
			{ oper: "nn", text: "ist nicht Null" }
		],
		groupOps: [
			{ op: "AND", text: "alle" },
			{ op: "OR", text: "mindestens eine" }
		],
		addGroupTitle: "Gruppe hinzufügen",
		deleteGroupTitle: "Gruppe löschen",
		addRuleTitle: "Regel hinzufügen",
		deleteRuleTitle: "Regel löschen",
		operandTitle: "Klicken Sie, um die Suchoperation zu wählen.",
		resetTitle: "Suchwert zurücksetzen"
	},
	edit: {
		addCaption: "Datensatz hinzufügen",
		editCaption: "Datensatz bearbeiten",
		bSubmit: "Speichern",
		bCancel: "Abbrechen",
		bClose: "Schließen",
		saveData: "Daten wurden geändert! Änderungen speichern?",
		bYes: "ja",
		bNo: "nein",
		bExit: "abbrechen",
		msg: {
			required: "Feld ist erforderlich",
			number: "Bitte geben Sie eine Zahl ein",
			minValue: "Wert muss größer oder gleich sein, als ",
			maxValue: "Wert muss kleiner oder gleich sein, als ",
			email: "ist keine gültige E-Mail-Adresse",
			integer: "Bitte geben Sie eine Ganzzahl ein",
			date: "Bitte geben Sie ein gültiges Datum ein",
			url: "ist keine gültige URL. Präfix muss eingegeben werden ('http://' oder 'https://')",
			nodefined: " ist nicht definiert!",
			novalue: " Rückgabewert ist erforderlich!",
			customarray: "Benutzerdefinierte Funktion sollte ein Array zurückgeben!",
			customfcheck: "Benutzerdefinierte Funktion sollte im Falle der benutzerdefinierten Überprüfung vorhanden sein!"
		}
	},
	view: {
		caption: "Datensatz anzeigen",
		bClose: "Schließen"
	},
	del: {
		caption: "Löschen",
		msg: "Ausgewählte Datensätze löschen?",
		bSubmit: "Löschen",
		bCancel: "Abbrechen"
	},
	nav: {
		edittext: "",
		edittitle: "Ausgewählte Zeile bearbeiten",
		addtext: "",
		addtitle: "Neue Zeile einfügen",
		deltext: "",
		deltitle: "Ausgewählte Zeile löschen",
		searchtext: "",
		searchtitle: "Datensatz suchen",
		refreshtext: "",
		refreshtitle: "Tabelle neu laden",
		alertcap: "Warnung",
		alerttext: "Bitte Zeile auswählen",
		viewtext: "",
		viewtitle: "Ausgewählte Zeile anzeigen",
		savetext: "",
		savetitle: "Änderungen speichern",
		canceltext: "",
		canceltitle: "Bearbeitung der Zeile abbrechen"
	},
	col: {
		caption: "Spalten auswählen",
		bSubmit: "Speichern",
		bCancel: "Abbrechen"
	},
	errors: {
		errcap: "Fehler",
		nourl: "Keine URL angegeben",
		norecords: "Keine Datensätze zu bearbeiten",
		model: "colNames und colModel sind unterschiedlich lang!"
	},
	formatter: {
		integer: { thousandsSeparator: ".", defaultValue: "0" },
		number: { decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2, defaultValue: "0,00" },
		currency: { decimalSeparator: ",", thousandsSeparator: ".", decimalPlaces: 2, prefix: "", suffix: " €", defaultValue: "0,00" },
		date: {
			dayNames:   [
				"So", "Mo", "Di", "Mi", "Do", "Fr", "Sa",
				"Sonntag", "Montag", "Dienstag", "Mittwoch", "Donnerstag", "Freitag", "Samstag"
			],
			monthNames: [
				"Jan", "Feb", "Mar", "Apr", "Mai", "Jun", "Jul", "Aug", "Sep", "Okt", "Nov", "Dez",
				"Januar", "Februar", "März", "April", "Mai", "Juni", "Juli", "August", "September", "Oktober", "November", "Dezember"
			],
			AmPm: ["", "", "", ""],
			S: function () {return ".";}, // one can also use "er" instead of "." but one have to use additional word like "der" or "den" before
			srcformat: "Y-m-d",
			newformat: "d.m.Y",
			masks: {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// short date:
				//    d - Day of the month, 2 digits with leading zeros
				//    m - Numeric representation of a month, with leading zeros
				//    Y - A full numeric representation of a year, 4 digits
				ShortDate: "d.m.Y", // in jQuery UI Datepicker: "dd.MM.yyyy"
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
		locale: "de-DE"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		de: $.extend({}, locInfo, { name: "Deutsch", nameEnglish: "German" }),
		"de-DE": $.extend({}, locInfo, { name: "Deutsch (Deutschland)", nameEnglish: "German (Germany)" })
	}
});
}));
