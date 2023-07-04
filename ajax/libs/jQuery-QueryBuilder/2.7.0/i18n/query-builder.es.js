/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Spanish (es)
 * Author: "pyarza", "kddlb"
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

QueryBuilder.regional['es'] = {
  "__locale": "Spanish (es)",
  "__author": "\"pyarza\", \"kddlb\"",
  "add_rule": "Añadir regla",
  "add_group": "Añadir grupo",
  "delete_rule": "Borrar",
  "delete_group": "Borrar",
  "conditions": {
    "AND": "Y",
    "OR": "O"
  },
  "operators": {
    "equal": "igual",
    "not_equal": "distinto",
    "in": "en",
    "not_in": "no en",
    "less": "menor",
    "less_or_equal": "menor o igual",
    "greater": "mayor",
    "greater_or_equal": "mayor o igual",
    "between": "entre",
    "not_between": "no está entre",
    "begins_with": "empieza por",
    "not_begins_with": "no empieza por",
    "contains": "contiene",
    "not_contains": "no contiene",
    "ends_with": "acaba con",
    "not_ends_with": "no acaba con",
    "is_empty": "está vacío",
    "is_not_empty": "no está vacío",
    "is_null": "es nulo",
    "is_not_null": "no es nulo"
  },
  "errors": {
    "no_filter": "No se ha seleccionado ningún filtro",
    "empty_group": "El grupo está vacío",
    "radio_empty": "Ningún valor seleccionado",
    "checkbox_empty": "Ningún valor seleccionado",
    "select_empty": "Ningún valor seleccionado",
    "string_empty": "Cadena vacía",
    "string_exceed_min_length": "Debe contener al menos {0} caracteres",
    "string_exceed_max_length": "No debe contener más de {0} caracteres",
    "string_invalid_format": "Formato inválido ({0})",
    "number_nan": "No es un número",
    "number_not_integer": "No es un número entero",
    "number_not_double": "No es un número real",
    "number_exceed_min": "Debe ser mayor que {0}",
    "number_exceed_max": "Debe ser menor que {0}",
    "number_wrong_step": "Debe ser múltiplo de {0}",
    "datetime_invalid": "Formato de fecha inválido ({0})",
    "datetime_exceed_min": "Debe ser posterior a {0}",
    "datetime_exceed_max": "Debe ser anterior a {0}",
    "number_between_invalid": "Valores Inválidos, {0} es mayor que {1}",
    "datetime_empty": "Campo vacio",
    "datetime_between_invalid": "Valores Inválidos, {0} es mayor que {1}",
    "boolean_not_valid": "No es booleano",
    "operator_not_multiple": "El operador \"{1}\" no puede aceptar valores multiples"
  }
};

QueryBuilder.defaults({ lang_code: 'es' });
}));