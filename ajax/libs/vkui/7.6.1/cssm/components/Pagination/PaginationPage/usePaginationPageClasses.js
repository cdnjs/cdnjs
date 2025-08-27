/* eslint-disable jsdoc/require-jsdoc */ import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
import styles from "./PaginationPage.module.css";
export const getPaginationPageClassNames = (opts)=>{
    return classNames(styles.host, opts.sizeY == null && styles.sizeYNone, opts.sizeY === 'compact' && styles.sizeYCompact, opts.isCurrent && styles.current, opts.disabled && styles.disabled);
};
export function usePaginationPageClassNames({ isCurrent, disabled }) {
    const { sizeY } = useAdaptivity();
    return getPaginationPageClassNames({
        isCurrent,
        disabled,
        sizeY
    });
}

//# sourceMappingURL=usePaginationPageClasses.js.map