//NETHERLANDS
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
$.jgrid.regional["nl"] = {
        defaults:
        {
            recordtext: "regels {0} - {1} van {2}",
            emptyrecords: "Geen data gevonden.",
            loadtext: "Laden...",
            pgtext: "pagina  {0}  van {1}",
			savetext: "Saving...",
			pgfirst : "Eerste Pagina",
			pglast : "Laatste Pagina",
			pgnext : "Volgende Pagina",
			pgprev : "Vorige Pagina",
			pgrecs : "Records per Pagina",
			showhide: "Schakelen Uitklappen Inklappen Grid",
			// mobile
			pagerCaption : "Grid::Page Settings",
			pageText : "Page:",
			recordPage : "Records per Page",
			nomorerecs : "No more records...",
			scrollPullup: "Pull up to load more...",
			scrollPulldown : "Pull down to refresh...",
			scrollRefresh : "Release to refresh..."
        },
        search:
        {
            caption: "Zoeken...",
            Find: "Zoek",
            Reset: "Herstellen",
            odata: [{ oper:'eq', text:"gelijk aan"},{ oper:'ne', text:"niet gelijk aan"},{ oper:'lt', text:"kleiner dan"},{ oper:'le', text:"kleiner dan of gelijk aan"},{ oper:'gt', text:"groter dan"},{ oper:'ge', text:"groter dan of gelijk aan"},{ oper:'bw', text:"begint met"},{ oper:'bn', text:"begint niet met"},{ oper:'in', text:"is in"},{ oper:'ni', text:"is niet in"},{ oper:'ew', text:"eindigt met"},{ oper:'en', text:"eindigt niet met"},{ oper:'cn', text:"bevat"},{ oper:'nc', text:"bevat niet"},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}, {oper:'bt', text:'between'}],
            groupOps: [{ op: "AND", text: "alle" }, { op: "OR", text: "een van de"}],
			operandTitle : "Klik om de zoekterm te selecteren.",
			resetTitle : "Herstel zoekterm",
			addsubgrup : "Add subgroup",
			addrule : "Add rule",
			delgroup : "Delete group",
			delrule : "Delete rule"
        },
        edit:
        {
            addCaption: "Nieuw",
            editCaption: "Bewerken",
            bSubmit: "Opslaan",
            bCancel: "Annuleren",
            bClose: "Sluiten",
            saveData: "Er is data aangepast! Wijzigingen opslaan?",
            bYes: "Ja",
            bNo: "Nee",
            bExit: "Sluiten",
            msg:
            {
                required: "Veld is verplicht",
                number: "Voer a.u.b. geldig nummer in",
                minValue: "Waarde moet groter of gelijk zijn aan ",
                maxValue: "Waarde moet kleiner of gelijk zijn aan",
                email: "is geen geldig e-mailadres",
                integer: "Voer a.u.b. een geldig getal in",
                date: "Voer a.u.b. een geldige waarde in",
                url: "is geen geldige URL. Prefix is verplicht ('http://' or 'https://')",
                nodefined : " is niet gedefineerd!",
                novalue : " return waarde is verplicht!",
                customarray : "Aangepaste functie moet array teruggeven!",
                customfcheck : "Aangepaste function moet aanwezig zijn in het geval van aangepaste controle!"
            }
        },
        view:
        {
            caption: "Tonen",
            bClose: "Sluiten"
        },
        del:
        {
            caption: "Verwijderen",
            msg: "Verwijder geselecteerde regel(s)?",
            bSubmit: "Verwijderen",
            bCancel: "Annuleren"
        },
        nav:
        {
            edittext: "",
            edittitle: "Bewerken",
            addtext: "",
            addtitle: "Nieuw",
            deltext: "",
            deltitle: "Verwijderen",
            searchtext: "",
            searchtitle: "Zoeken",
            refreshtext: "",
            refreshtitle: "Vernieuwen",
            alertcap: "Waarschuwing",
            alerttext: "Selecteer a.u.b. een regel",
            viewtext: "",
            viewtitle: "Openen",
			savetext: "",
			savetitle: "Save row",
			canceltext: "",
			canceltitle : "Cancel row editing",
			selectcaption : "Actions..."
        },
        col:
        {
            caption: "Tonen/verbergen kolommen",
            bSubmit: "OK",
            bCancel: "Annuleren"
        },
        errors:
        {
            errcap: "Fout",
            nourl: "Er is geen URL gedefinieerd",
            norecords: "Geen data om te verwerken",
            model: "Lengte van 'colNames' is niet gelijk aan 'colModel'!"
        },
        formatter:
        {
            integer:
            {
                thousandsSeparator: ".",
                defaultValue: "0"
            },
            number:
            {
                decimalSeparator: ",",
                thousandsSeparator: ".",
                decimalPlaces: 2,
                defaultValue: "0.00"
            },
            currency:
            {
                decimalSeparator: ",",
                thousandsSeparator: ".",
                decimalPlaces: 2,
                prefix: "EUR ",
                suffix: "",
                defaultValue: "0.00"
            },
            date:
            {
                dayNames: ["Zo", "Ma", "Di", "Wo", "Do", "Vr", "Za", "Zondag", "Maandag", "Dinsdag", "Woensdag", "Donderdag", "Vrijdag", "Zaterdag"],
                monthNames: ["Jan", "Feb", "Maa", "Apr", "Mei", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec", "Januari", "Februari", "Maart", "April", "Mei", "Juni", "Juli", "Augustus", "September", "October", "November", "December"],
                AmPm: ["am", "pm", "AM", "PM"],
                S: function(b) {
                    return b < 11 || b > 13 ? ["st", "nd", "rd", "th"][Math.min((b - 1) % 10, 3)] : "th"
                },
                srcformat: "Y-m-d",
                newformat: "d/m/Y",
				parseRe : /[#%\\\/:_;.,\t\s-]/,
                masks:
                {
                    ISO8601Long: "Y-m-d H:i:s",
                    ISO8601Short: "Y-m-d",
                    ShortDate: "n/j/Y",
                    LongDate: "l, F d, Y",
                    FullDateTime: "l d F Y G:i:s",
                    MonthDay: "d F",
                    ShortTime: "G:i",
                    LongTime: "G:i:s",
                    SortableDateTime: "Y-m-d\\TH:i:s",
                    UniversalSortableDateTime: "Y-m-d H:i:sO",
                    YearMonth: "F, Y"
                },
                reformatAfterEdit: false,
				userLocalTime : false
            },
            baseLinkUrl: "",
            showAction: "",
            target: "",
            checkbox:
            {
                disabled: true
            },
            idName: "id"
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
		reorder : "Move to reorder"
	}
    };
}));
