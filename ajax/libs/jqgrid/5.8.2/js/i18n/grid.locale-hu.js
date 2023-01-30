/**
 * jqGrid Hungarian Translation
 * Őrszigety Ádám udx6bs@freemail.hu
 * http://trirand.com/blog/ 
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

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
$.jgrid.regional["hu"] = {
	defaults : {
		recordtext: "Oldal {0} - {1} / {2}",
		emptyrecords: "Nincs találat",
		loadtext: "Betöltés...",
		pgtext : "Oldal {0} / {1}",
		savetext: "Mentés...",
		pgfirst : "Első oldal",
		pglast : "Utolsó oldal",
		pgnext : "Következő oldal",
		pgprev : "Előző oldal",
		pgrecs : "Rekordok oldalanként",
		showhide: "Toggle Expand Collapse Grid",
		// mobile
		pagerCaption : "Grid::Page Settings",
		pageText : "Oldal:",
		recordPage : "Rekordok oldalanként",
		nomorerecs : "Nincs több rekord...",
		scrollPullup: "Pull up to load more...",
		scrollPulldown : "Pull down to refresh...",
		scrollRefresh : "Release to refresh..."
	},
	search : {
		caption: "Keresés...",
		Find: "Keres",
		Reset: "Alapértelmezett",
		odata: [{ oper:'eq', text:"egyenlő"},{ oper:'ne', text:"nem egyenlő"},{ oper:'lt', text:"kevesebb"},{ oper:'le', text:"kevesebb vagy egyenlő"},{ oper:'gt', text:"nagyobb"},{ oper:'ge', text:"nagyobb vagy egyenlő"},{ oper:'bw', text:"ezzel kezdődik"},{ oper:'bn', text:"nem ezzel kezdődik"},{ oper:'in', text:"tartalmaz"},{ oper:'ni', text:"nem tartalmaz"},{ oper:'ew', text:"végződik"},{ oper:'en', text:"nem végződik"},{ oper:'cn', text:"tartalmaz"},{ oper:'nc', text:"nem tartalmaz"},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}, {oper:'bt', text:'között'}],
		groupOps: [	{ op: "AND", text: "all" },	{ op: "OR",  text: "any" }	],
		operandTitle : "Click to select search operation.",
		resetTitle : "Reset Search Value",
		addsubgrup : "Add subgroup",
		addrule : "Add rule",
		delgroup : "Delete group",
		delrule : "Delete rule",
		Close : "Close",
		Operand : "Operand : ",
		Operation : "Oper : "
	},
	edit : {
		addCaption: "Új tétel",
		editCaption: "Tétel szerkesztése",
		bSubmit: "Mentés",
		bCancel: "Mégse",
		bClose: "Bezárás",
		saveData: "A tétel megváltozott! Tétel mentése?",
		bYes : "Igen",
		bNo : "Nem",
		bExit : "Mégse",
		msg: {
			required:"Kötelező mező",
			number:"Kérjük, adjon meg egy helyes számot",
			minValue:"Nagyobb vagy egyenlőnek kell lenni mint ",
			maxValue:"Kisebb vagy egyenlőnek kell lennie mint",
			email: "Hibás email cím",
			integer: "Kérjük adjon meg egy helyes egész számot",
			date: "Kérjük adjon meg egy helyes dátumot",
			url: "nem helyes cím. Előtag kötelező ('http://' vagy 'https://')",
			nodefined : " nem definiált!",
			novalue : " visszatérési érték kötelező!!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "Tétel megtekintése",
		bClose: "Bezárás"
	},
	del : {
		caption: "Törlés",
		msg: "Kiválaztott tétel(ek) törlése?",
		bSubmit: "Törlés",
		bCancel: "Mégse"
	},
	nav : {
		edittext: "",
		edittitle: "Tétel szerkesztése",
		addtext:"",
		addtitle: "Új tétel hozzáadása",
		deltext: "",
		deltitle: "Tétel törlése",
		searchtext: "",
		searchtitle: "Keresés",
		refreshtext: "",
		refreshtitle: "Frissítés",
		alertcap: "Figyelmeztetés",
		alerttext: "Kérem válasszon tételt.",
		viewtext: "",
		viewtitle: "Tétel megtekintése",
		savetext: "",
		savetitle: "Save row",
		canceltext: "",
		canceltitle : "Cancel row editing",
		selectcaption : "Actions..."
	},
	col : {
		caption: "Oszlopok kiválasztása",
		bSubmit: "Ok",
		bCancel: "Mégse"
	},
	errors : {
		errcap : "Hiba",
		nourl : "Nincs URL beállítva",
		norecords: "Nincs feldolgozásra váró tétel",
		model : "colNames és colModel hossza nem egyenlő!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"Va", "Hé", "Ke", "Sze", "Csü", "Pé", "Szo",
				"Vasárnap", "Hétfő", "Kedd", "Szerda", "Csütörtök", "Péntek", "Szombat"
			],
			monthNames: [
				"Jan", "Feb", "Már", "Ápr", "Máj", "Jún", "Júl", "Aug", "Szep", "Okt", "Nov", "Dec",
				"Január", "Február", "Március", "Áprili", "Május", "Június", "Július", "Augusztus", "Szeptember", "Október", "November", "December"
			],
			AmPm : ["de","du","DE","DU"],
			S: function (j) {return '.-ik';},
			srcformat: 'Y-m-d',
			newformat: 'Y/m/d',
			parseRe : /[#%\\\/:_;.,\t\s-]/,
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "Y/j/n",
				LongDate: "Y. F hó d., l",
				FullDateTime: "l, F d, Y g:i:s A",
				MonthDay: "F d",
				ShortTime: "a g:i",
				LongTime: "a g:i:s",
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				YearMonth: "Y, F"
			},
			reformatAfterEdit : false,
			userLocalTime : false
		},
		baseLinkUrl: '',
		showAction: '',
		target: '',
		checkbox : {disabled:true},
		idName : 'id'
	},
	colmenu : {
		sortasc : "Sort Ascending",
		sortdesc : "Sort Descending",
		columns : "Columns",
		filter : "Filter",
		grouping : "Group By",
		ungrouping : "Ungroup",
		searchTitle : "Get items with value that:",
		freeze : "Freeze",
		unfreeze : "Unfreeze",
		reorder : "Move to reorder",
		hovermenu: "Click for column quick actions"
	}
};
}));
