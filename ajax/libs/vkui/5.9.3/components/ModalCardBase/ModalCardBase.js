import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon24Dismiss } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivityWithJSMediaQueries } from "../../hooks/useAdaptivityWithJSMediaQueries";
import { useKeyboard } from "../../hooks/useKeyboard";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { AdaptivityContext } from "../AdaptivityProvider/AdaptivityContext";
import { ModalDismissButton } from "../ModalDismissButton/ModalDismissButton";
import { PanelHeaderButton } from "../PanelHeaderButton/PanelHeaderButton";
import { RootComponent } from "../RootComponent/RootComponent";
import { Subhead } from "../Typography/Subhead/Subhead";
import { Title } from "../Typography/Title/Title";
/**
 * @see https://vkcom.github.io/VKUI/#/ModalCardBase
 */ export var ModalCardBase = function(_param) {
    var icon = _param.icon, header = _param.header, subheader = _param.subheader, children = _param.children, actions = _param.actions, onClose = _param.onClose, _param_dismissLabel = _param.dismissLabel, dismissLabel = _param_dismissLabel === void 0 ? "Скрыть" : _param_dismissLabel, style = _param.style, sizeProp = _param.size, restProps = _object_without_properties(_param, [
        "icon",
        "header",
        "subheader",
        "children",
        "actions",
        "onClose",
        "dismissLabel",
        "style",
        "size"
    ]);
    var platform = usePlatform();
    var isDesktop = useAdaptivityWithJSMediaQueries().isDesktop;
    var isSoftwareKeyboardOpened = useKeyboard().isOpened;
    var canShowCloseButtonIOS = platform === Platform.IOS && !isDesktop;
    var size = isDesktop ? sizeProp : undefined;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiInternalModalCardBase", platform === Platform.IOS && "vkuiModalCardBase--ios", isDesktop && "vkuiModalCardBase--desktop"),
        style: _object_spread_props(_object_spread({}, style), {
            maxWidth: size
        })
    }), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiModalCardBase__container", isSoftwareKeyboardOpened && "vkuiModalCardBase__container--softwareKeyboardOpened")
    }, hasReactNode(icon) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalCardBase__icon"
    }, icon), hasReactNode(header) && /*#__PURE__*/ React.createElement(Title, {
        level: "2",
        weight: "2",
        className: classNames("vkuiModalCardBase__header", "vkuiInternalModalCardBase__header")
    }, header), hasReactNode(subheader) && /*#__PURE__*/ React.createElement(AdaptivityContext.Provider, {
        value: {
            sizeY: SizeType.REGULAR
        }
    }, /*#__PURE__*/ React.createElement(Subhead, {
        className: classNames("vkuiModalCardBase__subheader", "vkuiInternalModalCardBase__subheader")
    }, subheader)), children, hasReactNode(actions) && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiModalCardBase__actions"
    }, actions), isDesktop && /*#__PURE__*/ React.createElement(ModalDismissButton, {
        onClick: onClose
    }), canShowCloseButtonIOS && /*#__PURE__*/ React.createElement(PanelHeaderButton, {
        "aria-label": dismissLabel,
        className: "vkuiModalCardBase__dismiss",
        onClick: onClose
    }, /*#__PURE__*/ React.createElement(Icon24Dismiss, null))));
};

//# sourceMappingURL=ModalCardBase.js.map