/**
 * jqGrid Russian Translation v1.0 02.07.2009 (based on translation by Alexey Kanaev v1.1 21.01.2009, http://softcore.com.ru)
 * Sergey Dyagovchenko
 * http://d.sumy.ua
 * Tony Tomov
 * http://www.guriddo.net
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
$.jgrid.regional["ru"] = {
	defaults : {
		recordtext: "Просмотр {0} - {1} из {2}",
		emptyrecords: "Нет записей для просмотра",
		loadtext: "Загрузка...",
		pgtext : "Стр. {0} из {1}",
		savetext: "Сохранения...",
		pgfirst : "Первая",
		pglast : "Последняя",
		pgnext : "Следующая",
		pgprev : "Предыдущая",
		pgrecs : "Записей на стр.",
		showhide: "Показать/Скрыть таблицу",
		// mobile
		pagerCaption : "Грид::Параметры страницы",
		pageText : "Страница:",
		recordPage : "Записей на стр.",
		nomorerecs : "Нет больше записей...",
		scrollPullup: "Потяните, чтобы загрузить более...",
		scrollPulldown : "Потяните вниз чтобы обновить...",
		scrollRefresh : "Отпустите, чтобы обновить...",
		valT : "checked",
		valF : "unchecked",
		selectLine : "Select row",
		selectAllLines : "Select all rows"
	},
	search : {
		caption: "Поиск...",
		Find: "Найти",
		Reset: "Сброс",
		odata: [{ oper:'eq', text:"равно"},{ oper:'ne', text:"не равно"},{ oper:'lt', text:"меньше"},{ oper:'le', text:"меньше или равно"},{ oper:'gt', text:"больше"},{ oper:'ge', text:"больше или равно"},{ oper:'bw', text:"начинается с"},{ oper:'bn', text:"не начинается с"},{ oper:'in', text:"находится в"},{ oper:'ni', text:"не находится в"},{ oper:'ew', text:"заканчивается на"},{ oper:'en', text:"не заканчивается на"},{ oper:'cn', text:"содержит"},{ oper:'nc', text:"не содержит"},{ oper:'nu', text:"равно NULL"},{ oper:'nn', text:"не равно NULL"}, {oper:'bt', text:'между'}],
		groupOps: [	{ op: "AND", text: "все" }, { op: "OR", text: "любой" }],
		operandTitle : "Выбрать поисковую операцию.",
		resetTitle : "Сбросить поиск",
		addsubgrup : "Добавить группу",
		addrule : "Добавить правило",
		delgroup : "Удалить группу",
		delrule : "Удалить правило",
		Close : "Закрыть",
		Operand : "Операнд : ",
		Operation : "Опер. : ",
		filterFor : "filter for"
	},
	edit : {
		addCaption: "Добавить запись",
		editCaption: "Редактировать запись",
		bSubmit: "Сохранить",
		bCancel: "Отмена",
		bClose: "Закрыть",
		saveData: "Данные были измененны! Сохранить изменения?",
		bYes : "Да",
		bNo : "Нет",
		bExit : "Отмена",
		msg: {
			required:"Поле является обязательным",
			number:"Пожалуйста, введите правильное число",
			minValue:"значение должно быть больше либо равно",
			maxValue:"значение должно быть меньше либо равно",
			email: "некорректное значение e-mail",
			integer: "Пожалуйста, введите целое число",
			date: "Пожалуйста, введите правильную дату",
			url: "неверная ссылка. Необходимо ввести префикс ('http://' или 'https://')",
			nodefined : " не определено!",
			novalue : " возвращаемое значение обязательно!",
			customarray : "Пользовательская функция должна возвращать массив!",
			customfcheck : "Пользовательская функция должна присутствовать в случаи пользовательской проверки!"
		}
	},
	view : {
		caption: "Просмотр записи",
		bClose: "Закрыть"
	},
	del : {
		caption: "Удалить",
		msg: "Удалить выбранную запись(и)?",
		bSubmit: "Удалить",
		bCancel: "Отмена"
	},
	nav : {
		edittext: " ",
		edittitle: "Редактировать выбранную запись",
		addtext:" ",
		addtitle: "Добавить новую запись",
		deltext: " ",
		deltitle: "Удалить выбранную запись",
		searchtext: " ",
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
		canceltitle : "Отмена сохранения",
		selectcaption : "Действия..."
	},
	col : {
		caption: "Показать/скрыть столбцы",
		bSubmit: "Сохранить",
		bCancel: "Отмена"	
	},
	errors : {
		errcap : "Ошибка",
		nourl : "URL не установлен",
		norecords: "Нет записей для обработки",
		model : "Число полей не соответствует числу столбцов таблицы!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб",
				"Воскресение", "Понедельник", "Вторник", "Среда", "Четверг", "Пятница", "Суббота"
			],
			monthNames: [
				"Янв", "Фев", "Мар", "Апр", "Май", "Июн", "Июл", "Авг", "Сен", "Окт", "Ноя", "Дек",
				"Январь", "Февраль", "Март", "Апрель", "Май", "Июнь", "Июль", "Август", "Сентябрь", "Октябрь", "Ноябрь", "Декабрь"
			],
			AmPm : ["am","pm","AM","PM"],
			S: function (j) {return j < 11 || j > 13 ? ['st', 'nd', 'rd', 'th'][Math.min((j - 1) % 10, 3)] : 'th';},
			srcformat: 'Y-m-d',
			newformat: 'd.m.Y',
			parseRe : /[#%\\\/:_;.,\t\s-]/,
			masks : {
				ISO8601Long:"Y-m-d H:i:s",
				ISO8601Short:"Y-m-d",
				ShortDate: "n.j.Y",
				LongDate: "l, F d, Y",
				FullDateTime: "l, F d, Y G:i:s",
				MonthDay: "F d",
				ShortTime: "G:i",
				LongTime: "G:i:s",
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
		sortasc : "Сортировка по возрастанию",
		sortdesc : "Сортировка по убыванию",
		columns : "Колонны",
		filter : "Филтрировать",
		grouping : "Группа по",
		ungrouping : "Разгруппировать",
		searchTitle : "Строки со значениями",
		freeze : "Закрепление",
		unfreeze : "Отмена закрепление",
		reorder : "Переместить в порядок",
		hovermenu: "Щелкните, чтобы перейти к быстрым действиям в столбце "
	},
	clipboard : {
		menus : {
			copy_act : "Copy Selected to Clipboard",
			paste_act : "Paste Update from Clipboard",
			paste_act_add: "Paste Add from Clipboard",
			undo_act : "Undo",
			repeat_act_row : "Repeat row vertically",
			repeat_act_col : "Repeat column horizontally",
			cancel_act : "Cancel"
		},
		msg : {
			text_c : "Text copied to clipboard.",
			select_pos : "Please click position to paste!",
			info_cap : "Information",
			total_row : "Total rows: ",
			insert_row: "Inserted: ",
			update_row: "Updated: "
		},
		errors : {
			enb_prm : "Copy paste disabled in browser, please enable it!",
			copy_err : "Failed to copy to clipboard: ",
			read_err : "Failed to read clipboard contents: ",
			get_data_err : "Can not get data from clipboard or empty!",
			start_ind_err : "Start index of the cell is not valid!",
			local_stor_err : "Local storage not available! Can not store data for undo changes!",
			not_array_err: "Data can not be converted to array"
		}
	}
};
}));
