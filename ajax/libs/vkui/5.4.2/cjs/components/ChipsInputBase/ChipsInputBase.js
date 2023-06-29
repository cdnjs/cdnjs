"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
function _export(target, all) {
    for(var name in all)Object.defineProperty(target, name, {
        enumerable: true,
        get: all[name]
    });
}
_export(exports, {
    chipsInputDefaultProps: function() {
        return chipsInputDefaultProps;
    },
    ChipsInputBase: function() {
        return ChipsInputBase;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _typeOf = require("@swc/helpers/lib/_type_of.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useChipsInput = require("../../hooks/useChipsInput");
var _useExternRef = require("../../hooks/useExternRef");
var _adaptivity = require("../../lib/adaptivity");
var _chip = require("../Chip/Chip");
var chipsInputDefaultProps = {
    onChange: _vkjs.noop,
    onInputChange: _vkjs.noop,
    onKeyDown: _vkjs.noop,
    onBlur: _vkjs.noop,
    onFocus: _vkjs.noop,
    value: [],
    inputValue: "",
    inputAriaLabel: "Введите ваше значение...",
    getOptionValue: function(option) {
        return option.value;
    },
    getOptionLabel: function(option) {
        return option.label;
    },
    getNewOptionData: function(_, label) {
        return {
            value: label,
            label: label
        };
    },
    renderChip: function renderChip(props) {
        if (!props) {
            return null;
        }
        var disabled = props.disabled, value = props.value, label = props.label, rest = _objectWithoutProperties(props, [
            "disabled",
            "value",
            "label"
        ]);
        return /*#__PURE__*/ _react.createElement(_chip.Chip, _objectSpread({
            value: value,
            removable: !disabled
        }, rest), label);
    }
};
var ChipsInputBase = function(props) {
    var propsWithDefault = _objectSpread({}, chipsInputDefaultProps, props);
    var style = propsWithDefault.style, className = propsWithDefault.className, getRootRef = propsWithDefault.getRootRef, value = propsWithDefault.value, onChange = propsWithDefault.onChange, onInputChange = propsWithDefault.onInputChange, onKeyDown = propsWithDefault.onKeyDown, onBlur = propsWithDefault.onBlur, onFocus = propsWithDefault.onFocus, children = propsWithDefault.children, inputValue = propsWithDefault.inputValue, getRef = propsWithDefault.getRef, placeholder = propsWithDefault.placeholder, getOptionValue = propsWithDefault.getOptionValue, getOptionLabel = propsWithDefault.getOptionLabel, getNewOptionData = propsWithDefault.getNewOptionData, renderChip = propsWithDefault.renderChip, inputAriaLabel = propsWithDefault.inputAriaLabel, restProps = _objectWithoutProperties(propsWithDefault, [
        "style",
        "className",
        "getRootRef",
        "value",
        "onChange",
        "onInputChange",
        "onKeyDown",
        "onBlur",
        "onFocus",
        "children",
        "inputValue",
        "getRef",
        "placeholder",
        "getOptionValue",
        "getOptionLabel",
        "getNewOptionData",
        "renderChip",
        "inputAriaLabel"
    ]);
    var sizeY = (0, _useAdaptivity.useAdaptivity)().sizeY;
    var _React_useState = _slicedToArray(_react.useState(false), 2), focused = _React_useState[0], setFocused = _React_useState[1];
    var _useChipsInput1 = (0, _useChipsInput.useChipsInput)(propsWithDefault), fieldValue = _useChipsInput1.fieldValue, addOptionFromInput = _useChipsInput1.addOptionFromInput, removeOption = _useChipsInput1.removeOption, selectedOptions = _useChipsInput1.selectedOptions, handleInputChange = _useChipsInput1.handleInputChange;
    var inputRef = (0, _useExternRef.useExternRef)(getRef);
    var isDisabled = restProps.disabled || restProps.readOnly;
    var handleKeyDown = function(e) {
        if (isDisabled) {
            e.preventDefault();
            return;
        }
        onKeyDown(e);
        if (e.key === "Backspace" && !e.defaultPrevented && !fieldValue && selectedOptions.length) {
            removeOption(getOptionValue(selectedOptions[selectedOptions.length - 1]));
            e.preventDefault();
        }
        if (e.key === "Enter" && !e.defaultPrevented && fieldValue) {
            addOptionFromInput();
            e.preventDefault();
        }
    };
    var handleBlur = function(e) {
        if (focused) {
            setFocused(false);
        }
        onBlur(e);
    };
    var handleFocus = function(e) {
        if (!focused) {
            setFocused(true);
        }
        onFocus(e);
    };
    var handleChipRemove = function(_, value) {
        if (value !== undefined) {
            removeOption(value);
        }
    };
    var handleClick = function(e) {
        if (isDisabled) {
            e.preventDefault();
            return;
        }
        if ((inputRef === null || inputRef === void 0 ? void 0 : inputRef.current) !== null && !focused) {
            inputRef.current.focus();
        }
    };
    return /*#__PURE__*/ _react.createElement("div", {
        onClick: handleClick,
        role: "presentation",
        style: style,
        className: (0, _vkjs.classNames)("vkuiChipsInputBase", sizeY === _adaptivity.SizeType.COMPACT && "vkuiChipsInputBase--sizeY-compact", !selectedOptions.length && "vkuiChipsInputBase--hasPlaceholder", className),
        ref: getRootRef
    }, selectedOptions.map(function(option) {
        var value = getOptionValue(option);
        var label = getOptionLabel(option);
        return /*#__PURE__*/ _react.createElement(_react.Fragment, {
            key: "".concat(typeof value === "undefined" ? "undefined" : _typeOf(value), "-").concat(value)
        }, renderChip({
            option: option,
            value: value,
            label: label,
            onRemove: handleChipRemove,
            disabled: Boolean(restProps.disabled),
            className: "vkuiChipsInputBase__chip"
        }));
    }), /*#__PURE__*/ _react.createElement("label", {
        className: "vkuiChipsInputBase__label",
        "aria-label": inputAriaLabel
    }, /*#__PURE__*/ _react.createElement("input", _objectSpreadProps(_objectSpread({
        type: "text",
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false,
        "aria-autocomplete": "list",
        className: "vkuiChipsInputBase__el"
    }, restProps), {
        ref: inputRef,
        value: fieldValue,
        onChange: handleInputChange,
        onKeyDown: handleKeyDown,
        onFocus: handleFocus,
        onBlur: handleBlur,
        placeholder: selectedOptions.length ? undefined : placeholder
    }))));
};

//# sourceMappingURL=ChipsInputBase.js.map