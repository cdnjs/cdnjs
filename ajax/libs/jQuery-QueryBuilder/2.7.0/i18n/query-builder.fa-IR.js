/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Farsi (fa-ir)
 * Author: Behzad Sedighzade, behzad.sedighzade@gmail.com
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

QueryBuilder.regional['fa-IR'] = {
  "__locale": "Farsi (fa-ir)",
  "__author": "Behzad Sedighzade, behzad.sedighzade@gmail.com",
  "add_rule": "افزودن قاعده",
  "add_group": "افزودن گروه",
  "delete_rule": "حذف قاعده",
  "delete_group": "حذف گروه",
  "conditions": {
    "AND": "و",
    "OR": "یا"
  },
  "operators": {
    "equal": "برابر با",
    "not_equal": "مخالف",
    "in": "شامل مجموعه شود",
    "not_in": "شامل مجموعه نشود",
    "less": "کمتر از",
    "less_or_equal": "کمتر یا مساوی با",
    "greater": "بزرگتر از",
    "greater_or_equal": "بزرگتر یا مساوی با",
    "between": "مابین",
    "not_between": "مابین نباشد",
    "begins_with": "شروع شود با",
    "not_begins_with": "شروع نشود با",
    "contains": "شامل شود",
    "not_contains": "شامل نشود",
    "ends_with": "خاتمه یابد با",
    "not_ends_with": "خاتمه نیابد با",
    "is_empty": "خالی باشد",
    "is_not_empty": "خالی نباشد",
    "is_null": "باشد ( null ) پوچ",
    "is_not_null": "نباشد( null ) پوچ "
  },
  "errors": {
    "no_filter": "هیچ قاعده ای انتخاب نشده است",
    "empty_group": "گروه خالی است",
    "radio_empty": "مقداری انتخاب نشده است",
    "checkbox_empty": "مقداری انتخاب نشده است",
    "select_empty": "مقداری انتخاب نشده است",
    "string_empty": "مقدار متنی خالی است",
    "string_exceed_min_length": "رشته حداقل باید {0} عدد حرف داشته باشد",
    "string_exceed_max_length": "رشته حداکثر {0} عدد حرف می تواند قبول کند",
    "string_invalid_format": "قالب رشته {0}  نامعتبر ست",
    "number_nan": "عدد وارد کنید",
    "number_not_integer": "مقدار صحیح وارد کنید",
    "number_not_double": "مقدار اعشاری وارد کنید",
    "number_exceed_min": "باید از {0} بزرگتر باشد",
    "number_exceed_max": "باید از {0} کمتر باشد",
    "number_wrong_step": "باید مضربی از {0} باشد",
    "datetime_empty": "مقدار تاریخ خالی وارد شده!",
    "datetime_invalid": "قالب تاریخ ( {0} )  اشتباه است",
    "datetime_exceed_min": "باید بعد از {0} باشد",
    "datetime_exceed_max": "باید قبل  از {0} باشد",
    "boolean_not_valid": "مقدار دودویی وارد کنید",
    "operator_not_multiple": "اپراتور \"{1}\" نمی تواند چند مقدار قبول کند"
  }
};

QueryBuilder.defaults({ lang_code: 'fa-IR' });
}));