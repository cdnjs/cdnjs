/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Swahili (sw)
 * Author: Timothy Anyona
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

QueryBuilder.regional['sw'] = {
  "__locale": "Swahili (sw)",
  "__author": "Timothy Anyona",
  "add_rule": "Ongeza kanuni",
  "add_group": "Ongeza kikundi",
  "delete_rule": "Futa",
  "delete_group": "Futa",
  "conditions": {
    "AND": "NA",
    "OR": "AU"
  },
  "operators": {
    "equal": "ni",
    "not_equal": "sio",
    "in": "mojawapo ya",
    "not_in": "sio mojawapo ya",
    "less": "isiyozidi",
    "less_or_equal": "isiyozidi au ni sawa na",
    "greater": "inayozidi",
    "greater_or_equal": "inayozidi au ni sawa na",
    "between": "kati ya",
    "not_between": "isiyo kati ya",
    "begins_with": "inaanza na",
    "not_begins_with": "isiyoanza na",
    "contains": "ina",
    "not_contains": "haina",
    "ends_with": "inaisha na",
    "not_ends_with": "isiyoisha na",
    "is_empty": "ni tupu",
    "is_not_empty": "sio tupu",
    "is_null": "ni batili",
    "is_not_null": "sio batili"
  },
  "errors": {
    "no_filter": "Chujio halijachaguliwa",
    "empty_group": "Kikundi ki tupu",
    "radio_empty": "Thamani haijachaguliwa",
    "checkbox_empty": "Thamani haijachaguliwa",
    "select_empty": "Thamani haijachaguliwa",
    "string_empty": "Thamani tupu",
    "string_exceed_min_length": "Lazima iwe na vibambo visiopungua {0}",
    "string_exceed_max_length": "Haifai kuwa na vibambo zaidi ya {0}",
    "string_invalid_format": "Fomati batili ({0})",
    "number_nan": "Sio nambari",
    "number_not_integer": "Sio namba kamili",
    "number_not_double": "Sio namba desimali",
    "number_exceed_min": "Lazima iwe zaidi ya {0}",
    "number_exceed_max": "Lazima iwe chini ya {0}",
    "number_wrong_step": "Lazima iwe kigawe cha {0}",
    "number_between_invalid": "Thamani batili, {0} ni kubwa kuliko {1}",
    "datetime_empty": "Thamani tupu",
    "datetime_invalid": "Fomati tarehe batili ({0})",
    "datetime_exceed_min": "Lazima iwe baada ya {0}",
    "datetime_exceed_max": "Lazima iwe kabla ya {0}",
    "datetime_between_invalid": "Thamani batili, {0} ni baada ya {1}",
    "boolean_not_valid": "Sio buleani",
    "operator_not_multiple": "Opereta \"{1}\" haikubali thamani nyingi"
  },
  "invert": "Pindua",
  "NOT": "SIO"
};

QueryBuilder.defaults({ lang_code: 'sw' });
}));