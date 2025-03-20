import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { Icon20CheckBoxIndetermanate, Icon20CheckBoxOff, Icon20CheckBoxOn, Icon24CheckBoxOff, Icon24CheckBoxOn } from '@vkontakte/icons';
import { classNames, hasReactNode } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../hooks/useAdaptivity';
import { useAdaptivityConditionalRender } from '../../hooks/useAdaptivityConditionalRender';
import { useExternRef } from '../../hooks/useExternRef';
import { usePlatform } from '../../hooks/usePlatform';
import { warnOnce } from '../../lib/warnOnce';
import { DEFAULT_ACTIVE_EFFECT_DELAY } from '../Clickable/useState';
import { Tappable } from '../Tappable/Tappable';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Text } from '../Typography/Text/Text';
import { VisuallyHidden } from '../VisuallyHidden/VisuallyHidden';
import styles from './Checkbox.module.css';
const sizeYClassNames = {
    none: styles['Checkbox--sizeY-none'],
    ['compact']: styles['Checkbox--sizeY-compact']
};
const warn = warnOnce('Checkbox');
/**
 * @see https://vkcom.github.io/VKUI/#/Checkbox
 */ export const Checkbox = ({ children, className, style, getRootRef, getRef, description, indeterminate, defaultIndeterminate, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, onChange, titleAfter, ...restProps })=>{
    const inputRef = useExternRef(getRef);
    const platform = usePlatform();
    const { sizeY = 'none' } = useAdaptivity();
    const { sizeY: adaptiveSizeY } = useAdaptivityConditionalRender();
    React.useEffect(()=>{
        const indeterminateValue = indeterminate === undefined ? defaultIndeterminate : indeterminate;
        if (inputRef.current) {
            inputRef.current.indeterminate = Boolean(indeterminateValue);
        }
    }, [
        defaultIndeterminate,
        indeterminate,
        inputRef
    ]);
    const handleChange = React.useCallback((event)=>{
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
    return /*#__PURE__*/ _jsxs(Tappable, {
        Component: "label",
        className: classNames(styles['Checkbox'], sizeY !== 'regular' && sizeYClassNames[sizeY], !(hasReactNode(children) || hasReactNode(description)) && styles['Checkbox--simple'], className),
        style: style,
        disabled: restProps.disabled,
        activeEffectDelay: platform === 'ios' ? 100 : DEFAULT_ACTIVE_EFFECT_DELAY,
        getRootRef: getRootRef,
        hoverMode: hoverMode,
        activeMode: activeMode,
        hasHover: hasHover,
        hasActive: hasActive,
        focusVisibleMode: focusVisibleMode,
        children: [
            /*#__PURE__*/ _jsx(VisuallyHidden, {
                ...restProps,
                Component: "input",
                type: "checkbox",
                onChange: handleChange,
                className: styles['Checkbox__input'],
                getRootRef: inputRef
            }),
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles['Checkbox__icon'], styles['Checkbox__icon--on']),
                children: platform === 'vkcom' ? /*#__PURE__*/ _jsx(Icon20CheckBoxOn, {}) : /*#__PURE__*/ _jsxs(React.Fragment, {
                    children: [
                        adaptiveSizeY.compact && /*#__PURE__*/ _jsx(Icon20CheckBoxOn, {
                            className: adaptiveSizeY.compact.className
                        }),
                        adaptiveSizeY.regular && /*#__PURE__*/ _jsx(Icon24CheckBoxOn, {
                            className: adaptiveSizeY.regular.className
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles['Checkbox__icon'], styles['Checkbox__icon--off']),
                children: platform === 'vkcom' ? /*#__PURE__*/ _jsx(Icon20CheckBoxOff, {}) : /*#__PURE__*/ _jsxs(React.Fragment, {
                    children: [
                        adaptiveSizeY.compact && /*#__PURE__*/ _jsx(Icon20CheckBoxOff, {
                            className: adaptiveSizeY.compact.className
                        }),
                        adaptiveSizeY.regular && /*#__PURE__*/ _jsx(Icon24CheckBoxOff, {
                            className: adaptiveSizeY.regular.className
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsx("div", {
                className: classNames(styles['Checkbox__icon'], styles['Checkbox__icon--indeterminate']),
                children: platform === 'vkcom' ? /*#__PURE__*/ _jsx(Icon20CheckBoxIndetermanate, {
                    width: 20,
                    height: 20
                }) : /*#__PURE__*/ _jsxs(React.Fragment, {
                    children: [
                        adaptiveSizeY.compact && /*#__PURE__*/ _jsx(Icon20CheckBoxIndetermanate, {
                            className: adaptiveSizeY.compact.className,
                            width: 20,
                            height: 20
                        }),
                        adaptiveSizeY.regular && /*#__PURE__*/ _jsx(Icon20CheckBoxIndetermanate, {
                            className: adaptiveSizeY.regular.className,
                            width: 24,
                            height: 24
                        })
                    ]
                })
            }),
            /*#__PURE__*/ _jsxs("div", {
                className: styles['Checkbox__content'],
                children: [
                    /*#__PURE__*/ _jsxs("div", {
                        className: styles['Checkbox__title'],
                        children: [
                            /*#__PURE__*/ _jsx(Text, {
                                className: styles['Checkbox__titleBefore'],
                                children: children
                            }),
                            /*#__PURE__*/ _jsx("div", {
                                className: styles['Checkbox__titleAfter'],
                                children: titleAfter
                            })
                        ]
                    }),
                    hasReactNode(description) && /*#__PURE__*/ _jsx(Footnote, {
                        className: styles['Checkbox__description'],
                        children: description
                    })
                ]
            })
        ]
    });
};

//# sourceMappingURL=Checkbox.js.map