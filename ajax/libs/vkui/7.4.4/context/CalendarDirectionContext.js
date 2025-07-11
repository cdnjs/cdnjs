import { createContext, useContext } from "react";
export const CalendarDirectionContext = createContext({
    direction: 'ltr'
});
export const useCalendarDirectionContext = ()=>useContext(CalendarDirectionContext);

//# sourceMappingURL=CalendarDirectionContext.js.map