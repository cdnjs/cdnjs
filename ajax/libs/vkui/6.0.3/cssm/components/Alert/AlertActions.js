import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { AlertAction } from './AlertAction';
import styles from './Alert.module.css';
const alignStyles = {
    left: styles['Alert__actions--align-left'],
    center: styles['Alert__actions--align-center'],
    right: styles['Alert__actions--align-right']
};
const directionStyles = {
    vertical: styles['Alert__actions--direction-vertical'],
    horizontal: styles['Alert__actions--direction-horizontal']
};
export const AlertActions = ({ actions = [], renderAction = (props)=>/*#__PURE__*/ React.createElement(AlertAction, props), onItemClick, actionsAlign, actionsLayout })=>{
    const platform = usePlatform();
    const direction = platform === 'vkcom' ? 'horizontal' : actionsLayout;
    return /*#__PURE__*/ React.createElement("div", {
        className: classNames(styles['Alert__actions'], actionsAlign && alignStyles[actionsAlign], direction && directionStyles[direction])
    }, actions.map((action, i)=>{
        // Убираем
        const { title: children, action: _, autoCloseDisabled, ...restProps } = action;
        return /*#__PURE__*/ React.createElement(React.Fragment, {
            key: i
        }, renderAction({
            children,
            onClick: ()=>onItemClick(action),
            ...restProps
        }));
    }));
};

//# sourceMappingURL=AlertActions.js.map