/**
 * jqGrid Serbian Translation
 * Александар Миловац(Aleksandar Milovac) aleksandar.milovac@gmail.com
 * http://trirand.com/blog/
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

/*jslint white: true */
/*global jQuery */
(function($){
"use strict";
var locInfo = {
	isRTL: false,
	defaults : {
		recordtext: "Преглед {0} - {1} од {2}",
		emptyrecords: "Не постоји ниједан запис",
		loadtext: "Учитавање...",
		pgtext : "Страна {0} од {1}",
		pgfirst : "First Page",
		pglast : "Last Page",
		pgnext : "Next Page",
		pgprev : "Previous Page",
		pgrecs : "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "Чување..."
	},
	search : {
		caption: "Тражење...",
		Find: "Тражи",
		Reset: "Ресетуј",
		odata: [{ oper:'eq', text:"једнако"},{ oper:'ne', text:"није једнако"},{ oper:'lt', text:"мање"},{ oper:'le', text:"мање или једнако"},{ oper:'gt', text:"веће"},{ oper:'ge', text:"веће или једнако"},{ oper:'bw', text:"почиње са"},{ oper:'bn', text:"не почиње са"},{ oper:'in', text:"је у"},{ oper:'ni', text:"није у"},{ oper:'ew', text:"завршава са"},{ oper:'en', text:"не завршава са"},{ oper:'cn', text:"садржи"},{ oper:'nc', text:"не садржи"},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}],
		groupOps: [	{ op: "И", text: "сви" },	{ op: "ИЛИ",  text: "сваки" }	],
		operandTitle : "Click to select search operation.",
		resetTitle : "Reset Search Value"
	},
	edit : {
		addCaption: "Додај запис",
		editCaption: "Измени запис",
		bSubmit: "Пошаљи",
		bCancel: "Одустани",
		bClose: "Затвори",
		saveData: "Податак је измењен! Сачувај измене?",
		bYes : "Да",
		bNo : "Не",
		bExit : "Одустани",
		msg: {
			required:"Поље је обавезно",
			number:"Молим, унесите исправан број",
			minValue:"вредност мора бити већа од или једнака са ",
			maxValue:"вредност мора бити мања од или једнака са",
			email: "није исправна имејл адреса",
			integer: "Молим, унесите исправну целобројну вредност ",
			date: "Молим, унесите исправан датум",
			url: "није исправан УРЛ. Потребан је префикс ('http://' or 'https://')",
			nodefined : " није дефинисан!",
			novalue : " захтевана је повратна вредност!",
			customarray : "Custom function should return array!",
			customfcheck : "Custom function should be present in case of custom checking!"
			
		}
	},
	view : {
		caption: "Погледај запис",
		bClose: "Затвори"
	},
	del : {
		caption: "Избриши",
		msg: "Избриши изабран(е) запис(е)?",
		bSubmit: "Ибриши",
		bCancel: "Одбаци"
	},
	nav : {
		edittext: "",
		edittitle: "Измени изабрани ред",
		addtext:"",
		addtitle: "Додај нови ред",
		deltext: "",
		deltitle: "Избриши изабран ред",
		searchtext: "",
		searchtitle: "Нађи записе",
		refreshtext: "",
		refreshtitle: "Поново учитај податке",
		alertcap: "Упозорење",
		alerttext: "Молим, изаберите ред",
		viewtext: "",
		viewtitle: "Погледај изабрани ред"
	},
	col : {
		caption: "Изабери колоне",
		bSubmit: "ОК",
		bCancel: "Одбаци"
	},
	errors : {
		errcap : "Грешка",
		nourl : "Није постављен URL",
		norecords: "Нема записа за обраду",
		model : "Дужина модела colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"Нед", "Пон", "Уто", "Сре", "Чет", "Пет", "Суб",
				"Недеља", "Понедељак", "Уторак", "Среда", "Четвртак", "Петак", "Субота"
			],
			monthNames: [
				"Јан", "Феб", "Мар", "Апр", "Мај", "Јун", "Јул", "Авг", "Сеп", "Окт", "Нов", "Дец",
				"Јануар", "Фебруар", "Март", "Април", "Мај", "Јун", "Јул", "Август", "Септембар", "Октобар", "Новембар", "Децембар"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'Y-m-d',
			newformat: 'd/m/Y',
			masks : {
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
		locale: "sr"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		sr: $.extend({}, locInfo, { name: "српски", nameEnglish: "Serbian" }),
		"sr-Cyrl": $.extend({}, locInfo, { name: "српски", nameEnglish: "Serbian (Cyrillic)" })
	}
});
}(jQuery));
