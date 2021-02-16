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
$.jgrid.regional["sq"] = {
	defaults : {
		recordtext: "Shfaq {0} - {1}/{2}",
		emptyrecords: "Nuk ka rreshta për të shfaqur",
		loadtext: "Duke u ngarkuar...",
		savetext: "Duke ruajtur...",
		pgtext : "Faqja {0}/{1}",
		pgfirst : "Faqja e parë",
		pglast : "Faqja e fundit",
		pgnext : "Faqja tjetër",
		pgprev : "Faqja mëparshme",
		pgrecs : "Rreshta për faqe",
		showhide: "Shpalos ose mbyll tabelën",
		// mobile
		pagerCaption : "Tabela::Kruskoti i faqes",
		pageText : "Faqja:",
		recordPage : "Rreshta për faqe",
		nomorerecs : "Nuk ka rreshta të tjerë...",
		scrollPullup: "Tërhiq për lart për të tjerë...",
		scrollPulldown : "Tërqiq për poshtë për rifreskim...",
		scrollRefresh : "Lësho për rifreskim..."
	},
	search : {
		caption: "Kërko...",
		Find: "Gjej",
		Reset: "Pastro",
		odata: [{ oper:'eq', text:'baraz'},{ oper:'ne', text:'jo baraz'},{ oper:'lt', text:'me e vogel'},{ oper:'le', text:'me e vogel ose baraz'},{ oper:'gt', text:'me e madhe'},{ oper:'ge', text:'me e madhe ose baraz'},{ oper:'bw', text:'fillon me'},{ oper:'bn', text:'nuk fillon me'},{ oper:'in', text:'brenda'},{ oper:'ni', text:'jo brenda'},{ oper:'ew', text:'mbaron me'},{ oper:'en', text:'nuk mbaron me'},{ oper:'cn', text:'permban'},{ oper:'nc', text:'nuk permban'},{ oper:'nu', text:'eshte bosh'},{ oper:'nn', text:'nuk eshte bosh'}, {oper:'bt', text:'between'}],
		groupOps: [{ op: "AND", text: "te gjithe" },{ op: "OR",  text: "cfaredo" }],
		operandTitle : "Kliko per te zgjedhur veprimin.",
		resetTitle : "Fshi vlerat e kerkimit",
		addsubgrup : "Add subgroup",
		addrule : "Add rule",
		delgroup : "Delete group",
		delrule : "Delete rule"

	},
	edit : {
		addCaption: "Shto rresht",
		editCaption: "Fshi rresht",
		bSubmit: "Vendos",
		bCancel: "Anullo",
		bClose: "Mbyll",
		saveData: "Te dhenat jane ndryshuar! Deshironi ti ruani ndryshimet?",
		bYes : "Po",
		bNo : "Jo",
		bExit : "Anullo",
		msg: {
			required:"Kjo fushe eshte e detyrueshme",
			number:"Ju lutem, vendosni nje numer te vlefshem",
			minValue:"vlera duhet te jete me e madhe ose e njejte me ",
			maxValue:"vlera duhet te jete me e vogel ose e njejte me",
			email: "nuk eshte adrese poste elektronike e vlefshme",
			integer: "Ju lutem, vendosni nje numer te plote te vlefshem",
			date: "Ju lutem, vendosni nje date te vlefshme",
			url: "nuk eshte URL e vlefshme. Nevojitet prefiksi ('http://' ose 'https://')",
			nodefined : " nuk eshte percaktuar!",
			novalue : " vlera si pergjigje eshte e detyreshme!",
			customarray : "Funksioni i personalizuar duhet te ktheje nje array!",
			customfcheck : "unksioni i personalizuar duhet te egzistoje ne rast kontrolli te personalizuar!"
			
		}
	},
	view : {
		caption: "Shfaq Rreshtin",
		bClose: "Mbyll"
	},
	del : {
		caption: "Fshi",
		msg: "Deshironi te fshini rreshtin/rreshtat e zgjedhur?",
		bSubmit: "Fshi",
		bCancel: "Anullo"
	},
	nav : {
		edittext: "",
		edittitle: "Modifiko rreshtin e zgjedhur",
		addtext:"",
		addtitle: "Shto rresht te ri",
		deltext: "",
		deltitle: "Fshi rreshtin e zgjedhur",
		searchtext: "",
		searchtitle: "Gjej rreshtat",
		refreshtext: "",
		refreshtitle: "Ringarko listen",
		alertcap: "Paralajmerim",
		alerttext: "Ju lutem, zgjidh nje rresht",
		viewtext: "",
		viewtitle: "Shfaq rreshtin e zgjedhur",
		savetext: "",
		savetitle: "Ruaj rreshtin",
		canceltext: "",
		canceltitle : "Anullo modifikim rreshti",
		selectcaption : "Veprime..."
	},
	col : {
		caption: "Zgjidh kolona",
		bSubmit: "Ok",
		bCancel: "Anullo"
	},
	errors : {
		errcap : "Gabim",
		nourl : "Nuk eshte percaktuar asnje URL",
		norecords: "Nuk ka rreshta per perpunim",
		model : "Gjatesia e emrit te kolones <> modeli i kolones!"
	},
	formatter : {
		integer : {thousandsSeparator: ",", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Dje", "Hën", "Mar", "Mër", "Enj", "Pre", "Sht",
				"Djelë", "Hënë", "Martë", "Mërkurë", "Enjte", "Premte", "Shtunë"
			],
			monthNames: [
				"Jan", "Shk", "Mar", "Pri", "Maj", "Qer", "Kor", "Gus", "Sht", "Tet", "Nën", "Dhj",
				"Janar", "Shkurt", "Mars", "Prill", "Maj", "Qershor", "Korrik", "Gusht", "Shtator", "Tetor", "Nëntor", "Dhjetor"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'Y-m-d',
			newformat: 'n/j/Y',
			parseRe : /[#%\\\/:_;.,\t\s-]/,
			masks : {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
				// information about date, time, numbers and currency formats used in different countries
				// one should just convert the information in PHP format
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
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
				SortableDateTime: "Y-m-d\\TH:i:s",
				UniversalSortableDateTime: "Y-m-d H:i:sO",
				// month with year
				//    Y - A full numeric representation of a year, 4 digits
				//    F - A full textual representation of a month
				YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
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
		reorder : "Move to reorder"
	}
};
}));
