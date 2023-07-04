/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Svenska (sv)
 * Author: hekin1
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

QueryBuilder.regional['sv'] = {
  "__locale": "Svenska (sv)",
  "__author": "hekin1",
  "add_rule": "Lägg till regel",
  "add_group": "Lägg till grupp",
  "delete_rule": "Ta bort",
  "delete_group": "Ta bort",
  "conditions": {
    "AND": "OCH",
    "OR": "ELLER"
  },
  "operators": {
    "equal": "lika med",
    "not_equal": "ej lika med",
    "in": "en av",
    "not_in": "ej en av",
    "less": "mindre",
    "less_or_equal": "mindre eller lika med",
    "greater": "större",
    "greater_or_equal": "större eller lika med",
    "between": "mellan",
    "not_between": "ej mellan",
    "begins_with": "börjar med",
    "not_begins_with": "börjar inte med",
    "contains": "innehåller",
    "not_contains": "innehåller inte",
    "ends_with": "slutar med",
    "not_ends_with": "slutar inte med",
    "is_empty": "är tom",
    "is_not_empty": "är inte tom",
    "is_null": "är null",
    "is_not_null": "är inte null"
  },
  "errors": {
    "no_filter": "Inget filter valt",
    "empty_group": "Gruppen är tom",
    "radio_empty": "Inget värde valt",
    "checkbox_empty": "Inget värde valt",
    "select_empty": "Inget värde valt",
    "string_empty": "Tomt värde",
    "string_exceed_min_length": "Måste innehålla minst {0} tecken",
    "string_exceed_max_length": "Får ej innehålla fler än {0} tecken",
    "string_invalid_format": "Felaktigt format ({0})",
    "number_nan": "Inte numeriskt",
    "number_not_integer": "Inte en siffra",
    "number_not_double": "Inte ett decimaltal",
    "number_exceed_min": "Måste vara större än {0}",
    "number_exceed_max": "Måste vara lägre än {0}",
    "number_wrong_step": "Måste vara en mutipel av {0}",
    "number_between_invalid": "Felaktiga värden, {0} är större än {1}",
    "datetime_empty": "Tomt värde",
    "datetime_invalid": "Felaktigt datumformat ({0})",
    "datetime_exceed_min": "Måste vara efter {0}",
    "datetime_exceed_max": "Måste vara före {0}",
    "datetime_between_invalid": "Felaktiga värden, {0} är större än {1}",
    "boolean_not_valid": "Inte en boolean",
    "operator_not_multiple": "Operatorn \"{1}\" accepterar inte flera värden"
  },
  "invert": "Invertera",
  "NOT": "INTE"
};

QueryBuilder.defaults({ lang_code: 'sv' });
}));