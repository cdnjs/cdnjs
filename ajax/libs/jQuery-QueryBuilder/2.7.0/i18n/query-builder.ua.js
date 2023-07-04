/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Ukrainian (ua)
 * Author: Megaplan, mborisv <bm@megaplan.ru>
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

QueryBuilder.regional['ua'] = {
  "__locale": "Ukrainian (ua)",
  "__author": "Megaplan, mborisv <bm@megaplan.ru>",
  "add_rule": "Додати",
  "add_group": "Додати групу",
  "delete_rule": "Видалити",
  "delete_group": "Видалити",
  "conditions": {
    "AND": "І",
    "OR": "АБО"
  },
  "operators": {
    "equal": "дорівнює",
    "not_equal": "не дорівнює",
    "in": "з вказаних",
    "not_in": "не з вказаних",
    "less": "менше",
    "less_or_equal": "менше або дорівнюж",
    "greater": "більше",
    "greater_or_equal": "більше або дорівнює",
    "between": "між",
    "begins_with": "починається з",
    "not_begins_with": "не починається з",
    "contains": "містить",
    "not_contains": "не містить",
    "ends_with": "закінчується на",
    "not_ends_with": "не не закінчується на",
    "is_empty": "порожній рядок",
    "is_not_empty": "не порожній рядок",
    "is_null": "порожньо",
    "is_not_null": "не порожньо"
  },
  "errors": {
    "no_filter": "Фільтр не вибраний",
    "empty_group": "Група порожня",
    "radio_empty": "Значення не вибрано",
    "checkbox_empty": "Значення не вибрано",
    "select_empty": "Значення не вибрано",
    "string_empty": "Не заповнено",
    "string_exceed_min_length": "Повинен містити більше {0} символів",
    "string_exceed_max_length": "Повинен містити менше {0} символів",
    "string_invalid_format": "Невірний формат ({0})",
    "number_nan": "Не число",
    "number_not_integer": "Не число",
    "number_not_double": "Не число",
    "number_exceed_min": "Повинне бути більше {0}",
    "number_exceed_max": "Повинне бути менше, ніж {0}",
    "number_wrong_step": "Повинне бути кратне {0}",
    "datetime_empty": "Не заповнено",
    "datetime_invalid": "Невірний формат дати ({0})",
    "datetime_exceed_min": "Повинне бути, після {0}",
    "datetime_exceed_max": "Повинне бути, до {0}",
    "boolean_not_valid": "Не логічне",
    "operator_not_multiple": "Оператор \"{1}\" не підтримує багато значень"
  },
  "invert": "інвертувати"
};

QueryBuilder.defaults({ lang_code: 'ua' });
}));