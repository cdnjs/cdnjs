/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Hungarian - Magyar (hu)
 * Author: Szabó Attila "Tailor993", https://www.tailor993.hu
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

QueryBuilder.regional['hu'] = {
  "__locale": "Hungarian - Magyar (hu)",
  "__author": "Szabó Attila \"Tailor993\", https://www.tailor993.hu",
  "add_rule": "Feltétel hozzáadása",
  "add_group": "Csoport hozzáadása",
  "delete_rule": "Feltétel törlése",
  "delete_group": "Csoport törlése",
  "conditions": {
    "AND": "ÉS",
    "OR": "VAGY"
  },
  "operators": {
    "equal": "egyenlő",
    "not_equal": "nem egyenlő",
    "in": "bennevan",
    "not_in": "nincs benne",
    "less": "kisebb",
    "less_or_equal": "kisebb vagy egyenlő",
    "greater": "nagyobb",
    "greater_or_equal": "nagyobb vagy egyenlő",
    "between": "közötte",
    "not_between": "nincs közötte",
    "begins_with": "ezzel kezdődik",
    "not_begins_with": "ezzel nem kezdődik",
    "contains": "tartalmazza",
    "not_contains": "nem tartalmazza",
    "ends_with": "erre végződik",
    "not_ends_with": "errre nem végződik",
    "is_empty": "üres",
    "is_not_empty": "nem üres",
    "is_null": "null",
    "is_not_null": "nem null"
  },
  "errors": {
    "no_filter": "Nincs kiválasztott feltétel",
    "empty_group": "A csoport üres",
    "radio_empty": "Nincs kiválasztott érték",
    "checkbox_empty": "Nincs kiválasztott érték",
    "select_empty": "Nincs kiválasztott érték",
    "string_empty": "Üres érték",
    "string_exceed_min_length": "A megadott szöveg rövidebb a várt {0} karakternél",
    "string_exceed_max_length": "A megadott szöveg nem tartalmazhat többet, mint {0} karaktert",
    "string_invalid_format": "Nem megfelelő formátum ({0})",
    "number_nan": "Nem szám",
    "number_not_integer": "Nem egész szám (integer)",
    "number_not_double": "Nem valós szám",
    "number_exceed_min": "Nagyobbnak kell lennie, mint {0}",
    "number_exceed_max": "Kisebbnek kell lennie, mint {0}",
    "number_wrong_step": "{0} többszörösének kell lennie.",
    "number_between_invalid": "INem megfelelő érték, {0} nagyobb, mint {1}",
    "datetime_empty": "Üres érték",
    "datetime_invalid": "nem megfelelő dátum formátum ({0})",
    "datetime_exceed_min": "A dátumnak későbbinek kell lennie, mint{0}",
    "datetime_exceed_max": "A dátumnak korábbinak kell lennie, mint {0}",
    "datetime_between_invalid": "Nem megfelelő értékek, {0} nagyobb, mint {1}",
    "boolean_not_valid": "Nem igaz/hamis (boolean)",
    "operator_not_multiple": "Ez a művelet: \"{1}\" nem fogadhat el több értéket"
  },
  "invert": "Megfordítás (Invertálás)",
  "NOT": "NEM"
};

QueryBuilder.defaults({ lang_code: 'hu' });
}));