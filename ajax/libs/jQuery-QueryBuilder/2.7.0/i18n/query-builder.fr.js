/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: French (fr)
 * Author: Damien "Mistic" Sorel, http://www.strangeplanet.fr
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

QueryBuilder.regional['fr'] = {
  "__locale": "French (fr)",
  "__author": "Damien \"Mistic\" Sorel, http://www.strangeplanet.fr",
  "add_rule": "Ajouter une règle",
  "add_group": "Ajouter un groupe",
  "delete_rule": "Supprimer",
  "delete_group": "Supprimer",
  "conditions": {
    "AND": "ET",
    "OR": "OU"
  },
  "operators": {
    "equal": "est égal à",
    "not_equal": "n'est pas égal à",
    "in": "est compris dans",
    "not_in": "n'est pas compris dans",
    "less": "est inférieur à",
    "less_or_equal": "est inférieur ou égal à",
    "greater": "est supérieur à",
    "greater_or_equal": "est supérieur ou égal à",
    "between": "est entre",
    "not_between": "n'est pas entre",
    "begins_with": "commence par",
    "not_begins_with": "ne commence pas par",
    "contains": "contient",
    "not_contains": "ne contient pas",
    "ends_with": "finit par",
    "not_ends_with": "ne finit pas par",
    "is_empty": "est vide",
    "is_not_empty": "n'est pas vide",
    "is_null": "est nul",
    "is_not_null": "n'est pas nul"
  },
  "errors": {
    "no_filter": "Aucun filtre sélectionné",
    "empty_group": "Le groupe est vide",
    "radio_empty": "Pas de valeur selectionnée",
    "checkbox_empty": "Pas de valeur selectionnée",
    "select_empty": "Pas de valeur selectionnée",
    "string_empty": "Valeur vide",
    "string_exceed_min_length": "Doit contenir au moins {0} caractères",
    "string_exceed_max_length": "Ne doit pas contenir plus de {0} caractères",
    "string_invalid_format": "Format invalide ({0})",
    "number_nan": "N'est pas un nombre",
    "number_not_integer": "N'est pas un entier",
    "number_not_double": "N'est pas un nombre réel",
    "number_exceed_min": "Doit être plus grand que {0}",
    "number_exceed_max": "Doit être plus petit que {0}",
    "number_wrong_step": "Doit être un multiple de {0}",
    "number_between_invalid": "Valeurs invalides, {0} est plus grand que {1}",
    "datetime_empty": "Valeur vide",
    "datetime_invalid": "Fomat de date invalide ({0})",
    "datetime_exceed_min": "Doit être après {0}",
    "datetime_exceed_max": "Doit être avant {0}",
    "datetime_between_invalid": "Valeurs invalides, {0} est plus grand que {1}",
    "boolean_not_valid": "N'est pas un booléen",
    "operator_not_multiple": "L'opérateur \"{1}\" ne peut utiliser plusieurs valeurs"
  },
  "invert": "Inverser",
  "NOT": "NON"
};

QueryBuilder.defaults({ lang_code: 'fr' });
}));