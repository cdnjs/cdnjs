"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "PopoutWrapper", {
    enumerable: true,
    get: function() {
        return PopoutWrapper;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _slicedToArray = require("@swc/helpers/lib/_sliced_to_array.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useGlobalEventListener = require("../../hooks/useGlobalEventListener");
var _usePlatform = require("../../hooks/usePlatform");
var _useTimeout = require("../../hooks/useTimeout");
var _dom = require("../../lib/dom");
var _platform = require("../../lib/platform");
var PopoutWrapper = function(_param) {
    var _param_alignY = _param.alignY, alignY = _param_alignY === void 0 ? "center" : _param_alignY, _param_alignX = _param.alignX, alignX = _param_alignX === void 0 ? "center" : _param_alignX, _param_closing = _param.closing, closing = _param_closing === void 0 ? false : _param_closing, _param_hasMask = _param.hasMask, hasMask = _param_hasMask === void 0 ? true : _param_hasMask, _param_fixed = _param.fixed, fixed = _param_fixed === void 0 ? true : _param_fixed, children = _param.children, onClick = _param.onClick, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "alignY",
        "alignX",
        "closing",
        "hasMask",
        "fixed",
        "children",
        "onClick",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _React_useState = _slicedToArray(_react.useState(!hasMask), 2), opened = _React_useState[0], setOpened = _React_useState[1];
    var elRef = _react.useRef(null);
    var onFadeInEnd = function(e) {
        if (!e || e.animationName === "vkui-animation-full-fade-in") {
            setOpened(true);
        }
    };
    var animationFinishFallback = (0, _useTimeout.useTimeout)(onFadeInEnd, platform === _platform.Platform.IOS ? 300 : 200);
    _react.useEffect(function() {
        !opened && animationFinishFallback.set();
    }, [
        animationFinishFallback,
        opened
    ]);
    var window = (0, _dom.useDOM)().window;
    (0, _useGlobalEventListener.useGlobalEventListener)(window, "touchmove", function(e) {
        return e.preventDefault();
    }, {
        passive: false
    });
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiPopoutWrapper", {
            center: "vkuiPopoutWrapper--alignY-center",
            top: "vkuiPopoutWrapper--alignY-top",
            bottom: "vkuiPopoutWrapper--alignY-bottom"
        }[alignY], {
            center: "vkuiPopoutWrapper--alignX-center",
            left: "vkuiPopoutWrapper--alignX-left",
            right: "vkuiPopoutWrapper--alignX-right"
        }[alignX], closing && "vkuiPopoutWrapper--closing", opened && "vkuiPopoutWrapper--opened", fixed && "vkuiPopoutWrapper--fixed", hasMask && "vkuiPopoutWrapper--masked", className),
        onAnimationEnd: opened ? undefined : onFadeInEnd,
        ref: elRef
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPopoutWrapper__container"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPopoutWrapper__overlay",
        onClick: onClick
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiPopoutWrapper__content"
    }, children)));
};

//# sourceMappingURL=PopoutWrapper.js.map