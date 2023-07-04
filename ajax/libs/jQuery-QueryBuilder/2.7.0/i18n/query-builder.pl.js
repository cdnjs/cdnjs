/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Polish (pl)
 * Author: Artur Smolarek
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

QueryBuilder.regional['pl'] = {
  "__locale": "Polish (pl)",
  "__author": "Artur Smolarek",
  "add_rule": "Dodaj regułę",
  "add_group": "Dodaj grupę",
  "delete_rule": "Usuń",
  "delete_group": "Usuń",
  "conditions": {
    "AND": "ORAZ",
    "OR": "LUB"
  },
  "operators": {
    "equal": "równa się",
    "not_equal": "jest różne od",
    "in": "zawiera",
    "not_in": "nie zawiera",
    "less": "mniejsze",
    "less_or_equal": "mniejsze lub równe",
    "greater": "większe",
    "greater_or_equal": "większe lub równe",
    "between": "pomiędzy",
    "not_between": "nie jest pomiędzy",
    "begins_with": "rozpoczyna się od",
    "not_begins_with": "nie rozpoczyna się od",
    "contains": "zawiera",
    "not_contains": "nie zawiera",
    "ends_with": "kończy się na",
    "not_ends_with": "nie kończy się na",
    "is_empty": "jest puste",
    "is_not_empty": "nie jest puste",
    "is_null": "jest niezdefiniowane",
    "is_not_null": "nie jest niezdefiniowane"
  },
  "errors": {
    "no_filter": "Nie wybrano żadnego filtra",
    "empty_group": "Grupa jest pusta",
    "radio_empty": "Nie wybrano wartości",
    "checkbox_empty": "Nie wybrano wartości",
    "select_empty": "Nie wybrano wartości",
    "string_empty": "Nie wpisano wartości",
    "string_exceed_min_length": "Minimalna długość to {0} znaków",
    "string_exceed_max_length": "Maksymalna długość to {0} znaków",
    "string_invalid_format": "Nieprawidłowy format ({0})",
    "number_nan": "To nie jest liczba",
    "number_not_integer": "To nie jest liczba całkowita",
    "number_not_double": "To nie jest liczba rzeczywista",
    "number_exceed_min": "Musi być większe niż {0}",
    "number_exceed_max": "Musi być mniejsze niż {0}",
    "number_wrong_step": "Musi być wielokrotnością {0}",
    "datetime_empty": "Nie wybrano wartości",
    "datetime_invalid": "Nieprawidłowy format daty ({0})",
    "datetime_exceed_min": "Musi być po {0}",
    "datetime_exceed_max": "Musi być przed {0}",
    "boolean_not_valid": "Niepoprawna wartość logiczna",
    "operator_not_multiple": "Operator \"{1}\" nie przyjmuje wielu wartości"
  },
  "invert": "Odwróć"
};

QueryBuilder.defaults({ lang_code: 'pl' });
}));