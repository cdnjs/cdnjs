/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Albanian (sq)
 * Author: Tomor Pupovci
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

QueryBuilder.regional['sq'] = {
  "__locale": "Albanian (sq)",
  "__author": "Tomor Pupovci",
  "add_rule": "Shto rregull",
  "add_group": "Shto grup",
  "delete_rule": "Fshij",
  "delete_group": "Fshij",
  "conditions": {
    "AND": "DHE",
    "OR": "OSE"
  },
  "operators": {
    "equal": "barabartë",
    "not_equal": "e ndryshme prej",
    "in": "në",
    "not_in": "jo në",
    "less": "më e vogël",
    "less_or_equal": "më e vogël ose e barabartë me",
    "greater": "më e madhe",
    "greater_or_equal": "më e madhe ose e barabartë",
    "between": "në mes",
    "begins_with": "fillon me",
    "not_begins_with": "nuk fillon me",
    "contains": "përmban",
    "not_contains": "nuk përmban",
    "ends_with": "mbaron me",
    "not_ends_with": "nuk mbaron me",
    "is_empty": "është e zbrazët",
    "is_not_empty": "nuk është e zbrazët",
    "is_null": "është null",
    "is_not_null": "nuk është null"
  },
  "errors": {
    "no_filter": "Nuk ka filter të zgjedhur",
    "empty_group": "Grupi është i zbrazët",
    "radio_empty": "Nuk ka vlerë të zgjedhur",
    "checkbox_empty": "Nuk ka vlerë të zgjedhur",
    "select_empty": "Nuk ka vlerë të zgjedhur",
    "string_empty": "Vlerë e zbrazët",
    "string_exceed_min_length": "Duhet të përmbajë së paku {0} karaktere",
    "string_exceed_max_length": "Nuk duhet të përmbajë më shumë se {0} karaktere",
    "string_invalid_format": "Format i pasaktë ({0})",
    "number_nan": "Nuk është numër",
    "number_not_integer": "Nuk është numër i plotë",
    "number_not_double": "Nuk është numër me presje",
    "number_exceed_min": "Duhet të jetë më i madh se {0}",
    "number_exceed_max": "Duhet të jetë më i vogël se {0}",
    "number_wrong_step": "Duhet të jetë shumëfish i {0}",
    "datetime_empty": "Vlerë e zbrazët",
    "datetime_invalid": "Format i pasaktë i datës ({0})",
    "datetime_exceed_min": "Duhet të jetë pas {0}",
    "datetime_exceed_max": "Duhet të jetë para {0}",
    "boolean_not_valid": "Nuk është boolean",
    "operator_not_multiple": "Operatori \"{1}\" nuk mund të pranojë vlera të shumëfishta"
  }
};

QueryBuilder.defaults({ lang_code: 'sq' });
}));