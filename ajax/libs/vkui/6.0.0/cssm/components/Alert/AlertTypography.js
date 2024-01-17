import * as React from 'react';
import { usePlatform } from '../../hooks/usePlatform';
import { Caption } from '../Typography/Caption/Caption';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
import styles from './Alert.module.css';
export const AlertHeader = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case 'ios':
            return /*#__PURE__*/ React.createElement(Title, {
                className: styles['Alert__header'],
                weight: "1",
                level: "3",
                ...props
            });
        default:
            return /*#__PURE__*/ React.createElement(Title, {
                className: styles['Alert__header'],
                weight: "2",
                level: "2",
                ...props
            });
    }
};
export const AlertText = (props)=>{
    const platform = usePlatform();
    switch(platform){
        case 'vkcom':
            return /*#__PURE__*/ React.createElement(Footnote, {
                className: styles['Alert__text'],
                ...props
            });
        case 'ios':
            return /*#__PURE__*/ React.createElement(Caption, {
                className: styles['Alert__text'],
                ...props
            });
        default:
            return /*#__PURE__*/ React.createElement(Text, {
                Component: "span",
                className: styles['Alert__text'],
                weight: "3",
                ...props
            });
    }
};

//# sourceMappingURL=AlertTypography.js.map