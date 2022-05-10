import React from 'react';
interface ClockProps {
    size: string;
    locale: string;
    defaultTime: string;
    onSecondChange?: (res: object) => void;
    onMinuteChange?: (res: object) => void;
    onHourChange?: (res: object) => void;
    onMeridiemChange?: (res: string) => void;
    onResetTime?: (res: object) => void;
    onClearTime?: (res: object) => void;
    onResetDefaultTime?: (res: object) => void;
}
declare const Clock: React.FC<ClockProps>;
export default Clock;
