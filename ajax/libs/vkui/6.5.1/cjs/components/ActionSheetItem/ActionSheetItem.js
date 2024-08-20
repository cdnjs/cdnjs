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
const _interop_require_wildcard = require("@swc/helpers/_/_interop_require_wildcard");
const _object_spread = require("@swc/helpers/_/_object_spread");
const _object_spread_props = require("@swc/helpers/_/_object_spread_props");
const _object_without_properties = require("@swc/helpers/_/_object_without_properties");
const _jsxruntime = require("react/jsx-runtime");
const _react = /*#__PURE__*/ _interop_require_wildcard._(require("react"));
const _vkjs = require("@vkontakte/vkjs");
const _useAdaptivityWithJSMediaQueries = require("../../hooks/useAdaptivityWithJSMediaQueries");
const _usePlatform = require("../../hooks/usePlatform");
const _accessibility = require("../../lib/accessibility");
const _ActionSheetContext = require("../ActionSheet/ActionSheetContext");
const _Tappable = require("../Tappable/Tappable");
const _Subhead = require("../Typography/Subhead/Subhead");
const _Text = require("../Typography/Text/Text");
const _Title = require("../Typography/Title/Title");
const _helpers = require("./helpers");
const _Radio = require("./subcomponents/Radio/Radio");
const ActionSheetItem = (_param)=>{
    var { children, autoCloseDisabled = false, mode = 'default', meta, subtitle, before, after, selectable, value, name, checked, defaultChecked, onChange, onClick, onImmediateClick, multiline = false, iconChecked, className, isCancelItem } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "autoCloseDisabled",
        "mode",
        "meta",
        "subtitle",
        "before",
        "after",
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
        "className",
        "isCancelItem"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const { onItemClick = ()=>_vkjs.noop, mode: actionSheetMode, onClose: onActionSheetClose } = _react.useContext(_ActionSheetContext.ActionSheetContext);
    const { sizeY } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const Component = selectable ? 'label' : undefined;
    const isRich = subtitle || meta || selectable;
    const isCentered = !isRich && !before && platform === 'ios';
    const onItemClickHandler = _react.useCallback((e)=>{
        var _onItemClick;
        (_onItemClick = onItemClick({
            action: onClick,
            immediateAction: onImmediateClick,
            autoClose: !autoCloseDisabled,
            isCancelItem: Boolean(isCancelItem)
        })) === null || _onItemClick === void 0 ? void 0 : _onItemClick(e);
    }, [
        autoCloseDisabled,
        isCancelItem,
        onClick,
        onImmediateClick,
        onItemClick
    ]);
    const onKeyDown = _react.useCallback((event)=>{
        if ((0, _accessibility.pressedKey)(event) === _accessibility.Keys.ENTER) {
            onActionSheetClose === null || onActionSheetClose === void 0 ? void 0 : onActionSheetClose();
        }
    }, [
        onActionSheetClose
    ]);
    const onItemClickImpl = _react.useCallback((event)=>{
        if (selectable) {
            if ((0, _helpers.isRealClickEvent)(event)) {
                onItemClickHandler(event);
            }
        } else {
            onItemClickHandler(event);
        }
    }, [
        onItemClickHandler,
        selectable
    ]);
    return /*#__PURE__*/ (0, _jsxruntime.jsxs)(_Tappable.Tappable, _object_spread_props._(_object_spread._({}, Component && {
        Component
    }, restProps), {
        onClick: onItemClickImpl,
        activeMode: platform === 'ios' ? "vkuiActionSheetItem--active" : undefined,
        className: (0, _vkjs.classNames)("vkuiActionSheetItem", platform === 'ios' && "vkuiActionSheetItem--ios", mode === 'cancel' && "vkuiActionSheetItem--mode-cancel", mode === 'destructive' && "vkuiActionSheetItem--mode-destructive", sizeY === 'compact' && "vkuiActionSheetItem--sizeY-compact", isRich && "vkuiActionSheetItem--rich", actionSheetMode === 'menu' && "vkuiActionSheetItem--menu", selectable && "vkuiActionSheetItem--selectable", className),
        onKeyDown: onKeyDown,
        children: [
            before && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                className: "vkuiActionSheetItem__before",
                children: before
            }),
            /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: (0, _vkjs.classNames)("vkuiActionSheetItem__container", !multiline && "vkuiActionSheetItem--ellipsis"),
                children: [
                    /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                        className: (0, _vkjs.classNames)("vkuiActionSheetItem__content", isCentered && "vkuiActionSheetItem--centered"),
                        children: [
                            platform === 'ios' ? /*#__PURE__*/ (0, _jsxruntime.jsx)(_Title.Title, {
                                className: "vkuiActionSheetItem__children",
                                weight: mode === 'cancel' ? '2' : '3',
                                level: isCentered ? '2' : '3',
                                children: children
                            }) : /*#__PURE__*/ (0, _jsxruntime.jsx)(_Text.Text, {
                                className: "vkuiActionSheetItem__children",
                                children: children
                            }),
                            meta && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Text.Text, {
                                className: "vkuiActionSheetItem__meta",
                                children: meta
                            })
                        ]
                    }),
                    subtitle && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Subhead.Subhead, {
                        className: "vkuiActionSheetItem__subtitle",
                        children: subtitle
                    })
                ]
            }),
            (selectable || after) && /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                className: "vkuiActionSheetItem__after",
                children: [
                    after,
                    selectable && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Radio.Radio, {
                        name: name,
                        value: value,
                        onChange: onChange,
                        defaultChecked: defaultChecked,
                        checked: checked,
                        disabled: restProps.disabled,
                        children: iconChecked
                    })
                ]
            })
        ]
    }));
};

//# sourceMappingURL=ActionSheetItem.js.map