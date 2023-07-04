/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Esperanto (eo)
 * Author: Robin van der Vliet, https://robinvandervliet.com/
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

QueryBuilder.regional['eo'] = {
  "__locale": "Esperanto (eo)",
  "__author": "Robin van der Vliet, https://robinvandervliet.com/",
  "add_rule": "Aldoni regulon",
  "add_group": "Aldoni grupon",
  "delete_rule": "Forigi",
  "delete_group": "Forigi",
  "conditions": {
    "AND": "KAJ",
    "OR": "AŬ"
  },
  "operators": {
    "equal": "estas egala al",
    "not_equal": "ne estas egala al",
    "in": "estas en",
    "not_in": "ne estas en",
    "less": "estas malpli ol",
    "less_or_equal": "estas malpli ol aŭ egala al",
    "greater": "estas pli ol",
    "greater_or_equal": "estas pli ol aŭ egala al",
    "between": "estas inter",
    "not_between": "ne estas inter",
    "begins_with": "komenciĝas per",
    "not_begins_with": "ne komenciĝas per",
    "contains": "enhavas",
    "not_contains": "ne enhavas",
    "ends_with": "finiĝas per",
    "not_ends_with": "ne finiĝas per",
    "is_empty": "estas malplena",
    "is_not_empty": "ne estas malplena",
    "is_null": "estas senvalora",
    "is_not_null": "ne estas senvalora"
  },
  "errors": {
    "no_filter": "Neniu filtrilo elektita",
    "empty_group": "La grupo estas malplena",
    "radio_empty": "Neniu valoro elektita",
    "checkbox_empty": "Neniu valoro elektita",
    "select_empty": "Neniu valoro elektita",
    "string_empty": "Malplena valoro",
    "string_exceed_min_length": "Devas enhavi pli ol {0} signojn",
    "string_exceed_max_length": "Devas ne enhavi pli ol {0} signojn",
    "string_invalid_format": "Nevalida strukturo ({0})",
    "number_nan": "Ne estas nombro",
    "number_not_integer": "Ne estas entjera nombro",
    "number_not_double": "Ne estas reela nombro",
    "number_exceed_min": "Devas esti pli ol {0}",
    "number_exceed_max": "Devas esti malpli ol {0}",
    "number_wrong_step": "Devas esti oblo de {0}",
    "number_between_invalid": "Nevalidaj valoroj, {0} estas pli ol {1}",
    "datetime_empty": "Malplena valoro",
    "datetime_invalid": "Nevalida dato ({0})",
    "datetime_exceed_min": "Devas esti post {0}",
    "datetime_exceed_max": "Devas esti antaŭ {0}",
    "datetime_between_invalid": "Nevalidaj valoroj, {0} estas post {1}",
    "boolean_not_valid": "Ne estas bulea valoro",
    "operator_not_multiple": "La operacio \"{1}\" ne akceptas plurajn valorojn"
  },
  "invert": "Inversigi",
  "NOT": "NE"
};

QueryBuilder.defaults({ lang_code: 'eo' });
}));