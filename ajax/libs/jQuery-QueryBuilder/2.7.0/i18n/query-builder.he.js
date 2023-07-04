/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Hebrew (he)
 * Author: Kfir Stri https://github.com/kfirstri
 * Licensed under MIT (https://opensource.org/licenses/MIT)
 */

(function(root, factory) {
    if (typeof define == 'function' && define.amd) {
        define(['jquery', 'query-builder'], factory);
    }
    else {
        factory(root.jQuery);
    }
}(this, function($) {
"use strict";

var QueryBuilder = $.fn.queryBuilder;

QueryBuilder.regional['he'] = {
  "__locale": "Hebrew (he)",
  "__author": "Kfir Stri https://github.com/kfirstri",
  "add_rule": "הוסף כלל",
  "add_group": "הוסף קבוצה",
  "delete_rule": "מחק",
  "delete_group": "מחק",
  "conditions": {
    "AND": "וגם",
    "OR": "או"
  },
  "operators": {
    "equal": "שווה ל",
    "not_equal": "שונה מ",
    "in": "חלק מ",
    "not_in": "לא חלק מ",
    "less": "פחות מ",
    "less_or_equal": "פחות או שווה ל",
    "greater": "גדול מ",
    "greater_or_equal": "גדול או שווה ל",
    "between": "בין",
    "not_between": "לא בין",
    "begins_with": "מתחיל ב",
    "not_begins_with": "לא מתחיל ב",
    "contains": "מכיל",
    "not_contains": "לא מכיל",
    "ends_with": "מסתיים ב",
    "not_ends_with": "לא מסתיים ב",
    "is_empty": "ריק",
    "is_not_empty": "לא ריק",
    "is_null": "חסר ערך",
    "is_not_null": "לא חסר ערך"
  },
  "errors": {
    "no_filter": "לא נבחרו מסננים",
    "empty_group": "הקבוצה רירקה",
    "radio_empty": "לא נבחר אף ערך",
    "checkbox_empty": "לא נבחר אף ערך",
    "select_empty": "לא נבחר אף ערך",
    "string_empty": "חסר ערך",
    "string_exceed_min_length": "המחרוזת חייבת להכיל לפחות {0} תווים",
    "string_exceed_max_length": "המחרוזת לא יכולה להכיל יותר מ{0} תווים",
    "string_invalid_format": "המחרוזת בפורמט שגוי ({0})",
    "number_nan": "זהו לא מספר",
    "number_not_integer": "המספר אינו מספר שלם",
    "number_not_double": "המספר אינו מספר עשרוני",
    "number_exceed_min": "המספר צריך להיות גדול מ {0}",
    "number_exceed_max": "המספר צריך להיות קטן מ{0}",
    "number_wrong_step": "המספר צריך להיות כפולה של {0}",
    "datetime_empty": "תאריך ריק",
    "datetime_invalid": "פורמט תאריך שגוי ({0})",
    "datetime_exceed_min": "התאריך חייב להיות אחרי {0}",
    "datetime_exceed_max": "התאריך חייב להיות לפני {0}",
    "boolean_not_valid": "זהו לא בוליאני",
    "operator_not_multiple": "האופרטור \"{1}\" לא יכול לקבל ערכים מרובים"
  },
  "invert": "הפוך שאילתא",
  "NOT": "לא"
};

QueryBuilder.defaults({ lang_code: 'he' });
}));