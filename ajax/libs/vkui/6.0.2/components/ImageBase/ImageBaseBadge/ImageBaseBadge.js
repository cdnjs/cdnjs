import { _ as _object_spread } from "@swc/helpers/_/_object_spread";
import { _ as _object_spread_props } from "@swc/helpers/_/_object_spread_props";
import { _ as _object_without_properties } from "@swc/helpers/_/_object_without_properties";
import * as React from 'react';
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../../RootComponent/RootComponent';
import { ImageBaseContext } from '../context';
import { validateBadgeIcon } from '../validators';
const backgroundStyles = {
    stroke: "vkuiImageBaseBadge--background-stroke",
    shadow: "vkuiImageBaseBadge--background-shadow"
};
/**
 * Бейдж в правом нижнем углу компонента.
 *
 * > Не используйте при `size < 24`
 */ export const ImageBaseBadge = (_param)=>{
    var { background = 'shadow' } = _param, restProps = _object_without_properties(_param, [
        "background"
    ]);
    if (process.env.NODE_ENV === 'development') {
        if (restProps.children) {
            // eslint-disable-next-line react-hooks/rules-of-hooks
            const { size } = React.useContext(ImageBaseContext);
            validateBadgeIcon(size, {
                name: 'children',
                value: restProps.children
            });
        }
    }
    return /*#__PURE__*/ React.createElement(RootComponent, _object_spread_props(_object_spread({}, restProps), {
        baseClassName: classNames("vkuiImageBaseBadge", backgroundStyles[background])
    }));
};

//# sourceMappingURL=ImageBaseBadge.js.map