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
var _define_property = require("@swc/helpers/_/_define_property");
var _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
var _object_spread = require("@swc/helpers/_/_object_spread");
var _object_spread_props = require("@swc/helpers/_/_object_spread_props");
var _object_without_properties = require("@swc/helpers/_/_object_without_properties");
var _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _Tappable = require("../Tappable/Tappable");
var _Footnote = require("../Typography/Footnote/Footnote");
var _Text = require("../Typography/Text/Text");
var _VisuallyHidden = require("../VisuallyHidden/VisuallyHidden");
var sizeYClassNames = _define_property._({
    none: "vkuiRadio--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiRadio--sizeY-compact");
var RadioIcon = function(props) {
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
var Radio = function(_param) {
    var children = _param.children, description = _param.description, style = _param.style, className = _param.className, getRootRef = _param.getRootRef, titleAfter = _param.titleAfter, getRef = _param.getRef, labelProps = _param.labelProps, restProps = _object_without_properties._(_param, [
        "children",
        "description",
        "style",
        "className",
        "getRootRef",
        "titleAfter",
        "getRef",
        "labelProps"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(_Tappable.Tappable, _object_spread._({
        Component: "label",
        style: style,
        className: (0, _vkjs.classNames)("vkuiRadio", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className),
        activeEffectDelay: platform === _platform.Platform.IOS ? 100 : _Tappable.ACTIVE_EFFECT_DELAY,
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