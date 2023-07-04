/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Azerbaijan (az)
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

QueryBuilder.regional['az'] = {
  "__locale": "Azerbaijan (az)",
  "__author": "Megaplan, mborisv <bm@megaplan.ru>",
  "add_rule": "Əlavə etmək",
  "add_group": "Qrup əlavə etmək",
  "delete_rule": "Silmək",
  "delete_group": "Silmək",
  "conditions": {
    "AND": "VƏ",
    "OR": "VƏ YA"
  },
  "operators": {
    "equal": "bərabərdir",
    "not_equal": "bərabər deyil",
    "in": "qeyd edilmişlərdən",
    "not_in": "qeyd olunmamışlardan",
    "less": "daha az",
    "less_or_equal": "daha az və ya bərabər",
    "greater": "daha çox",
    "greater_or_equal": "daha çox və ya bərabər",
    "between": "arasında",
    "begins_with": "başlayır",
    "not_begins_with": "başlamır",
    "contains": "ibarətdir",
    "not_contains": "yoxdur",
    "ends_with": "başa çatır",
    "not_ends_with": "başa çatmır",
    "is_empty": "boş sətir",
    "is_not_empty": "boş olmayan sətir",
    "is_null": "boşdur",
    "is_not_null": "boş deyil"
  },
  "errors": {
    "no_filter": "Filterlər seçilməyib",
    "empty_group": "Qrup boşdur",
    "radio_empty": "Məna seçilməyib",
    "checkbox_empty": "Məna seçilməyib",
    "select_empty": "Məna seçilməyib",
    "string_empty": "Doldurulmayıb",
    "string_exceed_min_length": "{0} daha çox simvol olmalıdır",
    "string_exceed_max_length": "{0} daha az simvol olmalıdır",
    "string_invalid_format": "Yanlış format ({0})",
    "number_nan": "Rəqəm deyil",
    "number_not_integer": "Rəqəm deyil",
    "number_not_double": "Rəqəm deyil",
    "number_exceed_min": "{0} daha çox olmalıdır",
    "number_exceed_max": "{0} daha az olmalıdır",
    "number_wrong_step": "{0} bölünən olmalıdır",
    "datetime_empty": "Doldurulmayıb",
    "datetime_invalid": "Yanlış tarix formatı ({0})",
    "datetime_exceed_min": "{0} sonra olmalıdır",
    "datetime_exceed_max": "{0} əvvəl olmalıdır",
    "boolean_not_valid": "Loqik olmayan",
    "operator_not_multiple": "\"{1}\" operatoru çoxlu məna daşımır"
  },
  "invert": "invert"
};

QueryBuilder.defaults({ lang_code: 'az' });
}));