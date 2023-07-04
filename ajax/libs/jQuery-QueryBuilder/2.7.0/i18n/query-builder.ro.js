/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Romanian (ro)
 * Author: ArianServ, totpero
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

QueryBuilder.regional['ro'] = {
  "__locale": "Romanian (ro)",
  "__author": "ArianServ, totpero",
  "add_rule": "Adaugă regulă",
  "add_group": "Adaugă grup",
  "delete_rule": "Şterge",
  "delete_group": "Şterge",
  "conditions": {
    "AND": "ŞI",
    "OR": "SAU"
  },
  "operators": {
    "equal": "egal",
    "not_equal": "diferit",
    "in": "în",
    "not_in": "nu în",
    "less": "mai mic",
    "less_or_equal": "mai mic sau egal",
    "greater": "mai mare",
    "greater_or_equal": "mai mare sau egal",
    "between": "între",
    "not_between": "nu între",
    "begins_with": "începe cu",
    "not_begins_with": "nu începe cu",
    "contains": "conţine",
    "not_contains": "nu conţine",
    "ends_with": "se termină cu",
    "not_ends_with": "nu se termină cu",
    "is_empty": "este gol",
    "is_not_empty": "nu este gol",
    "is_null": "e nul",
    "is_not_null": "nu e nul"
  },
  "errors": {
    "no_filter": "Nici un filtru selectat",
    "empty_group": "Grupul este gol",
    "radio_empty": "Nici o valoare nu este selectată",
    "checkbox_empty": "Nici o valoare nu este selectată",
    "select_empty": "Nici o valoare nu este selectată",
    "string_empty": "Valoare goală",
    "string_exceed_min_length": "Trebuie să conţină mai puţin de {0} caractere",
    "string_exceed_max_length": "Trebuie să conţină mai mult de {0} caractere",
    "string_invalid_format": "Format invalid ({0})",
    "number_nan": "Nu este număr",
    "number_not_integer": "Nu este număr întreg",
    "number_not_double": "Nu este număr real",
    "number_exceed_min": "Trebuie să fie mai mare decât {0}",
    "number_exceed_max": "Trebuie să fie mai mic decât {0}",
    "number_wrong_step": "Trebuie să fie multiplu de {0}",
    "number_between_invalid": "Valori invalide, {0} este mai mare decât {1}",
    "datetime_empty": "Valoare goală",
    "datetime_invalid": "Format dată invalid ({0})",
    "datetime_exceed_min": "Trebuie să fie după {0}",
    "datetime_exceed_max": "Trebuie să fie înainte {0}",
    "datetime_between_invalid": "Valori invalide, {0} este mai mare decât {1}",
    "boolean_not_valid": "Nu este boolean",
    "operator_not_multiple": "Operatorul \"{1}\" nu poate accepta mai multe valori"
  }
};

QueryBuilder.defaults({ lang_code: 'ro' });
}));