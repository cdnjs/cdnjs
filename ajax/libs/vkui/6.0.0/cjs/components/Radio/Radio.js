"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "Radio", {
    enumerable: true,
    get: function() {
        return Radio;
    }
});
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivity = require("../../hooks/useAdaptivity");
const _usePlatform = require("../../hooks/usePlatform");
const _useState = require("../Clickable/useState");
const _Tappable = require("../Tappable/Tappable");
const _Footnote = require("../Typography/Footnote/Footnote");
const _Text = require("../Typography/Text/Text");
const _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
const sizeYClassNames = {
    none: "vkuiRadio--sizeY-none",
    ['compact']: "vkuiRadio--sizeY-compact"
};
const RadioIcon = (props)=>{
    return /*#__PURE__*/ _react.createElement("svg", _object_spread._({
        xmlns: "http://www.w3.org/2000/svg",
        viewBox: "0 0 24 24",
        "aria-hidden": true
    }, props), /*#__PURE__*/ _react.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "11",
        stroke: "currentColor",
        strokeWidth: "2",
        fill: "none"
    }), /*#__PURE__*/ _react.createElement("circle", {
        cx: "12",
        cy: "12",
        r: "7.5",
        className: "vkuiRadio__pin",
        fill: "currentColor"
    }));
};
const Radio = (_param)=>{
    var { children, description, style, className, getRootRef, titleAfter, getRef, labelProps } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "description",
        "style",
        "className",
        "getRootRef",
        "titleAfter",
        "getRef",
        "labelProps"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { sizeY = 'none' } = (0, _useAdaptivity.useAdaptivity)();
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        Component: "label",
        style: style,
        className: (0, _vkjs.classNames)("vkuiRadio", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        activeEffectDelay: platform === 'ios' ? 100 : _useState.DEFAULT_ACTIVE_EFFECT_DELAY,
        disabled: restProps.disabled,
        getRootRef: getRootRef
    }, labelProps), /*#__PURE__*/ _react.createElement(_VisuallyHidden.VisuallyHidden, _object_spread_props._(_object_spread._({}, restProps), {
        Component: "input",
        type: "radio",
        getRootRef: getRef,
        className: "vkuiRadio__input"
    })), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRadio__container"
    }, /*#__PURE__*/ _react.createElement(RadioIcon, {
        className: "vkuiRadio__icon"
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRadio__content"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRadio__title"
    }, /*#__PURE__*/ _react.createElement(_Text.Text, null, children), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRadio__titleAfter"
    }, titleAfter)), (0, _vkjs.hasReactNode)(description) && /*#__PURE__*/ _react.createElement(_Footnote.Footnote, {
        className: "vkuiRadio__description"
    }, description))));
};

//# sourceMappingURL=Radio.js.map