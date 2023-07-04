/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Italian (it)
 * Author: davegraziosi, Giuseppe Lodi Rizzini
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

QueryBuilder.regional['it'] = {
  "__locale": "Italian (it)",
  "__author": "davegraziosi, Giuseppe Lodi Rizzini",
  "add_rule": "Aggiungi regola",
  "add_group": "Aggiungi gruppo",
  "delete_rule": "Elimina",
  "delete_group": "Elimina",
  "conditions": {
    "AND": "E",
    "OR": "O"
  },
  "operators": {
    "equal": "uguale",
    "not_equal": "non uguale",
    "in": "in",
    "not_in": "non in",
    "less": "minore",
    "less_or_equal": "minore o uguale",
    "greater": "maggiore",
    "greater_or_equal": "maggiore o uguale",
    "between": "compreso tra",
    "not_between": "non compreso tra",
    "begins_with": "inizia con",
    "not_begins_with": "non inizia con",
    "contains": "contiene",
    "not_contains": "non contiene",
    "ends_with": "finisce con",
    "not_ends_with": "non finisce con",
    "is_empty": "è vuoto",
    "is_not_empty": "non è vuoto",
    "is_null": "è nullo",
    "is_not_null": "non è nullo"
  },
  "errors": {
    "no_filter": "Nessun filtro selezionato",
    "empty_group": "Il gruppo è vuoto",
    "radio_empty": "No value selected",
    "checkbox_empty": "Nessun valore selezionato",
    "select_empty": "Nessun valore selezionato",
    "string_empty": "Valore vuoto",
    "string_exceed_min_length": "Deve contenere almeno {0} caratteri",
    "string_exceed_max_length": "Non deve contenere più di {0} caratteri",
    "string_invalid_format": "Formato non valido ({0})",
    "number_nan": "Non è un numero",
    "number_not_integer": "Non è un intero",
    "number_not_double": "Non è un numero con la virgola",
    "number_exceed_min": "Deve essere maggiore di {0}",
    "number_exceed_max": "Deve essere minore di {0}",
    "number_wrong_step": "Deve essere multiplo di {0}",
    "number_between_invalid": "Valori non validi, {0} è maggiore di {1}",
    "datetime_empty": "Valore vuoto",
    "datetime_invalid": "Formato data non valido ({0})",
    "datetime_exceed_min": "Deve essere successivo a {0}",
    "datetime_exceed_max": "Deve essere precedente a {0}",
    "datetime_between_invalid": "Valori non validi, {0} è maggiore di {1}",
    "boolean_not_valid": "Non è un booleano",
    "operator_not_multiple": "L'Operatore {0} non può accettare valori multipli"
  }
};

QueryBuilder.defaults({ lang_code: 'it' });
}));