/**
 * jqGrid (fi) Finnish Translation
 * Jukka Inkeri  awot.fi  2010-05-19
 * Alex Grönholm  alex.gronholm@nextday.fi  2011-05-18
 * http://awot.fi
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
$.jgrid.regional["fi"] = {
	defaults: {
		recordtext: "Rivit {0} - {1} / {2}",
	    emptyrecords: "Ei n&auml;ytett&auml;vi&auml;",
		loadtext: "Haetaan...",
		savetext: "Saving...",
		pgtext: "Sivu {0} / {1}",		
		pgfirst : "First Page",
		pglast : "Last Page",
		pgnext : "Next Page",
		pgprev : "Previous Page",
		pgrecs : "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		// mobile
		pagerCaption : "Grid::Page Settings",
		pageText : "Page:",
		recordPage : "Records per Page",
		nomorerecs : "No more records...",
		scrollPullup: "Pull up to load more...",
		scrollPulldown : "Pull down to refresh...",
		scrollRefresh : "Release to refresh..."
	},
	search: {
	    caption: "Etsi...",
	    Find: "Etsi",
	    Reset: "Tyhjenn&auml;",
	    odata: [{ oper:'eq', text:"on"},{ oper:'ne', text:"ei ole"},{ oper:'lt', text:"pienempi"},{ oper:'le', text:"pienempi tai yht&auml;suuri"},{ oper:'gt', text:"suurempi"},{ oper:'ge', text:"suurempi tai yht&auml;suuri"},{ oper:'bw', text:"alkaa"},{ oper:'bn', text:"ei ala"},{ oper:'in', text:"joukossa"},{ oper:'ni', text:"ei joukossa"},{ oper:'ew', text:"loppuu"},{ oper:'en', text:"ei lopu"},{ oper:'cn', text:"sis&auml;lt&auml;&auml;"},{ oper:'nc', text:"ei sis&auml;ll&auml;"},{ oper:'nu', text:"on tyhj&auml;"},{ oper:'nn', text:"ei ole tyhj&auml;"},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}],
	    groupOps: [	{ op: "AND", text: "kaikki" }, { op: "OR", text: "mik&auml; tahansa" }	],
		operandTitle : "Click to select search operation.",
		resetTitle : "Reset Search Value"		
	},
	edit: {
	    addCaption: "Uusi rivi",
	    editCaption: "Muokkaa rivi&auml;",
	    bSubmit: "OK",
	    bCancel: "Peru",
		bClose: "Sulje",
		saveData: "Tietoja muutettu! Tallennetaanko?",
		bYes: "Kyll&auml;",
		bNo: "Ei",
		bExit: "Peru",
	    msg: {
	        required: "pakollinen",
	        number: "Anna kelvollinen nro",
	        minValue: "arvon oltava suurempi tai yht&auml;suuri kuin ",
	        maxValue: "arvon oltava pienempi tai yht&auml;suuri kuin ",
	        email: "ei ole kelvollinen s&auml;postiosoite",
	        integer: "Anna kelvollinen kokonaisluku",
			date: "Anna kelvollinen pvm",
			url: "Ei ole kelvollinen linkki(URL). Alku oltava ('http://' tai 'https://')",
			nodefined: " ei ole m&auml;&auml;ritelty!",
			novalue: " paluuarvo vaaditaan!",
			customarray: "Oman funktion tulee palauttaa jono!",
			customfcheck: "Oma funktio on m&auml;&auml;ritelt&auml;v&auml; r&auml;&auml;t&auml;l&ouml;ity&auml; tarkastusta varten!"
		}
	},
	view: {
	    caption: "N&auml;yt&auml; rivi",
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
	    edittitle: "Muokkaa valittua rivi&auml;",
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
		viewtitle: "N&auml;yta valitut rivit",
		savetext: "",
		savetitle: "Save row",
		canceltext: "",
		canceltitle : "Cancel row editing",
		selectcaption : "Actions..."
	},
	col: {
	    caption: "Valitse sarakkeet",
	    bSubmit: "OK",
	    bCancel: "Peru"	
	},
	errors : {
		errcap: "Virhe",
		nourl: "URL on asettamatta",
		norecords: "Ei muokattavia tietoja",
	    model: "Pituus colNames <> colModel!"
	},
	formatter: {
		integer: {thousandsSeparator: "", defaultValue: '0'},
		number: {decimalSeparator:",", thousandsSeparator: "", decimalPlaces: 2, defaultValue: '0,00'},
		currency: {decimalSeparator:",", thousandsSeparator: "", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date: {
			dayNames:   [
				"Su", "Ma", "Ti", "Ke", "To", "Pe", "La",
				"Sunnuntai", "Maanantai", "Tiistai", "Keskiviikko", "Torstai", "Perjantai", "Lauantai"
			],
			monthNames: [
				"Tam", "Hel", "Maa", "Huh", "Tou", "Kes", "Hei", "Elo", "Syy", "Lok", "Mar", "Jou",
				"Tammikuu", "Helmikuu", "Maaliskuu", "Huhtikuu", "Toukokuu", "Kes&auml;kuu", "Hein&auml;kuu", "Elokuu", "Syyskuu", "Lokakuu", "Marraskuu", "Joulukuu"
			],
			AmPm: ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
			srcformat: 'Y-m-d',
			newformat: 'd.m.Y',
			parseRe : /[#%\\\/:_;.,\t\s-]/,
			masks: {
	            ISO8601Long:"Y-m-d H:i:s",
	            ISO8601Short:"Y-m-d",
	            ShortDate: "d.m.Y",
	            LongDate: "l, F d, Y",
	            FullDateTime: "l, F d, Y g:i:s A",
	            MonthDay: "F d",
	            ShortTime: "g:i A",
	            LongTime: "g:i:s A",
	            SortableDateTime: "Y-m-d\\TH:i:s",
	            UniversalSortableDateTime: "Y-m-d H:i:sO",
	            YearMonth: "F, Y"
	        },
	        reformatAfterEdit : false,
			userLocalTime : false
		},
		baseLinkUrl: '',
		showAction: '',
	    target: '',
	    checkbox: {disabled:true},
		idName: 'id'
	}
};
// FI
}));
