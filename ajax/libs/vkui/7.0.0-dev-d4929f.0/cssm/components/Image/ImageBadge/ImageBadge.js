'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import { ImageBase, ImageBaseContext } from "../../ImageBase/ImageBase.js";
import styles from "./ImageBadge.module.css";
export const ImageBadge = ({ className, ...restProps })=>{
    const { size } = React.useContext(ImageBaseContext);
    return /*#__PURE__*/ _jsx(ImageBase.Badge, {
        ...restProps,
        className: classNames(styles.host, size < 96 && styles.shifted, className)
    });
};
ImageBadge.displayName = 'ImageBadge';

//# sourceMappingURL=ImageBadge.js.map