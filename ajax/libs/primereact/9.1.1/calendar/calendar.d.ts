/**
 *
 * Calendar also known as DatePicker, is a form component to work with dates.
 *
 * [Live Demo](https://www.primereact.org/calendar/)
 *
 * @module calendar
 *
 */
import * as React from 'react';
import { CSSTransitionProps } from '../csstransition';
import { TooltipOptions } from '../tooltip/tooltipoptions';
import { FormEvent, Nullable } from '../ts-helpers';
import { IconType } from '../utils';

/**
 * Custom change event.
 * @see {@link CalendarProps.onChange}
 * @extends {FormEvent}
 * @event
 */
interface CalendarChangeEvent extends FormEvent<Date | Date[] | string> {}

/**
 * Custom month change event.
 * @see {@link CalendarProps.onMonthChange}
 * @event
 */
interface CalendarMonthChangeEvent {
    /**
     * The number of month
     */
    month: number;
    /**
     * The number of year
     */
    year: number;
}

/**
 * Custom view change event
 * @see {@link CalendarProps.onViewDateChange}
 * @event
 */
interface CalendarViewChangeEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * New date
     */
    value: Date;
}

/**
 * Custom Select event
 * @see {@link CalendarProps.onSelect}
 */
interface CalendarSelectEvent {
    /**
     * Browser event
     */
    originalEvent: React.SyntheticEvent;
    /**
     * Selected date
     */
    value: Nullable<Date | Date[] | string>;
}

/**
 * Custom date template event
 * @see {@link CalendarProps.dateTemplate}
 * @event
 */
interface CalendarDateTemplateEvent {
    /**
     * Current day
     */
    day: number;
    /**
     * Current month
     */
    month: number;
    /**
     * Current year
     */
    year: number;
    /**
     * Whether the date belongs to the other month
     */
    otherMonth: boolean;
    /**
     * Whether the day is today
     */
    today: boolean;
    /**
     * Whether the date is selectable
     */
    selectable: boolean;
}

/**
 * Custom visible change event
 * @see {@link CalendarProps.onVisibleChange}
 * @event
 */
interface CalendarVisibleChangeEvent {
    /**
     * Whether the overlay is opened.
     */
    visible: boolean;
    /**
     * The type of visible action when the overlay is visible/hidden.
     */
    type: 'outside' | 'dateselect' | undefined | null;
    /**
     *  Used to refocus the input field in some cases when the overlay is hidden.
     */
    callback?(): void;
}

/**
 * Custom common navigator template event
 * @hidden
 */
interface CalendarNavigatorTemplateEvent {
    /**
     * Navigator change callback
     * @param {React.SyntheticEvent} event - Browser event
     * @param {string | number | null} [value] - The value of current navigator
     */
    onChange(event: React.SyntheticEvent, value?: string | number | undefined | null): void;
    /**
     * Style class of the navigator.
     */
    className: string;
    /**
     * The value of the current navigator
     */
    value: string | number | undefined | null;
    /**
     * The names of the current navigator
     */
    names: any[];
    /**
     * The options of the current navigator
     */
    options: any[];
    /**
     * The default navigator component
     */
    element: React.ReactNode;
    /**
     * The props of Calendar component
     */
    props: CalendarProps;
}

/**
 * Custom month navigator template event
 * @see {@link CalendarProps.monthNavigatorTemplate}
 * @extends {CalendarNavigatorTemplateEvent}
 * @event
 */
interface CalendarMonthNavigatorTemplateEvent extends CalendarNavigatorTemplateEvent {}

/**
 * Custom year navigator template event
 * @see {@link CalendarProps.yearNavigatorTemplate}
 * @extends {CalendarNavigatorTemplateEvent}
 * @event
 */
interface CalendarYearNavigatorTemplateEvent extends CalendarNavigatorTemplateEvent {}

/**
 * Defines valid properties in Calendar component.
 * @group Properties
 */
