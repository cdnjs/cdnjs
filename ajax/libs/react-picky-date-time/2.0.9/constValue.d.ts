declare const SIZE_RANGE: string[];
declare const DEFAULT_SIZE = "m";
declare const PREV_TRANSITION = "prev";
declare const NEXT_TRANSITION = "next";
declare const SELECTOR_YEAR_SET_NUMBER = 5;
declare const POINTER_ROTATE = 0;
declare const WEEK_NUMBER = 7;
declare const getDaysArray: (year: number, month: number) => {
    name: string;
    day: number;
    month: string;
    year: number;
    value: string;
}[];
declare const getDaysListByMonth: (year: number, month: number) => {
    name: string;
    day: number;
    month: string;
    year: number;
    value: string;
}[];
declare const formatDateString: (value: number) => string;
declare const getYearSet: (year: number) => number[];
declare const R2D: number;
declare const SECOND_DEGREE_NUMBER = 6;
declare const MINUTE_DEGREE_NUMBER = 6;
declare const HOUR_DEGREE_NUMBER = 30;
declare const QUARTER: number[];
declare const TIME_SELECTION_FIRST_CHAR_POS_LIST: number[];
declare const TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST: number[];
declare const TIME_SELECTION_SECOND_CHAR_POS_LIST: number[];
declare const TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST: number[];
declare const TIME_JUMP_CHAR_POS_LIST: number[];
declare const TIME_CURSOR_POSITION_OBJECT: {
    [k: number]: string;
};
declare const TIME_TYPE: string[];
export { SIZE_RANGE, DEFAULT_SIZE, PREV_TRANSITION, NEXT_TRANSITION, SELECTOR_YEAR_SET_NUMBER, WEEK_NUMBER, POINTER_ROTATE, getDaysArray, getDaysListByMonth, getYearSet, formatDateString, R2D, SECOND_DEGREE_NUMBER, MINUTE_DEGREE_NUMBER, HOUR_DEGREE_NUMBER, QUARTER, TIME_SELECTION_FIRST_CHAR_POS_LIST, TIME_SELECTION_FIRST_CHAR_POS_BACKSPACE_LIST, TIME_SELECTION_SECOND_CHAR_POS_LIST, TIME_SELECTION_SECOND_CHAR_POS_BACKSPACE_LIST, TIME_JUMP_CHAR_POS_LIST, TIME_CURSOR_POSITION_OBJECT, TIME_TYPE, };
