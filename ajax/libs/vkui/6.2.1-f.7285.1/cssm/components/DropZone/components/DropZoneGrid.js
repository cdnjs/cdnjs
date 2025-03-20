import { jsx as _jsx } from "react/jsx-runtime";
import { classNames } from '@vkontakte/vkjs';
import { RootComponent } from '../../RootComponent/RootComponent';
import styles from './DropZoneGrid.module.css';
const directionStyle = {
    row: styles['DropZoneGrid--row'],
    column: styles['DropZoneGrid--column']
};
export const DropZoneGrid = ({ direction = 'column', ...props })=>/*#__PURE__*/ _jsx(RootComponent, {
        baseClassName: classNames(styles['DropZoneGrid'], directionStyle[direction]),
        ...props
    });
DropZoneGrid.displayName = 'DropZoneGrid';

//# sourceMappingURL=DropZoneGrid.js.map