export interface CalendarProps {
    /**
     * Unique identifier of the element.
     */
    id?: string | undefined;
    /**
     * DOM element instance where the overlay panel should be mounted. Valid values are any DOM Element and "self". The "self" value is used to render a component where it is located.
     * @defaultValue document.body
     */
    appendTo?: 'self' | HTMLElement | undefined | null;
    /**
     * Establishes relationships between the component and label(s) where its value should be one or more element IDs.
     */
    ariaLabelledBy?: string | undefined;
    /**
     * Whether to automatically manage layering.
     * @defaultValue true
     */
    autoZIndex?: boolean | undefined;
    /**
     * Base zIndex value to use in layering.
     * @defaultValue 0
     */
    baseZIndex?: number | undefined;
    /**
     * Style class of the element.
     */
    className?: string | undefined;
    /**
     * Style class of the clear button.
     * @defaultValue p-secondary-button
     */
    clearButtonClassName?: string | undefined;
    /**
     * Format of the date.
     * @defaultValue mm/dd/yy
     */
    dateFormat?: string | undefined;
    /**
     * When specified, disables the component.
     * @defaultValue false
     */
    disabled?: boolean | undefined;
    /**
     * Array with dates to disable.
     */
    disabledDates?: Date[] | undefined;
    /**
     * Array with disabled weekday numbers.
     */
    disabledDays?: number[] | undefined;
    /**
     * Whether to hide the overlay on date selection when showTime is enabled.
     * @defaultValue false
     */
    hideOnDateTimeSelect?: boolean | undefined;
    /**
     * Specifies 12 or 24 hour format.
     * @defaultValue 24
     */
    hourFormat?: '12' | '24' | undefined;
    /**
     * Icon of the calendar button.
     * @defaultValue pi pi-calendar
     */
    icon?: IconType<CalendarProps> | undefined;
    /**
     * Icon position of the calendar button.
     * @defaultValue right
     */
    iconPos?: 'left' | 'right' | undefined;
    /**
     * When enabled, displays the calendar as inline instead of an overlay.
     * @defaultValue false
     */
    inline?: boolean | undefined;
    /**
     * Style class of the input element.
     */
    inputClassName?: string | undefined;
    /**
     * Identifier of the input element.
     */
    inputId?: string | undefined;
    /**
     * Reference of the input element.
     */
    inputRef?: React.Ref<HTMLInputElement> | undefined;
    /**
     * Inline style of the input field.
     */
    inputStyle?: React.CSSProperties | undefined;
    /**
     * Keep invalid value when input blur.
     * @defaultValue false
     */
    keepInvalid?: boolean | undefined;
    /**
     * Used to display the values ​​of the locale object defined in the Locale API.
     * @defaultValue en
     */
    locale?: string | undefined;
    /**
     * Mask pattern for input element.
     */
    mask?: string | undefined;
    /**
     * The maximum selectable date.
     */
    maxDate?: Date | undefined;
    /**
     * Maximum number of selectable dates in multiple mode.
     */
    maxDateCount?: number | undefined;
    /**
     * The minimum selectable date.
     */
    minDate?: Date | undefined;
    /**
     * Whether the month should be rendered as a dropdown instead of text.
     * @deprecated since v6. Navigator is always on.
     * @defaultValue false
     */
    monthNavigator?: boolean | undefined;
    /**
     * Name of the input element.
     */
    name?: string | undefined;
    /**
     * Number of months to display.
     * @defaultValue 1
     */
    numberOfMonths?: number | undefined;
    /**
     * Style class of the datetimepicker panel.
     */
    panelClassName?: string | undefined;
    /**
     * Inline style of the datetimepicker panel.
     */
    panelStyle?: React.CSSProperties | undefined;
    /**
     * Placeholder text for the input.
     */
    placeholder?: string | undefined;
    /**
     * When specified, prevents entering the date manually with keyboard.
     * @defaultValue false
     */
    readOnlyInput?: boolean | undefined;
    /**
     * When present, it specifies that an input field must be filled out before submitting the form.
     * @defaultValue false
     */
    required?: boolean | undefined;
    /**
     * Whether days in other months shown before or after the current month are selectable. This only applies if the showOtherMonths option is set to true.
     * @defaultValue false
     */
    selectOtherMonths?: boolean | undefined;
    /**
     * Specifies the selection mode.
     * @defaultValue single
     */
    selectionMode?: 'single' | 'multiple' | 'range' | undefined;
    /**
     * The cutoff year for determining the century for a date.
     * @defaultValue +10
     */
    shortYearCutoff?: string | undefined;
    /**
     * Whether to display today and clear buttons at the footer
     * @defaultValue false
     */
    showButtonBar?: boolean | undefined;
    /**
     * When enabled, displays a button with icon next to input.
     * @defaultValue false
     */
    showIcon?: boolean | undefined;
    /**
     * Whether to show the milliseconds in time picker.
     * @defaultValue false
     */
    showMillisec?: boolean | undefined;
    /**
     * Whether to allow navigation past min/max dates.
     * @defaultValue false
     */
    showMinMaxRange?: boolean | undefined;
    /**
     * When disabled, datepicker will not be visible with input focus.
     * @defaultValue true
     */
    showOnFocus?: boolean | undefined;
    /**
     * Whether to display dates in other months (non-selectable) at the start or end of the current month. To make these days selectable use the selectOtherMonths option.
     * @defaultValue true
     */
    showOtherMonths?: boolean | undefined;
    /**
     * Whether to show the seconds in time picker.
     * @defaultValue false
     */
    showSeconds?: boolean | undefined;
    /**
     * Whether to display timepicker.
     * @defaultValue false
     */
    showTime?: boolean | undefined;
    /**
     * When enabled, calendar will show week numbers.
     * @defaultValue false
     */
    showWeek?: boolean | undefined;
    /**
     * Hours to change per step.
     * @defaultValue 1
     */
    stepHour?: number | undefined;
    /**
     * Milliseconds to change per step.
     * @defaultValue 1
     */
    stepMillisec?: number | undefined;
    /**
     * Minutes to change per step.
     * @defaultValue 1
     */
    stepMinute?: number | undefined;
    /**
     * Seconds to change per step.
     * @defaultValue 1
     */
    stepSecond?: number | undefined;
    /**
     * Inline style of the element.
     */
    style?: React.CSSProperties | undefined;
    /**
     * Index of the element in tabbing order.
     */
    tabIndex?: number | undefined;
    /**
     * Whether to display timepicker only.
     * @defaultValue false
     */
    timeOnly?: boolean | undefined;
    /**
     * Style class of the today button.
     * @defaultValue p-secondary-button
     */
    todayButtonClassName?: string | undefined;
    /**
     * Content of the tooltip.
     */
    tooltip?: string | undefined;
    /**
     * Configuration of the tooltip, refer to the tooltip documentation for more information.
     * @type {TooltipOptions}
     */
    tooltipOptions?: TooltipOptions | undefined;
    /**
     * When enabled, calendar overlay is displayed as optimized for touch devices.
     * @defaultValue false
     */
    touchUI?: boolean | undefined;
    /**
     * The properties of CSSTransition can be customized, except for "nodeRef" and "in" properties.
     * @type {CSSTransitionProps}
     */
    transitionOptions?: CSSTransitionProps | undefined;
    /**
     * Value of the component.
     * @defaultValue null
     */
    value?: Date | Date[] | string | null | undefined;
    /**
     * Type of view to display.
     * @defaultValue date
     */
    view?: 'date' | 'month' | undefined;
    /**
     * Date instance whose month and year are used to display the calendar.
     */
    viewDate?: Date | null | undefined;
    /**
     * Specifies the visibility of the overlay.
     * @defaultValue false
     */
    visible?: boolean | undefined;
    /**
     * Whether the year should be rendered as a dropdown instead of text.
     * @deprecated since v6. Navigator is always on.
     * @defaultValue false
     */
    yearNavigator?: boolean | undefined;
    /**
     * The range of years displayed in the year drop-down in (nnnn:nnnn) format such as (2000:2020).
     */
    yearRange?: string | undefined;
    /**
     * Function for overriding default behavior that formats a Date to the string representation.
     * @param {Date} date - Formating date
     * @return {string} Formatted date
     */
    formatDateTime?(date: Date): string;
    /**
     * Function for overriding default behavior that parses text into the Date.
     * @param {string} text - Parsing date
     * @return {Date} Parsed date
     */
    parseDateTime?(text: string): Date;
    /**
     * Function that gets a date information and returns the cell content in datepicker.
     * @param {CalendarDateTemplateEvent} event - Custom date template event
     * @return {React.ReactNode}
     */
    dateTemplate?(event: CalendarDateTemplateEvent): React.ReactNode;
    /**
     * Function that gets a navigator information and returns the decade selections in the panel.
     * @param {number[]} yearValues - The values of years
     * @return {React.ReactNode}
     */
    decadeTempate?(yearValues: number[]): React.ReactNode;
    /**
     * Custom footer template of overlay.
     * @return {React.ReactNode}
     */
    footerTemplate?(): React.ReactNode;
    /**
     * Custom header template of overlay.
     * @return {React.ReactNode}
     */
    headerTemplate?(): React.ReactNode;
    /**
     * Function that gets a navigator information and returns the navigator element in header.
     * @param {CalendarMonthNavigatorTemplateEvent} event - Custom month navigator template event.
     * @return {React.ReactNode}
     */
    monthNavigatorTemplate?(event: CalendarMonthNavigatorTemplateEvent): React.ReactNode;
    /**
     * Callback to invoke on blur event of input field.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onBlur?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when value changes.
     * @param {CalendarChangeEvent} event - Custom change event
     */
    onChange?(event: CalendarChangeEvent): void;
    /**
     * Callback to invoke when clear button is clicked.
     * @param {React.MouseEvent<HTMLButtonElement>} event - Browser event
     */
    onClearButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    /**
     * Callback to invoke on focus event of input field.
     * @param {React.FocusEvent<HTMLInputElement>} event - Browser event
     */
    onFocus?(event: React.FocusEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when overlay panel or modal becomes hidden.
     */
    onHide?(): void;
    /**
     * Callback to invoke on input event of input field.
     * @param {React.FormEvent<HTMLInputElement>} event - Browser event
     */
    onInput?(event: React.FormEvent<HTMLInputElement>): void;
    /**
     * Callback to invoke when month changes.
     * @param {CalendarMonthChangeEvent} event - Custom month change event
     */
    onMonthChange?(event: CalendarMonthChangeEvent): void;
    /**
     * Callback to invoke when a date is selected.
     * @param {CalendarSelectEvent} event - Custom select event
     */
    onSelect?(event: CalendarSelectEvent): void;
    /**
     * Callback to invoke when overlay panel or modal becomes visible.
     */
    onShow?(): void;
    /**
     * Callback to invoke when today button is clicked.
     * @param {React.MouseEvent<HTMLButtonElement>} event - Browser event
     */
    onTodayButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
    /**
     * Callback to invoke when the displayed month/year is changed.
     * @param {CalendarViewChangeEvent} event - Custom view change event
     */
    onViewDateChange?(event: CalendarViewChangeEvent): void;
    /**
     * Callback to invoke when visible is changed.
     * @param {CalendarVisibleChangeEvent} event - Custom visible change event
     */
    onVisibleChange?(event: CalendarVisibleChangeEvent): void;
    /**
     * Function that gets a navigator information and returns the navigator in header.
     * @param {CalendarYearNavigatorTemplateEvent} event - Custom year navigator template event
     */
    yearNavigatorTemplate?(event: CalendarYearNavigatorTemplateEvent): React.ReactNode;
    /**
     * Used to get the child elements of the component.
     * @readonly
     */
    children?: React.ReactNode | undefined;
}

/**
 * **PrimeReact - Calendar**
 *
 * _Calendar also known as DatePicker, is a form component to work with dates._
 *
 * [Live Demo](https://www.primereact.org/calendar/)
 * --- ---
 * ![PrimeReact](https://primefaces.org/cdn/primereact/images/logo-100.png)
 *
 * @group Component
 */
export declare class Calendar extends React.Component<CalendarProps, any> {
    /**
     * Used to show the overlay.
     */
    public show(): void;
    /**
     * Used to hide the overlay.
     */
    public hide(): void;
    /**
     * Used to focus the component.
     */
    public focus(): void;
    /**
     * Used to get the current date.
     * @return {Date | Date[]} Current Date
     */
    public getCurrentDateTime(): Date | Date[];
    /**
     * Used to get the view date.
     * @return {Date | Date[]} View Date
     */
    public getViewDate(): Date | Date[];
    /**
     * Used to get container element.
     * @return {HTMLSpanElement} Container element
     */
    public getElement(): HTMLSpanElement;
    /**
     * Used to get input element.
     * @return {HTMLInputElement} Input element
     */
    public getInput(): HTMLInputElement;
    /**
     * Used to get overlay element.
     * @return {HTMLElement} Overlay element
     */
    public getOverlay(): HTMLElement;
    /**
     * Used to update the current view date.
     * @param {React.SyntheticEvent | null} event - Browser event.
     * @param {Date | Date[] | null} value - New date.
     */
    public updateViewDate(event: React.SyntheticEvent | null, value: Date | Date[] | null | undefined): void;
}
