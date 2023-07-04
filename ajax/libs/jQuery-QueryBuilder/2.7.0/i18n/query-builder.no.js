/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Norwegian (no)
 * Author: Jna Borup Coyle, github@coyle.dk
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

QueryBuilder.regional['no'] = {
  "__locale": "Norwegian (no)",
  "__author": "Jna Borup Coyle, github@coyle.dk",
  "add_rule": "Legg til regel",
  "add_group": "Legg til gruppe",
  "delete_rule": "Slett regel",
  "delete_group": "Slett gruppe",
  "conditions": {
    "AND": "OG",
    "OR": "ELLER"
  },
  "operators": {
    "equal": "er lik",
    "not_equal": "er ikke lik",
    "in": "finnes i",
    "not_in": "finnes ikke i",
    "less": "er mindre enn",
    "less_or_equal": "er mindre eller lik",
    "greater": "er større enn",
    "greater_or_equal": "er større eller lik",
    "begins_with": "begynner med",
    "not_begins_with": "begynner ikke med",
    "contains": "inneholder",
    "not_contains": "inneholder ikke",
    "ends_with": "slutter med",
    "not_ends_with": "slutter ikke med",
    "is_empty": "er tom",
    "is_not_empty": "er ikke tom",
    "is_null": "er null",
    "is_not_null": "er ikke null"
  }
};

QueryBuilder.defaults({ lang_code: 'no' });
}));