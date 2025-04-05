/**
 * jqGrid Hebrew Translation
 * Shuki Shukrun shukrun.shuki@gmail.com
 * http://trirand.com/blog/ 
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
$.jgrid.regional["he"] = {
	defaults : {
		recordtext: "מציג {0} - {1} מתוך {2}",
		emptyrecords: "אין רשומות להציג",
		loadtext: "טוען...",
		pgtext : "דף {0} מתוך {1}",
		savetext: "שומר...",
		pgfirst : "דף ראשון",
		pglast : "דף אחרון",
		pgnext : "דף הבאה",
		pgprev : "דף הקודם",
		pgrecs : "רשומות לעמוד",
		showhide: "החלפת מצב: הרחב כווץ טבלה",
		// mobile
		pagerCaption : "טבלה::הגדרות עמוד",
		pageText : "דף:",
		recordPage : "רשומות לעמוד",
		nomorerecs : "אין יותר רשומות...",
		scrollPullup: "גלול למעלה כדי לטעון עוד...",
		scrollPulldown : "גלול למטה כדי לרענן...",
		scrollRefresh : "שחרר כדי לרענן...",
		valT : "מסומן",
		valF : "אינה מסומנת",
		selectLine : "בחר שורה",
		selectAllLines : "בחר כל השורות"
	},
	search : {
		caption: "מחפש...",
		Find: "חפש",
		Reset: "איפוס",
		odata: [{ oper:'eq', text:"שווה"},{ oper:'ne', text:"לא שווה"},{ oper:'lt', text:"קטן"},{ oper:'le', text:"קטן או שווה"},{ oper:'gt', text:"גדול"},{ oper:'ge', text:"גדול או שווה"},{ oper:'bw', text:"מתחיל ב"},{ oper:'bn', text:"לא מתחיל ב"},{ oper:'in', text:"נמצא ב"},{ oper:'ni', text:"לא נמצא ב"},{ oper:'ew', text:"מסתיים ב"},{ oper:'en', text:"לא מסתיים ב"},{ oper:'cn', text:"מכיל"},{ oper:'nc', text:"לא מכיל"},{ oper:'nu', text:'שווה ל null'},{ oper:'nn', text:'אינו null'}, {oper:'bt', text:'בֵּין'}],
		groupOps: [	{ op: "AND", text: "הכל" },	{ op: "OR",  text: "אחד מ" }],
		operandTitle : "לחץ כדי לבחור פעולת חיפוש.",
		resetTitle : "איפוס ערך חיפוש",
		addsubgrup : "הוסף תת-קבוצה",
		addrule : "הוסף כלל",
		delgroup : "מחק את הקבוצה",
		delrule : "מחק כלל",
		Close : "סגור",
		Operand : "Operand : ",
		Operation : "Oper : ",
		filterFor : "לסנן עבור"
	},
	edit : {
		addCaption: "הוסף רשומה",
		editCaption: "ערוך רשומה",
		bSubmit: "עדכן",
		bCancel: "בטל",
		bClose: "סגור",
		saveData: "נתונים השתנו! לשמור?",
		bYes : "כן",
		bNo : "לא",
		bExit : "בטל",
		msg: {
			required:"שדה חובה",
			number:"אנא, הכנס מספר תקין",
			minValue:"ערך צריך להיות גדול או שווה ל ",
			maxValue:"ערך צריך להיות קטן או שווה ל ",
			email: "היא לא כתובת איימל תקינה",
			integer: "אנא, הכנס מספר שלם",
			date: "אנא, הכנס תאריך תקין",
			url: "הכתובת אינה תקינה. דרושה תחילית ('http://' או 'https://')",
			nodefined : " אינו מוגדר!",
			novalue : " נדרש ערך החזרה!",
			customarray : "פונקציה מותאמת אישית אמורה להחזיר מערך!",
			customfcheck : "פונקציה מותאמת אישית צריכה להיות נוכחת במקרה של בדיקה מותאמת אישית!"
		}
	},
	view : {
		caption: "הצג רשומה",
		bClose: "סגור"
	},
	del : {
		caption: "מחק",
		msg: "האם למחוק את הרשומה/ות המסומנות?",
		bSubmit: "מחק",
		bCancel: "בטל"
	},
	nav : {
		edittext: "",
		edittitle: "ערוך שורה מסומנת",
		addtext:"",
		addtitle: "הוסף שורה חדשה",
		deltext: "",
		deltitle: "מחק שורה מסומנת",
		searchtext: "",
		searchtitle: "חפש רשומות",
		refreshtext: "",
		refreshtitle: "טען גריד מחדש",
		alertcap: "אזהרה",
		alerttext: "אנא, בחר שורה",
		viewtext: "",
		viewtitle: "הצג שורה מסומנת",
		savetext: "",
		savetitle: "שמור שורה",
		canceltext: "",
		canceltitle : "בטל את עריכת השורה",
		selectcaption : "פעולות..."
	},
	col : {
		caption: "הצג/הסתר עמודות",
		bSubmit: "שלח",
		bCancel: "בטל"
	},
	errors : {
		errcap : "שגיאה",
		nourl : "לא הוגדרה כתובת url",
		norecords: "אין רשומות לעבד",
		model : "אורך של colNames <> colModel!"
	},
	formatter : {
		integer : {thousandsSeparator: " ", defaultValue: '0'},
		number : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, defaultValue: '0.00'},
		currency : {decimalSeparator:".", thousandsSeparator: " ", decimalPlaces: 2, prefix: "", suffix:"", defaultValue: '0.00'},
		date : {
			dayNames:   [
				"א", "ב", "ג", "ד", "ה", "ו", "ש",
				"ראשון", "שני", "שלישי", "רביעי", "חמישי", "שישי", "שבת"
			],
			monthNames: [
				"ינו", "פבר", "מרץ", "אפר", "מאי", "יונ", "יול", "אוג", "ספט", "אוק", "נוב", "דצמ",
				"ינואר", "פברואר", "מרץ", "אפריל", "מאי", "יוני", "יולי", "אוגוסט", "ספטמבר", "אוקטובר", "נובמבר", "דצמבר"
			],
			AmPm : ["לפני הצהרים","אחר הצהרים","לפני הצהרים","אחר הצהרים"],
			S: function (j) {return j < 11 || j > 13 ? ['', '', '', ''][Math.min((j - 1) % 10, 3)] : ''},
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
		sortasc : "מיון בסדר עולה",
		sortdesc : "מיון בסדר יורד",
		columns : "עמודות",
		filter : "מסנן",
		grouping : "קבץ לפי",
		ungrouping : "פירוק קבוצה",
		searchTitle : "קבל פריטים בעלי ערך אשר:",
		freeze : "קפא",
		unfreeze : "שחררו את ההקפאה",
		reorder : "העבר לסדר מחדש",
		hovermenu: "לחץ לפעולות מהירות בעמודה"
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
