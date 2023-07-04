/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Slovensky (sk)
 * Author: k2s
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

QueryBuilder.regional['sk'] = {
  "__locale": "Slovensky (sk)",
  "__author": "k2s",
  "add_rule": "Pridať podmienku",
  "add_group": "Pridať skupinu",
  "delete_rule": "Zmazať",
  "delete_group": "Zmazať",
  "conditions": {
    "AND": "A",
    "OR": "ALEBO"
  },
  "operators": {
    "equal": "rovné",
    "not_equal": "nerovné",
    "in": "v",
    "not_in": "nie v",
    "less": "menej",
    "less_or_equal": "menej alebo rovné",
    "greater": "väčšie",
    "greater_or_equal": "väčšie alebo rovné",
    "between": "medzi",
    "not_between": "nie medzi",
    "begins_with": "začína na",
    "not_begins_with": "nezačína na",
    "contains": "obsahuje",
    "not_contains": "neobsahuje",
    "ends_with": "končí na",
    "not_ends_with": "nekončí na",
    "is_empty": "je prázdne",
    "is_not_empty": "nie je prázdne",
    "is_null": "je null",
    "is_not_null": "nie je null"
  },
  "errors": {
    "no_filter": "Nie je zvolený filter",
    "empty_group": "Skupina je prázdna",
    "radio_empty": "Nie je označená hodnota",
    "checkbox_empty": "Nie je označená hodnota",
    "select_empty": "Nie je označená hodnota",
    "string_empty": "Prázdna hodnota",
    "string_exceed_min_length": "Musí obsahovať aspon {0} znakov",
    "string_exceed_max_length": "Nesmie obsahovať viac ako {0} znakov",
    "string_invalid_format": "Chybný formát ({0})",
    "number_nan": "Nie je číslo",
    "number_not_integer": "Nie je celé číslo",
    "number_not_double": "Nie je desatinné číslo",
    "number_exceed_min": "Musí byť väčšie ako {0}",
    "number_exceed_max": "Musí byť menšie ako {0}",
    "number_wrong_step": "Musí byť násobkom čísla {0}",
    "number_between_invalid": "Chybné hodnoty, {0} je väčšie ako {1}",
    "datetime_empty": "Prázdna hodnota",
    "datetime_invalid": "Chybný formát dátumu ({0})",
    "datetime_exceed_min": "Musí byť neskôr ako {0}",
    "datetime_exceed_max": "Musí byť skôr ako {0}",
    "datetime_between_invalid": "Chybné hodnoty, {0} je neskôr ako {1}",
    "boolean_not_valid": "Neplatné áno/nie",
    "operator_not_multiple": "Operátor '{1}' nepodporuje viacero hodnôt"
  },
  "invert": "Invertný",
  "NOT": "NIE"
};

QueryBuilder.defaults({ lang_code: 'sk' });
}));