import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { ScrollSaver } from './ScrollSaver';
import styles from './Epic.module.css';
const warn = warnOnce('Epic');
/**
 * @see https://vkcom.github.io/VKUI/#/Epic
 */ export const Epic = (props)=>{
    const scroll = React.useRef({}).current;
    const { activeStory, tabbar, children, className, ...restProps } = props;
    const story = React.Children.toArray(children).find((story)=>/*#__PURE__*/ React.isValidElement(story) && getNavId(story.props, warn) === activeStory) ?? null;
    return /*#__PURE__*/ React.createElement("div", {
        ...restProps,
        className: classNames(styles['Epic'], tabbar && 'vkuiInternalEpic--hasTabbar', className)
    }, /*#__PURE__*/ React.createElement(ScrollSaver, {
        key: activeStory,
        initialScroll: scroll[activeStory] || 0,
        saveScroll: (value)=>scroll[activeStory] = value
    }, story), tabbar);
};

//# sourceMappingURL=Epic.js.map