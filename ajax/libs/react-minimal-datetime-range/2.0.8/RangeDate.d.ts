import React from 'react';
interface IObjectKeysAny {
    [key: string]: any;
}
interface IndexProps {
    selected: boolean;
    setSelected: (res: boolean) => void;
    locale?: string;
    defaultDateStart?: string;
    defaultDateEnd?: string;
    rangeDirection?: string;
    startDatePickedArray?: Array<string>;
    endDatePickedArray?: Array<string>;
    markedDates?: Array<string>;
    supportDateRange?: Array<string>;
    duration?: number;
    handleChooseStartDate?: (res: object) => void;
    handleChooseEndDate?: (res: object) => void;
    currentDateObjStart?: IObjectKeysAny;
    setCurrentDateObjStart?: (res: object) => void;
    currentDateObjEnd?: IObjectKeysAny;
    setCurrentDateObjEnd?: (res: object) => void;
}
declare const Index: React.FC<IndexProps>;
export default Index;
