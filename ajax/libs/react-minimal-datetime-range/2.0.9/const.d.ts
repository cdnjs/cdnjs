export declare const PREV_TRANSITION = "prev";
export declare const NEXT_TRANSITION = "next";
export declare const SELECTOR_YEAR_SET_NUMBER = 5;
export declare const POINTER_ROTATE = 0;
export declare const WEEK_NUMBER = 7;
export declare const getDaysArray: (year: number, month: number) => {
    name: string;
    day: number;
    month: string;
    year: string;
    value: string;
}[];
export declare const getDaysListByMonth: (year: number, month: number) => {
    name: string;
    day: number;
    month: string;
    year: string;
    value: string;
}[];
export declare const formatDateString: (val: number) => string;
export declare const getYearSet: (year: number) => number[];
export declare const R2D: number;
export declare const SECOND_DEGREE_NUMBER = 6;
export declare const MINUTE_DEGREE_NUMBER = 6;
export declare const HOUR_DEGREE_NUMBER = 30;
export declare const QUARTER: number[];
export declare const TIME_SELECTION_FIRST_CHAR_POS_LIST: number[];
export declare const TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST: number[];
export declare const TIME_SELECTION_SECOND_CHAR_POS_LIST: number[];
export declare const TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST: number[];
export declare const TIME_JUMP_CHAR_POS_LIST: number[];
export declare const TIME_CURSOR_POSITION_OBJECT: {
    0: string;
    1: string;
    2: string;
    3: string;
    4: string;
    5: string;
    6: string;
    7: string;
    8: string;
    9: string;
    10: string;
    11: string;
};
export declare const TIME_TYPE: string[];
export declare const KEY_CODE: {
    '8': string;
    '46': string;
    '38': string;
    '37': string;
    '39': string;
    '40': string;
    '48': string;
    '49': string;
    '50': string;
    '51': string;
    '52': string;
    '53': string;
    '54': string;
    '55': string;
    '56': string;
    '57': string;
};
export declare const isWith1Month: (year1: number, year2: number, month1: number, month2: number, type: string) => boolean;
interface IObjectKeysAny {
    [key: string]: any;
}
export declare const getEndDateItemByDuration: (item: IObjectKeysAny, duration: number) => {
    year: string;
    month: string;
    name: string;
    day: number;
    value: string;
};
export {};
