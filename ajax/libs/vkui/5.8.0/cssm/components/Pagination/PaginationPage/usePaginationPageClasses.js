import { classNames } from '@vkontakte/vkjs';
import { useAdaptivity } from '../../../hooks/useAdaptivity';
import { SizeType } from '../../../lib/adaptivity';
import styles from './PaginationPage.module.css';
export function usePaginationPageClassNames({ isCurrent, disabled }) {
    const { sizeY = 'none' } = useAdaptivity();
    return classNames(styles['PaginationPage'], sizeY === 'none' && styles['PaginationPage--sizeY-none'], sizeY === SizeType.COMPACT && styles['PaginationPage--sizeY-compact'], isCurrent && styles['PaginationPage--current'], disabled && styles['PaginationPage--disabled']);
}

//# sourceMappingURL=usePaginationPageClasses.js.map