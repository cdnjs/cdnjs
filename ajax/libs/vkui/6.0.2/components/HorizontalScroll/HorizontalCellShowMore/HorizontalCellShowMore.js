import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { Icon28ChevronRightCircle } from '@vkontakte/icons';
import { classNames } from '@vkontakte/vkjs';
import { Tappable } from '../../Tappable/Tappable';
import { Subhead } from '../../Typography/Subhead/Subhead';
const sizeClassNames = {
    s: "vkuiHorizontalCellShowMore--size-s",
    m: "vkuiHorizontalCellShowMore--size-m",
    l: "vkuiHorizontalCellShowMore--size-l"
};
export const HorizontalCellShowMore = (_param)=>{
    var { className, style, getRef, getRootRef, compensateLastCellIndent, height, size = 's', children = size === 's' ? 'Все' : 'Показать все' } = _param, restProps = _object_without_properties(_param, [
        "className",
        "style",
        "getRef",
        "getRootRef",
        "compensateLastCellIndent",
        "height",
        "size",
        "children"
    ]);
    return /*#__PURE__*/ React.createElement("div", {
        style: style,
        className: classNames("vkuiHorizontalCellShowMore", compensateLastCellIndent && "vkuiHorizontalCellShowMore--compensate-last-cell-indent", sizeClassNames[size], className),
        ref: getRootRef
    }, /*#__PURE__*/ React.createElement(Tappable, _object_spread({
        style: size === 's' ? undefined : {
            height
        },
        className: "vkuiHorizontalCellShowMore__body",
        getRootRef: getRef,
        activeMode: "opacity",
        hoverMode: "opacity"
    }, restProps), /*#__PURE__*/ React.createElement(Icon28ChevronRightCircle, {
        className: "vkuiHorizontalCellShowMore__icon",
        fill: "currentColor"
    }), /*#__PURE__*/ React.createElement(Subhead, {
        className: "vkuiHorizontalCellShowMore__text",
        weight: "2"
    }, children)));
};

//# sourceMappingURL=HorizontalCellShowMore.js.map