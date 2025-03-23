"use strict";
Object.defineProperty(exports, "__esModule", {
    value: true
});
Object.defineProperty(exports, "ActionSheet", {
    enumerable: true,
    get: function() {
        return ActionSheet;
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
const _useObjectMemo = require("../../hooks/useObjectMemo");
const _usePlatform = require("../../hooks/usePlatform");
const _animation = require("../../lib/animation");
const _ScrollContext = require("../AppRoot/ScrollContext");
const _PopoutWrapper = require("../PopoutWrapper/PopoutWrapper");
const _Footnote = require("../Typography/Footnote/Footnote");
const _ActionSheetContext = require("./ActionSheetContext");
const _ActionSheetDefaultIosCloseItem = require("./ActionSheetDefaultIosCloseItem");
const _ActionSheetDropdownMenu = require("./ActionSheetDropdownMenu");
const _ActionSheetDropdownSheet = require("./ActionSheetDropdownSheet");
const ActionSheet = (_param)=>{
    var { children, className, header, text, style, iosCloseItem, popupOffsetDistance, placement, mode: modeProp, onClose } = _param, restProps = _object_without_properties._(_param, [
        "children",
        "className",
        "header",
        "text",
        "style",
        "iosCloseItem",
        "popupOffsetDistance",
        "placement",
        "mode",
        "onClose"
    ]);
    const platform = (0, _usePlatform.usePlatform)();
    const [closingBy, setClosingBy] = _react.useState(undefined);
    const onCloseWithOther = ()=>setClosingBy('other');
    const actionCallbackRef = _react.useRef(_vkjs.noop);
    const [animationState, animationHandlers] = (0, _animation.useCSSKeyframesAnimationController)(closingBy !== undefined ? 'exit' : 'enter', {
        onExited () {
            onClose({
                closedBy: closingBy || 'other'
            });
            actionCallbackRef.current();
            actionCallbackRef.current = _vkjs.noop;
        }
    });
    const { isDesktop } = (0, _useAdaptivityWithJSMediaQueries.useAdaptivityWithJSMediaQueries)();
    const mode = modeProp !== null && modeProp !== void 0 ? modeProp : isDesktop ? 'menu' : 'sheet';
    (0, _ScrollContext.useScrollLock)(mode === 'sheet');
    const onItemClick = _react.useCallback(({ action, immediateAction, autoClose, isCancelItem })=>(event)=>{
            event.persist();
            immediateAction && immediateAction(event);
            if (autoClose) {
                if (action) {
                    actionCallbackRef.current = ()=>action(event);
                }
                setClosingBy(isCancelItem ? 'cancel-item' : 'action-item');
            } else {
                action && action(event);
            }
        }, []);
    const contextValue = (0, _useObjectMemo.useObjectMemo)({
        onItemClick,
        mode,
        onClose: onCloseWithOther
    });
    const DropdownComponent = mode === 'menu' ? _ActionSheetDropdownMenu.ActionSheetDropdownMenu : _ActionSheetDropdownSheet.ActionSheetDropdownSheet;
    const dropdownProps = mode === 'menu' ? Object.assign(restProps, {
        popupOffsetDistance,
        placement
    }) : restProps;
    const actionSheet = /*#__PURE__*/ (0, _jsxruntime.jsx)(_ActionSheetContext.ActionSheetContext.Provider, {
        value: contextValue,
        children: /*#__PURE__*/ (0, _jsxruntime.jsxs)(DropdownComponent, _object_spread_props._(_object_spread._({
            closing: Boolean(closingBy),
            role: "dialog",
            "aria-modal": "true",
            autoFocus: animationState === 'entered'
        }, dropdownProps, animationHandlers), {
            onClose: onCloseWithOther,
            className: mode === 'menu' ? className : undefined,
            style: mode === 'menu' ? style : undefined,
            children: [
                /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                    className: "vkuiActionSheet__content-wrapper",
                    children: [
                        (header || text) && /*#__PURE__*/ (0, _jsxruntime.jsxs)("div", {
                            className: "vkuiActionSheet__header",
                            children: [
                                header && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                                    weight: "2",
                                    className: "vkuiActionSheet__title",
                                    children: header
                                }),
                                text && /*#__PURE__*/ (0, _jsxruntime.jsx)(_Footnote.Footnote, {
                                    className: "vkuiActionSheet__text",
                                    children: text
                                })
                            ]
                        }),
                        children
                    ]
                }),
                platform === 'ios' && mode === 'sheet' && /*#__PURE__*/ (0, _jsxruntime.jsx)("div", {
                    className: "vkuiActionSheet__close-item-wrapper--ios",
                    children: iosCloseItem !== null && iosCloseItem !== void 0 ? iosCloseItem : /*#__PURE__*/ (0, _jsxruntime.jsx)(_ActionSheetDefaultIosCloseItem.ActionSheetDefaultIosCloseItem, {})
                })
            ]
        }))
    });
    if (mode === 'menu') {
        return actionSheet;
    }
    return /*#__PURE__*/ (0, _jsxruntime.jsx)(_PopoutWrapper.PopoutWrapper, {
        closing: Boolean(closingBy),
        alignY: "bottom",
        className: className,
        style: style,
        onClick: onCloseWithOther,
        fixed: true,
        children: actionSheet
    });
};

//# sourceMappingURL=ActionSheet.js.map