/**
 * jqGrid Romanian Translation
 * Alexandru Emil Lupu contact@alecslupu.ro
 * http://www.alecslupu.ro/ 
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
$.jgrid.regional["ro"] = {
	defaults : {
		recordtext: "Vizualizare {0} - {1} din {2}",
		emptyrecords: "Nu există înregistrări de vizualizat",
		loadtext: "Încărcare...",
		pgtext : "Pagina {0} din {1}",
		savetext: "Salvare...",
		pgfirst : "Prima pagină",
		pglast : "Ultima pagină",
		pgnext : "Următoarea pagină",
		pgprev : "Pagina anterioară",
		pgrecs : "Înregistrări pe pagină",
		showhide: "Comutați Extindeți Restrângeți grila",
		// mobile
		pagerCaption : "Setări Grid::Page",
		pageText : "Pagina:",
		recordPage : "Înregistrări pe pagină",
		nomorerecs : "Nu mai există înregistrări...",
		scrollPullup: "Trageți în sus pentru a încărca mai multe...",
		scrollPulldown : "Trageți în jos pentru a reîmprospăta...",
		scrollRefresh : "Eliberați pentru a reîmprospăta..."
	},
	search : {
		caption: "Caută...",
		Find: "Caută",
		Reset: "Resetare",
		odata: [{ oper:'eq', text:"egal"},{ oper:'ne', text:"diferit"},{ oper:'lt', text:"mai mic"},{ oper:'le', text:"mai mic sau egal"},{ oper:'gt', text:"mai mare"},{ oper:'ge', text:"mai mare sau egal"},{ oper:'bw', text:"începe cu"},{ oper:'bn', text:"nu începe cu"},{ oper:'in', text:"se găsește în"},{ oper:'ni', text:"nu se găsește în"},{ oper:'ew', text:"se termină cu"},{ oper:'en', text:"nu se termină cu"},{ oper:'cn', text:"conține"},{ oper:'nc', text:""},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}, {oper:'bt', text:'between'}],
		groupOps: [	{ op: "AND", text: "toate" },	{ op: "OR",  text: "oricare" }	],
		operandTitle : "Faceți clic pentru a selecta operația de căutare.",
		resetTitle : "Resetați valoarea căutării",
		addsubgrup : "Adăugați subgrup",
		addrule : "Adăugați o regulă",
		delgroup : "Șterge grupul",
		delrule : "Ștergeți regula",
		Close : "Închide",
		Operand : "Operand : ",
		Operation : "Operație : "
	},
	edit : {
		addCaption: "Adăugare înregistrare",
		editCaption: "Modificare înregistrare",
		bSubmit: "Salvează",
		bCancel: "Anulare",
		bClose: "Închide",
		saveData: "Informațiile au fost modificate! Salvați modificările?",
		bYes : "Da",
		bNo : "Nu",
		bExit : "Anulare",
		msg: {
			required:"Câmpul este obligatoriu",
			number:"Vă rugăm introduceți un număr valid",
			minValue:"valoarea trebuie sa fie mai mare sau egală cu",
			maxValue:"valoarea trebuie sa fie mai mică sau egală cu",
			email: "nu este o adresă de e-mail validă",
			integer: "Vă rugăm introduceți un număr valid",
			date: "Vă rugăm să introduceți o dată validă",
			url: "Nu este un URL valid. Prefixul  este necesar('http://' or 'https://')",
			nodefined : " nu este definit!",
			novalue : " valoarea returnată este necesară!",
			customarray : "Funcția personalizată ar trebui să returneze Array!",
			customfcheck : "Funcția personalizată ar trebui să fie prezentă în cazul verificării personalizate!"
		}
	},
	view : {
		caption: "Vizualizare înregistrare",
		bClose: "Închidere"
	},
	del : {
		caption: "Ștegere",
		msg: "Ștergeți înregistrarea (înregistrările) selectate?",
		bSubmit: "Șterge",
		bCancel: "Anulare"
	},
	nav : {
		edittext: "",
		edittitle: "Modifică rândul selectat",
		addtext:"",
		addtitle: "Adaugă rând nou",
		deltext: "",
		deltitle: "Șterge rândul selectat",
		searchtext: "",
		searchtitle: "Căutare înregistrări",
		refreshtext: "",
		refreshtitle: "Reîncarcare Grid",
		alertcap: "Avertisment",
		alerttext: "Vă rugăm să selectați un rând",
		viewtext: "",
		viewtitle: "Vizualizează rândul selectat",
		savetext: "",
		savetitle: "Salvați rândul",
		canceltext: "",
		canceltitle : "Anulați editarea rândurilor",
		selectcaption : "Acțiuni..."
	},
	col : {
		caption: "Arată/Ascunde coloanele",
		bSubmit: "Salvează",
		bCancel: "Anulare"
	},
	errors : {
		errcap : "Eroare",
		nourl : "Niciun url nu este setat",
		norecords: "Nu sunt înregistrări de procesat",
		model : "Lungimea colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"Dum", "Lun", "Mar", "Mie", "Joi", "Vin", "Sâm",
				"Duminică", "Luni", "Marți", "Miercuri", "Joi", "Vineri", "Sâmbătă"
			],
			monthNames: [
				"Ian", "Feb", "Mar", "Apr", "Mai", "Iun", "Iul", "Aug", "Sep", "Oct", "Noi", "Dec",
				"Ianuarie", "Februarie", "Martie", "Aprilie", "Mai", "Iunie", "Iulie", "August", "Septembrie", "Octombrie", "Noiembrie", "Decembrie"
			],
			AmPm : ["am","pm","AM","PM"],
			/*
			 Here is a problem in romanian: 
					M	/	F
			 1st = primul / prima
			 2nd = Al doilea / A doua
			 3rd = Al treilea / A treia 
			 4th = Al patrulea/ A patra
			 5th = Al cincilea / A cincea 
			 6th = Al șaselea / A șasea
			 7th = Al șaptelea / A șaptea
			 .... 
			 */
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th'},
			srcformat: 'Y-m-d',
			newformat: 'd/m/Y',
			parseRe : /[#%\\\/:_;.,\t\s-]/,
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "n/j/Y",
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
		checkbox : {disabled:true},
		idName : 'id'
	},
	colmenu : {
		sortasc : "Sortare ascendentă",
		sortdesc : "Sortează descrescător",
		columns : "Coloane",
		filter : "Filtru",
		grouping : "Grupează după",
		ungrouping : "Eliminarea Gruparea",
		searchTitle : "Obțineți elemente cu valoare care:",
		freeze : "Freeze",
		unfreeze : "Unfreeze",
		reorder : "Mutați pentru a reordona",
		hovermenu: "Faceți clic pentru acțiuni rapide pe coloană"
	}
};
}));
