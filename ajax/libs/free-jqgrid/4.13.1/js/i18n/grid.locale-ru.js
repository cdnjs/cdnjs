/**
 * @license jqGrid Russian Translation v1.0 02.07.2009 based on translation by Alexey Kanaev, v1.1 21.01.2009 (http://softcore.com.ru) and 07.01.2015 (http://smartcore.ru)
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
		recordtext: "Просмотр {0} - {1} из {2}",
		emptyrecords: "Нет записей для просмотра",
		loadtext: "Загрузка...",
		pgtext: "Стр. {0} из {1}",
		pgfirst: "Первая стр.",
		pglast: "Последняя стр.",
		pgnext: "След. стр.",
		pgprev: "Пред. стр.",
		pgrecs: "Записей на стр.",
		showhide: "Показать/скрыть таблицу",
		savetext: "Сохранение..."
	},
	search: {
		caption: "Поиск...",
		Find: "Найти",
		Reset: "Сброс",
		odata: [
			{ oper: "eq", text: "равно" },
			{ oper: "ne", text: "не равно" },
			{ oper: "lt", text: "меньше" },
			{ oper: "le", text: "меньше или равно" },
			{ oper: "gt", text: "больше" },
			{ oper: "ge", text: "больше или равно" },
			{ oper: "bw", text: "начинается с" },
			{ oper: "bn", text: "не начинается с" },
			{ oper: "in", text: "находится в" },
			{ oper: "ni", text: "не находится в" },
			{ oper: "ew", text: "заканчивается на" },
			{ oper: "en", text: "не заканчивается на" },
			{ oper: "cn", text: "содержит" },
			{ oper: "nc", text: "не содержит" },
			{ oper: "nu", text: "равно NULL" },
			{ oper: "nn", text: "не равно NULL" }
		],
		groupOps: [
			{ op: "AND", text: "все" },
			{ op: "OR", text: "любой" }
		],
		addGroupTitle: "Добавить группу",
		deleteGroupTitle: "Удалить группу",
		addRuleTitle: "Добавить правило",
		deleteRuleTitle: "Удалить правило",
		operandTitle: "Выбрать операцию поиска",
		resetTitle: "Сбросить"
	},
	edit: {
		addCaption: "Добавить запись",
		editCaption: "Редактировать запись",
		bSubmit: "Сохранить",
		bCancel: "Отмена",
		bClose: "Закрыть",
		saveData: "Данные были измененны! Сохранить изменения?",
		bYes: "Да",
		bNo: "Нет",
		bExit: "Отмена",
		msg: {
			required: "Поле является обязательным",
			number: "Пожалуйста, введите правильное число",
			minValue: "значение должно быть больше либо равно",
			maxValue: "значение должно быть меньше либо равно",
			email: "некорректное значение e-mail",
			integer: "Пожалуйста, введите целое число",
			date: "Пожалуйста, введите правильную дату",
			url: "неверная ссылка. Необходимо ввести префикс ('http://' или 'https://')",
			nodefined: " не определено!",
			novalue: " возвращаемое значение обязательно!",
			customarray: "Пользовательская функция должна возвращать массив!",
			customfcheck: "Пользовательская функция должна присутствовать в случаи пользовательской проверки!"
		}
	},
	view: {
		caption: "Просмотр записи",
		bClose: "Закрыть"
	},
	del: {
		caption: "Удалить",
		msg: "Удалить выбранную запись(и)?",
		bSubmit: "Удалить",
		bCancel: "Отмена"
	},
	nav: {
		edittext: "",
		edittitle: "Редактировать выбранную запись",
		addtext: "",
		addtitle: "Добавить новую запись",
		deltext: "",
		deltitle: "Удалить выбранную запись",
		searchtext: "",
		searchtitle: "Найти записи",
		refreshtext: "",
		refreshtitle: "Обновить таблицу",
		alertcap: "Внимание",
		alerttext: "Пожалуйста, выберите запись",
		viewtext: "",
		viewtitle: "Просмотреть выбранную запись",
		savetext: "",
		savetitle: "Сохранить запись",
		canceltext: "",
		canceltitle: "Отмена изменений"
	},
	col: {
		caption: "Показать/скрыть столбцы",
		bSubmit: "Сохранить",
		bCancel: "Отмена"
	},
	errors: {
		errcap: "Ошибка",
		nourl: "URL не установлен",
		norecords: "Нет записей для обработки",
		model: "Число полей не соответствует числу столбцов таблицы!"
	},
	formatter: {
		integer: { thousandsSeparator: " ", defaultValue: "0" },
		number: { decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: "0,00" },
		currency: { decimalSeparator: ",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0,00" },
		date: {
			dayNames: [
				"Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
				"Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"
			],
			monthNames: [
				"Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек",
				"Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
			],
			AmPm: ["am", "pm", "AM", "PM"],
			S: function () { return ""; },
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
		locale: "ru"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		ru: $.extend({}, locInfo, { name: "русский", nameEnglish: "Russian" }),
		"ru-RU": $.extend({}, locInfo, { name: "русский (Россия)", nameEnglish: "Russian (Russia)" })
	}
});
}));
