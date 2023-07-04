/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Bulgarian (bg)
 * Author: Valentin Hristov
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

QueryBuilder.regional['bg'] = {
  "__locale": "Bulgarian (bg)",
  "__author": "Valentin Hristov",
  "add_rule": "Добави правило",
  "add_group": "Добави група",
  "delete_rule": "Изтрий",
  "delete_group": "Изтрий",
  "conditions": {
    "AND": "И",
    "OR": "ИЛИ"
  },
  "operators": {
    "equal": "равно",
    "not_equal": "различно",
    "in": "в",
    "not_in": "не е в",
    "less": "по-малко",
    "less_or_equal": "по-малко или равно",
    "greater": "по-голям",
    "greater_or_equal": "по-голям или равно",
    "between": "между",
    "not_between": "не е между",
    "begins_with": "започва с",
    "not_begins_with": "не започва с",
    "contains": "съдържа",
    "not_contains": "не съдържа",
    "ends_with": "завършва с",
    "not_ends_with": "не завършва с",
    "is_empty": "е празно",
    "is_not_empty": "не е празно",
    "is_null": "е нищо",
    "is_not_null": "различно от нищо"
  },
  "errors": {
    "no_filter": "Не е избран филтър",
    "empty_group": "Групата е празна",
    "radio_empty": "Не е селектирана стойност",
    "checkbox_empty": "Не е селектирана стойност",
    "select_empty": "Не е селектирана стойност",
    "string_empty": "Празна стойност",
    "string_exceed_min_length": "Необходимо е да съдържа поне {0} символа",
    "string_exceed_max_length": "Необходимо е да съдържа повече от {0} символа",
    "string_invalid_format": "Невалиден формат ({0})",
    "number_nan": "Не е число",
    "number_not_integer": "Не е цяло число",
    "number_not_double": "Не е реално число",
    "number_exceed_min": "Трябва да е по-голямо от {0}",
    "number_exceed_max": "Трябва да е по-малко от {0}",
    "number_wrong_step": "Трябва да е кратно на {0}",
    "datetime_empty": "Празна стойност",
    "datetime_invalid": "Невалиден формат на дата ({0})",
    "datetime_exceed_min": "Трябва да е след {0}",
    "datetime_exceed_max": "Трябва да е преди {0}",
    "boolean_not_valid": "Не е булева",
    "operator_not_multiple": "Оператора \"{1}\" не може да приеме множество стойности"
  }
};

QueryBuilder.defaults({ lang_code: 'bg' });
}));