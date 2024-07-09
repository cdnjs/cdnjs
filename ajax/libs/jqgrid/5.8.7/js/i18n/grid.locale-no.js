//NORWAY
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
$.jgrid.regional["no"] = {
    defaults : {
        recordtext: "Rad {0} - {1}, totalt {2}",
        loadtext: "Laster...",
        pgtext: "Side {0} av {1}",
		savetext: "Saving...",
        pgfirst: "First Page",
        pglast: "Last Page",
        pgnext: "Next Page",
        pgprev: "Previous Page",
        pgrecs: "Records per Page",
        showhide: "Toggle Expand Collapse Grid",
        emptyrecords: "Ingen poster funnet",
		// mobile
		pagerCaption : "Grid::Page Settings",
		pageText : "Page:",
		recordPage : "Records per Page",
		nomorerecs : "No more records...",
		scrollPullup: "Pull up to load more...",
		scrollPulldown : "Pull down to refresh...",
		scrollRefresh : "Release to refresh...",
		valT : "checked",
		valF : "unchecked",
		selectLine : "Select row",
		selectAllLines : "Select all rows"
    },
    search : {
		caption: "Søk...", 
		Find: "Finn", 
		Reset: "Nullstill", 
		odata: [
        {oper: 'eq', text: "lik"},
        {oper: 'ne', text: "forskjellig fra"},
        {oper: 'lt', text: "mindre enn"},
        {oper: 'le', text: "mindre eller lik"},
        {oper: 'gt', text: "større enn"},
        {oper: 'ge', text: " større eller lik"},
        {oper: 'bw', text: "starter med"},
        {oper: 'ew', text: "slutter med"},
        {oper: 'cn', text: "inneholder"},
        { oper: 'nu', text: 'is null'},
        { oper: 'nn', text: 'is not null'}, 
		{oper:'bt', text:'between'}
		], 
		operandTitle: "Click to select search operation.", 
		resetTitle: "Reset Search Value",
		addsubgrup : "Add subgroup",
		addrule : "Add rule",
		delgroup : "Delete group",
		delrule : "Delete rule",
		Close : "Close",
		Operand : "Operand : ",
		Operation : "Oper : ",
		filterFor : "filter for"
	},
    edit : {addCaption: "Ny rad", editCaption: "Rediger", bSubmit: "Send", bCancel: "Avbryt", bClose: "Lukk", processData: "Laster...", msg: {required: "Felt er obligatorisk", number: "Legg inn et gyldig tall", minValue: "verdi mø vøre større enn eller lik", maxValue: "verdi må være mindre enn eller lik", email: "er ikke en gyldig e-post adresse", integer: "Legg inn et gyldig heltall", date: "Legg inn en gyldig dato", url: "er ikke en gyldig URL. Prefiks påkrevd ('http://' eller 'https://')", nodefined: " er ikke definert!", novalue: " returverdi er påkrevd!", customarray: "Tilpasset funksjon må returnere en tabell!", customfcheck: "Tilpasset funksjon må eksistere!"}},
    view : {caption: "Åpne post", bClose: "Lukk"},
    del : {caption: "Slett", msg: "Slett valgte rad(er)?", bSubmit: "Slett", bCancel: "Avbryt", processData: "Behandler..."},
    nav : {edittext: " ", edittitle: "Rediger valgte rad(er)", addtext: " ", addtitle: "Legg til ny rad", deltext: " ", deltitle: "Slett valgte rad(er)", searchtext: " ", searchtitle: "Søk", refreshtext: "", refreshtitle: "Oppdater tabell", alertcap: "Advarsel", alerttext: "Velg rad", viewtext: " ", viewtitle: "Åpne valgt rad",
		savetext: "",
		savetitle: "Save row",
		canceltext: "",
		canceltitle : "Cancel row editing",
		selectcaption : "Actions..."
	},
    col : {caption: "Vis/skjul kolonner", bSubmit: "Utfør", bCancel: "Avbryt"},
    errors : {errcap: "Feil", nourl: "Ingen url er satt", norecords: "Ingen poster å behandle", model: "colNames og colModel har forskjellig lengde!"},
    formatter : {integer: {thousandsSeparator: " ", defaultValue: 0}, number: {decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2, defaulValue: 0}, currency: {decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix: "", defaulValue: 0}, date: {dayNames: ["sø.", "ma.", "ti.", "on.", "to.", "fr.", "lø.", "Søndag", "Mandag", "Tirsdag", "Onsdag", "Torsdag", "Fredag", "Lørdag"], monthNames: ["jan.", "feb.", "mars", "april", "mai", "juni", "juli", "aug.", "sep.", "okt.", "nov.", "des.", "januar", "februar", "mars", "april", "mai", "juni", "juli", "august", "september", "oktober", "november", "desember"], AmPm: ["", "", "", ""], S: function (b) {
        return".";
    }, srcformat: "Y-m-d H:i:s", newformat: "Y-m-d H:i:s", parseRe: /[#%\\\/:_;.,\t\s-]/, masks: {ISO8601Long: "Y-m-d H:i:s", ISO8601Short: "Y-m-d", ShortDate: "j.n.Y", LongDate: "l j. F Y", FullDateTime: "l j. F Y kl. G.i.s", MonthDay: "j. F", ShortTime: "H:i", LongTime: "H:i:s", SortableDateTime: "Y-m-d\\TH:i:s", UniversalSortableDateTime: "Y-m-d H:i:sO", YearMonth: "F Y"}, reformatAfterEdit: false, userLocalTime: false}, baseLinkUrl: "", showAction: "show", addParam: "", checkbox: {disabled: true}
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
