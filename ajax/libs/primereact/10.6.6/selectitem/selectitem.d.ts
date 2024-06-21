/**
 *
 * This module contains the interface and types for options in a select component.
 *
 * @module selectitem
 *
 */
import { IconType } from '../utils';

/**
 * Custom options type.
 */
export type SelectItemOptionsType = SelectItem[] | any[];

/**
 * Defines valid properties in SelectItem component.
 * @group Properties
 */
export interface SelectItem {
    /**
     * Label of the option.
     */
    label?: string;
    /**
     * Value of the option.
     */
    value?: any;
    /**
     * ClassName of the option.
     */
    className?: string;
    /**
     * Icon to display to the option.
     */
    icon?: IconType<SelectItem>;
    /**
     * Tooltip text of the option. (Not supported)
     */
    title?: string;
    /**
     * Whether the option is disabled or not. (Not supported)
     * @defaultValue false
     */
    disabled?: boolean;
}
