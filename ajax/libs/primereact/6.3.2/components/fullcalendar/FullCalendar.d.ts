import * as React from 'react';

export interface FullCalendarProps {
    id?: string;
    events?: any[];
    style?: object;
    className?: string;
    options?: object;
}

export declare class FullCalendar extends React.Component<FullCalendarProps, any> { }
