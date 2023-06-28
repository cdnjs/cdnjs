"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "MiniInfoCell", {
    enumerable: true,
    get: function() {
        return MiniInfoCell;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _tappable = require("../Tappable/Tappable");
var _paragraph = require("../Typography/Paragraph/Paragraph");
var MiniInfoCell = function(_param) {
    var before = _param.before, after = _param.after, children = _param.children, _param_mode = _param.mode, mode = _param_mode === void 0 ? "base" : _param_mode, _param_textWrap = _param.textWrap, textWrap = _param_textWrap === void 0 ? "nowrap" : _param_textWrap, _param_expandable = _param.expandable, expandable = _param_expandable === void 0 ? false : _param_expandable, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "before",
        "after",
        "children",
        "mode",
        "textWrap",
        "expandable",
        "className"
    ]);
    var cellClasses = (0, _vkjs.classNames)("vkuiMiniInfoCell", {
        nowrap: "vkuiMiniInfoCell--textWrap-nowrap",
        full: "vkuiMiniInfoCell--textWrap-full",
        short: "vkuiMiniInfoCell--textWrap-short"
    }[textWrap], mode !== "base" && ({
        add: "vkuiMiniInfoCell--mode-add",
        accent: "vkuiMiniInfoCell--mode-accent",
        more: "vkuiMiniInfoCell--mode-more"
    })[mode], className);
    var cellContent = /*#__PURE__*/ _react.createElement(_react.Fragment, null, /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiMiniInfoCell__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiMiniInfoCell__middle"
    }, /*#__PURE__*/ _react.createElement(_paragraph.Paragraph, {
        className: "vkuiMiniInfoCell__content",
        weight: mode === "more" ? "2" : undefined
    }, children), expandable && /*#__PURE__*/ _react.createElement(_icons.Icon16Chevron, null)), (0, _vkjs.hasReactNode)(after) && /*#__PURE__*/ _react.createElement("span", {
        className: "vkuiMiniInfoCell__after"
    }, after));
    return restProps.onClick ? /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({
        Component: "div",
        role: "button"
    }, restProps), {
        className: cellClasses
    }), cellContent) : /*#__PURE__*/ _react.createElement("div", _objectSpreadProps(_objectSpread({}, restProps), {
        className: cellClasses
    }), cellContent);
};

//# sourceMappingURL=MiniInfoCell.js.map