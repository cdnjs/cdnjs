"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "SubnavigationBar", {
    enumerable: true,
    get: function() {
        return SubnavigationBar;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _horizontalScroll = require("../HorizontalScroll/HorizontalScroll");
var defaultScrollToLeft = function(x) {
    return x - 240;
};
var defaultScrollToRight = function(x) {
    return x + 240;
};
var SubnavigationBar = function(_param) {
    var _param_mode = _param.mode, mode = _param_mode === void 0 ? "overflow" : _param_mode, children = _param.children, _param_showArrows = _param.showArrows, showArrows = _param_showArrows === void 0 ? true : _param_showArrows, _param_getScrollToLeft = _param.getScrollToLeft, getScrollToLeft = _param_getScrollToLeft === void 0 ? defaultScrollToLeft : _param_getScrollToLeft, _param_getScrollToRight = _param.getScrollToRight, getScrollToRight = _param_getScrollToRight === void 0 ? defaultScrollToRight : _param_getScrollToRight, scrollAnimationDuration = _param.scrollAnimationDuration, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "mode",
        "children",
        "showArrows",
        "getScrollToLeft",
        "getScrollToRight",
        "scrollAnimationDuration",
        "className"
    ]);
    var ScrollWrapper;
    var scrollWrapperProps = {};
    if (mode === "fixed") {
        ScrollWrapper = "div";
    } else {
        ScrollWrapper = _horizontalScroll.HorizontalScroll;
        scrollWrapperProps = {
            showArrows: showArrows,
            getScrollToLeft: getScrollToLeft,
            getScrollToRight: getScrollToRight,
            scrollAnimationDuration: scrollAnimationDuration
        };
    }
    return /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiInternalSubnavigationBar", mode === "fixed" && (0, _vkjs.classNames)("vkuiInternalSubnavigationBar--mode-fixed"), className)
    }), /*#__PURE__*/ _react.createElement(ScrollWrapper, _objectSpread({
        className: "vkuiSubnavigationBar__in"
    }, scrollWrapperProps), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiSubnavigationBar__scrollIn"
    }, children)));
};

//# sourceMappingURL=SubnavigationBar.js.map