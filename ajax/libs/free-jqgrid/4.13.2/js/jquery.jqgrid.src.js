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

	/**
	 * jqGrid extension for cellediting Grid Data
	 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com, http://trirand.com/blog/
	 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	**/
	// begin module grid.celledit
	var getTdByColumnIndex = function (tr, iCol) {
			var $t = this, frozenRows = $t.grid.fbRows;
			return $((frozenRows != null && frozenRows[0].cells.length > iCol ? frozenRows[tr.rowIndex] : tr).cells[iCol]);
		};
	jgrid.extend({
		editCell: function (iRow, iCol, ed) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, nm, tmp, cc, cm, rows = $t.rows;
				if (!$t.grid || p.cellEdit !== true || rows == null || rows[iRow] == null) {
					return;
				}
				iRow = parseInt(iRow, 10); // we change iRow and rows[iRow] can be change too
				iCol = parseInt(iCol, 10);
				if (isNaN(iRow) || isNaN(iCol)) {
					return;
				}
				var tr = rows[iRow], rowid = tr != null ? tr.id : null, $tr = $(tr), edittype,
					iColOld = parseInt(p.iCol, 10), iRowOld = parseInt(p.iRow, 10),
					$trOld = $(rows[iRowOld]), savedRow = p.savedRow;
				// select the row that can be used for other methods
				if (rowid == null) {
					return;
				}
				p.selrow = rowid;
				if (!p.knv) {
					$self.jqGrid("GridNav");
				}
				// check to see if we have already edited cell
				if (savedRow.length > 0) {
					// prevent second click on that field and enable selects
					if (ed === true) {
						if (iRow === iRowOld && iCol === iColOld) {
							return;
						}
					}
					// save the cell
					$self.jqGrid("saveCell", savedRow[0].id, savedRow[0].ic);
				} else {
					setTimeout(function () {
						$("#" + jgrid.jqID(p.knv)).attr("tabindex", "-1").focus();
					}, 1);
				}
				cm = p.colModel[iCol];
				nm = cm.name;
				if (nm === "subgrid" || nm === "cb" || nm === "rn") {
					return;
				}
				cc = getTdByColumnIndex.call($t, tr, iCol);
				var editable = cm.editable, mode = "cell";
				if ($.isFunction(editable)) {
					editable = editable.call($t, {
						rowid: rowid,
						iCol: iCol,
						iRow: iRow,
						name: nm,
						cm: cm,
						mode: mode
					});
				}
				var highlightClasses = $self.jqGrid("getGuiStyles", "select", "edit-cell"),
					hoverClasses = $self.jqGrid("getGuiStyles", "hover", "selected-row");
				if (editable === true && ed === true && !cc.hasClass("not-editable-cell")) {
					if (iColOld >= 0 && iRowOld >= 0) {
						getTdByColumnIndex.call($t, $trOld[0], iColOld).removeClass(highlightClasses);
						$trOld.removeClass(hoverClasses);
					}
					cc.addClass(highlightClasses);
					$tr.addClass(hoverClasses);
					if (!cm.edittype) {
						cm.edittype = "text";
					}
					edittype = cm.edittype;
					try {
						tmp = $.unformat.call($t, cc, { rowId: rowid, colModel: cm }, iCol);
					} catch (ex) {
						tmp = edittype === "textarea" ? cc.text() : cc.html();
					}
					if (p.autoEncodeOnEdit) {
						tmp = jgrid.oldDecodePostedData(tmp);
					}
					savedRow.push({ id: iRow, ic: iCol, name: nm, v: tmp });
					if (tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length === 1 && tmp.charCodeAt(0) === 160)) {
						tmp = "";
					}
					if ($.isFunction(p.formatCell)) {
						var tmp2 = p.formatCell.call($t, rowid, nm, tmp, iRow, iCol);
						if (tmp2 !== undefined) {
							tmp = tmp2;
						}
					}
					feedback.call($t, "beforeEditCell", rowid, nm, tmp, iRow, iCol);
					var opt = $.extend({}, cm.editoptions || {},
						{ id: iRow + "_" + nm, name: nm, rowId: rowid, mode: mode, cm: cm, iCol: iCol });
					var elc = jgrid.createEl.call($t, edittype, opt, tmp, true, $.extend({}, jgrid.ajaxOptions, p.ajaxSelectOptions || {})),
						$dataFiled = cc,
						editingColumnWithTreeGridIcon = p.treeGrid === true && nm === p.ExpandColumn;
					if (editingColumnWithTreeGridIcon) {
						$dataFiled = cc.children("span.cell-wrapperleaf,span.cell-wrapper");
					}
					$dataFiled.html("").append(elc).attr("tabindex", "0");
					if (editingColumnWithTreeGridIcon) { // && elc.style.width === "100%"
						$(elc).width(cc.width() - cc.children("div.tree-wrap").outerWidth());
					}
					jgrid.bindEv.call($t, elc, opt);
					setTimeout(function () {
						$(elc).focus();
					}, 1);
					$("input, select, textarea", cc).bind("keydown", function (e) {
						if (e.keyCode === 27) {
							if ($("input.hasDatepicker", cc).length > 0) {
								if ($(".ui-datepicker").is(":hidden")) {
									$self.jqGrid("restoreCell", iRow, iCol);
								} else {
									$("input.hasDatepicker", cc).datepicker("hide");
								}
							} else {
								$self.jqGrid("restoreCell", iRow, iCol);
							}
						} //ESC
						if (e.keyCode === 13 && !e.shiftKey) {
							$self.jqGrid("saveCell", iRow, iCol);
							// Prevent default action
							return false;
						} //Enter
						if (e.keyCode === 9) {
							if (!$t.grid.hDiv.loading) {
								if (e.shiftKey) {
									$self.jqGrid("prevCell", iRow, iCol); //Shift TAb
								} else {
									$self.jqGrid("nextCell", iRow, iCol); //Tab
								}
							} else {
								return false;
							}
						}
						e.stopPropagation();
					});
					feedback.call($t, "afterEditCell", rowid, nm, tmp, iRow, iCol);
					$self.triggerHandler("jqGridAfterEditCell", [rowid, nm, tmp, iRow, iCol]);
				} else {
					if (iColOld >= 0 && iRowOld >= 0) {
						getTdByColumnIndex.call($t, $trOld[0], iColOld).removeClass(highlightClasses);
						$trOld.removeClass(hoverClasses);
					}
					cc.addClass(highlightClasses);
					$tr.addClass(hoverClasses);
					tmp = cc.html().replace(/&#160;/ig, "");
					feedback.call($t, "onSelectCell", rowid, nm, tmp, iRow, iCol);
				}
				p.iCol = iCol;
				p.iRow = iRow;
			});
		},
		saveCell: function (iRow, iCol) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, infoDialog = jgrid.info_dialog, jqID = jgrid.jqID;

				if (!$t.grid || p.cellEdit !== true) {
					return;
				}
				var errors = $self.jqGrid("getGridRes", "errors"), errcap = errors.errcap,
					edit = $self.jqGrid("getGridRes", "edit"), bClose = edit.bClose,
					savedRow = p.savedRow, fr = savedRow.length >= 1 ? 0 : null;
				if (fr !== null) {
					var tr = $t.rows[iRow], rowid = tr.id, $tr = $(tr), cm = p.colModel[iCol], nm = cm.name, vv,
						cc = getTdByColumnIndex.call($t, tr, iCol), valueText = {},
						v = jgrid.getEditedValue.call($t, cc, cm, valueText);

					// The common approach is if nothing changed do not do anything
					if (v !== savedRow[fr].v) {
						vv = $self.triggerHandler("jqGridBeforeSaveCell", [rowid, nm, v, iRow, iCol]);
						if (vv !== undefined) {
							v = vv;
						}
						if ($.isFunction(p.beforeSaveCell)) {
							vv = p.beforeSaveCell.call($t, rowid, nm, v, iRow, iCol);
							if (vv !== undefined) {
								v = vv;
							}
						}
						var cv = jgrid.checkValues.call($t, v, iCol, undefined, undefined, {
								oldValue: savedRow[fr].v,
								newValue: v,
								cmName: nm,
								rowid: rowid,
								iCol: iCol,
								iRow: iRow,
								cm: cm,
								tr: tr,
								td: cc,
								mode: "cell"
							}),
							formatoptions = cm.formatoptions || {};
						if (cv == null || cv === true || cv[0] === true) {
							var addpost = $self.triggerHandler("jqGridBeforeSubmitCell", [rowid, nm, v, iRow, iCol]) || {};
							if ($.isFunction(p.beforeSubmitCell)) {
								addpost = p.beforeSubmitCell.call($t, rowid, nm, v, iRow, iCol);
								if (!addpost) {
									addpost = {};
								}
							}
							if ($("input.hasDatepicker", cc).length > 0) {
								$("input.hasDatepicker", cc).datepicker("hide");
							}
							if (cm.formatter === "date" && formatoptions.sendFormatted !== true) {
								// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
								// Floating point separator for example
								v = $.unformat.date.call($t, v, cm);
							}
							if (p.cellsubmit === "remote") {
								if (p.cellurl) {
									var postdata = {};
									postdata[nm] = v;
									var opers = p.prmNames, idname = opers.id, oper = opers.oper, hDiv = $t.grid.hDiv;
									postdata[idname] = jgrid.stripPref(p.idPrefix, rowid);
									postdata[oper] = opers.editoper;
									postdata = $.extend(addpost, postdata);
									if (p.autoEncodeOnEdit) {
										$.each(postdata, function (n, val) {
											if (!$.isFunction(val)) {
												postdata[n] = jgrid.oldEncodePostedData(val);
											}
										});
									}
									$self.jqGrid("progressBar", { method: "show", loadtype: p.loadui, htmlcontent: jgrid.defaults.savetext || "Saving..." });
									hDiv.loading = true;
									$.ajax($.extend({
										url: $.isFunction(p.cellurl) ? p.cellurl.call($t, p.cellurl, iRow, iCol, rowid, v, nm) : p.cellurl,
										//data :$.isFunction(p.serializeCellData) ? p.serializeCellData.call($t, postdata) : postdata,
										data: jgrid.serializeFeedback.call($t, p.serializeCellData, "jqGridSerializeCellData", postdata),
										type: "POST",
										complete: function (jqXHR) {
											$self.jqGrid("progressBar", { method: "hide", loadtype: p.loadui });
											hDiv.loading = false;
											if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
												var ret = $self.triggerHandler("jqGridAfterSubmitCell", [$t, jqXHR, postdata.id, nm, v, iRow, iCol]) || [true, ""];
												if (ret == null || ret === true || (ret[0] === true && $.isFunction(p.afterSubmitCell))) {
													ret = p.afterSubmitCell.call($t, jqXHR, postdata.id, nm, v, iRow, iCol);
												}
												if (ret == null || ret === true || ret[0] === true) {
													$self.jqGrid("setCell", rowid, iCol, v, false, false, true);
													cc.addClass("dirty-cell");
													$tr.addClass("edited");
													feedback.call($t, "afterSaveCell", rowid, nm, v, iRow, iCol);
													savedRow.splice(0, 1);
												} else {
													infoDialog.call($t, errcap, ret[1], bClose);
													$self.jqGrid("restoreCell", iRow, iCol);
												}
											}
										},
										error: function (jqXHR, textStatus, errorThrown) {
											$("#lui_" + jqID(p.id)).hide();
											hDiv.loading = false;
											$self.triggerHandler("jqGridErrorCell", [jqXHR, textStatus, errorThrown]);
											if ($.isFunction(p.errorCell)) {
												p.errorCell.call($t, jqXHR, textStatus, errorThrown);
												$self.jqGrid("restoreCell", iRow, iCol);
											} else {
												infoDialog.call($t, errcap, jqXHR.status + " : " + jqXHR.statusText + "<br/>" + textStatus, bClose);
												$self.jqGrid("restoreCell", iRow, iCol);
											}
										}
									}, jgrid.ajaxOptions, p.ajaxCellOptions || {}));
								} else {
									try {
										infoDialog.call($t, errcap, errors.nourl, bClose);
										$self.jqGrid("restoreCell", iRow, iCol);
									} catch (ignore) { }
								}
							}
							if (p.cellsubmit === "clientArray") {
								$self.jqGrid("setCell", rowid, iCol,
									cm.edittype === "select" && cm.formatter !== "select" ? valueText.text : v,
									false, false, true);
								cc.addClass("dirty-cell");
								$tr.addClass("edited");
								feedback.call($t, "afterSaveCell", rowid, nm, v, iRow, iCol);
								savedRow.splice(0, 1);
							}
						} else {
							try {
								setTimeout(function () {
									infoDialog.call($t, errcap, v + " " + cv[1], bClose);
								}, 100);
								$self.jqGrid("restoreCell", iRow, iCol);
							} catch (ignore) { }
						}
					} else {
						$self.jqGrid("restoreCell", iRow, iCol);
					}
				}
				setTimeout(function () {
					$("#" + jqID(p.knv)).attr("tabindex", "-1").focus();
				}, 0);
			});
		},
		restoreCell: function (iRow, iCol) {
			return this.each(function () {
				var $t = this, p = $t.p, tr = $t.rows[iRow], rowid = tr.id, v, cm, formatoptions;
				if (!$t.grid || p.cellEdit !== true) {
					return;
				}
				var savedRow = p.savedRow, cc = getTdByColumnIndex.call($t, tr, iCol);
				if (savedRow.length >= 1) {
					// datepicker fix
					if ($.isFunction($.fn.datepicker)) {
						try {
							$("input.hasDatepicker", cc).datepicker("hide");
						} catch (ignore) { }
					}
					cm = p.colModel[iCol];
					if (p.treeGrid === true && cm.name === p.ExpandColumn) {
						cc.children("span.cell-wrapperleaf,span.cell-wrapper").empty();
					} else {
						cc.empty();
					}
					cc.attr("tabindex", "-1");
					v = savedRow[0].v;
					formatoptions = cm.formatoptions || {};
					if (cm.formatter === "date" && formatoptions.sendFormatted !== true) {
						// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
						// Floating point separator for example
						v = $.unformat.date.call($t, v, cm);
					}
					$($t).jqGrid("setCell", rowid, iCol, v, false, false, true);
					feedback.call($t, "afterRestoreCell", rowid, v, iRow, iCol);
					savedRow.splice(0, 1);
				}
				setTimeout(function () {
					$("#" + p.knv).attr("tabindex", "-1").focus();
				}, 0);
			});
		},
		nextCell: function (iRow, iCol) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, nCol = false, i, editable, cm, rows = $t.rows;
				if (!$t.grid || p.cellEdit !== true || rows == null || rows[iRow] == null) {
					return;
				}
				// try to find next editable cell
				for (i = iCol + 1; i < p.colModel.length; i++) {
					cm = p.colModel[i];
					editable = cm.editable;
					if ($.isFunction(editable)) {
						editable = editable.call($t, {
							rowid: rows[iRow].id,
							iCol: i,
							iRow: iRow,
							name: cm.name,
							cm: cm,
							mode: "cell"
						});
					}
					if (editable === true) {
						nCol = i;
						break;
					}
				}
				if (nCol !== false) {
					$self.jqGrid("editCell", iRow, nCol, true);
				} else {
					if (p.savedRow.length > 0) {
						$self.jqGrid("saveCell", iRow, iCol);
					}
				}
			});
		},
		prevCell: function (iRow, iCol) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, nCol = false, i, editable, cm, rows = $t.rows;
				if (!$t.grid || p.cellEdit !== true || rows == null || rows[iRow] == null) {
					return;
				}
				// try to find next editable cell
				for (i = iCol - 1; i >= 0; i--) {
					cm = p.colModel[i];
					editable = cm.editable;
					if ($.isFunction(editable)) {
						editable = editable.call($t, {
							rowid: rows[iRow].id,
							iCol: i,
							iRow: iRow,
							name: cm.name,
							cm: cm,
							mode: "cell"
						});
					}
					if (editable === true) {
						nCol = i;
						break;
					}
				}
				if (nCol !== false) {
					$self.jqGrid("editCell", iRow, nCol, true);
				} else {
					if (p.savedRow.length > 0) {
						$self.jqGrid("saveCell", iRow, iCol);
					}
				}
			});
		},
		GridNav: function () {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, grid = $t.grid, i, kdir;
				if (!grid || p.cellEdit !== true) {
					return;
				}
				var bDiv = grid.bDiv;
				// trick to process keydown on non input elements
				p.knv = p.id + "_kn";
				var selection = $("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='" + p.knv + "'></div></div>");
				function scrollGrid(iR, iC, tp) {
					var tr = $t.rows[iR];
					if (tp.substr(0, 1) === "v") {
						var ch = bDiv.clientHeight,
							st = bDiv.scrollTop,
							nRot = tr.offsetTop + tr.clientHeight,
							pRot = tr.offsetTop;

						if (tp === "vd") {
							if (nRot >= ch) {
								bDiv.scrollTop = bDiv.scrollTop + tr.clientHeight;
							}
						}
						if (tp === "vu") {
							if (pRot < st) {
								bDiv.scrollTop = bDiv.scrollTop - tr.clientHeight;
							}
						}
					}
					if (tp === "h") {
						var cw = bDiv.clientWidth,
							sl = bDiv.scrollLeft,
							td = tr.cells[iC],
							nCol = td.offsetLeft + td.clientWidth,
							pCol = td.offsetLeft;

						if (nCol >= cw + parseInt(sl, 10)) {
							bDiv.scrollLeft = bDiv.scrollLeft + td.clientWidth;
						} else if (pCol < sl) {
							bDiv.scrollLeft = bDiv.scrollLeft - td.clientWidth;
						}
					}
				}
				function findNextVisible(iC, act) {
					var ind = 0, j, colModel = p.colModel;
					if (act === "lft") {
						ind = iC + 1;
						for (j = iC; j >= 0; j--) {
							if (colModel[j].hidden !== true) {
								ind = j;
								break;
							}
						}
					}
					if (act === "rgt") {
						ind = iC - 1;
						for (j = iC; j < colModel.length; j++) {
							if (colModel[j].hidden !== true) {
								ind = j;
								break;
							}
						}
					}
					return ind;
				}

				$(selection).insertBefore(grid.cDiv);
				$("#" + p.knv)
					.focus()
					.keydown(function (e) {
						var iRowOld = parseInt(p.iRow, 10), iColOld = parseInt(p.iCol, 10);
						kdir = e.keyCode;
						if (p.direction === "rtl") {
							if (kdir === 37) {
								kdir = 39;
							} else if (kdir === 39) {
								kdir = 37;
							}
						}
						switch (kdir) {
							case 38:
								if (iRowOld - 1 > 0) {
									scrollGrid(iRowOld - 1, iColOld, "vu");
									$self.jqGrid("editCell", iRowOld - 1, iColOld, false);
								}
								break;
							case 40:
								if (iRowOld + 1 <= $t.rows.length - 1) {
									scrollGrid(iRowOld + 1, iColOld, "vd");
									$self.jqGrid("editCell", iRowOld + 1, iColOld, false);
								}
								break;
							case 37:
								if (iColOld - 1 >= 0) {
									i = findNextVisible(iColOld - 1, "lft");
									scrollGrid(iRowOld, i, "h");
									$self.jqGrid("editCell", iRowOld, i, false);
								}
								break;
							case 39:
								if (iColOld + 1 <= p.colModel.length - 1) {
									i = findNextVisible(iColOld + 1, "rgt");
									scrollGrid(iRowOld, i, "h");
									$self.jqGrid("editCell", iRowOld, i, false);
								}
								break;
							case 13:
								if (iColOld >= 0 && iRowOld >= 0) {
									$self.jqGrid("editCell", iRowOld, iColOld, true);
								}
								break;
							default:
								return true;
						}
						return false;
					});
			});
		},
		getChangedCells: function (mthd) {
			var ret = [];
			if (!mthd) {
				mthd = "all";
			}
			this.each(function () {
				var $t = this, p = $t.p, htmlDecode = jgrid.htmlDecode, rows = $t.rows;
				if (!$t.grid || p.cellEdit !== true) {
					return;
				}
				$(rows).each(function (j) {
					var res = {};
					if ($(this).hasClass("edited")) {
						var tr = this;
						$(this.cells).each(function (i) {
							var cm = p.colModel[i], nm = cm.name, $td = getTdByColumnIndex.call($t, tr, i); // $td = $(this);
							if (nm !== "cb" && nm !== "subgrid" && nm !== "rn" && (mthd !== "dirty" || $td.hasClass("dirty-cell"))) {
								try {
									res[nm] = $.unformat.call($t, $td[0], { rowId: rows[j].id, colModel: cm }, i);
								} catch (e) {
									res[nm] = htmlDecode($td.html());
								}
							}
						});
						res.id = this.id;
						ret.push(res);
					}
				});
			});
			return ret;
		}
	});
	// end module grid.celledit

	/**
	 * jqGrid common function
	 * Tony Tomov tony@trirand.com, http://trirand.com/blog/
	 * Changed by Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	*/
	// begin module grid.common
	var getGuiStyles = base.getGuiStyles, getGridRes = base.getGridRes;

	jgrid.jqModal = jgrid.jqModal || {};
	$.extend(true, jgrid.jqModal, { toTop: true });

	$.extend(jgrid, {
		// Modal functions
		// The methods showModal and closeModal will be used as callback of $.jqm jQuery plugin defined in jqModal.js
		// The modul can support multiple modal dialods. It hold the information about evety active modules in internal array of "hashes".
		// The modal dialogs as hidden typically. Before the dialog will be visible onShow callback (showModal) will be called.
		//
		// Every eleement contains "hash object" which have 4 properties:
		//  w: (jQuery object) The modal element, represent the outer div of the modal dialog
		//  o: (jQuery object) The overlay element. It will be assigned on the first opening of the modal
		//  c: (object) The modal's options object. The options used durin creating the modal.
		//          One can use global $.jgrid.jqModal or gris specifif p.jqModal to specify defaults of the options.
		//  t: (DOM object) The triggering element.
		//  s: numeric part of "id" used for modal dialog. The modal dialog have class "jqmID" + s.
		//  a: Boolean. It's false initially. It will be set to true during opening and will set to false on closing.
		showModal: function (h) {
			//  w: (jQuery object) The modal element
			h.w.show();
		},
		closeModal: function (h) {
			//  w: (jQuery object) The modal element
			//  o: (jQuery object) The overlay element
			//  c: (object) The modal's options object
			h.w.hide().attr("aria-hidden", "true");
			if (h.o) {
				h.o.remove();
			}
		},
		hideModal: function (selector, o) {
			o = $.extend({ jqm: true, gb: "", removemodal: false }, o || {});
			var thisgrid = o.gb && typeof o.gb === "string" && o.gb.substr(0, 6) === "#gbox_" ? $("#" + o.gb.substr(6))[0] : false,
				$selector = $(selector);
			if (o.onClose) {
				var oncret = thisgrid ? o.onClose.call(thisgrid, selector) : o.onClose(selector);
				if (typeof oncret === "boolean" && !oncret) { return; }
			}
			if ($.fn.jqm && o.jqm === true) {
				$selector.attr("aria-hidden", "true").jqmHide();
			} else {
				if (o.gb !== "") {
					try { $(">.jqgrid-overlay", o.gb).first().hide(); } catch (ignore) { }
				}
				$selector.hide().attr("aria-hidden", "true");
			}
			if (o.removemodal) {
				$selector.remove();
			}
		},
		//Helper functions
		findPos: function (obj) {
			var curleft = 0, curtop = 0;
			if (obj.offsetParent) {
				do {
					curleft += obj.offsetLeft;
					curtop += obj.offsetTop;
					obj = obj.offsetParent;
				} while (obj);
				//do not change obj == obj.offsetParent
			}
			return [curleft, curtop];
		},
		createModal: function (aIDs, content, o, insertSelector, posSelector, appendsel, css) {
			var jqID = jgrid.jqID, p = this.p, gridjqModal = p != null ? p.jqModal || {} : {};
			o = $.extend(true, {
				resizingRightBottomIcon: base.getIconRes.call(this, "form.resizableLtr")
			}, jgrid.jqModal || {}, gridjqModal, o);
			// create main window "div.ui-jqdialog", which will contains other components of the modal window:
			// "div.ui-jqdialog-titlebar", "div.ui-jqdialog-content" and optionally resizer like "div.jqResize"
			var mw = document.createElement("div"), themodalSelector = "#" + jqID(aIDs.themodal),
				rtlsup = $(o.gbox).attr("dir") === "rtl" ? true : false,
				resizeAlso = aIDs.resizeAlso ? "#" + jqID(aIDs.resizeAlso) : false;
			css = $.extend({}, css || {});
			mw.className = getGuiStyles.call(this, "dialog.window", "ui-jqdialog");
			mw.id = aIDs.themodal;
			mw.dir = rtlsup ? "rtl" : "ltr";
			var mdoc = document.createElement("div");
			mdoc.className = getGuiStyles.call(this, "dialog.document");
			$(mdoc).attr("role", "document");
			var msubdoc = document.createElement("div");
			msubdoc.className = getGuiStyles.call(this, "dialog.subdocument");
			mdoc.appendChild(msubdoc);
			mw.appendChild(mdoc);
			// create the title "div.ui-jqdialog-titlebar", which contains:
			// "span.ui-jqdialog-title" with the title text and "a.ui-jqdialog-titlebar-close" with the closing button
			var mh = document.createElement("div");
			mh.className = getGuiStyles.call(this,
				"dialog.header",
				"ui-jqdialog-titlebar " + (rtlsup ? "ui-jqdialog-titlebar-rtl" : "ui-jqdialog-titlebar-ltr"));
			mh.id = aIDs.modalhead;
			$(mh).append("<span class='ui-jqdialog-title'>" + o.caption + "</span>");
			var hoverClasses = getGuiStyles.call(this, "states.hover"),
				ahr = $("<a aria-label='Close' class='" + getGuiStyles.call(this, "dialog.closeButton", "ui-jqdialog-titlebar-close") + "'></a>")
					.hover(function () { ahr.addClass(hoverClasses); },
						function () { ahr.removeClass(hoverClasses); })
					.append("<span class='" + base.getIconRes.call(this, "form.close") + "'></span>");
			$(mh).append(ahr);
			// create "div.ui-jqdialog-content" which hold some HTML content (see input parameter)
			var mc = document.createElement("div");
			$(mc).addClass(getGuiStyles.call(this, "dialog.content", "ui-jqdialog-content"))
				.attr("id", aIDs.modalcontent);
			$(mc).append(content);
			// place "div.ui-jqdialog-content" and "div.ui-jqdialog-titlebar" in main window "div.ui-jqdialog"
			msubdoc.appendChild(mc);
			$(msubdoc).prepend(mh);
			// appendsel and insertSelector specifies where the dialog should be placed on the HTML page
			if (appendsel === true) {
				$("body").append(mw);  //append as first child in body -for alert dialog
			} else if (typeof appendsel === "string") {
				$(appendsel).append(mw);
			} else { $(mw).insertBefore(insertSelector); }
			$(mw).css(css);
			if (o.jqModal === undefined) { o.jqModal = true; } // internal use
			var coord = {};
			if ($.fn.jqm && o.jqModal === true) {
				if (o.left === 0 && o.top === 0 && o.overlay) {
					var pos = [];
					pos = jgrid.findPos(posSelector);
					o.left = pos[0] + 4;
					o.top = pos[1] + 4;
				}
				coord.top = o.top + "px";
				coord.left = o.left;
			} else if (o.left !== 0 || o.top !== 0) {
				coord.left = o.left;
				coord.top = o.top + "px";
			}
			$("a.ui-jqdialog-titlebar-close", mh).click(function () {
				var oncm = $(themodalSelector).data("onClose") || o.onClose;
				var gboxclose = $(themodalSelector).data("gbox") || o.gbox;
				jgrid.hideModal(themodalSelector, {
					gb: gboxclose,
					jqm: o.jqModal,
					onClose: oncm,
					removemodal: o.removemodal || false
				});
				return false;
			});
			if (o.width === 0 || !o.width) { o.width = 300; }
			if (o.height === 0 || !o.height) { o.height = 200; }
			if (!o.zIndex) {
				var parentZ = $(insertSelector).parents("*[role=dialog]").first().css("z-index");
				if (parentZ) {
					o.zIndex = parseInt(parentZ, 10) + 2;
					o.toTop = true;
				} else {
					o.zIndex = 950;
				}
			}
			// ONE NEEDS correction of left position in case of RTL, but the current code places
			// modal dialog OUT OF visible part of/ the window if <body dir="rtl">.
			// Thus first of all the lines are commented. Later the FIXED code below will be included.
			/*var rtlt = 0;
			if( rtlsup && coord.left && !appendsel) {
				rtlt = $(o.gbox).width()- (!isNaN(o.width) ? parseInt(o.width,10) :0) - 8; // to do
			// just in case
				coord.left = parseInt(coord.left,10) + parseInt(rtlt,10);
			}*/
			if (coord.left) { coord.left += "px"; }
			$(mw).css($.extend({
				width: isNaN(o.width) ? "auto" : o.width + "px",
				height: isNaN(o.height) ? "auto" : o.height + "px",
				zIndex: o.zIndex
			}, coord))
				.attr({ tabIndex: "-1", "role": "dialog", "aria-labelledby": aIDs.modalhead, "aria-hidden": "true" });
			if (o.drag === undefined) { o.drag = true; }
			if (o.resize === undefined) { o.resize = true; }
			if (o.drag) {
				if ($.fn.jqDrag) {
					// .ui-draggable .ui-dialog-titlebar {cursor: move}
					//$(mw).addClass("ui-draggable"); //css("cursor", "move");
					$(mh).css("cursor", "move");
					$(mw).jqDrag(mh);
				} else {
					try {
						$(mw).draggable({ handle: $("#" + jqID(mh.id)) });
					} catch (ignore) { }
				}
			}
			if (o.resize) {
				if ($.fn.jqResize) {
					$(mc).append("<div class='jqResize ui-resizable-handle ui-resizable-se " + o.resizingRightBottomIcon + "'></div>");
					$(themodalSelector).jqResize(".jqResize", resizeAlso);
				} else {
					try {
						$(mw).resizable({ handles: "se, sw", alsoResize: resizeAlso });
					} catch (ignore) { }
				}
			}
			if (o.closeOnEscape === true) {
				$(mw).keydown(function (e) {
					if (e.which === 27) {
						var cone = $(themodalSelector).data("onClose") || o.onClose;
						jgrid.hideModal(themodalSelector, { gb: o.gbox, jqm: o.jqModal, onClose: cone, removemodal: o.removemodal || false, formprop: !o.recreateForm || false, form: o.form || "" });
					}
				});
			}
		},
		viewModal: function (selector, o) {
			o = $.extend(true, {
				//toTop: false,
				overlay: 30,
				modal: false,
				overlayClass: getGuiStyles.call(this, "overlay"), // "ui-widget-overlay"
				onShow: jgrid.showModal,
				onHide: jgrid.closeModal,
				gbox: "",
				jqm: true,
				jqM: true
			}, jgrid.jqModal || {}, o || {});
			if ($.fn.jqm && o.jqm === true) {
				if (o.jqM) {
					$(selector).attr("aria-hidden", "false").jqm(o).jqmShow();
				} else {
					$(selector).attr("aria-hidden", "false").jqmShow();
				}
			} else {
				if (o.gbox !== "") {
					$(">.jqgrid-overlay", o.gbox).first().show();
					$(selector).data("gbox", o.gbox);
				}
				$(selector).show().attr("aria-hidden", "false");
				try { $(":input:visible", selector)[0].focus(); } catch (ignore) { }
			}
		},
		info_dialog: function (caption, content, closeButtonText, modalopt) {
			var $t = this, p = $t.p, gridjqModal = p != null ? p.jqModal || {} : {},
				mopt = $.extend(true,
					{
						width: 290,
						height: "auto",
						dataheight: "auto",
						drag: true,
						resize: false,
						left: 250,
						top: 170,
						zIndex: 1000,
						jqModal: true,
						modal: false,
						closeOnEscape: true,
						align: "center",
						buttonalign: "center",
						buttons: []
						// {text:"textbutt", id:"buttid", onClick : function(){...}}
						// if the id is not provided we set it like info_button_+ the index in the array - i.e info_button_0,info_button_1...
					},
					jgrid.jqModal || {},
					gridjqModal,
					{ caption: "<b>" + caption + "</b>" },
					modalopt || {}),
				jm = mopt.jqModal;

			if ($.fn.jqm && !jm) { jm = false; }
			// in case there is no jqModal
			var buttstr = "", i, hoverClasses = getGuiStyles.call($t, "states.hover");
			if (mopt.buttons.length > 0) {
				for (i = 0; i < mopt.buttons.length; i++) {
					if (mopt.buttons[i].id === undefined) { mopt.buttons[i].id = "info_button_" + i; }
					buttstr += jgrid.builderFmButon.call($t, mopt.buttons[i].id, mopt.buttons[i].text);
				}
			}
			var dh = isNaN(mopt.dataheight) ? mopt.dataheight : mopt.dataheight + "px",
				cn = "text-align:" + mopt.align + ";",
				cnt = "<div id='info_id'>";
			cnt += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:" + dh + ";" + cn + "'>" + content + "</div>";
			if (closeButtonText || buttstr !== "") {
				cnt += "<hr class='" + getGuiStyles.call($t, "dialog.hr") + "' style='margin:1px'/><div style='text-align:" + mopt.buttonalign +
					";padding:.8em 0 .5em 0;background-image:none;border-width: 1px 0 0 0;'>" +
					(closeButtonText ? jgrid.builderFmButon.call($t, "closedialog", closeButtonText) : "") + buttstr + "</div>";
			}
			cnt += "</div>";

			try {
				if ($("#info_dialog").attr("aria-hidden") === "false") {
					jgrid.hideModal("#info_dialog", { jqm: jm });
				}
				$("#info_dialog").remove();
			} catch (ignore) { }
			jgrid.createModal.call($t,
				{
					themodal: "info_dialog",
					modalhead: "info_head",
					modalcontent: "info_content",
					resizeAlso: "infocnt"
				},
				cnt,
				mopt,
				"", "", true);
			// attach onclick after inserting into the dom
			if (buttstr) {
				$.each(mopt.buttons, function (j) {
					$("#" + jgrid.jqID($t.id), "#info_id").bind("click", function () { mopt.buttons[j].onClick.call($("#info_dialog")); return false; });
				});
			}
			$("#closedialog", "#info_id").click(function () {
				jgrid.hideModal("#info_dialog", {
					jqm: jm,
					onClose: $("#info_dialog").data("onClose") || mopt.onClose,
					gb: $("#info_dialog").data("gbox") || mopt.gbox
				});
				return false;
			});
			$(".fm-button", "#info_dialog").hover(
				function () { $(this).addClass(hoverClasses); },
				function () { $(this).removeClass(hoverClasses); }
			);
			if ($.isFunction(mopt.beforeOpen)) { mopt.beforeOpen(); }
			jgrid.viewModal.call($t, "#info_dialog", {
				onHide: function (h) {
					h.w.hide().remove();
					if (h.o) { h.o.remove(); }
				},
				modal: mopt.modal,
				jqm: jm
			});
			if ($.isFunction(mopt.afterOpen)) { mopt.afterOpen(); }
			try { $("#info_dialog").focus(); } catch (ignore) { }
		},
		bindEv: function (el, opt) {
			var $t = this;
			if ($.isFunction(opt.dataInit)) {
				opt.dataInit.call($t, el, opt);
			}
			if (opt.dataEvents) {
				$.each(opt.dataEvents, function () {
					if (this.data !== undefined) {
						$(el).bind(this.type, this.data, this.fn);
					} else {
						$(el).bind(this.type, this.fn);
					}
				});
			}
		},
		// Form Functions
		createEl: function (eltype, options, vl, autowidth, ajaxso) {
			var elem = "", $t = this, p = $t.p, infoDialog = jgrid.info_dialog,
				getRes = function (path) { return getGridRes.call($($t), path); },
				errcap = getRes("errors.errcap"), edit = getRes("edit"), editMsg = edit.msg, bClose = edit.bClose;
			function setAttributes(elm, atr, exl) {
				var exclude = ["dataInit", "dataEvents", "dataUrl", "buildSelect", "sopt", "searchhidden", "defaultValue", "attr", "custom_element", "custom_value", "selectFilled", "rowId", "mode"];
				if (exl !== undefined && $.isArray(exl)) {
					$.merge(exclude, exl);
				}
				$.each(atr, function (attrName, value) {
					if ($.inArray(attrName, exclude) === -1) {
						$(elm).attr(attrName, value);
					}
				});
				if (!atr.hasOwnProperty("id")) {
					$(elm).attr("id", jgrid.randId());
				}
			}

			if (options == null) { return ""; }

			switch (eltype) {
				case "textarea":
					elem = document.createElement("textarea");
					if (autowidth) {
						if (!options.cols) { $(elem).css({ width: "100%", "box-sizing": "border-box" }); }
					} else if (!options.cols) { options.cols = 19; }
					if (!options.rows) { options.rows = 2; }
					if (vl === "&nbsp;" || vl === "&#160;" || (vl.length === 1 && vl.charCodeAt(0) === 160)) { vl = ""; }
					elem.value = vl;
					setAttributes(elem, options);
					$(elem).attr({ role: "textbox" }); // , "multiline": "true"
					break;
				case "checkbox": //what code for simple checkbox
					elem = document.createElement("input");
					elem.type = "checkbox";
					if (!options.value) {
						var vl1 = String(vl).toLowerCase();
						if (vl1.search(/(false|f|0|no|n|off|undefined)/i) < 0 && vl1 !== "") {
							elem.checked = true;
							elem.defaultChecked = true;
							elem.value = vl;
						} else {
							elem.value = "on";
						}
						$(elem).data("offval", "off");
					} else {
						var cbval = options.value.split(":");
						if (vl === cbval[0]) {
							elem.checked = true;
							elem.defaultChecked = true;
						}
						elem.value = cbval[0];
						$(elem).data("offval", cbval[1]);
					}
					setAttributes(elem, options, ["value"]);
					$(elem).attr({ role: "checkbox", "aria-checked": elem.checked ? "true" : "false" });
					break;
				case "select":
					elem = document.createElement("select");
					var msl, ovm = [], isSelected;

					if (options.multiple === true) {
						msl = true;
						elem.multiple = "multiple";
						$(elem).attr("aria-multiselectable", "true");
						ovm = vl.split(",");
						ovm = $.map(ovm, function (n) { return $.trim(n); });
					} else {
						msl = false;
						ovm[0] = $.trim(vl);
					}
					if (options.size === undefined) {
						options.size = msl ? 3 : 1;
					}
					if (options.dataUrl !== undefined) {
						var rowid = null, postData = options.postData || ajaxso.postData,
							ajaxContext = { elem: elem, options: options, cm: options.cm, iCol: options.iCol, ovm: ovm };
						try {
							rowid = options.rowId;
						} catch (ignore) { }

						if (p && p.idPrefix) {
							rowid = jgrid.stripPref(p.idPrefix, rowid);
						}
						$.ajax($.extend({
							url: $.isFunction(options.dataUrl) ? options.dataUrl.call($t, rowid, vl, String(options.name), ajaxContext) : options.dataUrl,
							type: "GET",
							dataType: "html",
							data: $.isFunction(postData) ? postData.call($t, rowid, vl, String(options.name)) : postData,
							context: ajaxContext,
							success: function (data, textStatus, jqXHR) {
								var ovm1 = this.ovm, elem1 = this.elem, cm1 = this.cm, iCol1 = this.iCol,
									options1 = $.extend({}, this.options),
									a = $.isFunction(options1.buildSelect) ? options1.buildSelect.call($t, data, jqXHR, cm1, iCol1) : data;
								if (typeof a === "string") {
									a = $($.trim(a)).html();
								}
								if (a) {
									//$(elem1).empty(); // ???
									$(elem1).append(a);
									setAttributes(elem1, options1, postData ? ["postData"] : undefined);
									setTimeout(function () {
										var isSelected1; // undefined
										$("option", elem1).each(function (iOpt) {
											//if(i===0) { this.selected = ""; }
											// fix IE8/IE7 problem with selecting of the first item on multiple=true
											if (iOpt === 0 && elem1.multiple) { this.selected = false; }
											if ($.inArray($.trim($(this).val()), ovm1) > -1) {
												this.selected = "selected";
												isSelected1 = true;
											}
										});
										if (!isSelected1) {
											$("option", elem1).each(function () {
												if ($.inArray($.trim($(this).text()), ovm1) > -1) {
													this.selected = "selected";
												}
											});
										}
										jgrid.fullBoolFeedback.call($t, options1.selectFilled, "jqGridSelectFilled", {
											elem: elem1,
											options: options1,
											cm: cm1,
											cmName: cm1 != null ? cm1.name : options1.name,
											iCol: iCol1
										});
									}, 0);
								}
							}
						}, ajaxso || {}));
					} else if (options.value) {
						if (typeof options.value === "function") { options.value = options.value(); }
						var i, so, sv, ov, optionInfos = [], optionInfo,
							sep = options.separator === undefined ? ":" : options.separator,
							delim = options.delimiter === undefined ? ";" : options.delimiter,
							mapFunc = function (n, ii) { if (ii > 0) { return n; } };
						if (typeof options.value === "string") {
							so = options.value.split(delim);
							for (i = 0; i < so.length; i++) {
								sv = so[i].split(sep);
								if (sv.length > 2) {
									sv[1] = $.map(sv, mapFunc).join(sep);
								}
								optionInfos.push({
									value: sv[0],
									innerHtml: sv[1],
									selectValue: $.trim(sv[0]),
									selectText: $.trim(sv[1])
								});
							}
						} else if (typeof options.value === "object") {
							var oSv = options.value, key;
							for (key in oSv) {
								if (oSv.hasOwnProperty(key)) {
									optionInfos.push({
										value: key,
										innerHtml: oSv[key],
										selectValue: $.trim(key),
										selectText: $.trim(oSv[key])
									});
								}
							}
						}
						//$(elem).empty();
						for (i = 0; i < optionInfos.length; i++) {
							optionInfo = optionInfos[i];
							ov = document.createElement("option");
							ov.value = optionInfo.value;
							ov.innerHTML = optionInfo.innerHtml;
							elem.appendChild(ov);
							if (!msl && optionInfo.selectValue === $.trim(vl)) {
								ov.selected = "selected";
								isSelected = true;
							}
							if (msl && $.inArray(optionInfo.selectValue, ovm) > -1) {
								ov.selected = "selected";
								isSelected = true;
							}
						}
						if (!isSelected) {
							for (i = 0; i < optionInfos.length; i++) {
								optionInfo = optionInfos[i];
								if (!msl && optionInfo.selectText === $.trim(vl)) {
									ov.selected = "selected";
								}
								if (msl && $.inArray(optionInfo.selectText, ovm) > -1) {
									ov.selected = "selected";
								}
							}
						}
						setAttributes(elem, options, ["value"]);
						jgrid.fullBoolFeedback.call($t, options.selectFilled, "jqGridSelectFilled", {
							elem: elem,
							options: options,
							cm: options.cm,
							cmName: options.cm != null ? options.cm.name : options.name,
							iCol: options.iCol
						});
					}
					break;
				case "text":
				case "password":
				case "button":
					var role;
					if (eltype === "button") {
						role = "button";
					} else {
						role = "textbox";
					}
					elem = document.createElement("input");
					elem.type = eltype;
					setAttributes(elem, options);
					elem.value = vl;
					if (eltype !== "button") {
						if (autowidth) {
							if (!options.size) { $(elem).css({ width: "100%", "box-sizing": "border-box" }); }
						} else if (!options.size) {
							options.size = 20;
						}
					}
					$(elem).attr("role", role);
					break;
				case "image":
				case "file":
					elem = document.createElement("input");
					elem.type = eltype;
					setAttributes(elem, options);
					break;
				case "custom":
					elem = document.createElement("span");
					try {
						if ($.isFunction(options.custom_element)) {
							var celm = options.custom_element.call($t, vl, options);
							if (celm instanceof jQuery || jgrid.isHTMLElement(celm) || typeof celm === "string") {
								celm = $(celm).addClass("customelement").attr({ id: options.id, name: options.name });
								$(elem).empty().append(celm);
							} else {
								throw "editoptions.custom_element returns value of a wrong type";
							}
						} else {
							throw "editoptions.custom_element is not a function";
						}
					} catch (e) {
						if (e === "e1") {
							infoDialog.call($t, errcap, "function 'custom_element' " + editMsg.nodefined, bClose);
						}
						if (e === "e2") {
							infoDialog.call($t, errcap, "function 'custom_element' " + editMsg.novalue, bClose);
						} else {
							infoDialog.call($t, errcap, typeof e === "string" ? e : e.message, bClose);
						}
					}
					break;
			}
			return elem;
		},
		// Date Validation Javascript
		checkDate: function (format, date) {
			var daysInFebruary = function (year) {
					// February has 29 days in any year evenly divisible by four,
					// EXCEPT for centurial years which are not also divisible by 400.
					return (((year % 4 === 0) && (year % 100 !== 0 || (year % 400 === 0))) ? 29 : 28);
				},
				tsp = {},
				sep;
			format = format.toLowerCase();
			//we search for /,-,. for the date separator
			if (format.indexOf("/") !== -1) {
				sep = "/";
			} else if (format.indexOf("-") !== -1) {
				sep = "-";
			} else if (format.indexOf(".") !== -1) {
				sep = ".";
			} else {
				sep = "/";
			}
			format = format.split(sep);
			date = date.split(sep);
			if (date.length !== 3) { return false; }
			var j = -1, yln, dln = -1, mln = -1, i, dv;
			for (i = 0; i < format.length; i++) {
				dv = isNaN(date[i]) ? 0 : parseInt(date[i], 10);
				tsp[format[i]] = dv;
				yln = format[i];
				if (yln.indexOf("y") !== -1) { j = i; }
				if (yln.indexOf("m") !== -1) { mln = i; }
				if (yln.indexOf("d") !== -1) { dln = i; }
			}
			if (format[j] === "y" || format[j] === "yyyy") {
				yln = 4;
			} else if (format[j] === "yy") {
				yln = 2;
			} else {
				yln = -1;
			}
			var strDate, daysInMonth = [0, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];
			if (j === -1) {
				return false;
			}
			strDate = tsp[format[j]].toString();
			if (yln === 2 && strDate.length === 1) { yln = 1; }
			if (strDate.length !== yln || (tsp[format[j]] === 0 && date[j] !== "00")) {
				return false;
			}
			if (mln === -1) {
				return false;
			}
			strDate = tsp[format[mln]].toString();
			if (strDate.length < 1 || tsp[format[mln]] < 1 || tsp[format[mln]] > 12) {
				return false;
			}
			if (dln === -1) {
				return false;
			}
			strDate = tsp[format[dln]].toString();
			if (strDate.length < 1 || tsp[format[dln]] < 1 || tsp[format[dln]] > 31 || (tsp[format[mln]] === 2 && tsp[format[dln]] > daysInFebruary(tsp[format[j]])) || tsp[format[dln]] > daysInMonth[tsp[format[mln]]]) {
				return false;
			}
			return true;
		},
		isEmpty: function (val) {
			if (val.match(/^\s+$/) || val === "") {
				return true;
			}
			return false;
		},
		checkTime: function (time) {
			// checks only hh:ss (and optional am/pm)
			var re = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/, regs;
			if (!jgrid.isEmpty(time)) {
				regs = time.match(re);
				if (regs) {
					if (regs[3]) {
						if (regs[1] < 1 || regs[1] > 12) { return false; }
					} else {
						if (regs[1] > 23) { return false; }
					}
					if (regs[2] > 59) {
						return false;
					}
				} else {
					return false;
				}
			}
			return true;
		},
		checkValues: function (val, iCol, customobject, nam, options) {
			var edtrul, nm, dft, g = this, p = g.p, colModel = p.colModel, cm, isEmpty = jgrid.isEmpty,
				editMsg = getGridRes.call($(g), "edit.msg"), ret,
				dateMasks = getGridRes.call($(g), "formatter.date.masks");
			if (customobject === undefined) {
				if (typeof iCol === "string") {
					iCol = p.iColByName[iCol];
				}
				if (iCol === undefined || iCol < 0) {
					return [true, "", ""];
				}
				cm = colModel[iCol];
				edtrul = cm.editrules;
				if (cm.formoptions != null) { nm = cm.formoptions.label; }
			} else {
				edtrul = customobject;
				nm = nam === undefined ? "_" : nam;
				cm = colModel[iCol];
			}
			if (edtrul) {
				if (!nm) { nm = p.colNames != null ? p.colNames[iCol] : cm.label; }
				if (edtrul.required === true) {
					if (isEmpty(val)) { return [false, nm + ": " + editMsg.required, ""]; }
				}
				// force required
				var rqfield = edtrul.required === false ? false : true;
				if (edtrul.number === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if (isNaN(val)) { return [false, nm + ": " + editMsg.number, ""]; }
					}
				}
				if (edtrul.minValue !== undefined && !isNaN(edtrul.minValue)) {
					if (parseFloat(val) < parseFloat(edtrul.minValue)) { return [false, nm + ": " + editMsg.minValue + " " + edtrul.minValue, ""]; }
				}
				if (edtrul.maxValue !== undefined && !isNaN(edtrul.maxValue)) {
					if (parseFloat(val) > parseFloat(edtrul.maxValue)) { return [false, nm + ": " + editMsg.maxValue + " " + edtrul.maxValue, ""]; }
				}
				var filter;
				if (edtrul.email === true) {
					if (!(rqfield === false && isEmpty(val))) {
						// taken from $ Validate plugin
						filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
						if (!filter.test(val)) { return [false, nm + ": " + editMsg.email, ""]; }
					}
				}
				if (edtrul.integer === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if (isNaN(val)) { return [false, nm + ": " + editMsg.integer, ""]; }
						if ((val % 1 !== 0) || (val.indexOf(".") !== -1)) { return [false, nm + ": " + editMsg.integer, ""]; }
					}
				}
				if (edtrul.date === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if (cm.formatoptions && cm.formatoptions.newformat) {
							dft = cm.formatoptions.newformat;
							if (dateMasks.hasOwnProperty(dft)) {
								dft = dateMasks[dft];
							}
						} else {
							dft = colModel[iCol].datefmt || "Y-m-d";
						}
						if (!jgrid.checkDate(dft, val)) { return [false, nm + ": " + editMsg.date + " - " + dft, ""]; }
					}
				}
				if (edtrul.time === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if (!jgrid.checkTime(val)) { return [false, nm + ": " + editMsg.date + " - hh:mm (am/pm)", ""]; }
					}
				}
				if (edtrul.url === true) {
					if (!(rqfield === false && isEmpty(val))) {
						filter = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
						if (!filter.test(val)) { return [false, nm + ": " + editMsg.url, ""]; }
					}
				}
				if (edtrul.custom === true) {
					if (!(rqfield === false && isEmpty(val))) {
						if ($.isFunction(edtrul.custom_func)) {
							ret = edtrul.custom_func.call(g, val, nm, iCol);
							return $.isArray(ret) ? ret : [false, editMsg.customarray, ""];
						}
						return [false, editMsg.customfcheck, ""];
					}
				} else if ($.isFunction(edtrul.custom)) {
					if (!(rqfield === false && isEmpty(val))) {
						ret = edtrul.custom.call(g, options);
						return $.isArray(ret) ? ret : [false, editMsg.customarray, ""];
					}
				}
			}
			return [true, "", ""];
		}
	});
	// end module grid.common

	/**
	 * jqGrid extension for custom methods
	 * Tony Tomov tony@trirand.com, http://trirand.com/blog/
	 *
	 * Wildraid wildraid@mail.ru
	 * Oleg Kiriljuk oleg.kiriljuk@ok-soft-gmbh.com
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	**/
	// begin module grid.custom
	jgrid.extend({
		getColProp: function (colname) {
			var ret = {}, t = this[0], iCol;
			if (t != null && t.grid) {
				iCol = t.p.iColByName[colname];
				if (iCol !== undefined) {
					return t.p.colModel[iCol];
				}
			}
			return ret;
		},
		setColProp: function (colname, obj) {
			//do not set width will not work
			return this.each(function () {
				var self = this, p = self.p, iCol;
				if (self.grid && p != null && obj) {
					iCol = p.iColByName[colname];
					if (iCol !== undefined) {
						$.extend(true, p.colModel[iCol], obj);
					}
				}
			});
		},
		sortGrid: function (colname, reload, sor) {
			return this.each(function () {
				var self = this, grid = self.grid, p = self.p, colModel = p.colModel, l = colModel.length, cm, i, sobj = false, sort;
				if (!grid) { return; }
				if (!colname) { colname = p.sortname; }
				if (typeof reload !== "boolean") { reload = false; }
				for (i = 0; i < l; i++) {
					cm = colModel[i];
					if (cm.index === colname || cm.name === colname) {
						if (p.frozenColumns === true && cm.frozen === true) {
							sobj = grid.fhDiv.find("#" + p.id + "_" + colname);
						}
						if (!sobj || sobj.length === 0) {
							sobj = grid.headers[i].el;
						}
						sort = cm.sortable;
						if (typeof sort !== "boolean" || sort) {
							self.sortData("jqgh_" + p.id + "_" + colname, i, reload, sor, sobj);
						}
						break;
					}
				}
			});
		},
		clearBeforeUnload: function () {
			return this.each(function () {
				var self = this, p = self.p, grid = self.grid, propOrMethod, clearArray = jgrid.clearArray,
					hasOwnProperty = Object.prototype.hasOwnProperty;
				if ($.isFunction(grid.emptyRows)) {
					grid.emptyRows.call(self, true, true); // this work quick enough and reduce the size of memory leaks if we have someone
				}

				$(document).unbind("mouseup.jqGrid" + p.id);
				$(grid.hDiv).unbind("mousemove"); // TODO add namespace
				$(self).unbind();

				/*grid.dragEnd = null;
				grid.dragMove = null;
				grid.dragStart = null;
				grid.emptyRows = null;
				grid.populate = null;
				grid.populateVisible = null;
				grid.scrollGrid = null;
				grid.selectionPreserver = null;

				grid.bDiv = null;
				grid.fbRows = null;
				grid.cDiv = null;
				grid.hDiv = null;
				grid.cols = null;*/
				var i, l = grid.headers.length;
				for (i = 0; i < l; i++) {
					grid.headers[i].el = null;
				}
				for (propOrMethod in grid) {
					if (grid.hasOwnProperty(propOrMethod)) {
						grid.propOrMethod = null;
					}
				}

				/*self.formatCol = null;
				self.sortData = null;
				self.updatepager = null;
				self.refreshIndex = null;
				self.setHeadCheckBox = null;
				self.constructTr = null;
				self.formatter = null;
				self.addXmlData = null;
				self.addJSONData = null;
				self.grid = null;*/

				var propOrMethods = ["formatCol", "sortData", "updatepager", "refreshIndex", "setHeadCheckBox", "constructTr", "clearToolbar", "fixScrollOffsetAndhBoxPadding", "rebuildRowIndexes", "modalAlert", "toggleToolbar", "triggerToolbar", "formatter", "addXmlData", "addJSONData", "ftoolbar", "_inlinenav", "nav", "grid", "p"];
				l = propOrMethods.length;
				for (i = 0; i < l; i++) {
					if (hasOwnProperty.call(self, propOrMethods[i])) {
						self[propOrMethods[i]] = null;
					}
				}
				self._index = {};
				clearArray(p.data);
				clearArray(p.lastSelectedData);
				clearArray(p.selarrrow);
				clearArray(p.savedRow);
			});
		},
		GridDestroy: function () {
			return this.each(function () {
				var self = this, p = self.p;
				if (self.grid && p != null) {
					if (p.pager) { // if not part of grid
						$(p.pager).remove();
					}
					try {
						$("#alertmod_" + p.idSel).remove();
						$(self).jqGrid("clearBeforeUnload");
						$(p.gBox).remove();
					} catch (ignore) { }
				}
			});
		},
		GridUnload: function () {
			return this.each(function () {
				var self = this, $self = $(self), p = self.p, $j = $.fn.jqGrid;
				if (!self.grid) { return; }
				$self.removeClass($j.getGuiStyles.call($self, "grid", "ui-jqgrid-btable"));
				// The multiple removeAttr can be replace to one after dropping of support of old jQuery
				if (p.pager) {
					$(p.pager).empty()
						.removeClass($j.getGuiStyles.call($self, "pagerBottom", "ui-jqgrid-pager"))
						.removeAttr("style")
						.removeAttr("dir");
				}
				$self.jqGrid("clearBeforeUnload");
				$self.removeAttr("style")
					.removeAttr("tabindex")
					.removeAttr("role")
					.removeAttr("aria-labelledby")
					.removeAttr("style");
				$self.empty(); // remove the first line
				$self.insertBefore(p.gBox).show();
				$(p.pager).insertBefore(p.gBox).show();
				$(p.gBox).remove();
			});
		},
		setGridState: function (state) {
			return this.each(function () {
				var $t = this, p = $t.p, grid = $t.grid, cDiv = grid.cDiv, $uDiv = $(grid.uDiv), $ubDiv = $(grid.ubDiv);
				if (!grid || p == null) { return; }
				var getMinimizeIcon = function (path) {
						return base.getIconRes.call($t, "gridMinimize." + path);
					},
					visibleGridIcon = getMinimizeIcon("visible"), // "ui-icon-circle-triangle-n"
					hiddenGridIcon = getMinimizeIcon("hidden");  // "ui-icon-circle-triangle-s"
				if (state === "hidden") {
					$(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv", p.gView).slideUp("fast");
					if (p.pager) { $(p.pager).slideUp("fast"); }
					if (p.toppager) { $(p.toppager).slideUp("fast"); }
					if (p.toolbar[0] === true) {
						if (p.toolbar[1] === "both") {
							$ubDiv.slideUp("fast");
						}
						$uDiv.slideUp("fast");
					}
					if (p.footerrow) { $(".ui-jqgrid-sdiv", p.gBox).slideUp("fast"); }
					$(".ui-jqgrid-titlebar-close span", cDiv).removeClass(visibleGridIcon).addClass(hiddenGridIcon);
					p.gridstate = "hidden";
				} else if (state === "visible") {
					$(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv", p.gView).slideDown("fast");
					if (p.pager) { $(p.pager).slideDown("fast"); }
					if (p.toppager) { $(p.toppager).slideDown("fast"); }
					if (p.toolbar[0] === true) {
						if (p.toolbar[1] === "both") {
							$ubDiv.slideDown("fast");
						}
						$uDiv.slideDown("fast");
					}
					if (p.footerrow) { $(".ui-jqgrid-sdiv", p.gBox).slideDown("fast"); }
					$(".ui-jqgrid-titlebar-close span", cDiv).removeClass(hiddenGridIcon).addClass(visibleGridIcon);
					p.gridstate = "visible";
				}
			});
		},
		filterToolbar: function (oMuligrid) {
			// if one uses jQuery wrapper with multiple grids, then oMultiple specify the object with common options
			return this.each(function () {
				var $t = this, grid = $t.grid, $self = $($t), p = $t.p, bindEv = jgrid.bindEv, infoDialog = jgrid.info_dialog, htmlEncode = jgrid.htmlEncode;
				if (this.ftoolbar) { return; }
				// make new copy of the options and use it for ONE specific grid.
				// p.searching can contains grid specific options
				// we will don't modify the input options oMuligrid
				var o = $.extend(true, {
						autosearch: true,
						autosearchDelay: 500,
						searchOnEnter: true,
						beforeSearch: null,
						afterSearch: null,
						beforeClear: null,
						afterClear: null,
						searchurl: "",
						stringResult: false,
						groupOp: "AND",
						defaultSearch: "bw",
						idMode: "new", // support "old", "compatibility", "new"
						searchOperators: false,
						resetIcon: "&times;",
						applyLabelClasses: true,
						loadFilterDefaults: true, // this options activates loading of default filters from grid's postData for Multipe Search only.
						operands: { "eq": "==", "ne": "!", "lt": "<", "le": "<=", "gt": ">", "ge": ">=", "bw": "^", "bn": "!^", "in": "=", "ni": "!=", "ew": "|", "en": "!@", "cn": "~", "nc": "!~", "nu": "#", "nn": "!#" }
					}, jgrid.search, p.searching || {}, oMuligrid || {}),
					colModel = p.colModel,
					getRes = function (path) {
						return getGridRes.call($self, path);
					},
					errcap = getRes("errors.errcap"),
					bClose = getRes("edit.bClose"),
					editMsg = getRes("edit.msg"),
					hoverClasses = getGuiStyles.call($t, "states.hover"),
					highlightClass = getGuiStyles.call($t, "states.select"),
					dataFieldClass = getGuiStyles.call($t, "filterToolbar.dataField"),
					currentFilters,
					getId = function (cmName) {
						var prefix = "gs_";
						switch (o.idMode) {
							case "compatibility":
								prefix += p.idPrefix;
								break;
							case "new":
								prefix += p.id + "_";
								break;
							default: // "old"
								break;
						}
						return prefix + cmName;
					},
					getIdSel = function (cmName) {
						return "#" + jqID(getId(cmName));
					},
					parseFilter = function (fillAll) {
						var i, j, filters = p.postData.filters, filter = {}, rules, rule,
							iColByName = p.iColByName, cm, soptions;
						if (fillAll) {
							for (j = 0; j < colModel.length; j++) {
								cm = colModel[j];
								if (cm.search !== false) {
									soptions = cm.searchoptions || {};
									filter[cm.name] = {
										op: soptions.sopt ?
												soptions.sopt[0] :
												cm.stype === "select" ? "eq" : o.defaultSearch,
										data: soptions.defaultValue !== undefined ? soptions.defaultValue : ""
									};
								}
							}
						}

						if (!filters || !p.search) { return filter; }
						if (typeof filters === "string") {
							try {
								filters = $.parseJSON(filters);
							} catch (ignore) {
								filters = {};
							}
						} else {
							filters = filters || {};
						}
						rules = filters.rules || {};
						if (filters == null ||
								(filters.groupOp != null && o.groupOp != null && filters.groupOp.toUpperCase() !== o.groupOp.toUpperCase()) ||
								rules == null || rules.length === 0 ||
								(filters.groups != null && filters.groups.length > 0)) {
							return filter;
						}
						for (j = 0; j < rules.length; j++) {
							rule = rules[j];
							// find all columns in colModel, where
							// colModel[i].index || colModel[i].name === rule.field
							cm = colModel[iColByName[rule.field]];
							for (i = 0; i < colModel.length; i++) {
								cm = colModel[i];
								if ((cm.index || cm.name) !== rule.field || cm.search === false) {
									continue;
								}
								soptions = cm.searchoptions || {};
								if (soptions.sopt) {
									if ($.inArray(rule.op, soptions.sopt) < 0) {
										continue;
									}
								} else if (cm.stype === "select") {
									if (rule.op !== "eq") {
										continue;
									}
								} else if (rule.op !== o.defaultSearch) {
									continue;
								}
								filter[cm.name] = { op: rule.op, data: rule.data };
							}
						}
						return filter;
					},
					triggerToolbar = function () {
						var sdata = {}, j = 0, sopt = {};
						$.each(colModel, function () {
							var cm = this, nm = cm.index || cm.name, v, so, searchoptions = cm.searchoptions || {},
								$elem = $(getIdSel(cm.name), (cm.frozen === true && p.frozenColumns === true) ? grid.fhDiv : grid.hDiv),
								getFormaterOption = function (optionName, formatter) {
									var formatoptions = cm.formatoptions || {};
									return formatoptions[optionName] !== undefined ?
										formatoptions[optionName] :
										getRes("formatter." + (formatter || cm.formatter) + "." + optionName);
								},
								cutThousandsSeparator = function (val) {
									var separator = getFormaterOption("thousandsSeparator")
											.replace(/([\.\*\_\'\(\)\{\}\+\?\\])/g, "\\$1");
									return val.replace(new RegExp(separator, "g"), "");
								};

							if (o.searchOperators) {
								so = $elem.parent().prev().children("a").data("soper") || o.defaultSearch;
							} else {
								so = searchoptions.sopt ? searchoptions.sopt[0] : cm.stype === "select" ? "eq" : o.defaultSearch;
							}
							/* the format of element of the searching toolbar if ANOTHER
							 * as the format of cells in the grid. So one can't use
							 *     value = $.unformat.call($t, $elem, { colModel: cm }, iCol)
							 * to get the value. Even the access to the value should be
							 * $elem.val() instead of $elem.text() used in the common case of
							 * formatter. So we have to make manual conversion of searching filed
							 * used for integer/number/currency. The code will be duplicate */
							if (cm.stype === "custom" && $.isFunction(searchoptions.custom_value) && $elem.length > 0 && $elem[0].nodeName.toUpperCase() === "SPAN") {
								v = searchoptions.custom_value.call($t, $elem.children(".customelement").first(), "get");
							} else if (cm.stype === "select") {
								v = $elem.val();
							} else {
								v = $.trim($elem.val());
								switch (cm.formatter) {
									case "integer":
										v = cutThousandsSeparator(v)
												.replace(getFormaterOption("decimalSeparator", "number"), ".");
										if (v !== "") {
											// normalize the strings like "010.01" to "10"
											v = String(parseInt(v, 10));
										}
										break;
									case "number":
										v = cutThousandsSeparator(v)
												.replace(getFormaterOption("decimalSeparator"), ".");
										if (v !== "" && String(v).charAt(0) === "0") {
											// normalize the strings like "010.00" to "10"
											// and "010.12" to "10.12"
											v = String(parseFloat(v));
										}
										break;
									case "currency":
										var prefix = getFormaterOption("prefix"),
											suffix = getFormaterOption("suffix");
										if (prefix && prefix.length) {
											v = v.substr(prefix.length);
										}
										if (suffix && suffix.length) {
											v = v.substr(0, v.length - suffix.length);
										}
										v = cutThousandsSeparator(v)
												.replace(getFormaterOption("decimalSeparator"), ".");
										if (v !== "") {
											// normalize the strings like "010.00" to "10"
											// and "010.12" to "10.12"
											v = String(parseFloat(v));
										}
										break;
									default:
										break;
								}
							}
							if (v || so === "nu" || so === "nn") {
								sdata[nm] = v;
								sopt[nm] = so;
								j++;
							} else {
								if (sdata.hasOwnProperty(nm)) {
									delete sdata[nm];
								}
								if (!(o.stringResult || o.searchOperators || p.datatype === "local")) {
									try {
										if (p.postData != null && p.postData.hasOwnProperty(nm)) {
											delete p.postData[nm];
										}
									} catch (ignore) { }
								}
							}
						});
						var sd = j > 0 ? true : false;
						if (o.stringResult || o.searchOperators || p.datatype === "local") {
							var ruleGroup = '{"groupOp":"' + o.groupOp + '","rules":[';
							var gi = 0;
							$.each(sdata, function (cmName, n) {
								//var iCol = p.iColByName[cmName], cm = p.colModel[iCol],
								//	value = $.unformat.call($t, $("<span></span>").text(n), { colModel: cm }, iCol);
								if (gi > 0) { ruleGroup += ","; }
								ruleGroup += '{"field":"' + cmName + '",';
								ruleGroup += '"op":"' + sopt[cmName] + '",';
								n += "";
								ruleGroup += '"data":"' + n.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}';
								gi++;
							});
							ruleGroup += "]}";
							$.extend(p.postData, { filters: ruleGroup });
							$.each(["searchField", "searchString", "searchOper"], function (i, n) {
								if (p.postData.hasOwnProperty(n)) { delete p.postData[n]; }
							});
						} else {
							$.extend(p.postData, sdata);
						}
						var saveurl;
						if (p.searchurl) {
							saveurl = p.url;
							$self.jqGrid("setGridParam", { url: p.searchurl });
						}
						var bsr = $self.triggerHandler("jqGridToolbarBeforeSearch") === "stop" ? true : false;
						if (!bsr && $.isFunction(o.beforeSearch)) { bsr = o.beforeSearch.call($t); }
						if (!bsr) {
							$self.jqGrid("setGridParam", { search: sd })
								.trigger("reloadGrid", [$.extend({ page: 1 }, o.reloadGridSearchOptions || {})]);
						}
						if (saveurl) { $self.jqGrid("setGridParam", { url: saveurl }); }
						$self.triggerHandler("jqGridToolbarAfterSearch");
						if ($.isFunction(o.afterSearch)) { o.afterSearch.call($t); }
					},
					clearToolbar = function (trigger) {
						var sdata = {}, j = 0, nm;
						trigger = (typeof trigger !== "boolean") ? true : trigger;
						$.each(colModel, function () {
							var v, cm = this, $elem = $(getIdSel(cm.name), (cm.frozen === true && p.frozenColumns === true) ? grid.fhDiv : grid.hDiv),
								isSindleSelect, searchoptions = cm.searchoptions || {};
							if (searchoptions.defaultValue !== undefined) { v = searchoptions.defaultValue; }
							nm = cm.index || cm.name;
							switch (cm.stype) {
								case "select":
									isSindleSelect = $elem.length > 0 ? !$elem[0].multiple : true;
									$elem.find("option").each(function (i) {
										this.selected = i === 0 && isSindleSelect;
										if ($(this).val() === v) {
											this.selected = true;
											return false;
										}
									});
									if (v !== undefined) {
										// post the key and not the text
										sdata[nm] = v;
										j++;
									} else {
										try {
											delete p.postData[nm];
										} catch (ignore) { }
									}
									break;
								case "text":
									$elem.val(v || "");
									if (v !== undefined) {
										sdata[nm] = v;
										j++;
									} else {
										try {
											delete p.postData[nm];
										} catch (ignore) { }
									}
									break;
								case "custom":
									if ($.isFunction(searchoptions.custom_value) && $elem.length > 0 && $elem[0].nodeName.toUpperCase() === "SPAN") {
										searchoptions.custom_value.call($t, $elem.children(".customelement").first(), "set", v || "");
									}
									break;
							}
						});
						var sd = j > 0 ? true : false;
						p.resetsearch = true;
						if (o.stringResult || o.searchOperators || p.datatype === "local") {
							var ruleGroup = '{"groupOp":"' + o.groupOp + '","rules":[';
							var gi = 0;
							$.each(sdata, function (i, n) {
								if (gi > 0) { ruleGroup += ","; }
								ruleGroup += '{"field":"' + i + '",';
								ruleGroup += '"op":"' + "eq" + '",';
								n += "";
								ruleGroup += '"data":"' + n.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + '"}';
								gi++;
							});
							ruleGroup += "]}";
							$.extend(p.postData, { filters: ruleGroup });
							$.each(["searchField", "searchString", "searchOper"], function (i, n) {
								if (p.postData.hasOwnProperty(n)) { delete p.postData[n]; }
							});
						} else {
							$.extend(p.postData, sdata);
						}
						var saveurl;
						if (p.searchurl) {
							saveurl = p.url;
							$self.jqGrid("setGridParam", { url: p.searchurl });
						}
						var bcv = $self.triggerHandler("jqGridToolbarBeforeClear") === "stop" ? true : false;
						if (!bcv && $.isFunction(o.beforeClear)) { bcv = o.beforeClear.call($t); }
						if (!bcv) {
							if (trigger) {
								$self.jqGrid("setGridParam", { search: sd })
									.trigger("reloadGrid", [$.extend({ page: 1 }, o.reloadGridResetOptions || {})]);
							}
						}
						if (saveurl) { $self.jqGrid("setGridParam", { url: saveurl }); }
						$self.triggerHandler("jqGridToolbarAfterClear");
						if ($.isFunction(o.afterClear)) { o.afterClear(); }
					},
					toggleToolbar = function () {
						var trow = $("tr.ui-search-toolbar", grid.hDiv),
							trow2 = p.frozenColumns === true ? $("tr.ui-search-toolbar", grid.fhDiv) : false;
						if (trow.css("display") === "none") {
							trow.show();
							if (trow2) {
								trow2.show();
							}
						} else {
							trow.hide();
							if (trow2) {
								trow2.hide();
							}
						}
						if (p.frozenColumns === true) {
							$self.jqGrid("destroyFrozenColumns");
							$self.jqGrid("setFrozenColumns");
						}
					},
					odata = getRes("search.odata") || [],
					customSortOperations = p.customSortOperations,
					buildRuleMenu = function (elem, left, top) {
						$("#sopt_menu").remove();

						left = parseInt(left, 10);
						top = parseInt(top, 10) + 18;

						var selclass, ina, i = 0, aoprs = [], selected = $(elem).data("soper"), nm = $(elem).data("colname"),
							fs = $(".ui-jqgrid-view").css("font-size") || "11px",
							str = "<ul id='sopt_menu' class='" +
									getGuiStyles.call($t, "searchToolbar.menu", "ui-search-menu") +
									"' role='menu' tabindex='0' style='z-index:9999;display:block;font-size:" + fs + ";left:" + left + "px;top:" + top + "px;'>";
						i = p.iColByName[nm];
						if (i === undefined) { return; }
						var cm = colModel[i], options = $.extend({}, cm.searchoptions), odataItem, item, itemOper, itemOperand, itemText;
						if (!options.sopt) {
							options.sopt = [];
							options.sopt[0] = cm.stype === "select" ? "eq" : o.defaultSearch;
						}
						$.each(odata, function () { aoprs.push(this.oper); });
						// append aoprs array with custom operations defined in customSortOperations parameter jqGrid
						if (customSortOperations != null) {
							$.each(customSortOperations, function (propertyName) { aoprs.push(propertyName); });
						}
						for (i = 0; i < options.sopt.length; i++) {
							itemOper = options.sopt[i];
							ina = $.inArray(itemOper, aoprs);
							if (ina !== -1) {
								odataItem = odata[ina];
								if (odataItem !== undefined) {
									// standard operation
									itemOperand = o.operands[itemOper];
									itemText = odataItem.text;
								} else if (customSortOperations != null) {
									// custom operation
									item = customSortOperations[itemOper];
									itemOperand = item.operand;
									itemText = item.text;
								}
								selclass = selected === itemOper ? highlightClass : "";
								str += '<li class="ui-menu-item ' + selclass + '" role="presentation"><a class="ui-corner-all g-menu-item" tabindex="0" role="menuitem" value="' + htmlEncode(itemOper) + '" data-oper="' + htmlEncode(itemOperand) + '"><table><tr><td style="width:25px">' + htmlEncode(itemOperand) + '</td><td>' + htmlEncode(itemText) + '</td></tr></table></a></li>';
							}
						}
						str += "</ul>";
						$("body").append(str);
						$("#sopt_menu").addClass("ui-menu ui-widget ui-widget-content ui-corner-all");
						$("#sopt_menu > li > a").hover(
							function () { $(this).addClass(hoverClasses); },
							function () { $(this).removeClass(hoverClasses); }
						).click(function () {
							var v = $(this).attr("value"),
								oper = $(this).data("oper");
							$self.triggerHandler("jqGridToolbarSelectOper", [v, oper, elem]);
							$("#sopt_menu").hide();
							$(elem).text(oper).data("soper", v);
							if (o.autosearch === true) {
								var inpelm = $(elem).parent().next().children()[0];
								if ($(inpelm).val() || v === "nu" || v === "nn") {
									triggerToolbar();
								}
							}
						});
					},
					timeoutHnd,
					tr = $("<tr></tr>", { "class": "ui-search-toolbar", role: "row" });

				if (o.loadFilterDefaults) {
					currentFilters = parseFilter() || {};
				}
				// create the row
				$.each(colModel, function (ci) {
					var cm = this, soptions, mode = "filter", surl, self, select = "", sot, so, i, searchoptions = cm.searchoptions || {}, editoptions = cm.editoptions || {},
						th = $("<th></th>", { "class": getGuiStyles.call($t, "colHeaders", "ui-th-column ui-th-" + p.direction + " " + (o.applyLabelClasses ? cm.labelClasses || "" : "")) }),
						thd = $("<div></div>"),
						stbl = $("<table class='ui-search-table'><tr><td class='ui-search-oper'></td><td class='ui-search-input'></td><td class='ui-search-clear' style='width:1px'></td></tr></table>");
					if (this.hidden === true) { $(th).css("display", "none"); }
					this.search = this.search === false ? false : true;
					if (this.stype === undefined) { this.stype = "text"; }
					soptions = $.extend({ mode: mode }, searchoptions);
					if (this.search) {
						if (o.searchOperators) {
							if (p.search && currentFilters[this.name] != null) {
								so = currentFilters[this.name].op;
							} else {
								so = (soptions.sopt) ? soptions.sopt[0] : cm.stype === "select" ? "eq" : o.defaultSearch;
							}
							for (i = 0; i < odata.length; i++) {
								if (odata[i].oper === so) {
									sot = o.operands[so] || "";
									break;
								}
							}
							if (sot === undefined && customSortOperations != null) {
								var customOp;
								for (customOp in customSortOperations) {
									if (customSortOperations.hasOwnProperty(customOp) && customOp === so) {
										sot = customSortOperations[customOp].operand;
										break;
										//soptions.searchtitle = customSortOperations[customOp].title;
									}
								}
							}
							if (sot === undefined) { sot = "="; }
							var st = soptions.searchtitle != null ? soptions.searchtitle : getRes("search.operandTitle");
							select = "<a title='" + st + "' data-soper='" + so + "' class='" +
								getGuiStyles.call($t, "searchToolbar.operButton", "soptclass") +
								"' data-colname='" + this.name + "'>" + sot + "</a>";
						}
						$("td", stbl).first().data("colindex", ci).append(select);
						if (soptions.sopt == null || soptions.sopt.length === 1) {
							$("td.ui-search-oper", stbl).hide();
						}
						if (p.search && currentFilters[this.name] != null) {
							soptions.defaultValue = currentFilters[this.name].data;
						}
						if (soptions.clearSearch === undefined) {
							soptions.clearSearch = this.stype === "text" ? true : false;
						}
						if (soptions.clearSearch) {
							var csv = getRes("search.resetTitle") || "Clear Search Value";
							$("td", stbl)
								.eq(2)
								.append("<a title='" + csv + "' class='" +
									getGuiStyles.call($t, "searchToolbar.clearButton", "clearsearchclass") +
									"'><span>" + o.resetIcon + "</span></a>");
						} else {
							$("td", stbl).eq(2).hide();
						}
						switch (this.stype) {
							case "select":
								surl = this.surl || soptions.dataUrl;
								if (surl) {
									// data returned should have already constructed html select
									// primitive jQuery load
									self = thd;
									$(self).append(stbl);
									$.ajax($.extend({
										url: surl,
										context: { stbl: stbl, options: soptions, cm: cm, iCol: ci },
										dataType: "html",
										success: function (data, textStatus, jqXHR) {
											var cm1 = this.cm, iCol1 = this.iCol, soptions1 = this.options, d,
												$td = this.stbl.find(">tbody>tr>td.ui-search-input"), $select;
											if (soptions1.buildSelect !== undefined) {
												d = soptions1.buildSelect.call($t, data, jqXHR, cm1, iCol1);
												if (d) {
													$td.append(d);
												}
											} else {
												$td.append(data);
											}
											$select = $td.children("select");
											if ($select.find("option[value='']").length === 0 && typeof soptions.noFilterText === "string") {
												ov = document.createElement("option");
												ov.value = "";
												ov.innerHTML = soptions.noFilterText;
												$select.prepend(ov);
											}

											if (soptions1.defaultValue !== undefined) { $select.val(soptions1.defaultValue); }
											$select.attr({ name: cm1.index || cm1.name, id: getId(cm1.name) });
											if (soptions1.attr) { $select.attr(soptions1.attr); }
											$select.addClass(dataFieldClass);
											$select.css({ width: "100%" });
											// preserve autoserch
											bindEv.call($t, $select[0], soptions1);
											jgrid.fullBoolFeedback.call($t, soptions1.selectFilled, "jqGridSelectFilled", {
												elem: $select[0],
												options: soptions1,
												cm: cm1,
												cmName: cm1.name,
												iCol: iCol1,
												mode: mode
											});
											if (o.autosearch === true) {
												$select.change(function () {
													triggerToolbar();
													return false;
												});
											}
										}
									}, jgrid.ajaxOptions, p.ajaxSelectOptions || {}));
								} else {
									var oSv, sep, delim;
									if (cm.searchoptions) {
										oSv = searchoptions.value === undefined ? editoptions.value || "" : searchoptions.value;
										sep = searchoptions.separator === undefined ? editoptions.separator || ":" : searchoptions.separator;
										delim = searchoptions.delimiter === undefined ? editoptions.delimiter || ";" : searchoptions.delimiter;
									} else if (cm.editoptions) {
										oSv = editoptions.value === undefined ? "" : editoptions.value;
										sep = editoptions.separator === undefined ? ":" : editoptions.separator;
										delim = editoptions.delimiter === undefined ? ";" : editoptions.delimiter;
									}
									if (oSv) {
										var elem = document.createElement("select");
										elem.style.width = "100%";
										$(elem).attr({ name: cm.index || cm.name, id: getId(cm.name) });
										var sv, ov, key, k, isNoFilterValueExist;
										if (typeof oSv === "string") {
											so = oSv.split(delim);
											for (k = 0; k < so.length; k++) {
												sv = so[k].split(sep);
												ov = document.createElement("option");
												ov.value = sv[0];
												if (sv[0] === "") {
													isNoFilterValueExist = true;
												}
												ov.innerHTML = sv[1];
												elem.appendChild(ov);
											}
										} else if (typeof oSv === "object") {
											for (key in oSv) {
												if (oSv.hasOwnProperty(key)) {
													ov = document.createElement("option");
													ov.value = key;
													if (key === "") {
														isNoFilterValueExist = true;
													}
													ov.innerHTML = oSv[key];
													elem.appendChild(ov);
												}
											}
										}
										if (!isNoFilterValueExist && typeof soptions.noFilterText === "string") {
											ov = document.createElement("option");
											ov.value = "";
											ov.innerHTML = soptions.noFilterText;
											$(elem).prepend(ov);
										}
										if (soptions.defaultValue !== undefined) { $(elem).val(soptions.defaultValue); }
										if (soptions.attr) { $(elem).attr(soptions.attr); }
										$(elem).addClass(dataFieldClass);
										$(thd).append(stbl);
										bindEv.call($t, elem, soptions);
										$("td", stbl).eq(1).append(elem);
										jgrid.fullBoolFeedback.call($t, soptions.selectFilled, "jqGridSelectFilled", {
											elem: elem,
											options: cm.searchoptions || editoptions,
											cm: cm,
											cmName: cm.name,
											iCol: ci,
											mode: mode
										});
										if (o.autosearch === true) {
											$(elem).change(function () {
												triggerToolbar();
												return false;
											});
										}
									}
								}
								break;
							case "text":
								var df = soptions.defaultValue !== undefined ? soptions.defaultValue : "";

								$("td", stbl).eq(1).append("<input type='text' class='" + dataFieldClass + "' name='" + (cm.index || cm.name) + "' id='" + getId(cm.name) + "' value='" + df + "'/>");
								$(thd).append(stbl);

								if (soptions.attr) { $("input", thd).attr(soptions.attr); }
								bindEv.call($t, $("input", thd)[0], soptions);
								if (o.autosearch === true) {
									if (o.searchOnEnter) {
										$("input", thd).keypress(function (e) {
											var key1 = e.charCode || e.keyCode || 0;
											if (key1 === 13) {
												triggerToolbar();
												return false;
											}
											return this;
										});
									} else {
										$("input", thd).keydown(function (e) {
											var key1 = e.which;
											switch (key1) {
												case 13:
													return false;
												case 9:
												case 16:
												case 37:
												case 38:
												case 39:
												case 40:
												case 27:
													break;
												default:
													if (timeoutHnd) { clearTimeout(timeoutHnd); }
													timeoutHnd = setTimeout(function () { triggerToolbar(); }, o.autosearchDelay);
											}
										});
									}
								}
								break;
							case "custom":
								$("td", stbl).eq(1).append("<span style='width:100%;padding:0;box-sizing:border-box;' class='" + dataFieldClass + "' name='" + (cm.index || cm.name) + "' id='" + getId(cm.name) + "'/>");
								$(thd).append(stbl);
								try {
									if ($.isFunction(soptions.custom_element)) {
										var celm = soptions.custom_element.call($t, soptions.defaultValue !== undefined ? soptions.defaultValue : "", soptions);
										if (celm) {
											celm = $(celm).addClass("customelement");
											$(thd).find("span[name='" + (cm.index || cm.name) + "']").append(celm);
										} else {
											throw "e2";
										}
									} else {
										throw "e1";
									}
								} catch (ex) {
									if (ex === "e1") {
										infoDialog.call($t, errcap, "function 'custom_element' " + editMsg.nodefined, bClose);
									}
									if (ex === "e2") {
										infoDialog.call($t, errcap, "function 'custom_element' " + editMsg.novalue, bClose);
									} else {
										infoDialog.call($t, errcap, typeof ex === "string" ? ex : ex.message, bClose);
									}
								}
								break;
						}
					}
					$(th).append(thd);
					$(th).find(".ui-search-oper .soptclass,.ui-search-clear .clearsearchclass")
						.hover(function () {
							$(this).addClass(hoverClasses);
						}, function () {
							$(this).removeClass(hoverClasses);
						});
					$(tr).append(th);
					if (!o.searchOperators) {
						$("td", stbl).eq(0).hide();
					}
				});
				$(grid.hDiv).find(">div>.ui-jqgrid-htable>thead").append(tr);
				if (o.searchOperators) {
					$(".soptclass", tr).click(function (e) {
						var offset = $(this).offset(),
							left = (offset.left),
							top = (offset.top);
						buildRuleMenu(this, left, top);
						e.stopPropagation();
					});
					$("body").on("click", function (e) {
						if (e.target.className !== "soptclass") {
							$("#sopt_menu").hide();
						}
					});
				}
				$(".clearsearchclass", tr).click(function () {
					var ptr = $(this).parents("tr").first(),
						coli = parseInt($("td.ui-search-oper", ptr).data("colindex"), 10),
						sval = $.extend({}, colModel[coli].searchoptions || {}),
						dval = sval.defaultValue || "";
					if (colModel[coli].stype === "select") {
						if (dval) {
							$("td.ui-search-input select", ptr).val(dval);
						} else {
							$("td.ui-search-input select", ptr)[0].selectedIndex = 0;
						}
					} else {
						$("td.ui-search-input input", ptr).val(dval);
					}
					// ToDo custom search type
					if (o.autosearch === true) {
						triggerToolbar();
					}

				});
				$t.ftoolbar = true;
				$t.triggerToolbar = triggerToolbar;
				$t.clearToolbar = clearToolbar;
				$t.toggleToolbar = toggleToolbar;
				if (p.frozenColumns === true) {
					$self.jqGrid("destroyFrozenColumns");
					$self.jqGrid("setFrozenColumns");
				}
				$self.bind(
					"jqGridRefreshFilterValues.filterToolbar" + (o.loadFilterDefaults ? " jqGridAfterLoadComplete.filterToolbar" : ""),
					function () {
						var cmName, filter, newFilters = parseFilter(true) || {}, $input, $searchOper, i;

						for (cmName in newFilters) {
							if (newFilters.hasOwnProperty(cmName)) {
								filter = newFilters[cmName];
								$input = $(getIdSel(cmName));
								if ($.trim($input.val()) !== filter.data) {
									$input.val(filter.data);
								}
								$searchOper = $input.closest(".ui-search-input")
										.siblings(".ui-search-oper")
										.children(".soptclass");
								$searchOper.data("soper", filter.op);
								$searchOper.text(o.operands[filter.op]);
							}
						}
						for (i = 0; i < p.colModel.length; i++) {
							cmName = p.colModel[i].name;
							if (!newFilters.hasOwnProperty(cmName)) {
								$(getIdSel(cmName)).val("");
							}
						}
					}
				);
			});
		},
		destroyFilterToolbar: function () {
			return this.each(function () {
				var self = this;
				if (!self.ftoolbar) {
					return;
				}
				self.triggerToolbar = null;
				self.clearToolbar = null;
				self.toggleToolbar = null;
				self.ftoolbar = false;
				$(self.grid.hDiv).find("table thead tr.ui-search-toolbar").remove();
				if (self.p.frozenColumns === true) {
					$(self).jqGrid("destroyFrozenColumns")
						.jqGrid("setFrozenColumns");
				}
			});
		},
		destroyGroupHeader: function (nullHeader) {
			if (nullHeader === undefined) {
				nullHeader = true;
			}
			return this.each(function () {
				var $t = this, i, l, $th, $resizing, grid = $t.grid, cm = $t.p.colModel, hc,
					thead = $("table.ui-jqgrid-htable thead", grid.hDiv);
				if (!grid) { return; }

				$($t).unbind(".setGroupHeaders");
				var $tr = $("<tr>", { role: "row" }).addClass("ui-jqgrid-labels");
				var headers = grid.headers;
				for (i = 0, l = headers.length; i < l; i++) {
					hc = cm[i].hidden ? "none" : "";
					$th = $(headers[i].el)
						.width(headers[i].width)
						.css("display", hc);
					try {
						$th.removeAttr("rowSpan");
					} catch (rs) {
						//IE 6/7
						$th.attr("rowSpan", 1);
					}
					$tr.append($th);
					$resizing = $th.children("span.ui-jqgrid-resize");
					if ($resizing.length > 0) {// resizable column
						$resizing[0].style.height = "";
					}
					$th.children("div")[0].style.top = "";
				}
				$(thead).children("tr.ui-jqgrid-labels").remove();
				$(thead).prepend($tr);

				if (nullHeader === true) {
					$($t).jqGrid("setGridParam", { "groupHeader": null });
				}
			});
		},
		setGroupHeaders: function (o) {
			o = $.extend({
				useColSpanStyle: false,
				applyLabelClasses: true,
				groupHeaders: []
			}, o || {});
			return this.each(function () {
				this.p.groupHeader = o;
				var ts = this, i, cmi, skip = 0, $tr, $colHeader, th, $th, thStyle, iCol, cghi, numberOfColumns, titleText, cVisibleColumns,
					p = ts.p, colModel = p.colModel, cml = colModel.length, ths = ts.grid.headers, $theadInTable, thClasses,
					$htable = $("table.ui-jqgrid-htable", ts.grid.hDiv), isCellClassHidden = jgrid.isCellClassHidden,
					$trLabels = $htable.children("thead").children("tr.ui-jqgrid-labels"),
					$trLastWithLabels = $trLabels.last().addClass("jqg-second-row-header"),
					$thead = $htable.children("thead"),
					$firstHeaderRow = $htable.find(".jqg-first-row-header");
				if ($firstHeaderRow[0] === undefined) {
					$firstHeaderRow = $("<tr>", { role: "row", "aria-hidden": "true" }).addClass("jqg-first-row-header").css("height", "auto");
				} else {
					$firstHeaderRow.empty();
				}
				var inColumnHeader = function (text, columnHeaders) {
					var length = columnHeaders.length, j;
					for (j = 0; j < length; j++) {
						if (columnHeaders[j].startColumnName === text) {
							return j;
						}
					}
					return -1;
				};

				$(ts).prepend($thead);
				$tr = $("<tr>", { role: "row" }).addClass("ui-jqgrid-labels jqg-third-row-header");
				for (i = 0; i < cml; i++) {
					th = ths[i].el;
					$th = $(th);
					cmi = colModel[i];
					// build the next cell for the first header row
					// ??? cmi.hidden || isCellClassHidden(cmi.classes) || $th.is(":hidden")
					thStyle = { height: "0", width: ths[i].width + "px", display: (cmi.hidden ? "none" : "") };
					$("<th>", { role: "gridcell" }).css(thStyle).addClass("ui-first-th-" + p.direction + (o.applyLabelClasses ? " " + (cmi.labelClasses || "") : "")).appendTo($firstHeaderRow);

					th.style.width = ""; // remove unneeded style
					thClasses = getGuiStyles.call(ts, "colHeaders", "ui-th-column-header ui-th-" + p.direction + " " + (o.applyLabelClasses ? cmi.labelClasses || "" : ""));
					iCol = inColumnHeader(cmi.name, o.groupHeaders);
					if (iCol >= 0) {
						cghi = o.groupHeaders[iCol];
						numberOfColumns = cghi.numberOfColumns;
						titleText = cghi.titleText;

						// caclulate the number of visible columns from the next numberOfColumns columns
						for (cVisibleColumns = 0, iCol = 0; iCol < numberOfColumns && (i + iCol < cml); iCol++) {
							if (!colModel[i + iCol].hidden && !isCellClassHidden(colModel[i + iCol].classes) && !$(ths[i + iCol].el).is(":hidden")) {
								cVisibleColumns++;
							}
						}

						// The next numberOfColumns headers will be moved in the next row
						// in the current row will be placed the new column header with the titleText.
						// The text will be over the cVisibleColumns columns
						$colHeader = $("<th>")
							.addClass(thClasses)
							.css({ "height": "22px", "border-top": "0 none" })
							.html(titleText);
						if (cVisibleColumns > 0) {
							$colHeader.attr("colspan", String(cVisibleColumns));
						}
						if (p.headertitles) {
							$colHeader.attr("title", $colHeader.text());
						}
						// hide if not a visible cols
						if (cVisibleColumns === 0) {
							$colHeader.hide();
						}

						$th.before($colHeader); // insert new column header before the current
						$tr.append(th);         // move the current header in the next row

						// set the counter of headers which will be moved in the next row
						skip = numberOfColumns - 1;
					} else {
						if (skip === 0) {
							if (o.useColSpanStyle) {
								// expand the header height to two rows
								$th.attr("rowspan", $trLabels.length + 1);
							} else {
								$("<th>")
									.addClass(thClasses)
									.css({ "display": cmi.hidden ? "none" : "", "border-top": "0 none" })
									.insertBefore($th);
								$tr.append(th);
							}
						} else {
							// move the header to the next row
							$tr.append(th);
							skip--;
						}
					}
				}
				$theadInTable = $(ts).children("thead");
				$theadInTable.prepend($firstHeaderRow);
				$tr.insertAfter($trLastWithLabels);
				$htable.prepend($theadInTable);

				if (o.useColSpanStyle) {
					// Increase the height of resizing span of visible headers
					$htable.find("span.ui-jqgrid-resize").each(function () {
						var $parent = $(this).parent();
						if ($parent.is(":visible")) {
							this.style.cssText = "height:" + $parent.height() + "px !important;cursor:col-resize;";
						}
					});

					// Set position of the sortable div (the main lable)
					// with the column header text to the middle of the cell.
					// One should not do this for hidden headers.
					$htable.find(".ui-th-column>div").each(function () {
						var $ts = $(this), $parent = $ts.parent();
						if ($parent.is(":visible") && $parent.is(":has(span.ui-jqgrid-resize)") && !($ts.hasClass("ui-jqgrid-rotate") || $ts.hasClass("ui-jqgrid-rotateOldIE"))) {
							// !!! it seems be wrong now
							$ts.css("top", ($parent.height() - $ts.outerHeight(true)) / 2 + "px");
						}
					});
				}
				$(ts).triggerHandler("jqGridAfterSetGroupHeaders");
			});
		},
		getNumberOfFrozenColumns: function () {
			var $t = this;
			if ($t.length === 0) {
				return 0;
			}
			$t = $t[0];
			var colModel = $t.p.colModel, len = colModel.length, maxfrozen = -1, i;
			// get the max index of frozen col
			for (i = 0; i < len; i++) {
				// from left, no breaking frozen
				if (colModel[i].frozen !== true) {
					break;
				}
				maxfrozen = i;
			}
			return maxfrozen + 1;
		},
		setFrozenColumns: function () {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, grid = $t.grid;
				if (!grid || p == null || p.frozenColumns === true) { return; }
				var cm = p.colModel, i, len = cm.length, maxfrozen = -1, frozen = false, frozenIds = [], $colHeaderRow,// nonFrozenIds = [],
					tid = jqID(p.id), // one can use p.idSel and remove "#"
					hoverClasses = getGuiStyles.call($t, "states.hover"),
					disabledClass = getGuiStyles.call($t, "states.disabled");
				// TODO treeGrid and grouping  Support
				// TODO: allow to edit columns AFTER frozen columns
				if (p.subGrid === true || p.treeGrid === true || p.scroll) {
					return;
				}

				// get the max index of frozen col
				for (i = 0; i < len; i++) {
					// from left, no breaking frozen
					if (cm[i].frozen !== true) {
						break;
						//nonFrozenIds.push("#jqgh_" + tid + "_" + jqID(cm[i].name));
					}
					frozen = true;
					maxfrozen = i;
					frozenIds.push("#jqgh_" + tid + "_" + jqID(cm[i].name));
				}
				if (p.sortable) {
					$colHeaderRow = $(grid.hDiv).find(".ui-jqgrid-htable .ui-jqgrid-labels");
					$colHeaderRow.sortable("destroy");
					$self.jqGrid("setGridParam", {
						sortable: {
							options: {
								items: frozenIds.length > 0 ?
										">th:not(:has(" + frozenIds.join(",") + "),:hidden)" :
										">th:not(:hidden)"
							}
						}
					});
					$self.jqGrid("sortableColumns", $colHeaderRow);
				}
				if (maxfrozen >= 0 && frozen) {
					var top = p.caption ? $(grid.cDiv).outerHeight() : 0,
						hth = $(".ui-jqgrid-htable", p.gView).height();
					//headers
					if (p.toppager) {
						top = top + $(grid.topDiv).outerHeight();
					}
					if (p.toolbar[0] === true) {
						if (p.toolbar[1] !== "bottom") {
							top = top + $(grid.uDiv).outerHeight();
						}
					}
					grid.fhDiv = $("<div style='position:absolute;overflow:hidden;" +
							(p.direction === "rtl" ? "right:0;border-top-left-radius:0;" : "left:0;border-top-right-radius:0;") +
							"top:" + top + "px;height:" + hth +
							"px;' class='" + getGuiStyles.call($t, "hDiv", "frozen-div ui-jqgrid-hdiv") + "'></div>");
					grid.fbDiv = $("<div style='position:absolute;overflow:hidden;" +
							(p.direction === "rtl" ? "right:0;" : "left:0;") +
							"top:" + (parseInt(top, 10) + parseInt(hth, 10) + 1) +
							"px;overflow:hidden;' class='frozen-bdiv ui-jqgrid-bdiv'></div>");
					$(p.gView).append(grid.fhDiv);
					var htbl = $(".ui-jqgrid-htable", p.gView).clone(true),
						tHeadRows = htbl[0].tHead.rows;
					// groupheader support - only if useColSpanstyle is false
					if (p.groupHeader) {
						// TODO: remove all th which corresponds non-frozen columns. One can identify there by id
						// for example. Consider to use name attribute of th on column headers. It simplifies
						// identifying of the columns.
						$(tHeadRows[0].cells).filter(":gt(" + maxfrozen + ")").remove();
						$(tHeadRows).filter(".jqg-third-row-header").each(function () {
							$(this).children("th[id]")
								.each(function () {
									var id = $(this).attr("id"), colName;
									if (id && id.substr(0, $t.id.length + 1) === $t.id + "_") {
										colName = id.substr($t.id.length + 1);
										if (p.iColByName[colName] > maxfrozen) {
											$(this).remove();
										}
									}
								});
						});
						var swapfroz = -1, fdel = -1, cs, rs;
						// TODO: test carefully processing of hidden columns
						$(tHeadRows).filter(".jqg-second-row-header").children("th").each(function () {
							cs = parseInt($(this).attr("colspan") || 1, 10);
							rs = parseInt($(this).attr("rowspan") || 1, 10);
							if (rs > 1) {
								swapfroz++;
								fdel++;
							} else if (cs) {
								swapfroz = swapfroz + cs;
								fdel++;
							}
							if (swapfroz === maxfrozen) {
								return false;
							}
						});
						if (swapfroz !== maxfrozen) {
							fdel = maxfrozen;
						}
						$(tHeadRows).filter(".jqg-second-row-header,.ui-search-toolbar").each(function () {
							$(this).children(":gt(" + fdel + ")").remove();
						});
					} else {
						$(tHeadRows).each(function () {
							$(this).children(":gt(" + maxfrozen + ")").remove();
						});
					}
					// htable, bdiv and ftable uses table-layout:fixed; style
					// to make it working one have to set ANY width value on table.
					// The value of the width will be ignored, the sum of widths
					// of the first column will be used as the width of tables
					// and all columns will have the same width like the first row.
					// We set below just width=1 of the tables.
					$(htbl).width(1);
					// resizing stuff
					$(grid.fhDiv).append(htbl)
						.mousemove(function (e) {
							if (grid.resizing) { grid.dragMove(e); return false; }
						})
						.scroll(function () {
							// the fhDiv can be scrolled because of tab keyboard navigation
							// we prevent horizontal scrolling of fhDiv
							this.scrollLeft = 0;
						});
					if (p.footerrow) {
						var hbd = $(".ui-jqgrid-bdiv", p.gView).height();

						grid.fsDiv = $("<div style='position:absolute;" + (p.direction === "rtl" ? "right:0;" : "left:0;") + "top:" + (parseInt(top, 10) + parseInt(hth, 10) + parseInt(hbd, 10) + 1) + "px;' class='frozen-sdiv ui-jqgrid-sdiv'></div>");
						$(p.gView).append(grid.fsDiv);
						var ftbl = $(".ui-jqgrid-ftable", p.gView).clone(true);
						$("tr", ftbl).each(function () {
							$("td:gt(" + maxfrozen + ")", this).remove();
						});
						$(ftbl).width(1);
						$(grid.fsDiv).append(ftbl);
					}
					// sorting stuff
					$self.bind("jqGridSortCol.setFrozenColumns", function (e, index, idxcol) {
						var previousSelectedTh = $("tr.ui-jqgrid-labels:last th:eq(" + p.lastsort + ")", grid.fhDiv), newSelectedTh = $("tr.ui-jqgrid-labels:last th:eq(" + idxcol + ")", grid.fhDiv);

						$("span.ui-grid-ico-sort", previousSelectedTh).addClass(disabledClass);
						$(previousSelectedTh).attr("aria-selected", "false");
						$("span.ui-icon-" + p.sortorder, newSelectedTh).removeClass(disabledClass);
						$(newSelectedTh).attr("aria-selected", "true");
						if (!p.viewsortcols[0]) {
							if (p.lastsort !== idxcol) {
								$("span.s-ico", previousSelectedTh).hide();
								$("span.s-ico", newSelectedTh).show();
							}
						}
					});

					// data stuff
					//TODO support for setRowData
					$(p.gView).append(grid.fbDiv);
					$(grid.bDiv).scroll(function () {
						$(grid.fbDiv).scrollTop($(this).scrollTop());
					});
					if (p.hoverrows === true) {
						$(p.idSel).unbind("mouseover").unbind("mouseout");
					}
					var safeHeightSet = function ($elem, newHeight) {
							var height = $elem.height();
							if (Math.abs(height - newHeight) >= 1 && newHeight > 0) {
								$elem.height(newHeight);
								height = $elem.height();
								if (Math.abs(newHeight - height) >= 1) {
									$elem.height(newHeight + Math.round((newHeight - height)));
								}
							}
						},
						safeWidthSet = function ($elem, newWidth) {
							var width = $elem.width();
							if (Math.abs(width - newWidth) >= 1) {
								$elem.width(newWidth);
								width = $elem.width();
								if (Math.abs(newWidth - width) >= 1) {
									$elem.width(newWidth + Math.round((newWidth - width)));
								}
							}
						},
						fixDiv = function ($hDiv, hDivBase, iRowStart, iRowEnd) {
							var iRow, n, $frozenRows, $rows, $row, $frozenRow, posFrozenTop, height, newHeightFrozen, td,
								posTop = $(hDivBase).position().top, frozenTableTop, tableTop, cells;
							if ($hDiv != null && $hDiv.length > 0) {
								$hDiv[0].scrollTop = hDivBase.scrollTop;
								$hDiv.css(p.direction === "rtl" ?
									{ top: posTop, right: 0 } :
									{ top: posTop, left: 0 }
								);
								// first try with thead for the hdiv
								$frozenRows = $hDiv.children("table").children("thead").children("tr");
								$rows = $(hDivBase).children("div").children("table").children("thead").children("tr");
								if ($rows.length === 0) {
									// then use tbody for bdiv
									$frozenRows = $($hDiv.children("table")[0].rows);
									$rows = $($(hDivBase).children("div").children("table")[0].rows);
								}
								n = Math.min($frozenRows.length, $rows.length);
								frozenTableTop = n > 0 ? $($frozenRows[0]).position().top : 0;
								tableTop = n > 0 ? $($rows[0]).position().top : 0; // typically 0
								if (iRowStart >= 0) { // negative iRowStart means no changing of the height of individual rows
									if (iRowEnd >= 0) { // negative iRowEnd means all rows
										n = Math.min(iRowEnd + 1, n);
									}
									for (iRow = iRowStart; iRow < n; iRow++) {
										// but after that one have to verify all scenarios
										$row = $($rows[iRow]);
										if ($row.css("display") !== "none" && $row.is(":visible")) {
											posTop = $row.position().top;
											$frozenRow = $($frozenRows[iRow]);
											posFrozenTop = $frozenRow.position().top;
											height = $row.height();
											if (p.groupHeader != null && p.groupHeader.useColSpanStyle) {
												cells = $row[0].cells;
												for (i = 0; i < cells.length; i++) { // maxfrozen
													td = cells[i];
													if (td != null && td.nodeName.toUpperCase() === "TH") {
														height = Math.max(height, $(td).height());
													}
												}
											}
											newHeightFrozen = height + (posTop - tableTop) + (frozenTableTop - posFrozenTop);
											safeHeightSet($frozenRow, newHeightFrozen);
										}
									}
								}
								safeHeightSet($hDiv, hDivBase.clientHeight);
							}
						},
						/** @const */
						resizeAll = {
							resizeDiv: true,
							resizedRows: {
								iRowStart: 0,
								iRowEnd: -1 // -1 means "till the end"
							}
						},
						/** @const */
						fullResize = {
							header: resizeAll,
							resizeFooter: true,
							body: resizeAll
						};

					$self.bind("jqGridAfterGridComplete.setFrozenColumns", function () {
						$(p.idSel + "_frozen").remove();
						$(grid.fbDiv).height(grid.hDiv.clientHeight);
						// clone with data and events !!!
						var $frozenBTable = $(this).clone(true),
							frozenRows = $frozenBTable[0].rows,
							rows = $self[0].rows;
						$(frozenRows).filter("tr[role=row]").each(function () {
							$(this.cells).filter("td[role=gridcell]:gt(" + maxfrozen + ")").remove();
							/*if (this.id) {
								$(this).attr("id", this.id + "_frozen");
							}*/
						});
						grid.fbRows = frozenRows;

						$frozenBTable.width(1).attr("id", p.id + "_frozen");
						$frozenBTable.appendTo(grid.fbDiv);
						if (p.hoverrows === true) {
							var hoverRows = function (tr, method, additionalRows) {
									$(tr)[method](hoverClasses);
									$(additionalRows[tr.rowIndex])[method](hoverClasses);
								};
							$(frozenRows).filter(".jqgrow").hover(
								function () {
									hoverRows(this, "addClass", rows);
								},
								function () {
									hoverRows(this, "removeClass", rows);
								}
							);
							$(rows).filter(".jqgrow").hover(
								function () {
									hoverRows(this, "addClass", frozenRows);
								},
								function () {
									hoverRows(this, "removeClass", frozenRows);
								}
							);
						}
						fixDiv(grid.fhDiv, grid.hDiv, 0, -1);
						fixDiv(grid.fbDiv, grid.bDiv, 0, -1);
						if (grid.sDiv) { fixDiv(grid.fsDiv, grid.sDiv, 0, -1); }
					});
					var myResize = function (resizeOptions) {
							$(grid.fbDiv).scrollTop($(grid.bDiv).scrollTop());
							// TODO: the width of all column headers can be changed
							// so one should recalculate frozenWidth in other way.
							if (resizeOptions.header.resizeDiv) {
								fixDiv(grid.fhDiv, grid.hDiv, resizeOptions.header.iRowStart, resizeOptions.header.iRowEnd);
							}
							if (resizeOptions.body.resizeDiv) {
								fixDiv(grid.fbDiv, grid.bDiv, resizeOptions.body.iRowStart, resizeOptions.body.iRowEnd);
							}
							if (resizeOptions.resizeFooter && grid.sDiv && resizeOptions.resizeFooter) {
								fixDiv(grid.fsDiv, grid.sDiv, 0, -1);
							}
							var frozenWidth = grid.fhDiv[0].clientWidth;
							if (resizeOptions.header.resizeDiv && grid.fhDiv != null && grid.fhDiv.length >= 1) {
								safeHeightSet($(grid.fhDiv), grid.hDiv.clientHeight);
							}
							if (resizeOptions.body.resizeDiv && grid.fbDiv != null && grid.fbDiv.length > 0) {
								safeWidthSet($(grid.fbDiv), frozenWidth);
							}
							if (resizeOptions.resizeFooter && grid.fsDiv != null && grid.fsDiv.length >= 0) {
								safeWidthSet($(grid.fsDiv), frozenWidth);
							}
						};
					$(p.gBox).bind("resizestop.setFrozenColumns", function () {
						setTimeout(function () {
							myResize(fullResize);
						}, 50);
					});
					$self.bind("jqGridInlineEditRow.setFrozenColumns jqGridInlineAfterRestoreRow.setFrozenColumns jqGridInlineAfterSaveRow.setFrozenColumns jqGridAfterEditCell.setFrozenColumns jqGridAfterRestoreCell.setFrozenColumns jqGridAfterSaveCell.setFrozenColumns jqGridResizeStop.setFrozenColumns", function (e, rowid) {
						// TODO: probably one should handle additional events like afterSetRow
						// and remove jqGridInlineAfterSaveRow and jqGridInlineAfterRestoreRow
						var iRow = $self.jqGrid("getInd", rowid);
						myResize({
							header: {
								resizeDiv: false,  // don't recalculate the position and the height of hDiv
								resizedRows: {
									iRowStart: -1, // -1 means don't recalculate heights or rows
									iRowEnd: -1
								}
							},
							resizeFooter: true,    // recalculate the position and the height of sDiv
							body: {
								resizeDiv: true,   // recalculate the position and the height of bDiv
								resizedRows: {
									// recalculate the height of only one row inside of bDiv
									iRowStart: iRow,
									iRowEnd: iRow
								}
							}
						});
					});
					$self.bind("jqGridResizeStop.setFrozenColumns", function () {
						myResize(fullResize);
					});
					$self.bind("jqGridResetFrozenHeights.setFrozenColumns", function (e, o) {
						myResize(o || fullResize);
					});
					if (!grid.hDiv.loading) {
						$self.triggerHandler("jqGridAfterGridComplete");
					}
					p.frozenColumns = true;
				}
			});
		},
		destroyFrozenColumns: function () {
			return this.each(function () {
				var $t = this, $self = $($t), grid = $t.grid, p = $t.p, tid = jqID(p.id);
				if (!grid) { return; }
				if (p.frozenColumns === true) {
					$(grid.fhDiv).remove();
					$(grid.fbDiv).remove();
					grid.fhDiv = null;
					grid.fbDiv = null;
					grid.fbRows = null;
					if (p.footerrow) {
						$(grid.fsDiv).remove();
						grid.fsDiv = null;
					}
					$self.unbind(".setFrozenColumns");
					if (p.hoverrows === true) {
						var ptr, hoverClasses = getGuiStyles.call($t, "states.hover");
						$self.bind("mouseover", function (e) {
							ptr = $(e.target).closest("tr.jqgrow");
							if ($(ptr).attr("class") !== "ui-subgrid") {
								$(ptr).addClass(hoverClasses);
							}
						}).bind("mouseout", function (e) {
							ptr = $(e.target).closest("tr.jqgrow");
							$(ptr).removeClass(hoverClasses);
						});
					}
					p.frozenColumns = false;
					if (p.sortable) {
						var $colHeaderRow = $(grid.hDiv).find(".ui-jqgrid-htable .ui-jqgrid-labels");
						$colHeaderRow.sortable("destroy");
						$self.jqGrid("setGridParam", {
							sortable: {
								options: {
									items: ">th:not(:has(#jqgh_" + tid + "_cb" + ",#jqgh_" + tid + "_rn" + ",#jqgh_" + tid + "_subgrid),:hidden)"
								}
							}
						});
						$self.jqGrid("sortableColumns", $colHeaderRow);
					}
				}
			});
		}
	});
	// end module grid.custom

	/**
	 * jqFilter  jQuery jqGrid filter addon.
	 * Copyright (c) 2011, Tony Tomov, tony@trirand.com
	 * Dual licensed under the MIT and GPL licenses
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	 *
	 * The work is inspired from this Stefan Pirvu
	 * http://www.codeproject.com/KB/scripting/json-filtering.aspx
	 *
	 * The filter uses JSON entities to hold filter rules and groups. Here is an example of a filter:

	{ "groupOp": "AND",
		  "groups" : [
			{ "groupOp": "OR",
				"rules": [
					{ "field": "name", "op": "eq", "data": "England" },
					{ "field": "id", "op": "le", "data": "5"}
				 ]
			}
		  ],
		  "rules": [
			{ "field": "name", "op": "eq", "data": "Romania" },
			{ "field": "id", "op": "le", "data": "1"}
		  ]
	}
	*/
	// begin module grid.filter
	$.fn.jqFilter = function (arg) {
		if (typeof arg === "string") {
			var fn = $.fn.jqFilter[arg];
			if (!fn) {
				throw ("jqFilter - No such method: " + arg);
			}
			var args = $.makeArray(arguments).slice(1);
			return fn.apply(this, args);
		}

		var p = $.extend(true, {
			filter: null,
			columns: [],
			onChange: null,
			afterRedraw: null,
			checkValues: null,
			error: false,
			errmsg: "",
			errorcheck: true,
			showQuery: true,
			sopt: null,
			ops: [],
			operands: null,
			numopts: ["eq", "ne", "lt", "le", "gt", "ge", "nu", "nn", "in", "ni"],
			stropts: ["eq", "ne", "bw", "bn", "ew", "en", "cn", "nc", "nu", "nn", "in", "ni"],
			strarr: ["text", "string", "blob"],
			groupOps: [{ op: "AND", text: "AND" }, { op: "OR", text: "OR" }],
			groupButton: true,
			ruleButtons: true,
			direction: "ltr"
		}, jgrid.filter, arg || {});
		return this.each(function () {
			if (this.filter) { return; }
			this.p = p;
			// setup filter in case if they is not defined
			if (p.filter === null || p.filter === undefined) {
				p.filter = {
					groupOp: p.groupOps[0].op,
					rules: [],
					groups: []
				};
			}
			var iColumn, len = p.columns.length, cl, isIE = /msie/i.test(navigator.userAgent) && !window.opera,
				getGrid = function () {
					return $("#" + jgrid.jqID(p.id))[0] || null;
				},
				getGuiStyles = function (path, jqClasses) {
					return $(getGrid()).jqGrid("getGuiStyles", path, jqClasses || "");
				},
				getRes = function (property) {
					return $(getGrid()).jqGrid("getGridRes", "search." + property);
				},
				getCmInfo = function (cmName) {
					// the function convert column name or advanced property name to
					// object with properties { cm: , iCol: }
					var $t = getGrid(), iCol = $t.p.iColByName[cmName]; //iPropByName
					if (iCol !== undefined) {
						return { cm: $t.p.colModel[iCol], iCol: iCol };
					}
					iCol = $t.p.iPropByName[cmName];
					if (iCol !== undefined) {
						return { cm: $t.p.colModel[iCol], iCol: iCol, isAddProp: true };
					}
					return { cm: null, iCol: -1 };
				},
				errorClass = getGuiStyles("states.error"),
				dialogContentClass = getGuiStyles("dialog.content");

			// translating the options
			p.initFilter = $.extend(true, {}, p.filter);

			// set default values for the columns if they are not set
			if (!len) { return; }
			for (iColumn = 0; iColumn < len; iColumn++) {
				cl = p.columns[iColumn];
				if (cl.stype) {
					// grid compatibility
					cl.inputtype = cl.stype;
				} else if (!cl.inputtype) {
					cl.inputtype = "text";
				}
				if (cl.sorttype) {
					// grid compatibility
					cl.searchtype = cl.sorttype;
				} else if (!cl.searchtype) {
					cl.searchtype = "string";
				}
				if (cl.hidden === undefined) {
					// jqGrid compatibility
					cl.hidden = false;
				}
				if (!cl.label) {
					cl.label = cl.name;
				}
				cl.cmName = cl.name;
				if (cl.index) {
					cl.name = cl.index;
				}
				if (!cl.hasOwnProperty("searchoptions")) {
					cl.searchoptions = {};
				}
				if (!cl.hasOwnProperty("searchrules")) {
					cl.searchrules = {};
				}

			}
			if (p.showQuery) {
				$(this).append("<table class='queryresult " + dialogContentClass +
				"' style='display:block;max-width:440px;border:0px none;' dir='" + p.direction + "'><tbody><tr><td class='query'></td></tr></tbody></table>");
			}
			/*
			 *Perform checking.
			 *
			*/
			var checkData = function (val, colModelItem) {
				var ret = [true, ""], $t = getGrid();
				if ($.isFunction(colModelItem.searchrules)) {
					ret = colModelItem.searchrules.call($t, val, colModelItem);
				} else if (jgrid && jgrid.checkValues) {
					try {
						ret = jgrid.checkValues.call($t, val, -1, colModelItem.searchrules, colModelItem.label);
					} catch (ignore) { }
				}
				if (ret && ret.length && ret[0] === false) {
					p.error = !ret[0];
					p.errmsg = ret[1];
				}
			};
			/* moving to common
			randId = function() {
				return Math.floor(Math.random()*10000).toString();
			};
			*/

			this.onchange = function () {
				// clear any error
				p.error = false;
				p.errmsg = "";
				return $.isFunction(p.onChange) ? p.onChange.call(getGrid(), p, this) : false;
			};
			/*
			 * Redraw the filter every time when new field is added/deleted
			 * and field is  changed
			 */
			this.reDraw = function () {
				$("table.group:first", this).remove();
				var t = this.createTableForGroup(p.filter, null);
				$(this).append(t);
				if ($.isFunction(p.afterRedraw)) {
					p.afterRedraw.call(getGrid(), p, this);
				}
			};
			/**
			 * Creates a grouping data for the filter
			 * @param group - object
			 * @param parentgroup - object
			 */
			this.createTableForGroup = function (group, parentgroup) {
				var that = this, i;
				// this table will hold all the group (tables) and rules (rows)
				var table = $("<table class='" + getGuiStyles("searchDialog.operationGroup", "group") +
						"' style='border:0px none;'><tbody></tbody></table>"), align = "left";
				// create error message row
				if (p.direction === "rtl") {
					align = "right";
					table.attr("dir", "rtl");
				}
				if (parentgroup === null) {
					table.append("<tr class='error' style='display:none;'><th colspan='5' class='" + errorClass + "' align='" + align + "'></th></tr>");
				}

				var tr = $("<tr></tr>");
				table.append(tr);
				// this header will hold the group operator type and group action buttons for
				// creating subgroup "+ {}", creating rule "+" or deleting the group "-"
				var th = $("<th colspan='5' align='" + align + "'></th>");
				tr.append(th);

				if (p.ruleButtons === true) {
					// dropdown for: choosing group operator type
					var groupOpSelect = $("<select class='" + getGuiStyles("searchDialog.operationSelect", "opsel") + "'></select>");
					th.append(groupOpSelect);
					// populate dropdown with all posible group operators: or, and
					var str = "", selected;
					for (i = 0; i < p.groupOps.length; i++) {
						selected = group.groupOp === that.p.groupOps[i].op ? " selected='selected'" : "";
						str += "<option value='" + that.p.groupOps[i].op + "'" + selected + ">" + that.p.groupOps[i].text + "</option>";
					}

					groupOpSelect.append(str)
						.bind("change", function () {
							group.groupOp = $(groupOpSelect).val();
							that.onchange(); // signals that the filter has changed
						});
				}
				// button for adding a new subgroup
				var inputAddSubgroup = "<span></span>";
				if (p.groupButton) {
					inputAddSubgroup = $("<input type='button' value='+ {}' title='" + getRes("addGroupTitle") + "' class='" +
						getGuiStyles("searchDialog.addGroupButton", "add-group") + "'/>");
					inputAddSubgroup.bind("click", function () {
						if (group.groups === undefined) {
							group.groups = [];
						}

						group.groups.push({
							groupOp: p.groupOps[0].op,
							rules: [],
							groups: []
						}); // adding a new group

						that.reDraw(); // the html has changed, force reDraw

						that.onchange(); // signals that the filter has changed
						return false;
					});
				}
				th.append(inputAddSubgroup);
				if (p.ruleButtons === true) {
					// button for adding a new rule
					var inputAddRule = $("<input type='button' value='+' title='" + getRes("addRuleTitle") + "' class='" +
							getGuiStyles("searchDialog.addRuleButton", "add-rule ui-add") + "'/>"), cm;
					inputAddRule.bind("click", function () {
						var searchable, hidden, ignoreHiding;
						//if(!group) { group = {};}
						if (group.rules === undefined) {
							group.rules = [];
						}
						for (i = 0; i < that.p.columns.length; i++) {
							// but show only serchable and serchhidden = true fields
							searchable = (that.p.columns[i].search === undefined) ? true : that.p.columns[i].search;
							hidden = (that.p.columns[i].hidden === true);
							ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
							if ((ignoreHiding && searchable) || (searchable && !hidden)) {
								cm = that.p.columns[i];
								break;
							}
						}

						var opr;
						if (cm.searchoptions.sopt) {
							opr = cm.searchoptions.sopt;
						} else if (that.p.sopt) {
							opr = that.p.sopt;
						} else if ($.inArray(cm.searchtype, that.p.strarr) !== -1) {
							opr = that.p.stropts;
						} else {
							opr = that.p.numopts;
						}

						group.rules.push({
							field: cm.name,
							op: opr[0],
							data: ""
						}); // adding a new rule

						that.reDraw(); // the html has changed, force reDraw
						// for the moment no change have been made to the rule, so
						// this will not trigger onchange event
						return false;
					});
					th.append(inputAddRule);
				}

				// button for delete the group
				if (parentgroup !== null) { // ignore the first group
					var inputDeleteGroup = $("<input type='button' value='-' title='" + getRes("deleteGroupTitle") + "' class='" +
							getGuiStyles("searchDialog.deleteGroupButton", "delete-group") + "'/>");
					th.append(inputDeleteGroup);
					inputDeleteGroup.bind("click", function () {
						// remove group from parent
						for (i = 0; i < parentgroup.groups.length; i++) {
							if (parentgroup.groups[i] === group) {
								parentgroup.groups.splice(i, 1);
								break;
							}
						}

						that.reDraw(); // the html has changed, force reDraw

						that.onchange(); // signals that the filter has changed
						return false;
					});
				}

				// append subgroup rows
				if (group.groups !== undefined) {
					var trHolderForSubgroup, tdFirstHolderForSubgroup, tdMainHolderForSubgroup;
					for (i = 0; i < group.groups.length; i++) {
						trHolderForSubgroup = $("<tr></tr>");
						table.append(trHolderForSubgroup);

						tdFirstHolderForSubgroup = $("<td class='first'></td>");
						trHolderForSubgroup.append(tdFirstHolderForSubgroup);

						tdMainHolderForSubgroup = $("<td colspan='4'></td>");
						tdMainHolderForSubgroup.append(this.createTableForGroup(group.groups[i], group));
						trHolderForSubgroup.append(tdMainHolderForSubgroup);
					}
				}
				if (group.groupOp === undefined) {
					group.groupOp = that.p.groupOps[0].op;
				}

				// append rules rows
				if (group.rules !== undefined) {
					for (i = 0; i < group.rules.length; i++) {
						table.append(
							this.createTableRowForRule(group.rules[i], group)
						);
					}
				}

				return table;
			};
			/*
			 * Create the rule data for the filter
			 */
			this.createTableRowForRule = function (rule, group) {
				// save current entity in a variable so that it could
				// be referenced in anonimous method calls

				var that = this, $t = getGrid(), tr = $("<tr></tr>"),
					i, op, cm, str = "", selected;

				tr.append("<td class='first'></td>");

				// create field container
				var ruleFieldTd = $("<td class='columns'></td>");
				tr.append(ruleFieldTd);

				// dropdown for: choosing field
				var ruleFieldSelect = $("<select class='" + getGuiStyles("searchDialog.label", "selectLabel") +
						"'></select>"), ina, aoprs = [];
				ruleFieldTd.append(ruleFieldSelect);
				ruleFieldSelect.bind("change", function () {
					rule.field = $(ruleFieldSelect).val();

					var trpar = $(this).parents("tr:first"), columns, k; // define LOCAL variables
					for (k = 0; k < that.p.columns.length; k++) {
						if (that.p.columns[k].name === rule.field) {
							columns = that.p.columns[k];
							break;
						}
					}
					if (!columns) { return; }
					var editoptions = $.extend({}, columns.editoptions || {});
					delete editoptions.readonly;
					delete editoptions.disabled;
					var searchoptions = $.extend(
							{},
							editoptions || {},
							columns.searchoptions || {},
							getCmInfo(columns.cmName),
							{ id: jgrid.randId(), name: columns.name, mode: "search" }
						);
					if (isIE && columns.inputtype === "text") {
						if (!searchoptions.size) {
							searchoptions.size = 10;
						}
					}
					var elm = jgrid.createEl.call($t, columns.inputtype, searchoptions,
								"", true, that.p.ajaxSelectOptions || {}, true);
					$(elm).addClass(getGuiStyles("searchDialog.elem", "input-elm"));
					//that.createElement(rule, "");

					if (searchoptions.sopt) {
						op = searchoptions.sopt;
					} else if (that.p.sopt) {
						op = that.p.sopt;
					} else if ($.inArray(columns.searchtype, that.p.strarr) !== -1) {
						op = that.p.stropts;
					} else {
						op = that.p.numopts;
					}
					// operators
					var s = "", so = 0, odataItem1, itemOper1, itemText;
					aoprs = [];
					$.each(that.p.ops, function () { aoprs.push(this.oper); });
					// append aoprs array with custom operations defined in customSortOperations parameter jqGrid
					if (that.p.cops) {
						$.each(that.p.cops, function (propertyName) { aoprs.push(propertyName); });
					}
					for (k = 0; k < op.length; k++) {
						itemOper1 = op[k];
						ina = $.inArray(op[k], aoprs);
						if (ina !== -1) {
							odataItem1 = that.p.ops[ina];
							itemText = odataItem1 !== undefined ? odataItem1.text : that.p.cops[itemOper1].text;
							if (so === 0) {
								// the first select item will be automatically selected in single-select
								rule.op = itemOper1;
							}
							s += "<option value='" + itemOper1 + "'>" + itemText + "</option>";
							so++;
						}
					}
					$(".selectopts", trpar).empty().append(s);
					$(".selectopts", trpar)[0].selectedIndex = 0;
					if (jgrid.msie && jgrid.msiever() < 9) {
						var sw = parseInt($("select.selectopts", trpar)[0].offsetWidth, 10) + 1;
						$(".selectopts", trpar).width(sw);
						$(".selectopts", trpar).css("width", "auto");
					}
					// data
					$(".data", trpar).empty().append(elm);
					jgrid.bindEv.call($t, elm, searchoptions);
					$(".input-elm", trpar).bind("change", function (e) {
						var elem = e.target;
						rule.data = elem.nodeName.toUpperCase() === "SPAN" && searchoptions && $.isFunction(searchoptions.custom_value) ?
								searchoptions.custom_value.call($t, $(elem).children(".customelement:first"), "get") : elem.value;
						that.onchange(); // signals that the filter has changed
					});
					setTimeout(function () { //IE, Opera, Chrome
						rule.data = $(elm).val();
						that.onchange();  // signals that the filter has changed
					}, 0);
				});

				// populate drop down with user provided column definitions
				var j = 0, searchable, hidden, ignoreHiding;
				for (i = 0; i < that.p.columns.length; i++) {
					// but show only serchable and serchhidden = true fields
					searchable = (that.p.columns[i].search === undefined) ? true : that.p.columns[i].search;
					hidden = (that.p.columns[i].hidden === true);
					ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
					if ((ignoreHiding && searchable) || (searchable && !hidden)) {
						selected = "";
						if (rule.field === that.p.columns[i].name) {
							selected = " selected='selected'";
							j = i;
						}
						str += "<option value='" + that.p.columns[i].name + "'" + selected + ">" + that.p.columns[i].label + "</option>";
					}
				}
				ruleFieldSelect.append(str);


				// create operator container
				var ruleOperatorTd = $("<td class='operators'></td>");
				tr.append(ruleOperatorTd);
				cm = p.columns[j];
				// create it here so it can be referentiated in the onchange event
				//var RD = that.createElement(rule, rule.data);
				if (isIE && cm.inputtype === "text") {
					if (!cm.searchoptions.size) {
						cm.searchoptions.size = 10;
					}
				}
				var editoptions = $.extend({}, cm.editoptions || {});
				delete editoptions.readonly;
				delete editoptions.disabled;
				var ruleDataInput = jgrid.createEl.call($t, cm.inputtype,
						$.extend({}, editoptions, cm.searchoptions || {}, getCmInfo(cm.cmName), { id: jgrid.randId(), name: cm.name }),
						rule.data, true, that.p.ajaxSelectOptions || {}, true);
				if (rule.op === "nu" || rule.op === "nn") {
					$(ruleDataInput).attr("readonly", "true");
					$(ruleDataInput).attr("disabled", "true");
				} //retain the state of disabled text fields in case of null ops
				// dropdown for: choosing operator
				var ruleOperatorSelect = $("<select class='" + getGuiStyles("searchDialog.operator", "selectopts") + "'></select>");
				ruleOperatorTd.append(ruleOperatorSelect);
				ruleOperatorSelect.bind("change", function () {
					rule.op = $(ruleOperatorSelect).val();
					var trpar = $(this).parents("tr:first"),
						rd = $(".input-elm", trpar)[0];
					if (rule.op === "nu" || rule.op === "nn") { // disable for operator "is null" and "is not null"
						rule.data = "";
						if (rd.tagName.toUpperCase() !== "SELECT") { rd.value = ""; }
						rd.setAttribute("readonly", "true");
						rd.setAttribute("disabled", "true");
					} else {
						if (rd.tagName.toUpperCase() === "SELECT") { rule.data = rd.value; }
						rd.removeAttribute("readonly");
						rd.removeAttribute("disabled");
					}

					that.onchange();  // signals that the filter has changed
				});

				// populate drop down with all available operators
				if (cm.searchoptions.sopt) {
					op = cm.searchoptions.sopt;
				} else if (that.p.sopt) {
					op = that.p.sopt;
				} else if ($.inArray(cm.searchtype, that.p.strarr) !== -1) {
					op = that.p.stropts;
				} else {
					op = that.p.numopts;
				}
				str = "";
				var odataItem, itemOper;
				$.each(that.p.ops, function () { aoprs.push(this.oper); });
				// append aoprs array with custom operations defined in customSortOperations parameter jqGrid
				if (that.p.cops) {
					$.each(that.p.cops, function (propertyName) { aoprs.push(propertyName); });
				}
				for (i = 0; i < op.length; i++) {
					itemOper = op[i];
					ina = $.inArray(op[i], aoprs);
					if (ina !== -1) {
						odataItem = that.p.ops[ina];
						selected = rule.op === itemOper ? " selected='selected'" : "";
						str += "<option value='" + itemOper + "'" + selected + ">" +
							(odataItem !== undefined ? odataItem.text : that.p.cops[itemOper].text) +
							"</option>";
					}
				}
				ruleOperatorSelect.append(str);
				// create data container
				var ruleDataTd = $("<td class='data'></td>");
				tr.append(ruleDataTd);

				// textbox for: data
				// is created previously
				//ruleDataInput.setAttribute("type", "text");
				ruleDataTd.append(ruleDataInput);
				jgrid.bindEv.call($t, ruleDataInput, cm.searchoptions);
				$(ruleDataInput).addClass(getGuiStyles("searchDialog.elem", "input-elm"))
					.bind("change", function () {
						rule.data = cm.inputtype === "custom" ? cm.searchoptions.custom_value.call($t, $(this).children(".customelement:first"), "get") : $(this).val();
						that.onchange(); // signals that the filter has changed
					});

				// create action container
				var ruleDeleteTd = $("<td></td>");
				tr.append(ruleDeleteTd);

				// create button for: delete rule
				if (p.ruleButtons === true) {
					var ruleDeleteInput = $("<input type='button' value='-' title='" + getRes("deleteRuleTitle") + "' class='" +
							getGuiStyles("searchDialog.deleteRuleButton", "delete-rule ui-del") + "'/>");
					ruleDeleteTd.append(ruleDeleteInput);
					//$(ruleDeleteInput).html("").height(20).width(30).button({icons: {  primary: "ui-icon-minus", text:false}});
					ruleDeleteInput.bind("click", function () {
						// remove rule from group
						for (i = 0; i < group.rules.length; i++) {
							if (group.rules[i] === rule) {
								group.rules.splice(i, 1);
								break;
							}
						}

						that.reDraw(); // the html has changed, force reDraw

						that.onchange(); // signals that the filter has changed
						return false;
					});
				}
				return tr;
			};

			this.getStringForGroup = function (group) {
				var s = "(", index;
				if (group.groups !== undefined) {
					for (index = 0; index < group.groups.length; index++) {
						if (s.length > 1) {
							s += " " + group.groupOp + " ";
						}
						try {
							s += this.getStringForGroup(group.groups[index]);
						} catch (eg) {
							alert(eg);
						}
					}
				}

				if (group.rules !== undefined) {
					try {
						for (index = 0; index < group.rules.length; index++) {
							if (s.length > 1) {
								s += " " + group.groupOp + " ";
							}
							s += this.getStringForRule(group.rules[index]);
						}
					} catch (e) {
						alert(e);
					}
				}

				s += ")";

				if (s === "()") {
					return ""; // ignore groups that don't have rules
				}
				return s;
			};
			this.getStringForRule = function (rule) {
				var operand = "", opC = "", i, cm, ret, val = rule.data, oper, numtypes = ["int", "integer", "float", "number", "currency"]; // jqGrid
				for (i = 0; i < p.ops.length; i++) {
					if (p.ops[i].oper === rule.op) {
						operand = p.operands.hasOwnProperty(rule.op) ? p.operands[rule.op] : "";
						opC = p.ops[i].oper;
						break;
					}
				}
				if (opC === "" && p.cops != null) {
					for (oper in p.cops) {
						if (p.cops.hasOwnProperty(oper)) {
							opC = oper;
							operand = p.cops[oper].operand;
							if ($.isFunction(p.cops[oper].buildQueryValue)) {
								return p.cops[oper].buildQueryValue.call(p, { cmName: rule.field, searchValue: val, operand: operand });
							}
						}
					}
				}
				for (i = 0; i < p.columns.length; i++) {
					if (p.columns[i].name === rule.field) {
						cm = p.columns[i];
						break;
					}
				}
				if (cm == null) {
					return "";
				}
				if (opC === "bw" || opC === "bn") {
					val = val + "%";
				}
				if (opC === "ew" || opC === "en") {
					val = "%" + val;
				}
				if (opC === "cn" || opC === "nc") {
					val = "%" + val + "%";
				}
				if (opC === "in" || opC === "ni") {
					val = " (" + val + ")";
				}
				if (p.errorcheck) {
					checkData(rule.data, cm);
				}
				if ($.inArray(cm.searchtype, numtypes) !== -1 || opC === "nn" || opC === "nu") {
					ret = rule.field + " " + operand + " " + val;
				} else {
					ret = rule.field + " " + operand + ' "' + val + '"';
				}
				return ret;
			};
			this.resetFilter = function () {
				p.filter = $.extend(true, {}, p.initFilter);
				this.reDraw();
				this.onchange();
			};
			this.hideError = function () {
				$("th." + errorClass, this).html("");
				$("tr.error", this).hide();
			};
			this.showError = function () {
				$("th." + errorClass, this).html(p.errmsg);
				$("tr.error", this).show();
			};
			this.toUserFriendlyString = function () {
				return this.getStringForGroup(p.filter);
			};
			this.toString = function () {
				// this will obtain a string that can be used to match an item.
				var that = this;
				function getStringRule(rule) {
					if (that.p.errorcheck) {
						var i, cm;
						for (i = 0; i < that.p.columns.length; i++) {
							if (that.p.columns[i].name === rule.field) {
								cm = that.p.columns[i];
								break;
							}
						}
						if (cm) {
							checkData(rule.data, cm);
						}
					}
					return rule.op + "(item." + rule.field + ",'" + rule.data + "')";
				}

				function getStringForGroup(group) {
					var s = "(", index;

					if (group.groups !== undefined) {
						for (index = 0; index < group.groups.length; index++) {
							if (s.length > 1) {
								if (group.groupOp === "OR") {
									s += " || ";
								} else {
									s += " && ";
								}
							}
							s += getStringForGroup(group.groups[index]);
						}
					}

					if (group.rules !== undefined) {
						for (index = 0; index < group.rules.length; index++) {
							if (s.length > 1) {
								if (group.groupOp === "OR") {
									s += " || ";
								} else {
									s += " && ";
								}
							}
							s += getStringRule(group.rules[index]);
						}
					}

					s += ")";

					if (s === "()") {
						return ""; // ignore groups that don't have rules
					}
					return s;
				}

				return getStringForGroup(p.filter);
			};

			// Here we init the filter
			this.reDraw();

			if (p.showQuery) {
				this.onchange();
			}
			// mark is as created so that it will not be created twice on this element
			this.filter = true;
		});
	};
	$.extend($.fn.jqFilter, {
		/*
		 * Return SQL like string. Can be used directly
		 */
		toSQLString: function () {
			var s = "";
			this.each(function () {
				s = this.toUserFriendlyString();
			});
			return s;
		},
		/*
		 * Return filter data as object.
		 */
		filterData: function () {
			var s;
			this.each(function () {
				s = this.p.filter;
			});
			return s;

		},
		getParameter: function (param) {
			if (param !== undefined) {
				if (this.p.hasOwnProperty(param)) {
					return this.p[param];
				}
			}
			return this.p;
		},
		resetFilter: function () {
			return this.each(function () {
				this.resetFilter();
			});
		},
		addFilter: function (pfilter) {
			if (typeof pfilter === "string") {
				pfilter = $.parseJSON(pfilter);
			}
			this.each(function () {
				this.p.filter = pfilter;
				this.reDraw();
				this.onchange();
			});
		}
	});
	// end module grid.filter

	/**
		The below work is licensed under Creative Commons GNU LGPL License.

		Original work:

		License:     http://creativecommons.org/licenses/LGPL/2.1/
		Author:      Stefan Goessner/2006
		Web:         http://goessner.net/

		Modifications made:

		Version:     0.9-p5
		Description: Restructured code, JSLint validated (no strict whitespaces),
					 added handling of empty arrays, empty strings, and int/floats values.
		Author:      Michael Schøler/2008-01-29
		Web:         http://michael.hinnerup.net/blog/2008/01/26/converting-json-to-xml-and-xml-to-json/

		Description: json2xml added support to convert functions as CDATA
					 so it will be easy to write characters that cause some problems when convert
		Author:      Tony Tomov
	*/
	// begin module jsonxml
	var xmlJsonClass = {
			// Param "xml": Element or document DOM node.
			// Param "tab": Tab or indent string for pretty output formatting omit or use empty string "" to supress.
			// Returns:     JSON string
			xml2json: function (xml, tab) {
				if (xml.nodeType === 9) {
					// document node
					xml = xml.documentElement;
				}
				var nws = this.removeWhite(xml),
					obj = this.toObj(nws),
					json = this.toJson(obj, xml.nodeName, "\t");
				return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
			},

			// Param "o":   JavaScript object
			// Param "tab": tab or indent string for pretty output formatting omit or use empty string "" to supress.
			// Returns:     XML string
			json2xml: function (o, tab) {
				var toXml = function (v, name, ind) {
						var xml = "", i, n, sXml, hasChild, m;
						if (v instanceof Array) {
							if (v.length === 0) {
								xml += ind + "<" + name + ">__EMPTY_ARRAY_</" + name + ">\n";
							} else {
								for (i = 0, n = v.length; i < n; i += 1) {
									sXml = ind + toXml(v[i], name, ind + "\t") + "\n";
									xml += sXml;
								}
							}
						} else if (typeof v === "object") {
							hasChild = false;
							xml += ind + "<" + name;
							for (m in v) {
								if (v.hasOwnProperty(m)) {
									if (m.charAt(0) === "@") {
										xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
									} else {
										hasChild = true;
									}
								}
							}
							xml += hasChild ? ">" : "/>";
							if (hasChild) {
								for (m in v) {
									if (v.hasOwnProperty(m)) {
										if (m === "#text") {
											xml += v[m];
										} else if (m === "#cdata") {
											xml += "<![CDATA[" + v[m] + "]]>";
										} else if (m.charAt(0) !== "@") {
											xml += toXml(v[m], m, ind + "\t");
										}
									}
								}
								xml += (xml.charAt(xml.length - 1) === "\n" ? ind : "") + "</" + name + ">";
							}
						} else if (typeof v === "function") {
							xml += ind + "<" + name + ">" + "<![CDATA[" + v + "]]>" + "</" + name + ">";
						} else {
							if (v === undefined) {
								v = "";
							}
							if (v.toString() === "\"\"" || v.toString().length === 0) {
								xml += ind + "<" + name + ">__EMPTY_STRING_</" + name + ">";
							} else {
								xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
							}
						}
						return xml;
					},
					xml1 = "",
					p;

				for (p in o) {
					if (o.hasOwnProperty(p)) {
						xml1 += toXml(o[p], p, "");
					}
				}
				return tab ? xml1.replace(/\t/g, tab) : xml1.replace(/\t|\n/g, "");
			},
			// Internal methods
			toObj: function (xml) {
				var o = {}, funcTest = /function/i, i, textChild = 0, cdataChild = 0, hasElementChild = false, n;
				if (xml.nodeType === 1) {
					// element node ..
					if (xml.attributes.length) {
						// element with attributes ..
						for (i = 0; i < xml.attributes.length; i += 1) {
							o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
						}
					}
					if (xml.firstChild) {
						// element has child nodes ..
						for (n = xml.firstChild; n; n = n.nextSibling) {
							if (n.nodeType === 1) {
								hasElementChild = true;
							} else if (n.nodeType === 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
								// non-whitespace text
								textChild += 1;
							} else if (n.nodeType === 4) {
								// cdata section node
								cdataChild += 1;
							}
						}
						if (hasElementChild) {
							if (textChild < 2 && cdataChild < 2) {
								// structured element with evtl. a single text or/and cdata node ..
								this.removeWhite(xml);
								for (n = xml.firstChild; n; n = n.nextSibling) {
									if (n.nodeType === 3) {
										// text node
										o["#text"] = this.escape(n.nodeValue);
									} else if (n.nodeType === 4) {
										// cdata node
										if (funcTest.test(n.nodeValue)) {
											o[n.nodeName] = [o[n.nodeName], n.nodeValue];
										} else {
											o["#cdata"] = this.escape(n.nodeValue);
										}
									} else if (o[n.nodeName]) {
										// multiple occurence of element ..
										if (o[n.nodeName] instanceof Array) {
											o[n.nodeName][o[n.nodeName].length] = this.toObj(n);
										} else {
											o[n.nodeName] = [o[n.nodeName], this.toObj(n)];
										}
									} else {
										// first occurence of element ..
										o[n.nodeName] = this.toObj(n);
									}
								}
							} else {
								// mixed content
								if (!xml.attributes.length) {
									o = this.escape(this.innerXml(xml));
								} else {
									o["#text"] = this.escape(this.innerXml(xml));
								}
							}
						} else if (textChild) {
							// pure text
							if (!xml.attributes.length) {
								o = this.escape(this.innerXml(xml));
								if (o === "__EMPTY_ARRAY_") {
									o = "[]";
								} else if (o === "__EMPTY_STRING_") {
									o = "";
								}
							} else {
								o["#text"] = this.escape(this.innerXml(xml));
							}
						} else if (cdataChild) {
							// cdata
							if (cdataChild > 1) {
								o = this.escape(this.innerXml(xml));
							} else {
								for (n = xml.firstChild; n; n = n.nextSibling) {
									if (funcTest.test(xml.firstChild.nodeValue)) {
										o = xml.firstChild.nodeValue;
										break;
									}
									o["#cdata"] = this.escape(n.nodeValue);
								}
							}
						}
					}
					if (!xml.attributes.length && !xml.firstChild) {
						o = null;
					}
				} else if (xml.nodeType === 9) {
					// document.node
					o = this.toObj(xml.documentElement);
				} else {
					alert("unhandled node type: " + xml.nodeType);
				}
				return o;
			},
			toJson: function (o, name, ind, wellform) {
				if (wellform === undefined) {
					wellform = true;
				}
				var json = name ? ("\"" + name + "\"") : "", tab = "\t", newline = "\n", n, i, ar = [], arr = [], m;
				if (!wellform) {
					tab = "";
					newline = "";
				}

				if (o === "[]") {
					json += (name ? ":[]" : "[]");
				} else if (o instanceof Array) {
					for (i = 0, n = o.length; i < n; i += 1) {
						ar[i] = this.toJson(o[i], "", ind + tab, wellform);
					}
					json += (name ? ":[" : "[") + (ar.length > 1 ? (newline + ind + tab + ar.join("," + newline + ind + tab) + newline + ind) : ar.join("")) + "]";
				} else if (o === null) {
					json += (name && ":") + "null";
				} else if (typeof o === "object") {
					for (m in o) {
						if (o.hasOwnProperty(m)) {
							arr[arr.length] = this.toJson(o[m], m, ind + tab, wellform);
						}
					}
					json += (name ? ":{" : "{") + (arr.length > 1 ? (newline + ind + tab + arr.join("," + newline + ind + tab) + newline + ind) : arr.join("")) + "}";
				} else if (typeof o === "string") {
					json += (name && ":") + "\"" + o.replace(/\\/g, "\\\\").replace(/\"/g, '\\"') + "\"";
				} else {
					json += (name && ":") +  o.toString();
				}
				return json;
			},
			innerXml: function (node) {
				var s = "", child,
					asXml = function (n) {
						var str = "", i, c;
						if (n.nodeType === 1) {
							str += "<" + n.nodeName;
							for (i = 0; i < n.attributes.length; i += 1) {
								str += " " + n.attributes[i].nodeName + "=\"" + (n.attributes[i].nodeValue || "").toString() + "\"";
							}
							if (n.firstChild) {
								str += ">";
								for (c = n.firstChild; c; c = c.nextSibling) {
									str += asXml(c);
								}
								str += "</" + n.nodeName + ">";
							} else {
								str += "/>";
							}
						} else if (n.nodeType === 3) {
							str += n.nodeValue;
						} else if (n.nodeType === 4) {
							str += "<![CDATA[" + n.nodeValue + "]]>";
						}
						return str;
					};
				if (node.hasOwnProperty("innerHTML")) {
					s = node.innerHTML;
				} else {
					for (child = node.firstChild; child; child = child.nextSibling) {
						s += asXml(child);
					}
				}
				return s;
			},
			escape: function (txt) {
				return txt.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, "\\n").replace(/[\r]/g, "\\r");
			},
			removeWhite: function (e) {
				e.normalize();
				var n = e.firstChild, nxt;
				while (n) {
					if (n.nodeType === 3) {
						// text node
						if (!n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
							// pure whitespace text node
							nxt = n.nextSibling;
							e.removeChild(n);
							n = nxt;
						} else {
							n = n.nextSibling;
						}
					} else if (n.nodeType === 1) {
						// element node
						this.removeWhite(n);
						n = n.nextSibling;
					} else {
						// any other node
						n = n.nextSibling;
					}
				}
				return e;
			}
		};
	window.xmlJsonClass = xmlJsonClass;
	// end module jsonxml

	/**
	 * jqGrid extension for form editing Grid Data
	 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com, http://trirand.com/blog/
	 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	**/
	// begin module grid.formedit
	var jgridFeedback = jgrid.feedback, fullBoolFeedback = jgrid.fullBoolFeedback, builderFmButon = jgrid.builderFmButon,
		addFormIcon = function ($fmButton, iconInfos, commonIcon) {
			var iconspan;
			if (iconInfos[0] === true) {
				iconspan = "<span class='" + mergeCssClasses("fm-button-icon", commonIcon, iconInfos[2]) + "'></span>";
				if (iconInfos[1] === "right") {
					$fmButton.addClass("fm-button-icon-right").append(iconspan);
				} else {
					$fmButton.addClass("fm-button-icon-left").prepend(iconspan);
				}
			}
		},
		getGuiStateStyles = function (path) {
			return getGuiStyles.call(this, "states." + path);
		},
		isEmptyString = function (htmlStr) {
			return htmlStr === "&nbsp;" || htmlStr === "&#160;" || (htmlStr.length === 1 && htmlStr.charCodeAt(0) === 160);
		};
	jgrid.extend({
		searchGrid: function (oMuligrid) {
			// if one uses jQuery wrapper with multiple grids, then oMuligrid specify the object with common options
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!$t.grid || p == null) { return; }
				// make new copy of the options and use it for ONE specific grid.
				// p.searching can contains grid specific options
				// we will don't modify the input options oMuligrid
				var o = $.extend(true,
					{
						drag: true,
						sField: "searchField",
						sValue: "searchString",
						sOper: "searchOper",
						sFilter: "filters",
						loadDefaults: true, // this options activates loading of default filters from grid's postData for Multipe Search only.
						beforeShowSearch: null,
						afterShowSearch: null,
						onInitializeSearch: null,
						afterRedraw: null,
						afterChange: null,
						closeAfterSearch: false,
						closeAfterReset: false,
						closeOnEscape: false,
						searchOnEnter: false,
						multipleSearch: false,
						multipleGroup: false,
						// we can't use srort names like resetIcon because of conflict with existing "x" of filterToolbar
						top: 0,
						left: 0,
						removemodal: true,
						//jqModal : true,
						//modal: false,
						resize: true,
						width: 450,
						height: "auto",
						dataheight: "auto",
						showQuery: false,
						errorcheck: true,
						sopt: null,
						stringResult: undefined,
						onClose: null,
						onSearch: null,
						onReset: null,
						//toTop : false,
						//overlay : 30,
						columns: [],
						tmplNames: null,
						tmplFilters: null,
						tmplLabel: " Template: ",
						showOnLoad: false,
						layer: null,
						operands: { "eq": "=", "ne": "<>", "lt": "<", "le": "<=", "gt": ">", "ge": ">=", "bw": "LIKE", "bn": "NOT LIKE", "in": "IN", "ni": "NOT IN", "ew": "LIKE", "en": "NOT LIKE", "cn": "LIKE", "nc": "NOT LIKE", "nu": "IS NULL", "nn": "IS NOT NULL" }
					},
					base.getGridRes.call($self, "search"),
					jgrid.search || {},
					p.searching || {},
					oMuligrid || {});

				var fid = "fbox_" + p.id, commonIconClass = o.commonIconClass,
					ids = { themodal: "searchmod" + fid, modalhead: "searchhd" + fid, modalcontent: "searchcnt" + fid, resizeAlso: fid },
					themodalSelector = "#" + jqID(ids.themodal), gboxSelector = p.gBox, gviewSelector = p.gView, each = $.each,

					defaultFilters = p.postData[o.sFilter],
					searchFeedback = function () {
						var args = $.makeArray(arguments);
						args.unshift("Search");
						args.unshift("Filter");
						args.unshift(o);
						return jgridFeedback.apply($t, args);
					},
					hideModel = function () {
						jgrid.hideModal(themodalSelector, {
							gb: gboxSelector,
							jqm: o.jqModal,
							onClose: o.onClose,
							removemodal: o.removemodal
						});
					};
				if (typeof defaultFilters === "string") {
					defaultFilters = $.trim(defaultFilters) !== "" ? $.parseJSON(defaultFilters) : undefined;
				}
				$(themodalSelector).remove();
				function showFilter($filter) {
					if (searchFeedback("beforeShow", $filter)) {
						$(themodalSelector).data("onClose", o.onClose);
						jgrid.viewModal.call($t, themodalSelector, {
							gbox: gboxSelector,
							jqm: o.jqModal,
							overlay: o.overlay,
							modal: o.modal,
							overlayClass: o.overlayClass,
							toTop: o.toTop,
							onHide: function (h) {
								h.w.remove();
								if (h.o) { h.o.remove(); }
							}
						});
						searchFeedback("afterShow", $filter);
					}
				}
				if ($(themodalSelector)[0] !== undefined) {
					showFilter($("#fbox_" + p.idSel));
				} else {
					var fil = $("<div><div id='" + fid + "' class='" +
						getGuiStyles.call($t, "dialog.body", "searchFilter") +
						"' style='overflow:auto'></div></div>").insertBefore(gviewSelector);
					if (p.direction === "rtl") {
						fil.attr("dir", "rtl");
					}
					var bQ = "", tmpl = "", colnm, found = false, bt, cmi = -1, columns = $.extend([], p.colModel),
						bS = builderFmButon.call($t, fid + "_search", o.Find, mergeCssClasses(commonIconClass, o.findDialogIcon), "right"),
						bC = builderFmButon.call($t, fid + "_reset", o.Reset, mergeCssClasses(commonIconClass, o.resetDialogIcon), "left");
					if (o.showQuery) {
						bQ = builderFmButon.call($t, fid + "_query", "Query", mergeCssClasses(commonIconClass, o.queryDialogIcon), "left") +
							"&#160;";
					}
					if (o.searchForAdditionalProperties) {
						each(p.additionalProperties, function () {
							var cm = typeof this === "string" ? { name: this } : this;
							if (!cm.label) {
								cm.label = cm.name;
							}
							cm.isAddProp = true,
							columns.push(cm);
						});
					}

					if (!o.columns.length) {
						each(columns, function (i, n) {
							if (!n.label) {
								n.label = n.isAddProp ? n.name : p.colNames[i];
							}
							// find first searchable column and set it if no default filter
							if (!found) {
								var searchable = (n.search === undefined) ? true : n.search,
									hidden = (n.hidden === true),
									ignoreHiding = (n.searchoptions && n.searchoptions.searchhidden === true);
								if ((ignoreHiding && searchable) || (searchable && !hidden)) {
									found = true;
									colnm = n.index || n.name;
									cmi = i;
								}
							}
						});
					} else {
						columns = o.columns;
						cmi = 0;
						colnm = columns[0].index || columns[0].name;
					}
					// old behaviour
					if ((!defaultFilters && colnm) || o.multipleSearch === false) {
						var cmop = "eq";
						if (cmi >= 0 && columns[cmi].searchoptions && columns[cmi].searchoptions.sopt) {
							cmop = columns[cmi].searchoptions.sopt[0];
						} else if (o.sopt && o.sopt.length) {
							cmop = o.sopt[0];
						}
						defaultFilters = { groupOp: "AND", rules: [{ field: colnm, op: cmop, data: "" }] };
					}
					found = false;
					if (o.tmplNames && o.tmplNames.length) {
						found = true;
						tmpl = o.tmplLabel;
						tmpl += "<select class='ui-template'>";
						tmpl += "<option value='default'>Default</option>";
						each(o.tmplNames, function (i, n) {
							tmpl += "<option value='" + i + "'>" + n + "</option>";
						});
						tmpl += "</select>";
					}

					bt = "<div class='" + getGuiStyles.call($t, "dialog.footer") + "'><table class='EditTable' style='border:0px none;margin-top:5px' id='" + fid + "_2'><tbody><tr><td colspan='2'><hr class='" +
						getGuiStyles.call($t, "dialog.hr") + "' style='margin:1px'/></td></tr><tr><td class='EditButton EditButton-" + p.direction + "'  style='float:" + (p.direction === "rtl" ? "right" : "left") + ";'>" + bC + tmpl + "</td><td class='EditButton EditButton-" + p.direction + "'>" + bQ + bS + "</td></tr></tbody></table></div>";
					fid = jqID(fid);
					o.gbox = gboxSelector; //"#gbox_" + fid;
					o.height = "auto";
					fid = "#" + fid;
					$(fid).jqFilter({
						columns: columns,
						filter: o.loadDefaults ? defaultFilters : null,
						showQuery: o.showQuery,
						errorcheck: o.errorcheck,
						sopt: o.sopt,
						groupButton: o.multipleGroup,
						ruleButtons: o.multipleSearch,
						afterRedraw: o.afterRedraw,
						ops: o.odata,
						cops: p.customSortOperations,
						operands: o.operands,
						ajaxSelectOptions: p.ajaxSelectOptions,
						groupOps: o.groupOps,
						onChange: function (filterOptions) {
							if (this.p.showQuery) {
								$(".query", this).html(this.toUserFriendlyString());
							}
							fullBoolFeedback.call($t, o.afterChange, "jqGridFilterAfterChange", $(fid), o, filterOptions);
						},
						direction: p.direction,
						id: p.id
					});
					fil.append(bt);
					if (found && o.tmplFilters && o.tmplFilters.length) {
						$(".ui-template", fil).bind("change", function () {
							var curtempl = $(this).val();
							if (curtempl === "default") {
								$(fid).jqFilter("addFilter", defaultFilters);
							} else {
								$(fid).jqFilter("addFilter", o.tmplFilters[parseInt(curtempl, 10)]);
							}
							return false;
						});
					}
					if (o.multipleGroup === true) { o.multipleSearch = true; }
					searchFeedback("onInitialize", $(fid));
					if (o.layer) {
						jgrid.createModal.call($t, ids, fil, o, gviewSelector, $(gboxSelector)[0], "#" + jqID(o.layer), { position: "relative" });
					} else {
						jgrid.createModal.call($t, ids, fil, o, gviewSelector, $(gboxSelector)[0]);
					}
					if (o.searchOnEnter || o.closeOnEscape) {
						$(themodalSelector).keydown(function (e) {
							var $target = $(e.target);
							if (o.searchOnEnter && e.which === 13 && // 13 === $.ui.keyCode.ENTER
									!$target.hasClass("add-group") && !$target.hasClass("add-rule") &&
									!$target.hasClass("delete-group") && !$target.hasClass("delete-rule") &&
									(!$target.hasClass("fm-button") || !$target.is("[id$=_query]"))) {
								$(fid + "_search").click();
								return false;
							}
							if (o.closeOnEscape && e.which === 27) { // 27 === $.ui.keyCode.ESCAPE
								$("#" + jqID(ids.modalhead)).find(".ui-jqdialog-titlebar-close").click();
								return false;
							}
						});
					}
					if (bQ) {
						$(fid + "_query").bind("click", function () {
							$(".queryresult", fil).toggle();
							return false;
						});
					}
					if (o.stringResult === undefined) {
						// to provide backward compatibility, inferring stringResult value from multipleSearch
						o.stringResult = o.multipleSearch;
					}
					$(fid + "_search").bind("click", function () {
						var sdata = {}, res = "", filters, fl = $(fid), $inputs = fl.find(".input-elm");
						if ($inputs.filter(":focus")) {
							$inputs = $inputs.filter(":focus");
						}
						$inputs.change();
						filters = fl.jqFilter("filterData");
						if (o.errorcheck) {
							fl[0].hideError();
							if (!o.showQuery) { fl.jqFilter("toSQLString"); }
							if (fl[0].p.error) {
								fl[0].showError();
								return false;
							}
						}

						if (o.stringResult || p.datatype === "local") {
							try {
								// xmlJsonClass or JSON.stringify
								res = window.JSON && window.JSON.stringify ?
										JSON.stringify(filters) :
										xmlJsonClass.toJson(filters, "", "", false);
							} catch (ignore) { }
							if (typeof res === "string") {
								sdata[o.sFilter] = res;
								each([o.sField, o.sValue, o.sOper], function () { sdata[this] = ""; });
							}
						} else {
							if (o.multipleSearch) {
								sdata[o.sFilter] = filters;
								each([o.sField, o.sValue, o.sOper], function () { sdata[this] = ""; });
							} else {
								sdata[o.sField] = filters.rules[0].field;
								sdata[o.sValue] = filters.rules[0].data;
								sdata[o.sOper] = filters.rules[0].op;
								sdata[o.sFilter] = "";
							}
						}
						p.search = true;
						$.extend(p.postData, sdata);
						if (fullBoolFeedback.call($t, o.onSearch, "jqGridFilterSearch", p.filters)) {
							$self.trigger("reloadGrid", [$.extend({ page: 1 }, o.reloadGridSearchOptions || {})]);
						}
						if (o.closeAfterSearch) {
							hideModel();
						}
						return false;
					});
					$(fid + "_reset").bind("click", function () {
						var sdata = {}, fl1 = $(fid);
						p.search = false;
						p.resetsearch = true;
						if (o.multipleSearch === false) {
							sdata[o.sField] = sdata[o.sValue] = sdata[o.sOper] = "";
						} else {
							sdata[o.sFilter] = "";
						}
						fl1[0].resetFilter();
						if (found) {
							$(".ui-template", fil).val("default");
						}
						$.extend(p.postData, sdata);
						if (fullBoolFeedback.call($t, o.onReset, "jqGridFilterReset")) {
							$self.trigger("reloadGrid", [$.extend({ page: 1 }, o.reloadGridResetOptions || {})]);
						}
						if (o.closeAfterReset) {
							hideModel();
						}
						return false;
					});
					showFilter($(fid));
					var hoverClasses = getGuiStateStyles.call($t, "hover");
					// !!! The next row will not work if "states.disabled" is defined using more as one CSS class
					$(".fm-button:not(." + getGuiStateStyles.call($t, "disabled").split(" ").join(".") + ")", fil).hover(
						function () { $(this).addClass(hoverClasses); },
						function () { $(this).removeClass(hoverClasses); }
					);
				}
			});
		},
		editGridRow: function (rowid, oMuligrid) {    // if one uses jQuery wrapper with multiple grids, then oMultiple specify the object with common options
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!$t.grid || p == null || !rowid) { return; }
				// make new copy of the options oMuligrid and use it for ONE specific grid.
				// p.formEditing can contains grid specific options
				// we will don't modify the input options oMuligrid
				var gridId = p.id, getGridRes = base.getGridRes, setSelection = base.setSelection,
					o = $.extend(true,
						{
							top: 0,
							left: 0,
							width: 300,
							datawidth: "auto",
							height: "auto",
							dataheight: "auto",
							//modal: false,
							//toTop : false,
							//overlay : 30,
							drag: true,
							resize: true,
							url: null,
							mtype: "POST",
							clearAfterAdd: true,
							closeAfterEdit: false,
							reloadAfterSubmit: true,
							onInitializeForm: null,
							beforeInitData: null,
							beforeShowForm: null,
							afterShowForm: null,
							beforeSubmit: null,
							afterSubmit: null,
							onclickSubmit: null,
							afterComplete: null,
							onclickPgButtons: null,
							afterclickPgButtons: null,
							editData: {},
							//jqModal : true,
							closeOnEscape: false,
							addedrow: "first",
							topinfo: "",
							bottominfo: "",
							savekey: [false, 13],
							navkeys: [false, 38, 40],
							checkOnSubmit: false,
							checkOnUpdate: false,
							_savedData: {},
							processing: false,
							onClose: null,
							ajaxEditOptions: {},
							serializeEditData: null,
							viewPagerButtons: true,
							overlayClass: getGuiStyles.call(this, "overlay"),
							removemodal: true,
							skipPostTypes: ["image", "file"]
						},
						getGridRes.call($self, "edit"),
						jgrid.edit,
						p.formEditing || {},
						oMuligrid || {});

				var frmgr = "FrmGrid_" + gridId, frmgrId = frmgr, frmtborg = "TblGrid_" + gridId, frmtb = "#" + jqID(frmtborg), frmtb2 = frmtb + "_2",
					ids = { themodal: "editmod" + gridId, modalhead: "edithd" + gridId, modalcontent: "editcnt" + gridId, resizeAlso: frmgr },
					themodalSelector = "#" + jqID(ids.themodal), gboxSelector = p.gBox, colModel = p.colModel, iColByName = p.iColByName,
					maxCols = 1, maxRows = 0, postdata, diff, editOrAdd, commonIconClass = o.commonIconClass,
					hideModal = function () {
						jgrid.hideModal(themodalSelector, {
							gb: gboxSelector,
							jqm: o.jqModal,
							onClose: o.onClose,
							removemodal: o.removemodal
						});
					},
					errcap = getGridRes.call($self, "errors.errcap"),
					editFeedback = function () {
						var args = $.makeArray(arguments);
						args.unshift("");
						args.unshift("AddEdit");
						args.unshift(o);
						return jgridFeedback.apply($t, args);
					},
					hoverClasses = getGuiStateStyles.call($t, "hover"),
					disabledClass = getGuiStateStyles.call($t, "disabled"),
					highlightClass = getGuiStateStyles.call($t, "select"),
					activeClass = getGuiStateStyles.call($t, "active"),
					errorClass = getGuiStateStyles.call($t, "error");

				$(themodalSelector).remove();
				frmgr = "#" + jqID(frmgr);
				if (rowid === "new") {
					rowid = "_empty";
					editOrAdd = "add";
					o.caption = o.addCaption;
				} else {
					o.caption = o.editCaption;
					editOrAdd = "edit";
				}
				var closeovrl = true;
				if (o.checkOnUpdate && (o.jqModal === true || o.jqModal === undefined) && !o.modal) {
					closeovrl = false;
				}
				function getFormData() {
					$(frmtb + " > tbody > tr > td .FormElement").each(function () {
						var $celm = $(".customelement", this), nm = this.name, cm, iCol, editoptions, formatoptions, newformat, type;
						if ($celm.length) {
							nm = $celm.attr("name");
							iCol = iColByName[nm];
							if (iCol !== undefined) {
								cm = colModel[iCol];
								editoptions = cm.editoptions || {};
								if ($.isFunction(editoptions.custom_value)) {
									try {
										postdata[nm] = editoptions.custom_value.call($t, $("#" + jqID(nm), frmtb), "get");
										if (postdata[nm] === undefined) { throw "e1"; }
									} catch (e) {
										if (e === "e1") {
											jgrid.info_dialog.call($t, errcap, "function 'custom_value' " + o.msg.novalue, o.bClose);
										} else {
											jgrid.info_dialog.call($t, errcap, e.message, o.bClose);
										}
									}
									return true;
								}
							}
						} else {
							type = $(this)[0].type;
							switch (type) {
								case "checkbox":
									postdata[nm] = $(this).is(":checked") ? $(this).val() : $(this).data("offval");
									break;
								case "select-one":
									postdata[nm] = $("option:selected", this).val();
									break;
								case "select-multiple":
									postdata[nm] = $(this).val();
									postdata[nm] = postdata[nm] ? postdata[nm].join(",") : "";
									var selectedText = [];
									$("option:selected", this).each(
										function (i, selected) {
											selectedText[i] = $(selected).text();
										}
									);
									break;
								case "date":
									postdata[nm] = $(this).val();
									if (String(postdata[nm]).split("-").length === 3) {
										iCol = iColByName[nm];
										if (iCol !== undefined) {
											cm = colModel[iCol];
											formatoptions = cm.formatoptions || {};
											newformat = formatoptions.newformat || getGridRes.call($self, "formatter.date.newformat");
											postdata[nm] = jgrid.parseDate.call($self[0], "Y-m-d", postdata[nm], newformat);
										}
									}
									break;
								default:
									if (type !== undefined && $.inArray(type, o.skipPostTypes) < 0) {
										postdata[nm] = $(this).val();
									}
									break;
							}
						}
					});
					return true;
				}
				function createData(rowid1, tb, maxcols) {
					var cnt = 0, retpos = [], ind = false,
						tdtmpl = "<td class='CaptionTD'>&#160;</td><td class='DataTD'>&#160;</td>", tmpl = "", i; //*2
					for (i = 1; i <= maxcols; i++) {
						tmpl += tdtmpl;
					}
					if (rowid1 !== "_empty") {
						ind = base.getInd.call($self, rowid1);
					}
					$(colModel).each(function (iCol) {
						var cm = this, nm = cm.name, $td, hc, trdata, tmp, dc, elc, editable = cm.editable, disabled = false, readonly = false,
							mode = rowid1 === "_empty" ? "addForm" : "editForm";
						if ($.isFunction(editable)) {
							editable = editable.call($t, {
								rowid: rowid1,
								iCol: iCol,
								iRow: ind, // can be false for Add operation
								cmName: nm,
								cm: cm,
								mode: mode
							});
						}
						// hidden fields are included in the form
						if (cm.editrules && cm.editrules.edithidden === true) {
							hc = false;
						} else {
							hc = cm.hidden === true || editable === "hidden" ? true : false;
						}
						dc = hc ? "style='display:none'" : "";
						switch (String(editable).toLowerCase()) {
							case "hidden":
								editable = true;
								break;
							case "disabled":
								editable = true;
								disabled = true;
								break;
							case "readonly":
								editable = true;
								readonly = true;
								break;
						}
						if (nm !== "cb" && nm !== "subgrid" && editable === true && nm !== "rn") {
							if (ind === false) {
								tmp = "";
							} else {
								$td = $($t.rows[ind].cells[iCol]); // $("td[role=gridcell]:eq(" + i + ")", $t.rows[ind])
								try {
									tmp = $.unformat.call($t, $td, { rowId: rowid1, colModel: cm }, iCol);
								} catch (_) {
									tmp = (cm.edittype && cm.edittype === "textarea") ? $td.text() : $td.html();
								}
								if (isEmptyString(tmp)) { tmp = ""; }
							}
							var opt = $.extend({}, cm.editoptions || {},
									{ id: nm, name: nm, rowId: rowid1, mode: mode, cm: cm, iCol: iCol }),
								frmopt = $.extend({}, { elmprefix: "", elmsuffix: "", rowabove: false, rowcontent: "" }, cm.formoptions || {}),
								rp = parseInt(frmopt.rowpos, 10) || cnt + 1,
								cp = parseInt((parseInt(frmopt.colpos, 10) || 1) * 2, 10);
							if (rowid1 === "_empty" && opt.defaultValue) {
								tmp = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
							}
							if (!cm.edittype) { cm.edittype = "text"; }
							if (p.autoEncodeOnEdit) { tmp = jgrid.oldDecodePostedData(tmp); }
							elc = jgrid.createEl.call($t, cm.edittype, opt, tmp, false, $.extend({}, jgrid.ajaxOptions, p.ajaxSelectOptions || {}));
							//if(tmp === "" && cm.edittype == "checkbox") {tmp = $(elc).data("offval");}
							//if(tmp === "" && cm.edittype == "select") {tmp = $("option:eq(0)",elc).text();}
							if (o.checkOnSubmit || o.checkOnUpdate) { o._savedData[nm] = tmp; }
							$(elc).addClass("FormElement");
							if ($.inArray(cm.edittype, ["text", "textarea", "checkbox", "password", "select"]) > -1) {
								$(elc).addClass(getGuiStyles.call($t, "dialog.dataField"));
							}
							trdata = $(tb).find("tr[data-rowpos=" + rp + "]");
							if (frmopt.rowabove) {
								var newdata = $("<tr><td class='contentinfo' colspan='" + (maxcols * 2) + "'>" + frmopt.rowcontent + "</td></tr>");
								$(tb).append(newdata);
								newdata[0].rp = rp;
							}
							if (trdata.length === 0) {
								trdata = $("<tr " + dc + " data-rowpos='" + rp + "'></tr>").addClass("FormData").attr("id", "tr_" + nm);
								$(trdata).append(tmpl);
								$(tb).append(trdata);
								trdata[0].rp = rp;
							}
							var $label = $("td:eq(" + (cp - 2) + ")", trdata[0]),
								$data = $("td:eq(" + (cp - 1) + ")", trdata[0]);
							$label.html(frmopt.label === undefined ? p.colNames[iCol] : frmopt.label || "&#160;");
							$data[isEmptyString($data.html()) ? "html" : "append"](frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);
							if (disabled) {
								$label.addClass(disabledClass);
								$data.addClass(disabledClass);
								$(elc).prop("readonly", true);
								$(elc).prop("disabled", true);
							} else if (readonly) {
								$(elc).prop("readonly", true);
							}
							if (cm.edittype === "custom" && $.isFunction(opt.custom_value)) {
								opt.custom_value.call($t, $("#" + jqID(nm), frmgr), "set", tmp);
							}
							jgrid.bindEv.call($t, elc, opt);
							retpos[cnt] = iCol;
							cnt++;
						}
					});
					if (cnt > 0) {
						var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'>&#160;</td><td colspan='" + (maxcols * 2 - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='" + gridId + "_id' value='" + rowid1 + "'/></td></tr>");
						idrow[0].rp = cnt + 999;
						$(tb).append(idrow);
						if (o.checkOnSubmit || o.checkOnUpdate) { o._savedData[gridId + "_id"] = rowid1; }
					}
					return retpos;
				}
				function fillData(rowid1, fmid) {
					var nm, cnt = 0, fld, opt, vl, vlc;
					if (o.checkOnSubmit || o.checkOnUpdate) { o._savedData = {}; o._savedData[gridId + "_id"] = rowid1; }
					var cm = p.colModel;
					if (rowid1 === "_empty") {
						$(cm).each(function () {
							nm = this.name;
							opt = $.extend({}, this.editoptions || {});
							fld = $("#" + jqID(nm), fmid);
							if (fld && fld.length && fld[0] !== null) {
								vl = "";
								if (this.edittype === "custom" && $.isFunction(opt.custom_value)) {
									opt.custom_value.call($t, fld, "set", vl);
								} else if (opt.defaultValue) {
									vl = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
									if (fld[0].type === "checkbox") {
										vlc = vl.toLowerCase();
										if (vlc.search(/(false|f|0|no|n|off|undefined)/i) < 0 && vlc !== "") {
											fld[0].checked = true;
											fld[0].defaultChecked = true;
											fld[0].value = vl;
										} else {
											fld[0].checked = false;
											fld[0].defaultChecked = false;
										}
									} else { fld.val(vl); }
								} else {
									if (fld[0].type === "checkbox") {
										fld[0].checked = false;
										fld[0].defaultChecked = false;
										vl = $(fld).data("offval");
									} else if (fld[0].type && fld[0].type.substr(0, 6) === "select") {
										fld[0].selectedIndex = 0;
									} else {
										fld.val(vl);
									}
								}
								if (o.checkOnSubmit === true || o.checkOnUpdate) { o._savedData[nm] = vl; }
							}
						});
						$("#id_g", fmid).val(rowid1);
						return;
					}
					var tre = base.getInd.call($self, rowid1, true);
					if (!tre) { return; }
					//$("td[role=gridcell]", tre)
					$(tre.cells).filter("td[role=gridcell]").each(function (i) {
						var tmp;
						nm = cm[i].name;
						// hidden fields are included in the form
						if (nm !== "cb" && nm !== "subgrid" && nm !== "rn" && cm[i].editable === true) {
							try {
								tmp = $.unformat.call($t, $(this), { rowId: rowid1, colModel: cm[i] }, i);
							} catch (_) {
								tmp = cm[i].edittype === "textarea" ? $(this).text() : $(this).html();
							}
							if (p.autoEncodeOnEdit) { tmp = jgrid.oldDecodePostedData(tmp); }
							if (o.checkOnSubmit === true || o.checkOnUpdate) { o._savedData[nm] = tmp; }
							nm = "#" + jqID(nm);
							switch (cm[i].edittype) {
								case "password":
								case "text":
								case "button":
								case "image":
								case "textarea":
									if (isEmptyString(tmp)) { tmp = ""; }
									$(nm, fmid).val(tmp);
									break;
								case "select":
									var opv = tmp.split(",");
									opv = $.map(opv, function (n) { return $.trim(n); });
									$(nm + " option", fmid).each(function () {
										var selOpt = this, $selOpt = $(selOpt), optVal = $.trim($selOpt.val()), optText = $.trim($selOpt.text());
										if (!cm[i].editoptions.multiple && ($.trim(tmp) === optText || opv[0] === optText || opv[0] === optVal)) {
											selOpt.selected = true;
										} else if (cm[i].editoptions.multiple) {
											if ($.inArray(optText, opv) > -1 || $.inArray(optVal, opv) > -1) {
												selOpt.selected = true;
											} else {
												selOpt.selected = false;
											}
										} else {
											selOpt.selected = false;
										}
									});
									break;
								case "checkbox":
									tmp = String(tmp);
									// tmp will be set below (in the if-else) to Boolean true or false
									if (cm[i].editoptions && cm[i].editoptions.value) {
										tmp = cm[i].editoptions.value.split(":")[0] === tmp;
									} else {
										tmp = tmp.toLowerCase();
										tmp = tmp.search(/(false|f|0|no|n|off|undefined)/i) < 0 && tmp !== "";
									}
									$(nm, fmid).prop({ checked: tmp, defaultChecked: tmp });
									break;
								case "custom":
									try {
										if (cm[i].editoptions && $.isFunction(cm[i].editoptions.custom_value)) {
											cm[i].editoptions.custom_value.call($t, $(nm, fmid), "set", tmp);
										} else { throw "e1"; }
									} catch (e) {
										if (e === "e1") {
											jgrid.info_dialog.call($t, errcap, "function 'custom_value' " + o.msg.nodefined, o.bClose);
										} else {
											jgrid.info_dialog.call($t, errcap, e.message, o.bClose);
										}
									}
									break;
							}
							cnt++;
						}
					});
					if (cnt > 0) { $("#id_g", frmtb).val(rowid1); }
				}
				function setNullsOrUnformat() {
					var url = o.url || p.editurl;
					$.each(colModel, function (i, cm) {
						var cmName = cm.name, value = postdata[cmName];
						if (cm.formatter === "date" && (cm.formatoptions == null || cm.formatoptions.sendFormatted !== true)) {
							// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
							// Floating point separator for example
							postdata[cmName] = $.unformat.date.call($t, value, cm);
						}
						if (url !== "clientArray" && cm.editoptions && cm.editoptions.NullIfEmpty === true) {
							if (postdata.hasOwnProperty(cmName) && value === "") {
								postdata[cmName] = "null";
							}
						}
					});
				}
				function postIt() {
					var successResult = [true, "", ""], ret = successResult, onClickSubmitResult = {}, opers = p.prmNames, idname, oper, key, selr, i, url, itm, iCol,
						iRow = base.getInd.call($self, rowid),
						tr = iRow === false ? null : $t.rows[iRow],
						retvals = $self.triggerHandler("jqGridAddEditBeforeCheckValues", [$(frmgr), editOrAdd]);

					if (retvals && typeof retvals === "object") { postdata = retvals; }

					iRow = iRow === false ? -1 : iRow;

					if ($.isFunction(o.beforeCheckValues)) {
						retvals = o.beforeCheckValues.call($t, postdata, $(frmgr), editOrAdd);
						if (retvals && typeof retvals === "object") { postdata = retvals; }
					}
					for (key in postdata) {
						if (postdata.hasOwnProperty(key)) {
							iCol = p.iColByName[key];
							ret = jgrid.checkValues.call($t, postdata[key], key, undefined, undefined, {
								oldValue: rowid === "_empty" ? null : base.getCell.call($self, rowid, iCol),
								newValue: postdata[key],
								cmName: key,
								rowid: rowid,
								cm: colModel[iCol],
								iCol: iCol,
								iRow: iRow,
								tr: tr,
								td: tr == null ? null : tr.cells[iCol],
								mode: rowid === "_empty" ? "addForm" : "editForm"
							});
							if (ret == null || ret === true) { ret = successResult; }
							if (ret[0] === false) { break; }
						}
					}
					setNullsOrUnformat();
					if (ret[0]) {
						onClickSubmitResult = $self.triggerHandler("jqGridAddEditClickSubmit", [o, postdata, editOrAdd]);
						if (onClickSubmitResult === undefined && $.isFunction(o.onclickSubmit)) {
							onClickSubmitResult = o.onclickSubmit.call($t, o, postdata, editOrAdd) || {};
						}
						ret = $self.triggerHandler("jqGridAddEditBeforeSubmit", [postdata, $(frmgr), editOrAdd]);
						if (ret == null || ret === true) { ret = successResult; }
						if (ret[0] && $.isFunction(o.beforeSubmit)) {
							ret = o.beforeSubmit.call($t, postdata, $(frmgr), editOrAdd);
							if (ret == null || ret === true) { ret = successResult; }
						}
					}

					if (ret[0] && !o.processing) {
						o.processing = true;
						$("#sData", frmtb2).addClass(activeClass);
						url = o.url || p.editurl;
						oper = opers.oper;
						idname = url === "clientArray" && p.keyName !== false ? p.keyName : opers.id;
						// we add to pos data array the action - the name is oper
						postdata[oper] = ($.trim(postdata[gridId + "_id"]) === "_empty") ? opers.addoper : opers.editoper;
						if (postdata[oper] !== opers.addoper) {
							postdata[idname] = postdata[gridId + "_id"];
						} else {
							// check to see if we have allredy this field in the form and if yes lieve it
							if (postdata[idname] === undefined) { postdata[idname] = postdata[gridId + "_id"]; }
						}
						delete postdata[gridId + "_id"];
						postdata = $.extend(postdata, o.editData, onClickSubmitResult);
						if (p.treeGrid === true) {
							if (postdata[oper] === opers.addoper) {
								selr = p.selrow;
								var parentIdField = p.treeGridModel === "adjacency" ? p.treeReader.parent_id_field : "parent_id";
								postdata[parentIdField] = selr;
							}
							for (i in p.treeReader) {
								if (p.treeReader.hasOwnProperty(i)) {
									itm = p.treeReader[i];
									if (postdata.hasOwnProperty(itm)) {
										if (postdata[oper] === opers.addoper && i === "parent_id_field") { continue; }
										delete postdata[itm];
									}
								}
							}
						}

						postdata[idname] = jgrid.stripPref(p.idPrefix, postdata[idname]);
						if (p.autoEncodeOnEdit) {
							$.each(postdata, function (n, v) {
								if (!$.isFunction(v)) {
									postdata[n] = jgrid.oldEncodePostedData(v);
								}
							});
						}

						var ajaxOptions = $.extend({
								url: $.isFunction(url) ? url.call($t, postdata[idname], editOrAdd, postdata, o) : url,
								type: $.isFunction(o.mtype) ? o.mtype.call($t, editOrAdd, o, postdata[idname], postdata) : o.mtype,
								//data: $.isFunction(o.serializeEditData) ? o.serializeEditData.call($t,postdata) :  postdata,
								data: jgrid.serializeFeedback.call($t,
									$.isFunction(o.serializeEditData) ? o.serializeEditData : p.serializeEditData,
									"jqGridAddEditSerializeEditData",
									postdata),
								complete: function (jqXHR, textStatus) {
									$("#sData", frmtb2).removeClass(activeClass);
									postdata[idname] = $("#id_g", frmtb).val();
									if ((jqXHR.status >= 300 && jqXHR.status !== 304) || (jqXHR.status === 0 && jqXHR.readyState === 4)) {
										ret[0] = false;
										ret[1] = $self.triggerHandler("jqGridAddEditErrorTextFormat", [jqXHR, editOrAdd]);
										if ($.isFunction(o.errorTextFormat)) {
											ret[1] = o.errorTextFormat.call($t, jqXHR, editOrAdd);
										} else {
											ret[1] = textStatus + " Status: '" + jqXHR.statusText + "'. Error code: " + jqXHR.status;
										}
									} else {
										// data is posted successful
										// execute aftersubmit with the returned data from server
										ret = $self.triggerHandler("jqGridAddEditAfterSubmit", [jqXHR, postdata, editOrAdd]);
										if (ret == null || ret === true) { ret = successResult; }
										if (ret[0] && $.isFunction(o.afterSubmit)) {
											ret = o.afterSubmit.call($t, jqXHR, postdata, editOrAdd);
											if (ret == null || ret === true) { ret = successResult; }
										}
									}
									if (ret[0] === false) {
										$("#FormError>td", frmtb).html(ret[1]);
										$("#FormError", frmtb).show();
									} else {
										if (p.autoEncodeOnEdit) {
											$.each(postdata, function (n, v) {
												postdata[n] = jgrid.oldDecodePostedData(v);
											});
										}
										//o.reloadAfterSubmit = o.reloadAfterSubmit && $t.o.datatype != "local";
										// the action is add
										var reloadGridOptions = [$.extend({}, o.reloadGridOptions || {})];
										if (postdata[oper] === opers.addoper) {
											//id processing
											// user not set the id ret[2]
											if (!ret[2]) { ret[2] = jgrid.randId(); }
											if (postdata[idname] == null || postdata[idname] === "_empty" || postdata[oper] === opers.addoper) {
												postdata[idname] = ret[2];
											} else {
												ret[2] = postdata[idname];
											}
											if (o.reloadAfterSubmit) {
												$self.trigger("reloadGrid", reloadGridOptions);
											} else {
												if (p.treeGrid === true) {
													base.addChildNode.call($self, ret[2], selr, postdata);
												} else {
													base.addRowData.call($self, ret[2], postdata, o.addedrow);
												}
											}
											if (o.closeAfterAdd) {
												if (p.treeGrid !== true) {
													setSelection.call($self, ret[2]);
												}
												hideModal();
											} else if (o.clearAfterAdd) {
												fillData("_empty", frmgr);
											}
										} else {
											// the action is update
											if (o.reloadAfterSubmit) {
												$self.trigger("reloadGrid", reloadGridOptions);
												if (!o.closeAfterEdit) { setTimeout(function () { setSelection.call($self, postdata[idname]); }, 1000); }
											} else {
												if (p.treeGrid === true) {
													base.setTreeRow.call($self, postdata[idname], postdata);
												} else {
													base.setRowData.call($self, postdata[idname], postdata);
												}
											}
											if (o.closeAfterEdit) {
												hideModal();
											}
										}
										if ($.isFunction(o.afterComplete)) {
											var copydata = jqXHR;
											setTimeout(function () {
												$self.triggerHandler("jqGridAddEditAfterComplete", [copydata, postdata, $(frmgr), editOrAdd]);
												o.afterComplete.call($t, copydata, postdata, $(frmgr), editOrAdd);
												copydata = null;
											}, 50);
										}
										if (o.checkOnSubmit || o.checkOnUpdate) {
											$(frmgr).data("disabled", false);
											if (o._savedData[gridId + "_id"] !== "_empty") {
												var key1;
												for (key1 in o._savedData) {
													if (o._savedData.hasOwnProperty(key1) && postdata[key1]) {
														o._savedData[key1] = postdata[key1];
													}
												}
											}
										}
									}
									o.processing = false;
									try { $(":input:visible", frmgr)[0].focus(); } catch (ignore) { }
								}
							}, jgrid.ajaxOptions, o.ajaxEditOptions);

						if (!ajaxOptions.url && !o.useDataProxy) {
							if ($.isFunction(p.dataProxy)) {
								o.useDataProxy = true;
							} else {
								ret[0] = false;
								ret[1] += " " + jgrid.errors.nourl;
							}
						}
						if (ret[0]) {
							if (o.useDataProxy) {
								var dpret = p.dataProxy.call($t, ajaxOptions, "set_" + gridId);
								if (dpret === undefined) {
									dpret = [true, ""];
								}
								if (dpret[0] === false) {
									ret[0] = false;
									ret[1] = dpret[1] || "Error deleting the selected row!";
								} else {
									if (ajaxOptions.data.oper === opers.addoper && o.closeAfterAdd) {
										hideModal();
									}
									if (ajaxOptions.data.oper === opers.editoper && o.closeAfterEdit) {
										hideModal();
									}
								}
							} else {
								if (ajaxOptions.url === "clientArray") {
									o.reloadAfterSubmit = false;
									postdata = ajaxOptions.data;
									ajaxOptions.complete({ status: 200, statusText: "" }, "");
								} else {
									$.ajax(ajaxOptions);
								}
							}
						}
					}
					if (ret[0] === false) {
						$("#FormError>td", frmtb).html(ret[1]);
						$("#FormError", frmtb).show();
						// return;
					}
				}
				function compareData(nObj, oObj) {
					var ret = false, key;
					for (key in nObj) {
						if (nObj.hasOwnProperty(key) && String(nObj[key]) !== String(oObj[key])) {
							ret = true;
							break;
						}
					}
					return ret;
				}
				function checkUpdates() {
					var stat = true;
					$("#FormError", frmtb).hide();
					if (o.checkOnUpdate) {
						postdata = {};
						getFormData();
						diff = compareData(postdata, o._savedData);
						if (diff) {
							$(frmgr).data("disabled", true);
							$(".confirm", themodalSelector).show();
							stat = false;
						}
					}
					return stat;
				}
				function restoreInline() {
					var editingInfo = jgrid.detectRowEditing.call($t, rowid);
					if (editingInfo != null) {
						if (editingInfo.mode === "inlineEditing") {
							base.restoreRow.call($self, rowid);
						} else {
							var savedRowInfo = editingInfo.savedRow, tr = $t.rows[savedRowInfo.id];
							base.restoreCell.call($self, savedRowInfo.id, savedRowInfo.ic);
							// remove highlighting of the cell
							$(tr.cells[savedRowInfo.ic]).removeClass("edit-cell " + highlightClass);
							$(tr).addClass(highlightClass).attr({ "aria-selected": "true", "tabindex": "0" });
						}
					}
				}
				function updateNav(cr, posarr) {
					var totr = posarr[1].length - 1;
					if (cr === 0) {
						$("#pData", frmtb2).addClass(disabledClass);
					} else if (posarr[1][cr - 1] !== undefined && hasOneFromClasses($("#" + jqID(posarr[1][cr - 1])), disabledClass)) {
						$("#pData", frmtb2).addClass(disabledClass);
					} else {
						$("#pData", frmtb2).removeClass(disabledClass);
					}

					if (cr === totr) {
						$("#nData", frmtb2).addClass(disabledClass);
					} else if (posarr[1][cr + 1] !== undefined && hasOneFromClasses($("#" + jqID(posarr[1][cr + 1])), disabledClass)) {
						$("#nData", frmtb2).addClass(disabledClass);
					} else {
						$("#nData", frmtb2).removeClass(disabledClass);
					}
				}
				function getCurrPos() {
					var rowsInGrid = base.getDataIDs.call($self),
						selrow = $("#id_g", frmtb).val(),
						pos = $.inArray(selrow, rowsInGrid);
					return [pos, rowsInGrid];
				}

				var dh = isNaN(o.dataheight) ? o.dataheight : o.dataheight + "px",
					dw = isNaN(o.datawidth) ? o.datawidth : o.datawidth + "px",
					frm = $("<form name='FormPost' id='" + frmgrId + "' class='FormGrid' onSubmit='return false;' style='width:" + dw + ";overflow:auto;position:relative;height:" + dh + ";'></form>").data("disabled", false),
					tbl = $("<table id='" + frmtborg + "' class='EditTable'><tbody></tbody></table>");
				$(colModel).each(function () {
					var fmto = this.formoptions;
					maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0);
					maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0);
				});
				$(frm).append(tbl);
				var flr = $("<tr id='FormError' style='display:none'><td class='" + errorClass + "' colspan='" + (maxCols * 2) + "'>&#160;</td></tr>");
				flr[0].rp = 0;
				$(tbl).append(flr);
				//topinfo
				flr = $("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='" + (maxCols * 2) + "'>" + (o.topinfo || "&#160;") + "</td></tr>");
				flr[0].rp = 0;
				$(tbl).append(flr);
				if (!editFeedback("beforeInitData", frm, editOrAdd)) { return; }
				restoreInline();
				// set the id.
				// use carefull only to change here colproperties.
				// create data
				var rtlb = p.direction === "rtl" ? true : false,
					bp = rtlb ? "nData" : "pData",
					bn = rtlb ? "pData" : "nData";
				createData(rowid, tbl, maxCols);
				// buttons at footer
				var bP = builderFmButon.call($t, bp, "", mergeCssClasses(commonIconClass, o.prevIcon), "", "left"),
					bN = builderFmButon.call($t, bn, "", mergeCssClasses(commonIconClass, o.nextIcon), "", "right"),
					bS = builderFmButon.call($t, "sData", o.bSubmit),
					bC = builderFmButon.call($t, "cData", o.bCancel),
					bt = "<div class='" + getGuiStyles.call($t, "dialog.footer") + "'><table class='EditTable' id='" + frmtborg + "_2'><tbody><tr><td colspan='2'><hr class='" +
					getGuiStyles.call($t, "dialog.hr") + "' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton navButton-" + p.direction + "'>" + (rtlb ? bN + bP : bP + bN) + "</td><td class='EditButton EditButton-" + p.direction + "'>" + bS + "&#160;" + bC + "</td></tr>";
				bt += "<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>" + (o.bottominfo || "&#160;") + "</td></tr>";
				bt += "</tbody></table></div>";
				if (maxRows > 0) {
					var sd = [];
					$.each($(tbl)[0].rows, function (i, r) {
						sd[i] = r;
					});
					sd.sort(function (a, b) {
						if (a.rp > b.rp) { return 1; }
						if (a.rp < b.rp) { return -1; }
						return 0;
					});
					$.each(sd, function (index, row) {
						$("tbody", tbl).append(row);
					});
				}
				o.gbox = gboxSelector;
				var cle = false;
				if (o.closeOnEscape === true) {
					o.closeOnEscape = false;
					cle = true;
				}
				var tms = $("<div></div>").append($("<div class='" + getGuiStyles.call($t, "dialog.body") + "'></div>").append(frm)).append(bt);
				jgrid.createModal.call($t, ids, tms, o, p.gView, $(gboxSelector)[0]);
				// TODO: remove the call of jgrid.bindEv and probably call of opt.custom_value from createData
				// and place the calls here AFTER the form are placed on the HTML page
				if (o.topinfo) { $(".tinfo", frmtb).show(); }
				if (o.bottominfo) { $(".binfo", frmtb2).show(); }
				tms = null;
				bt = null;
				$(themodalSelector).keydown(function (e) {
					var wTagName = (e.target.tagName || "").toUpperCase(), $focused, idFocused;
					if ($(frmgr).data("disabled") === true) { return false; }//??
					if (e.which === 13) {
						if (wTagName !== "TEXTAREA") {
							$focused = $(frmtb2).find(":focus");
							idFocused = $focused.attr("id");
							if ($focused.length > 0 && $.inArray(idFocused, ["pData", "nData", "cData"]) >= 0) {
								$focused.trigger("click");
								return false;
							}
							if (o.savekey[0] === true && o.savekey[1] === 13) {
								$("#sData", frmtb2).trigger("click");
								return false;
							}
						}
					}
					if (o.savekey[0] === true && e.which === o.savekey[1]) { // save
						if (wTagName !== "TEXTAREA") {
							$("#sData", frmtb2).trigger("click");
							return false;
						}
					}
					if (e.which === 27) {
						if (!checkUpdates()) { return false; }
						if (cle) {
							hideModal();
						}
						return false;
					}
					if (o.navkeys[0] === true) {
						if ($("#id_g", frmtb).val() === "_empty") { return true; }
						if (e.which === o.navkeys[1]) { //up
							$("#pData", frmtb2).trigger("click");
							return false;
						}
						if (e.which === o.navkeys[2]) { //down
							$("#nData", frmtb2).trigger("click");
							return false;
						}
					}
				});
				if (o.checkOnUpdate) {
					$("a.ui-jqdialog-titlebar-close span", themodalSelector).removeClass("jqmClose");
					$("a.ui-jqdialog-titlebar-close", themodalSelector).unbind("click")
						.click(function () {
							if (!checkUpdates()) {
								return false;
							}
							hideModal();
							return false;
						});
				}
				addFormIcon($("#sData", frmtb2), o.saveicon, commonIconClass);
				addFormIcon($("#cData", frmtb2), o.closeicon, commonIconClass);
				if (o.checkOnSubmit || o.checkOnUpdate) {
					bS = builderFmButon.call($t, "sNew", o.bYes);
					bN = builderFmButon.call($t, "nNew", o.bNo);
					bC = builderFmButon.call($t, "cNew", o.bExit);
					var zI = o.zIndex || 999;
					zI++;
					$("<div class='" + o.overlayClass + " jqgrid-overlay confirm' style='z-index:" + zI + ";display:none;'>&#160;</div><div class='" + getGuiStyles.call($t, "dialog.content", "confirm ui-jqconfirm") + "' style='z-index:" + (zI + 1) + "'>" + o.saveData + "<br/><br/>" + bS + bN + bC + "</div>").insertAfter(frmgr);
					$("#sNew", themodalSelector).click(function () {
						// if the form will be hidden at the first usage and it will be shown at the next usage
						// then the execution context click handler and all other functions like postIt()
						// will contains the variables (like rowid, postdata and so on) from THE FIRST call
						// of editGridRow. One should be very careful in the code of postIt()
						postIt();
						$(frmgr).data("disabled", false);
						$(".confirm", themodalSelector).hide();
						return false;
					});
					$("#nNew", themodalSelector).click(function () {
						$(".confirm", themodalSelector).hide();
						$(frmgr).data("disabled", false);
						setTimeout(function () { $(":input:visible", frmgr)[0].focus(); }, 0);
						return false;
					});
					$("#cNew", themodalSelector).click(function () {
						// if the form will be hidden at the first usage and it will be shown at the next usage
						// then the execution context click handler and all other functions like postIt()
						// will contains the variables (like o) from THE FIRST call
						$(".confirm", themodalSelector).hide();
						$(frmgr).data("disabled", false);
						hideModal();
						return false;
					});
				}
				// here initform - only once
				editFeedback("onInitializeForm", $(frmgr), editOrAdd);
				if (rowid === "_empty" || !o.viewPagerButtons) {
					$("#pData,#nData", frmtb2).hide();
				} else {
					$("#pData,#nData", frmtb2).show();
				}
				editFeedback("beforeShowForm", $(frmgr), editOrAdd);
				$(themodalSelector).data("onClose", o.onClose);
				jgrid.viewModal.call($t, themodalSelector, {
					gbox: gboxSelector,
					jqm: o.jqModal,
					overlay: o.overlay,
					modal: o.modal,
					overlayClass: o.overlayClass,
					toTop: o.toTop,
					onHide: function (h) {
						h.w.remove();
						if (h.o) { h.o.remove(); }
					}
				});
				if (!closeovrl) {
					$("." + jqID(o.overlayClass)).click(function () {
						if (!checkUpdates()) { return false; }
						hideModal();
						return false;
					});
				}
				$(".fm-button", themodalSelector).hover(
					function () { $(this).addClass(hoverClasses); },
					function () { $(this).removeClass(hoverClasses); }
				);
				$("#sData", frmtb2).click(function () {
					postdata = {};
					$("#FormError", frmtb).hide();
					// all depend on ret array
					//ret[0] - succes
					//ret[1] - msg if not succes
					//ret[2] - the id  that will be set if reload after submit false
					getFormData();
					if (postdata[gridId + "_id"] === "_empty") {
						postIt();
					} else if (o.checkOnSubmit === true) {
						diff = compareData(postdata, o._savedData);
						if (diff) {
							$(frmgr).data("disabled", true);
							$(".confirm", themodalSelector).show();
						} else {
							postIt();
						}
					} else {
						postIt();
					}
					return false;
				});
				$("#cData", frmtb2).click(function () {
					if (!checkUpdates()) { return false; }
					hideModal();
					return false;
				});
				$("#nData", frmtb2).click(function () {
					if (!checkUpdates()) { return false; }
					$("#FormError", frmtb).hide();
					var npos = getCurrPos();
					npos[0] = parseInt(npos[0], 10);
					if (npos[0] !== -1 && npos[1][npos[0] + 1]) {
						if (!editFeedback("onclickPgButtons", "next", $(frmgr), npos[1][npos[0]])) { return false; }
						fillData(npos[1][npos[0] + 1], frmgr);
						setSelection.call($self, npos[1][npos[0] + 1]);
						editFeedback("afterclickPgButtons", "next", $(frmgr), npos[1][npos[0] + 1]);
						updateNav(npos[0] + 1, npos);
					}
					return false;
				});
				$("#pData", frmtb2).click(function () {
					if (!checkUpdates()) { return false; }
					$("#FormError", frmtb).hide();
					var ppos = getCurrPos();
					if (ppos[0] !== -1 && ppos[1][ppos[0] - 1]) {
						if (!editFeedback("onclickPgButtons", "prev", $(frmgr), ppos[1][ppos[0]])) { return false; }
						if (hasOneFromClasses($("#" + jqID(ppos[1][ppos[0] - 1])), disabledClass)) { return false; }
						fillData(ppos[1][ppos[0] - 1], frmgr);
						setSelection.call($self, ppos[1][ppos[0] - 1]);
						editFeedback("afterclickPgButtons", "prev", $(frmgr), ppos[1][ppos[0] - 1]);
						updateNav(ppos[0] - 1, ppos);
					}
					return false;
				});
				editFeedback("afterShowForm", $(frmgr), editOrAdd);
				var posInit = getCurrPos();
				updateNav(posInit[0], posInit);
			});
		},
		viewGridRow: function (rowid, oMuligrid) {
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!$t.grid || p == null || !rowid) { return; }
				// make new copy of the options oMuligrid and use it for ONE specific grid.
				// p.formViewing can contains grid specific options
				// we will don't modify the input options oMuligrid
				var gridId = p.id,
					o = $.extend(true,
						{
							top: 0,
							left: 0,
							width: 0,
							datawidth: "auto",
							height: "auto",
							dataheight: "auto",
							//modal: false,
							//toTop : false,
							//overlay: 30,
							drag: true,
							resize: true,
							//jqModal: true,
							closeOnEscape: false,
							labelswidth: "30%",
							navkeys: [false, 38, 40],
							onClose: null,
							beforeShowForm: null,
							beforeInitData: null,
							viewPagerButtons: true,
							removemodal: true
						},
						base.getGridRes.call($self, "view"),
						jgrid.view || {},
						p.formViewing || {},
						oMuligrid || {});

				var frmgr = "#ViewGrid_" + jqID(gridId), frmtb = "#ViewTbl_" + jqID(gridId), frmtb2 = frmtb + "_2",
					frmgrId = "ViewGrid_" + gridId, frmtbId = "ViewTbl_" + gridId, commonIconClass = o.commonIconClass,
					ids = { themodal: "viewmod" + gridId, modalhead: "viewhd" + gridId, modalcontent: "viewcnt" + gridId, resizeAlso: frmgrId },
					themodalSelector = "#" + jqID(ids.themodal), gboxSelector = p.gBox, colModel = p.colModel,
					maxCols = 1, maxRows = 0,
					viewFeedback = function () {
						var args = $.makeArray(arguments);
						args.unshift("");
						args.unshift("View");
						args.unshift(o);
						return jgridFeedback.apply($t, args);
					},
					hideModal = function () {
						jgrid.hideModal(themodalSelector, {
							gb: gboxSelector,
							jqm: o.jqModal,
							onClose: o.onClose,
							removemodal: o.removemodal
						});
					},
					hoverClasses = getGuiStateStyles.call($t, "hover"),
					disabledClass = getGuiStateStyles.call($t, "disabled");

				function focusaref() { //Sfari 3 issues
					if (o.closeOnEscape === true || o.navkeys[0] === true) {
						setTimeout(function () { $("#cData").focus(); }, 0);
					}
				}
				function createData(rowid1, tb, maxcols) {
					var nm, hc, trdata, cnt = 0, tmp, dc, retpos = [], ind = base.getInd.call($self, rowid1), i,
						viewDataClasses = getGuiStyles.call($t, "dialog.viewData", "DataTD form-view-data"),
						viewLabelClasses = getGuiStyles.call($t, "dialog.viewLabel", "CaptionTD form-view-label"),
						tdtmpl = "<td class='" + viewLabelClasses + "' width='" + o.labelswidth + "'>&#160;</td><td class='" + viewDataClasses + " ui-helper-reset'>&#160;</td>", tmpl = "",
						tdtmpl2 = "<td class='" + viewLabelClasses + "'></td><td class='" + viewDataClasses + "'></td>",
						fmtnum = ["integer", "number", "currency"], max1 = 0, max2 = 0, maxw, setme, viewfld;
					for (i = 1; i <= maxcols; i++) {
						tmpl += i === 1 ? tdtmpl : tdtmpl2;
					}
					// find max number align rigth with property formatter
					$(colModel).each(function () {
						var cm = this;
						if (cm.editrules && cm.editrules.edithidden === true) {
							hc = false;
						} else {
							hc = cm.hidden === true ? true : false;
						}
						if (!hc && cm.align === "right") {
							if (cm.formatter && $.inArray(cm.formatter, fmtnum) !== -1) {
								max1 = Math.max(max1, parseInt(cm.width, 10));
							} else {
								max2 = Math.max(max2, parseInt(cm.width, 10));
							}
						}
					});
					maxw = max1 !== 0 ? max1 : max2 !== 0 ? max2 : 0;
					$(colModel).each(function (iCol) {
						var cm = this;
						nm = cm.name;
						setme = false;
						// hidden fields are included in the form
						if (cm.editrules && cm.editrules.edithidden === true) {
							hc = false;
						} else {
							hc = cm.hidden === true ? true : false;
						}
						dc = hc ? "style='display:none'" : "";
						viewfld = (typeof cm.viewable !== "boolean") ? true : cm.viewable;
						if (nm !== "cb" && nm !== "subgrid" && nm !== "rn" && viewfld) {
							tmp = ind === false ? "" : jgrid.getDataFieldOfCell.call($t, $t.rows[ind], iCol).html();
							setme = cm.align === "right" && maxw !== 0 ? true : false;
							var frmopt = $.extend({}, { rowabove: false, rowcontent: "" }, cm.formoptions || {}),
								rp = parseInt(frmopt.rowpos, 10) || cnt + 1,
								cp = parseInt((parseInt(frmopt.colpos, 10) || 1) * 2, 10);
							if (frmopt.rowabove) {
								var newdata = $("<tr><td class='contentinfo' colspan='" + (maxcols * 2) + "'>" + frmopt.rowcontent + "</td></tr>");
								$(tb).append(newdata);
								newdata[0].rp = rp;
							}
							trdata = $(tb).find("tr[data-rowpos=" + rp + "]");
							if (trdata.length === 0) {
								trdata = $("<tr " + dc + " data-rowpos='" + rp + "'></tr>").addClass("FormData").attr("id", "trv_" + nm);
								$(trdata).append(tmpl);
								$(tb).append(trdata);
								trdata[0].rp = rp;
							}
							var labelText = (frmopt.label === undefined ? p.colNames[iCol] : frmopt.label),
								$data = $("td:eq(" + (cp - 1) + ")", trdata[0]);
							$("td:eq(" + (cp - 2) + ")", trdata[0]).html("<b>" + (labelText || "&nbsp;") + "</b>");
							$data[isEmptyString($data.html()) ? "html" : "append"]("<span>" + (tmp || "&nbsp;") + "</span>").attr("id", "v_" + nm);
							if (setme) {
								$("td:eq(" + (cp - 1) + ") span", trdata[0]).css({ "text-align": "right", width: maxw + "px" });
							}
							retpos[cnt] = iCol;
							cnt++;
						}
					});
					if (cnt > 0) {
						var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'>&#160;</td><td colspan='" + (maxcols * 2 - 1) + "' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='" + rowid1 + "'/></td></tr>");
						idrow[0].rp = cnt + 99;
						$(tb).append(idrow);
					}
					return retpos;
				}
				function fillData(rowid1) {
					var nm, hc, cnt = 0, trv = base.getInd.call($self, rowid1, true), cm;
					if (!trv) { return; }
					$("td", trv).each(function (i) {
						cm = colModel[i];
						nm = cm.name;
						// hidden fields are included in the form
						if (cm.editrules && cm.editrules.edithidden === true) {
							hc = false;
						} else {
							hc = cm.hidden === true ? true : false;
						}
						if (nm !== "cb" && nm !== "subgrid" && nm !== "rn") {
							nm = jqID("v_" + nm);
							$("#" + nm + " span", frmtb).html(jgrid.getDataFieldOfCell.call($t, trv, i).html());
							if (hc) { $("#" + nm, frmtb).parents("tr:first").hide(); }
							cnt++;
						}
					});
					if (cnt > 0) { $("#id_g", frmtb).val(rowid1); }
				}
				function updateNav(cr, posarr) {
					var totr = posarr[1].length - 1;
					if (cr === 0) {
						$("#pData", frmtb2).addClass(disabledClass);
					} else if (posarr[1][cr - 1] !== undefined && hasOneFromClasses($("#" + jqID(posarr[1][cr - 1])), disabledClass)) {
						$("#pData", frmtb2).addClass(disabledClass);
					} else {
						$("#pData", frmtb2).removeClass(disabledClass);
					}
					if (cr === totr) {
						$("#nData", frmtb2).addClass(disabledClass);
					} else if (posarr[1][cr + 1] !== undefined && hasOneFromClasses($("#" + jqID(posarr[1][cr + 1])), disabledClass)) {
						$("#nData", frmtb2).addClass(disabledClass);
					} else {
						$("#nData", frmtb2).removeClass(disabledClass);
					}
				}
				function getCurrPos() {
					var rowsInGrid = base.getDataIDs.call($self),
						selrow = $("#id_g", frmtb).val(),
						pos = $.inArray(selrow, rowsInGrid);
					return [pos, rowsInGrid];
				}

				var dh = isNaN(o.dataheight) ? o.dataheight : o.dataheight + "px",
					dw = isNaN(o.datawidth) ? o.datawidth : o.datawidth + "px",
					frmDiv = $("<div class='" + getGuiStyles.call($t, "dialog.body") + "'><form name='FormPost' id='" + frmgrId +
						"' class='FormGrid' style='width:" + dw + ";overflow:auto;position:relative;height:" + dh + ";'></form></div>"),
					frm = frmDiv.children("form.FormGrid"),
					tbl = $("<table id='" + frmtbId +
						"' class='EditTable'><tbody></tbody></table>");

				$(themodalSelector).remove();
				$(colModel).each(function () {
					var fmto = this.formoptions;
					maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0);
					maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0);
				});
				// set the id.
				frm.append(tbl);
				if (!viewFeedback("beforeInitData", frm)) { return; }
				createData(rowid, tbl, maxCols);
				var rtlb = p.direction === "rtl" ? true : false,
					bp = rtlb ? "nData" : "pData",
					bn = rtlb ? "pData" : "nData",
						// buttons at footer
					bP = builderFmButon.call($t, bp, "", mergeCssClasses(commonIconClass, o.prevIcon), "", "left"),
					bN = builderFmButon.call($t, bn, "", mergeCssClasses(commonIconClass, o.nextIcon), "", "right"),
					bC = builderFmButon.call($t, "cData", o.bClose);

				if (maxRows > 0) {
					var sd = [];
					$.each($(tbl)[0].rows, function (i, r) {
						sd[i] = r;
					});
					sd.sort(function (a, b) {
						if (a.rp > b.rp) { return 1; }
						if (a.rp < b.rp) { return -1; }
						return 0;
					});
					$.each(sd, function (index, row) {
						$("tbody", tbl).append(row);
					});
				}
				o.gbox = gboxSelector;
				var bt = $("<div></div>").append(frmDiv).append("<div class='" + getGuiStyles.call($t, "dialog.footer") + "'><table border='0' class='EditTable' id='" + frmtbId + "_2'><tbody><tr id='Act_Buttons'><td class='navButton navButton-" + p.direction + "' width='" + (o.labelswidth || "auto") + "'>" + (rtlb ? bN + bP : bP + bN) + "</td><td class='EditButton EditButton-" + p.direction + "'>" + bC + "</td></tr></tbody></table></div>");
				jgrid.createModal.call($t, ids, bt, o, p.gView, $(p.gView)[0]);
				if (!o.viewPagerButtons) { $("#pData, #nData", frmtb2).hide(); }
				bt = null;
				$(themodalSelector).keydown(function (e) {
					var $focused, idFocused;
					if ($(frmgr).data("disabled") === true) { return false; }//??
					if (e.which === 13) {
						$focused = $(frmtb2).find(":focus");
						idFocused = $focused.attr("id");
						if ($focused.length > 0 && $.inArray(idFocused, ["pData", "nData", "cData"]) >= 0) {
							$focused.trigger("click");
							return false;
						}
					}

					if (e.which === 27) {
						if (o.closeOnEscape) {
							hideModal();
						}
						return false;
					}
					if (o.navkeys[0] === true) {
						if (e.which === o.navkeys[1]) { //up
							$("#pData", frmtb2).trigger("click");
							return false;
						}
						if (e.which === o.navkeys[2]) { //down
							$("#nData", frmtb2).trigger("click");
							return false;
						}
					}
				});
				addFormIcon($("#cData", frmtb2), o.closeicon, commonIconClass);
				viewFeedback("beforeShowForm", $(frmgr));
				jgrid.viewModal.call($t, themodalSelector, {
					gbox: gboxSelector,
					jqm: o.jqModal,
					overlay: o.overlay,
					toTop: o.toTop,
					modal: o.modal,
					onHide: function (h) {
						h.w.remove();
						if (h.o) { h.o.remove(); }
					}
				});
				$(".fm-button:not(." + disabledClass.split(" ").join(".") + ")", frmtb2).hover(
					function () { $(this).addClass(hoverClasses); },
					function () { $(this).removeClass(hoverClasses); }
				);
				focusaref();
				$("#cData", frmtb2).click(function () {
					hideModal();
					return false;
				});
				$("#nData", frmtb2).click(function () {
					$("#FormError", frmtb).hide();
					var npos = getCurrPos();
					npos[0] = parseInt(npos[0], 10);
					if (npos[0] !== -1 && npos[1][npos[0] + 1]) {
						if (!viewFeedback("onclickPgButtons", "next", $(frmgr), npos[1][npos[0]])) { return false; }
						fillData(npos[1][npos[0] + 1]);
						base.setSelection.call($self, npos[1][npos[0] + 1]);
						viewFeedback("afterclickPgButtons", "next", $(frmgr), npos[1][npos[0] + 1]);
						updateNav(npos[0] + 1, npos);
					}
					focusaref();
					return false;
				});
				$("#pData", frmtb2).click(function () {
					$("#FormError", frmtb).hide();
					var ppos = getCurrPos();
					if (ppos[0] !== -1 && ppos[1][ppos[0] - 1]) {
						if (!viewFeedback("onclickPgButtons", "prev", $(frmgr), ppos[1][ppos[0]])) { return false; }
						fillData(ppos[1][ppos[0] - 1]);
						base.setSelection.call($self, ppos[1][ppos[0] - 1]);
						viewFeedback("afterclickPgButtons", "prev", $(frmgr), ppos[1][ppos[0] - 1]);
						updateNav(ppos[0] - 1, ppos);
					}
					focusaref();
					return false;
				});
				var posInit = getCurrPos();
				updateNav(posInit[0], posInit);
			});
		},
		delGridRow: function (rowids, oMuligrid) {
			return this.each(function () {
				var $t = this, p = $t.p, $self = $($t);
				if (!$t.grid || p == null || !rowids) { return; }
				// make new copy of the options oMuligrid and use it for ONE specific grid.
				// p.formDeleting can contains grid specific options
				// we will don't modify the input options oMuligrid
				var gridId = p.id,
					o = $.extend(true,
						{
							top: 0,
							left: 0,
							width: 240,
							removemodal: true,
							height: "auto",
							dataheight: "auto",
							datawidth: "auto",
							//modal: false,
							//toTop: false,
							//overlay: 30,
							drag: true,
							resize: true,
							url: "",
							mtype: "POST",
							reloadAfterSubmit: true,
							beforeShowForm: null,
							beforeInitData: null,
							afterShowForm: null,
							beforeSubmit: null,
							onclickSubmit: null,
							afterSubmit: null,
							//jqModal : true,
							closeOnEscape: false,
							delData: {},
							onClose: null,
							ajaxDelOptions: {},
							processing: false,
							serializeDelData: null,
							useDataProxy: false
						},
						base.getGridRes.call($self, "del"),
						jgrid.del || {},
						p.formDeleting || {},
						oMuligrid || {});

				var dtblId = "DelTbl_" + gridId, dtbl = "#DelTbl_" + jqID(gridId), postd, idname, opers, oper,
					ids = { themodal: "delmod" + gridId, modalhead: "delhd" + gridId, modalcontent: "delcnt" + gridId, resizeAlso: dtblId },
					themodalSelector = "#" + jqID(ids.themodal), gboxSelector = p.gBox, commonIconClass = o.commonIconClass,
					deleteFeedback = function () {
						var args = $.makeArray(arguments);
						args.unshift("");
						args.unshift("Delete");
						args.unshift(o);
						return jgridFeedback.apply($t, args);
					},
					hoverClasses = getGuiStateStyles.call($t, "hover"),
					activeClass = getGuiStateStyles.call($t, "active"),
					errorClass = getGuiStateStyles.call($t, "error");

				if (!$.isArray(rowids)) { rowids = [String(rowids)]; }
				if ($(themodalSelector)[0] !== undefined) {
					if (!deleteFeedback("beforeInitData", $(dtbl))) { return; }
					$("#DelData>td", dtbl).text(rowids.join()).data("rowids", rowids);
					$("#DelError", dtbl).hide();
					if (o.processing === true) {
						o.processing = false;
						$("#dData", dtbl).removeClass(activeClass);
					}
					deleteFeedback("beforeShowForm", $(dtbl));
					jgrid.viewModal.call($t, themodalSelector, {
						gbox: gboxSelector,
						jqm: o.jqModal,
						jqM: false,
						overlay: o.overlay,
						toTop: o.toTop,
						modal: o.modal
					});
					deleteFeedback("afterShowForm", $(dtbl));
				} else {
					var dh = isNaN(o.dataheight) ? o.dataheight : o.dataheight + "px",
						dw = isNaN(o.datawidth) ? o.datawidth : o.datawidth + "px",
						tbl = "<div class='" + getGuiStyles.call($t, "dialog.body") + "'><div id='" + dtblId + "' class='formdata' style='width:" + dw + ";overflow:auto;position:relative;height:" + dh + ";'>";
					tbl += "<table class='DelTable'><tbody>";
					// error data
					tbl += "<tr id='DelError' style='display:none'><td class='" + errorClass + "'></td></tr>";
					tbl += "<tr id='DelData' style='display:none'><td >" + rowids.join() + "</td></tr>";
					tbl += "<tr><td class='delmsg' style='white-space:pre;'>" + o.msg + "</td></tr>";
					// buttons at footer
					tbl += "</tbody></table></div></div>";
					var bS = builderFmButon.call($t, "dData", o.bSubmit),
						bC = builderFmButon.call($t, "eData", o.bCancel);
					tbl += "<div class='" + getGuiStyles.call($t, "dialog.footer") + "'><table class='EditTable' id='" +
						dtblId + "_2'><tbody><tr><td><hr class='" +
						getGuiStyles.call($t, "dialog.hr") + "' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton EditButton-" +
						p.direction + "'>" + bS + "&#160;" + bC + "</td></tr></tbody></table></div>";
					o.gbox = gboxSelector;
					jgrid.createModal.call($t, ids, tbl, o, p.gView, $(p.gView)[0]);
					$("#DelData>td", dtbl).data("rowids", rowids);

					if (!deleteFeedback("beforeInitData", $(tbl))) { return; }
					$(".fm-button", dtbl + "_2").hover(
						function () { $(this).addClass(hoverClasses); },
						function () { $(this).removeClass(hoverClasses); }
					);
					addFormIcon($("#dData", dtbl + "_2"), o.delicon, commonIconClass);
					addFormIcon($("#eData", dtbl + "_2"), o.cancelicon, commonIconClass);
					$("#dData", dtbl + "_2").click(function () {
						var ret = [true, ""], pk, $delData = $("#DelData>td", dtbl),
							postdata = $delData.text(), //the pair is name=val1,val2,...
							formRowIds = $delData.data("rowids"),
							cs = {};
						if ($.isFunction(o.onclickSubmit)) { cs = o.onclickSubmit.call($t, o, postdata) || {}; }
						if ($.isFunction(o.beforeSubmit)) { ret = o.beforeSubmit.call($t, postdata) || ret; }
						if (ret[0] && !o.processing) {
							o.processing = true;
							opers = p.prmNames;
							postd = $.extend({}, o.delData, cs);
							oper = opers.oper;
							postd[oper] = opers.deloper;
							idname = opers.id;
							postdata = formRowIds.slice();
							if (!postdata.length) { return false; }
							for (pk in postdata) {
								if (postdata.hasOwnProperty(pk)) {
									postdata[pk] = jgrid.stripPref(p.idPrefix, postdata[pk]);
								}
							}
							postd[idname] = postdata.join();
							$(this).addClass(activeClass);
							var url = o.url || p.editurl,
								ajaxOptions = $.extend({
									url: $.isFunction(url) ? url.call($t, postd[idname], postd, o) : url,
									type: o.mtype,
									data: $.isFunction(o.serializeDelData) ? o.serializeDelData.call($t, postd) : postd,
									complete: function (jqXHR, textStatus) {
										var i;
										$("#dData", dtbl + "_2").removeClass(activeClass);
										if ((jqXHR.status >= 300 && jqXHR.status !== 304) || (jqXHR.status === 0 && jqXHR.readyState === 4)) {
											ret[0] = false;
											if ($.isFunction(o.errorTextFormat)) {
												ret[1] = o.errorTextFormat.call($t, jqXHR);
											} else {
												ret[1] = textStatus + " Status: '" + jqXHR.statusText + "'. Error code: " + jqXHR.status;
											}
										} else {
											// data is posted successful
											// execute aftersubmit with the returned data from server
											if ($.isFunction(o.afterSubmit)) {
												ret = o.afterSubmit.call($t, jqXHR, postd) || [true];
											}
										}
										if (ret[0] === false) {
											$("#DelError>td", dtbl).html(ret[1]);
											$("#DelError", dtbl).show();
										} else {
											if (o.reloadAfterSubmit && p.datatype !== "local") {
												$self.trigger("reloadGrid", [$.extend({}, o.reloadGridOptions || {})]);
											} else {
												if (p.treeGrid === true) {
													try { base.delTreeNode.call($self, formRowIds[0]); } catch (ignore) { }
												} else {
													formRowIds = formRowIds.slice(); // make copy for save deleting
													for (i = 0; i < formRowIds.length; i++) {
														base.delRowData.call($self, formRowIds[i]);
													}
												}
											}
											setTimeout(function () {
												deleteFeedback("afterComplete", jqXHR, postdata, $(dtbl));
											}, 50);
										}
										o.processing = false;
										if (ret[0]) {
											jgrid.hideModal(themodalSelector, {
												gb: gboxSelector,
												jqm: o.jqModal,
												onClose: o.onClose,
												removemodal: o.removemodal
											});
										}
									}
								}, jgrid.ajaxOptions, o.ajaxDelOptions);


							if (!ajaxOptions.url && !o.useDataProxy) {
								if ($.isFunction(p.dataProxy)) {
									o.useDataProxy = true;
								} else {
									ret[0] = false;
									ret[1] += " " + jgrid.errors.nourl;
								}
							}
							if (ret[0]) {
								if (o.useDataProxy) {
									var dpret = p.dataProxy.call($t, ajaxOptions, "del_" + gridId);
									if (dpret === undefined) {
										dpret = [true, ""];
									}
									if (dpret[0] === false) {
										ret[0] = false;
										ret[1] = dpret[1] || "Error deleting the selected row!";
									} else {
										jgrid.hideModal(themodalSelector, {
											gb: gboxSelector,
											jqm: o.jqModal,
											onClose: o.onClose,
											removemodal: o.removemodal
										});
									}
								} else {
									if (ajaxOptions.url === "clientArray") {
										postd = ajaxOptions.data;
										ajaxOptions.complete({ status: 200, statusText: "" }, "");
									} else {
										$.ajax(ajaxOptions);
									}
								}
							}
						}

						if (ret[0] === false) {
							$("#DelError>td", dtbl).html(ret[1]);
							$("#DelError", dtbl).show();
						}
						return false;
					});
					$("#eData", dtbl + "_2").click(function () {
						jgrid.hideModal(themodalSelector, {
							gb: gboxSelector,
							jqm: o.jqModal,
							onClose: o.onClose,
							removemodal: o.removemodal
						});
						return false;
					});
					deleteFeedback("beforeShowForm", $(dtbl));
					jgrid.viewModal.call($t, themodalSelector, {
						gbox: gboxSelector,
						jqm: o.jqModal,
						overlay: o.overlay,
						toTop: o.toTop,
						modal: o.modal
					});
					deleteFeedback("afterShowForm", $(dtbl));
				}
				if (o.closeOnEscape === true) {
					setTimeout(function () {
						$(".ui-jqdialog-titlebar-close", "#" + jqID(ids.modalhead))
							.attr("tabindex", "-1")
							.focus();
					}, 0);
				}
			});
		},
		navGrid: function (elem, oMuligrid, pEdit, pAdd, pDel, pSearch, pView) {
			if (typeof elem === "object") {
				// the option pager are skipped
				pView = pSearch;
				pSearch = pDel;
				pDel = pAdd;
				pAdd = pEdit;
				pEdit = oMuligrid;
				oMuligrid = elem;
				elem = undefined;
			}
			pAdd = pAdd || {};
			pEdit = pEdit || {};
			pView = pView || {};
			pDel = pDel || {};
			pSearch = pSearch || {};
			return this.each(function () {
				var $t = this, p = $t.p, $self = $($t);
				if (!$t.grid || p == null || ($t.nav && $(elem).find(".navtable").length > 0)) {
					return; // error or the navigator bar already exists
				}
				// make new copy of the options oMuligrid and use it for ONE specific grid.
				// p.navOptions can contains grid specific options
				// we will don't modify the input options oMuligrid
				var gridId = p.id,
					o = $.extend(
						{
							edit: true,
							add: true,
							del: true,
							search: true,
							refresh: true,
							refreshstate: "firstpage",
							view: false,
							closeOnEscape: true,
							beforeRefresh: null,
							afterRefresh: null,
							cloneToTop: false,
							hideEmptyPagerParts: true,
							//jqModal: true,
							alertwidth: 200,
							alertheight: "auto",
							alerttop: null,
							//alertToTop: false,
							removemodal: true,
							alertleft: null,
							alertzIndex: null,
							iconsOverText: false
						},
						base.getGridRes.call($self, "nav"),
						jgrid.nav || {},
						p.navOptions || {},
						oMuligrid || {}
					);
				// set default position depend of RTL/LTR direction of the grid
				o.position = o.position || (p.direction === "rtl" ? "right" : "left");

				var twd, tdw, gridIdEscaped = p.idSel, gboxSelector = p.gBox, commonIconClass = o.commonIconClass,
					alertIDs = { themodal: "alertmod_" + gridId, modalhead: "alerthd_" + gridId, modalcontent: "alertcnt_" + gridId },
					createModalAlert = function () {
						return function () {
							var documentElement = document.documentElement, w = window, left = 1024, top = 768,
								offsetGbox = $self.closest(".ui-jqgrid").offset();
							if ($("#" + jqID(alertIDs.themodal))[0] === undefined) {
								if (!o.alerttop && !o.alertleft) {
									if (w.innerWidth !== undefined) {
										left = w.innerWidth;
										top = w.innerHeight;
									} else if (documentElement != null && documentElement.clientWidth !== undefined && documentElement.clientWidth !== 0) {
										left = documentElement.clientWidth;
										top = documentElement.clientHeight;
									}
									left = left / 2 - parseInt(o.alertwidth, 10) / 2 - offsetGbox.left;
									top = top / 2 - 25 - offsetGbox.top;
								}
								jgrid.createModal.call($t, alertIDs,
									"<div class='" + getGuiStyles.call($t, "dialog.body") + "'><div>" + o.alerttext + "</div></div>",
									{
										gbox: gboxSelector,
										jqModal: o.jqModal,
										drag: true,
										resize: true,
										caption: o.alertcap,
										top: o.alerttop != null ? o.alerttop : top,
										left: o.alertleft != null ? o.alertleft : left,
										width: o.alertwidth,
										height: o.alertheight,
										closeOnEscape: o.closeOnEscape,
										zIndex: o.alertzIndex,
										removemodal: o.removemodal
									},
									p.gView,
									$(gboxSelector)[0],
									false);
							}
							jgrid.viewModal.call($t, "#" + jqID(alertIDs.themodal), {
								gbox: gboxSelector,
								toTop: o.alertToTop,
								jqm: o.jqModal
							});
							var $close = $("#" + jqID(alertIDs.modalhead)).find(".ui-jqdialog-titlebar-close");
							$close.attr({ tabindex: "0", href: "#", role: "button" });
							setTimeout(function () {
								$close.focus();
							}, 50);
						};
					},
					viewModalAlert = createModalAlert(),
					navtbl,
					clickOnEnter = function (e) {
						var $focused;
						if (e.which === 13) {
							$focused = $(this).find(".ui-pg-button").filter(":focus");
							if ($focused.length > 0) {
								// $focused[0].id == "view_list" or "view_list_top"
								var focusedId = $focused[0].id,
									actionName = focusedId.substr(0,
										$(this).closest(".ui-jqgrid-toppager").length > 0 ?
											focusedId.length - gridId.length - 5 : // "_" + "_top"
											focusedId.length - gridId.length - 1), // view "_"
									gialogId = actionName + "mod" + p.id, // "viewmodlist"
									visibleDailogIds = $(".ui-jqdialog").filter(":visible").map(function () { return this.id; });

								if ($.inArray(gialogId, visibleDailogIds) < 0) {
									// simulate click only if the dialog is not already opened
									$focused.trigger("click");
									return false;
								}
							}
						}
					},
					hoverClasses = getGuiStateStyles.call($t, "hover"),
					disabledClass = getGuiStateStyles.call($t, "disabled"),
					navButtonClass = getGuiStyles.call($t, "navButton", "ui-pg-button");
				if (!$t.grid) {
					return; // error
				}
				// set modalAlert which can be used inside of
				$t.modalAlert = viewModalAlert;
				if (elem === undefined) {
					if (p.pager) {
						elem = p.pager;
						if (p.toppager) {
							o.cloneToTop = true; // add buttons to both pagers
						}
					} else if (p.toppager) {
						elem = p.toppager;
					}
				}

				var clone = 1, i, tbd, pgid, elemids, iPart, pagerTable, $pagerPart, pagerParts = ["left", "center", "right"],
					navButtonDisabledClass = getGuiStyles.call($t, "navButton", "ui-pg-button" + " " + getGuiStateStyles.call($t, "disabled")),
					sep = "<div class='" + navButtonDisabledClass + "'><span class='ui-separator'></span></div>",
					onHoverIn = function () {
						if (!hasOneFromClasses(this, disabledClass)) {
							$(this).addClass(hoverClasses);
						}
					},
					onHoverOut = function () {
						$(this).removeClass(hoverClasses);
					},
					onAdd = function () {
						if (!hasOneFromClasses(this, disabledClass)) {
							if ($.isFunction(o.addfunc)) {
								o.addfunc.call($t);
							} else {
								base.editGridRow.call($self, "new", pAdd);
							}
						}
						return false;
					},
					editOrViewOfSelectedRow = function (func, methodName, param) {
						if (!hasOneFromClasses(this, disabledClass)) {
							var sr = p.selrow;
							if (sr) {
								if ($.isFunction(func)) {
									func.call($t, sr);
								} else {
									base[methodName].call($self, sr, param);
								}
							} else {
								viewModalAlert();
							}
						}
						return false;
					},
					onEdit = function () {
						return editOrViewOfSelectedRow.call(this, o.editfunc, "editGridRow", pEdit);
					},
					onView = function () {
						return editOrViewOfSelectedRow.call(this, o.viewfunc, "viewGridRow", pView);
					},
					onDel = function () {
						var dr;
						if (!hasOneFromClasses(this, disabledClass)) {
							if (p.multiselect) {
								dr = p.selarrrow;
								if (dr.length === 0) { dr = null; }
							} else {
								dr = p.selrow;
							}
							if (dr) {
								if ($.isFunction(o.delfunc)) {
									o.delfunc.call($t, dr);
								} else {
									base.delGridRow.call($self, dr, pDel);
								}
							} else {
								viewModalAlert();
							}
						}
						return false;
					},
					onSearch = function () {
						if (!hasOneFromClasses(this, disabledClass)) {
							if ($.isFunction(o.searchfunc)) {
								o.searchfunc.call($t, pSearch);
							} else {
								base.searchGrid.call($self, pSearch);
							}
						}
						return false;
					},
					onRefresh = function () {
						if (!hasOneFromClasses(this, disabledClass)) {
							if ($.isFunction(o.beforeRefresh)) { o.beforeRefresh.call($t); }
							p.search = false;
							p.resetsearch = true;
							try {
								if (o.refreshstate !== "currentfilter") {
									p.postData.filters = "";
									try {
										$("#fbox_" + gridIdEscaped).jqFilter("resetFilter");
									} catch (ignore) { }
									if ($.isFunction($t.clearToolbar)) { $t.clearToolbar(false); }
								}
							} catch (ignore) { }
							switch (o.refreshstate) {
								case "firstpage":
									$self.trigger("reloadGrid", [$.extend({}, o.reloadGridOptions || {}, { page: 1 })]);
									break;
								case "current":
								case "currentfilter":
									$self.trigger("reloadGrid", [$.extend({}, o.reloadGridOptions || {}, { current: true })]);
									break;
							}
							if ($.isFunction(o.afterRefresh)) { o.afterRefresh.call($t); }
						}
						return false;
					},
					stdButtonActivation = function (name, id, onClick) {
						var $button = $("<div class='" + navButtonClass + "' tabindex='0' role='button'></div>"),
							iconClass = o[name + "icon"],
							iconText = $.trim(o[name + "text"]);
						$button.append("<div class='ui-pg-div'><span class='" +
							(o.iconsOverText ?
									mergeCssClasses("ui-pg-button-icon-over-text", commonIconClass, iconClass) :
									mergeCssClasses(commonIconClass, iconClass)) +
							"'></span>" +
							(iconText ? "<span class='ui-pg-button-text" + (o.iconsOverText ? " ui-pg-button-icon-over-text" : "") + "'>" + iconText + "</span>" : "") +
							"</div>");
						$(navtbl).append($button);
						$button.attr({ "title": o[name + "title"] || "", id: id || name + "_" + elemids })
							.click(onClick)
							.hover(onHoverIn, onHoverOut);
						return $button;
					};

				if (o.cloneToTop && p.toppager) { clone = 2; }
				for (i = 0; i < clone; i++) {
					// we can set aria-activedescendant="idOfFirstButton" later
					navtbl = $("<div" + " class='ui-pg-table navtable' role='toolbar' style='float:" +
						(p.direction === "rtl" ? "right" : "left") +
						";table-layout:auto;'></div>");
					if (i === 0) {
						pgid = elem;
						elemids = gridId;
						if (pgid === p.toppager) {
							elemids += "_top";
							clone = 1;
						}
					} else {
						pgid = p.toppager;
						elemids = gridId + "_top";
					}
					if (o.add) {
						stdButtonActivation("add", pAdd.id, onAdd);
					}
					if (o.edit) {
						stdButtonActivation("edit", pEdit.id, onEdit);
					}
					if (o.view) {
						stdButtonActivation("view", pView.id, onView);
					}
					if (o.del) {
						stdButtonActivation("del", pDel.id, onDel);
					}
					if (o.add || o.edit || o.del || o.view) { $(navtbl).append(sep); }
					if (o.search) {
						tbd = stdButtonActivation("search", pSearch.id, onSearch);
						if (pSearch.showOnLoad && pSearch.showOnLoad === true) {
							$(tbd, navtbl).click();
						}
					}
					if (o.refresh) {
						stdButtonActivation("refresh", "", onRefresh);
					}
					// TODO use setWidthOfPagerTdWithPager or remove at all and use div structure with wrapping
					tdw = $(".ui-jqgrid>.ui-jqgrid-view").css("font-size") || "11px";
					$("body").append("<div id='testpg2' class='" + getGuiStyles.call($t, "gBox", "ui-jqgrid") + "' style='font-size:" + tdw + ";visibility:hidden;' ></div>");
					twd = $(navtbl).clone().appendTo("#testpg2").width();
					$("#testpg2").remove();
					$(pgid + "_" + o.position, pgid).append(navtbl);
					if (o.hideEmptyPagerParts) {
						for (iPart = 0; iPart < pagerParts.length; iPart++) {
							if (pagerParts[iPart] !== o.position) {
								$pagerPart = $(pgid + "_" + pagerParts[iPart], pgid);
								if ($pagerPart.length === 0 || $pagerPart[0].childNodes.length === 0) {
									$pagerPart.hide();
								} else if ($pagerPart[0].childNodes.length === 1) {
									pagerTable = $pagerPart[0].firstChild;
									if ($(pagerTable).is("table.ui-pg-table") && (pagerTable.rows === 0 || pagerTable.rows[0].cells.length === 0)) {
										$pagerPart.hide();
									}
								}
							}
						}
					}
					if (p._nvtd) {
						if (twd > p._nvtd[0]) {
							$(pgid + "_" + o.position, pgid).width(twd);
							p._nvtd[0] = twd;
						}
						p._nvtd[1] = twd;
					}
					$t.nav = true;
					navtbl.bind("keydown.jqGrid", clickOnEnter);
				}
				$self.triggerHandler("jqGridResetFrozenHeights");
			});
		},
		navButtonAdd: function (elem, oMuligrid) {
			if (typeof elem === "object") {
				oMuligrid = elem;
				elem = undefined;
			}
			return this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid) { return; }
				var o = $.extend(
						{
							caption: "newButton",
							title: "",
							onClickButton: null,
							position: "last",
							cursor: "pointer",
							iconsOverText: false
						},
						base.getGridRes.call($($t), "nav"),
						jgrid.nav || {},
						p.navOptions || {},
						oMuligrid || {}
					),
					hoverClasses = getGuiStateStyles.call($t, "hover"),
					disabledClass = getGuiStateStyles.call($t, "disabled"),
					navButtonClass = getGuiStyles.call($t, "navButton", "ui-pg-button");
				if (elem === undefined) {
					if (p.pager) {
						base.navButtonAdd.call($($t), p.pager, o);
						if (p.toppager) {
							elem = p.toppager;
						} else {
							return;
						}
					} else if (p.toppager) {
						elem = p.toppager;
					}
				}
				if (typeof elem === "string" && elem.indexOf("#") !== 0) { elem = "#" + jqID(elem); }
				var findnav = $(".navtable", elem), commonIconClass = o.commonIconClass;
				if (findnav.length > 0) {
					if (o.id && findnav.find("#" + jqID(o.id)).length > 0) { return; }
					var tbd = $("<div tabindex='0' role='button'></div>");
					if (o.buttonicon.toString().toUpperCase() === "NONE") {
						$(tbd).addClass(navButtonClass).append("<div class='ui-pg-div'>" +
							(o.caption ? "<span class='ui-pg-button-text" + (o.iconsOverText ? " ui-pg-button-icon-over-text" : "") + "'>" + o.caption + "</span>" : "") +
							"</div>");
					} else {
						$(tbd).addClass(navButtonClass).append("<div class='ui-pg-div'>" +
							"<span class='" +
							(o.iconsOverText ?
									mergeCssClasses("ui-pg-button-icon-over-text", commonIconClass, o.buttonicon) :
									mergeCssClasses(commonIconClass, o.buttonicon)) +
							"'></span>" +
							(o.caption ? "<span class='ui-pg-button-text" + (o.iconsOverText ? " ui-pg-button-icon-over-text" : "") + "'>" + o.caption + "</span>" : "") +
							"</div>");
					}
					if (o.id) { $(tbd).attr("id", o.id); }
					if (o.position === "first" && findnav.children("div.ui-pg-button").length > 0) {
						findnav.children("div.ui-pg-button").first().before(tbd);
					} else {
						findnav.append(tbd);
					}
					$(tbd, findnav)
						.attr("title", o.title || "")
						.click(function (e) {
							if (!hasOneFromClasses(this, disabledClass)) {
								if ($.isFunction(o.onClickButton)) { o.onClickButton.call($t, o, e); }
							}
							return false;
						})
						.hover(
							function () {
								if (!hasOneFromClasses(this, disabledClass)) {
									$(this).addClass(hoverClasses);
								}
							},
							function () { $(this).removeClass(hoverClasses); }
						);
					$($t).triggerHandler("jqGridResetFrozenHeights");
				}
			});
		},
		navSeparatorAdd: function (elem, o) {
			o = $.extend({
				sepclass: "ui-separator",
				sepcontent: "",
				position: "last"
			}, o || {});
			return this.each(function () {
				if (!this.grid) { return; }
				var $t = this, p = $t.p,
					navButtonClass = getGuiStyles.call($t, "navButton", "ui-pg-button" + " " + getGuiStateStyles.call($t, "disabled"));

				if (elem === undefined) {
					if (p.pager) {
						base.navSeparatorAdd.call($($t), p.pager, o);
						if (p.toppager) {
							elem = p.toppager;
						} else {
							return;
						}
					} else if (p.toppager) {
						elem = p.toppager;
					}
				}
				if (typeof elem === "string" && elem.indexOf("#") !== 0) { elem = "#" + jqID(elem); }
				var $nav = $(".navtable", elem);
				if ($nav.length > 0) {
					var sep = "<div class='" + navButtonClass + "'><span class='" + o.sepclass + "'></span>" + o.sepcontent + "</div>";
					if (o.position === "first") {
						if ($nav.children("div.ui-pg-button").length === 0) {
							$nav.append(sep);
						} else {
							$nav.children("div.ui-pg-button").first().before(sep);
						}
					} else {
						$nav.append(sep);
					}
				}
			});
		},
		GridToForm: function (rowid, formid) {
			return this.each(function () {
				var $t = this, i, $field, iField, $fieldi;
				if (!$t.grid) { return; }
				var rowdata = base.getRowData.call($($t), rowid);
				if (rowdata) {
					for (i in rowdata) {
						if (rowdata.hasOwnProperty(i)) {
							$field = $("[name=" + jqID(i) + "]", formid);
							if ($field.is("input:radio") || $field.is("input:checkbox")) {
								for (iField = 0; iField < $field.length; iField++) {
									$fieldi = $($field[iField]);
									$fieldi.prop("checked", $fieldi.val() === String(rowdata[i]));
								}
							} else {
								// this is very slow on big table and form.
								$field.val(isEmptyString(rowdata[i]) ? "" : rowdata[i]);
							}
						}
					}
				}
			});
		},
		FormToGrid: function (rowid, formid, mode, position) {
			return this.each(function () {
				var $t = this;
				if (!$t.grid) { return; }
				if (!mode) { mode = "set"; }
				if (!position) { position = "first"; }
				var fields = $(formid).serializeArray();
				var griddata = {};
				$.each(fields, function (i, field) {
					griddata[field.name] = field.value;
				});
				if (mode === "add") {
					base.addRowData.call($($t), rowid, griddata, position);
				} else if (mode === "set") {
					base.setRowData.call($($t), rowid, griddata);
				}
			});
		}
	});
	// end module grid.formedit

	// begin module grid.grouping
	jgrid.extend({
		groupingSetup: function () {
			return this.each(function () {
				var $t = this, i, j, cml, p = $t.p, colModel = p.colModel, grp = p.groupingView, cm, summary,
					emptyFormatter = function () {
						return "";
					};
				if (grp !== null && ((typeof grp === "object") || $.isFunction(grp))) {
					if (!grp.groupField.length) {
						p.grouping = false;
					} else {
						if (grp.visibiltyOnNextGrouping === undefined) {
							grp.visibiltyOnNextGrouping = [];
						}

						grp.lastvalues = [];
						if (!grp._locgr) {
							grp.groups = [];
						}
						grp.counters = [];
						for (i = 0; i < grp.groupField.length; i++) {
							if (!grp.groupOrder[i]) {
								grp.groupOrder[i] = "asc";
							}
							if (!grp.groupText[i]) {
								grp.groupText[i] = "{0}";
							}
							if (typeof grp.groupColumnShow[i] !== "boolean") {
								grp.groupColumnShow[i] = true;
							}
							if (typeof grp.groupSummary[i] !== "boolean") {
								grp.groupSummary[i] = false;
							}
							if (!grp.groupSummaryPos[i]) {
								grp.groupSummaryPos[i] = "footer";
							}
							// TODO: allow groupField be from additionalProperties
							// and not only from colModel
							cm = colModel[p.iColByName[grp.groupField[i]]];
							if (grp.groupColumnShow[i] === true) {
								grp.visibiltyOnNextGrouping[i] = true;
								if (cm != null && cm.hidden === true) {
									base.showCol.call($($t), grp.groupField[i]);
								}
							} else {
								grp.visibiltyOnNextGrouping[i] = $("#" + jgrid.jqID(p.id + "_" + grp.groupField[i])).is(":visible");
								if (cm != null && cm.hidden !== true) {
									base.hideCol.call($($t), grp.groupField[i]);
								}
							}
						}
						grp.summary = [];
						if (grp.hideFirstGroupCol) {
							grp.formatDisplayField[0] = function (v) {
								return v;
							};
						}
						for (j = 0, cml = colModel.length; j < cml; j++) {
							cm = colModel[j];
							if (grp.hideFirstGroupCol) {
								if (!cm.hidden && grp.groupField[0] === cm.name) {
									cm.formatter = emptyFormatter;
								}
							}
							if (cm.summaryType) {
								summary = {
									nm: cm.name,
									st: cm.summaryType,
									v: "",
									sr: cm.summaryRound,
									srt: cm.summaryRoundType || "round"
								};
								if (cm.summaryDivider) {
									summary.sd = cm.summaryDivider;
									summary.vd = "";
								}
								grp.summary.push(summary);
							}
						}
					}
				} else {
					p.grouping = false;
				}
			});
		},
		groupingPrepare: function (record, irow) {
			this.each(function () {
				var $t = this, grp = $t.p.groupingView, groups = grp.groups, counters = grp.counters,
					lastvalues = grp.lastvalues, isInTheSameGroup = grp.isInTheSameGroup, groupLength = grp.groupField.length,
					i, newGroup, counter, fieldName, v, displayName, displayValue, changed = false,
					groupingCalculationsHandler = base.groupingCalculations.handler,
					buildSummary = function () {
						var iSummary, summary, st;
						for (iSummary = 0; iSummary < counter.summary.length; iSummary++) {
							summary = counter.summary[iSummary];
							st = $.isArray(summary.st) ? summary.st[newGroup.idx] : summary.st;
							if ($.isFunction(st)) {
								summary.v = st.call($t, summary.v, summary.nm, record, newGroup);
							} else {
								summary.v = groupingCalculationsHandler.call($($t), st, summary.v, summary.nm, summary.sr, summary.srt, record);
								if (st.toLowerCase() === "avg" && summary.sd) {
									summary.vd = groupingCalculationsHandler.call($($t), st, summary.vd, summary.sd, summary.sr, summary.srt, record);
								}
							}
						}
						return counter.summary;
					};

				for (i = 0; i < groupLength; i++) {
					fieldName = grp.groupField[i];
					displayName = grp.displayField[i];
					v = record[fieldName];
					displayValue = displayName == null ? null : record[displayName];

					if (displayValue == null) {
						displayValue = v;
					}
					if (v !== undefined) {
						newGroup = { idx: i, dataIndex: fieldName, value: v, displayValue: displayValue, startRow: irow, cnt: 1, summary: [] };
						if (irow === 0) {
							// First record always starts a new group
							groups.push(newGroup);
							lastvalues[i] = v;
							counter = {
								cnt: 1,
								pos: groups.length - 1,
								summary: $.extend(true, [], grp.summary)
							};
							counters[i] = counter;
							groups[counter.pos].summary = buildSummary();
						} else {
							counter = {
								cnt: 1,
								pos: groups.length,
								summary: $.extend(true, [], grp.summary)
							};
							if (typeof v !== "object" && ($.isArray(isInTheSameGroup) && $.isFunction(isInTheSameGroup[i]) ? !isInTheSameGroup[i].call($t, lastvalues[i], v, i, grp) : lastvalues[i] !== v)) {
								// This record is not in same group as previous one
								groups.push(newGroup);
								lastvalues[i] = v;
								changed = true;
								counters[i] = counter;
								groups[counter.pos].summary = buildSummary();
							} else {
								if (changed) {
									// This group has changed because an earlier group changed.
									groups.push(newGroup);
									lastvalues[i] = v;
									counters[i] = counter;
									groups[counter.pos].summary = buildSummary();
								} else {
									counter = counters[i];
									counter.cnt += 1;
									groups[counter.pos].cnt = counter.cnt;
									groups[counter.pos].summary = buildSummary();
								}
							}
						}
					}
				}
				//gdata.push( rData );
			});
			return this;
		},
		groupingToggle: function (hid, clickedElem) {
			this.each(function () {
				var $t = this, p = $t.p, grp = p.groupingView,
					minusClasses = grp.minusicon, plusClasses = grp.plusicon,
					$tr = clickedElem ?
							$(clickedElem).closest("tr.jqgroup") :
							$("#" + jgrid.jqID(hid)),
					getGroupHeaderIcon = function ($trElem) {
						return $trElem.find(">td>span." + "tree-wrap");
					},
					itemGroupingLevel, iRowStart, showDataRowsOnExpending = true,
					$groupIcon, collapsed = false, rowsToHideOrShow = [],
					addToHideOrShow = function ($elem) {
						var i, l = $elem.length;
						for (i = 0; i < l; i++) {
							rowsToHideOrShow.push($elem[i]);
						}
					},
					num = parseInt($tr.data("jqgrouplevel"), 10);

				if (p.frozenColumns && $tr.length > 0) {
					// always get row from non-frozen column
					iRowStart = $tr[0].rowIndex;
					$tr = $($t.rows[iRowStart]);
					$tr = $tr.add($t.grid.fbRows[iRowStart]);
				}
				$groupIcon = getGroupHeaderIcon($tr);

				if (jgrid.hasAllClasses($groupIcon, minusClasses)) {
					$groupIcon.removeClass(minusClasses).addClass(plusClasses);
					collapsed = true;
				} else {
					$groupIcon.removeClass(plusClasses).addClass(minusClasses);
				}
				for ($tr = $tr.next(); $tr.length; $tr = $tr.next()) {
					if ($tr.hasClass("jqfoot")) {
						itemGroupingLevel = parseInt($tr.data("jqfootlevel"), 10);
						if (collapsed) {
							// hide all till the summary row of the same level.
							// don't hide the summary row if grp.showSummaryOnHide === true
							itemGroupingLevel = parseInt($tr.data("jqfootlevel"), 10);
							if ((!grp.showSummaryOnHide && itemGroupingLevel === num) || itemGroupingLevel > num) {
								addToHideOrShow($tr);
							}
							// stop hiding of rows if the footer of parent group are found
							if (itemGroupingLevel < num) { break; }
						} else {
							if (itemGroupingLevel === num || (grp.showSummaryOnHide && itemGroupingLevel === num + 1)) {
								addToHideOrShow($tr);
							}
							if (itemGroupingLevel <= num) { break; }
						}
					} else if ($tr.hasClass("jqgroup")) {
						itemGroupingLevel = parseInt($tr.data("jqgrouplevel"), 10);
						if (collapsed) {
							// stop hiding of rows if the grouping header of the next group
							// of the same (or higher) level are found
							if (itemGroupingLevel <= num) { break; }

							addToHideOrShow($tr);
						} else {
							// stop next grouping header of the same lever are found
							if (itemGroupingLevel <= num) { break; }
							if (itemGroupingLevel === num + 1) {
								// one should display subgroupes in collaped form
								getGroupHeaderIcon($tr).removeClass(minusClasses).addClass(plusClasses);
								addToHideOrShow($tr);
							}
							// one need hide all data if subgroup is found
							showDataRowsOnExpending = false;
						}
					} else { // data
						// we set currently no information about the level of data
						// se we use showDataRowsOnExpending variable which will be
						// used during expanding of data
						if (collapsed || showDataRowsOnExpending) {
							// grouping data need be displayed only
							// if the last level group with data (no subgroups)
							// is expanded
							addToHideOrShow($tr);
						}
					}
				}
				//$(rowsToHideOrShow)[collapsed ? "hide" : "show"]();
				$(rowsToHideOrShow).css("display", collapsed ? "none" : "");
				// fix position of elements of frozen divs
				if (p.frozenColumns) {
					$($t).triggerHandler("jqGridResetFrozenHeights", [{
						header: {
							resizeDiv: false,
							resizedRows: {
								iRowStart: -1, // -1 means don't recalculate heights or rows
								iRowEnd: -1
							}
						},
						resizeFooter: false,
						body: {
							resizeDiv: true,
							resizedRows: {
								iRowStart: iRowStart,
								iRowEnd: ($tr.length ? $tr[0].rowIndex - 1 : -1)
							}
						}
					}]);
				}

				// recalculate the width because vertical scrollbar can
				// appears/disappears after expanding/collapsing
				$t.fixScrollOffsetAndhBoxPadding();
				$($t).triggerHandler("jqGridGroupingClickGroup", [hid, collapsed]);
				if ($.isFunction(p.onClickGroup)) {
					p.onClickGroup.call($t, hid, collapsed);
				}
			});
			return false;
		},
		groupingRender: function (grdata, rn) {
			// input parameter grdata is array of strings, which are either opening <tr> element
			// or full HTML fragment (outer HTML) of <td> element, inclusive the closing tag </td>
			// or it contains the closing </tr> tag. The array grdata contains HTML fragments
			// of all rows from the current group.
			// The exact contain of the grdata is the following:
			//    "<tr ...>" - the opening tag of the first row of the group
			//        "<td>...</td>" - the irst cell of the first row
			//        "<td>...</td>" - the second cell of the first row
			//            ...
			//        "<td>...</td>" - the last cell of the first row
			//    "</tr>" - closing tag of the first row of the group
			//    "<tr ...>" - the opening tag of the second row of the group
			//        ... - all <td> elements of the second row
			//    "</tr>" - closing tag of the second row of the group
			//    ...
			//    "<tr ...>" - the opening tag of the last row of the group
			//        ... - all <td> elements of the last row
			//    "</tr>" - closing tag of the last row of the group
			// The input parameter rn corresponds to p.rowNum in the most cases.
			var str = "", $t = this[0], p = $t.p, toEnd = 0, gv, cp = [], icon = "", hid, clid,
				grp = p.groupingView, sumreverse = $.makeArray(grp.groupSummary),
				pmrtl = (grp.groupCollapse ? grp.plusicon : grp.minusicon) + " tree-wrap",
				groupLength = grp.groupField.length, groups = grp.groups, colModel = p.colModel,
				cmLength = colModel.length, page = p.page,
				eventNames = "jqGridShowHideCol.groupingRender",
				getGridRowStyles = function (classes) {
					return base.getGuiStyles.call($t, "gridRow", classes);
				},
				jqgroupClass = getGridRowStyles("jqgroup ui-row-" + p.direction),
				jqfootClass = getGridRowStyles("jqfoot ui-row-" + p.direction);

			function buildSummaryTd(iEndGroup, offset, g, foffset, iconHtml) {
				var fdata = groups[iEndGroup], i, groupCount, strTd = "", tmpdata, colSpan, align, vv,
					madeHidden, nMakeHidden = 0, iSummary, summary, cm, iCol, summaryType, summaryTpl,
					isColumnForIconNotFound = true;

				if (offset !== 0 && groups[iEndGroup].idx !== 0) {
					for (i = iEndGroup; i >= 0; i--) {
						if (groups[i].idx === groups[iEndGroup].idx - offset) {
							fdata = groups[i];
							break;
						}
					}
				}
				groupCount = fdata.cnt;

				for (iCol = (iconHtml === undefined ? foffset : 0); iCol < cmLength; iCol++) {
					tmpdata = "&#160;";
					cm = colModel[iCol];
					for (iSummary = 0; iSummary < fdata.summary.length; iSummary++) {
						summary = fdata.summary[iSummary];
						summaryType = $.isArray(summary.st) ? summary.st[g.idx] : summary.st;
						summaryTpl = $.isArray(cm.summaryTpl) ? cm.summaryTpl[g.idx] : (cm.summaryTpl || "{0}");
						if (summary.nm === cm.name) {
							if (typeof summaryType === "string" && summaryType.toLowerCase() === "avg") {
								if (summary.sd && summary.vd) {
									summary.v = (summary.v / summary.vd);
								} else if (summary.v && groupCount > 0) {
									summary.v = (summary.v / groupCount);
								}
							}
							try {
								summary.groupCount = fdata.cnt;
								summary.groupIndex = fdata.dataIndex;
								summary.groupValue = fdata.value;
								vv = $t.formatter("", summary.v, iCol, summary);
							} catch (ef) {
								vv = summary.v;
							}
							tmpdata = jgrid.format(summaryTpl, vv);
							break;
						}
					}
					colSpan = false;
					align = false;
					if (iconHtml !== undefined && isColumnForIconNotFound) {
						if (!cm.hidden) {
							// the icon need be placed in the first non-hidden column
							tmpdata = iconHtml;
							isColumnForIconNotFound = false;
							if (foffset > 1) {
								colSpan = true;
								// if foffset > 1 then the next foffset-1 non-hidden columns
								// must be displayed hidden.
								nMakeHidden = foffset - 1;
							}
							// the icon in the column header must be left aligned
							align = cm.align; // save the original align value
							cm.align = p.direction === "rtl" ? "right" : "left";
							grp.iconColumnName = cm.name;
						}
					}
					madeHidden = false;
					if (nMakeHidden > 0 && !cm.hidden && tmpdata === "&#160;") {
						madeHidden = true;
						if (align) {
							cm.align = align; // restore the original align value
						}
						nMakeHidden--;
						continue;
					}
					strTd += "<td role='gridcell' " + $t.formatCol(iCol, 1, "") +
							(colSpan ? "colspan='" + foffset + "'" : "") + ">" + tmpdata + "</td>";
					colSpan = false;
					if (align) {
						cm.align = align; // restore the original align value
					}
					if (madeHidden) {
						cm.hidden = false;
						nMakeHidden--;
					}
				}
				return strTd;
			}

			// TODO: allow groupField be from additionalProperties
			// and not only from colModel
			$.each(colModel, function (i, n) {
				var iGroup;
				for (iGroup = 0; iGroup < groupLength; iGroup++) {
					if (grp.groupField[iGroup] === n.name) {
						cp[iGroup] = i;
						break;
					}
				}
			});

			sumreverse.reverse();
			$.each(groups, function (i, n) {
				if (grp._locgr) {
					if (!(n.startRow + n.cnt > (page - 1) * rn && n.startRow < page * rn)) {
						return true;
					}
				}
				toEnd++;
				clid = p.id + "ghead_" + n.idx;
				hid = clid + "_" + i;
				icon = "<span style='cursor:pointer;margin-" +
						(p.direction === "rtl" ? "right:" : "left:") + (n.idx * 12) +
						"px;' class='" + grp.commonIconClass + " " + pmrtl +
						"' onclick=\"jQuery('#" + jgrid.jqID(p.id).replace("\\", "\\\\") +
						"').jqGrid('groupingToggle','" + hid + "', this);return false;\"></span>";
				try {
					if ($.isArray(grp.formatDisplayField) && $.isFunction(grp.formatDisplayField[n.idx])) {
						n.displayValue = grp.formatDisplayField[n.idx].call($t, n.displayValue, n.value, colModel[cp[n.idx]], n.idx, grp);
						gv = n.displayValue;
					} else {
						gv = $t.formatter(hid, n.displayValue, cp[n.idx], n.value);
					}
				} catch (egv) {
					gv = n.displayValue;
				}
				str += "<tr id='" + hid + "' data-jqgrouplevel='" + n.idx + "' " +
						(grp.groupCollapse && n.idx > 0 ? "style='display:none;' " : "") +
						"role='row' class='" + jqgroupClass + " " + clid + "'>";
				var grpTextStr = $.isFunction(grp.groupText[n.idx]) ?
						grp.groupText[n.idx].call($t, gv, n.cnt, n.summary) :
						jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary),
					colspan = 1, jj, kk, ik, offset = 0, sgr, gg, end,
					leaf = groupLength - 1 === n.idx;
				if (typeof grpTextStr !== "string" && typeof grpTextStr !== "number") {
					grpTextStr = gv;
				}
				if (grp.groupSummaryPos[n.idx] === "header") {
					colspan = 1;
					if (colModel[0].name === "cb" || colModel[1].name === "cb") {
						colspan++;
					}
					if (colModel[0].name === "subgrid" || colModel[1].name === "subgrid") {
						colspan++;
					}
					str += buildSummaryTd(i, 0, n, colspan, icon + "<span class='cell-wrapper'>" + grpTextStr + "</span>");
				} else {
					str += "<td role='gridcell' style='padding-left:" + (n.idx * 12) + "px;'" +
							" colspan='" + cmLength + "'>" + icon + grpTextStr + "</td>";
				}
				str += "</tr>";
				if (leaf) {
					gg = groups[i + 1];
					sgr = n.startRow;
					end = gg !== undefined ? gg.startRow : groups[i].startRow + groups[i].cnt;
					if (grp._locgr) {
						offset = (page - 1) * rn;
						if (offset > n.startRow) {
							sgr = offset;
						}
					}
					for (kk = sgr; kk < end; kk++) {
						if (!grdata[kk - offset]) {
							break;
						}
						str += grdata[kk - offset].join("");
					}
					if (grp.groupSummaryPos[n.idx] !== "header") {
						if (gg !== undefined) {
							for (jj = 0; jj < grp.groupField.length; jj++) {
								if (gg.dataIndex === grp.groupField[jj]) {
									break;
								}
							}
							toEnd = grp.groupField.length - jj;
						}
						for (ik = 0; ik < toEnd; ik++) {
							if (!sumreverse[ik]) {
								continue;
							}
							str += "<tr data-jqfootlevel='" + (n.idx - ik) +
									(grp.groupCollapse && ((n.idx - ik) > 0 || !grp.showSummaryOnHide) ? "' style='display:none;'" : "'") +
									" role='row' class='" + jqfootClass + "'>";
							str += buildSummaryTd(i, ik, groups[n.idx - ik], 0);
							str += "</tr>";
						}
						toEnd = jj;
					}
				}
			});
			this.unbind(eventNames)
				.bind(eventNames, function () { //e, show, cmName, iColShow) {
					// TODO fix the code after resorting columns
					var iCol = p.iColByName[grp.iconColumnName], iRow, row, iColNew, i; //$cellData;
					if ($.inArray("header", grp.groupSummaryPos) >= 0) {
						for (i = 0; i < colModel.length; i++) {
							if (!colModel[i].hidden) {
								iColNew = i;
								break;
							}
						}
						if (iColNew === undefined || iCol === iColNew) { return; }

						for (iRow = 0; iRow < $t.rows.length; iRow++) {
							row = $t.rows[iRow];
							if ($(row).hasClass("jqgroup")) {
								/*$cellData = $(row.cells[iCol]).children(".cell-wrapper").detach();
								$.wrapInner(row.cells[iColNew], function () {//"<span class='cell-wrapper'></span>");
									return "<span class='cell-wrapper'>" + this.nodeValue + "</span>";
								});
								row.cells[iColNew]
								$cellData = $(row.cells[iCol]).children(".cell-wrapper").detach();
								$(row.cells[iCol]).html($(row.cells[iCol]).children("").html());*/
								$(row.cells[iColNew]).html(row.cells[iCol].innerHTML);
								$(row.cells[iCol]).html("&nbsp;");
							}
						}
						grp.iconColumnName = colModel[iColNew].name;
					}
				});
			return str;
		},
		groupingGroupBy: function (name, options) {
			return this.each(function () {
				var $t = this, p = $t.p, grp = p.groupingView, i, cm;
				if (typeof name === "string") {
					name = [name];
				}
				p.grouping = true;
				grp._locgr = false;
				//Set default, in case visibilityOnNextGrouping is undefined
				if (grp.visibiltyOnNextGrouping === undefined) {
					grp.visibiltyOnNextGrouping = [];
				}
				// show previous hidden groups if they are hidden and weren't removed yet
				for (i = 0; i < grp.groupField.length; i++) {
					cm = p.colModel[p.iColByName[grp.groupField[i]]];
					if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i] && cm != null && cm.hidden === true) {
						base.showCol.call($($t), grp.groupField[i]);
					}
				}
				// set visibility status of current group columns on next grouping
				for (i = 0; i < name.length; i++) {
					grp.visibiltyOnNextGrouping[i] = $(p.idSel + "_" + jgrid.jqID(name[i])).is(":visible");
				}
				p.groupingView = $.extend(p.groupingView, options || {});
				grp.groupField = name;
				$($t).trigger("reloadGrid");
			});
		},
		groupingRemove: function (current) {
			return this.each(function () {
				var $t = this, p = $t.p, tbody = $t.tBodies[0], grp = p.groupingView, i;
				if (current === undefined) {
					current = true;
				}
				p.grouping = false;
				if (current === true) {
					// show previous hidden groups if they are hidden and weren't removed yet
					for (i = 0; i < grp.groupField.length; i++) {
						if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
							base.showCol.call($($t), grp.groupField);
						}
					}
					$("tr.jqgroup, tr.jqfoot", tbody).remove();
					$("tr.jqgrow", tbody).filter(":hidden").show();
				} else {
					$($t).trigger("reloadGrid");
				}
			});
		},
		groupingCalculations: {
			handler: function (fn, v, field, round, roundType, rc) {
				var funcs = {
						sum: function () {
							return parseFloat(v || 0) + parseFloat((rc[field] || 0));
						},

						min: function () {
							if (v === "") {
								return parseFloat(rc[field] || 0);
							}
							return Math.min(parseFloat(v), parseFloat(rc[field] || 0));
						},

						max: function () {
							if (v === "") {
								return parseFloat(rc[field] || 0);
							}
							return Math.max(parseFloat(v), parseFloat(rc[field] || 0));
						},

						count: function () {
							if (v === "") {
								v = 0;
							}
							if (rc.hasOwnProperty(field)) {
								return v + 1;
							}
							return 0;
						},

						avg: function () {
							// the same as sum, but at end we divide it
							// so use sum instead of duplicating the code (?)
							return funcs.sum();
						}
					},
					res,
					mul;

				if (!funcs[fn]) {
					throw ("jqGrid Grouping No such method: " + fn);
				}
				res = funcs[fn]();

				if (round != null) {
					if (roundType === "fixed") {
						res = res.toFixed(round);
					} else {
						mul = Math.pow(10, round);
						res = Math.round(res * mul) / mul;
					}
				}

				return res;
			}
		}
	});
	// end module grid.grouping

	/**
	 * jqGrid extension for constructing Grid Data from external file
	 * Tony Tomov tony@trirand.com, http://trirand.com/blog/
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	**/
	// begin module grid.import
	$.jgrid.extend({
		jqGridImport: function (o) {
			o = $.extend({
				imptype: "xml", // xml, json, xmlstring, jsonstring
				impstring: "",
				impurl: "",
				mtype: "GET",
				impData: {},
				xmlGrid: {
					config: "roots>grid",
					data: "roots>rows"
				},
				jsonGrid: {
					config: "grid",
					data: "data"
				},
				ajaxOptions: {}
			}, o || {});
			return this.each(function () {
				var $t = this,
					xmlConvert = function (xml, options) {
						var cnfg = $(options.xmlGrid.config, xml)[0], xmldata = $(options.xmlGrid.data, xml)[0], jstr, jstr1, key, svdatatype;
						if (xmlJsonClass.xml2json) {
							jstr = xmlJsonClass.xml2json(cnfg, " ");
							jstr = $.parseJSON(jstr);
							for (key in jstr) {
								if (jstr.hasOwnProperty(key)) {
									jstr1 = jstr[key];
								}
							}
							if (jstr1 !== undefined) {
								if (xmldata) {
									// save the datatype
									svdatatype = jstr.grid.datatype;
									jstr.grid.datatype = "xmlstring";
									jstr.grid.datastr = xml;
									$($t).jqGrid(jstr1).jqGrid("setGridParam", { datatype: svdatatype });
								} else {
									$($t).jqGrid(jstr1);
								}
							}
						} else {
							alert("xml2json or parse are not present");
						}
					},
					jsonConvert = function (jsonstr, options) {
						if (jsonstr && typeof jsonstr === "string") {
							var json = $.parseJSON(jsonstr),
								gprm = json[options.jsonGrid.config],
								jdata = json[options.jsonGrid.data], svdatatype;

							if (jdata) {
								svdatatype = gprm.datatype;
								gprm.datatype = "jsonstring";
								gprm.datastr = jdata;
								$($t).jqGrid(gprm).jqGrid("setGridParam", { datatype: svdatatype });
							} else {
								$($t).jqGrid(gprm);
							}
						}
					},
					xmld;
				switch (o.imptype) {
					case "xml":
						$.ajax($.extend({
							url: o.impurl,
							type: o.mtype,
							data: o.impData,
							dataType: "xml",
							context: o,
							complete: function (jqXHR) {
								if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
									xmlConvert(jqXHR.responseXML, this);
									$($t).triggerHandler("jqGridImportComplete", [jqXHR, this]);
									if ($.isFunction(this.importComplete)) {
										this.importComplete(jqXHR);
									}
								}
							}
						}, o.ajaxOptions));
						break;
					case "xmlstring":
						// we need to make just the conversion and use the same code as xml
						if (o.impstring && typeof o.impstring === "string") {
							xmld = $.parseXML(o.impstring);
							if (xmld) {
								xmlConvert(xmld, o);
								$($t).triggerHandler("jqGridImportComplete", [xmld, o]);
								if ($.isFunction(o.importComplete)) {
									o.importComplete(xmld);
								}
								o.impstring = null;
							}
						}
						break;
					case "json":
						$.ajax($.extend({
							url: o.impurl,
							type: o.mtype,
							data: o.impData,
							dataType: "json",
							context: o,
							complete: function (jqXHR) {
								try {
									if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
										jsonConvert(jqXHR.responseText, this);
										$($t).triggerHandler("jqGridImportComplete", [jqXHR, this]);
										if ($.isFunction(this.importComplete)) {
											this.importComplete(jqXHR);
										}
									}
								} catch (ignore) { }
							}
						}, o.ajaxOptions));
						break;
					case "jsonstring":
						if (o.impstring && typeof o.impstring === "string") {
							jsonConvert(o.impstring, o);
							$($t).triggerHandler("jqGridImportComplete", [o.impstring, o]);
							if ($.isFunction(o.importComplete)) {
								o.importComplete(o.impstring);
							}
							o.impstring = null;
						}
						break;
				}
			});
		},
		jqGridExport: function (o) {
			o = $.extend({
				exptype: "xmlstring",
				root: "grid",
				ident: "\t"
			}, o || {});
			var ret = null;
			this.each(function () {
				if (!this.grid) {
					return;
				}
				var key, gprm = $.extend(true, {}, $(this).jqGrid("getGridParam"));
				// we need to check for:
				// 1.multiselect, 2.subgrid  3. treegrid and remove the unneded columns from colNames
				if (gprm.rownumbers) {
					gprm.colNames.splice(0, 1);
					gprm.colModel.splice(0, 1);
				}
				if (gprm.multiselect) {
					gprm.colNames.splice(0, 1);
					gprm.colModel.splice(0, 1);
				}
				if (gprm.subGrid) {
					gprm.colNames.splice(0, 1);
					gprm.colModel.splice(0, 1);
				}
				gprm.knv = null;
				if (gprm.treeGrid) {
					for (key in gprm.treeReader) {
						if (gprm.treeReader.hasOwnProperty(key)) {
							gprm.colNames.splice(gprm.colNames.length - 1);
							gprm.colModel.splice(gprm.colModel.length - 1);
						}
					}
				}
				switch (o.exptype) {
					case "xmlstring":
						ret = "<" + o.root + ">" + xmlJsonClass.json2xml(gprm, o.ident) + "</" + o.root + ">";
						break;
					case "jsonstring":
						ret = "{" + xmlJsonClass.toJson(gprm, o.root, o.ident, false) + "}";
						if (gprm.postData.filters !== undefined) {
							ret = ret.replace(/filters":"/, "filters\":");
							ret = ret.replace(/\}\]\}"/, "}]}");
						}
						break;
				}
			});
			return ret;
		},
		excelExport: function (o) {
			o = $.extend({
				exptype: "remote",
				url: null,
				oper: "oper",
				tag: "excel",
				exportOptions: {}
			}, o || {});
			return this.each(function () {
				var url, pdata, params;
				if (!this.grid) {
					return;
				}
				if (o.exptype === "remote") {
					pdata = $.extend({}, this.p.postData, o.exportOptions);
					pdata[o.oper] = o.tag;
					params = jQuery.param(pdata);
					if (o.url.indexOf("?") !== -1) {
						url = o.url + "&" + params;
					} else {
						url = o.url + "?" + params;
					}
					window.location = url;
				}
			});
		}
	});
	// end module grid.import

	/**
	 * jqGrid extension for manipulating Grid Data
	 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com,  http://trirand.com/blog/
	 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	**/
	// begin module grid.inlinedit
	var editFeedback = function (o) {
			var args = $.makeArray(arguments).slice(1);
			args.unshift("");
			args.unshift("Inline");
			args.unshift(o);
			return jgrid.feedback.apply(this, args);
		};
	jgrid.inlineEdit = jgrid.inlineEdit || {};
	jgrid.extend({
		//Editing
		editRow: function (rowid, keys, oneditfunc, successfunc, url, extraparam, aftersavefunc, errorfunc, afterrestorefunc, beforeEditRow) {
			// Compatible mode old versions
			var oMuligrid = {}, args = $.makeArray(arguments).slice(1);

			if ($.type(args[0]) === "object") {
				oMuligrid = args[0];
			} else {
				if (keys !== undefined) { oMuligrid.keys = keys; }
				if ($.isFunction(oneditfunc)) { oMuligrid.oneditfunc = oneditfunc; }
				if ($.isFunction(successfunc)) { oMuligrid.successfunc = successfunc; }
				if (url !== undefined) { oMuligrid.url = url; }
				if (extraparam != null) { oMuligrid.extraparam = extraparam; }
				if ($.isFunction(aftersavefunc)) { oMuligrid.aftersavefunc = aftersavefunc; }
				if ($.isFunction(errorfunc)) { oMuligrid.errorfunc = errorfunc; }
				if ($.isFunction(afterrestorefunc)) { oMuligrid.afterrestorefunc = afterrestorefunc; }
				if ($.isFunction(beforeEditRow)) { oMuligrid.beforeEditRow = beforeEditRow; }
				// last two not as param, but as object (sorry)
				//if (restoreAfterError !== undefined) { oMuligrid.restoreAfterError = restoreAfterError; }
				//if (mtype !== undefined) { oMuligrid.mtype = mtype || "POST"; }
			}

			// End compatible
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, cnt = 0, focus = null, svr = {}, colModel = p.colModel, opers = p.prmNames;
				if (!$t.grid) { return; }
				var o = $.extend(true, {
						keys: false,
						oneditfunc: null,
						successfunc: null,
						url: null,
						extraparam: {},
						aftersavefunc: null,
						errorfunc: null,
						afterrestorefunc: null,
						restoreAfterError: true,
						beforeEditRow: null,
						mtype: "POST",
						focusField: true
					}, jgrid.inlineEdit, p.inlineEditing || {}, oMuligrid),
					ind = $self.jqGrid("getInd", rowid, true),
					focusField = o.focusField,
					td = typeof focusField === "object" && focusField != null ?
						$(focusField.target || focusField).closest("tr.jqgrow>td")[0] : null;

				if (ind === false) { return; }

				if (o.extraparam[opers.oper] !== opers.addoper) {
					if (!editFeedback.call($t, o, "beforeEditRow", o, rowid)) { return; }
				}

				if (($(ind).attr("editable") || "0") === "0" && !$(ind).hasClass("not-editable-row")) {
					var editingInfo = jgrid.detectRowEditing.call($t, rowid);
					if (editingInfo != null && editingInfo.mode === "cellEditing") {
						var savedRowInfo = editingInfo.savedRow, tr = $t.rows[savedRowInfo.id],
							highlightClass = getGuiStateStyles.call($t, "select");
						$self.jqGrid("restoreCell", savedRowInfo.id, savedRowInfo.ic);
						// remove highlighting of the cell
						$(tr.cells[savedRowInfo.ic]).removeClass("edit-cell " + highlightClass);
						$(tr).addClass(highlightClass).attr({ "aria-selected": "true", "tabindex": "0" });
					}
					jgrid.enumEditableCells.call($t, ind, $(ind).hasClass("jqgrid-new-row") ? "add" : "edit", function (options) {
						var cm = options.cm, $dataFiled = $(options.dataElement), dataWidth = options.dataWidth, tmp, opt, elc,
							nm = cm.name, edittype = cm.edittype, iCol = options.iCol, editoptions = cm.editoptions || {};
						if (options.editable === "hidden") { return; }
						try {
							tmp = $.unformat.call(this, options.td, { rowId: rowid, colModel: cm }, iCol);
						} catch (_) {
							tmp = edittype === "textarea" ? $dataFiled.text() : $dataFiled.html();
						}
						svr[nm] = tmp; // include only editable fields in svr object
						$dataFiled.html("");
						opt = $.extend({}, editoptions,
							{ id: rowid + "_" + nm, name: nm, rowId: rowid, mode: options.mode, cm: cm, iCol: iCol });
						if (tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length === 1 && tmp.charCodeAt(0) === 160)) { tmp = ""; }
						elc = jgrid.createEl.call($t, edittype, opt, tmp, true, $.extend({}, jgrid.ajaxOptions, p.ajaxSelectOptions || {}));
						$(elc).addClass("editable");
						$dataFiled.append(elc);
						if (dataWidth) {
							// change the width from auto or the value from editoptions
							// in case of editing ExpandColumn of TreeGrid
							$(elc).width(options.dataWidth);
						}
						jgrid.bindEv.call($t, elc, opt);
						//Again IE
						if (edittype === "select" && editoptions.multiple === true && editoptions.dataUrl === undefined && jgrid.msie) {
							$(elc).width($(elc).width());
						}
						if (focus === null) { focus = iCol; }
						cnt++;
					});
					if (cnt > 0) {
						svr.id = rowid;
						p.savedRow.push(svr);
						$(ind).attr("editable", "1");
						if (focusField) {
							if (typeof focusField === "number" && parseInt(focusField, 10) <= colModel.length) {
								focus = focusField;
							} else if (typeof focusField === "string") {
								focus = p.iColByName[focusField];
							} else if (td != null) {
								focus = td.cellIndex;
							}
							setTimeout(function () {
								// we want to use ":focusable"
								var nFrozenColumns = $self.jqGrid("getNumberOfFrozenColumns"),
									getTdByColIndex = function (iCol) {
										return p.frozenColumns && nFrozenColumns > 0 && focus < nFrozenColumns ?
											$t.grid.fbRows[ind.rowIndex].cells[iCol] :
											ind.cells[iCol];
									},
									getFocusable = function (elem) {
										return $(elem).find("input,textarea,select,button,object,*[tabindex]")
												.filter(":input:visible:not(:disabled)");
									},
									getFirstFocusable = function () {
										return getFocusable(p.frozenColumns && nFrozenColumns > 0 ? $t.grid.fbRows[ind.rowIndex] : ind)
												.first();
									},
									$fe = getFocusable(getTdByColIndex(focus));

								if ($fe.length > 0) {
									$fe.first().focus();
								} else if (typeof o.defaultFocusField === "number" || typeof o.defaultFocusField === "string") {
									$fe = getFocusable(getTdByColIndex(typeof o.defaultFocusField === "number" ? o.defaultFocusField : p.iColByName[o.defaultFocusField]));
									if ($fe.length === 0) {
										$fe = getFirstFocusable();
									}
									$fe.first().focus();
								} else {
									getFirstFocusable().focus();
								}
							}, 0);
						}
						if (o.keys === true) {
							var $ind = $(ind);
							if (p.frozenColumns) {
								$ind = $ind.add($t.grid.fbRows[ind.rowIndex]);
							}
							$ind.bind("keydown", function (e) {
								if (e.keyCode === 27) {
									$self.jqGrid("restoreRow", rowid, o.afterrestorefunc);
									return false;
								}
								if (e.keyCode === 13) {
									var ta = e.target;
									if (ta.tagName === "TEXTAREA") { return true; }
									$self.jqGrid("saveRow", rowid, o);
									return false;
								}
							});
						}
						fullBoolFeedback.call($t, o.oneditfunc, "jqGridInlineEditRow", rowid, o);
					}
				}
			});
		},
		saveRow: function (rowid, successfunc, url, extraparam, aftersavefunc, errorfunc, afterrestorefunc, beforeSaveRow) {
			// Compatible mode old versions
			var args = $.makeArray(arguments).slice(1), o = {}, $t = this[0], $self = $($t), p = $t != null ? $t.p : null, editOrAdd, infoDialog = jgrid.info_dialog;
			if (!$t.grid || p == null) { return; }

			if ($.type(args[0]) === "object") {
				o = args[0];
			} else {
				if ($.isFunction(successfunc)) { o.successfunc = successfunc; }
				if (url !== undefined) { o.url = url; }
				if (extraparam !== undefined) { o.extraparam = extraparam; }
				if ($.isFunction(aftersavefunc)) { o.aftersavefunc = aftersavefunc; }
				if ($.isFunction(errorfunc)) { o.errorfunc = errorfunc; }
				if ($.isFunction(afterrestorefunc)) { o.afterrestorefunc = afterrestorefunc; }
				if ($.isFunction(beforeSaveRow)) { o.beforeSaveRow = beforeSaveRow; }
			}
			var getRes = function (path) { return $self.jqGrid("getGridRes", path); };
			o = $.extend(true, {
				successfunc: null,
				url: null,
				extraparam: {},
				aftersavefunc: null,
				errorfunc: null,
				afterrestorefunc: null,
				restoreAfterError: true,
				beforeSaveRow: null,
				ajaxSaveOptions: {},
				serializeSaveData: null,
				mtype: "POST",
				saveui: "enable",
				savetext: getRes("defaults.savetext") || "Saving..."
			}, jgrid.inlineEdit, p.inlineEditing || {}, o);
			// End compatible
			// TODO: add return this.each(function(){....}
			var tmp = {}, tmp2 = {}, postData = {}, editable, k, fr, resp, cv, ind = $self.jqGrid("getInd", rowid, true), $tr = $(ind),
				opers = p.prmNames, errcap = getRes("errors.errcap"), bClose = getRes("edit.bClose"), isRemoteSave;

			if (ind === false) { return; }

			editOrAdd = o.extraparam[opers.oper] === opers.addoper ? "add" : "edit";

			if (!editFeedback.call($t, o, "beforeSaveRow", o, rowid, editOrAdd)) { return; }

			editable = $tr.attr("editable");
			o.url = o.url || p.editurl;
			isRemoteSave = o.url !== "clientArray";
			if (editable === "1") {
				jgrid.enumEditableCells.call($t, ind, $tr.hasClass("jqgrid-new-row") ? "add" : "edit", function (options) {
					var cm = options.cm, formatter = cm.formatter, editoptions = cm.editoptions || {},
						formatoptions = cm.formatoptions || {}, valueText = {},
						savedRow = ($.jgrid.detectRowEditing.call($t, rowid) || {}).savedRow,
						v = jgrid.getEditedValue.call($t, $(options.dataElement), cm, valueText, options.editable);

					if (cm.edittype === "select" && cm.formatter !== "select") {
						tmp2[cm.name] = valueText.text;
					}
					cv = jgrid.checkValues.call($t, v, options.iCol, undefined, undefined,
							$.extend(options, {
								oldValue: savedRow != null ? savedRow[cm.name] : null,
								newValue: v,
								oldRowData: savedRow }));
					if (cv != null && cv[0] === false) {
						return false;
					}
					if (formatter === "date" && formatoptions.sendFormatted !== true) {
						// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
						// Floating point separator for example
						v = $.unformat.date.call($t, v, cm);
					}
					if (isRemoteSave && editoptions.NullIfEmpty === true) {
						if (v === "") {
							v = "null";
						}
					}
					tmp[cm.name] = v;
				});

				if (cv != null && cv[0] === false) {
					try {
						var tr = $self.jqGrid("getGridRowById", rowid), positions = jgrid.findPos(tr);
						infoDialog.call($t, errcap, cv[1], bClose, { left: positions[0], top: positions[1] + $(tr).outerHeight() });
					} catch (e) {
						alert(cv[1]);
					}
					return;
				}
				var idname, oldRowId = rowid;
				opers = p.prmNames;
				if (p.keyName === false) {
					idname = opers.id;
				} else {
					idname = p.keyName;
				}
				if (tmp) {
					tmp[opers.oper] = opers.editoper;
					if (tmp[idname] === undefined || tmp[idname] === "") {
						tmp[idname] = rowid;
					} else if (ind.id !== p.idPrefix + tmp[idname]) {
						// rename rowid
						var oldid = jgrid.stripPref(p.idPrefix, rowid);
						if (p._index[oldid] !== undefined) {
							p._index[tmp[idname]] = p._index[oldid];
							delete p._index[oldid];
						}
						rowid = p.idPrefix + tmp[idname];
						// TODO: to test the case of frozen columns
						$tr.attr("id", rowid);
						if (p.selrow === oldRowId) {
							p.selrow = rowid;
						}
						if ($.isArray(p.selarrrow)) {
							var i = $.inArray(oldRowId, p.selarrrow);
							if (i >= 0) {
								p.selarrrow[i] = rowid;
							}
						}
						if (p.multiselect) {
							var newCboxId = "jqg_" + p.id + "_" + rowid;
							$tr.find("input.cbox")
								.attr("id", newCboxId)
								.attr("name", newCboxId);
						}
					}
					tmp = $.extend({}, tmp, p.inlineData || {}, o.extraparam);
				}
				if (!isRemoteSave) {
					tmp = $.extend({}, tmp, tmp2);
					resp = $self.jqGrid("setRowData", rowid, tmp);
					$tr.attr("editable", "0");
					for (k = 0; k < p.savedRow.length; k++) {
						if (String(p.savedRow[k].id) === String(oldRowId)) { fr = k; break; }
					}
					if (fr >= 0) { p.savedRow.splice(fr, 1); }
					fullBoolFeedback.call($t, o.aftersavefunc, "jqGridInlineAfterSaveRow", rowid, resp, tmp, o);
					$tr.removeClass("jqgrid-new-row").unbind("keydown");
				} else {
					$self.jqGrid("progressBar", { method: "show", loadtype: o.saveui, htmlcontent: o.savetext });
					postData = $.extend({}, tmp, postData);
					postData[idname] = jgrid.stripPref(p.idPrefix, postData[idname]);
					if (p.autoEncodeOnEdit) {
						$.each(postData, function (n, v) {
							if (!$.isFunction(v)) {
								postData[n] = jgrid.oldEncodePostedData(v);
							}
						});
					}

					$.ajax($.extend({
						url: $.isFunction(o.url) ? o.url.call($t, postData[idname], editOrAdd, postData, o) : o.url,
						data: jgrid.serializeFeedback.call($t,
								$.isFunction(o.serializeSaveData) ? o.serializeSaveData : p.serializeRowData,
								"jqGridInlineSerializeSaveData",
								postData),
						type: $.isFunction(o.mtype) ? o.mtype.call($t, editOrAdd, o, postData[idname], postData) : o.mtype,
						complete: function (jqXHR, textStatus) {
							$self.jqGrid("progressBar", { method: "hide", loadtype: o.saveui, htmlcontent: o.savetext });
							// textStatus can be "abort", "timeout", "error", "parsererror" or some text from text part of HTTP error occurs
							// see the answer http://stackoverflow.com/a/3617710/315935 about xhr.readyState === 4 && xhr.status === 0
							if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
								var ret, sucret, j;
								sucret = $self.triggerHandler("jqGridInlineSuccessSaveRow", [jqXHR, rowid, o]);
								if (sucret == null || sucret === true) { sucret = [true, tmp]; }
								if (sucret[0] && $.isFunction(o.successfunc)) { sucret = o.successfunc.call($t, jqXHR); }
								if ($.isArray(sucret)) {
									// expect array - status, data, rowid
									ret = sucret[0];
									tmp = sucret[1] || tmp;
								} else {
									ret = sucret;
								}
								if (ret === true) {
									if (p.autoEncodeOnEdit) {
										$.each(tmp, function (n, v) {
											tmp[n] = jgrid.oldDecodePostedData(v);
										});
									}
									tmp = $.extend({}, tmp, tmp2);
									$self.jqGrid("setRowData", rowid, tmp);
									$tr.attr("editable", "0");
									for (j = 0; j < p.savedRow.length; j++) {
										if (String(p.savedRow[j].id) === String(rowid)) { fr = j; break; }
									}
									if (fr >= 0) { p.savedRow.splice(fr, 1); }
									fullBoolFeedback.call($t, o.aftersavefunc, "jqGridInlineAfterSaveRow", rowid, jqXHR, tmp, o);
									$tr.removeClass("jqgrid-new-row").unbind("keydown");
								} else {
									fullBoolFeedback.call($t, o.errorfunc, "jqGridInlineErrorSaveRow", rowid, jqXHR, textStatus, null, o);
									if (o.restoreAfterError === true) {
										$self.jqGrid("restoreRow", rowid, o.afterrestorefunc);
									}
								}
							}
						},
						error: function (res, stat, err) {
							$("#lui_" + jgrid.jqID(p.id)).hide();
							$self.triggerHandler("jqGridInlineErrorSaveRow", [rowid, res, stat, err, o]);
							if ($.isFunction(o.errorfunc)) {
								o.errorfunc.call($t, rowid, res, stat, err);
							} else {
								var rT = res.responseText || res.statusText;
								try {
									infoDialog.call($t, errcap, '<div class="' + getGuiStateStyles.call($t, "error") + '">' + rT + "</div>", bClose, { buttonalign: "right" });
								} catch (e1) {
									alert(rT);
								}
							}
							if (o.restoreAfterError === true) {
								$self.jqGrid("restoreRow", rowid, o.afterrestorefunc);
							}
						}
					}, jgrid.ajaxOptions, p.ajaxRowOptions, o.ajaxSaveOptions || {}));
				}
			}
			return;
		},
		restoreRow: function (rowid, afterrestorefunc) {
			// Compatible mode old versions
			var args = $.makeArray(arguments).slice(1), oMuligrid = {};

			if ($.type(args[0]) === "object") {
				oMuligrid = args[0];
			} else {
				if ($.isFunction(afterrestorefunc)) { oMuligrid.afterrestorefunc = afterrestorefunc; }
			}

			// End compatible

			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p, fr = -1, ares = {}, k;
				if (!$t.grid) { return; }

				var o = $.extend(true, {}, jgrid.inlineEdit, p.inlineEditing || {}, oMuligrid);
				var ind = $self.jqGrid("getInd", rowid, true);
				if (ind === false) { return; }

				if (!editFeedback.call($t, o, "beforeCancelRow", o, rowid)) { return; }

				for (k = 0; k < p.savedRow.length; k++) {
					if (String(p.savedRow[k].id) === String(rowid)) {
						fr = k;
						break;
					}
				}
				if (fr >= 0) {
					if ($.isFunction($.fn.datepicker)) {
						try {
							$("input.hasDatepicker", "#" + jgrid.jqID(ind.id)).datepicker("hide");
						} catch (ignore) { }
					}

					$.each(p.colModel, function () {
						var nm = this.name;
						if (p.savedRow[fr].hasOwnProperty(nm)) {
							ares[nm] = p.savedRow[fr][nm];
							if (this.formatter && this.formatter === "date" && (this.formatoptions == null || this.formatoptions.sendFormatted !== true)) {
								// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
								// Floating point separator for example
								ares[nm] = $.unformat.date.call($t, ares[nm], this);
							}
						}
					});
					$self.jqGrid("setRowData", rowid, ares);
					$(ind).attr("editable", "0").unbind("keydown");
					p.savedRow.splice(fr, 1);
					if ($("#" + jgrid.jqID(rowid), $t).hasClass("jqgrid-new-row")) {
						setTimeout(function () {
							$self.jqGrid("delRowData", rowid);
							$self.jqGrid("showAddEditButtons", false);
						}, 0);
					}
				}
				fullBoolFeedback.call($t, o.afterrestorefunc, "jqGridInlineAfterRestoreRow", rowid);
			});
		},
		addRow: function (oMuligrid) {
			return this.each(function () {
				if (!this.grid) { return; }

				var $t = this, $self = $($t), p = $t.p,
					o = $.extend(true, {
						rowID: null,
						initdata: {},
						position: "first",
						useDefValues: true,
						useFormatter: false,
						beforeAddRow: null,
						addRowParams: { extraparam: {} }
					}, jgrid.inlineEdit, p.inlineEditing || {}, oMuligrid || {});
				if (!editFeedback.call($t, o, "beforeAddRow", o.addRowParams)) { return; }

				o.rowID = $.isFunction(o.rowID) ? o.rowID.call($t, o) : ((o.rowID != null) ? o.rowID : jgrid.randId());
				if (o.useDefValues === true) {
					$(p.colModel).each(function () {
						if (this.editoptions && this.editoptions.defaultValue) {
							var opt = this.editoptions.defaultValue;
							o.initdata[this.name] = $.isFunction(opt) ? opt.call($t) : opt;
						}
					});
				}
				o.rowID = p.idPrefix + o.rowID;
				$self.jqGrid("addRowData", o.rowID, o.initdata, o.position);
				$("#" + jgrid.jqID(o.rowID), $t).addClass("jqgrid-new-row");
				if (o.useFormatter) {
					$("#" + jgrid.jqID(o.rowID) + " .ui-inline-edit", $t).click();
				} else {
					var opers = p.prmNames, oper = opers.oper;
					o.addRowParams.extraparam[oper] = opers.addoper;
					$self.jqGrid("editRow", o.rowID, o.addRowParams);
					$self.jqGrid("setSelection", o.rowID);
				}
			});
		},
		inlineNav: function (elem, oMuligrid) {
			if (typeof elem === "object") {
				// the option pager are skipped
				oMuligrid = elem;
				elem = undefined;
			}
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!this.grid || p == null) { return; }
				var $elem, gID = elem === p.toppager ? p.idSel + "_top" : p.idSel,
					gid = elem === p.toppager ? p.id + "_top" : p.id, disabledClass = getGuiStateStyles.call($t, "disabled"),
					o = $.extend(true,
						{
							edit: true,
							editicon: "ui-icon-pencil",
							add: true,
							addicon: "ui-icon-plus",
							save: true,
							saveicon: "ui-icon-disk",
							cancel: true,
							cancelicon: "ui-icon-cancel",
							commonIconClass: "ui-icon",
							iconsOverText: false,
							//alertToTop: false, use undefined to be able to use defaults from $.jgrid.jqModal or later from p.jqModal
							addParams: { addRowParams: { extraparam: {} } },
							editParams: {},
							restoreAfterSelect: true
						},
						//TODO make getRes(locales[p.locale], "nav"), jgrid.nav || {}, p.navOptions || {}
						// as the result of working getRes("nav")
						//getRes(locales[p.locale], "nav"),
						$self.jqGrid("getGridRes", "nav"),
						jgrid.nav || {},
						p.navOptions || {},
						jgrid.inlineNav || {},
						p.inlineNavOptions || {},
						oMuligrid || {}
					),
					viewModalAlert = function () {
						$t.modalAlert();
					};

				if (elem === undefined) {
					if (p.pager) {
						$self.jqGrid("inlineNav", p.pager, o);
						if (p.toppager) {
							elem = p.toppager;
							gID = p.idSel + "_top";
							gid = p.id + "_top";
						} else {
							return;
						}
					} else if (p.toppager) {
						elem = p.toppager;
						gID = p.idSel + "_top";
						gid = p.id + "_top";
					}
				}
				if (elem === undefined) {
					return; // error
				}
				$elem = $(elem);
				if ($elem.length <= 0) {
					return; // error
				}
				if ($elem.find(".navtable").length <= 0) {
					// create navigator bar if it is not yet exist
					$self.jqGrid("navGrid", elem, { add: false, edit: false, del: false, search: false, refresh: false, view: false });
				}

				p._inlinenav = true;
				// detect the formatactions column
				if (o.addParams.useFormatter === true) {
					var cm = p.colModel, i, defaults, ap;
					for (i = 0; i < cm.length; i++) {
						if (cm[i].formatter && cm[i].formatter === "actions") {
							if (cm[i].formatoptions) {
								defaults = {
									keys: false,
									onEdit: null,
									onSuccess: null,
									afterSave: null,
									onError: null,
									afterRestore: null,
									extraparam: {},
									url: null
								};
								ap = $.extend(defaults, cm[i].formatoptions);
								o.addParams.addRowParams = {
									"keys": ap.keys,
									"oneditfunc": ap.onEdit,
									"successfunc": ap.onSuccess,
									"url": ap.url,
									"extraparam": ap.extraparam,
									"aftersavefunc": ap.afterSave,
									"errorfunc": ap.onError,
									"afterrestorefunc": ap.afterRestore
								};
							}
							break;
						}
					}
				}
				if (o.add) {
					$self.jqGrid("navButtonAdd", elem, {
						caption: o.addtext,
						title: o.addtitle,
						commonIconClass: o.commonIconClass,
						buttonicon: o.addicon,
						iconsOverText: o.iconsOverText,
						id: gid + "_iladd",
						onClickButton: function () {
							if (!hasOneFromClasses(this, disabledClass)) {
								$self.jqGrid("addRow", o.addParams);
							}
						}
					});
				}
				if (o.edit) {
					$self.jqGrid("navButtonAdd", elem, {
						caption: o.edittext,
						title: o.edittitle,
						commonIconClass: o.commonIconClass,
						buttonicon: o.editicon,
						iconsOverText: o.iconsOverText,
						id: gid + "_iledit",
						onClickButton: function () {
							if (!hasOneFromClasses(this, disabledClass)) {
								var sr = p.selrow;
								if (sr) {
									$self.jqGrid("editRow", sr, o.editParams);
								} else {
									viewModalAlert();
								}
							}
						}
					});
				}
				if (o.save) {
					$self.jqGrid("navButtonAdd", elem, {
						caption: o.savetext,
						title: o.savetitle,
						commonIconClass: o.commonIconClass,
						buttonicon: o.saveicon,
						iconsOverText: o.iconsOverText,
						id: gid + "_ilsave",
						onClickButton: function () {
							if (!hasOneFromClasses(this, disabledClass)) {
								var sr = p.savedRow[0].id;
								if (sr) {
									var opers = p.prmNames, oper = opers.oper, tmpParams = o.editParams;
									if ($("#" + jgrid.jqID(sr), $t).hasClass("jqgrid-new-row")) {
										o.addParams.addRowParams.extraparam[oper] = opers.addoper;
										tmpParams = o.addParams.addRowParams;
									} else {
										if (!o.editParams.extraparam) {
											o.editParams.extraparam = {};
										}
										o.editParams.extraparam[oper] = opers.editoper;
									}
									$self.jqGrid("saveRow", sr, tmpParams);
								} else {
									viewModalAlert();
								}
							}
						}
					});
					$(gID + "_ilsave").addClass(disabledClass);
				}
				if (o.cancel) {
					$self.jqGrid("navButtonAdd", elem, {
						caption: o.canceltext,
						title: o.canceltitle,
						commonIconClass: o.commonIconClass,
						buttonicon: o.cancelicon,
						iconsOverText: o.iconsOverText,
						id: gid + "_ilcancel",
						onClickButton: function () {
							if (!hasOneFromClasses(this, disabledClass)) {
								var sr = p.savedRow[0].id, cancelPrm = o.editParams;
								if (sr) {
									if ($("#" + jgrid.jqID(sr), $t).hasClass("jqgrid-new-row")) {
										cancelPrm = o.addParams.addRowParams;
									}
									$self.jqGrid("restoreRow", sr, cancelPrm);
								} else {
									viewModalAlert();
								}
							}
						}
					});
					$(gID + "_ilcancel").addClass(disabledClass);
				}
				if (o.restoreAfterSelect === true) {
					$self.bind("jqGridSelectRow", function (e, rowid) {
						if (p.savedRow.length > 0 && p._inlinenav === true) {
							var editingRowId = p.savedRow[0].id;
							if (rowid !== editingRowId && typeof editingRowId !== "number") {
								$self.jqGrid("restoreRow", editingRowId, o.editParams);
							}
						}
					});
				}
				$self.bind("jqGridInlineAfterRestoreRow jqGridInlineAfterSaveRow", function () {
					$self.jqGrid("showAddEditButtons", false);
				});
				$self.bind("jqGridInlineEditRow", function (e, rowid) {
					$self.jqGrid("showAddEditButtons", true, rowid);
				});
			});
		},
		showAddEditButtons: function (isEditing) {
			return this.each(function () {
				var $t = this;
				if (!$t.grid) { return; }
				var p = $t.p, idSel = p.idSel, disabledClass = getGuiStateStyles.call($t, "disabled"),
					saveCancel = idSel + "_ilsave," + idSel + "_ilcancel" + (p.toppager ? "," + idSel + "_top_ilsave," + idSel + "_top_ilcancel" : ""),
					addEdit = idSel + "_iladd," + idSel + "_iledit" + (p.toppager ? "," + idSel + "_top_iladd," + idSel + "_top_iledit" : "");
				$(isEditing ? addEdit : saveCancel).addClass(disabledClass);
				$(isEditing ? saveCancel : addEdit).removeClass(disabledClass);
			});
		}
	});
	// end module grid.inlinedit

	/**
	 * jqGrid addons using jQuery UI
	 * Author: Mark Williams
	 * Changed by Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	 * depends on jQuery UI
	**/
	// begin module grid.jqueryui
	var $UiMultiselect = $.ui != null ? $.ui.multiselect : null;
	if (jgrid.msie && jgrid.msiever() === 8) {
		$.expr[":"].hidden = function (elem) {
			return elem.offsetWidth === 0 || elem.offsetHeight === 0 ||
				elem.style.display === "none";
		};
	}
	// requiere load multiselect before grid
	jgrid._multiselect = false;
	if ($UiMultiselect) {
		if ($UiMultiselect.prototype._setSelected) {
			var setSelected = $UiMultiselect.prototype._setSelected;
			$UiMultiselect.prototype._setSelected = function (item, selected) {
				var self = this, ret = setSelected.call(self, item, selected);
				if (selected && self.selectedList) {
					var elt = self.element;
					self.selectedList.find("li").each(function () {
						if ($(self).data("optionLink")) {
							$(self).data("optionLink").remove().appendTo(elt);
						}
					});
				}
				return ret;
			};
		}
		if ($UiMultiselect.prototype.destroy) {
			$UiMultiselect.prototype.destroy = function () {
				var self = this;
				self.element.show();
				self.container.remove();
				if ($.Widget === undefined) {
					$.widget.prototype.destroy.apply(self, arguments);
				} else {
					$.Widget.prototype.destroy.apply(self, arguments);
				}
			};
		}
		jgrid._multiselect = true;
	}

	jgrid.extend({
		sortableColumns: function (tblrow) {
			return this.each(function () {
				var ts = this, p = ts.p, tid = jqID(p.id);
				function start() { p.disableClick = true; }
				var sortableOpts = {
					tolerance: "pointer",
					axis: "x",
					scrollSensitivity: "1",
					items: ">th:not(:has(#jqgh_" + tid + "_cb" + ",#jqgh_" + tid + "_rn" + ",#jqgh_" + tid + "_subgrid),:hidden)",
					placeholder: {
						element: function (item) {
							var el = $(document.createElement(item[0].nodeName))
									.addClass(item[0].className + " ui-sortable-placeholder ui-state-highlight")
									.removeClass("ui-sortable-helper")[0];
							return el;
						},
						update: function (self, o) {
							o.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css("paddingTop") || 0, 10) - parseInt(self.currentItem.css("paddingBottom") || 0, 10));
							o.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css("paddingLeft") || 0, 10) - parseInt(self.currentItem.css("paddingRight") || 0, 10));
						}
					},
					update: function (event, ui) {
						var th = $(">th", $(ui.item).parent()), tid1 = p.id + "_", permutation = [];
						th.each(function () {
							var id = $(">div", this).get(0).id.replace(/^jqgh_/, "").replace(tid1, ""),
								iCol = p.iColByName[id];
							if (iCol !== undefined) {
								permutation.push(iCol);
							}
						});

						$(ts).jqGrid("remapColumns", permutation, true, true);
						if ($.isFunction(p.sortable.update)) {
							p.sortable.update(permutation);
						}
						setTimeout(function () { p.disableClick = false; }, 50);
					}
				};
				if (p.sortable.options) {
					$.extend(sortableOpts, p.sortable.options);
				} else if ($.isFunction(p.sortable)) {
					p.sortable = { "update": p.sortable };
				}
				if (sortableOpts.start) {
					var s = sortableOpts.start;
					sortableOpts.start = function (e, ui) {
						start();
						s.call(this, e, ui);
					};
				} else {
					sortableOpts.start = start;
				}
				if (p.sortable.exclude) {
					sortableOpts.items += ":not(" + p.sortable.exclude + ")";
				}
				var $e = tblrow.sortable(sortableOpts), dataObj = $e.data("sortable") || $e.data("uiSortable") || $e.data("ui-sortable");
				if (dataObj != null) {
					dataObj.floating = true;
				}
			});
		},
		columnChooser: function (opts) {
			var $self = this, self = $self[0], p = self.p, selector, select, colMap = {}, fixedCols = [], dopts, mopts, $dialogContent, multiselectData, listHeight,
				colModel = p.colModel, nCol = colModel.length, colNames = p.colNames,
				getMultiselectWidgetData = function ($elem) {
					return ($UiMultiselect && $UiMultiselect.prototype && $elem.data($UiMultiselect.prototype.widgetFullName || $UiMultiselect.prototype.widgetName)) ||
						$elem.data("ui-multiselect") || $elem.data("multiselect");
				};

			if ($("#colchooser_" + jqID(p.id)).length) { return; }
			selector = $('<div id="colchooser_' + p.id + '" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>');
			select = $("select", selector);

			function insert(perm, i, v) {
				var a, b;
				if (i >= 0) {
					a = perm.slice();
					b = a.splice(i, Math.max(perm.length - i, i));
					if (i > perm.length) { i = perm.length; }
					a[i] = v;
					return a.concat(b);
				}
				return perm;
			}
			function call(fn, obj) {
				if (!fn) { return; }
				if (typeof fn === "string") {
					if ($.fn[fn]) {
						$.fn[fn].apply(obj, $.makeArray(arguments).slice(2));
					}
				} else if ($.isFunction(fn)) {
					fn.apply(obj, $.makeArray(arguments).slice(2));
				}
			}

			opts = $.extend({
				width: 400,
				height: 240,
				classname: null,
				done: function (perm) {
					if (perm && p.groupHeader == null) {
						$self.jqGrid("remapColumns", perm, true);
					}
				},
				/* msel is either the name of a ui widget class that
				   extends a multiselect, or a function that supports
				   creating a multiselect object (with no argument,
				   or when passed an object), and destroying it (when
				   passed the string "destroy"). */
				msel: "multiselect",
				/* "msel_opts" : {}, */

				/* dlog is either the name of a ui widget class that
				   behaves in a dialog-like way, or a function, that
				   supports creating a dialog (when passed dlog_opts)
				   or destroying a dialog (when passed the string
				   "destroy")
				   */
				dlog: "dialog",
				dialog_opts: {
					minWidth: 470,
					dialogClass: "ui-jqdialog"
				},
				/* dlog_opts is either an option object to be passed
				   to "dlog", or (more likely) a function that creates
				   the options object.
				   The default produces a suitable options object for
				   ui.dialog */
				dlog_opts: function (options) {
					var buttons = {};
					buttons[options.bSubmit] = function () {
						options.apply_perm();
						options.cleanup(false);
					};
					buttons[options.bCancel] = function () {
						options.cleanup(true);
					};
					return $.extend(true, {
						buttons: buttons,
						close: function () {
							options.cleanup(true);
						},
						modal: options.modal || false,
						resizable: options.resizable || true,
						width: options.width + 70,
						resize: function () {
							var widgetData = getMultiselectWidgetData(select),
								$thisDialogContent = widgetData.container.closest(".ui-dialog-content");

							if ($thisDialogContent.length > 0 && typeof $thisDialogContent[0].style === "object") {
								$thisDialogContent[0].style.width = "";
							} else {
								$thisDialogContent.css("width", ""); // or just remove width style
							}

							widgetData.selectedList.height(Math.max(widgetData.selectedContainer.height() - widgetData.selectedActions.outerHeight() - 1, 1));
							widgetData.availableList.height(Math.max(widgetData.availableContainer.height() - widgetData.availableActions.outerHeight() - 1, 1));
						}
					}, options.dialog_opts || {});
				},
				/* Function to get the permutation array, and pass it to the
				   "done" function */
				apply_perm: function () {
					var perm = [], showHideColOptions = { skipSetGridWidth: true, skipSetGroupHeaders: true };

					$("option", select).each(function () {
						if ($(this).is(":selected")) {
							$self.jqGrid("showCol", colModel[this.value].name, showHideColOptions);
						} else {
							$self.jqGrid("hideCol", colModel[this.value].name, showHideColOptions);
						}
					});
					if (p.groupHeader && (typeof p.groupHeader === "object" || $.isFunction(p.groupHeader))) {
						$self.jqGrid("destroyGroupHeader", false);
						if (p.pivotOptions != null && p.pivotOptions.colHeaders != null && p.pivotOptions.colHeaders.length > 1) {
							var i, gHead = p.pivotOptions.colHeaders;
							for (i = 0; i < gHead.length; i++) {
								// Multiple calls of setGroupHeaders for one grid are wrong,
								// but there are produces good results in case of usage
								// useColSpanStyle: false option. The rowspan values
								// needed be increased in case of usage useColSpanStyle: true
								if (gHead[i] && gHead[i].groupHeaders.length) {
									$self.jqGrid("setGroupHeaders", gHead[i]);
								}
							}
						} else {
							$self.jqGrid("setGroupHeaders", p.groupHeader);
						}
					}

					//fixedCols.slice(0);
					$("option", select).filter(":selected").each(function () { perm.push(parseInt(this.value, 10)); });
					$.each(perm, function () { delete colMap[colModel[parseInt(this, 10)].name]; });
					$.each(colMap, function () {
						var ti = parseInt(this, 10);
						perm = insert(perm, ti, ti);
					});
					if (opts.done) {
						opts.done.call($self, perm);
					}
					$self.jqGrid("setGridWidth",
						!p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%") ? p.tblwidth : p.width,
						p.shrinkToFit);
				},
				/* Function to cleanup the dialog, and select. Also calls the
				   done function with no permutation (to indicate that the
				   columnChooser was aborted */
				cleanup: function (calldone) {
					call(opts.dlog, selector, "destroy");
					call(opts.msel, select, "destroy");
					selector.remove();
					if (calldone && opts.done) {
						opts.done.call($self);
					}
				},
				msel_opts: {}
			},
			$self.jqGrid("getGridRes", "col"),
			jgrid.col, opts || {});
			if ($.ui) {
				if ($UiMultiselect && $UiMultiselect.defaults) {
					if (!jgrid._multiselect) {
						// should be in language file
						alert("Multiselect plugin loaded after jqGrid. Please load the plugin before the jqGrid!");
						return;
					}
					// ??? the next line uses $.ui.multiselect.defaults which will be typically undefined
					opts.msel_opts = $.extend($UiMultiselect.defaults, opts.msel_opts);
				}
			}
			if (opts.caption) {
				selector.attr("title", opts.caption);
			}
			if (opts.classname) {
				selector.addClass(opts.classname);
				select.addClass(opts.classname);
			}
			if (opts.width) {
				$(">div", selector).css({ width: opts.width, margin: "0 auto" });
				select.css("width", opts.width);
			}
			if (opts.height) {
				$(">div", selector).css("height", opts.height);
				select.css("height", opts.height - 10);
			}

			select.empty();
			var gh = p.groupHeader, colHeader = {}, k, j, l, iCol, ghItem;
			// fill colHeader for columns which have column header
			if (gh != null && gh.groupHeaders != null) {
				for (k = 0, l = gh.groupHeaders.length; k < l; k++) {
					ghItem = gh.groupHeaders[k];
					for (j = 0; j < ghItem.numberOfColumns; j++) {
						iCol = p.iColByName[ghItem.startColumnName] + j;
						colHeader[iCol] = $.isFunction(opts.buildItemText) ?
								opts.buildItemText.call($self[0], {
									iCol: iCol,
									cm: colModel[iCol],
									cmName: colModel[iCol].name,
									colName: colNames[iCol],
									groupTitleText: ghItem.titleText
								}) :
								$.jgrid.stripHtml(ghItem.titleText) + ": " +
									$.jgrid.stripHtml(colNames[iCol] === "" ? colModel[iCol].name : colNames[iCol]);
					}
				}
			}
			// fill colHeader for all other columns
			for (iCol = 0; iCol < nCol; iCol++) {
				if (colHeader[iCol] === undefined) {
					colHeader[iCol] = $.isFunction(opts.buildItemText) ?
							opts.buildItemText.call($self[0], {
								iCol: iCol,
								cm: colModel[iCol],
								cmName: colModel[iCol].name,
								colName: colNames[iCol],
								groupTitleText: null
							}) :
							$.jgrid.stripHtml(colNames[iCol]);
				}
			}
			$.each(colModel, function (i) {

				colMap[this.name] = i;
				if (this.hidedlg) {
					if (!this.hidden) {
						fixedCols.push(i);
					}
					return;
				}
				select.append("<option value='" + i + "'" +
					(p.headertitles || this.headerTitle ? (" title='" + jgrid.stripHtml(typeof this.headerTitle === "string" ? this.headerTitle : colHeader[i]) + "'") : "") +
					(this.hidden ? "" : " selected='selected'") + ">" + colHeader[i] + "</option>");
			});

			dopts = $.isFunction(opts.dlog_opts) ? opts.dlog_opts.call($self, opts) : opts.dlog_opts;
			call(opts.dlog, selector, dopts);
			mopts = $.isFunction(opts.msel_opts) ? opts.msel_opts.call($self, opts) : opts.msel_opts;
			call(opts.msel, select, mopts);

			// fix height of elements of the multiselect widget
			$dialogContent = $("#colchooser_" + jqID(p.id));

			$dialogContent.css({ margin: "auto" });
			$dialogContent.find(">div").css({ width: "100%", height: "100%", margin: "auto" });

			multiselectData = getMultiselectWidgetData(select);
			if (multiselectData) {
				multiselectData.container.css({ width: "100%", height: "100%", margin: "auto" });

				multiselectData.selectedContainer.css({ width: multiselectData.options.dividerLocation * 100 + "%", height: "100%", margin: "auto", boxSizing: "border-box" });
				multiselectData.availableContainer.css({ width: (100 - multiselectData.options.dividerLocation * 100) + "%", height: "100%", margin: "auto", boxSizing: "border-box" });

				// set height for both selectedList and availableList
				multiselectData.selectedList.css("height", "auto");
				multiselectData.availableList.css("height", "auto");
				listHeight = Math.max(multiselectData.selectedList.height(), multiselectData.availableList.height());
				listHeight = Math.min(listHeight, $(window).height());
				multiselectData.selectedList.css("height", listHeight);
				multiselectData.availableList.css("height", listHeight);
			}
		},
		sortableRows: function (opts) {
			// Can accept all sortable options and events
			return this.each(function () {
				var $t = this, grid = $t.grid, p = $t.p;
				if (!grid) { return; }
				// Currently we disable a treeGrid sortable
				if (p.treeGrid) { return; }
				if ($.fn.sortable) {
					opts = $.extend({
						cursor: "move",
						axis: "y",
						items: ">.jqgrow"
					},
					opts || {});
					if (opts.start && $.isFunction(opts.start)) {
						opts._start_ = opts.start;
						delete opts.start;
					} else { opts._start_ = false; }
					if (opts.update && $.isFunction(opts.update)) {
						opts._update_ = opts.update;
						delete opts.update;
					} else { opts._update_ = false; }
					opts.start = function (ev, ui) {
						$(ui.item).css("border-width", "0");
						$("td", ui.item).each(function (i) {
							this.style.width = grid.cols[i].style.width;
						});
						if (p.subGrid) {
							var subgid = $(ui.item).attr("id");
							try {
								$($t).jqGrid("collapseSubGridRow", subgid);
							} catch (ignore) { }
						}
						if (opts._start_) {
							opts._start_.apply(this, [ev, ui]);
						}
					};
					opts.update = function (ev, ui) {
						$(ui.item).css("border-width", "");
						if (p.rownumbers === true) {
							$("td.jqgrid-rownum", $t.rows).each(function (i) {
								$(this).html(i + 1 + (parseInt(p.page, 10) - 1) * parseInt(p.rowNum, 10));
							});
						}
						if (opts._update_) {
							opts._update_.apply(this, [ev, ui]);
						}
					};
					$($t.tBodies[0]).sortable(opts);
					if ($.isFunction($.fn.disableSelection)) {
						// The method disableSelection exists starting with jQuery UI 1.6,
						// but it's declared as deprecated since jQuery UI 1.9
						// see http://jqueryui.com/upgrade-guide/1.9/#deprecated-disableselection-and-enableselection
						// so we use disableSelection only if it exists
						$($t.tBodies[0]).children("tr.jqgrow").disableSelection();
					}
				}
			});
		},
		gridDnD: function (opts) {
			return this.each(function () {
				var $t = this, j, cn;
				if (!$t.grid) { return; }
				// Currently we disable a treeGrid drag and drop
				if ($t.p.treeGrid) { return; }
				if (!$.fn.draggable || !$.fn.droppable) { return; }
				function updateDnD() {
					var datadnd = $.data($t, "dnd");
					$("tr.jqgrow:not(.ui-draggable)", $t).draggable($.isFunction(datadnd.drag) ? datadnd.drag.call($($t), datadnd) : datadnd.drag);
				}
				var appender = "<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>";
				if ($("#jqgrid_dnd")[0] === undefined) {
					$("body").append(appender);
				}

				if (typeof opts === "string" && opts === "updateDnD" && $t.p.jqgdnd === true) {
					updateDnD();
					return;
				}
				opts = $.extend({
					drag: function (opts1) {
						return $.extend({
							start: function (ev, ui) {
								var i, subgid;
								// if we are in subgrid mode try to collapse the node
								if ($t.p.subGrid) {
									subgid = $(ui.helper).attr("id");
									try {
										$($t).jqGrid("collapseSubGridRow", subgid);
									} catch (ignore) { }
								}
								// hack
								// drag and drop does not insert tr in table, when the table has no rows
								// we try to insert new empty row on the target(s)
								for (i = 0; i < $.data($t, "dnd").connectWith.length; i++) {
									if ($($.data($t, "dnd").connectWith[i]).jqGrid("getGridParam", "reccount") === 0) {
										$($.data($t, "dnd").connectWith[i]).jqGrid("addRowData", "jqg_empty_row", {});
									}
								}
								ui.helper.addClass("ui-state-highlight");
								$("td", ui.helper).each(function (iCol) {
									this.style.width = $t.grid.headers[iCol].width + "px";
								});
								if (opts1.onstart && $.isFunction(opts1.onstart)) { opts1.onstart.call($($t), ev, ui); }
							},
							stop: function (ev, ui) {
								var i, ids;
								if (ui.helper.dropped && !opts1.dragcopy) {
									ids = $(ui.helper).attr("id");
									if (ids === undefined) { ids = $(this).attr("id"); }
									$($t).jqGrid("delRowData", ids);
								}
								// if we have a empty row inserted from start event try to delete it
								for (i = 0; i < $.data($t, "dnd").connectWith.length; i++) {
									$($.data($t, "dnd").connectWith[i]).jqGrid("delRowData", "jqg_empty_row");
								}
								if (opts1.onstop && $.isFunction(opts1.onstop)) { opts1.onstop.call($($t), ev, ui); }
							}
						}, opts1.drag_opts || {});
					},
					drop: function (opts1) {
						return $.extend({
							accept: function (d) {
								if (!$(d).hasClass("jqgrow")) { return d; }
								var tid = $(d).closest("table.ui-jqgrid-btable");
								if (tid.length > 0 && $.data(tid[0], "dnd") !== undefined) {
									var cn1 = $.data(tid[0], "dnd").connectWith;
									return $.inArray("#" + jqID(this.id), cn1) !== -1 ? true : false;
								}
								return false;
							},
							drop: function (ev, ui) {
								if (!$(ui.draggable).hasClass("jqgrow")) { return; }
								var accept = $(ui.draggable).attr("id");
								var getdata = ui.draggable.parent().parent().jqGrid("getRowData", accept);
								if (!opts1.dropbyname) {
									var i = 0, tmpdata = {}, nm, key;
									var dropmodel = $("#" + jqID(this.id)).jqGrid("getGridParam", "colModel");
									try {
										for (key in getdata) {
											if (getdata.hasOwnProperty(key)) {
												nm = dropmodel[i].name;
												if (!(nm === "cb" || nm === "rn" || nm === "subgrid")) {
													if (getdata.hasOwnProperty(key) && dropmodel[i]) {
														tmpdata[nm] = getdata[key];
													}
												}
												i++;
											}
										}
										getdata = tmpdata;
									} catch (ignore) { }
								}
								ui.helper.dropped = true;
								if (opts1.beforedrop && $.isFunction(opts1.beforedrop)) {
									//parameters to this callback - event, element, data to be inserted, sender, reciever
									// should return object which will be inserted into the reciever
									var datatoinsert = opts1.beforedrop.call(this, ev, ui, getdata, $("#" + jqID($t.p.id)), $(this));
									if (datatoinsert !== undefined && datatoinsert !== null && typeof datatoinsert === "object") { getdata = datatoinsert; }
								}
								if (ui.helper.dropped) {
									var grid;
									if (opts1.autoid) {
										if ($.isFunction(opts1.autoid)) {
											grid = opts1.autoid.call(this, getdata);
										} else {
											grid = Math.ceil(Math.random() * 1000);
											grid = opts1.autoidprefix + grid;
										}
									}
									// NULL is interpreted as undefined while null as object
									$("#" + jqID(this.id)).jqGrid("addRowData", grid, getdata, opts1.droppos);
									getdata[$t.p.localReader.id] = grid;
								}
								if (opts1.ondrop && $.isFunction(opts1.ondrop)) { opts1.ondrop.call(this, ev, ui, getdata); }
							}
						}, opts1.drop_opts || {});
					},
					onstart: null,
					onstop: null,
					beforedrop: null,
					ondrop: null,
					drop_opts: {
						//activeClass: "ui-state-active",
						//hoverClass: "ui-state-hover"
					},
					drag_opts: {
						revert: "invalid",
						helper: "clone",
						cursor: "move",
						appendTo: "#jqgrid_dnd",
						zIndex: 5000
					},
					dragcopy: false,
					dropbyname: false,
					droppos: "first",
					autoid: true,
					autoidprefix: "dnd_"
				}, opts || {});

				if (!opts.connectWith) { return; }
				opts.connectWith = opts.connectWith.split(",");
				opts.connectWith = $.map(opts.connectWith, function (n) { return $.trim(n); });
				$.data($t, "dnd", opts);

				if ($t.p.reccount !== 0 && !$t.p.jqgdnd) {
					updateDnD();
				}
				$t.p.jqgdnd = true;
				for (j = 0; j < opts.connectWith.length; j++) {
					cn = opts.connectWith[j];
					$(cn).droppable($.isFunction(opts.drop) ? opts.drop.call($($t), opts) : opts.drop);
				}
			});
		},
		gridResize: function (opts) {
			return this.each(function () {
				var $t = this, grid = $t.grid, p = $t.p, bdivSelector = p.gView + ">.ui-jqgrid-bdiv", onlyHorizontal = false, sel, gridHeight = p.height;
				if (!grid || !$.fn.resizable) { return; }
				opts = $.extend({}, opts || {});
				if (opts.alsoResize) {
					opts._alsoResize_ = opts.alsoResize;
					delete opts.alsoResize;
				} else {
					opts._alsoResize_ = false;
				}
				if (opts.stop && $.isFunction(opts.stop)) {
					opts._stop_ = opts.stop;
					delete opts.stop;
				} else {
					opts._stop_ = false;
				}
				opts.stop = function (ev, ui) {
					$($t).jqGrid("setGridWidth", ui.size.width, opts.shrinkToFit);
					$(p.gView + ">.ui-jqgrid-titlebar").css("width", "");
					if (!onlyHorizontal) {
						$($t).jqGrid("setGridParam", { height: $(bdivSelector).height() });
					} else {
						$(sel).each(function () {
							$(this).css("height", "");
						});
						if (gridHeight === "auto" || gridHeight === "100%") {
							$(grid.bDiv).css("height", gridHeight);
						}
					}
					if ($t.fixScrollOffsetAndhBoxPadding) {
						$t.fixScrollOffsetAndhBoxPadding();
					}
					if (opts._stop_) { opts._stop_.call($t, ev, ui); }
				};
				sel = bdivSelector;
				if ((gridHeight === "auto" || gridHeight === "100%") && opts.handles === undefined) {
					opts.handles = "e,w";
				}
				if (opts.handles) {
					// test for "e, w"
					var ar = $.map(String(opts.handles).split(","), function (item) {
						return $.trim(item);
					});
					if (ar.length === 2 && ((ar[0] === "e" && ar[1] === "w") || (ar[1] === "e" && ar[1] === "w"))) {
						sel = p.gView + ">div:not(.frozen-div)";
						onlyHorizontal = true;
						if (p.pager) {
							sel += "," + p.pager;
						}
					}
				}
				if (opts._alsoResize_) {
					opts.alsoResize = sel + "," + opts._alsoResize_;
				} else {
					opts.alsoResize = sel;
				}
				delete opts._alsoResize_;
				$(p.gBox).resizable(opts);
			});
		}
	});
	// end module grid.jqueryui

	/**
	 * jqGrid pivot functions
	 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com, http://trirand.com/blog/
	 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * The modul is created initially by Tony Tomov and it's full rewritten
	 * for free jqGrid: https://github.com/free-jqgrid/jqGrid by Oleg Kiriljuk
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	*/
	// begin module grid.pivot
	function Aggregation(aggregator, context, pivotOptions) {
		if (!(this instanceof Aggregation)) {
			return new Aggregation(aggregator);
		}
		//this.result = undefined;
		//this.count = undefined;
		this.aggregator = aggregator;
		this.finilized = false;
		this.context = context;
		this.pivotOptions = pivotOptions;
	}
	Aggregation.prototype.calc = function (v, fieldName, row, iRow, rows) {
		var self = this;
		if (v !== undefined) {
			self.result = self.result || 0; // change undefined to 0
			v = parseFloat(v);
			switch (self.aggregator) {
				case "sum":
					self.result += v;
					break;
				case "count":
					self.result++;
					break;
				case "avg":
					if (self.finilized) {
						self.count = self.count || 0; // change undefined to 0
						self.result = (self.result * self.count + v) / (self.count + 1);
						self.count++;
					} else {
						self.result += v;
						self.count = self.count || 0; // change undefined to 0
						self.count++;
					}
					break;
				case "min":
					self.result = Math.min(self.result, v);
					break;
				case "max":
					self.result = Math.max(self.result, v);
					break;
				default:
					if ($.isFunction(self.aggregator)) {
						self.result = self.aggregator.call(self.context, {
							previousResult: self.result,
							value: v,
							fieldName: fieldName,
							item: row,
							iItem: iRow,
							items: rows
						});
					}
					break;
			}
		}
	};
	Aggregation.prototype.getResult = function (obj, propName, forceSaving) {
		var self = this;
		if (self.result !== undefined || forceSaving) {
			if (forceSaving) {
				if (self.result !== undefined) {
					self.result = 0;
					self.count = 0;
				}
			}
			if (self.result !== undefined && !self.finilized && self.aggregator === "avg") {
				self.result = self.result / self.count;
				self.finilized = true;
			}
			obj[propName] = self.result;
		}
	};

	function ArrayOfFieldsets(trimByCollect, caseSensitive, skipSort, dimension, fieldName) {
		var iField, dimensionLength = dimension.length, dimensionItem, self = this,
			stringCompare = function (a, b) {
				var a1 = a, b1 = b;
				if (a1 == null) { a1 = ""; } // we will place undefined and null values as the lowest TOGETHER with ""
				if (b1 == null) { b1 = ""; }
				// be sure that we have no other input data (Number, Date and so on)
				a1 = String(a1);
				b1 = String(b1);
				if (!this.caseSensitive) {
					a1 = a1.toUpperCase();
					b1 = b1.toUpperCase();
				}
				if (a1 === b1) {
					if (a === b) {//typeof a === typeof b) {
						return 0;
					}
					// either a or b is undefined or null
					if (a === undefined) { return -1; } // make undefined less as all other
					if (b === undefined) { return 1; }
					if (a === null) { return -1; } // make null less as all other with the exception undefined
					if (b === null) { return 1; }
				}
				if (a1 < b1) {
					return -1;
				}
				return 1;
			},
			numberCompare = function (a, b) {
				a = Number(a);
				b = Number(b);
				if (a === b) {
					return 0;
				}
				if (a < b) {
					return -1;
				}
				return 1;
			},
			integerCompare = function (a, b) {
				a = Math.floor(Number(a));
				b = Math.floor(Number(b));
				if (a === b) {
					return 0;
				}
				if (a < b) {
					return -1;
				}
				return 1;
			};

		self.items = [];
		self.indexesOfSourceData = [];
		self.trimByCollect = trimByCollect;
		self.caseSensitive = caseSensitive;
		self.skipSort = skipSort;
		self.fieldLength = dimensionLength;
		self.fieldNames = new Array(dimensionLength);
		self.fieldSortDirection = new Array(dimensionLength);
		self.fieldCompare = new Array(dimensionLength); // 0 - number, 1 - integer, 2 - string, one can extend for Date and other
		for (iField = 0; iField < dimensionLength; iField++) {
			dimensionItem = dimension[iField];
			self.fieldNames[iField] = dimensionItem[fieldName || "dataName"];
			switch (dimensionItem.sorttype) {
				case "integer":
				case "int":
					self.fieldCompare[iField] = integerCompare;
					break;
				case "number":
				case "currency":
				case "float":
					self.fieldCompare[iField] = numberCompare;
					break;
				default:
					self.fieldCompare[iField] = $.isFunction(dimensionItem.compare) ? dimensionItem.compare : stringCompare;
					break;
			}
			self.fieldSortDirection[iField] = dimensionItem.sortorder === "desc" ? -1 : 1;
		}
	}
	ArrayOfFieldsets.prototype.compareVectorsEx = function (vector1, vector2) {
		var self = this, fieldLength = self.fieldLength, iField, compareResult;
		for (iField = 0; iField < fieldLength; iField++) {
			compareResult = self.fieldCompare[iField](vector1[iField], vector2[iField]);
			if (compareResult !== 0) {
				return {
					index: iField,
					result: compareResult
				};
			}
		}
		return {
			index: -1,
			result: 0
		};
	};
	ArrayOfFieldsets.prototype.getIndexOfDifferences = function (vector1, vector2) {
		if (vector2 === null || vector1 === null) {
			return 0;
		}
		return this.compareVectorsEx(vector1, vector2).index;
	};
	ArrayOfFieldsets.prototype.compareVectors = function (vector1, vector2) {
		var compareRestlts = this.compareVectorsEx(vector1, vector2),
			sortDirection = compareRestlts.index >= 0 ? this.fieldSortDirection[compareRestlts.index] : 1;
		return sortDirection > 0 ? compareRestlts.result : -compareRestlts.result;
	};
	ArrayOfFieldsets.prototype.getItem = function (index) {
		return this.items[index];
	};
	ArrayOfFieldsets.prototype.getIndexLength = function () {
		return this.items.length;
	};
	ArrayOfFieldsets.prototype.getIndexesOfSourceData = function (index) {
		return this.indexesOfSourceData[index];
	};
	ArrayOfFieldsets.prototype.createDataIndex = function (data) {
		var self = this, iRow, nRows = data.length, fieldLength = self.fieldLength, values, v,
			fieldNames = self.fieldNames, indexesOfSourceData = self.indexesOfSourceData, iField, compareResult, i, item,
			items = self.items, iMin, iMax;

		for (iRow = 0; iRow < nRows; iRow++) {
			item = data[iRow];

			// build the set of fields with data of the current item
			values = new Array(fieldLength);
			for (iField = 0; iField < fieldLength; iField++) {
				v = item[fieldNames[iField]];
				if (v !== undefined) {
					if (typeof v === "string" && self.trimByCollect) {
						v = $.trim(v);
					}
					values[iField] = v;
				}
			}

			// compare values with items having index iMax and iMin
			// If we use skipSort:true option then we compare always
			// with iMax item only.
			iMin = 0;
			iMax = items.length - 1;
			if (iMax < 0) {
				items.push(values);
				indexesOfSourceData.push([iRow]);
				continue;
			}
			compareResult = self.compareVectors(values, items[iMax]);
			if (compareResult === 0) {
				indexesOfSourceData[iMax].push(iRow);
				continue;
			}
			if (compareResult === 1 || self.skipSort) {
				// in case of the empty array this.items or if the values is larger as the
				// the max (last) element of this.items: append values to the array this.items
				items.push(values);
				indexesOfSourceData.push([iRow]);
				continue;
			}
			compareResult = self.compareVectors(items[0], values);
			if (compareResult === 1) {
				// if the min (first) element values is larger as the values:
				// insert the values as the first element of the array this.items
				items.unshift(values);
				indexesOfSourceData.unshift([iRow]);
				continue;
			}
			if (compareResult === 0) {
				indexesOfSourceData[0].push(iRow);
				continue;
			}
			// we are sure that items[iMin] < values < items[iMax]
			while (true) {
				if (iMax - iMin < 2) {
					// no identical items are found we need to insert the item at i index
					items.splice(iMax, 0, values); // insert after iMin
					indexesOfSourceData.splice(iMax, 0, [iRow]);
					break;
				}
				i = Math.floor((iMin + iMax) / 2); // | 0 means Math.floor, but it's faster sometimes.
				compareResult = self.compareVectors(items[i], values);
				if (compareResult === 0) {
					indexesOfSourceData[i].push(iRow);
					break;
				}
				if (compareResult === 1) {
					iMax = i;
				} else {
					iMin = i;
				}
			}
		}
	};

	jgrid.extend({
		pivotSetup: function (data, options) {
			// data should come in json format
			// The function return the new colModel and the transformed data
			// again with group setup options which then will be passed to the grid
			var self = this[0], isArray = $.isArray, summaries = {},
				groupingView = {
					groupField: [],
					groupSummary: [],
					groupSummaryPos: []
				},
				groupOptions = {
					grouping: true,
					groupingView: groupingView
				},
				o = $.extend({
					totals: false, // replacement for rowTotals. totalText and totalHeader can be used additionally
					useColSpanStyle: false,
					trimByCollect: true,
					skipSortByX: false,
					skipSortByY: false,
					caseSensitive: false,
					footerTotals: false, // replacement colTotals. footerAggregator option and totalText properties of xDimension[i] can be used additionally
					groupSummary: true,
					groupSummaryPos: "header",
					frozenStaticCols: false,
					defaultFormatting: true,
					data: data
				}, options || {}),
				row, i, k, nRows = data.length, x, y, cm, iRow, cmName, iXData, itemXData, pivotInfos, rows,
				xDimension = o.xDimension, yDimension = o.yDimension, aggregates = o.aggregates, aggrContext,
				isRowTotal = o.totalText || o.totals || o.rowTotals || o.totalHeader, aggrTotal, gi,
				xlen = isArray(xDimension) ? xDimension.length : 0,
				ylen = isArray(yDimension) ? yDimension.length : 0,
				aggrlen = isArray(aggregates) ? aggregates.length : 0,
				headerLevels = ylen - (aggrlen === 1 ? 1 : 0),
				colHeaders = [], hasGroupTotal = [], colModel = [], outputItems = [],
				aggrContextTotalRows = new Array(aggrlen), aggrContextGroupTotalRows = new Array(ylen),
				xIndexLength, indexesOfDataWithTheSameXValues, iYData, itemYData, indexesOfDataWithTheSameYValues,
				iRows, agr, outputItem, previousY, groupHeaders, iRowsY, xIndex, yIndex, yIndexLength,
				indexDataBy = function (dimension, skipSort, compareVectors) {
					var index = new ArrayOfFieldsets(o.trimByCollect, o.caseSensitive, skipSort, dimension);
					if ($.isFunction(compareVectors)) {
						index.compareVectorsEx = compareVectors;
					}
					index.createDataIndex(data);
					return index;
				},
				buildColModelItem = function (colType, agr1, iAggr, level, iyData) {
					var label, name, cmItem;
					switch (colType) {
						case 1: // total group
							label = yDimension[level].totalText || "{0} {1} {2}";
							name = "y" + iyData + "t" + level;
							break;
						case 2: // grand total
							label = o.totalText || "{0}";
							name = "t";
							break;
						//case 0: // standard column
						default:
							label = aggrlen > 1 ? agr1.label || "{0}" : yIndex.getItem(iyData)[level];
							name = "y" + iyData;
							break;
					}
					cmItem = $.extend({}, agr1, {
						name: name + (aggrlen > 1 ? "a" + iAggr : ""),
						label: $.isFunction(label) ?
									(label.call(self, colType === 2 ?
											{ aggregate: agr1, iAggregate: iAggr, pivotOptions: o } :
											{ yIndex: yIndex.getItem(iyData), aggregate: agr1, iAggregate: iAggr, yLevel: level, pivotOptions: o })) :
									(jgrid.template.apply(self, colType === 2 ?
											[label, agr1.aggregator, agr1.member, iAggr] :
											[label, agr1.aggregator, agr1.member, yIndex.getItem(iyData)[level], level]))
					});
					delete cmItem.member;
					delete cmItem.aggregator;
					return cmItem;
				},
				addColumnToColModel = function (colType, level, iyData) {
					var iAggr, aggregate;
					for (iAggr = 0; iAggr < aggrlen; iAggr++) {
						aggregate = aggregates[iAggr];
						if (aggregate.template === undefined && aggregate.formatter === undefined && o.defaultFormatting) {
							aggregate.template = aggregate.aggregator === "count" ? "integer" : "number";
						}
						colModel.push(buildColModelItem(colType, aggregate, iAggr, level, iyData));
					}
				},
				addGroupTotalHeaders = function (iyData, level, previousY1) {
					var iLevel, j, totalHeader, headerOnTop;
					for (iLevel = headerLevels - 1; iLevel >= level; iLevel--) {
						if (hasGroupTotal[iLevel]) {
							for (j = 0; j <= iLevel; j++) {
								groupHeaders = colHeaders[j].groupHeaders;
								groupHeaders[groupHeaders.length - 1].numberOfColumns += aggrlen;
							}
							y = yDimension[iLevel];
							totalHeader = y.totalHeader;
							headerOnTop = y.headerOnTop;
							for (j = iLevel + 1; j <= headerLevels - 1; j++) {
								colHeaders[j].groupHeaders.push({
									titleText: ((headerOnTop && j === iLevel + 1) || (!headerOnTop && j === headerLevels - 1)) ?
											($.isFunction(totalHeader) ?
													totalHeader.call(self, previousY1, iLevel) :
													jgrid.template.call(self, totalHeader || "", previousY1[iLevel], iLevel)) :
											"",
									startColumnName: "y" + (iyData - 1) + "t" + iLevel + (aggrlen === 1 ? "" : "a0"),
									numberOfColumns: aggrlen
								});
							}
						}
					}
				},
				createTotalAggregation = function (iAggr) {
					var aggrGroup = new Aggregation(aggregates[iAggr].aggregator === "count" ? "sum" : aggregates[iAggr].aggregator, self, options);
					aggrGroup.groupInfo = { iRows: [], rows: [], ys: [], iYs: [] };
					return aggrGroup;
				},
				initializeGroupTotals = function () {
					var iLevel, iAggr;
					for (iLevel = headerLevels - 1; iLevel >= 0; iLevel--) {
						if (hasGroupTotal[iLevel]) {
							if (aggrContextGroupTotalRows[iLevel] == null) {// first call
								aggrContextGroupTotalRows[iLevel] = new Array(aggrlen);
							}
							for (iAggr = 0; iAggr < aggrlen; iAggr++) {
								aggrContextGroupTotalRows[iLevel][iAggr] = createTotalAggregation(iAggr);
							}
						}
					}
				},
				finalizeGroupTotals = function (iyData, itemYData1, previousY1, iAggr) {
					var iLevel, level = yIndex.getIndexOfDifferences(itemYData1, previousY1), fieldName, aggrGroup;

					if (previousY1 !== null) {
						// test whether the group is finished and one need to get results
						level = Math.max(level, 0); // change -1 to 0 for the last call (itemYData === previousY)
						for (iLevel = headerLevels - 1; iLevel >= level; iLevel--) {
							fieldName = "y" + iyData + "t" + iLevel + (aggrlen > 1 ? "a" + iAggr : "");
							if (hasGroupTotal[iLevel] && outputItem[fieldName] === undefined) {
								aggrGroup = aggrContextGroupTotalRows[iLevel][iAggr];
								aggrGroup.getResult(outputItem, fieldName);
								outputItem.pivotInfos[fieldName] = {
									colType: 1,
									iA: iAggr,
									a: aggregates[iAggr],
									level: iLevel,
									iRows: aggrGroup.groupInfo.iRows,
									rows: aggrGroup.groupInfo.rows,
									ys: aggrGroup.groupInfo.ys,
									iYs: aggrGroup.groupInfo.iYs
								};
								if (itemYData1 !== previousY1) {
									aggrContextGroupTotalRows[iLevel][iAggr] = createTotalAggregation(iAggr);
								}
							}
						}
					}
				},
				calculateGroupTotals = function (itemYData1, previousY1, aggregate, iAggr, row1, iRow1, iyData) {
					// the method will be called at the first time with previousY === null in every output row
					// and finally with itemYData === previousY for getting results of all aggregation contexts
					var iLevel, aggrGroup, groupInfo;

					if (itemYData1 !== previousY1) { // not the last call in the row
						for (iLevel = headerLevels - 1; iLevel >= 0; iLevel--) {
							if (hasGroupTotal[iLevel]) {
								aggrGroup = aggrContextGroupTotalRows[iLevel][iAggr];
								aggrGroup.calc(row1[aggregate.member], aggregate.member, row1, iRow1, data);
								groupInfo = aggrGroup.groupInfo;
								if ($.inArray(iyData, groupInfo.iYs) < 0) {
									groupInfo.iYs.push(iyData);
									groupInfo.ys.push(itemYData1);
								}
								if ($.inArray(iRow1, groupInfo.iRows) < 0) {
									groupInfo.iRows.push(iRow1);
									groupInfo.rows.push(row1);
								}
							}
						}
					}
				};

			if (xlen === 0 || aggrlen === 0) {
				throw ("xDimension or aggregates options are not set!");
			}

			// ****************************************************************
			// The step 1: scan input data and build the list of unique indexes
			// ****************************************************************
			xIndex = indexDataBy(xDimension, o.skipSortByX, o.compareVectorsByX);
			yIndex = indexDataBy(yDimension, o.skipSortByY, o.compareVectorsByY);

			// save to be used probably later
			options.xIndex = xIndex;
			options.yIndex = yIndex;

			// *******************************************
			// The step 2: build colModel and groupOptions
			// *******************************************
			// fill the first xlen columns of colModel and fill the groupOptions
			// the names of the first columns will be "x"+i. The first column have the name "x0".
			for (i = 0; i < xlen; i++) {
				x = xDimension[i];
				cm = {
					name: "x" + i,
					label: x.label != null ?
								($.isFunction(x.label) ? x.label.call(self, x, i, o) : x.label) :
								x.dataName,
					frozen: o.frozenStaticCols
				};
				if (i < xlen - 1) {
					// based on xDimension levels build grouping
					groupingView.groupField.push(cm.name);
					groupingView.groupSummary.push(o.groupSummary);
					groupingView.groupSummaryPos.push(o.groupSummaryPos);
				}
				cm = $.extend(cm, x);
				delete cm.dataName;
				delete cm.footerText;
				colModel.push(cm);
			}
			if (xlen < 2) {
				groupOptions.grouping = false; // no grouping is needed
			}
			groupOptions.sortname = colModel[xlen - 1].name;
			groupingView.hideFirstGroupCol = true;

			// Fill hasGroupTotal and groupColumnsPerLevel arrays
			// The hasGroupTotal just shows whether one need create additional totals for every group.
			for (i = 0; i < ylen; i++) {
				y = yDimension[i];
				hasGroupTotal.push(y.totals || y.rowTotals || y.totalText || y.totalHeader ? true : false);
			}

			// fill other columns of colModel based on collected uniqueYData and aggregates options
			// the names of the first columns will be "y"+i in case of one aggregate and
			// "y"+i+"a"+k in case of multiple aggregates. The name of the first "y"-column is "y0" or "y0a0"
			// The next function build and insert item in colModel
			// colType: 0 - means standard column, 1 - total group, 2 - grand total
			previousY = yIndex.getItem(0);
			addColumnToColModel(0, ylen - 1, 0); // add standard column
			yIndexLength = yIndex.getIndexLength();
			for (iYData = 1; iYData < yIndexLength; iYData++) {
				itemYData = yIndex.getItem(iYData);
				/*
				 * find where (on which level) the itemYData have the differences to
				 * the previous y (previousY). If the level has (totals:true/rowTotals:true) in yDimension
				 * then one should insert new total columns for all levels starting with the highest one
				 * (yDimension[yDimension.length-1]) and till the current one.
				 */
				i = yIndex.getIndexOfDifferences(itemYData, previousY);
				for (k = headerLevels - 1; k >= i; k--) {
					if (hasGroupTotal[k]) {
						addColumnToColModel(1, k, iYData - 1); // add group total columns
					}
				}
				previousY = itemYData;
				addColumnToColModel(0, ylen - 1, iYData); // add standard column
			}
			// finalize of all totals
			for (i = headerLevels - 1; i >= 0; i--) {
				if (hasGroupTotal[i]) {
					addColumnToColModel(1, i, yIndexLength - 1); // add the last group total columns
				}
			}
			// add total columns calculated over all data of the row
			if (isRowTotal) {
				addColumnToColModel(2);
			}

			// ********************************
			// The step 3: build column headers
			// ********************************
			// initialize colHeaders
			previousY = yIndex.getItem(0);
			for (k = 0; k < headerLevels; k++) {
				colHeaders.push({
					useColSpanStyle: o.useColSpanStyle,
					groupHeaders: [{
						titleText: previousY[k],
						startColumnName: aggrlen === 1 ? "y0" : "y0a0",
						numberOfColumns: aggrlen
					}]
				});
			}
			for (iYData = 1; iYData < yIndexLength; iYData++) {
				itemYData = yIndex.getItem(iYData);
				i = yIndex.getIndexOfDifferences(itemYData, previousY);
				// We placed QNIQUE data in uniqueYData array.
				// So we always find a difference on one level

				addGroupTotalHeaders(iYData, i, previousY);
				// add column headers which corresponds the main data
				for (k = headerLevels - 1; k >= i; k--) {
					colHeaders[k].groupHeaders.push({
						titleText: itemYData[k],
						startColumnName: "y" + iYData + (aggrlen === 1 ? "" : "a0"),
						numberOfColumns: aggrlen
					});
				}
				for (k = 0; k < i; k++) {
					groupHeaders = colHeaders[k].groupHeaders;
					groupHeaders[groupHeaders.length - 1].numberOfColumns += aggrlen;
				}
				previousY = itemYData;
			}
			addGroupTotalHeaders(yIndexLength, 0, previousY);

			// fill groupHeaders without taking in consideration group total columns
			if (isRowTotal) {
				for (i = 0; i < headerLevels; i++) {
					colHeaders[i].groupHeaders.push({
						titleText: (i < headerLevels - 1 ? "" : o.totalHeader || ""),
						startColumnName: "t" + (aggrlen === 1 ? "" : "a0"),
						numberOfColumns: aggrlen
					});
				}
			}

			// *****************************
			// The step 4: fill data of grid
			// *****************************
			xIndexLength = xIndex.getIndexLength();
			for (iXData = 0; iXData < xIndexLength; iXData++) {
				itemXData = xIndex.getItem(iXData);
				pivotInfos = { iX: iXData, x: itemXData };
				outputItem = { pivotInfos: pivotInfos }; // item of output data
				// itemXData corresponds to the row of output data
				for (i = 0; i < xlen; i++) {
					// fill first columns of data
					outputItem["x" + i] = itemXData[i];
				}

				indexesOfDataWithTheSameXValues = xIndex.getIndexesOfSourceData(iXData);
				// The rows of input data with indexes from indexesOfDataWithTheSameXValues contains itemXData
				// Now we build columns of itemXData row
				if (isRowTotal) {
					for (k = 0; k < aggrlen; k++) {
						aggrContextTotalRows[k] = createTotalAggregation(k);
					}
				}
				previousY = null;
				initializeGroupTotals();
				for (iYData = 0; iYData < yIndexLength; iYData++) {
					itemYData = yIndex.getItem(iYData);
					indexesOfDataWithTheSameYValues = yIndex.getIndexesOfSourceData(iYData);
					// we calculate aggregate in every itemYData
					for (k = 0; k < aggrlen; k++) {
						if (previousY !== null) { // empty input data
							finalizeGroupTotals(iYData - 1, itemYData, previousY, k);
						}
						iRows = [];
						for (i = 0; i < indexesOfDataWithTheSameYValues.length; i++) {
							iRowsY = indexesOfDataWithTheSameYValues[i];
							if ($.inArray(iRowsY, indexesOfDataWithTheSameXValues) >= 0) {
								iRows.push(iRowsY);
							}
						}
						if (iRows.length > 0) {
							// iRows array have all indexes of input data which have both itemXData and itemYData
							// We need calculate aggregate agr over all the items
							rows = new Array(iRows.length);
							agr = aggregates[k];
							aggrContext = new Aggregation(agr.aggregator, self, options);
							for (iRow = 0; iRow < iRows.length; iRow++) {
								i = iRows[iRow];
								row = data[i];
								rows[iRow] = row;
								aggrContext.calc(row[agr.member], agr.member, row, i, data);
								if (isRowTotal) {
									aggrTotal = aggrContextTotalRows[k];
									aggrTotal.calc(row[agr.member], agr.member, row, i, data);
									gi = aggrTotal.groupInfo;
									if ($.inArray(i, gi.iYs) < 0) {
										gi.iYs.push(iYData);
										gi.ys.push(itemYData);
									}
									if ($.inArray(i, gi.iRows) < 0) {
										gi.iRows.push(i);
										gi.rows.push(row);
									}
								}
								calculateGroupTotals(itemYData, previousY, agr, k, row, i, iYData);
							}
							cmName = "y" + iYData + (aggrlen === 1 ? "" : "a" + k);
							aggrContext.getResult(outputItem, cmName);
							pivotInfos[cmName] = {
								colType: 0, // standard row
								iY: iYData,
								y: itemYData,
								iA: k,
								a: agr,
								iRows: iRows,
								rows: rows
							};
						}
					}
					previousY = itemYData;
				}
				if (previousY !== null) { // if non-empty input data
					for (k = 0; k < aggrlen; k++) {
						finalizeGroupTotals(yIndexLength - 1, previousY, previousY, k);
					}
				}
				if (isRowTotal) {
					for (k = 0; k < aggrlen; k++) {
						cmName = "t" + (aggrlen === 1 ? "" : "a" + k);
						aggrTotal = aggrContextTotalRows[k];
						aggrTotal.getResult(outputItem, cmName);
						gi = aggrTotal.groupInfo;
						pivotInfos[cmName] = {
							colType: 2, // row total
							iA: k,
							a: aggregates[k],
							iRows: gi.iRows,
							rows: gi.rows,
							iYs: gi.iYs,
							ys: gi.ys
						};
					}
				}
				outputItems.push(outputItem);
			}

			// *****************************
			// The step 5: fill total footer
			// *****************************
			if (o.footerTotals || o.colTotals) {
				nRows = outputItems.length;
				for (i = 0; i < xlen; i++) {
					summaries["x" + i] = xDimension[i].footerText || "";
				}
				for (i = xlen; i < colModel.length; i++) {
					cmName = colModel[i].name;
					aggrContext = new Aggregation(o.footerAggregator || "sum", self, options);
					for (iRow = 0; iRow < nRows; iRow++) {
						outputItem = outputItems[iRow];
						aggrContext.calc(outputItem[cmName], cmName, outputItem, iRow, outputItems);
					}
					aggrContext.getResult(summaries, cmName);
				}
			}

			// return the final result.
			options.colHeaders = colHeaders;
			return { colModel: colModel, options: options, rows: outputItems, groupOptions: groupOptions, groupHeaders: colHeaders, summary: summaries };
		},
		jqPivot: function (data, pivotOpt, gridOpt, ajaxOpt) {
			return this.each(function () {
				var $t = this, $self = $($t), $j = $.fn.jqGrid;

				function pivot() {
					var pivotGrid = $j.pivotSetup.call($self, data, pivotOpt),
						gHead = pivotGrid.groupHeaders,
						assocArraySize = function (obj) {
							// http://stackoverflow.com/a/6700/11236
							var size = 0, key;
							for (key in obj) {
								if (obj.hasOwnProperty(key)) {
									size++;
								}
							}
							return size;
						},
						footerrow = assocArraySize(pivotGrid.summary) > 0 ? true : false,
						groupingView = pivotGrid.groupOptions.groupingView,
						query = jgrid.from.call($t, pivotGrid.rows), i;
					if (pivotOpt.skipSortByX) {
						for (i = 0; i < groupingView.groupField.length; i++) {
							query.orderBy(groupingView.groupField[i],
								gridOpt != null && gridOpt.groupingView && gridOpt.groupingView.groupOrder != null && gridOpt.groupingView.groupOrder[i] === "desc" ? "d" : "a",
								"text",
								"");
						}
					}
					pivotOpt.data = data;
					$j.call($self, $.extend(true, {
						datastr: $.extend(query.select(), footerrow ? { userdata: pivotGrid.summary } : {}),
						datatype: "jsonstring",
						footerrow: footerrow,
						userDataOnFooter: footerrow,
						colModel: pivotGrid.colModel,
						pivotOptions: pivotGrid.options,
						additionalProperties: ["pivotInfos"],
						viewrecords: true,
						sortname: pivotOpt.xDimension[0].dataName // ?????
					}, pivotGrid.groupOptions, gridOpt || {}));
					if (gHead.length) {
						for (i = 0; i < gHead.length; i++) {
							// Multiple calls of setGroupHeaders for one grid are wrong,
							// but there are produces good results in case of usage
							// useColSpanStyle: false option. The rowspan values
							// needed be increased in case of usage useColSpanStyle: true
							if (gHead[i] && gHead[i].groupHeaders.length) {
								$j.setGroupHeaders.call($self, gHead[i]);
							}
						}
					}
					if (pivotOpt.frozenStaticCols) {
						$j.setFrozenColumns.call($self);
					}
				}

				if (typeof data === "string") {
					$.ajax($.extend({
						url: data,
						dataType: "json",
						success: function (data1) {
							data = jgrid.getAccessor(data1, ajaxOpt && ajaxOpt.reader ? ajaxOpt.reader : "rows");
							pivot();
						}
					}, ajaxOpt || {}));
				} else {
					pivot();
				}
			});
		}
	});
	// end module grid.pivot

	/**
	 * jqGrid extension for SubGrid Data
	 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com
	 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	**/
	// begin module grid.subgrid
	var subGridFeedback = function () {
			var args = $.makeArray(arguments);
			args[0] = "subGrid" + args[0].charAt(0).toUpperCase() + args[0].substring(1);
			args.unshift("");
			args.unshift("");
			args.unshift(this.p);
			return jgrid.feedback.apply(this, args);
		},
		collapseOrExpand = function (rowid, className) {
			return this.each(function () {
				if (this.grid && rowid != null && this.p.subGrid === true) {
					var tr = $(this).jqGrid("getInd", rowid, true);
					$(tr).find(">td." + className).trigger("click");
				}
			});
		};
	jgrid.extend({
		setSubGrid: function () {
			return this.each(function () {
				var p = this.p, cm = p.subGridModel[0], i;
				p.subGridOptions = $.extend({
					expandOnLoad: false,
					delayOnLoad: 50,
					selectOnExpand: false,
					selectOnCollapse: false,
					reloadOnExpand: true
				}, p.subGridOptions || {});
				p.colNames.unshift("");
				p.colModel.unshift({
					name: "subgrid",
					width: jgrid.cell_width ? p.subGridWidth + p.cellLayout : p.subGridWidth,
					labelClasses: "jqgh_subgrid",
					sortable: false,
					resizable: false,
					hidedlg: true,
					search: false,
					fixed: true,
					frozen: true
				});
				if (cm) {
					cm.align = $.extend([], cm.align || []);
					for (i = 0; i < cm.name.length; i++) {
						cm.align[i] = cm.align[i] || "left";
					}
				}
			});
		},
		addSubGridCell: function (pos, iRow, rowid, item) {
			var self = this[0], subGridOptions = self.p.subGridOptions,
				hasSubgrid = $.isFunction(subGridOptions.hasSubgrid) ?
					subGridOptions.hasSubgrid.call(self, { rowid: rowid, iRow: iRow, iCol: pos, data: item }) :
					true;
			return self == null || self.p == null || subGridOptions == null ? "" :
					"<td role='gridcell' class='" + base.getGuiStyles.call(this, "subgrid.tdStart", hasSubgrid ? "ui-sgcollapsed sgcollapsed" : "") + "' " +
					self.formatCol(pos, iRow) + ">" +
					(hasSubgrid ? "<div class='" + base.getGuiStyles.call(this, "subgrid.buttonDiv", "sgbutton-div") +
						"'><a role='button' class='" + base.getGuiStyles.call(this, "subgrid.button", "sgbutton") +
						"'><span class='" + jgrid.mergeCssClasses(subGridOptions.commonIconClass, subGridOptions.plusicon) + "'></span></a></div>" : "&nbsp;") +
					"</td>";
		},
		addSubGrid: function (pos, sind) {
			return this.each(function () {
				var ts = this, p = ts.p, cm = p.subGridModel[0],
					getSubgridStyle = function (name, calsses) {
						return base.getGuiStyles.call(ts, "subgrid." + name, calsses || "");
					},
					thSubgridClasses = getSubgridStyle("thSubgrid", "ui-th-subgrid ui-th-column ui-th-" + p.direction),
					rowSubTableClasses = getSubgridStyle("rowSubTable", "ui-subtblcell"),
					rowClasses = getSubgridStyle("row", "ui-subgrid ui-row-" + p.direction),
					tdWithIconClasses = getSubgridStyle("tdWithIcon", "subgrid-cell"),
					tdDataClasses = getSubgridStyle("tdData", "subgrid-data"),
					subGridCell = function ($tr, cell, pos1) {
						var align = cm.align[pos1],
							$td = $("<td" +
								(align ? " style='text-align:" + align + ";'" : "") +
								"></td>").html(cell);
						$tr.append($td);
					},
					fillXmlBody = function (data, $tbody) {
						var sgmap = p.xmlReader.subgrid;
						$(sgmap.root + " " + sgmap.row, data).each(function () {
							var f, i, $tr = $("<tr class='" + rowSubTableClasses + "'></tr>");
							if (sgmap.repeatitems === true) {
								$(sgmap.cell, this).each(function (j) {
									subGridCell($tr, $(this).text() || "&#160;", j);
								});
							} else {
								f = cm.mapping || cm.name;
								if (f) {
									for (i = 0; i < f.length; i++) {
										subGridCell($tr, $(f[i], this).text() || "&#160;", i);
									}
								}
							}
							$tbody.append($tr);
						});
					},
					fillJsonBody = function (data, $tbody) {
						var $tr, i, j, f, cur, sgmap = p.jsonReader.subgrid,
							result = jgrid.getAccessor(data, sgmap.root);
						if (result != null) {
							for (i = 0; i < result.length; i++) {
								cur = result[i];
								$tr = $("<tr class='" + rowSubTableClasses + "'></tr>");
								if (sgmap.repeatitems === true) {
									if (sgmap.cell) {
										cur = cur[sgmap.cell];
									}
									for (j = 0; j < cur.length; j++) {
										subGridCell($tr, cur[j] || "&#160;", j);
									}
								} else {
									f = cm.mapping || cm.name;
									if (f.length) {
										for (j = 0; j < f.length; j++) {
											subGridCell($tr, cur[f[j]] || "&#160;", j);
										}
									}
								}
								$tbody.append($tr);
							}
						}
					},
					subGridXmlOrJson = function (sjxml, sbid, fullBody) {
						var $th, i,	subgridTableClasses = getSubgridStyle("legacyTable", "ui-jqgrid-legacy-subgrid" +
								(p.altRows === true && $(ts).jqGrid("isBootstrapGuiStyle") ? " table-striped" : "")),
							$table = $("<table" +
								(subgridTableClasses ? " class='" + subgridTableClasses + "'" : "") +
								"><thead></thead><tbody></tbody></table>"),
							$tr = $("<tr></tr>");
						for (i = 0; i < cm.name.length; i++) {
							$th = $("<th class='" + thSubgridClasses + "'></th>")
									.html(cm.name[i])
									.width(cm.width[i]);
							$tr.append($th);
						}
						$tr.appendTo($table[0].tHead);
						fullBody(sjxml, $($table[0].tBodies[0]));
						$("#" + jqID(p.id + "_" + sbid)).append($table);
						ts.grid.hDiv.loading = false;
						$("#load_" + jqID(p.id)).hide();
						return false;
					},
					populatesubgrid = function (rd) {
						var sid = $(rd).attr("id"), dp = { nd_: (new Date().getTime()) }, iCol, j;
						dp[p.prmNames.subgridid] = sid;
						if (!cm) {
							return false;
						}
						if (cm.params) {
							for (j = 0; j < cm.params.length; j++) {
								iCol = p.iColByName[cm.params[j]];
								if (iCol !== undefined) {
									dp[p.colModel[iCol].name] = $(rd.cells[iCol]).text().replace(/\&#160\;/ig, "");
								}
							}
						}
						if (!ts.grid.hDiv.loading) {
							ts.grid.hDiv.loading = true;
							$("#load_" + jqID(p.id)).show();
							if (!p.subgridtype) {
								p.subgridtype = p.datatype;
							}
							if ($.isFunction(p.subgridtype)) {
								p.subgridtype.call(ts, dp);
							} else {
								p.subgridtype = p.subgridtype.toLowerCase();
							}
							switch (p.subgridtype) {
								case "xml":
								case "json":
									$.ajax($.extend({
										type: p.mtype,
										url: $.isFunction(p.subGridUrl) ? p.subGridUrl.call(ts, dp) : p.subGridUrl,
										dataType: p.subgridtype,
										context: sid,
										data: jgrid.serializeFeedback.call(ts, p.serializeSubGridData, "jqGridSerializeSubGridData", dp),
										success: function (data) {
											$(ts.grid.eDiv).hide();
											subGridXmlOrJson(
												data,
												this,
												p.subgridtype === "xml" ? fillXmlBody : fillJsonBody
											);
										},
										error: function (jqXHR, textStatus, errorThrown) {
											var loadError = p.loadSubgridError === undefined ?
													p.loadError :
													p.loadSubgridError;
											if ($.isFunction(loadError)) {
												loadError.call(ts, jqXHR, textStatus, errorThrown);
											}
											// for compatibility only
											if (!p.subGridOptions.noEmptySubgridOnError) {
												subGridXmlOrJson(
													null,
													this,
													p.subgridtype === "xml" ? fillXmlBody : fillJsonBody
												);
											} else {
												ts.grid.hDiv.loading = false;
												$("#load_" + jqID(p.id)).hide();
											}
										}
									}, jgrid.ajaxOptions, p.ajaxSubgridOptions || {}));
									break;
							}
						}
						return false;
					},
					onClick = function () {
						var tr = $(this).parent("tr")[0], r = tr.nextSibling, rowid = tr.id, subgridDivId = p.id + "_" + rowid, atd,
							iconClass = function (iconName) {
								return jgrid.mergeCssClasses(p.subGridOptions.commonIconClass, p.subGridOptions[iconName]);
							},
							nhc = 1;
						$.each(p.colModel, function () {
							if (this.hidden === true || this.name === "rn" || this.name === "cb") {
								// ??? probably one should don't calculate hidden columns of subgrid?
								// (remove this.hidden === true part from the if) ???
								nhc++;
							}
						});
						if ($(this).hasClass("sgcollapsed")) {
							if (p.subGridOptions.reloadOnExpand === true || (p.subGridOptions.reloadOnExpand === false && !$(r).hasClass('ui-subgrid'))) {
								atd = pos >= 1 ? "<td colspan='" + pos + "'>&#160;</td>" : "";
								if (!subGridFeedback.call(ts, "beforeExpand", subgridDivId, rowid)) {
									return;
								}
								$(tr).after("<tr role='row' class='" + rowClasses + "'>" + atd + "<td class='" + tdWithIconClasses +
									"'><span class='" + iconClass("openicon") + "'></span></td><td colspan='" + parseInt(p.colNames.length - nhc, 10) +
									"' class='" + tdDataClasses + "'><div id='" + subgridDivId + "' class='tablediv'></div></td></tr>");
								$(ts).triggerHandler("jqGridSubGridRowExpanded", [subgridDivId, rowid]);
								if ($.isFunction(p.subGridRowExpanded)) {
									p.subGridRowExpanded.call(ts, subgridDivId, rowid);
								} else {
									populatesubgrid(tr);
								}
							} else {
								$(r).show();
							}
							$(this).html(
								"<div class='" + base.getGuiStyles.call(ts, "subgrid.buttonDiv", "sgbutton-div") +
								"'><a role='button' class='" + base.getGuiStyles.call(ts, "subgrid.button", "sgbutton") +
								"'><span class='" + iconClass("minusicon") + "'></span></a></div>"
							).removeClass("sgcollapsed").addClass("sgexpanded");
							if (p.subGridOptions.selectOnExpand) {
								$(ts).jqGrid("setSelection", rowid);
							}
						} else if ($(this).hasClass("sgexpanded")) {
							if (!subGridFeedback.call(ts, "beforeCollapse", subgridDivId, rowid)) {
								return;
							}
							if (p.subGridOptions.reloadOnExpand === true) {
								$(r).remove(".ui-subgrid");
							} else if ($(r).hasClass("ui-subgrid")) { // incase of dynamic deleting
								$(r).hide();
							}
							$(this).html(
								"<div class='" + base.getGuiStyles.call(ts, "subgrid.buttonDiv", "sgbutton-div") +
								"'><a role='button' class='" + base.getGuiStyles.call(ts, "subgrid.button", "sgbutton") +
								"'><span class='" + iconClass("plusicon") + "'></span></a></div>"
							).removeClass("sgexpanded").addClass("sgcollapsed");
							if (p.subGridOptions.selectOnCollapse) {
								$(ts).jqGrid("setSelection", rowid);
							}
						}
						return false;
					},
					len,
					tr1,
					$td1,
					iRow = 1;

				if (!ts.grid) {
					return;
				}

				len = ts.rows.length;
				if (sind !== undefined && sind > 0) {
					iRow = sind;
					len = sind + 1;
				}
				while (iRow < len) {
					tr1 = ts.rows[iRow];
					if ($(tr1).hasClass("jqgrow")) {
						$td1 = $(tr1.cells[pos]);
						if ($td1.hasClass("ui-sgcollapsed")) {
							if (p.scroll) {
								$td1.unbind("click");
							}
							$td1.bind("click", onClick);
						}
					}
					iRow++;
				}
				if (p.subGridOptions.expandOnLoad === true) {
					$(ts.rows).filter(".jqgrow").each(function (index, row) {
						$(row.cells[0]).click();
					});
				}
				ts.subGridXml = function (xml, sid) {
					return subGridXmlOrJson(xml, sid, fillXmlBody);
				};
				ts.subGridJson = function (json, sid) {
					return subGridXmlOrJson(json, sid, fillJsonBody);
				};
			});
		},
		expandSubGridRow: function (rowid) {
			return collapseOrExpand.call(this, rowid, "sgcollapsed");
		},
		collapseSubGridRow: function (rowid) {
			return collapseOrExpand.call(this, rowid, "sgexpanded");
		},
		toggleSubGridRow: function (rowid) {
			return collapseOrExpand.call(this, rowid, "ui-sgcollapsed");
		}
	});
	// end module grid.subgrid

	/**
	 Transform a table to a jqGrid.
	 Peter Romianowski <peter.romianowski@optivo.de>
	 If the first column of the table contains checkboxes or
	 radiobuttons then the jqGrid is made selectable.
	*/
	// begin module grid.tbltogrid
	window.tableToGrid = function (selector, options) {
		$(selector).each(function () {
			var self = this, $self = $(this), w, inputCheckbox, inputRadio, selectMultiple, selectSingle, selectable, a, id,
				colModel = [], colNames = [], data = [], rowIds = [], rowChecked = [];
			if (self.grid) {
				return;//Adedd by Tony Tomov
			}
			// This is a small "hack" to make the width of the jqGrid 100%
			$self.width("99%");
			w = $self.width();

			// Text whether we have single or multi select
			inputCheckbox = $("tr td:first-child input[type=checkbox]:first", $self);
			inputRadio = $("tr td:first-child input[type=radio]:first", $self);
			selectMultiple = inputCheckbox.length > 0;
			selectSingle = !selectMultiple && inputRadio.length > 0;
			selectable = selectMultiple || selectSingle;
			//var inputName = inputCheckbox.attr("name") || inputRadio.attr("name");

			// Build up the columnModel and the data
			$("th", $self).each(function () {
				if (colModel.length === 0 && selectable) {
					colModel.push({
						name: "__selection__",
						index: "__selection__",
						width: 0,
						hidden: true
					});
					colNames.push("__selection__");
				} else {
					colModel.push({
						name: $(this).attr("id") || $.trim($.jgrid.stripHtml($(this).html())).split(" ").join("_"),
						index: $(this).attr("id") || $.trim($.jgrid.stripHtml($(this).html())).split(" ").join("_"),
						width: $(this).width() || 150
					});
					colNames.push($(this).html());
				}
			});
			$("tbody > tr", $self).each(function () {
				var row = {}, rowPos = 0;
				$("td", $(this)).each(function () {
					if (rowPos === 0 && selectable) {
						var input = $("input", $(this)), rowId = input.attr("value");
						rowIds.push(rowId || data.length);
						if (input.is(":checked")) {
							rowChecked.push(rowId);
						}
						row[colModel[rowPos].name] = input.attr("value");
					} else {
						row[colModel[rowPos].name] = $(this).html();
					}
					rowPos++;
				});
				if (rowPos > 0) {
					data.push(row);
				}
			});

			// Clear the original HTML table
			$self.empty();

			$self.jqGrid($.extend({
				datatype: "local",
				width: w,
				colNames: colNames,
				colModel: colModel,
				multiselect: selectMultiple
				//inputName: inputName,
				//inputValueCol: imputName != null ? "__selection__" : null
			}, options || {}));

			// Add data
			for (a = 0; a < data.length; a++) {
				id = null;
				if (rowIds.length > 0) {
					id = rowIds[a];
					if (id && id.replace) {
						// We have to do this since the value of a checkbox
						// or radio button can be anything
						id = encodeURIComponent(id).replace(/[.\-%]/g, "_");
					}
				}
				if (id === null) {
					id = $.jgrid.randId();
				}
				$self.jqGrid("addRowData", id, data[a]);
			}

			// Set the selection
			for (a = 0; a < rowChecked.length; a++) {
				$self.jqGrid("setSelection", rowChecked[a]);
			}
		});
	};
	// end module grid.tbltogrid

	/**
	 * jqGrid extension - Tree Grid
	 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com
	 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	**/
	// begin module grid.treegrid
	var treeGridFeedback = function () {
			var args = $.makeArray(arguments);
			args[0] = "treeGrid" + args[0].charAt(0).toUpperCase() + args[0].substring(1);
			args.unshift("");
			args.unshift("");
			args.unshift(this.p);
			return jgrid.feedback.apply(this, args);
		};
	jgrid.extend({
		setTreeNode: function () {
			// TODO: Move the code in setTreeGrid because it uses currently no parameters
			// and it's don't make any actions with specific row
			return this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var expanded = p.treeReader.expanded_field,
					isLeaf = p.treeReader.leaf_field,
					beforeSelectRow = function (e, rowid, eOrg) {
						if (eOrg != null) {
							var $target = $(eOrg.target),
								$td = $target.closest("tr.jqgrow>td"),
								$tr = $td.parent(),
								expendOrCollaps = function () {
									var item = p.data[p._index[stripPref(p.idPrefix, rowid)]],
										collapseOrExpand = item[expanded] ? "collapse" : "expand";
									if (!item[isLeaf]) {
										base[collapseOrExpand + "Row"].call($self, item, $tr);
										base[collapseOrExpand + "Node"].call($self, item, $tr);
									}
								};
							if ($target.is("div.treeclick")) {
								expendOrCollaps();
							} else if (p.ExpandColClick) {
								if ($td.length > 0 && $target.closest("span.cell-wrapper", $td).length > 0) {
									expendOrCollaps();
								}
							}
							return true; // allow selection
						}
					};

				$self.unbind("jqGridBeforeSelectRow.setTreeNode");
				$self.bind("jqGridBeforeSelectRow.setTreeNode", beforeSelectRow);

			});
		},
		setTreeGrid: function () {
			return this.each(function () {
				var $t = this, p = $t.p, nm, key, tkey, dupcols = [],
					boolProp = ["leaf_field", "expanded_field", "loaded"];
				if (!p.treeGrid) { return; }
				if (!p.treedatatype) { $.extend($t.p, { treedatatype: p.datatype }); }
				p.subGrid = false;
				p.altRows = false;
				p.pgbuttons = false;
				p.pginput = false;
				p.gridview = true;
				if (p.rowTotal === null) { p.rowNum = p.maxRowNum; }
				p.rowList = [];
				//pico = "ui-icon-triangle-1-" + (p.direction==="rtl" ? "w" : "e");
				//p.treeIcons = $.extend({plus:pico,minus:"ui-icon-triangle-1-s",leaf:"ui-icon-radio-off"},p.treeIcons || {});
				p.treeIcons.plus = p.direction === "rtl" ? p.treeIcons.plusRtl : p.treeIcons.plusLtr;
				if (p.treeGridModel === "nested") {
					p.treeReader = $.extend({
						level_field: "level",
						left_field: "lft",
						right_field: "rgt",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						loaded: "loaded",
						icon_field: "icon"
					}, p.treeReader);
				} else if (p.treeGridModel === "adjacency") {
					p.treeReader = $.extend({
						level_field: "level",
						parent_id_field: "parent",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						loaded: "loaded",
						icon_field: "icon"
					}, p.treeReader);
				}
				for (key in p.colModel) {
					if (p.colModel.hasOwnProperty(key)) {
						nm = p.colModel[key].name;
						for (tkey in p.treeReader) {
							if (p.treeReader.hasOwnProperty(tkey) && p.treeReader[tkey] === nm) {
								dupcols.push(nm);
							}
						}
					}
				}
				$.each(p.treeReader, function (prop) {
					var name = String(this);
					if (name && $.inArray(name, dupcols) === -1) {
						if ($.inArray(prop, boolProp) >= 0) {
							p.additionalProperties.push({
								name: name,
								search: false,
								convert: function (data) {
									return data === true || String(data).toLowerCase() === "true" || String(data) === "1" ? true : data;
								}
							});
						} else {
							p.additionalProperties.push(name);
						}
					}
				});
			});
		},
		expandRow: function (record) {
			this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var expanded = p.treeReader.expanded_field, rowid = record[p.localReader.id]; // without prefix
				if (!treeGridFeedback.call($t, "beforeExpandRow", { rowid: rowid, item: record })) { return; }
				var childern = base.getNodeChildren.call($self, record);
				$(childern).each(function () {
					var id = p.idPrefix + getAccessor(this, p.localReader.id);
					$(base.getGridRowById.call($self, id)).css("display", "");
					if (this[expanded]) {
						base.expandRow.call($self, this);
					}
				});
				treeGridFeedback.call($t, "afterExpandRow", { rowid: rowid, item: record });
			});
		},
		collapseRow: function (record) {
			this.each(function () {
				var $t = this, $self = $($t), p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var expanded = p.treeReader.expanded_field, rowid = record[p.localReader.id]; // without prefix
				if (!treeGridFeedback.call($t, "beforeCollapseRow", { rowid: rowid, item: record })) { return; }
				var childern = base.getNodeChildren.call($self, record);
				$(childern).each(function () {
					var id = p.idPrefix + getAccessor(this, p.localReader.id);
					$(base.getGridRowById.call($self, id)).css("display", "none");
					if (this[expanded]) {
						base.collapseRow.call($self, this);
					}
				});
				treeGridFeedback.call($t, "afterCollapseRow", { rowid: rowid, item: record });
			});
		},
		// NS ,adjacency models
		getRootNodes: function () {
			var result = [];
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				switch (p.treeGridModel) {
				case "nested":
					var level = p.treeReader.level_field;
					$(p.data).each(function () {
						if (parseInt(this[level], 10) === parseInt(p.tree_root_level, 10)) {
							result.push(this);
						}
					});
					break;
				case "adjacency":
					var parentId = p.treeReader.parent_id_field;
					$(p.data).each(function () {
						if (this[parentId] === null || String(this[parentId]).toLowerCase() === "null") {
							result.push(this);
						}
					});
					break;
				}
			});
			return result;
		},
		getNodeDepth: function (rc) {
			var ret = null;
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				switch (p.treeGridModel) {
				case "nested":
					var level = p.treeReader.level_field;
					ret = parseInt(rc[level], 10) - parseInt(p.tree_root_level, 10);
					break;
				case "adjacency":
					ret = base.getNodeAncestors.call($($t), rc).length;
					break;
				}
			});
			return ret;
		},
		getNodeParent: function (rc) {
			// var $t = this instanceof $ && this.length > 0 ? this[0] : this;
			var $t = this[0];
			if (!$t || !$t.grid || $t.p == null || !$t.p.treeGrid || rc == null) { return null; }
			var p = $t.p, treeReader = p.treeReader, parentIdName = treeReader.parent_id_field, parentId = rc[parentIdName];
			if (p.treeGridModel === "nested") {
				var result = null,
					lftc = treeReader.left_field,
					rgtc = treeReader.right_field,
					levelc = treeReader.level_field,
					lft = parseInt(rc[lftc], 10), rgt = parseInt(rc[rgtc], 10), level = parseInt(rc[levelc], 10);

				$(p.data).each(function () {
					if (parseInt(this[levelc], 10) === level - 1 && parseInt(this[lftc], 10) < lft && parseInt(this[rgtc], 10) > rgt) {
						result = this;
						return false;
					}
				});
				return result;
			}
			if (parentId === null || parentId === "null") { return null; }
			var iParent = p._index[parentId];
			return iParent !== undefined ? p.data[iParent] : null;
		},
		getNodeChildren: function (rc) {
			var result = [];
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				switch (p.treeGridModel) {
				case "nested":
					var lftc = p.treeReader.left_field, rgtc = p.treeReader.right_field, levelc = p.treeReader.level_field,
						lft = parseInt(rc[lftc], 10),
						rgt = parseInt(rc[rgtc], 10),
						level = parseInt(rc[levelc], 10);
					$(p.data).each(function () {
						if (parseInt(this[levelc], 10) === level + 1 && parseInt(this[lftc], 10) > lft && parseInt(this[rgtc], 10) < rgt) {
							result.push(this);
						}
					});
					break;
				case "adjacency":
					var parentId = p.treeReader.parent_id_field, dtid = p.localReader.id;
					$(p.data).each(function () {
						if (String(this[parentId]) === String(rc[dtid])) {
							result.push(this);
						}
					});
					break;
				}
			});
			return result;
		},
		getFullTreeNode: function (rc) {
			var result = [];
			this.each(function () {
				var $t = this, p = $t.p, len;
				if (!$t.grid || !p.treeGrid) { return; }
				switch (p.treeGridModel) {
				case "nested":
					var lftc = p.treeReader.left_field, rgtc = p.treeReader.right_field, levelc = p.treeReader.level_field,
						lft = parseInt(rc[lftc], 10),
						rgt = parseInt(rc[rgtc], 10),
						level = parseInt(rc[levelc], 10);
					$(p.data).each(function () {
						if (parseInt(this[levelc], 10) >= level && parseInt(this[lftc], 10) >= lft && parseInt(this[lftc], 10) <= rgt) {
							result.push(this);
						}
					});
					break;
				case "adjacency":
					if (rc) {
						result.push(rc);
						var parentId = p.treeReader.parent_id_field, dtid = p.localReader.id;
						$(p.data).each(function () {
							var i;
							len = result.length;
							for (i = 0; i < len; i++) {
								if (String(result[i][dtid]) === String(this[parentId])) {
									result.push(this);
									break;
								}
							}
						});
					}
					break;
				}
			});
			return result;
		},
		// End NS, adjacency Model
		getNodeAncestors: function (rc) {
			var ancestors = [];
			this.each(function () {
				var $t = this, $self = $($t), getNodeParent = base.getNodeParent;
				if (!$t.grid || !$t.p.treeGrid) { return; }
				var parent = getNodeParent.call($self, rc);
				while (parent) {
					ancestors.push(parent);
					parent = getNodeParent.call($self, parent);
				}
			});
			return ancestors;
		},
		isVisibleNode: function (rc) {
			var result = true;
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var ancestors = base.getNodeAncestors.call($($t), rc), expanded = p.treeReader.expanded_field;
				$(ancestors).each(function () {
					result = result && this[expanded];
					if (!result) { return false; }
				});
			});
			return result;
		},
		isNodeLoaded: function (rc) {
			var result;
			this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var isLeaf = p.treeReader.leaf_field, loaded = p.treeReader.loaded;
				if (rc !== undefined) {
					if (rc[loaded] !== undefined) {
						result = rc[loaded];
					} else if (rc[isLeaf] || base.getNodeChildren.call($($t), rc).length > 0) {
						result = true;
					} else {
						result = false;
					}
				} else {
					result = false;
				}
			});
			return result;
		},
		expandNode: function (rc) {
			return this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var expanded = p.treeReader.expanded_field, parent = p.treeReader.parent_id_field, loaded = p.treeReader.loaded,
					level = p.treeReader.level_field,
					lft = p.treeReader.left_field,
					rgt = p.treeReader.right_field;

				if (!rc[expanded]) {
					var id = getAccessor(rc, p.localReader.id);
					if (!treeGridFeedback.call($t, "beforeExpandNode", { rowid: id, item: rc })) { return; }
					var rc1 = $("#" + p.idPrefix + jqID(id), $t.grid.bDiv)[0],
						position = p._index[id];
					if (p.treedatatype === "local" || base.isNodeLoaded.call($($t), p.data[position])) {
						rc[expanded] = true;
						$("div.treeclick", rc1).removeClass(p.treeIcons.plus + " tree-plus").addClass(p.treeIcons.commonIconClass).addClass(p.treeIcons.minus + " tree-minus");
					} else if (!$t.grid.hDiv.loading) {
						rc[expanded] = true;
						$("div.treeclick", rc1).removeClass(p.treeIcons.plus + " tree-plus").addClass(p.treeIcons.commonIconClass).addClass(p.treeIcons.minus + " tree-minus");
						// set the value which will be used during processing of the server response
						// in readInput
						p.treeANode = rc1.rowIndex;
						p.datatype = p.treedatatype;
						base.setGridParam.call($($t), {
							postData: p.treeGridModel === "nested" ?
									{ nodeid: id, n_level: rc[level], n_left: rc[lft], n_right: rc[rgt] } :
									{ nodeid: id, n_level: rc[level], parentid: rc[parent] }
						});
						$($t).trigger("reloadGrid");
						rc[loaded] = true;
						base.setGridParam.call($($t), {
							postData: p.treeGridModel === "nested" ?
									{ nodeid: "", n_level: "", n_left: "", n_right: "" } :
									{ nodeid: "", n_level: "", parentid: "" }
						});
					}
					treeGridFeedback.call($t, "afterExpandNode", { rowid: id, item: rc });
				}
			});
		},
		collapseNode: function (rc) {
			return this.each(function () {
				var $t = this, p = $t.p;
				if (!$t.grid || !p.treeGrid) { return; }
				var expanded = p.treeReader.expanded_field;
				if (rc[expanded]) {
					var id = getAccessor(rc, p.localReader.id);
					if (!treeGridFeedback.call($t, "beforeCollapseNode", { rowid: id, item: rc })) { return; }
					rc[expanded] = false;
					var rc1 = $("#" + p.idPrefix + jqID(id), $t.grid.bDiv)[0];
					$("div.treeclick", rc1).removeClass(p.treeIcons.minus + " tree-minus").addClass(p.treeIcons.commonIconClass).addClass(p.treeIcons.plus + " tree-plus");
					treeGridFeedback.call($t, "afterCollapseNode", { rowid: id, item: rc });
				}
			});
		},
		SortTree: function (sortname, newDir, st, datefmt) {
			return this.each(function () {
				var $t = this, p = $t.p, $self = $($t);
				if (!$t.grid || !p.treeGrid) { return; }
				var i, len, rec, records = [], rt = base.getRootNodes.call($self), query = jgrid.from.call($t, rt);
				// Sorting roots
				query.orderBy(sortname, newDir, st, datefmt);
				var roots = query.select();

				// Sorting children
				for (i = 0, len = roots.length; i < len; i++) {
					rec = roots[i];
					records.push(rec);
					base.collectChildrenSortTree.call($self, records, rec, sortname, newDir, st, datefmt);
				}
				$.each(records, function (index) {
					var id = getAccessor(this, p.localReader.id);
					$($t.rows[index]).after($self.find(">tbody>tr#" + jqID(id)));
				});
			});
		},
		collectChildrenSortTree: function (records, rec, sortname, newDir, st, datefmt) {
			return this.each(function () {
				var $t = this, $self = $($t);
				if (!$t.grid || !$t.p.treeGrid) { return; }
				var i, len, child, ch = base.getNodeChildren.call($self, rec), query = jgrid.from.call($t, ch);
				query.orderBy(sortname, newDir, st, datefmt);
				var children = query.select();
				for (i = 0, len = children.length; i < len; i++) {
					child = children[i];
					records.push(child);
					base.collectChildrenSortTree.call($self, records, child, sortname, newDir, st, datefmt);
				}
			});
		},
		// experimental
		setTreeRow: function (rowid, data) {
			var success = false;
			this.each(function () {
				var t = this;
				if (!t.grid || !t.p.treeGrid) { return; }
				success = base.setRowData.call($(t), rowid, data);
			});
			return success;
		},
		delTreeNode: function (rowid) {
			return this.each(function () {
				var $t = this, p = $t.p, myright, width, res, key, rid = p.localReader.id, i, $self = $($t),
					left = p.treeReader.left_field,
					right = p.treeReader.right_field;
				if (!$t.grid || !p.treeGrid) { return; }
				var rc = p._index[rowid];
				if (rc !== undefined) {
					// nested
					myright = parseInt(p.data[rc][right], 10);
					width = myright - parseInt(p.data[rc][left], 10) + 1;
					var dr = base.getFullTreeNode.call($self, p.data[rc]);
					if (dr.length > 0) {
						for (i = 0; i < dr.length; i++) {
							base.delRowData.call($self, dr[i][rid]);
						}
					}
					if (p.treeGridModel === "nested") {
						// ToDo - update grid data
						res = jgrid.from.call($t, p.data)
							.greater(left, myright, { stype: "integer" })
							.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][left] = parseInt(res[key][left], 10) - width;
								}
							}
						}
						res = jgrid.from.call($t, p.data)
							.greater(right, myright, { stype: "integer" })
							.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][right] = parseInt(res[key][right], 10) - width;
								}
							}
						}
					}
				}
			});
		},
		addChildNode: function (nodeid, parentid, data, expandData) {
			//return this.each(function(){
			var $self = $(this), $t = $self[0], p = $t.p, getInd = base.getInd;
			if (data) {
				// we suppose tha the id is autoincremet and
				var method, parentindex, parentdata, parentlevel, i, len, max = 0, rowind = parentid, leaf, maxright,
					expanded = p.treeReader.expanded_field, isLeaf = p.treeReader.leaf_field, level = p.treeReader.level_field,
					//icon = p.treeReader.icon_field,
					parent = p.treeReader.parent_id_field,
					left = p.treeReader.left_field,
					right = p.treeReader.right_field,
					loaded = p.treeReader.loaded;
				if (expandData === undefined) { expandData = false; }
				if (nodeid == null) {
					i = p.data.length - 1;
					if (i >= 0) {
						while (i >= 0) { max = Math.max(max, parseInt(p.data[i][p.localReader.id], 10)); i--; }
					}
					nodeid = max + 1;
				}
				var prow = getInd.call($self, parentid);
				leaf = false;
				// if not a parent we assume root
				if (parentid === undefined || parentid === null || parentid === "") {
					parentid = null;
					rowind = null;
					method = "last";
					parentlevel = p.tree_root_level;
					i = p.data.length + 1;
				} else {
					method = "after";
					parentindex = p._index[parentid];
					parentdata = p.data[parentindex];
					parentid = parentdata[p.localReader.id];
					i = getInd.call($self, parentid);
					parentlevel = parseInt(parentdata[level], 10) + 1;
					var childs = base.getFullTreeNode.call($self, parentdata);
					// if there are child nodes get the last index of it
					if (childs.length) {
						// find the max rowIndex of the children
						var iChild, iChildRow, childId;
						for (iChild = 0; iChild < childs.length; iChild++) {
							childId = childs[iChild][p.localReader.id];
							iChildRow = getInd.call($self, childId);
							if (iChildRow > i) {
								i = iChildRow;
								rowind = childId;
							}
						}
					}
					i++; // the next row after the parent or the last child
					// if the node is leaf
					if (parentdata[isLeaf]) {
						leaf = true;
						parentdata[expanded] = true;
						//var prow = getInd.call($self, parentid);
						$($t.rows[prow])
							.find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper")
							.end()
							.find("div.tree-leaf").removeClass(p.treeIcons.leaf + " tree-leaf").addClass(p.treeIcons.commonIconClass).addClass(p.treeIcons.minus + " tree-minus");
						p.data[parentindex][isLeaf] = false;
						parentdata[loaded] = true;
					}
				}
				len = i + 1;

				if (data[expanded] === undefined) { data[expanded] = false; }
				if (data[loaded] === undefined) { data[loaded] = false; }
				data[level] = parentlevel;
				if (data[isLeaf] === undefined) { data[isLeaf] = true; }
				if (p.treeGridModel === "adjacency") {
					data[parent] = parentid;
				}
				if (p.treeGridModel === "nested") {
					// this method requiere more attention
					var query, res, key;
					//maxright = parseInt(maxright,10);
					// ToDo - update grid data
					if (parentid !== null) {
						maxright = parseInt(parentdata[right], 10);
						query = jgrid.from.call($t, p.data);
						query = query.greaterOrEquals(right, maxright, { stype: "integer" });
						res = query.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][left] = res[key][left] > maxright ? parseInt(res[key][left], 10) + 2 : res[key][left];
									res[key][right] = res[key][right] >= maxright ? parseInt(res[key][right], 10) + 2 : res[key][right];
								}
							}
						}
						data[left] = maxright;
						data[right] = maxright + 1;
					} else {
						maxright = parseInt(base.getCol.call($self, right, false, "max"), 10);
						res = jgrid.from.call($t, p.data)
							.greater(left, maxright, { stype: "integer" })
							.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][left] = parseInt(res[key][left], 10) + 2;
								}
							}
						}
						res = jgrid.from.call($t, p.data)
							.greater(right, maxright, { stype: "integer" })
							.select();
						if (res.length) {
							for (key in res) {
								if (res.hasOwnProperty(key)) {
									res[key][right] = parseInt(res[key][right], 10) + 2;
								}
							}
						}
						data[left] = maxright + 1;
						data[right] = maxright + 2;
					}
				}
				if (parentid === null || base.isNodeLoaded.call($self, parentdata) || leaf) {
					base.addRowData.call($self, nodeid, data, method, rowind);
					base.setTreeNode.call($self, i, len);
				}
				if (parentdata && !parentdata[expanded] && expandData) {
					$($t.rows[prow])
						.find("div.treeclick")
						.click();
				}
			}
			//});
		}
	});
	// end module grid.treegrid

	/**
	 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
	 *
	 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
	 * Licensed under the MIT License:
	 * http://www.opensource.org/licenses/mit-license.php
	 *
	 * $Version: 2007.08.19 +r2
	 * Updated by Oleg Kiriljuk to support touch devices
	 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 */
	// begin module jqdnr
	var namespace = ".jqGrid", mouseDown = "mousedown", mouseMove = "mousemove", mouseUp = "mouseup",
		getMouseCoordinates = function (e) {
			var orgEvent = e.originalEvent, touches = orgEvent.targetTouches;
			if (touches) {
				touches = touches[0];
				return { x: touches.pageX, y: touches.pageY };
			}
			return { x: e.pageX, y: e.pageY };
		},
		jqDnR = {
			drag: function (e) {
				var d = e.data, $mainDialog = d.e, dnrMainDialog = d.dnr, $alsoResize = d.ar, dnrAlsoResize = d.dnrAr,
					xy = getMouseCoordinates(e);
				if (dnrMainDialog.k === "move") {
					$mainDialog.css({
						left: dnrMainDialog.X + xy.x - dnrMainDialog.pX,
						top: dnrMainDialog.Y + xy.y - dnrMainDialog.pY
					});
				} else {
					$mainDialog.css({
						width: Math.max(xy.x - dnrMainDialog.pX + dnrMainDialog.W, 0),
						height: Math.max(xy.y - dnrMainDialog.pY + dnrMainDialog.H, 0)
					});
					if (dnrAlsoResize) {
						$alsoResize.css({
							width: Math.max(xy.x - dnrAlsoResize.pX + dnrAlsoResize.W, 0),
							height: Math.max(xy.y - dnrAlsoResize.pY + dnrAlsoResize.H, 0)
						});
					}
				}
				return false;
			},
			stop: function () {
				//$mainDialog.css("opacity", dnr.o);
				$(document).unbind(mouseMove, jqDnR.drag).unbind(mouseUp, jqDnR.stop);
			}
		},
		init = function ($this, handle, actionName, alsoResize) {
			return $this.each(function () {
				handle = handle ? $(handle, $this) : $this;
				handle.bind(mouseDown, { e: $this, k: actionName }, function (e) {
					var d = e.data, p = {}, $inputDatePicker, $mainDialog, dnrMainDialog, $alsoResize, dnrAlsoResize,
						getCssProp = function ($elem, propertyName) {
							return parseInt($elem.css(propertyName), 10) || false;
						},
						getMainCssProp = function (propertyName) {
							return getCssProp($mainDialog, propertyName);
						},
						getAlsoResizeCssProp = function (propertyName) {
							return getCssProp($alsoResize, propertyName);
						},
						xy = getMouseCoordinates(e),
						eventData;

					if ($(e.target).hasClass("ui-jqdialog-titlebar-close") || $(e.target).parent().hasClass("ui-jqdialog-titlebar-close")) {
						//$(e.target).click();
						return;
					}

					$mainDialog = d.e;
					$alsoResize = alsoResize ? $(alsoResize) : false;
					// attempt utilization of dimensions plugin to fix IE issues
					if ($mainDialog.css("position") !== "relative") {
						try {
							// ???? probably one want to GET position and save it in p ?
							// the current implementation use always p = {}
							// probably one mean some additional work together with Dimensions Plugin (dimensions.js)
							$mainDialog.position(p);
						} catch (ignore) { }
					}
					dnrMainDialog = {
						X: p.left || getMainCssProp("left") || 0,
						Y: p.top || getMainCssProp("top") || 0,
						W: getMainCssProp("width") || $mainDialog[0].scrollWidth || 0,
						H: getMainCssProp("height") || $mainDialog[0].scrollHeight || 0,
						pX: xy.x,
						pY: xy.y,
						k: d.k
						//o:$mainDialog.css("opacity")
					};
					// also resize
					if ($alsoResize && d.k !== "move") {
						dnrAlsoResize = {
							X: p.left || getAlsoResizeCssProp("left") || 0,
							Y: p.top || getAlsoResizeCssProp("top") || 0,
							W: $alsoResize[0].offsetWidth || getAlsoResizeCssProp("width") || 0,
							H: $alsoResize[0].offsetHeight || getAlsoResizeCssProp("height") || 0,
							pX: xy.x,
							pY: xy.y,
							k: d.k
						};
					} else {
						dnrAlsoResize = false;
					}
					//E.css({opacity:0.8});
					$inputDatePicker = $mainDialog.find("input.hasDatepicker");
					if ($inputDatePicker.length > 0) {
						try {
							$inputDatePicker.datepicker("hide");
						} catch (ignore) { }
					}
					eventData = {
						e: $mainDialog,
						dnr: dnrMainDialog,
						ar: $alsoResize,
						dnrAr: dnrAlsoResize
					};
					$(document).bind(mouseMove, eventData, jqDnR.drag);
					$(document).bind(mouseUp, eventData, jqDnR.stop);
					return false;
				});
			});
		};

	// navigator.maxTouchPoints == 2, navigator.msMaxTouchPoints
	// https://msdn.microsoft.com/en-us/library/ie/dn304886(v=vs.85).aspx
	if (window.PointerEvent) {
		mouseDown += namespace + " pointerdown" + namespace;
		mouseMove += namespace + " pointermove" + namespace;
		mouseUp += namespace + " pointerup" + namespace;
	} else if (window.MSPointerEvent) {
		mouseDown += namespace + " mspointerdown" + namespace;
		mouseMove += namespace + " mspointermove" + namespace;
		mouseUp += namespace + " mspointerup";
	} else { //if (Object.prototype.hasOwnProperty.call(document, "ontouchend")) { or "ontouchstart" in document.documentElement or "ontouchstart" in window
		mouseDown += namespace + " touchstart" + namespace;
		mouseMove += namespace + " touchmove" + namespace;
		mouseUp += namespace + " touchend" + namespace;
	}

	$.jqDnR = jqDnR;

	$.fn.jqDrag = function (handle) {
		return init(this, handle, "move");
	};

	$.fn.jqResize = function (handle, alsoResize) {
		return init(this, handle, "resize", alsoResize);
	};
	// end module jqdnr

	/**
	 * jqModal - Minimalist Modaling with jQuery
	 *   (http://dev.iceburg.net/jquery/jqmodal/)
	 *
	 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
	 * Dual licensed under the MIT and GPL licenses:
	 *   http://www.opensource.org/licenses/mit-license.php
	 *   http://www.gnu.org/licenses/gpl.html
	 *
	 * $Version: 07/06/2008 +r13
	 * Changed by Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * Copyright (c) 2014-2016, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 */
	// begin module jqmodal
	var jqmHashLength = 0,
		jqmHash,
		createdModals = [],
		setFocusOnFirstVisibleInput = function (h) {
			try {
				$(":input:visible", h.w).first().focus();
			} catch (ignore) {}
		},
		setFocus = function (h) {
			setFocusOnFirstVisibleInput(h);
		},
		keyOrMouseEventHandler = function (e) {
			var activeModal = jqmHash[createdModals[createdModals.length - 1]],
				modal = !$(e.target).parents(".jqmID" + activeModal.s)[0],
				targetOffset = $(e.target).offset(),
				eX = e.pageX !== undefined ? e.pageX : targetOffset.left,
				eY = e.pageY !== undefined ? e.pageY : targetOffset.top,
				isEventInsideOfModal = function () {
					var isInside = false;
					$(".jqmID" + activeModal.s).each(function () {
						var $self = $(this), offset = $self.offset();
						// mouse event have e.pageX and e.pageY
						// keyboard event have e.type == "keydown" or "keypress",
						// e.pageX and e.pageY are undefined and one can use
						// $(e.target).offset()
						if (offset.top <= eY && eY <= offset.top + $self.height() &&
								offset.left <= eX && eX <= offset.left + $self.width()) {
							isInside = true;
							return false; // stop enumeration
						}
					});
					return isInside;
				};
			if (e.type !== "mousedown" && isEventInsideOfModal()) {
				// allows keyboard events inside of the modal
				return true;
			}
			if (e.type === "mousedown" && modal) {
				if (isEventInsideOfModal()) {
					modal = false;
				}
				if (modal && !$(e.target).is(":input")) {
					setFocusOnFirstVisibleInput(activeModal);
				}
			}
			return !modal;
		},
		bindOrUnbindEvents = function (bindOrUnbind) {
			// bindOrUnbind is either "bind" or "unbind" string
			$(document)[bindOrUnbind]("keypress keydown mousedown", keyOrMouseEventHandler);
		},
		registerHideOrShow = function (w, trigger, key) {
			return w.each(function () {
				var jqm = this._jqm;
				$(trigger).each(function () {
					if (!this[key]) {
						this[key] = [];
						$(this).click(function () {
							var i, method, propertyName, methods = ["jqmShow", "jqmHide"];
							for (i = 0; i < methods.length; i++) {
								method = methods[i];
								for (propertyName in this[method]) {
									if (this[method].hasOwnProperty(propertyName) && jqmHash[this[method][propertyName]]) {
										jqmHash[this[method][propertyName]].w[method](this);
									}
								}
							}
							return false;
						});
					}
					this[key].push(jqm);
				});
			});
		};

	$.fn.jqm = function (o) {
		var p = {
			overlay: 50,
			closeoverlay: false,
			overlayClass: "jqmOverlay",
			closeClass: "jqmClose",
			trigger: ".jqModal",
			ajax: false,
			ajaxText: "",
			target: false,
			modal: false,
			toTop: false,
			onShow: false,
			onHide: false,
			onLoad: false
		};
		return this.each(function () {
			if (this._jqm) {
				jqmHash[this._jqm].c = $.extend({}, jqmHash[this._jqm].c, o);
				return jqmHash[this._jqm].c;
			}
			jqmHashLength++;
			this._jqm = jqmHashLength;
			jqmHash[jqmHashLength] = {
				// comment from https://github.com/briceburg/jqModal/blob/master/jqModal.js
				// hash object;
				//  w: (jQuery object) The modal element
				//  c: (object) The modal's options object
				//  o: (jQuery object) The overlay element
				//  t: (DOM object) The triggering element
				c: $.extend(p, $.jqm.params, o),
				a: false,
				w: $(this).addClass("jqmID" + jqmHashLength),
				s: jqmHashLength // used as id too
			};
			if (p.trigger) {
				$(this).jqmAddTrigger(p.trigger);
			}
		});
	};

	$.fn.jqmAddClose = function (trigger) {
		return registerHideOrShow(this, trigger, "jqmHide");
	};
	$.fn.jqmAddTrigger = function (trigger) {
		return registerHideOrShow(this, trigger, "jqmShow");
	};
	$.fn.jqmShow = function (trigger) {
		return this.each(function () {
			$.jqm.open(this._jqm, trigger);
		});
	};
	$.fn.jqmHide = function (trigger) {
		return this.each(function () {
			$.jqm.close(this._jqm, trigger);
		});
	};

	$.jqm = {
		hash: {},
		open: function (s, trigger) {
			var h = jqmHash[s], $overlay, target, url,
				options = h.c, parentOffset = h.w.parent().offset(), left, top,
				cc = "." + options.closeClass,
				z = (parseInt(h.w.css("z-index"), 10));
			z = (z > 0) ? z : 3000;
			$overlay = $("<div></div>").css({
				height: "100%",
				width: "100%",
				position: "fixed",
				left: 0,
				top: 0,
				"z-index": z - 1,
				opacity: options.overlay / 100
			});
			if (h.a) {
				return false;
			}
			h.t = trigger;
			h.a = true;
			h.w.css("z-index", z);
			if ($(h.w[0].ownerDocument).data("ui-dialog-overlays")) {
				h.w.addClass("ui-dialog"); // hack to allow input inside of jQuery UI modal
			}
			if (options.modal) {
				if (!createdModals[0]) {
					setTimeout(function () {
						bindOrUnbindEvents("bind");
					}, 1);
				}
				createdModals.push(s);
			} else if (options.overlay > 0) {
				if (options.closeoverlay) {
					h.w.jqmAddClose($overlay);
				}
			} else {
				$overlay = false;
			}

			h.o = $overlay ? $overlay.addClass(options.overlayClass).prependTo("body") : false;

			if (options.ajax) {
				target = options.target || h.w;
				url = options.ajax;
				target = (typeof target === "string") ? $(target, h.w) : $(target);
				url = (url.substr(0, 1) === "@") ? $(trigger).attr(url.substring(1)) : url;
				target.html(options.ajaxText)
					.load(url, function () {
						if (options.onLoad) {
							options.onLoad.call(this, h);
						}
						if (cc) {
							h.w.jqmAddClose($(cc, h.w));
						}
						setFocus(h);
					});
			} else if (cc) {
				h.w.jqmAddClose($(cc, h.w));
			}

			if (options.toTop && h.o) {
				parentOffset = h.w.parent().offset();
				left = parseFloat(h.w.css("left") || 0);
				top = parseFloat(h.w.css("top") || 0);
				h.w.before('<span id="jqmP' + h.w[0]._jqm + '"></span>')
					.insertAfter(h.o);
				h.w.css({ top: parentOffset.top + top, left: parentOffset.left + left });
			}
			if (options.onShow) {
				options.onShow(h);
			} else {
				h.w.show();
			}
			setFocus(h);
			return false;
		},
		close: function (s) {
			var h = jqmHash[s];
			if (!h.a) {
				return false;
			}
			h.a = false;
			if (createdModals[0]) {
				createdModals.pop();
				if (!createdModals[0]) {
					bindOrUnbindEvents("unbind");
				}
			}
			if (h.c.toTop && h.o) {
				$("#jqmP" + h.w[0]._jqm)
					.after(h.w)
					.remove();
			}
			if (h.c.onHide) {
				h.c.onHide(h);
			} else {
				h.w.hide();
				if (h.o) {
					h.o.remove();
				}
			}
			return false;
		},
		params: {}
	};
	jqmHash = $.jqm.hash;
	// end module jqmodal

	/**
	 * formatter for values but most of the values if for jqGrid
	 * Some of this was inspired and based on how YUI does the table datagrid but in jQuery fashion
	 * we are trying to keep it as light as possible
	 * Joshua Burnett josh@9ci.com
	 * http://www.greenbill.com
	 *
	 * Changes from Tony Tomov tony@trirand.com
	 * Changed by Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
	 * Dual licensed under the MIT and GPL licenses:
	 * http://www.opensource.org/licenses/mit-license.php
	 * http://www.gnu.org/licenses/gpl-2.0.html
	 *
	**/
	// begin module jquery.fmatter
	$.fmatter = $.fmatter || {};
	var fmatter = $.fmatter,
		getOptionByName = function (colModel, name) {
			var option = colModel.formatoptions || {};
			if (option.hasOwnProperty(name)) {
				return option[name];
			} else {
				return (colModel.editoptions || {})[name];
			}
		},
		encodeAttr = function (v) {
			return String(v).replace(/\'/g, "&#39;");
		},
		parseCheckboxOptions = function (options) {
			var colModel = options.colModel || options.cm, checked, unchecked,
				title = colModel.title !== false ?
						" title='" + encodeAttr(options.colName || colModel.name) + "'" :
						"",
				getOption = function (name) {
					return getOptionByName(colModel, name);
				},
				checkedClasses = getOption("checkedClass"),
				uncheckedClasses = getOption("uncheckedClass"),
				value = getOption("value"),
				yes = typeof value === "string" ? (value.split(":")[0] || "Yes") : "Yes",
				no = typeof value === "string" ? (value.split(":")[1] || "No") : "No",
				buildCheckbox = function (classes) {
					return "<i class='" + encodeAttr(classes) + "'" + title + "></i>";
				},
				disabled = getOption("disabled");

			if (disabled === undefined) {
				disabled = jgrid.formatter.checkbox.disabled;
			}

			if (disabled === true && base.isInCommonIconClass.call(this, "fa")) {
				checkedClasses = checkedClasses || "fa fa-check-square-o fa-lg";
				checked = buildCheckbox(checkedClasses);
				unchecked = buildCheckbox(uncheckedClasses || "fa fa-square-o fa-lg");
			} else if (disabled === true && base.isInCommonIconClass.call(this, "glyphicon")) {
				checkedClasses = checkedClasses || "glyphicon glyphicon-check";
				checked = buildCheckbox(checkedClasses);
				unchecked = buildCheckbox(uncheckedClasses || "glyphicon glyphicon-unchecked");
			} else {
				checkedClasses = "";
				title += disabled === true ? " disabled='disabled'" : "";
				checked = "<input type='checkbox' checked='checked'" + title + " />";
				unchecked = "<input type='checkbox'" + title + " />";
			}
			return {
				checkedClasses: checkedClasses,
				checked: checked,
				unchecked: unchecked,
				yes: yes,
				no: no
			};
		},
		// http://jsperf.com/regex-vs-indexof-vs-in/12
		/*YesObject = Object.create(null, {
			1: { value: 1 },
			x: { value: 1 },
			"true": { value: 1 },
			yes: { value: 1 },
			on: { value: 1 }
		}),
		NoObject = Object.create(null, {
			0: { value: 1 },
			"false": { value: 1 },
			no: { value: 1 },
			off: { value: 1 }
		});*/
		// one can use typeof Object.create != "function" and use either
		// Object.create or simple object firm, but the performance differences
		// are so low, that the compatibility to IE8 is more important
		YesObject = { 1: 1, x: 1, "true": 1, yes: 1, on: 1 },
		NoObject = { 0: 1, "false": 1, no: 1, off: 1 };
	$.extend(true, jgrid, {
		formatter: { // setting common formatter settings, which are independent from the language and locale
			date: {
				parseRe: /[#%\\\/:_;.,\t\s\-]/,
				masks: {
					ISO8601Long: "Y-m-d H:i:s",
					ISO8601Short: "Y-m-d",
					SortableDateTime: "Y-m-d\\TH:i:s",
					UniversalSortableDateTime: "Y-m-d H:i:sO"
				},
				reformatAfterEdit: true,
				userLocalTime: false
			},
			baseLinkUrl: "",
			showAction: "",
			target: "",
			checkbox: { disabled: true },
			idName: "id"
		},
		cmTemplate: {
			integerStr: {
				formatter: "integer", align: "right", sorttype: "integer",
				searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"] }
			},
			integer: {
				formatter: "integer", align: "right", sorttype: "integer",
				convertOnSave: function (options) {
					var nData = options.newValue;
					return isNaN(nData) ? nData : parseInt(nData, 10);
				},
				searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"] }
			},
			numberStr: {
				formatter: "number", align: "right", sorttype: "number",
				searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"] }
			},
			number: {
				formatter: "number", align: "right", sorttype: "number",
				convertOnSave: function (options) {
					var nData = options.newValue;
					return isNaN(nData) ? nData : parseFloat(nData);
				},
				searchoptions: { sopt: ["eq", "ne", "lt", "le", "gt", "ge"] }
			},
			booleanCheckbox: {
				align: "center", formatter: "checkbox",
				edittype: "checkbox", editoptions: { value: "true:false", defaultValue: "false" },
				convertOnSave: function (options) {
					var newValue = options.newValue,
						checkboxOptions = parseCheckboxOptions.call(this, options),
						lowerCaseNewData = String(newValue).toLowerCase();

					if (YesObject[lowerCaseNewData] || lowerCaseNewData === checkboxOptions.yes.toLowerCase()) {
						newValue = true;
					} else if (NoObject[lowerCaseNewData] || lowerCaseNewData === checkboxOptions.no.toLowerCase()) {
						newValue = false;
					}
					return newValue;
				},
				stype: "select", searchoptions: { sopt: ["eq", "ne"], value: "true:Yes;false:No", noFilterText: "Any" }
			},
			// TODO: add cmTemplate for currency and date
			actions: function () {
				var p = this.p;
				return {
					formatter: "actions",
					width: (p != null && (base.isInCommonIconClass.call(this, "fa") || base.isInCommonIconClass.call(this, "glyphicon")) ?
							($(this).jqGrid("isBootstrapGuiStyle") ? 45 : 39) : 40) + (jgrid.cellWidth() ? 5 : 0),
					align: "center",
					label: "",
					autoResizable: false,
					frozen: true,
					fixed: true,
					hidedlg: true,
					resizable: false,
					sortable: false,
					search: false,
					editable: false,
					viewable: false
				};
			}
		}
	});
	jgrid.cmTemplate.booleanCheckboxFa = jgrid.cmTemplate.booleanCheckbox;

	//opts can be id:row id for the row, rowdata:the data for the row, colmodel:the column model for this column
	//example {id:1234,}
	$.extend(fmatter, {
		// one can consider to use $.type instead of some functions below (see http://api.jquery.com/jQuery.type/)
		isObject: function (o) {
			return (o && (typeof o === "object" || $.isFunction(o))) || false;
		},
		isNumber: function (o) {
			// probably Number.isFinite can be used instead.
			return typeof o === "number" && isFinite(o); // return false for +infinity, -infinity, or NaN
		},
		isValue: function (o) {
			return (this.isObject(o) || typeof o === "string" || this.isNumber(o) || typeof o === "boolean");
		},
		isEmpty: function (o) {
			if (typeof o !== "string" && this.isValue(o)) {
				return false;
			}
			if (!this.isValue(o)) {
				return true;
			}
			o = $.trim(o).replace(/&nbsp;/ig, "").replace(/&#160;/ig, "");
			return o === "";
		},
		NumberFormat: function (nData, opts) {
			var isNumber = fmatter.isNumber;
			if (!isNumber(nData)) {
				nData *= 1;
			}
			if (isNumber(nData)) {
				var bNegative = (nData < 0);
				var sOutput = String(nData);
				var sDecimalSeparator = opts.decimalSeparator || ".";
				var nDotIndex;
				if (isNumber(opts.decimalPlaces)) {
					// Round to the correct decimal place
					var nDecimalPlaces = opts.decimalPlaces;
					var nDecimal = Math.pow(10, nDecimalPlaces);
					sOutput = String(Math.round(nData * nDecimal) / nDecimal);
					nDotIndex = sOutput.lastIndexOf(".");
					if (nDecimalPlaces > 0) {
						// Add the decimal separator
						if (nDotIndex < 0) {
							sOutput += sDecimalSeparator;
							nDotIndex = sOutput.length - 1;
						} else if (sDecimalSeparator !== ".") { // Replace the "."
							sOutput = sOutput.replace(".", sDecimalSeparator);
						}
						// Add missing zeros
						while ((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
							sOutput += "0";
						}
					}
				}
				if (opts.thousandsSeparator) {
					var sThousandsSeparator = opts.thousandsSeparator;
					nDotIndex = sOutput.lastIndexOf(sDecimalSeparator);
					nDotIndex = (nDotIndex > -1) ? nDotIndex : sOutput.length;
					// we cut the part after the point for integer numbers
					// it will prevent storing/restoring of wrong numbers during inline editing
					var sNewOutput = opts.decimalSeparator === undefined ? "" : sOutput.substring(nDotIndex);
					var nCount = -1, i;
					for (i = nDotIndex; i > 0; i--) {
						nCount++;
						if ((nCount % 3 === 0) && (i !== nDotIndex) && (!bNegative || (i > 1))) {
							sNewOutput = sThousandsSeparator + sNewOutput;
						}
						sNewOutput = sOutput.charAt(i - 1) + sNewOutput;
					}
					sOutput = sNewOutput;
				}
				return sOutput;

			}
			return nData;
		}
	});
	var $FnFmatter = function (formatType, cellval, opts, rwd, act) {
		// build main options before element iteration
		var v = cellval;
		opts = $.extend({}, getGridRes.call($(this), "formatter"), opts);

		try {
			v = $.fn.fmatter[formatType].call(this, cellval, opts, rwd, act);
		} catch (ignore) { }
		return v;
	};
	$.fn.fmatter = $FnFmatter;
	$FnFmatter.getCellBuilder = function (formatType, opts, act) {
		var cellBuilder = $.fn.fmatter[formatType] != null ? $.fn.fmatter[formatType].getCellBuilder : null;
		return $.isFunction(cellBuilder) ?
			cellBuilder.call(this, $.extend({}, getGridRes.call($(this), "formatter"), opts), act) :
			null;
	};
	$FnFmatter.defaultFormat = function (cellval, opts) {
		return (fmatter.isValue(cellval) && cellval !== "") ? cellval : opts.defaultValue || "&#160;";
	};
	var defaultFormat = $FnFmatter.defaultFormat,
		formatCheckboxValue = function (cellValue, checkboxOptions, colModel) {
			if (cellValue === undefined || fmatter.isEmpty(cellValue)) {
				var defaultValue = getOptionByName(colModel, "defaultValue");
				if (defaultValue === undefined) {
					cellValue = checkboxOptions.no;
				}
				cellValue = defaultValue;
			}
			// see http://jsperf.com/regex-vs-indexof-vs-in/12
			cellValue = String(cellValue).toLowerCase();
			return YesObject[cellValue] || cellValue === checkboxOptions.yes.toLowerCase() ?
					checkboxOptions.checked :
					checkboxOptions.unchecked;
		};
	$FnFmatter.email = function (cellval, opts) {
		if (!fmatter.isEmpty(cellval)) {
			return "<a href='mailto:" + encodeAttr(cellval) + "'>" + cellval + "</a>";
		}
		return defaultFormat(cellval, opts);
	};
	$FnFmatter.checkbox = function (cellValue, options) {
		var checkboxOptions = parseCheckboxOptions.call(this, options);
		return formatCheckboxValue(cellValue, checkboxOptions, options.colModel);
	};
	$FnFmatter.checkbox.getCellBuilder = function (options) {
		var checkboxOptions, colModel = options.colModel;

		options.colName = options.colName || this.p.colNames[options.pos];
		checkboxOptions = parseCheckboxOptions.call(this, options);

		return function (cellValue) {
			return formatCheckboxValue(cellValue, checkboxOptions, colModel);
		};
	};
	$FnFmatter.checkbox.unformat = function (cellValue, options, elem) {
		var checkboxOptions = parseCheckboxOptions.call(this, options),
			$elem = $(elem);

		return (checkboxOptions.checkedClasses ?
					jgrid.hasAllClasses($elem.children("i"), checkboxOptions.checkedClasses) :
					$elem.children("input").is(":checked")) ?
				checkboxOptions.yes :
				checkboxOptions.no;
	};
	$FnFmatter.checkboxFontAwesome4 = $FnFmatter.checkbox;
	$FnFmatter.checkboxFontAwesome4.getCellBuilder = $FnFmatter.checkbox.getCellBuilder;
	$FnFmatter.checkboxFontAwesome4.unformat = $FnFmatter.checkbox.unformat;
	$FnFmatter.link = function (cellval, opts) {
		var colModel = opts.colModel, target = "", op = { target: opts.target };
		if (colModel != null) {
			op = $.extend({}, op, colModel.formatoptions || {});
		}
		if (op.target) { target = "target=" + op.target; }
		if (!fmatter.isEmpty(cellval)) {
			return "<a " + target + " href='" + encodeAttr(cellval) + "'>" + cellval + "</a>";
		}
		return defaultFormat(cellval, op);
	};
	$FnFmatter.showlink = function (cellval, opts, rowData) {
		var self = this, colModel = opts.colModel,
			op = {
				baseLinkUrl: opts.baseLinkUrl,
				showAction: opts.showAction,
				addParam: opts.addParam || "",
				target: opts.target,
				idName: opts.idName,
				hrefDefaultValue: "#"
			},
			target = "",
			idUrl,
			idParam,
			addParam,
			getOptionValue = function (option) {
				return $.isFunction(option) ?
						option.call(self, {
							cellValue: cellval,
							rowid: opts.rowId,
							rowData: rowData,
							options: op
						}) :
						option || "";
			};

		if (colModel != null) {
			op = $.extend({}, op, colModel.formatoptions || {});
		}

		if (op.target) {
			target = "target=" + getOptionValue(op.target);
		}
		idUrl = getOptionValue(op.baseLinkUrl) + getOptionValue(op.showAction);
		idParam = op.idName ? encodeURIComponent(getOptionValue(op.idName)) + "=" + encodeURIComponent(getOptionValue(op.rowId) || opts.rowId) : "";
		addParam = getOptionValue(op.addParam);
		if (typeof addParam === "object" && addParam !== null) {
			// add "&" only in case of usage object for of addParam
			addParam = (idParam !== "" ? "&" : "") + $.param(addParam);
		}
		idUrl += !idParam && !addParam ? "" : "?" + idParam + addParam;
		if (idUrl === "") {
			idUrl = getOptionValue(op.hrefDefaultValue);
		}
		if (typeof cellval === "string" || fmatter.isNumber(cellval) || $.isFunction(op.cellValue)) {
			//add this one even if cellval is blank string
			return "<a " + target + " href='" + encodeAttr(idUrl) + "'>" +
				($.isFunction(op.cellValue) ? getOptionValue(op.cellValue) : cellval) +
				"</a>";
		}
		// the code below will be called typically for undefined cellval or
		// if cellval have null value or some other unclear value like an object
		// and no cellValue callback function are defined "to decode" the value
		return defaultFormat(cellval, op);
	};
	$FnFmatter.showlink.getCellBuilder = function (opts1) {
		var op = {
				baseLinkUrl: opts1.baseLinkUrl,
				showAction: opts1.showAction,
				addParam: opts1.addParam || "",
				target: opts1.target,
				idName: opts1.idName,
				hrefDefaultValue: "#"
			},
			colModel = opts1.colModel;

		if (colModel != null) {
			op = $.extend({}, op, colModel.formatoptions || {});
		}

		return function (cellval, opts, rowData) {
			var self = this, rowid = opts.rowId, target = "", idUrl, idParam, addParam,
				getOptionValue = function (option) {
					return $.isFunction(option) ?
							option.call(self, {
								cellValue: cellval,
								rowid: rowid,
								rowData: rowData,
								options: op
							}) :
							option || "";
				};
			if (op.target) {
				target = "target=" + getOptionValue(op.target);
			}
			idUrl = getOptionValue(op.baseLinkUrl) + getOptionValue(op.showAction);
			idParam = op.idName ? encodeURIComponent(getOptionValue(op.idName)) + "=" + encodeURIComponent(getOptionValue(rowid) || opts.rowId) : "";
			addParam = getOptionValue(op.addParam);
			if (typeof addParam === "object" && addParam !== null) {
				// add "&" only in case of usage object for of addParam
				addParam = (idParam !== "" ? "&" : "") + $.param(addParam);
			}
			idUrl += !idParam && !addParam ? "" : "?" + idParam + addParam;
			if (idUrl === "") {
				idUrl = getOptionValue(op.hrefDefaultValue);
			}
			if (typeof cellval === "string" || fmatter.isNumber(cellval) || $.isFunction(op.cellValue)) {
				//add this one even if cellval is blank string
				return "<a " + target + " href='" + encodeAttr(idUrl) + "'>" +
					($.isFunction(op.cellValue) ? getOptionValue(op.cellValue) : cellval) +
					"</a>";
			}
			// the code below will be called typically for undefined cellval or
			// if cellval have null value or some other unclear value like an object
			// and no cellValue callback function are defined "to decode" the value
			return defaultFormat(cellval, op);
		};
	};
	$FnFmatter.showlink.pageFinalization = function (iCol) {
		var $self = $(this), p = this.p, colModel = p.colModel, cm = colModel[iCol], iRow, rows = this.rows, nRows = rows.length, row, td,
			onClick = function (e) {
				var $tr = $(this).closest(".jqgrow");
				if ($tr.length > 0) {
					return cm.formatoptions.onClick.call($self[0], {
						iCol: iCol,
						iRow: $tr[0].rowIndex,
						rowid: $tr.attr("id"),
						cm: cm,
						cmName: cm.name,
						cellValue: $(this).text(),
						a: this,
						event: e
					});
				}
			};
		if (cm.formatoptions != null && $.isFunction(cm.formatoptions.onClick)) {
			for (iRow = 0; iRow < nRows; iRow++) {
				row = rows[iRow];
				if ($(row).hasClass("jqgrow")) {
					td = row.cells[iCol];
					if (cm.autoResizable && td != null && $(td.firstChild).hasClass(p.autoResizing.wrapperClassName)) {
						td = td.firstChild;
					}
					if (td != null) {
						$(td.firstChild).bind("click", onClick);
					}
				}
			}
		}
	};
	var insertPrefixAndSuffix = function (sOutput, opts) {
			// Prepend prefix
			sOutput = (opts.prefix) ? opts.prefix + sOutput : sOutput;
			// Append suffix
			return (opts.suffix) ? sOutput + opts.suffix : sOutput;
		},
		numberHelper = function (cellval, opts, formatType) {
			var colModel = opts.colModel, op = $.extend({}, opts[formatType]);
			if (colModel != null) {
				op = $.extend({}, op, colModel.formatoptions || {});
			}
			if (fmatter.isEmpty(cellval)) {
				return insertPrefixAndSuffix(op.defaultValue, op);
			}
			return insertPrefixAndSuffix(fmatter.NumberFormat(cellval, op), op);
		};
	$FnFmatter.integer = function (cellval, opts) {
		return numberHelper(cellval, opts, "integer");
	};
	$FnFmatter.number = function (cellval, opts) {
		return numberHelper(cellval, opts, "number");
	};
	$FnFmatter.currency = function (cellval, opts) {
		return numberHelper(cellval, opts, "currency");
	};

	var numberCellBuilder = function (opts, formatType) {
		var colModel = opts.colModel, op = $.extend({}, opts[formatType]);
		if (colModel != null) {
			op = $.extend({}, op, colModel.formatoptions || {});
		}
		var numberFormat = fmatter.NumberFormat,
			defaultValue = op.defaultValue ? insertPrefixAndSuffix(op.defaultValue, op) : "";

		return function (cellValue) {
			if (fmatter.isEmpty(cellValue)) { return defaultValue; }
			return insertPrefixAndSuffix(numberFormat(cellValue, op), op);
		};
	};
	$FnFmatter.integer.getCellBuilder = function (options) {
		return numberCellBuilder(options, "integer");
	};
	$FnFmatter.number.getCellBuilder = function (options) {
		return numberCellBuilder(options, "number");
	};
	$FnFmatter.currency.getCellBuilder = function (options) {
		return numberCellBuilder(options, "currency");
	};
	$FnFmatter.date = function (cellval, opts, rwd, act) {
		var colModel = opts.colModel, op = $.extend({}, opts.date);
		if (colModel != null) {
			op = $.extend({}, op, colModel.formatoptions || {});
		}
		if (!op.reformatAfterEdit && act === "edit") {
			return defaultFormat(cellval, op);
		}
		if (!fmatter.isEmpty(cellval)) {
			return jgrid.parseDate.call(this, op.srcformat, cellval, op.newformat, op);
		}
		return defaultFormat(cellval, op);
	};
	$FnFmatter.date.getCellBuilder = function (opts, act) {
		var op = $.extend({}, opts.date);
		if (opts.colModel != null) {
			op = $.extend({}, op, opts.colModel.formatoptions || {});
		}
		var parseDate = jgrid.parseDate,
			srcformat = op.srcformat, newformat = op.newformat;
		if (!op.reformatAfterEdit && act === "edit") {
			return function (cellValue) {
				return defaultFormat(cellValue, op);
			};
		}
		return function (cellValue) {
			return fmatter.isEmpty(cellValue) ?
				defaultFormat(cellValue, op) :
				parseDate.call(this, srcformat, cellValue, newformat, op);
		};
	};
	$FnFmatter.select = function (cellval, opts) {
		var ret = [], colModel = opts.colModel, defaultValue,
			op = $.extend({}, colModel.editoptions || {}, colModel.formatoptions || {}),
			oSelect = op.value, sep = op.separator || ":", delim = op.delimiter || ";";
		if (oSelect) {
			var msl = op.multiple === true ? true : false, scell = [], sv,
			mapFunc = function (n, j) { if (j > 0) { return n; } };
			if (msl) {
				scell = $.map(String(cellval).split(","), function (n) { return $.trim(n); });
			}
			if (typeof oSelect === "string") {
				// maybe here we can use some caching with care ????
				var so = oSelect.split(delim), i, v;
				for (i = 0; i < so.length; i++) {
					sv = so[i].split(sep);
					if (sv.length > 2) {
						sv[1] = $.map(sv, mapFunc).join(sep);
					}
					v = $.trim(sv[0]);
					if (op.defaultValue === v) {
						defaultValue = sv[1];
					}
					if (msl) {
						if ($.inArray(v, scell) > -1) {
							ret.push(sv[1]);
						}
					} else if (v === $.trim(cellval)) {
						ret = [sv[1]];
						break;
					}
				}
			} else if (fmatter.isObject(oSelect)) {
				defaultValue = oSelect[op.defaultValue];
				if (msl) {
					ret = $.map(scell, function (n) {
						return oSelect[n];
					});
				} else {
					ret = [oSelect[cellval] === undefined ? "" : oSelect[cellval]];
				}
			}
		}
		cellval = ret.join(", ");
		return cellval !== "" ? cellval :
				(op.defaultValue !== undefined ? defaultValue : defaultFormat(cellval, op));
	};
	$FnFmatter.select.getCellBuilder = function (opts) {
		// jqGrid specific
		var colModel = opts.colModel, $fnDefaultFormat = $FnFmatter.defaultFormat,
			op = $.extend({}, colModel.editoptions || {}, colModel.formatoptions || {}),
			oSelect = op.value, sep = op.separator || ":", delim = op.delimiter || ";",
			defaultValue, defaultValueDefined = op.defaultValue !== undefined,
			isMultiple = op.multiple === true ? true : false, sv, so, i, nOpts, selOptions = {},
			mapFunc = function (n, j) { if (j > 0) { return n; } };
		if (typeof oSelect === "string") {
			// maybe here we can use some caching with care ????
			so = oSelect.split(delim);
			nOpts = so.length;
			for (i = nOpts - 1; i >= 0; i--) {
				sv = so[i].split(sep);
				if (sv.length > 2) {
					sv[1] = $.map(sv, mapFunc).join(sep);
				}
				selOptions[$.trim(sv[0])] = sv[1];
			}
		} else if (fmatter.isObject(oSelect)) {
			selOptions = oSelect;
		} else {
			return function (cellValue) {
				return cellValue ? String(cellValue) : $fnDefaultFormat(cellValue, op);
			};
		}
		if (defaultValueDefined) {
			defaultValue = selOptions[op.defaultValue];
		}
		return isMultiple ?
			function (cellValue) {
				var ret = [], iOpt,
					splitedCell = $.map(String(cellValue).split(","), function (n) { return $.trim(n); });
				for (iOpt = 0; iOpt < splitedCell.length; iOpt++) {
					cellValue = splitedCell[iOpt];
					if (selOptions.hasOwnProperty(cellValue)) {
						ret.push(selOptions[cellValue]);
					}
				}
				cellValue = ret.join(", ");
				return cellValue !== "" ? cellValue :
						(defaultValueDefined ? defaultValue : $fnDefaultFormat(cellValue, op));
			} :
			function (cellValue) {
				var ret = selOptions[String(cellValue)];
				return ret !== "" && ret !== undefined ? ret :
						(defaultValueDefined ? defaultValue : $fnDefaultFormat(cellValue, op));
			};
	};
	$FnFmatter.rowactions = function (e, act) {
		var $tr = $(this).closest("tr.jqgrow"), rid = $tr.attr("id"),
			$id = $(this).closest("table.ui-jqgrid-btable").attr("id").replace(/_frozen([^_]*)$/, "$1"),
			$grid = $("#" + jgrid.jqID($id)), $t = $grid[0], p = $t.p, i, n, customAction, actop,
			getTop = function () {
				var tr = $tr[0], gbox = $grid.closest(".ui-jqgrid")[0];
				if (tr.getBoundingClientRect != null && gbox.getBoundingClientRect != null) {
					return tr.getBoundingClientRect().top + $tr.outerHeight() - gbox.getBoundingClientRect().top;
				}
				return $tr.offset().top + $tr.outerHeight() - $(gbox).offset().top;
			},
			cm = p.colModel[jgrid.getCellIndex(this)],
			op = $.extend(true, { extraparam: {} }, jgrid.actionsNav || {},	p.actionsNavOptions || {}, cm.formatoptions || {});

		if (p.editOptions !== undefined) {
			op.editOptions = $.extend(true, op.editOptions || {}, p.editOptions);
		}
		if (p.delOptions !== undefined) {
			op.delOptions = p.delOptions;
		}
		if ($tr.hasClass("jqgrid-new-row")) {
			op.extraparam[p.prmNames.oper] = p.prmNames.addoper;
		}
		actop = {
			keys: op.keys,
			oneditfunc: op.onEdit,
			successfunc: op.onSuccess,
			url: op.url,
			extraparam: op.extraparam,
			aftersavefunc: op.afterSave,
			errorfunc: op.onError,
			afterrestorefunc: op.afterRestore,
			restoreAfterError: op.restoreAfterError,
			mtype: op.mtype
		};

		if ((!p.multiselect && rid !== p.selrow) || (p.multiselect && $.inArray(rid, p.selarrrow) < 0)) {
			$grid.jqGrid("setSelection", rid, true, e);
		} else {
			jgrid.fullBoolFeedback.call($t, "onSelectRow", "jqGridSelectRow", rid, true, e);
		}
		switch (act) {
			case "edit":
				$grid.jqGrid("editRow", rid, actop);
				break;
			case "save":
				$grid.jqGrid("saveRow", rid, actop);
				break;
			case "cancel":
				$grid.jqGrid("restoreRow", rid, op.afterRestore);
				break;
			case "del":
				op.delOptions = op.delOptions || {};
				if (op.delOptions.top === undefined) {
					op.delOptions.top = getTop();
				}
				$grid.jqGrid("delGridRow", rid, op.delOptions);
				break;
			case "formedit":
				op.editOptions = op.editOptions || {};
				if (op.editOptions.top === undefined) {
					op.editOptions.top = getTop();
					op.editOptions.recreateForm = true;
				}
				$grid.jqGrid("editGridRow", rid, op.editOptions);
				break;
			default:
				if (op.custom != null && op.custom.length > 0) {
					n = op.custom.length;
					for (i = 0; i < n; i++) {
						customAction = op.custom[i];
						if (customAction.action === act && $.isFunction(customAction.onClick)) {
							customAction.onClick.call($t, { rowid: rid, event: e, action: act, options: customAction });
						}
					}
				}
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		return false; // prevent other processing of the click on the row
	};
	$FnFmatter.actions = function (cellval, opts, rwd, act) {
		var rowid = opts.rowId, str = "", $t = this, p = $t.p, $self = $($t), i, customAction, info, displayMask = {},
			edit = getGridRes.call($self, "edit") || {},
			op = $.extend({
				editbutton: true,
				delbutton: true,
				editformbutton: false,
				commonIconClass: "ui-icon",
				editicon: "ui-icon-pencil",
				delicon: "ui-icon-trash",
				saveicon: "ui-icon-disk",
				cancelicon: "ui-icon-cancel",
				savetitle: edit.bSubmit || "",
				canceltitle: edit.bCancel || ""
			},
			getGridRes.call($self, "nav") || {},
			jgrid.nav || {},
			p.navOptions || {},
			getGridRes.call($self, "actionsNav") || {},
			jgrid.actionsNav || {},
			p.actionsNavOptions || {},
			opts.colModel.formatoptions || {}),
			cssIconClass = function (name) {
				return jgrid.mergeCssClasses(op.commonIconClass, op[name + "icon"]);
			},
			hoverClass = $self.jqGrid("getGuiStyles", "states.hover"),
			hoverAttributes = "onmouseover=\"jQuery(this).addClass('" + hoverClass +
				"');\" onmouseout=\"jQuery(this).removeClass('" + hoverClass + "');\"",
			buttonInfos = [
				{ action: "edit", actionName: "formedit", display: op.editformbutton },
				{ action: "edit", display: !op.editformbutton && op.editbutton },
				{ action: "del", idPrefix: "Delete", display: op.delbutton },
				{ action: "save", display: op.editformbutton || op.editbutton, hidden: true },
				{ action: "cancel", display: op.editformbutton || op.editbutton, hidden: true }
			],
			actionButton = function (options) {
				var action = options.action, actionName = options.actionName || action,
					idPrefix = options.idPrefix !== undefined ? options.idPrefix : (action.charAt(0).toUpperCase() + action.substring(1));
				return "<div title='" + encodeAttr(op[action + "title"]) +
					(options.hidden ? "' style='display:none;" : "") +
					"' class='" + encodeAttr($self.jqGrid("getGuiStyles", "actionsButton", "ui-pg-div ui-inline-" + action)) + "' " +
					(idPrefix !== null ? "id='j" + encodeAttr(idPrefix + "Button_" + rowid) : "") +
					"' onclick=\"return jQuery.fn.fmatter.rowactions.call(this,event,'" + actionName + "');\" " +
					(options.noHovering ? "" : hoverAttributes) + "><span class='" +
					encodeAttr(cssIconClass(action)) + "'></span></div>";
			},
			n = op.custom != null ? op.custom.length - 1 : -1;

		if (rowid === undefined || fmatter.isEmpty(rowid)) { return ""; }
		if ($.isFunction(op.isDisplayButtons)) {
			try {
				displayMask = op.isDisplayButtons.call($t, opts, rwd, act) || {};
			} catch (ignore) {}
		}
		while (n >= 0) {
			customAction = op.custom[n--];
			buttonInfos[customAction.position === "first" ? "unshift" : "push"](customAction);
		}
		for (i = 0, n = buttonInfos.length; i < n; i++) {
			info = $.extend({}, buttonInfos[i], displayMask[buttonInfos[i].action] || {});
			if (info.display !== false) {
				str += actionButton(info);
			}
		}
		return "<div class='" + encodeAttr($self.jqGrid("getGuiStyles", "actionsDiv", "ui-jqgrid-actions")) + "'>" + str + "</div>";
	};
	$FnFmatter.actions.pageFinalization = function (iCol) {
		var $self = $(this), p = this.p, colModel = p.colModel, cm = colModel[iCol],
			showHideEditDelete = function (show, rowid) {
				var maxfrozen = 0, tr, $actionsDiv, len = colModel.length, i;
				for (i = 0; i < len; i++) {
					// from left, no breaking frozen
					if (colModel[i].frozen !== true) {
						break;
					}
					maxfrozen = i;
				}
				tr = $self.jqGrid("getGridRowById", rowid);
				if (tr != null && tr.cells != null) {
					//$actionsDiv = cm.frozen ? $("tr#"+jgrid.jqID(rid)+" td:eq("+jgrid.getCellIndex(this)+") > div",$grid) :$(this).parent(),
					iCol = p.iColByName[cm.name];
					$actionsDiv = $(tr.cells[iCol]).children(".ui-jqgrid-actions");
					if (cm.frozen && p.frozenColumns && iCol <= maxfrozen) {
						// uses the corresponding tr from frozen div with the same rowIndex ADDITIONALLY
						// to the standard action div
						$actionsDiv = $actionsDiv
								.add($($self[0].grid.fbRows[tr.rowIndex].cells[iCol])
								.children(".ui-jqgrid-actions"));
					}
					if (show) {
						$actionsDiv.find(">.ui-inline-edit,>.ui-inline-del").show();
						$actionsDiv.find(">.ui-inline-save,>.ui-inline-cancel").hide();
					} else {
						$actionsDiv.find(">.ui-inline-edit,>.ui-inline-del").hide();
						$actionsDiv.find(">.ui-inline-save,>.ui-inline-cancel").show();
					}
				}
			},
			showEditDelete = function (e, rowid) {
				showHideEditDelete(true, rowid);
				return false;
			},
			hideEditDelete = function (e, rowid) {
				showHideEditDelete(false, rowid);
				return false;
			};
		if (cm.formatoptions == null || !cm.formatoptions.editformbutton) {
			// we use unbind to be sure that we don't register the same events multiple times
			$self.unbind("jqGridInlineAfterRestoreRow.jqGridFormatter jqGridInlineAfterSaveRow.jqGridFormatter", showEditDelete);
			$self.bind("jqGridInlineAfterRestoreRow.jqGridFormatter jqGridInlineAfterSaveRow.jqGridFormatter", showEditDelete);
			$self.unbind("jqGridInlineEditRow.jqGridFormatter", hideEditDelete);
			$self.bind("jqGridInlineEditRow.jqGridFormatter", hideEditDelete);
		}
	};
	$.unformat = function (cellval, options, pos, cnt) {
		// specific for jqGrid only
		var ret, colModel = options.colModel, formatType = colModel.formatter, p = this.p,
			op = colModel.formatoptions || {},// sep,
			//re = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
			unformatFunc = colModel.unformat || ($FnFmatter[formatType] && $FnFmatter[formatType].unformat);
		if (cellval instanceof jQuery && cellval.length > 0) {
			cellval = cellval[0];
		}
		if (p.treeGrid && cellval != null && $(cellval.firstChild).hasClass("tree-wrap") && ($(cellval.lastChild).hasClass("cell-wrapper") || $(cellval.lastChild).hasClass("cell-wrapperleaf"))) {
			cellval = cellval.lastChild;
		}
		if (colModel.autoResizable && cellval != null && $(cellval.firstChild).hasClass(p.autoResizing.wrapperClassName)) {
			cellval = cellval.firstChild;
		}
		if (unformatFunc !== undefined && $.isFunction(unformatFunc)) {
			ret = unformatFunc.call(this, $(cellval).text(), options, cellval);
		} else if (formatType !== undefined && typeof formatType === "string") {
			//var opts = $.extend(true, {}, getRes(locales[p.locale], "formatter"), jgrid.formatter || {}), stripTag;
			var $self = $(this), //stripTag, //opts = getGridRes.call($self, "formatter"),
				getFormaterOption = function (formatterName, optionName) {
					return op[optionName] !== undefined ?
						op[optionName] :
						getGridRes.call($self, "formatter." + formatterName + "." + optionName);
				},
				cutThousandsSeparator = function (formatterName, val) {
					var separator = getFormaterOption(formatterName, "thousandsSeparator")
							.replace(/([\.\*\_\'\(\)\{\}\+\?\\])/g, "\\$1");
					return val.replace(new RegExp(separator, "g"), "");
				};
			switch (formatType) {
				case "integer":
					ret = cutThousandsSeparator("integer", $(cellval).text());
					break;
				case "number":
					ret = cutThousandsSeparator("number", $(cellval).text())
							.replace(getFormaterOption("number", "decimalSeparator"), ".");
					break;
				case "currency":
					ret = $(cellval).text();
					var prefix = getFormaterOption("currency", "prefix"),
						suffix = getFormaterOption("currency", "suffix");
					if (prefix && prefix.length) {
						ret = ret.substr(prefix.length);
					}
					if (suffix && suffix.length) {
						ret = ret.substr(0, ret.length - suffix.length);
					}
					ret = cutThousandsSeparator("number", ret)
							.replace(getFormaterOption("number", "decimalSeparator"), ".");
					break;
				case "checkbox":
					ret = $FnFmatter.checkbox.unformat(cellval, options, cellval);
					break;
				case "select":
					ret = $.unformat.select(cellval, options, pos, cnt);
					break;
				case "actions":
					return "";
				default:
					ret = $(cellval).text();
			}
		}
		ret = ret !== undefined ? ret : cnt === true ? $(cellval).text() : jgrid.htmlDecode($(cellval).html());
		return ret;
	};
	$.unformat.select = function (cellval, options, pos, cnt) {
		// Spacial case when we have local data and perform a sort
		// cnt is set to true only in sortDataArray
		var ret = [], cell = $(cellval).text(), colModel = options.colModel;
		if (cnt === true) { return cell; }
		var op = $.extend({}, colModel.editoptions || {}, colModel.formatoptions || {}),
			sep = op.separator === undefined ? ":" : op.separator,
			delim = op.delimiter === undefined ? ";" : op.delimiter;

		if (op.value) {
			var oSelect = op.value,
				msl = op.multiple === true ? true : false,
				scell = [], sv, mapFunc = function (n, k) { if (k > 0) { return n; } };
			if (msl) { scell = cell.split(","); scell = $.map(scell, function (n) { return $.trim(n); }); }
			if (typeof oSelect === "string") {
				var so = oSelect.split(delim), j = 0, i;
				for (i = 0; i < so.length; i++) {
					sv = so[i].split(sep);
					if (sv.length > 2) {
						sv[1] = $.map(sv, mapFunc).join(sep);
					}
					if (msl) {
						if ($.inArray($.trim(sv[1]), scell) > -1) {
							ret[j] = sv[0];
							j++;
						}
					} else if ($.trim(sv[1]) === $.trim(cell)) {
						ret[0] = sv[0];
						break;
					}
				}
			} else if (fmatter.isObject(oSelect) || $.isArray(oSelect)) {
				if (!msl) { scell[0] = cell; }
				ret = $.map(scell, function (n) {
					var rv;
					$.each(oSelect, function (k, val) {
						if (val === n) {
							rv = k;
							return false;
						}
					});
					if (rv !== undefined) { return rv; }
				});
			}
			return ret.join(", ");
		}
		return cell || "";
	};
	$.unformat.date = function (cellval, opts) {
		// TODO
		var op = $.extend(true, {},
				getGridRes.call($(this), "formatter.date"),
				jgrid.formatter.date || {},
				opts.formatoptions || {});

		return !fmatter.isEmpty(cellval) ?
				jgrid.parseDate.call(this, op.newformat, cellval, op.srcformat, op) :
				"";
	};
	// end module jquery.fmatter
}));
