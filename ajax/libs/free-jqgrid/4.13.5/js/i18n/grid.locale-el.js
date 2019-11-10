/**
 * @license jqGrid Greek (el) Translation
 * Alex Cicovic
 * http://www.alexcicovic.com
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
		recordtext: "View {0} - {1} of {2}",
		emptyrecords: "No records to view",
		loadtext: "Φόρτωση...",
		pgtext: "Page {0} of {1}",
		pgfirst: "First Page",
		pglast: "Last Page",
		pgnext: "Next Page",
		pgprev: "Previous Page",
		pgrecs: "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "Αποθήκευση..."
	},
	search: {
		caption: "Αναζήτηση...",
		Find: "Εύρεση",
		Reset: "Επαναφορά",
		odata: [
			{ oper: "eq", text: "equal" },
			{ oper: "ne", text: "not equal" },
			{ oper: "lt", text: "less" },
			{ oper: "le", text: "less or equal" },
			{ oper: "gt", text: "greater" },
			{ oper: "ge", text: "greater or equal" },
			{ oper: "bw", text: "begins with" },
			{ oper: "bn", text: "does not begin with" },
			{ oper: "in", text: "is in" },
			{ oper: "ni", text: "is not in" },
			{ oper: "ew", text: "ends with" },
			{ oper: "en", text: "does not end with" },
			{ oper: "cn", text: "contains" },
			{ oper: "nc", text: "does not contain" },
			{ oper: "nu", text: "is null" },
			{ oper: "nn", text: "is not null" }
		],
		groupOps: [
			{ op: "AND", text: "all" },
			{ op: "OR",  text: "any" }
		],
		addGroupTitle: "Add subgroup",
		deleteGroupTitle: "Delete group",
		addRuleTitle: "Add rule",
		deleteRuleTitle: "Delete rule",
		operandTitle: "Click to select search operation.",
		resetTitle: "Reset Search Value"
	},
	edit: {
		addCaption: "Εισαγωγή Εγγραφής",
		editCaption: "Επεξεργασία Εγγραφής",
		bSubmit: "Καταχώρηση",
		bCancel: "Άκυρο",
		bClose: "Κλείσιμο",
		saveData: "Data has been changed! Save changes?",
		bYes: "Yes",
		bNo: "No",
		bExit: "Cancel",
		msg: {
			required: "Το πεδίο είναι απαραίτητο",
			number: "Το πεδίο δέχεται μόνο αριθμούς",
			minValue: "Η τιμή πρέπει να είναι μεγαλύτερη ή ίση του ",
			maxValue: "Η τιμή πρέπει να είναι μικρότερη ή ίση του ",
			email: "Η διεύθυνση e-mail δεν είναι έγκυρη",
			integer: "Το πεδίο δέχεται μόνο ακέραιους αριθμούς",
			url: "is not a valid URL. Prefix required ('http://' or 'https://')",
			nodefined: " is not defined!",
			novalue: " return value is required!",
			customarray: "Custom function should return array!",
			customfcheck: "Custom function should be present in case of custom checking!"
		}
	},
	view: {
		caption: "View Record",
		bClose: "Close"
	},
	del: {
		caption: "Διαγραφή",
		msg: "Διαγραφή των επιλεγμένων εγγραφών;",
		bSubmit: "Ναι",
		bCancel: "Άκυρο"
	},
	nav: {
		edittext: "",
		edittitle: "Επεξεργασία επιλεγμένης εγγραφής",
		addtext: "",
		addtitle: "Εισαγωγή νέας εγγραφής",
		deltext: "",
		deltitle: "Διαγραφή επιλεγμένης εγγραφής",
		searchtext: "",
		searchtitle: "Εύρεση Εγγραφών",
		refreshtext: "",
		refreshtitle: "Ανανέωση Πίνακα",
		alertcap: "Προσοχή",
		alerttext: "Δεν έχετε επιλέξει εγγραφή",
		viewtext: "",
		viewtitle: "View selected row",
		savetext: "",
		savetitle: "Save row",
		canceltext: "",
		canceltitle: "Cancel row editing"
	},
	col: {
		caption: "Εμφάνιση / Απόκρυψη Στηλών",
		bSubmit: "ΟΚ",
		bCancel: "Άκυρο"
	},
	errors: {
		errcap: "Σφάλμα",
		nourl: "Δεν έχει δοθεί διεύθυνση χειρισμού για τη συγκεκριμένη ενέργεια",
		norecords: "Δεν υπάρχουν εγγραφές προς επεξεργασία",
		model: "Άνισος αριθμός πεδίων colNames/colModel!"
	},
	formatter: {
		integer: { thousandsSeparator: " ", defaultValue: "0" },
		number: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: "0.00" },
		currency: { decimalSeparator: ".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0.00" },
		date: {
			dayNames:   [
				"Κυρ", "Δευ", "Τρι", "Τετ", "Πεμ", "Παρ", "Σαβ",
				"Κυριακή", "Δευτέρα", "Τρίτη", "Τετάρτη", "Πέμπτη", "Παρασκευή", "Σάββατο"
			],
			monthNames: [
				"Ιαν", "Φεβ", "Μαρ", "Απρ", "Μαι", "Ιουν", "Ιουλ", "Αυγ", "Σεπ", "Οκτ", "Νοε", "Δεκ",
				"Ιανουάριος", "Φεβρουάριος", "Μάρτιος", "Απρίλιος", "Μάιος", "Ιούνιος", "Ιούλιος", "Αύγουστος", "Σεπτέμβριος", "Οκτώβριος", "Νοέμβριος", "Δεκέμβριος"
			],
			AmPm: ["πμ", "μμ", "ΠΜ", "ΜΜ"],
			S: function (j) {return j === 1 || j > 1 ? ["η"][Math.min((j - 1) % 10, 3)] : "";},
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
		locale: "el"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		el: $.extend({}, locInfo, { name: "Ελληνικά", nameEnglish: "Greek" }),
		"el-GR": $.extend({}, locInfo, { name: "Ελληνικά (Ελλάδα)", nameEnglish: "Greek (Greece)" })
	}
});
}));
