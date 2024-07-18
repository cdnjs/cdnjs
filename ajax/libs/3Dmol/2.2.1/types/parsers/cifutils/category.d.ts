import { EncodedCategory } from "./encoding";
export declare function Category(data: EncodedCategory): {
    rowCount: number;
    name: string;
    fieldNames: string[];
    getField(name: any): any;
};
