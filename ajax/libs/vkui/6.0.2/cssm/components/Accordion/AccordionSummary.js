import * as React from 'react';
import { Icon24ChevronDown, Icon24ChevronUp } from '@vkontakte/icons';
import { callMultiple } from '../../lib/callMultiple';
import { SimpleCell } from '../SimpleCell/SimpleCell';
import { AccordionContext } from './AccordionContext';
import styles from './Accordion.module.css';
export const AccordionSummary = ({ after, before, ExpandIcon = Icon24ChevronDown, CollapseIcon = Icon24ChevronUp, iconPosition = 'after', onClick, children, ...restProps })=>{
    const { expanded, labelId, contentId, onChange } = React.useContext(AccordionContext);
    const Icon = expanded ? CollapseIcon : ExpandIcon;
    const icon = // Обертка нужна для правильной работы с отступами в SimpleCell
    /*#__PURE__*/ React.createElement("span", {
        className: "vkuiIcon"
    }, /*#__PURE__*/ React.createElement(Icon, {
        className: styles['AccordionSummary__icon']
    }));
    const toggle = ()=>onChange(!expanded);
    return /*#__PURE__*/ React.createElement(SimpleCell, {
        id: labelId,
        "aria-expanded": expanded,
        "aria-controls": contentId,
        onClick: callMultiple(toggle, onClick),
        before: /*#__PURE__*/ React.createElement(React.Fragment, null, iconPosition === 'before' && icon, before),
        after: /*#__PURE__*/ React.createElement(React.Fragment, null, after, iconPosition === 'after' && icon),
        ...restProps
    }, children);
};

//# sourceMappingURL=AccordionSummary.js.map