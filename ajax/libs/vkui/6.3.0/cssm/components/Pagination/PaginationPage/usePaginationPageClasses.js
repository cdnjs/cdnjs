import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import styles from './PaginationPage.module.css';
export const getPaginationPageClassNames = (opts)=>{
    return classNames(styles['PaginationPage'], opts.sizeY == null && styles['PaginationPage--sizeY-none'], opts.sizeY === 'compact' && styles['PaginationPage--sizeY-compact'], opts.isCurrent && styles['PaginationPage--current'], opts.disabled && styles['PaginationPage--disabled']);
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