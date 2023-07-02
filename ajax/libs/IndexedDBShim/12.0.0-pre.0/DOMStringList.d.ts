export default DOMStringList;
export type Integer = number;
export type DOMStringListFull = {
    [key: number]: string;
    _items: string[];
    _length: Integer;
    addIndexes: () => void;
    sortList: () => string[];
    push: (item: string) => void;
    clone: () => DOMStringListFull;
    contains: (str: string) => boolean;
    indexOf: (str: string) => Integer;
    splice: (index: Integer, howmany: Integer, ...args: any) => void;
    length: Integer;
};
export type AnyValue = any;
declare class DOMStringList {
    get length(): any;
}
//# sourceMappingURL=DOMStringList.d.ts.map