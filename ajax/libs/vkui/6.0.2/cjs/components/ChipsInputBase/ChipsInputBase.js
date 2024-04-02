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
const _constants = require("./constants");
const _helpers = require("./helpers");
const sizeYClassNames = {
    none: "vkuiChipsInputBase--sizeY-none",
    compact: "vkuiChipsInputBase--sizeY-compact"
};
const ChipsInputBase = (_param)=>{
    var { // FormFieldProps
    getRootRef, style, className, before, after, status, mode, // option
    value = _constants.DEFAULT_VALUE, onAddChipOption, onRemoveChipOption: onRemoveChipOptionProp, renderChip = _constants.renderChipDefault, // input
    getRef, id: idProp, inputValue = _constants.DEFAULT_INPUT_VALUE, placeholder, disabled, readOnly, addOnBlur, onBlur, onInputChange } = _param, restProps = _object_without_properties._(_param, [
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
        "placeholder",
        "disabled",
        "readOnly",
        "addOnBlur",
        "onBlur",
        "onInputChange"
    ]);
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    const idGenerated = _react.useId();
    const inputRef = (0, _useExternRef.useExternRef)(getRef);
    const listboxRef = _react.useRef(null);
    const valueLength = value.length;
    const withPlaceholder = valueLength === 0;
    const [lastFocusedChipOptionIndex, setLastFocusedChipOptionIndex] = _react.useState(0);
    const resetChipOptionFocusToInputEl = (inputEl)=>{
        setLastFocusedChipOptionIndex(0);
        inputEl.focus();
    };
    const moveFocusToChipOption = (currentIndex, navigateTo, listboxEl)=>{
        const index = (0, _helpers.getNextChipOptionIndexByNavigateToProp)(currentIndex, navigateTo, valueLength);
        // eslint-disable-next-line no-restricted-properties
        const foundEl = listboxEl.querySelector(`[data-index="${index}"]`);
        if (foundEl) {
            setLastFocusedChipOptionIndex(index);
            foundEl.focus();
        }
    };
    const removeChipOption = (o, index)=>{
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (!inputRef.current || !listboxRef.current) {
            return;
        }
        if (valueLength > 1) {
            if (index === valueLength - 1) {
                moveFocusToChipOption(index, 'prev', listboxRef.current);
            } else {
                moveFocusToChipOption(index, 'next', listboxRef.current);
            }
        } else {
            resetChipOptionFocusToInputEl(inputRef.current);
        }
        onRemoveChipOptionProp(o);
    };
    const handleListboxKeyDown = (event)=>{
        const targetEl = event.target;
        /* istanbul ignore if: невозможный кейс (в SSR вызова этой функции не будет) */ if (event.defaultPrevented || !listboxRef.current || !(0, _dom.isHTMLElement)(targetEl)) {
            return;
        }
        switch(event.key){
            case _accessibility.Keys.ENTER:
                {
                    if (!readOnly && (0, _dom1.contains)(targetEl, inputRef.current) && inputRef.current && !(0, _helpers.isInputValueEmpty)(inputRef.current)) {
                        event.preventDefault();
                        onAddChipOption(inputRef.current.value);
                    }
                    break;
                }
            case _accessibility.Keys.DELETE:
            case _accessibility.Keys.BACKSPACE:
                {
                    if (!readOnly && valueLength > 0) {
                        if (!(0, _dom1.contains)(targetEl, inputRef.current)) {
                            event.preventDefault();
                            removeChipOption((0, _helpers.getChipOptionValueByHTMLElement)(targetEl), (0, _helpers.getChipOptionIndexByHTMLElement)(targetEl));
                        } else if (event.key === _accessibility.Keys.BACKSPACE && (0, _helpers.isInputValueEmpty)(inputRef.current)) {
                            event.preventDefault();
                            moveFocusToChipOption((0, _helpers.getChipOptionIndexByHTMLElement)(targetEl), 'last', listboxRef.current);
                        }
                    }
                    break;
                }
            case _accessibility.Keys.ARROW_UP:
            case _accessibility.Keys.ARROW_LEFT:
            case _accessibility.Keys.ARROW_DOWN:
            case _accessibility.Keys.ARROW_RIGHT:
                {
                    if (valueLength !== 0 && !(0, _dom1.contains)(targetEl, inputRef.current)) {
                        event.preventDefault();
                        moveFocusToChipOption((0, _helpers.getChipOptionIndexByHTMLElement)(targetEl), (0, _accessibility.getHorizontalFocusGoTo)(event.key), listboxRef.current);
                    }
                    break;
                }
        }
    };
    const handleInputBlur = (event)=>{
        if (onBlur) {
            onBlur(event);
        }
        if (addOnBlur && !event.defaultPrevented && inputRef.current) {
            onAddChipOption(inputRef.current.value);
        }
    };
    const handleChipRemove = (event, v)=>{
        event.preventDefault();
        event.stopPropagation();
        removeChipOption(v, (0, _helpers.getChipOptionIndexByValueProp)(v, value));
    };
    const handleRootClick = (event)=>{
        if ((0, _dom1.contains)(event.currentTarget, (0, _dom1.getActiveElementByAnotherElement)(event.currentTarget))) {
            return;
        }
        if (valueLength > 0 && listboxRef.current) {
            moveFocusToChipOption(0, 'first', listboxRef.current);
        } else if (inputRef.current) {
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
        className: className,
        onClick: disabled ? undefined : handleRootClick
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiChipsInputBase", sizeY !== 'regular' && sizeYClassNames[sizeY], withPlaceholder && "vkuiChipsInputBase--hasPlaceholder"),
        // для a11y
        ref: listboxRef,
        role: "listbox",
        "aria-orientation": "horizontal",
        "aria-disabled": disabled,
        "aria-readonly": readOnly,
        onKeyDown: disabled ? undefined : handleListboxKeyDown
    }, value.map((option, index)=>/*#__PURE__*/ _react.createElement(_react.Fragment, {
            key: `${typeof option.value}-${option.label}`
        }, renderChip({
            'Component': 'div',
            'value': option.value,
            'label': option.label,
            'disabled': disabled,
            'readOnly': readOnly,
            'className': "vkuiChipsInputBase__chip",
            'onRemove': handleChipRemove,
            // чтобы можно было легче найти этот чип в DOM
            'data-index': index,
            'data-value': option.value,
            // для a11y
            'tabIndex': lastFocusedChipOptionIndex === index ? 0 : -1,
            'role': 'option',
            'aria-selected': true,
            'aria-posinset': index + 1,
            'aria-setsize': valueLength
        }, option))), /*#__PURE__*/ _react.createElement(_Text.Text, _object_spread_props._(_object_spread._({
        autoCapitalize: "none",
        autoComplete: "off",
        autoCorrect: "off",
        spellCheck: false
    }, restProps), {
        Component: "input",
        type: "text",
        id: idProp || `chips-input-base-generated-id-${idGenerated}`,
        getRootRef: inputRef,
        className: "vkuiChipsInputBase__el",
        disabled: disabled,
        readOnly: readOnly,
        placeholder: withPlaceholder ? placeholder : undefined,
        value: inputValue,
        onChange: onInputChange,
        onBlur: handleInputBlur
    }))));
};

//# sourceMappingURL=ChipsInputBase.js.map