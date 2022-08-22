import * as React from 'react';

export interface FullCalendarProps {
    id?: string;
    events?: any[];
    style?: object;
    className?: string;
    options?: object;
    children?: React.ReactNode;
}

export declare class FullCalendar extends React.Component<FullCalendarProps, any> { 
    public getElement(): HTMLDivElement;
}
