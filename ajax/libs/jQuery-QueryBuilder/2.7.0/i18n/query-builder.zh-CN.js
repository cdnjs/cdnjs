/*!
 * jQuery QueryBuilder 2.7.0
 * Locale: Simplified Chinese (zh_CN)
 * Author: shadowwind, shatteredwindgo@gmail.com
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

QueryBuilder.regional['zh-CN'] = {
  "__locale": "Simplified Chinese (zh_CN)",
  "__author": "shadowwind, shatteredwindgo@gmail.com",
  "add_rule": "添加规则",
  "add_group": "添加组",
  "delete_rule": "删除",
  "delete_group": "删除组",
  "conditions": {
    "AND": "和",
    "OR": "或"
  },
  "operators": {
    "equal": "等于",
    "not_equal": "不等于",
    "in": "在...之內",
    "not_in": "不在...之內",
    "less": "小于",
    "less_or_equal": "小于或等于",
    "greater": "大于",
    "greater_or_equal": "大于或等于",
    "between": "在...之间",
    "not_between": "不在...之间",
    "begins_with": "以...开始",
    "not_begins_with": "不以...开始",
    "contains": "包含以下内容",
    "not_contains": "不包含以下内容",
    "ends_with": "以...结束",
    "not_ends_with": "不以...结束",
    "is_empty": "为空",
    "is_not_empty": "不为空",
    "is_null": "为 null",
    "is_not_null": "不为 null"
  },
  "errors": {
    "no_filter": "没有选择过滤器",
    "empty_group": "该组为空",
    "radio_empty": "没有选中项",
    "checkbox_empty": "没有选中项",
    "select_empty": "没有选中项",
    "string_empty": "没有输入值",
    "string_exceed_min_length": "必须至少包含{0}个字符",
    "string_exceed_max_length": "必须不超过{0}个字符",
    "string_invalid_format": "无效格式({0})",
    "number_nan": "值不是数字",
    "number_not_integer": "不是整数",
    "number_not_double": "不是浮点数",
    "number_exceed_min": "必须大于{0}",
    "number_exceed_max": "必须小于{0}",
    "number_wrong_step": "必须是{0}的倍数",
    "datetime_empty": "值为空",
    "datetime_invalid": "不是有效日期({0})",
    "datetime_exceed_min": "必须在{0}之后",
    "datetime_exceed_max": "必须在{0}之前",
    "boolean_not_valid": "不是布尔值",
    "operator_not_multiple": "选项\"{1}\"无法接受多个值"
  },
  "invert": "倒置"
};

QueryBuilder.defaults({ lang_code: 'zh-CN' });
}));