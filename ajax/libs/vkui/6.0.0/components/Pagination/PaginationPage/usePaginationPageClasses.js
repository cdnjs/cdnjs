import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
export function usePaginationPageClassNames({ isCurrent, disabled }) {
    const { sizeY = 'none' } = useAdaptivity();
    return classNames("vkuiPaginationPage", sizeY === 'none' && "vkuiPaginationPage--sizeY-none", sizeY === 'compact' && "vkuiPaginationPage--sizeY-compact", isCurrent && "vkuiPaginationPage--current", disabled && "vkuiPaginationPage--disabled");
}

//# sourceMappingURL=usePaginationPageClasses.js.map