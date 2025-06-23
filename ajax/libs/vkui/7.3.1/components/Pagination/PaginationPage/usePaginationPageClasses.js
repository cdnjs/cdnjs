/* eslint-disable jsdoc/require-jsdoc */ import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
export const getPaginationPageClassNames = (opts)=>{
    return classNames("vkuiPaginationPage__host", opts.sizeY == null && "vkuiPaginationPage__sizeYNone", opts.sizeY === 'compact' && "vkuiPaginationPage__sizeYCompact", opts.isCurrent && "vkuiPaginationPage__current", opts.disabled && "vkuiPaginationPage__disabled");
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