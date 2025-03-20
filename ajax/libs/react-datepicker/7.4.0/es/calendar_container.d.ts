import React from "react";
export interface CalendarContainerProps extends React.PropsWithChildren {
    showTimeSelectOnly?: boolean;
    showTime?: boolean;
    className?: string;
}
declare const CalendarContainer: React.FC<CalendarContainerProps>;
export default CalendarContainer;
