import React from "react";
export interface CalendarContainerProps extends React.PropsWithChildren<HTMLDivElement> {
    showTimeSelectOnly?: boolean;
    showTime?: boolean;
}
declare const CalendarContainer: React.FC<CalendarContainerProps>;
export default CalendarContainer;
