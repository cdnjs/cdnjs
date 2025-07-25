'use client';
import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { Icon20CheckBoxIndetermanate, Icon20CheckBoxOff, Icon20CheckBoxOn, Icon24CheckBoxOff, Icon24CheckBoxOn } from "@vkontakte/icons";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivityConditionalRender } from "../../../hooks/useAdaptivityConditionalRender/index.js";
import { useExternRef } from "../../../hooks/useExternRef.js";
import { usePlatform } from "../../../hooks/usePlatform.js";
import { warnOnce } from "../../../lib/warnOnce.js";
import { RootComponent } from "../../RootComponent/RootComponent.js";
import { VisuallyHidden } from "../../VisuallyHidden/VisuallyHidden.js";
function setIndeterminate(el, indeterminate) {
    el.indeterminate = indeterminate;
}
const warn = warnOnce('Checkbox');
export function CheckboxInput(_param) {
    var { className, style, getRootRef, getRef, indeterminate, defaultIndeterminate, onChange, IconOnCompact = Icon20CheckBoxOn, IconOnRegular = Icon24CheckBoxOn, IconOffCompact = Icon20CheckBoxOff, IconOffRegular = Icon24CheckBoxOff, IconIndeterminate = Icon20CheckBoxIndetermanate } = _param, restProps = _object_without_properties(_param, [
        "className",
        "style",
        "getRootRef",
        "getRef",
        "indeterminate",
        "defaultIndeterminate",
        "onChange",
        "IconOnCompact",
        "IconOnRegular",
        "IconOffCompact",
        "IconOffRegular",
        "IconIndeterminate"
    ]);
    const inputRef = useExternRef(getRef);
    const platform = usePlatform();
    const { sizeY: adaptiveSizeY } = useAdaptivityConditionalRender();
    React.useEffect(()=>{
        const indeterminateValue = indeterminate === undefined ? defaultIndeterminate : indeterminate;
        if (inputRef.current) {
            setIndeterminate(inputRef.current, Boolean(indeterminateValue));
        }
    }, [
        defaultIndeterminate,
        indeterminate,
        inputRef
    ]);
    const handleChange = React.useCallback((event)=>{
        if (defaultIndeterminate !== undefined && indeterminate === undefined && restProps.checked === undefined && inputRef.current) {
            setIndeterminate(inputRef.current, false);
        }
        if (indeterminate !== undefined && inputRef.current) {
            setIndeterminate(inputRef.current, Boolean(indeterminate));
        }
        onChange && onChange(event);
    }, [
        defaultIndeterminate,
        indeterminate,
        restProps.checked,
        onChange,
        inputRef
    ]);
    if (process.env.NODE_ENV === 'development') {
        if (defaultIndeterminate && restProps.defaultChecked) {
            warn('defaultIndeterminate и defaultChecked не могут быть true одновременно', 'error');
        }
        if (indeterminate && restProps.checked) {
            warn('indeterminate и checked не могут быть true одновременно', 'error');
        }
        if (restProps.defaultChecked && restProps.checked) {
            warn('defaultChecked и checked не могут быть true одновременно', 'error');
        }
    }
    return /*#__PURE__*/ _jsxs(RootComponent, {
        baseClassName: "vkuiCheckboxInput__host",
        className: className,
        style: style,
        getRootRef: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, _object_spread_props(_object_spread({}, restProps), {
                Component: "input",
                type: "checkbox",
                onChange: handleChange,
                className: "vkuiCheckboxInput__input",
                getRootRef: inputRef
            })),
            platform === 'vkcom' ? /*#__PURE__*/ _jsx(IconOnCompact, {
                className: "vkuiCheckboxInput__iconOn"
            }) : /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    adaptiveSizeY.compact && /*#__PURE__*/ _jsx(IconOnCompact, {
                        className: classNames("vkuiCheckboxInput__iconOn", adaptiveSizeY.compact.className)
                    }),
                    adaptiveSizeY.regular && /*#__PURE__*/ _jsx(IconOnRegular, {
                        className: classNames("vkuiCheckboxInput__iconOn", adaptiveSizeY.regular.className)
                    })
                ]
            }),
            platform === 'vkcom' ? /*#__PURE__*/ _jsx(IconOffCompact, {
                className: "vkuiCheckboxInput__iconOff"
            }) : /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    adaptiveSizeY.compact && /*#__PURE__*/ _jsx(IconOffCompact, {
                        className: classNames("vkuiCheckboxInput__iconOff", adaptiveSizeY.compact.className)
                    }),
                    adaptiveSizeY.regular && /*#__PURE__*/ _jsx(IconOffRegular, {
                        className: classNames("vkuiCheckboxInput__iconOff", adaptiveSizeY.regular.className)
                    })
                ]
            }),
            platform === 'vkcom' ? /*#__PURE__*/ _jsx(IconIndeterminate, {
                width: 20,
                height: 20,
                className: "vkuiCheckboxInput__iconIndeterminate"
            }) : /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    adaptiveSizeY.compact && /*#__PURE__*/ _jsx(IconIndeterminate, {
                        className: classNames("vkuiCheckboxInput__iconIndeterminate", adaptiveSizeY.compact.className),
                        width: 20,
                        height: 20
                    }),
                    adaptiveSizeY.regular && /*#__PURE__*/ _jsx(IconIndeterminate, {
                        className: classNames("vkuiCheckboxInput__iconIndeterminate", adaptiveSizeY.regular.className),
                        width: 24,
                        height: 24
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=CheckboxInput.js.map