import * as React from 'react';
import TooltipOptions from '../tooltip/TooltipOptions';

declare module 'primereact/calendar' {

    type AppendToType = 'self' | HTMLElement | undefined | null;

    interface ChangeTargetOptions {
        name: string;
        id: string;
        value: Date | Date[] | undefined | null;
    }

    interface ChangeParams {
        originalEvent: React.SyntheticEvent;
        value: Date | Date[] | undefined | null;
        stopPropagation(): void;
        preventDefault(): void;
        target: ChangeTargetOptions;
    }

    interface ViewChangeParams {
        originalEvent: React.SyntheticEvent;
        value: Date;
    }

    interface SelectParams {
        originalEvent: React.SyntheticEvent;
        value: Date | Date[];
    }

    interface DateTemplateParams {
        day: number;
        month: number;
        year: number;
        otherMonth: boolean;
        today: boolean;
        selectable: boolean;
    }

    export interface CalendarProps {
        id?: string;
        inputRef?: React.Ref<HTMLInputElement>;
        name?: string;
        value?: Date | Date[];
        viewDate?: Date;
        style?: object;
        className?: string;
        inline?: boolean;
        selectionMode?: string;
        inputId?: string;
        inputStyle?: object;
        inputClassName?: string;
        required?: boolean;
        readOnlyInput?: boolean;
        keepInvalid?: boolean;
        mask?: string;
        disabled?: boolean;
        tabIndex?: number;
        placeholder?: string;
        showIcon?: boolean;
        icon?: string;
        showOnFocus?: boolean;
        numberOfMonths?: number;
        view?: string;
        touchUI?: boolean;
        showTime?: boolean;
        timeOnly?: boolean;
        showSeconds?: boolean;
        showMillisec?: boolean;
        hourFormat?: string;
        stepHour?: number;
        stepMinute?: number;
        stepSecond?: number;
        stepMillisec?: number;
        shortYearCutoff?: string;
        hideOnDateTimeSelect?: boolean;
        showWeek?: boolean;
        locale?: string;
        dateFormat?: string;
        panelStyle?: object;
        panelClassName?: string;
        monthNavigator?: boolean;
        yearNavigator?: boolean;
        yearRange?: string;
        disabledDates?: Date[];
        disabledDays?: number[];
        minDate?: Date;
        maxDate?: Date;
        maxDateCount?: number;
        showOtherMonths?: boolean;
        selectOtherMonths?: boolean;
        showButtonBar?: boolean;
        todayButtonClassName?: string;
        clearButtonClassName?: string;
        autoZIndex?: boolean;
        baseZIndex?: number;
        appendTo?: AppendToType;
        tooltip?: string;
        tooltipOptions?: TooltipOptions;
        ariaLabelledBy?: string;
        transitionOptions?: object;
        dateTemplate?(e: DateTemplateParams): React.ReactNode;
        headerTemplate?(): React.ReactNode;
        footerTemplate?(): React.ReactNode;
        onFocus?(event: React.FormEvent<HTMLInputElement>): void;
        onBlur?(event: React.FormEvent<HTMLInputElement>): void;
        onInput?(event: React.FormEvent<HTMLInputElement>): void;
        onSelect?(e: SelectParams): void;
        onChange?(e: ChangeParams): void;
        onViewDateChange?(e: ViewChangeParams): void;
        onTodayButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
        onClearButtonClick?(event: React.MouseEvent<HTMLButtonElement>): void;
        onShow?(): void;
        onHide?(): void;
    }

    export class Calendar extends React.Component<CalendarProps, any> { }
}
