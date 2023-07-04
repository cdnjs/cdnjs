/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Čeština (cs)
 * Author: Megaplan, mborisv <bm@megaplan.ru>
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

QueryBuilder.regional['cs'] = {
  "__locale": "Čeština (cs)",
  "__author": "Megaplan, mborisv <bm@megaplan.ru>",
  "add_rule": "Přidat",
  "add_group": "Přidat skupinu",
  "delete_rule": "Odstranit",
  "delete_group": "Odstranit skupinu",
  "conditions": {
    "AND": "I",
    "OR": "NEBO"
  },
  "operators": {
    "equal": "stejně",
    "not_equal": "liší se",
    "in": "z uvedených",
    "not_in": "ne z uvedených",
    "less": "méně",
    "less_or_equal": "méně nebo stejně",
    "greater": "více",
    "greater_or_equal": "více nebo stejně",
    "between": "mezi",
    "begins_with": "začíná z",
    "not_begins_with": "nezačíná z",
    "contains": "obsahuje",
    "not_contains": "neobsahuje",
    "ends_with": "končí na",
    "not_ends_with": "nekončí na",
    "is_empty": "prázdný řádek",
    "is_not_empty": "neprázdný řádek",
    "is_null": "prázdno",
    "is_not_null": "plno"
  },
  "errors": {
    "no_filter": "není vybraný filtr",
    "empty_group": "prázdná skupina",
    "radio_empty": "Není udaná hodnota",
    "checkbox_empty": "Není udaná hodnota",
    "select_empty": "Není udaná hodnota",
    "string_empty": "Nevyplněno",
    "string_exceed_min_length": "Musí obsahovat více {0} symbolů",
    "string_exceed_max_length": "Musí obsahovat méně {0} symbolů",
    "string_invalid_format": "Nesprávný formát ({0})",
    "number_nan": "Žádné číslo",
    "number_not_integer": "Žádné číslo",
    "number_not_double": "Žádné číslo",
    "number_exceed_min": "Musí být více {0}",
    "number_exceed_max": "Musí být méně {0}",
    "number_wrong_step": "Musí být násobkem {0}",
    "datetime_empty": "Nevyplněno",
    "datetime_invalid": "Nesprávný formát datumu ({0})",
    "datetime_exceed_min": "Musí být po {0}",
    "datetime_exceed_max": "Musí být do {0}",
    "boolean_not_valid": "Nelogické",
    "operator_not_multiple": "Operátor \"{1}\" nepodporuje mnoho hodnot"
  },
  "invert": "invertní"
};

QueryBuilder.defaults({ lang_code: 'cs' });
}));