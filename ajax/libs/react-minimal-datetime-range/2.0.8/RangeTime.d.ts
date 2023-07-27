import React from 'react';
interface IObjectKeysAny {
    [key: string]: any;
}
interface IndexProps {
    showOnlyTime: boolean;
    LOCALE_DATA: IObjectKeysAny;
    singleMode?: boolean;
    startDatePickedArray?: Array<string>;
    endDatePickedArray?: Array<string>;
    startTimePickedArray?: Array<string>;
    endTimePickedArray?: Array<string>;
    handleChooseStartTimeHour: (res: string) => void;
    handleChooseStartTimeMinute: (res: string) => void;
    handleChooseEndTimeHour?: (res: string) => void;
    handleChooseEndTimeMinute?: (res: string) => void;
}
declare const Index: React.FC<IndexProps>;
export default Index;
