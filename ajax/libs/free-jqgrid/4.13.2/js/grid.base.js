// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

/**
 * @license jqGrid 4.13.2 - free jqGrid: https://github.com/free-jqgrid/jqGrid
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com
 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * Date: 2016-04-10
 */
//jsHint options
/*jshint eqnull:true */
/*jslint browser: true, evil: true, devel: true, white: true */
/*global jQuery, define, HTMLElement, HTMLTableRowElement */

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
	// begin module grid.base
	/** @const */
	var englishLanguageDefaults = {
		name: "English (United States)",
		nameEnglish: "English (United States)",
		isRTL: false,
		defaults: {
			recordtext: "View {0} - {1} of {2}",
			emptyrecords: "No records to view",
			loadtext: "Loading...",
			pgtext: "Page {0} of {1}",
			pgfirst: "First Page",
			pglast: "Last Page",
			pgnext: "Next Page",
			pgprev: "Previous Page",
			pgrecs: "Records per Page",
			showhide: "Toggle Expand Collapse Grid",
			savetext: "Saving..."
		},
		search: {
			caption: "Search...",
			Find: "Find",
			Reset: "Reset",
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
				{ op: "OR", text: "any" }
			],
			addGroupTitle: "Add subgroup",
			deleteGroupTitle: "Delete group",
			addRuleTitle: "Add rule",
			deleteRuleTitle: "Delete rule",
			operandTitle: "Click to select search operation.",
			resetTitle: "Reset Search Value"
		},
		edit: {
			addCaption: "Add Record",
			editCaption: "Edit Record",
			bSubmit: "Submit",
			bCancel: "Cancel",
			bClose: "Close",
			saveData: "Data has been changed! Save changes?",
			bYes: "Yes",
			bNo: "No",
			bExit: "Cancel",
			msg: {
				required: "Field is required",
				number: "Please, enter valid number",
				minValue: "value must be greater than or equal to ",
				maxValue: "value must be less than or equal to",
				email: "is not a valid e-mail",
				integer: "Please, enter valid integer value",
				date: "Please, enter valid date value",
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
			caption: "Delete",
			msg: "Delete selected record(s)?",
			bSubmit: "Delete",
			bCancel: "Cancel"
		},
		nav: {
			edittext: "",
			edittitle: "Edit selected row",
			addtext: "",
			addtitle: "Add new row",
			deltext: "",
			deltitle: "Delete selected row",
			searchtext: "",
			searchtitle: "Find records",
			refreshtext: "",
			refreshtitle: "Reload Grid",
			alertcap: "Warning",
			alerttext: "Please, select row",
			viewtext: "",
			viewtitle: "View selected row",
			savetext: "",
			savetitle: "Save row",
			canceltext: "",
			canceltitle: "Cancel row editing"
		},
		col: {
			caption: "Select columns",
			bSubmit: "Ok",
			bCancel: "Cancel"
		},
		errors: {
			errcap: "Error",
			nourl: "No url is set",
			norecords: "No records to process",
			model: "Length of colNames <> colModel!"
		},
		formatter: {
			integer: {
				thousandsSeparator: ",",
				defaultValue: "0"
			},
			number: {
				decimalSeparator: ".",
				thousandsSeparator: ",",
				decimalPlaces: 2,
				defaultValue: "0.00"
			},
			currency: {
				decimalSeparator: ".",
				thousandsSeparator: ",",
				decimalPlaces: 2,
				prefix: "",
				suffix: "",
				defaultValue: "0.00"
			},
			date: {
				dayNames: [
					"Sun", "Mon", "Tue", "Wed", "Thr", "Fri", "Sat",
					"Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"
				],
				monthNames: [
					"Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
					"January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"
				],
				AmPm: ["am", "pm", "AM", "PM"],
				S: function (j) {
					var ending = ["st", "nd", "rd", "th"];
					return j < 11 || j > 13 ? ending[Math.min((j - 1) % 10, 3)] : "th";
				},
				srcformat: "Y-m-d",
				newformat: "n/j/Y",
				masks: {
					// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
					// and see http://docs.jquery.com/UI/Datepicker/formatDate
					// and https://github.com/jquery/globalize#dates for alternative formats used frequently
					// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
					// information about date, time, numbers and currency formats used in different countries
					// one should just convert the information in PHP format
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
					// month with year
					//    Y - A full numeric representation of a year, 4 digits
					//    F - A full textual representation of a month
					YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
				}
			}
		}
	};

	$.jgrid = $.jgrid || {};
	var jgrid = $.jgrid;
	jgrid.locales = jgrid.locales || {};
	var locales = jgrid.locales;

	/**
	 * Enum with different components of jqGrid.
	 * @enum {number} @const
	 */
	/*var INPUT_NAME_TYPE = {
		COL_NAME: 0,
		ADDITIONAL_PROPERTY: 1,
		ROWID: 2
	};*/
	/**
	 * Enum with different components of jqGrid.
	 * @enum {number} @const
	 */
	var COMPONENT_NAMES = {
		// let us this - <table> from which grid is created. Then
		//   gBox (grid box) - outer div which includes all grid components: $(this).closest(".ui-jqgrid")[0]
		// In the same way
		GRID_BOX_DIV: 0,                        // tagName: "div". class: "ui-jqgrid". Id: "gbox_" + gridId
		GRID_OVERLAY_DIV: 1,                    // tagName: "div". class: "jqgrid-overlay". Id: "lui_" + gridId
		LOADING_DIV: 2,                         // tagName: "div". class: "loading". Id: "load_" + gridId
		DIALOG_ALERT_DIV: 3,                    // tagName: "div". class: "ui-jqdialog". Id: "alertmod_" + gridId
		DIALOG_SEARCH_DIV: 4,                   // tagName: "div". class: "ui-jqdialog". Id: "searchmodfbox_" + gridId
		DIALOG_VIEW_DIV: 5,                     // tagName: "div". class: "ui-jqdialog". Id: "viewmod" + gridId
		DIALOG_EDIT_DIV: 6,                     // tagName: "div". class: "ui-jqdialog". Id: "editmod" + gridId
		DIALOG_DELETE_DIV: 7,                   // tagName: "div". class: "ui-jqdialog". Id: "delmod" + gridId

		GRID_VIEW_DIV: 8,                       // tagName: "div". class: "ui-jqgrid-view". Id: "gview_" + gridId
		TITLE_BAR_DIV: 9,                       // tagName: "div". class: "ui-jqgrid-titlebar" and either "ui-jqgrid-caption" or "ui-jqgrid-caption-rtl"

		UPPER_TOOLBAR_DIV: 10,                  // tagName: "div". class: "ui-userdata". Id: "tb_" + gridId

		TOP_PAGER_DIV: 11,                      // tagName: "div". class: "ui-jqgrid-toppager". Id: gridId + "_toppager"

		HEADER_DIV: 12,                         // tagName: "div". class: "ui-jqgrid-hdiv"
		HEADER_BOX_DIV: 13,                     // tagName: "div". class: either "ui-jqgrid-hdiv" or "ui-jqgrid-hbox-rtl"
		HEADER_TABLE: 14,                       // tagName: "table". class: "ui-jqgrid-htable"
		HEADER_COLS_ROW: 15,                    // tagName: "tr". class: "jqgfirstrow" or the row with column headers
		HEADER_COLS: 16,                        // tagName: "th". class: either "ui-first-th-rtl" or "ui-first-th-rtl"
		HEADER_ROWS: 47,                        // tagName: "tr". class: "ui-jqgrid-labels"
		HEADER_TH: 48,                          // tagName: "th". class: "ui-th-column" and either "ui-th-ltr" or "ui-th-rtl"
		HEADER_SORTABLE_DIV: 49,                // tagName: "div". class: "ui-jqgrid-labels"
		HEADER_RESIZABLE_SPAN: 50,              // tagName: "span". class: "ui-jqgrid-resize" and either "ui-jqgrid-resize-ltr" or "ui-jqgrid-resize-rtl"
		HEADER_SELECT_ALL_ROWS_CHECKBOX: 45,    // tagName: "input" (can be changed to "button" in the future). class: "cbox". Id: "cb_" + gridId
		SEARCH_TOOLBAR: 17,                     // tagName: "tr". class: "ui-search-toolbar". Its direct children are th having class "ui-th-column" and optionally "ui-th-rtl"

		BODY_DIV: 18,                           // tagName: "div". class: "ui-jqgrid-bdiv"
		BODY_SCROLL_FULL_DIV: 19,               // tagName: "div" - It can have height CSS property which simulate the total size of virtual data.
		BODY_SCROLL_TOP_DIV: 20,                // tagName: "div" - It can have height CSS property which simulate virtual data before the current displayed in btable.
		BODY_TABLE: 21,                         // tagName: "table". class: "ui-jqgrid-btable". Id: gridId
		GRID: 21,                               // tagName: "table". class: "ui-jqgrid-btable". Id: gridId
		BODY_COLS_ROW: 22,                      // tagName: "tr". class: "jqgfirstrow"
		BODY_COLS: 23,                          // tagName: "td"
		BODY_DATA_ROWS: 24,                     // tagName: "tr". class: "jqgrow" and optionally "ui-row-rtl"
		FOOTER_DIV: 25,                         // tagName: "div". class: "ui-jqgrid-sdiv"
		FOOTER_BOX_DIV: 26,                     // tagName: "div". class: either "ui-jqgrid-hdiv" or "ui-jqgrid-hbox-rtl". ??? is it really needed ???
		FOOTER_TABLE: 27,                       // tagName: "table". class: "ui-jqgrid-ftable"
		FOOTER_DATA_ROWS: 28,                   // tagName: "tr". class: "footrow", optionally additionally "footrow-rtl"

		BOTTOM_TOOLBAR_DIV: 29,                 // tagName: "div". class: "ui-userdata". Id: "tb_" + gridId

		FROZEN_HEADER_DIV: 30,                  // tagName: "div". class: "frozen-div" and "ui-jqgrid-hdiv"
		// no hBox currently exists
		FROZEN_HEADER_TABLE: 31,                // tagName: "table". class: "ui-jqgrid-htable"
		FROZEN_HEADER_COLS_ROW: 32,             // tagName: "tr". class: "jqgfirstrow"
		FROZEN_HEADER_COLS: 33,                 // tagName: "th". class: either "ui-first-th-rtl" or "ui-first-th-rtl"
		FROZEN_SEARCH_TOOLBAR: 34,              // tagName: "tr". class: "ui-search-toolbar". Its direct children are th having class "ui-th-column" and optionally "ui-th-rtl"
		// TODO: fix id of children of .ui-search-input to have no id duplicates with the main grid

		FROZEN_FOOTER_DIV: 35,                  // tagName: "div". class: "frozen-div" and "ui-jqgrid-sdiv"
		FROZEN_FOOTER_TABLE: 36,                // tagName: "table". class: "ui-jqgrid-ftable"
		FROZEN_FOOTER_DATA_ROWS: 37,            // tagName: "tr". class: "footrow", optionally additionally "footrow-rtl"

		FROZEN_BODY_DIV: 38,                    // tagName: "div". class: "frozen-div" and "ui-jqgrid-bdiv"
		// no full scroll div and top scroll div is currently exist
		FROZEN_BODY_TABLE: 39,                  // tagName: "table". class: "ui-jqgrid-btable". Id: gridId + "_frozen"
		FROZEN_BODY_COLS_ROW: 40,               // tagName: "tr". class: "jqgfirstrow"
		FROZEN_BODY_COLS: 41,                   // tagName: "td"
		FROZEN_BODY_DATA_ROWS: 42,              // tagName: "tr". class: "jqgrow" and optionally "ui-row-rtl"
		// TODO: fix id of children of .jqgrow to have no id duplicates with the main grid

		COLUMN_RESIZER_DIV: 43,                 // tagName: "div". class: "ui-jqgrid-resize-mark". Id: "rs_m" + gridId
		BOTTOM_PAGER_DIV: 44,                   // tagName: "div". class: "ui-jqgrid-pager"
		SEARCH_OPERATION_MENU_UL: 46            // tagName: "ul". class: "ui-search-menu". id="sopt_menu"
	};

	if (jgrid.defaults == null || $.isEmptyObject(locales) || locales["en-US"] === undefined) {
		// set English options only if no grid.locale-XX.js file are included before jquery.jqGrid.min.js or jquery.jqGrid.src.js
		// the files included AFTER jquery.jqGrid.min.js or jquery.jqGrid.src.js will just overwrite all the settings which were set previously

		// We can set locInfo under $.jgrid additionally to setting under $.jgrid.locales[locale]
		// only to have more compatibility with the previous version of jqGrid.
		// We don't make this currently.
		if (locales["en-US"] === undefined) {
			$.extend(true, jgrid, /*englishLanguageDefaults,*/ {
				locales: {
					"en-US": englishLanguageDefaults // and for English US
				}
			});
		}
		jgrid.defaults = jgrid.defaults || {};
		if (jgrid.defaults.locale === undefined) {
			jgrid.defaults.locale = "en-US";
		}
	}
	jgrid.defaults = jgrid.defaults || {};
	var defaults = jgrid.defaults;

	//if (jgrid.defaults.locale && locales[jgrid.defaults.locale]) {
	//    $.extend(true, $.jgrid, locales[jgrid.defaults.locale]); // add to improve compatibility only
	//}

	$.extend(true, jgrid, {
		/** @const */
		version: "4.13.2",
		/** @const */
		productName: "free jqGrid",
		defaults: {},
		search: {},
		edit: {},
		view: {},
		del: {},
		nav: {},
		col: {},
		errors: {},
		formatter: {
			unused: "" // used only to detect whether the changes are overwritten because of wrong usage
		},
		icons: {
			jQueryUI: {
				common: "ui-icon",
				pager: {
					first: "ui-icon-seek-first",
					prev: "ui-icon-seek-prev",
					next: "ui-icon-seek-next",
					last: "ui-icon-seek-end"
				},
				sort: {
					asc: "ui-icon-triangle-1-n",
					desc: "ui-icon-triangle-1-s"
				},
				gridMinimize: {
					visible: "ui-icon-circle-triangle-n",
					hidden: "ui-icon-circle-triangle-s"
				},
				nav: {
					edit: "ui-icon-pencil",
					add: "ui-icon-plus",
					del: "ui-icon-trash",
					search: "ui-icon-search",
					refresh: "ui-icon-refresh",
					view: "ui-icon-document",
					save: "ui-icon-disk",
					cancel: "ui-icon-cancel",
					newbutton: "ui-icon-newwin"
				},
				actions: {
					edit: "ui-icon-pencil",
					del: "ui-icon-trash",
					save: "ui-icon-disk",
					cancel: "ui-icon-cancel"
				},
				form: {
					close: "ui-icon-closethick",
					prev: "ui-icon-triangle-1-w",
					next: "ui-icon-triangle-1-e",
					save: "ui-icon-disk",
					undo: "ui-icon-close",
					del: "ui-icon-scissors",
					cancel: "ui-icon-cancel",
					resizableLtr: "ui-resizable-se ui-icon ui-icon-gripsmall-diagonal-se"
				},
				search: {
					search: "ui-icon-search",
					reset: "ui-icon-arrowreturnthick-1-w",
					query: "ui-icon-comment"
				},
				subgrid: {
					plus: "ui-icon-plus",
					minus: "ui-icon-minus",
					openLtr: "ui-icon-carat-1-sw",
					openRtl: "ui-icon-carat-1-se"
				},
				grouping: {
					plus: "ui-icon-circlesmall-plus",
					minus: "ui-icon-circlesmall-minus"
				},
				treeGrid: {
					minus: "ui-icon-triangle-1-s",
					leaf: "ui-icon-radio-off",
					plusLtr: "ui-icon-triangle-1-e",
					plusRtl: "ui-icon-triangle-1-w"
				}
			},
			fontAwesome: {
				common: "fa",
				pager: {
					common: "fa-fw",
					first: "fa-step-backward",
					prev: "fa-backward",
					next: "fa-forward",
					last: "fa-step-forward"
				},
				sort: {
					common: "fa-lg",        // common: "",
					asc: "fa-sort-asc",     // asc: "fa-sort-amount-asc",
					desc: "fa-sort-desc"    // desc: "fa-sort-amount-desc"
				},
				gridMinimize: {
					visible: "fa-chevron-circle-up",
					hidden: "fa-chevron-circle-down"
				},
				nav: {
					common: "fa-lg fa-fw",
					edit: "fa-pencil",
					add: "fa-plus",
					del: "fa-trash-o",
					search: "fa-search",
					refresh: "fa-refresh",
					view: "fa-file-o",
					save: "fa-floppy-o",
					cancel: "fa-ban",
					newbutton: "fa-external-link"
				},
				actions: {
					common: "fa-fw",
					edit: "fa-pencil",
					del: "fa-trash-o",
					save: "fa-floppy-o",
					cancel: "fa-ban"
				},
				form: {
					close: "fa-times",
					prev: "fa-caret-left",
					next: "fa-caret-right",
					save: "fa-floppy-o",
					undo: "fa-undo",
					del: "fa-trash-o",
					cancel: "fa-ban",
					resizableLtr: "fa-rss fa-rotate-270"
				},
				search: {
					search: "fa-search",
					reset: "fa-undo",
					query: "fa-comments-o"
				},
				subgrid: {
					common: "fa-fw",
					plus: "fa-plus",
					minus: "fa-minus",
					openLtr: "fa-reply fa-rotate-180",
					openRtl: "fa-share fa-rotate-180"
				},
				grouping: {
					common: "fa-fw",
					plus: "fa-plus-square-o",
					minus: "fa-minus-square-o"
				},
				treeGrid: {
					common: "fa-fw",
					minus: "fa-lg fa-sort-desc",
					leaf: "fa-dot-circle-o",
					plusLtr: "fa-lg fa-caret-right",
					plusRtl: "fa-lg fa-caret-left"
				}
			},
			glyph: {
				common: "glyphicon",
				pager: {
					common: "",
					first: "glyphicon-step-backward",
					prev: "glyphicon-backward",
					next: "glyphicon-forward",
					last: "glyphicon-step-forward"
				},
				sort: {
					common: "",
					asc: "glyphicon-triangle-top",
					desc: "glyphicon-triangle-bottom"
				},
				gridMinimize: {
					visible: "glyphicon-circle-arrow-up",
					hidden: "glyphicon-circle-arrow-down"
				},
				nav: {
					common: "",
					edit: "glyphicon-edit",
					add: "glyphicon-plus",
					del: "glyphicon-trash",
					search: "glyphicon-search",
					refresh: "glyphicon-refresh",
					view: "glyphicon-file", // glyphicon glyphicon-th-list
					save: "glyphicon-save",
					cancel: "glyphicon-ban-circle",
					newbutton: "glyphicon-new-window"
				},
				actions: {
					common: "",
					edit: "glyphicon-edit",
					del: "glyphicon-trash",
					save: "glyphicon-save",
					cancel: "glyphicon-ban-circle"
				},
				form: {
					close: "glyphicon-remove-circle",
					prev: "glyphicon-step-backward",
					next: "glyphicon-step-forward",
					save: "glyphicon-save",
					undo: "glyphicon-repeat",
					del: "glyphicon-trash",
					cancel: "glyphicon-ban-circle",
					resizableLtr: "glyphicon-import"
				},
				search: {
					search: "glyphicon-search",
					reset: "glyphicon-repeat",
					query: "glyphicon-cog" //"glyphicon-comment"
				},
				subgrid: {
					common: "",
					plus: "glyphicon-zoom-in", //"glyphicon-plus", "glyphicon-th-list",
					minus: "glyphicon-zoom-out", // "glyphicon-minus",
					openLtr: "glyphicon-indent-left",
					openRtl: "glyphicon-indent-left"
				},
				grouping: {
					common: "",
					plus: "glyphicon-expand",
					minus: "glyphicon-collapse-down"
				},
				treeGrid: {
					common: "",
					minus: "glyphicon-triangle-bottom",
					leaf: "glyphicon-record", // glyphicon-unchecked
					plusLtr: "glyphicon-triangle-right",
					plusRtl: "glyphicon-triangle-left"
				}
			}
		},
		guiStyles: {
			jQueryUI: {
				gBox: "ui-jqgrid-jquery-ui ui-widget ui-widget-content ui-corner-all",  // ui-widget-content??? for the children of gbox
				gView: "",
				overlay: "ui-widget-overlay",
				loading: "ui-state-default ui-state-active",
				hDiv: "ui-state-default ui-corner-top",
				hTable: "",
				colHeaders: "ui-state-default",
				states: {
					select: "ui-state-highlight",
					disabled: "ui-state-disabled ui-jqgrid-disablePointerEvents",
					hover: "ui-state-hover",    // can be table-hover on <table> only and style like .table-hover tbody tr:hover td
					error: "ui-state-error",
					active: "ui-state-active",
					textOfClickable: "ui-state-default"
				},
				dialog: {
					header: "ui-widget-header ui-dialog-titlebar ui-corner-all ui-helper-clearfix",
					window: "ui-jqgrid-jquery-ui ui-widget ui-widget-content ui-corner-all ui-front",
					document: "",
					subdocument: "",
					body: "",
					footer: "",
					content: "ui-widget-content",
					hr: "ui-widget-content",
					closeButton: "ui-corner-all",
					fmButton: "ui-state-default",
					dataField: "ui-widget-content ui-corner-all",
					viewLabel: "ui-widget-content",
					viewData: "ui-widget-content",
					leftCorner: "ui-corner-left",
					rightCorner: "ui-corner-right",
					defaultCorner: "ui-corner-all"
				},
				filterToolbar: {
					dataField: "ui-widget-content"
				},
				subgrid: {
					thSubgrid: "ui-state-default", // used only with subGridModel
					rowSubTable: "ui-widget-content", // used only with subGridModel additionally to ui-subtblcell
					row: "ui-widget-content", // class of the subgrid row, additional to ui-subgrid
					tdStart: "", // it can be with span over rownumber and multiselect columns
					tdWithIcon: "ui-widget-content", // class of cell with +- icon, additional to subgrid-cell
					buttonDiv: "",
					button: "",
					tdData: "ui-widget-content", // class of main td with span over the grid, additional subgrid-data
					legacyTable: ""
				},
				grid: "",
				gridRow: "ui-widget-content",
				rowNum: "ui-state-default",
				gridFooter: "",
				rowFooter: "ui-widget-content",
				gridTitle: "ui-widget-header ui-corner-top",
				gridError: "ui-state-error",
				gridErrorText: "",
				titleButton: "ui-corner-all",
				toolbarUpper: "ui-state-default",
				toolbarBottom: "ui-state-default",
				actionsDiv: "ui-widget-content",
				actionsButton: "ui-corner-all",
				pager: {
					pager: "ui-state-default",
					pagerButton: "ui-corner-all",
					pagerInput: "ui-widget-content",
					pagerSelect: "ui-widget-content"
				},
				navButton: "ui-corner-all",
				searchDialog: {
					operator: "ui-corner-all",
					label: "ui-corner-all",
					elem: "ui-corner-all",
					operationGroup: "",
					addRuleButton: "ui-corner-all",
					deleteRuleButton: "ui-corner-all",
					operationSelect: "ui-corner-all",
					addGroupButton: "ui-corner-all",
					deleteGroupButton: "ui-corner-all"
				},
				searchToolbar: {
					menu: "ui-menu-jqueryui",
					operButton: "ui-corner-all",
					clearButton: "ui-corner-all"
				},
				top: "ui-corner-top",
				bottom: "ui-corner-bottom",
				resizer: "ui-widget-header"
			},
			bootstrap: {
				gBox: "ui-jqgrid-bootstrap",
				gView: "panel-info",
				overlay: "modal-backdrop",
				loading: "alert alert-info",
				hDiv: "",
				hTable: "table table-hover table-condensed table-bordered",
				colHeaders: "",
				states: {
					select: "success",
					disabled: "disabled ui-jqgrid-disablePointerEvents",
					hover: "active",
					error: "danger",
					active: "active",
					textOfClickable: ""
				},
				dialog: {
					header: "modal-header",
					window: "modal ui-jqgrid-bootstrap",
					document: "modal-dialog",
					subdocument: "modal-content",
					body: "modal-body",
					footer: "modal-footer",
					content: "modal-content",
					hr: "hidden",
					closeButton: "btn btn-xs btn-default",
					fmButton: "btn btn-default",
					dataField: "form-control",
					viewLabel: "",
					viewData: "form-control",
					leftCorner: "",
					rightCorner: "",
					defaultCorner: ""
				},
				filterToolbar: {
					dataField: "form-control"
				},
				subgrid: {
					thSubgrid: "",
					rowSubTable: "",
					row: "",
					tdStart: "",
					tdWithIcon: "",
					buttonDiv: "",
					button: "btn btn-xs",
					tdData: "",
					legacyTable: "table table-condensed table-hover table-bordered"
				},
				grid: "table table-condensed table-hover table-bordered",
				gridRow: "",
				rowNum: "",
				gridFooter: "table table-hover table-condensed table-bordered",
				rowFooter: "",
				gridTitle: "",
				gridError: "alert alert-danger",
				gridErrorText: "sr-only",
				titleButton: "btn btn-xs btn-default",
				actionsDiv: "",
				actionsButton: "btn btn-xs btn-default",
				toolbarUpper: "",
				toolbarBottom: "",
				pager: {
					pager: "panel-footer",
					pagerButton: "btn btn-xs",
					pagerInput: "form-control",
					pagerSelect: "form-control"
				},
				navButton: "btn btn-xs",
				searchDialog: {
					operator: "form-control",
					label: "form-control",
					elem: "form-control",
					operationGroup: "form-inline",
					addRuleButton: "btn btn-xs btn-default",
					deleteRuleButton: "btn btn-xs btn-default",
					operationSelect: "form-control",
					addGroupButton: "btn btn-xs btn-default",
					deleteGroupButton: "btn btn-xs btn-default"
				},
				searchToolbar: {
					menu: "dropdown-menu",
					operButton: "btn btn-xs btn-default",
					clearButton: "btn btn-xs btn-default"
				},
				top: "ui-jqgrid-bootstrap-corner-top",
				bottom: "ui-jqgrid-bootstrap-corner-bottom",
				resizer: "ui-jqgrid-bootstrap"
			},
			bootstrapPrimary: {
				baseGuiStyle: "bootstrap",
				dialog: {
					closeButton: "btn btn-xs close",
					fmButton: "btn btn-primary"
				},
				searchDialog: {
					addRuleButton: "btn btn-xs btn-primary",
					deleteRuleButton: "btn btn-xs btn-primary",
					addGroupButton: "btn btn-xs btn-primary",
					deleteGroupButton: "btn btn-xs btn-primary"
				}
			}
		},
		htmlDecode: function (value) {
			if (value && (value === "&nbsp;" ||
							value === "&#160;" ||
							(value.length === 1 && value.charCodeAt(0) === 160))) {
				return "";
			}
			return !value ?
				value :
				String(value)
					.replace(/&gt;/g, ">")
					.replace(/&lt;/g, "<")
					.replace(/&#x27;/g, "'")
					.replace(/&#x2F;/g, "\/")
					.replace(/&#39;/g, "'")
					.replace(/&#47;/g, "\/")
					.replace(/&quot;/g, "\"")
					.replace(/&amp;/g, "&");
		},
		htmlEncode: function (value) {
			// see https://www.owasp.org/index.php/XSS_(Cross_Site_Scripting)_Prevention_Cheat_Sheet#RULE_.231_-_HTML_Escape_Before_Inserting_Untrusted_Data_into_HTML_Element_Content
			return !value ?
				value :
				String(value)
					.replace(/&/g, "&amp;")
					.replace(/\"/g, "&quot;")
					.replace(/\'/g, "&#39;")
					.replace(/\//g, "&#47;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;");
		},
		oldEncodePostedData: function (value) {
			return !value ?
				value :
				String(value)
					.replace(/&/g, "&amp;")
					.replace(/\"/g, "&quot;")
					.replace(/</g, "&lt;")
					.replace(/>/g, "&gt;");
		},
		oldDecodePostedData: function (value) {
			if (value && (value === "&nbsp;" ||
							value === "&#160;" ||
							(value.length === 1 && value.charCodeAt(0) === 160))) {
				return "";
			}
			return !value ?
				value :
				String(value)
					.replace(/&gt;/g, ">")
					.replace(/&lt;/g, "<")
					.replace(/&quot;/g, "\"")
					.replace(/&amp;/g, "&");
		},
		clearArray: function (ar) {
			// see http://jsperf.com/empty-javascript-array
			while (ar.length > 0) {
				ar.pop();
			}
		},
		format: function (format) { //jqgformat
			var args = $.makeArray(arguments).slice(1);
			if (format == null) { format = ""; }
			return format.replace(/\{(\d+)\}/g, function (m, i) {
				return args[i];
			});
		},
		template: function (format) { //jqgformat
			var args = $.makeArray(arguments).slice(1), j, al = args.length;
			if (format == null) {
				format = "";
			}
			return format.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((\.*?)?\))?)?\}/g, function (m, i) {
				var nmarr, k;
				if (!isNaN(parseInt(i, 10))) {
					return args[parseInt(i, 10)];
				}
				for (j = 0; j < al; j++) {
					if ($.isArray(args[j])) {
						nmarr = args[j];
						k = nmarr.length;
						while (k--) {
							if (i === nmarr[k].nm) {
								return nmarr[k].v;
							}
						}
					}
				}
			});
		},
		msie: navigator.appName === "Microsoft Internet Explorer",
		msiever: function () {
			// Trident/4.0 - Internet Explorer 8,
			// Trident/5.0 - Internet Explorer 9,
			// Trident/6.0 - Internet Explorer 10
			// Trident/7.0 - IE11
			// Version tokens MSIE might not reflect the actual version of the browser
			// If Compatibility View is enabled for a webpage or the browser mode is set to an earlier version
			var rv = -1, match = /(MSIE) ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent);
			if (match != null && match.length === 3) {
				rv = parseFloat(match[2] || -1);
			}
			return rv;
		},
		fixMaxHeightOfDiv: function (height) {
			// we place the fixing of maximal height in the method to allow easy
			// to overwrite the method and to change the behaviour of jqGrid
			// in case of usage virtual scrolling
			if (navigator.appName === "Microsoft Internet Explorer") {
				return Math.min(height, 1533917); // ??? 1022611
			}
			if (/(Firefox)/.exec(navigator.userAgent) != null) {
				return Math.min(height, 17895696);
			}
			return height;
		},
		getCellIndex: function (cell) {
			var c = $(cell);
			if (c.is("tr")) { return -1; }
			c = (!c.is("td") && !c.is("th") ? c.closest("td,th") : c)[0];
			if (c == null) { return -1; }
			if (jgrid.msie) { return $.inArray(c, c.parentNode.cells); }
			return c.cellIndex;
		},
		stripHtml: function (v) {
			v = String(v);
			if (v) {
				v = v.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi, "");
				return (v && v !== "&nbsp;" && v !== "&#160;") ? v.replace(/\"/g, "'") : "";
			}
			return v;
		},
		stripPref: function (pref, id) {
			var obj = $.type(pref);
			if (obj === "string" || obj === "number") {
				pref = String(pref);
				id = pref !== "" ? String(id).replace(String(pref), "") : id;
			}
			return id;
		},
		getRes: function (basePath, path) {
			var pathParts = path.split("."), n = pathParts.length, i;
			if (basePath == null) {
				return undefined;
			}
			for (i = 0; i < n; i++) {
				if (!pathParts[i]) {
					return null;
				}
				basePath = basePath[pathParts[i]];
				if (basePath === undefined) {
					break;
				}
				if (typeof basePath === "string") {
					return basePath;
				}
			}
			return basePath;
		},
		parseDate: function (format, date, newformat, opts) {
			// It seems that the code was "imported" by Tony from http://blog.stevenlevithan.com/archives/date-time-format
			// Thus I include the reference to original
			// Date Format 1.2.3 (c) 2007-2009 Steven Levithan <stevenlevithan.com> MIT license
			// The code can be found on https://github.com/felixge/node-dateformat/blob/master/lib/dateformat.js
			// It would be probabbly good idea to support original date format additionally to the
			// PHP data format used below.
			var token = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g, dM, k, hl, timestamp = 0, offset = 0,
				timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[\-+]\d{4})?)\b/g,
				timezoneClip = /[^\-+\dA-Z]/g,
				msMatch = ((typeof date === "string") ? date.match(/^\/Date\((([\-+])?[0-9]+)(([\-+])([0-9]{2})([0-9]{2}))?\)\/$/) : null),
				pad = function (value, length) {
					value = String(value);
					length = parseInt(length, 10) || 2;
					while (value.length < length) { value = "0" + value; }
					return value;
				},
				ts = { m: 1, d: 1, y: 1970, h: 0, i: 0, s: 0, u: 0 },
				h12To24 = function (ampm, h) {
					if (ampm === 0) {
						if (h === 12) { h = 0; }
					} else {
						if (h !== 12) { h += 12; }
					}
					return h;
				},
				getDefOptions = function (p, options) {
					// It could be multiple sources for date properties used below.
					// Let us we need to use srcformat. The highest priority have
					// opts.srcformat if it is specified. If the srcformat is not
					// specified of if opts is undefined then one should use
					// $.jgrid.locales.de.formatter.date.srcformat, for example,
					// where "de" part is an example of the locale of the grid
					// ($t.p.locale). There as the third important case existing
					// because of compatibility only. The old place for formatter.date.srcformat
					// was $.jgrid.formatter.date.srcformat (without "locales.de" part
					// in the middle). Now such option should be not used, but
					// because of some code where the old code of jqGrid was customized
					// using $.jgrid.formatter instead of $.jgrid.locales[locale].formatter,
					// one have to take in consideration the case. If such setting exist
					// then one should use it (should use $.jgrid.formatter.date.srcformat)
					// BEFORE the new default $.jgrid.locales.de.formatter.date.srcformat.
					// As the result sue should search for all below properties in 3 sources:
					// first in opts || {}, second in
					// ($.jgrid.formatter || {}).date || {}
					// and finally, if $t.p != null && $t.p.locale != null, under
					// $.jgrid.locales[$t.p.locale].formatter.date
					// oder (it's the same, just rewritten) under
					// ((locales[$t.p.locale] || {}).formatter || {}).date
					var props = ["AmPm", "dayNames", "masks", "monthNames", "userLocalTime", "parseRe", "S", "srcformat"],
						root1 = options || {},
						root2 = (jgrid.formatter || {}).date || {},
						root3 = p == null || p.locale == null ?
								{} :
								((locales[p.locale] || {}).formatter || {}).date,
						iProp, nProps = props.length, result = {}, prop;
					for (iProp = 0; iProp < nProps; iProp++) {
						prop = props[iProp];
						if (root1[prop] !== undefined) { // root1.hasOwnProperty(prop)
							result[prop] = root1[prop];
						} else if (root2[prop] !== undefined) {// root2.hasOwnProperty(prop)
							result[prop] = root2[prop];
						} else if (root3[prop] !== undefined) {// root3.hasOwnProperty(prop)
							result[prop] = root3[prop];
						}
					}
					return result;
				};

			//opts = $.extend({}, (jgrid.formatter || {}).date,
			//	$t.p != null ?
			//			jgrid.getRes(locales[$t.p.locale], "formatter.date") || {} :
			//			{},
			//	opts || {});
			opts = getDefOptions(this.p, opts);
			// old lang files
			if (opts.parseRe === undefined) {
				opts.parseRe = /[#%\\\/:_;.,\t\s\-]/;
			}
			if (opts.masks.hasOwnProperty(format)) { format = opts.masks[format]; }
			if (date && date != null) {
				if (!isNaN(date) && String(format).toLowerCase() === "u") {
					//Unix timestamp
					timestamp = new Date(parseFloat(date) * 1000);
				} else if (!isNaN(date) && String(format).toLowerCase() === "u1000") {
					// Milliseconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
					timestamp = new Date(parseFloat(date));
				} else if (date.constructor === Date) {
					timestamp = date;
					// Microsoft date format support
				} else if (msMatch !== null) {
					timestamp = new Date(parseInt(msMatch[1], 10));
					if (msMatch[3]) {
						offset = Number(msMatch[5]) * 60 + Number(msMatch[6]);
						offset *= ((msMatch[4] === "-") ? 1 : -1);
						offset -= timestamp.getTimezoneOffset();
						timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
					}
				} else {
					//Support ISO8601Long that have Z at the end to indicate UTC timezone
					if (opts.srcformat === "ISO8601Long" && date.charAt(date.length - 1) === "Z") {
						offset -= (new Date()).getTimezoneOffset();
					}
					date = String(date).replace(/\T/g, "#").replace(/\t/, "%").split(opts.parseRe);
					format = format.replace(/\T/g, "#").replace(/\t/, "%").split(opts.parseRe);
					// parsing for month names and time
					for (k = 0, hl = Math.min(format.length, date.length); k < hl; k++) {
						switch (format[k]) {
						case "M":
							// A short textual representation of a month, three letters Jan through Dec
							dM = $.inArray(date[k], opts.monthNames);
							if (dM !== -1 && dM < 12) {
								date[k] = dM + 1;
								ts.m = date[k];
							}
							break;
						case "F":
							// A full textual representation of a month, such as January or March
							dM = $.inArray(date[k], opts.monthNames, 12);
							if (dM !== -1 && dM > 11) {
								date[k] = dM + 1 - 12;
								ts.m = date[k];
							}
							break;
						case "n":
							// Numeric representation of a month, without leading zeros 1 through 12
							ts.m = parseInt(date[k], 10);
							break;
						case "j":
							// Day of the month without leading zeros 1 to 31
							ts.d = parseInt(date[k], 10);
							break;
						case "g":
							// 12-hour format of an hour without leading zeros 1 through 12
							ts.h = parseInt(date[k], 10);
							break;
						case "a":
							// Lowercase Ante meridiem and Post meridiem am or pm
							dM = $.inArray(date[k], opts.AmPm);
							if (dM !== -1 && dM < 2 && date[k] === opts.AmPm[dM]) {
								date[k] = dM;
								ts.h = h12To24(date[k], ts.h);
							}
							break;
						case "A":
							// Uppercase Ante meridiem and Post meridiem AM or PM
							dM = $.inArray(date[k], opts.AmPm);
							if (dM !== -1 && dM > 1 && date[k] === opts.AmPm[dM]) {
								date[k] = dM - 2;
								ts.h = h12To24(date[k], ts.h);
							}
							break;
						}
						if (date[k] !== undefined) {
							ts[format[k].toLowerCase()] = parseInt(date[k], 10);
						}
					}
					if (ts.f) { ts.m = ts.f; }
					if (ts.m === 0 && ts.y === 0 && ts.d === 0) {
						return "&#160;";
					}
					ts.m = parseInt(ts.m, 10) - 1;
					var ty = ts.y;
					if (ty >= 70 && ty <= 99) {
						ts.y = 1900 + ts.y;
					} else if (ty >= 0 && ty <= 69) {
						ts.y = 2000 + ts.y;
					}
					timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
					//Apply offset to show date as local time.
					if (offset > 0) {
						timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
					}
				}
			} else {
				timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
			}
			if (opts.userLocalTime && offset === 0) {
				offset -= (new Date()).getTimezoneOffset();
				if (offset > 0) {
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			}
			if (newformat === undefined) {
				return timestamp;
			}
			if (opts.masks.hasOwnProperty(newformat)) {
				newformat = opts.masks[newformat];
			} else if (!newformat) {
				newformat = "Y-m-d";
			}
			var
				hours = timestamp.getHours(), // a Number, from 0 to 23, representing the hour
				i = timestamp.getMinutes(),
				j = timestamp.getDate(),
				n = timestamp.getMonth() + 1,
				o = timestamp.getTimezoneOffset(),
				s = timestamp.getSeconds(),
				u = timestamp.getMilliseconds(),
				w = timestamp.getDay(),
				year = timestamp.getFullYear(), // a Number, representing four digits, representing the year. Examples: 1999 or 2003
				dayOfWeek = (w + 6) % 7 + 1, // numeric representation of the day of the week. 1 (for Monday) through 7 (for Sunday)
				z = (new Date(year, n - 1, j) - new Date(year, 0, 1)) / 86400000,
				weekNumberOfYear = dayOfWeek < 5 ?
						Math.floor((z + dayOfWeek - 1) / 7) + 1 :
						Math.floor((z + dayOfWeek - 1) / 7) || ((new Date(year - 1, 0, 1).getDay() + 6) % 7 < 4 ? 53 : 52),
				flags = {
					// Day
					d: pad(j), // Day of the month, 2 digits with leading zeros 01 to 31
					D: opts.dayNames[w], // A textual representation of a day, three letters. Mon through Sun
					j: j, // Day of the month without leading zeros 1 to 31
					l: opts.dayNames[w + 7], // A full textual representation of the day of the week. Sunday through Saturday
					N: dayOfWeek, // ISO-8601 numeric representation of the day of the week. 1 (for Monday) through 7 (for Sunday)
					S: opts.S(j), // English ordinal suffix for the day of the month, 2 characters. st, nd, rd or th. Works well with j
					w: w, // Numeric representation of the day of the week. 0 (for Sunday) through 6 (for Saturday)
					z: z, // The day of the year (starting from 0). 0 through 365
					// Week.
					W: weekNumberOfYear, // ISO-8601 week number of year, weeks starting on Monday. Example: 42 (the 42nd week in the year)
					// Month
					F: opts.monthNames[n - 1 + 12], // A full textual representation of a month, such as January or March. January through December
					m: pad(n), // Numeric representation of a month, with leading zeros. 01 through 12
					M: opts.monthNames[n - 1], // A short textual representation of a month, three letters. Jan through Dec
					n: n, // Numeric representation of a month, without leading zeros. 1 through 12
					t: "?", // Number of days in the given month. 28 through 31
					// Year
					L: "?", // Whether it's a leap year. 1 if it is a leap year, 0 otherwise.
					o: "?", // SO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. Examples: 1999 or 2003
					Y: year, // A full numeric representation of a year, 4 digits. Examples: 1999 or 2003
					y: String(year).substring(2), // A two digit representation of a year. Examples: 99 or 03
					// Time
					a: hours < 12 ? opts.AmPm[0] : opts.AmPm[1], // Lowercase Ante meridiem and Post meridiem: am or pm
					A: hours < 12 ? opts.AmPm[2] : opts.AmPm[3], // Uppercase Ante meridiem and Post meridiem: AM or PM
					B: "?", // Swatch Internet time 000 through 999
					g: hours % 12 || 12, // 12-hour format of an hour without leading zeros 1 through 12
					G: hours, // 24-hour format of an hour without leading zeros. 0 through 23
					h: pad(hours % 12 || 12), // 12-hour format of an hour with leading zeros: 01 through 12
					H: pad(hours), // 24-hour format of an hour with leading zeros: 00 through 23
					i: pad(i), // Minutes with leading zeros: 00 to 59
					s: pad(s), // Seconds, with leading zeros: 00 through 59
					u: u, // Microseconds. Example: 654321
					// Timezone
					e: "?", // Timezone identifier. Examples: UTC, GMT, Atlantic/Azores
					I: "?", // Whether or not the date is in daylight saving time. 1 if Daylight Saving Time, 0 otherwise.
					O: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4), // Difference to Greenwich time (GMT) in hours. Example: +0200
					P: "?", // Difference to Greenwich time (GMT) with colon between hours and minutes. Example: +02:00
					T: (String(timestamp).match(timezone) || [""]).pop().replace(timezoneClip, ""), // Timezone abbreviation. Examples: EST, MDT
					Z: "?", // Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. -43200 through 50400
					// Full Date/Time
					c: "?", // ISO 8601 date. Example: 2004-02-12T15:19:21+00:00
					r: "?", // RFC 2822 formatted date. Example: Thu, 21 Dec 2000 16:01:07 +0200
					U: Math.floor(timestamp / 1000) // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
				};
			return newformat.replace(token, function ($0) {
				return flags.hasOwnProperty($0) ? flags[$0] : $0.substring(1);
			});
		},
		parseDateToNumber: function (format, date) {
			var datetime = jgrid.parseDate.call(this, format, date);
			// datetime could be the string "&#160;"
			return datetime instanceof Date ? datetime.getTime() : 0;
		},
		jqID: function (sid) {
			return String(sid).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g, "\\$&");
		},
		/**
		 *  @param {COMPONENT_NAMES} componentName
		 */
		getGridComponentId: function (componentName) {
			var self = this;
			if (self.p == null || !self.p.id) {
				return ""; // return empty string
			}
			var id = self.p.id;
			switch (componentName) {
			case COMPONENT_NAMES.GRID:
				return id;
			case COMPONENT_NAMES.GRID_BOX_DIV:
				return "gbox_" + id;
			case COMPONENT_NAMES.GRID_VIEW_DIV:
				return "gview_" + id;
			case COMPONENT_NAMES.DIALOG_ALERT_DIV: // footer/summary table
				return "alertmod_" + id;
			case COMPONENT_NAMES.COLUMN_RESIZER_DIV:
				return "rs_m" + id;
			case COMPONENT_NAMES.HEADER_SELECT_ALL_ROWS_CHECKBOX:
				return "cb_" + id;
			case COMPONENT_NAMES.SEARCH_OPERATION_MENU_UL:
				return "sopt_menu";
			default:
				return ""; // return empty string
			}
		},
		/**
		 *  @param {COMPONENT_NAMES} componentName
		 */
		getGridComponentIdSelector: function (componentName) {
			var id = jgrid.getGridComponentId.call(this, componentName);
			return id ? "#" + jgrid.jqID(id) : "";
		},
		isHTMLElement: function (elem) {
			// see http://stackoverflow.com/a/384380/315935
			return (typeof HTMLElement === "object" || typeof HTMLElement === "function") ?
					elem instanceof HTMLElement : //DOM2
					elem != null && typeof elem === "object" && elem.nodeType === 1 && typeof elem.nodeName === "string";
		},
		/**
		 *  @param {COMPONENT_NAMES} componentName
		 */
		getGridComponent: function (componentName, $p) {// , p1
			var p;
			if ($p instanceof $ || $p.length > 0) {
				p = $p[0];
			} else if (jgrid.isHTMLElement($p)) {
				p = $p;
				$p = $(p);
			} else {
				return $(); // return empty jQuery object
			}
			switch (componentName) {
			case COMPONENT_NAMES.BODY_TABLE: // get body table from bDiv
				return $p.hasClass("ui-jqgrid-bdiv") ? $p.find(">div>.ui-jqgrid-btable") : $();
			case COMPONENT_NAMES.HEADER_TABLE: // header table from bDiv
				return $p.hasClass("ui-jqgrid-hdiv") ? $p.find(">div>.ui-jqgrid-htable") : $();
			case COMPONENT_NAMES.FOOTER_TABLE: // footer/summary table from sDiv
				return $p.hasClass("ui-jqgrid-sdiv") ? $p.find(">div>.ui-jqgrid-ftable") : $();
			case COMPONENT_NAMES.FROZEN_HEADER_TABLE: // header table from bDiv
				return $p.hasClass("ui-jqgrid-hdiv") ? $p.children(".ui-jqgrid-htable") : $();
			case COMPONENT_NAMES.FROZEN_FOOTER_TABLE: // footer/summary table from sDiv
				return $p.hasClass("ui-jqgrid-sdiv") ? $p.children(".ui-jqgrid-ftable") : $();
			case COMPONENT_NAMES.BODY_DIV:   // get bDiv of grid (bTable)
				return $p.hasClass("ui-jqgrid-btable") && p.grid != null ? $(p.grid.bDiv) : $();
			case COMPONENT_NAMES.HEADER_DIV:   // get hDiv of grid (bTable)
				return $p.hasClass("ui-jqgrid-btable") && p.grid != null ? $(p.grid.hDiv) : $();
			case COMPONENT_NAMES.FOOTER_DIV:   // get sDiv of grid (bTable)
				return $p.hasClass("ui-jqgrid-btable") && p.grid != null ? $(p.grid.sDiv) : $();
				//case "colHeader": // p should be iCol
				//    return !isNaN(p1) && p.grid != null && p.grid.headers != null && p.grid.headers[p1] != null ?
				//            $(p.grid.headers[p1].el) : $();
			default:
				return $(); // return empty jQuery object
			}
		},
		fixScrollOffsetAndhBoxPadding: function () {
			var self = this, grid = self.grid;
			if (!grid) {
				return;
			}

			var p = self.p, bDiv = grid.bDiv,
				fixhBox = function (hDiv) {
					var $hDivhBox = $(hDiv).children("div").first();
					$hDivhBox.css($hDivhBox.hasClass("ui-jqgrid-hbox-rtl") ? "padding-left" : "padding-right", p.scrollOffset);
					hDiv.scrollLeft = bDiv.scrollLeft;
				};
			if ($(bDiv).width() > 0) {
				p.scrollOffset = (bDiv.offsetWidth - bDiv.clientWidth); // can be 0 if no scrollbar exist
				// TODO: add detection of the width of vertical scroll bar if the grid is hidden
				// at the moment of executing fixScrollOffsetAndhBoxPadding (for example inside of inactive jQuery UI Tab)
				// one need just create close construction with visible:hidden style, add to body and get its width
				fixhBox(grid.hDiv);
				if (grid.sDiv) {
					fixhBox(grid.sDiv);
				}
			}
		},
		mergeCssClasses: function () {
			var args = $.makeArray(arguments), map = {}, i, j, ar, cssClass, classes = [];
			for (i = 0; i < args.length; i++) {
				ar = String(args[i]).replace(/[\t\r\n\f]/g, " ").split(" ");
				for (j = 0; j < ar.length; j++) {
					cssClass = ar[j];
					if (cssClass !== "" && !map.hasOwnProperty(cssClass)) {
						map[cssClass] = true;
						classes.push(cssClass);
					}
				}
			}
			return classes.join(" ");
		},
		hasOneFromClasses: function (elem, classes) {
			var $elem = $(elem),
				arClasses = String(classes).replace(/[\t\r\n\f]/g, " ").split(" "),
				n = arClasses.length,
				i;
			for (i = 0; i < n; i++) {
				if ($elem.hasClass(arClasses[i])) {
					return true;
				}
			}
			return false;
		},
		hasAllClasses: function (elem, classes) {
			// the current implementation of jQuery.hasClass can work with multiple classes,
			// but the classes HAVE TO BE in exact the same order. jQuery.hasClass just
			// search for classes using indexOf.
			// (see https://github.com/jquery/jquery/blob/1.11.3/src/attributes/classes.js#L143-L154)
			// Thus we cant's use it to test whether an element has the list of all the classes
			// and we introduces the helper method hasAllClasses
			var $elem = $(elem),
				arClasses = String(classes).replace(/[\t\r\n\f]/g, " ").split(" "),
				n = arClasses.length,
				i;
			for (i = 0; i < n; i++) {
				if (!$elem.hasClass(arClasses[i])) {
					return false;
				}
			}
			return true;
		},
		detectRowEditing: function (rowid) {
			var i, savedRowInfo, tr, self = this, rows = self.rows, p = self.p, isFunction = $.isFunction;
			if (!self.grid || rows == null || p == null) {
				return null; // this is not a grid
			}
			if (p.savedRow === undefined || p.savedRow.length === 0) {
				return null; // the row is not editing now
			}
			for (i = 0; i < p.savedRow.length; i++) {
				savedRowInfo = p.savedRow[i];
				// sell editing saves in savedRow array items like {id: iRow, ic: iCol, name: colModel[iCol].name, v: cellValue}
				if (typeof savedRowInfo.id === "number" && typeof savedRowInfo.ic === "number" &&
						savedRowInfo.name !== undefined && savedRowInfo.v !== undefined &&
						rows[savedRowInfo.id] != null && rows[savedRowInfo.id].id === rowid &&
						isFunction($.fn.jqGrid.restoreCell)) {
					// cell editing
					tr = rows[savedRowInfo.id];
					if (tr != null && tr.id === rowid) {
						return { mode: "cellEditing", savedRow: savedRowInfo };
					}
				} else if (savedRowInfo.id === rowid && isFunction($.fn.jqGrid.restoreRow)) {
					return { mode: "inlineEditing", savedRow: savedRowInfo };
				}
			}
			return null;
		},
		// The method returns jQuery wrapper with the cell (<td>) of the row.
		// It can return jQuery wrapper with two cells in case of usage frozen data:
		// one cell of the main grid and another cell with the corresponding cell from the frozen body table
		getCell: function (tr, iCol) {
			var grid = this.grid, p = this.p, frozenRows, $td;
			if (!grid || !p) { return $(); } // not a grid
			if (tr instanceof $ || tr.length > 0) {
				tr = tr[0]; // unwrap jQuery object to DOM element
			}
			if (!((typeof HTMLTableRowElement === "object" || typeof HTMLTableRowElement === "function") && tr instanceof HTMLTableRowElement) || tr.cells == null) { // the line will be failed in IE7
				return $(); // return empty jQuery object
			}
			$td = $(tr.cells[iCol]);
			frozenRows = grid.fbRows;
			return frozenRows != null && iCol < frozenRows[0].cells.length ?
					$td.add(frozenRows[tr.rowIndex].cells[iCol]) :
					$td;
		},
		getDataFieldOfCell: function (tr, iCol) {
			var p = this.p, $td = jgrid.getCell.call(this, tr, iCol);
			if (p.treeGrid && $td.children("div.tree-wrap").length > 0) {
				$td = $td.children("span.cell-wrapperleaf,span.cell-wrapper");
			}
			return p.colModel[iCol].autoResizable ?
					$td.children("span." + p.autoResizing.wrapperClassName) :
					$td;
		},
		enumEditableCells: function (tr, mode, callback) {
			var self = this, grid = self.grid, rows = self.rows, p = self.p;
			if (grid == null || rows == null || p == null || tr == null || tr.rowIndex == null || !tr.id || !$.isFunction(callback)) {
				return null; // this is not a grid or tr is not tr
			}
			var iCol, colModel = p.colModel, nCol = colModel.length, cm, nm, options,
				isEditable, iRow = tr.rowIndex, td, $dataElement, dataWidth,
				frozenRows = grid.fbRows, frozen = frozenRows != null,
				trFrozen = frozen ? frozenRows[iRow] : null;

			// normalize tr if required
			if (frozen/* && !$.contains(self, tr)*/) {
				// The event could be inside of frozen div.
				// Thus tr could be the same as trFrozen
				// We normalize it based on the rowIndex.
				tr = self.rows[iRow];
			}

			for (iCol = 0; iCol < nCol; iCol++) {
				cm = colModel[iCol];
				nm = cm.name;
				if (nm !== "cb" && nm !== "subgrid" && nm !== "rn") {
					if (frozen && !cm.frozen) {
						frozen = false;
					}
					td = (frozen ? trFrozen : tr).cells[iCol];
					$dataElement = $(td);
					if (!$dataElement.hasClass("not-editable-cell")) {
						dataWidth = $dataElement.width();
						if (p.treeGrid === true && nm === p.ExpandColumn) {
							dataWidth -= $dataElement.children("div.tree-wrap").outerWidth();
							$dataElement = $dataElement.children("span.cell-wrapperleaf,span.cell-wrapper").first();
						} else {
							dataWidth = 0; // we can test it in the callback and use width:auto in the case
						}

						options = {
							rowid: tr.id,
							iCol: iCol,
							iRow: iRow,
							cmName: nm,
							cm: cm,
							mode: mode,
							td: td,
							tr: tr,
							trFrozen: trFrozen,
							dataElement: $dataElement[0],
							dataWidth: dataWidth
						};
						if (!cm.edittype) { cm.edittype = "text"; }
						isEditable = cm.editable;
						isEditable = $.isFunction(isEditable) ?
								isEditable.call(self, options) :
								isEditable;
						if (isEditable === true || isEditable === "hidden") {
							options.editable = isEditable;
							if (callback.call(self, options) === false) { break; }
						}
					}
				}
			}
		},
		getEditedValue: function ($dataFiled, cm, valueText, editable) {
			var result, checkBoxValues, newformat, $field, values, texts,
				formatoptions = cm.formatoptions || {}, editoptions = cm.editoptions || {},
				customValue = editoptions.custom_value,
				nameSelector = "[name=" + jgrid.jqID(cm.name) + "]", $t = this, $self = $($t);
			if (editable === "hidden" || editable === "readonly") {
				// the implementation from the next line can be improved
				return $($t).jqGrid("getCell", $dataFiled.closest("tr.jqgrow").attr("id"), cm.name);
			}
			switch (cm.edittype) {
				case "checkbox":
					checkBoxValues = ["Yes", "No"];
					if (typeof editoptions.value === "string") {
						checkBoxValues = editoptions.value.split(":");
					}
					result = $dataFiled.find("input[type=checkbox]").is(":checked") ? checkBoxValues[0] : checkBoxValues[1];
					break;
				case "text":
				case "password":
				case "textarea":
				case "button":
					$field = $dataFiled.find("input" + nameSelector + ",textarea" + nameSelector);
					result = $field.val();
					if ($field.prop("type") === "date" && String(result).split("-").length === 3) {
						newformat = formatoptions.newformat || $self.jqGrid("getGridRes", "formatter.date.newformat");
						result = jgrid.parseDate.call($t, "Y-m-d", result, newformat);
					}
					break;
				case "select":
					$field = $dataFiled.find("select option:selected");
					if (editoptions.multiple) {
						values = [];
						texts = [];
						$field.each(function () {
							values.push($(this).val());
							texts.push($(this).text());
						});
						result = values.join(",");
						valueText.text = texts.join(",");
					} else {
						result = $field.val();
						valueText.text = $field.text();
					}
					valueText.value = result;
					break;
				case "custom":
					try {
						if ($.isFunction(customValue)) {
							result = customValue.call($t, $dataFiled.find(".customelement"), "get");
							if (result === undefined) {
								throw "e2";
							}
						} else {
							throw "e1";
						}
					} catch (e) {
						var errorText, infoDialog = jgrid.info_dialog,
							getRes = function (path) { $self.jqGrid("getGridRes", path); };
						switch (String(e)) {
							case "e1":
								errorText = "function 'custom_value' " + getRes("edit.msg.nodefined");
								break;
							case "e2":
								break;
							default:
								errorText = e.message;
								break;
						}
						if (infoDialog && $.isFunction(infoDialog)) {
							infoDialog.call($t, getRes("errors.errcap"), errorText, getRes("edit.bClose"));
						} else {
							alert(errorText);
						}
					}
					break;
				default:
					result = $dataFiled.find("*" + nameSelector).text();
					break;
			}
			return result;
		},
		guid: 1,
		uidPref: "jqg",
		randId: function (prefix) {
			return (prefix || jgrid.uidPref) + (jgrid.guid++);
		},
		getAccessor: function (obj, expr) {
			var ret, p, prm = [], i;
			if ($.isFunction(expr)) { return expr(obj); }
			ret = obj[expr];
			if (ret === undefined) {
				try {
					if (typeof expr === "string") {
						prm = expr.split(".");
					}
					i = prm.length;
					if (i) {
						ret = obj;
						while (ret && i--) {
							p = prm.shift();
							ret = ret[p];
						}
					}
				} catch (ignore) { }
			}
			return ret;
		},
		getXmlData: function (obj, expr, returnObj) {
			var m = typeof expr === "string" ? expr.match(/^(.*)\[(\w+)\]$/) : null;
			if ($.isFunction(expr)) { return expr(obj); }
			if (m && m[2]) {
				// m[2] is the attribute selector
				// m[1] is an optional element selector
				// examples: "[id]", "rows[page]"
				return m[1] ? $(m[1], obj).attr(m[2]) : $(obj).attr(m[2]);
			}
			if (obj === undefined) { alert("expr"); }
			// !!! one should never use another form $(expr, obj) if obj could be undefined
			// In the case the $(expr, obj) could be $("someString") and jQuery can
			// parse it as array of characters ($("someString").length will be "someString".length) !!!
			// The problem take place if expr is not string object, but object new String("someString").
			// The problem can exist if one use $.each with array of strings.
			// The "this" inside of $.each is the string converted to object.
			var ret = $(obj).find(expr);
			if (returnObj) { return ret; }
			//$(expr, obj).filter(":last"); // we use ":last" to be more compatible with old version of jqGrid
			return ret.length > 0 ? $(ret).text() : undefined;
		},
		cellWidth: function () {
			// TODO: use all other classes in grid. Probably one should set the visibility explicitly to show (display:block)
			var $testDiv = $("<div class='ui-jqgrid' style='left:10000px'><div class='ui-jqgrid-view'><div class='ui-jqgrid-bdiv'><table class='ui-jqgrid-btable' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div></div></div>"),
				testCell = $testDiv.appendTo("body")
					.find("td")
					.width();
			$testDiv.remove();
			return Math.abs(testCell - 5) > 0.1;
		},
		isCellClassHidden: function (className) {
			var $testDiv = $("<div class='ui-jqgrid' style='left:10000px'><div class='ui-jqgrid-view'><div class='ui-jqgrid-bdiv'><table class='ui-jqgrid-btable' style='width:5px;'><tr class='jqgrow'><td style='width:5px;' class='" + (className || "") + "'></td></tr></table></div></div></div>"),
				isHidden = $testDiv.appendTo("body")
					.find("td")
					.is(":hidden");
			$testDiv.remove();
			return isHidden;
		},		cell_width: true,
		ajaxOptions: {},
		from: function (source) {
			// Original Author Hugo Bonacci
			// License MIT http://jlinq.codeplex.com/license
			var context = this,
				/**
				 * @private
				 * @class
				 */
				QueryObject = function (d, q) {
					var self = this,
						_data = d,
						_usecase = true,
						_trim = false,
						_query = q,
						_stripNum = /[\$,%]/g,
						_lastCommand = null,
						_lastField = null,
						_orDepth = 0,
						_negate = false,
						_queuedOperator = "",
						_sorting = [],
						toString = Object.prototype.toString,
						_useProperties = true;
					if (typeof d === "object" && d.push) {
						if (d.length > 0) {
							if (typeof d[0] !== "object") {
								_useProperties = false;
							} else {
								_useProperties = true;
							}
						}
					} else {
						throw "data provides is not an array";
					}
					/**
					 * @private
					 * @type {function(): boolean}
					 */
					this._hasData = function () {
						return _data === null ? false : _data.length === 0 ? false : true;
					};
					/**
					 * @private
					 * @type {function(string): string}
					 */
					this._getStr = function (s) {
						var phrase = [];
						if (_trim) {
							phrase.push("jQuery.trim(");
						}
						phrase.push("String(" + s + ")");
						if (_trim) {
							phrase.push(")");
						}
						if (!_usecase) {
							phrase.push(".toUpperCase()");
						}
						return phrase.join("");
					};
					/** @private */
					this._strComp = function (val) {
						if (typeof val === "string") {
							return ".toString()";
						}
						return "";
					};
					/** @private */
					this._group = function (f, u) {
						return ({ field: f.toString(), unique: u, items: [] });
					};
					/** @private */
					this._toStr = function (phrase) {
						if (_trim) {
							phrase = $.trim(phrase);
						}
						phrase = phrase.toString().replace(/\\/g, "\\\\").replace(/\"/g, "\\\"");
						return _usecase ? phrase : phrase.toUpperCase();
					};
					/** @private */
					this._funcLoop = function (func) {
						var results = [];
						$.each(_data, function (i, v) {
							results.push(func(v));
						});
						return results;
					};
					/** @private */
					this._append = function (s) {
						var i;
						if (_query === null) {
							_query = "";
						} else {
							_query += _queuedOperator === "" ? " && " : _queuedOperator;
						}
						for (i = 0; i < _orDepth; i++) {
							_query += "(";
						}
						if (_negate) {
							_query += "!";
						}
						_query += "(" + s + ")";
						_negate = false;
						_queuedOperator = "";
						_orDepth = 0;
					};
					/** @private */
					this._setCommand = function (f, c) {
						_lastCommand = f;
						_lastField = c;
					};
					/** @private */
					this._resetNegate = function () {
						_negate = false;
					};
					/** @private */
					this._repeatCommand = function (f, v) {
						if (_lastCommand === null) {
							return self;
						}
						if (f !== null && v !== null) {
							return _lastCommand(f, v);
						}
						if (_lastField === null) {
							return _lastCommand(f);
						}
						if (!_useProperties) {
							return _lastCommand(f);
						}
						return _lastCommand(_lastField, f);
					};
					/** @private */
					this._equals = function (a, b) {
						return (self._compare(a, b, 1) === 0);
					};
					/** @private */
					this._compare = function (a, b, dir) {
						if (dir === undefined) { dir = 1; }
						if (a === undefined) { a = null; }
						if (b === undefined) { b = null; }
						if (a === null && b === null) {
							return 0;
						}
						if (a === null && b !== null) {
							return 1;
						}
						if (a !== null && b === null) {
							return -1;
						}
						if (toString.call(a) === "[object Date]" && toString.call(b) === "[object Date]") {
							if (a < b) { return -dir; }
							if (a > b) { return dir; }
							return 0;
						}
						if (!_usecase && typeof a !== "number" && typeof b !== "number") {
							a = String(a);
							b = String(b);
						}
						if (a < b) { return -dir; }
						if (a > b) { return dir; }
						return 0;
					};
					/** @private */
					this._performSort = function () {
						if (_sorting.length === 0) { return; }
						_data = self._doSort(_data, 0);
					};
					/** @private */
					this._doSort = function (data, iSort) {
						var by = _sorting[iSort].by,
							dir = _sorting[iSort].dir,
							type = _sorting[iSort].type,
							dfmt = _sorting[iSort].datefmt,
							sfunc = _sorting[iSort].sfunc;
						if (iSort === _sorting.length - 1) {
							return self._getOrder(data, by, dir, type, dfmt, sfunc);
						}
						iSort++;
						var values = self._getGroup(data, by, dir, type, dfmt), results = [], i, j, sorted;
						for (i = 0; i < values.length; i++) {
							sorted = self._doSort(values[i].items, iSort);
							for (j = 0; j < sorted.length; j++) {
								results.push(sorted[j]);
							}
						}
						return results;
					};
					/** @private */
					this._getOrder = function (data, by, dir, type, dfmt, sfunc) {
						var sortData = [], _sortData = [], newDir = dir === "a" ? 1 : -1, i, ab, findSortKey;

						if (type === undefined) { type = "text"; }
						if (type === "float" || type === "number" || type === "currency" || type === "numeric") {
							findSortKey = function ($cell) {
								var key = parseFloat(String($cell).replace(_stripNum, ""));
								return isNaN(key) ? Number.NEGATIVE_INFINITY : key;
							};
						} else if (type === "int" || type === "integer") {
							findSortKey = function ($cell) {
								return $cell ? parseFloat(String($cell).replace(_stripNum, "")) : Number.NEGATIVE_INFINITY;
							};
						} else if (type === "date" || type === "datetime") {
							findSortKey = function ($cell) {
								return jgrid.parseDateToNumber.call(context, dfmt, $cell);
							};
						} else if ($.isFunction(type)) {
							findSortKey = type;
						} else {
							findSortKey = function ($cell) {
								$cell = $cell != null ? $.trim(String($cell)) : "";
								return _usecase ? $cell : $cell.toUpperCase();
							};
						}
						$.each(data, function (index, v) {
							ab = by !== "" ? jgrid.getAccessor(v, by) : v;
							if (ab === undefined) { ab = ""; }
							ab = findSortKey(ab, v);
							_sortData.push({ vSort: ab, data: v, index: index });
						});
						if ($.isFunction(sfunc)) {
							_sortData.sort(function (a, b) {
								return sfunc.call(context, a.vSort, b.vSort, newDir, a.data, b.data);
							});
						} else {
							_sortData.sort(function (a, b) {
								return self._compare(a.vSort, b.vSort, newDir);
							});
						}
						var j = 0, nrec = data.length;
						// overhead, but we do not change the original data.
						while (j < nrec) {
							i = _sortData[j].index;
							sortData.push(data[i]);
							j++;
						}
						return sortData;
					};
					/** @private */
					this._getGroup = function (data, by, dir, type, dfmt) {
						var results = [],
							group = null,
							last = null;
						$.each(self._getOrder(data, by, dir, type, dfmt), function (i, v) {
							var val = jgrid.getAccessor(v, by);
							if (val == null) { val = ""; }
							if (!self._equals(last, val)) {
								last = val;
								if (group !== null) {
									results.push(group);
								}
								group = self._group(by, val);
							}
							group.items.push(v);
						});
						if (group !== null) {
							results.push(group);
						}
						return results;
					};
					this.ignoreCase = function () {
						_usecase = false;
						return self;
					};
					this.useCase = function () {
						_usecase = true;
						return self;
					};
					this.trim = function () {
						_trim = true;
						return self;
					};
					this.noTrim = function () {
						_trim = false;
						return self;
					};
					this.execute = function () {
						var match = _query, results = [];
						if (match === null) {
							return self;
						}
						$.each(_data, function () {
							(function () {
								var localMath = "(function (context) { var intFunc = function (jQuery, self) { return " +
										match +
										"; }; return intFunc.call(context.item, context.jQuery, context.context); }(this))";
								if (eval(localMath)) { results.push(this.item); }
							}.call({
								item: this,
								jQuery: $,
								context: context
							}));
						});
						_data = results;
						return self;
					};
					this.data = function () {
						return _data;
					};
					this.select = function (f) {
						self.execute();
						if ($.isFunction(f)) {
							var results = [];
							$.each(_data, function (i, v) {
								results.push(f(v));
							});
							return results;
						}
						if (!self._hasData()) { return []; }
						self._performSort();
						return _data;
					};
					this.hasMatch = function () {
						if (!self._hasData()) { return false; }
						self.execute();
						return _data.length > 0;
					};
					this.andNot = function (f, v, x) {
						_negate = !_negate;
						return self.and(f, v, x);
					};
					this.orNot = function (f, v, x) {
						_negate = !_negate;
						return self.or(f, v, x);
					};
					this.not = function (f, v, x) {
						return self.andNot(f, v, x);
					};
					this.and = function (f, v, x) {
						_queuedOperator = " && ";
						if (f === undefined) {
							return self;
						}
						return self._repeatCommand(f, v, x);
					};
					this.or = function (f, v, x) {
						_queuedOperator = " || ";
						if (f === undefined) { return self; }
						return self._repeatCommand(f, v, x);
					};
					this.orBegin = function () {
						_orDepth++;
						return self;
					};
					this.orEnd = function () {
						if (_query !== null) {
							_query += ")";
						}
						return self;
					};
					this.isNot = function (f) {
						_negate = !_negate;
						return self.is(f);
					};
					this.is = function (f) {
						self._append("this." + f);
						self._resetNegate();
						return self;
					};
					/** @private */
					this._compareValues = function (func, f, v, how, t) {
						var fld;
						if (_useProperties) {
							fld = f;
						} else {
							fld = "this";
						}
						if (v === undefined) { v = null; }
						//var val=v===null?f:v,
						var val = v, swst = t.stype === undefined ? "text" : t.stype;
						if (v !== null) {
							switch (swst) {
							case "int":
							case "integer":
								val = String(val).replace(_stripNum, "");
								val = (isNaN(Number(val)) || val === "") ? "0" : Number(val); // To be fixed with more intelligent code
								fld = "parseInt(" + fld + "||0,10)";
								val = String(parseInt(val, 10));
								break;
							case "float":
							case "number":
							case "currency":
							case "numeric":
								val = String(val).replace(_stripNum, "");
								val = (isNaN(Number(val)) || val === "") ? "0" : Number(val); // To be fixed with more intelligent code
								fld = "parseFloat(" + fld + "||0)";
								val = String(val);
								break;
							case "date":
							case "datetime":
								val = String(jgrid.parseDateToNumber.call(context, t.newfmt || "Y-m-d", val));
								fld = "jQuery.jgrid.parseDateToNumber.call(self,\"" + t.srcfmt + "\"," + fld + ")";
								break;
							default:
								// TODO: consider to apply formatter at least to process correctly
								// default values. For example is bootean property is not defined
								// if will be displayed by formatter:"checkbox" as false value.
								// If the user search for the value one will process the following
								//    jQuery.jgrid.getAccessor(this,'closed')).toUpperCase() == String("FALSE").toUpperCase()
								// which works wrong if the property "closed" is undefined.
								fld = self._getStr(fld);
								val = self._getStr("\"" + self._toStr(val) + "\"");
							}
						}
						self._append(fld + " " + how + " " + val);
						self._setCommand(func, f);
						self._resetNegate();
						return self;
					};
					this.equals = function (f, v, t) {
						return self._compareValues(self.equals, f, v, "==", t);
					};
					this.notEquals = function (f, v, t) {
						return self._compareValues(self.equals, f, v, "!==", t);
					};
					this.isNull = function (f, v, t) {
						return self._compareValues(self.equals, f, null, "===", t);
					};
					this.greater = function (f, v, t) {
						return self._compareValues(self.greater, f, v, ">", t);
					};
					this.less = function (f, v, t) {
						return self._compareValues(self.less, f, v, "<", t);
					};
					this.greaterOrEquals = function (f, v, t) {
						return self._compareValues(self.greaterOrEquals, f, v, ">=", t);
					};
					this.lessOrEquals = function (f, v, t) {
						return self._compareValues(self.lessOrEquals, f, v, "<=", t);
					};
					this.startsWith = function (f, v) {
						var val = (v == null) ? f : v,
							length = _trim ? $.trim(val.toString()).length : val.toString().length;
						if (_useProperties) {
							self._append(self._getStr(f) + ".substr(0," + length + ") == " + self._getStr("\"" + self._toStr(v) + "\""));
						} else {
							if (v != null) { length = _trim ? $.trim(v.toString()).length : v.toString().length; }
							self._append(self._getStr("this") + ".substr(0," + length + ") == " + self._getStr("\"" + self._toStr(f) + "\""));
						}
						self._setCommand(self.startsWith, f);
						self._resetNegate();
						return self;
					};
					this.endsWith = function (f, v) {
						var val = (v == null) ? f : v,
							length = _trim ? $.trim(val.toString()).length : val.toString().length;
						if (_useProperties) {
							self._append(self._getStr(f) + ".substr(" + self._getStr(f) + ".length-" + length + "," + length + ") == \"" + self._toStr(v) + "\"");
						} else {
							self._append(self._getStr("this") + ".substr(" + self._getStr("this") + ".length-\"" + self._toStr(f) + "\".length,\"" + self._toStr(f) + "\".length) == \"" + self._toStr(f) + "\"");
						}
						self._setCommand(self.endsWith, f);
						self._resetNegate();
						return self;
					};
					this.contains = function (f, v) {
						if (_useProperties) {
							self._append(self._getStr(f) + ".indexOf(\"" + self._toStr(v) + "\",0) > -1");
						} else {
							self._append(self._getStr("this") + ".indexOf(\"" + self._toStr(f) + "\",0) > -1");
						}
						self._setCommand(self.contains, f);
						self._resetNegate();
						return self;
					};
					this.groupBy = function (by, dir, type, datefmt) {
						if (!self._hasData()) {
							return null;
						}
						return self._getGroup(_data, by, dir, type, datefmt);
					};
					this.orderBy = function (by, dir, stype, dfmt, sfunc) {
						dir = dir == null ? "a" : $.trim(dir.toString().toLowerCase());
						if (stype == null) { stype = "text"; }
						if (dfmt == null) { dfmt = "Y-m-d"; }
						if (sfunc == null) { sfunc = false; }
						if (dir === "desc" || dir === "descending") { dir = "d"; }
						if (dir === "asc" || dir === "ascending") { dir = "a"; }
						_sorting.push({ by: by, dir: dir, type: stype, datefmt: dfmt, sfunc: sfunc });
						return self;
					};
					this.custom = function (ruleOp, field, data) {
						self._append("self.p.customSortOperations." + ruleOp + ".filter.call(self,{item:this,cmName:\"" + field + "\",searchValue:\"" + data + "\"})");
						self._setCommand(self.custom, field);
						self._resetNegate();
						return self;
					};
					return self;
				};

			return new QueryObject(typeof source === "string" ? $.data(source) : source, null);
		},
		serializeFeedback: function (callback, eventName, postData) {
			var self = this, eventResult;
			if (self instanceof $ && self.length > 0) {
				self = self[0];
			}
			if (typeof postData === "string") {
				return postData;
			}
			eventResult = $(self).triggerHandler(eventName, postData);
			if (typeof eventResult === "string") {
				return eventResult;
			}
			if (eventResult == null || typeof eventResult !== "object") {
				eventResult = postData; // uses original postData
			}
			return $.isFunction(callback) ? callback.call(self, eventResult) : eventResult;
		},
		fullBoolFeedback: function (callback, eventName) {
			var self = this, args = $.makeArray(arguments).slice(2), result = $(self).triggerHandler(eventName, args);

			result = (result === false || result === "stop") ? false : true;
			if ($.isFunction(callback)) {
				var callbackResult = callback.apply(self, args);
				if (callbackResult === false || callbackResult === "stop") {
					result = false;
				}
			}
			return result;
		},
		feedback: function (p, eventPrefix, callbackSuffix, callbackName) {
			var self = this;
			if (self instanceof $ && self.length > 0) {
				self = self[0];
			}
			if (p == null || typeof callbackName !== "string" || callbackName.length < 2) {
				return null; // incorrect call
			}
			// onSortCol -> jqGridSortCol, onSelectAll -> jqGridSelectAll, ondblClickRow -> jqGridDblClickRow
			// resizeStop -> jqGridResizeStop
			var eventName = callbackName.substring(0, 2) === "on" ?
					"jqGrid" + eventPrefix + callbackName.charAt(2).toUpperCase() + callbackName.substring(3) :
					"jqGrid" + eventPrefix + callbackName.charAt(0).toUpperCase() + callbackName.substring(1),
				args = $.makeArray(arguments).slice(4),
				callback = p[callbackName + callbackSuffix];

			args.unshift(eventName);
			args.unshift(callback);
			return jgrid.fullBoolFeedback.apply(self, args);
		},
		builderSortIcons: function (/*iCol*/) {
			// iCol is unused currently, but one can modify the code to set for example different sorting
			// icons for columns based on sorttype option of colModel
			var ts = this, p = ts.p,
				disabledStateClasses = $(this).jqGrid("getGuiStyles", "states.disabled"),
				getClasses = function (ascOrDesc) {
					return jgrid.mergeCssClasses(
						"ui-grid-ico-sort",
						"ui-icon-" + ascOrDesc,
						p.viewsortcols[1] === "horizontal" ? "ui-i-" + ascOrDesc : "",
						disabledStateClasses,
						$(ts).jqGrid("getIconRes", "sort." + ascOrDesc),
						"ui-sort-" + p.direction
					);
				};

			return "<span class='s-ico" + (p.sortIconsBeforeText ? " jqgrid-icons-first" : "") +
				"' style='display:none'><span class='" + getClasses("asc") +
				"'></span><span class='" + getClasses("desc") + "'></span></span>";
		},
		/**
		 *  @param {String} id
		 *  @param {String} text
		 *  @param {String} icon
		 *  @param {String} iconOnLeftOrRight - string "left", "right" or undefined
		 *  @param {String} conner - string "left", "right" or undefined.
		 */
		builderFmButon: function (id, text, icon, iconOnLeftOrRight, conner) {
			var p = this.p, $self = $(this),
				getDialogGuiStyles = function (name) {
					return $self.jqGrid("getGuiStyles", "dialog." + name);
				};
			if (p == null) { return ""; }

			return "<a id='" + id + "' class='" +
				jgrid.mergeCssClasses("fm-button",
					getDialogGuiStyles("fmButton"),
					getDialogGuiStyles(conner === "right" ? "rightCorner" : (conner === "left" ? "leftCorner" : "defaultCorner")),
					iconOnLeftOrRight === "right" ?
							"fm-button-icon-right" :
							(iconOnLeftOrRight === "left" ? "fm-button-icon-left" : "")
				) + "' role='button' tabindex='0'>" +
				(icon ? "<span class='fm-button-icon " + ($self.jqGrid("getIconRes", icon) || icon) + "'></span>" : "") +
				(text ? "<span class='fm-button-text'>" + text + "</span>" : "") +
				"</a>";
		},
		convertOnSaveLocally: function (nData, cm, oData, rowid, item, iCol) {
			var self = this, p = self.p;
			if (p == null) {
				return nData;
			}
			if ($.isFunction(cm.convertOnSave)) {
				return cm.convertOnSave.call(this, { newValue: nData, cm: cm, oldValue: oData, id: rowid, item: item, iCol: iCol });
			}
			if (typeof oData !== "boolean" && typeof oData !== "number") {
				// we support first of all editing of boolean and numeric data
				// TODO: more data types (like Date) need be implemented
				return nData;
			}

			if (typeof oData === "boolean" && (cm.edittype === "checkbox" || cm.formatter === "checkbox")) {
				// convert nData to boolean if possible
				var lnData = String(nData).toLowerCase(),
					cbv = cm.editoptions != null && typeof cm.editoptions.value === "string" ?
							cm.editoptions.value.split(":") : ["yes", "no"];
				if ($.inArray(lnData, ["1", "true", cbv[0].toLowerCase()]) >= 0) {
					nData = true;
				} else if ($.inArray(lnData, ["0", "false", cbv[1].toLowerCase()]) >= 0) {
					nData = false;
				}
			} else if (typeof oData === "number" && !isNaN(nData)) {
				if (cm.formatter === "number" || cm.formatter === "currency") {
					nData = parseFloat(nData);
				} else if (cm.formatter === "integer") {
					nData = parseInt(nData, 10);
				}
			}
			return nData;
		},
		parseDataToHtml: function (len, ids, items, cellsToDisplay, rcnt, adjust, readAllInputData) {
			var self = this, p = self.p, $self = $(self), i, j, altr, cn1, selr, idr, rd, cells, iStartTrTag,
				selected = false, rowData = [], grpdata = [],
				cn = (p.altRows === true && !$self.jqGrid("isBootstrapGuiStyle")) ? p.altclass : "",
				hiderow = p.grouping ? p.groupingView.groupCollapse === true : false,
				rn = parseInt(p.rowNum, 10), cmName, $j = $.fn.jqGrid,
				// prepare to build the map rowIndexes, which will simplify us to get rowIndex
				// of any row of table by its rowid.
				// ??? probably rcnt can be used too
				rowIndex = p.treeGrid === true && p.treeANode > -1 ?
						self.rows[p.treeANode].rowIndex + 1 :
						self.rows.length,
				formatCol = self.formatCol,
				addCell = function (rowId, cell, pos, irow, srvr, rdata) {
					var v = self.formatter(rowId, cell, pos, srvr, "add", rdata);
					return "<td role='gridcell' " + formatCol(pos, irow, v, srvr, rowId, rdata) + ">" + v + "</td>";
				},
				addMulti = function (rowid, pos, irow, checked, item) {
					var checkboxHtml = "&nbsp;", hasCbox = true;
					if ($.isFunction(p.hasMultiselectCheckBox)) {
						hasCbox = p.hasMultiselectCheckBox.call(self,
								{ rowid: rowid, iRow: irow, iCol: pos, data: item });
					}
					if (hasCbox) {
						checkboxHtml = "<input type='checkbox'" + " id='jqg_" + p.id + "_" + rowid +
							"' class='cbox' name='jqg_" + p.id + "_" + rowid + "'" +
							(checked ? " checked='checked' aria-checked='true'" : " aria-checked='false'") + "/>";
					}
					return "<td role='gridcell' " + formatCol(pos, irow, "", null, rowid, true) + ">" +
						checkboxHtml + "</td>";
				},
				addRowNum = function (pos, irow, pG, rN) {
					var v = (parseInt(pG, 10) - 1) * parseInt(rN, 10) + 1 + irow;
					return "<td role='gridcell' class='" + $j.getGuiStyles.call($self, "rowNum", "jqgrid-rownum") + "' " +
						formatCol(pos, irow, v, null, irow, true) + ">" + v + "</td>";
				};
			if (rowIndex <= 1) { p.rowIndexes = {}; }
			if ((p.datatype === "local" && !p.deselectAfterSort) || p.multiPageSelection) { selected = true; }
			if (adjust) { rn *= adjust + 1; }
			for (i = 0; i < Math.min(len, rn); i++) {
				idr = ids[i];
				rd = items[i];
				cells = cellsToDisplay != null ? cellsToDisplay[i] : rd;
				altr = rcnt === 1 ? 0 : rcnt; // probably rowIndex should be used instead
				cn1 = (altr + i) % 2 === 1 ? cn : "";
				if (selected) {
					if (p.multiselect) {
						selr = ($.inArray(idr, p.selarrrow) !== -1);
						if (selr && p.selrow === null) { p.selrow = idr; }
					} else {
						selr = (idr === p.selrow);
					}
				}
				iStartTrTag = rowData.length;
				rowData.push(""); // it will be replaced. See rowData[iStartTrTag] below
				for (j = 0; j < p.colModel.length; j++) {
					cmName = p.colModel[j].name;
					switch (cmName) {
						case "rn":
							rowData.push(addRowNum(j, i, p.page, p.rowNum));
							break;
						case "cb":
							rowData.push(addMulti(idr, j, i, selr, rd));
							break;
						case "subgrid":
							rowData.push($j.addSubGridCell.call($self, j, i + rcnt, idr, rd));
							break;
						default:
							rowData.push(addCell(idr, rd[cmName], j, i + rcnt, cells, rd));
					}
				}
				rowData[iStartTrTag] = self.constructTr(idr, hiderow, cn1, rd, cells, selr);
				rowData.push("</tr>");
				p.rowIndexes[idr] = rowIndex;
				rowIndex++;
				//TODO: fix p.rowIndexes in case of usage grouping.
				if (p.grouping && $j.groupingPrepare) {
					// we save the rowData in the array grpdata first.
					// grpdata will collect HTML fragments of all rows of data
					// of the current group. Later we call groupingRender, which
					// will insert additional grouping row and concatinate all
					// the HTML fragments of all rows of the group.
					grpdata.push(rowData);
					if (!p.groupingView._locgr) {
						$j.groupingPrepare.call($self, rd, i);
					}
					rowData = []; // the data for rendering are moved in grpdata
				}
				if (rowData.length > p.maxItemsToJoin) {
					rowData = [rowData.join("")];
				}
			}
			if (p.grouping && $j.groupingRender) {
				if (readAllInputData) {
					p.groupingView._locgr = true;
				}
				rowData = [$j.groupingRender.call($self, grpdata, rn)];
				jgrid.clearArray(grpdata); //grpdata = null;
			}
			return rowData;
		},
		getMethod: function (name) {
			// this should be $.jgrid object
			return this.getAccessor($.fn.jqGrid, name);
		},
		extend: function (methods) {
			$.extend($.fn.jqGrid, methods);
			if (!this.no_legacy_api) {
				$.fn.extend(methods);
			}
		}
	});
	var clearArray = jgrid.clearArray, jqID = jgrid.jqID,
		getGridComponentIdSelector = jgrid.getGridComponentIdSelector, getGridComponentId = jgrid.getGridComponentId,
		getGridComponent = jgrid.getGridComponent, stripPref = jgrid.stripPref, randId = jgrid.randId,
		getAccessor = jgrid.getAccessor, convertOnSaveLocally = jgrid.convertOnSaveLocally,
		stripHtml = jgrid.stripHtml, htmlEncode = jgrid.htmlEncode, htmlDecode = jgrid.htmlDecode,
		mergeCssClasses = jgrid.mergeCssClasses, hasOneFromClasses = jgrid.hasOneFromClasses,
		feedback = function () {
			// short form of $.jgrid.feedback to save usage this.p as the first parameter
			var args = $.makeArray(arguments);
			args.unshift("");
			args.unshift("");
			args.unshift(this.p);
			return jgrid.feedback.apply(this, args);
		};

	/**
	 * @param {(string|Object)} pin
	 */
	$.fn.jqGrid = function (pin) {
		var $j = $.fn.jqGrid, fn;
		if (typeof pin === "string") {
			fn = $j[pin];
			if (!fn) {
				throw ("jqGrid - No such method: " + pin);
			}
			return fn.apply(this, $.makeArray(arguments).slice(1));
		}
		return this.each(function () {
			if (this.grid) { return; }
			// TODO: verify that pin.locale exists in locales. If it's not exist then change it to
			// en-US or some other which exist
			var ts = this, localData, localDataStr, $self0 = $(ts),
				isFunction = $.isFunction, isArray = $.isArray, extend = $.extend, inArray = $.inArray,
				trim = $.trim, each = $.each, setSelection = $j.setSelection, getGridRes = $j.getGridRes,
				fatalErrorFunction = isFunction(defaults.fatalError) ? defaults.fatalError : alert,
				locale = pin.locale || defaults.locale || "en-US",
				direction = locales[locale] != null && typeof locales[locale].isRTL === "boolean" ? (locales[locale].isRTL ? "rtl" : "ltr") : "ltr",
				iconSet = pin.iconSet || defaults.iconSet || ((pin.guiStyle || defaults.guiStyle) === "bootstrap" || (pin.guiStyle || defaults.guiStyle) === "bootstrapPrimary" ? "glyph" : "jQueryUI"),
				guiStyle = pin.guiStyle || defaults.guiStyle || "jQueryUI",
				getIcon = function (path) {
					//return jgrid.getIconRes(iconSet, path);
					return $j.getIconRes.call(ts, path);
				},
				getGuiStyles = function (path, jqClasses) {
					return $self0.jqGrid("getGuiStyles", path, jqClasses);
				},
				stdLoadError = function (jqXHR, textStatus, errorThrown) {
					if (textStatus !== "abort" && errorThrown !== "abort") {
						var $errorDiv = $(this.grid.eDiv),
							contentType = jqXHR.getResponseHeader ("Content-Type"),
							$errorSpan = $errorDiv.children(".ui-jqgrid-error"),
							message = jqXHR.responseText || "",
							processHtmlError = function (msg) {
								var div = document.createElement("div"), scripts, i, bodyMatch;
								// get body only and strip all scripts
								bodyMatch = /<body[^>]*>([\s\S]*)<\/body\s*>/gim.exec(msg);
								div.innerHTML = bodyMatch != null && bodyMatch.length === 2 ?
										bodyMatch[1] : msg;
								scripts = div.getElementsByTagName("script");
								i = scripts.length;
								while (i--) {
									scripts[i].parentNode.removeChild(scripts[i]);
								}
								// strip html headers and get the body only
								msg = div.innerHTML;
								try {
									// remove HTML, if it has no text
									if ($.trim($(msg).text()) === "") {
										msg = "";
									}
								}
								catch (ignore) {}
								return msg;
							},
							processJsonError = function (msg) {
								try {
									var errorInfo = $.parseJSON(msg), errorMessages = [], errorProp;
									for (errorProp in errorInfo) {
										if (errorInfo.hasOwnProperty(errorProp) && errorProp !== "StackTrace") {
											errorMessages.push(errorProp + ": " + errorInfo[errorProp]);
										}
									}
									msg = errorMessages.join("<br />");
								}
								catch (ignore) {}
								return msg;
							};
						if (contentType === "text/html") {
							message = processHtmlError(message);
						} else if (contentType === "application/json") {
							message = processJsonError(message);
						} else if (contentType === "text/plain") {
							// try to process as JSON
							message = processJsonError(message);
						}
						if (jqXHR.status !== 500 && jqXHR.status !== 0) {
							// add the header
							message = (textStatus || errorThrown) +
								(errorThrown && (errorThrown !== textStatus) ? ": " + errorThrown : "") +
								" " + jqXHR.status + " " + jqXHR.statusText +
								(message !== "" ? "<hr />" : "") +
								message;
						}
						$errorSpan.html(message || textStatus || errorThrown);
						$errorDiv.show();
						if (p.errorDisplayTimeout) {
							setTimeout(function () {
								$errorSpan.empty();
								$errorDiv.hide();
							}, p.errorDisplayTimeout);
						}
					}
				};
			if (pin == null) {
				pin = { datatype: "local" };
			}
			if (pin.datastr !== undefined && isArray(pin.datastr)) {
				localDataStr = pin.datastr;
				pin.datastr = []; // don't clear the array, just change the value of datastr property
			}
			if (pin.data !== undefined) {
				localData = pin.data;
				pin.data = []; // don't clear the array, just change the value of data property
			}
			if (jgrid.formatter == null || jgrid.formatter.unused == null) {
				// detect old locale file grid.locale-XX.js are included (without DEEP extend).
				fatalErrorFunction("CRITICAL ERROR!!!\n\n\nOne uses probably\n\n\t$.extend($.jgrid.defaults, {...});\n\nto set default settings of jqGrid instead of the usage the DEEP version of jQuery.extend (with true as the first parameter):\n\n\t$.extend(true, $.jgrid.defaults, {...});\n\nOne other possible reason:\n\nyou included some OLD version of language file (grid.locale-en.js for example) AFTER jquery.jqGrid.min.js. For example all language files of jqGrid 4.7.0 uses non-deep call of jQuery.extend.\n\n\nSome options of jqGrid could still work, but another one will be broken.");
			}
			if (pin.datatype === undefined && pin.dataType !== undefined) {
				// fix the bug in the usage of dataType instead of datatype
				pin.datatype = pin.dataType;
				delete pin.dataType;
			}
			if (pin.mtype === undefined && pin.type !== undefined) {
				// fix the bug in the usage of type instead of mtype
				pin.mtype = pin.type;
				delete pin.type;
			}

			ts.p = { iconSet: iconSet }; // minimal initializing to get icons with respect of getIconRes method
			var p = extend(true,
				{
					//url: "",
					height: "auto",
					page: 1,
					rowNum: 20,
					maxRowNum: 10000,
					autoresizeOnLoad: false,
					columnsToReResizing: [],
					autoResizing: {
						wrapperClassName: "ui-jqgrid-cell-wrapper",
						//widthOfVisiblePartOfSortIcon: pin.iconSet === "fontAwesome" ? 13 : 12,
						minColWidth: 33,
						maxColWidth: 300,
						adjustGridWidth: true, // shrinkToFit and widthOrg (no width option or width:"auto" during jqGrid creation will be detected) will be used additionally with adjustGridWidth
						compact: false,
						fixWidthOnShrink: false
					},
					doubleClickSensitivity: 250,
					minResizingWidth: 10,
					rowTotal: null,
					records: 0,
					pager: "",
					pgbuttons: true,
					pginput: true,
					colModel: [],
					additionalProperties: [],
					arrayReader: [],
					rowList: [],
					colNames: [],
					sortorder: "asc",
					threeStateSort: false,
					//showOneSortIcon: pin.showOneSortIcon !== undefined ? pin.showOneSortIcon :
					//    pin.iconSet === "fontAwesome" ? true : false, // hide or set ui-state-disabled class on the other icon
					sortname: "",
					//datatype: pin.datatype !== undefined ? pin.datatype : // datatype parameter are specified - use it
					//    localData !== undefined || pin.url == null ? "local" : // data parameter specified or no url are specified
					//        pin.jsonReader != null && typeof pin.jsonReader === "object" ? "json" : "xml", // if jsonReader are specified - use "json". In all other cases - use "xml"
					mtype: "GET",
					altRows: false,
					selarrrow: [],
					savedRow: [],
					shrinkToFit: true,
					xmlReader: {},
					//jsonReader: {},
					subGrid: false,
					subGridModel: [],
					reccount: 0,
					lastpage: 0,
					lastsort: 0,
					selrow: null,
					singleSelectClickMode: "toggle",
					beforeSelectRow: null,
					onSelectRow: null,
					onSortCol: null,
					ondblClickRow: null,
					onRightClickRow: null,
					onPaging: null,
					onSelectAll: null,
					onInitGrid: null,
					loadComplete: null,
					gridComplete: null,
					loadError: stdLoadError,
					loadBeforeSend: null,
					afterInsertRow: null,
					beforeRequest: null,
					beforeProcessing: null,
					onHeaderClick: null,
					viewrecords: false,
					loadonce: false,
					forceClientSorting: false,
					multiselect: false,
					multikey: false,
					editurl: "clientArray",
					search: false,
					caption: "",
					hidegrid: true,
					hiddengrid: false,
					useUnformattedDataForCellAttr: true,
					postData: {},
					userData: {},
					treeGrid: false,
					treeGridModel: "nested",
					treeReader: {},
					treeANode: -1,
					ExpandColumn: null,
					tree_root_level: 0,
					prmNames: { page: "page", rows: "rows", sort: "sidx", order: "sord", search: "_search", nd: "nd", id: "id", oper: "oper", editoper: "edit", addoper: "add", deloper: "del", subgridid: "id", npage: null, totalrows: "totalrows" },
					forceFit: false,
					gridstate: "visible",
					cellEdit: false,
					iCol: -1,
					iRow: -1,
					//cellsubmit: pin.cellurl === undefined ? "clientArray" : "remote",
					nv: 0,
					loadui: "enable",
					toolbar: [false, ""],
					scroll: false,
					multiboxonly: false,
					deselectAfterSort: true,
					multiPageSelection: false,
					scrollrows: false,
					autowidth: false,
					scrollOffset: 18,
					cellLayout: 5,
					subGridWidth: 16,
					multiselectWidth: 16,
					multiselectPosition: "left",
					gridview: true,
					rownumWidth: 25,
					rownumbers: false,
					pagerpos: "center",
					footerrow: false,
					userDataOnFooter: false,
					hoverrows: true,
					altclass: "ui-priority-secondary",
					viewsortcols: [false, "vertical", true],
					resizeclass: "",
					autoencode: false, // true is better for the most cases, but we hold old value to have better backwards compatibility
					autoEncodeOnEdit: false,
					remapColumns: [],
					cmNamesInputOrder: [],
					ajaxGridOptions: {},
					direction: direction,
					toppager: false,
					headertitles: false,
					scrollTimeout: 40,
					maxItemsToJoin: 32768,
					data: [],
					lastSelectedData: [],
					quickEmpty: "quickest", // false, true or "quickest"
					/** @dict */
					_index: {},
					iColByName: {},
					iPropByName: {},
					reservedColumnNames: ["rn", "cb", "subgrid"],
					grouping: false,
					groupingView: { groupField: [], groupOrder: [], groupText: [], groupColumnShow: [], groupSummary: [], showSummaryOnHide: false, sortitems: [], sortnames: [], summary: [], summaryval: [], displayField: [], groupSummaryPos: [], formatDisplayField: [], _locgr: false, commonIconClass: getIcon("grouping.common"), plusicon: getIcon("grouping.plus"), minusicon: getIcon("grouping.minus") },
					ignoreCase: true,
					cmTemplate: {},
					idPrefix: "",
					iconSet: iconSet, // "fontAwesome" or "jQueryUI" or some custom value
					guiStyle: guiStyle,
					locale: locale,
					multiSort: false,
					treeIcons: {
						commonIconClass: getIcon("treeGrid.common"),
						plusLtr: getIcon("treeGrid.plusLtr"),
						plusRtl: getIcon("treeGrid.plusRtl"),
						minus: getIcon("treeGrid.minus"),
						leaf: getIcon("treeGrid.leaf")
					},
					subGridOptions: {
						commonIconClass: getIcon("subgrid.common"),
						plusicon: getIcon("subgrid.plus"),
						minusicon: getIcon("subgrid.minus")
					}
				},
				//locales[locale].defaults,
				defaults,
				{
					navOptions: extend(true, {
						commonIconClass: getIcon("nav.common"),
						editicon: getIcon("nav.edit"),
						addicon: getIcon("nav.add"),
						delicon: getIcon("nav.del"),
						searchicon: getIcon("nav.search"),
						refreshicon: getIcon("nav.refresh"),
						viewicon: getIcon("nav.view"),
						saveicon: getIcon("nav.save"),
						cancelicon: getIcon("nav.cancel"),
						buttonicon: getIcon("nav.newbutton")
					}, jgrid.nav || {}),
					actionsNavOptions: extend(true, {
						commonIconClass: getIcon("actions.common"),
						editicon: getIcon("actions.edit"),
						delicon: getIcon("actions.del"),
						saveicon: getIcon("actions.save"),
						cancelicon: getIcon("actions.cancel")
					}, jgrid.actionsNav || {}),
					formEditing: extend(true, {
						commonIconClass: getIcon("form.common"),
						prevIcon: getIcon("form.prev"),
						nextIcon: getIcon("form.next"),
						saveicon: [true, "left", getIcon("form.save")],
						closeicon: [true, "left", getIcon("form.undo")]
					}, jgrid.edit || {}),
					searching: extend(true, {
						commonIconClass: getIcon("search.common"),
						findDialogIcon: getIcon("search.search"),
						resetDialogIcon: getIcon("search.reset"),
						queryDialogIcon: getIcon("search.query")
					}, jgrid.search || {}),
					formViewing: extend(true, {
						commonIconClass: getIcon("form.common"),
						prevIcon: getIcon("form.prev"),
						nextIcon: getIcon("form.next"),
						closeicon: [true, "left", getIcon("form.cancel")]
					}, jgrid.view || {}),
					formDeleting: extend(true, {
						commonIconClass: getIcon("form.common"),
						delicon: [true, "left", getIcon("form.del")],
						cancelicon: [true, "left", getIcon("form.cancel")]
					}, jgrid.del || {})
				},
				pin || {}),
				getRes = function (path) {
					return getGridRes.call($self0, path);
				},
				getDef = function (path) {
					var gridParam = jgrid.getRes(p, path);
					return gridParam !== undefined ? gridParam : getGridRes.call($self0, "defaults." + path);
				};
			// set dynamic options
			p.recordpos = p.recordpos || (p.direction === "rtl" ? "left" : "right");
			p.subGridOptions.openicon = p.direction === "rtl" ? getIcon("subgrid.openRtl") : getIcon("subgrid.openLtr");
			p.autoResizing.widthOfVisiblePartOfSortIcon =
				p.autoResizing.widthOfVisiblePartOfSortIcon !== undefined ?
						p.autoResizing.widthOfVisiblePartOfSortIcon :
						(p.iconSet === "fontAwesome" ? 13 : 12);
			//p.showOneSortIcon = p.showOneSortIcon !== undefined ? p.showOneSortIcon :
			//    (p.iconSet === "fontAwesome" ? true : false);
			p.datatype = p.datatype !== undefined ? p.datatype : // datatype parameter are specified - use it
					localData !== undefined || p.url == null ? "local" : // data parameter specified or no url are specified
							p.jsonReader != null && typeof p.jsonReader === "object" ? "json" : "xml"; // if jsonReader are specified - use "json". In all other cases - use "xml"
			p.jsonReader = p.jsonReader || {};
			p.url = p.url || "";
			p.cellsubmit = p.cellsubmit !== undefined ? p.cellsubmit :
					p.cellurl === undefined ? "clientArray" : "remote";
			p.gridview = p.gridview !== undefined ? p.gridview : (p.afterInsertRow == null);

			if (localData !== undefined) {
				p.data = localData;
				pin.data = localData;
			}
			if (localDataStr !== undefined) {
				p.datastr = localDataStr;
				pin.datastr = localDataStr;
			}
			if (ts.tagName.toUpperCase() !== "TABLE") {
				fatalErrorFunction("Element is not a table!");
				return;
			}
			if (ts.id === "") {
				$self0.attr("id", randId());
			}
			if (document.documentMode !== undefined) { // IE only
				if (document.documentMode <= 5) {
					fatalErrorFunction("Grid can not be used in this ('quirks') mode!");
					return;
				}
			}
			$self0.empty().attr("tabindex", "0");
			ts.p = p;
			p.id = ts.id;
			p.idSel = "#" + jqID(ts.id);
			p.gBoxId = getGridComponentId.call(ts, COMPONENT_NAMES.GRID_BOX_DIV);   // gbox id like "gbox_list" or "gbox_my.list"
			p.gBox = getGridComponentIdSelector.call(ts, COMPONENT_NAMES.GRID_BOX_DIV);   // gbox selector like "#gbox_list" or "#gbox_my\\.list"
			p.gViewId = getGridComponentId.call(ts, COMPONENT_NAMES.GRID_VIEW_DIV); // gview id like "gview_list" or "gview_my.list"
			p.gView = getGridComponentIdSelector.call(ts, COMPONENT_NAMES.GRID_VIEW_DIV); // gview selector like "#gview_list" or "#gview_my\\.list"
			p.rsId = getGridComponentId.call(ts, COMPONENT_NAMES.COLUMN_RESIZER_DIV); // vertical div inside of gbox which will be seen on resizing of columns
			p.rs = getGridComponentIdSelector.call(ts, COMPONENT_NAMES.COLUMN_RESIZER_DIV); // vertical div inside of gbox which will be seen on resizing of columns
			p.cbId = getGridComponentId.call(ts, COMPONENT_NAMES.HEADER_SELECT_ALL_ROWS_CHECKBOX); // "cb_" +id
			p.cb = getGridComponentIdSelector.call(ts, COMPONENT_NAMES.HEADER_SELECT_ALL_ROWS_CHECKBOX); // "cb_" +id

			var fixScrollOffsetAndhBoxPadding = jgrid.fixScrollOffsetAndhBoxPadding,
				buildColNameMap = function (colModel) {
					var m = {}, i, n = colModel.length;
					for (i = 0; i < n; i++) {
						m[colModel[i].name] = i;
					}
					return m;
				},
				buildAddPropMap = function (additionalProperties) {
					var m = {}, i, n = additionalProperties.length, addPropInfo;
					for (i = 0; i < n; i++) {
						addPropInfo = additionalProperties[i];
						m[typeof addPropInfo === "string" ? addPropInfo : addPropInfo.name] = i;
					}
					return m;
				},
				rebuildRowIndexes = function () {
					var rowIndexes = {}, row, i;
					this.p.rowIndexes = rowIndexes;
					for (i = 0; i < this.rows.length; i++) {
						row = this.rows[i];
						if ($(row).hasClass("jqgrow")) {
							rowIndexes[row.id] = row.rowIndex;
						}
					}
				},
				buildArrayReader = function () {
					var i, colModel = p.colModel, cmNamesInputOrder = p.cmNamesInputOrder,
						additionalProperties = p.additionalProperties, n = cmNamesInputOrder.length, arrayReaderInfos,
						name, index, order;
					p.arrayReaderInfos = {};
					arrayReaderInfos = p.arrayReaderInfos;
					for (order = 0; order < n; order++) {
						name = cmNamesInputOrder[order];
						if (inArray(name, p.reservedColumnNames) < 0 && !arrayReaderInfos.hasOwnProperty(name)) {
							index = p.iColByName[name];
							if (index !== undefined) {
								arrayReaderInfos[name] = { name: colModel[index].name, index: index, order: order, type: 0 }; // INPUT_NAME_TYPE.COL_NAME
							} else {
								index = p.iPropByName[name];
								if (index !== undefined) {
									arrayReaderInfos[name] = { name: colModel[index].name, index: index, order: order, type: 1 };// INPUT_NAME_TYPE.ADDITIONAL_PROPERTY
								} else if (name === (p.prmNames.rowidName || "rowid")) {
									arrayReaderInfos[name] = { index: index, type: 2 };// INPUT_NAME_TYPE.ROWID
								}
							}
						}
					}
					n = colModel.length;
					for (i = 0; i < n; i++) {
						name = colModel[i].name;
						if (inArray(name, p.reservedColumnNames) < 0 && !arrayReaderInfos.hasOwnProperty(name)) {
							arrayReaderInfos[name] = { name: name, index: i, order: order, type: 0 };// INPUT_NAME_TYPE.COL_NAME
							order++;
						}
					}
					n = additionalProperties.length;
					for (i = 0; i < n; i++) {
						name = additionalProperties[i];
						if (name != null && !arrayReaderInfos.hasOwnProperty(name)) {
							if (typeof name === "object" && $.type(name.name) === "string") {
								name = name.name;
							}
							arrayReaderInfos[name] = { name: name, index: i, order: order, type: 1 };
							order++;
						}
					}
				},
				myResizerClickHandler = function (e) {
					var pageX = $(this).data("pageX");
					if (pageX) {
						pageX = String(pageX).split(";");
						pageX = pageX[pageX.length - 1];
						$(this).data("pageX", pageX + ";" + e.pageX);
					} else {
						$(this).data("pageX", e.pageX);
					}
				},
				intNum = function (val, defval) {
					val = parseInt(val, 10);
					if (isNaN(val)) { return defval || 0; }
					return val;
				},
				grid = {
					headers: [],
					cols: [],
					footers: [],
					// Some properties will be created dynamically on demand
					// cDiv
					// uDiv
					// topDiv
					// hDiv
					// bDiv
					// sDiv
					// ubDiv
					// fhDiv
					// fbDiv
					// fsDiv
					// width
					// newWidth
					// resizing
					// scrollTop
					// timer
					// prevRowHeight
					dragStart: function (i, x, y, $th) {
						var self = this, $bDiv = $(self.bDiv), gridOffset = $bDiv.closest(p.gBox).offset(),
							// it's better to use exact position of the border on the right of the current header
							startX = $th.offset().left + (p.direction === "rtl" ? 0 : self.headers[i].width + (jgrid.cell_width ? 0 : intNum(p.cellLayout, 0)) - 2);
						self.resizing = { idx: i, startX: startX, sOL: startX, moved: false, delta: startX - x.pageX };
						self.curGbox = $(p.rs);
						self.curGbox.prependTo("body"); // change the parent to be able to move over the ranges of the gBox
						self.curGbox.css({ display: "block", left: startX, top: y[1] + gridOffset.top + 1, height: y[2] });
						self.curGbox.css("height", (y[2] - (self.curGbox.outerHeight() - self.curGbox.height())) + "px");
						self.curGbox.data("idx", i);
						self.curGbox.data("delta", startX - x.pageX);
						myResizerClickHandler.call(this.curGbox, x);
						feedback.call(getGridComponent(COMPONENT_NAMES.BODY_TABLE, $bDiv)[0], "resizeStart", x, i);
						document.onselectstart = function () { return false; };
						$(document)
							.bind("mousemove.jqGrid", function (e) {
								if (grid.resizing) {
									grid.dragMove(e);
									return false;
								}
							})
							.bind("mouseup.jqGrid" + p.id, function () {
								if (grid.resizing) {
									grid.dragEnd();
									return false;
								}
							});
					},
					dragMove: function (x) {
						var self = this, resizing = self.resizing;
						if (resizing) {
							var diff = x.pageX + resizing.delta - resizing.startX, headers = self.headers, h = headers[resizing.idx],
								newWidth = p.direction === "ltr" ? h.width + diff : h.width - diff, hn, nWn,
								minResizingWidth = ((p.colModel[resizing.idx] || {}).autoResizing || {}).minColWidth || p.minResizingWidth;
							resizing.moved = true;
							if (newWidth > minResizingWidth) {
								if (self.curGbox == null) {
									self.curGbox = $(p.rs);
								}
								self.curGbox.css({ left: resizing.sOL + diff });
								if (p.forceFit === true) {
									hn = headers[resizing.idx + p.nv];
									nWn = p.direction === "ltr" ? hn.width - diff : hn.width + diff;
									if (nWn > p.autoResizing.minColWidth) {
										h.newWidth = newWidth;
										hn.newWidth = nWn;
									}
								} else {
									self.newWidth = p.direction === "ltr" ? p.tblwidth + diff : p.tblwidth - diff;
									h.newWidth = newWidth;
								}
							}
						}
					},
					resizeColumn: function (idx, skipCallbacks, skipGridAdjustments) {
						var self = this, headers = self.headers, footers = self.footers, h = headers[idx], hn, nw = h.newWidth || h.width,
							$bTable = getGridComponent(COMPONENT_NAMES.BODY_TABLE, self.bDiv), $hTable = getGridComponent(COMPONENT_NAMES.HEADER_TABLE, self.hDiv),
							hCols = $hTable.children("thead").children("tr").first()[0].cells;
						nw = parseInt(nw, 10);
						p.colModel[idx].width = nw;
						h.width = nw;
						hCols[idx].style.width = nw + "px";
						self.cols[idx].style.width = nw + "px";
						if (self.fbRows) {
							$(self.fbRows[0].cells[idx]).css("width", nw);
							$(getGridComponent(COMPONENT_NAMES.FROZEN_HEADER_TABLE, self.fhDiv)[0].rows[0].cells[idx]).css("width", nw);
							/*if (p.footerrow) {
								$(getGridComponent(COMPONENT_NAMES.FROZEN_FOOTER_TABLE, self.fsDiv)[0].rows[0].cells[idx]).css("width", nw);
							}*/
						}
						if (footers.length > 0) { footers[idx].style.width = nw + "px"; }
						if (skipGridAdjustments !== true) {
							fixScrollOffsetAndhBoxPadding.call($bTable[0]);
						}
						if (p.forceFit === true) {
							hn = headers[idx + p.nv]; // next visible th
							nw = hn.newWidth || hn.width;
							hn.width = nw;
							hCols[idx + p.nv].style.width = nw + "px";
							self.cols[idx + p.nv].style.width = nw + "px";
							if (footers.length > 0) { footers[idx + p.nv].style.width = nw + "px"; }
							p.colModel[idx + p.nv].width = nw;
						} else {
							p.tblwidth = self.newWidth || p.tblwidth;
							//$bTable.css("width", p.tblwidth + "px");
							//getGridComponent(COMPONENT_NAMES.HEADER_TABLE, self.hDiv).css("width", p.tblwidth + "px");
							if (skipGridAdjustments !== true) {
								self.hDiv.scrollLeft = self.bDiv.scrollLeft;
								if (p.footerrow) {
									//getGridComponent(COMPONENT_NAMES.FOOTER_TABLE, self.sDiv).css("width", p.tblwidth + "px");
									self.sDiv.scrollLeft = self.bDiv.scrollLeft;
								}
							}
						}
						if (!p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%") && skipGridAdjustments !== true) {
							$j.setGridWidth.call($bTable, self.newWidth + p.scrollOffset, false);
						}
						if (!skipCallbacks) {
							feedback.call($bTable[0], "resizeStop", nw, idx);
						}
					},
					dragEnd: function () {
						var self = this;
						self.hDiv.style.cursor = "default";
						if (self.resizing) {
							if (self.resizing !== null && self.resizing.moved === true) {
								$(self.headers[self.resizing.idx].el).removeData("autoResized");
								self.resizeColumn(self.resizing.idx, false);
							}
							$(p.rs).removeData("pageX");
							self.resizing = false;
							setTimeout(function () {
								$(p.rs).css("display", "none")
									.prependTo(p.gBox); // restore the parent
							}, p.doubleClickSensitivity);
						}
						self.curGbox = null;
						document.onselectstart = function () { return true; };
						$(document).unbind("mousemove.jqGrid").unbind("mouseup.jqGrid" + p.id);
					},
					populateVisible: function () {
						var self = this, $self = $(self), gridSelf = self.grid, bDiv = gridSelf.bDiv, $bDiv = $(bDiv);
						if (gridSelf.timer) { clearTimeout(gridSelf.timer); }
						gridSelf.timer = null;
						var dh = $bDiv.height();
						if (!dh) { return; }
						var firstDataRow, rh;
						if (self.rows.length) {
							try {
								firstDataRow = self.rows[1]; // self.rows[0] is cols row (the first row (.jqgfirstrow)) used only to set column width
								rh = firstDataRow ? $(firstDataRow).outerHeight() || gridSelf.prevRowHeight : gridSelf.prevRowHeight;
							} catch (pv) {
								rh = gridSelf.prevRowHeight;
							}
						}
						if (!rh) { return; }
						gridSelf.prevRowHeight = rh;
						var rn = p.rowNum;
						gridSelf.scrollTop = bDiv.scrollTop;
						var scrollTop = gridSelf.scrollTop;
						var ttop = Math.round($self.position().top) - scrollTop;
						var tbot = ttop + $self.height();
						var div = rh * rn;
						var page, npage, empty;
						if (tbot < dh && ttop <= 0 &&
								(p.lastpage === undefined || (parseInt((tbot + scrollTop + div - 1) / div, 10) || 0) <= p.lastpage)) {
							npage = parseInt((dh - tbot + div - 1) / div, 10) || 1;
							if (tbot >= 0 || npage < 2 || p.scroll === true) {
								page = (Math.round((tbot + scrollTop) / div) || 0) + 1;
								ttop = -1;
							} else {
								ttop = 1;
							}
						}
						if (ttop > 0) {
							page = (parseInt(scrollTop / div, 10) || 0) + 1;
							npage = (parseInt((scrollTop + dh) / div, 10) || 0) + 2 - page;
							empty = true;
						}
						if (npage) {
							if (p.lastpage && (page > p.lastpage || p.lastpage === 1 || (page === p.page && page === p.lastpage))) {
								return;
							}
							if (gridSelf.hDiv.loading) {
								gridSelf.timer = setTimeout(function () { gridSelf.populateVisible.call(self); }, p.scrollTimeout);
							} else {
								p.page = page;
								if (empty) {
									gridSelf.selectionPreserver.call(self);
									gridSelf.emptyRows.call(self, false, false);
								}
								gridSelf.populate.call(self, npage);
							}
						}
					},
					scrollGrid: function () { // this must be bDiv
						if (p.scroll) {
							var scrollTop = this.scrollTop;
							// save last scrollTop of bDiv as property of grid object
							if (grid.scrollTop === undefined) { grid.scrollTop = 0; }
							if (scrollTop !== grid.scrollTop) {
								grid.scrollTop = scrollTop;
								if (grid.timer) { clearTimeout(grid.timer); }
								grid.timer = setTimeout(function () { grid.populateVisible.call(ts); }, p.scrollTimeout);
							}
						}
						grid.hDiv.scrollLeft = this.scrollLeft;
						if (p.footerrow) {
							grid.sDiv.scrollLeft = this.scrollLeft;
						}
						return false;
					},
					selectionPreserver: function () {
						var self = this, $self = $(self), sr = p.selrow, sra = p.selarrrow ? $.makeArray(p.selarrrow) : null,
							bDiv = self.grid.bDiv, left = bDiv.scrollLeft,
							restoreSelection = function () {
								var i;
								p.selrow = null;
								if (!p.multiPageSelection) {
									clearArray(p.selarrrow); // p.selarrrow = [];
									if (p.multiselect && sra && sra.length > 0) {
										for (i = 0; i < sra.length; i++) {
											if (sra[i] !== sr) {
												setSelection.call($self, sra[i], false, null);
											}
										}
									}
									if (sr) {
										setSelection.call($self, sr, false, null);
									}
								}
								bDiv.scrollLeft = left;
								$self.unbind(".selectionPreserver", restoreSelection);
							};
						$self.bind("jqGridGridComplete.selectionPreserver", restoreSelection);
					}
				};
			ts.grid = grid;
			feedback.call(ts, "beforeInitGrid");
			p.iColByName = buildColNameMap(p.colModel);
			p.iPropByName = buildAddPropMap(p.additionalProperties);

			// TODO: replace altclass : "ui-priority-secondary",
			// set default buttonicon : "ui-icon-newwin" of navButtonAdd: fa-external-link, fa-desktop or other
			// change the order in $.extend to allows to set icons using $.jgrid (for example $.jgrid.nav). It will be ovewritten currently by p.navOptions which we set above.
			var gv = $("<div class='" + getGuiStyles("gView", "ui-jqgrid-view") + "' role='grid' aria-multiselectable='" + !!p.multiselect + "'></div>"),
				isMSIE = jgrid.msie, dir;
			p.direction = trim(p.direction.toLowerCase());
			if (inArray(p.direction, ["ltr", "rtl"]) === -1) { p.direction = "ltr"; }
			dir = p.direction;

			$(gv).insertBefore(ts);
			$self0.removeClass("scroll").appendTo(gv);
			var eg = $("<div class='" + getGuiStyles("gBox", "ui-jqgrid") + "'></div>");
			$(eg).attr({ "id": p.gBoxId, "dir": dir }).insertBefore(gv);
			$(gv).attr("id", p.gViewId).appendTo(eg);
			$("<div class='" + getGuiStyles("overlay", "jqgrid-overlay") + "' id='lui_" + p.id + "'></div>").insertBefore(gv);
			$("<div class='" + getGuiStyles("loading", "loading") + "' id='load_" + p.id + "'>" + getDef("loadtext") + "</div>").insertBefore(gv);
			$self0.attr({ "role": "presentation", "aria-labelledby": "gbox_" + ts.id });
			var sortkeys = ["shiftKey", "altKey", "ctrlKey"],
				// for reading of array of items from the input data it's required to know the
				// mapping of input items to the column names (colModel[iCol].name items).
				// The function normalizeRemapColumns converts p.remapColumns to p.cmNamesInputOrder and fills
				// p.cmNamesInputOrder with the names colModel items.
				// The function should be called only if no p.cmNamesInputOrder is specified
				normalizeRemapColumns = function () {
					// offset is the number of columns in colModel which should be skipped in calculation of the mapping
					// offset is the number of columns from the list "rn", "cb", "subgrid".
					// The index 0 in the p.remapColumns means the first column after the "rn", "cb", "subgrid"
					var remapColumns = p.remapColumns, colModel = p.colModel, nCol = colModel.length, cmNames = [], i, remappedCmNames,
						name;
					for (i = 0; i < nCol; i++) {
						name = colModel[i].name;
						if (inArray(name, p.reservedColumnNames) < 0) {
							cmNames.push(name);
						}
					}

					// it's important to remark that the numbers in remapColumns or in
					// jsonReder, localReader, xmlReader are based on the position of column
					// in colModel BEFORE adding columns "rn", "cb", "subgrid"
					if (remapColumns != null) {
						// now we should remap items in cmNames corresponds to the indexes from p.remapColumns array
						remappedCmNames = cmNames.slice(); // make copy of cmNames array
						for (i = 0; i < remapColumns.length; i++) {
							cmNames[i] = remappedCmNames[remapColumns[i]];
						}
					}
					p.cmNamesInputOrder = cmNames;
				},
				stripGridPrefix = function (rowId) {
					return stripPref(p.idPrefix, rowId);
				},
				formatCol = function (pos, rowInd, tv, rawObject, rowId, rdata) {
					var cm = p.colModel[pos], cellAttrFunc, cellValue = tv, rPrefix,
						result, classes = cm.classes,
						styleValue = cm.align ? "text-align:" + cm.align + ";" : "",
						attrStr, matches, value, tilteValue,
						encodeAttr = function (v) {
							return typeof v === "string" ? v.replace(/\'/g, "&#39;") : v;
						},
						rest = " aria-describedby='" + p.id + "_" + cm.name + "'";
					if (cm.hidden === true) { styleValue += "display:none;"; }
					if (rowInd === 0) {
						styleValue += "width: " + grid.headers[pos].width + "px;";
					} else if (isFunction(cm.cellattr) || (typeof cm.cellattr === "string" && jgrid.cellattr != null && isFunction(jgrid.cellattr[cm.cellattr]))) {
						cellAttrFunc = isFunction(cm.cellattr) ? cm.cellattr : jgrid.cellattr[cm.cellattr];
						if (p.useUnformattedDataForCellAttr && rdata != null) {
							cellValue = rdata[cm.name];
						} else if (cm.autoResizable) {
							// see https://github.com/free-jqgrid/jqGrid/issues/74#issuecomment-107675796
							// we will cut formatted string like "<span class='ui-jqgrid-cell-wrapper'>193,81</span>"
							// to substring "193,81". The formatting (comma, point, dollar and so on) still stay.
							rPrefix = "<span class='" + p.autoResizing.wrapperClassName + "'>";
							cellValue = tv.substring(rPrefix.length, tv.length - "</span>".length);
						}
						attrStr = cellAttrFunc.call(ts, rowId, cellValue, rawObject, cm, rdata);
						if (typeof attrStr === "string") {
							// ??? probably one can create object with properties from the attrStr
							// and then to use one common function with constructTr to combin the default
							// properties with the properties used in cellattr and rowattr.
							// Probably one could use $.extend with the most attributes. The exception are
							// only class and style attributes which hold multi-values with " " or ";" as separator
							attrStr = attrStr.replace(/\n/g, "&#xA;");
							while (true) {
								// we have to use ? in the construction ([^\2]*?) to have non-greedy (lazy, minimal) matching
								// so that we will find the FIRST closing quote instead of default the LAST matching.

								// TODO: more common regex for the attribute name.
								// See http://www.w3.org/TR/html-markup/syntax.html#syntax-attributes:
								//    Attribute names must consist of one or more characters other than the space
								//    characters, U+0000 NULL, """, "'", ">", "/", "=", the control characters,
								//    and any characters that are not defined by Unicode.
								// An important example is attribute name with "-" in the middle: "data-sometext"
								// An important example is attribute name with "-" in the middle: "data-sometext"
								matches = /^\s*(\w+[\w|\-]*)\s*=\s*([\"|\'])(.*?)\2(.*)/.exec(attrStr);
								if (matches === null || matches.length < 5) {
									if (!tilteValue && cm.title) {
										tilteValue = cellValue;
									}
									return rest + " style='" + encodeAttr(styleValue) + "'" +
										(classes ? " class='" + encodeAttr(classes) + "'" : "") +
										(tilteValue ? " title='" + encodeAttr(tilteValue) + "'" : "");
								}
								value = matches[3];
								attrStr = matches[4];
								switch (matches[1].toLowerCase()) { // attribute name
									case "class":
										// if some special characters are inside of class value there MUST be escaped
										// so we can use any quote characters (' or ") around the call value.
										// So we don't need to save quote used in class attribute
										if (classes) {
											classes += " " + value;
										} else {
											classes = value;
										}
										break;
									case "title":
										//quotedTilteValue = quote + value + quote;
										tilteValue = value;
										break;
									case "style":
										styleValue += value;
										break;
									default:
										// matches[2] is quote
										rest += " " + matches[1] + "=" + matches[2] + value + matches[2];
										break;
								}
							}
						}
					}
					result = styleValue !== "" ? "style='" + styleValue + "'" : "";
					result += (classes !== undefined ? (" class='" + classes + "'") : "") + ((cm.title && cellValue) ? (" title='" + stripHtml(tv).replace(/\'/g, "&apos;") + "'") : "");
					result += rest;
					return result;
				},
				cellVal = function (val) {
					return val == null || val === "" ? "&#160;" : (p.autoencode ? htmlEncode(val) : String(val));
				},
				normalizeTreeGridProperties = function (ldat) {
					var treeReader = p.treeReader,
						loaded = treeReader.loaded,
						isLeaf = treeReader.leaf_field,
						expanded = treeReader.expanded_field,
						getBool = function (val) {
							return val === true || val === "true" || val === "1";
						};
					if (p.treeGridModel === "nested" && !ldat[isLeaf]) {
						var lft = parseInt(ldat[treeReader.left_field], 10),
							rgt = parseInt(ldat[treeReader.right_field], 10);
						ldat[isLeaf] = (rgt === lft + 1) ? true : false;
					}
					if (ldat[loaded] !== undefined) {
						ldat[loaded] = getBool(ldat[loaded]);
					}
					ldat[isLeaf] = getBool(ldat[isLeaf]);
					ldat[expanded] = getBool(ldat[expanded]);
					// the next line is suspected. The local data which missing loaded property
					// can be be changed to have expanded=false
					// we comment it.
					//ldat[expanded] = ldat[expanded] && (ldat[loaded] || ldat[loaded] === undefined);
				},
				formatter = function (rowId, cellval, colpos, rwdat, act, rdata) {
					var cm = p.colModel[colpos], v;
					if (cm.formatter !== undefined) {
						rowId = String(p.idPrefix) !== "" ? stripGridPrefix(rowId) : rowId;
						var opts = { rowId: rowId, colModel: cm, gid: p.id, pos: colpos, rowData: rdata || rwdat };
						if (isFunction(cm.cellBuilder)) {
							v = cm.cellBuilder.call(ts, cellval, opts, rwdat, act);
						} else if (isFunction(cm.formatter)) {
							v = cm.formatter.call(ts, cellval, opts, rwdat, act);
						} else if ($.fmatter) {
							v = $.fn.fmatter.call(ts, cm.formatter, cellval, opts, rwdat, act);
						} else {
							v = cellVal(cellval);
						}
					} else {
						v = cellVal(cellval);
					}
					v = cm.autoResizable && cm.formatter !== "actions" ? "<span class='" + p.autoResizing.wrapperClassName + "'>" + v + "</span>" : v;
					if (p.treeGrid && act !== "edit" && ((p.ExpandColumn === undefined && colpos === 0) || (p.ExpandColumn === cm.name))) {
						if (rdata == null) { rdata = p.data[p._index[rowId]]; }
						var curLevel = parseInt(rdata[p.treeReader.level_field] || 0, 10), levelOffset = 18,
							rootLevel = parseInt(p.tree_root_level, 10),
							lftpos = rootLevel === 0 ? curLevel : curLevel - 1,
							isLeaf = rdata[p.treeReader.leaf_field],
							isExpanded = rdata[p.treeReader.expanded_field],
							icon = rdata[p.treeReader.icon_field],
							iconClass = isLeaf ?
									((icon != null && icon !== "") ? icon : p.treeIcons.leaf) + " tree-leaf" :
									(isExpanded ? p.treeIcons.minus + " tree-minus" : p.treeIcons.plus + " tree-plus");
						//normalizeTreeGridProperties(rdata); // ??? don't needed more probably

						v = "<div class='tree-wrap' style='width:" + ((lftpos + 1) * levelOffset) +
							"px;'><div class='" +
							mergeCssClasses(p.treeIcons.commonIconClass, iconClass, "treeclick") +
							"' style='" +
							(p.ExpandColClick === true ? "cursor:pointer;" : "") +
							(p.direction === "rtl" ? "margin-right:" : "margin-left:") +
							(lftpos * levelOffset) + "px;'></div></div>" +
							"<span class='cell-wrapper" + (isLeaf ? "leaf" : "") + "'" +
							(p.ExpandColClick ? " style='cursor:pointer;'" : "") + ">" +
							v + "</span>";
					}
					return v;
				},
				emptyRows = function (scroll, locdata) {
					var self = this, bDiv = grid.bDiv,
						frozenTable = grid.fbDiv != null ?
							grid.fbDiv.children(".ui-jqgrid-btable")[0] : null,
						removeRows = function (table) {
							if (!table) { return; }
							var tableRows = table.rows, firstrow = tableRows[0];
							if (p.deepempty) {
								if (tableRows) { $(tableRows).slice(1).remove(); }
							} else if (p.quickEmpty) {
								if (p.quickEmpty === "quickest") {
									table.replaceChild(document.createElement("tbody"), table.tBodies[0]);
									table.firstChild.appendChild(firstrow);
								} else {
									while (tableRows.length > 1) { // skip deliting of the first row
										table.deleteRow(tableRows.length - 1);
									}
								}
							} else {
								$(table.firstChild).empty().append(firstrow);
							}
						};
					$(self).unbind(".jqGridFormatter");
					removeRows(self);
					removeRows(frozenTable);
					if (scroll && p.scroll) {
						$(bDiv.firstChild).css({ height: "auto" });
						$(bDiv.firstChild.firstChild).css({ height: 0, display: "none" });
						if (bDiv.scrollTop !== 0) {
							bDiv.scrollTop = 0;
						}
					}
					if (locdata === true && p.treeGrid) {
						clearArray(p.data); //p.data = [];
						clearArray(p.lastSelectedData); //p.lastSelectedData = [];
						p._index = {};
					}
					p.rowIndexes = {};
					p.iRow = -1;
					p.iCol = -1;
					//$(self.grid.headers).each(function () { $(this.el).removeData("autoResized"); });
				},
				normalizeData = function () {
					var data = p.data, dataLength = data.length, i, cur, cells, idName, idIndex, v, rd, id,
						localReader = p.localReader, additionalProperties = p.additionalProperties,
						cellName = localReader.cell, cmName, isArrayCells, addProp, info,
						arrayReaderInfos = p.arrayReaderInfos;

					if (p.datatype !== "local" || localReader.repeatitems !== true) {
						if (p.treeGrid) {
							for (i = 0; i < dataLength; i++) {
								normalizeTreeGridProperties(data[i]);
							}
						}
						return; // nothing to do
					}

					idName = p.keyName === false ?
							(isFunction(localReader.id) ? localReader.id.call(ts, data) : localReader.id) :
							p.keyName;
					if (!isNaN(idName)) {
						idIndex = Number(idName);
						/*for (cmName in arrayReaderInfos) {
							if (arrayReaderInfos.hasOwnProperty(cmName)) {
								info = arrayReaderInfos[cmName];
								if (info.order === idIndex) {
									idName = info.name;
									break;
								}
							}
						}*/
					} else if (!isFunction(idName)) {
						if (p.arrayReaderInfos[idName] != null) {
							idIndex = p.arrayReaderInfos[idName].order;
						}
					}

					for (i = 0; i < dataLength; i++) {
						cur = data[i];
						cells = cellName ? getAccessor(cur, cellName) || cur : cur;
						isArrayCells = isArray(cells);

						rd = {};
						for (cmName in arrayReaderInfos) {
							if (arrayReaderInfos.hasOwnProperty(cmName)) {
								info = arrayReaderInfos[cmName];
								v = getAccessor(cells, isArrayCells ? info.order : info.name);
								if (info.type === 1) { // additional property
									addProp = additionalProperties[info.index];
									if (addProp != null && isFunction(addProp.convert)) {
										v = addProp.convert(v, cells);
									}
								}
								if (v !== undefined) {
									rd[cmName] = v;
								}
							}
						}

						// read id.
						if (rd[idName] !== undefined) {
							// in case of p.keyName or if there exist column with the same id name
							// probably one should test only for rd[p.keyName] !== undefined
							// and get rd[p.keyName] below, but the probability that the user
							// wanted to use the column rd[idName] as the rowid seemd me
							// higher as the opposite case.

							// the id should be already read in p.keyName column.
							// One need generate id only if the input data had no id
							id = rd[idName] !== undefined ? rd[idName] : randId(); //id = br + i;
						} else {
							id = getAccessor(cur, isArray(cur) ? idIndex : idName);
							if (id === undefined) {
								id = getAccessor(cells, isArray(cells) ? idIndex : idName);
							}
							if (id === undefined) {
								id = randId(); //id = br + i;
							}
						}
						id = String(id);
						rd[localReader.id] = id; //p.idPrefix + id;

						// the next two line are the most important!
						// one should consider to remove true parameter to improve the performance !!!
						if (p.treeGrid) { normalizeTreeGridProperties(rd); }
						extend(data[i], rd); // extend(true, data[i], rd);
					}
				},
				refreshIndex = function () {
					var datalen = p.data.length, idname, i, val, item;

					if (p.keyName === false || p.loadonce) {
						idname = p.localReader.id;
					} else {
						idname = p.keyName;
					}
					p._index = {};
					for (i = 0; i < datalen; i++) {
						item = p.data[i];
						val = getAccessor(item, idname);
						if (val === undefined) {
							val = String(randId()); //String(i + 1);
							if (item[idname] === undefined) {
								item[idname] = val;
							}
						}
						p._index[val] = i;
					}
				},
				constructTr = function (id, hide, altClass, rd, cur, selected) {
					var tabindex = "-1", restAttr = "", attrName, style = hide ? "display:none;" : "", self = this,
						classes = getGuiStyles("gridRow", "jqgrow ui-row-" + p.direction) + (altClass ? " " + altClass : "") + (selected ? " " + getGuiStyles("states.select") : ""),
						rowAttrObj = $(self).triggerHandler("jqGridRowAttr", [rd, cur, id]);
					if (typeof rowAttrObj !== "object") {
						rowAttrObj = isFunction(p.rowattr) ? p.rowattr.call(self, rd, cur, id) :
								(typeof p.rowattr === "string" && jgrid.rowattr != null && isFunction(jgrid.rowattr[p.rowattr]) ?
										jgrid.rowattr[p.rowattr].call(self, rd, cur, id) : {});
					}
					if (rowAttrObj != null && !$.isEmptyObject(rowAttrObj)) {
						if (rowAttrObj.hasOwnProperty("id")) {
							id = rowAttrObj.id;
							delete rowAttrObj.id;
						}
						if (rowAttrObj.hasOwnProperty("tabindex")) {
							tabindex = rowAttrObj.tabindex;
							delete rowAttrObj.tabindex;
						}
						if (rowAttrObj.hasOwnProperty("style")) {
							style += rowAttrObj.style;
							delete rowAttrObj.style;
						}
						if (rowAttrObj.hasOwnProperty("class")) {
							classes += " " + rowAttrObj["class"];
							delete rowAttrObj["class"];
						}
						// don't allow to change role attribute
						try { delete rowAttrObj.role; } catch (ignore) { }
						for (attrName in rowAttrObj) {
							if (rowAttrObj.hasOwnProperty(attrName)) {
								restAttr += " " + attrName + "=" + rowAttrObj[attrName];
							}
						}
					}
					if (p.treeGrid) {
						if (parseInt(rd[p.treeReader.level_field], 10) !== parseInt(p.tree_root_level, 10)) {
							var pn = $j.getNodeParent.call($(this), rd),
								expan = pn && pn.hasOwnProperty(p.treeReader.expanded_field) ?
										pn[p.treeReader.expanded_field] : true;
							if (!expan && !hide) {
								// TODO: append ";" to style if required
								style += "display:none;";
							}
						}
					}
					return "<tr role='row' id='" + id + "' tabindex='" + tabindex + "' class='" + classes + "'" +
						(style === "" ? "" : " style='" + style + "'") + restAttr + ">";
				},
				finalizationFormatters = function () {
					var i, formatName, fmatter = $.fn.fmatter;
					for (i = 0; i < p.colModel.length; i++) {
						formatName = p.colModel[i].formatter;
						if (typeof formatName === "string" && fmatter != null &&
								isFunction(fmatter[formatName]) && isFunction(fmatter[formatName].pageFinalization)) {
							fmatter[formatName].pageFinalization.call(this, i);
						}
					}
				},
				fillOrClearCellBuilder = function (clear, act) {
					var i, cm, colModel = p.colModel, n = colModel.length, opt,
						autoencodeCellBuilder = function (v) {
							return v == null || v === "" ? "&#160;" : htmlEncode(v);
						},
						simpleCellBuilder = function (v) {
							return v == null || v === "" ? "&#160;" : String(v);
						};
					for (i = 0; i < n; i++) {
						cm = colModel[i];
						cm.cellBuilder = null;
						if (!clear) {
							opt = { colModel: cm, gid: p.id, pos: i };
							if (cm.formatter === undefined) {
								cm.cellBuilder = p.autoencode ? autoencodeCellBuilder : simpleCellBuilder;
							} else if (typeof cm.formatter === "string" && $.fn.fmatter != null && isFunction($.fn.fmatter.getCellBuilder)) {
								cm.cellBuilder = $.fn.fmatter.getCellBuilder.call(ts, cm.formatter, opt, act || "add");
							} else if (isFunction(cm.getCellBuilder)) {
								cm.cellBuilder = cm.getCellBuilder.call(ts, opt, act || "add");
							}
						}
					}
				},
				readInput = function (data, rcnt, more, adjust) {
					var self = this, $self = $(self), startReq = new Date(), datatype = p.datatype,
						// readAllInputData shows that one should read ALL input items, not only the current page of data
						readAllInputData = (datatype !== "local" && p.loadonce) || datatype === "xmlstring" || datatype === "jsonstring",
						isXML = (datatype === "xmlstring" || datatype === "xml") && $.isXMLDoc(data),
						locid = "_id_", dataReader = p.localReader, fieldReader = getAccessor;

					if (data) {
						if (datatype === "xml" && !isXML) {
							return;
						}
						if (p.treeANode === -1 && !p.scroll) {
							grid.emptyRows.call(self, false, true);
							rcnt = 1;
						} else {
							rcnt = rcnt > 1 ? rcnt : 1;
						}
					} else {
						// in case of usage TreeGrid for example
						return;
					}

					if (readAllInputData) {
						clearArray(p.data); //p.data = [];
						clearArray(p.lastSelectedData); //p.lastSelectedData = [];
						p._index = {};
						if (p.grouping && p.groupingView != null) {
							p.groupingView.groups = [];
							p.groupingView._locgr = false;
						}
						p.localReader.id = locid; // consider to place the statement in if (p.treeGrid) {...}
					}
					p.reccount = 0;
					switch (datatype) {
						case "xml":
						case "xmlstring":
							dataReader = p.xmlReader;
							fieldReader = jgrid.getXmlData;
							break;
						case "json":
						case "jsonp":
						case "jsonstring":
							dataReader = p.jsonReader;
							break;
						default:
							break;
					}

					var i, cells, len, drows, idName, idIndex, rd = {}, idr,
						colModel = p.colModel, nCol = colModel.length, cmName,
						iChild, children, nChildren, child,
						// TODO: consider to introduce preloadedAttributes in the same way
						//       like we use to preloadedNodes below and to cache .attributes[i]
						//       in the same way like one cache .childNodes[i].
						//       One should measure the performance, to find out whether
						//       such caching will improve the performance.
						arrayReaderInfos = p.arrayReaderInfos, info, preloadedNodes = {},
						attrReader = function (nodeName) {
							return function (obj) {
								var attrValue = obj.getAttribute(nodeName);
								return attrValue !== null ? attrValue : undefined;
							};
						},
						nodeReader = function (nodeName) {
							return function () {
								// commented code which used getElementsByTagName works
								// good in new web browsers (Chrome, Firefox, Safari),
								// but it is slowly in IE10 and especially in IE8.
								// So we use the code which is very good for all web browsers
								/*var elem = obj.getElementsByTagName(nodeName)[0], childNodes;
								if (elem != null) {
									childNodes = elem.childNodes;
									return childNodes.length > 0 ? childNodes[0].nodeValue : undefined;
								}
								return undefined;*/
								var elem = preloadedNodes[nodeName], childNodes;
								if (elem == null) { return undefined; }
								childNodes = elem.childNodes;
								return childNodes.length > 0 ? childNodes[0].nodeValue : undefined;
							};
						};

					p.page = intNum(fieldReader(data, dataReader.page), p.page);
					p.lastpage = intNum(fieldReader(data, dataReader.total), 1);
					p.records = intNum(fieldReader(data, dataReader.records));

					if (isFunction(dataReader.userdata)) {
						p.userData = dataReader.userdata.call(self, data) || {};
					} else if (isXML) {
						fieldReader(data, dataReader.userdata, true)
							.each(function () {
								p.userData[this.getAttribute("name")] = $(this).text();
							});
					} else {
						p.userData = fieldReader(data, dataReader.userdata) || {};
					}

					// fill colReader and
					fillOrClearCellBuilder();
					var colReader = {}, isArrayCells, v, addProp, items,
						additionalProperties = p.additionalProperties,
						setSimpleColReaderIfPossible = function (propName, nameReaderOrAddProp) {
							if (isXML && typeof nameReaderOrAddProp === "string") {
								if (/^\w+$/.test(nameReaderOrAddProp)) {
									colReader[propName] = nodeReader(nameReaderOrAddProp);
								} else if (/^\[\w+\]$/.test(nameReaderOrAddProp)) {
									colReader[propName] = attrReader(nameReaderOrAddProp.substring(1, nameReaderOrAddProp.length - 1));
								}
							}
						},
						colReaderFilling = function (colOrAddProp) {
							var colOrAddPropName = colOrAddProp.name,
								nameReader = isXML ?
									colOrAddProp.xmlmap || colOrAddPropName :
									(datatype === "local" && !p.dataTypeOrg) || datatype === "jsonstring" || datatype === "json" || datatype === "jsonp" ? colOrAddProp.jsonmap || colOrAddPropName : colOrAddPropName;

							if (p.keyName !== false && colOrAddProp.key === true) {
								p.keyName = colOrAddPropName; // TODO: replace nameReader to colOrAddPropName if we don't will read it at the second time
							}
							if (typeof nameReader === "string" || isFunction(nameReader)) {
								colReader[colOrAddPropName] = nameReader;
							}
							if (!isFunction(nameReader)) {
								setSimpleColReaderIfPossible(colOrAddPropName, nameReader);
							}
						};
					for (i = 0; i < nCol; i++) {
						colReaderFilling(colModel[i]);
					}
					nCol = additionalProperties.length;
					for (i = 0; i < nCol; i++) {
						addProp = additionalProperties[i];

						if (typeof addProp === "object" && addProp != null) {
							colReaderFilling(addProp);
						} else {
							setSimpleColReaderIfPossible(addProp, addProp);
						}
					}
					// TODO: Consider to allow to specify key:true property in additionalProperties
					// in the case the item of additionalProperties should looks not like
					// "myProp" and not like {name: "myProp", convert: function (data) {...}} used in TreeGrid,
					// but in more common form {name: "myProp", key:true, convert: function (data) {...}}

					// prepare to read id of data items
					// if p.keyName !== false it contains the name of the column or the nameReader functoin (jsonmap or xmlmap)
					// in the case the reading of id is simple and one DON'T NEED TO READ IT AT ALL
					// because it will be already read during reading of the columns
					idName = p.keyName === false ?
							(isFunction(dataReader.id) ? dataReader.id.call(self, data) : dataReader.id) :
							p.keyName;

					if (!isNaN(idName)) {
						idIndex = Number(idName);
					} else if (!isFunction(idName)) {
						if (arrayReaderInfos[idName]) {
							idIndex = arrayReaderInfos[idName].order;
						}
						if (isXML) {
							if (typeof idName === "string" && /^\[\w+\]$/.test(idName)) {
								idName = attrReader(idName.substring(1, idName.length - 1));
							} else if (typeof idName === "string" && /^\w+$/.test(idName)) {
								idName = nodeReader(idName);
							}
						}
					}

					// get array of items from the input data
					drows = fieldReader(data, dataReader.root, true);
					if (dataReader.row) {
						if (drows.length === 1 && typeof dataReader.row === "string" && /^\w+$/.test(dataReader.row)) {
							items = [];
							children = drows[0].childNodes;
							nChildren = children.length;
							for (iChild = 0; iChild < nChildren; iChild++) {
								child = children[iChild];
								if (child.nodeType === 1 && child.nodeName === dataReader.row) {
									items.push(child);
								}
							}
							drows = items;
						} else {
							drows = fieldReader(drows, dataReader.row, true); // || [];
						}
					}
					if (drows == null && isArray(data)) { drows = data; }
					if (!drows) { drows = []; }
					len = drows.length;
					if (len > 0 && p.page <= 0) { p.page = 1; }

					var rn = parseInt(p.rowNum, 10); // br = p.scroll ? randId() : 1
					if (adjust) { rn *= adjust + 1; }

					// The first loop (from 0 till len) read ALL data and saves it in array
					var cellsToDisplay = [], ids = [], id, cur;
					items = [];
					for (i = 0; i < len; i++) {
						cur = drows[i];
						cells = dataReader.repeatitems && dataReader.cell ? fieldReader(cur, dataReader.cell, true) || cur : cur;
						isArrayCells = dataReader.repeatitems && (isXML || isArray(cells));

						// the first step: reading the input data from the current item
						rd = {}; // require to prevent modification of items previously placed in p.data

						preloadedNodes = {};
						if (isXML && !isArrayCells && cells != null) {
							// reading of simple children nodes by name can be relatively slow
							// because one enumerates all children nodes to find the node with
							// specified name
							children = cells.childNodes;
							nChildren = children.length;
							for (iChild = 0; iChild < nChildren; iChild++) {
								child = children[iChild];
								if (child.nodeType === 1) {
									preloadedNodes[child.nodeName] = child;
								}
							}
							// TODO: one can consider to examine cells.attributes and
							//       to save all values in preloadedAttributes map.
						}
						for (cmName in arrayReaderInfos) {
							if (arrayReaderInfos.hasOwnProperty(cmName)) {
								info = arrayReaderInfos[cmName];
								if (isArrayCells) {
									v = cells[info.order];
									if (isXML && v != null) {
										v = v.textContent || v.text;
									}
								} else if (colReader[cmName] != null && typeof colReader[cmName] !== "string") { // isFunction(colReader[cmName])
									v = colReader[cmName](cells);
								} else {
									v = fieldReader(cells, typeof colReader[cmName] === "string" ? colReader[cmName] : info.name);
								}
								if (info.type === 1) { // additional property
									addProp = additionalProperties[info.index];
									if (addProp != null && isFunction(addProp.convert)) {
										v = addProp.convert(v, cells);
									}
								}
								if (v !== undefined) {
									rd[cmName] = v;
								}
							}
						}

						// read id.
						if (rd[idName] !== undefined) {
							// the id should be already read in p.keyName column.
							// One need generate id only if the input data had no id
							id = rd[idName] !== undefined ? rd[idName] : randId(); //id = br + i;
						} else {
							id = fieldReader(cur, isArray(cur) ? idIndex : idName);
							if (id === undefined) {
								id = fieldReader(cells, isArray(cells) ? idIndex : idName);
							}
							if (id === undefined) {
								id = randId(); //id = br + i;
							}
						}
						if (rd[idName] === undefined) {
							rd[idName] = id;
						}
						id = String(id);
						idr = p.idPrefix + id;

						if (p.treeGrid) { normalizeTreeGridProperties(rd); }

						// final steps of reading the row
						if (i < rn) {
							ids.push(idr);
							cellsToDisplay.push(cells);
							items.push(rd);
						} else if (!readAllInputData) {
							break;
						}
						if (readAllInputData || p.treeGrid === true) {
							rd[locid] = id; //stripGridPrefix(idr);
							p.data.push(rd);
							p._index[rd[locid]] = p.data.length - 1;
						}
					}
					if (readAllInputData && p.forceClientSorting && p.treeGrid !== true) {
						// don't display the data, just read it.
						return;
					}

					// of rd items plus array cells items (almost the same as drows).
					// The second loop (from 0 till min(len,rn)) will build rowData from the both arrays
					// Then one place rowData AT ONCE to the body any calls afterInsertRow in the loop
					// for every inserted row.
					// Finally one clean up the both arrays
					var rowData = jgrid.parseDataToHtml.call(self, len, ids, items, cellsToDisplay, rcnt, adjust, readAllInputData);
					fillOrClearCellBuilder(true); // clear cellBuilders

					// place the HTML string fragments collected in rowData in the body of grid
					var fpos = p.treeANode > -1 ? p.treeANode : 0;
					var $tbody = $(self.tBodies[0]);
					if (p.treeGrid === true && fpos > 0) {
						$(self.rows[fpos]).after(rowData.join(""));
					} else if (p.scroll) {
						$tbody.append(rowData.join(""));
					} else if (self.firstElementChild == null || (document.documentMode !== undefined && document.documentMode <= 9)) {
						// for IE8 for example
						$tbody.html($tbody.html() + rowData.join("")); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
						self.grid.cols = self.rows[0].cells; // update cached first row
					} else {
						self.firstElementChild.innerHTML += rowData.join(""); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
						self.grid.cols = self.rows[0].cells; // update cached first row
					}

					// refresh rowIndexes cash in case of usage grouping
					if (p.grouping) {
						rebuildRowIndexes.call(self);
					}

					//
					if (p.subGrid === true) {
						// make subgrid specific actions: bind click event handler to "+"
						try { $j.addSubGrid.call($self, p.iColByName.subgrid); } catch (ignore) { }
					}
					if (p.gridview === false || isFunction(p.afterInsertRow)) {
						for (i = 0; i < Math.min(len, rn); i++) {
							feedback.call(self, "afterInsertRow", ids[i], items[i], cellsToDisplay[i]);
						}
					}
					p.totaltime = new Date() - startReq;
					if (i > 0) {
						if (p.records === 0) { p.records = len; }
					}
					clearArray(rowData);
					if (p.treeGrid === true) {
						try { $j.setTreeNode.call($self, fpos + 1, i + fpos + 1); } catch (ignore) { }
					}
					p.reccount = Math.min(len, rn);
					p.treeANode = -1;
					if (p.userDataOnFooter) { $j.footerData.call($self, "set", p.userData, true); }
					if (readAllInputData) {
						p.records = len;
						p.lastpage = Math.ceil(len / rn);
					}
					if (!more) { self.updatepager(false, true); }
					finalizationFormatters.call(self);
				},
				addLocalData = function () {
					var $self = $(this), st = p.multiSort ? [] : "", sto = {}, fndsort = false, cmtypes = {}, grtypes = [], grindexes = [],
						defSrcFormat = getRes("formatter.date.srcformat"),
						defNewFormat = getRes("formatter.date.newformat");
					if (!isArray(p.data)) {
						return {};
					}
					if (p.multiSort) {
						getSortNames(st, sto);
					}
					var grpview = p.grouping ? p.groupingView : false, lengrp, gin,
						processColModel = function (cm, iCol1, isAddProp) {
							var srcformat, newformat,
								grindex = cm.index || cm.name,
								sorttype = cm.sorttype || "text";
							cmtypes[cm.name] = {
								reader: !p.dataTypeOrg ? cm.jsonmap || cm.name : cm.name,
								iCol: iCol1,
								stype: sorttype,
								srcfmt: "",
								newfmt: "",
								sfunc: cm.sortfunc || null,
								isAddProp: isAddProp === true ? true : false
							};
							if (sorttype === "date" || sorttype === "datetime") {
								if (cm.formatter && typeof cm.formatter === "string" && cm.formatter === "date") {
									if (cm.formatoptions && cm.formatoptions.srcformat) {
										srcformat = cm.formatoptions.srcformat;
									} else {
										srcformat = defSrcFormat;
									}
									if (cm.formatoptions && cm.formatoptions.newformat) {
										newformat = cm.formatoptions.newformat;
									} else {
										newformat = defNewFormat;
									}
								} else {
									srcformat = newformat = cm.datefmt || "Y-m-d";
								}
								cmtypes[cm.name].srcfmt = srcformat;
								cmtypes[cm.name].newfmt = newformat;
							}
							if (p.grouping) {
								for (gin = 0, lengrp = grpview.groupField.length; gin < lengrp; gin++) {
									if (cm.name === grpview.groupField[gin]) {
										grtypes[gin] = cmtypes[grindex];
										grindexes[gin] = grindex;
									}
								}
							}
							if (!p.multiSort) {
								if (!fndsort && (cm.index === p.sortname || cm.name === p.sortname)) {
									st = cm.name; // ???
									fndsort = true;
								}
							}
						};
					each(p.colModel, function (iCol1) {
						processColModel(this, iCol1);
					});
					each(p.additionalProperties, function (iCol1) {
						processColModel(
							typeof this === "string" ? { name: this } : this,
							iCol1,
							true
						);
					});
					if (p.treeGrid) {
						$j.SortTree.call($self, st, p.sortorder,
							cmtypes[st] != null && cmtypes[st].stype ? cmtypes[st].stype : "text",
							cmtypes[st] != null && cmtypes[st].srcfmt ? cmtypes[st].srcfmt : "");
						return false;
					}
					var compareFnMap = {
							"eq": function (queryObj) { return queryObj.equals; },
							"ne": function (queryObj) { return queryObj.notEquals; },
							"lt": function (queryObj) { return queryObj.less; },
							"le": function (queryObj) { return queryObj.lessOrEquals; },
							"gt": function (queryObj) { return queryObj.greater; },
							"ge": function (queryObj) { return queryObj.greaterOrEquals; },
							"cn": function (queryObj) { return queryObj.contains; },
							"nc": function (queryObj, op) { return op === "OR" ? queryObj.orNot().contains : queryObj.andNot().contains; },
							"bw": function (queryObj) { return queryObj.startsWith; },
							"bn": function (queryObj, op) { return op === "OR" ? queryObj.orNot().startsWith : queryObj.andNot().startsWith; },
							"en": function (queryObj, op) { return op === "OR" ? queryObj.orNot().endsWith : queryObj.andNot().endsWith; },
							"ew": function (queryObj) { return queryObj.endsWith; },
							"ni": function (queryObj, op) { return op === "OR" ? queryObj.orNot().equals : queryObj.andNot().equals; },
							"in": function (queryObj) { return queryObj.equals; },
							"nu": function (queryObj) { return queryObj.isNull; },
							"nn": function (queryObj, op) { return op === "OR" ? queryObj.orNot().isNull : queryObj.andNot().isNull; }
						},
						query = jgrid.from.call(this, p.data);
					if (p.ignoreCase) { query = query.ignoreCase(); }
					function tojLinq(group) {
						var s = 0, index, gor, ror, opr, rule, r, cmi1;
						if (group.groups != null) {
							gor = group.groups.length && group.groupOp.toString().toUpperCase() === "OR";
							if (gor) {
								query.orBegin();
							}
							for (index = 0; index < group.groups.length; index++) {
								if (s > 0 && gor) {
									query.or();
								}
								try {
									tojLinq(group.groups[index]);
								} catch (e) { fatalErrorFunction(e); }
								s++;
							}
							if (gor) {
								query.orEnd();
							}
						}
						if (group.rules != null) {
							try {
								ror = group.rules.length && group.groupOp.toString().toUpperCase() === "OR";
								if (ror) {
									query.orBegin();
								}
								for (index = 0; index < group.rules.length; index++) {
									rule = group.rules[index];
									opr = group.groupOp.toString().toUpperCase();
									if (compareFnMap[rule.op] && rule.field) {
										if (s > 0 && opr && opr === "OR") {
											query = query.or();
										}
										cmi1 = cmtypes[rule.field];
										if (cmi1 != null) {
											r = cmi1.reader;
											query = compareFnMap[rule.op](query, opr)(
												isFunction(r) ?
														"jQuery.jgrid.getAccessor(this,jQuery(\"" + p.idSel + "\")[0].p.colModel[" + cmi1.iCol + "].jsonmap)" :
														"jQuery.jgrid.getAccessor(this,'" + r + "')",
												rule.data,
												cmtypes[rule.field]
											);
										}
									} else if (p.customSortOperations != null && p.customSortOperations[rule.op] != null && isFunction(p.customSortOperations[rule.op].filter)) {
										query = query.custom(rule.op, rule.field, rule.data);
									}
									s++;
								}
								if (ror) {
									query.orEnd();
								}
							} catch (g) { fatalErrorFunction(g); }
						}
					}
					if (p.search === true) {
						var srules = p.postData.filters;
						if (srules) {
							if (typeof srules === "string") { srules = $.parseJSON(srules); }
							tojLinq(srules);
						} else {
							try {
								var cmtypes1 = cmtypes[p.postData.searchField];
								query = compareFnMap[p.postData.searchOper](query)(
									//p.postData.searchField,
									isFunction(cmtypes1.reader) ?
											"jQuery.jgrid.getAccessor(this,jQuery(\"" + p.idSel + "\")[0].p.colModel[" + cmtypes1.iCol + "].jsonmap)" :
											"jQuery.jgrid.getAccessor(this,'" + cmtypes1.reader + "')",
									p.postData.searchString,
									cmtypes[p.postData.searchField]
								);
							} catch (ignore) { }
						}
					}
					if (p.grouping) {
						for (gin = 0; gin < lengrp; gin++) {
							query.orderBy(grindexes[gin], grpview.groupOrder[gin], grtypes[gin].stype, grtypes[gin].srcfmt);
						}
					}
					if (p.multiSort) {
						each(st, function () {
							query.orderBy(this, sto[this], cmtypes[this].stype, cmtypes[this].srcfmt, cmtypes[this].sfunc);
						});
					} else if (st && p.sortorder && fndsort) {
						query.orderBy(p.sortname, p.sortorder.toUpperCase() === "DESC" ? "d" : "a", cmtypes[st].stype, cmtypes[st].srcfmt, cmtypes[st].sfunc);
					}
					p.lastSelectedData = query.select();
					var recordsperpage = parseInt(p.rowNum, 10),
						total = p.lastSelectedData.length,
						page = parseInt(p.page, 10),
						totalpages = Math.ceil(total / recordsperpage),
						retresult = {};
					if (p.grouping && p.groupingView._locgr) {
						p.groupingView.groups = [];
						var j, key, udc;
						if (p.footerrow && p.userDataOnFooter) {
							for (key in p.userData) {
								if (p.userData.hasOwnProperty(key)) {
									p.userData[key] = 0;
								}
							}
							udc = true;
						}
						for (j = 0; j < total; j++) {
							if (udc) {
								for (key in p.userData) {
									if (p.userData.hasOwnProperty(key)) {
										p.userData[key] += parseFloat(p.lastSelectedData[j][key] || 0);
									}
								}
							}
							$j.groupingPrepare.call($self, p.lastSelectedData[j], j, recordsperpage);
						}
					}
					query = null;
					cmtypes = null;
					var localReader = p.localReader;
					retresult[localReader.total] = totalpages;
					retresult[localReader.page] = page;
					retresult[localReader.records] = total;
					retresult[localReader.root] = p.lastSelectedData.slice((page - 1) * recordsperpage, page * recordsperpage);
					retresult[localReader.userdata] = p.userData;
					return retresult;
				},
				setWidthOfPagerTdWithPager = function ($pgTable) {
					var self = this, width = $pgTable.outerWidth(), fontSize;
					if (width <= 0) { // not visible
						fontSize = $(self).closest(".ui-jqgrid>.ui-jqgrid-view").css("font-size") || "11px";
						$(document.body).append("<div id='testpg' class='" + getGuiStyles("gBox", "ui-jqgrid") + "' style='font-size:" +
							fontSize +
							";visibility:hidden;margin:0;padding:0;' ></div>");
						$($pgTable).clone().appendTo("#testpg");
						width = $("#testpg>.ui-pg-table").width();
						$("#testpg").remove();
					}
					if (width > 0) {
						$pgTable.parent().width(width);
					}
					return width;
				},
				updatepager = function (rn, dnd) {
					var self = this, $self = $(self), gridSelf = self.grid, cp, last, base1, from, to, tot, fmt, pgboxes = p.pager || "", sppg,
						tspg = p.pager ? "_" + p.pager.substr(1) : "", bDiv = gridSelf.bDiv, numberFormat = $.fmatter ? $.fmatter.NumberFormat : null,
						tspgTop = p.toppager ? "_" + p.toppager.substr(1) : "",
						hoverClasses = getGuiStyles("states.hover"), disabledClasses = getGuiStyles("states.disabled");
					base1 = parseInt(p.page, 10) - 1;
					if (base1 < 0) { base1 = 0; }
					base1 = base1 * parseInt(p.rowNum, 10);
					to = base1 + p.reccount;
					if (p.scroll) {
						var rows = $(getGridComponent(COMPONENT_NAMES.BODY_TABLE, bDiv)[0].rows).slice(1);//$("tbody:first > tr:gt(0)", bDiv);
						base1 = to - rows.length;
						p.reccount = rows.length;
						var rh = rows.outerHeight() || gridSelf.prevRowHeight;
						if (rh) {
							var top = base1 * rh;
							var height = jgrid.fixMaxHeightOfDiv.call(self, parseInt(p.records, 10) * rh);
							$(bDiv).children("div").first().css({ height: height + "px" })
								.children("div").first().css({ height: top + "px", display: top + "px" ? "" : "none" });
							if (bDiv.scrollTop === 0 && p.page > 1) {
								bDiv.scrollTop = p.rowNum * (p.page - 1) * rh;
							}
						}
						bDiv.scrollLeft = gridSelf.hDiv.scrollLeft;
					}
					pgboxes += p.toppager ? (pgboxes ? "," : "") + p.toppager : "";
					if (pgboxes) {
						fmt = getRes("formatter.integer") || {};
						cp = intNum(p.page);
						last = intNum(p.lastpage);
						$(".selbox", pgboxes).prop("disabled", false);
						if (p.pginput === true) {
							$(".ui-pg-input", pgboxes).val(p.page);
							sppg = p.toppager ? "#sp_1" + tspg + ",#sp_1" + tspgTop : "#sp_1" + tspg;
							$(sppg).html($.fmatter ? numberFormat(p.lastpage, fmt) : p.lastpage)
								.closest(".ui-pg-table").each(function () {
									setWidthOfPagerTdWithPager.call(self, $(this));
								});
						}
						if (p.viewrecords) {
							if (p.reccount === 0) {
								$(".ui-paging-info", pgboxes).html(getDef("emptyrecords"));
							} else {
								from = base1 + 1;
								tot = p.records;
								if ($.fmatter) {
									from = numberFormat(from, fmt);
									to = numberFormat(to, fmt);
									tot = numberFormat(tot, fmt);
								}
								$(".ui-paging-info", pgboxes).html(jgrid.format(getDef("recordtext"), from, to, tot));
							}
						}
						if (p.pgbuttons === true) {
							if (last <= 0) { cp = 0;}
							if (cp <= 0) { cp = last = 0; }
							if (cp === 1 || cp === 0) {
								$("#first" + tspg + ", #prev" + tspg).addClass(disabledClasses).removeClass(hoverClasses);
								if (p.toppager) { $("#first_t" + tspgTop + ", #prev_t" + tspgTop).addClass(disabledClasses).removeClass(hoverClasses); }
							} else {
								$("#first" + tspg + ", #prev" + tspg).removeClass(disabledClasses);
								if (p.toppager) { $("#first_t" + tspgTop + ", #prev_t" + tspgTop).removeClass(disabledClasses); }
							}
							if (cp === last || cp === 0) {
								$("#next" + tspg + ", #last" + tspg).addClass(disabledClasses).removeClass(hoverClasses);
								if (p.toppager) { $("#next_t" + tspgTop + ", #last_t" + tspgTop).addClass(disabledClasses).removeClass(hoverClasses); }
							} else {
								$("#next" + tspg + ", #last" + tspg).removeClass(disabledClasses);
								if (p.toppager) { $("#next_t" + tspgTop + ", #last_t" + tspgTop).removeClass(disabledClasses); }
							}
						}
					}
					if (rn === true && p.rownumbers === true) {
						$(">td.jqgrid-rownum", self.rows).each(function (i) {
							$(this).html(base1 + 1 + i);
						});
					}
					if (dnd && p.jqgdnd) { $self.jqGrid("gridDnD", "updateDnD"); }
					feedback.call(self, "gridComplete");
					$self.triggerHandler("jqGridAfterGridComplete");
				},
				beginReq = function () {
					var self = this;
					self.grid.hDiv.loading = true;
					if (p.hiddengrid) { return; }
					$j.progressBar.call($(self), { method: "show", loadtype: p.loadui, htmlcontent: getDef("loadtext") });
				},
				endReq = function () {
					var self = this;
					self.grid.hDiv.loading = false;
					$j.progressBar.call($(self), { method: "hide", loadtype: p.loadui });
				},
				populate = function (npage) {
					var self = this, $self = $(self), gridSelf = self.grid;
					if (!gridSelf.hDiv.loading) {
						var pvis = p.scroll && npage === false, prm = {}, dt, dstr, pN = p.prmNames;
						if (p.page <= 0) { p.page = Math.min(1, p.lastpage); }
						if (pN.search !== null) { prm[pN.search] = p.search; }
						if (pN.nd !== null) { prm[pN.nd] = new Date().getTime(); }
						if (isNaN(parseInt(p.rowNum, 10)) || parseInt(p.rowNum, 10) <= 0) { p.rowNum = p.maxRowNum; }
						if (pN.rows !== null) { prm[pN.rows] = p.rowNum; }
						if (pN.page !== null) { prm[pN.page] = p.page; }
						if (pN.sort !== null) { prm[pN.sort] = p.sortname; }
						if (pN.order !== null) { prm[pN.order] = p.sortorder; }
						if (p.rowTotal !== null && pN.totalrows !== null) { prm[pN.totalrows] = p.rowTotal; }
						var lcf = isFunction(p.loadComplete), lc = lcf ? p.loadComplete : null;
						var adjust = 0;
						npage = npage || 1;
						if (npage > 1) {
							if (pN.npage !== null) {
								prm[pN.npage] = npage;
								adjust = npage - 1;
								npage = 1;
							} else {
								lc = function (data) {
									p.page++;
									gridSelf.hDiv.loading = false;
									if (lcf) {
										p.loadComplete.call(self, data);
									}
									populate.call(self, npage - 1);
								};
							}
						} else if (pN.npage !== null) {
							delete p.postData[pN.npage];
						}
						if (p.grouping && $j.groupingSetup) {
							$j.groupingSetup.call($self);
							var grp = p.groupingView, gi, gs = "", index, iColumn, cmValue;
							for (gi = 0; gi < grp.groupField.length; gi++) {
								index = grp.groupField[gi];
								for (iColumn = 0; iColumn < p.colModel.length; iColumn++) {
									cmValue = p.colModel[iColumn];
									if (cmValue.name === index && cmValue.index) {
										index = cmValue.index;
									}
								}
								gs += index + " " + grp.groupOrder[gi] + ", ";
							}
							prm[pN.sort] = gs + prm[pN.sort];
						}
						extend(p.postData, prm);
						var rcnt = !p.scroll ? 1 : self.rows.length - 1,
							fixDisplayingHorizontalScrollbar = function () {
								fixScrollOffsetAndhBoxPadding.call(self);
								// if no items are displayed in the btable, but the column header is too wide
								// the horizontal scrollbar of bDiv will be disabled. The fix set CSS height to 1px
								// on btable in the case to fix the problem
								var gBodyWidth = $self.width(), gViewWidth = $self.closest(".ui-jqgrid-view").width(),
									gridCssHeight = $self.css("height");
								if (gViewWidth < gBodyWidth && p.reccount === 0) {
									$self.css("height", "1px");
								} else if (gridCssHeight !== "0" && gridCssHeight !== "0px") {
									$self.css("height", "");
								}
								if (!p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%")) {
									$j.setGridWidth.call($self, p.tblwidth + p.scrollOffset, false);
								}
							},
							resort = function () {
								var iRes;
								if (p.autoresizeOnLoad) {
									$j.autoResizeAllColumns.call($self);
									clearArray(p.columnsToReResizing);
								} else {
									for (iRes = 0; iRes < p.columnsToReResizing.length; iRes++) {
										$j.autoResizeColumn.call($self, p.columnsToReResizing[iRes]);
									}
									clearArray(p.columnsToReResizing);
								}
							},
							finalReportSteps = function () {
								feedback.call(self, "loadComplete", dstr);
								resort();
								$self.triggerHandler("jqGridAfterLoadComplete", [dstr]);
								endReq.call(self);
								p.datatype = "local";
								p.datastr = null;
								fixDisplayingHorizontalScrollbar();
							},
							finalReportVirtual = function (data) {
								$self.triggerHandler("jqGridLoadComplete", [data]);
								if (lc) { lc.call(self, data); }
								resort();
								$self.triggerHandler("jqGridAfterLoadComplete", [data]);
								if (pvis) { gridSelf.populateVisible.call(self); }
								if (npage === 1) { endReq.call(self); }
								fixDisplayingHorizontalScrollbar();
							},
							readLocal = function () {
								var req = addLocalData.call(self);
								readInput.call(self, req, rcnt, npage > 1, adjust);
								finalReportVirtual(req);
							};
						if (!feedback.call(self, "beforeRequest")) { return; }
						if (isFunction(p.datatype)) { p.datatype.call(self, p.postData, "load_" + p.id, rcnt, npage, adjust); return; }
						dt = p.datatype.toLowerCase();
						$(grid.eDiv).hide();
						switch (dt) {
						case "json":
						case "jsonp":
						case "xml":
						case "script":
							$.ajax(extend({
								url: p.url,
								type: p.mtype,
								dataType: dt,
								//data: $.isFunction(p.serializeGridData)? p.serializeGridData.call(self,p.postData) : p.postData,
								data: jgrid.serializeFeedback.call(ts, p.serializeGridData, "jqGridSerializeGridData", p.postData),
								success: function (data, textStatus, jqXHR) {
									p.jqXhr = null;
									$(grid.eDiv).hide();
									if (isFunction(p.beforeProcessing)) {
										if (p.beforeProcessing.call(self, data, textStatus, jqXHR) === false) {
											endReq.call(self);
											return;
										}
									}
									readInput.call(self, data, rcnt, npage > 1, adjust);
									finalReportVirtual(data);
									if (p.loadonce || p.treeGrid) {
										p.dataTypeOrg = p.datatype;
										p.datatype = "local";
										if (p.forceClientSorting) { readLocal(); }
									}
								},
								error: function (jqXHR, textStatus, errorThrown) {
									p.jqXhr = null;
									if (isFunction(p.loadError)) { p.loadError.call(self, jqXHR, textStatus, errorThrown); }
									if (npage === 1) { endReq.call(self); }
								},
								beforeSend: function (jqXHR, settings) {
									var gotoreq = true;
									if (isFunction(p.loadBeforeSend)) {
										gotoreq = p.loadBeforeSend.call(self, jqXHR, settings);
									}
									if (gotoreq === undefined) { gotoreq = true; }
									if (gotoreq === false) {
										return false;
									}
									p.jqXhr = jqXHR;
									beginReq.call(self);
								}
							}, jgrid.ajaxOptions, p.ajaxGridOptions));
							break;
						case "xmlstring":
							beginReq.call(self);
							dstr = typeof p.datastr === "string" ? $.parseXML(p.datastr) : p.datastr;
							readInput.call(self, dstr);
							finalReportSteps();
							if (p.forceClientSorting) { readLocal(); }
							break;
						case "jsonstring":
							beginReq.call(self);
							dstr = p.datastr && typeof p.datastr === "string" ? $.parseJSON(p.datastr) : p.datastr;
							readInput.call(self, dstr);
							finalReportSteps();
							if (p.forceClientSorting) { readLocal(); }
							break;
						case "local":
						case "clientside":
							beginReq.call(self);
							p.datatype = "local";
							readLocal();
							break;
						}
					}
				},
				setHeadCheckBox = function (checked) {
					var self = this, gridSelf = self.grid;
					$(p.cb, gridSelf.hDiv).prop("checked", checked);
					if (p.frozenColumns) {
						$(p.cb, gridSelf.fhDiv).prop("checked", checked);
					}
				},
				setPager = function (pgid, tp) {
					var hoverClasses = getGuiStyles("states.hover"), disabledClasses = getGuiStyles("states.disabled"),
						sep = "<td class='ui-pg-button " + disabledClasses + "'><span class='ui-separator'></span></td>",
						pginp = "",
						blockAlign = p.pagerpos === "left" ? "margin-right:auto;" : (p.pagerpos === "right" ? "margin-left:auto;" : "margin-left:auto;margin-right:auto;"),
						pgl = "<table " + "style='table-layout:auto;white-space: pre;" + blockAlign + "' class='ui-pg-table'><tbody><tr>",
						str = "", pgcnt, lft, cent, rgt, twd, i,
						clearVals = function (onpaging, newPage, newRowNum) {
							if (!feedback.call(ts, "onPaging", onpaging, {
									newPage: newPage,
									currentPage: intNum(p.page, 1),
									lastPage: intNum(p.lastpage, 1),
									currentRowNum: intNum(p.rowNum, 10),
									newRowNum: newRowNum
								})) {
								return false;
							}
							p.selrow = null;
							if (p.multiselect) {
								if (!p.multiPageSelection) {
									clearArray(p.selarrrow); // p.selarrrow = [];
								}
								setHeadCheckBox.call(ts, false);
							}
							clearArray(p.savedRow); // p.savedRow = [];
							return true;
						};
					tp += "_" + pgid;
					pgcnt = "pg_" + pgid;
					lft = pgid + "_left";
					cent = pgid + "_center";
					rgt = pgid + "_right";
					$("#" + jqID(pgid))
						.append("<div id='" + pgcnt + "' class='ui-pager-control' role='group'><table class='ui-pg-table' style='width:100%;table-layout:fixed;height:100%;'><tbody><tr>" +
							"<td id='" + lft + "' style='text-align:left;" + (p.pagerLeftWidth !== undefined ? "width:" + p.pagerLeftWidth + "px;" : "") + "'></td>" +
							"<td id='" + cent + "' style='text-align:center;white-space:pre;" + (p.pagerCenterWidth !== undefined ? "width:" + p.pagerCenterWidth + "px;" : "") + "'></td>" +
							"<td id='" + rgt + "' style='text-align:right;" + (p.pagerRightWidth !== undefined ? "width:" + p.pagerRightWidth + "px;" : "") + "'></td></tr></tbody></table></div>")
						.attr("dir", "ltr"); //explicit setting
					pgcnt = "#" + jqID(pgcnt); // modify to id selector
					if (p.rowList.length > 0) {
						str = "<td dir='" + dir + "'>";
						var pgrecs = getDef("pgrecs");
						str += "<select class='" + getGuiStyles("pager.pagerSelect", "ui-pg-selbox") + "' " + (pgrecs ? "title='" + pgrecs + "'" : "") + ">";
						var strnm;
						for (i = 0; i < p.rowList.length; i++) {
							strnm = p.rowList[i].toString().split(":");
							if (strnm.length === 1) {
								strnm[1] = strnm[0];
							}
							str += "<option value='" + strnm[0] + "'" + ((intNum(p.rowNum, 0) === intNum(strnm[0], 0)) ? " selected='selected'" : "") + ">" + strnm[1] + "</option>";
						}
						str += "</select></td>";
					}
					if (dir === "rtl") { pgl += str; }
					if (p.pginput === true) { pginp = "<td dir='" + dir + "'>" + jgrid.format(getDef("pgtext") || "", "<input class='" + getGuiStyles("pager.pagerInput", "ui-pg-input") + "' type='text' size='2' maxlength='7' value='0'/>", "<span id='sp_1_" + pgid + "'>0</span>") + "</td>"; }
					pgid = "#" + jqID(pgid); // modify to id selector
					if (p.pgbuttons === true) {
						var po = ["first", "prev", "next", "last"],
							buttonClasses = getGuiStyles("pager.pagerButton", "ui-pg-button"),
							buildPagerButton = function (buttonName) {
								var titleText = getDef("pg" + buttonName);
								return "<td role='button' tabindex='0' id='" + buttonName + tp + "' class='" + buttonClasses + "' " +
									(titleText ? "title='" + titleText + "'" : "") + "><span class='" + getIcon("pager." + buttonName) + "'></span></td>";
							};
						if (dir === "rtl") { po.reverse(); }
						for (i = 0; i < po.length; i++) {
							pgl += buildPagerButton(po[i]);
							if (i === 1) {
								pgl += pginp !== "" ? sep + pginp + sep : "";
							}
						}
					} else if (pginp !== "") { pgl += pginp; }
					if (dir === "ltr") { pgl += str; }
					pgl += "</tr></tbody></table>";
					if (p.viewrecords === true) { $("td" + pgid + "_" + p.recordpos, pgcnt).append("<span dir='" + dir + "' style='text-align:" + p.recordpos + "' class='ui-paging-info'></span>"); }
					var $pagerIn = $("td" + pgid + "_" + p.pagerpos, pgcnt);
					$pagerIn.append(pgl);
					twd = setWidthOfPagerTdWithPager.call(this, $pagerIn.children(".ui-pg-table"));
					p._nvtd = [];
					p._nvtd[0] = twd ? Math.floor((p.width - twd) / 2) : Math.floor(p.width / 3);
					p._nvtd[1] = 0;
					pgl = null;
					$(".ui-pg-selbox", pgcnt).bind("change", function () {
						var newRowNum = intNum(this.value, 10),
							newPage = Math.round(p.rowNum * (p.page - 1) / newRowNum - 0.5) + 1;
						if (!clearVals("records", newPage, newRowNum)) { return false; }
						p.page = newPage;
						p.rowNum = newRowNum;
						if (p.pager) { $(".ui-pg-selbox", p.pager).val(newRowNum); }
						if (p.toppager) { $(".ui-pg-selbox", p.toppager).val(newRowNum); }
						populate.call(ts);
						return false;
					});
					if (p.pgbuttons === true) {
						$(".ui-pg-button", pgcnt).hover(function () {
							if (hasOneFromClasses(this, disabledClasses)) {
								this.style.cursor = "default";
							} else {
								$(this).addClass(hoverClasses);
								this.style.cursor = "pointer";
							}
						}, function () {
							if (!hasOneFromClasses(this, disabledClasses)) {
								$(this).removeClass(hoverClasses);
								this.style.cursor = "default";
							}
						});
						$("#first" + jqID(tp) + ", #prev" + jqID(tp) + ", #next" + jqID(tp) + ", #last" + jqID(tp)).click(function () {
							if (hasOneFromClasses(this, disabledClasses)) {
								return false;
							}
							var cp = intNum(p.page, 1), newPage = cp, onpaging = this.id,
								last = intNum(p.lastpage, 1), selclick = false,
								fp = true, pp = true, np = true, lp = true;
							if (last === 0 || last === 1) {
								if (cp <= 1) {
									fp = false;
									pp = false;
								}
								np = false;
								lp = false;
							} else if (last > 1 && cp >= 1) {
								if (cp === 1) {
									fp = false;
									pp = false;
								} else if (cp === last) {
									np = false;
									lp = false;
								}
							} else if (last > 1 && cp === 0) {
								np = false;
								lp = false;
								cp = last - 1;
							}
							if (this.id === "first" + tp && fp) {
								onpaging = "first";
								newPage = 1;
								selclick = true;
							}
							if (this.id === "prev" + tp && pp) {
								onpaging = "prev";
								newPage = (cp - 1);
								selclick = true;
							}
							if (this.id === "next" + tp && np) {
								onpaging = "next";
								newPage = (cp + 1);
								selclick = true;
							}
							if (this.id === "last" + tp && lp) {
								onpaging = "last";
								newPage = last;
								selclick = true;
							}
							if (!clearVals(onpaging, newPage, intNum(p.rowNum, 10))) { return false; }
							p.page = newPage;
							if (selclick) {
								populate.call(ts);
							}
							return false;
						});
					}
					if (p.pginput === true) {
						$("input.ui-pg-input", pgcnt).bind("keypress.jqGrid", function (e) {
							var key = e.charCode || e.keyCode || 0, newPage = intNum($(this).val(), 1);
							if (key === 13) {
								if (!clearVals("user", newPage, intNum(p.rowNum, 10))) { return false; }
								$(this).val(newPage);
								p.page = ($(this).val() > 0) ? $(this).val() : p.page;
								populate.call(ts);
								return false;
							}
							return this;
						});
					}
					$pagerIn.children(".ui-pg-table").bind("keydown.jqGrid", function (e) {
						var $focused;
						if (e.which === 13) {
							$focused = $pagerIn.find(":focus");
							if ($focused.length > 0) {
								$focused.trigger("click");
							}
						}
					});
				},
				getSortNames = function (sortNames, sortDirs, cm) {
					// sortNames, sortDirs MUST be initialized to [] and {} before
					// process sortname
					each((p.sortname + " " + p.sortorder).split(","), function () {
						var s = $.trim(this).split(" ");
						if (s.length === 2) {
							sortNames.push(s[0]);
						}
					});
					if (cm != null) {
						var i = $.inArray(cm.index || cm.name, sortNames);
						if (cm.lso !== "" && i < 0) {
							// new column is clicked
							sortNames.push(cm.index || cm.name);
						} else if (cm.lso === "" && i >= 0) {
							// remove column
							sortNames.splice(i, 1);
						}
					}
					each(p.colModel, function () {
						var sortName = this.index || this.name, splas;
						if (this.lso) {
							splas = this.lso.split("-");
							if ($.inArray(sortName, sortNames) < 0) {
								sortNames.push(sortName);
							}
							sortDirs[sortName] = splas[splas.length - 1];
						}
					});
				},
				multiSort = function (iCol1, obj) {
					var sort1 = "", cm = p.colModel[iCol1], so,
						disabledClasses = getGuiStyles("states.disabled"),
						$selTh = p.frozenColumns ? $(obj) : $(ts.grid.headers[iCol1].el),
						$iconsSpan = $selTh.find("span.s-ico"),
						$iconAsc = $iconsSpan.children("span.ui-icon-asc"),
						$iconDesc = $iconsSpan.children("span.ui-icon-desc"),
						$iconsActive = $iconAsc, $iconsInictive = $iconDesc, sortNames = [], sortDirs = {};

					$selTh.find("span.ui-grid-ico-sort").addClass(disabledClasses); // for both icons
					$selTh.attr("aria-selected", "false");

					if (cm.lso) {
						$iconsSpan.show();
						so = cm.lso.split("-");
						so = so[so.length - 1];
						if (so === "desc") {
							$iconsActive = $iconDesc;
							$iconsInictive = $iconAsc;
						}
						$iconsActive.removeClass(disabledClasses).css("display", ""); // show;
						if (p.showOneSortIcon) {
							$iconsInictive.hide();
						}
						$selTh.attr("aria-selected", "true");
					} else if (!p.viewsortcols[0]) {
						$iconsSpan.hide();
					}

					getSortNames(sortNames, sortDirs, cm);
					each(sortNames, function () {
						if (sort1.length > 0) { sort1 += ", "; }
						sort1 += this + " " + sortDirs[this];
						p.sortorder = sortDirs[this];
					});
					p.sortname = sort1.substring(0, sort1.length - p.sortorder.length - 1);
				},
				sortData = function (index, idxcol, reload, sor, obj) {
					var self = this, mygrid = self.grid, cm = p.colModel[idxcol], disabledClasses = getGuiStyles("states.disabled");
					if (cm == null || !cm.sortable) { return; }
					if (p.savedRow.length > 0) { return; }
					if (!reload) {
						if (p.lastsort === idxcol && p.sortname !== "") {
							if (p.sortorder === "asc") {
								p.sortorder = "desc";
							} else if (p.sortorder === "desc") {
								p.sortorder = "asc";
							} else {
								p.sortorder = cm.firstsortorder || "asc";
							}
							// first set new value of lso:
							// "asc" -> "asc-desc", new sorting to "desc"
							// "desc" -> "desc-asc", new sorting to "asc"
							// "asc-desc" or "desc-asc" -> "", no new sorting ""
							// "" -> cm.firstsortorder || "asc"
							if (cm.lso) {
								if (cm.lso === "asc") {
									cm.lso += "-desc";
								} else if (cm.lso === "desc") {
									cm.lso += "-asc";
								} else if ((cm.lso === "asc-desc" || cm.lso === "desc-asc") && (p.threeStateSort || p.multiSort)) {
									cm.lso = "";
								}
							} else {
								cm.lso = cm.firstsortorder || "asc";
							}
						} else {
							cm.lso = p.sortorder = cm.firstsortorder || "asc";
						}
						p.page = 1;
					}
					if (p.multiSort) {
						multiSort(idxcol, obj);
					} else {
						if (sor) {
							if (p.lastsort === idxcol && p.sortorder === sor && !reload) { return; }
							p.sortorder = sor;
						}
						var headers = mygrid.headers, fhDiv = mygrid.fhDiv,
							$previousSelectedTh = headers[p.lastsort] ? $(headers[p.lastsort].el) : $(),
							$newSelectedTh = p.frozenColumns ? $(obj) : $(headers[idxcol].el),
							$iconsSpan = $newSelectedTh.find("span.s-ico"),
							$iconsActive = $iconsSpan.children("span.ui-icon-" + p.sortorder),
							$iconsInictive = $iconsSpan.children("span.ui-icon-" + (p.sortorder === "asc" ? "desc" : "asc"));

						cm = p.colModel[p.lastsort];
						$previousSelectedTh.find("span.ui-grid-ico-sort").addClass(disabledClasses);
						$previousSelectedTh.attr("aria-selected", "false");
						if (p.frozenColumns) {
							fhDiv.find("span.ui-grid-ico-sort").addClass(disabledClasses);
							fhDiv.find("th").attr("aria-selected", "false");
						}
						if (!p.viewsortcols[0]) {
							if (p.lastsort !== idxcol) {
								if (p.frozenColumns) {
									fhDiv.find("span.s-ico").hide();
								}
								$previousSelectedTh.find("span.s-ico").hide();
								$iconsSpan.show();
							} else if (p.sortname === "") { // if p.lastsort === idxcol but p.sortname === ""
								$iconsSpan.show(); // ???
							}
						}
						if (p.lastsort !== idxcol) {
							if ($previousSelectedTh.data("autoResized") === "true" &&
									((cm != null && cm.autoResizing != null && cm.autoResizing.compact) ||
										p.autoResizing.compact)) {
								// recalculate the width of the column after removing sort icon
								p.columnsToReResizing.push(p.lastsort);
							}
						}
						cm = p.colModel[idxcol];
						$iconsSpan.css("display", ""); // show
						if (cm.lso !== "") {
							$iconsActive.removeClass(disabledClasses).css("display", ""); // show
							if (p.showOneSortIcon) {
								$iconsInictive.removeClass(disabledClasses).hide();
							}
							$newSelectedTh.attr("aria-selected", "true");
						} else {
							$newSelectedTh.attr("aria-selected", "false");
							if (p.threeStateSort) {
								p.sortorder = "";
								if (!p.viewsortcols[0]) {
									$iconsSpan.hide();
								}
							}
						}
						if (p.lastsort !== idxcol && $newSelectedTh.data("autoResized") === "true") {
							if ((cm != null && cm.autoResizing != null && cm.autoResizing.compact) ||
									p.autoResizing.compact) {
								// recalculate the width of the column after removing sort icon
								p.columnsToReResizing.push(idxcol);
							}
						}
						// the index looks like "jqgh_" + p.id + "_" + colIndex (like "jqgh_list_invdate")
						index = index.substring(5 + p.id.length + 1); // bad to be changed!?!
						p.sortname = cm.index || index;
					}
					if (!feedback.call(self, "onSortCol", p.sortname, idxcol, p.sortorder)) {
						p.lastsort = idxcol;
						return;
					}
					if (p.datatype === "local") {
						if (p.deselectAfterSort && !p.multiPageSelection) { $j.resetSelection.call($(self)); }
					} else if (!p.multiPageSelection) {
						p.selrow = null;
						if (p.multiselect) {
							setHeadCheckBox.call(self, false);
							clearArray(p.selarrrow); //p.selarrrow =[];
						}
					}
					clearArray(p.savedRow); //p.savedRow =[];
					if (p.scroll) {
						var sscroll = mygrid.bDiv.scrollLeft;
						grid.emptyRows.call(self, true, false);
						mygrid.hDiv.scrollLeft = sscroll;
					}
					if (p.subGrid && p.datatype === "local") {
						$("td.sgexpanded", "#" + jqID(p.id)).each(function () {
							$(this).trigger("click");
						});
					}
					populate.call(self);
					p.lastsort = idxcol;
					if (p.sortname !== index && idxcol) { p.lastsort = idxcol; }
				},
				setInitialColWidth = function () {
					var initialWidth = 0, borderAndPaddingWidth = jgrid.cell_width ? 0 : intNum(p.cellLayout, 0), numberOfVariableColumns = 0, iLastVariableColumn, scrollbarWidth = intNum(p.scrollOffset, 0), columnWidth, hasScrollbar = false, totalVariableWidth, fixedColumnsWidth = 0, correctur,
						isCellClassHidden = jgrid.isCellClassHidden;
					each(p.colModel, function () {
						if (this.hidden === undefined) { this.hidden = false; }
						if (p.grouping && p.autowidth) {
							var ind = inArray(this.name, p.groupingView.groupField);
							if (ind >= 0 && p.groupingView.groupColumnShow.length > ind) {
								this.hidden = !p.groupingView.groupColumnShow[ind];
							}
						}
						this.widthOrg = columnWidth = intNum(this.width, 0);
						if (this.hidden === false && !isCellClassHidden(this.classes)) {
							initialWidth += columnWidth + borderAndPaddingWidth;
							if (this.fixed) {
								fixedColumnsWidth += columnWidth + borderAndPaddingWidth;
							} else {
								numberOfVariableColumns++;
							}
						}
					});
					if (isNaN(p.width)) {
						p.width = initialWidth + ((p.shrinkToFit === false && !isNaN(p.height)) ? scrollbarWidth : 0);
					}
					grid.width = p.width;
					p.tblwidth = initialWidth;
					if (p.shrinkToFit === false && p.forceFit === true) { p.forceFit = false; }
					if (p.shrinkToFit === true && numberOfVariableColumns > 0) {
						totalVariableWidth = grid.width - borderAndPaddingWidth * numberOfVariableColumns - fixedColumnsWidth;
						if (!isNaN(p.height)) {
							totalVariableWidth -= scrollbarWidth;
							hasScrollbar = true;
						}
						initialWidth = 0;
						each(p.colModel, function (i) {
							if (this.hidden === false && !isCellClassHidden(this.classes) && !this.fixed) {
								columnWidth = Math.round(totalVariableWidth * this.width / (p.tblwidth - borderAndPaddingWidth * numberOfVariableColumns - fixedColumnsWidth));
								this.width = columnWidth;
								initialWidth += columnWidth;
								iLastVariableColumn = i;
							}
						});
						correctur = 0;
						if (hasScrollbar) {
							if (grid.width - fixedColumnsWidth - (initialWidth + borderAndPaddingWidth * numberOfVariableColumns) !== scrollbarWidth) {
								correctur = grid.width - fixedColumnsWidth - (initialWidth + borderAndPaddingWidth * numberOfVariableColumns) - scrollbarWidth;
							}
						} else if (!hasScrollbar && Math.abs(grid.width - fixedColumnsWidth - (initialWidth + borderAndPaddingWidth * numberOfVariableColumns)) !== 1) {
							correctur = grid.width - fixedColumnsWidth - (initialWidth + borderAndPaddingWidth * numberOfVariableColumns);
						}
						p.colModel[iLastVariableColumn].width += correctur;
						p.tblwidth = initialWidth + correctur + borderAndPaddingWidth * numberOfVariableColumns + fixedColumnsWidth;
						if (p.tblwidth > p.width) {
							p.colModel[iLastVariableColumn].width -= (p.tblwidth - parseInt(p.width, 10));
							p.tblwidth = p.width;
						}
					}
				},
				nextVisible = function (iCol1) {
					var ret = iCol1, j = iCol1, i;
					for (i = iCol1 + 1; i < p.colModel.length; i++) {
						if (p.colModel[i].hidden !== true) {
							j = i;
							break;
						}
					}
					return j - ret;
				},
				getColumnHeaderIndex = function (th) {
					// TODO: adjust the code after adjust the way which generates
					// ids of frozen columns
					return p.iColByName[(th.id || "").substring(p.id.length + 1)];
				},
				colTemplate;

			if (inArray(p.multikey, sortkeys) === -1) { p.multikey = false; }
			p.keyName = false;
			p.sortorder = p.sortorder.toLowerCase();
			jgrid.cell_width = jgrid.cellWidth();
			var jgridCmTemplate = jgrid.cmTemplate, iCol, cmi;
			for (iCol = 0; iCol < p.colModel.length; iCol++) {
				cmi = p.colModel[iCol];
				colTemplate = typeof cmi.template === "string" ?
						(jgridCmTemplate != null && (typeof jgridCmTemplate[cmi.template] === "object" || $.isFunction(jgridCmTemplate[cmi.template])) ?
								jgridCmTemplate[cmi.template] : {}) :
						cmi.template;
				if (isFunction(colTemplate)) {
					colTemplate = colTemplate.call(ts, { cm: cmi, iCol: iCol });
				}
				cmi = extend(true, {}, p.cmTemplate, colTemplate || {}, cmi);
				if (p.keyName === false && cmi.key === true) {
					p.keyName = cmi.name;
				}
				p.colModel[iCol] = cmi;
			}
			for (iCol = 0; iCol < p.additionalProperties.length; iCol++) {
				cmi = p.additionalProperties[iCol];
				if (p.keyName === false && cmi.key === true) {
					p.keyName = cmi.name;
				}
			}
			if (p.colNames.length === 0) {
				for (iCol = 0; iCol < p.colModel.length; iCol++) {
					p.colNames[iCol] = p.colModel[iCol].label !== undefined ? p.colModel[iCol].label : p.colModel[iCol].name;
				}
			}
			if (p.colNames.length !== p.colModel.length) {
				fatalErrorFunction(getRes("errors.model"));
				return;
			}
			if (p.grouping === true) {
				p.scroll = false;
				p.rownumbers = false;
				//p.subGrid = false; expiremental
				p.treeGrid = false;
				p.gridview = true;
			}
			if (p.subGrid) {
				try { $j.setSubGrid.call($self0); } catch (ignore1) { }
			}
			if (p.multiselect && (p.multiselectPosition === "left" || p.multiselectPosition === "right")) {
				var insertMethod = p.multiselectPosition === "left" ? "unshift" : "push";
				p.colNames[insertMethod]("<input id='" + p.cbId + "' class='cbox' type='checkbox' aria-checked='false'/>");
				p.colModel[insertMethod]({ name: "cb", width: jgrid.cell_width ? p.multiselectWidth + p.cellLayout : p.multiselectWidth, labelClasses: "jqgh_cbox", classes: "td_cbox", sortable: false, resizable: false, hidedlg: true, search: false, align: "center", fixed: true, frozen: true });
			}
			if (p.rownumbers) {
				p.colNames.unshift("");
				p.colModel.unshift({ name: "rn", width: jgrid.cell_width ? p.rownumWidth + p.cellLayout : p.rownumWidth, labelClasses: "jqgh_rn", sortable: false, resizable: false, hidedlg: true, search: false, align: "center", fixed: true, frozen: true });
			}
			p.iColByName = buildColNameMap(p.colModel);
			p.xmlReader = extend(true, {
				root: "rows",
				row: "row",
				page: "rows>page",
				total: "rows>total",
				records: "rows>records",
				repeatitems: true,
				cell: "cell",
				id: "[id]",
				userdata: "userdata",
				subgrid: { root: "rows", row: "row", repeatitems: true, cell: "cell" }
			}, p.xmlReader);
			p.jsonReader = extend(true, {
				root: "rows",
				page: "page",
				total: "total",
				records: "records",
				repeatitems: true,
				cell: "cell",
				id: "id",
				userdata: "userdata",
				subgrid: { root: "rows", repeatitems: true, cell: "cell" }
			}, p.jsonReader);
			p.localReader = extend(true, {
				root: "rows",
				page: "page",
				total: "total",
				records: "records",
				repeatitems: false,
				cell: "cell",
				id: "id",
				userdata: "userdata",
				subgrid: { root: "rows", repeatitems: true, cell: "cell" }
			}, p.localReader);
			if (p.scroll) {
				p.pgbuttons = false;
				p.pginput = false;
				p.rowList = [];
			}
			if (p.treeGrid === true) {
				try { $j.setTreeGrid.call($self0); } catch (ignore1) { }
				if (p.datatype !== "local") { p.localReader = { id: "_id_" }; }
				// rebuild p.iPropByName after modification of p.additionalProperties
				p.iPropByName = buildAddPropMap(p.additionalProperties);
			}
			normalizeRemapColumns();
			buildArrayReader();

			if (p.data.length) {
				normalizeData.call(ts);
				refreshIndex();
			}
			if (p.shrinkToFit === true && p.forceFit === true) {
				for (iCol = p.colModel.length - 1; iCol >= 0; iCol--) {
					if (p.colModel[iCol].hidden !== true) {
						p.colModel[iCol].resizable = false;
						break;
					}
				}
			}
			var idn, w, res, sort, tooltip, labelStyle, ptr, sortarr = [], sortord = [], sotmp = [],
				thead = "<thead><tr class='ui-jqgrid-labels' role='row'>", headerText,
				tbody = "<tbody><tr style='display:none;'>",
				hoverStateClasses = getGuiStyles("states.hover"),
				disabledStateClasses = getGuiStyles("states.disabled");

			if (p.multiSort) {
				sortarr = p.sortname.split(",");
				var iSort;
				for (iSort = 0; iSort < sortarr.length; iSort++) {
					sotmp = trim(sortarr[iSort]).split(" ");
					sortarr[iSort] = trim(sotmp[0]);
					sortord[iSort] = sotmp[1] ? trim(sotmp[1]) : p.sortorder || "asc";
				}
			}
			for (iCol = 0; iCol < p.colNames.length; iCol++) {
				cmi = p.colModel[iCol];
				tooltip = p.headertitles || cmi.headerTitle ? (" title='" + stripHtml(typeof cmi.headerTitle === "string" ? cmi.headerTitle : p.colNames[iCol]) + "'") : "";
				thead += "<th id='" + p.id + "_" + cmi.name + "' class='" + getGuiStyles("colHeaders", "ui-th-column ui-th-" + dir + " " + (cmi.labelClasses || "")) + "'" + tooltip + ">";
				idn = cmi.index || cmi.name;
				switch (cmi.labelAlign) {
				case "left":
					labelStyle = "text-align:left;";
					break;
				case "right":
					labelStyle = "text-align:right;" + (cmi.sortable === false ? "" : "padding-right:" + p.autoResizing.widthOfVisiblePartOfSortIcon + "px;");
					break;
				case "likeData":
					labelStyle = cmi.align === undefined || cmi.align === "left" ?
							"text-align:left;" :
							(cmi.align === "right" ? "text-align:right;" + (cmi.sortable === false ? "" : "padding-right:" + p.autoResizing.widthOfVisiblePartOfSortIcon + "px;") : "");
					break;
				default:
					labelStyle = "";
				}

				thead += "<div id='jqgh_" + p.id + "_" + cmi.name + "'" +
					(isMSIE ? " class='ui-th-div-ie'" : "") +
					(labelStyle === "" ? "" : " style='" + labelStyle + "'") + ">";
				headerText = cmi.autoResizable && cmi.formatter !== "actions" ?
							"<span class='" + p.autoResizing.wrapperClassName + "'>" + p.colNames[iCol] + "</span>" :
							p.colNames[iCol];
				if (p.sortIconsBeforeText) {
					thead += (p.builderSortIcons || jgrid.builderSortIcons).call(ts, iCol);
					thead += headerText;
				} else {
					thead += headerText;
					thead += (p.builderSortIcons || jgrid.builderSortIcons).call(ts, iCol);
				}
				thead += "</div></th>";
				tbody += "<td></td>";
				cmi.width = cmi.width ? parseInt(cmi.width, 10) : 150;
				if (typeof cmi.title !== "boolean") { cmi.title = true; }
				cmi.lso = "";
				if (idn === p.sortname) {
					p.lastsort = iCol;
					cmi.lso = p.sortorder || cmi.firstsortorder || "asc";
				}
				if (p.multiSort) {
					sotmp = inArray(idn, sortarr);
					if (sotmp !== -1) {
						cmi.lso = sortord[sotmp];
					}
				}
			}
			thead += "</tr></thead>";
			tbody += "</tr></tbody>";
			var hTable = $("<table class='" + getGuiStyles("hTable", "ui-jqgrid-htable") +
					"' style='width:1px' role='presentation' aria-labelledby='gbox_" + p.id + "'>" +
					thead + tbody + "</table>");
			$(hTable[0].tHead)
				.children("tr")
				.children("th")
				.hover(
					function () { $(this).addClass(hoverStateClasses); },
					function () { $(this).removeClass(hoverStateClasses); }
				);
			if (p.multiselect) {
				$(p.cb, hTable).bind("click", function () {
					var highlightClass = getGuiStyles("states.select"), toCheck, emp = [],
						iColCb = p.iColByName.cb,
						selectUnselectRow = function (tr, toSelect) {
							$(tr)[toSelect ? "addClass" : "removeClass"](highlightClass)
								.attr(toSelect ?
										{ "aria-selected": "true", tabindex: "0" } :
										{ "aria-selected": "false", tabindex: "-1" });
							if (iColCb !== undefined) { // p.multiselectCheckboxes
								$(tr.cells[iColCb]).children("input.cbox").prop("checked", toSelect);
							}
						},
						frozenRows = grid.fbRows,
						skipClasses = disabledStateClasses + " ui-subgrid jqgroup jqfoot jqgfirstrow jqgskipselect",
						id, ids = p._index;
					clearArray(p.selarrrow); // p.selarrrow = [];
					if (this.checked) {
						toCheck = true;
						p.selrow = ts.rows.length > 1 ? ts.rows[ts.rows.length - 1].id : null;
						if (p.multiPageSelection && (p.datatype === "local" || p.treeGrid)) {
							if (p.data != null && p.data.length > 0 && ids != null) {
								// add to selarrrow all
								for (id in ids) {
									if (ids.hasOwnProperty(id)) {
										p.selarrrow.push(p.idPrefix + id);
									}
								}
							}
						}
					} else {
						toCheck = false;
						p.selrow = null;
					}
					var selArr = toCheck ? p.selarrrow : emp;
					$(ts.rows).each(function (i) {
						if (!hasOneFromClasses(this, skipClasses)) {
							selectUnselectRow(this, toCheck);
							if ($.inArray(this.id, selArr) < 0) {
								selArr.push(this.id);
							}
							if (frozenRows) {
								selectUnselectRow(frozenRows[i], toCheck);
							}
						}
					});
					feedback.call(ts, "onSelectAll", toCheck ? p.selarrrow : emp, toCheck);
					// it's important don't use return false in the event handler
					// the usage of return false break checking/unchecking
				});
			}

			if (p.autowidth === true) {
				var pw = Math.floor($(eg).innerWidth());
				p.width = pw > 0 ? pw : "nw";
			}
			if (!isNaN(p.width)) { // process values like "500" instead of the number 500.
				p.width = Number(p.width);
			} else if (!isNaN(parseFloat(p.width))) { // process values like "500px"
				p.width = parseFloat(p.width);
			}
			p.widthOrg = p.width;
			setInitialColWidth();
			$(eg).css("width", grid.width + "px")
				.append("<div class='" + getGuiStyles("resizer", "ui-jqgrid-resize-mark") + "' id='" + p.rsId + "'>&#160;</div>");
			$(p.rs)
				.bind("selectstart", function () {
					return false;
				})
				.click(myResizerClickHandler)
				.dblclick(function (e) {
					var iColIndex = $(this).data("idx"),
						pageX = $(this).data("pageX"),
						cm = p.colModel[iColIndex];

					if (pageX == null || cm == null) {
						return false;
					}
					var arPageX = String(pageX).split(";"),
						pageX1 = parseFloat(arPageX[0]),
						pageX2 = parseFloat(arPageX[1]);
					if (arPageX.length === 2 && (Math.abs(pageX1 - pageX2) > 5 || Math.abs(e.pageX - pageX1) > 5 || Math.abs(e.pageX - pageX2) > 5)) {
						return false;
					}
					if (feedback.call(ts, "resizeDblClick", iColIndex, cm, e) && cm.autoResizable) {
						$j.autoResizeColumn.call($self0, iColIndex);
					}
					feedback.call(ts, "afterResizeDblClick", { iCol: iColIndex, cm: cm, cmName: cm.name });

					return false; // stop propagate
				});
			$(gv).css("width", grid.width + "px");
			var tfoot = "";
			if (p.footerrow) {
				tfoot += "<table role='presentation' style='width:1px' class='" +
					getGuiStyles("gridFooter", "ui-jqgrid-ftable") +
					"'><tbody><tr role='row' class='" + getGuiStyles("rowFooter", "footrow footrow-" + dir) + "'>";
			}
			var firstr = "<tr class='jqgfirstrow' role='row' style='height:auto'>";
			p.disableClick = false;
			$("th", hTable[0].tHead.rows[0])
				.each(function (j) {
					var cm = p.colModel[j], nm = cm.name, $th = $(this),
						$sortableDiv = $th.children("div"),
						$iconsSpan = $sortableDiv.children("span.s-ico"),
						showOneSortIcon = p.showOneSortIcon;

					w = cm.width;
					if (cm.resizable === undefined) { cm.resizable = true; }
					if (cm.resizable) {
						res = document.createElement("span");
						$(res).html("&#160;")
							.addClass("ui-jqgrid-resize ui-jqgrid-resize-" + dir)
							//.css("cursor","col-resize")
							.bind("selectstart", function () {
								return false;
							});
						$th.addClass(p.resizeclass);
					} else {
						res = "";
					}
					$th.css("width", w + "px")
						.prepend(res);
					res = null;
					var hdcol = "";
					if (cm.hidden === true) {
						$th.css("display", "none");
						hdcol = "display:none;";
					}
					firstr += "<td role='gridcell' " + (cm.classes ? "class='" + cm.classes + "' " : "") +
						"style='height:0;width:" + w + "px;" + hdcol + "'></td>";
					grid.headers[j] = { width: w, el: this };
					sort = cm.sortable;
					if (typeof sort !== "boolean") { cm.sortable = true; sort = true; }
					if (!(nm === "cb" || nm === "subgrid" || nm === "rn") && sort) {
						if (p.viewsortcols[2]) {
							// class ui-jqgrid-sortable changes the cursor in
							$sortableDiv.addClass("ui-jqgrid-sortable");
						}
					}
					if (sort) {
						if (p.multiSort) {
							var notLso = cm.lso === "desc" ? "asc" : "desc";
							if (p.viewsortcols[0]) {
								$iconsSpan.css("display", "");
								if (cm.lso) {
									$iconsSpan.children("span.ui-icon-" + cm.lso).removeClass(disabledStateClasses);
									if (showOneSortIcon) {
										$iconsSpan.children("span.ui-icon-" + notLso).hide();
									}
								}
							} else if (cm.lso) {
								$iconsSpan.css("display", "");
								$iconsSpan.children("span.ui-icon-" + cm.lso).removeClass(disabledStateClasses);
								if (showOneSortIcon) {
									$iconsSpan.children("span.ui-icon-" + notLso).hide();
								}
							}
						} else {
							var notSortOrder = p.sortorder === "desc" ? "asc" : "desc";
							if (p.viewsortcols[0]) {
								$iconsSpan.css("display", "");
								if (j === p.lastsort) {
									$iconsSpan.children("span.ui-icon-" + p.sortorder).removeClass(disabledStateClasses);
									if (showOneSortIcon) {
										$iconsSpan.children("span.ui-icon-" + notSortOrder).hide();
									}
								}
							} else if (j === p.lastsort && cm.lso !== "") { // p.sortname === (cm.index || nm)
								$iconsSpan.css("display", "");
								$iconsSpan.children("span.ui-icon-" + p.sortorder).removeClass(disabledStateClasses);
								if (showOneSortIcon) {
									$iconsSpan.children("span.ui-icon-" + notSortOrder).hide();
								}
							}
						}
					}
					if (p.footerrow) { tfoot += "<td role='gridcell' " + formatCol(j, 0, "", null, "", false) + ">&#160;</td>"; }
				})
				.mousedown(function (e) {
					var $th = $(this), isFrozen = $th.closest(".ui-jqgrid-hdiv").hasClass("frozen-div"),
						getOffset = function () {
							var ret = [$th.position().left + $th.outerWidth()];
							if (p.direction === "rtl") { ret[0] = p.width - ret[0]; }
							ret[0] -= isFrozen ? 0 : grid.bDiv.scrollLeft;
							ret.push($(grid.hDiv).position().top);
							ret.push($(grid.bDiv).offset().top - $(grid.hDiv).offset().top + $(grid.bDiv).height() +
								(grid.sDiv ? $(grid.sDiv).height() : 0));
							return ret;
						},
						iCol1;
					if ($(e.target).closest("th>span.ui-jqgrid-resize").length !== 1) { return; }
					iCol1 = getColumnHeaderIndex(this);
					if (iCol1 != null) {
						if (p.forceFit === true) { p.nv = nextVisible(iCol1); }
						grid.dragStart(iCol1, e, getOffset(), $th);
					}
					return false;
				})
				.click(function (e) {
					if (p.disableClick) {
						p.disableClick = false;
						return false;
					}
					var s = "th.ui-th-column>div", r, d;
					if (!p.viewsortcols[2]) {
						s += ">span.s-ico>span.ui-grid-ico-sort"; // sort only on click on sorting icon
					} else {
						s += ".ui-jqgrid-sortable";
					}
					var t = $(e.target).closest(s);
					if (t.length !== 1) { return; }
					if (!p.viewsortcols[2]) {
						r = true;
						d = t.hasClass("ui-icon-desc") ? "desc" : "asc";
					}
					var iColByName = getColumnHeaderIndex(this);
					if (iColByName != null) {
						sortData.call(ts, $("div", this)[0].id, iColByName, r, d, this);
					}
					return false;
				});
			if (p.sortable && $.fn.sortable) {
				try {
					$j.sortableColumns.call($self0, $(hTable[0].tHead.rows[0]));
				} catch (ignore1) { }
			}
			if (p.footerrow) { tfoot += "</tr></tbody></table>"; }
			firstr += "</tr>";
			$self0.html("<tbody>" + firstr + "</tbody>");
			//firstr = null;
			$self0.addClass(getGuiStyles("grid", "ui-jqgrid-btable" + (p.altRows === true && $self0.jqGrid("isBootstrapGuiStyle") ? " table-striped" : "")));
			var hg = (p.caption && p.hiddengrid === true) ? true : false,
				hb = $("<div class='ui-jqgrid-hbox" + (dir === "rtl" ? "-rtl" : "") + "'></div>"),
				topClasses = getGuiStyles("top"),
				bottomClasses = getGuiStyles("bottom");
			grid.hDiv = document.createElement("div");
			$(grid.hDiv)
				.css({ width: grid.width + "px" })
				.addClass(getGuiStyles("hDiv", "ui-jqgrid-hdiv"))
				.append(hb)
				.scroll(function () {
					// the hDiv can be scrolled because of tab keyboard navigation
					// we have to sync bDiv and hDiv scrollLeft in the case
					var bDiv = $(this).next(".ui-jqgrid-bdiv")[0];
					if (bDiv) {
						bDiv.scrollLeft = this.scrollLeft;
					}
					return false;
				});
			$(hb).append(hTable);
			hTable = null;
			if (hg) { $(grid.hDiv).hide(); }
			p.rowNum = parseInt(p.rowNum, 10);
			if (isNaN(p.rowNum) || p.rowNum <= 0) {
				p.rowNum = p.maxRowNum;
			}
			if (p.pager) {
				// see http://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
				// or http://api.jquery.com/id-selector/ or http://api.jquery.com/category/selectors/
				// about the requirement to escape characters like ".", ":" or some other in case.
				var $pager, pagerId;
				if (typeof p.pager === "string" && p.pager.substr(0, 1) !== "#") {
					pagerId = p.pager; // UNESCAPED id of the pager
					$pager = $("#" + jqID(p.pager));
				} else if (p.pager === true) {
					pagerId = randId();
					$pager = $("<div id='" + pagerId + "'></div>");
					$pager.appendTo("body");
					p.pager = "#" + jqID(pagerId);
				} else {
					$pager = $(p.pager); // jQuery wrapper or ESCAPED id selector
					pagerId = $pager.attr("id");
				}
				if ($pager.length > 0) {
					$pager.css({ width: grid.width + "px" }).addClass(getGuiStyles("pager.pager", "ui-jqgrid-pager " + bottomClasses)).appendTo(eg);
					if (hg) { $pager.hide(); }
					setPager.call(ts, pagerId, "");
					p.pager = "#" + jqID(pagerId); // hold ESCAPED id selector in the pager
				} else {
					p.pager = ""; // clear wrong value of the pager option
				}
			}
			if (p.cellEdit === false && p.hoverrows === true) {
				$self0
					.bind("mouseover", function (e) {
						ptr = $(e.target).closest("tr.jqgrow");
						if ($(ptr).attr("class") !== "ui-subgrid") {
							$(ptr).addClass(hoverStateClasses);
						}
					})
					.bind("mouseout", function (e) {
						ptr = $(e.target).closest("tr.jqgrow");
						$(ptr).removeClass(hoverStateClasses);
					});
			}
			var ri, ci, tdHtml,
				getTdFromTarget = function (target) {
					var $td, $tr, $table;
					do {
						$td = $(target).closest("td");
						if ($td.length > 0) {
							$tr = $td.parent();
							$table = $tr.parent().parent();
							if ($tr.is(".jqgrow") && ($table[0] === this || ($table.is("table.ui-jqgrid-btable") && ($table[0].id || "").replace("_frozen", "") === this.id))) {
								break;
							}
							target = $td.parent();
						}
					} while ($td.length > 0);
					return $td;
				};
			$self0.before(grid.hDiv)
				.click(function (e) {
					var highlightClass = getGuiStyles("states.select"), target = e.target,
						$td = getTdFromTarget.call(this, target),
						$tr = $td.parent();
					// we uses ts.rows context below to be sure that we don't process the clicks in the subgrid
					// probably one can change the rule and to step over the parents till one will have
					// "tr.jqgrow>td" AND the parent of parent (the table element) will be ts.
					// one can use the same processing in click, dblclick and contextmenu
					//ptr = $(td, ts.rows).closest("tr.jqgrow");
					if ($tr.length === 0 || hasOneFromClasses($tr, disabledStateClasses)) {
						return;
					}
					ri = $tr[0].id;
					var scb = $(target).hasClass("cbox"), cSel = feedback.call(ts, "beforeSelectRow", ri, e),
						editingInfo = jgrid.detectRowEditing.call(ts, ri),
						locked = editingInfo != null && editingInfo.mode !== "cellEditing"; // editingInfo.savedRow.ic
					if (target.tagName === "A" || (locked && !scb)) { return; }
					ci = $td[0].cellIndex;
					tdHtml = $td.html();
					feedback.call(ts, "onCellSelect", ri, ci, tdHtml, e);
					if (p.cellEdit === true) {
						if (p.multiselect && scb && cSel) {
							setSelection.call($self0, ri, true, e);
						} else {
							ri = $tr[0].rowIndex;
							try { $j.editCell.call($self0, ri, ci, true); } catch (ignore) { }
						}
						return;
					}
					if (!cSel) {
						if (scb) {
							// selection is not allowed by beforeSelectRow, but the multiselect
							// checkbox is clicked.
							$(target).prop("checked", false);
						}
						return;
					}
					if (!p.multikey) {
						if (p.multiselect && p.multiboxonly) {
							if (scb) {
								setSelection.call($self0, ri, true, e);
							} else {
								var frz = p.frozenColumns ? p.id + "_frozen" : "";
								$(p.selarrrow).each(function (i, n) {
									var trid = $j.getGridRowById.call($self0, n);
									if (trid) { $(trid).removeClass(highlightClass); }
									$("#jqg_" + jqID(p.id) + "_" + jqID(n)).prop("checked", false);
									if (frz) {
										$("#" + jqID(n), "#" + jqID(frz)).removeClass(highlightClass);
										$("#jqg_" + jqID(p.id) + "_" + jqID(n), "#" + jqID(frz)).prop("checked", false);
									}
								});
								clearArray(p.selarrrow); // p.selarrrow = [];
								setSelection.call($self0, ri, true, e);
							}
						} else {
							var oldSelRow = p.selrow;
							setSelection.call($self0, ri, true, e);
							if (p.singleSelectClickMode === "toggle" && !p.multiselect && oldSelRow === ri) {
								if (this.grid.fbRows) {
									$tr = $tr.add(this.grid.fbRows[ri]);
								}
								$tr.removeClass(highlightClass).attr({ "aria-selected": "false", "tabindex": "-1" });
								p.selrow = null;
							}
						}
					} else {
						if (e[p.multikey]) {
							setSelection.call($self0, ri, true, e);
						} else if (p.multiselect && scb) {
							scb = $("#jqg_" + jqID(p.id) + "_" + ri).is(":checked");
							$("#jqg_" + jqID(p.id) + "_" + ri).prop("checked", !scb);
						}
					}
					// it's important don't use return false in the event handler
					// the usage of return false break checking/uchecking
				})
				.bind("reloadGrid", function (e, opts) {
					var self = this, gridSelf = self.grid, $self = $(this);
					if (p.treeGrid === true) {
						p.datatype = p.treedatatype;
					}
					opts = extend({}, defaults.reloadGridOptions || {}, p.reloadGridOptions || {}, opts || {});
					if (p.datatype === "local" && p.dataTypeOrg && p.loadonce && opts.fromServer) {
						p.datatype = p.dataTypeOrg;
						delete p.dataTypeOrg;
					}
					if (opts.current) {
						gridSelf.selectionPreserver.call(self);
					}
					if (p.datatype === "local") {
						if (!p.multiPageSelection) {
							$j.resetSelection.call($self);
						}
						if (p.data.length) { normalizeData.call(self); refreshIndex(); }
					} else if (!p.treeGrid && !p.multiPageSelection) {
						p.selrow = null;
						if (p.multiselect) {
							clearArray(p.selarrrow); // p.selarrrow = [];
							setHeadCheckBox.call(self, false);
						}
						clearArray(p.savedRow); // p.savedRow = [];
					}
					p.iRow = -1;
					p.iCol = -1;
					if (p.scroll) { grid.emptyRows.call(self, true, false); }
					if (opts.page) {
						var page = parseInt(opts.page, 10);
						if (page > p.lastpage) { page = p.lastpage; }
						if (page < 1) { page = 1; }
						p.page = page;
						if (gridSelf.prevRowHeight) {
							gridSelf.bDiv.scrollTop = (page - 1) * gridSelf.prevRowHeight * p.rowNum;
						} else {
							gridSelf.bDiv.scrollTop = 0;
						}
					}
					if (gridSelf.prevRowHeight && p.scroll && opts.page === undefined) {
						delete p.lastpage;
						gridSelf.populateVisible.call(self);
					} else {
						gridSelf.populate.call(self);
					}
					if (p._inlinenav === true) { $self.jqGrid("showAddEditButtons", false); }
					return false;
				})
				.dblclick(function (e) {
					var $td = getTdFromTarget.call(this, e.target), $tr = $td.parent();
					// TODO: replace ts below to method which use $(this) in case of click
					// on the grid and the table of the main grid if one click inside the FROZEN column
					if ($td.length > 0 && !feedback.call(ts, "ondblClickRow", $tr.attr("id"), $tr[0].rowIndex, $td[0].cellIndex, e)) {
						return false; // e.preventDefault() and e.stopPropagation() together
					}
				})
				.bind("contextmenu", function (e) {
					var $td = getTdFromTarget.call(this, e.target), $tr = $td.parent(), rowid = $tr.attr("id");
					if ($td.length === 0) { return; }
					if (!p.multiselect) {
						// TODO: replace $self0 and ts below to method which use $(this) in case of click
						// on the grid and the table of the main grid if one click inside the FROZEN column
						setSelection.call($self0, rowid, true, e);
					}
					if (!feedback.call(ts, "onRightClickRow", rowid, $tr[0].rowIndex, $td[0].cellIndex, e)) {
						return false; // e.preventDefault() and e.stopPropagation() together
					}
				});
			grid.bDiv = document.createElement("div");
			if (isMSIE) { if (String(p.height).toLowerCase() === "auto") { p.height = "100%"; } }
			$(grid.bDiv)
				.append($("<div style='position:relative;'></div>").append("<div></div>").append(ts))
				.addClass("ui-jqgrid-bdiv")
				.css({ height: p.height + (isNaN(p.height) ? "" : "px"), width: (grid.width) + "px" })
				.scroll(grid.scrollGrid);
			if (p.maxHeight) {
				$(grid.bDiv).css("max-height", p.maxHeight + (isNaN(p.maxHeight) ? "" : "px"));
			}
			$self0.css({ width: "1px" });
			if (!$.support.tbody) { //IE
				if ($(">tbody", ts).length === 2) { $(">tbody:gt(0)", ts).remove(); }
			}
			if (p.multikey) {
				$(grid.bDiv).bind(jgrid.msie ? "selectstart" : "mousedown", function () { return false; });
			}
			if (hg) { $(grid.bDiv).hide(); }
			grid.cDiv = document.createElement("div");
			var visibleGridIcon = getIcon("gridMinimize.visible"), hiddenGridIcon = getIcon("gridMinimize.hidden"), showhide = getDef("showhide"),
				arf = p.hidegrid === true ?
						$("<a role='link' class='" + getGuiStyles("titleButton", "ui-jqgrid-titlebar-close") + "'" + (showhide ? " title='" + showhide + "'" : "") + "/>")
							.hover(
								function () { arf.addClass(hoverStateClasses); },
								function () { arf.removeClass(hoverStateClasses); }
							)
							.append("<span class='" + visibleGridIcon + "'></span>") :
						"";
			$(grid.cDiv).append("<span class='ui-jqgrid-title'>" + p.caption + "</span>")
				.append(arf)
				.addClass(getGuiStyles("gridTitle", "ui-jqgrid-titlebar ui-jqgrid-caption" + (dir === "rtl" ? "-rtl " : " ") + topClasses));
			$(grid.cDiv).insertBefore(grid.hDiv);
			if (p.toolbar[0]) {
				grid.uDiv = document.createElement("div");
				if (p.toolbar[1] === "top") {
					$(grid.uDiv).insertBefore(grid.hDiv);
				} else if (p.toolbar[1] === "bottom") {
					$(grid.uDiv).insertAfter(grid.hDiv);
				}
				var toolbarUpperClasses = getGuiStyles("toolbarUpper", "ui-userdata");
				if (p.toolbar[1] === "both") {
					grid.ubDiv = document.createElement("div");
					$(grid.uDiv).addClass(toolbarUpperClasses).attr("id", "t_" + p.id).insertBefore(grid.hDiv);
					$(grid.ubDiv).addClass(getGuiStyles("toolbarBottom", "ui-userdata")).attr("id", "tb_" + p.id).insertAfter(grid.hDiv);
					if (hg) { $(grid.ubDiv).hide(); }
				} else {
					$(grid.uDiv).width(grid.width).addClass(toolbarUpperClasses).attr("id", "t_" + p.id);
				}
				if (hg) { $(grid.uDiv).hide(); }
			}
			if (typeof p.datatype === "string") {
				p.datatype =  p.datatype.toLowerCase();
			}
			if (p.toppager) {
				p.toppager = p.id + "_toppager";
				grid.topDiv = $("<div id='" + p.toppager + "'></div>")[0];
				$(grid.topDiv)
					.addClass(getGuiStyles("pager.pager", "ui-jqgrid-toppager" + (p.caption ? "" : " " + topClasses)))
					.css({ width: grid.width + "px" })
					.insertBefore(grid.hDiv);
				setPager.call(ts, p.toppager, "_t");
				p.toppager = "#" + jqID(p.toppager); // hold ESCAPED id selector in the toppager option
			} else if (p.pager === "" && !p.scroll) {
				p.rowNum = p.maxRowNum;
			}
			if (p.footerrow) {
				grid.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0];
				hb = $("<div class='ui-jqgrid-hbox" + (dir === "rtl" ? "-rtl" : "") + "'></div>");
				$(grid.sDiv).append(hb).width(grid.width).insertAfter(grid.hDiv);
				$(hb).append(tfoot);
				grid.footers = $(".ui-jqgrid-ftable", grid.sDiv)[0].rows[0].cells;
				if (p.rownumbers) { grid.footers[0].className = getGuiStyles("rowNum", "jqgrid-rownum"); }
				if (hg) { $(grid.sDiv).hide(); }
			}
			hb = null;
			if (p.caption) {
				var tdt = p.datatype;
				if (p.hidegrid === true) {
					$(".ui-jqgrid-titlebar-close", grid.cDiv).click(function (e) {
						var elems = ".ui-jqgrid-bdiv,.ui-jqgrid-hdiv,.ui-jqgrid-pager,.ui-jqgrid-sdiv", self = this;
						if (p.toolbar[0] === true) {
							if (p.toolbar[1] === "both") {
								elems += ",#" + jqID($(grid.ubDiv).attr("id"));
							}
							elems += ",#" + jqID($(grid.uDiv).attr("id"));
						}
						var counter = $(elems, p.gView).length;
						if (p.toppager) {
							elems += "," + p.toppager;
						}

						if (p.gridstate === "visible") {
							$(elems, p.gBox).slideUp("fast", function () {
								counter--;
								if (counter === 0) {
									$("span", self).removeClass(visibleGridIcon).addClass(hiddenGridIcon);
									p.gridstate = "hidden";
									if ($(p.gBox).hasClass("ui-resizable")) { $(".ui-resizable-handle", p.gBox).hide(); }
									$(grid.cDiv).addClass(bottomClasses);
									if (!hg) { feedback.call(ts, "onHeaderClick", p.gridstate, e); }
								}
							});
						} else if (p.gridstate === "hidden") {
							$(grid.cDiv).removeClass(bottomClasses);
							$(elems, p.gBox).slideDown("fast", function () {
								counter--;
								if (counter === 0) {
									$("span", self).removeClass(hiddenGridIcon).addClass(visibleGridIcon);
									if (hg) { p.datatype = tdt; populate.call(ts); hg = false; }
									p.gridstate = "visible";
									if ($(p.gBox).hasClass("ui-resizable")) { $(".ui-resizable-handle", p.gBox).show(); }
									if (!hg) { feedback.call(ts, "onHeaderClick", p.gridstate, e); }
								}
							});
						}
						return false;
					});
					if (hg) { p.datatype = "local"; $(".ui-jqgrid-titlebar-close", grid.cDiv).trigger("click"); }
				}
			} else {
				$(grid.cDiv).hide();
				$(grid.cDiv).nextAll("div:visible").first().addClass("ui-corner-top"); // set on top toolbar or toppager or on hDiv
			}
			$(grid.hDiv).after(grid.bDiv);
			grid.eDiv = $("<div class='" + getGuiStyles("gridError", "ui-jqgrid-errorbar ui-jqgrid-errorbar-" + dir) +
				"' style='display:none;'>" +
				//($self0.jqGrid("isBootstrapGuiStyle") ? "<button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>" : "") +
				"<span class='" + getGuiStyles("gridErrorText", "ui-jqgrid-error") + "'></span></div>")[0];
			$(grid.hDiv).after(grid.eDiv);
			$(eg)
				.click(myResizerClickHandler)
				.dblclick(function (e) { // it's still needed for Firefox
					var $resizer = $(p.rs),
						resizerOffset = $resizer.offset(),
						iColIndex = $resizer.data("idx"),
						delta = $resizer.data("delta"),
						cm = p.colModel[iColIndex],
						pageX = $(this).data("pageX") || $resizer.data("pageX");

					if (pageX == null || cm == null) {
						return false;
					}
					var arPageX = String(pageX).split(";"),
						pageX1 = parseFloat(arPageX[0]),
						pageX2 = parseFloat(arPageX[1]);
					if (arPageX.length === 2 && (Math.abs(pageX1 - pageX2) > 5 || Math.abs(e.pageX - pageX1) > 5 || Math.abs(e.pageX - pageX2) > 5)) {
						return false;
					}

					if (feedback.call(ts, "resizeDblClick", iColIndex, cm) &&
							(resizerOffset.left - 1 <= e.pageX + delta && e.pageX + delta <= resizerOffset.left + $resizer.outerWidth() + 1) && cm.autoResizable) {
						$j.autoResizeColumn.call($self0, iColIndex);
					}
					feedback.call(ts, "afterResizeDblClick", { iCol: iColIndex, cm: cm, cmName: cm.name });
					return false;
				});
			if (!p.pager) {
				$(grid.cDiv).nextAll("div:visible").filter(":last").addClass(bottomClasses); // set on bottom toolbar or footer (sDiv) or on bDiv
			}
			$(".ui-jqgrid-labels", grid.hDiv)
				.bind("selectstart", function () { return false; });
			ts.formatCol = formatCol;
			ts.sortData = sortData;
			ts.updatepager = updatepager;
			ts.refreshIndex = refreshIndex;
			ts.setHeadCheckBox = setHeadCheckBox;
			ts.fixScrollOffsetAndhBoxPadding = fixScrollOffsetAndhBoxPadding;
			ts.constructTr = constructTr;
			ts.formatter = formatter;
			extend(grid, { populate: populate, emptyRows: emptyRows, beginReq: beginReq, endReq: endReq });
			ts.addXmlData = readInput;
			ts.addJSONData = readInput;
			ts.rebuildRowIndexes = rebuildRowIndexes;
			ts.grid.cols = ts.rows[0].cells;
			feedback.call(ts, "onInitGrid");

			// fix to allow to load TreeGrid using datatype:"local", data:mydata instead of treeGrid: true
			if (p.treeGrid && p.datatype === "local" && p.data != null && p.data.length > 0) {
				p.datatype = "jsonstring";
				p.datastr = p.data;
				p.data = [];
			}

			populate.call(ts);
			p.hiddengrid = false;
		});
	};
	var base = $.fn.jqGrid;
	jgrid.extend({
		getGridRes: function (defaultPropName) {
			// The problem is the following: there are already exist some properties of $.jgrid which can be used
			// to set some defaults of jqGrid. It's: $.jgrid.defaults, $.jgrid.search, $.jgrid.edit, $.jgrid.view, $.jgrid.del, $.jgrid.nav
			// $.jgrid.formatter, $.jgrid.errors, $.jgrid.col
			// Existing programs could use the objects to set either language specific settings (which are now moved under locales part)
			// be language independent. Thus one should combine language specific settings with the user's settings and overwrite the settings
			// with grid specific settings if the settings exist.
			//
			// For example:
			//      p.loadtext (grid option) = "..."
			//      $.jgrid.defaults.loadtext = "........."
			//      p.locales = "en-US",
			//      $.jgrid.locales["en-US"].defaults.loadtext = "Loading...";
			//
			//      p.edit.addCaption = "Add Invoice"
			//      $.jgrid.edit.addCaption = "Add"
			//      p.locales = "en-US",
			//      $.jgrid.locales["en-US"].edit.addCaption = "Add Record";
			//
			// In the case the grid option p.loadtext = "..." need be used. If p.loadtext is not defined then $.jgrid.defaults.loadtext. If
			// $.jgrid.defaults.loadtext is not defined explicitly by the user, then language settings will be used

			var $t = this[0];
			if (!$t || !$t.grid || !$t.p) { return null; }
			// One need get defaultPropName from $.jgrid root first. If no value exist then one should get it from $.jgrid[reg] root
			var res = jgrid.getRes(locales[$t.p.locale], defaultPropName) || jgrid.getRes(locales["en-US"], defaultPropName),
				resDef = jgrid.getRes(jgrid, defaultPropName);
			return typeof res === "object" && res !== null && !$.isArray(res) ?
					$.extend(true, {}, res, resDef || {}) : // !!! Expensive and can be slow !!!
					resDef !== undefined ? resDef : res;
		},
		getGuiStyles: function (path, jqClasses) {
			var $t = this instanceof $ && this.length > 0 ? this[0] : this;
			if (!$t || !$t.grid || !$t.p) { return ""; }
			var p = $t.p, guiStyle = p.guiStyle || jgrid.defaults.guiStyle || "jQueryUI",
				guiClasses = jgrid.getRes(jgrid.guiStyles[guiStyle], path), baseGuiStyle;
			if (guiClasses === undefined) {
				baseGuiStyle = jgrid.getRes(jgrid.guiStyles[guiStyle], "baseGuiStyle");
				if (typeof baseGuiStyle === "string") {
					guiClasses = jgrid.getRes(jgrid.guiStyles[baseGuiStyle], path);
				}
			}
			return jgrid.mergeCssClasses(guiClasses || "", jqClasses || "");
		},
		isBootstrapGuiStyle: function () {
			return $.inArray("ui-jqgrid-bootstrap", $(this).jqGrid("getGuiStyles", "gBox").split(" ")) >= 0;
		},
		getIconRes: function (path) {
			var $t = this instanceof $ && this.length > 0 ? this[0] : this;
			if (!$t || !$t.p) { return ""; }

			var p = $t.p, iconSet = jgrid.icons[p.iconSet],
				getIcon = function (basePath, path) {
					var pathParts = path.split("."), root, n = pathParts.length, part, i, classes = [];
					basePath = typeof basePath === "string" ? jgrid.icons[basePath] : basePath;
					if (basePath == null) {
						return ""; // error unknown iconSet
					}
					root = basePath;
					if (root.common) {
						classes.push(root.common);
					}
					for (i = 0; i < n; i++) {
						part = pathParts[i];
						if (!part) {
							break;
						}
						root = root[part];
						if (root === undefined) {
							if (part === "common") { break; }
							return ""; // error unknown icon path
						}
						if (typeof root === "string") {
							classes.push(root);
							break;
						}
						if (root != null && root.common) {
							classes.push(root.common);
						}
					}
					return jgrid.mergeCssClasses.apply(this, classes);
				};

			if (iconSet == null) {
				return "";
			}
			var classes = getIcon(p.iconSet, path);
			if (classes === "" && iconSet.baseIconSet != null) {
				classes = getIcon(iconSet.baseIconSet, path);
			}
			return classes || "";
		},
		isInCommonIconClass: function (testClass) {
			var $t = this instanceof $ && this.length > 0 ? this[0] : this;
			if (!$t || !$t.p) { return ""; }

			var p = $t.p, iconSet = jgrid.icons[p.iconSet];
			if (iconSet == null) {
				return false;
			}
			var commonClasses = iconSet.common;
			if (commonClasses === undefined) {
				if (iconSet.baseIconSet == null) {
					return false;
				}
				iconSet = jgrid.icons[iconSet.baseIconSet];
				if (iconSet == null) {
					return false;
				}
				commonClasses = iconSet.common;
			}
			return typeof commonClasses === "string" && $.inArray(testClass, commonClasses.split(" ")) >= 0;
		},
		getGridParam: function (pName) {
			var $t = this[0];
			if (!$t || !$t.grid) { return null; }
			if (!pName) { return $t.p; }
			return $t.p[pName] !== undefined ? $t.p[pName] : null;
		},
		setGridParam: function (newParams, overwrite) {
			return this.each(function () {
				var self = this;
				if (overwrite == null) {
					overwrite = false;
				}
				if (self.grid && typeof newParams === "object") {
					if (overwrite === true) {
						var params = $.extend({}, self.p, newParams);
						self.p = params;
					} else {
						$.extend(true, self.p, newParams);
					}
				}
			});
		},
		abortAjaxRequest: function () {
			return this.each(function () {
				var self = this;
				if (self.p.jqXhr != null) {
					self.p.jqXhr.abort();
				}
				self.grid.endReq.call(self);
			});
		},
		getGridRowById: function (rowid) {
			if (rowid == null) {
				return null;
			}
			var row, rowId = rowid.toString();
			this.each(function () {
				var i, rows = this.rows, tr, rowIndex;
				if (this.p.rowIndexes != null) {
					rowIndex = this.p.rowIndexes[rowId];
					tr = rows[rowIndex];
					if (tr && tr.id === rowId) {
						row = tr;
					}
				}
				if (!row) {
					try {
						//row = this.rows.namedItem( rowid );
						i = rows.length;
						while (i--) {
							tr = rows[i];
							if (rowId === tr.id) {
								row = tr;
								break;
							}
						}
					} catch (e) {
						row = $(this.grid.bDiv).find("#" + jqID(rowid));
						row = row.length > 0 ? row[0] : null;
					}
				}
			});
			return row;
		},
		getDataIDs: function () {
			var ids = [];
			this.each(function () {
				var rows = this.rows, len = rows.length, i, tr;
				if (len && len > 0) {
					for (i = 0; i < len; i++) {
						tr = rows[i];
						if ($(tr).hasClass("jqgrow")) {
							ids.push(tr.id);
						}
					}
				}
			});
			return ids;
		},
		/*selectDeselectRow: function (tr, toSelect, notUpdateParam) {
			return this.each(function () {
				var $t = this, p = $t.p, rowId = tr.id, iSel, getGuiStyles = base.getGuiStyles,
					highlightClass = getGuiStyles.call($($t), "states.select"), frozenRows,
					selectUnselectRow = function (tr1, toSelect) {
						var method = toSelect ? "addClass" : "removeClass", iColCb = p.iColByName.cb,
							attributes = toSelect ?
									{ "aria-selected": "true", tabindex: "0" } :
									{ "aria-selected": "false", tabindex: "-1" },
							selectUnselectRowInTable = function (tr) {
								$(tr)[method](highlightClass).attr(attributes);
								if (iColCb !== undefined) { // p.multiselect or p.multiselectCheckboxes
									$(tr.cells[iColCb]).children("input.cbox").prop("checked", toSelect);
								}
							};
						selectUnselectRowInTable(tr1);
						if (frozenRows) {
							selectUnselectRowInTable(frozenRows[tr1.rowIndex]);
						}
					};
				if (!$t.grid || !p || rowId === "") { return; }
				frozenRows = $t.grid.fbRows;
				selectUnselectRow(tr, toSelect);
				if (!notUpdateParam) {
					iSel = $.inArray(rowId, p.selarrrow);
					if (iSel < 0 && toSelect) {
						// select
						p.selarrrow.push(rowId);
						p.selrow = rowId;
					} else if (iSel >= 0 && !toSelect) {
						// deselect
						p.selarrrow.splice(iSel, 1); // remove from array
						p.selrow = p.selarrrow.length >= 0 ? p.selarrrow[0] : null;
					}
				}
			});
		},*/
		setSelection: function (selection, onsr, e) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, stat, pt, ner, ia, tpsr, csr, $tr,
					getGuiStyles = base.getGuiStyles, getGridRowById = base.getGridRowById,
					highlightClass = getGuiStyles.call($self, "states.select"),
					disabledClasses = getGuiStyles.call($self, "states.disabled"),
					frozenRows = $t.grid.fbRows,
					selectUnselectRow = function (tr1, toSelect) {
						var method = toSelect ? "addClass" : "removeClass", iColCb = p.iColByName.cb,
							attributes = toSelect ?
									{ "aria-selected": "true", tabindex: "0" } :
									{ "aria-selected": "false", tabindex: "-1" },
							selectUnselectRowInTable = function (tr) {
								$(tr)[method](highlightClass).attr(attributes);
								if (iColCb !== undefined) { // p.multiselect or p.multiselectCheckboxes
									$(tr.cells[iColCb]).children("input.cbox").prop("checked", toSelect);
								}
							};
						selectUnselectRowInTable(tr1);
						if (frozenRows) {
							selectUnselectRowInTable(frozenRows[tr1.rowIndex]);
						}
					};
				if (selection === undefined) { return; }
				onsr = onsr === false ? false : true;
				if (e != null) {
					// try to get tr from e.target
					$tr = $(e.target).closest("tr.jqgrow");
					if ($tr.length > 0) {
						pt = $tr[0];
						if (frozenRows/* && !$.contains($t, pt)*/) {
							// The event could be inside of frozen div.
							// Thus tr could be the same as trFrozen (frozenRows[pt.rowIndex])
							// We normalize it based on the rowIndex.
							pt = $t.rows[pt.rowIndex];
						}
					}
				}
				if (pt == null) {
					pt = getGridRowById.call($self, selection);
				}
				if (!pt || !pt.className || pt.className.indexOf(disabledClasses) > -1) { return; }
				function scrGrid(tr, bDiv) {
					var ch = bDiv.clientHeight,
						st = bDiv.scrollTop,
						rpos = $(tr).position().top,
						rh = tr.clientHeight;
					if (rpos + rh >= ch + st) {
						bDiv.scrollTop = rpos - (ch + st) + rh + st;
					} else if (rpos < ch + st) {
						if (rpos < st) {
							bDiv.scrollTop = rpos;
						}
					}
				}
				if (p.scrollrows === true) {
					ner = getGridRowById.call($self, selection);
					if (ner != null) {
						ner = ner.rowIndex;
						if (ner >= 0) {
							scrGrid($t.rows[ner], $t.grid.bDiv);
						}
					}
				}
				if (!p.multiselect) {
					if (pt.className !== "ui-subgrid") {
						if (p.selrow !== pt.id) {
							if (p.selrow !== null) {
								csr = getGridRowById.call($self, p.selrow);
								if (csr) {
									selectUnselectRow(csr, false);
								}
							}
							selectUnselectRow(pt, true);
							stat = true;
						} else {
							stat = false;
						}
						p.selrow = pt.id;
						if (onsr) {
							feedback.call($t, "onSelectRow", pt.id, stat, e);
						}
					}
				} else {
					//unselect selectall checkbox when deselecting a specific row
					$t.setHeadCheckBox(false);
					p.selrow = pt.id;
					ia = $.inArray(p.selrow, p.selarrrow);
					if (ia === -1) {
						stat = true;
						p.selarrrow.push(p.selrow);
					} else if (jgrid.detectRowEditing.call($t, pt.id) !== null) {
						// the row is editing and selected now. The checkbox is clicked
						stat = true; // set to force the checkbox stay selected
					} else {
						// deselect only if the row is not in editing mode
						stat = false;
						p.selarrrow.splice(ia, 1);
						tpsr = p.selarrrow[0];
						p.selrow = (tpsr === undefined) ? null : tpsr;
					}
					if (pt.className !== "ui-subgrid") {
						selectUnselectRow(pt, stat);
					}
					if (onsr) {
						feedback.call($t, "onSelectRow", pt.id, stat, e);
					}
				}
			});
		},
		resetSelection: function (rowid) {
			return this.each(function () {
				var $t = this, $self = $(this), p = $t.p, row,
					getGuiStyles = base.getGuiStyles, getGridRowById = base.getGridRowById,
					highlightClass = getGuiStyles.call($self, "states.select"), //"ui-state-highlight"
					cellEditCellHighlightClasses = "edit-cell " + highlightClass,
					cellEditRowHighlightClasses = "selected-row " + getGuiStyles.call($self, "states.hover"),
					iColCb = p.iColByName.cb,
					multiselectChechboxes = iColCb !== undefined,
					frozenRows = $t.grid.fbRows,
					deselectRow = function (tr) {
						var method = "removeClass", frozenRow,
							attributes = { "aria-selected": "false", tabindex: "-1" };
						$(tr)[method](highlightClass).attr(attributes);
						if (multiselectChechboxes) { // p.multiselect or p.multiselectCheckboxes
							$(tr.cells[iColCb]).children("input.cbox").prop("checked", false);
						}
						if (frozenRows) {
							frozenRow = frozenRows[tr.rowIndex];
							$(frozenRow)[method](highlightClass).attr(attributes);
							if (multiselectChechboxes) { // p.multiselect or p.multiselectCheckboxes
								$(frozenRow.cells[iColCb]).children("input.cbox").prop("checked", false);
							}
						}
					};
				if (rowid !== undefined) {
					row = getGridRowById.call($self, rowid);
					deselectRow(row);
					if (multiselectChechboxes) {
						$t.setHeadCheckBox(false);
						var ia = $.inArray(rowid, p.selarrrow);
						if (ia !== -1) {
							p.selarrrow.splice(ia, 1);
						}
					}
				} else if (!p.multiselect) {
					if (p.selrow) {
						row = getGridRowById.call($self, p.selrow);
						deselectRow(row);
						p.selrow = null;
					}
				} else {
					$($t.rows).each(function () {
						var iSel = $.inArray(this.id, p.selarrrow);
						if (iSel !== -1) {
							deselectRow(this);
							p.selarrrow.splice(iSel, 1);
						}
					});
					$t.setHeadCheckBox(false);
					if (!p.multiPageSelection) {
						clearArray(p.selarrrow); // p.selarrrow = [];
					}
					p.selrow = null;
				}
				if (p.cellEdit === true) {
					if (parseInt(p.iCol, 10) >= 0 && parseInt(p.iRow, 10) >= 0) {
						row = $t.rows[p.iRow];
						if (row != null) {
							$(row.cells[p.iCol]).removeClass(cellEditCellHighlightClasses);
							$(row).removeClass(cellEditRowHighlightClasses);
						}
						if (frozenRows) {
							row = frozenRows[p.iRow];
							if (row != null) {
								$(row.cells[p.iCol]).removeClass(cellEditCellHighlightClasses);
								$(row).removeClass(cellEditRowHighlightClasses);
							}
						}
					}
				}
				clearArray(p.savedRow); // p.savedRow = [];
			});
		},
		getRowData: function (rowid, options) {
			// TODO: add additional parameter, which will inform whether the output data need be in formatted or unformatted form
			var res = {}, resall;
			if (typeof rowid === "object") {
				options = rowid;
				rowid = undefined;
			}
			options = options || {};
			this.each(function () {
				var $t = this, p = $t.p, getall = false, ind, len = 2, j = 0, rows = $t.rows, i, $td, cm, nm, td;
				if (rowid === undefined) {
					getall = true;
					resall = [];
					len = rows.length;
				} else {
					ind = base.getGridRowById.call($($t), rowid);
					if (!ind) { return res; }
				}
				while (j < len) {
					if (getall) { ind = rows[j]; }
					if ($(ind).hasClass("jqgrow")) {
						$td = $("td[role=gridcell]", ind);
						for (i = 0; i < $td.length; i++) {
							cm = p.colModel[i];
							nm = cm.name;
							if (nm !== "cb" && nm !== "subgrid" && nm !== "rn" && cm.formatter !== "actions" && (!options.skipHidden || !cm.hidden)) {
								td = $td[i];
								if (p.treeGrid === true && nm === p.ExpandColumn) {
									res[nm] = htmlDecode($("span", td).first().html());
								} else {
									try {
										res[nm] = $.unformat.call($t, td, { rowId: ind.id, colModel: cm }, i);
									} catch (exception) {
										res[nm] = htmlDecode($(td).html());
									}
								}
							}
						}
						if (options.includeId && (p.keyName === false || res[p.keyName] == null)) {
							res[p.prmNames.id] = stripPref(p.idPrefix, ind.id);
						}
						if (getall) { resall.push(res); res = {}; }
					}
					j++;
				}
			});
			return resall || res;
		},
		delRowData: function (rowid) {
			var success = false, rowInd, ia, nextRow;
			this.each(function () {
				var $t = this, p = $t.p;
				rowInd = base.getGridRowById.call($($t), rowid);
				if (!rowInd) { return false; }
				if (p.subGrid) {
					nextRow = $(rowInd).next();
					if (nextRow.hasClass("ui-subgrid")) {
						nextRow.remove();
					}
				}
				$(rowInd).remove();
				p.records--;
				p.reccount--;
				$t.updatepager(true, false);
				success = true;
				if (p.multiselect) {
					ia = $.inArray(rowid, p.selarrrow);
					if (ia !== -1) { p.selarrrow.splice(ia, 1); }
				}
				if (p.multiselect && p.selarrrow.length > 0) {
					p.selrow = p.selarrrow[p.selarrrow.length - 1];
				} else if (p.selrow === rowid) {
					p.selrow = null;
				}
				if (p.datatype === "local") {
					var id = stripPref(p.idPrefix, rowid),
						pos = p._index[id];
					if (pos !== undefined) {
						p.data.splice(pos, 1);
						$t.refreshIndex();
					}
				}
				$t.rebuildRowIndexes();
				if (p.altRows === true && success && !$($t).jqGrid("isBootstrapGuiStyle")) {
					var cn = p.altclass, frozenRows = $t.grid.fbRows;
					$($t.rows).each(function (i) {
						var $row = $(this);
						if (frozenRows) {
							$row = $row.add(frozenRows[this.rowIndex]);
						}
						$row[i % 2 === 0 ? "addClass" : "removeClass"](cn);
					});
				}
				feedback.call($t, "afterDelRow", rowid);
			});
			return success;
		},
		setRowData: function (rowid, data, cssp) {
			// TODO: add additional parameter to setRowData which inform that input data is in formatted or unformatted form
			var success = true;
			this.each(function () {
				var t = this, p = t.p, ind, cp = typeof cssp, lcdata = {};
				if (!t.grid) { return false; }
				ind = base.getGridRowById.call($(t), rowid);
				if (!ind) { return false; }
				if (data) {
					try {
						var id = stripPref(p.idPrefix, rowid), key, pos = p._index[id], newData = {},
							oData = pos != null ? p.data[pos] : undefined;
						$(p.colModel).each(function (i) {
							var cm = this, nm = cm.name, vl = getAccessor(data, nm);
							if (vl !== undefined) {
								if (p.datatype === "local" && oData != null) {
									vl = convertOnSaveLocally.call(t, vl, cm, oData[nm], id, oData, i);
									if ($.isFunction(cm.saveLocally)) {
										cm.saveLocally.call(t, { newValue: vl, newItem: lcdata, oldItem: oData, id: id, cm: cm, cmName: nm, iCol: i });
									} else {
										lcdata[nm] = vl;
									}
								}
								newData[nm] = vl;
							}
						});
						$(p.colModel).each(function (i) {
							var cm = this, nm = cm.name, title, vl = getAccessor(data, nm), $td = $(ind.cells[i]);
							if (vl !== undefined) {
								if (p.datatype === "local" && oData != null) {
									vl = lcdata[nm];
								}
								title = cm.title ? { "title": vl } : {};
								vl = t.formatter(rowid, vl, i, data, "edit", newData);
								var $dataFiled = $td;
								if (p.treeGrid === true && nm === p.ExpandColumn) {
									$dataFiled = $dataFiled.children("span.cell-wrapperleaf,span.cell-wrapper").first();
								}
								$dataFiled.html(vl);
								$td.attr(title);
								if (p.frozenColumns) {
									$dataFiled = $(t.grid.fbRows[ind.rowIndex].cells[i]);
									if (p.treeGrid === true && nm === p.ExpandColumn) {
										$dataFiled = $dataFiled.children("span.cell-wrapperleaf,span.cell-wrapper").first();
									}
									$dataFiled.html(vl).attr(title);
								}
							}
						});
						if (p.datatype === "local") {
							if (p.treeGrid) {
								for (key in p.treeReader) {
									if (p.treeReader.hasOwnProperty(key)) {
										delete lcdata[p.treeReader[key]];
									}
								}
							}
							if (oData !== undefined) {
								p.data[pos] = $.extend(true, oData, lcdata);
							}
						}
						feedback.call(t, "afterSetRow", {
							rowid: rowid,
							inputData: data,
							iData: pos,
							iRow: ind.rowIndex,
							tr: ind,
							localData: lcdata,
							cssProp: cssp
						});
					} catch (exception) {
						success = false;
					}
				}
				if (success) {
					if (cp === "string") { $(ind).addClass(cssp); } else if (cssp !== null && cp === "object") { $(ind).css(cssp); }
					//$(t).triggerHandler("jqGridAfterGridComplete");
				}
			});
			return success;
		},
		addRowData: function (rowid, rdata, pos, src) {
			// TODO: add an additional parameter, which will inform whether the input data rdata is in formatted or unformatted form
			if ($.inArray(pos, ["first", "last", "before", "after", "afterSelected", "beforeSelected"]) < 0) { pos = "last"; }
			var success = false, nm, row, sind, i, v, aradd, cnm, cn, data, cm, id;
			if (rdata) {
				if ($.isArray(rdata)) {
					aradd = true;
					//pos = "last";
					cnm = rowid;
				} else {
					rdata = [rdata];
					aradd = false;
				}
				this.each(function () {
					var t = this, p = t.p, datalen = rdata.length, $self = $(t), rows = t.rows, k = 0,
						getGridRowById = base.getGridRowById, colModel = p.colModel, lcdata,
						additionalProperties = p.additionalProperties;
					if (!aradd) {
						if (rowid !== undefined) {
							rowid = String(rowid);
						} else {
							rowid = randId();
							if (p.keyName !== false) {
								cnm = p.keyName;
								if (rdata[0][cnm] !== undefined) { rowid = rdata[0][cnm]; }
							}
						}
					}
					cn = p.altclass;
					// TODO: call jgrid.parseDataToHtml once with ALL data,
					// TODO: set correct the altrow classes inside of jgrid.parseDataToHtml (use params)
					while (k < datalen) {
						data = rdata[k];
						row = [];
						if (aradd) {
							try {
								rowid = data[cnm];
								if (rowid === undefined) {
									rowid = randId();
								}
							} catch (exception) { rowid = randId(); }
							//cna = p.altRows === true ? (rows.length - 1) % 2 === 0 ? cn : "" : "";
						}
						id = rowid;
						lcdata = {};
						for (i = 0; i < colModel.length; i++) {
							cm = colModel[i];
							nm = cm.name;
							if (nm !== "rn" && nm !== "cb" && nm !== "subgrid") {
								v = convertOnSaveLocally.call(t, data[nm], cm, undefined, id, {}, i);
								if ($.isFunction(cm.saveLocally)) {
									cm.saveLocally.call(t, { newValue: v, newItem: lcdata, oldItem: {}, id: id, cm: cm, cmName: nm, iCol: i });
								} else if (v !== undefined) {
									lcdata[nm] = v;
								}
							}
						}
						for (i = 0; i < additionalProperties.length; i++) {
							nm = additionalProperties[i];
							if (typeof nm === "object" && nm.hasOwnProperty("name")) {
								nm = nm.name;
							}
							v = getAccessor(data, nm);
							if (v !== undefined) {
								lcdata[nm] = v;
							}
						}

						if (p.datatype === "local") {
							lcdata[p.localReader.id] = id;
							p._index[id] = p.data.length;
							p.data.push(lcdata);
						}
						row = jgrid.parseDataToHtml.call(t, 1, [rowid], [data]);
						row = row.join("");
						if (rows.length === 0) {
							$(t.tBodies[0]).append(row);
						} else {
							if (pos === "afterSelected" || pos === "beforeSelected") {
								if (src === undefined && p.selrow !== null) {
									src = p.selrow;
									pos = (pos === "afterSelected") ? "after" : "before";
								} else {
									pos = (pos === "afterSelected") ? "last" : "first";
								}
							}
							switch (pos) {
							case "last":
								$(rows[rows.length - 1]).after(row);
								sind = rows.length - 1;
								break;
							case "first":
								$(rows[0]).after(row);
								sind = 1;
								break;
							case "after":
								sind = getGridRowById.call($self, src);
								if (sind) {
									if ($(rows[sind.rowIndex + 1]).hasClass("ui-subgrid")) {
										$(rows[sind.rowIndex + 1]).after(row);
										sind = sind.rowIndex + 2;
									} else {
										$(sind).after(row);
										sind = sind.rowIndex + 1;
									}
								}
								break;
							case "before":
								sind = getGridRowById.call($self, src);
								if (sind) {
									$(sind).before(row);
									sind = sind.rowIndex - 1;
								}
								break;
							}
						}
						if (p.subGrid === true) {
							base.addSubGrid.call($self, p.iColByName.subgrid, sind);
						}
						p.records++;
						p.reccount++;
						if (p.lastpage === 0) {
							p.lastpage = 1;
						}
						feedback.call(t, "afterAddRow", {
							rowid: rowid,
							inputData: rdata,
							position: pos,
							srcRowid: src,
							iRow: sind,
							localData: lcdata,
							iData: p.data.length - 1
						});
						k++;
					}
					if (p.altRows === true && !aradd && !$self.jqGrid("isBootstrapGuiStyle")) {
						// even in case of usage correct parameter for parseDataToHtml
						// one will need to reset the classes if the row will be inserted not at the end of jqGrid
						if (pos === "last") {
							if ((rows.length - 1) % 2 === 0) { $(rows[rows.length - 1]).addClass(cn); }
						} else {
							$(rows).each(function (iRow) {
								if (iRow % 2 === 1) {
									$(this).addClass(cn);
								} else {
									$(this).removeClass(cn);
								}
							});
						}
					}
					t.rebuildRowIndexes(); // we can remove the call later if pos==="last"
					t.updatepager(true, true);
					success = true;
				});
			}
			return success;
		},
		footerData: function (action, data, format) {
			// TODO: add an additional parameter, which will inform whether the input data "data" is in formatted or unformatted form
			var success = false, res = {};
			function isEmpty(obj) {
				var i;
				for (i in obj) {
					if (obj.hasOwnProperty(i)) { return false; }
				}
				return true;
			}
			if (action == null) { action = "get"; }
			if (typeof format !== "boolean") { format = true; }
			action = action.toLowerCase();
			this.each(function () {
				var t = this, p = t.p, vl, $td, nm, iCol;
				if (!t.grid || !p.footerrow) { return false; }
				if (action === "set" && isEmpty(data)) { return false; }
				success = true;
				var ftable = $(t.grid.sDiv)
						.children(".ui-jqgrid-hbox")
						.children(".ui-jqgrid-ftable")[0];
				if (ftable == null || ftable.rows == null) { return false; }
				var cells = ftable.rows[0].cells,
					fcells = t.grid.fsDiv == null ? {} : t.grid.fsDiv.children(".ui-jqgrid-ftable")[0].rows[0].cells;
				for (nm in data) {
					iCol = p.iColByName[nm];
					if (data.hasOwnProperty(nm) && iCol !== undefined) {
						if (action === "get") {
							res[nm] = $(cells[iCol]).html();
						} else if (action === "set") {
							vl = format ? t.formatter("", data[nm], iCol, data, "edit") : data[nm];
							$td = $(cells[iCol]).add(fcells[iCol]);
							$td.html(vl);
							if (p.colModel[iCol].title) {
								$td.attr({ "title": stripHtml(vl) });
							}
						}
					}
				}
			});
			return action === "get" ? res : success;
		},
		showHideCol: function (colname, show, options) {
			return this.each(function () {
				var $t = this, $self = $($t), grid = $t.grid, fndh = false, p = $t.p, brd = jgrid.cell_width ? 0 : p.cellLayout, cw;

				if (!grid) { return; }
				if (typeof colname === "string") { colname = [colname]; }
				show = (show !== "none" && show !== false) ? "" : "none";
				options = options || {};

				var sw = show === "" ? true : false, groupHeader = p.groupHeader,
					gh = groupHeader && (typeof groupHeader === "object" || $.isFunction(groupHeader));

				if (gh && !options.skipSetGroupHeaders) {
					base.destroyGroupHeader.call($self, false);
				}

				$(p.colModel).each(function (iCol) {
					if ($.inArray(this.name, colname) !== -1 && this.hidden === sw) {
						if (p.frozenColumns === true && this.frozen === true) {
							return true;
						}
						$("tr[role=row]", grid.hDiv).each(function () {
							$(this.cells[iCol]).css("display", show);
						});
						$($t.rows).each(function () {
							var cell = this.cells[iCol];
							if (!$(this).hasClass("jqgroup") || (cell != null && cell.colSpan === 1)) {
								$(cell).css("display", show);
							}
							// to follow HTML standards exactly one should probably add hidden column in
							// grouping header row if ($(this).hasClass("jqgroup")) and decrement the value of
							// colspan.
						});
						if (p.footerrow) { $("tr.footrow td:eq(" + iCol + ")", grid.sDiv).css("display", show); }
						cw = parseInt(this.width, 10);
						if (show === "none") {
							p.tblwidth -= cw + brd;
						} else {
							p.tblwidth += cw + brd;
						}
						this.hidden = !sw;
						fndh = true;
						if (!options.skipFeedback) {
							feedback.call($t, "onShowHideCol", sw, this.name, iCol);
						} else {
							options.toReport = options.toReport || {};
							options.toReport[this.name] = sw;
						}
					}
				});
				if (fndh === true) {
					var newGridWidth = !p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%") ?
							p.tblwidth + parseInt(p.scrollOffset, 10) :
							p.width;
					if (!options.skipSetGridWidth) {
						base.setGridWidth.call($self, newGridWidth);
					} else {
						options.newGridWidth = newGridWidth;
					}
				}
				if (gh && !options.skipSetGroupHeaders) {
					if (p.pivotOptions != null && p.pivotOptions.colHeaders != null && p.pivotOptions.colHeaders.length > 1) {
						var i, gHead = p.pivotOptions.colHeaders;
						for (i = 0; i < gHead.length; i++) {
							// Multiple calls of setGroupHeaders for one grid are wrong,
							// but there are produces good results in case of usage
							// useColSpanStyle: false option. The rowspan values
							// needed be increased in case of usage useColSpanStyle: true
							if (gHead[i] && gHead[i].groupHeaders.length) {
								base.setGroupHeaders.call($self, gHead[i]);
							}
						}
					} else {
						base.setGroupHeaders.call($self, p.groupHeader);
					}
				}
			});
		},
		hideCol: function (colname, options) {
			return this.each(function () { base.showHideCol.call($(this), colname, "none", options); });
		},
		showCol: function (colname, options) {
			return this.each(function () { base.showHideCol.call($(this), colname, "", options); });
		},
		remapColumns: function (permutation, updateCells, keepHeader) {
			var ts = this[0], p = ts.p, grid = ts.grid, iCol, n, makeArray = $.makeArray;
			function resortArray(a) {
				var ac = a.length ? makeArray(a) : $.extend({}, a);
				$.each(permutation, function (i) {
					a[i] = ac[this];
				});
			}
			function resortRows($parent, selector) {
				var $rows = selector ? $parent.children(selector) : $parent.children();
				$rows.each(function () {
					var row = this, elems = makeArray(row.cells);
					$.each(permutation, function (i) {
						var e = elems[this], oldElem = row.cells[i];
						if (e.cellIndex !== i) { // if not already on the correct place
							e.parentNode.insertBefore(e, oldElem);
						}
					});
				});
			}
			if (grid == null || p == null) { return; }
			resortArray(p.colModel);
			resortArray(p.colNames);
			resortArray(grid.headers);
			// $("thead:first", grid.hDiv)
			resortRows($(grid.hDiv).find(">div>.ui-jqgrid-htable>thead"), keepHeader && ":not(.ui-jqgrid-labels)");
			if (updateCells) {
				resortRows($(ts.tBodies[0]), "tr.jqgfirstrow,tr.jqgrow,tr.jqfoot");
			}
			if (p.footerrow) {
				resortRows($(grid.sDiv).find(">div>.ui-jqgrid-ftable>tbody").first());
			}
			if (p.remapColumns) {
				if (!p.remapColumns.length) {
					p.remapColumns = makeArray(permutation);
				} else {
					resortArray(p.remapColumns);
				}
			}
			p.lastsort = $.inArray(p.lastsort, permutation);
			// rebuild iColByName
			p.iColByName = {};
			for (iCol = 0, n = p.colModel.length; iCol < n; iCol++) {
				p.iColByName[p.colModel[iCol].name] = iCol;
			}
			feedback.call(ts, "onRemapColumns", permutation, updateCells, keepHeader);
		},
		remapColumnsByName: function (permutationByName, updateCells, keepHeader) {
			var ts = this[0], p = ts.p, permutation = [], i, n, cmNames = permutationByName.slice(), inArray = $.inArray;

			if (p.subGrid && inArray("subgrid", cmNames) < 0) {
				cmNames.unshift("subgrid");
			}
			if (p.multiselect && inArray("cb", cmNames) < 0) {
				cmNames.unshift("cb");
			}
			if (p.rownumbers && inArray("rn", cmNames) < 0) {
				cmNames.unshift("rn");
			}
			for (i = 0, n = cmNames.length; i < n; i++) {
				permutation.push(p.iColByName[cmNames[i]]);
			}
			base.remapColumns.call(this, permutation, updateCells, keepHeader);
			return this;
		},
		setGridWidth: function (newWidth, shrink) {
			return this.each(function () {
				var $t = this, p = $t.p, columnWidth, grid = $t.grid, initialWidth = 0, iLastVariableColumn, numberOfVariableColumns = 0, hasScrollbar = false, totalVariableWidth, fixedColumnsWidth = 0, correctur,
					isCellClassHidden = jgrid.isCellClassHidden, newGridWidth = newWidth;
				if (!grid || p == null) { return; }
				$t.fixScrollOffsetAndhBoxPadding();
				// there are tree categorien of columns important below:
				//   1) hidden - the columns will be not used in calculation of width
				//   2) fixed  - we will use the existing width of the columns in the calculation of the total width, but we well not change its width
				//   3) variable columns - all other visible columns which width can be changed in general
				// The width of every column consist from the innerWidth and the with of outer parts which will be 0 or cellLayout depend on boxing model used.
				// The total width of the grid consist of the sum of width of all visible (fixed and variable) columns.
				// There are outer bDiv which could have scroll bars. The p.scrollOffset hold the width or vertical scrollbar if it exists.
				// grid.width and p.width need be set to the width of bDiv. The width of all other divs should be set to the same value.
				//
				// the input parameter newWidth specify new value of outer width (the width of bDiv)
				var colModel = p.colModel, cm, scrollbarWidth = p.scrollOffset, borderAndPaddingWidth = jgrid.cell_width ? 0 : p.cellLayout, thInfo,
					headers = grid.headers, footers = grid.footers, bDiv = grid.bDiv, hDiv = grid.hDiv, sDiv = grid.sDiv,
					cols = grid.cols, delta, colsExist, shrinkFactor,
					hCols = $(hDiv).find(">div>.ui-jqgrid-htable>thead>tr").first()[0].cells,
					setWidthOfAllDivs = function (width) {
						grid.width = p.width = width;
						$(p.gBox).css("width", width + "px");
						$(p.gView).css("width", width + "px");
						$(bDiv).css("width", width + "px");
						$(hDiv).css("width", width + "px");
						if (p.pager) {
							$(p.pager).css("width", width + "px");
						}
						if (p.toppager) {
							$(p.toppager).css("width", width + "px");
						}
						if (p.toolbar[0] === true) {
							$(grid.uDiv).css("width", width + "px");
							if (p.toolbar[1] === "both") {
								$(grid.ubDiv).css("width", width + "px");
							}
						}
						if (p.footerrow) {
							$(sDiv).css("width", width + "px");
						}
					};
				if (typeof shrink !== "boolean") {
					shrink = p.shrinkToFit;
				}
				if (isNaN(newGridWidth)) { return; }
				newGridWidth = parseInt(newGridWidth, 10); // round till integer value of px
				setWidthOfAllDivs(newGridWidth);
				if (shrink === false && p.forceFit === true) { p.forceFit = false; }
				// TODO: ??? recalculate p.tblwidth in case of shrink===false
				if (shrink === true) {
					// calculate initialWidth, fixedColumnsWidth and numberOfVariableColumns
					$.each(colModel, function () {
						// the classes property of colModel will be applied to the first
						// row of the grid (hCols). If the
						if (this.hidden === false && !isCellClassHidden(this.classes)) {
							columnWidth = this.widthOrg;
							initialWidth += columnWidth + borderAndPaddingWidth;
							if (this.fixed) {
								fixedColumnsWidth += this.width + borderAndPaddingWidth;
							} else {
								numberOfVariableColumns++;
							}
						}
					});
					if (numberOfVariableColumns === 0) { return; }
					p.tblwidth = parseInt(initialWidth, 10); // round till integer value of px;
					totalVariableWidth = newGridWidth - borderAndPaddingWidth * numberOfVariableColumns - fixedColumnsWidth;
					if (!isNaN(p.height)) {
						if (bDiv.clientHeight < bDiv.scrollHeight || $t.rows.length === 1) {
							hasScrollbar = true;
							totalVariableWidth -= scrollbarWidth;
						}
					}
					shrinkFactor = totalVariableWidth / (p.tblwidth - borderAndPaddingWidth * numberOfVariableColumns - fixedColumnsWidth);
					if (shrinkFactor < 0) { return; }
					initialWidth = 0;
					colsExist = cols.length > 0;
					$.each(colModel, function (i) {
						if (this.hidden === false && !isCellClassHidden(this.classes) && !this.fixed) {
							columnWidth = Math.round(this.widthOrg * shrinkFactor);
							this.width = columnWidth;
							initialWidth += columnWidth;
							headers[i].width = columnWidth;
							hCols[i].style.width = columnWidth + "px";
							if (p.footerrow) {
								footers[i].style.width = columnWidth + "px";
							}
							if (colsExist) {
								cols[i].style.width = columnWidth + "px";
							}
							iLastVariableColumn = i;
						}
					});

					if (!iLastVariableColumn) { return; }

					correctur = 0;
					if (hasScrollbar) {
						if (newGridWidth - fixedColumnsWidth - (initialWidth + borderAndPaddingWidth * numberOfVariableColumns) !== scrollbarWidth) {
							correctur = newGridWidth - fixedColumnsWidth - (initialWidth + borderAndPaddingWidth * numberOfVariableColumns) - scrollbarWidth;
						}
					} else if (Math.abs(newGridWidth - fixedColumnsWidth - (initialWidth + borderAndPaddingWidth * numberOfVariableColumns)) !== 1) {
						correctur = newGridWidth - fixedColumnsWidth - (initialWidth + borderAndPaddingWidth * numberOfVariableColumns);
					}
					cm = colModel[iLastVariableColumn];
					cm.width += correctur;
					p.tblwidth = parseInt(initialWidth + correctur + borderAndPaddingWidth * numberOfVariableColumns + fixedColumnsWidth, 10); // round till integer value of px;
					if (p.tblwidth > newGridWidth) {
						delta = p.tblwidth - parseInt(newGridWidth, 10);
						p.tblwidth = newGridWidth;
						cm.width = cm.width - delta;
					}
					columnWidth = cm.width;
					thInfo = headers[iLastVariableColumn];
					thInfo.width = columnWidth;
					hCols[iLastVariableColumn].style.width = columnWidth + "px";
					if (colsExist) { cols[iLastVariableColumn].style.width = columnWidth + "px"; }
					if (p.footerrow) {
						footers[iLastVariableColumn].style.width = columnWidth + "px";
					}
					if (p.tblwidth + (hasScrollbar ? scrollbarWidth : 0) < p.width) { // prabably bDiv.offsetWidth - bDiv.clientWidth is better as scw
						// decrease the width if required
						setWidthOfAllDivs(p.tblwidth + (hasScrollbar ? scrollbarWidth : 0));
					}
					if (bDiv.offsetWidth > bDiv.clientWidth) { // the part seems never work
						// horizontal scroll bar exist.
						// we need increase the width of bDiv to fix the problem or to reduce the width of the table
						// currently we just increase the width
						if (!p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%")) {
							setWidthOfAllDivs(bDiv.offsetWidth);
						}
					}
				}
				if (p.tblwidth) {
					p.tblwidth = parseInt(p.tblwidth, 10); // round till integer value of px;
					newGridWidth = p.tblwidth;
					//$($t).css("width", newGridWidth + "px");
					//getGridComponent(COMPONENT_NAMES.HEADER_TABLE, hDiv).css("width", newGridWidth + "px");
					hDiv.scrollLeft = bDiv.scrollLeft;
					/*if (p.footerrow) {
						getGridComponent(COMPONENT_NAMES.FOOTER_TABLE, sDiv).css("width", newGridWidth + "px");
					}*/
					// small fix which origin should be examined more exactly
					delta = Math.abs(newGridWidth - p.width);
					if (p.shrinkToFit && !shrink && delta < 3 && delta > 0) {
						if (newGridWidth < p.width) {
							setWidthOfAllDivs(newGridWidth); // decrease the width if required
						}
						if (bDiv.offsetWidth > bDiv.clientWidth) { // the part seems never work
							if (!p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%")) {
								setWidthOfAllDivs(bDiv.offsetWidth);
							}
						}
					}
				}
				$t.fixScrollOffsetAndhBoxPadding();
				var whichHeigthToRecalculate = {
						resizeDiv: true,
						resizedRows: {
							iRowStart: (shrink ? 0 : -1), // -1 means don't recalculate heights or rows
							iRowEnd: -1
						}
					};
				$($t).triggerHandler("jqGridResetFrozenHeights", [{
					header: whichHeigthToRecalculate,
					resizeFooter: true,
					body: whichHeigthToRecalculate
				}]);
			});
		},
		setGridHeight: function (nh) {
			return this.each(function () {
				var $t = this, grid = $t.grid, p = $t.p;
				if (!grid) { return; }
				var bDiv = $(grid.bDiv);
				bDiv.css({ height: nh + (isNaN(nh) ? "" : "px") });
				if (p.frozenColumns === true) {
					//follow the original set height to use 16, better scrollbar width detection
					$(p.idSel + "_frozen").parent().height(bDiv.height() - 16);
				}
				p.height = nh;
				if (p.scroll) { grid.populateVisible.call($t); }
				$t.fixScrollOffsetAndhBoxPadding();
				$($t).triggerHandler("jqGridResetFrozenHeights");
			});
		},
		setCaption: function (newcap) {
			return this.each(function () {
				var self = this, cDiv = self.grid.cDiv;
				self.p.caption = newcap;
				$("span.ui-jqgrid-title, span.ui-jqgrid-title-rtl", cDiv).html(newcap);
				$(cDiv).show();
				$(cDiv).nextAll("div").removeClass(base.getGuiStyles.call(self, "top"));
				$(this).triggerHandler("jqGridResetFrozenHeights");
			});
		},
		setLabel: function (colname, nData, prop, attrp) {
			return this.each(function () {
				var $t = this, iCol, p = $t.p, $th;
				if (!$t.grid) { return; }
				if (isNaN(colname)) {
					iCol = p.iColByName[colname];
					if (iCol === undefined) { return; }
				} else { iCol = parseInt(colname, 10); }
				if (iCol >= 0) {
					$th = $($t.grid.headers[iCol].el);
					if (p.frozenColumns) {
						$th = $th.add($t.grid.fhDiv.find(".ui-jqgrid-htable tr.ui-jqgrid-labels th.ui-th-column").eq(iCol));
					}
					if (nData) {
						$th.each(function () {
							var $div = $("[id^=jqgh_]", this),
								$textWrapper = $div.children("span.ui-jqgrid-cell-wrapper");
							if ($textWrapper.length > 0) {
								$textWrapper.html(nData);
							} else {
								var $ico = $(".s-ico", this);
								$div.empty()
									.html(nData)[p.sortIconsBeforeText ? "prepend" : "append"]($ico);
							}
						});
						p.colNames[iCol] = nData;
					}
					if (prop) {
						if (typeof prop === "string") { $th.addClass(prop); } else { $th.css(prop); }
					}
					if (typeof attrp === "object") { $th.attr(attrp); }
				}
			});
		},
		setCell: function (rowid, colName, nData, cssp, attrp, forceUpdate) {
			// TODO: add an additional parameter, which will inform whether the input data nData is in formatted or unformatted form
			return this.each(function () {
				var $t = this, p = $t.p, iCol = -1, colModel = p.colModel, v, i, cm, item, tr, $td, $tdi, val, rawdat = {}, id, index;
				if (!$t.grid) { return; }
				iCol = isNaN(colName) ? p.iColByName[colName] : parseInt(colName, 10);
				if (iCol >= 0) {
					tr = base.getGridRowById.call($($t), rowid);
					if (tr) {
						$td = jgrid.getCell.call($t, tr, iCol);
						if (nData !== "" || forceUpdate === true) {
							cm = colModel[iCol];
							if (p.datatype === "local") {
								id = stripPref(p.idPrefix, rowid);
								index = p._index[id];
								if (index !== undefined) {
									item = p.data[index];
								}
							}
							// !!! filling of the rawdat for all cells slow down speed
							// probably one should use p.data[index] (see below) instead ???
							if (item == null) {
								for (i = 0; i < tr.cells.length; i++) {
									// !!! BUG the usage of innerHTML is wrong
									// one have to use p.data[index] or unformat the data
									if (i !== iCol) {
										$tdi = jgrid.getDataFieldOfCell.call($t, tr, i);
										if ($tdi.length > 0) {
											try {
												val = $.unformat.call($t, $tdi, { rowId: rowid, colModel: colModel[i] }, i);
											} catch (exception) {
												val = htmlDecode($tdi[0].innerHTML);
											}
											rawdat[colModel[i].name] = val;
										}
									}
								}
							} else {
								rawdat = item;
							}
							rawdat[cm.name] = nData;
							v = $t.formatter(rowid, nData, iCol, rawdat, "edit");

							// update the data in the corresponding part of the cell
							var $dataFiled = $td;
							if (p.treeGrid === true && cm.name === p.ExpandColumn) {
								$dataFiled = $dataFiled.children("span.cell-wrapperleaf,span.cell-wrapper").first();
							}
							$dataFiled.html(v);

							// update the title of the cell if required
							if (cm.title) {
								$td.attr({ "title": nData });
							}

							if (item != null) { // p.datatype === "local"
								v = convertOnSaveLocally.call($t, nData, cm, item[cm.name], id, item, iCol);
								if ($.isFunction(cm.saveLocally)) {
									cm.saveLocally.call($t, { newValue: v, newItem: item, oldItem: item, id: id, cm: cm, cmName: cm.name, iCol: iCol });
								} else {
									item[cm.name] = v;
								}
							}
						}
						if (cssp || attrp) {
							$td = jgrid.getCell.call($t, tr, iCol);
							if (cssp) {
								$td[typeof cssp === "string" ? "addClass" : "css"](cssp);
							}
							if (typeof attrp === "object") {
								$td.attr(attrp);
							}
						}
					}
				}
			});
		},
		getCell: function (rowid, colName) {
			// TODO: add an additional parameter, which will inform whether the output data should be in formatted or unformatted form
			var ret = false;
			this.each(function () {
				var $t = this, iCol, p = $t.p, tr, $td;
				if (!$t.grid) { return; }
				iCol = isNaN(colName) ? p.iColByName[colName] : parseInt(colName, 10);
				if (iCol >= 0) { //isNaN(iCol)>=0 is false and undefined >= 0 is false
					tr = base.getGridRowById.call($($t), rowid);
					if (tr) {
						$td = jgrid.getDataFieldOfCell.call($t, tr, iCol).first();
						try {
							ret = $.unformat.call($t, $td, { rowId: tr.id, colModel: p.colModel[iCol] }, iCol);
						} catch (exception) {
							ret = htmlDecode($td.html());
						}
					}
				}
			});
			return ret;
		},
		getCol: function (colName, obj, mathopr) {
			// TODO: add an additional parameter, which will inform whether the output data should be in formatted or unformatted form
			var ret = [], val, sum = 0, min, max, v;
			obj = typeof obj !== "boolean" ? false : obj;
			if (mathopr === undefined) { mathopr = false; }
			this.each(function () {
				var $t = this, iCol, p = $t.p, $td;
				if (!$t.grid) { return; }
				iCol = isNaN(colName) ? p.iColByName[colName] : parseInt(colName, 10);
				if (iCol >= 0) { //isNaN(iCol)>=0 is false and undefined >= 0 is false
					var rows = $t.rows, ln = rows.length, i = 0, dlen = 0, tr;
					if (ln && ln > 0) {
						while (i < ln) {
							tr = rows[i];
							if ($(tr).hasClass("jqgrow")) {
								$td = jgrid.getDataFieldOfCell.call($t, tr, iCol).first(); //$(tr.cells[iCol]);
								try {
									val = $.unformat.call($t, $td, { rowId: tr.id, colModel: p.colModel[iCol] }, iCol);
								} catch (exception) {
									val = htmlDecode($td.html());
								}
								if (mathopr) {
									v = parseFloat(val);
									if (!isNaN(v)) {
										sum += v;
										if (max === undefined) { max = min = v; }
										min = Math.min(min, v);
										max = Math.max(max, v);
										dlen++;
									}
								} else if (obj) {
									ret.push({ id: tr.id, value: val });
								} else {
									ret.push(val);
								}
							}
							i++;
						}
						if (mathopr) {
							switch (mathopr.toLowerCase()) {
							case "sum":
								ret = sum;
								break;
							case "avg":
								ret = sum / dlen;
								break;
							case "count":
								ret = (ln - 1);
								break;
							case "min":
								ret = min;
								break;
							case "max":
								ret = max;
								break;
							}
						}
					}
				}
			});
			return ret;
		},
		clearGridData: function (clearfooter) {
			return this.each(function () {
				var $t = this, p = $t.p, rows = $t.rows, grid = $t.grid;
				if (!grid || !p || !rows) { return; }
				if (typeof clearfooter !== "boolean") { clearfooter = false; }
				$($t).unbind(".jqGridFormatter");
				grid.emptyRows.call($t, false, true);
				if (p.footerrow && clearfooter) { $(".ui-jqgrid-ftable td", grid.sDiv).html("&#160;"); }
				p.selrow = null;
				clearArray(p.selarrrow); // p.selarrrow= [];
				clearArray(p.savedRow); // p.savedRow = [];
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
				p.rowIndexes = {};
				p.records = 0;
				p.page = 1;
				p.lastpage = 0;
				p.reccount = 0;
				$t.updatepager(true, false);
			});
		},
		getInd: function (rowid, rc) {
			var tr = base.getGridRowById.call($(this), rowid);
			return tr ? (rc === true ? tr : tr.rowIndex) : false;
		},
		bindKeys: function (settings) {
			var o = $.extend({
				onEnter: null,
				onSpace: null,
				onLeftKey: null,
				onRightKey: null,
				scrollingRows: true
			}, settings || {});
			return this.each(function () {
				var $t = this, p = $t.p, $self = $($t);
				p.scrollrows = o.scrollingRows;
				$self.bind("keydown.jqGrid", function (event) {
					var tr = $(this).find("tr[tabindex=0]")[0],
						editingInfo = jgrid.detectRowEditing.call($t, $(event.target).closest("tr.jqgrow").attr("id")),
						moveVerical = function (siblingProperty) {
							do {
								tr = tr[siblingProperty];
								if (tr === null) { return; }
							} while ($(tr).is(":hidden") || !$(tr).hasClass("jqgrow"));
							base.setSelection.call($self, tr.id, true);
							event.preventDefault();
						},
						feedbackKey = function (name, callbackSuffix) {
							// possible events
							//    jqGridKeyLeft
							//    jqGridKeyRight
							//    jqGridKeyEnter
							//    jqGridKeySpace
							// possible callbacks
							//    onLeftKey
							//    onRightKey
							//    onEnter
							//    onSpace
							// no onUpKey or onDownKey and the corresponding events
							var callback = o["on" + name + (callbackSuffix || "")];
							$self.triggerHandler("jqGridKey" + name, [p.selrow]);
							if ($.isFunction(callback)) {
								callback.call($t, p.selrow);
							}
						},
						moveHorizontal = function (stringLeftOrRight) {
							if (p.treeGrid) {
								var expanded = p.data[p._index[stripPref(p.idPrefix, tr.id)]][p.treeReader.expanded_field];
								if (stringLeftOrRight === "Right") { expanded = !expanded; }
								if (expanded) {
									$(tr).find("div.treeclick").trigger("click");
								}
							}
							feedbackKey(stringLeftOrRight, "Key");
						};

					//check for arrow keys
					if (tr && editingInfo === null) {
						switch (event.keyCode) {
							case 38: // up key
								moveVerical("previousSibling");
								break;
							case 40: // down key
								moveVerical("nextSibling");
								break;
							case 37: // left key
								moveHorizontal("Left");
								break;
							case 39: // left key
								moveHorizontal("Right");
								break;
							case 13: // enter key
								feedbackKey("Enter");
								break;
							case 32: // space key
								feedbackKey("Space");
								break;
							default:
								break;
						}
					}
				});
			});
		},
		unbindKeys: function () {
			return this.each(function () {
				$(this).unbind("keydown.jqGrid");
			});
		},
		getLocalRow: function (rowid) {
			var ret = false, ind;
			this.each(function () {
				if (rowid !== undefined) {
					ind = this.p._index[stripPref(this.p.idPrefix, rowid)];
					if (ind >= 0) {
						ret = this.p.data[ind];
					}
				}
			});
			return ret;
		},
		progressBar: function (p) {
			p = $.extend({
				htmlcontent: "",
				method: "hide",
				loadtype: "disable"
			}, p || {});
			return this.each(function () {
				var sh = p.method === "show" ? true : false, gridIdEscaped = jqID(this.p.id), $loading = $("#load_" + gridIdEscaped);
				if (p.htmlcontent !== "") {
					$loading.html(p.htmlcontent);
				}
				switch (p.loadtype) {
				case "disable":
					break;
				case "enable":
					$loading.toggle(sh);
					break;
				case "block":
					$("#lui_" + gridIdEscaped).toggle(sh);
					$loading.toggle(sh);
					break;
				}
			});
		},
		setColWidth: function (iCol, newWidth, adjustGridWidth, skipGridAdjustments) {
			return this.each(function () {
				var self = this, $self = $(self), grid = self.grid, p = self.p, h;
				if (typeof iCol === "string") {
					// the first parametrer is column name instead of index
					iCol = p.iColByName[iCol];
					if (iCol === undefined) { return; }
				} else if (typeof iCol !== "number") {
					return; // error: wrong parameters
				}
				h = grid.headers[iCol];
				if (h != null) {
					h.newWidth = newWidth;
					grid.newWidth = p.tblwidth + newWidth - h.width;
					grid.resizeColumn(iCol, !p.frozenColumns, skipGridAdjustments);
					if (adjustGridWidth !== false && !skipGridAdjustments) {
						self.fixScrollOffsetAndhBoxPadding();
						base.setGridWidth.call($self, grid.newWidth + p.scrollOffset, false); // adjust grid width too
					}
				}
			});
		},
		getAutoResizableWidth: function (iCol) {
			// The method get the max-width in the column.
			// It get in considerations only VISIBLE elements.
			// For example if some rows with data are hidden (grouping data, tree grid)
			// then the max-width will see 0 as the width of the elements of the rows.
			//
			// The most expensive in below code is getting padding-left.
			var self = this;
			if (self.length === 0) {
				return -1;
			}
			self = self[0];
			var rows = self.rows, row, cell, iRow, $cell, $cellFirstChild,
				p = self.p,
				cm = p.colModel[iCol],
				$th = $(self.grid.headers[iCol].el),
				$thDiv = $th.find(">div"),
				thPaddingLeft = parseFloat($th.css("padding-left") || 0),  // typically 2
				thPaddingRight = parseFloat($th.css("padding-right") || 0),// typically 2
				$incosDiv = $thDiv.find("span.s-ico"),
				$wrapper = $thDiv.find(">." + p.autoResizing.wrapperClassName),
				wrapperOuterWidth = $wrapper.outerWidth(),
				wrapperCssWidth = parseFloat($wrapper.css("width") || 0),
				widthOuter = 0,
				colWidth = 0,
				compact = (cm.autoResizing != null && cm.autoResizable.compact !== undefined) ? cm.autoResizable.compact : p.autoResizing.compact,
				wrapperClassName = p.autoResizing.wrapperClassName;

			if (cm == null || !cm.autoResizable || $wrapper.length === 0 || cm.hidden || jgrid.isCellClassHidden(cm.classes) || cm.fixed) {
				return -1; // do nothing
			}
			if (!compact || $incosDiv.is(":visible") || ($incosDiv.css("display") !== "none")) {  //|| p.viewsortcols[0]
				colWidth = $incosDiv.outerWidth(true);
				if (!p.sortIconsBeforeText) {
					colWidth -= p.direction === "rtl" ?
						parseFloat($incosDiv.css("padding-left") || 0) +
						parseFloat($incosDiv.css("margin-left") || 0) :
						parseFloat($incosDiv.css("padding-right") || 0) +
						parseFloat($incosDiv.css("margin-right") || 0);
				}
			}
			colWidth += wrapperOuterWidth + thPaddingLeft +
					(wrapperCssWidth === wrapperOuterWidth ? thPaddingLeft + thPaddingRight : 0) +
					parseFloat($thDiv.css("margin-left") || 0) + parseFloat($thDiv.css("margin-right") || 0);
			for (iRow = 0, rows = self.rows; iRow < rows.length; iRow++) {
				row = rows[iRow];
				cell = row.cells[iCol];
				$cell = $(row.cells[iCol]);
				if (cell != null && ($(row).hasClass("jqgrow") || ($(row).hasClass("jqgroup") && cell.colSpan === 1))) {
					$cellFirstChild = $(cell.firstChild);
					if ($cellFirstChild.hasClass(wrapperClassName)) {
						colWidth = Math.max(colWidth, $cellFirstChild.outerWidth() + widthOuter);
					} else if (p.treeGrid && p.ExpandColumn === cm.name) {
						$cellFirstChild = $cell.children(".cell-wrapper,.cell-wrapperleaf");
						colWidth = Math.max(colWidth, $cellFirstChild.outerWidth() + widthOuter + $cell.children(".tree-wrap").outerWidth());
					}
				} else if ($(row).hasClass("jqgfirstrow")) {
					// widthOuter is 4 typically (if jgrid.cell_width is true).
					widthOuter = (jgrid.cell_width ? parseFloat($cell.css("padding-left") || 0) + parseFloat($cell.css("padding-right") || 0) : 0) +
							parseFloat($cell.css("border-right") || 0) +
							parseFloat($cell.css("border-left") || 0);
				}
			}
			colWidth = Math.max(colWidth,
				cm.autoResizing != null && cm.autoResizing.minColWidth !== undefined ?
						cm.autoResizing.minColWidth :
						p.autoResizing.minColWidth);
			return Math.min(
				colWidth,
				cm.autoResizing != null && cm.autoResizing.maxColWidth !== undefined ?
						cm.autoResizing.maxColWidth :
						p.autoResizing.maxColWidth
			);
		},
		autoResizeColumn: function (iCol, skipGridAdjustments) {
			return this.each(function () {
				var self = this, $self = $(this), p = self.p, cm = p.colModel[iCol], widthOrg,
					$th = $(self.grid.headers[iCol].el),
					newWidth = base.getAutoResizableWidth.call($self, iCol);

				if (cm == null || newWidth < 0 || newWidth === cm.width) {
					return;
				}
				base.setColWidth.call($self, iCol, newWidth, p.autoResizing.adjustGridWidth && !p.autoResizing.fixWidthOnShrink && !skipGridAdjustments, skipGridAdjustments);
				if (p.autoResizing.fixWidthOnShrink && p.shrinkToFit && !skipGridAdjustments) {
					cm.fixed = true;
					widthOrg = cm.widthOrg; // save the value in temporary variable
					cm.widthOrg = cm.width; // to force not changing of the column width
					base.setGridWidth.call($self, p.width, true);
					cm.widthOrg = widthOrg;
					cm.fixed = false;
				}
				$th.data("autoResized", "true");
			});
		},
		autoResizeAllColumns: function () {
			return this.each(function () {
				var self = this, $self = $(self), p = self.p, colModel = p.colModel, nCol = colModel.length, iCol, cm,
					shrinkToFit = p.shrinkToFit, // save the original shrinkToFit value in the grid
					adjustGridWidth = p.autoResizing.adjustGridWidth,
					fixWidthOnShrink = p.autoResizing.fixWidthOnShrink,
					width = parseInt(p.widthOrg, 10), grid = self.grid,
					autoResizeColumn = base.autoResizeColumn; // cache autoResizeColumn reference

				// autoResizeAllColumns calls multiple times autoResizeColumn
				// which calls setColWidth, which calls resizeColumn, which calls
				// fixScrollOffsetAndhBoxPadding and setGridWidth.
				// The method setGridWidth will be called ADDITIONALLY by autoResizeColumn too
				// As the result the most time spending by autoResizeAllColumns is
				// for multiple calling of setGridWidth and fixScrollOffsetAndhBoxPadding
				//
				// So we skipp internal calls of fixScrollOffsetAndhBoxPadding and setGridWidth
				// and to call the method ONCE after the end of loop below

				//    1) Analyse colModel, colNames properties and sortname parameter to calculate
				//       minimal and optimal width of every column and the grid. It could be
				//       some important cases which should be
				//      a) The current width of the grid is LESS then optimal width and resizable column don't have fixed:true property.
				//         1. save widthOrg of the resizable column in temporary variable
				//         2. set widthOrg property of the resizable column to optimal size and set additionally fixed:true
				//         3. call setGridWidth with the CURRENT grid width to change shrink width of all fixed:false

				p.shrinkToFit = false; // make no shrinking during resizing of any columns
				p.autoResizing.adjustGridWidth = true;
				p.autoResizing.fixWidthOnShrink = false;
				for (iCol = 0; iCol < nCol; iCol++) {
					cm = colModel[iCol];
					if (cm.autoResizable && cm.formatter !== "actions") {
						autoResizeColumn.call($self, iCol, true);
					}
				}

				// finalization
				grid.hDiv.scrollLeft = grid.bDiv.scrollLeft;
				if (p.footerrow) {
					grid.sDiv.scrollLeft = grid.bDiv.scrollLeft;
				}
				self.fixScrollOffsetAndhBoxPadding();

				if (!isNaN(width)) {
					base.setGridWidth.call($self, width, false);
				} else if (adjustGridWidth) {
					base.setGridWidth.call($self, grid.newWidth + p.scrollOffset, false);
				}
				// restore the original shrinkToFit value
				p.autoResizing.fixWidthOnShrink = fixWidthOnShrink;
				p.autoResizing.adjustGridWidth = adjustGridWidth;
				p.shrinkToFit = shrinkToFit;
			});
		}
	});
	// end module grid.base
}));
