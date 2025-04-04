(function( factory ) {
	if ( typeof define === 'function' && define.amd ) {
		// AMD
		define( [], factory);
	}
	else if ( typeof exports === 'object' ) {
		// CommonJS
		module.exports = factory();
	}
	// No browser loader - use JSON, ESM, CJS or AMD
}
(function() {
    return {
    "processing": "מעבד...",
    "lengthMenu": "הצג _MENU_ פריטים",
    "zeroRecords": "לא נמצאו רשומות מתאימות",
    "emptyTable": "לא נמצאו רשומות מתאימות",
    "infoEmpty": "0 עד 0 מתוך 0 רשומות",
    "infoFiltered": "(מסונן מסך _MAX_  רשומות)",
    "search": "חפש:",
    "paginate": {
        "first": "ראשון",
        "previous": "קודם",
        "next": "הבא",
        "last": "אחרון"
    },
    "searchPanes": {
        "clearMessage": "איפוס מסננים",
        "collapse": {
            "0": "מסנני חיפוש",
            "_": "מסנני חיפוש (%d)"
        },
        "count": "ספירה",
        "emptyPanes": "אין מסנני חיפוש",
        "loadMessage": "מסנני חיפוש בטעינה",
        "title": "מסננים פעילים - %d",
        "showMessage": "הצג הכל",
        "countFiltered": "{מוצג} ({סה\"כ})",
        "collapseMessage": "מוטט הכל"
    },
    "aria": {
        "sortAscending": "מיון בסדר עולה",
        "sortDescending": "מיון בסדר יורד"
    },
    "autoFill": {
        "cancel": "ביטול",
        "fill": "מלא את כל התאים עם  <i>%d<i><\/i><\/i>",
        "fillHorizontal": "מלא תאים במאוזן",
        "fillVertical": "מלא תאים במאונך",
        "info": "מילוי אוטומטי"
    },
    "buttons": {
        "colvis": "נראות עמודות",
        "colvisRestore": "שחזור נראות",
        "copy": "העתק",
        "copySuccess": {
            "1": "רשומה 1 הועתקה",
            "_": "%ds רשומות הועתקו"
        },
        "copyTitle": "העתקת תוכן",
        "csv": "CSV",
        "excel": "Excel",
        "pageLength": {
            "-1": "הצג את כל הרשומות",
            "_": "הצג %d רשומות",
            "1": "הצג רשומה אחת"
        },
        "pdf": "PDF",
        "print": "הדפס",
        "copyKeys": "לחץ ctrl או u2318 + C על מנת להעתיק את תוכן הטבלה.",
        "collection": "אוסף",
        "createState": "צור מצב",
        "removeAllStates": "הסר את כל המצבים",
        "removeState": "הסר",
        "renameState": "שנה שם",
        "savedStates": "מצבים שמורים",
        "stateRestore": "מצב %d",
        "updateState": "עדכן"
    },
    "thousands": ",",
    "datetime": {
        "previous": "הקודם",
        "next": "הבא",
        "hours": "שעה",
        "minutes": "דקה",
        "seconds": "שניה",
        "unknown": "-",
        "amPm": [
            "לפנה\"צ",
            "אחה\"צ"
        ],
        "months": {
            "0": "ינואר",
            "1": "פברואר",
            "10": "נובמבר",
            "11": "דצמבר",
            "2": "מרץ",
            "3": "אפריל",
            "4": "מאי",
            "5": "יוני",
            "6": "יולי",
            "7": "אוגוסט",
            "8": "ספטמבר",
            "9": "אוקטובר"
        },
        "weekdays": [
            "א",
            "ב",
            "ג",
            "ד",
            "ה",
            "ו",
            "ש"
        ]
    },
    "editor": {
        "close": "סגור",
        "create": {
            "button": "חדש",
            "title": "צור רשומה חדשה",
            "submit": "צור"
        },
        "edit": {
            "button": "ערוך",
            "title": "עריכת רשומה",
            "submit": "עדכן"
        },
        "remove": {
            "button": "מחק",
            "title": "מחיקה",
            "submit": "מחק",
            "confirm": {
                "_": "האם אתה בטוח שברצונך למחוק %d רשומות?",
                "1": "האם אתה בטוח שברצונך למחוק רשומה אחת?"
            }
        },
        "error": {
            "system": "אירעה שגיאת מערכת (פרטים נוספים)."
        },
        "multi": {
            "title": "מגוון ערכים שונים",
            "info": "הרשומות שנבחרו מכילים מישע שונה עבור שדה זה. על מנת להגדיר את ששדה זה בכל הרשומות יכיל ערך זהה, לחץ כאן. אחרת הם יישארו עם אותו ערך שהתקבל",
            "restore": "בטל שינוי",
            "noMulti": "שדה זה יכול ליות מוגדר בנפרד אך לא כקבוצה"
        }
    },
    "decimal": "עשרוני",
    "loadingRecords": "טוען...",
    "searchBuilder": {
        "add": "הוסף תנאי",
        "button": {
            "0": "בניית חיפוש",
            "_": "בניית חיפוש (%d)"
        },
        "clearAll": "נקה הכל",
        "condition": "תנאי",
        "conditions": {
            "date": {
                "after": "אחרי",
                "before": "לפני",
                "between": "בין",
                "empty": "ריק",
                "equals": "שווה ל",
                "not": "לא",
                "notBetween": "לא בין",
                "notEmpty": "לא ריק"
            },
            "number": {
                "between": "בין",
                "empty": "ריק",
                "equals": "שווה ל",
                "gt": "גדול מ",
                "gte": "גדול או שווה ל",
                "lt": "קטן מ",
                "lte": "קטן או שווה ל",
                "not": "לא",
                "notBetween": "לא בין",
                "notEmpty": "לא ריק"
            },
            "string": {
                "contains": "מכיל",
                "empty": "ריק",
                "endsWith": "נגמר ב",
                "equals": "שווה ל",
                "not": "לא",
                "notEmpty": "לא ריק",
                "startsWith": "מתחיל ב",
                "notContains": "לא מכיל",
                "notEndsWith": "לא מסתיים ב",
                "notStartsWith": "לא מתחיל ב"
            },
            "array": {
                "equals": "שווה",
                "empty": "ריק",
                "contains": "מכיל",
                "not": "לא",
                "notEmpty": "לא ריק",
                "without": "ללא"
            }
        },
        "data": "תוכן",
        "deleteTitle": "מחיקת חוק סינון",
        "logicAnd": "וגם",
        "logicOr": "או",
        "title": {
            "0": "בניית חיפוש",
            "_": "בניית חיפוש (%d)"
        },
        "value": "ערך",
        "leftTitle": "הזח קריטריונים החוצה",
        "rightTitle": "הזח קריטריונים פנימה"
    },
    "select": {
        "cells": {
            "1": "תא אחד נבחר",
            "_": "%d תאים נבחרו"
        },
        "columns": {
            "1": "עמודה אחת נבחרה",
            "_": "%d עמודות נבחרו"
        },
        "rows": {
            "1": "שורה אחת נבחרה",
            "_": "%d שורות נבחרו"
        }
    },
    "stateRestore": {
        "creationModal": {
            "button": "צור",
            "columns": {
                "search": "חיפוש עמודות",
                "visible": "נראות עמודות"
            },
            "name": "שם:",
            "order": "מיון",
            "paging": "דפדוף",
            "scroller": "מיקום גלילה",
            "search": "חיפוש",
            "searchBuilder": "בניית חיפוש",
            "select": "בחירה",
            "title": "צור מצב חדש",
            "toggleLabel": "כולל:"
        },
        "emptyStates": "אין מצבים שמורים",
        "removeSubmit": "הסר",
        "removeTitle": "הסר מצב",
        "renameButton": "שנה שם",
        "renameLabel": "שם חדש עבור %s:",
        "renameTitle": "שינוי שם מצב",
        "duplicateError": "מצב עם השם הזה כבר קיים.",
        "emptyError": "השם לא יכול להיות ריק.",
        "removeConfirm": "האם אתה בטוח שברצונך להסיר %s?",
        "removeError": "כשל בהסרת מצב.",
        "removeJoiner": " וגם "
    },
    "infoThousands": ",",
    "searchPlaceholder": "טקסט לחיפוש",
    "info": "מציג _START_ עד _END_ מתוך _TOTAL_ רשומות",
    "infoPostFix": "מציג _START_ עד _END_ מתוך _TOTAL_ רשומות"
};
}));
