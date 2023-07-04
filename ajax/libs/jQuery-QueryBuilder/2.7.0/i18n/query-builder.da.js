/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Danish (da)
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

QueryBuilder.regional['da'] = {
  "__locale": "Danish (da)",
  "__author": "Jna Borup Coyle, github@coyle.dk",
  "add_rule": "Tilføj regel",
  "add_group": "Tilføj gruppe",
  "delete_rule": "Slet regel",
  "delete_group": "Slet gruppe",
  "conditions": {
    "AND": "OG",
    "OR": "ELLER"
  },
  "condition_and": "OG",
  "condition_or": "ELLER",
  "operators": {
    "equal": "lig med",
    "not_equal": "ikke lige med",
    "in": "i",
    "not_in": "ikke i",
    "less": "mindre",
    "less_or_equal": "mindre eller lig med",
    "greater": "større",
    "greater_or_equal": "større eller lig med",
    "begins_with": "begynder med",
    "not_begins_with": "begynder ikke med",
    "contains": "indeholder",
    "not_contains": "indeholder ikke",
    "ends_with": "slutter med",
    "not_ends_with": "slutter ikke med",
    "is_empty": "er tom",
    "is_not_empty": "er ikke tom",
    "is_null": "er null",
    "is_not_null": "er ikke null"
  }
};

QueryBuilder.defaults({ lang_code: 'da' });
}));