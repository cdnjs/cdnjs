import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useEnsuredControl } from '../../hooks/useEnsuredControl';
import { useExternRef } from '../../hooks/useExternRef';
import { FormField } from '../FormField/FormField';
import { Text } from '../Typography/Text/Text';
const sizeYClassNames = {
    none: "vkuiTextarea--sizeY-none",
    ['compact']: "vkuiTextarea--sizeY-compact"
};
/**
 * @see https://vkcom.github.io/VKUI/#/Textarea
 */ export const Textarea = (_param)=>{
    var { defaultValue = '', grow = true, style, onResize, className, getRootRef, getRef, rows = 2, maxHeight, status, onChange: onChangeProp, value: valueProp } = _param, restProps = _object_without_properties(_param, [
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
    const [value, onChange] = useEnsuredControl({
        defaultValue,
        onChange: onChangeProp,
        value: valueProp
    });
    const currentScrollHeight = React.useRef();
    const elementRef = useExternRef(getRef);
    const { sizeY = 'none' } = useAdaptivity();
    // autosize input
    React.useEffect(()=>{
        const el = elementRef.current;
        if (grow && (el === null || el === void 0 ? void 0 : el.offsetParent)) {
            el.style.height = '';
            el.style.height = `${el.scrollHeight}px`;
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
        className: classNames("vkuiTextarea", sizeY !== 'regular' && sizeYClassNames[sizeY], className),
        style: style,
        getRootRef: getRootRef,
        disabled: restProps.disabled,
        status: status
    }, /*#__PURE__*/ React.createElement(Text, _object_spread_props(_object_spread({}, restProps), {
        Component: "textarea",
        normalize: false,
        style: {
            maxHeight
        },
        rows: rows,
        className: "vkuiTextarea__el",
        value: value,
        onChange: onChange,
        getRootRef: elementRef
    })));
};

//# sourceMappingURL=Textarea.js.map