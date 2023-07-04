/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Dutch (nl)
 * Author: "Roywcm"
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

QueryBuilder.regional['nl'] = {
  "__locale": "Dutch (nl)",
  "__author": "\"Roywcm\"",
  "add_rule": "Nieuwe regel",
  "add_group": "Nieuwe groep",
  "delete_rule": "Verwijder",
  "delete_group": "Verwijder",
  "conditions": {
    "AND": "EN",
    "OR": "OF"
  },
  "operators": {
    "equal": "gelijk",
    "not_equal": "niet gelijk",
    "in": "in",
    "not_in": "niet in",
    "less": "minder",
    "less_or_equal": "minder of gelijk",
    "greater": "groter",
    "greater_or_equal": "groter of gelijk",
    "between": "tussen",
    "not_between": "niet tussen",
    "begins_with": "begint met",
    "not_begins_with": "begint niet met",
    "contains": "bevat",
    "not_contains": "bevat niet",
    "ends_with": "eindigt met",
    "not_ends_with": "eindigt niet met",
    "is_empty": "is leeg",
    "is_not_empty": "is niet leeg",
    "is_null": "is null",
    "is_not_null": "is niet null"
  },
  "errors": {
    "no_filter": "Geen filter geselecteerd",
    "empty_group": "De groep is leeg",
    "radio_empty": "Geen waarde geselecteerd",
    "checkbox_empty": "Geen waarde geselecteerd",
    "select_empty": "Geen waarde geselecteerd",
    "string_empty": "Lege waarde",
    "string_exceed_min_length": "Dient minstens {0} karakters te bevatten",
    "string_exceed_max_length": "Dient niet meer dan {0} karakters te bevatten",
    "string_invalid_format": "Ongeldig format ({0})",
    "number_nan": "Niet een nummer",
    "number_not_integer": "Geen geheel getal",
    "number_not_double": "Geen echt nummer",
    "number_exceed_min": "Dient groter te zijn dan {0}",
    "number_exceed_max": "Dient lager te zijn dan {0}",
    "number_wrong_step": "Dient een veelvoud te zijn van {0}",
    "datetime_invalid": "Ongeldige datumformat ({0})",
    "datetime_exceed_min": "Dient na {0}",
    "datetime_exceed_max": "Dient voor {0}"
  }
};

QueryBuilder.defaults({ lang_code: 'nl' });
}));