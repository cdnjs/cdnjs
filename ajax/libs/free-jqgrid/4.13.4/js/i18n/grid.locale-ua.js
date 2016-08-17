/**
 * @license jqGrid Ukrainian Translation v1.0 02.07.2009
 * Sergey Dyagovchenko
 * http://d.sumy.ua
 * Dual licensed under the MIT and GPL licenses:
 * http://www.opensource.org/licenses/mit-license.php
 * http://www.gnu.org/licenses/gpl.html
**/

/*jslint white: true */
/*global jQuery */
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
var locInfo = {
	isRTL: false,
	defaults: {
		recordtext: "Перегляд {0} - {1} з {2}",
		emptyrecords: "Немає записів для перегляду",
		loadtext: "Завантаження...",
		pgtext: "Стор. {0} з {1}",
		pgfirst: "First Page",
		pglast: "Last Page",
		pgnext: "Next Page",
		pgprev: "Previous Page",
		pgrecs: "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "Збереження..."
	},
	search: {
		caption: "Пошук...",
		Find: "Знайти",
		Reset: "Скидання",
		odata: [
			{ oper: "eq", text: "рівно" },
			{ oper: "ne", text: "не рівно" },
			{ oper: "lt", text: "менше" },
			{ oper: "le", text: "менше або рівне" },
			{ oper: "gt", text: "більше" },
			{ oper: "ge", text: "більше або рівне" },
			{ oper: "bw", text: "починається з" },
			{ oper: "bn", text: "не починається з" },
			{ oper: "in", text: "знаходиться в" },
			{ oper: "ni", text: "не знаходиться в" },
			{ oper: "ew", text: "закінчується на" },
			{ oper: "en", text: "не закінчується на" },
			{ oper: "cn", text: "містить" },
			{ oper: "nc", text: "не містить" },
			{ oper: "nu", text: "is null" },
			{ oper: "nn", text: "is not null" }
		],
		groupOps: [
			{ op: "AND", text: "все" },
			{ op: "OR",  text: "будь-який" }
		],
		addGroupTitle: "Add subgroup",
		deleteGroupTitle: "Delete group",
		addRuleTitle: "Add rule",
		deleteRuleTitle: "Delete rule",
		operandTitle: "Click to select search operation.",
		resetTitle: "Reset Search Value"
	},
	edit: {
		addCaption: "Додати запис",
		editCaption: "Змінити запис",
		bSubmit: "Зберегти",
		bCancel: "Відміна",
		bClose: "Закрити",
		saveData: "До данних були внесені зміни! Зберегти зміни?",
		bYes: "Так",
		bNo: "Ні",
		bExit: "Відміна",
		msg: {
			required: "Поле є обов'язковим",
			number: "Будь ласка, введіть правильне число",
			minValue: "значення повинне бути більше або дорівнює",
			maxValue: "значення повинно бути менше або дорівнює",
			email: "некоректна адреса електронної пошти",
			integer: "Будь ласка, введення дійсне ціле значення",
			date: "Будь ласка, введення дійсне значення дати",
			url: "не дійсний URL. Необхідна приставка ('http://' or 'https://')",
			nodefined: " is not defined!",
			novalue: " return value is required!",
			customarray: "Custom function should return array!",
			customfcheck: "Custom function should be present in case of custom checking!"
		}
	},
	view: {
		caption: "Переглянути запис",
		bClose: "Закрити"
	},
	del: {
		caption: "Видалити",
		msg: "Видалити обраний запис(и)?",
		bSubmit: "Видалити",
		bCancel: "Відміна"
	},
	nav: {
		edittext: "",
		edittitle: "Змінити вибраний запис",
		addtext: "",
		addtitle: "Додати новий запис",
		deltext: "",
		deltitle: "Видалити вибраний запис",
		searchtext: "",
		searchtitle: "Знайти записи",
		refreshtext: "",
		refreshtitle: "Оновити таблицю",
		alertcap: "Попередження",
		alerttext: "Будь ласка, виберіть запис",
		viewtext: "",
		viewtitle: "Переглянути обраний запис",
		savetext: "",
		savetitle: "Save row",
		canceltext: "",
		canceltitle: "Cancel row editing"
	},
	col: {
		caption: "Показати/Приховати стовпці",
		bSubmit: "Зберегти",
		bCancel: "Відміна"
	},
	errors: {
		errcap: "Помилка",
		nourl: "URL не задан",
		norecords: "Немає записів для обробки",
		model: "Число полів не відповідає числу стовпців таблиці!"
	},
	formatter: {
		integer: { thousandsSeparator: " ", defaultValue: "0" },
		number: { decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: "0,00" },
		currency: { decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0,00" },
		date: {
			dayNames:   [
				"Нд", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
				"Неділя", "Понеділок", "Вівторок", "Середа", "Четвер", "П'ятниця", "Субота"
			],
			monthNames: [
				"Січ", "Лют", "Бер", "Кві", "Тра", "Чер", "Лип", "Сер", "Вер", "Жов", "Лис", "Гру",
				"Січень", "Лютий", "Березень", "Квітень", "Травень", "Червень", "Липень", "Серпень", "Вересень", "Жовтень", "Листопад", "Грудень"
			],
			AmPm: ["am", "pm", "AM", "PM"],
			S: function (j) {
				return j < 11 || j > 13 ? ["st", "nd", "rd", "th"][Math.min((j - 1) % 10, 3)] : "th";
			},
			srcformat: "Y-m-d",
			newformat: "d.m.Y",
			masks: {
				ShortDate: "n.j.Y",
				LongDate: "l, F d, Y",
				FullDateTime: "l, F d, Y G:i:s",
				MonthDay: "F d",
				ShortTime: "G:i",
				LongTime: "G:i:s",
				YearMonth: "F, Y"
			}
		}
	}
};
$.jgrid = $.jgrid || {};
$.extend(true, $.jgrid, {
	defaults: {
		locale: "ua"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		ua: $.extend({}, locInfo, { name: "українська", nameEnglish: "Ukrainian" }),
		uk: $.extend({}, locInfo, { name: "українська", nameEnglish: "Ukrainian" }),
		"uk-UA": $.extend({}, locInfo, { name: "українська (Україна)", nameEnglish: "Ukrainian (Ukraine)" })
	}
});
}));
