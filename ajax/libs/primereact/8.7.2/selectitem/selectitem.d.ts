import { IconType } from '../utils';

export type SelectItemOptionsType = SelectItem[] | any[];

export interface SelectItem {
    label?: string;
    value?: any;
    className?: string;
    icon?: IconType<SelectItem>;
    title?: string;
    disabled?: boolean;
}
