import { Options, ListingProps } from "./types";
export declare function transform(input: Partial<ListingProps> & {
    string: string;
}, options?: Partial<Options>): string;
