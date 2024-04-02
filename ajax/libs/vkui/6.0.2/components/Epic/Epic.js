import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { getNavId } from '../../lib/getNavId';
import { warnOnce } from '../../lib/warnOnce';
import { RootComponent } from '../RootComponent/RootComponent';
import { ScrollSaver } from './ScrollSaver';
const warn = warnOnce('Epic');
/**
 * @see https://vkcom.github.io/VKUI/#/Epic
 */ export const Epic = (_param)=>{
    var { activeStory, tabbar, children } = _param, restProps = _object_without_properties(_param, [
        "activeStory",
        "tabbar",
        "children"
    ]);
    const scroll = React.useRef({}).current;
    var _React_Children_toArray_find;
    const story = (_React_Children_toArray_find = React.Children.toArray(children).find((story)=>/*#__PURE__*/ React.isValidElement(story) && getNavId(story.props, warn) === activeStory)) !== null && _React_Children_toArray_find !== void 0 ? _React_Children_toArray_find : null;
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiEpic", tabbar && 'vkuiInternalEpic--hasTabbar')
    }), /*#__PURE__*/ React.createElement(ScrollSaver, {
        key: activeStory,
        initialScroll: scroll[activeStory] || 0,
        saveScroll: (value)=>scroll[activeStory] = value
    }, story), tabbar);
};

//# sourceMappingURL=Epic.js.map