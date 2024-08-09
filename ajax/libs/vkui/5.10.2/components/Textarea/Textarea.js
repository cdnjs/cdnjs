import { _ as _define_property } from "@swc/helpers/_/_define_property";
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { _ as _sliced_to_array } from "@swc/helpers/_/_sliced_to_array";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity";
import { useEnsuredControl } from "../../hooks/useEnsuredControl";
import { useExternRef } from "../../hooks/useExternRef";
import { SizeType } from "../../lib/adaptivity";
import { FormField } from "../FormField/FormField";
import { Text } from "../Typography/Text/Text";
var sizeYClassNames = _define_property({
    none: "vkuiTextarea--sizeY-none"
}, SizeType.COMPACT, "vkuiTextarea--sizeY-compact");
/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */ export var Textarea = function(_param) {
    var _param_defaultValue = _param.defaultValue, defaultValue = _param_defaultValue === void 0 ? "" : _param_defaultValue, _param_grow = _param.grow, grow = _param_grow === void 0 ? true : _param_grow, style = _param.style, onResize = _param.onResize, className = _param.className, getRootRef = _param.getRootRef, getRef = _param.getRef, _param_rows = _param.rows, rows = _param_rows === void 0 ? 2 : _param_rows, maxHeight = _param.maxHeight, status = _param.status, onChangeProp = _param.onChange, valueProp = _param.value, restProps = _object_without_properties(_param, [
        "defaultValue",
        "grow",
        "style",
        "onResize",
        "className",
        "getRootRef",
        "getRef",
        "rows",
        "maxHeight",
        "status",
        "onChange",
        "value"
    ]);
    var _useEnsuredControl = _sliced_to_array(useEnsuredControl({
        defaultValue: defaultValue,
        onChange: onChangeProp,
        value: valueProp
    }), 2), value = _useEnsuredControl[0], onChange = _useEnsuredControl[1];
    var currentScrollHeight = React.useRef();
    var elementRef = useExternRef(getRef);
    var _useAdaptivity = useAdaptivity(), _useAdaptivity_sizeY = _useAdaptivity.sizeY, sizeY = _useAdaptivity_sizeY === void 0 ? "none" : _useAdaptivity_sizeY;
    // autosize input
    React.useEffect(function() {
        var el = elementRef.current;
        if (grow && (el === null || el === void 0 ? void 0 : el.offsetParent)) {
            el.style.height = "";
            el.style.height = "".concat(el.scrollHeight, "px");
            if (el.scrollHeight !== currentScrollHeight.current && onResize) {
                onResize(el);
                currentScrollHeight.current = el.scrollHeight;
            }
        }
    }, [
        grow,
        value,
        sizeY,
        elementRef,
        onResize
    ]);
    return /*#__PURE__*/ React.createElement(FormField, {
        className: classNames("vkuiTextarea", sizeY !== SizeType.REGULAR && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status
    }, /*#__PURE__*/ React.createElement(Text, _object_spread_props(_object_spread({}, restProps), {
        Component: "textarea",
        normalize: false,
        style: {
            maxHeight: maxHeight
        },
        rows: rows,
        className: "vkuiTextarea__el",
        value: value,
        onChange: onChange,
        getRootRef: elementRef
    })));
};

//# sourceMappingURL=Textarea.js.map