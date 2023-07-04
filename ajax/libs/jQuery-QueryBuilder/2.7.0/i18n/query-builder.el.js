/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Greek (el)
 * Author: Stelios Patsatzis, https://www.linkedin.com/in/stelios-patsatzis-89841561
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

QueryBuilder.regional['el'] = {
  "__locale": "Greek (el)",
  "__author": "Stelios Patsatzis, https://www.linkedin.com/in/stelios-patsatzis-89841561",
  "add_rule": "Προσθήκη Συνθήκης",
  "add_group": "Προσθήκη Ομάδας",
  "delete_rule": "Διαγραφή",
  "delete_group": "Διαγραφή",
  "conditions": {
    "AND": "Λογικό ΚΑΙ",
    "OR": "Λογικό Η"
  },
  "operators": {
    "equal": "Ισούται με",
    "not_equal": "Διάφορο από ",
    "in": "Περιέχει",
    "not_in": "Δεν Περιέχει",
    "less": "Λιγότερο από",
    "less_or_equal": "Λιγότερο ή Ίσο",
    "greater": "Μεγαλύτερο από",
    "greater_or_equal": "Μεγαλύτερο ή Ίσο",
    "between": "Μεταξύ",
    "not_between": "Εκτός",
    "begins_with": "Αρχίζει με",
    "not_begins_with": "Δεν αρχίζει με",
    "contains": "Περιέχει",
    "not_contains": "Δεν περιέχει",
    "ends_with": "Τελειώνει σε",
    "not_ends_with": "Δεν τελειώνει σε",
    "is_empty": "Είναι άδειο",
    "is_not_empty": "Δεν είναι άδειο",
    "is_null": "Είναι NULL",
    "is_not_null": "Δεν είναι NULL"
  },
  "errors": {
    "no_filter": "Χωρίς φίλτρα",
    "empty_group": "Άδεια ομάδα",
    "radio_empty": "Χωρίς τιμή",
    "checkbox_empty": "Χωρίς τιμή",
    "select_empty": "Χωρίς τιμή",
    "string_empty": "Χωρίς τιμή",
    "string_exceed_min_length": "Ελάχιστο όριο {0} χαρακτήρων",
    "string_exceed_max_length": "Μέγιστο όριο {0} χαρακτήρων",
    "string_invalid_format": "Λανθασμένη μορφή ({0})",
    "number_nan": "Δεν είναι αριθμός",
    "number_not_integer": "Δεν είναι ακέραιος αριθμός",
    "number_not_double": "Δεν είναι πραγματικός αριθμός",
    "number_exceed_min": "Πρέπει να είναι μεγαλύτερο απο {0}",
    "number_exceed_max": "Πρέπει να είναι μικρότερο απο {0}",
    "number_wrong_step": "Πρέπει να είναι πολλαπλάσιο του {0}",
    "datetime_empty": "Χωρίς τιμή",
    "datetime_invalid": "Λανθασμένη μορφή ημερομηνίας ({0})",
    "datetime_exceed_min": "Νεότερο από {0}",
    "datetime_exceed_max": "Παλαιότερο από {0}",
    "boolean_not_valid": "Δεν είναι BOOLEAN",
    "operator_not_multiple": "Η συνθήκη \"{1}\" δεν μπορεί να δεχθεί πολλαπλές τιμές"
  },
  "invert": "Εναλλαγή"
};

QueryBuilder.defaults({ lang_code: 'el' });
}));