'use client';
import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../hooks/useAdaptivity.js";
import { RootComponent } from "../RootComponent/RootComponent.js";
import styles from "./CardGrid.module.css";
const sizeXClassNames = {
    none: styles.sizeXNone,
    compact: styles.sizeXCompact
};
const stylesSize = {
    s: 'vkuiInternalCardGrid--size-s',
    m: 'vkuiInternalCardGrid--size-m',
    l: 'vkuiInternalCardGrid--size-l'
};
/**
 * @see https://vkui.io/components/card-grid
 */ export const CardGrid = ({ size = 's', padding = false, Component = 'ul', ...restProps })=>{
    const { sizeX = 'none' } = useAdaptivity();
    return /*#__PURE__*/ _jsx(RootComponent, {
        ...restProps,
        Component: Component,
        baseClassName: classNames(styles.host, 'vkuiInternalCardGrid', padding && styles.padding, stylesSize[size], sizeX !== 'regular' && sizeXClassNames[sizeX])
    });
};

//# sourceMappingURL=CardGrid.js.map