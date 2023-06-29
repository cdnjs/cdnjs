"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionSheetItem", {
    enumerable: true,
    get: function() {
        return ActionSheetItem;
    }
});
var _interopRequireWildcard = require("@swc/helpers/lib/_interop_require_wildcard.js").default;
var _objectSpread = require("@swc/helpers/lib/_object_spread.js").default;
var _objectSpreadProps = require("@swc/helpers/lib/_object_spread_props.js").default;
var _objectWithoutProperties = require("@swc/helpers/lib/_object_without_properties.js").default;
var _react = /*#__PURE__*/ _interopRequireWildcard(require("react"));
var _icons = require("@vkontakte/icons");
var _vkjs = require("@vkontakte/vkjs");
var _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
var _usePlatform = require("../../hooks/usePlatform");
var _adaptivity = require("../../lib/adaptivity");
var _platform = require("../../lib/platform");
var _actionSheetContext = require("../ActionSheet/ActionSheetContext");
var _tappable = require("../Tappable/Tappable");
var _subhead = require("../Typography/Subhead/Subhead");
var _text = require("../Typography/Text/Text");
var _title = require("../Typography/Title/Title");
/**
 * @see https://vkcom.github.io/VKUI/#/ActionSheetItem
 */ var ActionSheetItem = function(_param) {
    var children = _param.children, autoClose = _param.autoClose, _param_mode = _param.mode, mode = _param_mode === void 0 ? "default" : _param_mode, meta = _param.meta, subtitle = _param.subtitle, before = _param.before, selectable = _param.selectable, value = _param.value, name = _param.name, checked = _param.checked, defaultChecked = _param.defaultChecked, onChange = _param.onChange, onClick = _param.onClick, onImmediateClick = _param.onImmediateClick, _param_multiline = _param.multiline, multiline = _param_multiline === void 0 ? false : _param_multiline, iconCheckedProp = _param.iconChecked, className = _param.className, restProps = _objectWithoutProperties(_param, [
        "children",
        "autoClose",
        "mode",
        "meta",
        "subtitle",
        "before",
        "selectable",
        "value",
        "name",
        "checked",
        "defaultChecked",
        "onChange",
        "onClick",
        "onImmediateClick",
        "multiline",
        "iconChecked",
        "className"
    ]);
    var platform = (0, _usePlatform.usePlatform)();
    var _React_useContext = _react.useContext(_actionSheetContext.ActionSheetContext), _React_useContext_onItemClick = _React_useContext.onItemClick, onItemClick = _React_useContext_onItemClick === void 0 ? function() {
        return _vkjs.noop;
    } : _React_useContext_onItemClick, isDesktop = _React_useContext.isDesktop;
    var sizeY = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)().sizeY;
    var iconChecked = iconCheckedProp || (sizeY === _adaptivity.SizeType.COMPACT ? /*#__PURE__*/ _react.createElement(_icons.Icon20CheckCircleOn, null) : /*#__PURE__*/ _react.createElement(_icons.Icon24CheckCircleOn, null));
    var Component = restProps.href ? "a" : "div";
    if (selectable) {
        Component = "label";
    }
    var isRich = subtitle || meta || selectable;
    var isCentered = !isRich && !before && platform === _platform.Platform.IOS;
    return /*#__PURE__*/ _react.createElement(_tappable.Tappable, _objectSpreadProps(_objectSpread({
        Component: Component
    }, restProps), {
        onClick: selectable ? onClick : onItemClick(onClick, onImmediateClick, Boolean(autoClose)),
        activeMode: platform === _platform.Platform.IOS ? "vkuiActionSheetItem--active" : undefined,
        className: (0, _vkjs.classNames)("vkuiActionSheetItem", platform === _platform.Platform.IOS && "vkuiActionSheetItem--ios", mode === "cancel" && "vkuiActionSheetItem--mode-cancel", mode === "destructive" && "vkuiActionSheetItem--mode-destructive", sizeY === _adaptivity.SizeType.COMPACT && "vkuiActionSheetItem--sizeY-compact", isRich && "vkuiActionSheetItem--rich", isDesktop && "vkuiActionSheetItem--desktop", selectable && "vkuiActionSheetItem--selectable", className)
    }), before && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheetItem__before"
    }, before), /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiActionSheetItem__container", !multiline && "vkuiActionSheetItem--ellipsis")
    }, /*#__PURE__*/ _react.createElement("div", {
        className: (0, _vkjs.classNames)("vkuiActionSheetItem__content", isCentered && "vkuiActionSheetItem--centered")
    }, platform === _platform.Platform.IOS ? /*#__PURE__*/ _react.createElement(_title.Title, {
        className: "vkuiActionSheetItem__children",
        weight: mode === "cancel" ? "2" : "3",
        level: isCentered ? "2" : "3"
    }, children) : /*#__PURE__*/ _react.createElement(_text.Text, {
        className: "vkuiActionSheetItem__children"
    }, children), meta && /*#__PURE__*/ _react.createElement(_text.Text, {
        className: "vkuiActionSheetItem__meta"
    }, meta)), subtitle && /*#__PURE__*/ _react.createElement(_subhead.Subhead, {
        className: "vkuiActionSheetItem__subtitle"
    }, subtitle)), selectable && /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheetItem__after"
    }, /*#__PURE__*/ _react.createElement("input", {
        type: "radio",
        className: "vkuiActionSheetItem__radio",
        name: name,
        value: value,
        onChange: onChange,
        onClick: onItemClick(_vkjs.noop, _vkjs.noop, Boolean(autoClose)),
        defaultChecked: defaultChecked,
        checked: checked,
        disabled: restProps.disabled
    }), /*#__PURE__*/ _react.createElement("div", {
        className: "vkuiActionSheetItem__marker"
    }, iconChecked)));
};

//# sourceMappingURL=ActionSheetItem.js.map