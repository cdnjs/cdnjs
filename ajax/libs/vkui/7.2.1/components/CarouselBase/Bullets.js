import { jsx as _jsx } from "react/jsx-runtime";
import * as React from "react";
import { classNames } from "@vkontakte/vkjs";
const stylesBullets = {
    dark: "vkuiCarouselBase__bulletsDark",
    light: "vkuiCarouselBase__bulletsLight"
};
export const Bullets = ({ bullets, slideIndex, count, bulletTestId })=>{
    return /*#__PURE__*/ _jsx("div", {
        "aria-hidden": true,
        className: classNames("vkuiCarouselBase__bullets", stylesBullets[bullets]),
        children: Array.from({
            length: count
        }).map((_, index)=>/*#__PURE__*/ _jsx("div", {
                className: classNames("vkuiCarouselBase__bullet", index === slideIndex && "vkuiCarouselBase__bulletActive"),
                "data-testid": bulletTestId === null || bulletTestId === void 0 ? void 0 : bulletTestId(index, index === slideIndex)
            }, index))
    });
};

//# sourceMappingURL=Bullets.js.map