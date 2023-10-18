import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { Icon24Cancel } from "@vkontakte/icons";
import { classNames, noop } from "@vkontakte/vkjs";
import { useGlobalEventListener } from "../../hooks/useGlobalEventListener";
import { usePlatform } from "../../hooks/usePlatform";
import { useDOM } from "../../lib/dom";
import { Platform } from "../../lib/platform";
import { getTitleFromChildren } from "../../lib/utils";
import { IconButton } from "../IconButton/IconButton";
import { RootComponent } from "../RootComponent/RootComponent";
import { Tappable } from "../Tappable/Tappable";
/**
 * @see https://vkcom.github.io/VKUI/#/RemovableIos
 */ var RemovableIos = function(param) {
    var onRemove = param.onRemove, removePlaceholder = param.removePlaceholder, removePlaceholderString = param.removePlaceholderString, childrenProp = param.children;
    var window = useDOM().window;
    var removeButtonRef = React.useRef(null);
    var disabledRef = React.useRef(true);
    var _React_useState = _sliced_to_array(React.useState(0), 2), removeOffset = _React_useState[0], updateRemoveOffset = _React_useState[1];
    useGlobalEventListener(window, "click", function() {
        if (removeOffset > 0) {
            updateRemoveOffset(0);
        }
    }, {
        capture: true
    });
    var onRemoveTransitionEnd = function() {
        if (removeOffset > 0) {
            var _removeButtonRef_current;
            removeButtonRef === null || removeButtonRef === void 0 ? void 0 : (_removeButtonRef_current = removeButtonRef.current) === null || _removeButtonRef_current === void 0 ? void 0 : _removeButtonRef_current.focus();
        } else {
            disabledRef.current = true;
        }
    };
    var onRemoveActivateClick = function(e) {
        e.stopPropagation();
        if (!removeButtonRef.current) {
            return;
        }
        var offsetWidth = removeButtonRef.current.offsetWidth;
        disabledRef.current = false;
        updateRemoveOffset(offsetWidth);
    };
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiRemovable__content", "vkuiInternalRemovable__content"),
        style: {
            transform: "translateX(-".concat(removeOffset !== null && removeOffset !== void 0 ? removeOffset : 0, "px)")
        },
        onTransitionEnd: onRemoveTransitionEnd
    }, /*#__PURE__*/ React.createElement(IconButton, {
        hasActive: false,
        hasHover: false,
        "aria-label": removePlaceholderString,
        className: classNames("vkuiRemovable__action", "vkuiRemovable__toggle", "vkuiInternalRemovable__action"),
        onClick: onRemoveActivateClick,
        disabled: removeOffset > 0
    }, /*#__PURE__*/ React.createElement("i", {
        className: "vkuiRemovable__toggle-in",
        role: "presentation"
    })), typeof childrenProp === "function" ? childrenProp({
        isRemoving: removeOffset > 0
    }) : childrenProp, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiRemovable__offset",
        "aria-hidden": true
    }), /*#__PURE__*/ React.createElement(Tappable, {
        Component: "button",
        hasActive: false,
        hasHover: false,
        disabled: disabledRef.current,
        getRootRef: removeButtonRef,
        className: "vkuiRemovable__remove",
        onClick: onRemove
    }, /*#__PURE__*/ React.createElement("span", {
        className: "vkuiRemovable__remove-in"
    }, removePlaceholder)));
};
/**
 * @see https://vkcom.github.io/VKUI/#/Removable
 */ export var Removable = function(_param) {
    var children = _param.children, _param_onRemove = _param.onRemove, onRemove = _param_onRemove === void 0 ? noop : _param_onRemove, _param_removePlaceholder = _param.removePlaceholder, removePlaceholder = _param_removePlaceholder === void 0 ? "Удалить" : _param_removePlaceholder, _param_align = _param.align, align = _param_align === void 0 ? "center" : _param_align, _param_indent = _param.indent, indent = _param_indent === void 0 ? false : _param_indent, restProps = _object_without_properties(_param, [
        "children",
        "onRemove",
        "removePlaceholder",
        "align",
        "indent"
    ]);
    var platform = usePlatform();
    var onRemoveClick = function(e) {
        e.preventDefault();
        onRemove(e);
    };
    var removePlaceholderString = getTitleFromChildren(removePlaceholder);
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames(platform === Platform.IOS && "vkuiRemovable--ios", align === "start" && "vkuiRemovable--align-start", indent && "vkuiRemovable--indent")
    }), platform !== Platform.IOS && /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiRemovable__content", "vkuiInternalRemovable__content")
    }, children, /*#__PURE__*/ React.createElement(IconButton, {
        activeMode: "opacity",
        hoverMode: "opacity",
        className: classNames("vkuiRemovable__action", "vkuiInternalRemovable__action"),
        onClick: onRemoveClick,
        "aria-label": removePlaceholderString
    }, /*#__PURE__*/ React.createElement(Icon24Cancel, {
        role: "presentation"
    })), /*#__PURE__*/ React.createElement("span", {
        className: "vkuiRemovable__offset",
        "aria-hidden": true
    })), platform === Platform.IOS && /*#__PURE__*/ React.createElement(RemovableIos, {
        onRemove: onRemoveClick,
        removePlaceholder: removePlaceholder,
        removePlaceholderString: removePlaceholderString
    }, children));
};

//# sourceMappingURL=Removable.js.map