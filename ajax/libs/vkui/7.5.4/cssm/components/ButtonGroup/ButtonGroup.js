import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./ButtonGroup.module.css";
const stylesMode = {
    vertical: styles.modeVertical,
    horizontal: styles.modeHorizontal
};
const stylesGap = {
    space: styles.gapSpace,
    s: styles.gapS,
    m: styles.gapM
};
const stylesAlign = {
    left: styles.alignLeft,
    center: styles.alignCenter,
    right: styles.alignRight
};
/**
 * @see https://vkui.io/components/button-group
 */ export const ButtonGroup = ({ mode = 'horizontal', gap = 'm', stretched = false, align = 'left' /* NOTE: Чтобы блоки по-умолчанию не растягивались на всю ширину контейнера */ , ...restProps })=>{
    return /*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames(styles.host, stylesMode[mode], gap !== 'none' && stylesGap[gap], stretched && styles.stretched, stylesAlign[align]),
        role: "group",
        ...restProps
    });
};

//# sourceMappingURL=ButtonGroup.js.map