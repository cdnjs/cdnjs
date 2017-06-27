/**
 * jqGrid Arabic Translation
 * 
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
	name: "العربية",
	nameEnglish: "Arabic",
	isRTL: true,
	defaults : {
		recordtext: "تسجيل {0} - {1} على {2}",
		emptyrecords: "لا يوجد تسجيل",
		loadtext: "تحميل...",
		pgtext : "صفحة {0} على {1}",
		pgfirst : "First Page",
		pglast : "Last Page",
		pgnext : "Next Page",
		pgprev : "Previous Page",
		pgrecs : "Records per Page",
		showhide: "Toggle Expand Collapse Grid",
		savetext: "يتم الآن الحفظ..."
	},
	search : {
		caption: "بحث...",
		Find: "بحث",
		Reset: "إلغاء",
		odata: [{ oper:'eq', text:"يساوي"},{ oper:'ne', text:"يختلف"},{ oper:'lt', text:"أقل"},{ oper:'le', text:"أقل أو يساوي"},{ oper:'gt', text:"أكبر"},{ oper:'ge', text:"أكبر أو يساوي"},{ oper:'bw', text:"يبدأ بـ"},{ oper:'bn', text:"لا يبدأ بـ"},{ oper:'in', text:"est dans"},{ oper:'ni', text:"n'est pas dans"},{ oper:'ew', text:"ينته بـ"},{ oper:'en', text:"لا ينته بـ"},{ oper:'cn', text:"يحتوي"},{ oper:'nc', text:"لا يحتوي"},{ oper:'nu', text:'is null'},{ oper:'nn', text:'is not null'}],
		groupOps: [	{ op: "مع", text: "الكل" },	{ op: "أو",  text: "لا أحد" }],
		operandTitle : "Click to select search operation.",
		resetTitle : "Reset Search Value"
	},
	edit : {
		addCaption: "اضافة",
		editCaption: "تحديث",
		bSubmit: "تثبيث",
		bCancel: "إلغاء",
		bClose: "غلق",
		saveData: "تغيرت المعطيات هل تريد التسجيل ?",
		bYes: "نعم",
		bNo: "لا",
		bExit: "إلغاء",
		msg: {
			required: "خانة إجبارية",
			number: "سجل رقم صحيح",
			minValue: "يجب أن تكون القيمة أكبر أو تساوي 0",
			maxValue: "يجب أن تكون القيمة أقل أو تساوي 0",
			email: "بريد غير صحيح",
			integer: "سجل عدد طبييعي صحيح",
			url: "ليس عنوانا صحيحا. البداية الصحيحة ('http://' أو 'https://')",
			nodefined : " ليس محدد!",
			novalue : " قيمة الرجوع مطلوبة!",
			customarray : "يجب على الدالة الشخصية أن تنتج جدولا",
			customfcheck : "الدالة الشخصية مطلوبة في حالة التحقق الشخصي"
		}
	},
	view : {
		caption: "رأيت التسجيلات",
		bClose: "غلق"
	},
	del : {
		caption: "حذف",
		msg: "حذف التسجيلات المختارة ?",
		bSubmit: "حذف",
		bCancel: "إلغاء"
	},
	nav : {
		edittext: "",
		edittitle: "تغيير التسجيل المختار",
		addtext: "",
		addtitle: "إضافة تسجيل",
		deltext: "",
		deltitle: "حذف التسجيل المختار",
		searchtext: "",
		searchtitle: "بحث عن تسجيل",
		refreshtext: "",
		refreshtitle: "تحديث الجدول",
		alertcap: "تحذير",
		alerttext: "يرجى إختيار السطر",
		viewtext: "",
		viewtitle: "إظهار السطر المختار"
	},
	col : {
		caption: "إظهار/إخفاء الأعمدة",
		bSubmit: "تثبيث",
		bCancel: "إلغاء"
	},
	errors : {
		errcap : "خطأ",
		nourl : "لا يوجد عنوان محدد",
		norecords: "لا يوجد تسجيل للمعالجة",
		model : "عدد العناوين (colNames) <> عدد التسجيلات (colModel)!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0,00'},
		currency : {decimalSeparator:",", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0,00'},
		date : {
			dayNames:   [
				"الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت",
				"الأحد", "الإثنين", "الثلاثاء", "الأربعاء", "الخميس", "الجمعة", "السبت"
			],
			monthNames: [
				"جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر",
				"جانفي", "فيفري", "مارس", "أفريل", "ماي", "جوان", "جويلية", "أوت", "سبتمبر", "أكتوبر", "نوفمبر", "ديسمبر"
			],
			AmPm : ["صباحا","مساءا","صباحا","مساءا"],
			S: function (j) {return j === 1 ? 'er' : 'e';},
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
		locale: "ar"
	},
	locales: {
		// In general the property name is free, but it's recommended to use the names based on
		// http://www.iana.org/assignments/language-subtag-registry/language-subtag-registry
		// http://rishida.net/utils/subtags/ and RFC 5646. See Appendix A of RFC 5646 for examples.
		// One can use the lang attribute to specify language tags in HTML, and the xml:lang attribute for XML
		// if it exists. See http://www.w3.org/International/articles/language-tags/#extlang
		ar: locInfo
	}
});
}(jQuery));
