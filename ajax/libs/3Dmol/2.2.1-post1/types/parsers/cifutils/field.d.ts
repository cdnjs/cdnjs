export declare function Field(column: any): {
    __array: any[];
    binaryEncoding: any;
    isDefined: boolean;
    rowCount: number;
    str: (row: any) => any;
    int: (row: any) => any;
    float: (row: any) => any;
    areValuesEqual: (rowA: any, rowB: any) => boolean;
    toStringArray: (params: any) => any[];
    toIntArray: ((params: any) => readonly number[]) | ((params: any) => any[]);
    toFloatArray: ((params: any) => readonly number[]) | ((params: any) => any[]);
};
