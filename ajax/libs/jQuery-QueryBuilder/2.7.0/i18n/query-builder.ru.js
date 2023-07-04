/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Russian (ru)
 * Author: 
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

QueryBuilder.regional['ru'] = {
  "__locale": "Russian (ru)",
  "add_rule": "Добавить",
  "add_group": "Добавить группу",
  "delete_rule": "Удалить",
  "delete_group": "Удалить",
  "conditions": {
    "AND": "И",
    "OR": "ИЛИ"
  },
  "operators": {
    "equal": "равно",
    "not_equal": "не равно",
    "in": "из указанных",
    "not_in": "не из указанных",
    "less": "меньше",
    "less_or_equal": "меньше или равно",
    "greater": "больше",
    "greater_or_equal": "больше или равно",
    "between": "между",
    "not_between": "не между",
    "begins_with": "начинается с",
    "not_begins_with": "не начинается с",
    "contains": "содержит",
    "not_contains": "не содержит",
    "ends_with": "оканчивается на",
    "not_ends_with": "не оканчивается на",
    "is_empty": "пустая строка",
    "is_not_empty": "не пустая строка",
    "is_null": "пусто",
    "is_not_null": "не пусто"
  },
  "errors": {
    "no_filter": "Фильтр не выбран",
    "empty_group": "Группа пуста",
    "radio_empty": "Не выбрано значение",
    "checkbox_empty": "Не выбрано значение",
    "select_empty": "Не выбрано значение",
    "string_empty": "Не заполнено",
    "string_exceed_min_length": "Должен содержать больше {0} символов",
    "string_exceed_max_length": "Должен содержать меньше {0} символов",
    "string_invalid_format": "Неверный формат ({0})",
    "number_nan": "Не число",
    "number_not_integer": "Не число",
    "number_not_double": "Не число",
    "number_exceed_min": "Должно быть больше {0}",
    "number_exceed_max": "Должно быть меньше, чем {0}",
    "number_wrong_step": "Должно быть кратно {0}",
    "number_between_invalid": "Недопустимые значения, {0} больше {1}",
    "datetime_empty": "Не заполнено",
    "datetime_invalid": "Неверный формат даты ({0})",
    "datetime_exceed_min": "Должно быть, после {0}",
    "datetime_exceed_max": "Должно быть, до {0}",
    "datetime_between_invalid": "Недопустимые значения, {0} больше {1}",
    "boolean_not_valid": "Не логическое",
    "operator_not_multiple": "Оператор \"{1}\" не поддерживает много значений"
  },
  "invert": "Инвертировать",
  "NOT": "НЕ"
};

QueryBuilder.defaults({ lang_code: 'ru' });
}));