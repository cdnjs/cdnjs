import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
export const getPaginationPageClassNames = (opts)=>{
    return classNames("vkuiPaginationPage", opts.sizeY == null && "vkuiPaginationPage--sizeY-none", opts.sizeY === 'compact' && "vkuiPaginationPage--sizeY-compact", opts.isCurrent && "vkuiPaginationPage--current", opts.disabled && "vkuiPaginationPage--disabled");
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