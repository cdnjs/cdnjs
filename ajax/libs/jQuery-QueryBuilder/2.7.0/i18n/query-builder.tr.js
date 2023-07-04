/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Turkish (tr)
 * Author: Aykut Alpgiray Ateş
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

QueryBuilder.regional['tr'] = {
  "__locale": "Turkish (tr)",
  "__author": "Aykut Alpgiray Ateş",
  "add_rule": "Kural Ekle",
  "add_group": "Grup Ekle",
  "delete_rule": "Sil",
  "delete_group": "Sil",
  "conditions": {
    "AND": "Ve",
    "OR": "Veya"
  },
  "operators": {
    "equal": "eşit",
    "not_equal": "eşit değil",
    "in": "içinde",
    "not_in": "içinde değil",
    "less": "küçük",
    "less_or_equal": "küçük veya eşit",
    "greater": "büyük",
    "greater_or_equal": "büyük veya eşit",
    "between": "arasında",
    "not_between": "arasında değil",
    "begins_with": "ile başlayan",
    "not_begins_with": "ile başlamayan",
    "contains": "içeren",
    "not_contains": "içermeyen",
    "ends_with": "ile biten",
    "not_ends_with": "ile bitmeyen",
    "is_empty": "boş ise",
    "is_not_empty": "boş değil ise",
    "is_null": "var ise",
    "is_not_null": "yok ise"
  },
  "errors": {
    "no_filter": "Bir filtre seçili değil",
    "empty_group": "Grup bir eleman içermiyor",
    "radio_empty": "Seçim yapılmalı",
    "checkbox_empty": "Seçim yapılmalı",
    "select_empty": "Seçim yapılmalı",
    "string_empty": "Bir metin girilmeli",
    "string_exceed_min_length": "En az {0} karakter girilmeli",
    "string_exceed_max_length": "En fazla {0} karakter girilebilir",
    "string_invalid_format": "Uyumsuz format ({0})",
    "number_nan": "Sayı değil",
    "number_not_integer": "Tam sayı değil",
    "number_not_double": "Ondalıklı sayı değil",
    "number_exceed_min": "Sayı {0}'den/dan daha büyük olmalı",
    "number_exceed_max": "Sayı {0}'den/dan daha küçük olmalı",
    "number_wrong_step": "{0} veya katı olmalı",
    "number_between_invalid": "Geçersiz değerler, {0} değeri {1} değerinden büyük",
    "datetime_empty": "Tarih Seçilmemiş",
    "datetime_invalid": "Uygun olmayan tarih formatı ({0})",
    "datetime_exceed_min": "{0} Tarihinden daha sonrası olmalı.",
    "datetime_exceed_max": "{0} Tarihinden daha öncesi olmalı.",
    "datetime_between_invalid": "Geçersiz değerler, {0} değeri {1} değerinden büyük",
    "boolean_not_valid": "Değer Doğru/Yanlış(bool) olmalı",
    "operator_not_multiple": "Operatör \"{1}\" birden fazla değer kabul etmiyor"
  },
  "invert": "Ters Çevir"
};

QueryBuilder.defaults({ lang_code: 'tr' });
}));