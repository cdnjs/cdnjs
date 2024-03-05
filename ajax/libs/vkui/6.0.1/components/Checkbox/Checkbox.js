import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
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
const sizeYClassNames = {
    none: "vkuiCheckbox--sizeY-none",
    ['compact']: "vkuiCheckbox--sizeY-compact"
};
const warn = warnOnce('Checkbox');
/**
 * @see https://vkcom.github.io/VKUI/#/Checkbox
 */ export const Checkbox = (_param)=>{
    var { children, className, style, getRootRef, getRef, description, indeterminate, defaultIndeterminate, hoverMode, activeMode, hasHover, hasActive, focusVisibleMode, onChange, titleAfter } = _param, restProps = _object_without_properties(_param, [
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
    return /*#__PURE__*/ React.createElement(Tappable, {
        Component: "label",
        className: classNames("vkuiCheckbox", sizeY !== 'regular' && sizeYClassNames[sizeY], !(hasReactNode(children) || hasReactNode(description)) && "vkuiCheckbox--simple", className),
        style: style,
        disabled: restProps.disabled,
        activeEffectDelay: platform === 'ios' ? 100 : DEFAULT_ACTIVE_EFFECT_DELAY,
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
    }, platform === 'vkcom' ? /*#__PURE__*/ React.createElement(Icon20CheckBoxOn, null) : /*#__PURE__*/ React.createElement(React.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ React.createElement(Icon20CheckBoxOn, {
        className: adaptiveSizeY.compact.className
    }), adaptiveSizeY.regular && /*#__PURE__*/ React.createElement(Icon24CheckBoxOn, {
        className: adaptiveSizeY.regular.className
    }))), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCheckbox__icon", "vkuiCheckbox__icon--off")
    }, platform === 'vkcom' ? /*#__PURE__*/ React.createElement(Icon20CheckBoxOff, null) : /*#__PURE__*/ React.createElement(React.Fragment, null, adaptiveSizeY.compact && /*#__PURE__*/ React.createElement(Icon20CheckBoxOff, {
        className: adaptiveSizeY.compact.className
    }), adaptiveSizeY.regular && /*#__PURE__*/ React.createElement(Icon24CheckBoxOff, {
        className: adaptiveSizeY.regular.className
    }))), /*#__PURE__*/ React.createElement("div", {
        className: classNames("vkuiCheckbox__icon", "vkuiCheckbox__icon--indeterminate")
    }, platform === 'vkcom' ? /*#__PURE__*/ React.createElement(Icon20CheckBoxIndetermanate, {
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