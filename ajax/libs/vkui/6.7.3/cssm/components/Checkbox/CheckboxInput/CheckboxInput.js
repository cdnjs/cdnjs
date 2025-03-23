import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon20CheckBoxIndetermanate, Icon20CheckBoxOff, Icon20CheckBoxOn, Icon24CheckBoxOff, Icon24CheckBoxOn } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { useAdaptivityConditionalRender } from '../../../hooks/useAdaptivityConditionalRender';
import { useExternRef } from '../../../hooks/useExternRef';
import { usePlatform } from '../../../hooks/usePlatform';
import { warnOnce } from '../../../lib/warnOnce';
import { RootComponent } from '../../RootComponent/RootComponent';
import { VisuallyHidden } from '../../VisuallyHidden/VisuallyHidden';
import styles from './CheckboxInput.module.css';
function setIndeterminate(el, indeterminate) {
    el.indeterminate = indeterminate;
}
const warn = warnOnce('Checkbox');
export function CheckboxInput({ className, style, getRootRef, getRef, indeterminate, defaultIndeterminate, onChange, ...restProps }) {
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
        baseClassName: styles['CheckboxInput'],
        className: className,
        style: style,
        getRootRef: getRootRef,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                ...restProps,
                Component: "input",
                type: "checkbox",
                onChange: handleChange,
                className: styles['CheckboxInput__input'],
                getRootRef: inputRef
            }),
            platform === 'vkcom' ? /*#__PURE__*/ _jsx(Icon20CheckBoxOn, {
                className: styles['CheckboxInput__icon--on']
            }) : /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    adaptiveSizeY.compact && /*#__PURE__*/ _jsx(Icon20CheckBoxOn, {
                        className: classNames(styles['CheckboxInput__icon--on'], adaptiveSizeY.compact.className)
                    }),
                    adaptiveSizeY.regular && /*#__PURE__*/ _jsx(Icon24CheckBoxOn, {
                        className: classNames(styles['CheckboxInput__icon--on'], adaptiveSizeY.regular.className)
                    })
                ]
            }),
            platform === 'vkcom' ? /*#__PURE__*/ _jsx(Icon20CheckBoxOff, {
                className: styles['CheckboxInput__icon--off']
            }) : /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    adaptiveSizeY.compact && /*#__PURE__*/ _jsx(Icon20CheckBoxOff, {
                        className: classNames(styles['CheckboxInput__icon--off'], adaptiveSizeY.compact.className)
                    }),
                    adaptiveSizeY.regular && /*#__PURE__*/ _jsx(Icon24CheckBoxOff, {
                        className: classNames(styles['CheckboxInput__icon--off'], adaptiveSizeY.regular.className)
                    })
                ]
            }),
            platform === 'vkcom' ? /*#__PURE__*/ _jsx(Icon20CheckBoxIndetermanate, {
                width: 20,
                height: 20,
                className: styles['CheckboxInput__icon--indeterminate']
            }) : /*#__PURE__*/ _jsxs(React.Fragment, {
                children: [
                    adaptiveSizeY.compact && /*#__PURE__*/ _jsx(Icon20CheckBoxIndetermanate, {
                        className: classNames(styles['CheckboxInput__icon--indeterminate'], adaptiveSizeY.compact.className),
                        width: 20,
                        height: 20
                    }),
                    adaptiveSizeY.regular && /*#__PURE__*/ _jsx(Icon20CheckBoxIndetermanate, {
                        className: classNames(styles['CheckboxInput__icon--indeterminate'], adaptiveSizeY.regular.className),
                        width: 24,
                        height: 24
                    })
                ]
            })
        ]
    });
}

//# sourceMappingURL=CheckboxInput.js.map