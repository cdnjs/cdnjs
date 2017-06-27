/**
 * @license jqGrid Chinese Translation
 * 咖啡兔 yanhonglei@gmail.com
 * http://www.kafeitu.me
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
		recordtext: "{0} - {1}\u3000共 {2} 条", // 共字前是全角空格
		emptyrecords: "无数据显示",
		loadtext: "读取中...",
		pgtext: " {0} 共 {1} 页",
		pgfirst: "First Page",
		pglast: "Last Page",
		pgnext: "Next Page",
		pgprev: "Previous Page",
		pgrecs: "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "正在保存..."
	},
	search: {
		caption: "搜索...",
		Find: "查找",
		Reset: "重置",
		odata: [
			{ oper: "eq", text: "等于\u3000\u3000" },
			{ oper: "ne", text: "不等\u3000\u3000" },
			{ oper: "lt", text: "小于\u3000\u3000" },
			{ oper: "le", text: "小于等于" },
			{ oper: "gt", text: "大于\u3000\u3000" },
			{ oper: "ge", text: "大于等于" },
			{ oper: "bw", text: "开始于" },
			{ oper: "bn", text: "不开始于" },
			{ oper: "in", text: "属于\u3000\u3000" },
			{ oper: "ni", text: "不属于" },
			{ oper: "ew", text: "结束于" },
			{ oper: "en", text: "不结束于" },
			{ oper: "cn", text: "包含\u3000\u3000" },
			{ oper: "nc", text: "不包含" },
			{ oper: "nu", text: "不存在" },
			{ oper: "nn", text: "存在" }
		],
		groupOps: [
			{ op: "AND", text: "所有" },
			{ op: "OR",  text: "任一" }
		],
		addGroupTitle: "Add subgroup",
		deleteGroupTitle: "Delete group",
		addRuleTitle: "Add rule",
		deleteRuleTitle: "Delete rule",
		operandTitle: "Click to select search operation.",
		resetTitle: "Reset Search Value"
	},
	edit: {
		addCaption: "添加记录",
		editCaption: "编辑记录",
		bSubmit: "提交",
		bCancel: "取消",
		bClose: "关闭",
		saveData: "数据已改变，是否保存？",
		bYes: "是",
		bNo: "否",
		bExit: "取消",
		msg: {
			required: "此字段必需",
			number: "请输入有效数字",
			minValue: "输值必须大于等于 ",
			maxValue: "输值必须小于等于 ",
			email: "这不是有效的e-mail地址",
			integer: "请输入有效整数",
			date: "请输入有效时间",
			url: "无效网址。前缀必须为 ('http://' 或 'https://')",
			nodefined: " 未定义！",
			novalue: " 需要返回值！",
			customarray: "自定义函数需要返回数组！",
			customfcheck: "必须有自定义函数!"
		}
	},
	view: {
		caption: "查看记录",
		bClose: "关闭"
	},
	del: {
		caption: "删除",
		msg: "删除所选记录？",
		bSubmit: "删除",
		bCancel: "取消"
	},
	nav: {
		edittext: "",
		edittitle: "编辑所选记录",
		addtext: "",
		addtitle: "添加新记录",
		deltext: "",
		deltitle: "删除所选记录",
		searchtext: "",
		searchtitle: "查找",
		refreshtext: "",
		refreshtitle: "刷新表格",
		alertcap: "注意",
		alerttext: "请选择记录",
		viewtext: "",
		viewtitle: "查看所选记录",
		savetext: "",
		savetitle: "Save row",
		canceltext: "",
		canceltitle: "Cancel row editing"
	},
	col: {
		caption: "选择列",
		bSubmit: "确定",
		bCancel: "取消"
	},
	errors: {
		errcap: "错误",
		nourl: "没有设置url",
		norecords: "没有要处理的记录",
		model: "colNames 和 colModel 长度不等！"
	},
	formatter: {
		integer: { thousandsSeparator: ",", defaultValue: "0" },
		number: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, defaultValue: "0.00" },
		currency: { decimalSeparator: ".", thousandsSeparator: ",", decimalPlaces: 2, prefix: "", suffix: "", defaultValue: "0.00" },
		date: {
			dayNames:   [
			"日", "一", "二", "三", "四", "五", "六",
			"星期日", "星期一", "星期二", "星期三", "星期四", "星期五", "星期六"
			],
			monthNames: [
			"一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二",
			"一月", "二月", "三月", "四月", "五月", "六月", "七月", "八月", "九月", "十月", "十一月", "十二月"
			],
			AmPm: ["am", "pm", "上午", "下午"],
			S: function () {return "";},
			srcformat: "Y-m-d",
			newformat: "Y-m-d",
			masks: {
				// see http://php.net/manual/en/function.date.php for PHP format used in jqGrid
				// and see http://docs.jquery.com/UI/Datepicker/formatDate
				// and https://github.com/jquery/globalize#dates for alternative formats used frequently
				// one can find on https://github.com/jquery/globalize/tree/master/lib/cultures many
				// information about date, time, numbers and currency formats used in different countries
				// one should just convert the information in PHP format
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
				// month with year
				//    Y - A full numeric representation of a year, 4 digits
				//    F - A full textual representation of a month
				YearMonth: "F, Y" // in jQuery UI Datepicker: "MMMM, yyyy"
			}
		}
	}
};
$.jgrid = $.jgrid || {};
$.extend(true, $.jgrid, {
	defaults: {
		locale: "cn"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		cn: $.extend({}, locInfo, { name: "中文", nameEnglish: "Chinese" }),
		zh: $.extend({}, locInfo, { name: "中文", nameEnglish: "Chinese" }),
		"zh-CN": $.extend({}, locInfo, { name: "中文(中华人民共和国)", nameEnglish: "Chinese (Simplified, PRC)" })
	}
});
}));
