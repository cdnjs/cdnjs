"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ChipsInputBase", {
    enumerable: true,
    get: function() {
        return ChipsInputBase;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _dom = require("@vkontakte/vkui-floating-ui/utils/dom");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _useExternRef = require("../../hooks/useExternRef");
const _accessibility = require("../../lib/accessibility");
const _dom1 = require("../../lib/dom");
const _FormField = require("../FormField/FormField");
const _Text = require("../Typography/Text/Text");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const _constants = require("./constants");
const getValueOptionByIndex = (value, index)=>{
    const foundOption = value[index];
    return foundOption ? foundOption : null;
};
const getValueOptionByHTMLElement = (value, el)=>{
    const ariaLabel = el.getAttribute('aria-label');
    const foundOption = value.find((v)=>v.label === ariaLabel);
    return foundOption ? foundOption : null;
};
const sizeYClassNames = {
    none: "vkuiChipsInputBase--sizeY-none",
    compact: "vkuiChipsInputBase--sizeY-compact"
};
const ChipsInputBase = (_param)=>{
    var { // FormFieldProps
    getRootRef, style, className, before, after, status, mode, // option
    value = _constants.DEFAULT_VALUE, onAddChipOption, onRemoveChipOption, renderChip = _constants.renderChipDefault, // input
    getRef, id: idProp, inputValue, inputLabel = _constants.DEFAULT_INPUT_LABEL, placeholder, disabled, readOnly, addOnBlur, onBlur, onFocus, onInputChange } = _param, restProps = _object_without_properties._(_param, [
        "getRootRef",
        "style",
        "className",
        "before",
        "after",
        "status",
        "mode",
        "value",
        "onAddChipOption",
        "onRemoveChipOption",
        "renderChip",
        "getRef",
        "id",
        "inputValue",
        "inputLabel",
        "placeholder",
        "disabled",
        "readOnly",
        "addOnBlur",
        "onBlur",
        "onFocus",
        "onInputChange"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const idGenerated = _react.useId();
    const inputId = idProp || `chips-input-base-generated-id-${idGenerated}`;
    const inputRef = (0, _useExternRef.useExternRef)(getRef);
    const listboxRef = _react.useRef(null);
    const [focused, setFocused] = _react.useState(false);
    const valueLength = value.length;
    const withPlaceholder = valueLength === 0;
    const isDisabled = disabled || readOnly;
    const handleKeyDown = (event)=>{
        const targetEl = event.target;
        if (event.defaultPrevented || !inputRef.current || !(0, _dom.isHTMLElement)(targetEl)) {
            return;
        }
        const lastOptionIndex = valueLength - 1;
        const nextInputValue = inputRef.current.value;
        const isInputEl = targetEl === inputRef.current;
        const isInputValueEmpty = nextInputValue === _constants.DEFAULT_INPUT_VALUE;
        switch(event.key){
            case _accessibility.Keys.ENTER:
                {
                    if (isInputEl && !isInputValueEmpty) {
                        event.preventDefault();
                        onAddChipOption(nextInputValue);
                    }
                    break;
                }
            case _accessibility.Keys.BACKSPACE:
                {
                    if (valueLength) {
                        const option = isInputEl && isInputValueEmpty ? getValueOptionByIndex(value, lastOptionIndex) : getValueOptionByHTMLElement(value, targetEl);
                        if (option) {
                            event.preventDefault();
                            inputRef.current.focus();
                            onRemoveChipOption(option);
                        }
                    }
                    break;
                }
            case _accessibility.Keys.ARROW_UP:
            case _accessibility.Keys.ARROW_LEFT:
            case _accessibility.Keys.ARROW_DOWN:
            case _accessibility.Keys.ARROW_RIGHT:
                {
                    event.preventDefault();
                    if (valueLength && isInputValueEmpty && listboxRef.current) {
                        const foundEl = isInputEl && (event.key === _accessibility.Keys.ARROW_UP || event.key === _accessibility.Keys.ARROW_LEFT) ? (0, _dom1.getHTMLElementByChildren)(listboxRef.current.children, lastOptionIndex) : (0, _dom1.getHTMLElementSiblingByDirection)(targetEl, (0, _accessibility.getHorizontalFocusGoTo)(event.key));
                        if (foundEl) {
                            foundEl.focus();
                        }
                    }
                }
        }
    };
    const handleBlur = (event)=>{
        if (focused) {
            setFocused(false);
        }
        if (onBlur) {
            onBlur(event);
        }
        if (addOnBlur && !event.defaultPrevented && inputRef.current) {
            onAddChipOption(inputRef.current.value);
        }
    };
    const handleFocus = (event)=>{
        if (!focused) {
            setFocused(true);
        }
        if (onFocus) {
            onFocus(event);
        }
    };
    const handleChipRemove = (event, value)=>{
        event.preventDefault();
        event.stopPropagation();
        onRemoveChipOption(value);
    };
    const handleClick = ()=>{
        if (!focused && inputRef.current) {
            inputRef.current.focus();
        }
    };
    return /*#__PURE__*/ _react.createElement(_FormField.FormField, {
        Component: "div",
        getRootRef: getRootRef,
        style: style,
        disabled: disabled,
        before: before,
        after: after,
        status: status,
        mode: mode,
        className: className
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiChipsInputBase", sizeY !== 'regular' && sizeYClassNames[sizeY], withPlaceholder && "vkuiChipsInputBase--hasPlaceholder"),
        onClick: isDisabled ? undefined : handleClick,
        // для a11y
        ref: listboxRef,
        role: "listbox",
        "aria-orientation": "horizontal",
        "aria-disabled": disabled,
        "aria-readonly": readOnly,
        onKeyDown: isDisabled ? undefined : handleKeyDown
    }, value.map((option, index)=>/*#__PURE__*/ _react.createElement(_react.Fragment, {
            key: `${typeof option.value}-${option.label}`
        }, renderChip({
            'Component': 'div',
            'value': option.value,
            'label': option.label,
            'disabled': disabled,
            'className': "vkuiChipsInputBase__chip",
            'onRemove': handleChipRemove,
            // для a11y
            'role': 'option',
            'aria-selected': true,
            'aria-posinset': index + 1,
            'aria-setsize': valueLength
        }, option))), /*#__PURE__*/ _react.createElement("div", {
        role: "option",
        className: "vkuiChipsInputBase__label"
    }, inputLabel && /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, null, inputLabel), /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread_props._(_object_spread._({
        "aria-autocomplete": "list",
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false
    }, restProps), {
        Component: "input",
        type: "text",
        id: inputId,
        getRootRef: inputRef,
        className: "vkuiChipsInputBase__el",
        disabled: disabled,
        readOnly: readOnly,
        placeholder: withPlaceholder ? placeholder : undefined,
        value: inputValue,
        onChange: onInputChange,
        onFocus: handleFocus,
        onBlur: handleBlur
    })))));
};

//# sourceMappingURL=ChipsInputBase.js.map