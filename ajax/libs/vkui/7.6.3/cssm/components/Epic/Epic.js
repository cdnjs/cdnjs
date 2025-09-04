'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { getNavId } from "../../lib/getNavId.js";
import { warnOnce } from "../../lib/warnOnce.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import { ScrollSaver } from "./ScrollSaver.js";
import styles from "./Epic.module.css";
const warn = warnOnce('Epic');
/**
 * @see https://vkui.io/components/epic
 */ export const Epic = ({ activeStory, tabbar, children, ...restProps })=>{
    const scroll = React.useRef({}).current;
    const story = React.Children.toArray(children).find((story)=>/*#__PURE__*/ React.isValidElement(story) && getNavId(story.props, warn) === activeStory) ?? null;
    return /*#__PURE__*/ _jsxs(RootComponent, {
        ...restProps,
        baseClassName: classNames(styles.host, tabbar && 'vkuiInternalEpic--hasTabbar'),
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