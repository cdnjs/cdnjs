import * as React from 'react';

declare namespace FullCalendar {

    interface FullCalendarProps {
        id?: string;
        events?: any[];
        style?: object;
        className?: string;
        options?: object;
    }
}

export declare class FullCalendar extends React.Component<FullCalendar.FullCalendarProps, any> { }
