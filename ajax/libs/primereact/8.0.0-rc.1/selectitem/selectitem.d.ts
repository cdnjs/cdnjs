import { IconType } from '../utils';

export interface SelectItem {
    label?: string;
    value?: any;
    className?: string;
    icon?: IconType<SelectItem>;
    title?: string;
    disabled?: boolean;
}
