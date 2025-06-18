import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
import styles from "./CarouselBase.module.css";
const stylesBullets = {
    dark: styles.bulletsDark,
    light: styles.bulletsLight
};
export const Bullets = ({ bullets, slideIndex, count, bulletTestId })=>{
    return /*#__PURE__*/ _jsx("div", {
        "aria-hidden": true,
        className: classNames(styles.bullets, stylesBullets[bullets]),
        children: Array.from({
            length: count
        }).map((_, index)=>/*#__PURE__*/ _jsx("div", {
                className: classNames(styles.bullet, index === slideIndex && styles.bulletActive),
                "data-testid": bulletTestId?.(index, index === slideIndex)
            }, index))
    });
};

//# sourceMappingURL=Bullets.js.map