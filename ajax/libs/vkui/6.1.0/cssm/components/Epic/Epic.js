import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { RootComponent } from '../RootComponent/RootComponent';
import { ScrollSaver } from './ScrollSaver';
import styles from './Epic.module.css';
const warn = warnOnce('Epic');
/**
 * @see https://vkcom.github.io/VKUI/#/Epic
 */ export const Epic = ({ activeStory, tabbar, children, ...restProps })=>{
    const scroll = React.useRef({}).current;
    const story = React.Children.toArray(children).find((story)=>/*#__PURE__*/ React.isValidElement(story) && getNavId(story.props, warn) === activeStory) ?? null;
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles['Epic'], tabbar && 'vkuiInternalEpic--hasTabbar'),
        children: [
            /*#__PURE__*/ _jsx(ScrollSaver, {
                initialScroll: scroll[activeStory] || 0,
                saveScroll: (value)=>scroll[activeStory] = value,
                children: story
            }, activeStory),
            tabbar
        ]
    });
};

//# sourceMappingURL=Epic.js.map