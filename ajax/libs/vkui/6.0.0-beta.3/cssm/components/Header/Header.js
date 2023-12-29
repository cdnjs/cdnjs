import * as React from 'react';
import { classNames, hasReactNode, isPrimitiveReactNode } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { RootComponent } from '../RootComponent/RootComponent';
import { Footnote } from '../Typography/Footnote/Footnote';
import { Headline } from '../Typography/Headline/Headline';
import { Paragraph } from '../Typography/Paragraph/Paragraph';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Title } from '../Typography/Title/Title';
import styles from './Header.module.css';
const HeaderContent = ({ mode, size, ...restProps })=>{
    const isLarge = size === 'large';
    const platform = usePlatform();
    if (platform === 'ios') {
        switch(mode){
            case 'primary':
                return isLarge ? /*#__PURE__*/ React.createElement(Title, {
                    level: "2",
                    weight: "2",
                    ...restProps
                }) : /*#__PURE__*/ React.createElement(Title, {
                    weight: "1",
                    level: "3",
                    ...restProps
                });
            case 'secondary':
                return /*#__PURE__*/ React.createElement(Footnote, {
                    weight: "1",
                    caps: true,
                    ...restProps
                });
            case 'tertiary':
                return /*#__PURE__*/ React.createElement(Title, {
                    weight: "1",
                    level: "3",
                    ...restProps
                });
        }
    }
    switch(mode){
        case 'primary':
            return isLarge ? /*#__PURE__*/ React.createElement(Title, {
                level: "2",
                weight: "2",
                ...restProps
            }) : /*#__PURE__*/ React.createElement(Headline, {
                weight: "2",
                ...restProps
            });
        case 'secondary':
            return /*#__PURE__*/ React.createElement(Footnote, {
                weight: "1",
                caps: true,
                ...restProps
            });
        case 'tertiary':
            return /*#__PURE__*/ React.createElement(Headline, {
                weight: "2",
                ...restProps
            });
    }
    return null;
};
const stylesMode = {
    primary: styles['Header--mode-primary'],
    secondary: styles['Header--mode-secondary'],
    tertiary: styles['Header--mode-tertiary']
};
/**
 * @see https://vkcom.github.io/VKUI/#/Header
 */ export const Header = ({ mode = 'primary', size = 'regular', Component = 'h2', children, subtitle, subtitleComponent = 'span', indicator, aside, multiline, ...restProps })=>{
    return /*#__PURE__*/ React.createElement(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['Header'], stylesMode[mode], size === 'large' && styles['Header--large'], isPrimitiveReactNode(indicator) && styles['Header--pi'], hasReactNode(subtitle) && styles['Header--with-subtitle'])
    }, /*#__PURE__*/ React.createElement("div", {
        className: styles['Header__main']
    }, /*#__PURE__*/ React.createElement(HeaderContent, {
        className: styles['Header__content'],
        Component: Component,
        mode: mode,
        size: size
    }, /*#__PURE__*/ React.createElement("span", {
        className: classNames(styles['Header__content-in'], multiline && styles['Header__content--multiline'])
    }, children), hasReactNode(indicator) && /*#__PURE__*/ React.createElement(Footnote, {
        className: styles['Header__indicator'],
        weight: "2"
    }, indicator)), hasReactNode(subtitle) && /*#__PURE__*/ React.createElement(Subhead, {
        className: classNames(styles['Header__subtitle'], multiline && styles['Header__content--multiline']),
        Component: subtitleComponent
    }, subtitle)), hasReactNode(aside) && /*#__PURE__*/ React.createElement(Paragraph, {
        className: styles['Header__aside'],
        Component: "span"
    }, aside));
};

//# sourceMappingURL=Header.js.map