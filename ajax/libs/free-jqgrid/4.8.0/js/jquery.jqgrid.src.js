// ==ClosureCompiler==
// @compilation_level SIMPLE_OPTIMIZATIONS

/**
 * @license jqGrid  4.8.0 - free jqGrid
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com
 * Copyright (c) 2014-2015, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * Date: 2015-03-02
 */
//jsHint options
/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery, HTMLElement */

(function ($) {
"use strict";
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
		viewtitle: "View selected row"
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

if (jgrid.defaults == null || $.isEmptyObject(locales) || locales["en-US"] === undefined) {
	// set English options only if no grid.locale-XX.js file are included before jquery.jqGrid.min.js or jquery.jqGrid.src.js
	// the files included AFTER jquery.jqGrid.min.js or jquery.jqGrid.src.js will just overwrite all the settings which were set previously

	// We can set locInfo under $.jgrid additionally to setting under $.jgrid.locales[locale] 
	// only to have more compatibility with the previous version of jqGrid.
	// We don't make this currently.
	if (locales["en-US"] === undefined) {
		$.extend(true, $.jgrid, /*englishLanguageDefaults,*/ {
			locales: {
				"en-US": englishLanguageDefaults	// and for English US
			}
		});
	}
	jgrid.defaults = jgrid.defaults || {};
	if (jgrid.defaults.locale === undefined) {
		jgrid.defaults.locale = "en-US";
	}
}

//if (jgrid.defaults.locale && locales[jgrid.defaults.locale]) {
//	$.extend(true, $.jgrid, locales[jgrid.defaults.locale]); // add to improve compatibility only
//}

$.extend(true,jgrid,{
	version: "4.8.0",
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
		unused: '' // used only to detect whether the changes are overwritten because of wrong usage
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
				common: "fa-lg", 		// common: "",
				asc: "fa-sort-asc",		// asc: "fa-sort-amount-asc",
				desc: "fa-sort-desc"	// desc: "fa-sort-amount-desc"
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
				common: "ui-state-default fa-fw",
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
				resizableLtr: "ui-resizable-se ui-state-default fa fa-rss fa-rotate-270"
			},
			search: {
				search: "fa-search",
				reset: "fa-undo",
				query: "fa-comments-o"
			},
			subgrid: {
				common: "ui-state-default fa-fw",
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
		}
	},
	htmlDecode : function(value){
		if(value && (value==='&nbsp;' || value==='&#160;' || (value.length===1 && value.charCodeAt(0)===160))) { return "";}
		return !value ? value : String(value).replace(/&gt;/g, ">").replace(/&lt;/g, "<").replace(/&quot;/g, '"').replace(/&amp;/g, "&");		
	},
	htmlEncode : function (value){
		return !value ? value : String(value).replace(/&/g, "&amp;").replace(/\"/g, "&quot;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
	},
	clearArray : function (ar) {
		// see http://jsperf.com/empty-javascript-array
		while (ar.length > 0) {
			ar.pop();
		}
	},
	format : function(format){ //jqgformat
		var args = $.makeArray(arguments).slice(1);
		if(format==null) { format = ""; }
		return format.replace(/\{(\d+)\}/g, function(m, i){
			return args[i];
		});
	},
	msie : navigator.appName === 'Microsoft Internet Explorer',
	msiever : function () {
		// Trident/4.0 - Internet Explorer 8,
		// Trident/5.0 - Internet Explorer 9,
		// Trident/6.0 - Internet Explorer 10
		// Trident/7.0 - IE11
		// Version tokens MSIE might not reflect the actual version of the browser
		// If Compatibility View is enabled for a webpage or the browser mode is set to an earlier version
		var rv = -1, match = /(MSIE) ([0-9]{1,}[.0-9]{0,})/.exec(navigator.userAgent);
		if (match.length === 3) {
			rv = parseFloat(match[2] || -1);
		}
		return rv;
	},
	getCellIndex : function (cell) {
		var c = $(cell);
		if (c.is('tr')) { return -1; }
		c = (!c.is('td') && !c.is('th') ? c.closest("td,th") : c)[0];
		if (jgrid.msie) { return $.inArray(c, c.parentNode.cells); }
		return c.cellIndex;
	},
	stripHtml : function(v) {
		v = String(v);
		if (v) {
			v = v.replace(/<("[^"]*"|'[^']*'|[^'">])*>/gi,"");
			return (v && v !== '&nbsp;' && v !== '&#160;') ? v.replace(/\"/g,"'") : "";
		} 
			return v;
	},
	stripPref : function (pref, id) {
		var obj = $.type( pref );
		if( obj === "string" || obj === "number") {
			pref =  String(pref);
			id = pref !== "" ? String(id).replace(String(pref), "") : id;
		}
		return id;
	},
	parse : function(jsonString) {
		var js = jsonString;
		if (js.substr(0,9) === "while(1);") { js = js.substr(9); }
		if (js.substr(0,2) === "/*") { js = js.substr(2,js.length-4); }
		if(!js) { js = "{}"; }
		return (jgrid.useJSON===true && typeof JSON === 'object' && typeof JSON.parse === 'function') ?
			JSON.parse(js) :
			eval('(' + js + ')');
	},
	getRes: function (base, path) {
		var pathParts = path.split("."), n = pathParts.length, i;
		if (base == null) {
			return undefined;
		}
		for (i = 0; i < n; i++) {
			if (!pathParts[i]) {
				return null;
			}
			base = base[pathParts[i]];
			if (base === undefined) {
				break;
			}
			if (typeof base === "string") {
				return base;
			}
		}
		return base;
	},
	parseDate : function(format, date, newformat, opts) {
		var	token = /\\.|[dDjlNSwzWFmMntLoYyaABgGhHisueIOPTZcrU]/g,
		timezone = /\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[\-+]\d{4})?)\b/g,
		timezoneClip = /[^\-+\dA-Z]/g,
		msMatch = ((typeof date === 'string') ? date.match(/^\/Date\((([\-+])?[0-9]+)(([\-+])([0-9]{2})([0-9]{2}))?\)\/$/): null),
		pad = function (value, length) {
			value = String(value);
			length = parseInt(length,10) || 2;
			while (value.length < length)  { value = '0' + value; }
			return value;
		},
		ts = {m : 1, d : 1, y : 1970, h : 0, i : 0, s : 0, u:0},
		timestamp = 0, dM, k, hl,
		h12To24 = function (ampm, h) {
			if (ampm === 0) {
				if (h === 12) { h = 0; } 
			} else {
				if (h !== 12) { h += 12; }
			}
			return h;
		},
		offset =0;
		if (opts === undefined) {
			opts = this.p != null ?
				jgrid.getRes(locales[this.p.locale], "formatter.date") || jgrid.formatter.date :
				jgrid.formatter.date;
		}
		// old lang files
		if(opts.parseRe === undefined ) {
			opts.parseRe = /[#%\\\/:_;.,\t\s\-]/;
		}
		if( opts.masks.hasOwnProperty(format) ) { format = opts.masks[format]; }
		if(date && date != null) {
			if( !isNaN(date) && String(format).toLowerCase() === "u") {
				//Unix timestamp
				timestamp = new Date( parseFloat(date)*1000 );
			} else if(date.constructor === Date) {
				timestamp = date;
				// Microsoft date format support
			} else if( msMatch !== null ) {
				timestamp = new Date(parseInt(msMatch[1], 10));
				if (msMatch[3]) {
					offset = Number(msMatch[5]) * 60 + Number(msMatch[6]);
					offset *= ((msMatch[4] === '-') ? 1 : -1);
					offset -= timestamp.getTimezoneOffset();
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			} else {
				//Support ISO8601Long that have Z at the end to indicate UTC timezone
				if(opts.srcformat === 'ISO8601Long' && date.charAt(date.length - 1) === 'Z') {
					offset -= (new Date()).getTimezoneOffset();
				}
				date = String(date).replace(/\T/g,"#").replace(/\t/,"%").split(opts.parseRe);
				format = format.replace(/\T/g,"#").replace(/\t/,"%").split(opts.parseRe);
				// parsing for month names and time
				for (k = 0, hl = format.length; k < hl; k++) {
					switch (format[k]) {
					    case "M":
					        // A short textual representation of a month, three letters	Jan through Dec
							dM = $.inArray(date[k],opts.monthNames);
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
					        // Numeric representation of a month, without leading zeros	1 through 12
							ts.m = parseInt(date[k], 10);
							break;
					    case "j":
					        // Day of the month without leading zeros	1 to 31
							ts.d = parseInt(date[k], 10);
							break;
					    case "g":
					        // 12-hour format of an hour without leading zeros	1 through 12
							ts.h = parseInt(date[k], 10);
							break;
					    case "a":
					        // Lowercase Ante meridiem and Post meridiem	am or pm
							dM = $.inArray(date[k], opts.AmPm);
							if (dM !== -1 && dM < 2 && date[k] === opts.AmPm[dM]) {
								date[k] = dM;
								ts.h = h12To24(date[k], ts.h);
							}
							break;
					    case "A":
					        // Uppercase Ante meridiem and Post meridiem	AM or PM
							dM = $.inArray(date[k], opts.AmPm);
							if (dM !== -1 && dM > 1 && date[k] === opts.AmPm[dM]) {
								date[k] = dM-2;
								ts.h = h12To24(date[k], ts.h);
							}
							break;
					}
					if (date[k] !== undefined) {
						ts[format[k].toLowerCase()] = parseInt(date[k], 10);
					}
				}
				if(ts.f) {ts.m = ts.f;}
				if( ts.m === 0 && ts.y === 0 && ts.d === 0) {
					return "&#160;" ;
				}
				ts.m = parseInt(ts.m,10)-1;
				var ty = ts.y;
				if (ty >= 70 && ty <= 99) {ts.y = 1900+ts.y;}
				else if (ty >=0 && ty <=69) {ts.y= 2000+ts.y;}
				timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
				//Apply offset to show date as local time.
				if(offset > 0) {
					timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
				}
			}
		} else {
			timestamp = new Date(ts.y, ts.m, ts.d, ts.h, ts.i, ts.s, ts.u);
		}
		if(opts.userLocalTime && offset === 0) {
			offset -= (new Date()).getTimezoneOffset();
			if( offset > 0 ) {
				timestamp.setTime(Number(Number(timestamp) + (offset * 60 * 1000)));
			}
		}
		if( newformat === undefined ) {
			return timestamp;
		}
		if( opts.masks.hasOwnProperty(newformat) )  {
			newformat = opts.masks[newformat];
		} else if ( !newformat ) {
			newformat = 'Y-m-d';
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
			    d: pad(j), // Day of the month, 2 digits with leading zeros	01 to 31
				D: opts.dayNames[w], // A textual representation of a day, three letters. Mon through Sun
				j: j, // Day of the month without leading zeros	1 to 31
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
				t: '?', // Number of days in the given month. 28 through 31
				// Year
				L: '?', // Whether it's a leap year. 1 if it is a leap year, 0 otherwise.
				o: '?', // SO-8601 year number. This has the same value as Y, except that if the ISO week number (W) belongs to the previous or next year, that year is used instead. Examples: 1999 or 2003
				Y: year, // A full numeric representation of a year, 4 digits. Examples: 1999 or 2003
				y: String(year).substring(2), // A two digit representation of a year. Examples: 99 or 03
				// Time
				a: hours < 12 ? opts.AmPm[0] : opts.AmPm[1], // Lowercase Ante meridiem and Post meridiem: am or pm
				A: hours < 12 ? opts.AmPm[2] : opts.AmPm[3], // Uppercase Ante meridiem and Post meridiem: AM or PM
				B: '?', // Swatch Internet time	000 through 999
				g: hours % 12 || 12, // 12-hour format of an hour without leading zeros	1 through 12
				G: hours, // 24-hour format of an hour without leading zeros. 0 through 23
				h: pad(hours % 12 || 12), // 12-hour format of an hour with leading zeros: 01 through 12
				H: pad(hours), // 24-hour format of an hour with leading zeros: 00 through 23
				i: pad(i), // Minutes with leading zeros: 00 to 59
				s: pad(s), // Seconds, with leading zeros: 00 through 59
				u: u, // Microseconds. Example: 654321
				// Timezone
				e: '?', // Timezone identifier. Examples: UTC, GMT, Atlantic/Azores
				I: '?', // Whether or not the date is in daylight saving time. 1 if Daylight Saving Time, 0 otherwise.
				O: (o > 0 ? "-" : "+") + pad(Math.floor(Math.abs(o) / 60) * 100 + Math.abs(o) % 60, 4), // Difference to Greenwich time (GMT) in hours. Example: +0200
				P: '?', // Difference to Greenwich time (GMT) with colon between hours and minutes. Example: +02:00
				T: (String(timestamp).match(timezone) || [""]).pop().replace(timezoneClip, ""), // Timezone abbreviation. Examples: EST, MDT
				Z: '?', // Timezone offset in seconds. The offset for timezones west of UTC is always negative, and for those east of UTC is always positive. -43200 through 50400
				// Full Date/Time
				c: '?', // ISO 8601 date. Example: 2004-02-12T15:19:21+00:00
				r: '?', // RFC 2822 formatted date. Example: Thu, 21 Dec 2000 16:01:07 +0200
				U: Math.floor(timestamp / 1000) // Seconds since the Unix Epoch (January 1 1970 00:00:00 GMT)
			};
		return newformat.replace(token, function ($0) {
			return flags.hasOwnProperty($0) ? flags[$0] : $0.substring(1);
		});
	},
	jqID : function(sid){
		return String(sid).replace(/[!"#$%&'()*+,.\/:; <=>?@\[\\\]\^`{|}~]/g,"\\$&");
	},
	/*gridComponent: { // enum. The code includes additional 881 bytes in jquery.jqGrid.min.js so we comment it till we really will use it
		// let us this - <table> from which grid is created. Then
		//	gBox (grid box) - outer div which includes all grid components: $(this).closest(".ui-jqgrid")[0]
		// In the same way 

		GRID_BOX_DIV: 0,								// tagName: "div". class: "ui-jqgrid". Id: "gbox_" + gridId
			GRID_OVERLAY_DIV: 1,						// tagName: "div". class: "jqgrid-overlay". Id: "lui_" + gridId
			LOADING_DIV: 2,								// tagName: "div". class: "loading". Id: "load_" + gridId
			DIALOG_ALERT_DIV: 3,						// tagName: "div". class: "ui-jqdialog". Id: "alertmod_" + gridId
			DIALOG_SEARCH_DIV: 4,						// tagName: "div". class: "ui-jqdialog". Id: "searchmodfbox_" + gridId
			DIALOG_VIEW_DIV: 5,							// tagName: "div". class: "ui-jqdialog". Id: "viewmod" + gridId
			DIALOG_EDIT_DIV: 6,							// tagName: "div". class: "ui-jqdialog". Id: "editmod" + gridId
			DIALOG_DELETE_DIV: 7,						// tagName: "div". class: "ui-jqdialog". Id: "delmod" + gridId

			GRID_VIEW_DIV: 8,							// tagName: "div". class: "ui-jqgrid-view". Id: "gview_" + gridId
				TITLE_BAR_DIV: 9,						// tagName: "div". class: "ui-jqgrid-titlebar" and either "ui-jqgrid-caption" or "ui-jqgrid-caption-rtl"

				UPPER_TOOLBAR_DIV: 10,					// tagName: "div". class: "ui-userdata". Id: "tb_" + gridId

				TOP_PAGER_DIV: 11,						// tagName: "div". class: "ui-jqgrid-toppager". Id: gridId + "_toppager"

				HEADER_DIV: 12,							// tagName: "div". class: "ui-jqgrid-hdiv"
					HEADER_BOX_DIV: 13,					// tagName: "div". class: either "ui-jqgrid-hdiv" or "ui-jqgrid-hbox-rtl"
						HEADER_TABLE: 14,				// tagName: "table". class: "ui-jqgrid-htable"
							HEADER_COLS_ROW: 15,		// tagName: "tr". class: "jqgfirstrow"
								HEADER_COLS: 16,		// tagName: "th". class: either "ui-first-th-rtl" or "ui-first-th-rtl"
							SEARCH_TOOLBAR: 17,			// tagName: "tr". class: "ui-search-toolbar". Its direct children are th having class "ui-th-column" and optionally "ui-th-rtl"

				BODY_DIV: 18,							// tagName: "div". class: "ui-jqgrid-bdiv"
					BODY_SCROLL_FULL_DIV: 19,			// tagName: "div"
						BODY_SCROLL_TOP_DIV: 20,		// tagName: "div"
							BODY_TABLE: 21,				// tagName: "table". class: "ui-jqgrid-btable". Id: gridId
								BODY_COLS_ROW: 22,		// tagName: "tr". class: "jqgfirstrow"
									BODY_COLS: 23,		// tagName: "td"
								BODY_DATA_ROWS: 24,		// tagName: "tr". class: "jqgrow" and optionally "ui-row-rtl"
				FOOTER_DIV: 25,							// tagName: "div". class: "ui-jqgrid-sdiv"
					FOOTER_BOX_DIV: 26, 				// tagName: "div". class: either "ui-jqgrid-hdiv" or "ui-jqgrid-hbox-rtl". ??? is it really needed ???
						FOOTER_TABLE: 27,				// tagName: "table". class: "ui-jqgrid-ftable"
							FOOTER_DATA_ROWS: 28,		// tagName: "tr". class: "footrow", optionally additionally "footrow-rtl"

				BOTTOM_TOOLBAR_DIV: 29,					// tagName: "div". class: "ui-userdata". Id: "tb_" + gridId

				FROZEN_HEADER_DIV: 30,					// tagName: "div". class: "frozen-div" and "ui-jqgrid-hdiv"
					// no hBox currently exists
					FROZEN_HEADER_TABLE: 31,			// tagName: "table". class: "ui-jqgrid-htable"
						FROZEN_HEADER_COLS_ROW: 32,		// tagName: "tr". class: "jqgfirstrow"
							FROZEN_HEADER_COLS: 33,		// tagName: "th". class: either "ui-first-th-rtl" or "ui-first-th-rtl"
						FROZEN_SEARCH_TOOLBAR: 34,		// tagName: "tr". class: "ui-search-toolbar". Its direct children are th having class "ui-th-column" and optionally "ui-th-rtl"
		// TODO: fix id of children of .ui-search-input to have no id duplicates with the main grid

				FROZEN_FOOTER_DIV: 35,					// tagName: "div". class: "frozen-div" and "ui-jqgrid-sdiv"
					FROZEN_FOOTER_TABLE: 36,			// tagName: "table". class: "ui-jqgrid-ftable"
						FROZEN_FOOTER_DATA_ROWS: 37,	// tagName: "tr". class: "footrow", optionally additionally "footrow-rtl"

				FROZEN_BODY_DIV: 38,					// tagName: "div". class: "frozen-div" and "ui-jqgrid-bdiv"
					// no full scroll div and top scroll div is currently exist
					FROZEN_BODY_TABLE: 39,				// tagName: "table". class: "ui-jqgrid-btable". Id: gridId + "_frozen"
						FROZEN_BODY_COLS_ROW: 40,		// tagName: "tr". class: "jqgfirstrow"
							FROZEN_BODY_COLS: 41,		// tagName: "td"
						FROZEN_BODY_DATA_ROWS: 42,		// tagName: "tr". class: "jqgrow" and optionally "ui-row-rtl"
		// TODO: fix id of children of .jqgrow to have no id duplicates with the main grid

			COLUMN_RESIZER_DIV: 43,						// tagName: "div". class: "ui-jqgrid-resize-mark". Id: "rs_m" + gridId
			BOTTOM_PAGER_DIV: 44						// tagName: "div". class: "ui-jqgrid-pager"
	},*/
	getGridComponentId: function (componentName) {
		var self = this;
		if (self.p == null || !self.p.id) {
			return ""; // return empty string
		}
		var id = self.p.id;
		switch (componentName) {
			case "grid":
				return id;
			case "gBox":
				return "gbox_" + id;
			case "gView":
				return "gview_" + id;
			case "alertMod": // footer/summary table
				return "alertmod_" + id;
			case "columnResizer":
				return "rs_m" + id;
			case "selectAllCheckbox":
				return "cb_" + id;
			case "searchOperationMenu":
				return "sopt_menu";
			default:
				return ""; // return empty string
		}
	},
	getGridComponentIdSelector: function (componentName) {
		var id = jgrid.getGridComponentId.call(this, componentName);
		return id ? "#" + jgrid.jqID(id) : "";
	},
	getGridComponent: function (componentName, $p, p1) {
		var p;
		if ($p instanceof $ || $p.length > 0) {
			p = $p[0];
		} else if ($p instanceof HTMLElement) {
			p = $p;
			$p = $(p);
		} else {
			return $(); // return empty jQuery object
		}
		switch (componentName) {
			case "bTable": // get body table from bDiv
				return $p.hasClass("ui-jqgrid-bdiv") ? $p.find(">div>.ui-jqgrid-btable") : $();
			case "hTable": // header table from bDiv
				return $p.hasClass("ui-jqgrid-hdiv") ? $p.find(">div>.ui-jqgrid-htable") : $();
			case "fTable": // footer/summary table from sDiv
				return $p.hasClass("ui-jqgrid-sdiv") ? $p.find(">div>.ui-jqgrid-ftable") : $();
			case "bDiv":   // get bDiv of grid (bTable)
				return $p.hasClass("ui-jqgrid-btable") && p.grid != null ? $(p.grid.bDiv) : $();
			case "hDiv":   // get hDiv of grid (bTable)
				return $p.hasClass("ui-jqgrid-btable") && p.grid != null ? $(p.grid.hDiv) : $();
			case "sDiv":   // get sDiv of grid (bTable)
				return $p.hasClass("ui-jqgrid-btable") && p.grid != null ? $(p.grid.sDiv) : $();
			case "colHeader": // p should be iCol
				return !isNaN(p1) && p.grid != null && p.grid.headers != null && p.grid.headers[p1] != null ?
					$(p.grid.headers[p1].el) : $();
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
				$hDivhBox.css($hDivhBox.hasClass("ui-jqgrid-hbox-rtl") ? "padding-left": "padding-right", p.scrollOffset);
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
			ar = String(args[i]).split(" ");
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
	detectRowEditing: function (rowid) {
		var i, savedRowInfo, tr, self = this, rows = self.rows, p = self.p;
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
					$.isFunction($.fn.jqGrid.restoreCell)) {
				// cell editing
				tr = rows[savedRowInfo.id];
				if (tr != null && tr.id === rowid) {
					return { mode: "cellEditing", savedRow: savedRowInfo };
				}
			} else if (savedRowInfo.id === rowid && $.isFunction($.fn.jqGrid.restoreRow)) {
				return { mode: "inlineEditing", savedRow: savedRowInfo };
			}
		}
		return null;
	},
	guid : 1,
	uidPref: 'jqg',
	randId : function( prefix )	{
		return (prefix || jgrid.uidPref) + (jgrid.guid++);
	},
	getAccessor : function(obj, expr) {
		var ret,p,prm = [], i;
		if( typeof expr === 'function') { return expr(obj); }
		ret = obj[expr];
		if(ret===undefined) {
			try {
				if ( typeof expr === 'string' ) {
					prm = expr.split('.');
				}
				i = prm.length;
				if( i ) {
					ret = obj;
					while (ret && i--) {
						p = prm.shift();
						ret = ret[p];
					}
				}
			} catch (ignore) {}
		}
		return ret;
	},
	getXmlData: function (obj, expr, returnObj) {
		var m = typeof expr === 'string' ? expr.match(/^(.*)\[(\w+)\]$/) : null;
		if (typeof expr === 'function') { return expr(obj); }
		if (m && m[2]) {
			// m[2] is the attribute selector
			// m[1] is an optional element selector
			// examples: "[id]", "rows[page]"
			return m[1] ? $(m[1], obj).attr(m[2]) : $(obj).attr(m[2]);
		}
		var ret = $(expr, obj);
		if (returnObj) { return ret; }
		//$(expr, obj).filter(':last'); // we use ':last' to be more compatible with old version of jqGrid
		return ret.length > 0 ? $(ret).text() : undefined;
	},
	cellWidth : function () {
		var $testDiv = $("<div class='ui-jqgrid' style='left:10000px'><table class='ui-jqgrid-btable' style='width:5px;'><tr class='jqgrow'><td style='width:5px;display:block;'></td></tr></table></div>"),
		testCell = $testDiv.appendTo("body")
			.find("td")
			.width();
		$testDiv.remove();
		return Math.abs(testCell-5) > 0.1;
	},
	cell_width : true,
	ajaxOptions: {},
	from : function(source){
		// Original Author Hugo Bonacci
		// License MIT http://jlinq.codeplex.com/license
		var context = this,
		QueryObject=function(d,q){
			if(typeof d==="string"){
				d=$.data(d);
			}
			var self=this,
			_data=d,
			_usecase=true,
			_trim=false,
			_query=q,
			_stripNum = /[\$,%]/g,
			_lastCommand=null,
			_lastField=null,
			_orDepth=0,
			_negate=false,
			_queuedOperator="",
			_sorting=[],
			_useProperties=true;
			if(typeof d==="object"&&d.push) {
				if(d.length>0){
					if(typeof d[0]!=="object"){
						_useProperties=false;
					}else{
						_useProperties=true;
					}
				}
			}else{
				throw "data provides is not an array";
			}
			this._hasData=function(){
				return _data===null?false:_data.length===0?false:true;
			};
			this._getStr=function(s){
				var phrase=[];
				if(_trim){
					phrase.push("jQuery.trim(");
				}
				phrase.push("String("+s+")");
				if(_trim){
					phrase.push(")");
				}
				if(!_usecase){
					phrase.push(".toLowerCase()");
				}
				return phrase.join("");
			};
			this._strComp=function(val){
				if(typeof val==="string"){
					return".toString()";
				}
				return"";
			};
			this._group=function(f,u){
				return({field:f.toString(),unique:u,items:[]});
			};
			this._toStr=function(phrase){
				if(_trim){
					phrase=$.trim(phrase);
				}
				phrase=phrase.toString().replace(/\\/g,'\\\\').replace(/\"/g,'\\"');
				return _usecase ? phrase : phrase.toLowerCase();
			};
			this._funcLoop=function(func){
				var results=[];
				$.each(_data,function(i,v){
					results.push(func(v));
				});
				return results;
			};
			this._append=function(s){
				var i;
				if(_query===null){
					_query="";
				} else {
					_query+=_queuedOperator === "" ? " && " :_queuedOperator;
				}
				for (i=0;i<_orDepth;i++){
					_query+="(";
				}
				if(_negate){
					_query+="!";
				}
				_query+="("+s+")";
				_negate=false;
				_queuedOperator="";
				_orDepth=0;
			};
			this._setCommand=function(f,c){
				_lastCommand=f;
				_lastField=c;
			};
			this._resetNegate=function(){
				_negate=false;
			};
			this._repeatCommand=function(f,v){
				if(_lastCommand===null){
					return self;
				}
				if(f!==null&&v!==null){
					return _lastCommand(f,v);
				}
				if(_lastField===null){
					return _lastCommand(f);
				}
				if(!_useProperties){
					return _lastCommand(f);
				}
				return _lastCommand(_lastField,f);
			};
			this._equals=function(a,b){
				return(self._compare(a,b,1)===0);
			};
			this._compare=function(a,b,d){
				var toString = Object.prototype.toString;
				if( d === undefined) { d = 1; }
				if(a===undefined) { a = null; }
				if(b===undefined) { b = null; }
				if(a===null && b===null){
					return 0;
				}
				if(a===null&&b!==null){
					return 1;
				}
				if(a!==null&&b===null){
					return -1;
				}
				if (toString.call(a) === '[object Date]' && toString.call(b) === '[object Date]') {
					if (a < b) { return -d; }
					if (a > b) { return d; }
					return 0;
				}
				if(!_usecase && typeof a !== "number" && typeof b !== "number" ) {
					a=String(a);
					b=String(b);
				}
				if(a<b){return -d;}
				if(a>b){return d;}
				return 0;
			};
			this._performSort=function(){
				if(_sorting.length===0){return;}
				_data=self._doSort(_data,0);
			};
			this._doSort=function(d,q){
				var by=_sorting[q].by,
				dir=_sorting[q].dir,
				type = _sorting[q].type,
				dfmt = _sorting[q].datefmt,
				sfunc = _sorting[q].sfunc;
				if(q===_sorting.length-1){
					return self._getOrder(d, by, dir, type, dfmt, sfunc);
				}
				q++;
				var values=self._getGroup(d,by,dir,type,dfmt), results=[], i, j, sorted;
				for(i=0;i<values.length;i++){
					sorted=self._doSort(values[i].items,q);
					for(j=0;j<sorted.length;j++){
						results.push(sorted[j]);
					}
				}
				return results;
			};
			this._getOrder=function(data,by,dir,type, dfmt, sfunc){
				var sortData=[],_sortData=[], newDir = dir==="a" ? 1 : -1, i,ab,
				findSortKey;

				if(type === undefined ) { type = "text"; }
				if (type === 'float' || type=== 'number' || type=== 'currency' || type=== 'numeric') {
					findSortKey = function($cell) {
						var key = parseFloat( String($cell).replace(_stripNum, ''));
						return isNaN(key) ? Number.NEGATIVE_INFINITY : key;
					};
				} else if (type==='int' || type==='integer') {
					findSortKey = function($cell) {
						return $cell ? parseFloat(String($cell).replace(_stripNum, '')) : Number.NEGATIVE_INFINITY;
					};
				} else if(type === 'date' || type === 'datetime') {
					findSortKey = function($cell) {
						return jgrid.parseDate.call(context,dfmt,$cell).getTime();
					};
				} else if($.isFunction(type)) {
					findSortKey = type;
				} else {
					findSortKey = function($cell) {
						$cell = $cell ? $.trim(String($cell)) : "";
						return _usecase ? $cell : $cell.toLowerCase();
					};
				}
				$.each(data,function(i,v){
					ab = by!=="" ? jgrid.getAccessor(v,by) : v;
					if(ab === undefined) { ab = ""; }
					ab = findSortKey(ab, v);
					_sortData.push({ 'vSort': ab,'index':i});
				});
				if($.isFunction(sfunc)) {
					_sortData.sort(function(a,b){
						a = a.vSort;
						b = b.vSort;
						return sfunc.call(this,a,b,newDir);
					});
				} else {
					_sortData.sort(function(a,b){
						a = a.vSort;
						b = b.vSort;
						return self._compare(a,b,newDir);
					});
				}
				var j = 0, nrec= data.length;
				// overhead, but we do not change the original data.
				while(j<nrec) {
					i = _sortData[j].index;
					sortData.push(data[i]);
					j++;
				}
				return sortData;
			};
			this._getGroup=function(data,by,dir,type, dfmt){
				var results=[],
				group=null,
				last=null;
				$.each(self._getOrder(data,by,dir,type, dfmt),function(i,v){
					var val = jgrid.getAccessor(v, by);
					if(val == null) { val = ""; }
					if(!self._equals(last,val)){
						last=val;
						if(group !== null){
							results.push(group);
						}
						group=self._group(by,val);
					}
					group.items.push(v);
				});
				if(group !== null){
					results.push(group);
				}
				return results;
			};
			this.ignoreCase=function(){
				_usecase=false;
				return self;
			};
			this.useCase=function(){
				_usecase=true;
				return self;
			};
			this.trim=function(){
				_trim=true;
				return self;
			};
			this.noTrim=function(){
				_trim=false;
				return self;
			};
			this.execute=function(){
				var match=_query, results=[];
				if(match === null){
					return self;
				}
				$.each(_data,function(){
					if(eval(match)){results.push(this);}
				});
				_data=results;
				return self;
			};
			this.data=function(){
				return _data;
			};
			this.select=function(f){
				self._performSort();
				if(!self._hasData()){ return[]; }
				self.execute();
				if($.isFunction(f)){
					var results=[];
					$.each(_data,function(i,v){
						results.push(f(v));
					});
					return results;
				}
				return _data;
			};
			this.hasMatch=function(){
				if(!self._hasData()) { return false; }
				self.execute();
				return _data.length>0;
			};
			this.andNot=function(f,v,x){
				_negate=!_negate;
				return self.and(f,v,x);
			};
			this.orNot=function(f,v,x){
				_negate=!_negate;
				return self.or(f,v,x);
			};
			this.not=function(f,v,x){
				return self.andNot(f,v,x);
			};
			this.and=function(f,v,x){
				_queuedOperator=" && ";
				if(f===undefined){
					return self;
				}
				return self._repeatCommand(f,v,x);
			};
			this.or=function(f,v,x){
				_queuedOperator=" || ";
				if(f===undefined) { return self; }
				return self._repeatCommand(f,v,x);
			};
			this.orBegin=function(){
				_orDepth++;
				return self;
			};
			this.orEnd=function(){
				if (_query !== null){
					_query+=")";
				}
				return self;
			};
			this.isNot=function(f){
				_negate=!_negate;
				return self.is(f);
			};
			this.is=function(f){
				self._append('this.'+f);
				self._resetNegate();
				return self;
			};
			this._compareValues=function(func,f,v,how,t){
				var fld;
				if(_useProperties){
					fld=f;
				}else{
					fld='this';
				}
				if(v===undefined) { v = null; }
				//var val=v===null?f:v,
				var val =v,
				swst = t.stype === undefined ? "text" : t.stype;
				if(v !== null) {
				switch(swst) {
					case 'int':
					case 'integer':
						val = (isNaN(Number(val)) || val==="") ? '0' : val; // To be fixed with more inteligent code
						fld = 'parseInt('+fld+',10)';
						val = 'parseInt('+val+',10)';
						break;
					case 'float':
					case 'number':
					case 'numeric':
						val = String(val).replace(_stripNum, '');
						val = (isNaN(Number(val)) || val==="") ? '0' : val; // To be fixed with more inteligent code
						fld = 'parseFloat('+fld+')';
						val = 'parseFloat('+val+')';
						break;
					case 'date':
					case 'datetime':
						val = String(jgrid.parseDate.call(context,t.newfmt || 'Y-m-d',val).getTime());
						fld = 'jQuery.jgrid.parseDate.call(jQuery("'+context.p.idSel+'")[0],"'+t.srcfmt+'",'+fld+').getTime()';
						break;
					default :
						fld=self._getStr(fld);
						val=self._getStr('"'+self._toStr(val)+'"');
				}
				}
				self._append(fld+' '+how+' '+val);
				self._setCommand(func,f);
				self._resetNegate();
				return self;
			};
			this.equals=function(f,v,t){
				return self._compareValues(self.equals,f,v,"==",t);
			};
			this.notEquals=function(f,v,t){
				return self._compareValues(self.equals,f,v,"!==",t);
			};
			this.isNull = function(f,v,t){
				return self._compareValues(self.equals,f,null,"===",t);
			};
			this.greater=function(f,v,t){
				return self._compareValues(self.greater,f,v,">",t);
			};
			this.less=function(f,v,t){
				return self._compareValues(self.less,f,v,"<",t);
			};
			this.greaterOrEquals=function(f,v,t){
				return self._compareValues(self.greaterOrEquals,f,v,">=",t);
			};
			this.lessOrEquals=function(f,v,t){
				return self._compareValues(self.lessOrEquals,f,v,"<=",t);
			};
			this.startsWith=function(f,v){
				var val = (v==null) ? f: v,
				length=_trim ? $.trim(val.toString()).length : val.toString().length;
				if(_useProperties){
					self._append(self._getStr(f)+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(v)+'"'));
				}else{
					if (v!=null) { length=_trim?$.trim(v.toString()).length:v.toString().length; }
					self._append(self._getStr('this')+'.substr(0,'+length+') == '+self._getStr('"'+self._toStr(f)+'"'));
				}
				self._setCommand(self.startsWith,f);
				self._resetNegate();
				return self;
			};
			this.endsWith=function(f,v){
				var val = (v==null) ? f: v,
				length=_trim ? $.trim(val.toString()).length:val.toString().length;
				if(_useProperties){
					self._append(self._getStr(f)+'.substr('+self._getStr(f)+'.length-'+length+','+length+') == "'+self._toStr(v)+'"');
				} else {
					self._append(self._getStr('this')+'.substr('+self._getStr('this')+'.length-"'+self._toStr(f)+'".length,"'+self._toStr(f)+'".length) == "'+self._toStr(f)+'"');
				}
				self._setCommand(self.endsWith,f);self._resetNegate();
				return self;
			};
			this.contains=function(f,v){
				if(_useProperties){
					self._append(self._getStr(f)+'.indexOf("'+self._toStr(v)+'",0) > -1');
				}else{
					self._append(self._getStr('this')+'.indexOf("'+self._toStr(f)+'",0) > -1');
				}
				self._setCommand(self.contains,f);
				self._resetNegate();
				return self;
			};
			this.groupBy=function(by,dir,type, datefmt){
				if(!self._hasData()){
					return null;
				}
				return self._getGroup(_data,by,dir,type, datefmt);
			};
			this.orderBy=function(by,dir,stype, dfmt, sfunc){
				dir = dir == null ? "a" :$.trim(dir.toString().toLowerCase());
				if(stype == null) { stype = "text"; }
				if(dfmt == null) { dfmt = "Y-m-d"; }
				if(sfunc == null) { sfunc = false; }
				if(dir==="desc"||dir==="descending"){dir="d";}
				if(dir==="asc"||dir==="ascending"){dir="a";}
				_sorting.push({by:by,dir:dir,type:stype, datefmt: dfmt, sfunc: sfunc});
				return self;
			};
			this.custom = function (ruleOp, field, data) {
				self._append('jQuery("'+context.p.idSel+'")[0].p.customSortOperations.'+ruleOp+'.filter.call(jQuery("'+context.p.idSel+'")[0],{item:this,cmName:"'+field+'",searchValue:"'+data+'"})');
				self._setCommand(self.custom,field);
				self._resetNegate();
				return self;
			};
			return self;
		};
		return new QueryObject(source,null);
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
		var eventName = callbackName.substring(0, 2) === "on"?
				"jqGrid" + eventPrefix + callbackName.charAt(2).toUpperCase() + callbackName.substring(3):
				"jqGrid" + eventPrefix + callbackName.charAt(0).toUpperCase() + callbackName.substring(1),
			args = $.makeArray(arguments).slice(4),
			callback = p[callbackName + callbackSuffix];

		args.unshift(eventName);
		args.unshift(callback);
		return jgrid.fullBoolFeedback.apply(self, args);
	},
	getIconRes: function (base, path) {
		var pathParts = path.split("."), root, n = pathParts.length, i, classes = [];
		base = jgrid.icons[base];
		if (base == null) {
			return ""; // error unknows iconSet
		}
		root = base;
		if (root.common) {
			classes.push(root.common);
		}
		for (i = 0; i < n; i++) {
			if (!pathParts[i]) {
				break;
			}
			root = root[pathParts[i]];
			if (root === undefined) {
				break;
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
	},
	convertOnSaveLocally: function (nData, cm, oData, rowid, item, iCol) {
		var self = this, p = self.p;
		if (p == null) {
			return nData;
		}
		if ($.isFunction(cm.convertOnSave)) {
			return cm.convertOnSave.call(this, {newValue: nData, cm: cm, oldValue: oData, id: rowid, item: item, iCol: iCol});
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
					cm.editoptions.value.split(":") : ["yes","no"];
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
	getMethod: function (name) {
        return this.getAccessor($.fn.jqGrid, name);
	},
	extend : function(methods) {
		$.extend($.fn.jqGrid,methods);
		if (!this.no_legacy_api) {
			$.fn.extend(methods);
		}
	}
});
var clearArray = jgrid.clearArray, jqID = jgrid.jqID,
	getGridComponentIdSelector = jgrid.getGridComponentIdSelector, getGridComponentId = jgrid.getGridComponentId,
	getGridComponent = jgrid.getGridComponent, stripPref = jgrid.stripPref, randId = jgrid.randId,
	getAccessor = jgrid.getAccessor, getCellIndex = jgrid.getCellIndex, convertOnSaveLocally = jgrid.convertOnSaveLocally,
	stripHtml = jgrid.stripHtml, htmlEncode = jgrid.htmlEncode, htmlDecode = jgrid.htmlDecode,
	feedback = function () {
		// short form of $.jgrid.feedback to save usage this.p as the first parameter
		var args = $.makeArray(arguments);
		args.unshift("");
		args.unshift("");
		args.unshift(this.p);
		return jgrid.feedback.apply(this, args);
	};

$.fn.jqGrid = function( pin ) {
	if (typeof pin === 'string') {
		var fn = jgrid.getMethod(pin);
		if (!fn) {
			throw ("jqGrid - No such method: " + pin);
		}
		var args = $.makeArray(arguments).slice(1);
		return fn.apply(this,args);
	}
	return this.each( function() {
		if(this.grid) {return;}
		var ts = this, localData, localDataStr,
		fatalErrorFunction = jgrid.defaults != null && $.isFunction(jgrid.defaults.fatalError) ? jgrid.defaults.fatalError : alert,
		locale = pin.locale || ($.jgrid.defaults || {}).locale || "en-US",
		direction = locales[locale] != null && typeof locales[locale].isRTL === "boolean" ? (locales[locale].isRTL ? "rtl" : "ltr") : "ltr",
		iconSet = pin.iconSet || ($.jgrid.defaults || {}).iconSet || "jQueryUI",
		getIcon = function (path) {
			return jgrid.getIconRes(iconSet, path);
		};
		if (pin == null) {
			pin = { datatype: "local" };
		}
		if (pin.datastr !== undefined && $.isArray(pin.datastr)) {
			localDataStr = pin.datastr;
			pin.datastr = []; // don't clear the array, just change the value of datastr property
		}
		if (pin.data !== undefined) {
			localData = pin.data;
			pin.data = []; // don't clear the array, just change the value of data property
		}
		if (jgrid.formatter == null || jgrid.formatter.unused == null) {
			// detect old locale file grid.locale-XX.js are included (without DEEP extend).
			fatalErrorFunction("CRITICAL ERROR!!!\n\n\nOne uses probably\n\n	$.extend($.jgrid.defaults, {...});\n\nto set default settings of jqGrid instead of the usage the DEEP version of jQuery.extend (with true as the first parameter):\n\n	$.extend(true, $.jgrid.defaults, {...});\n\nOne other possible reason:\n\nyou included some OLD version of language file (grid.locale-en.js for example) AFTER jquery.jqGrid.min.js. For example all language files of jqGrid 4.7.0 uses non-deep call of jQuery.extend.\n\n\nSome options of jqGrid could still work, but another one will be broken.");
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

		var p = $.extend(true,{
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
			rowTotal : null,
			records: 0,
			pager: "",
			pgbuttons: true,
			pginput: true,
			colModel: [],
			rowList: [],
			colNames: [],
			sortorder: "asc",
			//showOneSortIcon: pin.showOneSortIcon !== undefined ? pin.showOneSortIcon :
			//	pin.iconSet === "fontAwesome" ? true : false, // hide or set ui-state-disabled class on the other icon
			sortname: "",
			//datatype: pin.datatype !== undefined ? pin.datatype : // datatype parameter are specified - use it
			//	localData !== undefined || pin.url == null ? "local" : // data parameter specified or no url are specified
			//		pin.jsonReader != null && typeof pin.jsonReader === "object" ? "json" : "xml", // if jsonReader are specified - use "json". In all other cases - use "xml"
			mtype: "GET",
			altRows: false,
			selarrrow: [],
			savedRow: [],
			shrinkToFit: true,
			xmlReader: {},
			//jsonReader: {},
			subGrid: false,
			subGridModel :[],
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
			onInitGrid : null,
			loadComplete: null,
			gridComplete: null,
			loadError: null,
			loadBeforeSend: null,
			afterInsertRow: null,
			beforeRequest: null,
			beforeProcessing : null,
			onHeaderClick: null,
			viewrecords: false,
			loadonce: false,
			multiselect: false,
			multikey: false,
			editurl: "clientArray",
			search: false,
			caption: "",
			hidegrid: true,
			hiddengrid: false,
			postData: {},
			userData: {},
			treeGrid : false,
			treeGridModel : 'nested',
			treeReader : {},
			treeANode : -1,
			ExpandColumn: null,
			tree_root_level : 0,
			prmNames: {page:"page",rows:"rows", sort: "sidx",order: "sord", search:"_search", nd:"nd", id:"id",oper:"oper",editoper:"edit",addoper:"add",deloper:"del", subgridid:"id", npage: null, totalrows:"totalrows"},
			forceFit : false,
			gridstate : "visible",
			cellEdit: false,
			//cellsubmit: pin.cellurl === undefined ? "clientArray" : "remote",
			nv:0,
			loadui: "enable",
			toolbar: [false,""],
			scroll: false,
			multiboxonly : false,
			deselectAfterSort : true,
			scrollrows : false,
			autowidth: false,
			scrollOffset :18,
			cellLayout: 5,
			subGridWidth: 16,
			multiselectWidth: 16,
			gridview: (pin == null || pin.afterInsertRow == null), // use true if callback afterInsertRow is not specified
			rownumWidth: 25,
			rownumbers : false,
			pagerpos: 'center',
			footerrow : false,
			userDataOnFooter : false,
			hoverrows : true,
			altclass : 'ui-priority-secondary',
			viewsortcols : [false,'vertical',true],
			resizeclass : '',
			autoencode : false, // true is better for the most cases, but we hold old value to have better backwards compatibility
			remapColumns : [],
			ajaxGridOptions :{},
			direction : direction,
			toppager: false,
			headertitles: false,
			scrollTimeout: 40,
			data : [],
			lastSelectedData : [],
			_index : {},
			grouping : false,
			groupingView : {groupField:[],groupOrder:[], groupText:[],groupColumnShow:[],groupSummary:[], showSummaryOnHide: false, sortitems:[], sortnames:[], summary:[],summaryval:[], displayField: [], groupSummaryPos:[], formatDisplayField : [], _locgr : false, commonIconClass: getIcon("grouping.common"), plusicon: getIcon("grouping.plus"), minusicon: getIcon("grouping.minus")},
			ignoreCase : true,
			cmTemplate : {},
			idPrefix : "",
			iconSet: "fontAwesome", //"jQueryUI",
			locale: locale,
			multiSort :  false,
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
		jgrid.defaults,
		{
			navOptions: $.extend(true, {
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
			actionsNavOptions: $.extend(true, {
				commonIconClass: getIcon("actions.common"),
				editicon: getIcon("actions.edit"),
				delicon: getIcon("actions.del"),
				saveicon: getIcon("actions.save"),
				cancelicon: getIcon("actions.cancel")
			}, jgrid.actionsNav || {}),
			formEditing: $.extend(true, {
				commonIconClass: getIcon("form.common"),
				prevIcon: getIcon("form.prev"),
				nextIcon: getIcon("form.next"),
				saveicon: [true, "left", getIcon("form.save")],
				closeicon: [true, "left", getIcon("form.undo")]
			}, jgrid.edit || {}),
			searching: $.extend(true, {
				commonIconClass: getIcon("search.common"),
				findDialogIcon: getIcon("search.search"),
				resetDialogIcon: getIcon("search.reset"),
				queryDialogIcon: getIcon("search.query")
			}, jgrid.search || {}),
			formViewing: $.extend(true, {
				commonIconClass: getIcon("form.common"),
				prevIcon: getIcon("form.prev"),
				nextIcon: getIcon("form.next"),
				closeicon: [true, "left", getIcon("form.cancel")]
			}, jgrid.view || {}),
			formDeleting: $.extend(true, {
				commonIconClass: getIcon("form.common"),
				delicon: [true, "left", getIcon("form.del")],
				cancelicon: [true, "left", getIcon("form.cancel")]
			}, jgrid.del || {})
		},
		pin || {}),
		getRes = function (path) {
			//return jgrid.getRes(jgrid, path) || jgrid.getRes(locales[locale], path);
			return $(ts).jqGrid("getGridRes", path);
		},
		getDef = function (path) {
			//return jgrid.getRes(jgrid, path) || jgrid.getRes(locales[locale], "defaults." + path) || jgrid.getRes(locales["en-US"], "defaults." + path);
			return $(ts).jqGrid("getGridRes", "defaults." + path);
		};
		// set dynamic options
		p.recordpos = p.recordpos || (p.direction === "rtl" ? "left" : "right");
		p.subGridOptions.openicon = p.direction === "rtl" ? getIcon("subgrid.openRtl") : getIcon("subgrid.openLtr");
		p.autoResizing.widthOfVisiblePartOfSortIcon =
			p.autoResizing.widthOfVisiblePartOfSortIcon !== undefined ?
			p.autoResizing.widthOfVisiblePartOfSortIcon :
			(p.iconSet === "fontAwesome" ? 13 : 12);
		//p.showOneSortIcon = p.showOneSortIcon !== undefined ? p.showOneSortIcon :
		//	(p.iconSet === "fontAwesome" ? true : false);
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
		if(ts.tagName.toUpperCase() !== 'TABLE') {
			fatalErrorFunction("Element is not a table!");
			return;
		}
		if (ts.id === "") {
			$(ts).attr("id", randId());
		}
		if(document.documentMode !== undefined ) { // IE only
			if(document.documentMode <= 5) {
				fatalErrorFunction("Grid can not be used in this ('quirks') mode!");
				return;
			}
		}
		$(ts).empty().attr("tabindex","0");
		ts.p = p;
		p.id = ts.id;
		p.idSel = "#" + jqID(ts.id);
		p.gBoxId = getGridComponentId.call(ts, "gBox");   // gbox id like "gbox_list" or "gbox_my.list"
		p.gBox = getGridComponentIdSelector.call(ts, "gBox");   // gbox selector like "#gbox_list" or "#gbox_my\\.list"
		p.gViewId = getGridComponentId.call(ts, "gView"); // gview id like "gview_list" or "gview_my.list"
		p.gView = getGridComponentIdSelector.call(ts, "gView"); // gview selector like "#gview_list" or "#gview_my\\.list"
		p.rsId = getGridComponentId.call(ts, "columnResizer"); // vertical div inside of gbox which will be seen on resizing of columns
		p.rs = getGridComponentIdSelector.call(ts, "columnResizer"); // vertical div inside of gbox which will be seen on resizing of columns
		p.cbId = getGridComponentId.call(ts, "selectAllCheckbox"); // "cb_" +id
		p.cb = getGridComponentIdSelector.call(ts, "selectAllCheckbox"); // "cb_" +id
		p.useProp = !!$.fn.prop;
		p.propOrAttr = p.useProp ? 'prop' : 'attr';

		var propOrAttr = p.propOrAttr,
		fixScrollOffsetAndhBoxPadding = jgrid.fixScrollOffsetAndhBoxPadding,
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
		grid = {
			headers:[],
			cols:[],
			footers: [],
			dragStart: function(i,x,y) {
				var self = this, $bDiv = $(self.bDiv), gridLeftPos = $bDiv.offset().left;
				self.resizing = { idx: i, startX: x.pageX, sOL : x.pageX - gridLeftPos, moved: false };
				self.hDiv.style.cursor = "col-resize";
				self.curGbox = $(p.rs,p.gBox);
				self.curGbox.css({display:"block",left:x.pageX-gridLeftPos,top:y[1],height:y[2]});
				self.curGbox.data("idx",i);
				myResizerClickHandler.call(this.curGbox, x);
				feedback.call(getGridComponent("bTable", $bDiv), "resizeStart", x, i);
				document.onselectstart=function(){return false;};
			},
			dragMove: function(x) {
				var self = this, resizing = self.resizing;
				if(resizing) {
					var diff = x.pageX-resizing.startX, headers = self.headers,
					h = headers[resizing.idx],
					newWidth = p.direction === "ltr" ? h.width + diff : h.width - diff, hn, nWn;
					resizing.moved = true;
					if(newWidth > 33) {
						if (self.curGbox == null) {
							self.curGbox = $(p.rs,p.gBox);
						}
						self.curGbox.css({left:resizing.sOL+diff});
						if(p.forceFit===true ){
							hn = headers[resizing.idx+p.nv];
							nWn = p.direction === "ltr" ? hn.width - diff : hn.width + diff;
							if(nWn > p.autoResizing.minColWidth ) {
								h.newWidth = newWidth;
								hn.newWidth = nWn;
							}
						} else {
							self.newWidth = p.direction === "ltr" ? p.tblwidth+diff : p.tblwidth-diff;
							h.newWidth = newWidth;
						}
					}
				}
			},
			resizeColumn: function (idx, skipCallbacks) {
				var self = this, headers = self.headers, footers = self.footers, h = headers[idx], hn, nw = h.newWidth || h.width,
					$bTable = getGridComponent("bTable", $(self.bDiv)), $hTable = getGridComponent("hTable", $(self.hDiv)),
					hCols = $hTable.children("thead").children("tr").first()[0].cells;
				nw = parseInt(nw,10);
				p.colModel[idx].width = nw;
				h.width = nw;
				hCols[idx].style.width = nw + "px";
				self.cols[idx].style.width = nw+"px";
				if(footers.length>0) {footers[idx].style.width = nw+"px";}
				fixScrollOffsetAndhBoxPadding.call($bTable[0]);
				if(p.forceFit===true){
					hn = headers[idx+p.nv]; // next visible th
					nw = hn.newWidth || hn.width;
					hn.width = nw;
					hCols[idx+p.nv].style.width = nw + "px";
					self.cols[idx+p.nv].style.width = nw+"px";
					if(footers.length>0) {footers[idx+p.nv].style.width = nw+"px";}
					p.colModel[idx+p.nv].width = nw;
				} else {
					p.tblwidth = self.newWidth || p.tblwidth;
					$bTable.css("width",p.tblwidth+"px");
					getGridComponent("hTable", $(self.hDiv)).css("width",p.tblwidth+"px");
					self.hDiv.scrollLeft = self.bDiv.scrollLeft;
					if(p.footerrow) {
						getGridComponent("fTable", $(self.sDiv)).css("width",p.tblwidth+"px");
						self.sDiv.scrollLeft = self.bDiv.scrollLeft;
					}
				}
				if (!p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%")) {
					$bTable.jqGrid("setGridWidth", self.newWidth, false);
				}
				if (!skipCallbacks) {
					feedback.call($bTable[0], "resizeStop", nw, idx);
				}
			},
			dragEnd: function() {
				var self = this;
				self.hDiv.style.cursor = "default";
				if(self.resizing) {
					if (self.resizing !== null && self.resizing.moved === true) {
						$(self.headers[self.resizing.idx].el).removeData("autoResized");
						self.resizeColumn(self.resizing.idx, false);
					}
					$(p.rs).removeData("pageX");
					self.resizing = false;
					setTimeout(function () {
						$(p.rs).css("display","none");
					}, p.doubleClickSensitivity);
				}
				self.curGbox = null;
				document.onselectstart=function(){return true;};
			},
			populateVisible: function() {
				var self = this, $self = $(self), gridSelf = self.grid, bDiv = gridSelf.bDiv, $bDiv = $(bDiv);
				if (gridSelf.timer) { clearTimeout(gridSelf.timer); }
				gridSelf.timer = null;
				var dh = $bDiv.height();
				if (!dh) { return; }
				var firstDataRow, rh;
				if(self.rows.length) {
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
				if ( tbot < dh && ttop <= 0 &&
					(p.lastpage===undefined||(parseInt((tbot + scrollTop + div - 1) / div,10) || 0) <= p.lastpage))
				{
					npage = parseInt((dh - tbot + div - 1) / div,10) || 1;
					if (tbot >= 0 || npage < 2 || p.scroll === true) {
						page = ( Math.round((tbot + scrollTop) / div) || 0) + 1;
						ttop = -1;
					} else {
						ttop = 1;
					}
				}
				if (ttop > 0) {
					page = ( parseInt(scrollTop / div,10) || 0 ) + 1;
					npage = (parseInt((scrollTop + dh) / div,10) || 0) + 2 - page;
					empty = true;
				}
				if (npage) {
					if (p.lastpage && (page > p.lastpage || p.lastpage===1 || (page === p.page && page===p.lastpage)) ) {
						return;
					}
					if (gridSelf.hDiv.loading) {
						gridSelf.timer = setTimeout(function () {gridSelf.populateVisible.call(self);}, p.scrollTimeout);
					} else {
						p.page = page;
						if (empty) {
							gridSelf.selectionPreserver.call(self);
							gridSelf.emptyRows.call(self, false, false);
						}
						gridSelf.populate.call(self,npage);
					}
				}
			},
			scrollGrid: function(e) { // this must be bDiv
				var bDiv = this, $bTable = getGridComponent("bTable", $(bDiv));
				if (e) { e.stopPropagation(); }
				if ($bTable.length === 0) { return true; }
				var gridSelf = $bTable[0].grid;
				if (p.scroll) {
					var scrollTop = bDiv.scrollTop;
					// save last scrollTop of bDiv as property of grid object
					if (gridSelf.scrollTop === undefined) { gridSelf.scrollTop = 0; }
					if (scrollTop !== gridSelf.scrollTop) {
						gridSelf.scrollTop = scrollTop;
						if (gridSelf.timer) { clearTimeout(gridSelf.timer); }
						gridSelf.timer = setTimeout(function () {gridSelf.populateVisible.call($bTable[0]);}, p.scrollTimeout);
					}
				}
				gridSelf.hDiv.scrollLeft = bDiv.scrollLeft;
				if(p.footerrow) {
					gridSelf.sDiv.scrollLeft = bDiv.scrollLeft;
				}
			},
			selectionPreserver : function() {
				var self = this, $self = $(self), sr = p.selrow, sra = p.selarrrow ? $.makeArray(p.selarrrow) : null,
				bDiv = self.grid.bDiv, left = bDiv.scrollLeft,
				restoreSelection = function() {
					var i;
					p.selrow = null;
					clearArray(p.selarrrow); // p.selarrrow = [];
					if(p.multiselect && sra && sra.length>0) {
						for(i=0;i<sra.length;i++){
							if (sra[i] !== sr) {
								$self.jqGrid("setSelection",sra[i],false, null);
							}
						}
					}
					if (sr) {
						$self.jqGrid("setSelection",sr,false,null);
					}
					bDiv.scrollLeft = left;
					$self.unbind('.selectionPreserver', restoreSelection);
				};
				$self.bind('jqGridGridComplete.selectionPreserver', restoreSelection);				
			}
		};
		ts.grid = grid;
		feedback.call(ts, "beforeInitGrid");

	    // TODO: replace altclass : 'ui-priority-secondary',
	    // set default buttonicon : 'ui-icon-newwin' of navButtonAdd: fa-external-link, fa-desktop or other 
	    // change the order in $.extend to allows to set icons using $.jgrid (for example $.jgrid.nav). It will be ovewritten currently by p.navOptions which we set above.
		var iCol, dir;
		if(p.colNames.length === 0) {
			for (iCol=0;iCol<p.colModel.length;iCol++){
				p.colNames[iCol] = p.colModel[iCol].label || p.colModel[iCol].name;
			}
		}
		if( p.colNames.length !== p.colModel.length ) {
			fatalErrorFunction(getRes("errors.model"));
			return;
		}
		var gv = $("<div class='ui-jqgrid-view' role='grid' aria-multiselectable='" + !!p.multiselect +"'></div>"),
		isMSIE = jgrid.msie,
		isMSIE7 = isMSIE && jgrid.msiever() < 8;
		p.direction = $.trim(p.direction.toLowerCase());
		if($.inArray(p.direction,["ltr","rtl"]) === -1) { p.direction = "ltr"; }
		dir = p.direction;

		$(gv).insertBefore(ts);
		$(ts).removeClass("scroll").appendTo(gv);
		var eg = $("<div class='ui-jqgrid ui-widget ui-widget-content ui-corner-all'></div>");
		$(eg).attr({"id": p.gBoxId,"dir": dir}).insertBefore(gv);
		$(gv).attr("id", p.gViewId).appendTo(eg);
		$("<div class='ui-widget-overlay jqgrid-overlay' id='lui_"+p.id+"'></div>").insertBefore(gv);
		$("<div class='loading ui-state-default ui-state-active' id='load_"+p.id+"'>"+getDef("loadtext")+"</div>").insertBefore(gv);
		if (isMSIE7) {
			$(ts).attr({cellspacing:"0"});
		}
		$(ts).attr({"role":"presentation","aria-labelledby":"gbox_"+ts.id});
		var sortkeys = ["shiftKey","altKey","ctrlKey"],
		stripGridPrefix = function (rowId) {
			return stripPref(p.idPrefix, rowId);
		},
		intNum = function(val,defval) {
			val = parseInt(val,10);
			if (isNaN(val)) { return defval || 0;}
			return val;
		},
		formatCol = function (pos, rowInd, tv, rawObject, rowId, rdata){
			var cm = p.colModel[pos], cellAttrFunc,
			ral = cm.align, result="style=\"", clas = cm.classes, nm = cm.name, celp, acp=[];
			if(ral) { result += "text-align:"+ral+";"; }
			if(cm.hidden===true) { result += "display:none;"; }
			if(rowInd===0) {
				result += "width: "+grid.headers[pos].width+"px;";
			} else if ($.isFunction(cm.cellattr) || (typeof cm.cellattr === "string" && jgrid.cellattr != null && $.isFunction(jgrid.cellattr[cm.cellattr]))) {
				cellAttrFunc = $.isFunction(cm.cellattr) ? cm.cellattr : jgrid.cellattr[cm.cellattr];
				celp = cellAttrFunc.call(ts, rowId, tv, rawObject, cm, rdata);
				if(celp && typeof celp === "string") {
					celp = celp.replace(/style/i,'style').replace(/title/i,'title');
					if(celp.indexOf('title') > -1) { cm.title=false;}
					if(celp.indexOf('class') > -1) { clas = undefined;}
					acp = celp.replace(/\-style/g,'-sti').split(/style/);
					if(acp.length === 2 ) {
						acp[1] =  $.trim(acp[1].replace(/\-sti/g,'-style').replace("=",""));
						if(acp[1].indexOf("'") === 0 || acp[1].indexOf('"') === 0) {
							acp[1] = acp[1].substring(1);
						}
						result += acp[1].replace(/'/gi,'"');
					} else {
						result += "\"";
					}
				}
			}
			if(!acp.length) { acp[0] = ""; result += "\"";}
			result += (clas !== undefined ? (" class=\""+clas+"\"") :"") + ((cm.title && tv) ? (" title=\""+stripHtml(tv)+"\"") :"");
			result += " aria-describedby=\""+p.id+"_"+nm+"\"";
			return result + acp[0];
		},
		cellVal =  function (val) {
			return val == null || val === "" ? "&#160;" : (p.autoencode ? htmlEncode(val) : String(val));
		},
		formatter = function (rowId, cellval, colpos, rwdat, act){
			var cm = p.colModel[colpos],v;
			if(cm.formatter !== undefined) {
				rowId = String(p.idPrefix) !== "" ? stripGridPrefix(rowId) : rowId;
				var opts= {rowId: rowId, colModel:cm, gid:p.id, pos:colpos };
				if($.isFunction( cm.formatter ) ) {
					v = cm.formatter.call(ts,cellval,opts,rwdat,act);
				} else if($.fmatter){
					v = $.fn.fmatter.call(ts,cm.formatter,cellval,opts,rwdat,act);
				} else {
					v = cellVal(cellval);
				}
			} else {
				v = cellVal(cellval);
			}
			return cm.autoResizable && cm.formatter !== "actions" ? "<span class='" + p.autoResizing.wrapperClassName + "'>" + v + "</span>" : v;
		},
		addCell = function(rowId,cell,pos,irow, srvr, rdata) {
			var v = formatter(rowId,cell,pos,srvr,'add');
			return "<td role=\"gridcell\" "+formatCol( pos,irow, v, srvr, rowId, rdata)+">"+v+"</td>";
		},
		addMulti = function(rowid,pos,irow,checked){
			var	v = "<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+p.id+"_"+rowid+"\" class=\"cbox\" name=\"jqg_"+p.id+"_"+rowid+"\"" + (checked ? " checked=\"checked\" aria-checked=\"true\"" : " aria-checked=\"false\"")+"/>";
			return "<td role=\"gridcell\" "+
				formatCol(pos,irow,'',null, rowid, true)+">"+v+"</td>";
		},
		addRowNum = function (pos,irow,pG,rN) {
			var v = (parseInt(pG,10)-1)*parseInt(rN,10)+1+irow;
			return "<td role=\"gridcell\" class=\"ui-state-default jqgrid-rownum\" "+
				formatCol(pos,irow,v, null, irow, true)+">"+v+"</td>";
		},
		reader = function (datatype) {
			var field, f=[], i, colModel = p.colModel, nCol = colModel.length, name;
			for(i=0; i<nCol; i++){
				field = colModel[i];
				if (field.name !== 'cb' && field.name !=='subgrid' && field.name !=='rn') {
					name = (datatype === "xml" || datatype === "xmlstring") ?
							field.xmlmap || field.name :
							(datatype === "local" && !p.dataTypeOrg) || datatype === "json" ? field.jsonmap || field.name : field.name;
					if(p.keyName !== false && field.key===true ) {
						p.keyName = name;
					}
					f.push(name);
				}
			}
			return f;
		},
		orderedCols = function (offset) {
			var order = p.remapColumns;
			if (!order || !order.length) {
				order = $.map(p.colModel, function(v,i) { return i; });
			}
			if (offset) {
				order = $.map(order, function(v) { return v<offset?null:v-offset; });
			}
			return order;
		},
		emptyRows = function (scroll, locdata) {
			var firstrow, self = this, rows = self.rows, bDiv = self.grid.bDiv;
			$(self).unbind(".jqGridFormatter");
			if (p.deepempty) {
				$(rows).slice(1).remove();
			} else {
				firstrow = rows.length > 0 ? rows[0] : null;
				$(self.firstChild).empty().append(firstrow);
			}
			if (scroll && p.scroll) {
				$(bDiv.firstChild).css({height: "auto"});
				$(bDiv.firstChild.firstChild).css({height: 0, display: "none"});
				if (bDiv.scrollTop !== 0) {
					bDiv.scrollTop = 0;
				}
			}
			if(locdata === true && p.treeGrid) {
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
			}
			//$(self.grid.headers).each(function () { $(this.el).removeData("autoResized"); });
		},
		normalizeData = function() {
			var data = p.data, dataLength = data.length, i, j, cur, cells, idn, idi, idr, v, rd,
			localReader = p.localReader,
			colModel = p.colModel,
			cellName = localReader.cell,
			iOffset = (p.multiselect === true ? 1 : 0) + (p.subGrid === true ? 1 : 0) + (p.rownumbers === true ? 1 : 0),
			br = p.scroll ? randId() : 1,
			arrayReader, objectReader, rowReader;

			if (p.datatype !== "local" || localReader.repeatitems !== true) {
				return; // nothing to do
			}

			arrayReader = orderedCols(iOffset);
			objectReader = reader("local");
			// read ALL input items and convert items to be read by
			// $.jgrid.getAccessor with column name as the second parameter
			idn = p.keyName === false ?
				($.isFunction(localReader.id) ? localReader.id.call(this, data) : localReader.id) :
				p.keyName;
			if (!isNaN(idn)) {
				idi = Number(idn);
			}
			for (i = 0; i < colModel.length; i++) {
				if (colModel[i].name === idn) {
					idi = i - iOffset;
					break;
				}
			}
			for (i = 0; i < dataLength; i++) {
				cur = data[i];
				cells = cellName ? getAccessor(cur, cellName) || cur : cur;
				rowReader = $.isArray(cells) ? arrayReader : objectReader;
				idr = p.keyName === false ? getAccessor(cur, idn) : getAccessor(cells, rowReader[idi]);
				if (idr === undefined) {
					// it could be that one uses the index of column in localReader.id
					if (!isNaN(idn) && colModel[Number(idn) + iOffset] != null) {
						idr = getAccessor(cells, rowReader[Number(idn)]);
					}
					if (idr === undefined) {
						idr = br + i;
					}
				}
				rd = { };
				rd[localReader.id] = idr;
				for (j = 0; j < rowReader.length; j++) {
					v = getAccessor(cells, rowReader[j]);
					rd[colModel[j + iOffset].name] = v;
				}
				$.extend(true, data[i], rd);
			}
		},
		refreshIndex = function() {
			var datalen = p.data.length, idname, i, val;

			if(p.keyName === false || p.loadonce) {
				idname = p.localReader.id;
			} else {
				idname = p.keyName;
			}
			p._index = {};
			for(i =0;i < datalen; i++) {
				val = getAccessor(p.data[i],idname);
				if (val === undefined) { val=String(i+1); }
				p._index[val] = i;
			}
		},
		constructTr = function(id, hide, altClass, rd, cur, selected) {
			var tabindex = '-1', restAttr = '', attrName, style = hide ? 'display:none;' : '', self = this,
				classes = 'ui-widget-content jqgrow ui-row-' + p.direction + (altClass ? ' ' + altClass : '') + (selected ? ' ui-state-highlight' : ''),
				rowAttrObj = $(self).triggerHandler("jqGridRowAttr", [rd, cur, id]);
			if( typeof rowAttrObj !== "object" ) {
				rowAttrObj = $.isFunction(p.rowattr) ? p.rowattr.call(self, rd, cur, id) :
					(typeof p.rowattr === "string" && jgrid.rowattr != null && $.isFunction(jgrid.rowattr[p.rowattr]) ?
					 jgrid.rowattr[p.rowattr].call(self, rd, cur, id) : {});
			}
			if(rowAttrObj != null && !$.isEmptyObject( rowAttrObj )) {
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
					classes += ' ' + rowAttrObj['class'];
					delete rowAttrObj['class'];
				}
				// dot't allow to change role attribute
				try { delete rowAttrObj.role; } catch(ignore){}
				for (attrName in rowAttrObj) {
					if (rowAttrObj.hasOwnProperty(attrName)) {
						restAttr += ' ' + attrName + '=' + rowAttrObj[attrName];
					}
				}
			}
			return '<tr role="row" id="' + id + '" tabindex="' + tabindex + '" class="' + classes + '"' +
				(style === '' ? '' : ' style="' + style + '"') + restAttr + '>';
		},
		finalizationFormatters = function () {
			var i, formatName;
			for (i=0; i<p.colModel.length; i++) {
				formatName = p.colModel[i].formatter;
				if (typeof formatName === "string" && $.fn.fmatter != null &&
						$.isFunction($.fn.fmatter[formatName]) && $.isFunction($.fn.fmatter[formatName].pageFinalization)) {
					$.fn.fmatter[formatName].pageFinalization.call(this, i);
				}
			}
		},
		addXmlData = function (xml, rcnt, more, adjust) {
			var self = this, $self = $(this), startReq = new Date(), getXmlData = jgrid.getXmlData,
			locdata = (p.datatype !== "local" && p.loadonce) || p.datatype === "xmlstring",
			xmlid = "_id_", xmlRd = p.xmlReader, colModel = p.colModel,
			frd = p.datatype === "local" ? "local" : "xml";
			if(locdata) {
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
				p.localReader.id = xmlid;
			}
			p.reccount = 0;
			if($.isXMLDoc(xml)) {
				if(p.treeANode===-1 && !p.scroll) {
					emptyRows.call(self, false, true);
					rcnt=1;
				} else { rcnt = rcnt > 1 ? rcnt :1; }
			} else { return; }
			var i,fpos,ir=0,v,gi=p.multiselect===true?1:0,si=0,addSubGridCell,ni=p.rownumbers===true?1:0,idn, getId,f=[],colOrder,rd ={},
			xmlr,rid, rowData=[], cn=(p.altRows === true) ? p.altclass:"",cn1;
			if(p.subGrid===true) {
				si = 1;
				addSubGridCell = jgrid.getMethod("addSubGridCell");
			}
			if(!xmlRd.repeatitems) {f = reader(frd);}
			if( p.keyName===false) {
				idn = $.isFunction( xmlRd.id ) ?  xmlRd.id.call(self, xml) : xmlRd.id;
			} else {
				idn = p.keyName;
			}
			if (isNaN(idn) && xmlRd.repeatitems) {
				for (i=0; i<colModel.length; i++) {
					if (colModel[i].name === idn) {
						idn = i - (gi+si+ni);
						break;
					}
				}
			}

			if( String(idn).indexOf("[") === -1 ) {
				if (f.length) {
					getId = function( trow, k) {return $(idn,trow).text() || k;};
				} else {
					getId = function( trow, k) {return $(xmlRd.cell,trow).eq(idn).text() || k;};
				}
			}
			else {
				getId = function( trow, k) {return trow.getAttribute(idn.replace(/[\[\]]/g,"")) || k;};
			}
			p.userData = {};
			p.page = intNum(getXmlData(xml, xmlRd.page), p.page);
			p.lastpage = intNum(getXmlData(xml, xmlRd.total), 1);
			p.records = intNum(getXmlData(xml, xmlRd.records));
			if($.isFunction(xmlRd.userdata)) {
				p.userData = xmlRd.userdata.call(self, xml) || {};
			} else {
				getXmlData(xml, xmlRd.userdata, true).each(function() {p.userData[this.getAttribute("name")]= $(this).text();});
			}
			var hiderow=false, groupingPrepare, gxml = getXmlData( xml, xmlRd.root, true);
			gxml = getXmlData(gxml, xmlRd.row, true) || [];
			var gl = gxml.length, j=0, grpdata=[], rn = parseInt(p.rowNum,10), br=p.scroll?randId():1, altr, iStartTrTag, cells;
			if (gl > 0 &&  p.page <= 0) { p.page = 1; }
			if(p.grouping) {
				hiderow = p.groupingView.groupCollapse === true;
				groupingPrepare = jgrid.getMethod("groupingPrepare");
			}
			var cell, $tbody = $(self.tBodies[0]); //$self.children("tbody").filter(":first");
			if(gxml && gl){
				if (adjust) { rn *= adjust+1; }
				while (j<gl) {
					xmlr = gxml[j];
					rid = getId(xmlr,br+j);
					rid  = p.idPrefix + rid;
					altr = rcnt === 0 ? 0 : rcnt+1;
					cn1 = (altr+j)%2 === 1 ? cn : '';
					iStartTrTag = rowData.length;
					rowData.push("");
					if( ni ) {
						rowData.push( addRowNum(0,j,p.page,p.rowNum) );
					}
					if( gi ) {
						rowData.push( addMulti(rid,ni,j, false) );
					}
					if( si ) {
						rowData.push( addSubGridCell.call($self,gi+ni,j+rcnt) );
					}
					if(xmlRd.repeatitems){
						if (!colOrder) { colOrder=orderedCols(gi+si+ni); }
						cells = getXmlData( xmlr, xmlRd.cell, true);
						for(i = 0; i < colOrder.length;i++) {
							cell = cells[colOrder[i]];
							if (!cell) {
								break;
							}
							v = cell.textContent || cell.text;
							rd[colModel[i+gi+si+ni].name] = v;
							rowData.push( addCell(rid, v, i+gi+si+ni, j+rcnt, xmlr, rd) );
						}
					} else {
						for(i = 0; i < f.length;i++) {
							v = getXmlData( xmlr, f[i]);
							rd[colModel[i+gi+si+ni].name] = v;
							rowData.push( addCell(rid, v, i+gi+si+ni, j+rcnt, xmlr, rd) );
						}
					}
					rowData[iStartTrTag] = constructTr.call(self, rid, hiderow, cn1, rd, xmlr, false);
					rowData.push("</tr>");
					if(p.grouping) {
						grpdata.push( rowData );
						if(!p.groupingView._locgr) {
							groupingPrepare.call($self, rd, j );
						}
						rowData = [];
					}
					if(locdata || p.treeGrid === true) {
						rd[xmlid] = stripGridPrefix(rid);
						p.data.push(rd);
						p._index[rd[xmlid]] = p.data.length-1;
					}
					if(p.gridview === false ) {
						$tbody.append(rowData.join(''));
						feedback.call(self, "afterInsertRow", rid, rd, xmlr);
						clearArray(rowData);//rowData=[];
					}
					rd={};
					ir++;
					j++;
					if(ir===rn) {break;}
				}
			}
			if(p.gridview === true) {
				fpos = p.treeANode > -1 ? p.treeANode: 0;
				if(p.grouping) {
					if(!locdata) {
						$self.jqGrid('groupingRender',grpdata,colModel.length, p.page, rn);
						grpdata = null;
					}
				} else if(p.treeGrid === true && fpos > 0) {
					$(self.rows[fpos]).after(rowData.join(''));
				} else if (self.firstElementChild) {
					//$("tbody:first",self.grid.bDiv).append(rowData.join(''));
					self.firstElementChild.innerHTML += rowData.join(''); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				} else {
					// for IE8 for example
					$tbody($tbody.html() + rowData.join('')); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				}
			}
			if(p.subGrid === true ) {
				try {$self.jqGrid("addSubGrid",gi+ni);} catch (ignore){}
			}
			p.totaltime = new Date() - startReq;
			if(ir>0) { if(p.records===0) { p.records=gl;} }
			clearArray(rowData);
			if(p.treeGrid === true) {
				try {$self.jqGrid("setTreeNode", fpos+1, ir+fpos+1);} catch (ignore) {}
			}
			//if(!p.treeGrid && !p.scroll) {grid.bDiv.scrollTop = 0;}
			p.reccount=ir;
			p.treeANode = -1;
			if(p.userDataOnFooter) { $self.jqGrid("footerData","set",p.userData,true); }
			if(locdata) {
				p.records = gl;
				p.lastpage = Math.ceil(gl/ rn);
			}
			if (!more) { self.updatepager(false,true); }
			finalizationFormatters.call(self);
			if(locdata) {
				while (ir<gl) {
					xmlr = gxml[ir];
					rid = getId(xmlr,ir+br);
					rid  = p.idPrefix + rid;
					if(xmlRd.repeatitems){
						if (!colOrder) { colOrder=orderedCols(gi+si+ni); }
						cells = getXmlData( xmlr, xmlRd.cell, true);
						for(i = 0; i < colOrder.length;i++) {
							cell = cells[colOrder[i]];
							if (!cell) {
								break;
							}
							rd[colModel[i+gi+si+ni].name] = cell.textContent || cell.text;
						}
					} else {
						for(i = 0; i < f.length;i++) {
							v = getXmlData( xmlr, f[i]);
							rd[colModel[i+gi+si+ni].name] = v;
						}
					}
					rd[xmlid] = stripGridPrefix(rid);
					if(p.grouping) {
						groupingPrepare.call($self, rd, ir );
					}
					p.data.push(rd);
					p._index[rd[xmlid]] = p.data.length-1;
					rd = {};
					ir++;
				}
				if(p.grouping) {
					p.groupingView._locgr = true;
					$self.jqGrid('groupingRender', grpdata, colModel.length, p.page, rn);
					grpdata = null;
				}
			}
		},
		addJSONData = function(data, rcnt, more, adjust) {
			var self = this, $self = $(self), startReq = new Date();
			if(data) {
				if(p.treeANode === -1 && !p.scroll) {
					emptyRows.call(self, false, true);
					rcnt=1;
				} else { rcnt = rcnt > 1 ? rcnt :1; }
			} else {
				// in case of usage TreeGrid for example
				return;
			}

			var dReader, locid = "_id_", frd,
			locdata = (p.datatype !== "local" && p.loadonce) || p.datatype === "jsonstring";
			if(locdata) {
				clearArray(p.data); //p.data = [];
				clearArray(p.lastSelectedData); //p.lastSelectedData = [];
				p._index = {};
				p.localReader.id = locid;
			}
			p.reccount = 0;
			if(p.datatype === "local") {
				dReader =  p.localReader;
				frd= 'local';
			} else {
				dReader =  p.jsonReader;
				frd='json';
			}
			var ir,v,i,j,cur,cells,gi=p.multiselect?1:0,si=p.subGrid===true?1:0,addSubGridCell,ni=p.rownumbers===true?1:0,
			arrayReader=orderedCols(gi+si+ni),objectReader=reader(frd),rowReader,len,drows,idn,idi,rd={}, fpos, idr,rowData=[],
			cn=(p.altRows === true) ? p.altclass:"",cn1;
			p.page = intNum(getAccessor(data,dReader.page), p.page);
			p.lastpage = intNum(getAccessor(data,dReader.total), 1);
			p.records = intNum(getAccessor(data,dReader.records));
			p.userData = getAccessor(data,dReader.userdata) || {};
			if(si) {
				addSubGridCell = jgrid.getMethod("addSubGridCell");
			}
			if( p.keyName===false ) {
				idn = $.isFunction(dReader.id) ? dReader.id.call(self, data) : dReader.id; 
			} else {
				idn = p.keyName;
			}
			if (!isNaN(idn)) {
				idi = Number(idn);
			}
			for (i=0; i<p.colModel.length; i++) {
				// we need to have idi with corresponds the indexes in rowReader which SKIPS
				// columns 'cb', 'subgrid' and !=='rn'
				if (p.colModel[i].name === idn) {
					idi = i - (gi+si+ni);
					break;
				}
			}
			drows = getAccessor(data,dReader.root);
			if (drows == null && $.isArray(data)) { drows = data; }
			if (!drows) { drows = []; }
			len = drows.length;
			if (len > 0 && p.page <= 0) { p.page = 1; }
			var rn = parseInt(p.rowNum,10),br=p.scroll?randId():1, altr, selected=false, selr;
			if (adjust) { rn *= adjust+1; }
			if(p.datatype === "local" && !p.deselectAfterSort) {
				selected = true;
			}
			var grpdata=[],hiderow=false, groupingPrepare, iStartTrTag;
			if(p.grouping)  {
				hiderow = p.groupingView.groupCollapse === true;
				groupingPrepare = jgrid.getMethod("groupingPrepare");
			}
			var $tbody = $(self.tBodies[0]); //$self.children("tbody").filter(":first");
			for (i=0; i<len && i<rn; i++) {
				cur = drows[i];
				cells = dReader.repeatitems && dReader.cell ? getAccessor(cur, dReader.cell) || cur : cur;
				rowReader = dReader.repeatitems && $.isArray(cells) ? arrayReader : objectReader;
				idr = p.keyName === false ? getAccessor(cur, idn) : getAccessor(cells, rowReader[idi]);
				if(idr === undefined) {
					// it could be that one uses the index of column in dReader.id
					if (!isNaN(idn) && p.colModel[Number(idn)+gi+si+ni] != null) {
						idr = getAccessor(cells, rowReader[Number(idn)]);
					}
					if(idr === undefined) {
						idr = br+i;
					}
				}
				idr  = p.idPrefix + idr;
				altr = rcnt === 1 ? 0 : rcnt;
				cn1 = (altr+i)%2 === 1 ? cn : '';
				if( selected) {
					if( p.multiselect) {
						selr = ($.inArray(idr, p.selarrrow) !== -1);
					} else {
						selr = (idr === p.selrow);
					}
				}
				iStartTrTag = rowData.length;
				rowData.push("");
				if( ni ) {
					rowData.push( addRowNum(0,i,p.page,p.rowNum) );
				}
				if( gi ){
					rowData.push( addMulti(idr,ni,i,selr) );
				}
				if( si ) {
					rowData.push( addSubGridCell.call($self,gi+ni,i+rcnt) );
				}
				for (j=0;j<rowReader.length;j++) {
					v = getAccessor(cells, rowReader[j]);
					rd[p.colModel[j+gi+si+ni].name] = v;
					rowData.push( addCell(idr,v,j+gi+si+ni,i+rcnt,cells, rd) );
				}
				rowData[iStartTrTag] = constructTr.call(self, idr, hiderow, cn1, rd, cells, selr);
				rowData.push( "</tr>" );
				if(p.grouping) {
					grpdata.push( rowData );
					if(!p.groupingView._locgr) {
						groupingPrepare.call($self, rd, i);
					}
					rowData = [];
				}
				if(locdata || p.treeGrid===true) {
					rd[locid] = stripGridPrefix(idr);
					p.data.push(rd);
					p._index[rd[locid]] = p.data.length-1;
				}
				if(p.gridview === false ) {
					$tbody.append(rowData.join('')); // ??? $self.append(rowData.join(''));
					feedback.call(self, "afterInsertRow", idr, rd, cells);
					clearArray(rowData); // rowData=[];
				}
				rd={};
			}
			if(p.gridview === true ) {
				fpos = p.treeANode > -1 ? p.treeANode: 0;
				if(p.grouping) {
					if(!locdata) {
						$self.jqGrid('groupingRender', grpdata, p.colModel.length, p.page, rn);
						grpdata = null;
					}
				} else if(p.treeGrid === true && fpos > 0) {
					$(self.rows[fpos]).after(rowData.join(''));
				} else if (self.firstElementChild) {
					self.firstElementChild.innerHTML += rowData.join(''); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				} else {
					// for IE8 for example
					$tbody.html($tbody.html() + rowData.join('')); // append to innerHTML of tbody which contains the first row (.jqgfirstrow)
					self.grid.cols = self.rows[0].cells; // update cached first row
				}
			}
			if(p.subGrid === true ) {
				try { $self.jqGrid("addSubGrid",gi+ni);} catch (ignore){}
			}
			p.totaltime = new Date() - startReq;
			if(i>0) {
				if(p.records===0) { p.records=len; }
			}
			clearArray(rowData);
			if( p.treeGrid === true) {
				try {$self.jqGrid("setTreeNode", fpos+1, i+fpos+1);} catch (ignore) {}
			}
			//if(!p.treeGrid && !p.scroll) {grid.bDiv.scrollTop = 0;}
			p.reccount=i;
			p.treeANode = -1;
			if(p.userDataOnFooter) { $self.jqGrid("footerData","set",p.userData,true); }
			if(locdata) {
				p.records = len;
				p.lastpage = Math.ceil(len/ rn);
			}
			if (!more) { self.updatepager(false,true); }
			finalizationFormatters.call(self);
			if(locdata) {
				for (ir=i; ir<len && drows[ir]; ir++) {
					cur = drows[ir];
					cells = dReader.repeatitems && dReader.cell ? getAccessor(cur, dReader.cell) || cur : cur;
					rowReader = dReader.repeatitems && $.isArray(cells) ? arrayReader : objectReader;
					idr = p.keyName === false ? getAccessor(cur, idn) : getAccessor(cells, rowReader[idi]);
					if(idr === undefined) {
						// it could be that one uses the index of column in dReader.id
						if (!isNaN(idn) && p.colModel[Number(idn)+gi+si+ni] != null) {
							idr = getAccessor(cells, rowReader[Number(idn)]);
						}
						if(idr === undefined) {
							idr = br+ir;
						}
					}
					if(cells) {
						for (j=0;j<rowReader.length;j++) {
							rd[p.colModel[j+gi+si+ni].name] = getAccessor(cells,rowReader[j]);
						}
						rd[locid] = stripGridPrefix(idr);
						if(p.grouping) {
							groupingPrepare.call($self, rd, ir );
						}
						p.data.push(rd);
						p._index[rd[locid]] = p.data.length-1;
						rd = {};
					}
				}
				if(p.grouping) {
					p.groupingView._locgr = true;
					$self.jqGrid('groupingRender', grpdata, p.colModel.length, p.page, rn);
					grpdata = null;
				}
			}
		},
		addLocalData = function() {
			var $self = $(this), st = p.multiSort ? [] : "", sto=[], fndsort=false, cmtypes={}, grtypes=[], grindexes=[], srcformat, sorttype, newformat,
				dateDefaults = getRes("formatter.date");
			if(!$.isArray(p.data)) {
				return {};
			}
			var grpview = p.grouping ? p.groupingView : false, lengrp, gin;
			$.each(p.colModel,function(iCol){
				var cm = this, grindex = cm.index || cm.name;
				sorttype = cm.sorttype || "text";
				cmtypes[cm.name] = {reader: !p.dataTypeOrg ? cm.jsonmap || cm.name : cm.name, iCol: iCol, stype: sorttype, srcfmt:'', newfmt:'', sfunc: cm.sortfunc || null};
				if(sorttype === "date" || sorttype === "datetime") {
					if(cm.formatter && typeof cm.formatter === 'string' && cm.formatter === 'date') {
						if(cm.formatoptions && cm.formatoptions.srcformat) {
							srcformat = cm.formatoptions.srcformat;
						} else {
							srcformat = dateDefaults.srcformat;
						}
						if(cm.formatoptions && cm.formatoptions.newformat) {
							newformat = cm.formatoptions.newformat;
						} else {
							newformat = dateDefaults.newformat;
						}
					} else {
						srcformat = newformat = cm.datefmt || "Y-m-d";
					}
					cmtypes[cm.name].srcfmt = srcformat;
					cmtypes[cm.name].newfmt = newformat;
				}
				if(p.grouping) {
					for(gin =0, lengrp = grpview.groupField.length; gin< lengrp; gin++) {
						if( cm.name === grpview.groupField[gin]) {
							grtypes[gin] = cmtypes[grindex];
							grindexes[gin]= grindex;
						}
					}
				}
				if(p.multiSort) {
					if(cm.lso) {
						st.push(cm.name);
						var tmplso= cm.lso.split("-");
						sto.push( tmplso[tmplso.length-1] );
					}
				} else {
					if(!fndsort && (cm.index === p.sortname || cm.name === p.sortname)){
						st = cm.name; // ???
						fndsort = true;
					}
				}
			});
			if(p.treeGrid) {
				$self.jqGrid("SortTree", st, p.sortorder,
					cmtypes[st] != null && cmtypes[st].stype ? cmtypes[st].stype : 'text',
					cmtypes[st] != null && cmtypes[st].srcfmt ? cmtypes[st].srcfmt : '');
				return false;
			}
			var compareFnMap = {
				'eq':function(queryObj) {return queryObj.equals;},
				'ne':function(queryObj) {return queryObj.notEquals;},
				'lt':function(queryObj) {return queryObj.less;},
				'le':function(queryObj) {return queryObj.lessOrEquals;},
				'gt':function(queryObj) {return queryObj.greater;},
				'ge':function(queryObj) {return queryObj.greaterOrEquals;},
				'cn':function(queryObj) {return queryObj.contains;},
				'nc':function(queryObj,op) {return op === "OR" ? queryObj.orNot().contains : queryObj.andNot().contains;},
				'bw':function(queryObj) {return queryObj.startsWith;},
				'bn':function(queryObj,op) {return op === "OR" ? queryObj.orNot().startsWith : queryObj.andNot().startsWith;},
				'en':function(queryObj,op) {return op === "OR" ? queryObj.orNot().endsWith : queryObj.andNot().endsWith;},
				'ew':function(queryObj) {return queryObj.endsWith;},
				'ni':function(queryObj,op) {return op === "OR" ? queryObj.orNot().equals : queryObj.andNot().equals;},
				'in':function(queryObj) {return queryObj.equals;},
				'nu':function(queryObj) {return queryObj.isNull;},
				'nn':function(queryObj,op) {return op === "OR" ? queryObj.orNot().isNull : queryObj.andNot().isNull;}
			},
			query = jgrid.from.call(this,p.data);
			if (p.ignoreCase) { query = query.ignoreCase(); }
			function tojLinq ( group ) {
				var s = 0, index, gor, ror, opr, rule, r, cmi;
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
						} catch (e) {fatalErrorFunction(e);}
						s++;
					}
					if (gor) {
						query.orEnd();
					}
				}
				if (group.rules != null) {
					try{
						ror = group.rules.length && group.groupOp.toString().toUpperCase() === "OR";
						if (ror) {
							query.orBegin();
						}
						for (index = 0; index < group.rules.length; index++) {
							rule = group.rules[index];
							opr = group.groupOp.toString().toUpperCase();
							if (compareFnMap[rule.op] && rule.field ) {
								if(s > 0 && opr && opr === "OR") {
									query = query.or();
								}
								cmi = cmtypes[rule.field];
								r = cmi.reader;
								query = compareFnMap[rule.op](query, opr)(
									$.isFunction(r) ?
										'jQuery.jgrid.getAccessor(this,jQuery("'+p.idSel+'")[0].p.colModel['+ cmi.iCol +'].jsonmap)' :
										'jQuery.jgrid.getAccessor(this,\''+r+'\')',
									rule.data,
									cmtypes[rule.field]);
							} else if (p.customSortOperations != null && p.customSortOperations[rule.op] != null && $.isFunction(p.customSortOperations[rule.op].filter)) {
								query = query.custom(rule.op, rule.field, rule.data);
							}
							s++;
						}
						if (ror) {
							query.orEnd();
						}
					} catch (g) {fatalErrorFunction(g);}
				}
			}
			if (p.search === true) {
				var srules = p.postData.filters;
				if(srules) {
					if(typeof srules === "string") { srules = jgrid.parse(srules);}
					tojLinq( srules );
				} else {
					try {
						query = compareFnMap[p.postData.searchOper](query)(p.postData.searchField, p.postData.searchString,cmtypes[p.postData.searchField]);
					} catch (ignore){}
				}
			}
			if(p.grouping) {
				for(gin=0; gin<lengrp;gin++) {
					query.orderBy(grindexes[gin],grpview.groupOrder[gin],grtypes[gin].stype, grtypes[gin].srcfmt);
				}
			}
			if(p.multiSort) {
				$.each(st,function(i){
					query.orderBy(this, sto[i], cmtypes[this].stype, cmtypes[this].srcfmt, cmtypes[this].sfunc);
				});
			} else {
				if (st && p.sortorder && fndsort) {
					if(p.sortorder.toUpperCase() === "DESC") {
						query.orderBy(p.sortname, "d", cmtypes[st].stype, cmtypes[st].srcfmt, cmtypes[st].sfunc);
					} else {
						query.orderBy(p.sortname, "a", cmtypes[st].stype, cmtypes[st].srcfmt, cmtypes[st].sfunc);
					}
				}
			}
			p.lastSelectedData = query.select();
			var recordsperpage = parseInt(p.rowNum,10),
			total = p.lastSelectedData.length,
			page = parseInt(p.page,10),
			totalpages = Math.ceil(total / recordsperpage),
			retresult = {};
			if((p.search || p.resetsearch) && p.grouping && p.groupingView._locgr) {
				p.groupingView.groups =[];
				var j, grPrepare = jgrid.getMethod("groupingPrepare"), key, udc;
				if(p.footerrow && p.userDataOnFooter) {
					for (key in p.userData) {
						if(p.userData.hasOwnProperty(key)) {
							p.userData[key] = 0;
						}
					}
					udc = true;
				}
				for(j=0; j<total; j++) {
					if(udc) {
						for(key in p.userData){
							if(p.userData.hasOwnProperty(key)) {
								p.userData[key] += parseFloat(p.lastSelectedData[j][key] || 0);
							}
						}
					}
					grPrepare.call($self,p.lastSelectedData[j],j, recordsperpage );
				}
			}
			query = null;
			cmtypes = null;
			var localReader = p.localReader;
			retresult[localReader.total] = totalpages;
			retresult[localReader.page] = page;
			retresult[localReader.records] = total;
			retresult[localReader.root] = p.lastSelectedData.slice((page-1)*recordsperpage, page*recordsperpage);
			retresult[localReader.userdata] = p.userData;
			return retresult;
		},
		setWidthOfPagerTdWithPager = function ($pgTable) {
			var self = this, w = $pgTable.outerWidth(), fontSize;
			if (w <= 0) { // not visible
				fontSize = $(self).closest(".ui-jqgrid>.ui-jqgrid-view").css("font-size") || "11px";
				$(document.body).append("<div id='testpg' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:"+
					fontSize+
					";visibility:hidden;' ></div>");
				$($pgTable).clone().appendTo("#testpg");
				w = $("#testpg>.ui-pg-table").width();
				$("#testpg").remove();
			}
			if (w > 0) {
				$pgTable.parent().width(w);
			}
			return w;
		},
		updatepager = function(rn, dnd) {
			var self = this, $self = $(self), gridSelf = self.grid, cp, last, base, from, to, tot, fmt, pgboxes = p.pager || "", sppg,
			tspg = p.pager ? "_"+p.pager.substr(1) : "", bDiv = gridSelf.bDiv, numberFormat = $.fmatter ? $.fmatter.NumberFormat : null,
			tspgTop = p.toppager ? "_"+p.toppager.substr(1) : "";
			base = parseInt(p.page,10)-1;
			if(base < 0) { base = 0; }
			base = base*parseInt(p.rowNum,10);
			to = base + p.reccount;
			if (p.scroll) {
				var rows = $(getGridComponent("bTable", $(bDiv))[0].rows).slice(1);//$("tbody:first > tr:gt(0)", bDiv);
				base = to - rows.length;
				p.reccount = rows.length;
				var rh = rows.outerHeight() || gridSelf.prevRowHeight;
				if (rh) {
					var top = base * rh;
					var height = parseInt(p.records,10) * rh;
					$(bDiv).children("div").first().css({height : height + "px"})
						.children("div").first().css({height:top + "px",display:top + "px"?"":"none"});
					if (bDiv.scrollTop === 0 && p.page > 1) {
						bDiv.scrollTop = p.rowNum * (p.page - 1) * rh;
					}
				}
				bDiv.scrollLeft = gridSelf.hDiv.scrollLeft;
			}
			pgboxes += p.toppager ? (pgboxes ? ",": "") + p.toppager : "";
			if(pgboxes) {
				fmt = getRes("formatter.integer") || {};
				cp = intNum(p.page);
				last = intNum(p.lastpage);
				$(".selbox", pgboxes)[propOrAttr]("disabled", false);
				if(p.pginput===true) {
					$('.ui-pg-input',pgboxes).val(p.page);
					sppg = p.toppager ? '#sp_1'+tspg+",#sp_1"+tspgTop : '#sp_1'+tspg;
					$(sppg).html($.fmatter ? numberFormat(p.lastpage,fmt):p.lastpage)
						.closest(".ui-pg-table").each(function () {
							setWidthOfPagerTdWithPager.call(self, $(this));
						});
				}
				if (p.viewrecords){
					if(p.reccount === 0) {
						$(".ui-paging-info",pgboxes).html(getDef("emptyrecords"));
					} else {
						from = base+1;
						tot=p.records;
						if($.fmatter) {
							from = numberFormat(from,fmt);
							to = numberFormat(to,fmt);
							tot = numberFormat(tot,fmt);
						}
						$(".ui-paging-info",pgboxes).html(jgrid.format(getDef("recordtext"),from,to,tot));
					}
				}
				if(p.pgbuttons===true) {
					if(cp<=0) {cp = last = 0;}
					if(cp===1 || cp === 0) {
						$("#first"+tspg+", #prev"+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');
						if(p.toppager) { $("#first_t"+tspgTop+", #prev_t"+tspgTop).addClass('ui-state-disabled').removeClass('ui-state-hover'); }
					} else {
						$("#first"+tspg+", #prev"+tspg).removeClass('ui-state-disabled');
						if(p.toppager) { $("#first_t"+tspgTop+", #prev_t"+tspgTop).removeClass('ui-state-disabled'); }
					}
					if(cp===last || cp === 0) {
						$("#next"+tspg+", #last"+tspg).addClass('ui-state-disabled').removeClass('ui-state-hover');
						if(p.toppager) { $("#next_t"+tspgTop+", #last_t"+tspgTop).addClass('ui-state-disabled').removeClass('ui-state-hover'); }
					} else {
						$("#next"+tspg+", #last"+tspg).removeClass('ui-state-disabled');
						if(p.toppager) { $("#next_t"+tspgTop+", #last_t"+tspgTop).removeClass('ui-state-disabled'); }
					}
				}
			}
			if(rn===true && p.rownumbers === true) {
				$(">td.jqgrid-rownum",self.rows).each(function(i){
					$(this).html(base+1+i);
				});
			}
			if(dnd && p.jqgdnd) { $self.jqGrid('gridDnD','updateDnD');}
			feedback.call(self, "gridComplete");
			$self.triggerHandler("jqGridAfterGridComplete");
		},
		beginReq = function() {
			var self = this;
			self.grid.hDiv.loading = true;
			if(p.hiddengrid) { return;}
			$(self).jqGrid("progressBar", {method:"show", loadtype : p.loadui, htmlcontent: getDef("loadtext") });
		},
		endReq = function() {
			var self = this;
			self.grid.hDiv.loading = false;
			$(self).jqGrid("progressBar", {method:"hide", loadtype : p.loadui });
		},
		populate = function (npage) {
			var self = this, $self = $(self), gridSelf = self.grid;
			if(!gridSelf.hDiv.loading) {
				var pvis = p.scroll && npage === false,
				prm = {}, dt, dstr, pN=p.prmNames;
				if(p.page <=0) { p.page = Math.min(1,p.lastpage); }
				if(pN.search !== null) {prm[pN.search] = p.search;} if(pN.nd !== null) {prm[pN.nd] = new Date().getTime();}
				if (isNaN(parseInt(p.rowNum,10)) || parseInt(p.rowNum,10) <= 0) { p.rowNum = p.maxRowNum; }
				if(pN.rows !== null) {prm[pN.rows]= p.rowNum;} if(pN.page !== null) {prm[pN.page]= p.page;}
				if(pN.sort !== null) {prm[pN.sort]= p.sortname;} if(pN.order !== null) {prm[pN.order]= p.sortorder;}
				if(p.rowTotal !== null && pN.totalrows !== null) { prm[pN.totalrows]= p.rowTotal; }
				var lcf = $.isFunction(p.loadComplete), lc = lcf ? p.loadComplete : null;
				var adjust = 0;
				npage = npage || 1;
				if (npage > 1) {
					if(pN.npage !== null) {
						prm[pN.npage] = npage;
						adjust = npage - 1;
						npage = 1;
					} else {
						lc = function(req) {
							p.page++;
							gridSelf.hDiv.loading = false;
							if (lcf) {
								p.loadComplete.call(self,req);
							}
							populate.call(self,npage-1);
						};
					}
				} else if (pN.npage !== null) {
					delete p.postData[pN.npage];
				}
				if(p.grouping) {
					$self.jqGrid('groupingSetup');
					var grp = p.groupingView, gi, gs="", index, iColumn, cmValue;
					for(gi=0;gi<grp.groupField.length;gi++) {
						index = grp.groupField[gi];
						for (iColumn = 0; iColumn < p.colModel.length; iColumn++) {
							cmValue = p.colModel[iColumn];
							if (cmValue.name === index && cmValue.index){
								index = cmValue.index;
							}
						}
						gs += index +" "+grp.groupOrder[gi]+", ";
					}
					prm[pN.sort] = gs + prm[pN.sort];
				}
				$.extend(p.postData,prm);
				var rcnt = !p.scroll ? 1 : self.rows.length-1,
				fixDisplayingHorizontalScrollbar = function () {
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
				},
				resort = function () {
					var iRes;
					if (p.autoresizeOnLoad) {
						$self.jqGrid("autoResizeAllColumns");
						clearArray(p.columnsToReResizing);
					} else {
						for (iRes = 0; iRes < p.columnsToReResizing.length; iRes++) {
							$self.jqGrid("autoResizeColumn", p.columnsToReResizing[iRes]);
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
					fixScrollOffsetAndhBoxPadding.call(self);
					fixDisplayingHorizontalScrollbar();
				},
				finalReportVirtual = function (data) {
					$self.triggerHandler("jqGridLoadComplete", [data]);
					if(lc) { lc.call(self, data); }
					resort();
					$self.triggerHandler("jqGridAfterLoadComplete", [data]);
					if (pvis) { gridSelf.populateVisible.call(self); }
					if (npage === 1) { endReq.call(self); }
					fixScrollOffsetAndhBoxPadding.call(self);
					fixDisplayingHorizontalScrollbar();
				};
				if (!feedback.call(self, "beforeRequest")) { return; }
				if ($.isFunction(p.datatype)) { p.datatype.call(self,p.postData,"load_"+p.id, rcnt, npage, adjust); return;}
				dt = p.datatype.toLowerCase();
				switch(dt)
				{
				case "json":
				case "jsonp":
				case "xml":
				case "script":
					$.ajax($.extend({
						url:p.url,
						type:p.mtype,
						dataType: dt ,
						//data: $.isFunction(p.serializeGridData)? p.serializeGridData.call(self,p.postData) : p.postData,
						data: jgrid.serializeFeedback.call(ts, p.serializeGridData, "jqGridSerializeGridData", p.postData),
						success: function (data, textStatus, jqXHR) {
							if ($.isFunction(p.beforeProcessing)) {
								if (p.beforeProcessing.call(self, data, textStatus, jqXHR) === false) {
									endReq.call(self);
									return;
								}
							}
							if(dt === "xml") { addXmlData.call(self,data,rcnt,npage>1,adjust); }
							else { addJSONData.call(self,data,rcnt,npage>1,adjust); }
							finalReportVirtual(data);
							if (p.loadonce || p.treeGrid) {
								p.dataTypeOrg = p.datatype;
								p.datatype = "local";
							}
						},
						error: function (jqXHR, textStatus, errorThrown) {
							if($.isFunction(p.loadError)) { p.loadError.call(self,jqXHR,textStatus,errorThrown); }
							if (npage === 1) { endReq.call(self); }
						},
						beforeSend: function (jqXHR, settings) {
							var gotoreq = true;
							if($.isFunction(p.loadBeforeSend)) {
								gotoreq = p.loadBeforeSend.call(self,jqXHR, settings); 
							}
							if(gotoreq === undefined) { gotoreq = true; }
							if(gotoreq === false) {
								return false;
							}
							beginReq.call(self);
						}
					},jgrid.ajaxOptions, p.ajaxGridOptions));
				break;
				case "xmlstring":
					beginReq.call(self);
					dstr = typeof p.datastr === 'string' ? $.parseXML(p.datastr) : p.datastr;
					addXmlData.call(self,dstr);
					finalReportSteps();
				break;
				case "jsonstring":
					beginReq.call(self);
					dstr = typeof p.datastr === 'string' ? jgrid.parse(p.datastr) : p.datastr;
					addJSONData.call(self,dstr);
					finalReportSteps();
				break;
				case "local":
				case "clientside":
					beginReq.call(self);
					p.datatype = "local";
					var req = addLocalData.call(self);
					addJSONData.call(self,req,rcnt,npage>1,adjust);
					finalReportVirtual(req);
				break;
				}
			}
		},
		setHeadCheckBox = function (checked) {
		    var self = this, gridSelf = self.grid;
			$(p.cb,gridSelf.hDiv)[p.propOrAttr]("checked", checked);
			var fid = p.frozenColumns ? p.id+"_frozen" : "";
			if(fid) {
				$(p.cb,gridSelf.fhDiv)[p.propOrAttr]("checked", checked);
			}
		},
		setPager = function (pgid, tp){
			var sep = "<td class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></td>",
			pginp = "",
			blockAlign = p.pagerpos === "left" ? "margin-right:auto;" : (p.pagerpos === "right" ? "margin-left:auto;" : "margin-left:auto;margin-right:auto;"),
			pgl="<table "+(isMSIE7 ? "cellspacing='0' " : "")+"style='table-layout:auto;"+blockAlign+"' class='ui-pg-table'><tbody><tr>",
			str="", pgcnt, lft, cent, rgt, twd, i,
			clearVals = function(onpaging, newPage, newRowNum){
				if (!feedback.call(ts, "onPaging", onpaging, {
							newPage: newPage,
							currentPage: intNum(p.page,1),
							lastPage: intNum(p.lastpage,1),
							currentRowNum: intNum(p.rowNum,10),
							newRowNum: newRowNum
						})) {return false;}
				p.selrow = null;
				if(p.multiselect) {
					clearArray(p.selarrrow); // p.selarrrow = [];
					setHeadCheckBox.call(ts, false);
				}
				clearArray(p.savedRow); // p.savedRow = [];
				return true;
			};
			tp += "_" + pgid;
			pgcnt = "pg_"+pgid;
			lft = pgid+"_left"; cent = pgid+"_center"; rgt = pgid+"_right";
			$("#"+jqID(pgid) )
			.append("<div id='"+pgcnt+"' class='ui-pager-control' role='group'><table "+(isMSIE7 ? "cellspacing='0' " : "")+"class='ui-pg-table' style='width:100%;table-layout:fixed;height:100%;'><tbody><tr><td id='"+lft+"' style='text-align:left;'></td><td id='"+cent+"' style='text-align:center;white-space:pre;'></td><td id='"+rgt+"' style='text-align:right;'></td></tr></tbody></table></div>")
			.attr("dir","ltr"); //explicit setting
			pgcnt = "#" + jqID(pgcnt); // modify to id selector
			if(p.rowList.length >0){
				str = "<td dir='"+dir+"'>";
				var pgrecs = getDef("pgrecs");
				str +="<select class='ui-pg-selbox' role='listbox' " + (pgrecs ? "title='"+pgrecs +"'" : "")+ ">";
				var strnm;
				for(i=0;i<p.rowList.length;i++){
					strnm = p.rowList[i].toString().split(":");
					if(strnm.length === 1) {
						strnm[1] = strnm[0];
					}
					str +="<option role=\"option\" value=\""+strnm[0]+"\""+(( intNum(p.rowNum,0) === intNum(strnm[0],0))?" selected=\"selected\"":"")+">"+strnm[1]+"</option>";
				}
				str +="</select></td>";
			}
			if(dir==="rtl") { pgl += str; }
			if(p.pginput===true) { pginp= "<td dir='"+dir+"'>"+jgrid.format(getDef("pgtext") || "","<input class='ui-pg-input' type='text' size='2' maxlength='7' value='0' role='textbox'/>","<span id='sp_1_"+pgid+"'>0</span>")+"</td>";}
			pgid = "#"+jqID(pgid); // modify to id selector
			if(p.pgbuttons===true) {
				var po=["first"+tp,"prev"+tp, "next"+tp,"last"+tp],
					pgfirst = getDef("pgfirst"),
					pgprev = getDef("pgprev"),
					pgnext = getDef("pgnext"),
					pglast = getDef("pglast");
				if(dir==="rtl") { po.reverse(); }
				pgl += "<td id='"+po[0]+"' class='ui-pg-button ui-corner-all' " + (pgfirst ? "title='"+pgfirst +"'" : "")+"><span class='" + getIcon("pager.first") + "'></span></td>";
				pgl += "<td id='"+po[1]+"' class='ui-pg-button ui-corner-all' " + (pgprev ? "title='"+pgprev +"'" : "")+"><span class='" + getIcon("pager.prev") + "'></span></td>";
				pgl += pginp !== "" ? sep+pginp+sep:"";
				pgl += "<td id='"+po[2]+"' class='ui-pg-button ui-corner-all' " + (pgnext ? "title='"+pgnext +"'" : "")+"><span class='" + getIcon("pager.next") + "'></span></td>";
				pgl += "<td id='"+po[3]+"' class='ui-pg-button ui-corner-all' " + (pglast ? "title='"+pglast +"'" : "")+"><span class='" + getIcon("pager.last") + "'></span></td>";
			} else if (pginp !== "") { pgl += pginp; }
			if(dir==="ltr") { pgl += str; }
			pgl += "</tr></tbody></table>";
			if(p.viewrecords===true) {$("td"+pgid+"_"+p.recordpos,pgcnt).append("<div dir='"+dir+"' style='text-align:"+p.recordpos+"' class='ui-paging-info'></div>");}
			var $pagerIn = $("td"+pgid+"_"+p.pagerpos,pgcnt);
			$pagerIn.append(pgl);
			twd = setWidthOfPagerTdWithPager.call(this, $pagerIn.children(".ui-pg-table"));
			p._nvtd = [];
			p._nvtd[0] = twd ? Math.floor((p.width - twd)/2) : Math.floor(p.width/3);
			p._nvtd[1] = 0;
			pgl=null;
			$('.ui-pg-selbox',pgcnt).bind('change',function() {
				var newRowNum = intNum(this.value, 10),
					newPage = Math.round(p.rowNum*(p.page-1)/newRowNum-0.5)+1;
				if(!clearVals('records', newPage, newRowNum)) { return false; }
				p.page = newPage;
				p.rowNum = newRowNum;
				if(p.pager) { $('.ui-pg-selbox',p.pager).val(newRowNum); }
				if(p.toppager) { $('.ui-pg-selbox',p.toppager).val(newRowNum); }
				populate.call(ts);
				return false;
			});
			if(p.pgbuttons===true) {
			$(".ui-pg-button",pgcnt).hover(function(){
				if($(this).hasClass('ui-state-disabled')) {
					this.style.cursor='default';
				} else {
					$(this).addClass('ui-state-hover');
					this.style.cursor='pointer';
				}
			},function() {
				if(!$(this).hasClass('ui-state-disabled')) {
					$(this).removeClass('ui-state-hover');
					this.style.cursor= "default";
				}
			});
			$("#first"+jqID(tp)+", #prev"+jqID(tp)+", #next"+jqID(tp)+", #last"+jqID(tp)).click( function() {
				if ($(this).hasClass("ui-state-disabled")) {
					return false;
				}
				var cp = intNum(p.page,1), newPage = cp, onpaging = this.id,
				last = intNum(p.lastpage,1), selclick = false,
				fp=true, pp=true, np=true,lp=true;
				if(last ===0 || last===1) {fp=false;pp=false;np=false;lp=false; }
				else if( last>1 && cp >=1) {
					if( cp === 1) { fp=false; pp=false; }
					//else if( cp>1 && cp <last){ }
					else if( cp===last){ np=false;lp=false; }
				} else if( last>1 && cp===0 ) { np=false;lp=false; cp=last-1;}
				if( this.id === 'first'+tp && fp ) { onpaging = 'first'; newPage=1; selclick=true;}
				if( this.id === 'prev'+tp && pp) { onpaging = 'prev'; newPage=(cp-1); selclick=true;}
				if( this.id === 'next'+tp && np) { onpaging = 'next'; newPage=(cp+1); selclick=true;}
				if( this.id === 'last'+tp && lp) { onpaging = 'last'; newPage=last; selclick=true;}
				if(!clearVals(onpaging, newPage, intNum(p.rowNum,10))) { return false; }
				p.page = newPage;
				if(selclick) {
					populate.call(ts);
				}
				return false;
			});
			}
			if(p.pginput===true) {
			$('input.ui-pg-input',pgcnt).keypress( function(e) {
				var key = e.charCode || e.keyCode || 0, newPage = intNum($(this).val(), 1);
				if(key === 13) {
					if(!clearVals('user', newPage, intNum(p.rowNum,10))) { return false; }
					$(this).val(newPage);
					p.page = ($(this).val()>0) ? $(this).val():p.page;
					populate.call(ts);
					return false;
				}
				return this;
			});
			}
		},
		multiSort = function(iCol, obj ) {
			var splas, sort = "", colModel = p.colModel, cm = colModel[iCol], fs = false, so = "",
				$selTh = p.frozenColumns ? $(obj) : $(ts.grid.headers[iCol].el),
				$iconsSpan = $selTh.find("span.s-ico"),
				$iconAsc = $iconsSpan.children("span.ui-icon-asc"),
				$iconDesc = $iconsSpan.children("span.ui-icon-desc"),
				$iconsActive = $iconAsc, $iconsInictive = $iconDesc;

			$selTh.find("span.ui-grid-ico-sort").addClass("ui-state-disabled"); // for both icons
			$selTh.attr("aria-selected", "false");

			// first set new value of lso:
			// "asc" -> "asc-desc", new sorting to "desc"
			// "desc" -> "desc-asc", new sorting to "desc"
			// "asc-desc" or "desc-asc" -> "", no new sorting ""
			// "" -> cm.firstsortorder || "asc"
			if (cm.lso) {
				if (cm.lso === "asc") {
					cm.lso += "-desc";
					so = "desc";
					$iconsActive = $iconDesc;
					$iconsInictive = $iconAsc;
				} else if (cm.lso === "desc") {
					cm.lso += "-asc";
					so = "asc";
				} else if (cm.lso === "asc-desc" || cm.lso === "desc-asc") {
					cm.lso = "";
					if (!p.viewsortcols[0]) {
						$iconsSpan.hide();
					}
				}
			} else {
				cm.lso = so = cm.firstsortorder || "asc";
				$iconsActive = $iconAsc;
				$iconsInictive = $iconDesc;
			}

			if (so) {
				$iconsSpan.show();
				$iconsActive.removeClass("ui-state-disabled").css("display", ""); // show;
				if (p.showOneSortIcon) {
					$iconsInictive.hide();
				}
				$selTh.attr("aria-selected", "true");
			}
			p.sortorder = "";
			$.each(colModel, function(i){
				if(this.lso) {
					if(i>0 && fs) {
						sort += ", ";
					}
					splas = this.lso.split("-");
					sort += colModel[i].index || colModel[i].name;
					sort += " "+splas[splas.length-1];
					fs = true;
					p.sortorder = splas[splas.length-1];
				}
			});
			sort = sort.substring(0, sort.lastIndexOf(p.sortorder));
			p.sortname = sort;
		},
		sortData = function (index, idxcol,reload,sor, obj){
			var self = this, mygrid = self.grid;
			if(!p.colModel[idxcol].sortable) { return; }
			if(p.savedRow.length > 0) {return;}
			if(!reload) {
				if( p.lastsort === idxcol && p.sortname !== "" ) {
					if( p.sortorder === 'asc') {
						p.sortorder = 'desc';
					} else if(p.sortorder === 'desc') { p.sortorder = 'asc';}
				} else { p.sortorder = p.colModel[idxcol].firstsortorder || 'asc'; }
				p.page = 1;
			}
			if(p.multiSort) {
				multiSort( idxcol, obj);
			} else {
				if(sor) {
					if(p.lastsort === idxcol && p.sortorder === sor && !reload) { return; }
					p.sortorder = sor;
				}
				var headers = mygrid.headers, fhDiv = mygrid.fhDiv,
					$previousSelectedTh = headers[p.lastsort] ? $(headers[p.lastsort].el) : $(),
					$newSelectedTh = p.frozenColumns ? $(obj) : $(headers[idxcol].el),
					$iconsSpan = $newSelectedTh.find("span.s-ico"), cm = p.colModel[p.lastsort],
					$iconsActive = $iconsSpan.children("span.ui-icon-" + p.sortorder),
					$iconsInictive = $iconsSpan.children("span.ui-icon-" + (p.sortorder === "asc" ? "desc" : "asc"));

				$previousSelectedTh.find("span.ui-grid-ico-sort").addClass("ui-state-disabled");
				$previousSelectedTh.attr("aria-selected", "false");
				if (p.frozenColumns) {
					fhDiv.find("span.ui-grid-ico-sort").addClass("ui-state-disabled");
					fhDiv.find("th").attr("aria-selected", "false");
				}
				$iconsActive.removeClass("ui-state-disabled").css("display", ""); // show
				if (p.showOneSortIcon) {
					$iconsInictive.removeClass("ui-state-disabled").hide();
				}
				$newSelectedTh.attr("aria-selected","true");
				if(!p.viewsortcols[0]) {
					if(p.lastsort !== idxcol) {
						if(p.frozenColumns){
							fhDiv.find("span.s-ico").hide();
						}
						$previousSelectedTh.find("span.s-ico").hide();
						$iconsSpan.show();
					} else if (p.sortname === "") { // if p.lastsort === idxcol but p.sortname === ""
						$iconsSpan.show();
					}
				}
				if (p.lastsort !== idxcol) {
					if ($previousSelectedTh.data("autoResized") === "true" &&
							((cm != null && cm.autoResizing != null && cm.autoResizing.compact) ||
								p.autoResizing.compact)) {
						// recalculate the width of the column after removing sort icon
						//$(self).jqGrid("autoResizeColumn", p.lastsort);
						p.columnsToReResizing.push(p.lastsort);
					}
				}
				if (p.lastsort !== idxcol && $newSelectedTh.data("autoResized") === "true") {
					cm = p.colModel[idxcol];
					if ((cm != null && cm.autoResizing != null && cm.autoResizing.compact) ||
							p.autoResizing.compact) {
						// recalculate the width of the column after removing sort icon
						p.columnsToReResizing.push(idxcol);
						//$(self).jqGrid("autoResizeColumn", idxcol);
					}
				}
				// the index looks like "jqgh_" + p.id + "_" + colIndex (like "jqgh_list_invdate")
				index = index.substring(5 + p.id.length + 1); // bad to be changed!?!
				p.sortname = p.colModel[idxcol].index || index;
			}
			if (!feedback.call(self, "onSortCol", p.sortname, idxcol, p.sortorder)) {
				p.lastsort = idxcol;
				return;
			}
			if(p.datatype === "local") {
				if(p.deselectAfterSort) {$(self).jqGrid("resetSelection");}
			} else {
				p.selrow = null;
				if(p.multiselect){setHeadCheckBox.call(self, false);}
				clearArray(p.selarrrow); //p.selarrrow =[];
				clearArray(p.savedRow); //p.savedRow =[];
			}
			if(p.scroll) {
				var sscroll = mygrid.bDiv.scrollLeft;
				emptyRows.call(self, true, false);
				mygrid.hDiv.scrollLeft = sscroll;
			}
			if(p.subGrid && p.datatype === 'local') {
				$("td.sgexpanded","#"+jqID(p.id)).each(function(){
					$(this).trigger("click");
				});
			}
			populate.call(self);
			p.lastsort = idxcol;
			if(p.sortname !== index && idxcol) {p.lastsort = idxcol;}
		},
		setColWidth = function () {
			var initwidth = 0, brd=jgrid.cell_width? 0: intNum(p.cellLayout,0), vc=0, lvc, scw=intNum(p.scrollOffset,0),cw,hs=false,aw,gw=0,cr;
			$.each(p.colModel, function() {
				if(this.hidden === undefined) {this.hidden=false;}
				if(p.grouping && p.autowidth) {
					var ind = $.inArray(this.name, p.groupingView.groupField);
					if(ind >= 0 && p.groupingView.groupColumnShow.length > ind) {
						this.hidden = !p.groupingView.groupColumnShow[ind];
					}
				}
				this.widthOrg = cw = intNum(this.width,0);
				if(this.hidden===false){
					initwidth += cw+brd;
					if(this.fixed) {
						gw += cw+brd;
					} else {
						vc++;
					}
				}
			});
			if(isNaN(p.width)) {
				p.width  = initwidth + ((p.shrinkToFit ===false && !isNaN(p.height)) ? scw : 0);
			}
			grid.width = p.width;
			p.tblwidth = initwidth;
			if(p.shrinkToFit ===false && p.forceFit === true) {p.forceFit=false;}
			if(p.shrinkToFit===true && vc > 0) {
				aw = grid.width-brd*vc-gw;
				if(!isNaN(p.height)) {
					aw -= scw;
					hs = true;
				}
				initwidth =0;
				$.each(p.colModel, function(i) {
					if(this.hidden === false && !this.fixed){
						cw = Math.round(aw*this.width/(p.tblwidth-brd*vc-gw));
						this.width =cw;
						initwidth += cw;
						lvc = i;
					}
				});
				cr =0;
				if (hs) {
					if(grid.width-gw-(initwidth+brd*vc) !== scw){
						cr = grid.width-gw-(initwidth+brd*vc)-scw;
					}
				} else if(!hs && Math.abs(grid.width-gw-(initwidth+brd*vc)) !== 1) {
					cr = grid.width-gw-(initwidth+brd*vc);
				}
				p.colModel[lvc].width += cr;
				p.tblwidth = initwidth+cr+brd*vc+gw;
				if(p.tblwidth > p.width) {
					p.colModel[lvc].width -= (p.tblwidth - parseInt(p.width,10));
					p.tblwidth = p.width;
				}
			}
		},
		nextVisible= function(iCol) {
			var ret = iCol, j=iCol, i;
			for (i = iCol+1;i<p.colModel.length;i++){
				if(p.colModel[i].hidden !== true ) {
					j=i; break;
				}
			}
			return j-ret;
		},
		getOffset = function (iCol) {
			var $th = $(ts.grid.headers[iCol].el), ret = [$th.position().left + $th.outerWidth()];
			if(p.direction==="rtl") { ret[0] = p.width - ret[0]; }
			ret[0] -= ts.grid.bDiv.scrollLeft;
			ret.push($(ts.grid.hDiv).position().top);
			ret.push($(ts.grid.bDiv).offset().top - $(ts.grid.hDiv).offset().top + $(ts.grid.bDiv).height());
			return ret;
		},
		getColumnHeaderIndex = function (th) {
			var i, headers = ts.grid.headers, ci = getCellIndex(th);
			for (i = 0; i < headers.length; i++) {
				if (th === headers[i].el) {
					ci = i;
					break;
				}
			}
			return ci;
		},
		colTemplate;
		if ($.inArray(p.multikey,sortkeys) === -1 ) {p.multikey = false;}
		p.keyName=false;
		p.sortorder = p.sortorder.toLowerCase();
		jgrid.cell_width = jgrid.cellWidth();
		var jgridCmTemplate = jgrid.cmTemplate;
		for (iCol=0; iCol<p.colModel.length;iCol++) {
			colTemplate = typeof p.colModel[iCol].template === "string" ?
				(jgridCmTemplate != null && (typeof jgridCmTemplate[p.colModel[iCol].template] === "object" || typeof jgridCmTemplate[p.colModel[iCol].template] === "function") ?
					jgridCmTemplate[p.colModel[iCol].template]: {}) :
				p.colModel[iCol].template;
			if ($.isFunction(colTemplate)) {
				colTemplate = colTemplate.call(ts, {cm: p.colModel[iCol], iCol: iCol});
			}
			p.colModel[iCol] = $.extend(true, {}, p.cmTemplate, colTemplate || {}, p.colModel[iCol]);
			if (p.keyName === false && p.colModel[iCol].key===true) {
				p.keyName = p.colModel[iCol].name;
			}
		}
		if(p.grouping===true) {
			p.scroll = false;
			p.rownumbers = false;
			//p.subGrid = false; expiremental
			p.treeGrid = false;
			p.gridview = true;
		}
		if(p.treeGrid === true) {
			try { $(ts).jqGrid("setTreeGrid");} catch (ignore) {}
			if(p.datatype !== "local") { p.localReader = {id: "_id_"};	}
		}
		if(p.subGrid) {
			try { $(ts).jqGrid("setSubGrid");} catch (ignore){}
		}
		if(p.multiselect) {
			p.colNames.unshift("<input role='checkbox' id='"+p.cbId+"' class='cbox' type='checkbox' aria-checked='false'/>");
			p.colModel.unshift({name:'cb',width:jgrid.cell_width ? p.multiselectWidth+p.cellLayout : p.multiselectWidth,labelClasses:"jqgh_cbox",classes:"td_cbox",sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true});
		}
		if(p.rownumbers) {
			p.colNames.unshift("");
			p.colModel.unshift({name:'rn',width:jgrid.cell_width ? p.rownumWidth+p.cellLayout : p.rownumWidth,labelClasses:"jqgh_rn",classes:"td_rn",sortable:false,resizable:false,hidedlg:true,search:false,align:'center',fixed:true});
		}
		p.xmlReader = $.extend(true,{
			root: "rows",
			row: "row",
			page: "rows>page",
			total: "rows>total",
			records : "rows>records",
			repeatitems: true,
			cell: "cell",
			id: "[id]",
			userdata: "userdata",
			subgrid: {root:"rows", row: "row", repeatitems: true, cell:"cell"}
		}, p.xmlReader);
		p.jsonReader = $.extend(true,{
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: true,
			cell: "cell",
			id: "id",
			userdata: "userdata",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
		},p.jsonReader);
		p.localReader = $.extend(true,{
			root: "rows",
			page: "page",
			total: "total",
			records: "records",
			repeatitems: false,
			cell: "cell",
			id: "id",
			userdata: "userdata",
			subgrid: {root:"rows", repeatitems: true, cell:"cell"}
		},p.localReader);
		if(p.scroll){
			p.pgbuttons = false; p.pginput=false; p.rowList=[];
		}
		if(p.data.length) { normalizeData.call(ts); refreshIndex(); }
		var thead = "<thead><tr class='ui-jqgrid-labels' role='row'>",
		tdc, idn, w, res, sort, cmi, tooltip, labelStyle,
		td, ptr, tbody, imgs,iac="",idc="",sortarr=[], sortord=[], sotmp=[];
		if(p.shrinkToFit===true && p.forceFit===true) {
			for (iCol=p.colModel.length-1;iCol>=0;iCol--){
				if(p.colModel[iCol].hidden !== true) {
					p.colModel[iCol].resizable=false;
					break;
				}
			}
		}
		if(p.viewsortcols[1] === 'horizontal') {iac=" ui-i-asc";idc=" ui-i-desc";}
		tdc = isMSIE ?  "ui-th-div-ie" :"";
		imgs = "<span class='s-ico' style='display:none'><span class='ui-grid-ico-sort ui-icon-asc"+iac+" ui-state-disabled " + getIcon("sort.asc") + " ui-sort-"+dir+"'></span>";
		imgs += "<span class='ui-grid-ico-sort ui-icon-desc"+idc+" ui-state-disabled " + getIcon("sort.desc") + " ui-sort-"+dir+"'></span></span>";
		if(p.multiSort) {
			sortarr = p.sortname.split(",");
			var iSort;
			for (iSort=0; iSort<sortarr.length; iSort++) {
				sotmp = $.trim(sortarr[iSort]).split(" ");
				sortarr[iSort] = $.trim(sotmp[0]);
				sortord[iSort] = sotmp[1] ? $.trim(sotmp[1]) : p.sortorder || "asc";
			}
		}
		for(iCol=0;iCol<p.colNames.length;iCol++){
			cmi = p.colModel[iCol];
			tooltip = p.headertitles ? (" title=\""+stripHtml(p.colNames[iCol])+"\"") :"";
			thead += "<th id='"+p.id+"_"+cmi.name+"' role='columnheader' class='ui-state-default ui-th-column ui-th-"+dir+"'"+ tooltip+">";
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
			thead += "<div id='jqgh_"+p.id+"_"+cmi.name+"'" +
				(tdc === "" && !cmi.labelClasses ? "" : " class='" + (tdc !== "" ? tdc + " " : "") + (cmi.labelClasses || "") + "'") +
				(labelStyle === "" ? "" : " style='" + labelStyle + "'") +
				">"+
				(cmi.autoResizable && cmi.formatter !== "actions" ?
					"<span class='" + p.autoResizing.wrapperClassName + "'>" + p.colNames[iCol] + "</span>":
					p.colNames[iCol]);
			if(!cmi.width)  { cmi.width = 150; }
			else { cmi.width = parseInt(cmi.width,10); }
			if(typeof cmi.title !== "boolean") { cmi.title = true; }
			cmi.lso = "";
			if (idn === p.sortname) {
				p.lastsort = iCol;
			}
			if(p.multiSort) {
				sotmp = $.inArray(idn,sortarr);
				if( sotmp !== -1 ) {
					cmi.lso = sortord[sotmp];
				}
			}
			thead += imgs+"</div></th>";
		}
		thead += "</tr></thead>";
		imgs = null;
		$(ts).append(thead);
		$(ts.tHead).children("tr").children("th").hover(function(){$(this).addClass('ui-state-hover');},function(){$(this).removeClass('ui-state-hover');});
		if(p.multiselect) {
			var emp=[], chk;
			$(p.cb,ts).bind('click',function(){
				clearArray(p.selarrrow); // p.selarrrow = [];
				var froz = p.frozenColumns === true ? p.id + "_frozen" : "";
				if (this.checked) {
					$(ts.rows).each(function(i) {
						if (i>0) {
							if(!$(this).hasClass("ui-subgrid") &&
									!$(this).hasClass("jqgroup") &&
									!$(this).hasClass('ui-state-disabled') &&
									!$(this).hasClass("jqfoot")){
								$("#jqg_"+jqID(p.id)+"_"+jqID(this.id) )[p.propOrAttr]("checked",true);
								$(this).addClass("ui-state-highlight").attr("aria-selected","true");  
								p.selarrrow.push(this.id);
								p.selrow = this.id;
								if(froz) {
									$("#jqg_"+jqID(p.id)+"_"+jqID(this.id), ts.grid.fbDiv )[p.propOrAttr]("checked",true);
									$("#"+jqID(this.id), ts.grid.fbDiv).addClass("ui-state-highlight");
								}
							}
						}
					});
					chk=true;
					emp=[];
				}
				else {
					$(ts.rows).each(function(i) {
						if(i>0) {
							if(!$(this).hasClass("ui-subgrid") &&
									!$(this).hasClass("jqgroup") &&
									!$(this).hasClass('ui-state-disabled') &&
									!$(this).hasClass("jqfoot") &&
									jgrid.detectRowEditing.call(ts, this.id) === null){
								$("#jqg_"+jqID(p.id)+"_"+jqID(this.id) )[p.propOrAttr]("checked", false);
								$(this).removeClass("ui-state-highlight").attr("aria-selected","false");
								emp.push(this.id);
								if(froz) {
									$("#jqg_"+jqID(p.id)+"_"+jqID(this.id), ts.grid.fbDiv )[p.propOrAttr]("checked",false);
									$("#"+jqID(this.id), ts.grid.fbDiv).removeClass("ui-state-highlight");
								}
							}
						}
					});
					p.selrow = null;
					chk=false;
				}
				feedback.call(ts, "onSelectAll", chk ? p.selarrrow : emp, chk);
			});
		}

		if(p.autowidth===true) {
			var pw = $(eg).innerWidth();
			p.width = pw > 0?  pw: 'nw';
		}
		p.widthOrg = p.width;
		setColWidth();
		$(eg).css("width",grid.width+"px").append("<div class='ui-jqgrid-resize-mark' id='"+p.rsId+"'>&#160;</div>");
		$(p.rs).bind("selectstart", function () {
			return false;
		})
		.click(myResizerClickHandler).dblclick(function (e) {
		    var iColIndex = $(this).data("idx"),
                pageX = $(this).data("pageX"),
                cm = p.colModel[iColIndex];

			if (pageX == null) {
				return false;
			}
			var arPageX = String(pageX).split(";"),
                pageX1 = parseFloat(arPageX[0]),
                pageX2 = parseFloat(arPageX[1]);
			if (arPageX.length === 2 && (Math.abs(pageX1-pageX2) > 5 || Math.abs(e.pageX-pageX1) > 5 || Math.abs(e.pageX-pageX2) > 5)) {
				return false;
			}
			if (feedback.call(ts, "resizeDblClick", iColIndex, cm, e) && cm != null && cm.autoResizable) {
				$(ts).jqGrid("autoResizeColumn", iColIndex);
			}

			return false; // stop propagate
		});
		$(gv).css("width",grid.width+"px");
		var	tfoot = "";
		if(p.footerrow) { tfoot += "<table role='presentation' style='width:"+p.tblwidth+"px' class='ui-jqgrid-ftable'"+(isMSIE7 ? " cellspacing='0'" : "")+"><tbody><tr role='row' class='ui-widget-content footrow footrow-"+dir+"'>"; }
		var firstr = "<tr class='jqgfirstrow' role='row' style='height:auto'>";
		p.disableClick=false;
		$("th",ts.tHead.rows[0]).each(function (j) {
			var cm = p.colModel[j], nm = cm.name, $th = $(this),
				$sortableDiv = $th.children("div"),
				$iconsSpan = $sortableDiv.children("span.s-ico"),
				showOneSortIcon = p.showOneSortIcon;
			
			w = cm.width;
			if(cm.resizable === undefined) {cm.resizable = true;}
			if(cm.resizable){
				res = document.createElement("span");
				$(res).html("&#160;")
					.addClass('ui-jqgrid-resize ui-jqgrid-resize-'+dir)
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
			if(cm.hidden === true) {
				$th.css("display","none");
				hdcol = "display:none;";
			}
			firstr += "<td role='gridcell' style='height:0;width:"+w+"px;"+hdcol+"'></td>";
			grid.headers[j] = { width: w, el: this };
			sort = cm.sortable;
			if (typeof sort !== 'boolean') {cm.sortable = true; sort=true;}
			if (!(nm === 'cb' || nm === 'subgrid' || nm === 'rn') && sort) {
				if(p.viewsortcols[2]){
					// class ui-jqgrid-sortable changes the cursor in 
					$sortableDiv.addClass('ui-jqgrid-sortable');
				}
			}
			if(sort) {
				if(p.multiSort) {
					var notLso = cm.lso === "desc" ? "asc" : "desc";
					if (p.viewsortcols[0]) {
						$iconsSpan.show(); 
						if (cm.lso) { 
							$iconsSpan.children("span.ui-icon-"+cm.lso).removeClass("ui-state-disabled");
							if (showOneSortIcon) {
								$iconsSpan.children("span.ui-icon-"+notLso).hide();
							}
						}
					} else if (cm.lso) {
						$iconsSpan.show();
						$iconsSpan.children("span.ui-icon-"+cm.lso).removeClass("ui-state-disabled");
						if (showOneSortIcon) {
							$iconsSpan.children("span.ui-icon-"+notLso).hide();
						}
					}
				} else {
					var notSortOrder = p.sortorder === "desc" ? "asc" : "desc";
					if (p.viewsortcols[0]) {
						$iconsSpan.show();
						if (j===p.lastsort) {
							$iconsSpan.children("span.ui-icon-"+p.sortorder).removeClass("ui-state-disabled");
							if (showOneSortIcon) {
								$iconsSpan.children("span.ui-icon-"+notSortOrder).hide();
							}
						}
					} else if (j === p.lastsort && p.sortname !== "") {
						$iconsSpan.show();
						$iconsSpan.children("span.ui-icon-"+p.sortorder).removeClass("ui-state-disabled");
						if (showOneSortIcon) {
							$iconsSpan.children("span.ui-icon-"+notSortOrder).hide();
						}
					}
				}
			}
			if(p.footerrow) { tfoot += "<td role='gridcell' "+formatCol(j,0,'', null, '', false)+">&#160;</td>"; }
		})
		.mousedown(function(e) {
			if ($(e.target).closest("th>span.ui-jqgrid-resize").length !== 1) { return; }
			var ci = getColumnHeaderIndex(this);
			if(p.forceFit===true) {p.nv= nextVisible(ci);}
			grid.dragStart(ci, e, getOffset(ci));
			return false;
		})
		.click(function(e) {
			if (p.disableClick) {
				p.disableClick = false;
				return false;
			}
			var s = "th.ui-th-column>div",r,d;
			if (!p.viewsortcols[2]) {
				s += ">span.s-ico>span.ui-grid-ico-sort"; // sort only on click on sorting icon
			} else {
				s += ".ui-jqgrid-sortable";
			}
			var t = $(e.target).closest(s);
			if (t.length !== 1) { return; }
			var ci;
			if(p.frozenColumns) {
				var tid =  $(this)[0].id.substring( p.id.length + 1 );
				$(p.colModel).each(function(i){
					if (this.name === tid) {
						ci = i;
						return false;
					}
				});
			} else {
				ci = getColumnHeaderIndex(this);
			}
			if (!p.viewsortcols[2]) {
				r = true;
				d = t.hasClass("ui-icon-desc") ? "desc" : "asc";
			}
			if(ci != null){
				sortData.call(ts, $('div',this)[0].id, ci, r, d, this);
			}
			return false;
		});
		if (p.sortable && $.fn.sortable) {
			try {
				$(ts).jqGrid("sortableColumns", $(ts.tHead.rows[0]));
			} catch (ignore){}
		}
		if(p.footerrow) { tfoot += "</tr></tbody></table>"; }
		firstr += "</tr>";
		tbody = document.createElement("tbody");
		ts.appendChild(tbody);
		$(ts).addClass('ui-jqgrid-btable').append(firstr);
		firstr = null;
		var hTable = $("<table class='ui-jqgrid-htable' style='width:"+p.tblwidth+"px' role='presentation' aria-labelledby='gbox_"+p.id+"'"+(isMSIE7 ? " cellspacing='0'" : "")+"></table>").append(ts.tHead),
		hg = (p.caption && p.hiddengrid===true) ? true : false,
		hb = $("<div class='ui-jqgrid-hbox" + (dir==="rtl" ? "-rtl" : "" )+"'></div>");
		grid.hDiv = document.createElement("div");
		$(grid.hDiv)
			.css({ width: grid.width+"px"})
			.addClass("ui-state-default ui-jqgrid-hdiv")
			.append(hb);
		$(hb).append(hTable);
		hTable = null;
		if(hg) { $(grid.hDiv).hide(); }
		p.rowNum = parseInt(p.rowNum, 10);
		if (isNaN(p.rowNum) || p.rowNum <= 0) {
			p.rowNum = p.maxRowNum;
		}
		if(p.pager){
			// see http://learn.jquery.com/using-jquery-core/faq/how-do-i-select-an-element-by-an-id-that-has-characters-used-in-css-notation/
			// or http://api.jquery.com/id-selector/ or http://api.jquery.com/category/selectors/
			// about the requirement to escape characters like '.', ':' or some other in case.
			var $pager, pagerId;
			if (typeof p.pager === "string" && p.pager.substr(0,1) !== "#") {
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
				$pager.css({width: grid.width+"px"}).addClass('ui-state-default ui-jqgrid-pager ui-corner-bottom').appendTo(eg);
				if(hg) {$pager.hide();}
				setPager.call(ts, pagerId, '');
				p.pager = "#" + jqID(pagerId); // hold ESCAPED id selector in the pager
			} else {
				p.pager = ""; // clear wrong value of the pager option
			}
		}
		if( p.cellEdit === false && p.hoverrows === true) {
			$(ts).bind('mouseover',function(e) {
				ptr = $(e.target).closest("tr.jqgrow");
				if($(ptr).attr("class") !== "ui-subgrid") {
					$(ptr).addClass("ui-state-hover");
				}
			}).bind('mouseout',function(e) {
				ptr = $(e.target).closest("tr.jqgrow");
				$(ptr).removeClass("ui-state-hover");
			});
		}
		var ri,ci, tdHtml;
		$(ts).before(grid.hDiv).click(function(e) {
			td = e.target;
			ptr = $(td,ts.rows).closest("tr.jqgrow");
			if($(ptr).length === 0 || ptr[0].className.indexOf( 'ui-state-disabled' ) > -1 || ($(td,ts).closest("table.ui-jqgrid-btable").attr('id') || '').replace("_frozen","") !== ts.id ) {
				return this;
			}
			ri = ptr[0].id;
			var scb = $(td).hasClass("cbox"), cSel = feedback.call(ts, "beforeSelectRow", ri, e),
			    editingInfo = jgrid.detectRowEditing.call(ts, ri),
				locked = editingInfo!= null && editingInfo.mode !== "cellEditing"; // editingInfo.savedRow.ic
			if (td.tagName === 'A' || (locked && !scb)) { return; }
			td = $(td).closest("tr.jqgrow>td");
			if (td.length > 0) {
				ci = getCellIndex(td);
				tdHtml = $(td).closest("td,th").html();
				feedback.call(ts, "onCellSelect", ri, ci, tdHtml, e);
			}
			if(p.cellEdit === true) {
				if(p.multiselect && scb && cSel){
					$(ts).jqGrid("setSelection", ri ,true,e);
				} else if (td.length > 0) {
					ri = ptr[0].rowIndex;
					try {$(ts).jqGrid("editCell",ri,ci,true);} catch (ignore) {}
				}
				return;
			}
			if (!cSel) {
				return;
			}
			if ( !p.multikey ) {
				if(p.multiselect && p.multiboxonly) {
					if(scb){$(ts).jqGrid("setSelection",ri,true,e);}
					else {
						var frz = p.frozenColumns ? p.id+"_frozen" : "";
						$(p.selarrrow).each(function(i,n){
							var trid = $(ts).jqGrid('getGridRowById',n);
							if(trid) { $( trid ).removeClass("ui-state-highlight"); }
							$("#jqg_"+jqID(p.id)+"_"+jqID(n))[p.propOrAttr]("checked", false);
							if(frz) {
								$("#"+jqID(n), "#"+jqID(frz)).removeClass("ui-state-highlight");
								$("#jqg_"+jqID(p.id)+"_"+jqID(n), "#"+jqID(frz))[p.propOrAttr]("checked", false);
							}
						});
						clearArray(p.selarrrow); // p.selarrrow = [];
						$(ts).jqGrid("setSelection",ri,true,e);
					}
				} else {
					var oldSelRow = p.selrow;
					$(ts).jqGrid("setSelection",ri,true,e);
					if (p.singleSelectClickMode === "toggle" && !p.multiselect && oldSelRow === ri) {
						td.parent().removeClass("ui-state-highlight").attr({"aria-selected":"false", "tabindex" : "-1"});
						p.selrow = null;
					}
				}
			} else {
				if(e[p.multikey]) {
					$(ts).jqGrid("setSelection",ri,true,e);
				} else if(p.multiselect && scb) {
					scb = $("#jqg_"+jqID(p.id)+"_"+ri).is(":checked");
					$("#jqg_"+jqID(p.id)+"_"+ri)[propOrAttr]("checked", scb);
				}
			}
		}).bind('reloadGrid', function(e,opts) {
		    var self = this, gridSelf = self.grid, $self = $(this);
			if (p.treeGrid === true) {
				p.datatype = p.treedatatype;
			}
			opts = opts || {};
			if (p.datatype === "local" && p.dataTypeOrg && p.loadonce && opts.fromServer) {
				p.datatype = p.dataTypeOrg;
				delete p.dataTypeOrg;
			}
			if (opts.current) {
				gridSelf.selectionPreserver.call(self);
			}
			if(p.datatype==="local"){ $self.jqGrid("resetSelection");  if(p.data.length) { normalizeData.call(self); refreshIndex();} }
			else if(!p.treeGrid) {
				p.selrow=null;
				if(p.multiselect) {
					clearArray(p.selarrrow); // p.selarrrow = [];
					setHeadCheckBox.call(self, false);
				}
				clearArray(p.savedRow); // p.savedRow = [];
			}
			if(p.scroll) {emptyRows.call(self, true, false);}
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
			if (gridSelf.prevRowHeight && p.scroll) {
				delete p.lastpage;
				gridSelf.populateVisible.call(self);
			} else {
				gridSelf.populate.call(self);
			}
			if(p._inlinenav===true) {$self.jqGrid('showAddEditButtons', false);}
			return false;
		})
		.dblclick(function(e) {
			td = e.target;
			ptr = $(td,ts.rows).closest("tr.jqgrow");
			if($(ptr).length === 0 ){return;}
			ri = ptr[0].rowIndex;
			ci = getCellIndex(td);
			if (!feedback.call(ts, "ondblClickRow", $(ptr).attr("id"), ri, ci, e)) {
				return false; // e.preventDefault() and e.stopPropagation() together
			}
		})
		.bind('contextmenu', function(e) {
			td = e.target;
			ptr = $(td,ts.rows).closest("tr.jqgrow");
			if($(ptr).length === 0 ){return;}
			if(!p.multiselect) {	$(ts).jqGrid("setSelection",ptr[0].id,true,e);	}
			ri = ptr[0].rowIndex;
			ci = getCellIndex(td);
			if (!feedback.call(ts, "onRightClickRow", $(ptr).attr("id"), ri, ci, e)) {
				return false; // e.preventDefault() and e.stopPropagation() together
			}
		});
		grid.bDiv = document.createElement("div");
		if(isMSIE) { if(String(p.height).toLowerCase() === "auto") { p.height = "100%"; } }
		$(grid.bDiv)
			.append($('<div style="position:relative;'+(isMSIE7 ? "height:0.01%;" : "")+'"></div>').append('<div></div>').append(ts))
			.addClass("ui-jqgrid-bdiv")
			.css({ height: p.height+(isNaN(p.height)?"":"px"), width: (grid.width)+"px"})
			.scroll(grid.scrollGrid);
		$(ts).css({width:p.tblwidth+"px"});
		if( !$.support.tbody ) { //IE
			if( $(">tbody",ts).length === 2 ) { $(">tbody:gt(0)",ts).remove();}
		}
		if(p.multikey){
			if( jgrid.msie) {
				$(grid.bDiv).bind("selectstart",function(){return false;});
			} else {
				$(grid.bDiv).bind("mousedown",function(){return false;});
			}
		}
		if(hg) {$(grid.bDiv).hide();}
		grid.cDiv = document.createElement("div");
		var visibleGridIcon = getIcon("gridMinimize.visible"), hiddenGridIcon = getIcon("gridMinimize.hidden"), showhide = getDef("showhide"),
			arf = p.hidegrid===true ? $("<a role='link' class='ui-jqgrid-titlebar-close ui-corner-all'" + (showhide ? " title='"+showhide+"'" : "")+"/>").hover(
			function(){ arf.addClass('ui-state-hover');},
			function() {arf.removeClass('ui-state-hover');})
		.append("<span class='" + visibleGridIcon + "'></span>") : "";
		$(grid.cDiv).append("<span class='ui-jqgrid-title'>"+p.caption+"</span>").append(arf)
		.addClass("ui-jqgrid-titlebar ui-jqgrid-caption"+(dir==="rtl" ? "-rtl" :"" )+" ui-widget-header ui-corner-top ui-helper-clearfix");
		$(grid.cDiv).insertBefore(grid.hDiv);
		if( p.toolbar[0] ) {
			grid.uDiv = document.createElement("div");
			if(p.toolbar[1] === "top") {$(grid.uDiv).insertBefore(grid.hDiv);}
			else if (p.toolbar[1]==="bottom" ) {$(grid.uDiv).insertAfter(grid.hDiv);}
			if(p.toolbar[1]==="both") {
				grid.ubDiv = document.createElement("div");
				$(grid.uDiv).addClass("ui-userdata ui-state-default").attr("id","t_"+p.id).insertBefore(grid.hDiv);
				$(grid.ubDiv).addClass("ui-userdata ui-state-default").attr("id","tb_"+p.id).insertAfter(grid.hDiv);
				if(hg)  {$(grid.ubDiv).hide();}
			} else {
				$(grid.uDiv).width(grid.width).addClass("ui-userdata ui-state-default").attr("id","t_"+p.id);
			}
			if(hg) {$(grid.uDiv).hide();}
		}
		p.datatype = p.datatype.toLowerCase();
		if(p.toppager) {
			p.toppager = p.id+"_toppager";
			grid.topDiv = $("<div id='"+p.toppager+"'></div>")[0];
			$(grid.topDiv).addClass('ui-state-default ui-jqgrid-toppager').css({width: grid.width+"px"}).insertBefore(grid.hDiv);
			setPager.call(ts, p.toppager, '_t');
			p.toppager = "#"+jqID(p.toppager); // hold ESCAPED id selector in the toppager option
		} else if (p.pager === "" && !p.scroll) {
			p.rowNum = p.maxRowNum;
		}
		if(p.footerrow) {
			grid.sDiv = $("<div class='ui-jqgrid-sdiv'></div>")[0];
			hb = $("<div class='ui-jqgrid-hbox"+(dir==="rtl"?"-rtl":"")+"'></div>");
			$(grid.sDiv).append(hb).width(grid.width).insertAfter(grid.hDiv);
			$(hb).append(tfoot);
			grid.footers = $(".ui-jqgrid-ftable",grid.sDiv)[0].rows[0].cells;
			if(p.rownumbers) { grid.footers[0].className = 'ui-state-default jqgrid-rownum'; }
			if(hg) {$(grid.sDiv).hide();}
		}
		hb = null;
		if(p.caption) {
			var tdt = p.datatype;
			if(p.hidegrid===true) {
				$(".ui-jqgrid-titlebar-close",grid.cDiv).click( function(e){
					var elems = ".ui-jqgrid-bdiv,.ui-jqgrid-hdiv,.ui-jqgrid-pager,.ui-jqgrid-sdiv", self = this;
					if(p.toolbar[0]===true) {
						if( p.toolbar[1]==='both') {
							elems += ',#' + jqID($(grid.ubDiv).attr('id'));
						}
						elems += ',#' + jqID($(grid.uDiv).attr('id'));
					}
					var counter = $(elems, p.gView).length;
					if(p.toppager) {
						elems += ',' + p.toppager;
					}

					if(p.gridstate === 'visible') {
						$(elems, p.gBox).slideUp("fast", function() {
							counter--;
							if (counter === 0) {
								$("span",self).removeClass(visibleGridIcon).addClass(hiddenGridIcon);
								p.gridstate = 'hidden';
								if($(p.gBox).hasClass("ui-resizable")) { $(".ui-resizable-handle",p.gBox).hide(); }
								$(grid.cDiv).addClass("ui-corner-bottom");
								if (!hg) { feedback.call(ts, "onHeaderClick", p.gridstate, e); }
							}
						});
					} else if(p.gridstate === 'hidden'){
						$(grid.cDiv).removeClass("ui-corner-bottom");
						$(elems,p.gBox).slideDown("fast", function() {
							counter--;
							if (counter === 0) {
								$("span",self).removeClass(hiddenGridIcon).addClass(visibleGridIcon);
								if(hg) {p.datatype = tdt;populate.call(ts);hg=false;}
								p.gridstate = 'visible';
								if($(p.gBox).hasClass("ui-resizable")) { $(".ui-resizable-handle",p.gBox).show(); }
								if (!hg) { feedback.call(ts, "onHeaderClick", p.gridstate, e); }
							}
						});
					}
					return false;
				});
				if(hg) {p.datatype="local"; $(".ui-jqgrid-titlebar-close",grid.cDiv).trigger("click");}
			}
		} else {
			$(grid.cDiv).hide();
			$(grid.cDiv).nextAll("div:visible").first().addClass('ui-corner-top'); // set on top toolbar or toppager or on hDiv
		}
		$(grid.hDiv).after(grid.bDiv)
		.mousemove(function (e) {
			if(grid.resizing){grid.dragMove(e);return false;}
		});
		$(eg).click(myResizerClickHandler).dblclick(function (e) { // it's still needed for Firefox
			var $resizer = $(p.rs),
				resizerOffset = $resizer.offset(),
				iColIndex = $resizer.data("idx"),
				cm = p.colModel[iColIndex],
				pageX = $(this).data("pageX") || $resizer.data("pageX");

			if (pageX == null) {
				return false;
			}
			var arPageX = String(pageX).split(";"),
                pageX1 = parseFloat(arPageX[0]),
                pageX2 = parseFloat(arPageX[1]);
			if (arPageX.length === 2 && (Math.abs(pageX1-pageX2) > 5 || Math.abs(e.pageX-pageX1) > 5 || Math.abs(e.pageX-pageX2) > 5)) {
				return false;
			}
				
			if (feedback.call(ts, "resizeDblClick", iColIndex, cm) &&
					(resizerOffset.left - 1 <= e.pageX && e.pageX <= resizerOffset.left + $resizer.outerWidth() + 1) && cm != null && cm.autoResizable) {
				$(ts).jqGrid("autoResizeColumn", iColIndex);
			}
			return false;
		});
		if (!p.pager) {
			$(grid.cDiv).nextAll("div:visible").filter(":last").addClass('ui-corner-bottom'); // set on bottom toolbar or footer (sDiv) or on bDiv
		}
		$(".ui-jqgrid-labels",grid.hDiv).bind("selectstart", function () { return false; });
		$(document).bind( "mouseup.jqGrid" + p.id, function () {
			if (grid.resizing !== false) {
				grid.dragEnd();
				return false;
			}
			return true;
		});
		ts.formatCol = formatCol;
		ts.sortData = sortData;
		ts.updatepager = updatepager;
		ts.refreshIndex = refreshIndex;
		ts.setHeadCheckBox = setHeadCheckBox;
		ts.fixScrollOffsetAndhBoxPadding = fixScrollOffsetAndhBoxPadding;
		ts.constructTr = constructTr;
		ts.formatter = function ( rowId, cellval , colpos, rwdat, act){return formatter(rowId, cellval , colpos, rwdat, act);};
		$.extend(grid,{populate : populate, emptyRows: emptyRows, beginReq: beginReq, endReq: endReq});
		ts.addXmlData = function(d) {addXmlData.call(ts,d);};
		ts.addJSONData = function(d) {addJSONData.call(ts,d);};
		ts.grid.cols = ts.rows[0].cells;
		feedback.call(ts, "onInitGrid");
		
		// fix to allow to load TreeGrid using datatype:"local", data:mydata instead of treeGrid: true
		if (p.treeGrid && p.datatype === "local" && p.data != null && p.data.length > 0) {
			p.datatype = "jsonstring";
			p.datastr = p.data;
			p.data = [];
		}

		populate.call(ts);p.hiddengrid=false;
	});
};
jgrid.extend({
	getGridRes: function (defaultPropName) {
		// The problem is the following: there are already exist some properties of $.jgrid which can be used
		// to set some defaults of jqGrid. It's: $.jgrid.defaults, $.jgrid.search, $.jgrid.edit, $.jgrid.view, $.jgrid.del, $.jgrid.nav
		// $.jgrid.formatter, $.jgrid.errors, $.jgrid.col
		// Existing programs could use the objects to set either language specific settings (which are now moved under regional part)
		// be language independent. Thus one should combine language specific settings with the user's settings and overwrite the settings
		// with grid specific settings if the settings exist.
		//
		// For example:
		//		p.loadtext (grid option) = "..."
		//		$.jgrid.defaults.loadtext = "........."
		//		p.regional = "en-US",
		//		$.jgrid.regional["en-US"].defaults.loadtext = "Loading...";
		//
		//		p.edit.addCaption = "Add Invoice"
		//		$.jgrid.edit.addCaption = "Add"
		//		p.regional = "en-US",
		//		$.jgrid.regional["en-US"].edit.addCaption = "Add Record";
		//
		// In the case the grid option p.loadtext = "..." need be used. If p.loadtext is not defined then $.jgrid.defaults.loadtext. If
		// $.jgrid.defaults.loadtext is not defined explicitly by the user, then language settings will be used

		var $t = this[0];
		if (!$t || !$t.grid || !$t.p) {return null;}
		// One need get defaultPropName from $.jgrid root first. If no value exist then one should get it from $.jgrid[reg] root
		var res = jgrid.getRes(locales[$t.p.locale], defaultPropName) || jgrid.getRes(locales["en-US"], defaultPropName),
			resDef = jgrid.getRes(jgrid, defaultPropName);
		return typeof res === "object" && res !== null && !$.isArray(res) ?
			$.extend(true, {}, res, resDef || {}) :
			resDef !== undefined ? resDef : res;
	},
	getGridParam : function(pName) {
		var $t = this[0];
		if (!$t || !$t.grid) {return null;}
		if (!pName) { return $t.p; }
		return $t.p[pName] !== undefined ? $t.p[pName] : null;
	},
	setGridParam : function (newParams, overwrite){
		return this.each(function(){
			var self = this;
			if(overwrite == null) {
				overwrite = false;
			}
			if (self.grid && typeof newParams === 'object') {
				if(overwrite === true) {
					var params = $.extend({}, self.p, newParams);
					self.p = params;
				} else {
					$.extend(true,self.p,newParams);
				}
			}
		});
	},
	getGridRowById: function ( rowid ) {
		if (rowid == null) {
			return null;
		}
		var row, rowId = rowid.toString();
		this.each( function(){
			var i, rows = this.rows, tr;
			try {
				//row = this.rows.namedItem( rowid );
				i = rows.length;
				while(i--) {
					tr = rows[i];
					if( rowId === tr.id) {
						row = tr;
						break;
					}
				}
			} catch ( e ) {
				row = $(this.grid.bDiv).find( "#" + jqID( rowid ));
				row = row.length > 0 ? row[0] : null;
			}
		});
		return row;
	},
	getDataIDs : function () {
		var ids=[];
		this.each(function(){
			var rows = this.rows, len = rows.length, i, tr;
			if(len && len>0){
				for (i=0; i<len; i++) {
					tr = rows[i];
					if($(tr).hasClass('jqgrow')) {
						ids.push(tr.id);
					}
				}
			}
		});
		return ids;
	},
	setSelection : function(selection,onsr, e) {
		return this.each(function(){
			var $t = this, p = $t.p, stat,pt, ner, ia, tpsr, fid, csr;
			if(selection === undefined) { return; }
			onsr = onsr === false ? false : true;
			pt=$($t).jqGrid('getGridRowById', selection);
			if(!pt || !pt.className || pt.className.indexOf( 'ui-state-disabled' ) > -1 ) { return; }
			function scrGrid(tr, bDiv){
				var ch = bDiv.clientHeight,
				st = bDiv.scrollTop,
				rpos = $(tr).position().top,
				rh = tr.clientHeight;
				if(rpos+rh >= ch+st) {bDiv.scrollTop = rpos-(ch+st)+rh+st; }
				else if(rpos < ch+st) {
					if(rpos < st) {
						bDiv.scrollTop = rpos;
					}
				}
			}
			if(p.scrollrows===true) {
				ner = $($t).jqGrid('getGridRowById',selection).rowIndex;
				if(ner >=0 ){
					scrGrid($t.rows[ner], $t.grid.bDiv);
				}
			}
			if(p.frozenColumns === true ) {
				fid = p.id+"_frozen";
			}
			if(!p.multiselect) {	
				if(pt.className !== "ui-subgrid") {
					if( p.selrow !== pt.id ) {
						if (p.selrow !== null) {
							csr = $($t).jqGrid('getGridRowById', p.selrow);
							if( csr ) {
								$(  csr ).removeClass("ui-state-highlight").attr({"aria-selected":"false", "tabindex" : "-1"});
							}
						}
						$(pt).addClass("ui-state-highlight").attr({"aria-selected":"true", "tabindex" : "0"});//.focus();
						if(fid) {
							$("#"+jqID(p.selrow), "#"+jqID(fid)).removeClass("ui-state-highlight");
							$("#"+jqID(selection), "#"+jqID(fid)).addClass("ui-state-highlight");
						}
						stat = true;
					} else {
						stat = false;
					}
					p.selrow = pt.id;
					if( onsr ) {
						feedback.call($t, "onSelectRow", pt.id, stat, e);
					}
				}
			} else {
				//unselect selectall checkbox when deselecting a specific row
				$t.setHeadCheckBox(false);
				p.selrow = pt.id;
				ia = $.inArray(p.selrow,p.selarrrow);
				if (  ia === -1 ){
					if(pt.className !== "ui-subgrid") { $(pt).addClass("ui-state-highlight").attr("aria-selected","true");}
					stat = true;
					p.selarrrow.push(p.selrow);
				} else if (jgrid.detectRowEditing.call($t, pt.id) !== null) {
					// the row is editing and selected now. The checkbox is clicked
					stat = true; // set to force the checkbox stay selected
				} else {
					// deselect only if the row is not in editing mode
					if(pt.className !== "ui-subgrid") { $(pt).removeClass("ui-state-highlight").attr("aria-selected","false");}
					stat = false;
					p.selarrrow.splice(ia,1);
					tpsr = p.selarrrow[0];
					p.selrow = (tpsr === undefined) ? null : tpsr;
				}
				$("#jqg_"+jqID(p.id)+"_"+jqID(pt.id))[p.propOrAttr]("checked",stat);
				if(fid) {
					if(ia === -1 || stat) {
						$("#"+jqID(selection), "#"+jqID(fid)).addClass("ui-state-highlight");
					} else {
						$("#"+jqID(selection), "#"+jqID(fid)).removeClass("ui-state-highlight");
					}
					$("#jqg_"+jqID(p.id)+"_"+jqID(selection), "#"+jqID(fid))[p.propOrAttr]("checked",stat);
				}
				if( onsr ) {
					feedback.call($t, "onSelectRow", pt.id, stat, e);
				}
			}
		});
	},
	resetSelection : function( rowid ){
		return this.each(function(){
			var t = this, p = t.p, sr, frozenColumns = p.frozenColumns === true,
			gridIdEscaped = jqID(p.id), gridIdSelector = p.idSel,
			fid = p.id+"_frozen", gridIdFrozenSelector = "#"+jqID(fid);
			if( p.frozenColumns === true ) {
				fid = p.id+"_frozen";
			}
			if(rowid !== undefined ) {
				sr = rowid === p.selrow ? p.selrow : rowid;
				$(gridIdSelector+">tbody>tr#"+jqID(sr)).removeClass("ui-state-highlight").attr("aria-selected","false");
				if (frozenColumns) { $("#"+jqID(sr), gridIdFrozenSelector).removeClass("ui-state-highlight"); }
				if(p.multiselect) {
					$("#jqg_"+jqID(p.id)+"_"+jqID(sr), gridIdSelector)[p.propOrAttr]("checked",false);
					if(frozenColumns) { $("#jqg_"+gridIdEscaped+"_"+jqID(sr), gridIdFrozenSelector)[p.propOrAttr]("checked",false); }
					t.setHeadCheckBox(false);
					var ia = $.inArray(jqID(sr), p.selarrrow);
					if (ia !== -1) {
						p.selarrrow.splice(ia,1);
					}
				}
				sr = null;
			} else if(!p.multiselect) {
				if(p.selrow) {
					$(gridIdSelector+">tbody>tr#"+jqID(p.selrow)).removeClass("ui-state-highlight").attr("aria-selected","false");
					if(frozenColumns) { $("#"+jqID(p.selrow), gridIdFrozenSelector).removeClass("ui-state-highlight"); }
					p.selrow = null;
				}
			} else {
				$(p.selarrrow).each(function(i,n){
					var selRowIdEscaped = jqID(n);
					$( $(t).jqGrid('getGridRowById',n) ).removeClass("ui-state-highlight").attr("aria-selected","false");
					$("#jqg_"+gridIdEscaped+"_"+selRowIdEscaped)[p.propOrAttr]("checked",false);
					if(frozenColumns) { 
						$("#"+selRowIdEscaped, gridIdFrozenSelector).removeClass("ui-state-highlight"); 
						$("#jqg_"+gridIdEscaped+"_"+selRowIdEscaped, gridIdFrozenSelector)[p.propOrAttr]("checked",false);
					}
				});
				t.setHeadCheckBox(false);
				clearArray(p.selarrrow); // p.selarrrow = [];
				p.selrow = null;
			}
			if(p.cellEdit === true) {
				if(parseInt(p.iCol,10)>=0  && parseInt(p.iRow,10)>=0) {
					$("td:eq("+p.iCol+")",t.rows[p.iRow]).removeClass("edit-cell ui-state-highlight");
					$(t.rows[p.iRow]).removeClass("selected-row ui-state-hover");
				}
			}
			clearArray(p.savedRow); // p.savedRow = [];
		});
	},
	getRowData : function( rowid ) {
		// TODO: add additional parameter, which will inform whether the output data need be in formatted or unformatted form
		var res = {}, resall;
		this.each(function(){
			var $t = this, p = $t.p, getall=false, ind, len = 2, j=0, rows = $t.rows, i, $td, cm, nm, td;
			if(rowid === undefined) {
				getall = true;
				resall = [];
				len = rows.length;
			} else {
				ind = $($t).jqGrid('getGridRowById', rowid);
				if(!ind) { return res; }
			}
			while(j<len){
				if(getall) { ind = rows[j]; }
				if( $(ind).hasClass('jqgrow') ) {
					$td = $('td[role="gridcell"]',ind);
					for (i = 0; i < $td.length; i++) {
						cm = p.colModel[i];
						nm = cm.name;
						if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && cm.formatter !== "actions") {
							td = $td[i];
							if(p.treeGrid===true && nm === p.ExpandColumn) {
								res[nm] = htmlDecode($("span",td).first().html());
							} else {
								try {
									res[nm] = $.unformat.call($t,td,{rowId:ind.id, colModel:cm},i);
								} catch (exception){
									res[nm] = htmlDecode($(td).html());
								}
							}
						}
					}
					if(getall) { resall.push(res); res={}; }
				}
				j++;
			}
		});
		return resall || res;
	},
	delRowData : function(rowid) {
		var success = false, rowInd, ia, nextRow;
		this.each(function() {
			var $t = this, p = $t.p;
			rowInd = $($t).jqGrid('getGridRowById', rowid);
			if(!rowInd) {return false;}
				if(p.subGrid) {
					nextRow = $(rowInd).next();
					if(nextRow.hasClass('ui-subgrid')) {
						nextRow.remove();
					}
				}
				$(rowInd).remove();
				p.records--;
				p.reccount--;
				$t.updatepager(true,false);
				success=true;
				if(p.multiselect) {
					ia = $.inArray(rowid,p.selarrrow);
					if(ia !== -1) { p.selarrrow.splice(ia,1);}
				}
				if (p.multiselect && p.selarrrow.length > 0) {
					p.selrow = p.selarrrow[p.selarrrow.length-1];
				} else if (p.selrow === rowid) {
					p.selrow = null;
				}
			if(p.datatype === 'local') {
				var id = stripPref(p.idPrefix, rowid),
				pos = p._index[id];
				if(pos !== undefined) {
					p.data.splice(pos,1);
					$t.refreshIndex();
				}
			}
			if( p.altRows === true && success ) {
				var cn = p.altclass;
				$($t.rows).each(function(i){
					if(i % 2 === 1) { $(this).addClass(cn); }
					else { $(this).removeClass(cn); }
				});
			}
		});
		return success;
	},
	setRowData : function(rowid, data, cssp) {
		// TODO: add additional parameter to setRowData which inform that input data is in formatted or unformatted form
		var success=true;
		this.each(function(){
			var t = this, p = t.p, vl, ind, cp = typeof cssp, lcdata={};
			if(!t.grid) {return false;}
			ind = $(t).jqGrid('getGridRowById', rowid);
			if(!ind) { return false; }
			if( data ) {
				try {
					var id = stripPref(p.idPrefix, rowid), key, pos = p._index[id], oData = pos != null ? p.data[pos] : undefined;
					$(p.colModel).each(function(i){
						var cm = this, nm = cm.name, title, dval = getAccessor(data,nm);
						if( dval !== undefined) {
							if (p.datatype === 'local' && oData != null) {
								vl = convertOnSaveLocally.call(t, dval, cm, oData[nm], id, oData, i);
								if ($.isFunction(cm.saveLocally)) {
									cm.saveLocally.call(t, { newValue: vl, newItem: lcdata, oldItem: oData, id: id, cm: cm, cmName: nm, iCol: i });
								} else {
									lcdata[nm] = vl;
								}
							}
							vl = t.formatter( rowid, dval, i, data, 'edit');
							title = cm.title ? {"title":stripHtml(vl)} : {};
							if(p.treeGrid===true && nm === p.ExpandColumn) {
								$("td[role='gridcell']:eq("+i+") > span:first",ind).first().html(vl).attr(title);
							} else {
								$("td[role='gridcell']:eq("+i+")",ind).html(vl).attr(title);
							}
						}
					});
					if(p.datatype === 'local') {
						if(p.treeGrid) {
							for(key in p.treeReader){
								if(p.treeReader.hasOwnProperty(key)) {
									delete lcdata[p.treeReader[key]];
								}
							}
						}
						if(oData !== undefined) {
							p.data[pos] = $.extend(true, oData, lcdata);
						}
						lcdata = null;
					}
				} catch (exception) {
					success = false;
				}
			}
			if(success) {
				if(cp === 'string') {$(ind).addClass(cssp);} else if(cssp !== null && cp === 'object') {$(ind).css(cssp);}
				$(t).triggerHandler("jqGridAfterGridComplete");
			}
		});
		return success;
	},
	addRowData : function(rowid,rdata,pos,src) {
		// TODO: add an additional parameter, which will inform whether the input data rdata is in formatted or unformatted form
		if($.inArray(pos, ["first", "last", "before", "after"]) < 0) {pos = "last";}
		var success = false, nm, row, gi, si, ni,sind, i, v, prp="", aradd, cnm, cn, data, cm, id;
		if(rdata) {
			if($.isArray(rdata)) {
				aradd=true;
				//pos = "last";
				cnm = rowid;
			} else {
				rdata = [rdata];
				aradd = false;
			}
			this.each(function() {
				var t = this, p = t.p, datalen = rdata.length;
				ni = p.rownumbers===true ? 1 :0;
				gi = p.multiselect ===true ? 1 :0;
				si = p.subGrid===true ? 1 :0;
				if(!aradd) {
					if(rowid !== undefined) { rowid = String(rowid);}
					else {
						rowid = randId();
						if(p.keyName !== false) {
							cnm = p.keyName;
							if(rdata[0][cnm] !== undefined) { rowid = rdata[0][cnm]; }
						}
					}
				}
				cn = p.altclass;
				var k = 0, cna ="", lcdata = {};
				while(k < datalen) {
					data = rdata[k];
					row=[];
					if(aradd) {
						try {
							rowid = data[cnm];
							if(rowid===undefined) {
								rowid = randId();
							}
						}
						catch (exception) {rowid = randId();}
						cna = p.altRows === true ?  (t.rows.length-1)%2 === 0 ? cn : "" : "";
					}
					id = rowid;
					rowid  = p.idPrefix + rowid;
					if(ni){
						prp = t.formatCol(0,1,'',null,rowid, true);
						row.push("<td role=\"gridcell\" class=\"ui-state-default jqgrid-rownum\" "+prp+">0</td>");
					}
					if(gi) {
						v = "<input role=\"checkbox\" type=\"checkbox\""+" id=\"jqg_"+p.id+"_"+rowid+"\" class=\"cbox\" aria-checked=\"false\"/>";
						prp = t.formatCol(ni,1,'', null, rowid, true);
						row.push("<td role=\"gridcell\" "+prp+">"+v+"</td>");
					}
					if(si) {
						row.push($(t).jqGrid("addSubGridCell",gi+ni,1));
					}
					for(i = gi+si+ni; i < p.colModel.length;i++){
						cm = p.colModel[i];
						nm = cm.name;
						v = convertOnSaveLocally.call(t, data[nm], cm, undefined, id, {}, i);
						if ($.isFunction(cm.saveLocally)) {
							cm.saveLocally.call(t, { newValue: v, newItem: lcdata, oldItem: {}, id: id, cm: cm, cmName: nm, iCol: i });
						} else {
							lcdata[nm] = v;
						}
						v = t.formatter( rowid, getAccessor(data,nm), i, data );
						prp = t.formatCol(i,1,v, data, rowid, lcdata);
						row.push("<td role=\"gridcell\" "+prp+">"+v+"</td>");
					}
					row.unshift(t.constructTr(rowid, false, cna, lcdata, data, false));
					row.push("</tr>");
					row = row.join('');
					if(t.rows.length === 0){
						$("table:first",t.grid.bDiv).append(row);
					} else {
						switch (pos) {
							case 'last':
								$(t.rows[t.rows.length-1]).after(row);
								sind = t.rows.length-1;
								break;
							case 'first':
								$(t.rows[0]).after(row);
								sind = 1;
								break;
							case 'after':
								sind = $(t).jqGrid('getGridRowById', src);
								if (sind) {
									if ($(t.rows[sind.rowIndex+1]).hasClass("ui-subgrid")) {
										$(t.rows[sind.rowIndex+1]).after(row);
										sind=sind.rowIndex + 2;
									} else {
										$(sind).after(row);
										sind=sind.rowIndex + 1;
									}
								}	
								break;
							case 'before':
								sind = $(t).jqGrid('getGridRowById', src);
								if(sind) {
									$(sind).before(row);
									sind=sind.rowIndex - 1;
								}
								break;
						}
					}
					if(p.subGrid===true) {
						$(t).jqGrid("addSubGrid",gi+ni, sind);
					}
					p.records++;
					p.reccount++;
					if (p.lastpage === 0) {
						p.lastpage = 1;
					}
					feedback.call(t, "afterInsertRow", rowid, data, data);
					k++;
					if(p.datatype === 'local') {
						lcdata[p.localReader.id] = id;
						p._index[id] = p.data.length;
						p.data.push(lcdata);
						lcdata = {};
					}
				}
				if( p.altRows === true && !aradd) {
					if (pos === "last") {
						if ((t.rows.length-1)%2 === 1)  {$(t.rows[t.rows.length-1]).addClass(cn);}
					} else {
						$(t.rows).each(function(i){
							if(i % 2 ===1) { $(this).addClass(cn); }
							else { $(this).removeClass(cn); }
						});
					}
				}
				t.updatepager(true,true);
				success = true;
			});
		}
		return success;
	},
	footerData : function(action,data, format) {
		// TODO: add an additional parameter, which will inform whether the input data "data" is in formatted or unformatted form
		var nm, success=false, res={}, title;
		function isEmpty(obj) {
			var i;
			for(i in obj) {
				if (obj.hasOwnProperty(i)) { return false; }
			}
			return true;
		}
		if(action == null) { action = "get"; }
		if(typeof format !== "boolean") { format  = true; }
		action = action.toLowerCase();
		this.each(function(){
			var t = this, p = t.p, vl;
			if(!t.grid || !p.footerrow) {return false;}
			if(action === "set") { if(isEmpty(data)) { return false; } }
			success=true;
			$(p.colModel).each(function(i){
				nm = this.name;
				if(action === "set") {
					if( data[nm] !== undefined) {
						vl = format ? t.formatter( "", data[nm], i, data, 'edit') : data[nm];
						title = this.title ? {"title":stripHtml(vl)} : {};
						$("tr.footrow td:eq("+i+")",t.grid.sDiv).html(vl).attr(title);
						success = true;
					}
				} else if(action === "get") {
					res[nm] = $("tr.footrow td:eq("+i+")",t.grid.sDiv).html();
				}
			});
		});
		return action === "get" ? res : success;
	},
	showHideCol : function(colname,show) {
		return this.each(function() {
			var $t = this, fndh=false, p = $t.p,
			brd=jgrid.cell_width ? 0: p.cellLayout, cw;
			if (!$t.grid ) {return;}
			if( typeof colname === 'string') {colname=[colname];}
			show = show !== "none" ? "" : "none";
			var sw = show === "" ? true :false,
			gh = p.groupHeader && (typeof p.groupHeader === 'object' || $.isFunction(p.groupHeader) );
			if(gh) { $($t).jqGrid('destroyGroupHeader', false); }
			$(p.colModel).each(function(i) {
				if ($.inArray(this.name,colname) !== -1 && this.hidden === sw) {
					if(p.frozenColumns === true && this.frozen === true) {
						return true;
					}
					$("tr[role=row]",$t.grid.hDiv).each(function(){
						$(this.cells[i]).css("display", show);
					});
					$($t.rows).each(function(){
						if (!$(this).hasClass("jqgroup")) {
							$(this.cells[i]).css("display", show);
						}
					});
					if(p.footerrow) { $("tr.footrow td:eq("+i+")", $t.grid.sDiv).css("display", show); }
					cw =  parseInt(this.width,10);
					if(show === "none") {
						p.tblwidth -= cw+brd;
					} else {
						p.tblwidth += cw+brd;
					}
					this.hidden = !sw;
					fndh=true;
					feedback.call($t, "onShowHideCol", sw, this.name, i);
				}
			});
			if(fndh===true) {
				if(p.shrinkToFit === true && !isNaN(p.height)) { p.tblwidth += parseInt(p.scrollOffset,10);}
				$($t).jqGrid("setGridWidth",p.shrinkToFit === true ? p.tblwidth : p.width );
			}
			if( gh )  {
				$($t).jqGrid('setGroupHeaders',p.groupHeader);
			}
		});
	},
	hideCol : function (colname) {
		return this.each(function(){$(this).jqGrid("showHideCol",colname,"none");});
	},
	showCol : function(colname) {
		return this.each(function(){$(this).jqGrid("showHideCol",colname,"");});
	},
	remapColumns : function(permutation, updateCells, keepHeader) {
		function resortArray(a) {
			var ac;
			if (a.length) {
				ac = $.makeArray(a);
			} else {
				ac = $.extend({}, a);
			}
			$.each(permutation, function(i) {
				a[i] = ac[this];
			});
		}
		var ts = this.get(0), p = ts.p, grid = ts.grid;
		function resortRows(parent, clobj) {
			$(">tr"+(clobj||""), parent).each(function() {
				var row = this;
				var elems = $.makeArray(row.cells);
				$.each(permutation, function() {
					var e = elems[this];
					if (e) {
						row.appendChild(e);
					}
				});
			});
		}
		resortArray(p.colModel);
		resortArray(p.colNames);
		resortArray(grid.headers);
		resortRows($("thead:first", grid.hDiv), keepHeader && ":not(.ui-jqgrid-labels)");
		if (updateCells) {
			resortRows($(ts.tBodies[0]), ".jqgfirstrow, tr.jqgrow, tr.jqfoot");
		}
		if (p.footerrow) {
			resortRows($("tbody:first", grid.sDiv));
		}
		if (p.remapColumns) {
			if (!p.remapColumns.length){
				p.remapColumns = $.makeArray(permutation);
			} else {
				resortArray(p.remapColumns);
			}
		}
		p.lastsort = $.inArray(p.lastsort, permutation);
		if(p.treeGrid) { p.expColInd = $.inArray(p.expColInd, permutation); }
		feedback.call(ts, "onRemapColumns", permutation, updateCells, keepHeader);
	},
	setGridWidth : function(nwidth, shrink) {
		return this.each(function(){
			var $t = this, p = $t.p, cw, grid = $t.grid, initwidth = 0, lvc, vc=0, hs=false, aw, gw=0, cr;
			if (!grid || p == null) {return;}
			var colModel = p.colModel, cm, scw = p.scrollOffset, brd = jgrid.cell_width ? 0 : p.cellLayout, thInfo,
				headers = grid.headers, footers = grid.footers, bDiv = grid.bDiv, hDiv = grid.hDiv, sDiv = grid.sDiv,
				cols = grid.cols, delta, cle,
				hCols = $(hDiv).find(">div>.ui-jqgrid-htable>thead>tr").first()[0].cells,
				setWidthOfAllDivs = function (newWidth) {
					grid.width = p.width = newWidth;
					$(p.gBox).css("width", newWidth + "px");
					$(p.gView).css("width", newWidth + "px");
					$(bDiv).css("width", newWidth + "px");
					$(hDiv).css("width", newWidth + "px");
					if (p.pager) {
						$(p.pager).css("width", newWidth + "px");
					}
					if (p.toppager) {
						$(p.toppager).css("width", newWidth + "px");
					}
					if (p.toolbar[0] === true){
						$(grid.uDiv).css("width", newWidth + "px");
						if(p.toolbar[1] === "both") {
							$(grid.ubDiv).css("width", newWidth + "px");
						}
					}
					if (p.footerrow) {
						$(sDiv).css("width", nwidth + "px");
					}
				};
			if(typeof shrink !== 'boolean') {
				shrink=p.shrinkToFit;
			}
			if(isNaN(nwidth)) {return;}
			nwidth = parseInt(nwidth, 10); // round till integer value of px
			setWidthOfAllDivs(nwidth);
			if(shrink ===false && p.forceFit === true) {p.forceFit=false;}
			if(shrink===true) {
				$.each(colModel, function() {
					if(this.hidden===false){
						cw = this.widthOrg;
						initwidth += cw+brd;
						if(this.fixed) {
							gw += cw+brd;
						} else {
							vc++;
						}
					}
				});
				if(vc  === 0) { return; }
				p.tblwidth = parseInt(initwidth, 10); // round till integer value of px;
				aw = nwidth-brd*vc-gw;
				if(!isNaN(p.height)) {
					if(bDiv.clientHeight < bDiv.scrollHeight || $t.rows.length === 1){
						hs = true;
						aw -= scw;
					}
				}
				initwidth =0;
				cle = cols.length >0;
				$.each(colModel, function(i) {
					if(this.hidden === false && !this.fixed){
						cw = this.widthOrg;
						cw = Math.round(aw*cw/(p.tblwidth-brd*vc-gw));
						if (cw < 0) { return; }
						this.width =cw;
						initwidth += cw;
						headers[i].width=cw;
						hCols[i].style.width=cw+"px";
						if(p.footerrow) { footers[i].style.width = cw+"px"; }
						if(cle) { cols[i].style.width = cw+"px"; }
						lvc = i;
					}
				});

				if (!lvc) { return; }

				cr = 0;
				if (hs) {
					if(nwidth-gw-(initwidth+brd*vc) !== scw){
						cr = nwidth-gw-(initwidth+brd*vc)-scw;
					}
				} else if( Math.abs(nwidth-gw-(initwidth+brd*vc)) !== 1) {
					cr = nwidth-gw-(initwidth+brd*vc);
				}
				cm = colModel[lvc];
				cm.width += cr;
				p.tblwidth = parseInt(initwidth+cr+brd*vc+gw, 10); // round till integer value of px;
				if(p.tblwidth > nwidth) {
					delta = p.tblwidth - parseInt(nwidth,10);
					p.tblwidth = nwidth;
					cm.width = cm.width-delta;
				}
				cw = cm.width;
				thInfo = headers[lvc];
				thInfo.width = cw;
				hCols[lvc].style.width=cw+"px";
				if(cle) { cols[lvc].style.width = cw+"px"; }
				if(p.footerrow) {
					footers[lvc].style.width = cw+"px";
				}
				if (p.tblwidth < p.width) {
					// decrease the width if required
					setWidthOfAllDivs(p.tblwidth);
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
			if(p.tblwidth) {
				p.tblwidth = parseInt(p.tblwidth, 10); // round till integer value of px;
				$($t).css("width",p.tblwidth+"px");
				getGridComponent("hTable", $(hDiv)).css("width",p.tblwidth+"px");
				hDiv.scrollLeft = bDiv.scrollLeft;
				if(p.footerrow) {
					getGridComponent("fTable", $(sDiv)).css("width",p.tblwidth+"px");
				}
				// small fix which origin should be examined more exactly
				delta = Math.abs(p.tblwidth - p.width);
				if (p.shrinkToFit && !shrink && delta < 3 && delta > 0) {
					if (p.tblwidth < p.width) {
						setWidthOfAllDivs(p.tblwidth); // decrease the width if required
					}
					if (bDiv.offsetWidth > bDiv.clientWidth) { // the part seems never work
						if (!p.autowidth && (p.widthOrg === undefined || p.widthOrg === "auto" || p.widthOrg === "100%")) {
							setWidthOfAllDivs(bDiv.offsetWidth);
						}
					}
				}
			}
		});
	},
	setGridHeight : function (nh) {
		return this.each(function (){
			var $t = this, grid = $t.grid, p = $t.p;
			if(!$t.grid) {return;}
			var bDiv = $(grid.bDiv);
			bDiv.css({height: nh+(isNaN(nh)?"":"px")});
			if(p.frozenColumns === true){
				//follow the original set height to use 16, better scrollbar width detection
				$(p.idSel+"_frozen").parent().height(bDiv.height() - 16);
			}
			p.height = nh;
			if (p.scroll) { grid.populateVisible.call($t); }
		});
	},
	setCaption : function (newcap){
		return this.each(function(){
			var self = this, cDiv = self.grid.cDiv;
			self.p.caption=newcap;
			$("span.ui-jqgrid-title, span.ui-jqgrid-title-rtl",cDiv).html(newcap);
			$(cDiv).show();
			$(cDiv).nextAll("div").removeClass('ui-corner-top');
		});
	},
	setLabel : function(colname, nData, prop, attrp ){
		return this.each(function(){
			var $t = this, pos=-1;
			if(!$t.grid) {return;}
			if(colname !== undefined) {
				$($t.p.colModel).each(function(i){
					if (this.name === colname) {
						pos = i;return false;
					}
				});
			} else { return; }
			if(pos>=0) {
				var thecol = $("tr.ui-jqgrid-labels th:eq("+pos+")",$t.grid.hDiv);
				if (nData){
					var ico = $(".s-ico",thecol);
					$("[id^=jqgh_]",thecol).empty().html(nData).append(ico);
					$t.p.colNames[pos] = nData;
				}
				if (prop) {
					if(typeof prop === 'string') {$(thecol).addClass(prop);} else {$(thecol).css(prop);}
				}
				if(typeof attrp === 'object') {$(thecol).attr(attrp);}
			}
		});
	},
	setCell : function(rowid,colname,nData,cssp,attrp, forceupd) {
		// TODO: add an additional parameter, which will inform whether the input data nData is in formatted or unformatted form
		return this.each(function(){
			var $t = this, p = $t.p, pos =-1, v, title, cl, cm, item, ind, tcell, rawdat=[], id, index;
			if(!$t.grid) {return;}
			if(isNaN(colname)) {
				$(p.colModel).each(function(i){
					if (this.name === colname) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(colname,10);}
			if(pos>=0) {
				ind = $($t).jqGrid('getGridRowById', rowid); 
				if (ind){
					tcell = $("td:eq("+pos+")",ind);
					if(nData !== "" || forceupd === true) {
						for(cl=0; cl<ind.cells.length; cl++) {
							// slow down speed
							rawdat.push(ind.cells[cl].innerHTML);
						}
						v = $t.formatter(rowid, nData, pos, rawdat, 'edit');
						title = p.colModel[pos].title ? {"title":stripHtml(v)} : {};
						if(p.treeGrid && $(".tree-wrap",$(tcell)).length>0) {
							$("span",$(tcell)).html(v).attr(title);
						} else {
							$(tcell).html(v).attr(title);
						}
						if(p.datatype === "local") {
							id = stripPref(p.idPrefix, rowid);
							index = p._index[id];
							if(index !== undefined) {
								item = p.data[index];
								if (item != null) {
									cm = p.colModel[pos];
									v = convertOnSaveLocally.call($t, nData, cm, item[cm.name], id, item, pos);
									if ($.isFunction(cm.saveLocally)) {
										cm.saveLocally.call($t, { newValue: v, newItem: item, oldItem: item, id: id, cm: cm, cmName: cm.name, iCol: pos });
									} else {
										item[cm.name] = v;
									}
								}
							}
						}
					}
					if(typeof cssp === 'string'){
						$(tcell).addClass(cssp);
					} else if(cssp) {
						$(tcell).css(cssp);
					}
					if(typeof attrp === 'object') {$(tcell).attr(attrp);}
				}
			}
		});
	},
	getCell : function(rowid,col) {
		// TODO: add an additional parameter, which will inform whether the output data should be in formatted or unformatted form
		var ret = false;
		this.each(function(){
			var $t=this, pos=-1;
			if(!$t.grid) {return;}
			if(isNaN(col)) {
				$($t.p.colModel).each(function(i){
					if (this.name === col) {
						pos = i;return false;
					}
				});
			} else {pos = parseInt(col,10);}
			if(pos>=0) {
				var ind = $($t).jqGrid('getGridRowById', rowid);
				if(ind) {
					try {
						ret = $.unformat.call($t,$("td:eq("+pos+")",ind),{rowId:ind.id, colModel:$t.p.colModel[pos]},pos);
					} catch (exception){
						ret = htmlDecode($("td:eq("+pos+")",ind).html());
					}
				}
			}
		});
		return ret;
	},
	getCol : function (col, obj, mathopr) {
		// TODO: add an additional parameter, which will inform whether the output data should be in formatted or unformatted form
		var ret = [], val, sum=0, min, max, v;
		obj = typeof obj !== 'boolean' ? false : obj;
		if(mathopr === undefined) { mathopr = false; }
		this.each(function(){
			var $t=this, pos=-1;
			if(!$t.grid) {return;}
			if(isNaN(col)) {
				$($t.p.colModel).each(function(j){
					if (this.name === col) {
						pos = j;return false;
					}
				});
			} else {pos = parseInt(col,10);}
			if(pos>=0) {
				var ln = $t.rows.length, i =0, dlen=0;
				if (ln && ln>0){
					while(i<ln){
						if($($t.rows[i]).hasClass('jqgrow')) {
							try {
								val = $.unformat.call($t,$($t.rows[i].cells[pos]),{rowId:$t.rows[i].id, colModel:$t.p.colModel[pos]},pos);
							} catch (exception) {
								val = htmlDecode($t.rows[i].cells[pos].innerHTML);
							}
							if(mathopr) {
								v = parseFloat(val);
								if(!isNaN(v)) {
									sum += v;
									if (max === undefined) {max = min = v;}
									min = Math.min(min, v);
									max = Math.max(max, v);
									dlen++;
								}
							}
							else if(obj) { ret.push( {id:$t.rows[i].id,value:val} ); }
							else { ret.push( val ); }
						}
						i++;
					}
					if(mathopr) {
						switch(mathopr.toLowerCase()){
							case 'sum': ret =sum; break;
							case 'avg': ret = sum/dlen; break;
							case 'count': ret = (ln-1); break;
							case 'min': ret = min; break;
							case 'max': ret = max; break;
						}
					}
				}
			}
		});
		return ret;
	},
	clearGridData : function(clearfooter) {
		return this.each(function(){
			var $t = this, p = $t.p, gridIdEscaped = jqID(p.id);
			if(!$t.grid) {return;}
			if(typeof clearfooter !== 'boolean') { clearfooter = false; }
			$($t).unbind(".jqGridFormatter");
			if(p.deepempty) {$("#"+gridIdEscaped+" tbody:first tr:gt(0)").remove();}
			else {
				var trf = $("#"+gridIdEscaped+" tbody:first tr:first")[0];
				$("#"+gridIdEscaped+" tbody:first").empty().append(trf);
			}
			if(p.footerrow && clearfooter) { $(".ui-jqgrid-ftable td",$t.grid.sDiv).html("&#160;"); }
			p.selrow = null;
			clearArray(p.selarrrow); // p.selarrrow= [];
			clearArray(p.savedRow); // p.savedRow = [];
			p.records = 0;
			p.page=1;
			p.lastpage=0;
			p.reccount=0;
			clearArray(p.data); // $t.p.data = [];
			clearArray(p.lastSelectedData); // p.lastSelectedData = [];
			p._index = {};
			$t.updatepager(true,false);
		});
	},
	getInd : function(rowid,rc){
		var ret =false,rw;
		this.each(function(){
			rw = $(this).jqGrid('getGridRowById', rowid);
			if(rw) {
				ret = rc===true ? rw: rw.rowIndex;
			}
		});
		return ret;
	},
	bindKeys : function( settings ){
		var o = $.extend({
			onEnter: null,
			onSpace: null,
			onLeftKey: null,
			onRightKey: null,
			scrollingRows : true
		},settings || {});
		return this.each(function(){
			var $t = this, p = $t.p;
			if( !$('body').is('[role]') ){$('body').attr('role','application');}
			p.scrollrows = o.scrollingRows;
			$($t).keydown(function(event){
				var target = $($t).find('tr[tabindex=0]')[0], id, r, mind,
				expanded = p.treeReader.expanded_field;
				//check for arrow keys
				if(target) {
					mind = p._index[stripPref(p.idPrefix, target.id)];
					if(event.keyCode === 37 || event.keyCode === 38 || event.keyCode === 39 || event.keyCode === 40){
						// up key
						if(event.keyCode === 38 ){
							r = target.previousSibling;
							id = "";
							if(r) {
								if($(r).is(":hidden")) {
									while(r) {
										r = r.previousSibling;
										if(!$(r).is(":hidden") && $(r).hasClass('jqgrow')) {id = r.id;break;}
									}
								} else {
									id = r.id;
								}
							}
							$($t).jqGrid('setSelection', id, true, event);
							event.preventDefault();
						}
						//if key is down arrow
						if(event.keyCode === 40){
							r = target.nextSibling;
							id ="";
							if(r) {
								if($(r).is(":hidden")) {
									while(r) {
										r = r.nextSibling;
										if(!$(r).is(":hidden") && $(r).hasClass('jqgrow') ) {id = r.id;break;}
									}
								} else {
									id = r.id;
								}
							}
							$($t).jqGrid('setSelection', id, true, event);
							event.preventDefault();
						}
						// left
						if(event.keyCode === 37 ){
							if(p.treeGrid && p.data[mind][expanded]) {
								$(target).find("div.treeclick").trigger('click');
							}
							$($t).triggerHandler("jqGridKeyLeft", [p.selrow]);
							if($.isFunction(o.onLeftKey)) {
								o.onLeftKey.call($t, p.selrow);
							}
						}
						// right
						if(event.keyCode === 39 ){
							if(p.treeGrid && !p.data[mind][expanded]) {
								$(target).find("div.treeclick").trigger('click');
							}
							$($t).triggerHandler("jqGridKeyRight", [p.selrow]);
							if($.isFunction(o.onRightKey)) {
								o.onRightKey.call($t, p.selrow);
							}
						}
					}
					//check if enter was pressed on a grid or treegrid node
					else if( event.keyCode === 13 ){
						$($t).triggerHandler("jqGridKeyEnter", [p.selrow]);
						if($.isFunction(o.onEnter)) {
							o.onEnter.call($t, p.selrow);
						}
					} else if(event.keyCode === 32) {
						$($t).triggerHandler("jqGridKeySpace", [p.selrow]);
						if($.isFunction(o.onSpace)) {
							o.onSpace.call($t, p.selrow);
						}
					}
				}
			});
		});
	},
	unbindKeys : function(){
		return this.each(function(){
			$(this).unbind('keydown');
		});
	},
	getLocalRow : function (rowid) {
		var ret = false, ind;
		this.each(function(){
			if(rowid !== undefined) {
				ind = this.p._index[stripPref(this.p.idPrefix, rowid)];
				if(ind >= 0 ) {
					ret = this.p.data[ind];
				}
			}
		});
		return ret;
	},
	progressBar : function ( p ) {
		p = $.extend({
			htmlcontent : "",
			method : "hide",
			loadtype : "disable" 
		}, p || {});
		return this.each(function(){
			var sh = p.method==="show" ? true : false, gridIdEscaped = jqID(this.p.id);
			if(p.htmlcontent !== "") {
				$("#load_"+gridIdEscaped).html( p.htmlcontent );
			}
			switch(p.loadtype) {
				case "disable":
					break;
				case "enable":
					$("#load_"+gridIdEscaped).toggle( sh );
					break;
				case "block":
					$("#lui_"+gridIdEscaped).toggle( sh );
					$("#load_"+gridIdEscaped).toggle( sh );
					break;
			}
		});
	},
	setColWidth: function (iCol, newWidth, adjustGridWidth) {
		return this.each(function () {
			var self = this, $self = $(self), grid = self.grid, p = self.p, colModel = p.colModel, colName, i, nCol;
			if (typeof iCol === "string") {
				// the first parametrer is column name instead of index
				colName = iCol;
				for (i = 0, nCol = colModel.length; i < nCol; i++) {
					if (colModel[i].name === colName) {
						iCol = i;
						break;
					}
				}
				if (i >= nCol) {
					return; // error: non-existing column name specified as the first parameter
				}
			} else if (typeof iCol !== "number") {
				return; // error: wrong parameters
			}
			grid.headers[iCol].newWidth = newWidth;
			grid.newWidth = p.tblwidth + newWidth - grid.headers[iCol].width;
			grid.resizeColumn(iCol, true);
			if (adjustGridWidth !== false) {
				$self.jqGrid("setGridWidth", grid.newWidth, false); // adjust grid width too
			}
		});
	},
	getAutoResizableWidth: function (iCol) {
		var self = this;
		if (self.length === 0) {
			return -1;
		}
		self = self[0];
		var rows = self.rows, row, cell, iRow, $cell, $cellFirstChild,
			p = self.p,
			cm = p.colModel[iCol],
			$th = $($(self.grid.hDiv).find(".ui-jqgrid-labels>.ui-th-column")[iCol]),
			$thDiv = $th.find(">div"),
			thPaddingLeft = parseFloat($th.css("padding-left") || 0),
			thPaddingRight = parseFloat($th.css("padding-right") || 0),
			$incosDiv = $thDiv.find("span.s-ico"),
			$wrapper = $thDiv.find(">." + p.autoResizing.wrapperClassName),
			wrapperOuterWidth = $wrapper.outerWidth(),
			wrapperCssWidth = parseFloat($wrapper.css("width") || 0),
			widthOuter = 0,
			colWidth = 0,
			compact = (cm.autoResizing != null && cm.autoResizing.compact !== undefined) ? cm.autoResizing.compact: p.autoResizing.compact,
			wrapperClassName = p.autoResizing.wrapperClassName;

		if (cm == null || !cm.autoResizable || $wrapper.length === 0 || cm.hidden || cm.fixed) {
			return -1; // do nothing
		}
		if (!compact || $incosDiv.is(":visible") || ($incosDiv.css("display") !== "none")) {  //|| p.viewsortcols[0]
			colWidth = p.autoResizing.widthOfVisiblePartOfSortIcon; // $incosDiv.width() can be grater as the visible part of icon
			if ($thDiv.css("text-align") === "center") {
				colWidth += colWidth; // *2
			}
			if (p.viewsortcols[1] === "horizontal") {
				colWidth += colWidth; // *2
			}
		}
		colWidth += wrapperOuterWidth + thPaddingLeft +
				(wrapperCssWidth === wrapperOuterWidth ? thPaddingLeft + thPaddingRight : 0) +
				parseFloat($thDiv.css("margin-left") || 0) + parseFloat($thDiv.css("margin-right") || 0);
		for (iRow = 0, rows = self.rows; iRow < rows.length; iRow++) {
			row = rows[iRow];
			cell = row.cells[iCol];
			$cell = $(row.cells[iCol]);
			if ($(row).hasClass("jqgrow") && cell != null) {
				$cellFirstChild = $(cell.firstChild);
				if ($cellFirstChild.hasClass(wrapperClassName)) {
					colWidth = Math.max(colWidth, $cellFirstChild.outerWidth() + widthOuter);
				} else if (p.treeGrid && p.ExpandColumn === cm.name) {
					$cellFirstChild = $cell.children(".cell-wrapper,.cell-wrapperleaf");
					colWidth = Math.max(colWidth, $cellFirstChild.outerWidth() + widthOuter + $cell.children(".tree-wrap").outerWidth());						
				}
			} else if ($(row).hasClass("jqgfirstrow")) {
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
	autoResizeColumn: function (iCol) {
		return this.each(function () {
			var self = this, $self = $(this), p = self.p, cm = p.colModel[iCol], widthOrg,
				$th = $($(self.grid.hDiv).find(".ui-jqgrid-labels>.ui-th-column")[iCol]),
				newWidth = $self.jqGrid("getAutoResizableWidth", iCol);

			if (cm == null || newWidth < 0) {
				return;
			}
			$self.jqGrid("setColWidth", iCol, newWidth, p.autoResizing.adjustGridWidth && !p.autoResizing.fixWidthOnShrink);
			if (p.autoResizing.fixWidthOnShrink && p.shrinkToFit) {
				cm.fixed = true;
				widthOrg = cm.widthOrg; // save the value in temporary variable
				cm.widthOrg = cm.width; // to force not changing of the column width
				$self.jqGrid("setGridWidth", p.width, true);
				cm.widthOrg = widthOrg;
				cm.fixed = false;
			}
			$th.data("autoResized", "true");
		});
	},
	autoResizeAllColumns: function () {
		return this.each(function () {
			var $self = $(this), p = this.p, colModel = p.colModel, nCol = colModel.length, iCol, cm,
				shrinkToFit = p.shrinkToFit, // save the original shrinkToFit value in the grid
				adjustGridWidth = p.autoResizing.adjustGridWidth,
				fixWidthOnShrink = p.autoResizing.fixWidthOnShrink,
				width = parseInt(p.widthOrg,10),
				autoResizeColumn = jgrid.getMethod("autoResizeColumn"); // cache autoResizeColumn reference
				
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
					autoResizeColumn.call($self, iCol);
				}
			}
			if (!isNaN(width)) {
				$(this).jqGrid("setGridWidth", width, false);
			}
			// restore the original shrinkToFit value
			p.autoResizing.fixWidthOnShrink = fixWidthOnShrink;
			p.autoResizing.adjustGridWidth = adjustGridWidth;
			p.shrinkToFit = shrinkToFit;
		});
	}
});
}(jQuery));
/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/**
 * jqGrid extension for cellediting Grid Data
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com
 * Copyright (c) 2014-2015, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/ 
/**
 * all events and options here are added anonymous and not in the base grid
 * since the array is to big. Here is the order of execution.
 * From this point we use jQuery isFunction
 * formatCell
 * beforeEditCell,
 * onSelectCell (used only for non-editable cells)
 * afterEditCell,
 * beforeSaveCell, (called before validation of values if any)
 * beforeSubmitCell (if cellsubmit remote (Ajax))
 * afterSubmitCell(if cellsubmit remote (Ajax)),
 * afterSaveCell,
 * errorCell,
 * serializeCellData - new
 * Options
 * cellsubmit ("remote","clientArray") (added in grid options)
 * cellurl
 * ajaxCellOptions
* */
"use strict";
var jgrid = $.jgrid;
jgrid.extend({
	editCell : function (iRow,iCol, ed){
		return this.each(function (){
			var $t = this, $self = $($t), p = $t.p, nm, tmp,cc, cm, feedback = jgrid.feedback;
			if (!$t.grid || p.cellEdit !== true || $t.rows == null || $t.rows[iRow] == null) {return;}
			iRow = parseInt(iRow, 10);
			iCol = parseInt(iCol, 10);
			var tr = $t.rows[iRow], rowid = tr.id, $tr = $(tr), $trOld = $($t.rows[p.iRow]);
			// select the row that can be used for other methods
			p.selrow = rowid;
			if (!p.knv) {$self.jqGrid("GridNav");}
			// check to see if we have already edited cell
			if (p.savedRow.length>0) {
				// prevent second click on that field and enable selects
				if (ed===true ) {
					if(iRow === p.iRow && iCol === p.iCol){
						return;
					}
				}
				// save the cell
				$self.jqGrid("saveCell",p.savedRow[0].id,p.savedRow[0].ic);
			} else {
				window.setTimeout(function () { $("#"+jgrid.jqID(p.knv)).attr("tabindex","-1").focus();},1);
			}
			cm = p.colModel[iCol];
			nm = cm.name;
			if (nm==='subgrid' || nm==='cb' || nm==='rn') {return;}
			cc = $("td:eq("+iCol+")",tr);
			var editable = cm.editable;
			if ($.isFunction(editable)) {
				editable = editable.call($t, {
					rowid: rowid,
					iCol: iCol,
					iRow: iRow,
					name: nm,
					cm: cm
				});
			}
			if (editable===true && ed===true && !cc.hasClass("not-editable-cell")) {
				if(parseInt(p.iCol,10)>=0  && parseInt(p.iRow,10)>=0) {
					$("td:eq("+p.iCol+")",$trOld).removeClass("edit-cell ui-state-highlight");
					$trOld.removeClass("selected-row ui-state-hover");
				}
				cc.addClass("edit-cell ui-state-highlight");
				$tr.addClass("selected-row ui-state-hover");
				try {
					tmp =  $.unformat.call($t,cc,{rowId: rowid, colModel:cm},iCol);
				} catch (_) {
					tmp = ( cm.edittype && cm.edittype === 'textarea' ) ? cc.text() : cc.html();
				}
				if(p.autoencode) { tmp = jgrid.htmlDecode(tmp); }
				if (!cm.edittype) {cm.edittype = "text";}
				p.savedRow.push({id:iRow,ic:iCol,name:nm,v:tmp});
				if(tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
				if($.isFunction(p.formatCell)) {
					var tmp2 = p.formatCell.call($t, rowid,nm,tmp,iRow,iCol);
					if(tmp2 !== undefined ) {tmp = tmp2;}
				}
				feedback.call($t, "beforeEditCell", rowid, nm, tmp, iRow, iCol);
				var opt = $.extend({}, cm.editoptions || {} ,{id:iRow+"_"+nm,name:nm,rowId: rowid});
				var elc = jgrid.createEl.call($t,cm.edittype,opt,tmp,true,$.extend({},jgrid.ajaxOptions,p.ajaxSelectOptions || {}));
				cc.html("").append(elc).attr("tabindex","0");
				jgrid.bindEv.call($t, elc, opt);
				window.setTimeout(function () { $(elc).focus();},1);
				$("input, select, textarea",cc).bind("keydown",function(e) {
					if (e.keyCode === 27) {
						if($("input.hasDatepicker",cc).length >0) {
							if( $(".ui-datepicker").is(":hidden") )  { $self.jqGrid("restoreCell",iRow,iCol); }
							else { $("input.hasDatepicker",cc).datepicker('hide'); }
						} else {
							$self.jqGrid("restoreCell",iRow,iCol);
						}
					} //ESC
					if (e.keyCode === 13 && !e.shiftKey) {
						$self.jqGrid("saveCell",iRow,iCol);
						// Prevent default action
						return false;
					} //Enter
					if (e.keyCode === 9)  {
						if(!$t.grid.hDiv.loading ) {
							if (e.shiftKey) {$self.jqGrid("prevCell",iRow,iCol);} //Shift TAb
							else {$self.jqGrid("nextCell",iRow,iCol);} //Tab
						} else {
							return false;
						}
					}
					e.stopPropagation();
				});
				feedback.call($t, "afterEditCell", rowid, nm, tmp, iRow, iCol);
				$self.triggerHandler("jqGridAfterEditCell", [rowid, nm, tmp, iRow, iCol]);
			} else {
				if (parseInt(p.iCol,10)>=0  && parseInt(p.iRow,10)>=0) {
					$("td:eq("+p.iCol+")",$trOld).removeClass("edit-cell ui-state-highlight");
					$trOld.removeClass("selected-row ui-state-hover");
				}
				cc.addClass("edit-cell ui-state-highlight");
				$tr.addClass("selected-row ui-state-hover");
				tmp = cc.html().replace(/\&#160\;/ig,'');
				feedback.call($t, "onSelectCell", rowid, nm, tmp, iRow, iCol);
			}
			p.iCol = iCol; p.iRow = iRow;
		});
	},
	saveCell : function (iRow, iCol){
		return this.each(function(){
			var $t= this, $self = $($t), p = $t.p, fr, feedback = jgrid.feedback, infoDialog = jgrid.info_dialog, jqID = jgrid.jqID,
				errors = $self.jqGrid("getGridRes","errors"), errcap = errors.errcap,
				edit = $self.jqGrid("getGridRes","edit"), editMsg = edit.msg, bClose = edit.bClose;
			if (!$t.grid || p.cellEdit !== true) {return;}
			if ( p.savedRow.length >= 1) {fr = 0;} else {fr=null;}
			if(fr !== null) {
				var tr = $t.rows[iRow], rowid = tr.id, $tr = $(tr), cc = $("td:eq("+iCol+")",tr),v,v2,
				cm = p.colModel[iCol], nm = cm.name, iRowNmSelector = "#"+iRow+"_"+jqID(nm);
				switch (cm.edittype) {
					case "select":
						if(cm.editoptions == null || !cm.editoptions.multiple) {
							v = $(iRowNmSelector+" option:selected",tr).val();
							v2 = $(iRowNmSelector+" option:selected",tr).text();
						} else {
							var sel = $(iRowNmSelector,tr), selectedText = [];
							v = $(sel).val();
							if(v) { v.join(",");} else { v=""; }
							$("option:selected",sel).each(
								function(i,selected){
									selectedText[i] = $(selected).text();
								}
							);
							v2 = selectedText.join(",");
						}
						if(cm.formatter) { v2 = v; }
						break;
					case "checkbox":
						var cbv  = ["Yes","No"];
						if(cm.editoptions && cm.editoptions.value){
							cbv = cm.editoptions.value.split(":");
						}
						v = $(iRowNmSelector,tr).is(":checked") ? cbv[0] : cbv[1];
						v2=v;
						break;
					case "password":
					case "text":
					case "textarea":
					case "button" :
						v = $(iRowNmSelector,tr).val();
						v2=v;
						break;
					case 'custom' :
						try {
							if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
								v = cm.editoptions.custom_value.call($t, $(".customelement",cc),'get');
								if (v===undefined) { throw "e2";}
								v2=v;
							} else { throw "e1"; }
						} catch (e) {
							if (e==="e1") { infoDialog.call($t,errcap,"function 'custom_value' "+editMsg.nodefined,bClose); }
							if (e==="e2") { infoDialog.call($t,errcap,"function 'custom_value' "+editMsg.novalue,bClose); }
							else {infoDialog.call($t,errcap,e.message,bClose); }
						}
						break;
				}
				// The common approach is if nothing changed do not do anything
				if (v2 !== p.savedRow[fr].v){
					var vvv = $self.triggerHandler("jqGridBeforeSaveCell", [rowid, nm, v, iRow, iCol]);
					if (vvv) {v = vvv; v2=vvv;}
					if ($.isFunction(p.beforeSaveCell)) {
						var vv = p.beforeSaveCell.call($t, rowid,nm, v, iRow,iCol);
						if (vv) {v = vv; v2=vv;}
					}
					var cv = jgrid.checkValues.call($t,v,iCol);
					if(cv[0] === true) {
						var addpost = $self.triggerHandler("jqGridBeforeSubmitCell", [rowid, nm, v, iRow, iCol]) || {};
						if ($.isFunction(p.beforeSubmitCell)) {
							addpost = p.beforeSubmitCell.call($t, rowid,nm, v, iRow,iCol);
							if (!addpost) {addpost={};}
						}
						if( $("input.hasDatepicker",cc).length >0) { $("input.hasDatepicker",cc).datepicker('hide'); }
						if (cm.formatter && cm.formatter === "date" && (cm.formatoptions == null || cm.formatoptions.sendFormatted !== true)) {
							// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
							// Floating point separator for example
							v2 = $.unformat.date.call($t, v2, cm);
						}
						if (p.cellsubmit === 'remote') {
							if (p.cellurl) {
								var postdata = {};
								if(p.autoencode) { v = jgrid.htmlEncode(v); }
								postdata[nm] = v;
								var idname,oper, opers;
								opers = p.prmNames;
								idname = opers.id;
								oper = opers.oper;
								postdata[idname] = jgrid.stripPref(p.idPrefix, rowid);
								postdata[oper] = opers.editoper;
								postdata = $.extend(addpost,postdata);
								$self.jqGrid("progressBar", {method:"show", loadtype : p.loadui, htmlcontent: jgrid.defaults.savetext || "Saving..." });
								$t.grid.hDiv.loading = true;
								$.ajax( $.extend( {
									url: p.cellurl,
									//data :$.isFunction(p.serializeCellData) ? p.serializeCellData.call($t, postdata) : postdata,
									data: jgrid.serializeFeedback.call($t, p.serializeCellData, "jqGridSerializeCellData", postdata),
									type: "POST",
									complete: function (jqXHR) {
										$self.jqGrid("progressBar", {method:"hide", loadtype : p.loadui });
										$t.grid.hDiv.loading = false;
										if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
											var ret = $self.triggerHandler("jqGridAfterSubmitCell", [$t, jqXHR, postdata.id, nm, v, iRow, iCol]) || [true, ''];
											if (ret[0] === true && $.isFunction(p.afterSubmitCell)) {
												ret = p.afterSubmitCell.call($t, jqXHR,postdata.id,nm,v,iRow,iCol);
											}
											if(ret[0] === true){
												cc.empty();
												$self.jqGrid("setCell",rowid, iCol, v2, false, false, true);
												cc.addClass("dirty-cell");
												$tr.addClass("edited");
												feedback.call($t, "afterSaveCell", rowid,nm, v, iRow,iCol);
												p.savedRow.splice(0,1);
											} else {
												infoDialog.call($t,errcap,ret[1],bClose);
												$self.jqGrid("restoreCell",iRow,iCol);
											}
										}
									},
									error: function (jqXHR, textStatus, errorThrown) {
										$("#lui_"+jqID(p.id)).hide();
										$t.grid.hDiv.loading = false;
										$self.triggerHandler("jqGridErrorCell", [jqXHR, textStatus, errorThrown]);
										if ($.isFunction(p.errorCell)) {
											p.errorCell.call($t, jqXHR,textStatus,errorThrown);
											$self.jqGrid("restoreCell",iRow,iCol);
										} else {
											infoDialog.call($t,errcap,jqXHR.status+" : "+jqXHR.statusText+"<br/>"+textStatus,bClose);
											$self.jqGrid("restoreCell",iRow,iCol);
										}
									}
								}, jgrid.ajaxOptions, p.ajaxCellOptions || {}));
							} else {
								try {
									infoDialog.call($t,errcap,errors.nourl,bClose);
									$self.jqGrid("restoreCell",iRow,iCol);
								} catch (ignore) {}
							}
						}
						if (p.cellsubmit === 'clientArray') {
							cc.empty();
							$self.jqGrid("setCell",rowid,iCol, v2, false, false, true);
							cc.addClass("dirty-cell");
							$tr.addClass("edited");
							feedback.call($t, "afterSaveCell", rowid, nm, v, iRow, iCol);
							p.savedRow.splice(0,1);
						}
					} else {
						try {
							window.setTimeout(function(){infoDialog.call($t,errcap,v+" "+cv[1],bClose);},100);
							$self.jqGrid("restoreCell",iRow,iCol);
						} catch (ignore) {}
					}
				} else {
					$self.jqGrid("restoreCell",iRow,iCol);
				}
			}
			window.setTimeout(function () { $("#"+jqID(p.knv)).attr("tabindex","-1").focus();},0);
		});
	},
	restoreCell : function(iRow, iCol) {
		return this.each(function(){
			var $t= this, p = $t.p, tr = $t.rows[iRow], rowid = tr.id, v, cm;
			if (!$t.grid || p.cellEdit !== true) {return;}
			if (p.savedRow.length >= 1) {
				var cc = $("td:eq("+iCol+")",tr);
				// datepicker fix
				if($.isFunction($.fn.datepicker)) {
					try {
						$("input.hasDatepicker",cc).datepicker('hide');
					} catch (ignore) {}
				}
				$(cc).empty().attr("tabindex","-1");
				v = p.savedRow[0].v;
				cm = p.colModel[iCol];
				if (cm.formatter && cm.formatter === "date" && (cm.formatoptions == null || cm.formatoptions.sendFormatted !== true)) {
					// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
					// Floating point separator for example
					v = $.unformat.date.call($t, v, cm);
				}
				$($t).jqGrid("setCell",rowid, iCol, v, false, false, true);
				jgrid.feedback.call($t, "afterRestoreCell", rowid, v, iRow, iCol);
				p.savedRow.splice(0,1);
			}
			window.setTimeout(function () { $("#"+p.knv).attr("tabindex","-1").focus();},0);
		});
	},
	nextCell : function (iRow,iCol) {
		return this.each(function (){
			var $t = this, $self = $($t), p = $t.p, nCol=false, i, editable, cm;
			if (!$t.grid || p.cellEdit !== true || $t.rows == null || $t.rows[iRow] == null) {return;}
			// try to find next editable cell
			for (i=iCol+1; i<p.colModel.length; i++) {
				cm = p.colModel[i];
				editable = cm.editable;
				if ($.isFunction(editable)) {
					editable = editable.call($t, {
						rowid: $t.rows[iRow].id,
						iCol: i,
						iRow: iRow,
						name: cm.name,
						cm: cm
					});
				}
				if (editable === true) {
					nCol = i; break;
				}
			}
			if(nCol !== false) {
				$self.jqGrid("editCell",iRow,nCol,true);
			} else {
				if (p.savedRow.length >0) {
					$self.jqGrid("saveCell",iRow,iCol);
				}
			}
		});
	},
	prevCell : function (iRow,iCol) {
		return this.each(function (){
			var $t = this, $self = $($t), p = $t.p, nCol=false, i, editable, cm;
			if (!$t.grid || p.cellEdit !== true || $t.rows == null || $t.rows[iRow] == null) {return;}
			// try to find next editable cell
			for (i=iCol-1; i>=0; i--) {
				cm = p.colModel[i];
				editable = cm.editable;
				if ($.isFunction(editable)) {
					editable = editable.call($t, {
						rowid: $t.rows[iRow].id,
						iCol: i,
						iRow: iRow,
						name: cm.name,
						cm: cm,
						mode: "cell"
					});
				}
				if (editable === true) {
					nCol = i; break;
				}
			}
			if(nCol !== false) {
				$self.jqGrid("editCell",iRow,nCol,true);
			} else {
				if (p.savedRow.length >0) {
					$self.jqGrid("saveCell",iRow,iCol);
				}
			}
		});
	},
	GridNav : function() {
		return this.each(function () {
			var  $t = this, $self = $($t), p = $t.p, grid = $t.grid;
			if (!grid || p.cellEdit !== true ) {return;}
			var bDiv = grid.bDiv;
			// trick to process keydown on non input elements
			p.knv = p.id + "_kn";
			var selection = $("<div style='position:fixed;top:0px;width:1px;height:1px;' tabindex='0'><div tabindex='-1' style='width:1px;height:1px;' id='"+p.knv+"'></div></div>"),
			i, kdir;
			function scrollGrid(iR, iC, tp){
				var tr = $t.rows[iR];
				if (tp.substr(0,1)==='v') {
					var ch = bDiv.clientHeight,
					st = bDiv.scrollTop,
					nRot = tr.offsetTop+tr.clientHeight,
					pRot = tr.offsetTop;
					if(tp === 'vd') {
						if(nRot >= ch) {
							bDiv.scrollTop = bDiv.scrollTop + tr.clientHeight;
						}
					}
					if(tp === 'vu'){
						if (pRot < st ) {
							bDiv.scrollTop = bDiv.scrollTop - tr.clientHeight;
						}
					}
				}
				if(tp==='h') {
					var cw = bDiv.clientWidth,
					sl = bDiv.scrollLeft, td = tr.cells[iC],
					nCol = td.offsetLeft+td.clientWidth,
					pCol = td.offsetLeft;
					if(nCol >= cw+parseInt(sl,10)) {
						bDiv.scrollLeft = bDiv.scrollLeft + td.clientWidth;
					} else if (pCol < sl) {
						bDiv.scrollLeft = bDiv.scrollLeft - td.clientWidth;
					}
				}
			}
			function findNextVisible(iC,act){
				var ind = 0, j, colModel = p.colModel;
				if(act === 'lft') {
					ind = iC+1;
					for (j=iC;j>=0;j--){
						if (colModel[j].hidden !== true) {
							ind = j;
							break;
						}
					}
				}
				if(act === 'rgt') {
					ind = iC-1;
					for (j=iC; j<colModel.length;j++){
						if (colModel[j].hidden !== true) {
							ind = j;
							break;
						}						
					}
				}
				return ind;
			}

			$(selection).insertBefore(grid.cDiv);
			$("#"+p.knv)
			.focus()
			.keydown(function (e){
				kdir = e.keyCode;
				if(p.direction === "rtl") {
					if(kdir===37) { kdir = 39;}
					else if (kdir===39) { kdir = 37; }
				}
				switch (kdir) {
					case 38:
						if (p.iRow-1 >0 ) {
							scrollGrid(p.iRow-1,p.iCol,'vu');
							$self.jqGrid("editCell",p.iRow-1,p.iCol,false);
						}
					break;
					case 40 :
						if (p.iRow+1 <=  $t.rows.length-1) {
							scrollGrid(p.iRow+1,p.iCol,'vd');
							$self.jqGrid("editCell",p.iRow+1,p.iCol,false);
						}
					break;
					case 37 :
						if (p.iCol -1 >=  0) {
							i = findNextVisible(p.iCol-1,'lft');
							scrollGrid(p.iRow, i,'h');
							$self.jqGrid("editCell",p.iRow, i,false);
						}
					break;
					case 39 :
						if (p.iCol +1 <=  p.colModel.length-1) {
							i = findNextVisible(p.iCol+1,'rgt');
							scrollGrid(p.iRow,i,'h');
							$self.jqGrid("editCell",p.iRow,i,false);
						}
					break;
					case 13:
						if (parseInt(p.iCol,10)>=0 && parseInt(p.iRow,10)>=0) {
							$self.jqGrid("editCell",p.iRow,p.iCol,true);
						}
					break;
					default :
						return true;
				}
				return false;
			});
		});
	},
	getChangedCells : function (mthd) {
		var ret=[];
		if (!mthd) {mthd='all';}
		this.each(function(){
			var $t = this, p = $t.p, htmlDecode = jgrid.htmlDecode;
			if (!$t.grid || p.cellEdit !== true ) {return;}
			$($t.rows).each(function(j){
				var res = {};
				if ($(this).hasClass("edited")) {
					$('td',this).each( function(i) {
						var cm = p.colModel[i], nm = cm.name, $td = $(this);
						if ( nm !== 'cb' && nm !== 'subgrid') {
							if (mthd==='dirty') {
								if ($td.hasClass('dirty-cell')) {
									try {
										res[nm] = $.unformat.call($t,this,{rowId:$t.rows[j].id, colModel:cm},i);
									} catch (e){
										res[nm] = htmlDecode($td.html());
									}
								}
							} else {
								try {
									res[nm] = $.unformat.call($t,this,{rowId:$t.rows[j].id,colModel:cm},i);
								} catch (e) {
									res[nm] = htmlDecode($td.html());
								}
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
/// end  cell editing
});
}(jQuery));
/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery, HTMLElement */
(function($){
/*
 * jqGrid common function
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
*/
"use strict";
var jgrid = $.jgrid, getGridRes = jgrid.getMethod("getGridRes");
$.extend(jgrid,{
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
		h.w.hide().attr("aria-hidden","true");
		if (h.o) {
		    h.o.remove();
		}
	},
	hideModal : function (selector,o) {
		o = $.extend({jqm : true, gb :'', removemodal: false, formprop: false, form : ''}, o || {});
		var thisgrid = o.gb && typeof o.gb === "string" && o.gb.substr(0,6) === "#gbox_" ? $("#" + o.gb.substr(6))[0] : false;
		if(o.onClose) {
			var oncret = thisgrid ? o.onClose.call(thisgrid, selector) : o.onClose(selector);
			if (typeof oncret === 'boolean'  && !oncret ) { return; }
		}
		if( o.formprop && thisgrid  && o.form) {
			var fh = $(selector)[0].style.height;
			if(fh.indexOf("px") > -1 ) {
				fh = parseFloat(fh);
			}
			var frmgr, frmdata;
			if(o.form==='edit'){
				frmgr = '#' +jgrid.jqID("FrmGrid_"+ o.gb.substr(6));
				frmdata = "formProp";
			} else if( o.form === 'view') {
				frmgr = '#' +jgrid.jqID("ViewGrid_"+ o.gb.substr(6));
				frmdata = "viewProp";
			}
			$(thisgrid).data(frmdata, {
				top:parseFloat($(selector).css("top")),
				left : parseFloat($(selector).css("left")),
				width : $(selector).width(),
				height : fh,
				dataheight : $(frmgr).height(),
				datawidth: $(frmgr).width()
			});
		}
		if ($.fn.jqm && o.jqm === true) {
			$(selector).attr("aria-hidden","true").jqmHide();
		} else {
			if(o.gb !== '') {
				try {$(">.jqgrid-overlay",o.gb).filter(':first').hide();} catch (ignore){}
			}
			$(selector).hide().attr("aria-hidden","true");
		}
		if( o.removemodal ) {
			$(selector).remove();
		}
	},
//Helper functions
	findPos : function(obj) {
		var curleft = 0, curtop = 0;
		if (obj.offsetParent) {
			do {
				curleft += obj.offsetLeft;
				curtop += obj.offsetTop;
			    obj = obj.offsetParent;
			} while (obj);
			//do not change obj == obj.offsetParent
		}
		return [curleft,curtop];
	},
	createModal : function(aIDs, content, o, insertSelector, posSelector, appendsel, css) {
		var jqID = jgrid.jqID, p = this.p, gridjqModal = p != null ? p.jqModal || {} : {};
		o = $.extend(true, {
			resizingRightBottomIcon: "ui-icon ui-icon-gripsmall-diagonal-se"
		}, jgrid.jqModal || {}, gridjqModal, o);
		// create main window "div.ui-jqdialog", which will contains other components of the modal window:
		// "div.ui-jqdialog-titlebar", "div.ui-jqdialog-content" and optionally resizer like "div.jqResize"
		var mw = document.createElement('div'), themodalSelector = "#"+jqID(aIDs.themodal),
		rtlsup = $(o.gbox).attr("dir") === "rtl" ? true : false, 
		resizeAlso = aIDs.resizeAlso ? "#" + jqID(aIDs.resizeAlso) : false;
		css = $.extend({}, css || {});
		mw.className= "ui-widget ui-widget-content ui-corner-all ui-jqdialog";
		mw.id = aIDs.themodal;
		mw.dir = rtlsup ? "rtl" : "ltr";
		// create the title "div.ui-jqdialog-titlebar", which contains:
		// "span.ui-jqdialog-title" with the title text and "a.ui-jqdialog-titlebar-close" with the closing button
		var mh = document.createElement('div');
		mh.className = "ui-jqdialog-titlebar ui-widget-header ui-corner-all ui-helper-clearfix " +
			(rtlsup ? "ui-jqdialog-titlebar-rtl" : "ui-jqdialog-titlebar-ltr");
		mh.id = aIDs.modalhead;
		$(mh).append("<span class='ui-jqdialog-title'>"+o.caption+"</span>");
		var ahr= $("<a class='ui-jqdialog-titlebar-close ui-corner-all'></a>")
		.hover(function(){ahr.addClass('ui-state-hover');},
			function(){ahr.removeClass('ui-state-hover');})
		.append("<span class='" + jgrid.getIconRes(p.iconSet, "form.close") + "'></span>");
		$(mh).append(ahr);
		// create "div.ui-jqdialog-content" which hold some HTML content (see input parameter)
		var mc = document.createElement('div');
		$(mc).addClass("ui-jqdialog-content ui-widget-content").attr("id",aIDs.modalcontent);
		$(mc).append(content);
		// place "div.ui-jqdialog-content" and "div.ui-jqdialog-titlebar" in main window "div.ui-jqdialog"
		mw.appendChild(mc);
		$(mw).prepend(mh);
		// appendsel and insertSelector specifies where the dialog should be placed on the HTML page
		if(appendsel===true) {
			$('body').append(mw);  //append as first child in body -for alert dialog
		} else if (typeof appendsel === "string") {
			$(appendsel).append(mw);
		} else {$(mw).insertBefore(insertSelector);}
		$(mw).css(css);
		if(o.jqModal === undefined) {o.jqModal = true;} // internal use
		var coord = {};
		if ( $.fn.jqm && o.jqModal === true) {
			if(o.left ===0 && o.top===0 && o.overlay) {
				var pos = [];
				pos = jgrid.findPos(posSelector);
				o.left = pos[0] + 4;
				o.top = pos[1] + 4;
			}
			coord.top = o.top+"px";
			coord.left = o.left;
		} else if(o.left !==0 || o.top!==0) {
			coord.left = o.left;
			coord.top = o.top+"px";
		}
		$("a.ui-jqdialog-titlebar-close",mh).click(function(){
			var oncm = $(themodalSelector).data("onClose") || o.onClose;
			var gboxclose = $(themodalSelector).data("gbox") || o.gbox;
			jgrid.hideModal(themodalSelector,{gb:gboxclose,jqm:o.jqModal,onClose:oncm, removemodal: o.removemodal || false, formprop : !o.recreateForm || false, form: o.form || ''});
			return false;
		});
		if (o.width === 0 || !o.width) {o.width = 300;}
		if(o.height === 0 || !o.height) {o.height =200;}
		if(!o.zIndex) {
			var parentZ = $(insertSelector).parents("*[role=dialog]").filter(':first').css("z-index");
			if(parentZ) {
				o.zIndex = parseInt(parentZ,10)+2;
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
		if(coord.left) { coord.left += "px"; }
		$(mw).css($.extend({
			width: isNaN(o.width) ? "auto": o.width+"px",
			height:isNaN(o.height) ? "auto" : o.height + "px",
			zIndex:o.zIndex,
			overflow: 'hidden'
		},coord))
		.attr({tabIndex: "-1","role":"dialog","aria-labelledby":aIDs.modalhead,"aria-hidden":"true"});
		if(o.drag === undefined) { o.drag=true;}
		if(o.resize === undefined) {o.resize=true;}
		if (o.drag) {
			if($.fn.jqDrag) {
				$(mh).addClass("ui-draggable"); //css('cursor','move');
				$(mw).jqDrag(mh);
			} else {
				try {
					$(mw).draggable({handle: $("#"+jqID(mh.id))});
				} catch (ignore) {}
			}
		}
		if(o.resize) {
			if($.fn.jqResize) {
				$(mw).append("<div class='jqResize ui-resizable-handle ui-resizable-se " + o.resizingRightBottomIcon + "'></div>");
				$(themodalSelector).jqResize(".jqResize",resizeAlso);
			} else {
				try {
					$(mw).resizable({handles: 'se, sw',alsoResize: resizeAlso});
				} catch (ignore) {}
			}
		}
		if(o.closeOnEscape === true){
			$(mw).keydown( function( e ) {
				if( e.which === 27 ) {
					var cone = $(themodalSelector).data("onClose") || o.onClose;
					jgrid.hideModal(themodalSelector,{gb:o.gbox,jqm:o.jqModal,onClose: cone, removemodal: o.removemodal || false, formprop : !o.recreateForm || false, form: o.form || ''});
				}
			});
		}
	},
	viewModal : function (selector,o){
		o = $.extend({
			toTop: false,
			overlay: 10,
			modal: false,
			overlayClass : 'ui-widget-overlay',
			onShow: jgrid.showModal,
			onHide: jgrid.closeModal,
			gbox: '',
			jqm : true,
			jqM : true
		}, o || {});
		if ($.fn.jqm && o.jqm === true) {
			if(o.jqM) { $(selector).attr("aria-hidden","false").jqm(o).jqmShow(); }
			else {$(selector).attr("aria-hidden","false").jqmShow();}
		} else {
			if(o.gbox !== '') {
				$(">.jqgrid-overlay",o.gbox).filter(':first').show();
				$(selector).data("gbox",o.gbox);
			}
			$(selector).show().attr("aria-hidden","false");
			try{$(':input:visible',selector)[0].focus();}catch(ignore){}
		}
	},
	info_dialog : function(caption, content,c_b, modalopt) {
		var mopt = {
			width:290,
			height:'auto',
			dataheight: 'auto',
			drag: true,
			resize: false,
			left:250,
			top:170,
			zIndex : 1000,
			jqModal : true,
			modal : false,
			closeOnEscape : true,
			align: 'center',
			buttonalign : 'center',
			buttons : []
		// {text:'textbutt', id:"buttid", onClick : function(){...}}
		// if the id is not provided we set it like info_button_+ the index in the array - i.e info_button_0,info_button_1...
		};
		$.extend(true, mopt, jgrid.jqModal || {}, {caption:"<b>"+caption+"</b>"}, modalopt || {});
		var jm = mopt.jqModal;
		if($.fn.jqm && !jm) { jm = false; }
		// in case there is no jqModal
		var buttstr ="", i;
		if(mopt.buttons.length > 0) {
			for(i=0;i<mopt.buttons.length;i++) {
				if(mopt.buttons[i].id === undefined) { mopt.buttons[i].id = "info_button_"+i; }
				buttstr += "<a id='"+mopt.buttons[i].id+"' class='fm-button ui-state-default ui-corner-all'>"+mopt.buttons[i].text+"</a>";
			}
		}
		var dh = isNaN(mopt.dataheight) ? mopt.dataheight : mopt.dataheight+"px",
		cn = "text-align:"+mopt.align+";";
		var cnt = "<div id='info_id'>";
		cnt += "<div id='infocnt' style='margin:0px;padding-bottom:1em;width:100%;overflow:auto;position:relative;height:"+dh+";"+cn+"'>"+content+"</div>";
		cnt += c_b ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:"+mopt.buttonalign+";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'><a id='closedialog' class='fm-button ui-state-default ui-corner-all'>"+c_b+"</a>"+buttstr+"</div>" :
			buttstr !== ""  ? "<div class='ui-widget-content ui-helper-clearfix' style='text-align:"+mopt.buttonalign+";padding-bottom:0.8em;padding-top:0.5em;background-image: none;border-width: 1px 0 0 0;'>"+buttstr+"</div>" : "";
		cnt += "</div>";

		try {
			if($("#info_dialog").attr("aria-hidden") === "false") {
				jgrid.hideModal("#info_dialog",{jqm:jm});
			}
			$("#info_dialog").remove();
		} catch (ignore){}
		jgrid.createModal.call(this,
			{
				themodal:'info_dialog',
				modalhead:'info_head',
				modalcontent:'info_content',
				resizeAlso: 'infocnt'
			},
			cnt,
			mopt,
			'','',true
		);
		// attach onclick after inserting into the dom
		if(buttstr) {
			$.each(mopt.buttons,function(i){
				$("#"+jgrid.jqID(this.id),"#info_id").bind('click',function(){mopt.buttons[i].onClick.call($("#info_dialog")); return false;});
			});
		}
		$("#closedialog", "#info_id").click(function(){
			jgrid.hideModal("#info_dialog",{
				jqm:jm,
				onClose: $("#info_dialog").data("onClose") || mopt.onClose,
				gb: $("#info_dialog").data("gbox") || mopt.gbox
			});
			return false;
		});
		$(".fm-button","#info_dialog").hover(
			function(){$(this).addClass('ui-state-hover');},
			function(){$(this).removeClass('ui-state-hover');}
		);
		if($.isFunction(mopt.beforeOpen) ) { mopt.beforeOpen(); }
		jgrid.viewModal("#info_dialog",{
			onHide: function(h) {
				h.w.hide().remove();
				if(h.o) { h.o.remove(); }
			},
			modal :mopt.modal,
			jqm:jm
		});
		if($.isFunction(mopt.afterOpen) ) { mopt.afterOpen(); }
		try{ $("#info_dialog").focus();} catch (ignore){}
	},
	bindEv: function  (el, opt) {
		var $t = this;
		if($.isFunction(opt.dataInit)) {
			opt.dataInit.call($t,el,opt);
		}
		if(opt.dataEvents) {
			$.each(opt.dataEvents, function() {
				if (this.data !== undefined) {
					$(el).bind(this.type, this.data, this.fn);
				} else {
					$(el).bind(this.type, this.fn);
				}
			});
		}
	},
// Form Functions
	createEl : function(eltype,options,vl,autowidth, ajaxso) {
		var elem = "", $t = this, p = $t.p, infoDialog = jgrid.info_dialog,
		getRes = function (path) { return getGridRes.call($($t), path); },
		errcap = getRes("errors.errcap"), edit = getRes("edit"), editMsg = edit.msg, bClose = edit.bClose;
		function setAttributes(elm, atr, exl ) {
			var exclude = ['dataInit','dataEvents','dataUrl', 'buildSelect','sopt', 'searchhidden', 'defaultValue', 'attr', 'custom_element', 'custom_value', 'selectFilled'];
			if(exl !== undefined && $.isArray(exl)) {
				$.merge(exclude, exl);
			}
			$.each(atr, function(key, value){
				if($.inArray(key, exclude) === -1) {
					$(elm).attr(key,value);
				}
			});
			if(!atr.hasOwnProperty('id')) {
				$(elm).attr('id', jgrid.randId());
			}
		}
		switch (eltype)
		{
			case "textarea" :
				elem = document.createElement("textarea");
				if(autowidth) {
					if(!options.cols) { $(elem).css({width:"98%"});}
				} else if (!options.cols) { options.cols = 20; }
				if(!options.rows) { options.rows = 2; }
				if(vl==='&nbsp;' || vl==='&#160;' || (vl.length===1 && vl.charCodeAt(0)===160)) {vl="";}
				elem.value = vl;
				setAttributes(elem, options);
				$(elem).attr({"role":"textbox","multiline":"true"});
			break;
			case "checkbox" : //what code for simple checkbox
				elem = document.createElement("input");
				elem.type = "checkbox";
				if( !options.value ) {
					var vl1 = String(vl).toLowerCase();
					if(vl1.search(/(false|f|0|no|n|off|undefined)/i)<0 && vl1!=="") {
						elem.checked=true;
						elem.defaultChecked=true;
						elem.value = vl;
					} else {
						elem.value = "on";
					}
					$(elem).attr("offval","off");
				} else {
					var cbval = options.value.split(":");
					if(vl === cbval[0]) {
						elem.checked=true;
						elem.defaultChecked=true;
					}
					elem.value = cbval[0];
					$(elem).attr("offval",cbval[1]);
				}
				setAttributes(elem, options, ['value']);
				$(elem).attr("role","checkbox");
			break;
			case "select" :
				elem = document.createElement("select");
				elem.setAttribute("role","select");
				var msl, ovm = [], cm, iCol;
				for (iCol = 0; iCol < p.colModel.length; iCol++) {
					cm = p.colModel[iCol];
					if (cm.name === options.name) {
						break;
					}
				}
				if(options.multiple===true) {
					msl = true;
					elem.multiple="multiple";
					$(elem).attr("aria-multiselectable","true");
				} else { msl = false; }
				if(options.dataUrl !== undefined) {
					var rowid = null, postData = options.postData || ajaxso.postData;
					try {
						rowid = options.rowId;
					} catch(ignore) {}

					if (p && p.idPrefix) {
						rowid = jgrid.stripPref(p.idPrefix, rowid);
					}
					$.ajax($.extend({
						url: $.isFunction(options.dataUrl) ? options.dataUrl.call($t, rowid, vl, String(options.name)) : options.dataUrl,
						type : "GET",
						dataType: "html",
						data: $.isFunction(postData) ? postData.call($t, rowid, vl, String(options.name)) : postData,
						context: {elem:elem, options:options, vl:vl, cm: cm, iCol: iCol},
						success: function(data){
							var ovm1 = [], elem1 = this.elem, vl2 = this.vl, cm1 = this.cm, iCol1 = this.iCol,
							options1 = $.extend({},this.options),
							msl1 = options1.multiple===true,
							a = $.isFunction(options1.buildSelect) ? options1.buildSelect.call($t,data) : data;
							if(typeof a === 'string') {
								a = $( $.trim( a ) ).html();
							}
							if(a) {
								$(elem1).append(a);
								setAttributes(elem1, options1, postData ? ['postData'] : undefined );
								if(options1.size === undefined) { options1.size =  msl1 ? 3 : 1;}
								if(msl1) {
									ovm1 = vl2.split(",");
									ovm1 = $.map(ovm1,function(n){return $.trim(n);});
								} else {
									ovm1[0] = $.trim(vl2);
								}
								//$(elem).attr(options);
								setTimeout(function(){
									$("option",elem1).each(function(i){
										//if(i===0) { this.selected = ""; }
										// fix IE8/IE7 problem with selecting of the first item on multiple=true
										if (i === 0 && elem1.multiple) { this.selected = false; }
										$(this).attr("role","option");
										if($.inArray($.trim($(this).text()),ovm1) > -1 || $.inArray($.trim($(this).val()),ovm1) > -1 ) {
											this.selected= "selected";
										}
									});
									jgrid.fullBoolFeedback.call($t, options1.selectFilled, "jqGridSelectFilled", {
										elem: elem1,
										options: options1,
										cm: cm1,
										cmName: cm1.name,
										iCol: iCol1
									});
								},0);
							}
						}
					},ajaxso || {}));
				} else if(options.value) {
					var i;
					if(options.size === undefined) {
						options.size = msl ? 3 : 1;
					}
					if(msl) {
						ovm = vl.split(",");
						ovm = $.map(ovm,function(n){return $.trim(n);});
					}
					if(typeof options.value === 'function') { options.value = options.value(); }
					var so,sv, ov, svv, svt,
					sep = options.separator === undefined ? ":" : options.separator,
					delim = options.delimiter === undefined ? ";" : options.delimiter,
                    mapFunc = function(n,ii){if(ii>0) { return n;} };
					if(typeof options.value === 'string') {
						so = options.value.split(delim);
						for(i=0; i<so.length;i++){
							sv = so[i].split(sep);
							if(sv.length > 2 ) {
							    sv[1] = $.map(sv, mapFunc).join(sep);
							}
							ov = document.createElement("option");
							ov.setAttribute("role","option");
							// consider to trim BEFORE filling the options
							ov.value = sv[0]; ov.innerHTML = sv[1];
							elem.appendChild(ov);
							svv = $.trim(sv[0]);
							svt = $.trim(sv[1]);
							if (!msl &&  (svv === $.trim(vl) || svt === $.trim(vl))) { ov.selected ="selected"; }
							if (msl && ($.inArray(svt, ovm)>-1 || $.inArray(svv, ovm)>-1)) {ov.selected ="selected";}
						}
					} else if (typeof options.value === 'object') {
						var oSv = options.value, key;
						for (key in oSv) {
							if (oSv.hasOwnProperty(key ) ){
								ov = document.createElement("option");
								ov.setAttribute("role","option");
								ov.value = key; ov.innerHTML = oSv[key];
								elem.appendChild(ov);
								if (!msl &&  ( $.trim(key) === $.trim(vl) || $.trim(oSv[key]) === $.trim(vl)) ) { ov.selected ="selected"; }
								if (msl && ($.inArray($.trim(oSv[key]),ovm)>-1 || $.inArray($.trim(key),ovm)>-1)) { ov.selected ="selected"; }
							}
						}
					}
					setAttributes(elem, options, ['value']);
					jgrid.fullBoolFeedback.call($t, options.selectFilled, "jqGridSelectFilled", {
						elem: elem,
						options: options,
						cm: cm,
						cmName: cm.name,
						iCol: iCol
					});
				}
			break;
			case "text" :
			case "password" :
			case "button" :
				var role;
				if(eltype==="button") { role = "button"; }
				else { role = "textbox"; }
				elem = document.createElement("input");
				elem.type = eltype;
				elem.value = vl;
				setAttributes(elem, options);
				if(eltype !== "button"){
					if(autowidth) {
						if(!options.size) { $(elem).css({width:"98%"}); }
					} else if (!options.size) { options.size = 20; }
				}
				$(elem).attr("role",role);
			break;
			case "image" :
			case "file" :
				elem = document.createElement("input");
				elem.type = eltype;
				setAttributes(elem, options);
				break;
			case "custom" :
				elem = document.createElement("span");
				try {
					if($.isFunction(options.custom_element)) {
						var celm = options.custom_element.call($t,vl,options);
						if (celm instanceof jQuery || celm instanceof HTMLElement || typeof celm === "string") {
							celm = $(celm).addClass("customelement").attr({id:options.id,name:options.name});
							$(elem).empty().append(celm);
						} else {
							throw "editoptions.custom_element returns value of a wrong type";
						}
					} else {
						throw "editoptions.custom_element is not a function";
					}
				} catch (e) {
					if (e==="e1") { infoDialog.call($t,errcap,"function 'custom_element' "+editMsg.nodefined, bClose);}
					if (e==="e2") { infoDialog.call($t,errcap,"function 'custom_element' "+editMsg.novalue,bClose);}
					else { infoDialog.call($t,errcap,typeof e==="string"?e:e.message,bClose); }
				}
			break;
		}
		return elem;
	},
// Date Validation Javascript
	checkDate : function (format, date) {
		var daysInFebruary = function(year){
		// February has 29 days in any year evenly divisible by four,
		// EXCEPT for centurial years which are not also divisible by 400.
			return (((year % 4 === 0) && ( year % 100 !== 0 || (year % 400 === 0))) ? 29 : 28 );
		},
		tsp = {}, sep;
		format = format.toLowerCase();
		//we search for /,-,. for the date separator
		if(format.indexOf("/") !== -1) {
			sep = "/";
		} else if(format.indexOf("-") !== -1) {
			sep = "-";
		} else if(format.indexOf(".") !== -1) {
			sep = ".";
		} else {
			sep = "/";
		}
		format = format.split(sep);
		date = date.split(sep);
		if (date.length !== 3) { return false; }
		var j=-1,yln, dln=-1, mln=-1, i, dv;
		for(i=0;i<format.length;i++){
			dv = isNaN(date[i]) ? 0 : parseInt(date[i],10);
			tsp[format[i]] = dv;
			yln = format[i];
			if(yln.indexOf("y") !== -1) { j=i; }
			if(yln.indexOf("m") !== -1) { mln=i; }
			if(yln.indexOf("d") !== -1) { dln=i; }
		}
		if (format[j] === "y" || format[j] === "yyyy") {
			yln=4;
		} else if(format[j] ==="yy"){
			yln = 2;
		} else {
			yln = -1;
		}
		var daysInMonth = [0,31,29,31,30,31,30,31,31,30,31,30,31],
		strDate;
		if (j === -1) {
			return false;
		}
			strDate = tsp[format[j]].toString();
			if(yln === 2 && strDate.length === 1) {yln = 1;}
			if (strDate.length !== yln || (tsp[format[j]]===0 && date[j]!=="00")){
				return false;
			}
		if(mln === -1) {
			return false;
		}
			strDate = tsp[format[mln]].toString();
			if (strDate.length<1 || tsp[format[mln]]<1 || tsp[format[mln]]>12){
				return false;
			}
		if(dln === -1) {
			return false;
		}
			strDate = tsp[format[dln]].toString();
			if (strDate.length<1 || tsp[format[dln]]<1 || tsp[format[dln]]>31 || (tsp[format[mln]]===2 && tsp[format[dln]]>daysInFebruary(tsp[format[j]])) || tsp[format[dln]] > daysInMonth[tsp[format[mln]]]){
				return false;
			}
		return true;
	},
	isEmpty : function(val) {
		if (val.match(/^\s+$/) || val === "")	{
			return true;
		}
		return false;
	},
	checkTime : function(time){
	// checks only hh:ss (and optional am/pm)
		var re = /^(\d{1,2}):(\d{2})([apAP][Mm])?$/,regs;
		if(!jgrid.isEmpty(time))
		{
			regs = time.match(re);
			if(regs) {
				if(regs[3]) {
					if(regs[1] < 1 || regs[1] > 12) { return false; }
				} else {
					if(regs[1] > 23) { return false; }
				}
				if(regs[2] > 59) {
					return false;
				}
			} else {
				return false;
			}
		}
		return true;
	},
	checkValues : function(val, valref, customobject, nam) {
		var edtrul,i, nm, dft, len, g = this, p = g.p, cm = p.colModel, isEmpty = jgrid.isEmpty,
		editMsg = getGridRes.call($(g), "edit.msg"), dateMasks = getGridRes.call($(g), "formatter.date.masks");
		if(customobject === undefined) {
			if(typeof valref==='string'){
				for( i =0, len=cm.length;i<len; i++){
					if(cm[i].name===valref) {
						edtrul = cm[i].editrules;
						valref = i;
						if(cm[i].formoptions != null) { nm = cm[i].formoptions.label; }
						break;
					}
				}
			} else if(valref >=0) {
				edtrul = cm[valref].editrules;
			}
		} else {
			edtrul = customobject;
			nm = nam===undefined ? "_" : nam;
		}
		if(edtrul) {
			if(!nm) { nm = p.colNames != null ? p.colNames[valref] : cm[valref].label; }
			if(edtrul.required === true) {
				if( isEmpty(val) )  { return [false,nm+": "+editMsg.required,""]; }
			}
			// force required
			var rqfield = edtrul.required === false ? false : true;
			if(edtrul.number === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if(isNaN(val)) { return [false,nm+": "+editMsg.number,""]; }
				}
			}
			if(edtrul.minValue !== undefined && !isNaN(edtrul.minValue)) {
				if (parseFloat(val) < parseFloat(edtrul.minValue) ) { return [false,nm+": "+editMsg.minValue+" "+edtrul.minValue,""];}
			}
			if(edtrul.maxValue !== undefined && !isNaN(edtrul.maxValue)) {
				if (parseFloat(val) > parseFloat(edtrul.maxValue) ) { return [false,nm+": "+editMsg.maxValue+" "+edtrul.maxValue,""];}
			}
			var filter;
			if(edtrul.email === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
				// taken from $ Validate plugin
					filter = /^((([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+(\.([a-z]|\d|[!#\$%&'\*\+\-\/=\?\^_`{\|}~]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])+)*)|((\x22)((((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(([\x01-\x08\x0b\x0c\x0e-\x1f\x7f]|\x21|[\x23-\x5b]|[\x5d-\x7e]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(\\([\x01-\x09\x0b\x0c\x0d-\x7f]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF]))))*(((\x20|\x09)*(\x0d\x0a))?(\x20|\x09)+)?(\x22)))@((([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|\d|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.)+(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])|(([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])([a-z]|\d|-|\.|_|~|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])*([a-z]|[\u00A0-\uD7FF\uF900-\uFDCF\uFDF0-\uFFEF])))\.?$/i;
					if(!filter.test(val)) {return [false,nm+": "+editMsg.email,""];}
				}
			}
			if(edtrul.integer === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if(isNaN(val)) { return [false,nm+": "+editMsg.integer,""]; }
					if ((val % 1 !== 0) || (val.indexOf('.') !== -1)) { return [false,nm+": "+editMsg.integer,""];}
				}
			}
			if(edtrul.date === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if(cm[valref].formatoptions && cm[valref].formatoptions.newformat) {
						dft = cm[valref].formatoptions.newformat;
						if( dateMasks.hasOwnProperty(dft) ) {
							dft = dateMasks[dft];
						}
					} else {
						dft = cm[valref].datefmt || "Y-m-d";
					}
					if(!jgrid.checkDate (dft, val)) { return [false,nm+": "+editMsg.date+" - "+dft,""]; }
				}
			}
			if(edtrul.time === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if(!jgrid.checkTime (val)) { return [false,nm+": "+editMsg.date+" - hh:mm (am/pm)",""]; }
				}
			}
			if(edtrul.url === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					filter = /^(((https?)|(ftp)):\/\/([\-\w]+\.)+\w{2,3}(\/[%\-\w]+(\.\w{2,})?)*(([\w\-\.\?\\\/+@&#;`~=%!]*)(\.\w{2,})?)*\/?)/i;
					if(!filter.test(val)) {return [false,nm+": "+editMsg.url,""];}
				}
			}
			if(edtrul.custom === true) {
				if( !(rqfield === false && isEmpty(val)) ) {
					if($.isFunction(edtrul.custom_func)) {
						var ret = edtrul.custom_func.call(g,val,nm,valref);
						return $.isArray(ret) ? ret : [false,editMsg.customarray,""];
					}
					return [false,editMsg.customfcheck,""];
				}
			}
		}
		return [true,"",""];
	}
});
}(jQuery));
/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/**
 * jqGrid extension for custom methods
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * 
 * Wildraid wildraid@mail.ru
 * Oleg Kiriljuk oleg.kiriljuk@ok-soft-gmbh.com
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
"use strict";
var jgrid = $.jgrid, getGridRes = jgrid.getMethod("getGridRes");
jgrid.extend({
	getColProp : function(colname){
		var ret ={}, $t = this[0];
		if ( !$t.grid ) { return false; }
		var cM = $t.p.colModel, i;
		for ( i=0;i<cM.length;i++ ) {
			if ( cM[i].name === colname ) {
				ret = cM[i];
				break;
			}
		}
		return ret;
	},
	setColProp : function(colname, obj){
		//do not set width will not work
		return this.each(function(){
			var self = this, p = self.p; 
			if (self.grid && p != null && obj) {
				var cM = p.colModel, i;
				for ( i=0;i<cM.length;i++ ) {
					if ( cM[i].name === colname ) {
						$.extend(true, cM[i],obj);
						break;
					}
				}
			}
		});
	},
	sortGrid : function(colname, reload, sor){
		return this.each(function(){
			var self = this, grid = self.grid, p = self.p, colModel = p.colModel, l = colModel.length, cm, i, sobj = false, sort;
			if (!grid) { return; }
			if (!colname) { colname = p.sortname; }
			if (typeof reload !=='boolean') { reload = false; }
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
					if (typeof sort !== 'boolean' || sort) {
						self.sortData("jqgh_"+p.id+"_" + colname, i, reload, sor, sobj);
					}
					break;
				}
			}
		});
	},
	clearBeforeUnload : function () {
		return this.each(function(){
			var self = this, p = self.p, grid = self.grid, propOrMethod, clearArray = jgrid.clearArray;
			if ($.isFunction(grid.emptyRows)) {
				grid.emptyRows.call(self, true, true); // this work quick enough and reduce the size of memory leaks if we have someone
			}

			$(document).unbind("mouseup.jqGrid" + p.id ); 
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

			var propOrMethods = ['formatCol','sortData','updatepager','refreshIndex','setHeadCheckBox','constructTr','formatter','addXmlData','addJSONData','nav','grid','p'];
			l = propOrMethods.length;
			for(i = 0; i < l; i++) {
				if(self.hasOwnProperty(propOrMethods[i])) {
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
	GridDestroy : function () {
		return this.each(function(){
			var self = this, p = self.p, pager = p.pager;
			if ( self.grid ) { 
				if (pager) { // if not part of grid
					$(pager).remove();
				}
				try {
					$(self).jqGrid('clearBeforeUnload');
					$(p.gBox).remove();
					$("#alertmod_"+p.idSel).remove();
				} catch (ignore) {}
			}
		});
	},
	GridUnload : function(){
		return this.each(function(){
			var self = this, p = self.p;
			if ( !self.grid ) {return;}
			var defgrid = {id: $(self).attr('id'),cl: $(self).attr('class')};
			if (p.pager) {
				$(p.pager).empty().removeClass("ui-state-default ui-jqgrid-pager ui-corner-bottom");
			}
			var newtable = document.createElement('table');
			$(newtable).attr({id:defgrid.id});
			newtable.className = defgrid.cl;
			$(newtable).removeClass("ui-jqgrid-btable");
			if( $(p.pager).parents(p.gBox).length === 1 ) {
				$(newtable).insertBefore(p.gBox).show();
				$(p.pager).insertBefore(p.gBox);
			} else {
				$(newtable).insertBefore(p.gBox).show();
			}
			$(self).jqGrid('clearBeforeUnload');
			$(p.gBox).remove();
		});
	},
	setGridState : function(state) {
		return this.each(function(){
			var $t = this, p = $t.p, grid = $t.grid, cDiv = grid.cDiv, $uDiv = $(grid.uDiv), $ubDiv = $(grid.ubDiv);
			if (!grid) {return;}
			if(state === 'hidden'){
				$(".ui-jqgrid-bdiv, .ui-jqgrid-hdiv",p.gView).slideUp("fast");
				if(p.pager) {$(p.pager).slideUp("fast");}
				if(p.toppager) {$(p.toppager).slideUp("fast");}
				if(p.toolbar[0]===true) {
					if( p.toolbar[1] === 'both') {
						$ubDiv.slideUp("fast");
					}
					$uDiv.slideUp("fast");
				}
				if(p.footerrow) { $(".ui-jqgrid-sdiv",p.gBox).slideUp("fast"); }
				$(".ui-jqgrid-titlebar-close span",cDiv).removeClass("ui-icon-circle-triangle-n").addClass("ui-icon-circle-triangle-s");
				p.gridstate = 'hidden';
			} else if(state === 'visible') {
				$(".ui-jqgrid-hdiv, .ui-jqgrid-bdiv",p.gView).slideDown("fast");
				if(p.pager) {$(p.pager).slideDown("fast");}
				if(p.toppager) {$(p.toppager).slideDown("fast");}
				if(p.toolbar[0]===true) {
					if( p.toolbar[1] === 'both') {
						$ubDiv.slideDown("fast");
					}
					$uDiv.slideDown("fast");
				}
				if(p.footerrow) { $(".ui-jqgrid-sdiv",p.gBox).slideDown("fast"); }
				$(".ui-jqgrid-titlebar-close span",cDiv).removeClass("ui-icon-circle-triangle-s").addClass("ui-icon-circle-triangle-n");
				p.gridstate = 'visible';
			}

		});
	},
	filterToolbar : function(oMuligrid){
		// if one uses jQuery wrapper with multiple grids, then oMultiple specify the object with common options
		return this.each(function(){
			var $t = this, grid = $t.grid, $self = $($t), p = $t.p, bindEv = jgrid.bindEv, infoDialog = jgrid.info_dialog;
			if(this.ftoolbar) { return; }
			// make new copy of the options and use it for ONE specific grid.
			// p.searching can contains grid specific options
			// we will don't modify the input options oMuligrid
			var o = $.extend(true, {
				autosearch: true,
				autosearchDelay: 500,
				searchOnEnter : true,
				beforeSearch: null,
				afterSearch: null,
				beforeClear: null,
				afterClear: null,
				searchurl : '',
				stringResult: false,
				groupOp: 'AND',
				defaultSearch : "bw",
				searchOperators : false,
				resetIcon : "x",
				operands : { "eq" :"==", "ne":"!","lt":"<","le":"<=","gt":">","ge":">=","bw":"^","bn":"!^","in":"=","ni":"!=","ew":"|","en":"!@","cn":"~","nc":"!~","nu":"#","nn":"!#"}
			}, jgrid.search, p.searching || {}, oMuligrid || {});
			var colModel = p.colModel,
				getRes = function (path) {
					return getGridRes.call($self, path);
				},
				errcap = getRes("errors.errcap"), bClose = getRes("edit.bClose"), editMsg = getRes("edit.msg"),
				jqID = jgrid.jqID;
			var triggerToolbar = function() {
				var sdata={}, j=0, v, nm, sopt={},so;
				$.each(colModel,function(){
					var cm = this, $elem = $("#gs_"+jqID(cm.name), (cm.frozen===true && p.frozenColumns === true) ?  grid.fhDiv : grid.hDiv);
					nm = cm.index || cm.name;
					if(o.searchOperators ) {
						so = $elem.parent().prev().children("a").data("soper") || o.defaultSearch;
					} else {
						so  = (cm.searchoptions && cm.searchoptions.sopt) ? cm.searchoptions.sopt[0] : cm.stype==='select'?  'eq' : o.defaultSearch;
					}
					v = cm.stype === "custom" && $.isFunction(cm.searchoptions.custom_value) && $elem.length > 0 && $elem[0].nodeName.toUpperCase() === "SPAN" ?
						cm.searchoptions.custom_value.call($t, $elem.children(".customelement").filter(":first"), "get") :
						$elem.val();
					if(v || so==="nu" || so==="nn") {
						sdata[nm] = v;
						sopt[nm] = so;
						j++;
					} else {
						try {
							delete p.postData[nm];
						} catch (ignore) {}
					}
				});
				var sd =  j>0 ? true : false;
				if(o.stringResult === true || p.datatype === "local" || o.searchOperators === true) {
					var ruleGroup = "{\"groupOp\":\"" + o.groupOp + "\",\"rules\":[";
					var gi=0;
					$.each(sdata,function(i,n){
						if (gi > 0) {ruleGroup += ",";}
						ruleGroup += "{\"field\":\"" + i + "\",";
						ruleGroup += "\"op\":\"" + sopt[i] + "\",";
						n+="";
						ruleGroup += "\"data\":\"" + n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"}";
						gi++;
					});
					ruleGroup += "]}";
					$.extend(p.postData,{filters:ruleGroup});
					$.each(['searchField', 'searchString', 'searchOper'], function(i, n){
						if(p.postData.hasOwnProperty(n)) { delete p.postData[n];}
					});
				} else {
					$.extend(p.postData,sdata);
				}
				var saveurl;
				if(p.searchurl) {
					saveurl = p.url;
					$self.jqGrid("setGridParam",{url:p.searchurl});
				}
				var bsr = $self.triggerHandler("jqGridToolbarBeforeSearch") === 'stop' ? true : false;
				if(!bsr && $.isFunction(o.beforeSearch)){bsr = o.beforeSearch.call($t);}
				if(!bsr) { $self.jqGrid("setGridParam",{search:sd}).trigger("reloadGrid",[{page:1}]); }
				if(saveurl) {$self.jqGrid("setGridParam",{url:saveurl});}
				$self.triggerHandler("jqGridToolbarAfterSearch");
				if($.isFunction(o.afterSearch)){o.afterSearch.call($t);}
			},
			clearToolbar = function(trigger){
				var sdata={}, j=0, nm;
				trigger = (typeof trigger !== 'boolean') ? true : trigger;
				$.each(colModel,function(){
					var v, cm = this, $elem = $("#gs_"+jqID(cm.name),(cm.frozen===true && p.frozenColumns === true) ? grid.fhDiv : grid.hDiv),
						isSindleSelect;
					if(cm.searchoptions && cm.searchoptions.defaultValue !== undefined) { v = cm.searchoptions.defaultValue; }
					nm = cm.index || cm.name;
					switch (cm.stype) {
						case 'select' :
							isSindleSelect = $elem.length > 0 ? !$elem[0].multiple : true;
							$elem.find("option").each(function (i){
								this.selected = i === 0 && isSindleSelect;
								if ($(this).val() === v) {
									this.selected = true;
									return false;
								}
							});
							if ( v !== undefined ) {
								// post the key and not the text
								sdata[nm] = v;
								j++;
							} else {
								try {
									delete p.postData[nm];
								} catch(ignore) {}
							}
							break;
						case 'text':
							$elem.val(v || "");
							if(v !== undefined) {
								sdata[nm] = v;
								j++;
							} else {
								try {
									delete p.postData[nm];
								} catch (ignore){}
							}
							break;
						case 'custom':
							if ($.isFunction(cm.searchoptions.custom_value) && $elem.length > 0 && $elem[0].nodeName.toUpperCase() === "SPAN") {
								cm.searchoptions.custom_value.call($t, $elem.children(".customelement").filter(":first"), "set", v || "");
							}
							break;
					}
				});
				var sd =  j>0 ? true : false;
				p.resetsearch =  true;
				if(o.stringResult === true || p.datatype === "local") {
					var ruleGroup = "{\"groupOp\":\"" + o.groupOp + "\",\"rules\":[";
					var gi=0;
					$.each(sdata,function(i,n){
						if (gi > 0) {ruleGroup += ",";}
						ruleGroup += "{\"field\":\"" + i + "\",";
						ruleGroup += "\"op\":\"" + "eq" + "\",";
						n+="";
						ruleGroup += "\"data\":\"" + n.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"}";
						gi++;
					});
					ruleGroup += "]}";
					$.extend(p.postData,{filters:ruleGroup});
					$.each(['searchField', 'searchString', 'searchOper'], function(i, n){
						if(p.postData.hasOwnProperty(n)) { delete p.postData[n];}
					});
				} else {
					$.extend(p.postData,sdata);
				}
				var saveurl;
				if(p.searchurl) {
					saveurl = p.url;
					$self.jqGrid("setGridParam",{url:p.searchurl});
				}
				var bcv = $self.triggerHandler("jqGridToolbarBeforeClear") === 'stop' ? true : false;
				if(!bcv && $.isFunction(o.beforeClear)){bcv = o.beforeClear.call($t);}
				if(!bcv) {
					if(trigger) {
						$self.jqGrid("setGridParam",{search:sd}).trigger("reloadGrid",[{page:1}]);
					}
				}
				if(saveurl) {$self.jqGrid("setGridParam",{url:saveurl});}
				$self.triggerHandler("jqGridToolbarAfterClear");
				if($.isFunction(o.afterClear)){o.afterClear();}
			},
			toggleToolbar = function(){
				var trow = $("tr.ui-search-toolbar",grid.hDiv),
				trow2 = p.frozenColumns === true ?  $("tr.ui-search-toolbar",grid.fhDiv) : false;
				if(trow.css("display") === 'none') {
					trow.show(); 
					if(trow2) {
						trow2.show();
					}
				} else { 
					trow.hide(); 
					if(trow2) {
						trow2.hide();
					}
				}
			},
			odata = getRes("search.odata") || [],
			customSortOperations = p.customSortOperations,
			buildRuleMenu = function( elem, left, top ){
				$("#sopt_menu").remove();

				left=parseInt(left,10);
				top=parseInt(top,10) + 18;

				var fs =  $('.ui-jqgrid-view').css('font-size') || '11px';
				var str = '<ul id="sopt_menu" class="ui-search-menu" role="menu" tabindex="0" style="font-size:'+fs+';left:'+left+'px;top:'+top+'px;">',
				selected = $(elem).data("soper"), selclass,
				aoprs = [], ina;
				var i=0, nm =$(elem).data("colname"),len = colModel.length;
				while(i<len) {
					if(colModel[i].name === nm) {
						break;
					}
					i++;
				}
				var cm = colModel[i], options = $.extend({}, cm.searchoptions), odataItem, item, itemOper, itemOperand, itemText;
				if(!options.sopt) {
					options.sopt = [];
					options.sopt[0]= cm.stype==='select' ?  'eq' : o.defaultSearch;
				}
				$.each(odata, function() { aoprs.push(this.oper); });
				// append aoprs array with custom operations defined in customSortOperations parameter jqGrid
				if (customSortOperations != null) {
					$.each(customSortOperations, function(propertyName) { aoprs.push(propertyName); });
				}
				for ( i = 0 ; i < options.sopt.length; i++) {
					itemOper = options.sopt[i];
					ina = $.inArray(itemOper,aoprs);
					if(ina !== -1) {
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
						selclass = selected === itemOper ? "ui-state-highlight" : "";
						str += '<li class="ui-menu-item '+selclass+'" role="presentation"><a class="ui-corner-all g-menu-item" tabindex="0" role="menuitem" value="'+itemOper+'" data-oper="'+itemOperand+'"><table'+(jgrid.msie && jgrid.msiever() < 8 ? ' cellspacing="0"' : '')+'><tr><td style="width:25px">'+itemOperand+'</td><td>'+ itemText+'</td></tr></table></a></li>';
					}
				}
				str += "</ul>";
				$('body').append(str);
				$("#sopt_menu").addClass("ui-menu ui-widget ui-widget-content ui-corner-all");
				$("#sopt_menu > li > a").hover(
					function(){ $(this).addClass("ui-state-hover"); },
					function(){ $(this).removeClass("ui-state-hover"); }
				).click(function(){
					var v = $(this).attr("value"),
					oper = $(this).data("oper");
					$self.triggerHandler("jqGridToolbarSelectOper", [v, oper, elem]);
					$("#sopt_menu").hide();
					$(elem).text(oper).data("soper",v);
					if(o.autosearch===true){
						var inpelm = $(elem).parent().next().children()[0];
						if( $(inpelm).val() || v==="nu" || v ==="nn") {
							triggerToolbar();
						}
					}
				});
			};
			// create the row
			var tr = $("<tr class='ui-search-toolbar' role='row'></tr>");
			var timeoutHnd;
			$.each(colModel,function(ci){
				var cm=this, soptions, surl, self, select = "", sot, so, i, searchoptions = cm.searchoptions, editoptions = cm.editoptions,
				th = $("<th role='columnheader' class='ui-state-default ui-th-column ui-th-"+p.direction+"'></th>"),
				thd = $("<div style='position:relative;height:auto;padding-right:0.3em;padding-left:0.3em;'></div>"),
				stbl = $("<table class='ui-search-table'"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+"><tr><td class='ui-search-oper'></td><td class='ui-search-input'></td><td class='ui-search-clear'></td></tr></table>");
				if(this.hidden===true) { $(th).css("display","none");}
				this.search = this.search === false ? false : true;
				if(this.stype === undefined) {this.stype='text';}
				soptions = $.extend({},this.searchoptions || {});
				if(this.search){
					if(o.searchOperators) {
						so = (soptions.sopt) ? soptions.sopt[0] : cm.stype==='select' ?  'eq' : o.defaultSearch;
						for(i = 0;i<odata.length;i++) {
							if(odata[i].oper === so) {
								sot = o.operands[so] || "";
								break;
							}
						}
						if (sot === undefined && customSortOperations != null) {
							var customOp;
							for (customOp in customSortOperations) {
								if (customSortOperations.hasOwnProperty(customOp)) {
									sot = customSortOperations[customOp].operand;
									//soptions.searchtitle = customSortOperations[customOp].title;
								}
							}
						}
						if (sot === undefined) { sot = "="; }
						var st = soptions.searchtitle != null ? soptions.searchtitle : getRes("search.operandTitle");
						select = "<a title='"+st+"' style='padding-right: 0.5em;' data-soper='"+so+"' class='soptclass' data-colname='"+this.name+"'>"+sot+"</a>";
					}
					$("td",stbl).filter(":first").data("colindex",ci).append(select);
					if (soptions.sopt == null || soptions.sopt.length === 1) {
						$("td.ui-search-oper",stbl).hide();
					}
					if(soptions.clearSearch === undefined) {
						soptions.clearSearch = this.stype === "text" ? true : false;
					}
					if(soptions.clearSearch) {
						var csv = getRes("search.resetTitle") || 'Clear Search Value';
						$("td",stbl).eq(2).append("<a title='"+csv+"' style='padding-right: 0.3em;padding-left: 0.3em;' class='clearsearchclass'>"+o.resetIcon+"</a>");
					} else {
						$("td",stbl).eq(2).hide();
					}
					switch (this.stype)
					{
					case "select":
						surl = this.surl || soptions.dataUrl;
						if(surl) {
							// data returned should have already constructed html select
							// primitive jQuery load
							self = thd;
							$(self).append(stbl);
							$.ajax($.extend({
								url: surl,
								dataType: "html",
								success: function (data) {
									if(soptions.buildSelect !== undefined) {
										var d = soptions.buildSelect(data);
										if (d) {
											$("td",stbl).eq(1).append(d);
										}
									} else {
										$("td",stbl).eq(1).append(data);
									}
									var $select = stbl.find("td.ui-search-input>select"); // stbl.find(">tbody>tr>td.ui-search-input>select")
									if(soptions.defaultValue !== undefined) { $select.val(soptions.defaultValue); }
									$select.attr({name:cm.index || cm.name, id: "gs_"+cm.name});
									if(soptions.attr) {$select.attr(soptions.attr);}
									$select.css({width: "100%"});
									// preserve autoserch
									bindEv.call($t, $select[0], soptions);
									jgrid.fullBoolFeedback.call($t, soptions.selectFilled, "jqGridSelectFilled", {
										elem: $select[0],
										options: soptions,
										cm: cm,
										cmName: cm.name,
										iCol: ci
									});
									if(o.autosearch===true){
										$select.change(function(){
											triggerToolbar();
											return false;
										});
									}
								}
							}, jgrid.ajaxOptions, p.ajaxSelectOptions || {} ));
						} else {
							var oSv, sep, delim;
							if(searchoptions) {
								oSv = searchoptions.value === undefined ? "" : searchoptions.value;
								sep = searchoptions.separator === undefined ? ":" : searchoptions.separator;
								delim = searchoptions.delimiter === undefined ? ";" : searchoptions.delimiter;
							} else if(editoptions) {
								oSv = editoptions.value === undefined ? "" : editoptions.value;
								sep = editoptions.separator === undefined ? ":" : editoptions.separator;
								delim = editoptions.delimiter === undefined ? ";" : editoptions.delimiter;
							}
							if (oSv) {	
								var elem = document.createElement("select");
								elem.style.width = "100%";
								$(elem).attr({name:cm.index || cm.name, id: "gs_"+cm.name});
								var sv, ov, key, k;
								if(typeof oSv === "string") {
									so = oSv.split(delim);
									for(k=0; k<so.length;k++){
										sv = so[k].split(sep);
										ov = document.createElement("option");
										ov.value = sv[0]; ov.innerHTML = sv[1];
										elem.appendChild(ov);
									}
								} else if(typeof oSv === "object" ) {
									for (key in oSv) {
										if(oSv.hasOwnProperty(key)) {
											ov = document.createElement("option");
											ov.value = key; ov.innerHTML = oSv[key];
											elem.appendChild(ov);
										}
									}
								}
								if(soptions.defaultValue !== undefined) { $(elem).val(soptions.defaultValue); }
								if(soptions.attr) {$(elem).attr(soptions.attr);}
								$(thd).append(stbl);
								bindEv.call($t, elem , soptions);
								$("td",stbl).eq(1).append( elem );
								jgrid.fullBoolFeedback.call($t, searchoptions.selectFilled, "jqGridSelectFilled", {
									elem: elem,
									options: searchoptions,
									cm: cm,
									cmName: cm.name,
									iCol: ci
								});
								if(o.autosearch===true){
									$(elem).change(function(){
										triggerToolbar();
										return false;
									});
								}
							}
						}
						break;
					case "text":
						var df = soptions.defaultValue !== undefined ? soptions.defaultValue: "";

						$("td",stbl).eq(1).append("<input type='text' style='width:100%;padding:0;' name='"+(cm.index || cm.name)+"' id='gs_"+cm.name+"' value='"+df+"'/>");
						$(thd).append(stbl);

						if(soptions.attr) {$("input",thd).attr(soptions.attr);}
						bindEv.call($t, $("input",thd)[0], soptions);
						if(o.autosearch===true){
							if(o.searchOnEnter) {
								$("input",thd).keypress(function(e){
									var key1 = e.charCode || e.keyCode || 0;
									if(key1 === 13){
										triggerToolbar();
										return false;
									}
									return this;
								});
							} else {
								$("input",thd).keydown(function(e){
									var key1 = e.which;
									switch (key1) {
										case 13:
											return false;
										case 9 :
										case 16:
										case 37:
										case 38:
										case 39:
										case 40:
										case 27:
											break;
										default :
											if(timeoutHnd) { clearTimeout(timeoutHnd); }
											timeoutHnd = setTimeout(function(){triggerToolbar();}, o.autosearchDelay);
									}
								});
							}
						}
						break;
					case "custom":
						$("td",stbl).eq(1).append("<span style='width:95%;padding:0;' name='"+(cm.index || cm.name)+"' id='gs_"+cm.name+"'/>");
						$(thd).append(stbl);
						try {
							if($.isFunction(soptions.custom_element)) {
								var celm = soptions.custom_element.call($t,soptions.defaultValue !== undefined ? soptions.defaultValue: "",soptions);
								if(celm) {
									celm = $(celm).addClass("customelement");
									$(thd).find("span[name='" + (cm.index || cm.name) + "']").append(celm);
								} else {
									throw "e2";
								}
							} else {
								throw "e1";
							}
						} catch (e) {
							if (e === "e1") { infoDialog.call($t,errcap,"function 'custom_element' "+editMsg.nodefined,bClose);}
							if (e === "e2") { infoDialog.call($t,errcap,"function 'custom_element' "+editMsg.novalue,bClose);}
							else { infoDialog.call($t,errcap,typeof e==="string"?e:e.message,bClose); }
						}
						break;
					}
				}
				$(th).append(thd);
				$(tr).append(th);
				if(!o.searchOperators) {
					$("td",stbl).eq(0).hide();
				}
			});
			$("table thead",grid.hDiv).append(tr);
			if(o.searchOperators) {
				$(".soptclass",tr).click(function(e){
					var offset = $(this).offset(),
					left = ( offset.left ),
					top = ( offset.top);
					buildRuleMenu(this, left, top );
					e.stopPropagation();
				});
				$("body").on('click', function(e){
					if(e.target.className !== "soptclass") {
						$("#sopt_menu").hide();
					}
				});
			}
			$(".clearsearchclass",tr).click(function(){
				var ptr = $(this).parents("tr").filter(":first"),
				coli = parseInt($("td.ui-search-oper", ptr).data('colindex'),10),
				sval  = $.extend({},colModel[coli].searchoptions || {}),
				dval = sval.defaultValue || "";
				if(colModel[coli].stype === "select") {
					if(dval) {
						$("td.ui-search-input select", ptr).val( dval );
					} else {
						$("td.ui-search-input select", ptr)[0].selectedIndex = 0;
					}
				} else {
					$("td.ui-search-input input", ptr).val( dval );
				}
				// ToDo custom search type
				if(o.autosearch===true){
					triggerToolbar();
				}

			});
			$t.ftoolbar = true;
			$t.triggerToolbar = triggerToolbar;
			$t.clearToolbar = clearToolbar;
			$t.toggleToolbar = toggleToolbar;
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
		});
	},
	destroyGroupHeader : function(nullHeader) {
		if(nullHeader === undefined) {
			nullHeader = true;
		}
		return this.each(function()
		{
			var $t = this, i, l, $th, $resizing, grid = $t.grid,
			thead = $("table.ui-jqgrid-htable thead", grid.hDiv), cm = $t.p.colModel, hc;
			if(!grid) { return; }

			$($t).unbind('.setGroupHeaders');
			var $tr = $("<tr>", {role: "row"}).addClass("ui-jqgrid-labels");
			var headers = grid.headers;
			for (i = 0, l = headers.length; i < l; i++) {
				hc = cm[i].hidden ? "none" : "";
				$th = $(headers[i].el)
					.width(headers[i].width)
					.css('display',hc);
				try {
					$th.removeAttr("rowSpan");
				} catch (rs) {
					//IE 6/7
					$th.attr("rowSpan",1);
				}
				$tr.append($th);
				$resizing = $th.children("span.ui-jqgrid-resize");
				if ($resizing.length>0) {// resizable column
					$resizing[0].style.height = "";
				}
				$th.children("div")[0].style.top = "";
			}
			$(thead).children('tr.ui-jqgrid-labels').remove();
			$(thead).prepend($tr);

			if(nullHeader === true) {
				$($t).jqGrid('setGridParam',{ 'groupHeader': null});
			}
		});
	},
	setGroupHeaders : function ( o ) {
		o = $.extend({
			useColSpanStyle :  false,
			groupHeaders: []
		},o  || {});
		return this.each(function(){
			this.p.groupHeader = o;
			var ts = this,
			i, cmi, skip = 0, $tr, $colHeader, th, $th, thStyle,
			iCol,
			cghi,
			//startColumnName,
			numberOfColumns,
			titleText,
			cVisibleColumns,
			colModel = ts.p.colModel,
			cml = colModel.length,
			ths = ts.grid.headers,
			$htable = $("table.ui-jqgrid-htable", ts.grid.hDiv),
			$trLabels = $htable.children("thead").children("tr.ui-jqgrid-labels:last").addClass("jqg-second-row-header"),
			$thead = $htable.children("thead"),
			$theadInTable,
			$firstHeaderRow = $htable.find(".jqg-first-row-header");
			if($firstHeaderRow[0] === undefined) {
				$firstHeaderRow = $('<tr>', {role: "row", "aria-hidden": "true"}).addClass("jqg-first-row-header").css("height", "auto");
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
			$tr = $('<tr>', {role: "row"}).addClass("ui-jqgrid-labels jqg-third-row-header");
			for (i = 0; i < cml; i++) {
				th = ths[i].el;
				$th = $(th);
				cmi = colModel[i];
				// build the next cell for the first header row
				thStyle = { height: '0', width: ths[i].width + 'px', display: (cmi.hidden ? 'none' : '')};
				$("<th>", {role: 'gridcell'}).css(thStyle).addClass("ui-first-th-"+ts.p.direction).appendTo($firstHeaderRow);

				th.style.width = ""; // remove unneeded style
				iCol = inColumnHeader(cmi.name, o.groupHeaders);
				if (iCol >= 0) {
					cghi = o.groupHeaders[iCol];
					numberOfColumns = cghi.numberOfColumns;
					titleText = cghi.titleText;

					// caclulate the number of visible columns from the next numberOfColumns columns
					for (cVisibleColumns = 0, iCol = 0; iCol < numberOfColumns && (i + iCol < cml); iCol++) {
						if (!colModel[i + iCol].hidden) {
							cVisibleColumns++;
						}
					}

					// The next numberOfColumns headers will be moved in the next row
					// in the current row will be placed the new column header with the titleText.
					// The text will be over the cVisibleColumns columns
					$colHeader = $('<th>').attr({role: "columnheader"})
						.addClass("ui-state-default ui-th-column-header ui-th-"+ts.p.direction)
						.css({'height':'22px', 'border-top': '0 none'})
						.html(titleText);
					if(cVisibleColumns > 0) {
						$colHeader.attr("colspan", String(cVisibleColumns));
					}
					if (ts.p.headertitles) {
						$colHeader.attr("title", $colHeader.text());
					}
					// hide if not a visible cols
					if( cVisibleColumns === 0) {
						$colHeader.hide();
					}

					$th.before($colHeader); // insert new column header before the current
					$tr.append(th);         // move the current header in the next row

					// set the coumter of headers which will be moved in the next row
					skip = numberOfColumns - 1;
				} else {
					if (skip === 0) {
						if (o.useColSpanStyle) {
							// expand the header height to two rows
							$th.attr("rowspan", "2");
						} else {
							$('<th>', {role: "columnheader"})
								.addClass("ui-state-default ui-th-column-header ui-th-"+ts.p.direction)
								.css({"display": cmi.hidden ? 'none' : '', 'border-top': '0 none'})
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
			$tr.insertAfter($trLabels);
			$htable.append($theadInTable);

			if (o.useColSpanStyle) {
				// Increase the height of resizing span of visible headers
				$htable.find("span.ui-jqgrid-resize").each(function () {
					var $parent = $(this).parent();
					if ($parent.is(":visible")) {
						this.style.cssText = 'height: ' + $parent.height() + 'px !important; cursor: col-resize;';
					}
				});

				// Set position of the sortable div (the main lable)
				// with the column header text to the middle of the cell.
				// One should not do this for hidden headers.
				$htable.find("div.ui-jqgrid-sortable").each(function () {
					var $ts = $(this), $parent = $ts.parent();
					if ($parent.is(":visible") && $parent.is(":has(span.ui-jqgrid-resize)")) {
						$ts.css('top', ($parent.height() - $ts.outerHeight()) / 2 + 'px');
					}
				});
			}
		});				
	},
	setFrozenColumns : function () {
		return this.each(function() {
			var $t = this, $self = $($t), p = $t.p, grid = $t.grid, jqID = jgrid.jqID;
			if (!grid) {return;}
			var cm = p.colModel,i=0, len = cm.length, maxfrozen = -1, frozen= false;
			// TODO treeGrid and grouping  Support
			// TODO: allow to edit columns AFTER frozen columns
			if(p.subGrid === true || p.treeGrid === true || p.cellEdit === true || p.sortable || p.scroll )
			{
				return;
			}
			if(p.rownumbers) { i++; }
			if(p.multiselect) { i++; }
			
			// get the max index of frozen col
			while(i<len)
			{
				// from left, no breaking frozen
				if(cm[i].frozen === true)
				{
					frozen = true;
					maxfrozen = i;
				} else {
					break;
				}
				i++;
			}
			if( maxfrozen>=0 && frozen) {
				var top = p.caption ? $(grid.cDiv).outerHeight() : 0,
				hth = $(".ui-jqgrid-htable",p.gView).height();
				//headers
				if(p.toppager) {
					top = top + $(grid.topDiv).outerHeight();
				}
				if(p.toolbar[0] === true) {
					if(p.toolbar[1] !== "bottom") {
						top = top + $(grid.uDiv).outerHeight();
					}
				}
				grid.fhDiv = $('<div style="position:absolute;left:0;top:'+top+'px;height:'+hth+'px;" class="frozen-div ui-state-default ui-jqgrid-hdiv"></div>');
				grid.fbDiv = $('<div style="position:absolute;left:0;top:'+(parseInt(top,10)+parseInt(hth,10) + 1)+'px;overflow-y:hidden" class="frozen-bdiv ui-jqgrid-bdiv"></div>');
				$(p.gView).append(grid.fhDiv);
				var htbl = $(".ui-jqgrid-htable",p.gView).clone(true);
				// groupheader support - only if useColSpanstyle is false
				if(p.groupHeader) {
					$("tr.jqg-first-row-header, tr.jqg-third-row-header", htbl).each(function(){
						$("th:gt("+maxfrozen+")",this).remove();
					});
					var swapfroz = -1, fdel = -1, cs, rs;
					$("tr.jqg-second-row-header th", htbl).each(function(){
						cs= parseInt($(this).attr("colspan"),10);
						rs= parseInt($(this).attr("rowspan"),10);
						if(rs) {
							swapfroz++;
							fdel++;
						}
						if(cs) {
							swapfroz = swapfroz+cs;
							fdel++;
						}
						if(swapfroz === maxfrozen) {
							return false;
						}
					});
					if(swapfroz !== maxfrozen) {
						fdel = maxfrozen;
					}
					$("tr.jqg-second-row-header", htbl).each(function(){
						$("th:gt("+fdel+")",this).remove();
					});
				} else {
					$("tr",htbl).each(function(){
						$("th:gt("+maxfrozen+")",this).remove();
					});
				}
				$(htbl).width(1);
				// resizing stuff
				$(grid.fhDiv).append(htbl)
				.mousemove(function (e) {
					if(grid.resizing){ grid.dragMove(e);return false; }
				});
				if(p.footerrow) {
					var hbd = $(".ui-jqgrid-bdiv",p.gView).height();

					grid.fsDiv = $('<div style="position:absolute;left:0;top:'+(parseInt(top,10)+parseInt(hth,10) + parseInt(hbd,10)+1)+'px;" class="frozen-sdiv ui-jqgrid-sdiv"></div>');
					$(p.gView).append(grid.fsDiv);
					var ftbl = $(".ui-jqgrid-ftable",p.gView).clone(true);
					$("tr",ftbl).each(function(){
						$("td:gt("+maxfrozen+")",this).remove();
					});
					$(ftbl).width(1);
					$(grid.fsDiv).append(ftbl);
				}
				$self.bind('jqGridResizeStop.setFrozenColumns', function (e, w, index) {
					var rhth = $(".ui-jqgrid-htable",grid.fhDiv);
					$("th:eq("+index+")",rhth).width( w ); 
					var btd = $(".ui-jqgrid-btable",grid.fbDiv);
					$("tr:first td:eq("+index+")",btd).width( w );
					if(p.footerrow) {
						var ftd = $(".ui-jqgrid-ftable",grid.fsDiv);
						$("tr:first td:eq("+index+")",ftd).width( w );
					}
				});
				// sorting stuff
				$self.bind('jqGridSortCol.setFrozenColumns', function (e, index, idxcol) {

					var previousSelectedTh = $("tr.ui-jqgrid-labels:last th:eq("+p.lastsort+")",grid.fhDiv), newSelectedTh = $("tr.ui-jqgrid-labels:last th:eq("+idxcol+")",grid.fhDiv);

					$("span.ui-grid-ico-sort",previousSelectedTh).addClass('ui-state-disabled');
					$(previousSelectedTh).attr("aria-selected","false");
					$("span.ui-icon-"+p.sortorder,newSelectedTh).removeClass('ui-state-disabled');
					$(newSelectedTh).attr("aria-selected","true");
					if(!p.viewsortcols[0]) {
						if(p.lastsort !== idxcol) {
							$("span.s-ico",previousSelectedTh).hide();
							$("span.s-ico",newSelectedTh).show();
						}
					}
				});
				
				// data stuff
				//TODO support for setRowData
				$(p.gView).append(grid.fbDiv);
				$(grid.bDiv).scroll(function () {
					$(grid.fbDiv).scrollTop($(this).scrollTop());
				});
				if(p.hoverrows === true) {
					$(p.idSel).unbind('mouseover').unbind('mouseout');
				}
				var fixDiv = function ($hDiv, hDivBase) {
						var pos = $(hDivBase).position();
						if ($hDiv != null && $hDiv.length > 0) {
							$hDiv.css({
								top: pos.top,
								left: p.direction === "rtl" ? hDivBase.clientWidth - grid.fhDiv.width() : 0
							});
						}
						$hDiv.height(hDivBase.clientHeight);
					};
				$self.bind('jqGridAfterGridComplete.setFrozenColumns', function () {
					$(p.idSel+"_frozen").remove();
					$(grid.fbDiv).height(grid.hDiv.clientHeight);
					var btbl = $(p.idSel).clone(true);
					$("tr[role=row]",btbl).each(function(){
						$("td[role=gridcell]:gt("+maxfrozen+")",this).remove();
					});

					$(btbl).width(1).attr("id",p.id+"_frozen");
					$(grid.fbDiv).append(btbl);
					if(p.hoverrows === true) {
						$("tr.jqgrow", btbl).hover(
							function(){ var tr = this; $(tr).addClass("ui-state-hover"); $("#"+jqID(tr.id), p.idSel).addClass("ui-state-hover"); },
							function(){ var tr = this; $(tr).removeClass("ui-state-hover"); $("#"+jqID(tr.id), p.idSel).removeClass("ui-state-hover"); }
						);
						$("tr.jqgrow", p.idSel).hover(
							function(){ var tr = this; $(tr).addClass("ui-state-hover"); $("#"+jqID(tr.id), p.idSel+"_frozen").addClass("ui-state-hover");},
							function(){ var tr = this; $(tr).removeClass("ui-state-hover"); $("#"+jqID(tr.id), p.idSel+"_frozen").removeClass("ui-state-hover"); }
						);
					}
					fixDiv(grid.fhDiv, grid.hDiv);
					fixDiv(grid.fbDiv, grid.bDiv);
					fixDiv(grid.fsDiv, grid.sDiv);
					btbl=null;
				});
				$(p.gBox).bind("resizestop.setFrozenColumns", function () {
					setTimeout(function () {
						// TODO: the width of all column headers can be changed
						// so one should recalculate frozenWidth in other way.
						fixDiv(grid.fhDiv, grid.hDiv);
						fixDiv(grid.fbDiv, grid.bDiv);
						fixDiv(grid.fsDiv, grid.sDiv);
						var frozenWidth = grid.fhDiv[0].clientWidth;
						if (grid.fhDiv != null && grid.fhDiv.length > 0) {
							$(grid.fhDiv).height(grid.hDiv.clientHeight);
							//$(grid.fhDiv).css("top", $(grid.hDiv).position().top);
						}
						if (grid.fbDiv != null && grid.fbDiv.length > 0) {
							//$(grid.fbDiv).height(grid.bDiv.clientHeight);
							$(grid.fbDiv).width(frozenWidth);
							//$(grid.fbDiv).css("top", $(grid.bDiv).position().top);
						}
						if (grid.fsDiv != null && grid.fsDiv.length > 0) {
							//$(grid.fsDiv).height(grid.sDiv.clientHeight);
							$(grid.fsDiv).width(frozenWidth);
							//$(grid.fsDiv).css("top", $(grid.sDiv).position().top);
						}
					}, 50);
				});
				if(!grid.hDiv.loading) {
					$self.triggerHandler("jqGridAfterGridComplete");
				}
				p.frozenColumns = true;
			}
		});
	},
	destroyFrozenColumns :  function() {
		return this.each(function() {
			var $t = this, $self = $($t), grid = $t.grid, p = $t.p;
			if (!grid) {return;}
			if(p.frozenColumns === true) {
				$(grid.fhDiv).remove();
				$(grid.fbDiv).remove();
				grid.fhDiv = null; grid.fbDiv=null;
				if(p.footerrow) {
					$(grid.fsDiv).remove();
					grid.fsDiv = null;
				}
				$self.unbind('.setFrozenColumns');
				if(p.hoverrows === true) {
					var ptr;
					$self.bind('mouseover',function(e) {
						ptr = $(e.target).closest("tr.jqgrow");
						if($(ptr).attr("class") !== "ui-subgrid") {
						$(ptr).addClass("ui-state-hover");
					}
					}).bind('mouseout',function(e) {
						ptr = $(e.target).closest("tr.jqgrow");
						$(ptr).removeClass("ui-state-hover");
					});
				}
				p.frozenColumns = false;
			}
		});
	}
});
}(jQuery));
/*
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
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */

(function ($) {
"use strict";
var jgrid = $.jgrid;
$.fn.jqFilter = function( arg ) {
	if (typeof arg === 'string') {
		var fn = $.fn.jqFilter[arg];
		if (!fn) {
			throw ("jqFilter - No such method: " + arg);
		}
		var args = $.makeArray(arguments).slice(1);
		return fn.apply(this,args);
	}

	var p = $.extend(true,{
		filter: null,
		columns: [],
		onChange : null,
		afterRedraw : null,
		checkValues : null,
		error: false,
		errmsg : "",
		errorcheck : true,
		showQuery : true,
		sopt : null,
		ops : [],
		operands : null,
		numopts : ['eq','ne', 'lt', 'le', 'gt', 'ge', 'nu', 'nn', 'in', 'ni'],
		stropts : ['eq', 'ne', 'bw', 'bn', 'ew', 'en', 'cn', 'nc', 'nu', 'nn', 'in', 'ni'],
		strarr : ['text', 'string', 'blob'],
		groupOps : [{ op: "AND", text: "AND" },	{ op: "OR",  text: "OR" }],
		groupButton : true,
		ruleButtons : true,
		direction : "ltr"
	}, jgrid.filter, arg || {});
	return this.each( function() {
		if (this.filter) {return;}
		this.p = p;
		// setup filter in case if they is not defined
		if (p.filter === null || p.filter === undefined) {
			p.filter = {
				groupOp: p.groupOps[0].op,
				rules: [],
				groups: []
			};
		}
		var iColumn, len = p.columns.length, cl,
		isIE = /msie/i.test(navigator.userAgent) && !window.opera;

		// translating the options
		p.initFilter = $.extend(true,{},p.filter);

		// set default values for the columns if they are not set
		if( !len ) {return;}
		for(iColumn=0; iColumn < len; iColumn++) {
			cl = p.columns[iColumn];
			if( cl.stype ) {
				// grid compatibility
				cl.inputtype = cl.stype;
			} else if(!cl.inputtype) {
				cl.inputtype = 'text';
			}
			if( cl.sorttype ) {
				// grid compatibility
				cl.searchtype = cl.sorttype;
			} else if (!cl.searchtype) {
				cl.searchtype = 'string';
			}
			if(cl.hidden === undefined) {
				// jqGrid compatibility
				cl.hidden = false;
			}
			if(!cl.label) {
				cl.label = cl.name;
			}
			if(cl.index) {
				cl.name = cl.index;
			}
			if(!cl.hasOwnProperty('searchoptions')) {
				cl.searchoptions = {};
			}
			if(!cl.hasOwnProperty('searchrules')) {
				cl.searchrules = {};
			}

		}
		if(p.showQuery) {
			$(this).append("<table class='queryresult ui-widget ui-widget-content' style='display:block;max-width:440px;border:0px none;' dir='"+p.direction+"'><tbody><tr><td class='query'></td></tr></tbody></table>");
		}
		var getGrid = function () {
			return $("#" + jgrid.jqID(p.id))[0] || null;
		};
		/*
		 *Perform checking.
		 *
		*/
		var checkData = function(val, colModelItem) {
			var ret = [true,""], $t = getGrid();
			if($.isFunction(colModelItem.searchrules)) {
				ret = colModelItem.searchrules.call($t, val, colModelItem);
			} else if(jgrid && jgrid.checkValues) {
				try {
					ret = jgrid.checkValues.call($t, val, -1, colModelItem.searchrules, colModelItem.label);
				} catch (ignore) {}
			}
			if(ret && ret.length && ret[0] === false) {
				p.error = !ret[0];
				p.errmsg = ret[1];
			}
		};
		/* moving to common
		randId = function() {
			return Math.floor(Math.random()*10000).toString();
		};
		*/

		this.onchange = function (  ){
			// clear any error 
			p.error = false;
			p.errmsg="";
			return $.isFunction(p.onChange) ? p.onChange.call( this, p ) : false;
		};
		/*
		 * Redraw the filter every time when new field is added/deleted
		 * and field is  changed
		 */
		this.reDraw = function() {
			$("table.group:first",this).remove();
			var t = this.createTableForGroup(p.filter, null);
			$(this).append(t);
			if($.isFunction(p.afterRedraw) ) {
				p.afterRedraw.call(this, p);
			}
		};
		/**
		 * Creates a grouping data for the filter
		 * @param group - object
		 * @param parentgroup - object
		 */
		this.createTableForGroup = function(group, parentgroup) {
			var that = this,  i;
			// this table will hold all the group (tables) and rules (rows)
			var table = $("<table class='group ui-widget ui-widget-content' style='border:0px none;'><tbody></tbody></table>"),
			// create error message row
			align = "left";
			if(p.direction === "rtl") {
				align = "right";
				table.attr("dir","rtl");
			}
			if(parentgroup === null) {
				table.append("<tr class='error' style='display:none;'><th colspan='5' class='ui-state-error' align='"+align+"'></th></tr>");
			}

			var tr = $("<tr></tr>");
			table.append(tr);
			// this header will hold the group operator type and group action buttons for
			// creating subgroup "+ {}", creating rule "+" or deleting the group "-"
			var th = $("<th colspan='5' align='"+align+"'></th>");
			tr.append(th);

			if(p.ruleButtons === true) {
				// dropdown for: choosing group operator type
				var groupOpSelect = $("<select class='opsel'></select>");
				th.append(groupOpSelect);
				// populate dropdown with all posible group operators: or, and
				var str= "", selected;
				for (i = 0; i < p.groupOps.length; i++) {
					selected =  group.groupOp === that.p.groupOps[i].op ? " selected='selected'" :"";
					str += "<option value='"+that.p.groupOps[i].op+"'" + selected+">"+that.p.groupOps[i].text+"</option>";
				}

				groupOpSelect
				.append(str)
				.bind('change',function() {
					group.groupOp = $(groupOpSelect).val();
					that.onchange(); // signals that the filter has changed
				});
			}
			// button for adding a new subgroup
			var inputAddSubgroup ="<span></span>";
			if(p.groupButton) {
				inputAddSubgroup = $("<input type='button' value='+ {}' title='Add subgroup' class='add-group'/>");
				inputAddSubgroup.bind('click',function() {
					if (group.groups === undefined ) {
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
			if(p.ruleButtons === true) {
				// button for adding a new rule
				var inputAddRule = $("<input type='button' value='+' title='Add rule' class='add-rule ui-add'/>"), cm;
				inputAddRule.bind('click',function() {
					var searchable, hidden, ignoreHiding;
					//if(!group) { group = {};}
					if (group.rules === undefined) {
						group.rules = [];
					}
					for (i = 0; i < that.p.columns.length; i++) {
					// but show only serchable and serchhidden = true fields
						searchable = (that.p.columns[i].search === undefined) ? true: that.p.columns[i].search;
						hidden = (that.p.columns[i].hidden === true);
						ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
						if ((ignoreHiding && searchable) || (searchable && !hidden)) {
							cm = that.p.columns[i];
							break;
						}
					}
					
					var opr;
					if( cm.searchoptions.sopt ) {opr = cm.searchoptions.sopt;}
					else if(that.p.sopt) { opr= that.p.sopt; }
					else if  ( $.inArray(cm.searchtype, that.p.strarr) !== -1 ) {opr = that.p.stropts;}
					else {opr = that.p.numopts;}

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
				var inputDeleteGroup = $("<input type='button' value='-' title='Delete group' class='delete-group'/>");
				th.append(inputDeleteGroup);
				inputDeleteGroup.bind('click',function() {
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
			if(group.groupOp === undefined) {
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
		this.createTableRowForRule = function(rule, group ) {
			// save current entity in a variable so that it could
			// be referenced in anonimous method calls

			var that=this, $t = getGrid(), tr = $("<tr></tr>"),
			//document.createElement("tr"),

			// first column used for padding
			//tdFirstHolderForRule = document.createElement("td"),
			i, op, trpar, cm, str="", selected;
			//tdFirstHolderForRule.setAttribute("class", "first");
			tr.append("<td class='first'></td>");


			// create field container
			var ruleFieldTd = $("<td class='columns'></td>");
			tr.append(ruleFieldTd);


			// dropdown for: choosing field
			var ruleFieldSelect = $("<select></select>"), ina, aoprs = [];
			ruleFieldTd.append(ruleFieldSelect);
			ruleFieldSelect.bind('change',function() {
				rule.field = $(ruleFieldSelect).val();

				trpar = $(this).parents("tr:first");
				for (i=0;i<that.p.columns.length;i++) {
					if(that.p.columns[i].name ===  rule.field) {
						cm = that.p.columns[i];
						break;
					}
				}
				if(!cm) {return;}
				cm.searchoptions.id = jgrid.randId();
				if(isIE && cm.inputtype === "text") {
					if(!cm.searchoptions.size) {
						cm.searchoptions.size = 10;
					}
				}
				var elm = jgrid.createEl.call($t, cm.inputtype,cm.searchoptions, "", true, that.p.ajaxSelectOptions || {}, true);
				$(elm).addClass("input-elm");
				//that.createElement(rule, "");

				if( cm.searchoptions.sopt ) {op = cm.searchoptions.sopt;}
				else if(that.p.sopt) { op= that.p.sopt; }
				else if  ($.inArray(cm.searchtype, that.p.strarr) !== -1) {op = that.p.stropts;}
				else {op = that.p.numopts;}
				// operators
				var s ="", so = 0, odataItem, itemOper, itemText;
				aoprs = [];
				$.each(that.p.ops, function() { aoprs.push(this.oper); });
				// append aoprs array with custom operations defined in customSortOperations parameter jqGrid
				if (that.p.cops) {
					$.each(that.p.cops, function(propertyName) { aoprs.push(propertyName); });
				}
				for ( i = 0 ; i < op.length; i++) {
					itemOper = op[i];
					ina = $.inArray(op[i],aoprs);
					if(ina !== -1) {
						odataItem = that.p.ops[ina];
						itemText = odataItem !== undefined ? odataItem.text : that.p.cops[itemOper].text;
						if (so===0) {
							// the first select item will be automatically selected in single-select
							rule.op = itemOper;
						}
						s += "<option value='"+itemOper+"'>"+itemText+"</option>";
						so++;
					}
				}
				$(".selectopts",trpar).empty().append( s );
				$(".selectopts",trpar)[0].selectedIndex = 0;
				if( jgrid.msie && jgrid.msiever() < 9) {
					var sw = parseInt($("select.selectopts",trpar)[0].offsetWidth, 10) + 1;
					$(".selectopts",trpar).width( sw );
					$(".selectopts",trpar).css("width","auto");
				}
				// data
				$(".data",trpar).empty().append( elm );
				jgrid.bindEv.call($t, elm, cm.searchoptions);
				$(".input-elm",trpar).bind('change',function( e ) {
					var elem = e.target;
					rule.data = elem.nodeName.toUpperCase() === "SPAN" && cm.searchoptions && $.isFunction(cm.searchoptions.custom_value) ?
						cm.searchoptions.custom_value.call($t, $(elem).children(".customelement:first"), 'get') : elem.value;
					that.onchange(); // signals that the filter has changed
				});
				setTimeout(function(){ //IE, Opera, Chrome
				rule.data = $(elm).val();
				that.onchange();  // signals that the filter has changed
				}, 0);
			});

			// populate drop down with user provided column definitions
			var j=0, searchable, hidden, ignoreHiding;
			for (i = 0; i < that.p.columns.length; i++) {
				// but show only serchable and serchhidden = true fields
				searchable = (that.p.columns[i].search === undefined) ? true: that.p.columns[i].search;
				hidden = (that.p.columns[i].hidden === true);
				ignoreHiding = (that.p.columns[i].searchoptions.searchhidden === true);
				if ((ignoreHiding && searchable) || (searchable && !hidden)) {
					selected = "";
					if(rule.field === that.p.columns[i].name) {
						selected = " selected='selected'";
						j=i;
					}
					str += "<option value='"+that.p.columns[i].name+"'" +selected+">"+that.p.columns[i].label+"</option>";
				}
			}
			ruleFieldSelect.append( str );


			// create operator container
			var ruleOperatorTd = $("<td class='operators'></td>");
			tr.append(ruleOperatorTd);
			cm = p.columns[j];
			// create it here so it can be referentiated in the onchange event
			//var RD = that.createElement(rule, rule.data);
			cm.searchoptions.id = jgrid.randId();
			if(isIE && cm.inputtype === "text") {
				if(!cm.searchoptions.size) {
					cm.searchoptions.size = 10;
				}
			}
			var ruleDataInput = jgrid.createEl.call($t, cm.inputtype,cm.searchoptions, rule.data, true, that.p.ajaxSelectOptions || {}, true);
			if(rule.op === 'nu' || rule.op === 'nn') {
				$(ruleDataInput).attr('readonly','true');
				$(ruleDataInput).attr('disabled','true');
			} //retain the state of disabled text fields in case of null ops
			// dropdown for: choosing operator
			var ruleOperatorSelect = $("<select class='selectopts'></select>");
			ruleOperatorTd.append(ruleOperatorSelect);
			ruleOperatorSelect.bind('change',function() {
				rule.op = $(ruleOperatorSelect).val();
				trpar = $(this).parents("tr:first");
				var rd = $(".input-elm",trpar)[0];
				if (rule.op === "nu" || rule.op === "nn") { // disable for operator "is null" and "is not null"
					rule.data = "";
					if(rd.tagName.toUpperCase() !== 'SELECT') { rd.value = ""; }
					rd.setAttribute("readonly", "true");
					rd.setAttribute("disabled", "true");
				} else {
					if(rd.tagName.toUpperCase() === 'SELECT') { rule.data = rd.value; }
					rd.removeAttribute("readonly");
					rd.removeAttribute("disabled");
				}

				that.onchange();  // signals that the filter has changed
			});

			// populate drop down with all available operators
			if( cm.searchoptions.sopt ) {op = cm.searchoptions.sopt;}
			else if(that.p.sopt) { op= that.p.sopt; }
			else if  ($.inArray(cm.searchtype, that.p.strarr) !== -1) {op = that.p.stropts;}
			else {op = that.p.numopts;}
			str="";
			var odataItem, itemOper;
			$.each(that.p.ops, function() { aoprs.push(this.oper); });
			// append aoprs array with custom operations defined in customSortOperations parameter jqGrid
			if (that.p.cops) {
				$.each(that.p.cops, function(propertyName) { aoprs.push(propertyName); });
			}
			for ( i = 0; i < op.length; i++) {
				itemOper = op[i];
				ina = $.inArray(op[i],aoprs);
				if(ina !== -1) {
					odataItem = that.p.ops[ina];
					selected = rule.op === itemOper ? " selected='selected'" : "";
					str += "<option value='"+itemOper+"'"+selected+">"+
						(odataItem !== undefined ? odataItem.text : that.p.cops[itemOper].text)+
						"</option>";
				}
			}
			ruleOperatorSelect.append( str );
			// create data container
			var ruleDataTd = $("<td class='data'></td>");
			tr.append(ruleDataTd);

			// textbox for: data
			// is created previously
			//ruleDataInput.setAttribute("type", "text");
			ruleDataTd.append(ruleDataInput);
			jgrid.bindEv.call($t, ruleDataInput, cm.searchoptions);
			$(ruleDataInput)
			.addClass("input-elm")
			.bind('change', function() {
				rule.data = cm.inputtype === 'custom' ? cm.searchoptions.custom_value.call($t, $(this).children(".customelement:first"),'get') : $(this).val();
				that.onchange(); // signals that the filter has changed
			});

			// create action container
			var ruleDeleteTd = $("<td></td>");
			tr.append(ruleDeleteTd);

			// create button for: delete rule
			if(p.ruleButtons === true) {
			var ruleDeleteInput = $("<input type='button' value='-' title='Delete rule' class='delete-rule ui-del'/>");
			ruleDeleteTd.append(ruleDeleteInput);
			//$(ruleDeleteInput).html("").height(20).width(30).button({icons: {  primary: "ui-icon-minus", text:false}});
			ruleDeleteInput.bind('click',function() {
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

		this.getStringForGroup = function(group) {
			var s = "(", index;
			if (group.groups !== undefined) {
				for (index = 0; index < group.groups.length; index++) {
					if (s.length > 1) {
						s += " " + group.groupOp + " ";
					}
					try {
						s += this.getStringForGroup(group.groups[index]);
					} catch (eg) {alert(eg);}
				}
			}

			if (group.rules !== undefined) {
				try{
					for (index = 0; index < group.rules.length; index++) {
						if (s.length > 1) {
							s += " " + group.groupOp + " ";
						}
						s += this.getStringForRule(group.rules[index]);
					}
				} catch (e) {alert(e);}
			}

			s += ")";

			if (s === "()") {
				return ""; // ignore groups that don't have rules
			}
			return s;
		};
		this.getStringForRule = function(rule) {
			var opUF = "",opC="", i, cm, ret, val = rule.data, oper,
			numtypes = ['int', 'integer', 'float', 'number', 'currency']; // jqGrid
			for (i = 0; i < p.ops.length; i++) {
				if (p.ops[i].oper === rule.op) {
					opUF = p.operands.hasOwnProperty(rule.op) ? p.operands[rule.op] : "";
					opC = p.ops[i].oper;
					break;
				}
			}
			if (opC === "" && p.cops != null) {
				for (oper in p.cops) {
					if (p.cops.hasOwnProperty(oper)) {
						opC = oper;
						opUF = p.cops[oper].operand;
						if ($.isFunction(p.cops[oper].buildQueryValue)) {
							return p.cops[oper].buildQueryValue.call(p, {cmName: rule.field, searchValue: val, operand: opUF});
						}
					}
				}
			}
			for (i=0; i<p.columns.length; i++) {
				if(p.columns[i].name === rule.field) {
					cm = p.columns[i];
					break;
				}
			}
			if (cm == null) { return ""; }
			if(opC === 'bw' || opC === 'bn') { val = val+"%"; }
			if(opC === 'ew' || opC === 'en') { val = "%"+val; }
			if(opC === 'cn' || opC === 'nc') { val = "%"+val+"%"; }
			if(opC === 'in' || opC === 'ni') { val = " ("+val+")"; }
			if(p.errorcheck) { checkData(rule.data, cm); }
			if($.inArray(cm.searchtype, numtypes) !== -1 || opC === 'nn' || opC === 'nu') { ret = rule.field + " " + opUF + " " + val; }
			else { ret = rule.field + " " + opUF + " \"" + val + "\""; }
			return ret;
		};
		this.resetFilter = function () {
			p.filter = $.extend(true,{},p.initFilter);
			this.reDraw();
			this.onchange();
		};
		this.hideError = function() {
			$("th.ui-state-error", this).html("");
			$("tr.error", this).hide();
		};
		this.showError = function() {
			$("th.ui-state-error", this).html(p.errmsg);
			$("tr.error", this).show();
		};
		this.toUserFriendlyString = function() {
			return this.getStringForGroup(p.filter);
		};
		this.toString = function() {
			// this will obtain a string that can be used to match an item.
			var that = this;
			function getStringRule(rule) {
				if(that.p.errorcheck) {
					var i, cm;
					for (i=0; i<that.p.columns.length; i++) {
						if(that.p.columns[i].name === rule.field) {
							cm = that.p.columns[i];
							break;
						}
					}
					if(cm) {checkData(rule.data, cm);}
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
							}
							else {
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
							}
							else  {
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

		if(p.showQuery) {
			this.onchange();
		}
		// mark is as created so that it will not be created twice on this element
		this.filter = true;
	});
};
$.extend($.fn.jqFilter,{
	/*
	 * Return SQL like string. Can be used directly
	 */
	toSQLString : function() {
		var s ="";
		this.each(function(){
			s = this.toUserFriendlyString();
		});
		return s;
	},
	/*
	 * Return filter data as object.
	 */
	filterData : function() {
		var s;
		this.each(function(){
			s = this.p.filter;
		});
		return s;

	},
	getParameter : function (param) {
		if(param !== undefined) {
			if (this.p.hasOwnProperty(param) ) {
				return this.p[param];
			}
		}
		return this.p;
	},
	resetFilter: function() {
		return this.each(function(){
			this.resetFilter();
		});
	},
	addFilter: function (pfilter) {
		if (typeof pfilter === "string") {
			pfilter = jgrid.parse( pfilter );
		}
		this.each(function(){
			this.p.filter = pfilter;
			this.reDraw();
			this.onchange();
		});
	}
});
}(jQuery));
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, continue: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global xmlJsonClass, jQuery */
(function($){
/**
 * jqGrid extension for form editing Grid Data
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com
 * Copyright (c) 2014-2015, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
"use strict";
var jgrid = $.jgrid, feedback = jgrid.feedback, fullBoolFeedback = jgrid.fullBoolFeedback, jqID = jgrid.jqID,
	hideModal = jgrid.hideModal, viewModal = jgrid.viewModal, createModal = jgrid.createModal, infoDialog = jgrid.info_dialog,
	mergeCssClasses = jgrid.mergeCssClasses,
	getCssStyleOrFloat = function ($elem, styleName) {
		var v = $elem[0].style[styleName];
		return v.indexOf("px") >= 0 ? parseFloat(v) : v;
	},
	savePositionOnHide = function (propName, frmgr, h) {
		var $w = h.w, $form = $(frmgr);
		// we use below .style.height and .style.width to save correctly "auto" and "100%" values
		// the "px" suffix will be saved too, but it's not a problem 
		this.data(propName, {
			top: getCssStyleOrFloat($w, "top"),					//parseFloat($w.css("top")),
			left: getCssStyleOrFloat($w, "left"),				//parseFloat($w.css("left")),
			width: getCssStyleOrFloat($w, "width"),				//$(h.w).width(),
			height: getCssStyleOrFloat($w, "height"),			//$(h.w).height(),
			dataheight: getCssStyleOrFloat($form, "height") || "auto",
			datawidth: getCssStyleOrFloat($form, "width") || "auto"
		});
		$w.remove();
		if(h.o) {h.o.remove();}
	},
	addFormIcon = function ($fmButton, iconInfos, commonIcon) {
		var iconspan;
		if (iconInfos[0] === true) {
			iconspan = "<span class='" + mergeCssClasses("fm-button-icon", commonIcon, iconInfos[2]) + "'></span>";
			if (iconInfos[1] === "right") {
				$fmButton.addClass('fm-button-icon-right').append(iconspan);
			} else {
				$fmButton.addClass('fm-button-icon-left').prepend(iconspan);
			}
		}
	};
jgrid.extend({
	searchGrid : function (oMuligrid) {
		// if one uses jQuery wrapper with multiple grids, then oMuligrid specify the object with common options
		return this.each(function() {
			var $t = this, $self = $($t), p = $t.p;
			if(!$t.grid || p == null) {return;}
			// make new copy of the options and use it for ONE specific grid.
			// p.searching can contains grid specific options
			// we will don't modify the input options oMuligrid
			var o = $.extend(true, {
				recreateFilter: false,
				drag: true,
				sField:'searchField',
				sValue:'searchString',
				sOper: 'searchOper',
				sFilter: 'filters',
				loadDefaults: true, // this options activates loading of default filters from grid's postData for Multipe Search only.
				beforeShowSearch: null,
				afterShowSearch : null,
				onInitializeSearch: null,
				afterRedraw : null,
				afterChange: null,
				closeAfterSearch : false,
				closeAfterReset: false,
				closeOnEscape : false,
				searchOnEnter : false,
				multipleSearch : false,
				multipleGroup : false,
				//cloneSearchRowOnAdd: true,
				// we can't use srort names like resetIcon because of conflict with existing "x" of filterToolbar
				top : 0,
				left: 0,
				removemodal: true,
				jqModal : true,
				modal: false,
				resize : true,
				width: 450,
				height: 'auto',
				dataheight: 'auto',
				showQuery: false,
				errorcheck : true,
				sopt: null,
				stringResult: undefined,
				onClose : null,
				onSearch : null,
				onReset : null,
				toTop : false,
				overlay : 30,
				columns : [],
				tmplNames : null,
				tmplFilters : null,
				tmplLabel : ' Template: ',
				showOnLoad: false,
				layer: null,
				operands : { "eq" :"=", "ne":"<>","lt":"<","le":"<=","gt":">","ge":">=","bw":"LIKE","bn":"NOT LIKE","in":"IN","ni":"NOT IN","ew":"LIKE","en":"NOT LIKE","cn":"LIKE","nc":"NOT LIKE","nu":"IS NULL","nn":"IS NOT NULL"}
			},
			$self.jqGrid("getGridRes", "search"),
			jgrid.search || {},
			p.searching || {},
			oMuligrid || {});

			var fid = "fbox_"+p.id, commonIconClass = o.commonIconClass,
			ids = {themodal:'searchmod'+fid,modalhead:'searchhd'+fid,modalcontent:'searchcnt'+fid, resizeAlso : fid},
			themodalSelector = "#"+jqID(ids.themodal), gboxSelector = p.gBox, gviewSelector = p.gView,
			defaultFilters = p.postData[o.sFilter],
			searchFeedback = function () {
				var args = $.makeArray(arguments);
				args.unshift("Search");
				args.unshift("Filter");
				args.unshift(o);
				return feedback.apply($t, args);
			};
			if(typeof defaultFilters === "string") {
				defaultFilters = jgrid.parse( defaultFilters );
			}
			if(o.recreateFilter === true) {
				$(themodalSelector).remove();
			} else if ($self.data("searchProp")) {
				$.extend(o, $self.data("searchProp"));
			}
			function showFilter($filter) {
				if(searchFeedback("beforeShow", $filter)) {
					$(themodalSelector).data("onClose",o.onClose);
					viewModal(themodalSelector,{
						gbox:gboxSelector,
						jqm:o.jqModal, 
						overlay: o.overlay,
						modal:o.modal, 
						overlayClass: o.overlayClass,
						toTop: o.toTop,
						onHide :  function(h) {
							savePositionOnHide.call($self, "searchProp", fid, h);
						}
					});
					searchFeedback("afterShow", $filter);
				}
			}
			if ( $(themodalSelector)[0] !== undefined ) {
				showFilter($("#fbox_"+p.idSel));
			} else {
				var fil = $("<div><div id='"+fid+"' class='searchFilter' style='overflow:auto'></div></div>").insertBefore(gviewSelector); 
				if(p.direction === "rtl") {
					fil.attr("dir","rtl");
				}
				var columns = $.extend([],p.colModel),
				bS = "<a id='"+fid+"_search' class='fm-button ui-state-default ui-corner-all fm-button-icon-right ui-reset'><span class='fm-button-icon " + mergeCssClasses(commonIconClass, o.findDialogIcon) + "'></span><span class='fm-button-text'>"+o.Find+"</span></a>",
				bC = "<a id='"+fid+"_reset' class='fm-button ui-state-default ui-corner-all fm-button-icon-left ui-search'><span class='fm-button-icon " + mergeCssClasses(commonIconClass, o.resetDialogIcon) + "'></span><span class='fm-button-text'>"+o.Reset+"</span></a>",
				bQ = "", tmpl="", colnm, found = false, bt, cmi=-1;
				if(o.showQuery) {
					bQ ="<a id='"+fid+"_query' class='fm-button ui-state-default ui-corner-all fm-button-icon-left'><span class='fm-button-icon " + mergeCssClasses(commonIconClass, o.queryDialogIcon) + "'></span><span class='fm-button-text'>Query</span></a>&#160;";
				}
				if(!o.columns.length) {
					$.each(columns, function(i,n){
						if(!n.label) {
							n.label = p.colNames[i];
						}
						// find first searchable column and set it if no default filter
						if(!found) {
							var searchable = (n.search === undefined) ?  true: n.search ,
							hidden = (n.hidden === true),
							ignoreHiding = (n.searchoptions && n.searchoptions.searchhidden === true);
							if ((ignoreHiding && searchable) || (searchable && !hidden)) {
								found = true;
								colnm = n.index || n.name;
								cmi =i;
							}
						}
					});
				} else {
					columns = o.columns;
					cmi = 0;
					colnm = columns[0].index || columns[0].name;
				}
				// old behaviour
				if( (!defaultFilters && colnm) || o.multipleSearch === false  ) {
					var cmop = "eq";
					if(cmi >=0 && columns[cmi].searchoptions && columns[cmi].searchoptions.sopt) {
						cmop = columns[cmi].searchoptions.sopt[0];
					} else if(o.sopt && o.sopt.length) {
						cmop = o.sopt[0];
					}
					defaultFilters = {groupOp: "AND", rules: [{field: colnm, op: cmop, data: ""}]};
				}
				found = false;
				if(o.tmplNames && o.tmplNames.length) {
					found = true;
					tmpl = o.tmplLabel;
					tmpl += "<select class='ui-template'>";
					tmpl += "<option value='default'>Default</option>";
					$.each(o.tmplNames, function(i,n){
						tmpl += "<option value='"+i+"'>"+n+"</option>";
					});
					tmpl += "</select>";
				}

				bt = "<table class='EditTable' style='border:0px none;margin-top:5px' id='"+fid+"_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='EditButton EditButton-" + p.direction + "'  style='float:"+ (p.direction === "rtl" ? "right" : "left") +";'>"+bC+tmpl+"</td><td class='EditButton EditButton-" + p.direction + "'>"+bQ+bS+"</td></tr></tbody></table>";
				fid = jqID(fid);
				o.gbox = "#gbox_"+fid;
				o.height = "auto";
				fid = "#"+fid;
				$(fid).jqFilter({
					columns : columns,
					filter: o.loadDefaults ? defaultFilters : null,
					showQuery: o.showQuery,
					errorcheck : o.errorcheck,
					sopt: o.sopt,
					groupButton : o.multipleGroup,
					ruleButtons : o.multipleSearch,
					afterRedraw : o.afterRedraw,
					ops : o.odata,
					cops: p.customSortOperations,
					operands : o.operands,
					ajaxSelectOptions: p.ajaxSelectOptions,
					groupOps: o.groupOps,
					onChange : function() {
						if(this.p.showQuery) {
							$('.query',this).html(this.toUserFriendlyString());
						}
						fullBoolFeedback.call($t, o.afterChange, "jqGridFilterAfterChange", $(fid), o);
					},
					direction : p.direction,
					id: p.id
				});
				fil.append( bt );
				if(found && o.tmplFilters && o.tmplFilters.length) {
					$(".ui-template", fil).bind('change', function(){
						var curtempl = $(this).val();
						if(curtempl==="default") {
							$(fid).jqFilter('addFilter', defaultFilters);
						} else {
							$(fid).jqFilter('addFilter', o.tmplFilters[parseInt(curtempl,10)]);
						}
						return false;
					});
				}
				if(o.multipleGroup === true) {o.multipleSearch = true;}
				searchFeedback("onInitialize", $(fid));
				if (o.layer) {
					createModal.call($t, ids, fil, o, gviewSelector, $(gboxSelector)[0], "#"+jqID(o.layer), {position: "relative"});
				} else {
					createModal.call($t, ids, fil, o, gviewSelector, $(gboxSelector)[0]);
				}
				if (o.searchOnEnter || o.closeOnEscape) {
					$(themodalSelector).keydown(function (e) {
						var $target = $(e.target);
						if (o.searchOnEnter && e.which === 13 && // 13 === $.ui.keyCode.ENTER
								!$target.hasClass('add-group') && !$target.hasClass('add-rule') &&
								!$target.hasClass('delete-group') && !$target.hasClass('delete-rule') &&
								(!$target.hasClass("fm-button") || !$target.is("[id$=_query]"))) {
							$(fid+"_search").click();
							return false;
						}
						if (o.closeOnEscape && e.which === 27) { // 27 === $.ui.keyCode.ESCAPE
							$("#"+jqID(ids.modalhead)).find(".ui-jqdialog-titlebar-close").click();
							return false;
						}
					});
				}
				if(bQ) {
					$(fid+"_query").bind('click', function(){
						$(".queryresult", fil).toggle();
						return false;
					});
				}
				if (o.stringResult===undefined) {
					// to provide backward compatibility, inferring stringResult value from multipleSearch
					o.stringResult = o.multipleSearch;
				}
				$(fid+"_search").bind('click', function(){
					var sdata={}, res, filters, fl = $(fid), $inputs = fl.find(".input-elm");
					if ($inputs.filter(":focus")) {
						$inputs = $inputs.filter(":focus");
					}
					$inputs.change();
					filters = fl.jqFilter('filterData');
					if(o.errorcheck) {
						fl[0].hideError();
						if(!o.showQuery) {fl.jqFilter('toSQLString');}
						if(fl[0].p.error) {
							fl[0].showError();
							return false;
						}
					}

					if(o.stringResult) {
						try {
							// xmlJsonClass or JSON.stringify
							res = xmlJsonClass.toJson(filters, '', '', false);
						} catch (e) {
							try {
								res = JSON.stringify(filters);
							} catch (ignore) { }
						}
						if(typeof res==="string") {
							sdata[o.sFilter] = res;
							$.each([o.sField,o.sValue, o.sOper], function() {sdata[this] = "";});
						}
					} else {
						if(o.multipleSearch) {
							sdata[o.sFilter] = filters;
							$.each([o.sField,o.sValue, o.sOper], function() {sdata[this] = "";});
						} else {
							sdata[o.sField] = filters.rules[0].field;
							sdata[o.sValue] = filters.rules[0].data;
							sdata[o.sOper] = filters.rules[0].op;
							sdata[o.sFilter] = "";
						}
					}
					p.search = true;
					$.extend(p.postData,sdata);
					if (fullBoolFeedback.call($t, o.onSearch, "jqGridFilterSearch", p.filters)) {
						$self.trigger("reloadGrid",[{page:1}]);
					}
					if(o.closeAfterSearch) {
						hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: o.onClose,removemodal:o.removemodal});
					}
					return false;
				});
				$(fid+"_reset").bind('click', function(){
					var sdata={}, fl1 = $(fid);
					p.search = false;
					p.resetsearch =  true;
					if(o.multipleSearch===false) {
						sdata[o.sField] = sdata[o.sValue] = sdata[o.sOper] = "";
					} else {
						sdata[o.sFilter] = "";
					}
					fl1[0].resetFilter();
					if(found) {
						$(".ui-template", fil).val("default");
					}
					$.extend(p.postData,sdata);
					if(fullBoolFeedback.call($t, o.onReset, "jqGridFilterReset")) {
						$self.trigger("reloadGrid",[{page:1}]);
					}
					if (o.closeAfterReset) {
						hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: o.onClose,removemodal: o.removemodal});
					}
					return false;
				});
				showFilter($(fid));
				$(".fm-button:not(.ui-state-disabled)",fil).hover(
					function(){$(this).addClass('ui-state-hover');},
					function(){$(this).removeClass('ui-state-hover');}
				);
			}
		});
	},
	editGridRow : function(rowid, oMuligrid){		// if one uses jQuery wrapper with multiple grids, then oMultiple specify the object with common options
		return this.each(function(){
			var $t = this, $self = $($t), p = $t.p;
			if (!$t.grid || p == null || !rowid) {return;}
			// make new copy of the options oMuligrid and use it for ONE specific grid.
			// p.formEditing can contains grid specific options
			// we will don't modify the input options oMuligrid
			var gID = p.id,
			o = $.extend(true, {
				top : 0,
				left: 0,
				width: 300,
				datawidth: 'auto',
				height: 'auto',
				dataheight: 'auto',
				modal: false,
				overlay : 30,
				drag: true,
				resize: true,
				url: null,
				mtype : "POST",
				clearAfterAdd :true,
				closeAfterEdit : false,
				reloadAfterSubmit : true,
				onInitializeForm: null,
				beforeInitData: null,
				beforeShowForm: null,
				afterShowForm: null,
				beforeSubmit: null,
				afterSubmit: null,
				onclickSubmit: null,
				afterComplete: null,
				onclickPgButtons : null,
				afterclickPgButtons: null,
				editData : {},
				recreateForm : false,
				jqModal : true,
				closeOnEscape : false,
				addedrow : "first",
				topinfo : '',
				bottominfo: '',
				savekey: [false,13],
				navkeys: [false,38,40],
				checkOnSubmit : false,
				checkOnUpdate : false,
				_savedData : {},
				processing : false,
				onClose : null,
				ajaxEditOptions : {},
				serializeEditData : null,
				viewPagerButtons : true,
				overlayClass : 'ui-widget-overlay',
				removemodal : true,
				form: 'edit'
			},
			$self.jqGrid("getGridRes", "edit"),
			jgrid.edit,
			p.formEditing || {},
			oMuligrid || {});
			
			var frmgr = "FrmGrid_"+gID, frmgrID = frmgr, frmtborg = "TblGrid_"+gID, frmtb = "#"+jqID(frmtborg), frmtb2 = frmtb+"_2",
			ids = {themodal:'editmod'+gID,modalhead:'edithd'+gID,modalcontent:'editcnt'+gID, resizeAlso : frmgr},
			themodalSelector = "#"+jqID(ids.themodal), gboxSelector = p.gBox, propOrAttr = p.propOrAttr,
			maxCols = 1, maxRows=0,	postdata, diff, frmoper, commonIconClass = o.commonIconClass,
			editFeedback = function () {
				var args = $.makeArray(arguments);
				args.unshift("");
				args.unshift("AddEdit");
				args.unshift(o);
				return feedback.apply($t, args);
			};
			frmgr = "#" + jqID(frmgr);
			if (rowid === "new") {
				rowid = "_empty";
				frmoper = "add";
				o.caption=o.addCaption;
			} else {
				o.caption=o.editCaption;
				frmoper = "edit";
			}
			if(!o.recreateForm) {
				if( $self.data("formProp") ) {
					$.extend(o, $self.data("formProp"));
				}
			}
			var closeovrl = true;
			if(o.checkOnUpdate && o.jqModal && !o.modal) {
				closeovrl = false;
			}
			function getFormData(){
				$(frmtb+" > tbody > tr > td .FormElement").each(function() {
					var celm = $(".customelement", this);
					if (celm.length) {
						var  elem = celm[0], nm = $(elem).attr('name');
						$.each(p.colModel, function(){
							if(this.name === nm && this.editoptions && $.isFunction(this.editoptions.custom_value)) {
								try {
									postdata[nm] = this.editoptions.custom_value.call($t, $("#"+jqID(nm),frmtb),'get');
									if (postdata[nm] === undefined) {throw "e1";}
								} catch (e) {
									if (e==="e1") {infoDialog.call($t,jgrid.errors.errcap,"function 'custom_value' "+jgrid.edit.msg.novalue,jgrid.edit.bClose);}
									else {infoDialog.call($t,jgrid.errors.errcap,e.message,jgrid.edit.bClose);}
								}
								return true;
							}
						});
					} else {
					switch ($(this).get(0).type) {
						case "checkbox":
							if($(this).is(":checked")) {
								postdata[this.name]= $(this).val();
							}else {
								var ofv = $(this).attr("offval");
								postdata[this.name]= ofv;
							}
						break;
						case "select-one":
							postdata[this.name]= $("option:selected",this).val();
						break;
						case "select-multiple":
							postdata[this.name]= $(this).val();
							if(postdata[this.name]) {postdata[this.name] = postdata[this.name].join(",");}
							else {postdata[this.name] ="";}
							var selectedText = [];
							$("option:selected",this).each(
								function(i,selected){
									selectedText[i] = $(selected).text();
								}
							);
						break;
						case "password":
						case "text":
						case "textarea":
						case "button":
							postdata[this.name] = $(this).val();

						break;
					}
					// REMARK: to be exactly one should call htmlEncode LATER and to use validation and unformatting of unencoded data!!
					if(p.autoencode) {postdata[this.name] = jgrid.htmlEncode(postdata[this.name]);}
					}
				});
				return true;
			}
			function createData(rowid,tb,maxcols){
				var cnt=0, retpos=[], ind=false,
				tdtmpl = "<td class='CaptionTD'></td><td class='DataTD'></td>", tmpl="", i; //*2
				for (i =1; i<=maxcols;i++) {
					tmpl += tdtmpl;
				}
				if(rowid !== '_empty') {
					ind = $self.jqGrid("getInd",rowid);
				}
				$(p.colModel).each( function(i) {
					var cm = this, nm = cm.name, hc, trdata, tmp, dc, elc, editable = cm.editable, disabled = false, readonly = false;
					if ($.isFunction(editable)) {
						editable = editable.call($t, {
							rowid: rowid,
							iCol: i,
							iRow: ind, // can be false for Add operation
							name: nm,
							cm: cm,
							mode: rowid === "_empty" ? "addForm" : "editForm"
						});
					}
					// hidden fields are included in the form
					if(cm.editrules && cm.editrules.edithidden === true) {
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
					if (nm !== 'cb' && nm !== 'subgrid' && editable === true && nm !== 'rn') {
						if(ind === false) {
							tmp = "";
						} else {
							if(nm === p.ExpandColumn && p.treeGrid === true) {
								tmp = $("td[role='gridcell']:eq("+i+")",$t.rows[ind]).text();
							} else {
								try {
									tmp = $.unformat.call($t, $("td[role='gridcell']:eq("+i+")",$t.rows[ind]),{rowId:rowid, colModel:cm},i);
								} catch (_) {
									tmp = (cm.edittype && cm.edittype === "textarea") ? $("td[role='gridcell']:eq("+i+")",$t.rows[ind]).text() : $("td[role='gridcell']:eq("+i+")",$t.rows[ind]).html();
								}
								if(!tmp || tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
							}
						}
						var opt = $.extend({}, cm.editoptions || {} ,{id:nm,name:nm, rowId: rowid}),
						frmopt = $.extend({}, {elmprefix:'',elmsuffix:'',rowabove:false,rowcontent:''}, cm.formoptions || {}),
						rp = parseInt(frmopt.rowpos,10) || cnt+1,
						cp = parseInt((parseInt(frmopt.colpos,10) || 1)*2,10);
						if(rowid === "_empty" && opt.defaultValue ) {
							tmp = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
						}
						if(!cm.edittype) {cm.edittype = "text";}
						if(p.autoencode) {tmp = jgrid.htmlDecode(tmp);}
						elc = jgrid.createEl.call($t,cm.edittype,opt,tmp,false,$.extend({},jgrid.ajaxOptions,p.ajaxSelectOptions || {}));
						//if(tmp === "" && cm.edittype == "checkbox") {tmp = $(elc).attr("offval");}
						//if(tmp === "" && cm.edittype == "select") {tmp = $("option:eq(0)",elc).text();}
						if(o.checkOnSubmit || o.checkOnUpdate) {o._savedData[nm] = tmp;}
						$(elc).addClass("FormElement");
						if( $.inArray(cm.edittype, ['text','textarea','password','select']) > -1) {
							$(elc).addClass("ui-widget-content ui-corner-all");
						}
						trdata = $(tb).find("tr[rowpos="+rp+"]");
						if(frmopt.rowabove) {
							var newdata = $("<tr><td class='contentinfo' colspan='"+(maxcols*2)+"'>"+frmopt.rowcontent+"</td></tr>");
							$(tb).append(newdata);
							newdata[0].rp = rp;
						}
						if ( trdata.length===0 ) {
							trdata = $("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","tr_"+nm);
							$(trdata).append(tmpl);
							$(tb).append(trdata);
							trdata[0].rp = rp;
						}
						var $label = $("td:eq("+(cp-2)+")",trdata[0]),
							$data = $("td:eq("+(cp-1)+")",trdata[0]);
						$label.html(frmopt.label === undefined ? p.colNames[i]: frmopt.label);
						$data.html(frmopt.elmprefix).append(elc).append(frmopt.elmsuffix);
						if (disabled) {
							$label.addClass("ui-state-disabled");
							$data.addClass("ui-state-disabled");
							$(elc).prop("readonly", true);
							$(elc).prop("disabled", true);
						} else if (readonly) {
							$(elc).prop("readonly", true);
						}
						if(cm.edittype==='custom' && $.isFunction(opt.custom_value) ) {
							opt.custom_value.call($t, $("#"+jqID(nm),frmgr),'set',tmp);
						}
						jgrid.bindEv.call($t, elc, opt);
						retpos[cnt] = i;
						cnt++;
					}
				});
				if( cnt > 0) {
					var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+ (maxcols*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='"+gID+"_id' value='"+rowid+"'/></td></tr>");
					idrow[0].rp = cnt+999;
					$(tb).append(idrow);
					if(o.checkOnSubmit || o.checkOnUpdate) {o._savedData[gID+"_id"] = rowid;}
				}
				return retpos;
			}
			function fillData(rowid,fmid){
				var nm,cnt=0,tmp, fld,opt,vl,vlc;
				if(o.checkOnSubmit || o.checkOnUpdate) {o._savedData = {};o._savedData[gID+"_id"]=rowid;}
				var cm = p.colModel;
				if(rowid === '_empty') {
					$(cm).each(function(){
						nm = this.name;
						opt = $.extend({}, this.editoptions || {} );
						fld = $("#"+jqID(nm),fmid);
						if(fld && fld.length && fld[0] !== null) {
							vl = "";
							if(this.edittype === 'custom' && $.isFunction(opt.custom_value)) {
								opt.custom_value.call($t, fld,'set',vl);
							} else if(opt.defaultValue ) {
								vl = $.isFunction(opt.defaultValue) ? opt.defaultValue.call($t) : opt.defaultValue;
								if(fld[0].type==='checkbox') {
									vlc = vl.toLowerCase();
									if(vlc.search(/(false|f|0|no|n|off|undefined)/i)<0 && vlc!=="") {
										fld[0].checked = true;
										fld[0].defaultChecked = true;
										fld[0].value = vl;
									} else {
										fld[0].checked = false;
										fld[0].defaultChecked = false;
									}
								} else {fld.val(vl);}
							} else {
								if( fld[0].type==='checkbox' ) {
									fld[0].checked = false;
									fld[0].defaultChecked = false;
									vl = $(fld).attr("offval");
								} else if (fld[0].type && fld[0].type.substr(0,6)==='select') {
									fld[0].selectedIndex = 0;
								} else {
									fld.val(vl);
								}
							}
							if(o.checkOnSubmit===true || o.checkOnUpdate) {o._savedData[nm] = vl;}
						}
					});
					$("#id_g",fmid).val(rowid);
					return;
				}
				var tre = $self.jqGrid("getInd",rowid,true);
				if(!tre) {return;}
				$('td[role="gridcell"]',tre).each( function(i) {
					nm = cm[i].name;
					// hidden fields are included in the form
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && cm[i].editable===true) {
						if(nm === p.ExpandColumn && p.treeGrid === true) {
							tmp = $(this).text();
						} else {
							try {
								tmp =  $.unformat.call($t, $(this),{rowId:rowid, colModel:cm[i]},i);
							} catch (_) {
								tmp = cm[i].edittype==="textarea" ? $(this).text() : $(this).html();
							}
						}
						if(p.autoencode) {tmp = jgrid.htmlDecode(tmp);}
						if(o.checkOnSubmit===true || o.checkOnUpdate) {o._savedData[nm] = tmp;}
						nm = "#"+jqID(nm);
						switch (cm[i].edittype) {
							case "password":
							case "text":
							case "button" :
							case "image":
							case "textarea":
								if(tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
								$(nm,fmid).val(tmp);
								break;
							case "select":
								var opv = tmp.split(",");
								opv = $.map(opv,function(n){return $.trim(n);});
								$(nm+" option",fmid).each(function(){
									var selOpt = this, $selOpt = $(selOpt), optVal = $.trim($selOpt.val()), optText = $.trim($selOpt.text());
									if (!cm[i].editoptions.multiple && ($.trim(tmp) === optText || opv[0] === optText || opv[0] === optVal) ){
										selOpt.selected= true;
									} else if (cm[i].editoptions.multiple){
										if( $.inArray(optText, opv) > -1 || $.inArray(optVal, opv) > -1 ){
											selOpt.selected = true;
										}else{
											selOpt.selected = false;
										}
									} else {
										selOpt.selected = false;
									}
								});
								break;
							case "checkbox":
								tmp = String(tmp);
								if(cm[i].editoptions && cm[i].editoptions.value) {
									var cb = cm[i].editoptions.value.split(":");
									if(cb[0] === tmp) {
										$(nm,fmid)[propOrAttr]({"checked":true, "defaultChecked" : true});
									} else {
										$(nm,fmid)[propOrAttr]({"checked":false, "defaultChecked" : false});
									}
								} else {
									tmp = tmp.toLowerCase();
									if(tmp.search(/(false|f|0|no|n|off|undefined)/i)<0 && tmp!=="") {
										$(nm,fmid)[propOrAttr]("checked",true);
										$(nm,fmid)[propOrAttr]("defaultChecked",true); //ie
									} else {
										$(nm,fmid)[propOrAttr]("checked", false);
										$(nm,fmid)[propOrAttr]("defaultChecked", false); //ie
									}
								}
								break;
							case 'custom' :
								try {
									if(cm[i].editoptions && $.isFunction(cm[i].editoptions.custom_value)) {
										cm[i].editoptions.custom_value.call($t, $(nm,fmid),'set',tmp);
									} else {throw "e1";}
								} catch (e) {
									if (e==="e1") {infoDialog.call($t,jgrid.errors.errcap,"function 'custom_value' "+jgrid.edit.msg.nodefined,jgrid.edit.bClose);}
									else {infoDialog.call($t,jgrid.errors.errcap,e.message,jgrid.edit.bClose);}
								}
								break;
						}
						cnt++;
					}
				});
				if(cnt>0) {$("#id_g",frmtb).val(rowid);}
			}
			function setNullsOrUnformat() {
				var url = o.url || p.editurl;
				$.each(p.colModel, function(i, cm){
					var cmName = cm.name, value = postdata[cmName];
					if (cm.formatter && cm.formatter === "date" && (cm.formatoptions == null || cm.formatoptions.sendFormatted !== true)) {
						// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
						// Floating point separator for example
						postdata[cmName] = $.unformat.date.call($t, value, cm);
					}
					if (url !== "clientArray" && cm.editoptions && cm.editoptions.NullIfEmpty === true) {
						if(postdata.hasOwnProperty(cmName) && value === "") {
							postdata[cmName] = 'null';
						}
					}
				});
			}
			function postIt() {
				var copydata, ret=[true,"",""], onCS = {}, opers = p.prmNames, idname, oper, key, selr, i, url, itm;
				
				var retvals = $self.triggerHandler("jqGridAddEditBeforeCheckValues", [$(frmgr), frmoper]);
				if(retvals && typeof retvals === 'object') {postdata = retvals;}
				
				if($.isFunction(o.beforeCheckValues)) {
					retvals = o.beforeCheckValues.call($t, postdata,$(frmgr),frmoper);
					if(retvals && typeof retvals === 'object') {postdata = retvals;}
				}
				for( key in postdata ){
					if(postdata.hasOwnProperty(key)) {
						ret = jgrid.checkValues.call($t,postdata[key],key);
						if(ret[0] === false) {break;}
					}
				}
				setNullsOrUnformat();
				if(ret[0]) {
					onCS = $self.triggerHandler("jqGridAddEditClickSubmit", [o, postdata, frmoper]);
					if( onCS === undefined && $.isFunction( o.onclickSubmit)) { 
						onCS = o.onclickSubmit.call($t, o, postdata, frmoper) || {}; 
					}
					ret = $self.triggerHandler("jqGridAddEditBeforeSubmit", [postdata, $(frmgr), frmoper]);
					if(ret === undefined) {
						ret = [true,"",""];
					}
					if( ret[0] && $.isFunction(o.beforeSubmit))  {
						ret = o.beforeSubmit.call($t,postdata,$(frmgr), frmoper);
					}
				}

				if(ret[0] && !o.processing) {
					o.processing = true;
					$("#sData", frmtb2).addClass('ui-state-active');
					url = o.url || p.editurl;
					oper = opers.oper;
					idname = url === 'clientArray' ? p.keyName : opers.id;
					// we add to pos data array the action - the name is oper
					postdata[oper] = ($.trim(postdata[gID+"_id"]) === "_empty") ? opers.addoper : opers.editoper;
					if(postdata[oper] !== opers.addoper) {
						postdata[idname] = postdata[gID+"_id"];
					} else {
						// check to see if we have allredy this field in the form and if yes lieve it
						if( postdata[idname] === undefined ) {postdata[idname] = postdata[gID+"_id"];}
					}
					delete postdata[gID+"_id"];
					postdata = $.extend(postdata,o.editData,onCS);
					if(p.treeGrid === true)  {
						if(postdata[oper] === opers.addoper) {
							selr = p.selrow;
							var trParID = p.treeGridModel === 'adjacency' ? p.treeReader.parent_id_field : 'parent_id';
							postdata[trParID] = selr;
						}
						for(i in p.treeReader){
							if(p.treeReader.hasOwnProperty(i)) {
								itm = p.treeReader[i];
								if(postdata.hasOwnProperty(itm)) {
									if(postdata[oper] === opers.addoper && i === 'parent_id_field') {continue;}
									delete postdata[itm];
								}
							}
						}
					}
					
					postdata[idname] = jgrid.stripPref(p.idPrefix, postdata[idname]);
					var ajaxOptions = $.extend({
						url: url,
						type: o.mtype,
						//data: $.isFunction(o.serializeEditData) ? o.serializeEditData.call($t,postdata) :  postdata,
						data: jgrid.serializeFeedback.call($t,
							$.isFunction(o.serializeEditData) ? o.serializeEditData : p.serializeEditData,
							"jqGridAddEditSerializeEditData",
							postdata),						
						complete: function (jqXHR, textStatus) {
							$("#sData", frmtb2).removeClass('ui-state-active');
							postdata[idname] = p.idPrefix + $("#id_g",frmtb).val();
							if((jqXHR.status >= 300 && jqXHR.status !== 304) || (jqXHR.status === 0 && jqXHR.readyState === 4)) {
								ret[0] = false;
								ret[1] = $self.triggerHandler("jqGridAddEditErrorTextFormat", [jqXHR, frmoper]);
								if ($.isFunction(o.errorTextFormat)) {
									ret[1] = o.errorTextFormat.call($t, jqXHR, frmoper);
								} else {
									ret[1] = textStatus + " Status: '" + jqXHR.statusText + "'. Error code: " + jqXHR.status;
								}
							} else {
								// data is posted successful
								// execute aftersubmit with the returned data from server
								ret = $self.triggerHandler("jqGridAddEditAfterSubmit", [jqXHR, postdata, frmoper]);
								if(ret === undefined) {
									ret = [true,"",""];
								}
								if( ret[0] && $.isFunction(o.afterSubmit) ) {
									ret = o.afterSubmit.call($t, jqXHR,postdata, frmoper);
								}
							}
							if(ret[0] === false) {
								$("#FormError>td",frmtb).html(ret[1]);
								$("#FormError",frmtb).show();
							} else {
								if(p.autoencode) {
									$.each(postdata,function(n,v){
										postdata[n] = jgrid.htmlDecode(v);
									});
								}
								//o.reloadAfterSubmit = o.reloadAfterSubmit && $t.o.datatype != "local";
								// the action is add
								if(postdata[oper] === opers.addoper ) {
									//id processing
									// user not set the id ret[2]
									if(!ret[2]) {ret[2] = jgrid.randId();}
									if(postdata[idname] == null || postdata[idname] === "_empty"){
										postdata[idname] = ret[2];
									} else {
										ret[2] = postdata[idname];
									}
									if(o.reloadAfterSubmit) {
										$self.trigger("reloadGrid");
									} else {
										if(p.treeGrid === true){
											$self.jqGrid("addChildNode",ret[2],selr,postdata );
										} else {
											$self.jqGrid("addRowData",ret[2],postdata,o.addedrow);
										}
									}
									if(o.closeAfterAdd) {
										if(p.treeGrid !== true){
											$self.jqGrid("setSelection",ret[2]);
										}
										hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});
									} else if (o.clearAfterAdd) {
										fillData("_empty",frmgr);
									}
								} else {
									// the action is update
									if(o.reloadAfterSubmit) {
										$self.trigger("reloadGrid");
										if( !o.closeAfterEdit ) {setTimeout(function(){$self.jqGrid("setSelection",postdata[idname]);},1000);}
									} else {
										if(p.treeGrid === true) {
											$self.jqGrid("setTreeRow", postdata[idname],postdata);
										} else {
											$self.jqGrid("setRowData", postdata[idname],postdata);
										}
									}
									if(o.closeAfterEdit) {hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});}
								}
								if($.isFunction(o.afterComplete)) {
									copydata = jqXHR;
									setTimeout(function(){
										$self.triggerHandler("jqGridAddEditAfterComplete", [copydata, postdata, $(frmgr), frmoper]);
										o.afterComplete.call($t, copydata, postdata, $(frmgr), frmoper);
										copydata=null;
									},500);
								}
								if(o.checkOnSubmit || o.checkOnUpdate) {
									$(frmgr).data("disabled",false);
									if(o._savedData[gID+"_id"] !== "_empty"){
										var key1;
										for(key1 in o._savedData) {
											if(o._savedData.hasOwnProperty(key1) && postdata[key1]) {
												o._savedData[key1] = postdata[key1];
											}
										}
									}
								}
							}
							o.processing=false;
							try{$(':input:visible',frmgr)[0].focus();} catch (ignore){}
						}
					}, jgrid.ajaxOptions, o.ajaxEditOptions );

					if (!ajaxOptions.url && !o.useDataProxy) {
						if ($.isFunction(p.dataProxy)) {
							o.useDataProxy = true;
						} else {
							ret[0]=false;ret[1] += " "+jgrid.errors.nourl;
						}
					}
					if (ret[0]) {
						if (o.useDataProxy) {
							var dpret = p.dataProxy.call($t, ajaxOptions, "set_"+gID); 
							if(dpret === undefined) {
								dpret = [true, ""];
							}
							if(dpret[0] === false ) {
								ret[0] = false;
								ret[1] = dpret[1] || "Error deleting the selected row!" ;
							} else {
								if(ajaxOptions.data.oper === opers.addoper && o.closeAfterAdd ) {
									hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});
								}
								if(ajaxOptions.data.oper === opers.editoper && o.closeAfterEdit ) {
									hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});
								}
							}
						} else {
							if(ajaxOptions.url === "clientArray") {
								o.reloadAfterSubmit = false;
								postdata = ajaxOptions.data;
								ajaxOptions.complete({status:200, statusText:''},'');
							} else {
								$.ajax(ajaxOptions); 
							}
						}
					}
				}
				if(ret[0] === false) {
					$("#FormError>td",frmtb).html(ret[1]);
					$("#FormError",frmtb).show();
					// return;
				}
			}
			function compareData(nObj, oObj ) {
				var ret = false,key;
				for (key in nObj) {
					if(nObj.hasOwnProperty(key) && nObj[key] != oObj[key]) {
						ret = true;
						break;
					}
				}
				return ret;
			}
			function checkUpdates () {
				var stat = true;
				$("#FormError",frmtb).hide();
				if(o.checkOnUpdate) {
					postdata = {};
					getFormData();
					diff = compareData(postdata,o._savedData);
					if(diff) {
						$(frmgr).data("disabled",true);
						$(".confirm",themodalSelector).show();
						stat = false;
					}
				}
				return stat;
			}
			function restoreInline() {
				var editingInfo = jgrid.detectRowEditing.call($t, rowid);
				if (editingInfo != null) {
					if (editingInfo.mode === "inlineEditing") {
						$self.jqGrid("restoreRow", rowid);
					} else {
						var savedRowInfo = editingInfo.savedRow, tr = $t.rows[savedRowInfo.id];
						$self.jqGrid("restoreCell", savedRowInfo.id, savedRowInfo.ic);
						// remove highlighting of the cell
						$(tr.cells[savedRowInfo.ic]).removeClass("edit-cell ui-state-highlight");
						$(tr).addClass("ui-state-highlight").attr({"aria-selected":"true", "tabindex" : "0"});
					}
				}
			}
			function updateNav(cr, posarr){
				var totr = posarr[1].length-1;
				if (cr===0) {
					$("#pData",frmtb2).addClass('ui-state-disabled');
				} else if( posarr[1][cr-1] !== undefined && $("#"+jqID(posarr[1][cr-1])).hasClass('ui-state-disabled')) {
						$("#pData",frmtb2).addClass('ui-state-disabled');
				} else {
					$("#pData",frmtb2).removeClass('ui-state-disabled');
				}
				
				if (cr===totr) {
					$("#nData",frmtb2).addClass('ui-state-disabled');
				} else if( posarr[1][cr+1] !== undefined && $("#"+jqID(posarr[1][cr+1])).hasClass('ui-state-disabled')) {
					$("#nData",frmtb2).addClass('ui-state-disabled');
				} else {
					$("#nData",frmtb2).removeClass('ui-state-disabled');
				}
			}
			function getCurrPos() {
				var rowsInGrid = $self.jqGrid("getDataIDs"),
				selrow = $("#id_g",frmtb).val(),
				pos = $.inArray(selrow,rowsInGrid);
				return [pos,rowsInGrid];
			}

			var dh = isNaN(o.dataheight) ? o.dataheight : o.dataheight+"px",
			dw = isNaN(o.datawidth) ? o.datawidth : o.datawidth+"px",
			frm = $("<form name='FormPost' id='"+frmgrID+"' class='FormGrid' onSubmit='return false;' style='width:"+dw+";overflow:auto;position:relative;height:"+dh+";'></form>").data("disabled",false),
			tbl = $("<table id='"+frmtborg+"' class='EditTable'"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+"><tbody></tbody></table>");
			$(p.colModel).each( function() {
				var fmto = this.formoptions;
				maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0 );
				maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0 );
			});
			$(frm).append(tbl);
			var flr = $("<tr id='FormError' style='display:none'><td class='ui-state-error' colspan='"+(maxCols*2)+"'></td></tr>");
			flr[0].rp = 0;
			$(tbl).append(flr);
			//topinfo
			flr = $("<tr style='display:none' class='tinfo'><td class='topinfo' colspan='"+(maxCols*2)+"'>"+o.topinfo+"</td></tr>");
			flr[0].rp = 0;
			$(tbl).append(flr);
			if (!editFeedback("beforeInitData", frm, frmoper)) {return;}
			restoreInline();
			// set the id.
			// use carefull only to change here colproperties.
			// create data
			var rtlb = p.direction === "rtl" ? true :false,
			bp = rtlb ? "nData" : "pData",
			bn = rtlb ? "pData" : "nData";
			createData(rowid,tbl,maxCols);
			// buttons at footer
			var bP = "<a id='"+bp+"' class='fm-button ui-state-default ui-corner-left'><span class='" + mergeCssClasses(commonIconClass, o.prevIcon) + "'></span></a>",
			bN = "<a id='"+bn+"' class='fm-button ui-state-default ui-corner-right'><span class='" + mergeCssClasses(commonIconClass, o.nextIcon) + "'></span></a>",
			bS  ="<a id='sData' class='fm-button ui-state-default ui-corner-all'><span class='fm-button-text'>"+o.bSubmit+"</span></a>",
			bC  ="<a id='cData' class='fm-button ui-state-default ui-corner-all'><span class='fm-button-text'>"+o.bCancel+"</span></a>";
			var bt = "<table"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+" class='EditTable' id='"+frmtborg+"_2'><tbody><tr><td colspan='2'><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr id='Act_Buttons'><td class='navButton navButton-" + p.direction + "'>"+(rtlb ? bN+bP : bP+bN)+"</td><td class='EditButton EditButton-" + p.direction + "'>"+bS+"&#160;"+bC+"</td></tr>";
			bt += "<tr style='display:none' class='binfo'><td class='bottominfo' colspan='2'>"+o.bottominfo+"</td></tr>";
			bt += "</tbody></table>";
			if(maxRows >  0) {
				var sd=[];
				$.each($(tbl)[0].rows,function(i,r){
					sd[i] = r;
				});
				sd.sort(function(a,b){
					if(a.rp > b.rp) {return 1;}
					if(a.rp < b.rp) {return -1;}
					return 0;
				});
				$.each(sd, function(index, row) {
					$('tbody',tbl).append(row);
				});
			}
			o.gbox = gboxSelector;
			var cle = false;
			if(o.closeOnEscape===true){
				o.closeOnEscape = false;
				cle = true;
			}
			var tms = $("<div></div>").append(frm).append(bt);
			createModal.call($t, ids,tms, o ,p.gView,$(gboxSelector)[0]);
			if(o.topinfo) {$(".tinfo",frmtb).show();}
			if(o.bottominfo) {$(".binfo",frmtb2).show();}
			tms = null;bt=null;
			$(themodalSelector).keydown( function( e ) {
				var wkey = e.target;
				if ($(frmgr).data("disabled")===true ) {return false;}//??
				if(o.savekey[0] === true && e.which === o.savekey[1]) { // save
					if(wkey.tagName !== "TEXTAREA") {
						$("#sData", frmtb2).trigger("click");
						return false;
					}
				}
				if(e.which === 27) {
					if(!checkUpdates()) {return false;}
					if(cle)	{hideModal(themodalSelector,{gb:o.gbox,jqm:o.jqModal, onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});}
					return false;
				}
				if(o.navkeys[0]===true) {
					if($("#id_g",frmtb).val() === "_empty") {return true;}
					if(e.which === o.navkeys[1]){ //up
						$("#pData", frmtb2).trigger("click");
						return false;
					}
					if(e.which === o.navkeys[2]){ //down
						$("#nData", frmtb2).trigger("click");
						return false;
					}
				}
			});
			if(o.checkOnUpdate) {
				$("a.ui-jqdialog-titlebar-close span",themodalSelector).removeClass("jqmClose");
				$("a.ui-jqdialog-titlebar-close",themodalSelector).unbind("click")
				.click(function(){
					if(!checkUpdates()) {return false;}
					hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});
					return false;
				});
			}
			addFormIcon($("#sData",frmtb2), o.saveicon, commonIconClass);
			addFormIcon($("#cData",frmtb2), o.closeicon, commonIconClass);
			if(o.checkOnSubmit || o.checkOnUpdate) {
				bS  ="<a id='sNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+o.bYes+"</a>";
				bN  ="<a id='nNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+o.bNo+"</a>";
				bC  ="<a id='cNew' class='fm-button ui-state-default ui-corner-all' style='z-index:1002'>"+o.bExit+"</a>";
				var zI = o.zIndex  || 999;zI ++;
				$("<div class='"+ o.overlayClass+" jqgrid-overlay confirm' style='z-index:"+zI+";display:none;'>&#160;"+"</div><div class='confirm ui-widget-content ui-jqconfirm' style='z-index:"+(zI+1)+"'>"+o.saveData+"<br/><br/>"+bS+bN+bC+"</div>").insertAfter(frmgr);
				$("#sNew",themodalSelector).click(function(){
					// if the form will be hidden at the first usage and it will be shown at the next usage
					// then the execution context click handler and all other functions like postIt()
					// will contains the variables (like rowid, postdata and so on) from THE FIRST call
					// of editGridRow. One should be very careful in the code of postIt()
					postIt();
					$(frmgr).data("disabled",false);
					$(".confirm",themodalSelector).hide();
					return false;
				});
				$("#nNew",themodalSelector).click(function(){
					$(".confirm",themodalSelector).hide();
					$(frmgr).data("disabled",false);
					setTimeout(function(){$(":input:visible",frmgr)[0].focus();},0);
					return false;
				});
				$("#cNew",themodalSelector).click(function(){
					// if the form will be hidden at the first usage and it will be shown at the next usage
					// then the execution context click handler and all other functions like postIt()
					// will contains the variables (like o) from THE FIRST call
					$(".confirm",themodalSelector).hide();
					$(frmgr).data("disabled",false);
					hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});
					return false;
				});
			}
			// here initform - only once
			editFeedback("onInitializeForm", $(frmgr), frmoper);
			if(rowid==="_empty" || !o.viewPagerButtons) {$("#pData,#nData",frmtb2).hide();} else {$("#pData,#nData",frmtb2).show();}
			editFeedback("beforeShowForm", $(frmgr), frmoper);
			$(themodalSelector).data("onClose",o.onClose);
			viewModal(themodalSelector,{
				gbox:gboxSelector,
				jqm:o.jqModal, 
				overlay: o.overlay,
				modal:o.modal, 
				overlayClass: o.overlayClass,
				onHide :  function(h) {
					savePositionOnHide.call($self, "formProp", frmgr, h);
				}
			});
			if(!closeovrl) {
				$("." + jqID(o.overlayClass)).click(function(){
					if(!checkUpdates()) {return false;}
					hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});
					return false;
				});
			}
			$(".fm-button",themodalSelector).hover(
				function(){$(this).addClass('ui-state-hover');},
				function(){$(this).removeClass('ui-state-hover');}
			);
			$("#sData", frmtb2).click(function(){
				postdata = {};
				$("#FormError",frmtb).hide();
				// all depend on ret array
				//ret[0] - succes
				//ret[1] - msg if not succes
				//ret[2] - the id  that will be set if reload after submit false
				getFormData();
				if(postdata[gID+"_id"] === "_empty")	{postIt();}
				else if(o.checkOnSubmit===true ) {
					diff = compareData(postdata,o._savedData);
					if(diff) {
						$(frmgr).data("disabled",true);
						$(".confirm",themodalSelector).show();
					} else {
						postIt();
					}
				} else {
					postIt();
				}
				return false;
			});
			$("#cData", frmtb2).click(function(){
				if(!checkUpdates()) {return false;}
				hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal,onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});
				return false;
			});
			$("#nData", frmtb2).click(function(){
				if(!checkUpdates()) {return false;}
				$("#FormError",frmtb).hide();
				var npos = getCurrPos();
				npos[0] = parseInt(npos[0],10);
				if(npos[0] !== -1 && npos[1][npos[0]+1]) {
					if (!editFeedback("onclickPgButtons", 'next', $(frmgr), npos[1][npos[0]])) {return false;}
					fillData(npos[1][npos[0]+1],frmgr);
					$self.jqGrid("setSelection",npos[1][npos[0]+1]);
					editFeedback("afterclickPgButtons", 'next', $(frmgr), npos[1][npos[0]+1]);
					updateNav(npos[0]+1,npos);
				}
				return false;
			});
			$("#pData", frmtb2).click(function(){
				if(!checkUpdates()) {return false;}
				$("#FormError",frmtb).hide();
				var ppos = getCurrPos();
				if(ppos[0] !== -1 && ppos[1][ppos[0]-1]) {
					if (!editFeedback("onclickPgButtons", 'prev', $(frmgr), ppos[1][ppos[0]])) {return false;}
					if ($("#"+jqID(ppos[1][ppos[0]-1])).hasClass('ui-state-disabled')) {return false;}
					fillData(ppos[1][ppos[0]-1],frmgr);
					$self.jqGrid("setSelection",ppos[1][ppos[0]-1]);
					editFeedback("afterclickPgButtons", 'prev', $(frmgr), ppos[1][ppos[0]-1]);
					updateNav(ppos[0]-1,ppos);
				}
				return false;
			});
			editFeedback("afterShowForm", $(frmgr), frmoper);
			var posInit = getCurrPos();
			updateNav(posInit[0],posInit);
		});
	},
	viewGridRow : function(rowid, oMuligrid){
		return this.each(function(){
			var $t = this, $self = $($t), p = $t.p;
			if (!$t.grid || p == null || !rowid) {return;}
			// make new copy of the options oMuligrid and use it for ONE specific grid.
			// p.formViewing can contains grid specific options
			// we will don't modify the input options oMuligrid
			var gID = p.id,
			o = $.extend(true, {
				top : 0,
				left: 0,
				width: 0,
				datawidth: 'auto',
				height: 'auto',
				dataheight: 'auto',
				modal: false,
				overlay: 30,
				drag: true,
				resize: true,
				jqModal: true,
				closeOnEscape : false,
				labelswidth: '30%',
				navkeys: [false,38,40],
				onClose: null,
				beforeShowForm : null,
				beforeInitData : null,
				viewPagerButtons : true,
				recreateForm : false,
				removemodal: true,
				form: 'view'
			},
			$self.jqGrid("getGridRes", "view"),
			jgrid.view || {},
			p.formViewing || {},
			oMuligrid || {});

			var frmgr = "#ViewGrid_"+jqID(gID), frmtb = "#ViewTbl_" + jqID(gID), frmtb2 = frmtb+"_2",
			frmgrID = "ViewGrid_"+gID, frmtbID = "ViewTbl_"+gID, commonIconClass = o.commonIconClass,
			ids = {themodal:'viewmod'+gID,modalhead:'viewhd'+gID,modalcontent:'viewcnt'+gID, resizeAlso : frmgrID},
			themodalSelector = "#"+jqID(ids.themodal), gboxSelector = p.gBox,
			maxCols = 1, maxRows = 0,
			viewFeedback = function () {
				var args = $.makeArray(arguments);
				args.unshift("");
				args.unshift("View");
				args.unshift(o);
				return feedback.apply($t, args);
			};
			if(!o.recreateForm) {
				if( $self.data("viewProp") ) {
					$.extend(o, $self.data("viewProp"));
				}
			}
			function focusaref(){ //Sfari 3 issues
				if(o.closeOnEscape===true || o.navkeys[0]===true) {
					setTimeout(function(){$(".ui-jqdialog-titlebar-close","#"+jqID(ids.modalhead)).attr("tabindex", "-1").focus();},0);
				}
			}
			function createData(rowid,tb,maxcols){
				var nm, hc,trdata, cnt=0,tmp, dc, retpos=[], ind = $self.jqGrid("getInd",rowid), i,
				tdtmpl = "<td class='CaptionTD form-view-label ui-widget-content' width='"+o.labelswidth+"'></td><td class='DataTD form-view-data ui-helper-reset ui-widget-content'></td>", tmpl="",
				tdtmpl2 = "<td class='CaptionTD form-view-label ui-widget-content'></td><td class='DataTD form-view-data ui-widget-content'></td>",
				fmtnum = ['integer','number','currency'], max1=0, max2=0, maxw, setme, viewfld;
				for (i=1;i<=maxcols;i++) {
					tmpl += i === 1 ? tdtmpl : tdtmpl2;
				}
				// find max number align rigth with property formatter
				$(p.colModel).each( function() {
					var cm = this;
					if(cm.editrules && cm.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = cm.hidden === true ? true : false;
					}
					if(!hc && cm.align==='right') {
						if(cm.formatter && $.inArray(cm.formatter,fmtnum) !== -1 ) {
							max1 = Math.max(max1,parseInt(cm.width,10));
						} else {
							max2 = Math.max(max2,parseInt(cm.width,10));
						}
					}
				});
				maxw  = max1 !==0 ? max1 : max2 !==0 ? max2 : 0;
				$(p.colModel).each( function(i) {
					var $td, cm = this;
					nm = cm.name;
					setme = false;
					// hidden fields are included in the form
					if(cm.editrules && cm.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = cm.hidden === true ? true : false;
					}
					dc = hc ? "style='display:none'" : "";
					viewfld = (typeof cm.viewable !== 'boolean') ? true : cm.viewable;
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn' && viewfld) {
						if(ind === false) {
							tmp = "";
						} else {
							$td = $("td:eq("+i+")",$t.rows[ind]);
							if(nm === p.ExpandColumn && p.treeGrid === true) {
								tmp = $td.text();
							} else {
								tmp = cm.autoResizable && $td.length > 0 && $($td[0].firstChild).hasClass(p.autoResizableWrapperClassName) ?
									$($td[0].firstChild).html() :
									$td.html();
							}
						}
						setme = cm.align === 'right' && maxw !==0 ? true : false;
						var frmopt = $.extend({},{rowabove:false,rowcontent:''}, cm.formoptions || {}),
						rp = parseInt(frmopt.rowpos,10) || cnt+1,
						cp = parseInt((parseInt(frmopt.colpos,10) || 1)*2,10);
						if(frmopt.rowabove) {
							var newdata = $("<tr><td class='contentinfo' colspan='"+(maxcols*2)+"'>"+frmopt.rowcontent+"</td></tr>");
							$(tb).append(newdata);
							newdata[0].rp = rp;
						}
						trdata = $(tb).find("tr[rowpos="+rp+"]");
						if ( trdata.length===0 ) {
							trdata = $("<tr "+dc+" rowpos='"+rp+"'></tr>").addClass("FormData").attr("id","trv_"+nm);
							$(trdata).append(tmpl);
							$(tb).append(trdata);
							trdata[0].rp = rp;
						}
					    var labelText = (frmopt.label === undefined ? p.colNames[i] : frmopt.label);
						$("td:eq("+(cp-2)+")",trdata[0]).html('<b>'+ (labelText || "&nbsp;")+'</b>');
						$("td:eq("+(cp-1)+")",trdata[0]).html("<span>"+(tmp || "&nbsp;")+"</span>").attr("id","v_"+nm);
						if(setme){
							$("td:eq("+(cp-1)+") span",trdata[0]).css({'text-align':'right',width:maxw+"px"});
						}
						retpos[cnt] = i;
						cnt++;
					}
				});
				if( cnt > 0) {
					var idrow = $("<tr class='FormData' style='display:none'><td class='CaptionTD'></td><td colspan='"+ (maxcols*2-1)+"' class='DataTD'><input class='FormElement' id='id_g' type='text' name='id' value='"+rowid+"'/></td></tr>");
					idrow[0].rp = cnt+99;
					$(tb).append(idrow);
				}
				return retpos;
			}
			function fillData(rowid){
				var nm, hc,cnt=0,tmp,trv = $self.jqGrid("getInd",rowid,true), cm;
				if(!trv) {return;}
				$('td',trv).each( function(i) {
					cm = p.colModel[i];
					nm = cm.name;
					// hidden fields are included in the form
					if(cm.editrules && cm.editrules.edithidden === true) {
						hc = false;
					} else {
						hc = cm.hidden === true ? true : false;
					}
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
						if(nm === p.ExpandColumn && p.treeGrid === true) {
							tmp = $(this).text();
						} else {
							tmp = cm.autoResizable && $(this.firstChild).hasClass(p.autoResizableWrapperClassName) ?
								$(this.firstChild).html() :
								$(this).html();
						}
						nm = jqID("v_"+nm);
						$("#"+nm+" span",frmtb).html(tmp);
						if (hc) {$("#"+nm,frmtb).parents("tr:first").hide();}
						cnt++;
					}
				});
				if(cnt>0) {$("#id_g",frmtb).val(rowid);}
			}
			function updateNav(cr,posarr){
				var totr = posarr[1].length-1;
				if (cr===0) {
					$("#pData",frmtb2).addClass('ui-state-disabled');
				} else if( posarr[1][cr-1] !== undefined && $("#"+jqID(posarr[1][cr-1])).hasClass('ui-state-disabled')) {
					$("#pData",frmtb2).addClass('ui-state-disabled');
				} else {
					$("#pData",frmtb2).removeClass('ui-state-disabled');
				}
				if (cr===totr) {
					$("#nData",frmtb2).addClass('ui-state-disabled');
				} else if( posarr[1][cr+1] !== undefined && $("#"+jqID(posarr[1][cr+1])).hasClass('ui-state-disabled')) {
					$("#nData",frmtb2).addClass('ui-state-disabled');
				} else {
					$("#nData",frmtb2).removeClass('ui-state-disabled');
				}
			}
			function getCurrPos() {
				var rowsInGrid = $self.jqGrid("getDataIDs"),
				selrow = $("#id_g",frmtb).val(),
				pos = $.inArray(selrow,rowsInGrid);
				return [pos,rowsInGrid];
			}

			var dh = isNaN(o.dataheight) ? o.dataheight : o.dataheight+"px",
			dw = isNaN(o.datawidth) ? o.datawidth : o.datawidth+"px",
			frm = $("<form name='FormPost' id='"+frmgrID+"' class='FormGrid' style='width:"+dw+";overflow:auto;position:relative;height:"+dh+";'></form>"),
			tbl =$("<table id='"+frmtbID+"' class='EditTable' cellspacing='1' cellpadding='2' border='0' style='table-layout:fixed'><tbody></tbody></table>");
			$(p.colModel).each( function() {
				var fmto = this.formoptions;
				maxCols = Math.max(maxCols, fmto ? fmto.colpos || 0 : 0 );
				maxRows = Math.max(maxRows, fmto ? fmto.rowpos || 0 : 0 );
			});
			// set the id.
			frm.append(tbl);
			if (!viewFeedback("beforeInitData", frm)) {return;}
			createData(rowid, tbl, maxCols);
			var rtlb = p.direction === "rtl" ? true :false,
			bp = rtlb ? "nData" : "pData",
			bn = rtlb ? "pData" : "nData",
				// buttons at footer
			bP = "<a id='"+bp+"' class='fm-button ui-state-default ui-corner-left'><span class='fm-button-icon " + mergeCssClasses(commonIconClass, o.prevIcon) + "'></span></a>",
			bN = "<a id='"+bn+"' class='fm-button ui-state-default ui-corner-right'><span class='fm-button-icon " + mergeCssClasses(commonIconClass, o.nextIcon) + "'></span></a>",
			bC  ="<a id='cData' class='fm-button ui-state-default ui-corner-all'><span class='fm-button-text'>"+o.bClose+"</span></a>";
			if(maxRows >  0) {
				var sd=[];
				$.each($(tbl)[0].rows,function(i,r){
					sd[i] = r;
				});
				sd.sort(function(a,b){
					if(a.rp > b.rp) {return 1;}
					if(a.rp < b.rp) {return -1;}
					return 0;
				});
				$.each(sd, function(index, row) {
					$('tbody',tbl).append(row);
				});
			}
			o.gbox = gboxSelector;
			var bt = $("<div></div>").append(frm).append("<table border='0' class='EditTable' id='"+frmtbID+"_2'><tbody><tr id='Act_Buttons'><td class='navButton navButton-" + p.direction + "' width='"+(o.labelswidth || "auto")+"'>"+(rtlb ? bN+bP : bP+bN)+"</td><td class='EditButton EditButton-" + p.direction + "'>"+bC+"</td></tr></tbody></table>");
			createModal.call($t,ids,bt,o,p.gView,$(p.gView)[0]);
			if(!o.viewPagerButtons) {$("#pData, #nData",frmtb2).hide();}
			bt = null;
			$(themodalSelector).keydown( function( e ) {
				if(e.which === 27) {
					if(o.closeOnEscape) {hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});}
					return false;
				}
				if(o.navkeys[0]===true) {
					if(e.which === o.navkeys[1]){ //up
						$("#pData", frmtb2).trigger("click");
						return false;
					}
					if(e.which === o.navkeys[2]){ //down
						$("#nData", frmtb2).trigger("click");
						return false;
					}
				}
			});
			addFormIcon($("#cData",frmtb2), o.closeicon, commonIconClass);
			viewFeedback("beforeShowForm", $(frmgr));
			viewModal(themodalSelector,{
				gbox:gboxSelector,
				jqm:o.jqModal,
				overlay: o.overlay, 
				modal:o.modal,
				onHide :  function(h) {
					savePositionOnHide.call($self, "viewProp", frmgr, h);
				}
			});
			$(".fm-button:not(.ui-state-disabled)",frmtb2).hover(
				function(){$(this).addClass('ui-state-hover');},
				function(){$(this).removeClass('ui-state-hover');}
			);
			focusaref();
			$("#cData", frmtb2).click(function(){
				hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: o.removemodal, formprop: !o.recreateForm, form: o.form});
				return false;
			});
			$("#nData", frmtb2).click(function(){
				$("#FormError",frmtb).hide();
				var npos = getCurrPos();
				npos[0] = parseInt(npos[0],10);
				if(npos[0] !== -1 && npos[1][npos[0]+1]) {
					if (!viewFeedback("onclickPgButtons", 'next', $(frmgr), npos[1][npos[0]])) {return false;}
					fillData(npos[1][npos[0]+1]);
					$self.jqGrid("setSelection",npos[1][npos[0]+1]);
					viewFeedback("afterclickPgButtons", 'next', $(frmgr), npos[1][npos[0]+1]);
					updateNav(npos[0]+1,npos);
				}
				focusaref();
				return false;
			});
			$("#pData", frmtb2).click(function(){
				$("#FormError",frmtb).hide();
				var ppos = getCurrPos();
				if(ppos[0] !== -1 && ppos[1][ppos[0]-1]) {
					if (!viewFeedback("onclickPgButtons", 'prev', $(frmgr), ppos[1][ppos[0]])) {return false;}
					fillData(ppos[1][ppos[0]-1]);
					$self.jqGrid("setSelection",ppos[1][ppos[0]-1]);
					viewFeedback("afterclickPgButtons", 'prev', $(frmgr), ppos[1][ppos[0]-1]);
					updateNav(ppos[0]-1,ppos);
				}
				focusaref();
				return false;
			});
			var posInit =getCurrPos();
			updateNav(posInit[0],posInit);
		});
	},
	delGridRow : function(rowids,oMuligrid) {
		return this.each(function(){
			var $t = this, p = $t.p, $self = $($t);
			if (!$t.grid || p == null || !rowids) {return;}
			// make new copy of the options oMuligrid and use it for ONE specific grid.
			// p.formDeleting can contains grid specific options
			// we will don't modify the input options oMuligrid
			var gID = p.id,
			o = $.extend(true, {
				top : 0,
				left: 0,
				width: 240,
				removemodal: true,
				height: 'auto',
				dataheight : 'auto',
				modal: false,
				overlay: 30,
				drag: true,
				resize: true,
				url : '',
				mtype : "POST",
				reloadAfterSubmit: true,
				beforeShowForm: null,
				beforeInitData : null,
				afterShowForm: null,
				beforeSubmit: null,
				onclickSubmit: null,
				afterSubmit: null,
				jqModal : true,
				closeOnEscape : false,
				delData: {},
				onClose : null,
				ajaxDelOptions : {},
				processing : false,
				serializeDelData : null,
				useDataProxy : false
			},
			$self.jqGrid("getGridRes", "del"),
			jgrid.del || {},
			p.formDeleting || {},
			oMuligrid || {});

			var dtblID = "DelTbl_" + gID, dtbl = "#DelTbl_"+jqID(gID), postd, idname, opers, oper,
			ids = {themodal:'delmod'+gID,modalhead:'delhd'+gID,modalcontent:'delcnt'+gID, resizeAlso: dtblID},
		    themodalSelector = "#"+jqID(ids.themodal), gboxSelector = p.gBox, commonIconClass = o.commonIconClass,
			deleteFeedback = function () {
				var args = $.makeArray(arguments);
				args.unshift("");
				args.unshift("Delete");
				args.unshift(o);
				return feedback.apply($t, args);
			};

			if (!$.isArray(rowids)) { rowids = [String(rowids)]; }
			if ( $(themodalSelector)[0] !== undefined ) {
				if (!deleteFeedback("beforeInitData", $(dtbl))) {return;}
				$("#DelData>td",dtbl).text(rowids.join()).data("rowids", rowids);
				$("#DelError",dtbl).hide();
				if( o.processing === true) {
					o.processing=false;
					$("#dData",dtbl).removeClass('ui-state-active');
				}
				deleteFeedback("beforeShowForm", $(dtbl));
				viewModal(themodalSelector,{gbox:gboxSelector,jqm:o.jqModal,jqM: false, overlay: o.overlay, modal:o.modal});
				deleteFeedback("afterShowForm", $(dtbl));
			} else {
				var dh = isNaN(o.dataheight) ? o.dataheight : o.dataheight+"px",
				dw = isNaN(o.datawidth) ? o.datawidth : o.datawidth+"px",
				tbl = "<div id='"+dtblID+"' class='formdata' style='width:"+dw+";overflow:auto;position:relative;height:"+dh+";'>";
				tbl += "<table class='DelTable'><tbody>";
				// error data
				tbl += "<tr id='DelError' style='display:none'><td class='ui-state-error'></td></tr>";
				tbl += "<tr id='DelData' style='display:none'><td >"+rowids.join()+"</td></tr>";
				tbl += "<tr><td class=\"delmsg\" style=\"white-space:pre;\">"+o.msg+"</td></tr><tr><td >&#160;</td></tr>";
				// buttons at footer
				tbl += "</tbody></table></div>";
				var bS  = "<a id='dData' class='fm-button ui-state-default ui-corner-all'><span class='fm-button-text'>"+o.bSubmit+"</span></a>",
				bC  = "<a id='eData' class='fm-button ui-state-default ui-corner-all'><span class='fm-button-text'>"+o.bCancel+"</span></a>";
				tbl += "<table"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+" class='EditTable' id='"+dtblID+"_2'><tbody><tr><td><hr class='ui-widget-content' style='margin:1px'/></td></tr><tr><td class='DelButton EditButton EditButton-" + p.direction + "'>"+bS+"&#160;"+bC+"</td></tr></tbody></table>";
				o.gbox = gboxSelector;
				createModal.call($t,ids,tbl,o,p.gView,$(p.gView)[0]);
				$("#DelData>td",dtbl).data("rowids", rowids);

				if (!deleteFeedback("beforeInitData", $(tbl))) {return;}
				$(".fm-button",dtbl+"_2").hover(
					function(){$(this).addClass('ui-state-hover');},
					function(){$(this).removeClass('ui-state-hover');}
				);
				addFormIcon($("#dData",dtbl+"_2"), o.delicon, commonIconClass);
				addFormIcon($("#eData",dtbl+"_2"), o.cancelicon, commonIconClass);
				$("#dData",dtbl+"_2").click(function(){
					var ret=[true,""], pk, $delData = $("#DelData>td",dtbl),
					postdata = $delData.text(), //the pair is name=val1,val2,...
					formRowIds = $delData.data("rowids"),
					cs = {};
					if( $.isFunction( o.onclickSubmit ) ) {cs = o.onclickSubmit.call($t,o, postdata) || {};}
					if( $.isFunction( o.beforeSubmit ) ) {ret = o.beforeSubmit.call($t,postdata);}
					if(ret[0] && !o.processing) {
						o.processing = true;
						opers = p.prmNames;
						postd = $.extend({},o.delData, cs);
						oper = opers.oper;
						postd[oper] = opers.deloper;
						idname = opers.id;
						postdata = formRowIds;
						if(!postdata.length) { return false; }
						for(pk in postdata) {
							if(postdata.hasOwnProperty(pk)) {
								postdata[pk] = jgrid.stripPref(p.idPrefix, postdata[pk]);
							}
						}
						postd[idname] = postdata.join();
						$(this).addClass('ui-state-active');
						var ajaxOptions = $.extend({
							url: o.url || p.editurl,
							type: o.mtype,
							data: $.isFunction(o.serializeDelData) ? o.serializeDelData.call($t,postd) : postd,
							complete: function (jqXHR, textStatus) {
								var i;
								$("#dData",dtbl+"_2").removeClass('ui-state-active');
								if((jqXHR.status >= 300 && jqXHR.status !== 304) || (jqXHR.status === 0 && jqXHR.readyState === 4)) {
									ret[0] = false;
									if ($.isFunction(o.errorTextFormat)) {
										ret[1] = o.errorTextFormat.call($t,jqXHR);
									} else {
										ret[1] = textStatus + " Status: '" + jqXHR.statusText + "'. Error code: " + jqXHR.status;
									}
								} else {
									// data is posted successful
									// execute aftersubmit with the returned data from server
									if( $.isFunction( o.afterSubmit ) ) {
										ret = o.afterSubmit.call($t,jqXHR,postd);
									}
								}
								if(ret[0] === false) {
									$("#DelError>td",dtbl).html(ret[1]);
									$("#DelError",dtbl).show();
								} else {
									if(o.reloadAfterSubmit && p.datatype !== "local") {
										$self.trigger("reloadGrid");
									} else {
										if(p.treeGrid===true){
												try {$self.jqGrid("delTreeNode",formRowIds[0]);} catch(ignore){}
										} else {
											for(i=0;i<formRowIds.length;i++) {
												$self.jqGrid("delRowData",formRowIds[i]);
											}
										}
									}
									setTimeout(function(){
										deleteFeedback("afterComplete", jqXHR, postdata, $(dtbl));
									}, 500);
								}
								o.processing=false;
								if(ret[0]) {hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: o.removemodal});}
							}
						}, jgrid.ajaxOptions, o.ajaxDelOptions);


						if (!ajaxOptions.url && !o.useDataProxy) {
							if ($.isFunction(p.dataProxy)) {
								o.useDataProxy = true;
							} else {
								ret[0]=false;ret[1] += " "+jgrid.errors.nourl;
							}
						}
						if (ret[0]) {
							if (o.useDataProxy) {
								var dpret = p.dataProxy.call($t, ajaxOptions, "del_"+gID); 
								if(dpret === undefined) {
									dpret = [true, ""];
								}
								if(dpret[0] === false ) {
									ret[0] = false;
									ret[1] = dpret[1] || "Error deleting the selected row!" ;
								} else {
									hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: o.removemodal});
								}
							}
							else {
								if(ajaxOptions.url === "clientArray") {
									postd = ajaxOptions.data;
									ajaxOptions.complete({status:200, statusText:''},'');
								} else {
									$.ajax(ajaxOptions); 
								}
							}
						}
					}

					if(ret[0] === false) {
						$("#DelError>td",dtbl).html(ret[1]);
						$("#DelError",dtbl).show();
					}
					return false;
				});
				$("#eData",dtbl+"_2").click(function(){
					hideModal(themodalSelector,{gb:gboxSelector,jqm:o.jqModal, onClose: o.onClose, removemodal: o.removemodal});
					return false;
				});
				deleteFeedback("beforeShowForm", $(dtbl));
				viewModal(themodalSelector,{gbox:gboxSelector,jqm:o.jqModal, overlay: o.overlay, modal:o.modal});
				deleteFeedback("afterShowForm", $(dtbl));
			}
			if(o.closeOnEscape===true) {
				setTimeout(function(){$(".ui-jqdialog-titlebar-close","#"+jqID(ids.modalhead)).attr("tabindex","-1").focus();},0);
			}
		});
	},
	navGrid : function (elem, oMuligrid, pEdit,pAdd,pDel,pSearch, pView) {
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
		return this.each(function() {
			var $t = this, p = $t.p, $self = $($t);
			if(!$t.grid || p == null || ($t.nav && $(elem).find(".navtable").length > 0)) {
				return; // error or the navigator bar already exists
			}
			// make new copy of the options oMuligrid and use it for ONE specific grid.
			// p.navOptions can contains grid specific options
			// we will don't modify the input options oMuligrid
			var gridId = p.id,
			o = $.extend({
				edit: true,
				add: true,
				del: true,
				search: true,
				refresh: true,
				refreshstate: 'firstpage',
				view: false,
				closeOnEscape : true,
				beforeRefresh : null,
				afterRefresh : null,
				cloneToTop : false,
				alertwidth : 200,
				alertheight : 'auto',
				alerttop: null,
				alertleft: null,
				alertzIndex : null,
				iconsOverText : false
			},
			$self.jqGrid("getGridRes", "nav"),
			jgrid.nav || {},
			p.navOptions || {},
			oMuligrid || {});
			// set default position depend of RTL/LTR direction of the grid
			o.position = o.position || (p.direction === "rtl" ? "right" : "left");

			var alertIDs = {themodal: 'alertmod_' + gridId, modalhead: 'alerthd_' + gridId,modalcontent: 'alertcnt_' + gridId},
			twd, tdw, gridIdEscaped = p.idSel, gboxSelector = p.gBox, commonIconClass = o.commonIconClass,
			viewModalAlert = function () {
				viewModal("#"+jqID(alertIDs.themodal),{gbox:gboxSelector,jqm:true});
				$("#jqg_alrt").focus();
			};
			if(!$t.grid) {
				return; // error
			}
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

			if ($("#" + jqID(alertIDs.themodal))[0] === undefined) {
				if(!o.alerttop && !o.alertleft) {
					if (window.innerWidth !== undefined) {
						o.alertleft = window.innerWidth;
						o.alerttop = window.innerHeight;
					} else if (document.documentElement !== undefined && document.documentElement.clientWidth !== undefined && document.documentElement.clientWidth !== 0) {
						o.alertleft = document.documentElement.clientWidth;
						o.alerttop = document.documentElement.clientHeight;
					} else {
						o.alertleft=1024;
						o.alerttop=768;
					}
					o.alertleft = o.alertleft/2 - parseInt(o.alertwidth,10)/2;
					o.alerttop = o.alerttop/2-25;
				}
				createModal.call($t, alertIDs,
					"<div>"+o.alerttext+"</div><span tabindex='0'><span tabindex='-1' id='jqg_alrt'></span></span>",
					{ 
						gbox:gboxSelector,
						jqModal:true,
						drag:true,
						resize:true,
						caption:o.alertcap,
						top:o.alerttop,
						left:o.alertleft,
						width:o.alertwidth,
						height: o.alertheight,
						closeOnEscape:o.closeOnEscape, 
						zIndex: o.alertzIndex,
						removemodal: false
					},
					p.gView,
					$(gboxSelector)[0],
					false
				);
			}
			var clone = 1, i, tbd, navtbl, pgid, elemids,
			sep = "<div class='ui-pg-button ui-state-disabled'><span class='ui-separator'></span></div>",
			onHoverIn = function () {
				if (!$(this).hasClass('ui-state-disabled')) {
					$(this).addClass("ui-state-hover");
				}
			},
			onHoverOut = function () {
				$(this).removeClass("ui-state-hover");
			},
			onAdd = function(){
				if (!$(this).hasClass('ui-state-disabled')) {
					if ($.isFunction( o.addfunc )) {
						o.addfunc.call($t);
					} else {
						$self.jqGrid("editGridRow","new",pAdd);
					}
				}
				return false;
			},
			onEdit = function(){
				if (!$(this).hasClass('ui-state-disabled')) {
					var sr = p.selrow;
					if (sr) {
						if($.isFunction( o.editfunc ) ) {
							o.editfunc.call($t, sr);
						} else {
							$self.jqGrid("editGridRow",sr,pEdit);
						}
					} else {
						viewModalAlert();
					}
				}
				return false;
			},
			onView = function(){
				if (!$(this).hasClass('ui-state-disabled')) {
					var sr = p.selrow;
					if (sr) {
						if($.isFunction( o.viewfunc ) ) {
							o.viewfunc.call($t, sr);
						} else {
							$self.jqGrid("viewGridRow",sr,pView);
						}
					} else {
						viewModalAlert();
					}
				}
				return false;
			},
			onDel = function(){
				var dr;
				if (!$(this).hasClass('ui-state-disabled')) {
					if(p.multiselect) {
						dr = p.selarrrow;
						if(dr.length===0) {dr = null;}
					} else {
						dr = p.selrow;
					}
					if(dr){
						if($.isFunction( o.delfunc )){
							o.delfunc.call($t, dr);
						}else{
							$self.jqGrid("delGridRow",dr,pDel);
						}
					} else  {
						viewModalAlert();
					}
				}
				return false;
			},
			onSearch = function(){
				if (!$(this).hasClass('ui-state-disabled')) {
					if($.isFunction( o.searchfunc )) {
						o.searchfunc.call($t, pSearch);
					} else {
						$self.jqGrid("searchGrid",pSearch);
					}
				}
				return false;
			},
			onRefresh = function(){
				if (!$(this).hasClass('ui-state-disabled')) {
					if($.isFunction(o.beforeRefresh)) {o.beforeRefresh.call($t);}
					p.search = false;
					p.resetsearch =  true;
					try {
						if( o.refreshstate !== 'currentfilter') {
							p.postData.filters ="";
							try {
								$("#fbox_"+gridIdEscaped).jqFilter('resetFilter');
							} catch(ignore) {}
							if($.isFunction($t.clearToolbar)) {$t.clearToolbar(false);}
						}
					} catch (ignore) {}
					switch (o.refreshstate) {
						case 'firstpage':
							$self.trigger("reloadGrid", [$.extend({}, o.reloadGridOptions || {}, {page:1})]);
							break;
						case 'current':
						case 'currentfilter':
							$self.trigger("reloadGrid", [$.extend({}, o.reloadGridOptions || {}, {current:true})]);
							break;
					}
					if($.isFunction(o.afterRefresh)) {o.afterRefresh.call($t);}
				}
				return false;
			},
			stdButtonActivation = function (name, id, onClick, navtbl, elemids) {
				var $button = $("<div class='ui-pg-button ui-corner-all'></div>"),
					iconClass = o[name+"icon"], iconText = $.trim(o[name+"text"]);
				$button.append("<div class='ui-pg-div'><span class='" +
					(o.iconsOverText ?
						mergeCssClasses("ui-pg-button-icon-over-text", commonIconClass, iconClass) :
						mergeCssClasses(commonIconClass, iconClass)) +
					"'></span>" +
					(iconText ? "<span class='ui-pg-button-text"+(o.iconsOverText ? " ui-pg-button-icon-over-text" : "") +"'>"+iconText+"</span>" : "")+
					"</div>");
				$(navtbl).append($button);
				$button.attr({"title":o[name+"title"] || "",id : id || name + "_" + elemids})
					.click(onClick)
					.hover(onHoverIn, onHoverOut);
				return $button;
			};
			if(o.cloneToTop && p.toppager) {clone = 2;}
			for(i = 0; i<clone; i++) {
				navtbl = $("<div"+" class='ui-pg-table navtable' style='float:left;table-layout:auto;'></div>");
				if(i===0) {
					pgid = elem;
					elemids = gridId;
					if(pgid === p.toppager) {
						elemids += "_top";
						clone = 1;
					}
				} else {
					pgid = p.toppager;
					elemids = gridId+"_top";
				}
				if(p.direction === "rtl") {$(navtbl).attr("dir","rtl").css("float","right");}
				if (o.add) {
					stdButtonActivation("add", pAdd.id, onAdd, navtbl, elemids);
				}
				if (o.edit) {
					stdButtonActivation("edit", pEdit.id, onEdit, navtbl, elemids);
				}
				if (o.view) {
					stdButtonActivation("view", pView.id, onView, navtbl, elemids);
				}
				if (o.del) {
					stdButtonActivation("del", pDel.id, onDel, navtbl, elemids);
				}
				if(o.add || o.edit || o.del || o.view) {$(navtbl).append(sep);}
				if (o.search) {
					tbd = stdButtonActivation("search", pSearch.id, onSearch, navtbl, elemids);
					if (pSearch.showOnLoad && pSearch.showOnLoad === true) {
						$(tbd,navtbl).click();
					}
				}
				if (o.refresh) {
					stdButtonActivation("refresh", "", onRefresh, navtbl, elemids);
				}
				// TODO use setWidthOfPagerTdWithPager or remove at all and use div structure with wrapping
				tdw = $(".ui-jqgrid>.ui-jqgrid-view").css("font-size") || "11px";
				$('body').append("<div id='testpg2' class='ui-jqgrid ui-widget ui-widget-content' style='font-size:"+tdw+";visibility:hidden;' ></div>");
				twd = $(navtbl).clone().appendTo("#testpg2").width();
				$("#testpg2").remove();
				$(pgid+"_"+o.position,pgid).append(navtbl);
				if(p._nvtd) {
					if(twd > p._nvtd[0] ) {
						$(pgid+"_"+o.position,pgid).width(twd);
						p._nvtd[0] = twd;
					}
					p._nvtd[1] = twd;
				}
				$t.nav = true;
			}
		});
	},
	navButtonAdd : function (elem, oMuligrid) {
		if (typeof elem === "object") {
			oMuligrid = elem;
			elem = undefined;
		}
		return this.each(function() {
			var $t = this, p = $t.p;
			if (!$t.grid)  {return;}
			var o = $.extend({
				caption : "newButton",
				title: '',
				onClickButton: null,
				position : "last",
				cursor : 'pointer',
				iconsOverText : false
			},
			$($t).jqGrid("getGridRes", "nav"),
			jgrid.nav || {},
			p.navOptions || {},
			oMuligrid || {});
			if (elem === undefined) {
				if (p.pager) {
					$($t).jqGrid("navButtonAdd", p.pager, o);
					if (p.toppager) {
						elem = p.toppager;
					} else {
						return;
					}
				} else if (p.toppager) {
					elem = p.toppager;
				}
			}
			if (typeof elem === "string" && elem.indexOf("#") !== 0) {elem = "#"+jqID(elem);}
			var findnav = $(".navtable",elem), commonIconClass = o.commonIconClass;
			if (findnav.length > 0) {
				if (o.id && findnav.find("#" + jqID(o.id)).length > 0)  {return;}
				var tbd = $("<div></div>");
				if (o.buttonicon.toString().toUpperCase() === "NONE") {
					$(tbd).addClass('ui-pg-button ui-corner-all').append("<div class='ui-pg-div'>"+
						(o.caption ? "<span class='ui-pg-button-text" + (o.iconsOverText ? " ui-pg-button-icon-over-text" : "") + "'>"+o.caption+"</span>" : "") +
						"</div>");
				} else {
					$(tbd).addClass('ui-pg-button ui-corner-all').append("<div class='ui-pg-div'>" +
						"<span class='" +
						(o.iconsOverText ?
							mergeCssClasses("ui-pg-button-icon-over-text", commonIconClass, o.buttonicon) :
							mergeCssClasses(commonIconClass, o.buttonicon)) +
						"'></span>"+
						(o.caption ? "<span class='ui-pg-button-text" + (o.iconsOverText ? " ui-pg-button-icon-over-text" : "") + "'>"+o.caption+"</span>" : "") +
						"</div>");
				}
				if (o.id) {$(tbd).attr("id",o.id);}
				if (o.position === 'first' && findnav.children("div.ui-pg-button").length > 0){
					findnav.children("div.ui-pg-button").filter(":first").before(tbd);
				} else {
					findnav.append(tbd);
				}
				$(tbd,findnav)
				.attr("title",o.title  || "")
				.click(function(e){
					if (!$(this).hasClass('ui-state-disabled')) {
						if ($.isFunction(o.onClickButton) ) {o.onClickButton.call($t,o,e);}
					}
					return false;
				})
				.hover(
					function () {
						if (!$(this).hasClass('ui-state-disabled')) {
							$(this).addClass('ui-state-hover');
						}
					},
					function () {$(this).removeClass("ui-state-hover");}
				);
			}
		});
	},
	navSeparatorAdd:function (elem,p) {
		p = $.extend({
			sepclass : "ui-separator",
			sepcontent: '',
			position : "last"
		}, p ||{});
		return this.each(function() {
			if( !this.grid)  {return;}
			if( typeof elem === "string" && elem.indexOf("#") !== 0) {elem = "#"+jqID(elem);}
			var findnav = $(".navtable",elem)[0];
			if(findnav.length > 0) {
				var sep = "<div class='ui-pg-button ui-state-disabled'><span class='"+p.sepclass+"'></span>"+p.sepcontent+"</div>";
				if (p.position === 'first') {
					if ($(">div.ui-pg-button",findnav).length === 0) {
						findnav.append(sep);
					} else {
						$(">div.ui-pg-button", findnav).filter(":first").before(sep);
					}
				} else {
					findnav.append(sep);
				}
			}
		});
	},
	GridToForm : function( rowid, formid ) {
		return this.each(function(){
			var $t = this, i, $field, iField, $fieldi;
			if (!$t.grid) {return;}
			var rowdata = $($t).jqGrid("getRowData",rowid), propOrAttr = $t.p.useProp;
			if (rowdata) {
				for(i in rowdata) {
					if(rowdata.hasOwnProperty(i)) {
						$field = $("[name="+jqID(i)+"]",formid);
						if ($field.is("input:radio") || $field.is("input:checkbox")) {
							for (iField = 0; iField < $field.length; iField++) {
								$fieldi = $($field[iField]);
								$fieldi[propOrAttr]("checked", $fieldi.val() === String(rowdata[i]));
							}
						} else {
						// this is very slow on big table and form.
							$field.val(rowdata[i]);
						}
					}
				}
			}
		});
	},
	FormToGrid : function(rowid, formid, mode, position){
		return this.each(function() {
			var $t = this;
			if(!$t.grid) {return;}
			if(!mode) {mode = 'set';}
			if(!position) {position = 'first';}
			var fields = $(formid).serializeArray();
			var griddata = {};
			$.each(fields, function(i, field){
				griddata[field.name] = field.value;
			});
			if(mode==='add') {$($t).jqGrid("addRowData",rowid,griddata, position);}
			else if(mode==='set') {$($t).jqGrid("setRowData",rowid,griddata);}
		});
	}
});
}(jQuery));
/*jshint eqeqeq:false, eqnull:true */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, continue: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
// Grouping module
(function($){
"use strict";
var jgrid = $.jgrid;
$.extend(jgrid,{
	template : function(format){ //jqgformat
		var args = $.makeArray(arguments).slice(1), j, al = args.length;
		if(format==null) { format = ""; }
		return format.replace(/\{([\w\-]+)(?:\:([\w\.]*)(?:\((.*?)?\))?)?\}/g, function(m,i){
			var nmarr, k;
			if(!isNaN(parseInt(i,10))) {
				return args[parseInt(i,10)];
			}
			for(j=0; j < al;j++) {
				if($.isArray(args[j])) {
					nmarr = args[j];
					k = nmarr.length;
					while(k--) {
						if(i===nmarr[k].nm) {
							return nmarr[k].v;
						}
					}
				}
			}
		});
	}
});
jgrid.extend({
	groupingSetup : function () {
		return this.each(function (){
			var $t = this, i, j, cml, p = $t.p, cm = p.colModel, grp = p.groupingView, emptyFormatter = function(){return '';};
			if(grp !== null && ( (typeof grp === 'object') || $.isFunction(grp) ) ) {
				if(!grp.groupField.length) {
					p.grouping = false;
				} else {
					if (grp.visibiltyOnNextGrouping === undefined) {
						grp.visibiltyOnNextGrouping = [];
					}

					grp.lastvalues=[];
					if(!grp._locgr) {
						grp.groups =[];
					}
					grp.counters =[];
					for(i=0;i<grp.groupField.length;i++) {
						if(!grp.groupOrder[i]) {
							grp.groupOrder[i] = 'asc';
						}
						if(!grp.groupText[i]) {
							grp.groupText[i] = '{0}';
						}
						if( typeof grp.groupColumnShow[i] !== 'boolean') {
							grp.groupColumnShow[i] = true;
						}
						if( typeof grp.groupSummary[i] !== 'boolean') {
							grp.groupSummary[i] = false;
						}
						if( !grp.groupSummaryPos[i]) {
							grp.groupSummaryPos[i] = 'footer';
						}
						if(grp.groupColumnShow[i] === true) {
							grp.visibiltyOnNextGrouping[i] = true;
							$($t).jqGrid('showCol',grp.groupField[i]);
						} else {
							grp.visibiltyOnNextGrouping[i] = $("#"+jgrid.jqID(p.id+"_"+grp.groupField[i])).is(":visible");
							$($t).jqGrid('hideCol',grp.groupField[i]);
						}
					}
					grp.summary =[];
					if(grp.hideFirstGroupCol) {
						grp.formatDisplayField[0] = function (v) { return v;};
					}
					for(j=0, cml = cm.length; j < cml; j++) {
						if(grp.hideFirstGroupCol) {
							if(!cm[j].hidden && grp.groupField[0] === cm[j].name) {
								cm[j].formatter = emptyFormatter;
							}
						}
						if(cm[j].summaryType ) {
							if(cm[j].summaryDivider) {
								grp.summary.push({nm:cm[j].name,st:cm[j].summaryType, v: '', sd:cm[j].summaryDivider, vd:'', sr: cm[j].summaryRound, srt: cm[j].summaryRoundType || 'round'});
							} else {
								grp.summary.push({nm:cm[j].name,st:cm[j].summaryType, v: '', sr: cm[j].summaryRound, srt: cm[j].summaryRoundType || 'round'});
							}
						}
					}
				}
			} else {
				p.grouping = false;
			}
		});
	},
	groupingPrepare : function ( record, irow ) {
		this.each(function(){
			var grp = this.p.groupingView, $t= this, i, newGroup, newCounter,
			grlen = grp.groupField.length, 
			fieldName,
			v,
			displayName,
			displayValue,
			changed = 0,
			buildSummaryValue = function() {
				if ($.isFunction(this.st)) {
					this.v = this.st.call($t, this.v, this.nm, record);
				} else {
					this.v = $($t).jqGrid('groupingCalculations.handler',this.st, this.v, this.nm, this.sr, this.srt, record);
					if(this.st.toLowerCase() === 'avg' && this.sd) {
						this.vd = $($t).jqGrid('groupingCalculations.handler',this.st, this.vd, this.sd, this.sr, this.srt, record);
					}
				}
			};
			for(i=0;i<grlen;i++) {
				fieldName = grp.groupField[i];
				displayName = grp.displayField[i];
				v = record[fieldName];
				displayValue = displayName == null ? null : record[displayName];

				if( displayValue == null ) {
					displayValue = v;
				}
				if( v !== undefined ) {
					newGroup = {idx:i,dataIndex:fieldName,value:v, displayValue: displayValue, startRow: irow, cnt:1, summary : [] };
					if(irow === 0 ) {
						// First record always starts a new group
						grp.groups.push(newGroup);
						grp.lastvalues[i] = v;
						grp.counters[i] = {cnt:1, pos:grp.groups.length-1, summary: $.extend(true,[],grp.summary)};
						$.each(grp.counters[i].summary, buildSummaryValue);
						grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
					} else {
						newCounter = {cnt:1, pos:grp.groups.length, summary: $.extend(true,[],grp.summary)};
						if (typeof v !== "object" && ($.isArray(grp.isInTheSameGroup) && $.isFunction(grp.isInTheSameGroup[i]) ? ! grp.isInTheSameGroup[i].call($t, grp.lastvalues[i], v, i, grp): grp.lastvalues[i] !== v)) {
							// This record is not in same group as previous one
							grp.groups.push(newGroup);
							grp.lastvalues[i] = v;
							changed = 1;
							grp.counters[i] = newCounter;
							$.each(grp.counters[i].summary, buildSummaryValue);
							grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
						} else {
							if (changed === 1) {
								// This group has changed because an earlier group changed.
								grp.groups.push(newGroup);
								grp.lastvalues[i] = v;
								grp.counters[i] = newCounter;
								$.each(grp.counters[i].summary, buildSummaryValue);
								grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
							} else {
								grp.counters[i].cnt += 1;
								grp.groups[grp.counters[i].pos].cnt = grp.counters[i].cnt;
								$.each(grp.counters[i].summary,buildSummaryValue);
								grp.groups[grp.counters[i].pos].summary = grp.counters[i].summary;
							}
						}
					}
				}
			}
			//gdata.push( rData );
		});
		return this;
	},
	groupingToggle : function(hid){
		this.each(function(){
			var $t = this, p = $t.p, jqID = jgrid.jqID,
			grp = p.groupingView,
			strpos = hid.split('_'),
			num = parseInt(strpos[strpos.length-2], 10);
			strpos.splice(strpos.length-2,2);
			var uid = strpos.join("_"),
			minus = grp.minusicon,
			plus = grp.plusicon,
			tar = $("#"+jqID(hid)),
			r = tar.length ? tar[0].nextSibling : null,
			tarspan = $("#"+jqID(hid)+" span."+"tree-wrap-"+p.direction),
			getGroupingLevelFromClass = function (className) {
				var nums = $.map(className.split(" "), function (item) {
					if (item.substring(0, uid.length + 1) === uid + "_") {
						return parseInt(item.substring(uid.length + 1), 10);
					}
				});
				return nums.length > 0 ? nums[0] : undefined;
			},
			itemGroupingLevel,
			showData,
			collapsed = false,
			frz = p.frozenColumns ? p.id+"_frozen" : false,
			tar2 = frz ? $("#"+jqID(hid), "#"+jqID(frz) ) : false,
			r2 = (tar2 && tar2.length) ? tar2[0].nextSibling : null;
			if( tarspan.hasClass(minus) ) {
				// collapse
				while(r) {
					if ($(r).hasClass("jqfoot")) {
						// hide all till the summary row of the same level.
						// don't hide the summary row if grp.showSummaryOnHide === true
						itemGroupingLevel = parseInt($(r).data("jqfootlevel"), 10);
						if ((!grp.showSummaryOnHide && itemGroupingLevel === num) || itemGroupingLevel > num) {
							$(r).hide();
							if(frz) {
								$(r2).hide();
							}
						}
						if (itemGroupingLevel < num) {
							// stop hiding of rows if the footer of parent group are found
							break;
						}
					} else {
						itemGroupingLevel = getGroupingLevelFromClass(r.className);
						if (itemGroupingLevel !== undefined && itemGroupingLevel <= num) {
							// stop hiding of rows if the grouping header of the next group of the same (or higher) level are found
							break;
						}
						$(r).hide();
						if(frz) {
							$(r2).hide();
						}
					}
					r = r.nextSibling;
					if(frz) {
						r2 = r2.nextSibling;
					}
				}
				tarspan.removeClass(minus).addClass(plus);
				collapsed = true;
			} else {
				// expand
				showData = undefined;
				while(r) {
					if ($(r).hasClass("jqfoot")) {
						itemGroupingLevel = parseInt($(r).data("jqfootlevel"), 10);
						if (itemGroupingLevel === num || (grp.showSummaryOnHide && itemGroupingLevel === num + 1)) {
							$(r).show();
							if(frz) {
								$(r2).show();
							}
						}
						if (itemGroupingLevel <= num) {
							break;
						}
					}
					itemGroupingLevel = getGroupingLevelFromClass(r.className);
					if (showData === undefined) {
						showData = itemGroupingLevel === undefined; // if the first row after the opening group is data row then show the data rows
					}
					if (itemGroupingLevel !== undefined) {
						if (itemGroupingLevel <= num) {
							break;// next grouping header of the same lever are found
						}
						if (itemGroupingLevel === num + 1) {
							$(r).show().find(">td>span."+"tree-wrap-"+p.direction).removeClass(minus).addClass(plus);
							if(frz) {
								$(r2).show().find(">td>span."+"tree-wrap-"+p.direction).removeClass(minus).addClass(plus);
							}
						}
					} else if (showData) {
						$(r).show();
						if(frz) {
							$(r2).show();
						}
					}
					r = r.nextSibling;
					if(frz) {
						r2 = r2.nextSibling;
					}
				}
				tarspan.removeClass(plus).addClass(minus);
			}
			$($t).triggerHandler("jqGridGroupingClickGroup", [hid , collapsed]);
			if( $.isFunction(p.onClickGroup)) { p.onClickGroup.call($t, hid , collapsed); }

		});
		return false;
	},
	groupingRender : function (grdata, colspans, page, rn ) {
		return this.each(function(){
			var $t = this, p = $t.p,
			grp = p.groupingView,
			str = "", icon = "", hid, clid, pmrtl = grp.groupCollapse ? grp.plusicon : grp.minusicon, gv, cp=[], len =grp.groupField.length;
			pmrtl += " tree-wrap-"+p.direction; 
			$.each(p.colModel, function (i,n){
				var ii;
				for(ii=0;ii<len;ii++) {
					if(grp.groupField[ii] === n.name ) {
						cp[ii] = i;
						break;
					}
				}
			});
			var toEnd = 0;
			function findGroupIdx( ind , offset, grp) {
				var ret = false, i;
				if(offset===0) {
					ret = grp[ind];
				} else {
					var id = grp[ind].idx;
					if(id===0) { 
						ret = grp[ind]; 
					}  else {
						for(i=ind;i >= 0; i--) {
							if(grp[i].idx === id-offset) {
								ret = grp[i];
								break;
							}
						}
					}
				}
				return ret;
			}
			function buildSummaryTd(i, ik, grp, foffset) {
				var fdata = findGroupIdx(i, ik, grp), cm = p.colModel,
				grlen = fdata.cnt, strTd="", k, tmpdata, tplfld,
				processSummary = function () {
						var vv, summary = this;
						if(summary.nm === cm[k].name) {
							tplfld = cm[k].summaryTpl || "{0}";
							if(typeof summary.st === 'string' && summary.st.toLowerCase() === 'avg') {
								if(summary.sd && summary.vd) { 
									summary.v = (summary.v/summary.vd);
								} else if(summary.v && grlen > 0) {
									summary.v = (summary.v/grlen);
								}
							}
							try {
								summary.groupCount = fdata.cnt;
								summary.groupIndex = fdata.dataIndex;
								summary.groupValue = fdata.value;
								vv = $t.formatter('', summary.v, k, summary);
							} catch (ef) {
								vv = summary.v;
							}
							tmpdata= "<td "+$t.formatCol(k,1,'')+">"+jgrid.format(tplfld,vv)+ "</td>";
							return false;
						}
					};
				for(k=foffset; k<colspans;k++) {
					tmpdata = "<td "+$t.formatCol(k,1,'')+">&#160;</td>";
					$.each(fdata.summary, processSummary);
					strTd += tmpdata;
				}
				return strTd;
			}
			var sumreverse = $.makeArray(grp.groupSummary);
			sumreverse.reverse();
			$.each(grp.groups,function(i,n){
				if(grp._locgr) {
					if( !(n.startRow +n.cnt > (page-1)*rn && n.startRow < page*rn)) {
						return true;
					}
				}
				toEnd++;
				clid = p.id+"ghead_"+n.idx;
				hid = clid+"_"+i;
				icon = "<span style='cursor:pointer;' class='" + grp.commonIconClass + " "+pmrtl+"' onclick=\"jQuery('#"+jgrid.jqID(p.id).replace("\\", "\\\\")+"').jqGrid('groupingToggle','"+hid+"');return false;\"></span>";
				try {
					if ($.isArray(grp.formatDisplayField) && $.isFunction(grp.formatDisplayField[n.idx])) {
						n.displayValue = grp.formatDisplayField[n.idx].call($t, n.displayValue, n.value, p.colModel[cp[n.idx]], n.idx, grp);
						gv = n.displayValue;
					} else {
						gv = $t.formatter(hid, n.displayValue, cp[n.idx], n.value );
					}
				} catch (egv) {
					gv = n.displayValue;
				}
				str += "<tr id=\""+hid+"\"" +(grp.groupCollapse && n.idx>0 ? " style=\"display:none;\" " : " ") + "role=\"row\" class=\"ui-widget-content jqgroup ui-row-"+p.direction+" "+clid+"\"><td style=\"padding-left:"+(n.idx * 12) + "px;"+"\"";
				var grpTextStr = $.isFunction(grp.groupText[n.idx]) ?
						grp.groupText[n.idx].call($t, gv, n.cnt, n.summary) :
						jgrid.template(grp.groupText[n.idx], gv, n.cnt, n.summary);
				if(typeof grpTextStr !== "string" && typeof grpTextStr !== "number") {
					grpTextStr = gv;
				}
				if(grp.groupSummaryPos[n.idx] === 'header')  {
					var mul = p.multiselect ? " colspan=\"2\"" : "";
					str += mul +">"+icon+grpTextStr+"</td>";
					str += buildSummaryTd(i, 0, grp.groups, grp.groupColumnShow[n.idx] === false ? (mul ==="" ? 2 : 3) : ((mul ==="") ? 1 : 2) );
				} else {
					str += " colspan=\""+(grp.groupColumnShow[n.idx] === false ? colspans-1 : colspans)+"\"" +
						">"+icon+grpTextStr+"</td>";
				}
				str += "</tr>";
				var leaf = len-1 === n.idx; 
				if( leaf ) {
					var gg = grp.groups[i+1], kk, ik, offset = 0, sgr = n.startRow,
					end = gg !== undefined ?  gg.startRow : grp.groups[i].startRow + grp.groups[i].cnt;
					if(grp._locgr) {
						offset = (page-1)*rn;
						if(offset > n.startRow) {
							sgr = offset;
						}
					}
					for(kk=sgr;kk<end;kk++) {
						if(!grdata[kk - offset]) { break; }
						str += grdata[kk - offset].join('');
					}
					if(grp.groupSummaryPos[n.idx] !== 'header') {
						var jj, hhdr;
						if (gg !== undefined) {
							for (jj = 0; jj < grp.groupField.length; jj++) {
								if (gg.dataIndex === grp.groupField[jj]) {
									break;
								}
							}
							toEnd = grp.groupField.length - jj;
						}
						for (ik = 0; ik < toEnd; ik++) {
							if(!sumreverse[ik]) { continue; }
							hhdr = "";
							if(grp.groupCollapse && !grp.showSummaryOnHide) {
								hhdr = " style=\"display:none;\"";
							}
							str += "<tr"+hhdr+" data-jqfootlevel=\""+(n.idx-ik)+"\" role=\"row\" class=\"ui-widget-content jqfoot ui-row-"+p.direction+"\">";
							str += buildSummaryTd(i, ik, grp.groups, 0);
							str += "</tr>";
						}
						toEnd = jj;
					}
				}
			});
			$($t.tBodies[0]).append(str);
			// free up memory
			str = null;
		});
	},
	groupingGroupBy : function (name, options ) {
		return this.each(function(){
			var $t = this, p = $t.p;
			if(typeof name === "string") {
				name = [name];
			}
			var grp = p.groupingView;
			p.grouping = true;
			grp._locgr = false;
			//Set default, in case visibilityOnNextGrouping is undefined 
			if (grp.visibiltyOnNextGrouping === undefined) {
				grp.visibiltyOnNextGrouping = [];
			}
			var i;
			// show previous hidden groups if they are hidden and weren't removed yet
			for(i=0;i<grp.groupField.length;i++) {
				if(!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
				$($t).jqGrid('showCol',grp.groupField[i]);
				}
			}
			// set visibility status of current group columns on next grouping
			for(i=0;i<name.length;i++) {
				grp.visibiltyOnNextGrouping[i] = $(p.idSel+"_"+jgrid.jqID(name[i])).is(":visible");
			}
			p.groupingView = $.extend(p.groupingView, options || {});
			grp.groupField = name;
			$($t).trigger("reloadGrid");
		});
	},
	groupingRemove : function (current) {
		return this.each(function(){
			var $t = this, p = $t.p, tbody = $t.tBodies[0];
			if(current === undefined) {
				current = true;
			}
			p.grouping = false;
			if(current===true) {
				var grp = p.groupingView, i;
				// show previous hidden groups if they are hidden and weren't removed yet
				for(i=0;i<grp.groupField.length;i++) {
				if (!grp.groupColumnShow[i] && grp.visibiltyOnNextGrouping[i]) {
						$($t).jqGrid('showCol', grp.groupField);
					}
				}
				$("tr.jqgroup, tr.jqfoot",tbody).remove();
				$("tr.jqgrow:hidden",tbody).show();
			} else {
				$($t).trigger("reloadGrid");
			}
		});
	},
	groupingCalculations : {
		handler: function(fn, v, field, round, roundType, rc) {
			var funcs = {
				sum: function() {
					return parseFloat(v||0) + parseFloat((rc[field]||0));
				},

				min: function() {
					if(v==="") {
						return parseFloat(rc[field]||0);
					}
					return Math.min(parseFloat(v),parseFloat(rc[field]||0));
				},

				max: function() {
					if(v==="") {
						return parseFloat(rc[field]||0);
					}
					return Math.max(parseFloat(v),parseFloat(rc[field]||0));
				},

				count: function() {
					if(v==="") {v=0;}
					if(rc.hasOwnProperty(field)) {
						return v+1;
					}
					return 0;
				},

				avg: function() {
					// the same as sum, but at end we divide it
					// so use sum instead of duplicating the code (?)
					return funcs.sum();
				}
			};

			if(!funcs[fn]) {
				throw ("jqGrid Grouping No such method: " + fn);
			}
			var res = funcs[fn]();

			if (round != null) {
				if (roundType === 'fixed') {
					res = res.toFixed(round);
				} else {
					var mul = Math.pow(10, round);
					res = Math.round(res * mul) / mul;
				}
			}

			return res;
		}	
	}
});
}(jQuery));
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery, xmlJsonClass */
(function($){
/*
 * jqGrid extension for constructing Grid Data from external file
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/ 

"use strict";
    $.jgrid.extend({
        jqGridImport : function(o) {
            o = $.extend({
                imptype : "xml", // xml, json, xmlstring, jsonstring
                impstring: "",
                impurl: "",
                mtype: "GET",
                impData : {},
                xmlGrid :{
                    config : "roots>grid",
                    data: "roots>rows"
                },
                jsonGrid :{
                    config : "grid",
                    data: "data"
                },
                ajaxOptions :{}
            }, o || {});
            return this.each(function(){
                var $t = this;
                var xmlConvert = function (xml,o) {
                    var cnfg = $(o.xmlGrid.config,xml)[0];
                    var xmldata = $(o.xmlGrid.data,xml)[0], jstr, jstr1, key;
                    if(xmlJsonClass.xml2json && $.jgrid.parse) {
                        jstr = xmlJsonClass.xml2json(cnfg," ");
                        jstr = $.jgrid.parse(jstr);
                        for(key in jstr) {
                            if(jstr.hasOwnProperty(key)) {
                                jstr1=jstr[key];
                            }
                        }
                        if (jstr1 !== undefined) {
                            if (xmldata) {
                                // save the datatype
                                var svdatatype = jstr.grid.datatype;
                                jstr.grid.datatype = 'xmlstring';
                                jstr.grid.datastr = xml;
                                $($t).jqGrid(jstr1).jqGrid("setGridParam", { datatype: svdatatype });
                            } else {
                                $($t).jqGrid(jstr1);
                            }
                        }
                    } else {
                        alert("xml2json or parse are not present");
                    }
                };
                var jsonConvert = function (jsonstr,o){
                    if (jsonstr && typeof jsonstr === 'string') {
						var jsonparse = false;
						if($.jgrid.useJSON) {
							$.jgrid.useJSON = false;
							jsonparse = true;
						}
                        var json = $.jgrid.parse(jsonstr);
						if(jsonparse) { $.jgrid.useJSON = true; }
                        var gprm = json[o.jsonGrid.config];
                        var jdata = json[o.jsonGrid.data];
                        if(jdata) {
                            var svdatatype = gprm.datatype;
                            gprm.datatype = 'jsonstring';
                            gprm.datastr = jdata;
                            $($t).jqGrid( gprm ).jqGrid("setGridParam",{datatype:svdatatype});
                        } else {
                            $($t).jqGrid( gprm );
                        }
                    }
                };
                switch (o.imptype){
                    case 'xml':
                        $.ajax($.extend({
                            url:o.impurl,
                            type:o.mtype,
                            data: o.impData,
                            dataType:"xml",
                            complete: function (jqXHR) {
                                if((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
                                    xmlConvert(jqXHR.responseXML,o);
                                    $($t).triggerHandler("jqGridImportComplete", [jqXHR, o]);
                                    if($.isFunction(o.importComplete)) {
                                        o.importComplete(jqXHR);
                                    }
                                }
                            }
                        }, o.ajaxOptions));
                        break;
                    case 'xmlstring' :
                        // we need to make just the conversion and use the same code as xml
                        if(o.impstring && typeof o.impstring === 'string') {
                            var xmld = $.parseXML(o.impstring);
                            if(xmld) {
                                xmlConvert(xmld,o);
                                $($t).triggerHandler("jqGridImportComplete", [xmld, o]);
                                if($.isFunction(o.importComplete)) {
                                    o.importComplete(xmld);
                                }
                                o.impstring = null;
                            }
                        }
                        break;
                    case 'json':
                        $.ajax($.extend({
                            url:o.impurl,
                            type:o.mtype,
                            data: o.impData,
                            dataType:"json",
                            complete: function (jqXHR) {
								try {
									if((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)) {
										jsonConvert(jqXHR.responseText,o );
										$($t).triggerHandler("jqGridImportComplete", [jqXHR, o]);
										if($.isFunction(o.importComplete)) {
											o.importComplete(jqXHR);
										}
									}
								} catch (ignore){}
                            }
                        }, o.ajaxOptions ));
                        break;
                    case 'jsonstring' :
                        if(o.impstring && typeof o.impstring === 'string') {
                            jsonConvert(o.impstring,o );
                            $($t).triggerHandler("jqGridImportComplete", [o.impstring, o]);
                            if($.isFunction(o.importComplete)) {
                                o.importComplete(o.impstring);
                            }
                            o.impstring = null;
                        }
                        break;
                }
            });
        },
        jqGridExport : function(o) {
            o = $.extend({
                exptype : "xmlstring",
                root: "grid",
                ident: "\t"
            }, o || {});
            var ret = null;
            this.each(function () {
                if(!this.grid) { return;}
                var key, gprm = $.extend(true, {},$(this).jqGrid("getGridParam"));
                // we need to check for:
                // 1.multiselect, 2.subgrid  3. treegrid and remove the unneded columns from colNames
                if(gprm.rownumbers) {
                    gprm.colNames.splice(0,1);
                    gprm.colModel.splice(0,1);
                }
                if(gprm.multiselect) {
                    gprm.colNames.splice(0,1);
                    gprm.colModel.splice(0,1);
                }
                if(gprm.subGrid) {
                    gprm.colNames.splice(0,1);
                    gprm.colModel.splice(0,1);
                }
                gprm.knv = null;
                if(gprm.treeGrid) {
                    for (key in gprm.treeReader) {
                        if(gprm.treeReader.hasOwnProperty(key)) {
                            gprm.colNames.splice(gprm.colNames.length-1);
                            gprm.colModel.splice(gprm.colModel.length-1);
                        }
                    }
                }
                switch (o.exptype) {
                    case 'xmlstring' :
                        ret = "<"+o.root+">"+xmlJsonClass.json2xml(gprm,o.ident)+"</"+o.root+">";
                        break;
                    case 'jsonstring' :
                        ret = "{"+ xmlJsonClass.toJson(gprm,o.root,o.ident,false)+"}";
                        if(gprm.postData.filters !== undefined) {
                            ret=ret.replace(/filters":"/,'filters":');
                            ret=ret.replace(/\}\]\}"/,'}]}');
                        }
                        break;
                }
            });
            return ret;
        },
        excelExport : function(o) {
            o = $.extend({
                exptype : "remote",
                url : null,
                oper: "oper",
                tag: "excel",
                exportOptions : {}
            }, o || {});
            return this.each(function(){
                if(!this.grid) { return;}
                var url;
                if(o.exptype === "remote") {
                    var pdata = $.extend({},this.p.postData);
                    pdata[o.oper] = o.tag;
                    var params = jQuery.param(pdata);
                    if(o.url.indexOf("?") !== -1) { url = o.url+"&"+params; }
                    else { url = o.url+"?"+params; }
                    window.location = url;
                }
            });
        }
    });
}(jQuery));
/*jshint eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/**
 * jqGrid extension for manipulating Grid Data
 * Copyright (c) 2008-2014, Tony Tomov, tony@trirand.com
 * Copyright (c) 2014-2015, Oleg Kiriljuk, oleg.kiriljuk@ok-soft-gmbh.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/ 
"use strict";
var jgrid = $.jgrid, fullBoolFeedback = jgrid.fullBoolFeedback,
	getGridRes = jgrid.getMethod("getGridRes"),
	editFeedback = function (o) {
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
		var oMuligrid={}, args = $.makeArray(arguments).slice(1);

		if( $.type(args[0]) === "object" ) {
			oMuligrid = args[0];
		} else {
			if (keys !== undefined) { oMuligrid.keys = keys; }
			if ($.isFunction(oneditfunc)) { oMuligrid.oneditfunc = oneditfunc; }
			if ($.isFunction(successfunc)) { oMuligrid.successfunc = successfunc; }
			if (url !== undefined) { oMuligrid.url = url; }
			if (extraparam !== undefined) { oMuligrid.extraparam = extraparam; }
			if ($.isFunction(aftersavefunc)) { oMuligrid.aftersavefunc = aftersavefunc; }
			if ($.isFunction(errorfunc)) { oMuligrid.errorfunc = errorfunc; }
			if ($.isFunction(afterrestorefunc)) { oMuligrid.afterrestorefunc = afterrestorefunc; }
			if ($.isFunction(beforeEditRow)) { oMuligrid.beforeEditRow = beforeEditRow; }
			// last two not as param, but as object (sorry)
			//if (restoreAfterError !== undefined) { oMuligrid.restoreAfterError = restoreAfterError; }
			//if (mtype !== undefined) { oMuligrid.mtype = mtype || "POST"; }			
		}

		// End compatible
		return this.each(function(){
		    var $t = this, $self = $($t), p = $t.p, nm, tmp, cnt=0, focus=null, svr={}, colModel = p.colModel, cm, opers = p.prmNames;
		    if (!$t.grid ) { return; }
		    var o = $.extend(true, {
		        keys : false,
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
		        focusField : true
		    }, jgrid.inlineEdit, p.inlineEditing || {}, oMuligrid );

		    var ind = $self.jqGrid("getInd",rowid,true);
		    if (ind === false) { return; }
           
		    if (o.extraparam[opers.oper] !== opers.addoper) {
				if (!editFeedback.call($t, o, "beforeEditRow", o, rowid)) { return; }
		    }

			var editable = $(ind).attr("editable") || "0";
			if (editable === "0" && !$(ind).hasClass("not-editable-row")) {
				var editingInfo = jgrid.detectRowEditing.call($t, rowid);
				if (editingInfo != null && editingInfo.mode === "cellEditing") {
					var savedRowInfo = editingInfo.savedRow, tr = $t.rows[savedRowInfo.id];
						$self.jqGrid("restoreCell", savedRowInfo.id, savedRowInfo.ic);
						// remove highlighting of the cell
						$(tr.cells[savedRowInfo.ic]).removeClass("edit-cell ui-state-highlight");
						$(tr).addClass("ui-state-highlight").attr({"aria-selected":"true", "tabindex" : "0"});
				}
				$('td[role="gridcell"]',ind).each( function(i) {
					cm = colModel[i];
					nm = cm.name;
					var treeg = p.treeGrid===true && nm === p.ExpandColumn;
					if(treeg) { tmp = $("span:first",this).html();}
					else {
						try {
							tmp = $.unformat.call($t,this,{rowId:rowid, colModel:cm},i);
						} catch (_) {
							tmp =  ( cm.edittype && cm.edittype === 'textarea' ) ? $(this).text() : $(this).html();
						}
					}
					if ( nm !== 'cb' && nm !== 'subgrid' && nm !== 'rn') {
						if(p.autoencode) { tmp = jgrid.htmlDecode(tmp); }
						svr[nm]=tmp;
						var isEditable = cm.editable;
						if ($.isFunction(isEditable)) {
							isEditable = isEditable.call($t, {
								rowid: rowid,
								iCol: i,
								iRow: ind.rowIndex,
								name: nm,
								cm: cm,
								mode: $(ind).hasClass("jqgrid-new-row") ? "add" : "edit"
							});
						}
						if (isEditable === true) {
							if(focus===null) { focus = i; }
							if (treeg) { $("span:first",this).html(""); }
							else { $(this).html(""); }
							var opt = $.extend({},cm.editoptions || {},{id:rowid+"_"+nm,name:nm,rowId:rowid});
							if(!cm.edittype) { cm.edittype = "text"; }
							if(tmp === "&nbsp;" || tmp === "&#160;" || (tmp.length===1 && tmp.charCodeAt(0)===160) ) {tmp='';}
							var elc = jgrid.createEl.call($t,cm.edittype,opt,tmp,true,$.extend({},jgrid.ajaxOptions,p.ajaxSelectOptions || {}));
							$(elc).addClass("editable");
							if(treeg) { $("span:first",this).append(elc); }
							else { $(this).append(elc); }
							jgrid.bindEv.call($t, elc, opt);
							//Again IE
							if(cm.edittype === "select" && cm.editoptions!==undefined && cm.editoptions.multiple===true  && cm.editoptions.dataUrl===undefined && jgrid.msie) {
								$(elc).width($(elc).width());
							}
							cnt++;
						}
					}
				});
				if(cnt > 0) {
					svr.id = rowid; p.savedRow.push(svr);
					$(ind).attr("editable","1");
					if(o.focusField ) {
						if(typeof o.focusField === 'number' && parseInt(o.focusField,10) <= colModel.length) {
							focus = o.focusField;
						}
						setTimeout(function(){ 
							var fe = $("td:eq("+focus+") :input:visible",ind).not(":disabled"); 
							if(fe.length > 0) {
								fe.focus();
							}
						},0);
					}
					if(o.keys===true) {
						$(ind).bind("keydown",function(e) {
							if (e.keyCode === 27) {
								$self.jqGrid("restoreRow",rowid, o.afterrestorefunc);
								return false;
							}
							if (e.keyCode === 13) {
								var ta = e.target;
								if(ta.tagName === 'TEXTAREA') { return true; }
								$self.jqGrid("saveRow", rowid, o );
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
	    var args = $.makeArray(arguments).slice(1), o = {}, $t = this[0], $self = $($t), p = $t != null ? $t.p : null, frmoper;
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
		var getRes = function (path) { return getGridRes.call($self, path); };
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
			saveui : "enable",
			savetext : getRes("defaults.savetext") || "Saving..."
		}, jgrid.inlineEdit, p.inlineEditing || {}, o);
		// End compatible
		// TODO: add return this.each(function(){....}
		var nm, tmp = {}, tmp2 = {}, postData = {}, editable, fr, cv, ind = $self.jqGrid("getInd",rowid,true),
		errcap = getRes("errors.errcap"), bClose = getRes("edit.bClose"), editMsg = getRes("edit.msg");
		if(ind === false) {return;}
		
		var opers = p.prmNames;
		frmoper = o.extraparam[opers.oper] === opers.addoper ? "add" : "edit";

		if (!editFeedback.call($t, o, "beforeSaveRow", o, rowid, frmoper)) { return; }

		editable = $(ind).attr("editable");
		o.url = o.url || p.editurl;
		if (editable==="1") {
			var cm;
			$('td[role="gridcell"]',ind).each(function(i) {
				cm = p.colModel[i];
				nm = cm.name;
				var isEditable = cm.editable;
				if ($.isFunction(isEditable)) {
					isEditable = isEditable.call($t, {
						rowid: rowid,
						iCol: i,
						iRow: ind.rowIndex,
						name: nm,
						cm: cm,
						mode: $(ind).hasClass("jqgrid-new-row") ? "add" : "edit"
					});
				}
				if ( nm !== 'cb' && nm !== 'subgrid' && isEditable === true && nm !== 'rn' && !$(this).hasClass('not-editable-cell')) {
					switch (cm.edittype) {
						case "checkbox":
							var cbv = ["Yes","No"];
							if(cm.editoptions ) {
								cbv = cm.editoptions.value.split(":");
							}
							tmp[nm]=  $("input",this).is(":checked") ? cbv[0] : cbv[1]; 
							break;
						case 'text':
						case 'password':
						case 'textarea':
						case "button" :
							tmp[nm]=$("input, textarea",this).val();
							break;
						case 'select':
							if(!cm.editoptions.multiple) {
								tmp[nm] = $("select option:selected",this).val();
								tmp2[nm] = $("select option:selected", this).text();
							} else {
								var sel = $("select",this), selectedText = [];
								tmp[nm] = $(sel).val();
								if(tmp[nm]) { tmp[nm]= tmp[nm].join(","); } else { tmp[nm] =""; }
								$("select option:selected",this).each(
									function(i,selected){
										selectedText[i] = $(selected).text();
									}
								);
								tmp2[nm] = selectedText.join(",");
							}
							if(cm.formatter && cm.formatter === 'select') { tmp2={}; }
							break;
						case 'custom' :
							try {
								if(cm.editoptions && $.isFunction(cm.editoptions.custom_value)) {
									tmp[nm] = cm.editoptions.custom_value.call($t, $(".customelement",this),'get');
									if (tmp[nm] === undefined) { throw "e2"; }
								} else { throw "e1"; }
							} catch (e) {
								if (e==="e1") { jgrid.info_dialog.call($t,errcap,"function 'custom_value' "+editMsg.nodefined,bClose); }
								if (e==="e2") { jgrid.info_dialog.call($t,errcap,"function 'custom_value' "+editMsg.novalue,bClose); }
								else { jgrid.info_dialog.call($t,errcap,e.message,bClose); }
							}
							break;
					}
					cv = jgrid.checkValues.call($t,tmp[nm],i);
					if(cv[0] === false) {
						return false;
					}
					if(p.autoencode) { tmp[nm] = jgrid.htmlEncode(tmp[nm]); }
					if (cm.formatter && cm.formatter === "date" && (cm.formatoptions == null || cm.formatoptions.sendFormatted !== true)) {
						// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
						// Floating point separator for example
						tmp[nm] = $.unformat.date.call($t, tmp[nm], cm);
					}
					if(o.url !== 'clientArray' && cm.editoptions && cm.editoptions.NullIfEmpty === true) {
						if(tmp[nm] === "") {
							tmp[nm] = 'null';
						}
					}
				}
			});
			if (cv[0] === false){
				try {
					var tr = $self.jqGrid('getGridRowById', rowid), positions = jgrid.findPos(tr);
					jgrid.info_dialog.call($t,errcap,cv[1],bClose,{left:positions[0],top:positions[1]+$(tr).outerHeight()});
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
			if(tmp) {
				tmp[opers.oper] = opers.editoper;
				if (tmp[idname] === undefined || tmp[idname]==="") {
					tmp[idname] = rowid;
				} else if (ind.id !== p.idPrefix + tmp[idname]) {
					// rename rowid
					var oldid = jgrid.stripPref(p.idPrefix, rowid);
					if (p._index[oldid] !== undefined) {
						p._index[tmp[idname]] = p._index[oldid];
						delete p._index[oldid];
					}
					rowid = p.idPrefix + tmp[idname];
					$(ind).attr("id", rowid);
					if (p.selrow === oldRowId) {
						p.selrow = rowid;
					}
					if ($.isArray(p.selarrrow)) {
						var i = $.inArray(oldRowId, p.selarrrow);
						if (i>=0) {
							p.selarrrow[i] = rowid;
						}
					}
					if (p.multiselect) {
						var newCboxId = "jqg_" + p.id + "_" + rowid;
						$("input.cbox",ind)
							.attr("id", newCboxId)
							.attr("name", newCboxId);
					}
					// TODO: to test the case of frozen columns
				}
				if(p.inlineData === undefined) { p.inlineData ={}; }
				tmp = $.extend({},tmp,p.inlineData,o.extraparam);
			}
			if (o.url === 'clientArray') {
				tmp = $.extend({},tmp, tmp2);
				if(p.autoencode) {
					$.each(tmp,function(n,v){
						tmp[n] = jgrid.htmlDecode(v);
					});
				}
				var k, resp = $self.jqGrid("setRowData",rowid,tmp);
				$(ind).attr("editable","0");
				for(k=0;k<p.savedRow.length;k++) {
					if( String(p.savedRow[k].id) === String(oldRowId)) {fr = k; break;}
				}
				if(fr >= 0) { p.savedRow.splice(fr,1); }
				fullBoolFeedback.call($t, o.aftersavefunc, "jqGridInlineAfterSaveRow", rowid, resp, tmp, o);
				$(ind).removeClass("jqgrid-new-row").unbind("keydown");
			} else {
				$self.jqGrid("progressBar", {method:"show", loadtype : o.saveui, htmlcontent: o.savetext });
				postData = $.extend({},tmp,postData);
				postData[idname] = jgrid.stripPref(p.idPrefix, postData[idname]);

				$.ajax($.extend({
					url:o.url,
					data: jgrid.serializeFeedback.call($t,
							$.isFunction(o.serializeSaveData) ? o.serializeSaveData : p.serializeRowData,
							"jqGridInlineSerializeSaveData",
							postData),
					type: o.mtype,
					complete: function (jqXHR, textStatus) {
						$self.jqGrid("progressBar", {method:"hide", loadtype : o.saveui, htmlcontent: o.savetext});
						// textStatus can be "abort", "timeout", "error", "parsererror" or some text from text part of HTTP error occurs
						// see the answer http://stackoverflow.com/a/3617710/315935 about xhr.readyState === 4 && xhr.status === 0
						if ((jqXHR.status < 300 || jqXHR.status === 304) && (jqXHR.status !== 0 || jqXHR.readyState !== 4)){
							var ret, sucret, j;
							sucret = $self.triggerHandler("jqGridInlineSuccessSaveRow", [jqXHR, rowid, o]);
							if (!$.isArray(sucret)) {sucret = [true, tmp];}
							if (sucret[0] && $.isFunction(o.successfunc)) {sucret = o.successfunc.call($t, jqXHR);}							
							if($.isArray(sucret)) {
								// expect array - status, data, rowid
								ret = sucret[0];
								tmp = sucret[1] || tmp;
							} else {
								ret = sucret;
							}
							if (ret===true) {
								if(p.autoencode) {
									$.each(tmp,function(n,v){
										tmp[n] = jgrid.htmlDecode(v);
									});
								}
								tmp = $.extend({},tmp, tmp2);
								$self.jqGrid("setRowData",rowid,tmp);
								$(ind).attr("editable","0");
								for(j=0;j<p.savedRow.length;j++) {
									if( String(p.savedRow[j].id) === String(rowid)) {fr = j; break;}
								}
								if(fr >= 0) { p.savedRow.splice(fr,1); }
								fullBoolFeedback.call($t, o.aftersavefunc, "jqGridInlineAfterSaveRow", rowid, jqXHR, tmp, o);
								$(ind).removeClass("jqgrid-new-row").unbind("keydown");
							} else {
								fullBoolFeedback.call($t, o.errorfunc, "jqGridInlineErrorSaveRow", rowid, jqXHR, textStatus, null, o);
								if(o.restoreAfterError === true) {
									$self.jqGrid("restoreRow",rowid, o.afterrestorefunc);
								}
							}
						}
					},
					error:function(res,stat,err){
						$("#lui_"+jgrid.jqID(p.id)).hide();
						$self.triggerHandler("jqGridInlineErrorSaveRow", [rowid, res, stat, err, o]);
						if($.isFunction(o.errorfunc) ) {
							o.errorfunc.call($t, rowid, res, stat, err);
						} else {
							var rT = res.responseText || res.statusText;
							try {
								jgrid.info_dialog.call($t,errcap,'<div class="ui-state-error">'+ rT +'</div>', bClose,{buttonalign:'right'});
							} catch(e) {
								alert(rT);
							}
						}
						if(o.restoreAfterError === true) {
							$self.jqGrid("restoreRow",rowid, o.afterrestorefunc);
						}
					}
				}, jgrid.ajaxOptions, p.ajaxRowOptions, o.ajaxSaveOptions || {}));
			}
		}
		return;
	},
	restoreRow : function(rowid, afterrestorefunc) {
		// Compatible mode old versions
		var args = $.makeArray(arguments).slice(1), oMuligrid={};

		if( $.type(args[0]) === "object" ) {
			oMuligrid = args[0];
		} else {
			if ($.isFunction(afterrestorefunc)) { oMuligrid.afterrestorefunc = afterrestorefunc; }
		}

		// End compatible

		return this.each(function(){
			var $t = this, $self = $($t), p = $t.p, fr=-1, ares={}, k;
			if (!$t.grid) { return; }

			var o = $.extend(true, {}, jgrid.inlineEdit, p.inlineEditing || {}, oMuligrid);
			var ind = $self.jqGrid("getInd",rowid,true);
			if (ind === false) { return; }

			if (!editFeedback.call($t, o, "beforeCancelRow", o, rowid)) { return; }

			for(k=0;k<p.savedRow.length;k++) {
				if( String(p.savedRow[k].id) === String(rowid)) {fr = k; break;}
			}
			if(fr >= 0) {
				if($.isFunction($.fn.datepicker)) {
					try {
						$("input.hasDatepicker","#"+jgrid.jqID(ind.id)).datepicker('hide');
					} catch (ignore) {}
				}
				$.each(p.colModel, function(i){
					var isEditable = this.editable, nm = this.name;
					if ($.isFunction(isEditable)) {
						isEditable = isEditable.call($t, {
							rowid: rowid,
							iCol: i,
							iRow: ind.rowIndex,
							name: nm,
							cm: this,
							mode: $(ind).hasClass("jqgrid-new-row") ? "add" : "edit"
						});
					}
					if(isEditable === true && p.savedRow[fr].hasOwnProperty(nm)) {
						ares[nm] = p.savedRow[fr][nm];
						if (this.formatter && this.formatter === "date" && (this.formatoptions == null || this.formatoptions.sendFormatted !== true)) {
							// TODO: call all other predefined formatters!!! Not only formatter: "date" have the problem.
							// Floating point separator for example
							ares[nm] = $.unformat.date.call($t, ares[nm], this);
						}
					}
				});
				$self.jqGrid("setRowData",rowid,ares);
				$(ind).attr("editable","0").unbind("keydown");
				p.savedRow.splice(fr,1);
				if($("#"+jgrid.jqID(rowid), $t).hasClass("jqgrid-new-row")){
					setTimeout(function(){
						$self.jqGrid("delRowData",rowid);
						$self.jqGrid('showAddEditButtons', false);
					},0);
				}
			}
			fullBoolFeedback.call($t, o.afterrestorefunc, "jqGridInlineAfterRestoreRow", rowid);
		});
	},
	addRow : function (oMuligrid) {
		return this.each(function(){
		    if (!this.grid) { return; }

			var $t = this, $self = $($t), p = $t.p,
				o = $.extend(true, {
					rowID : null,
					initdata : {},
					position :"first",
					useDefValues : true,
					useFormatter: false,
					beforeAddRow: null,
					addRowParams : {extraparam:{}}
				}, jgrid.inlineEdit, p.inlineEditing || {}, oMuligrid || {});
			if (!editFeedback.call($t, o, "beforeAddRow", o.addRowParams)) { return; }

			o.rowID = $.isFunction(o.rowID) ? o.rowID.call($t, o) : ( (o.rowID != null) ? o.rowID : jgrid.randId());
			if(o.useDefValues === true) {
				$(p.colModel).each(function(){
					if( this.editoptions && this.editoptions.defaultValue ) {
						var opt = this.editoptions.defaultValue,
						tmp = $.isFunction(opt) ? opt.call($t) : opt;
						o.initdata[this.name] = tmp;
					}
				});
			}
			$self.jqGrid('addRowData', o.rowID, o.initdata, o.position);
			o.rowID = p.idPrefix + o.rowID;
			$("#"+jgrid.jqID(o.rowID), $t).addClass("jqgrid-new-row");
			if(o.useFormatter) {
				$("#"+jgrid.jqID(o.rowID)+" .ui-inline-edit", $t).click();
			} else {
				var opers = p.prmNames,
				oper = opers.oper;
				o.addRowParams.extraparam[oper] = opers.addoper;
				$self.jqGrid('editRow', o.rowID, o.addRowParams);
				$self.jqGrid('setSelection', o.rowID);
			}
		});
	},
	inlineNav : function (elem, oMuligrid) {
		if (typeof elem === "object") {
			// the option pager are skipped
			oMuligrid = elem;
			elem = undefined;
		}
		return this.each(function(){
			var $t = this, $self = $($t), p = $t.p;
			if (!this.grid || p == null) { return; }
			var $elem, gID = elem === p.toppager ? p.idSel + "_top" : p.idSel,
			gid = elem === p.toppager ? p.id + "_top" : p.id,
			o = $.extend(true,{
				edit: true,
				editicon: "ui-icon-pencil",
				add: true,
				addicon:"ui-icon-plus",
				save: true,
				saveicon:"ui-icon-disk",
				cancel: true,
				cancelicon:"ui-icon-cancel",
				commonIconClass : "ui-icon",
				iconsOverText : false,
				addParams : {addRowParams: {extraparam: {}}},
				editParams : {},
				restoreAfterSelect : true
			},
			//TODO make getRes(locales[p.locale], "nav"), jgrid.nav || {}, p.navOptions || {}
			// as the result of working getRes("nav")
			//getRes(locales[p.locale], "nav"),
			$self.jqGrid("getGridRes","nav"),
			jgrid.nav || {},
			p.navOptions || {},
			oMuligrid || {});

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
				$self.jqGrid("navGrid", elem, {add: false, edit: false, del: false, search: false, refresh: false, view: false});
			}

			p._inlinenav = true;
			// detect the formatactions column
			if(o.addParams.useFormatter === true) {
				var cm = p.colModel,i, defaults, ap;
				for (i = 0; i<cm.length; i++) {
					if(cm[i].formatter && cm[i].formatter === "actions" ) {
						if(cm[i].formatoptions) {
							defaults =  {
								keys:false,
								onEdit : null,
								onSuccess: null,
								afterSave:null,
								onError: null,
								afterRestore: null,
								extraparam: {},
								url: null
							};
							ap = $.extend( defaults, cm[i].formatoptions );
							o.addParams.addRowParams = {
								"keys" : ap.keys,
								"oneditfunc" : ap.onEdit,
								"successfunc" : ap.onSuccess,
								"url" : ap.url,
								"extraparam" : ap.extraparam,
								"aftersavefunc" : ap.afterSave,
								"errorfunc": ap.onError,
								"afterrestorefunc" : ap.afterRestore
							};
						}
						break;
					}
				}
			}
			if(o.add) {
				$self.jqGrid('navButtonAdd', elem,{
					caption : o.addtext,
					title : o.addtitle,
					commonIconClass : o.commonIconClass,
					buttonicon : o.addicon,
					iconsOverText: o.iconsOverText,
					id : gid + "_iladd",
					onClickButton : function () {
						$self.jqGrid('addRow', o.addParams);
					}
				});
			}
			if(o.edit) {
				$self.jqGrid('navButtonAdd', elem,{
					caption : o.edittext,
					title : o.edittitle,
					commonIconClass : o.commonIconClass,
					buttonicon : o.editicon,
					iconsOverText: o.iconsOverText,
					id : gid + "_iledit",
					onClickButton : function () {
						var sr = p.selrow;
						if(sr) {
							$self.jqGrid('editRow', sr, o.editParams);
						} else {
							jgrid.viewModal("#alertmod",{gbox:p.gBox,jqm:true});$("#jqg_alrt").focus();							
						}
					}
				});
			}
			if(o.save) {
				$self.jqGrid('navButtonAdd', elem,{
					caption : o.savetext || '',
					title : o.savetitle || 'Save row',
					commonIconClass : o.commonIconClass,
					buttonicon : o.saveicon,
					iconsOverText: o.iconsOverText,
					id : gid + "_ilsave",
					onClickButton : function () {
						var sr = p.savedRow[0].id;
						if(sr) {
							var opers = p.prmNames,
							oper = opers.oper, tmpParams = o.editParams;
							if($("#"+jgrid.jqID(sr), $t ).hasClass("jqgrid-new-row")) {
								o.addParams.addRowParams.extraparam[oper] = opers.addoper;
								tmpParams = o.addParams.addRowParams;
							} else {
								if(!o.editParams.extraparam) {
									o.editParams.extraparam = {};
								}
								o.editParams.extraparam[oper] = opers.editoper;
							}
							$self.jqGrid('saveRow', sr, tmpParams);
						} else {
							jgrid.viewModal("#alertmod",{gbox:p.gBox,jqm:true});$("#jqg_alrt").focus();							
						}
					}
				});
				$(gID + "_ilsave").addClass('ui-state-disabled');
			}
			if(o.cancel) {
				$self.jqGrid('navButtonAdd', elem,{
					caption : o.canceltext || '',
					title : o.canceltitle || 'Cancel row editing',
					commonIconClass : o.commonIconClass,
					buttonicon : o.cancelicon,
					iconsOverText: o.iconsOverText,
					id : gid + "_ilcancel",
					onClickButton : function () {
						var sr = p.savedRow[0].id, cancelPrm = o.editParams;
						if(sr) {
							if($("#"+jgrid.jqID(sr), $t ).hasClass("jqgrid-new-row")) {
								cancelPrm = o.addParams.addRowParams;
							}
							$self.jqGrid('restoreRow', sr, cancelPrm);
						} else {
							jgrid.viewModal("#alertmod",{gbox:p.gBox,jqm:true});$("#jqg_alrt").focus();							
						}
					}
				});
				$(gID + "_ilcancel").addClass('ui-state-disabled');
			}
			if(o.restoreAfterSelect === true) {
				$self.bind("jqGridSelectRow", function (e, rowid) {
					if (p.savedRow.length > 0 && p._inlinenav === true) {
						var editingRowId = p.savedRow[0].id;
						if (rowid !== editingRowId) {
							$self.jqGrid('restoreRow', editingRowId, o.editParams);
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
	showAddEditButtons : function(isEditing, rowid)  {
		return this.each(function(){
			var $t = this;
			if (!$t.grid ) { return; }
			var p = $t.p, gID = p.idSel,
				saveCancel = gID + "_ilsave," + gID + "_ilcancel" + (p.toppager ? "," + gID + "_top_ilsave," + gID + "_top_ilcancel" : ""),
				addEdit = gID + "_iladd," + gID + "_iledit" + (p.toppager ? "," + gID + "_top_iladd," + gID + "_top_iledit" : "");
			$(isEditing ? addEdit : saveCancel).addClass('ui-state-disabled');
			$(isEditing ? saveCancel : addEdit).removeClass('ui-state-disabled');
		});
	}
//end inline edit
});
}(jQuery));
/*jshint evil:true, eqeqeq:false, eqnull:true, devel:true */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/*
**
 * jqGrid addons using jQuery UI 
 * Author: Mark Williams
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
 * depends on jQuery UI 
**/
"use strict";
var jgrid = $.jgrid, $UiMultiselect = $.ui != null ? $.ui.multiselect : null, jqID = jgrid.jqID;
if (jgrid.msie && jgrid.msiever()===8) {
	$.expr[":"].hidden = function(elem) {
		return elem.offsetWidth === 0 || elem.offsetHeight === 0 ||
			elem.style.display === "none";
	};
}
// requiere load multiselect before grid
jgrid._multiselect = false;
if($.ui) {
	if ($UiMultiselect ) {
		if($UiMultiselect.prototype._setSelected) {
			var setSelected = $UiMultiselect.prototype._setSelected;
			$UiMultiselect.prototype._setSelected = function(item,selected) {
				var self = this, ret = setSelected.call(self,item,selected);
				if (selected && self.selectedList) {
					var elt = self.element;
					self.selectedList.find('li').each(function() {
						if ($(self).data('optionLink')) {
							$(self).data('optionLink').remove().appendTo(elt);
						}
					});
				}
				return ret;
			};
		}
		if($UiMultiselect.prototype.destroy) {
			$UiMultiselect.prototype.destroy = function() {
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
}
        
jgrid.extend({
	sortableColumns : function (tblrow)
	{
		return this.each(function (){
			var ts = this, p = ts.p, tid = jqID(p.id);
			function start() {p.disableClick = true;}
			var sortableOpts = {
				"tolerance" : "pointer",
				"axis" : "x",
				"scrollSensitivity": "1",
				"items": '>th:not(:has(#jqgh_'+tid+'_cb'+',#jqgh_'+tid+'_rn'+',#jqgh_'+tid+'_subgrid),:hidden)',
				"placeholder": {
					element: function(item) {
						var el = $(document.createElement(item[0].nodeName))
						.addClass(item[0].className+" ui-sortable-placeholder ui-state-highlight")
						.removeClass("ui-sortable-helper")[0];
						return el;
					},
					update: function(self, o) {
						o.height(self.currentItem.innerHeight() - parseInt(self.currentItem.css('paddingTop')||0, 10) - parseInt(self.currentItem.css('paddingBottom')||0, 10));
						o.width(self.currentItem.innerWidth() - parseInt(self.currentItem.css('paddingLeft')||0, 10) - parseInt(self.currentItem.css('paddingRight')||0, 10));
					}
				},
				"update": function(event, ui) {
					var th = $(">th", $(ui.item).parent()),	colModel = p.colModel, cmMap = {}, tid1 = p.id + "_", permutation = [];
					$.each(colModel, function(i) { cmMap[this.name]=i; });
					th.each(function() {
						var id = $(">div", this).get(0).id.replace(/^jqgh_/, "").replace(tid1,"");
							if (cmMap.hasOwnProperty(id)) {
								permutation.push(cmMap[id]);
							}
					});
	
					$(ts).jqGrid("remapColumns",permutation, true, true);
					if ($.isFunction(p.sortable.update)) {
						p.sortable.update(permutation);
					}
					setTimeout(function(){p.disableClick=false;}, 50);
				}
			};
			if (p.sortable.options) {
				$.extend(sortableOpts, p.sortable.options);
			} else if ($.isFunction(p.sortable)) {
				p.sortable = { "update" : p.sortable };
			}
			if (sortableOpts.start) {
				var s = sortableOpts.start;
				sortableOpts.start = function(e,ui) {
					start();
					s.call(this,e,ui);
				};
			} else {
				sortableOpts.start = start;
			}
			if (p.sortable.exclude) {
				sortableOpts.items += ":not("+p.sortable.exclude+")";
			}
			var $e = tblrow.sortable(sortableOpts), dataObj = $e.data("sortable") || $e.data("uiSortable") || $e.data("ui-sortable");
			if (dataObj != null) {
				dataObj.floating = true;
			}
		});
	},
    columnChooser : function(opts) {
		var $self = this, self = $self[0], p = self.p, selector, select, colMap = {}, fixedCols = [], dopts, mopts, $dialogContent, multiselectData, listHeight,
			colModel = p.colModel, colNames = p.colNames,
			getMultiselectWidgetData = function ($elem) {
				return ($UiMultiselect && $UiMultiselect.prototype && $elem.data($UiMultiselect.prototype.widgetFullName || $UiMultiselect.prototype.widgetName)) ||
					$elem.data("ui-multiselect") || $elem.data("multiselect");
			};

		if ($("#colchooser_" + jqID(p.id)).length) { return; }
		selector = $('<div id="colchooser_'+p.id+'" style="position:relative;overflow:hidden"><div><select multiple="multiple"></select></div></div>');
		select = $('select', selector);

		function insert(perm,i,v) {
			var a, b;
			if(i>=0){
				a = perm.slice();
				b = a.splice(i,Math.max(perm.length-i,i));
				if(i>perm.length) { i = perm.length; }
				a[i] = v;
				return a.concat(b);
			}
			return perm;
		}
		function call(fn, obj) {
			if (!fn) { return; }
			if (typeof fn === 'string') {
				if ($.fn[fn]) {
					$.fn[fn].apply(obj, $.makeArray(arguments).slice(2));
				}
			} else if ($.isFunction(fn)) {
				fn.apply(obj, $.makeArray(arguments).slice(2));
			}
		}

		opts = $.extend({
			width : 400,
			height : 240,
			classname : null,
			done : function(perm) { if (perm) { $self.jqGrid("remapColumns", perm, true); } },
			/* msel is either the name of a ui widget class that
			   extends a multiselect, or a function that supports
			   creating a multiselect object (with no argument,
			   or when passed an object), and destroying it (when
			   passed the string "destroy"). */
			msel : "multiselect",
			/* "msel_opts" : {}, */

			/* dlog is either the name of a ui widget class that 
			   behaves in a dialog-like way, or a function, that
			   supports creating a dialog (when passed dlog_opts)
			   or destroying a dialog (when passed the string
			   "destroy")
			   */
			dlog : "dialog",
			dialog_opts : {
				minWidth: 470,
				dialogClass: "ui-jqdialog"
			},
			/* dlog_opts is either an option object to be passed 
			   to "dlog", or (more likely) a function that creates
			   the options object.
			   The default produces a suitable options object for
			   ui.dialog */
			dlog_opts : function(options) {
				var buttons = {};
				buttons[options.bSubmit] = function() {
					options.apply_perm();
					options.cleanup(false);
				};
				buttons[options.bCancel] = function() {
					options.cleanup(true);
				};
				return $.extend(true, {
					buttons: buttons,
					close: function() {
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
			apply_perm : function() {
				var perm = [];
				$('option',select).each(function() {
					if ($(this).is("[selected]")) {
						$self.jqGrid("showCol", colModel[this.value].name);
					} else {
						$self.jqGrid("hideCol", colModel[this.value].name);
					}
				});
				
				//fixedCols.slice(0);
				$('option[selected]',select).each(function() { perm.push(parseInt(this.value,10)); });
				$.each(perm, function() { delete colMap[colModel[parseInt(this,10)].name]; });
				$.each(colMap, function() {
					var ti = parseInt(this,10);
					perm = insert(perm,ti,ti);
				});
				if (opts.done) {
					opts.done.call($self, perm);
				}
				$self.jqGrid("setGridWidth", p.tblwidth, p.shrinkToFit);
			},
			/* Function to cleanup the dialog, and select. Also calls the
			   done function with no permutation (to indicate that the
			   columnChooser was aborted */
			cleanup : function(calldone) {
				call(opts.dlog, selector, 'destroy');
				call(opts.msel, select, 'destroy');
				selector.remove();
				if (calldone && opts.done) {
					opts.done.call($self);
				}
			},
			msel_opts : {}
		},
		$self.jqGrid("getGridRes", "col"),
		jgrid.col, opts || {});
		if($.ui) {
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
			$(">div",selector).css({width: opts.width,margin:"0 auto"});
			select.css("width", opts.width);
		}
		if (opts.height) {
			$(">div",selector).css("height", opts.height);
			select.css("height", opts.height - 10);
		}

		select.empty();
		$.each(colModel, function(i) {
			colMap[this.name] = i;
			if (this.hidedlg) {
				if (!this.hidden) {
					fixedCols.push(i);
				}
				return;
			}

			select.append("<option value='"+i+"' "+
						  (this.hidden?"":"selected='selected'")+">"+jgrid.stripHtml(colNames[i])+"</option>");
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
	sortableRows : function (opts) {
		// Can accept all sortable options and events
		return this.each(function(){
			var $t = this, grid = $t.grid, p = $t.p;
			if(!grid) { return; }
			// Currently we disable a treeGrid sortable
			if(p.treeGrid) { return; }
			if($.fn.sortable) {
				opts = $.extend({
					"cursor":"move",
					"axis" : "y",
					"items": ">.jqgrow"
					},
				opts || {});
				if(opts.start && $.isFunction(opts.start)) {
					opts._start_ = opts.start;
					delete opts.start;
				} else {opts._start_=false;}
				if(opts.update && $.isFunction(opts.update)) {
					opts._update_ = opts.update;
					delete opts.update;
				} else {opts._update_ = false;}
				opts.start = function(ev,ui) {
					$(ui.item).css("border-width","0");
					$("td",ui.item).each(function(i){
						this.style.width = grid.cols[i].style.width;
					});
					if(p.subGrid) {
						var subgid = $(ui.item).attr("id");
						try {
							$($t).jqGrid('collapseSubGridRow',subgid);
						} catch (ignore) {}
					}
					if(opts._start_) {
						opts._start_.apply(this,[ev,ui]);
					}
				};
				opts.update = function (ev,ui) {
					$(ui.item).css("border-width","");
					if(p.rownumbers === true) {
						$("td.jqgrid-rownum",$t.rows).each(function( i ){
							$(this).html( i+1+(parseInt(p.page,10)-1)*parseInt(p.rowNum,10) );
						});
					}
					if(opts._update_) {
						opts._update_.apply(this,[ev,ui]);
					}
				};
				$("tbody:first",$t).sortable(opts);
				if ($.isFunction($.fn.disableSelection)) {
					// The method disableSelection exists starting with jQuery UI 1.6,
					// but it's declared as deprecated since jQuery UI 1.9
					// see http://jqueryui.com/upgrade-guide/1.9/#deprecated-disableselection-and-enableselection
					// so we use disableSelection only if it exists
					$("tbody:first>.jqgrow",$t).disableSelection();
				}
			}
		});
	},
	gridDnD : function(opts) {
		return this.each(function(){
		var $t = this, j, cn;
		if(!$t.grid) { return; }
		// Currently we disable a treeGrid drag and drop
		if($t.p.treeGrid) { return; }
		if(!$.fn.draggable || !$.fn.droppable) { return; }
		function updateDnD ()
		{
			var datadnd = $.data($t,"dnd");
			$("tr.jqgrow:not(.ui-draggable)",$t).draggable($.isFunction(datadnd.drag) ? datadnd.drag.call($($t),datadnd) : datadnd.drag);
		}
		var appender = "<table id='jqgrid_dnd' class='ui-jqgrid-dnd'></table>";
		if($("#jqgrid_dnd")[0] === undefined) {
			$('body').append(appender);
		}

		if(typeof opts === 'string' && opts === 'updateDnD' && $t.p.jqgdnd===true) {
			updateDnD();
			return;
		}
		opts = $.extend({
			"drag" : function (opts) {
				return $.extend({
					start : function (ev, ui) {
						var i, subgid;
						// if we are in subgrid mode try to collapse the node
						if($t.p.subGrid) {
							subgid = $(ui.helper).attr("id");
							try {
								$($t).jqGrid('collapseSubGridRow',subgid);
							} catch (ignore) {}
						}
						// hack
						// drag and drop does not insert tr in table, when the table has no rows
						// we try to insert new empty row on the target(s)
						for (i=0;i<$.data($t,"dnd").connectWith.length;i++){
							if($($.data($t,"dnd").connectWith[i]).jqGrid('getGridParam','reccount') === 0 ){
								$($.data($t,"dnd").connectWith[i]).jqGrid('addRowData','jqg_empty_row',{});
							}
						}
						ui.helper.addClass("ui-state-highlight");
						$("td",ui.helper).each(function(i) {
							this.style.width = $t.grid.headers[i].width+"px";
						});
						if(opts.onstart && $.isFunction(opts.onstart) ) { opts.onstart.call($($t),ev,ui); }
					},
					stop :function(ev,ui) {
						var i, ids;
						if(ui.helper.dropped && !opts.dragcopy) {
							ids = $(ui.helper).attr("id");
							if(ids === undefined) { ids = $(this).attr("id"); }
							$($t).jqGrid('delRowData',ids );
						}
						// if we have a empty row inserted from start event try to delete it
						for (i=0;i<$.data($t,"dnd").connectWith.length;i++){
							$($.data($t,"dnd").connectWith[i]).jqGrid('delRowData','jqg_empty_row');
						}
						if(opts.onstop && $.isFunction(opts.onstop) ) { opts.onstop.call($($t),ev,ui); }
					}
				},opts.drag_opts || {});
			},
			"drop" : function (opts) {
				return $.extend({
					accept: function(d) {
						if (!$(d).hasClass('jqgrow')) { return d;}
						var tid = $(d).closest("table.ui-jqgrid-btable");
						if(tid.length > 0 && $.data(tid[0],"dnd") !== undefined) {
							var cn1 = $.data(tid[0],"dnd").connectWith;
							return $.inArray('#'+jqID(this.id),cn1) !== -1 ? true : false;
						}
						return false;
					},
					drop: function(ev, ui) {
						if (!$(ui.draggable).hasClass('jqgrow')) { return; }
						var accept = $(ui.draggable).attr("id");
						var getdata = ui.draggable.parent().parent().jqGrid('getRowData',accept);
						if(!opts.dropbyname) {
							var i =0, tmpdata = {}, nm, key;
							var dropmodel = $("#"+jqID(this.id)).jqGrid('getGridParam','colModel');
							try {
								for (key in getdata) {
									if (getdata.hasOwnProperty(key)) {
									nm = dropmodel[i].name;
									if( !(nm === 'cb' || nm === 'rn' || nm === 'subgrid' )) {
										if(getdata.hasOwnProperty(key) && dropmodel[i]) {
											tmpdata[nm] = getdata[key];
										}
									}
									i++;
								}
								}
								getdata = tmpdata;
							} catch (ignore) {}
						}
						ui.helper.dropped = true;
						if(opts.beforedrop && $.isFunction(opts.beforedrop) ) {
							//parameters to this callback - event, element, data to be inserted, sender, reciever
							// should return object which will be inserted into the reciever
							var datatoinsert = opts.beforedrop.call(this,ev,ui,getdata,$('#'+jqID($t.p.id)),$(this));
							if (datatoinsert !== undefined && datatoinsert !== null && typeof datatoinsert === "object") { getdata = datatoinsert; }
						}
						if(ui.helper.dropped) {
							var grid;
							if(opts.autoid) {
								if($.isFunction(opts.autoid)) {
									grid = opts.autoid.call(this,getdata);
								} else {
									grid = Math.ceil(Math.random()*1000);
									grid = opts.autoidprefix+grid;
								}
							}
							// NULL is interpreted as undefined while null as object
							$("#"+jqID(this.id)).jqGrid('addRowData',grid,getdata,opts.droppos);
						}
						if(opts.ondrop && $.isFunction(opts.ondrop) ) { opts.ondrop.call(this,ev,ui, getdata); }
					}}, opts.drop_opts || {});
			},
			"onstart" : null,
			"onstop" : null,
			"beforedrop": null,
			"ondrop" : null,
			"drop_opts" : {
				"activeClass": "ui-state-active",
				"hoverClass": "ui-state-hover"
			},
			"drag_opts" : {
				"revert": "invalid",
				"helper": "clone",
				"cursor": "move",
				"appendTo" : "#jqgrid_dnd",
				"zIndex": 5000
			},
			"dragcopy": false,
			"dropbyname" : false,
			"droppos" : "first",
			"autoid" : true,
			"autoidprefix" : "dnd_"
		}, opts || {});
		
		if(!opts.connectWith) { return; }
		opts.connectWith = opts.connectWith.split(",");
		opts.connectWith = $.map(opts.connectWith,function(n){return $.trim(n);});
		$.data($t,"dnd",opts);
		
		if($t.p.reccount !== 0 && !$t.p.jqgdnd) {
			updateDnD();
		}
		$t.p.jqgdnd = true;
		for (j=0;j<opts.connectWith.length;j++){
			cn =opts.connectWith[j];
			$(cn).droppable($.isFunction(opts.drop) ? opts.drop.call($($t),opts) : opts.drop);
		}
		});
	},
	gridResize : function(opts) {
		return this.each(function(){
			var $t = this, grid = $t.grid, p = $t.p, bdivSelector = p.gView+">.ui-jqgrid-bdiv", onlyHorizontal = false, sel, gridHeight = p.height;
			if(!grid || !$.fn.resizable) { return; }
			opts = $.extend({}, opts || {});
			if(opts.alsoResize) {
				opts._alsoResize_ = opts.alsoResize;
				delete opts.alsoResize;
			} else {
				opts._alsoResize_ = false;
			}
			if(opts.stop && $.isFunction(opts.stop)) {
				opts._stop_ = opts.stop;
				delete opts.stop;
			} else {
				opts._stop_ = false;
			}
			opts.stop = function (ev, ui) {
				$($t).jqGrid('setGridWidth',ui.size.width,opts.shrinkToFit);
				$(p.gView+">.ui-jqgrid-titlebar").css("width", "");
				if (!onlyHorizontal) {
					$($t).jqGrid('setGridParam',{height: $(bdivSelector).height()});
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
				if(opts._stop_) { opts._stop_.call($t,ev,ui); }
			};
			sel = bdivSelector;
			if ((gridHeight === "auto" || gridHeight === "100%") && opts.handles === undefined) {
				opts.handles = "e,w";
			}
			if (opts.handles) {
				// test for "e, w"
				var ar = $.map(String(opts.handles).split(","), function(item) {
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
			if(opts._alsoResize_) {
				opts.alsoResize = sel + "," + opts._alsoResize_;
			} else {
				opts.alsoResize = sel;
			}
			delete opts._alsoResize_;
			$(p.gBox).resizable(opts);
		});
	}
});
}(jQuery));
/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/**
 * jqGrid pivot functions
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
*/
"use strict";
// To optimize the search we need custom array filter
// This code is taken from
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
var jgrid = $.jgrid, pivotFilter = function (fn, context) {
	var i, value, result = [];

	if (typeof fn !== 'function' || (fn instanceof RegExp)) {
		throw new TypeError();
	}

	var length = this.length;

	for (i = 0; i < length; i++) {
		if (this.hasOwnProperty(i)) {
			value = this[i];
			if (fn.call(context, value, i, this)) {
				result.push(value);
				// We need break in order to cancel loop 
				// in case the row is found
				break;
			}
		}
	}
	return result;
};
$.assocArraySize = function(obj) {
    // http://stackoverflow.com/a/6700/11236
    var size = 0, key;
    for (key in obj) {
        if (obj.hasOwnProperty(key)) {
        	size++;
        }
    }
    return size;
};

jgrid.extend({
	pivotSetup : function( data, options ){
		// data should come in json format
		// The function return the new colModel and the transformed data
		// again with group setup options which then will be passed to the grid
		var columns =[],
		pivotrows =[],
		summaries = [],
		member=[],
		labels=[],
		groupOptions = {
			grouping : true,
			groupingView :  {
				groupField : [],
				groupSummary: [],
				groupSummaryPos:[]
			}
		},
		headers = [],
		o = $.extend ( {
			rowTotals : false,
			rowTotalsText : 'Total',
			// summary columns
			colTotals : false,
			groupSummary : true,
			groupSummaryPos :  'header',
			frozenStaticCols : false
		}, options || {});
		this.each(function(){

			var 
				row,
				rowindex,
				i,
				
				rowlen = data.length,
				xlen, ylen, aggrlen,
				tmp,
				newObj,
				r=0;
			// utility funcs
			/* 
			 * Filter the data to a given criteria. Return the firt occurance
			 */
			function find(ar, fun, extra) {
				var res;
				res = pivotFilter.call(ar, fun, extra);
				return res.length > 0 ? res[0] : null;
			}
			/*
			 * Check if the grouped row column exist (See find)
			 * If the row is not find in pivot rows retun null,
			 * otherviese the column
			 */
			var findGroup = function (item, index) {
				var j = 0, ret = true, name;
				for(name in item) {
					if (item.hasOwnProperty(name)) {
						if(item[name] != this[j]) {
							ret =  false;
							break;
						}
						j++;
						if(j>=this.length) {
							break;
						}
					}
				}
				if(ret) {
					rowindex =  index;
				}
				return ret;
			};
			/*
			 * Perform calculations of the pivot values.
			 */
			function calculation(oper, v, field, rc)  {
				var ret;
				switch (oper) {
					case "sum" : 
						ret = parseFloat(v||0) + parseFloat((rc[field]||0));
						break;
					case "count" :
						if(v==="" || v == null) {
							v=0;
						}
						if(rc.hasOwnProperty(field)) {
							ret = v+1;
						} else {
							ret = 0;
						}
						break;
					case "min" : 
						if(v==="" || v == null) {
							ret = parseFloat(rc[field]||0);
						} else {
							ret =Math.min(parseFloat(v),parseFloat(rc[field]||0));
						}
						break;
					case "max" : 
						if(v==="" || v == null) {
							ret = parseFloat(rc[field]||0);
						} else {
							ret = Math.max(parseFloat(v),parseFloat(rc[field]||0));
						}
						break;
				}
				return ret;
			}
			/*
			 * The function agragates the values of the pivot grid.
			 * Return the current row with pivot summary values
			 */
			function agregateFunc ( row, aggr, value, curr) {
				// default is sum
			    var arrln = aggr.length, n, label, j, jv, mainval = "", swapvals = [], tmpmember, vl;
				if($.isArray(value)) {
					jv = value.length;
					swapvals = value;
				} else {
					jv = 1;
					swapvals[0]=value;
				}
				member = [];
				labels = [];
				member.root = 0;
				for(j=0;j<jv;j++) {
					tmpmember = [];
					for(n=0; n < arrln; n++) {
						if(value == null) {
							label = $.trim(aggr[n].member)+"_"+aggr[n].aggregator;
							vl = label;
							swapvals[j]= vl;
						} else {
							vl = value[j].replace(/\s+/g, '');
							try {
								label = (arrln === 1 ? mainval + vl : mainval + vl+"_"+aggr[n].aggregator+"_" + String(n));
							} catch(ignore) {}
						}
						label = !isNaN(parseInt(label,10)) ? label + " " : label;
						curr[label] =  tmpmember[label] = calculation( aggr[n].aggregator, curr[label], aggr[n].member, row);
						if(j<=1 && vl !==  '_r_Totals' && mainval === "") { // this does not fix full the problem
							mainval = vl;
						}
					}
					//vl = !isNaN(parseInt(vl,10)) ? vl + " " : vl;
					member[label] = tmpmember;
					labels[label] = swapvals[j];
				}
				return curr;
			}
			// Making the row totals without to add in yDimension
			if(o.rowTotals && o.yDimension.length > 0) {
				var dn = o.yDimension[0].dataName;
				o.yDimension.splice(0,0,{dataName:dn});
				o.yDimension[0].converter =  function(){ return '_r_Totals'; };
			}
			// build initial columns (colModel) from xDimension
			xlen = $.isArray(o.xDimension) ? o.xDimension.length : 0;
			ylen = o.yDimension.length;
			aggrlen  = $.isArray(o.aggregates) ? o.aggregates.length : 0;
			if(xlen === 0 || aggrlen === 0) {
				throw("xDimension or aggregates optiona are not set!");
			}
			var colc;
			for(i = 0; i< xlen; i++) {
				colc = {name:o.xDimension[i].dataName, frozen: o.frozenStaticCols};
				if(o.xDimension[i].isGroupField == null) {
					o.xDimension[i].isGroupField =  true;
				}
				colc = $.extend(true, colc, o.xDimension[i]);
				columns.push( colc );
			}
			var groupfields = xlen - 1, tree = {}, xValue, yValue, k, kj, current, existing, kk;
			//tree = { text: 'root', leaf: false, children: [] };
			//loop over alll the source data
			while( r < rowlen ) {
				row = data[r];
				xValue = [];
				yValue = []; 
				tmp = {};
				i = 0;
				// build the data from xDimension
				do {
					xValue[i]  = $.trim(row[o.xDimension[i].dataName]);
					tmp[o.xDimension[i].dataName] = xValue[i];
					i++;
				} while( i < xlen );
				
				k = 0;
				rowindex = -1;
				// check to see if the row is in our new pivotrow set
				newObj = find(pivotrows, findGroup, xValue);
				if(!newObj) {
					// if the row is not in our set
					k = 0;
					// if yDimension is set
					if(ylen>=1) {
						// build the cols set in yDimension
						for(k=0;k<ylen;k++) {
							yValue[k] = $.trim(row[o.yDimension[k].dataName]);
							// Check to see if we have user defined conditions
							if(o.yDimension[k].converter && $.isFunction(o.yDimension[k].converter)) {
								yValue[k] = o.yDimension[k].converter.call(this, yValue[k], xValue, yValue);
							}
						}
						// make the colums based on aggregates definition 
						// and return the members for late calculation
						tmp = agregateFunc( row, o.aggregates, yValue, tmp );
					} else  if( ylen === 0 ) {
						// if not set use direct the aggregates 
						tmp = agregateFunc( row, o.aggregates, null, tmp );
					}
					// add the result in pivot rows
					pivotrows.push( tmp );
				} else {
					// the pivot exists
					if( rowindex >= 0) {
						k = 0;
						// make the recalculations 
						if(ylen>=1) {
							for(k=0;k<ylen;k++) {
								yValue[k] = $.trim(row[o.yDimension[k].dataName]);
								if(o.yDimension[k].converter && $.isFunction(o.yDimension[k].converter)) {
									yValue[k] = o.yDimension[k].converter.call(this, yValue[k], xValue, yValue);
								}
							}
							newObj = agregateFunc( row, o.aggregates, yValue, newObj );
						} else  if( ylen === 0 ) {
							newObj = agregateFunc( row, o.aggregates, null, newObj );
						}
						// update the row
						pivotrows[rowindex] = newObj;
					}
				}
				kj = 0;
				current = null;
				existing = null;
				// Build a JSON tree from the member (see aggregateFunc) 
				// to make later the columns 
				// 
				for (kk in member) {
					if(member.hasOwnProperty( kk )) {
						if(kj === 0) {
							if (!tree.children||tree.children === undefined){
								tree = { text: kk, level : 0, children: [], label: kk  };
							}
							current = tree.children;
						} else {
							existing = null;
							for (i=0; i < current.length; i++) {
								if (current[i].text === kk) {
								//current[i].fields=member[kk];
									existing = current[i];
									break;
								}
							}
							if (existing) {
								current = existing.children;
							} else {
								current.push({ children: [], text: kk, level: kj,  fields: member[kk], label: labels[kk] });
								current = current[current.length - 1].children;
							}
						}
						kj++;
					}
				}
				r++;
			}
			var  lastval=[], initColLen = columns.length, swaplen = initColLen;
			if(ylen>0) {
				headers[ylen-1] = {	useColSpanStyle: false,	groupHeaders: []};
			}
			/*
			 * Recursive function which uses the tree to build the 
			 * columns from the pivot values and set the group Headers
			 */
			function list(items) {
			    var l, j, key, n, col, collen, colpos, l1, ll;
				for (key in items) { // iterate
					if (items.hasOwnProperty(key)) {
					// write amount of spaces according to level
					// and write name and newline
						if(typeof items[key] !== "object") {
							// If not a object build the header of the appropriate level
							if( key === 'level') {
								if(lastval[items.level] === undefined) {
									lastval[items.level] ='';
									if(items.level>0 && items.text !== '_r_Totals') {
										headers[items.level-1] = {
											useColSpanStyle: false,
											groupHeaders: []
										};
									}
								}
								if(lastval[items.level] !== items.text && items.children.length && items.text !== '_r_Totals') {
									if(items.level>0) {
										headers[items.level-1].groupHeaders.push({
											titleText: items.label,
											numberOfColumns : 0
										});
									    collen = headers[items.level - 1].groupHeaders.length - 1;
										colpos = collen === 0 ? swaplen : initColLen+aggrlen;
										if(items.level-1=== (o.rowTotals ? 1 : 0)) {
											if(collen>0) {
												l1 = headers[items.level-1].groupHeaders[collen-1].numberOfColumns;
												if(l1) {
													colpos = l1 + 1 + o.aggregates.length;
												}
											}
										}
										headers[items.level-1].groupHeaders[collen].startColumnName = columns[colpos].name;
										headers[items.level-1].groupHeaders[collen].numberOfColumns = columns.length - colpos;
										initColLen = columns.length;
									}
								}
								lastval[items.level] = items.text;
							}
							// This is in case when the member contain more than one summary item
							if(items.level === ylen  && key==='level' && ylen >0) {
								if( aggrlen > 1){
									ll=1;
									for( l in items.fields) {
										if (items.fields.hasOwnProperty(l)) {
											if(ll===1) {
												headers[ylen-1].groupHeaders.push({startColumnName: l, numberOfColumns: 1, titleText: items.label});
											}
											ll++;
										}
									}
									headers[ylen-1].groupHeaders[headers[ylen-1].groupHeaders.length-1].numberOfColumns = ll-1;
								} else {
									headers.splice(ylen-1,1);
								}
							}
						}
						// if object, call recursively
						if (items[key] != null && typeof items[key] === "object") {
							list(items[key]);
						}
						// Finally build the coulumns
						if( key === 'level') {
							if(items.level >0){
								j=0;
								for(l in items.fields) {
									if(items.fields.hasOwnProperty( l )) {
										col = {};
										for(n in o.aggregates[j]) {
											if(o.aggregates[j].hasOwnProperty(n)) {
												switch( n ) {
													case 'member':
													case 'label':
													case 'aggregator':
														break;
													default:
														col[n] = o.aggregates[j][n];
												}
											}
										}	
										if(aggrlen>1) {
											col.name = l;
											col.label = o.aggregates[j].label || items.label;
										} else {
											col.name = items.text;
											col.label = items.text==='_r_Totals' ? o.rowTotalsText : items.label;
										}
										columns.push (col);
										j++;
									}
								}
							}
						}
					}
				}
			}

			list( tree );
			var nm;
			// loop again trougth the pivot rows in order to build grand total 
			if(o.colTotals) {
				var plen = pivotrows.length;
				while(plen--) {
					for(i=xlen;i<columns.length;i++) {
						nm = columns[i].name;
						if(!summaries[nm]) {
							summaries[nm] = parseFloat(pivotrows[plen][nm] || 0);
						} else {
							summaries[nm] += parseFloat(pivotrows[plen][nm] || 0);
						}
					}
				}
			}
			// based on xDimension  levels build grouping 
			if( groupfields > 0) {
				for(i=0;i<groupfields;i++) {
					if(columns[i].isGroupField) {
						groupOptions.groupingView.groupField.push(columns[i].name);
						groupOptions.groupingView.groupSummary.push(o.groupSummary);
						groupOptions.groupingView.groupSummaryPos.push(o.groupSummaryPos);
					}
				}
			} else {
				// no grouping is needed
				groupOptions.grouping = false;
			}
			groupOptions.sortname = columns[groupfields].name;
			groupOptions.groupingView.hideFirstGroupCol = true;
		});
		// return the final result.
		return { "colModel" : columns, "rows": pivotrows, "groupOptions" : groupOptions, "groupHeaders" :  headers, summary : summaries };
	},
	jqPivot : function( data, pivotOpt, gridOpt, ajaxOpt) {
		return this.each(function(){
			var $t = this;

			function pivot( data) {
				var pivotGrid = $($t).jqGrid('pivotSetup',data, pivotOpt),
				footerrow = $.assocArraySize(pivotGrid.summary) > 0 ? true : false,
				query= jgrid.from.call($t,pivotGrid.rows), i;
				for(i=0; i< pivotGrid.groupOptions.groupingView.groupField.length; i++) {
					query.orderBy(pivotGrid.groupOptions.groupingView.groupField[i], "a", 'text', '');
				}
				$($t).jqGrid($.extend(true, {
					datastr: $.extend(query.select(),footerrow ? {userdata:pivotGrid.summary} : {}),
					datatype: "jsonstring",
					footerrow : footerrow,
					userDataOnFooter: footerrow,
					colModel: pivotGrid.colModel,
					viewrecords: true,
					sortname: pivotOpt.xDimension[0].dataName // ?????
				}, pivotGrid.groupOptions, gridOpt || {}));
				var gHead = pivotGrid.groupHeaders;
				if(gHead.length) {
					for( i = 0;i < gHead.length ; i++) {
						if(gHead[i] && gHead[i].groupHeaders.length) {
							$($t).jqGrid('setGroupHeaders',gHead[i]);
						}
					}
				}
				if(pivotOpt.frozenStaticCols) {
					$($t).jqGrid("setFrozenColumns");
				}
			}

			if(typeof data === "string") {
				$.ajax($.extend({
					url : data,
					dataType: 'json',
					success : function(data) {
						pivot(jgrid.getAccessor(data, ajaxOpt && ajaxOpt.reader ? ajaxOpt.reader: 'rows') );
					}
				}, ajaxOpt || {}) );
			} else {
				pivot( data );
			}
		});
	}
});
}(jQuery));
/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($){
/**
 * jqGrid extension for SubGrid Data
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl-2.0.html
**/
"use strict";
var jgrid = $.jgrid, jqID = jgrid.jqID,
	subGridFeedback = function () {
		var args = $.makeArray(arguments);
		args[0] = "subGrid" + args[0].charAt(0).toUpperCase() + args[0].substring(1);
		args.unshift("");
		args.unshift("");
		args.unshift(this.p);
		return jgrid.feedback.apply(this, args);
	};
jgrid.extend({
setSubGrid : function () {
	return this.each(function (){
	    var $t = this, p = $t.p, cm = p.subGridModel[0], i;
		p.subGridOptions = $.extend({
			expandOnLoad:  false,
			delayOnLoad : 50,
			selectOnExpand : false,
			selectOnCollapse : false,
			reloadOnExpand : true
		}, p.subGridOptions || {});
		p.colNames.unshift("");
		p.colModel.unshift({name:'subgrid',width: jgrid.cell_width ?  p.subGridWidth+p.cellLayout : p.subGridWidth,labelClasses:"jqgh_subgrid",sortable: false,resizable:false,hidedlg:true,search:false,fixed:true});
		if(cm) {
			cm.align = $.extend([],cm.align || []);
			for(i=0;i<cm.name.length;i++) { cm.align[i] = cm.align[i] || 'left';}
		}
	});
},
addSubGridCell :function (pos,iRow) {
	var self=this[0];
	return self == null || self.p == null || self.p.subGridOptions == null ? "" :
		"<td role=\"gridcell\" aria-describedby=\""+self.p.id+"_subgrid\" class=\"ui-sgcollapsed sgcollapsed\" "+
			self.formatCol(pos,iRow)+"><a style='cursor:pointer;'><span class='"+
			jgrid.mergeCssClasses(self.p.subGridOptions.commonIconClass, self.p.subGridOptions.plusicon)+"'></span></a></td>";
},
addSubGrid : function( pos, sind ) {
	return this.each(function(){
		var ts = this, p = ts.p;
		if (!ts.grid ) { return; }
		//-------------------------
		var subGridCell = function (trdiv, cell, pos) {
			var tddiv = $("<td align='"+p.subGridModel[0].align[pos]+"'></td>").html(cell);
			$(trdiv).append(tddiv);
		};
		var subGridXml = function(sjxml, sbid){
			var tddiv, i, sgmap, f,
			dummy = $("<table"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+"><tbody></tbody></table>"),
			trdiv = $("<tr></tr>");
			for (i = 0; i<p.subGridModel[0].name.length; i++) {
				tddiv = $("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-"+p.direction+"'></th>");
				$(tddiv).html(p.subGridModel[0].name[i]);
				$(tddiv).width( p.subGridModel[0].width[i]);
				$(trdiv).append(tddiv);
			}
			$(dummy).append(trdiv);
			if (sjxml){
				sgmap = p.xmlReader.subgrid;
				$(sgmap.root+" "+sgmap.row, sjxml).each( function(){
					trdiv = $("<tr class='ui-widget-content ui-subtblcell'></tr>");
					if(sgmap.repeatitems === true) {
						$(sgmap.cell,this).each( function(i) {
							subGridCell(trdiv, $(this).text() || '&#160;',i);
						});
					} else {
						f = p.subGridModel[0].mapping || p.subGridModel[0].name;
						if (f) {
							for (i=0;i<f.length;i++) {
								subGridCell(trdiv, $(f[i],this).text() || '&#160;',i);
							}
						}
					}
					$(dummy).append(trdiv);
				});
			}
			var pID = p.id+"_";
			$("#"+jqID(pID+sbid)).append(dummy);
			ts.grid.hDiv.loading = false;
			$("#load_"+jqID(p.id)).hide();
			return false;
		};
		var subGridJson = function(sjxml, sbid){
			var tddiv,result,i,cur, sgmap, j, f,
			dummy = $("<table"+(jgrid.msie && jgrid.msiever() < 8 ? " cellspacing='0'" : "")+"><tbody></tbody></table>"),
			trdiv = $("<tr></tr>");
			for (i = 0; i<p.subGridModel[0].name.length; i++) {
				tddiv = $("<th class='ui-state-default ui-th-subgrid ui-th-column ui-th-"+p.direction+"'></th>");
				$(tddiv).html(p.subGridModel[0].name[i]);
				$(tddiv).width( p.subGridModel[0].width[i]);
				$(trdiv).append(tddiv);
			}
			$(dummy).append(trdiv);
			if (sjxml){
				sgmap = p.jsonReader.subgrid;
				result = jgrid.getAccessor(sjxml, sgmap.root);
				if ( result !== undefined ) {
					for (i=0;i<result.length;i++) {
						cur = result[i];
						trdiv = $("<tr class='ui-widget-content ui-subtblcell'></tr>");
						if(sgmap.repeatitems === true) {
							if(sgmap.cell) { cur=cur[sgmap.cell]; }
							for (j=0;j<cur.length;j++) {
								subGridCell(trdiv, cur[j] || '&#160;',j);
							}
						} else {
							f = p.subGridModel[0].mapping || p.subGridModel[0].name;
							if(f.length) {
								for (j=0;j<f.length;j++) {
									subGridCell(trdiv, cur[f[j]] || '&#160;',j);
								}
							}
						}
						$(dummy).append(trdiv);
					}
				}
			}
			var pID = p.id + "_";
			$("#"+jqID(pID+sbid)).append(dummy);
			ts.grid.hDiv.loading = false;
			$("#load_"+jqID(p.id)).hide();
			return false;
		};
		var populatesubgrid = function (rd) {
		    var sid = $(rd).attr("id"), dp = { nd_: (new Date().getTime()) }, i, j;
			dp[p.prmNames.subgridid]=sid;
			if(!p.subGridModel[0]) { return false; }
			if(p.subGridModel[0].params) {
				for(j=0; j < p.subGridModel[0].params.length; j++) {
					for(i=0; i<p.colModel.length; i++) {
						if(p.colModel[i].name === p.subGridModel[0].params[j]) {
						    dp[p.colModel[i].name] = $(rd.cells[i]).text().replace(/\&#160\;/ig, '');
						}
					}
				}
			}
			if(!ts.grid.hDiv.loading) {
				ts.grid.hDiv.loading = true;
				$("#load_"+jqID(p.id)).show();
				if(!p.subgridtype) { p.subgridtype = p.datatype; }
				if($.isFunction(p.subgridtype)) {
					p.subgridtype.call(ts, dp);
				} else {
					p.subgridtype = p.subgridtype.toLowerCase();
				}
				switch(p.subgridtype) {
					case "xml":
					case "json":
					$.ajax($.extend({
						type:p.mtype,
						url: $.isFunction(p.subGridUrl) ? p.subGridUrl.call(ts, dp) : p.subGridUrl,
						dataType:p.subgridtype,
						//data: $.isFunction(p.serializeSubGridData)? p.serializeSubGridData.call(ts, dp) : dp,
						data: jgrid.serializeFeedback.call(ts, p.serializeSubGridData, "jqGridSerializeSubGridData", dp),
						complete: function(jqXHR) {
							if(p.subgridtype === "xml") {
								subGridXml(jqXHR.responseXML, sid);
							} else {
								subGridJson(jgrid.parse(jqXHR.responseText),sid);
							}
						}
					}, jgrid.ajaxOptions, p.ajaxSubgridOptions || {}));
					break;
				}
			}
			return false;
		};
		var len = ts.rows.length, iRow=1;
		if( sind !== undefined && sind > 0) {
			iRow = sind;
			len = sind+1;
		}
		var onClick = function() {
		    var tr = $(this).parent("tr")[0], r = tr.nextSibling, rowid = tr.id, subgridDivId = p.id + "_" + rowid, atd,
				iconClass = function (iconName) {
					return [p.subGridOptions.commonIconClass, p.subGridOptions[iconName]].join(" ");
				},
				nhc = 1;
			$.each(p.colModel,function(){
				if(this.hidden === true || this.name === 'rn' || this.name === 'cb') {
					nhc++;
				}
			});
			if($(this).hasClass("sgcollapsed")) {
				if(p.subGridOptions.reloadOnExpand === true || ( p.subGridOptions.reloadOnExpand === false && !$(r).hasClass('ui-subgrid') ) ) {
					atd = pos >=1 ? "<td colspan='"+pos+"'>&#160;</td>":"";
					if (!subGridFeedback.call(ts, "beforeExpand", subgridDivId, rowid)) {return;}
					$(tr).after( "<tr role='row' class='ui-widget-content ui-subgrid ui-row-"+p.direction+"'>"+atd+"<td class='ui-widget-content subgrid-cell'><span class='"+iconClass("openicon")+"'></span></td><td colspan='"+parseInt(p.colNames.length-nhc,10)+"' class='ui-widget-content subgrid-data'><div id="+subgridDivId+" class='tablediv'></div></td></tr>" );
					$(ts).triggerHandler("jqGridSubGridRowExpanded", [subgridDivId, rowid]);
					if( $.isFunction(p.subGridRowExpanded)) {
						p.subGridRowExpanded.call(ts, subgridDivId,rowid);
					} else {
						populatesubgrid(tr);
					}
				} else {
					$(r).show();
				}
				$(this).html("<a style='cursor:pointer;'><span class='"+iconClass("minusicon")+"'></span></a>").removeClass("sgcollapsed").addClass("sgexpanded");
				if(p.subGridOptions.selectOnExpand) {
					$(ts).jqGrid('setSelection',rowid);
				}
			} else if($(this).hasClass("sgexpanded")) {
				if (!subGridFeedback.call(ts, "beforeCollapse", subgridDivId, rowid)) {return;}
				if(p.subGridOptions.reloadOnExpand === true) {
					$(r).remove(".ui-subgrid");
				} else if($(r).hasClass('ui-subgrid')) { // incase of dynamic deleting
					$(r).hide();
				}
				$(this).html("<a style='cursor:pointer;'><span class='"+iconClass("plusicon")+"'></span></a>").removeClass("sgexpanded").addClass("sgcollapsed");
				if(p.subGridOptions.selectOnCollapse) {
					$(ts).jqGrid('setSelection',rowid);
				}
			}
			return false;
		};
		while(iRow < len) {
			if($(ts.rows[iRow]).hasClass('jqgrow')) {
				if(p.scroll) {
					$(ts.rows[iRow].cells[pos]).unbind('click');
				}
				$(ts.rows[iRow].cells[pos]).bind('click', onClick);
			}
			iRow++;
		}
		if(p.subGridOptions.expandOnLoad === true) {
			$(ts.rows).filter('.jqgrow').each(function(index,row){
				$(row.cells[0]).click();
			});
		}
		ts.subGridXml = function(xml,sid) {subGridXml(xml,sid);};
		ts.subGridJson = function(json,sid) {subGridJson(json,sid);};
	});
},
expandSubGridRow : function(rowid) {
	return this.each(function () {
		var $t = this;
		if(!$t.grid && !rowid) {return;}
		if($t.p.subGrid===true) {
		    var tr = $(this).jqGrid("getInd", rowid, true);
		    $(tr).find(">td.sgcollapsed").trigger("click");
		}
	});
},
collapseSubGridRow : function(rowid) {
	return this.each(function () {
		var $t = this;
		if(!$t.grid && !rowid) {return;}
		if($t.p.subGrid===true) {
		    var tr = $(this).jqGrid("getInd", rowid, true);
		    $(tr).find(">td.sgexpanded").trigger("click");
		}
	});
},
toggleSubGridRow : function(rowid) {
	return this.each(function () {
		var $t = this;
		if(!$t.grid && !rowid) {return;}
		if($t.p.subGrid===true) {
		    var tr = $(this).jqGrid("getInd", rowid, true);
		    $(tr).find(">td.ui-sgcollapsed").trigger("click");
		}
	});
}
});
}(jQuery));
/*
 Transform a table to a jqGrid.
 Peter Romianowski <peter.romianowski@optivo.de> 
 If the first column of the table contains checkboxes or
 radiobuttons then the jqGrid is made selectable.
*/
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
// Addition - selector can be a class or id
(function($){
"use strict";
window.tableToGrid = function (selector, options) {
$(selector).each(function() {
	var self = this, $self = $(this);
	if(self.grid) {return;} //Adedd from Tony Tomov
	// This is a small "hack" to make the width of the jqGrid 100%
	$self.width("99%");
	var w = $self.width();

	// Text whether we have single or multi select
	var inputCheckbox = $('tr td:first-child input[type=checkbox]:first', $self);
	var inputRadio = $('tr td:first-child input[type=radio]:first', $self);
	var selectMultiple = inputCheckbox.length > 0;
	var selectSingle = !selectMultiple && inputRadio.length > 0;
	var selectable = selectMultiple || selectSingle;
	//var inputName = inputCheckbox.attr("name") || inputRadio.attr("name");

	// Build up the columnModel and the data
	var colModel = [];
	var colNames = [];
	$('th', $self).each(function() {
		if (colModel.length === 0 && selectable) {
			colModel.push({
				name: '__selection__',
				index: '__selection__',
				width: 0,
				hidden: true
			});
			colNames.push('__selection__');
		} else {
			colModel.push({
				name: $(this).attr("id") || $.trim($.jgrid.stripHtml($(this).html())).split(' ').join('_'),
				index: $(this).attr("id") || $.trim($.jgrid.stripHtml($(this).html())).split(' ').join('_'),
				width: $(this).width() || 150
			});
			colNames.push($(this).html());
		}
	});
	var data = [];
	var rowIds = [];
	var rowChecked = [];
	$('tbody > tr', $self).each(function() {
		var row = {};
		var rowPos = 0;
		$('td', $(this)).each(function() {
			if (rowPos === 0 && selectable) {
				var input = $('input', $(this));
				var rowId = input.attr("value");
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
		if(rowPos >0) { data.push(row); }
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
	var a, id;
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
		$self.jqGrid("addRowData",id, data[a]);
	}

	// Set the selection
	for (a = 0; a < rowChecked.length; a++) {
		$self.jqGrid("setSelection",rowChecked[a]);
	}
});
};
}(jQuery));
/**
 * jqGrid extension - Tree Grid
 * Tony Tomov tony@trirand.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */
(function($) {
"use strict";
var jgrid = $.jgrid, getAccessor = jgrid.getAccessor, stripPref = jgrid.stripPref, jqID = jgrid.jqID,
	treeGridFeedback = function () {
		var args = $.makeArray(arguments);
		args[0] = "treeGrid" + args[0].charAt(0).toUpperCase() + args[0].substring(1);
		args.unshift("");
		args.unshift("");
		args.unshift(this.p);
		return jgrid.feedback.apply(this, args);
	};
jgrid.extend({
	setTreeNode : function(i, len){
		return this.each(function(){
			var $t = this, $self = $($t), p = $t.p, rows = $t.rows;
			if( !$t.grid || !p.treeGrid ) {return;}
			var expCol = p.expColInd,
			expanded = p.treeReader.expanded_field,
			isLeaf = p.treeReader.leaf_field,
			level = p.treeReader.level_field,
			icon = p.treeReader.icon_field,
			loaded = p.treeReader.loaded,  lft, rgt, curLevel, ident,lftpos, twrap,
			ldat, lf, pn, tr, ind, dind, expan,
			onClickTreeNode = function(e){
				var ind2 = stripPref(p.idPrefix,$(e.target || e.srcElement,rows).closest("tr.jqgrow")[0].id),
				pos = p._index[ind2], item = p.data[pos];
				if(!item[isLeaf]){
					if(item[expanded]){
						$self.jqGrid("collapseRow",item);
						$self.jqGrid("collapseNode",item);
					} else {
						$self.jqGrid("expandRow",item);
						$self.jqGrid("expandNode",item);
					}
				}
				return false;
			},
			onClickTreeNodeWithSelection = function(e){
				var ind2 = stripPref(p.idPrefix,$(e.target || e.srcElement,rows).closest("tr.jqgrow")[0].id);
				onClickTreeNode.call(this, e);
				$self.jqGrid("setSelection",ind2);
				return false;
			};
			while(i<len) {
				tr = rows[i];
				ind = stripPref(p.idPrefix, tr.id);
				dind = p._index[ind];
				ldat = p.data[dind];
				//tr.level = ldat[level];
				if(p.treeGridModel === 'nested') {
					if(!ldat[isLeaf]) {
					lft = parseInt(ldat[p.treeReader.left_field],10);
					rgt = parseInt(ldat[p.treeReader.right_field],10);
					// NS Model
						ldat[isLeaf] = (rgt === lft+1) ? 'true' : 'false';
						tr.cells[p._treeleafpos].innerHTML = ldat[isLeaf];
					}
				}
				//else {
					//row.parent_id = rd[p.treeReader.parent_id_field];
				//}
				curLevel = parseInt(ldat[level],10);
				if(p.tree_root_level === 0) {
					ident = curLevel+1;
					lftpos = curLevel;
				} else {
					ident = curLevel;
					lftpos = curLevel -1;
				}
				twrap = "<div class='tree-wrap tree-wrap-"+p.direction+"' style='width:"+(ident*18)+"px;'>";
				twrap += "<div style='"+(p.direction==="rtl" ? "right:" : "left:")+(lftpos*18)+"px;' class='" + p.treeIcons.commonIconClass + " ";


				if(ldat[loaded] !== undefined) {
					ldat[loaded] = ldat[loaded]==="true" || ldat[loaded]===true;
				}
				if(ldat[isLeaf] === "true" || ldat[isLeaf] === true) {
					twrap += ((ldat[icon] !== undefined && ldat[icon] !== "") ? ldat[icon] : p.treeIcons.leaf)+" tree-leaf treeclick";
					ldat[isLeaf] = true;
					lf="leaf";
				} else {
					ldat[isLeaf] = false;
					lf="";
				}
				ldat[expanded] = (ldat[expanded] === "true" || ldat[expanded] === true) ? true : false;
				ldat[expanded] = ldat[expanded] && (ldat[loaded] || ldat[loaded] === undefined);
				twrap += ldat[isLeaf] === true ?
						"'" :
						(ldat[expanded] === false ?
							p.treeIcons.plus + " tree-plus" :
							p.treeIcons.minus + " tree-minus") +
						" treeclick'";
				
				twrap += "></div></div>";
				$(tr.cells[expCol]).wrapInner("<span class='cell-wrapper"+lf+"'></span>").prepend(twrap);

				if(curLevel !== parseInt(p.tree_root_level,10)) {
					pn = $self.jqGrid('getNodeParent',ldat);
					expan = pn && pn.hasOwnProperty(expanded) ? pn[expanded] : true;
					if( !expan ){
						$(tr).css("display","none");
					}
				}
				$(tr.cells[expCol])
					.find("div.treeclick")
					.bind("click", onClickTreeNode);
				if(p.ExpandColClick === true) {
					$(tr.cells[expCol])
						.find("span.cell-wrapper")
						.css("cursor","pointer")
						.bind("click",onClickTreeNodeWithSelection);
				}
				i++;
			}

		});
	},
	setTreeGrid : function() {
		return this.each(function (){
			var $t = this, p = $t.p, i=0, ecol = false, nm, key, tkey, dupcols=[];
			if(!p.treeGrid) {return;}
			if(!p.treedatatype ) {$.extend($t.p,{treedatatype: p.datatype});}
			p.subGrid = false;p.altRows =false;
			p.pgbuttons = false;p.pginput = false;
			p.gridview =  true;
			if(p.rowTotal === null ) { p.rowNum = p.maxRowNum; }
			p.multiselect = false;p.rowList = [];
			p.expColInd = 0;
			//pico = 'ui-icon-triangle-1-' + (p.direction==="rtl" ? 'w' : 'e');
			//p.treeIcons = $.extend({plus:pico,minus:'ui-icon-triangle-1-s',leaf:'ui-icon-radio-off'},p.treeIcons || {});
			p.treeIcons.plus = p.direction === "rtl" ? p.treeIcons.plusRtl : p.treeIcons.plusLtr;
			if(p.treeGridModel === 'nested') {
				p.treeReader = $.extend({
					level_field: "level",
					left_field:"lft",
					right_field: "rgt",
					leaf_field: "isLeaf",
					expanded_field: "expanded",
					loaded: "loaded",
					icon_field: "icon"
				},p.treeReader);
			} else if(p.treeGridModel === 'adjacency') {
				p.treeReader = $.extend({
						level_field: "level",
						parent_id_field: "parent",
						leaf_field: "isLeaf",
						expanded_field: "expanded",
						loaded: "loaded",
						icon_field: "icon"
				},p.treeReader );
			}
			for ( key in p.colModel){
				if(p.colModel.hasOwnProperty(key)) {
					nm = p.colModel[key].name;
					if( nm === p.ExpandColumn && !ecol ) {
						ecol = true;
						p.expColInd = i;
					}
					i++;
					//
					for(tkey in p.treeReader) {
						if(p.treeReader.hasOwnProperty(tkey) && p.treeReader[tkey] === nm) {
							dupcols.push(nm);
						}
					}
				}
			}
			$.each(p.treeReader,function(j,n){
				if(n && $.inArray(n, dupcols) === -1){
					if(j==='leaf_field') { p._treeleafpos= i; }
				i++;
					p.colNames.push(n);
					p.colModel.push({name:n,width:1,hidden:true,sortable:false,resizable:false,hidedlg:true,editable:true,search:false});
				}
			});			
		});
	},
	expandRow: function (record){
		this.each(function(){
			var $t = this, $self = $($t), p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			var rowid = record[p.localReader.id]; // without prefix
			if (!treeGridFeedback.call($t, "beforeExpandRow", {rowid: rowid, item: record})) {return;}
			var childern = $self.jqGrid("getNodeChildren",record),
			expanded = p.treeReader.expanded_field;
			$(childern).each(function(){
				var id  = p.idPrefix + getAccessor(this,p.localReader.id);
				$($self.jqGrid('getGridRowById', id)).css("display","");
				if(this[expanded]) {
					$self.jqGrid("expandRow",this);
				}
			});
			treeGridFeedback.call($t, "afterExpandRow", {rowid: rowid, item: record});
		});
	},
	collapseRow : function (record) {
		this.each(function(){
			var $t = this, $self = $($t), p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			var rowid = record[p.localReader.id]; // without prefix
			if (!treeGridFeedback.call($t, "beforeCollapseRow", {rowid: rowid, item: record})) {return;}
			var childern = $self.jqGrid("getNodeChildren",record),
			expanded = p.treeReader.expanded_field;
			$(childern).each(function(){
				var id  = p.idPrefix + getAccessor(this,p.localReader.id);
				$($self.jqGrid('getGridRowById', id)).css("display","none");
				if(this[expanded]){
					$self.jqGrid("collapseRow",this);
				}
			});
			treeGridFeedback.call($t, "afterCollapseRow", {rowid: rowid, item: record});
		});
	},
	// NS ,adjacency models
	getRootNodes : function() {
		var result = [];
		this.each(function(){
			var $t = this, p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			switch (p.treeGridModel) {
				case 'nested' :
					var level = p.treeReader.level_field;
					$(p.data).each(function(){
						if(parseInt(this[level],10) === parseInt(p.tree_root_level,10)) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					var parentId = p.treeReader.parent_id_field;
					$(p.data).each(function(){
						if(this[parentId] === null || String(this[parentId]).toLowerCase() === "null") {
							result.push(this);
						}
					});
					break;
			}
		});
		return result;
	},
	getNodeDepth : function(rc) {
		var ret = null;
		this.each(function(){
			var $t = this, p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			switch (p.treeGridModel) {
				case 'nested' :
					var level = p.treeReader.level_field;
					ret = parseInt(rc[level],10) - parseInt(p.tree_root_level,10);
					break;
				case 'adjacency' :
					ret = $($t).jqGrid("getNodeAncestors",rc).length;
					break;
			}
		});
		return ret;
	},
	getNodeParent : function(rc) {
		var result = null;
		this.each(function(){
			var $t = this, p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			switch (p.treeGridModel) {
				case 'nested' :
					var lftc = p.treeReader.left_field,
					rgtc = p.treeReader.right_field,
					levelc = p.treeReader.level_field,
					lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(p.data).each(function(){
						if(parseInt(this[levelc],10) === level-1 && parseInt(this[lftc],10) < lft && parseInt(this[rgtc],10) > rgt) {
							result = this;
							return false;
						}
					});
					break;
				case 'adjacency' :
					var parentId = p.treeReader.parent_id_field,
					dtid = p.localReader.id,
					ind = rc[dtid], pos = p._index[ind];
					while(pos--) {
						if(p.data[pos][dtid] === rc[parentId]) {
							result = p.data[pos];
							break;
						}
					}
					break;
			}
		});
		return result;
	},
	getNodeChildren : function(rc) {
		var result = [];
		this.each(function(){
			var $t = this, p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			switch (p.treeGridModel) {
				case 'nested' :
					var lftc = p.treeReader.left_field,
					rgtc = p.treeReader.right_field,
					levelc = p.treeReader.level_field,
					lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(p.data).each(function(){
						if(parseInt(this[levelc],10) === level+1 && parseInt(this[lftc],10) > lft && parseInt(this[rgtc],10) < rgt) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					var parentId = p.treeReader.parent_id_field,
					dtid = p.localReader.id;
					$(p.data).each(function(){
						if(this[parentId] == rc[dtid]) {
							result.push(this);
						}
					});
					break;
			}
		});
		return result;
	},
	getFullTreeNode : function(rc) {
		var result = [];
		this.each(function(){
			var $t = this, p = $t.p, len;
			if(!$t.grid || !p.treeGrid) {return;}
			switch (p.treeGridModel) {
				case 'nested' :
					var lftc = p.treeReader.left_field,
					rgtc = p.treeReader.right_field,
					levelc = p.treeReader.level_field,
					lft = parseInt(rc[lftc],10), rgt = parseInt(rc[rgtc],10), level = parseInt(rc[levelc],10);
					$(p.data).each(function(){
						if(parseInt(this[levelc],10) >= level && parseInt(this[lftc],10) >= lft && parseInt(this[lftc],10) <= rgt) {
							result.push(this);
						}
					});
					break;
				case 'adjacency' :
					if(rc) {
					result.push(rc);
					var parentId = p.treeReader.parent_id_field,
					dtid = p.localReader.id;
					$(p.data).each(function(){
					    var i;
					    len = result.length;
						for (i = 0; i < len; i++) {
							if (result[i][dtid] === this[parentId]) {
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
	getNodeAncestors : function(rc) {
		var ancestors = [];
		this.each(function(){
			var $t = this, $self = $($t);
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var parent = $self.jqGrid("getNodeParent",rc);
			while (parent) {
				ancestors.push(parent);
				parent = $self.jqGrid("getNodeParent",parent);	
			}
		});
		return ancestors;
	},
	isVisibleNode : function(rc) {
		var result = true;
		this.each(function(){
			var $t = this, p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			var ancestors = $($t).jqGrid("getNodeAncestors",rc),
			expanded = p.treeReader.expanded_field;
			$(ancestors).each(function(){
				result = result && this[expanded];
				if(!result) {return false;}
			});
		});
		return result;
	},
	isNodeLoaded : function(rc) {
		var result;
		this.each(function(){
			var $t = this, p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			var isLeaf = p.treeReader.leaf_field,
			loaded = p.treeReader.loaded;
			if(rc !== undefined ) {
				if(rc[loaded] !== undefined) {
					result = rc[loaded];
				} else if( rc[isLeaf] || $($t).jqGrid("getNodeChildren",rc).length > 0){
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
	expandNode : function(rc) {
		return this.each(function(){
			var $t = this, p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			var expanded = p.treeReader.expanded_field,
			parent = p.treeReader.parent_id_field,
			loaded = p.treeReader.loaded,
			level = p.treeReader.level_field,
			lft = p.treeReader.left_field,
			rgt = p.treeReader.right_field;

			if(!rc[expanded]) {
				var id = getAccessor(rc,p.localReader.id);
				if (!treeGridFeedback.call($t, "beforeExpandNode", {rowid: id, item: rc})) {return;}
				var rc1 = $("#" + p.idPrefix + jqID(id),$t.grid.bDiv)[0];
				var position = p._index[id];
				if( $($t).jqGrid("isNodeLoaded",p.data[position]) ) {
					rc[expanded] = true;
					$("div.treeclick",rc1).removeClass(p.treeIcons.plus+" tree-plus").addClass(p.treeIcons.minus+" tree-minus");
				} else if (!$t.grid.hDiv.loading) {
					rc[expanded] = true;
					$("div.treeclick",rc1).removeClass(p.treeIcons.plus+" tree-plus").addClass(p.treeIcons.minus+" tree-minus");
					p.treeANode = rc1.rowIndex;
					p.datatype = p.treedatatype;
					$($t).jqGrid("setGridParam", {
						postData: p.treeGridModel === 'nested' ?
							{nodeid: id, n_level: rc[level], n_left: rc[lft], n_right: rc[rgt]} :
							{nodeid: id, n_level: rc[level], parentid: rc[parent]}
					});
					$($t).trigger("reloadGrid");
					rc[loaded] = true;
					$($t).jqGrid("setGridParam", {
						postData: p.treeGridModel === 'nested' ?
							{nodeid: '', n_level: '', n_left: '', n_right: ''} :
							{nodeid: '', n_level: '', parentid: ''}
					});
				}
				treeGridFeedback.call($t, "afterExpandNode", {rowid: id, item: rc});
			}
		});
	},
	collapseNode : function(rc) {
		return this.each(function(){
			var $t = this, p = $t.p;
			if(!$t.grid || !p.treeGrid) {return;}
			var expanded = p.treeReader.expanded_field;
			if(rc[expanded]) {
				var id = getAccessor(rc,p.localReader.id);
				if (!treeGridFeedback.call($t, "beforeCollapseNode", {rowid: id, item: rc})) {return;}
				rc[expanded] = false;
				var rc1 = $("#" + p.idPrefix + jqID(id),$t.grid.bDiv)[0];
				$("div.treeclick",rc1).removeClass(p.treeIcons.minus+" tree-minus").addClass(p.treeIcons.plus+" tree-plus");
				treeGridFeedback.call($t, "afterCollapseNode", {rowid: id, item: rc});
			}
		});
	},
	SortTree : function( sortname, newDir, st, datefmt) {
		return this.each(function(){
			var $t = this, p = $t.p, $self = $($t);
			if(!$t.grid || !p.treeGrid) {return;}
			var i, len,	rec, records = [], rt = $self.jqGrid("getRootNodes"), query = jgrid.from.call($t,rt);
		    // Sorting roots
			query.orderBy(sortname, newDir, st, datefmt);
			var roots = query.select();

			// Sorting children
			for (i = 0, len = roots.length; i < len; i++) {
				rec = roots[i];
				records.push(rec);
				$self.jqGrid("collectChildrenSortTree", records, rec, sortname, newDir, st, datefmt);
			}
			$.each(records, function(index) {
				var id = getAccessor(this, p.localReader.id);
				$($t.rows[index]).after($self.find(">tbody>tr#"+jqID(id)));
			});
		});
	},
	collectChildrenSortTree : function(records, rec, sortname, newDir,st, datefmt) {
		return this.each(function(){
			var $t = this, $self = $($t);
			if(!$t.grid || !$t.p.treeGrid) {return;}
			var i, len, child, ch = $self.jqGrid("getNodeChildren", rec), query = jgrid.from.call($t, ch);
			query.orderBy(sortname, newDir, st, datefmt);
			var children = query.select();
			for (i = 0, len = children.length; i < len; i++) {
				child = children[i];
				records.push(child);
				$self.jqGrid("collectChildrenSortTree",records, child, sortname, newDir, st, datefmt); 
			}
		});
	},
	// experimental 
	setTreeRow : function(rowid, data) {
		var success=false;
		this.each(function(){
			var t = this;
			if(!t.grid || !t.p.treeGrid) {return;}
			success = $(t).jqGrid("setRowData",rowid,data);
		});
		return success;
	},
	delTreeNode : function (rowid) {
		return this.each(function () {
			var $t = this, p = $t.p, rid = p.localReader.id, i, $self = $($t),
			left = p.treeReader.left_field,
			right = p.treeReader.right_field, myright, width, res, key;
			if(!$t.grid || !p.treeGrid) {return;}
			var rc = p._index[rowid];
			if (rc !== undefined) {
				// nested
				myright = parseInt(p.data[rc][right],10);
				width = myright -  parseInt(p.data[rc][left],10) + 1;
				var dr = $self.jqGrid("getFullTreeNode",p.data[rc]);
				if(dr.length>0){
					for (i=0;i<dr.length;i++){
						$self.jqGrid("delRowData",dr[i][rid]);
					}
				}
				if( p.treeGridModel === "nested") {
					// ToDo - update grid data
					res = jgrid.from.call($t,p.data)
						.greater(left,myright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = parseInt(res[key][left],10) - width ;
							}
						}
					}
					res = jgrid.from.call($t,p.data)
						.greater(right,myright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][right] = parseInt(res[key][right],10) - width ;
							}
						}
					}
				}
			}
		});
	},
	addChildNode : function( nodeid, parentid, data, expandData ) {
		//return this.each(function(){
		var $self = $(this), $t = $self[0], p = $t.p;
		if(data) {
			// we suppose tha the id is autoincremet and
			var expanded = p.treeReader.expanded_field,
			isLeaf = p.treeReader.leaf_field,
			level = p.treeReader.level_field,
			//icon = p.treeReader.icon_field,
			parent = p.treeReader.parent_id_field,
			left = p.treeReader.left_field,
			right = p.treeReader.right_field,
			loaded = p.treeReader.loaded,
			method, parentindex, parentdata, parentlevel, i, len, max=0, rowind = parentid, leaf, maxright;
			if(expandData===undefined) {expandData = false;}
			if ( nodeid == null ) {
				i = p.data.length-1;
				if(	i>= 0 ) {
					while(i>=0){max = Math.max(max, parseInt(p.data[i][p.localReader.id],10)); i--;}
				}
				nodeid = max+1;
			}
			var prow = $self.jqGrid('getInd', parentid);
			leaf = false;
			// if not a parent we assume root
			if ( parentid === undefined  || parentid === null || parentid==="") {
				parentid = null;
				rowind = null;
				method = 'last';
				parentlevel = p.tree_root_level;
				i = p.data.length+1;
			} else {
				method = 'after';
				parentindex = p._index[parentid];
				parentdata = p.data[parentindex];
				parentid = parentdata[p.localReader.id];
				parentlevel = parseInt(parentdata[level],10)+1;
				var childs = $self.jqGrid('getFullTreeNode', parentdata);
				// if there are child nodes get the last index of it
				if(childs.length) {
					i = childs[childs.length-1][p.localReader.id];
					rowind = i;
					i = $self.jqGrid('getInd',rowind)+1;
				} else {
					i = $self.jqGrid('getInd', parentid)+1;
				}
				// if the node is leaf
				if(parentdata[isLeaf]) {
					leaf = true;
					parentdata[expanded] = true;
					//var prow = $self.jqGrid('getInd', parentid);
					$($t.rows[prow])
						.find("span.cell-wrapperleaf").removeClass("cell-wrapperleaf").addClass("cell-wrapper")
						.end()
						.find("div.tree-leaf").removeClass(p.treeIcons.leaf+" tree-leaf").addClass(p.treeIcons.minus+" tree-minus");
					p.data[parentindex][isLeaf] = false;
					parentdata[loaded] = true;
				}
			}
			len = i+1;

			if( data[expanded]===undefined)  {data[expanded]= false;}
			if( data[loaded]===undefined )  { data[loaded] = false;}
			data[level] = parentlevel;
			if( data[isLeaf]===undefined) {data[isLeaf]= true;}
			if( p.treeGridModel === "adjacency") {
				data[parent] = parentid;
			}
			if( p.treeGridModel === "nested") {
				// this method requiere more attention
				var query, res, key;
				//maxright = parseInt(maxright,10);
				// ToDo - update grid data
				if(parentid !== null) {
					maxright = parseInt(parentdata[right],10);
					query = jgrid.from.call($t,p.data);
					query = query.greaterOrEquals(right,maxright,{stype:'integer'});
					res = query.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = res[key][left] > maxright ? parseInt(res[key][left],10) +2 : res[key][left];
								res[key][right] = res[key][right] >= maxright ? parseInt(res[key][right],10) +2 : res[key][right];
							}
						}
					}
					data[left] = maxright;
					data[right]= maxright+1;
				} else {
					maxright = parseInt( $self.jqGrid('getCol', right, false, 'max'), 10);
					res = jgrid.from.call($t,p.data)
						.greater(left,maxright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][left] = parseInt(res[key][left],10) +2 ;
							}
						}
					}
					res = jgrid.from.call($t,p.data)
						.greater(right,maxright,{stype:'integer'})
						.select();
					if(res.length) {
						for( key in res) {
							if(res.hasOwnProperty(key)) {
								res[key][right] = parseInt(res[key][right],10) +2 ;
							}
						}
					}
					data[left] = maxright+1;
					data[right] = maxright + 2;
				}
			}
			if( parentid === null || $self.jqGrid("isNodeLoaded",parentdata) || leaf ) {
					$self.jqGrid('addRowData', nodeid, data, method, rowind);
					$self.jqGrid('setTreeNode', i, len);
			}
			if(parentdata && !parentdata[expanded] && expandData) {
				$($t.rows[prow])
					.find("div.treeclick")
					.click();
			}
		}
		//});
	}
});
}(jQuery));
/*
 * jqDnR - Minimalistic Drag'n'Resize for jQuery.
 *
 * Copyright (c) 2007 Brice Burgess <bhb@iceburg.net>, http://www.iceburg.net
 * Licensed under the MIT License:
 * http://www.opensource.org/licenses/mit-license.php
 * 
 * $Version: 2007.08.19 +r2
 * Updated by Oleg Kiriljuk to support touch devices
 */
/*jslint browser: true, white: true */
/*global jQuery */
(function ($) {
	"use strict";
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
						getCssProp = function ($elem, propertyName) { return parseInt($elem.css(propertyName), 10) || false; },
						getMainCssProp = function (propertyName) { return getCssProp($mainDialog, propertyName); },
						getAlsoResizeCssProp = function (propertyName) { return getCssProp($alsoResize, propertyName); },
				        xy = getMouseCoordinates(e),
						eventData;
						
					if ($(e.target).hasClass("ui-jqdialog-titlebar-close") || $(e.target).parent().hasClass("ui-jqdialog-titlebar-close")) {
						$(e.target).click();
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
	} else /*if (document.hasOwnProperty("ontouchend"))*/ {
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
}(jQuery));/*
 * jqModal - Minimalist Modaling with jQuery
 *   (http://dev.iceburg.net/jquery/jqmodal/)
 *
 * Copyright (c) 2007,2008 Brice Burgess <bhb@iceburg.net>
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 * 
 * $Version: 07/06/2008 +r13
 */
/*jslint browser: true, nomen: true, plusplus: true, white: true */
/*global jQuery */
(function ($) {
    "use strict";
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
                modal = !$(e.target).parents(".jqmID" + activeModal.s)[0];
            if (modal) {
                $(".jqmID" + activeModal.s).each(function () {
                    var $self = $(this), offset = $self.offset();
                    if (offset.top <= e.pageY &&
                            e.pageY <= offset.top + $self.height() &&
                            offset.left <= e.pageX &&
                            e.pageX <= offset.left + $self.width()) {
                        modal = false;
                        return false;
                    }
                });
                setFocusOnFirstVisibleInput(activeModal);
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

    $.fn.jqmAddClose = function (trigger) { return registerHideOrShow(this, trigger, "jqmHide"); };
    $.fn.jqmAddTrigger = function (trigger) { return registerHideOrShow(this, trigger, "jqmShow"); };
    $.fn.jqmShow = function (trigger) { return this.each(function () { $.jqm.open(this._jqm, trigger); }); };
    $.fn.jqmHide = function (trigger) { return this.each(function () { $.jqm.close(this._jqm, trigger); }); };

    $.jqm = {
        hash: {},
        open: function (s, trigger) {
            var h = jqmHash[s], $overlay, target, url,
                options = h.c,
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
                    .load(url, function() {
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
                h.w.before('<span id="jqmP' + h.w[0]._jqm + '"></span>')
                    .insertAfter(h.o);
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
}(jQuery));/*
**
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
/*jshint eqeqeq:false */
/*jslint browser: true, devel: true, eqeq: true, evil: true, nomen: true, plusplus: true, regexp: true, unparam: true, todo: true, vars: true, white: true, maxerr: 999 */
/*global jQuery */

(function($) {
	"use strict";
	$.fmatter = $.fmatter || {};
	$.jgrid = $.jgrid || {};
	var fmatter = $.fmatter, jgrid = $.jgrid, getGridRes = jgrid.getMethod("getGridRes"); // locales = jgrid.locales, getRes = jgrid.getRes
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
				edittype: "checkbox", editoptions: {value: "true:false", defaultValue: "false"},
				convertOnSave: function (options) {
					var nData = options.newValue, cm = options.cm,
						lnData = String(nData).toLowerCase(),
						cbv = cm.editoptions != null && typeof cm.editoptions.value === "string" ?
							cm.editoptions.value.split(":") : ["yes","no"];

					if ($.inArray(lnData, ["1", "true", cbv[0].toLowerCase()]) >= 0) {
						nData = true;
					} else if ($.inArray(lnData, ["0", "false", cbv[1].toLowerCase()]) >= 0) {
						nData = false;
					}
					return nData;
				},
				stype: "select", searchoptions: { sopt: ["eq", "ne"], value: ":Any;true:Yes;false:No" }
			},
			booleanCheckboxFa: {
				align: "center", formatter: "checkboxFontAwesome4",
				edittype: "checkbox", editoptions: {value: "true:false", defaultValue: "false"},
				convertOnSave: function (options) {
					var nData = options.newValue, cm = options.cm,
						lnData = String(nData).toLowerCase(),
						cbv = cm.editoptions != null && typeof cm.editoptions.value === "string" ?
							cm.editoptions.value.split(":") : ["yes","no"];

					if ($.inArray(lnData, ["1", "true", cbv[0].toLowerCase()]) >= 0) {
						nData = true;
					} else if ($.inArray(lnData, ["0", "false", cbv[1].toLowerCase()]) >= 0) {
						nData = false;
					}
					return nData;
				},
				stype: "select", searchoptions: { sopt: ["eq", "ne"], value: ":Any;true:Yes;false:No" }
			},
			// TODO: add cmTemplate for currency and date
			actions: function () {
				return {
					formatter: "actions",
					width: (this.p != null && this.p.fontAwesomeIcons ? 33 : 36) + ($.jgrid.cellWidth() ? 5 : 0),
					align: "center",
					autoResizable: false,
					frozen: true,
					fixed: true,
					resizable: false,
					sortable: false,
					search: false,
					editable: false,
					viewable: false
				};
			}
		}
	});

	//opts can be id:row id for the row, rowdata:the data for the row, colmodel:the column model for this column
	//example {id:1234,}
	$.extend(fmatter,{
		// one can consider to use $.type instead of some functions below (see http://api.jquery.com/jQuery.type/)
		isObject : function(o) {
			return (o && (typeof o === 'object' || $.isFunction(o))) || false;
		},
		isNumber : function(o) {
			// probably Number.isFinite can be used instead.
			return typeof o === 'number' && isFinite(o); // return false for +infinity, -infinity, or NaN 
		},
		isValue : function (o) {
			return (this.isObject(o) || typeof o === "string" || this.isNumber(o) || typeof o === 'boolean');
		},
		isEmpty : function(o) {
			if(typeof o !== "string" && this.isValue(o)) {
				return false;
			}
			if (!this.isValue(o)){
				return true;
			}
			o = $.trim(o).replace(/\&nbsp\;/ig,'').replace(/\&#160\;/ig,'');
			return o==="";	
		},
		NumberFormat : function(nData,opts) {
			var isNumber = fmatter.isNumber;
			if(!isNumber(nData)) {
				nData *= 1;
			}
			if(isNumber(nData)) {
				var bNegative = (nData < 0);
				var sOutput = String(nData);
				var sDecimalSeparator = opts.decimalSeparator || ".";
				var nDotIndex;
				if(isNumber(opts.decimalPlaces)) {
					// Round to the correct decimal place
					var nDecimalPlaces = opts.decimalPlaces;
					var nDecimal = Math.pow(10, nDecimalPlaces);
					sOutput = String(Math.round(nData*nDecimal)/nDecimal);
					nDotIndex = sOutput.lastIndexOf(".");
					if(nDecimalPlaces > 0) {
					// Add the decimal separator
						if(nDotIndex < 0) {
							sOutput += sDecimalSeparator;
							nDotIndex = sOutput.length-1;
						}
						// Replace the "."
						else if(sDecimalSeparator !== "."){
							sOutput = sOutput.replace(".",sDecimalSeparator);
						}
					// Add missing zeros
						while((sOutput.length - 1 - nDotIndex) < nDecimalPlaces) {
							sOutput += "0";
						}
					}
				}
				if(opts.thousandsSeparator) {
					var sThousandsSeparator = opts.thousandsSeparator;
					nDotIndex = sOutput.lastIndexOf(sDecimalSeparator);
					nDotIndex = (nDotIndex > -1) ? nDotIndex : sOutput.length;
					var sNewOutput = sOutput.substring(nDotIndex);
					var nCount = -1, i;
					for (i=nDotIndex; i>0; i--) {
						nCount++;
						if ((nCount%3 === 0) && (i !== nDotIndex) && (!bNegative || (i > 1))) {
							sNewOutput = sThousandsSeparator + sNewOutput;
						}
						sNewOutput = sOutput.charAt(i-1) + sNewOutput;
					}
					sOutput = sNewOutput;
				}
				// Prepend prefix
				sOutput = (opts.prefix) ? opts.prefix + sOutput : sOutput;
				// Append suffix
				sOutput = (opts.suffix) ? sOutput + opts.suffix : sOutput;
				return sOutput;
				
			}
			return nData;
		}
	});
	var $FnFmatter = function(formatType, cellval, opts, rwd, act) {
		// build main options before element iteration
		var v=cellval;
		opts = $.extend(true, {}, getGridRes.call($(this), "formatter"), opts);
		//$.extend(true, {}, getRes(locales[this.p.locale], "formatter"), jgrid.formatter, opts);

		try {
			v = $.fn.fmatter[formatType].call(this, cellval, opts, rwd, act);
		} catch(ignore){}
		return v;
	};
	$.fn.fmatter = $FnFmatter;
	$FnFmatter.defaultFormat = function(cellval, opts) {
		return (fmatter.isValue(cellval) && cellval!=="" ) ?  cellval : opts.defaultValue || "&#160;";
	};
	$FnFmatter.email = function(cellval, opts) {
		if(!fmatter.isEmpty(cellval)) {
			return "<a href=\"mailto:" + cellval + "\">" + cellval + "</a>";
		}
		return $FnFmatter.defaultFormat(cellval,opts );
	};
	$FnFmatter.checkbox =function(cval, opts) {
		var op = $.extend({},opts.checkbox), ds;
		if(opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(op.disabled===true) {ds = "disabled=\"disabled\"";} else {ds="";}
		if(fmatter.isEmpty(cval) || cval === undefined ) {cval = $FnFmatter.defaultFormat(cval,op);}
		cval=String(cval);
		cval=String(cval).toLowerCase();
		var bchk = cval.search(/(false|f|0|no|n|off|undefined)/i)<0 ? " checked='checked' " : "";
		return "<input type=\"checkbox\" " + bchk  + " value=\""+ cval+"\" offval=\"no\" "+ds+ "/>";
	};
	$FnFmatter.checkboxFontAwesome4 = function (cellValue, options) {
		var title = options.colModel.title !== false ? ' title="' + (options.colName || options.colModel.label || options.colModel.name) + '"' : '',
			strCellValue = String(cellValue).toLowerCase(),
			editoptions = options.colModel.editoptions,
			editYes = editoptions != null && typeof editoptions.value === "string" ? editoptions.value.split(":")[0] : "yes";
		return (cellValue === 1 || strCellValue === "1" || strCellValue === "x" || cellValue === true || strCellValue === "true" || strCellValue === "yes" || strCellValue === editYes) ?
			'<i class="fa fa-check-square-o fa-lg"' + title + '></i>' :
			'<i class="fa fa-square-o fa-lg"' + title + '></i>';
	};
	$FnFmatter.checkboxFontAwesome4.unformat = function (cellValue, options, elem) {
		var cbv = (options.colModel.editoptions != null && options.colModel.editoptions.value) ?
				options.colModel.editoptions.value.split(":") :
				["Yes", "No"];
		return $(">i", elem).hasClass("fa-check-square-o") ? cbv[0] : cbv[1];
	};
	$FnFmatter.link = function(cellval, opts) {
		var op = {target:opts.target};
		var target = "";
		if(opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(op.target) {target = 'target=' + op.target;}
		if(!fmatter.isEmpty(cellval)) {
			return "<a "+target+" href=\"" + cellval + "\">" + cellval + "</a>";
		}
		return $FnFmatter.defaultFormat(cellval,opts);
	};
	$FnFmatter.showlink = function(cellval, opts, rowData) {
		var self = this,
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
					}):
					option || "";
			};
		
		if (opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({}, op, opts.colModel.formatoptions);
		}

		if (op.target) {
			target = 'target=' + getOptionValue(op.target);
		}
		idUrl = getOptionValue(op.baseLinkUrl) + getOptionValue(op.showAction);
		idParam = op.idName ? encodeURIComponent(getOptionValue(op.idName)) + '=' + encodeURIComponent(getOptionValue(op.rowId) || opts.rowId) : "";
		addParam = getOptionValue(op.addParam);
		if (typeof addParam === "object" && addParam !== null) {
			// add "&" only in case of usage object for of addParam
			addParam = (idParam !== "" ? "&" : "") + $.param(addParam);
		}
		idUrl += !idParam && !addParam ? "" : '?' + idParam + addParam;
		if (idUrl === "") {
			idUrl = getOptionValue(op.hrefDefaultValue);
		}
		if (typeof cellval === 'string' || fmatter.isNumber(cellval) || $.isFunction(op.cellValue)) {
			//add this one even if cellval is blank string
			return "<a "+target+" href=\"" + idUrl + "\">" +
				($.isFunction(op.cellValue) ? getOptionValue(op.cellValue) : cellval) +
				"</a>";
		}
		// the code below will be called typically for undefined cellval or 
		// if cellval have null value or some other unclear value like an object
		// and no cellValue callback function are defined "to decode" the value
		return $FnFmatter.defaultFormat(cellval,opts);
	};
	var numberHelper = function(cellval, opts, formatType) {
		var op = $.extend({},opts[formatType]);
		if(opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(fmatter.isEmpty(cellval)) {
			return op.defaultValue;
		}
		return fmatter.NumberFormat(cellval,op);
	};
	$FnFmatter.integer = function(cellval, opts) {
		return numberHelper(cellval,opts,"integer");
	};
	$FnFmatter.number = function (cellval, opts) {
		return numberHelper(cellval,opts,"number");
	};
	$FnFmatter.currency = function (cellval, opts) {
		return numberHelper(cellval,opts,"currency");
	};
	$FnFmatter.date = function (cellval, opts, rwd, act) {
		var op = $.extend({},opts.date);
		if(opts.colModel !== undefined && opts.colModel.formatoptions !== undefined) {
			op = $.extend({},op,opts.colModel.formatoptions);
		}
		if(!op.reformatAfterEdit && act === 'edit'){
			return $FnFmatter.defaultFormat(cellval, opts);
		}
		if(!fmatter.isEmpty(cellval)) {
			return jgrid.parseDate.call(this,op.srcformat,cellval,op.newformat,op);
		}
		return $FnFmatter.defaultFormat(cellval, opts);
	};
	$FnFmatter.select = function (cellval,opts) {
		// jqGrid specific
		cellval = String(cellval);
		var oSelect = false, ret=[], sep, delim;
		if(opts.colModel.formatoptions !== undefined){
			oSelect= opts.colModel.formatoptions.value;
			sep = opts.colModel.formatoptions.separator === undefined ? ":" : opts.colModel.formatoptions.separator;
			delim = opts.colModel.formatoptions.delimiter === undefined ? ";" : opts.colModel.formatoptions.delimiter;
		} else if(opts.colModel.editoptions !== undefined){
			oSelect= opts.colModel.editoptions.value;
			sep = opts.colModel.editoptions.separator === undefined ? ":" : opts.colModel.editoptions.separator;
			delim = opts.colModel.editoptions.delimiter === undefined ? ";" : opts.colModel.editoptions.delimiter;
		}
		if (oSelect) {
			var	msl =  (opts.colModel.editoptions != null && opts.colModel.editoptions.multiple === true) === true ? true : false,
			scell = [], sv, mapFunc = function(n,i){if(i>0) {return n;}};
			if(msl) {scell = cellval.split(",");scell = $.map(scell,function(n){return $.trim(n);});}
			if (typeof oSelect === "string") {
				// mybe here we can use some caching with care ????
				var so = oSelect.split(delim), j=0, i;
				for(i=0; i<so.length;i++){
					sv = so[i].split(sep);
					if(sv.length > 2 ) {
						sv[1] = $.map(sv,mapFunc).join(sep);
					}
					if(msl) {
						if($.inArray($.trim(sv[0]),scell)>-1) {
							ret[j] = sv[1];
							j++;
						}
					} else if($.trim(sv[0]) === $.trim(cellval)) {
						ret[0] = sv[1];
						break;
					}
				}
			} else if(fmatter.isObject(oSelect)) {
				// this is quicker
				if(msl) {
					ret = $.map(scell, function(n){
						return oSelect[n];
					});
				} else {
					ret[0] = oSelect[cellval] || "";
				}
			}
		}
		cellval = ret.join(", ");
		return  cellval === "" ? $FnFmatter.defaultFormat(cellval,opts) : cellval;
	};
	$FnFmatter.rowactions = function(e, act) {
		var $tr = $(this).closest("tr.jqgrow"),rid = $tr.attr("id"),
			$id = $(this).closest("table.ui-jqgrid-btable").attr('id').replace(/_frozen([^_]*)$/,'$1'),
			$grid = $("#"+jgrid.jqID($id)),
			$t = $grid[0],
			p = $t.p,
			cm = p.colModel[jgrid.getCellIndex(this)],
			op = $.extend(true, { extraparam: {}}, cm.formatoptions || {});

		if (p.editOptions !== undefined) {
			op.editOptions = p.editOptions;
		}
		if (p.delOptions !== undefined) {
			op.delOptions = p.delOptions;
		}
		if ($tr.hasClass("jqgrid-new-row")){
			op.extraparam[p.prmNames.oper] = p.prmNames.addoper;
		}
		var actop = {
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
			$grid.jqGrid('setSelection', rid, true, e);
		} else {
			jgrid.fullBoolFeedback.call($t, "onSelectRow", "jqGridSelectRow", rid, true, e);
		}
		switch(act)	{
			case 'edit':
				$grid.jqGrid('editRow', rid, actop);
				break;
			case 'save':
				$grid.jqGrid('saveRow', rid, actop);
				break;
			case 'cancel' :
				$grid.jqGrid('restoreRow', rid, op.afterRestore);
				break;
			case 'del':
				$grid.jqGrid('delGridRow', rid, op.delOptions);
				break;
			case 'formedit':
				$grid.jqGrid('editGridRow', rid, op.editOptions);
				break;
		}
		if (e.stopPropagation) {
			e.stopPropagation();
		}
		return false; // prevent other processing of the click on the row
	};
	$FnFmatter.actions = function(cellval,opts) {
		var rowid = opts.rowId, str = "", ocl, $t = this, p = $t.p, $self = $($t), //locale = jgrid.locales[p.locale],
			//navRegional = getRes(locale, "nav") || {},
			//nav = $.extend(true, {}, navRegional, jgrid.nav || {}),
			edit = getGridRes.call($self, "edit") || {},
			//edit = $.extend(true, {}, getRes(locale, "edit") || {}, jgrid.edit || {}),
			op = $.extend({
				editbutton: true,
				delbutton: true,
				editformbutton: false,
				commonIconClass: "ui-icon",
				editicon: "ui-icon-pencil",
				delicon: "ui-icon-trash",
				//addicon: "ui-icon-plus",
				saveicon: "ui-icon-disk",
				cancelicon: "ui-icon-cancel",
				//edittitle: nav.edittitle,
				//deltitle: nav.deltitle,
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
			};

		if(rowid === undefined || fmatter.isEmpty(rowid)) {return "";}
		if(op.editformbutton){
			ocl = "id='jEditButton_"+rowid+"' onclick=\"return jQuery.fn.fmatter.rowactions.call(this,event,'formedit');\" onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
			str += "<div title='"+op.edittitle+"' class='ui-pg-div ui-inline-edit' "+ocl+"><span class='" + cssIconClass("edit") + "'></span></div>";
		} else if(op.editbutton){
			ocl = "id='jEditButton_"+rowid+"' onclick=\"return jQuery.fn.fmatter.rowactions.call(this,event,'edit');\" onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover') ";
			str += "<div title='"+op.edittitle+"' class='ui-pg-div ui-inline-edit' "+ocl+"><span class='" + cssIconClass("edit") + "'></span></div>";
		}
		if(op.delbutton) {
			ocl = "id='jDeleteButton_"+rowid+"' onclick=\"return jQuery.fn.fmatter.rowactions.call(this,event,'del');\" onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
			str += "<div title='"+op.deltitle+"' class='ui-pg-div ui-inline-del' "+ocl+"><span class='" + cssIconClass("del") + "'></span></div>";
		}
		ocl = "id='jSaveButton_"+rowid+"' onclick=\"return jQuery.fn.fmatter.rowactions.call(this,event,'save');\" onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
		str += "<div title='"+op.savetitle+"' style='display:none' class='ui-pg-div ui-inline-save' "+ocl+"><span class='" + cssIconClass("save") + "'></span></div>";
		ocl = "id='jCancelButton_"+rowid+"' onclick=\"return jQuery.fn.fmatter.rowactions.call(this,event,'cancel');\" onmouseover=jQuery(this).addClass('ui-state-hover'); onmouseout=jQuery(this).removeClass('ui-state-hover'); ";
		str += "<div title='"+op.canceltitle+"' style='display:none;' class='ui-pg-div ui-inline-cancel' "+ocl+"><span class='" + cssIconClass("cancel") + "'></span></div>";
		return "<div class='ui-jqgrid-actions'>" + str + "</div>";
	};
	$FnFmatter.actions.pageFinalization = function (iCol) {
		var $self = $(this), p = this.p, colModel = p.colModel, cm = colModel[iCol],
			showHideEditDelete = function (show, rowid) {
				// TODO: implement support for frozen columns
				// if(cm.frozen && p.frozenColumns) {} && iCol < number of frozen columns in the table of the frozen div
				var tr = $self.jqGrid("getGridRowById", rowid);
				if (tr != null && tr.cells != null) {
					//$actionsDiv = cm.frozen ? $("tr#"+jgrid.jqID(rid)+" td:eq("+jgrid.getCellIndex(this)+") > div",$grid) :$(this).parent(),
					var $actionsDiv = $(tr.cells[iCol]).children(".ui-jqgrid-actions");
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
	$.unformat = function (cellval,options,pos,cnt) {
		// specific for jqGrid only
		var ret, formatType = options.colModel.formatter, p = this.p,
		op =options.colModel.formatoptions || {}, sep,
		re = /([\.\*\_\'\(\)\{\}\+\?\\])/g,
		unformatFunc = options.colModel.unformat||($FnFmatter[formatType] && $FnFmatter[formatType].unformat);
		if (cellval instanceof jQuery && cellval.length > 0) {
			cellval = cellval[0];
		}
		if (options.colModel.autoResizable && cellval != null && $(cellval.firstChild).hasClass(p.autoResizing.wrapperClassName)) {
			cellval = cellval.firstChild;
		}
		if(unformatFunc !== undefined && $.isFunction(unformatFunc) ) {
			ret = unformatFunc.call(this, $(cellval).text(), options, cellval);
		} else if(formatType !== undefined && typeof formatType === "string") {
			//var opts = $.extend(true, {}, getRes(locales[p.locale], "formatter"), jgrid.formatter || {}), stripTag;
			var opts = getGridRes.call($(this), "formatter"), stripTag;
			switch(formatType) {
				case 'integer' :
					op = $.extend({},opts.integer,op);
					sep = op.thousandsSeparator.replace(re,"\\$1");
					stripTag = new RegExp(sep, "g");
					ret = $(cellval).text().replace(stripTag,'');
					break;
				case 'number' :
					op = $.extend({},opts.number,op);
					sep = op.thousandsSeparator.replace(re,"\\$1");
					stripTag = new RegExp(sep, "g");
					ret = $(cellval).text().replace(stripTag,"").replace(op.decimalSeparator,'.');
					break;
				case 'currency':
					op = $.extend({},opts.currency,op);
					sep = op.thousandsSeparator.replace(re,"\\$1");
					stripTag = new RegExp(sep, "g");
					ret = $(cellval).text();
					if (op.prefix && op.prefix.length) {
						ret = ret.substr(op.prefix.length);
					}
					if (op.suffix && op.suffix.length) {
						ret = ret.substr(0, ret.length - op.suffix.length);
					}
					ret = ret.replace(stripTag,'').replace(op.decimalSeparator,'.');
					break;
				case 'checkbox':
					var cbv = (options.colModel.editoptions != null && typeof options.colModel.editoptions.value === "string") ?
							options.colModel.editoptions.value.split(":") :
							["Yes","No"];
					ret = $('input',cellval).is(":checked") ? cbv[0] : cbv[1];
					break;
				case 'select' :
					ret = $.unformat.select(cellval,options,pos,cnt);
					break;
				case 'actions':
					return "";
				default:
					ret= $(cellval).text();
			}
		}
		ret = ret !== undefined ? ret : cnt===true ? $(cellval).text() : jgrid.htmlDecode($(cellval).html());
		return ret;
	};
	$.unformat.select = function (cellval,options,pos,cnt) {
		// Spacial case when we have local data and perform a sort
		// cnt is set to true only in sortDataArray
		var ret = [];
		var cell = $(cellval).text();
		if(cnt===true) {return cell;}
		var op = $.extend({}, options.colModel.formatoptions !== undefined ? options.colModel.formatoptions: options.colModel.editoptions),
		sep = op.separator === undefined ? ":" : op.separator,
		delim = op.delimiter === undefined ? ";" : op.delimiter;
		
		if(op.value){
			var oSelect = op.value,
			msl =  op.multiple === true ? true : false,
			scell = [], sv, mapFunc = function(n,i){if(i>0) {return n;}};
			if(msl) {scell = cell.split(",");scell = $.map(scell,function(n){return $.trim(n);});}
			if (typeof oSelect === "string") {
				var so = oSelect.split(delim), j=0, i;
				for(i=0; i<so.length;i++){
					sv = so[i].split(sep);
					if(sv.length > 2 ) {
						sv[1] = $.map(sv,mapFunc).join(sep);
					}					
					if(msl) {
						if($.inArray($.trim(sv[1]),scell)>-1) {
							ret[j] = sv[0];
							j++;
						}
					} else if($.trim(sv[1]) === $.trim(cell)) {
						ret[0] = sv[0];
						break;
					}
				}
			} else if(fmatter.isObject(oSelect) || $.isArray(oSelect) ){
				if(!msl) {scell[0] =  cell;}
				ret = $.map(scell, function(n){
					var rv;
					$.each(oSelect, function(i,val){
						if (val === n) {
							rv = i;
							return false;
						}
					});
					if( rv !== undefined ) {return rv;}
				});
			}
			return ret.join(", ");
		}
		return cell || "";
	};
	$.unformat.date = function (cellval, opts) {
		// TODO
		var op = $.extend(true, {},
				//getRes(locales[this.p.locale], "formatter.date"),
				getGridRes.call($(this), "formatter.date"),
				jgrid.formatter != null && jgrid.formatter.date != null ? jgrid.formatter.date : {});

		if(opts.formatoptions !== undefined) {
			op = $.extend({},op,opts.formatoptions);
		}		
		if(!fmatter.isEmpty(cellval)) {
			return jgrid.parseDate.call(this,op.newformat,cellval,op.srcformat,op);
		}
		return $FnFmatter.defaultFormat(cellval, opts);
	};
}(jQuery));
/*jslint browser: true, vars: true, white: true, regexp: true */
/*global alert */

/*
	The below work is licensed under Creative Commons GNU LGPL License.

	Original work:

	License:	 http://creativecommons.org/licenses/LGPL/2.1/
	Author:		 Stefan Goessner/2006
	Web:		 http://goessner.net/ 

	Modifications made:

	Version:	 0.9-p5
	Description: Restructured code, JSLint validated (no strict whitespaces),
				 added handling of empty arrays, empty strings, and int/floats values.
	Author:		 Michael Schøler/2008-01-29
	Web:		 http://michael.hinnerup.net/blog/2008/01/26/converting-json-to-xml-and-xml-to-json/
	
	Description: json2xml added support to convert functions as CDATA
				 so it will be easy to write characters that cause some problems when convert
	Author:		 Tony Tomov
*/
(function () {
"use strict";
window.xmlJsonClass = {
	// Param "xml": Element or document DOM node.
	// Param "tab": Tab or indent string for pretty output formatting omit or use empty string "" to supress.
	// Returns:     JSON string
	xml2json: function(xml, tab) {
		if (xml.nodeType === 9) {
			// document node
			xml = xml.documentElement;
		}
		var nws = this.removeWhite(xml);
		var obj = this.toObj(nws);
		var json = this.toJson(obj, xml.nodeName, "\t");
		return "{\n" + tab + (tab ? json.replace(/\t/g, tab) : json.replace(/\t|\n/g, "")) + "\n}";
	},

	// Param "o":   JavaScript object
	// Param "tab": tab or indent string for pretty output formatting omit or use empty string "" to supress.
	// Returns:     XML string
	json2xml: function(o, tab) {
		var toXml = function(v, name, ind) {
		    var xml = "", i, n, sXml, hasChild, m;
			if (v instanceof Array) {
				if (v.length === 0) {
					xml += ind + "<"+name+">__EMPTY_ARRAY_</"+name+">\n";
				}
				else {
					for (i = 0, n = v.length; i < n; i += 1) {
						sXml = ind + toXml(v[i], name, ind+"\t") + "\n";
						xml += sXml;
					}
				}
			}
			else if (typeof v === "object") {
				hasChild = false;
				xml += ind + "<" + name;
				for (m in v) {
					if (v.hasOwnProperty(m)) {
						if (m.charAt(0) === "@") {
							xml += " " + m.substr(1) + "=\"" + v[m].toString() + "\"";
						}
						else {
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
							}
							else if (m === "#cdata") {
								xml += "<![CDATA[" + v[m] + "]]>";
							}
							else if (m.charAt(0) !== "@") {
								xml += toXml(v[m], m, ind+"\t");
							}
						}
					}
					xml += (xml.charAt(xml.length - 1) === "\n" ? ind : "") + "</" + name + ">";
				}
			}
			else if (typeof v === "function") {
				xml += ind + "<" + name + ">" + "<![CDATA[" + v + "]]>" + "</" + name + ">";
			}
			else {
				if (v === undefined ) { v = ""; }
				if (v.toString() === "\"\"" || v.toString().length === 0) {
					xml += ind + "<" + name + ">__EMPTY_STRING_</" + name + ">";
				} 
				else {
					xml += ind + "<" + name + ">" + v.toString() + "</" + name + ">";
				}
			}
			return xml;
		};
		var xml = "", m;
		for (m in o) {
			if (o.hasOwnProperty(m)) {
				xml += toXml(o[m], m, "");
			}
		}
		return tab ? xml.replace(/\t/g, tab) : xml.replace(/\t|\n/g, "");
	},
	// Internal methods
	toObj: function(xml) {
		var o = {};
		var funcTest = /function/i;
		if (xml.nodeType === 1) {
			// element node ..
			if (xml.attributes.length) {
				// element with attributes ..
				var i;
				for (i = 0; i < xml.attributes.length; i += 1) {
					o["@" + xml.attributes[i].nodeName] = (xml.attributes[i].nodeValue || "").toString();
				}
			}
			if (xml.firstChild) {
				// element has child nodes ..
				var textChild = 0, cdataChild = 0, hasElementChild = false;
				var n;
				for (n = xml.firstChild; n; n = n.nextSibling) {
					if (n.nodeType === 1) {
						hasElementChild = true;
					}
					else if (n.nodeType === 3 && n.nodeValue.match(/[^ \f\n\r\t\v]/)) {
						// non-whitespace text
						textChild += 1;
					}
					else if (n.nodeType === 4) {
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
							}
							else if (n.nodeType === 4) {
								// cdata node
								if (funcTest.test(n.nodeValue)) {
									o[n.nodeName] = [o[n.nodeName], n.nodeValue];
								} else {
									o["#cdata"] = this.escape(n.nodeValue);
								}
							}
							else if (o[n.nodeName]) {
								// multiple occurence of element ..
								if (o[n.nodeName] instanceof Array) {
									o[n.nodeName][o[n.nodeName].length] = this.toObj(n);
								}
								else {
									o[n.nodeName] = [o[n.nodeName], this.toObj(n)];
								}
							}
							else {
								// first occurence of element ..
								o[n.nodeName] = this.toObj(n);
							}
						}
					}
					else {
						// mixed content
						if (!xml.attributes.length) {
							o = this.escape(this.innerXml(xml));
						}
						else {
							o["#text"] = this.escape(this.innerXml(xml));
						}
					}
				}
				else if (textChild) {
					// pure text
					if (!xml.attributes.length) {
						o = this.escape(this.innerXml(xml));
						if (o === "__EMPTY_ARRAY_") {
							o = "[]";
						} else if (o === "__EMPTY_STRING_") {
							o = "";
						}
					}
					else {
						o["#text"] = this.escape(this.innerXml(xml));
					}
				}
				else if (cdataChild) {
					// cdata
					if (cdataChild > 1) {
						o = this.escape(this.innerXml(xml));
					}
					else {
						for (n = xml.firstChild; n; n = n.nextSibling) {
							if(funcTest.test(xml.firstChild.nodeValue)) {
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
		}
		else if (xml.nodeType === 9) {
			// document.node
			o = this.toObj(xml.documentElement);
		}
		else {
			alert("unhandled node type: " + xml.nodeType);
		}
		return o;
	},
	toJson: function(o, name, ind, wellform) {
		if(wellform === undefined) {wellform = true;}
		var json = name ? ("\"" + name + "\"") : "", tab = "\t", newline = "\n";
		if(!wellform) {
			tab= ""; newline= "";
		}

		if (o === "[]") {
			json += (name ? ":[]" : "[]");
		}
		else if (o instanceof Array) {
			var n, i, ar=[];
			for (i = 0, n = o.length; i < n; i += 1) {
				ar[i] = this.toJson(o[i], "", ind + tab, wellform);
			}
			json += (name ? ":[" : "[") + (ar.length > 1 ? (newline + ind + tab + ar.join(","+newline + ind + tab) + newline + ind) : ar.join("")) + "]";
		}
		else if (o === null) {
			json += (name && ":") + "null";
		}
		else if (typeof o === "object") {
			var arr = [], m;
			for (m in o) {
				if (o.hasOwnProperty(m)) {
					arr[arr.length] = this.toJson(o[m], m, ind + tab, wellform);
			}
		}
			json += (name ? ":{" : "{") + (arr.length > 1 ? (newline + ind + tab + arr.join(","+newline + ind + tab) + newline + ind) : arr.join("")) + "}";
		}
		else if (typeof o === "string") {
			json += (name && ":") + "\"" + o.replace(/\\/g,'\\\\').replace(/\"/g,'\\"') + "\"";
		}
		else {
			json += (name && ":") +  o.toString();
		}
		return json;
	},
	innerXml: function(node) {
	    var s = "", child;
		if (node.hasOwnProperty("innerHTML")) {
			s = node.innerHTML;
		}
		else {
			var asXml = function(n) {
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
					}
					else {
						str += "/>";
					}
				}
				else if (n.nodeType === 3) {
					str += n.nodeValue;
				}
				else if (n.nodeType === 4) {
					str += "<![CDATA[" + n.nodeValue + "]]>";
				}
				return str;
			};
			for (child = node.firstChild; child; child = child.nextSibling) {
				s += asXml(child);
			}
		}
		return s;
	},
	escape: function(txt) {
		return txt.replace(/[\\]/g, "\\\\").replace(/[\"]/g, '\\"').replace(/[\n]/g, '\\n').replace(/[\r]/g, '\\r');
	},
	removeWhite: function(e) {
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
				}
				else {
					n = n.nextSibling;
				}
			}
			else if (n.nodeType === 1) {
				// element node
				this.removeWhite(n);
				n = n.nextSibling;
			}
			else {
				// any other node
				n = n.nextSibling;
			}
		}
		return e;
	}
};
}());