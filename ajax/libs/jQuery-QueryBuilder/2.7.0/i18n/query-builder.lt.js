/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Lithuanian (lt)
 * Author: Dalius Guzauskas (aka Tichij), https://lt.linkedin.com/in/daliusg
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

QueryBuilder.regional['lt'] = {
  "__locale": "Lithuanian (lt)",
  "__author": "Dalius Guzauskas (aka Tichij), https://lt.linkedin.com/in/daliusg",
  "add_rule": "Pridėti taisyklę",
  "add_group": "Pridėti grupę",
  "delete_rule": "Ištrinti",
  "delete_group": "Ištrinti",
  "conditions": {
    "AND": "IR",
    "OR": "ARBA"
  },
  "operators": {
    "equal": "lygu",
    "not_equal": "nėra lygu",
    "in": "iš nurodytų",
    "not_in": "ne iš nurodytų",
    "less": "mažiau",
    "less_or_equal": "mažiau arba lygu",
    "greater": "daugiau",
    "greater_or_equal": "daugiau arba lygu",
    "between": "tarp",
    "not_between": "nėra tarp",
    "begins_with": "prasideda",
    "not_begins_with": "neprasideda",
    "contains": "turi",
    "not_contains": "neturi",
    "ends_with": "baigiasi",
    "not_ends_with": "nesibaigia",
    "is_empty": "tuščia",
    "is_not_empty": "ne tuščia",
    "is_null": "neapibrėžta",
    "is_not_null": "nėra neapibrėžta"
  },
  "errors": {
    "no_filter": "Nepasirinktas filtras",
    "empty_group": "Grupė tuščia",
    "radio_empty": "Nepasirinkta reikšmė",
    "checkbox_empty": "Nepasirinkta reikšmė",
    "select_empty": "Nepasirinkta reikšmė",
    "string_empty": "Tuščia reikšmė",
    "string_exceed_min_length": "Turi būti bent {0} simbolių",
    "string_exceed_max_length": "Turi būti ne daugiau kaip {0} simbolių",
    "string_invalid_format": "Klaidingas formatas ({0})",
    "number_nan": "Nėra skaičius",
    "number_not_integer": "Ne sveikasis skaičius",
    "number_not_double": "Ne realusis skaičius",
    "number_exceed_min": "Turi būti daugiau už {0}",
    "number_exceed_max": "Turi būti mažiau už {0}",
    "number_wrong_step": "Turi būti {0} kartotinis",
    "number_between_invalid": "Klaidingos reikšmės, {0} yra daugiau už {1}",
    "datetime_empty": "Tuščia reikšmė",
    "datetime_invalid": "Klaidingas datos formatas ({0})",
    "datetime_exceed_min": "Turi būti po {0}",
    "datetime_exceed_max": "Turi būti prieš {0}",
    "datetime_between_invalid": "Klaidingos reikšmės, {0} yra daugiau už {1}",
    "boolean_not_valid": "Nėra loginis tipas",
    "operator_not_multiple": "Operatorius \"{1}\" negali priimti kelių reikšmių"
  },
  "invert": "Invertuoti",
  "NOT": "NE"
};

QueryBuilder.defaults({ lang_code: 'lt' });
}));