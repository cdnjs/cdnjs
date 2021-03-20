/*!
 * jQuery QueryBuilder 2.6.0
 * Locale: Romanian (ro)
 * Author: ArianServ
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
  "__author": "ArianServ",
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
    "less": "mai puţin",
    "less_or_equal": "mai puţin sau egal",
    "greater": "mai mare",
    "greater_or_equal": "mai mare sau egal",
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
  }
};

QueryBuilder.defaults({ lang_code: 'ro' });
}));