"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "RichCell", {
    enumerable: true,
    get: function() {
        return RichCell;
    }
});
var _defineProperty = require("@swc/helpers/lib/_define_property.js").default;
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivity = require("../../hooks/useAdaptivity");
var _adaptivity = require("../../lib/adaptivity");
var _tappable = require("../Tappable/Tappable");
var _subhead = require("../Typography/Subhead/Subhead");
var _richCellIcon = require("./RichCellIcon/RichCellIcon");
var sizeYClassNames = _defineProperty({
    none: "vkuiRichCell--sizeY-none"
}, _adaptivity.SizeType.COMPACT, "vkuiRichCell--sizeY-compact");
var RichCell = function(_param) {
    var subhead = _param.subhead, children = _param.children, text = _param.text, caption = _param.caption, before = _param.before, after = _param.after, afterCaption = _param.afterCaption, bottom = _param.bottom, actions = _param.actions, multiline = _param.multiline, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "subhead",
        "children",
        "text",
        "caption",
        "before",
        "after",
        "afterCaption",
        "bottom",
        "actions",
        "multiline",
        "className"
    ]);
    var _useAdaptivity1 = (0, _useAdaptivity.useAdaptivity)(), _useAdaptivity_sizeY = _useAdaptivity1.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    return /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({}, restProps), {
        className: (0, _vkjs.classNames)("vkuiRichCell", !multiline && "vkuiRichCell--text-ellipsis", sizeY !== _adaptivity.SizeType.REGULAR && sizeYClassNames[sizeY], className)
    }), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__in"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__content"
    }, /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__content-before"
    }, subhead && /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
        Component: "div",
        className: "vkuiRichCell__subhead"
    }, subhead), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__children"
    }, children), text && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__text"
    }, text), caption && /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
        Component: "div",
        className: "vkuiRichCell__caption"
    }, caption)), (after || afterCaption) && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__content-after"
    }, after && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__after-children"
    }, after), afterCaption && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__after-caption"
    }, afterCaption))), bottom && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__bottom"
    }, bottom), actions && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiRichCell__actions"
    }, actions)));
};
RichCell.Icon = _richCellIcon.RichCellIcon;

//# sourceMappingURL=RichCell.js.map