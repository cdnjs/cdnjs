import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon24Cancel, Icon24Chevron, Icon24Dismiss, Icon24DismissDark } from '@vkontakte/icons';
import { classNames, hasReactNode, noop } from '@vkontakte/vkjs';
import { usePlatform } from '../../hooks/usePlatform';
import { IconButton } from '../IconButton/IconButton';
import { RootComponent } from '../RootComponent/RootComponent';
import { Tappable } from '../Tappable/Tappable';
import { Headline } from '../Typography/Headline/Headline';
import { Subhead } from '../Typography/Subhead/Subhead';
import { Text } from '../Typography/Text/Text';
import { Title } from '../Typography/Title/Title';
/**
 * @see https://vkcom.github.io/VKUI/#/Banner
 */ export const Banner = (_param)=>{
    var { mode = 'tint', imageTheme = 'dark', size = 's', before, asideMode, header, subheader, text, children, background, actions, onDismiss, dismissLabel = 'Скрыть' } = _param, restProps = _object_without_properties(_param, [
        "mode",
        "imageTheme",
        "size",
        "before",
        "asideMode",
        "header",
        "subheader",
        "text",
        "children",
        "background",
        "actions",
        "onDismiss",
        "dismissLabel"
    ]);
    const platform = usePlatform();
    const HeaderTypography = size === 'm' ? Title : Headline;
    const SubheaderTypography = size === 'm' ? Text : Subhead;
    const IconDismissIOS = mode === 'image' ? Icon24DismissDark : Icon24Dismiss;
    const content = /*#__PURE__*/ React.createElement(React.Fragment, null, mode === 'image' && background && /*#__PURE__*/ React.createElement("div", {
        "aria-hidden": true,
        className: "vkuiBanner__bg"
    }, background), before && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__before"
    }, before), /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__content"
    }, hasReactNode(header) && /*#__PURE__*/ React.createElement(HeaderTypography, {
        Component: "div",
        weight: "2",
        level: size === 'm' ? '2' : '1'
    }, header), hasReactNode(subheader) && /*#__PURE__*/ React.createElement(SubheaderTypography, {
        Component: "div",
        className: "vkuiBanner__subheader"
    }, subheader), hasReactNode(text) && /*#__PURE__*/ React.createElement(Text, {
        Component: "div",
        className: "vkuiBanner__text"
    }, text), hasReactNode(actions) && React.Children.count(actions) > 0 && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__actions"
    }, actions)));
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({
        Component: "section"
    }, restProps), {
        baseClassName: classNames("vkuiBanner", platform === 'ios' && "vkuiBanner--ios", mode === 'image' && "vkuiBanner--mode-image", size === 'm' && "vkuiBanner--size-m", mode === 'image' && imageTheme === 'dark' && "vkuiBanner--inverted")
    }), asideMode === 'expand' ? /*#__PURE__*/ React.createElement(Tappable, {
        className: "vkuiBanner__in",
        activeMode: platform === 'ios' ? 'opacity' : 'background',
        onClick: noop
    }, content, /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ React.createElement(Icon24Chevron, {
        className: "vkuiBanner__expand"
    }))) : /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__in"
    }, content, asideMode === 'dismiss' && /*#__PURE__*/ React.createElement("div", {
        className: "vkuiBanner__aside"
    }, /*#__PURE__*/ React.createElement(IconButton, {
        label: dismissLabel,
        className: "vkuiBanner__dismiss",
        onClick: onDismiss,
        hoverMode: "opacity",
        hasActive: false
    }, platform === 'ios' ? /*#__PURE__*/ React.createElement(IconDismissIOS, null) : /*#__PURE__*/ React.createElement(Icon24Cancel, null)))));
};

//# sourceMappingURL=Banner.js.map