import * as React from 'react';

interface FullCalendarProps {
    id?: string;
    events?: any[];
    style?: object;
    className?: string;
    options?: object;
}

export class FullCalendar extends React.Component<FullCalendarProps,any> {}