import React from 'react';
interface IndexProps {
    locale?: string;
    defaultDate?: string;
    markedDates?: Array<string>;
    supportDateRange?: Array<string>;
    onYearPicked?: (res: object) => void;
    onMonthPicked?: (res: object) => void;
    onDatePicked?: (res: object) => void;
    onResetDate?: (res: object) => void;
    onResetDefaultDate?: (res: object) => void;
}
declare const Index: React.FC<IndexProps>;
export default Index;
