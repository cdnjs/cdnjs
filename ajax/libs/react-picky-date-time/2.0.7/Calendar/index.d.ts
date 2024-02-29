import React from 'react';
interface CalendarProps {
    size: string;
    locale: string;
    defaultDate: string;
    markedDates: Array<string>;
    supportDateRange: Array<string>;
    onYearPicked?: (res: object) => void;
    onMonthPicked?: (res: object) => void;
    onDatePicked?: (res: object) => void;
    onResetDate?: (res: object) => void;
    onResetDefaultDate?: (res: object) => void;
}
declare const Calendar: React.FC<CalendarProps>;
export default Calendar;
