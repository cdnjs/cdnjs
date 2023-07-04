/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: German (de)
 * Author: "raimu"
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

QueryBuilder.regional['de'] = {
  "__locale": "German (de)",
  "__author": "\"raimu\"",
  "add_rule": "neue Regel",
  "add_group": "neue Gruppe",
  "delete_rule": "löschen",
  "delete_group": "löschen",
  "conditions": {
    "AND": "UND",
    "OR": "ODER"
  },
  "operators": {
    "equal": "gleich",
    "not_equal": "ungleich",
    "in": "in",
    "not_in": "nicht in",
    "less": "kleiner",
    "less_or_equal": "kleiner gleich",
    "greater": "größer",
    "greater_or_equal": "größer gleich",
    "between": "zwischen",
    "not_between": "nicht zwischen",
    "begins_with": "beginnt mit",
    "not_begins_with": "beginnt nicht mit",
    "contains": "enthält",
    "not_contains": "enthält nicht",
    "ends_with": "endet mit",
    "not_ends_with": "endet nicht mit",
    "is_empty": "ist leer",
    "is_not_empty": "ist nicht leer",
    "is_null": "ist null",
    "is_not_null": "ist nicht null"
  },
  "errors": {
    "no_filter": "Kein Filter ausgewählt",
    "empty_group": "Die Gruppe ist leer",
    "radio_empty": "Kein Wert ausgewählt",
    "checkbox_empty": "Kein Wert ausgewählt",
    "select_empty": "Kein Wert ausgewählt",
    "string_empty": "Leerer Wert",
    "string_exceed_min_length": "Muss mindestens {0} Zeichen enthalten",
    "string_exceed_max_length": "Darf nicht mehr als {0} Zeichen enthalten",
    "string_invalid_format": "Ungültiges Format ({0})",
    "number_nan": "Keine Zahl",
    "number_not_integer": "Keine Ganzzahl",
    "number_not_double": "Keine Dezimalzahl",
    "number_exceed_min": "Muss größer als {0} sein",
    "number_exceed_max": "Muss kleiner als {0} sein",
    "number_wrong_step": "Muss ein Vielfaches von {0} sein",
    "datetime_invalid": "Ungültiges Datumsformat ({0})",
    "datetime_exceed_min": "Muss nach dem {0} sein",
    "datetime_exceed_max": "Muss vor dem {0} sein"
  }
};

QueryBuilder.defaults({ lang_code: 'de' });
}));