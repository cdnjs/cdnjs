"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Checkbox", {
    enumerable: true,
    get: function() {
        return Checkbox;
    }
});
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _useAdaptivityConditionalRender = require("../../hooks/useAdaptivityConditionalRender");
var _useExternRef = require("../../hooks/useExternRef");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _warnOnce = require("../../lib/warnOnce");
var _Tappable = require("../Tappable/Tappable");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Text = require("../Typography/Text/Text");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var sizeYClassNames = _define_property._({
    none: "vkuiCheckbox--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiCheckbox--sizeY-compact");
var warn = (0, _warnOnce.warnOnce)("Checkbox");
var Checkbox = function(_param) {
    var children = _param.children, className = _param.className, style = _param.style, getRootRef = _param.getRootRef, getRef = _param.getRef, description = _param.description, indeterminate = _param.indeterminate, defaultIndeterminate = _param.defaultIndeterminate, hoverMode = _param.hoverMode, activeMode = _param.activeMode, hasHover = _param.hasHover, hasActive = _param.hasActive, focusVisibleMode = _param.focusVisibleMode, onChange = _param.onChange, titleAfter = _param.titleAfter, restProps = _object_without_properties._(_param, [
        "children",
        "className",
        "style",
        "getRootRef",
        "getRef",
        "description",
        "indeterminate",
        "defaultIndeterminate",
        "hoverMode",
        "activeMode",
        "hasHover",
        "hasActive",
        "focusVisibleMode",
        "onChange",
        "titleAfter"
    ]);
    var inputRef = (0, _useExternRef.useExternRef)(getRef);
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _useAdaptivityConditionalRender1 = (0, _useAdaptivityConditionalRender.useAdaptivityConditionalRender)(), adaptiveSizeY = _useAdaptivityConditionalRender1.sizeY;
    _react.useEffect(function() {
        var indeterminateValue = indeterminate === undefined ? defaultIndeterminate : indeterminate;
        if (inputRef.current) {
            inputRef.current.indeterminate = Boolean(indeterminateValue);
        }
    }, [
        defaultIndeterminate,
        indeterminate,
        inputRef
    ]);
    var handleChange = _react.useCallback(function(event) {
        if (defaultIndeterminate !== undefined && indeterminate === undefined && restProps.checked === undefined && inputRef.current) {
            inputRef.current.indeterminate = false;
        }
        if (indeterminate !== undefined && inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
        onChange && onChange(event);
    }, [
        defaultIndeterminate,
        indeterminate,
        restProps.checked,
        onChange,
        inputRef
    ]);
    if (process.env.NODE_ENV === "development") {
        if (defaultIndeterminate && restProps.defaultChecked) {
            warn("defaultIndeterminate и defaultChecked не могут быть true одновременно", "error");
        }
        if (indeterminate && restProps.checked) {
            warn("indeterminate и checked не могут быть true одновременно", "error");
        }
        if (restProps.defaultChecked && restProps.checked) {
            warn("defaultChecked и checked не могут быть true одновременно", "error");
        }
    }
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, {
        Component: "label",
        className: (0, _vkjs.classNames)("vkuiCheckbox", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], !((0, _vkjs.hasReactNode)(children) || (0, _vkjs.hasReactNode)(description)) && "vkuiCheckbox--simple", className),
        style: style,
        disabled: restProps.disabled,
        activeEffectDelay: platform === _platform.Platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode
    }, /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "input",
        type: "checkbox",
        onChange: handleChange,
        className: "vkuiCheckbox__input",
        getRootRef: inputRef
    })), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCheckbox__icon", "vkuiCheckbox__icon--on")
    }, platform === _platform.Platform.VKCOM ? /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxOn, null) : /*#__PURE__*/ _react.createElement(_react.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxOn, {
        className: adaptiveSizeY.compact.className
    }), adaptiveSizeY.regular && /*#__PURE__*/ _react.createElement(_icons.Icon24CheckBoxOn, {
        className: adaptiveSizeY.regular.className
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCheckbox__icon", "vkuiCheckbox__icon--off")
    }, platform === _platform.Platform.VKCOM ? /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxOff, null) : /*#__PURE__*/ _react.createElement(_react.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxOff, {
        className: adaptiveSizeY.compact.className
    }), adaptiveSizeY.regular && /*#__PURE__*/ _react.createElement(_icons.Icon24CheckBoxOff, {
        className: adaptiveSizeY.regular.className
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiCheckbox__icon", "vkuiCheckbox__icon--indeterminate")
    }, platform === _platform.Platform.VKCOM ? /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxIndetermanate, {
        width: 20,
        height: 20
    }) : /*#__PURE__*/ _react.createElement(_react.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxIndetermanate, {
        className: adaptiveSizeY.compact.className,
        width: 20,
        height: 20
    }), adaptiveSizeY.regular && /*#__PURE__*/ _react.createElement(_icons.Icon20CheckBoxIndetermanate, {
        className: adaptiveSizeY.regular.className,
        width: 24,
        height: 24
    }))), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCheckbox__content"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCheckbox__title"
    }, /*#__PURE__*/ _react.createElement(_Text.Text, {
        className: "vkuiCheckbox__titleBefore"
    }, children), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiCheckbox__titleAfter"
    }, titleAfter)), (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiCheckbox__description"
    }, description)));
};

//# sourceMappingURL=Checkbox.js.map