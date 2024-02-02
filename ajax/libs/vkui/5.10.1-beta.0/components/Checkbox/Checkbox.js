import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from "react";
import { Icon20CheckBoxIndetermanate, Icon20CheckBoxOff, Icon20CheckBoxOn, Icon24CheckBoxOff, Icon24CheckBoxOn } from "@vkontakte/icons";
import { classNames, hasReactNode } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useAdaptivityConditionalRender } from "../../hooks/useAdaptivityConditionalRender";
import { useExternRef } from "../../hooks/useExternRef";
import { usePlatform } from "../../hooks/usePlatform";
import { SizeType } from "../../lib/adaptivity";
import { Platform } from "../../lib/platform";
import { warnOnce } from "../../lib/warnOnce";
import { ACTIVE_EFFECT_DELAY, Tappable } from "../Tappable/Tappable";
import { Footnote } from "../Typography/Footnote/Footnote";
import { Text } from "../Typography/Text/Text";
import { VisuallyHidden } from "../VisuallyHidden/VisuallyHidden";
var sizeYClassNames = _define_property({
    none: "vkuiCheckbox--sizeY-none"
}, SizeType.COMPACT, "vkuiCheckbox--sizeY-compact");
var warn = warnOnce("Checkbox");
/**
 * @see https://vkcom.github.io/VKUI/#/Checkbox
 */ export var Checkbox = function(_param) {
    var children = _param.children, className = _param.className, style = _param.style, getRootRef = _param.getRootRef, getRef = _param.getRef, description = _param.description, indeterminate = _param.indeterminate, defaultIndeterminate = _param.defaultIndeterminate, hoverMode = _param.hoverMode, activeMode = _param.activeMode, hasHover = _param.hasHover, hasActive = _param.hasActive, focusVisibleMode = _param.focusVisibleMode, onChange = _param.onChange, titleAfter = _param.titleAfter, restProps = _object_without_properties(_param, [
        "children",
        "className",
        "style",
        "getRootRef",
        "getRef",
        "description",
        "indeterminate",
        "defaultIndeterminate",
        "hoverMode",
        "activeMode",
        "hasHover",
        "hasActive",
        "focusVisibleMode",
        "onChange",
        "titleAfter"
    ]);
    var inputRef = useExternRef(getRef);
    var platform = usePlatform();
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    var _useAdaptivityConditionalRender = useAdaptivityConditionalRender(), adaptiveSizeY = _useAdaptivityConditionalRender.sizeY;
    React.useEffect(function() {
        var indeterminateValue = indeterminate === undefined ? defaultIndeterminate : indeterminate;
        if (inputRef.current) {
            inputRef.current.indeterminate = Boolean(indeterminateValue);
        }
    }, [
        defaultIndeterminate,
        indeterminate,
        inputRef
    ]);
    var handleChange = React.useCallback(function(event) {
        if (defaultIndeterminate !== undefined && indeterminate === undefined && restProps.checked === undefined && inputRef.current) {
            inputRef.current.indeterminate = false;
        }
        if (indeterminate !== undefined && inputRef.current) {
            inputRef.current.indeterminate = indeterminate;
        }
        onChange && onChange(event);
    }, [
        defaultIndeterminate,
        indeterminate,
        restProps.checked,
        onChange,
        inputRef
    ]);
    if (process.env.NODE_ENV === "development") {
        if (defaultIndeterminate && restProps.defaultChecked) {
            warn("defaultIndeterminate и defaultChecked не могут быть true одновременно", "error");
        }
        if (indeterminate && restProps.checked) {
            warn("indeterminate и checked не могут быть true одновременно", "error");
        }
        if (restProps.defaultChecked && restProps.checked) {
            warn("defaultChecked и checked не могут быть true одновременно", "error");
        }
    }
    return /*#__PURE__*/ React.createElement(Tappable, {
        Component: "label",
        className: classNames("vkuiCheckbox", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], !(hasReactNode(children) || hasReactNode(description)) && "vkuiCheckbox--simple", className),
        style: style,
        disabled: restProps.disabled,
        activeEffectDelay: platform === Platform.IOS ? 100 : ACTIVE_EFFECT_DELAY,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode
    }, /*#__PURE__*/ React.createElement(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
        Component: "input",
        type: "checkbox",
        onChange: handleChange,
        className: "vkuiCheckbox__input",
        getRootRef: inputRef
    })), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCheckbox__icon", "vkuiCheckbox__icon--on")
    }, platform === Platform.VKCOM ? /*#__PURE__*/ React.createElement(Icon20CheckBoxOn, null) : /*#__PURE__*/ React.createElement(React.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ React.createElement(Icon20CheckBoxOn, {
        className: adaptiveSizeY.compact.className
    }), adaptiveSizeY.regular && /*#__PURE__*/ React.createElement(Icon24CheckBoxOn, {
        className: adaptiveSizeY.regular.className
    }))), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCheckbox__icon", "vkuiCheckbox__icon--off")
    }, platform === Platform.VKCOM ? /*#__PURE__*/ React.createElement(Icon20CheckBoxOff, null) : /*#__PURE__*/ React.createElement(React.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ React.createElement(Icon20CheckBoxOff, {
        className: adaptiveSizeY.compact.className
    }), adaptiveSizeY.regular && /*#__PURE__*/ React.createElement(Icon24CheckBoxOff, {
        className: adaptiveSizeY.regular.className
    }))), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCheckbox__icon", "vkuiCheckbox__icon--indeterminate")
    }, platform === Platform.VKCOM ? /*#__PURE__*/ React.createElement(Icon20CheckBoxIndetermanate, {
        width: 20,
        height: 20
    }) : /*#__PURE__*/ React.createElement(React.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ React.createElement(Icon20CheckBoxIndetermanate, {
        className: adaptiveSizeY.compact.className,
        width: 20,
        height: 20
    }), adaptiveSizeY.regular && /*#__PURE__*/ React.createElement(Icon20CheckBoxIndetermanate, {
        className: adaptiveSizeY.regular.className,
        width: 24,
        height: 24
    }))), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCheckbox__content"
    }, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCheckbox__title"
    }, /*#__PURE__*/ React.createElement(Text, {
        className: "vkuiCheckbox__titleBefore"
    }, children), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiCheckbox__titleAfter"
    }, titleAfter)), hasReactNode(description) && /*#__PURE__*/ React.createElement(Footnote, {
        className: "vkuiCheckbox__description"
    }, description)));
};

//# sourceMappingURL=Checkbox.js.map