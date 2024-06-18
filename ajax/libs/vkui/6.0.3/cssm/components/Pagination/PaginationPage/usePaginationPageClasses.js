import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import styles from './PaginationPage.module.css';
export function usePaginationPageClassNames({ isCurrent, disabled }) {
    const { sizeY = 'none' } = useAdaptivity();
    return classNames(styles['PaginationPage'], sizeY === 'none' && styles['PaginationPage--sizeY-none'], sizeY === 'compact' && styles['PaginationPage--sizeY-compact'], isCurrent && styles['PaginationPage--current'], disabled && styles['PaginationPage--disabled']);
}

//# sourceMappingURL=usePaginationPageClasses.js.map