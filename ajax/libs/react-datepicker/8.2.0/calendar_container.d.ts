import React, { type HTMLAttributes } from "react";
export interface CalendarContainerProps extends React.PropsWithChildren<HTMLAttributes<HTMLDivElement>> {
    showTimeSelectOnly?: boolean;
    showTime?: boolean;
}
declare const CalendarContainer: React.FC<CalendarContainerProps>;
export default CalendarContainer;
