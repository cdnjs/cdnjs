"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "DatePicker", {
    enumerable: true,
    get: function() {
        return DatePicker;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _range = require("../../helpers/range");
var _useAdaptivityHasPointer = require("../../hooks/useAdaptivityHasPointer");
var _customSelect = require("../CustomSelect/CustomSelect");
var _input = require("../Input/Input");
var DefaultMonths = [
    "Января",
    "Февраля",
    "Марта",
    "Апреля",
    "Мая",
    "Июня",
    "Июля",
    "Августа",
    "Сентября",
    "Октября",
    "Ноября",
    "Декабря"
];
// Переводим state к формату гг-мм-дд
function convertToInputFormat(param) {
    var _param_day = param.day, day = _param_day === void 0 ? 0 : _param_day, _param_month = param.month, month = _param_month === void 0 ? 0 : _param_month, _param_year = param.year, year = _param_year === void 0 ? 0 : _param_year;
    return "".concat(year, "-").concat((0, _vkjs.leadingZero)(month), "-").concat((0, _vkjs.leadingZero)(day));
}
// Переводим дату формата гг-мм-дд к объекту
function parseInputDate(date) {
    var splited = date.split("-");
    return {
        day: Number(splited[2]),
        month: Number(splited[1]),
        year: Number(splited[0])
    };
}
function getMonthMaxDay(month, year) {
    return month ? new Date(year || 2016, month, 0).getDate() : 31;
}
var DatePickerCustom = function(_param) {
    var name = _param.name, _param_min = _param.min, min = _param_min === void 0 ? {
        day: 0,
        month: 0,
        year: 0
    } : _param_min, _param_max = _param.max, max = _param_max === void 0 ? {
        day: 31,
        month: 12,
        year: 2100
    } : _param_max, dayPlaceholder = _param.dayPlaceholder, monthPlaceholder = _param.monthPlaceholder, yearPlaceholder = _param.yearPlaceholder, popupDirection = _param.popupDirection, defaultValue = _param.defaultValue, monthNames = _param.monthNames, _param_day = _param.day, day = _param_day === void 0 ? 0 : _param_day, _param_month = _param.month, month = _param_month === void 0 ? 0 : _param_month, _param_year = _param.year, year = _param_year === void 0 ? 0 : _param_year, onDateChange = _param.onDateChange, disabled = _param.disabled, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "name",
        "min",
        "max",
        "dayPlaceholder",
        "monthPlaceholder",
        "yearPlaceholder",
        "popupDirection",
        "defaultValue",
        "monthNames",
        "day",
        "month",
        "year",
        "onDateChange",
        "disabled",
        "className"
    ]);
    var onSelectChange = function(e) {
        onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(_defineProperty({
            day: day,
            month: month,
            year: year
        }, e.target.name, Number(e.target.value)));
    };
    var dayOptions = (0, _range.range)(1, getMonthMaxDay(month, year)).map(function(value) {
        return {
            label: String(value),
            value: value
        };
    });
    var monthOptions = (monthNames || DefaultMonths).map(function(name, index) {
        return {
            label: name,
            value: index + 1
        };
    });
    var yearOptions = (0, _range.range)(max.year, min.year).map(function(value) {
        return {
            label: String(value),
            value: value
        };
    });
    return /*#__PURE__*/ _react.createElement("div", _objectSpread({
        className: (0, _vkjs.classNames)("vkuiDatePicker", className)
    }, restProps), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiDatePicker__container"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiDatePicker__day"
    }, /*#__PURE__*/ _react.createElement(_customSelect.CustomSelect, {
        name: "day",
        value: day,
        options: dayOptions,
        placeholder: dayPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiDatePicker__month"
    }, /*#__PURE__*/ _react.createElement(_customSelect.CustomSelect, {
        className: "vkuiDatePicker__monthSelect",
        name: "month",
        value: month,
        options: monthOptions,
        placeholder: monthPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiDatePicker__year"
    }, /*#__PURE__*/ _react.createElement(_customSelect.CustomSelect, {
        name: "year",
        value: year,
        options: yearOptions,
        placeholder: yearPlaceholder,
        popupDirection: popupDirection,
        onChange: onSelectChange,
        disabled: disabled
    }))), /*#__PURE__*/ _react.createElement("input", {
        type: "hidden",
        name: name,
        value: convertToInputFormat({
            day: day,
            month: month,
            year: year
        })
    }));
};
var DatePickerNative = function(_param) {
    var _param_min = _param.min, min = _param_min === void 0 ? {
        day: 0,
        month: 0,
        year: 0
    } : _param_min, _param_max = _param.max, max = _param_max === void 0 ? {
        day: 31,
        month: 12,
        year: 2100
    } : _param_max, dayPlaceholder = _param.dayPlaceholder, monthPlaceholder = _param.monthPlaceholder, yearPlaceholder = _param.yearPlaceholder, popupDirection = _param.popupDirection, defaultValue = _param.defaultValue, day = _param.day, month = _param.month, year = _param.year, onDateChange = _param.onDateChange, restProps = _objectWithoutProperties(_param, [
        "min",
        "max",
        "dayPlaceholder",
        "monthPlaceholder",
        "yearPlaceholder",
        "popupDirection",
        "defaultValue",
        "day",
        "month",
        "year",
        "onDateChange"
    ]);
    var defProps = day && month && year ? {
        defaultValue: convertToInputFormat({
            day: day,
            month: month,
            year: year
        })
    } : {};
    var onStringChange = _react.useCallback(function(e) {
        onDateChange === null || onDateChange === void 0 ? void 0 : onDateChange(parseInputDate(e.currentTarget.value));
    }, [
        onDateChange
    ]);
    return /*#__PURE__*/ _react.createElement(_input.Input, _objectSpread(_objectSpreadProps(_objectSpread({}, restProps), {
        type: "date",
        onChange: onStringChange,
        min: convertToInputFormat(min),
        max: convertToInputFormat(max)
    }), defProps));
};
var DatePicker = function(_param) {
    var defaultValue = _param.defaultValue, props = _objectWithoutProperties(_param, [
        "defaultValue"
    ]);
    var hasPointer = (0, _useAdaptivityHasPointer.useAdaptivityHasPointer)();
    var _React_useState = _slicedToArray(_react.useState(function() {
        return {
            day: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.day) || 0,
            month: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.month) || 0,
            year: (defaultValue === null || defaultValue === void 0 ? void 0 : defaultValue.year) || 0
        };
    }), 2), value = _React_useState[0], setValue = _React_useState[1];
    var onDateChange = _react.useCallback(function(update) {
        setValue(update);
        props.onDateChange && props.onDateChange(_objectSpread({}, update));
    }, [
        props
    ]);
    var Cmp = hasPointer ? DatePickerCustom : DatePickerNative;
    return /*#__PURE__*/ _react.createElement(Cmp, _objectSpreadProps(_objectSpread({}, props, value), {
        onDateChange: onDateChange
    }));
};

//# sourceMappingURL=DatePicker.js.map