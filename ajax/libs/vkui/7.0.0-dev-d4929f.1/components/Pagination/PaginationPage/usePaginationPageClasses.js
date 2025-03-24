import { classNames } from "@vkontakte/vkjs";
import { useAdaptivity } from "../../../hooks/useAdaptivity.js";
export const getPaginationPageClassNames = (opts)=>{
    return classNames("PaginationPage__host--AQ-QQ", opts.sizeY == null && "PaginationPage__sizeYNone--zeDfD", opts.sizeY === 'compact' && "PaginationPage__sizeYCompact--89j8D", opts.isCurrent && "PaginationPage__current--w9qJH", opts.disabled && "PaginationPage__disabled--S8p-V");
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