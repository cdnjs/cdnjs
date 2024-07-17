import React from 'react';
import '../../css/index.css';
export interface ReactPickyDateTimeProps {
    mode: number;
    size: string;
    locale: string;
    markedDates?: Array<string>;
    supportDateRange?: Array<string>;
    defaultDate?: string;
    defaultTime?: string;
    show?: boolean;
    onClose?: () => void;
    onYearPicked?: (res: object) => void;
    onMonthPicked?: (res: object) => void;
    onDatePicked?: (res: object) => void;
    onResetDate?: (res: object) => void;
    onSecondChange?: (res: object) => void;
    onMinuteChange?: (res: object) => void;
    onHourChange?: (res: object) => void;
    onMeridiemChange?: (res: string) => void;
    onResetTime?: (res: object) => void;
    onClearTime?: (res: object) => void;
    onResetDefaultDate?: (res: object) => void;
    onResetDefaultTime?: (res: object) => void;
}
declare const ReactPickyDateTime: React.FC<ReactPickyDateTimeProps>;
export default ReactPickyDateTime;
